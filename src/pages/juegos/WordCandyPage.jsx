import {
  ChevronRightIcon,
  ZapIcon,
  StarIcon,
  TrophyIcon,
  ArrowLeftIcon,
  CandyIcon,
  ClockIcon,
  FlameIcon,
  LayersIcon,
  LockIcon,
  PartyPopperIcon,
  RotateCcwIcon,
  MousePointer2Icon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { useSound } from "../../lib/sound.jsx";
const w = 8;
const Qt = 7;
const _ = ["#ff3385", "#00e5ff", "#ffd600", "#39ff14", "#a855f7", "#ff6b35", "#ff3333"];
const P = [
  "rgba(255,51,133,0.6)",
  "rgba(0,229,255,0.6)",
  "rgba(255,214,0,0.6)",
  "rgba(57,255,20,0.6)",
  "rgba(168,85,247,0.6)",
  "rgba(255,107,53,0.6)",
  "rgba(255,51,51,0.6)",
];
const At = ["#cc1a66", "#00b8cc", "#ccaa00", "#2ecc00", "#7c3aed", "#cc5500", "#cc0000"];
const it = ["SWEET!", "TASTY!", "DELICIOUS!", "DIVINE!", "SUGAR CRUSH!", "AMAZING!"];
const lt = [
  {
    es: "Casa",
    zh: "房子",
  },
  {
    es: "Perro",
    zh: "狗",
  },
  {
    es: "Gato",
    zh: "猫",
  },
  {
    es: "Amor",
    zh: "爱",
  },
  {
    es: "Paz",
    zh: "和平",
  },
  {
    es: "Sol",
    zh: "太阳",
  },
  {
    es: "Luna",
    zh: "月亮",
  },
  {
    es: "Mar",
    zh: "大海",
  },
  {
    es: "Flor",
    zh: "花",
  },
  {
    es: "Libro",
    zh: "书",
  },
  {
    es: "Agua",
    zh: "水",
  },
  {
    es: "Fuego",
    zh: "火",
  },
  {
    es: "Escuela",
    zh: "学校",
  },
  {
    es: "Familia",
    zh: "家庭",
  },
  {
    es: "Amigo",
    zh: "朋友",
  },
  {
    es: "Feliz",
    zh: "快乐",
  },
  {
    es: "Rápido",
    zh: "快",
  },
  {
    es: "Grande",
    zh: "大",
  },
  {
    es: "Nuevo",
    zh: "新",
  },
  {
    es: "Bueno",
    zh: "好",
  },
  {
    es: "Color",
    zh: "颜色",
  },
  {
    es: "Día",
    zh: "白天",
  },
  {
    es: "Noche",
    zh: "夜晚",
  },
  {
    es: "Estrella",
    zh: "星星",
  },
  {
    es: "Cielo",
    zh: "天空",
  },
  {
    es: "Tierra",
    zh: "地球",
  },
  {
    es: "Niño",
    zh: "孩子",
  },
  {
    es: "Comida",
    zh: "食物",
  },
  {
    es: "Fruta",
    zh: "水果",
  },
  {
    es: "Manzana",
    zh: "苹果",
  },
];
function xe(p = 0.5) {
  const d = [];
  for (let b = 0; b < w; b++) {
    d[b] = [];
    for (let o = 0; o < w; o++) {
      d[b][o] = Math.random() < p;
    }
  }
  return d;
}
function ct(p = 10) {
  const d = [];
  for (let o = 0; o < w; o++) {
    d[o] = [];
    for (let c = 0; c < w; c++) {
      d[o][c] = false;
    }
  }
  let b = 0;
  while (b < p) {
    const o = Math.floor(Math.random() * w);
    const c = Math.floor(Math.random() * w);
    if (!d[o][c]) {
      d[o][c] = true;
      b++;
    }
  }
  return d;
}
const K = [
  {
    id: 1,
    moves: 30,
    goals: [
      {
        type: "score",
        target: 1200,
        label: "1200 puntos",
      },
    ],
  },
  {
    id: 2,
    moves: 28,
    goals: [
      {
        type: "score",
        target: 2500,
        label: "2500 puntos",
      },
    ],
  },
  {
    id: 3,
    moves: 25,
    goals: [
      {
        type: "score",
        target: 3500,
        label: "3500 puntos",
      },
    ],
  },
  {
    id: 4,
    moves: 25,
    goals: [
      {
        type: "score",
        target: 5000,
        label: "5000 puntos",
      },
    ],
  },
  {
    id: 5,
    moves: 30,
    goals: [
      {
        type: "score",
        target: 7000,
        label: "7000 puntos",
      },
    ],
  },
  {
    id: 6,
    moves: 25,
    goals: [
      {
        type: "color",
        target: 20,
        color: 6,
        label: "Elimina 20 rojos",
      },
    ],
  },
  {
    id: 7,
    moves: 25,
    goals: [
      {
        type: "color",
        target: 25,
        color: 0,
        label: "25 mascotas rosas",
      },
      {
        type: "color",
        target: 25,
        color: 1,
        label: "25 mascotas cian",
      },
    ],
  },
  {
    id: 8,
    moves: 30,
    goals: [
      {
        type: "color",
        target: 30,
        color: 2,
        label: "30 amarillos",
      },
      {
        type: "color",
        target: 30,
        color: 4,
        label: "30 morados",
      },
    ],
  },
  {
    id: 9,
    moves: 25,
    goals: [
      {
        type: "color",
        target: 35,
        color: 5,
        label: "35 naranjas",
      },
    ],
  },
  {
    id: 10,
    moves: 30,
    goals: [
      {
        type: "color",
        target: 40,
        color: 3,
        label: "40 verdes",
      },
      {
        type: "score",
        target: 5000,
        label: "5000 puntos",
      },
    ],
  },
  {
    id: 11,
    moves: 30,
    goals: [
      {
        type: "jelly",
        target: 15,
        label: "Romper 15 gelatinas",
      },
    ],
    jellyMap: xe(0.4),
  },
  {
    id: 12,
    moves: 30,
    goals: [
      {
        type: "jelly",
        target: 25,
        label: "Romper 25 gelatinas",
      },
    ],
    jellyMap: xe(0.5),
  },
  {
    id: 13,
    moves: 30,
    goals: [
      {
        type: "cookie",
        target: 10,
        label: "Destruir 10 galletas",
      },
    ],
    cookieMap: ct(10),
  },
  {
    id: 14,
    moves: 25,
    goals: [
      {
        type: "jelly",
        target: 20,
        label: "20 gelatinas",
      },
      {
        type: "cookie",
        target: 8,
        label: "8 galletas",
      },
    ],
    jellyMap: xe(0.35),
    cookieMap: ct(8),
  },
  {
    id: 15,
    moves: 30,
    goals: [
      {
        type: "jelly",
        target: 35,
        label: "35 gelatinas",
      },
      {
        type: "score",
        target: 4000,
        label: "4000 puntos",
      },
    ],
    jellyMap: xe(0.6),
  },
  {
    id: 16,
    moves: 20,
    timeLimit: 60,
    goals: [
      {
        type: "score",
        target: 10000,
        label: "10000 puntos en 60s",
      },
    ],
  },
  {
    id: 17,
    moves: 25,
    timeLimit: 75,
    goals: [
      {
        type: "color",
        target: 50,
        color: 0,
        label: "50 rosas en 75s",
      },
    ],
  },
  {
    id: 18,
    moves: 20,
    timeLimit: 60,
    goals: [
      {
        type: "score",
        target: 15000,
        label: "15000 puntos en 60s",
      },
    ],
  },
  {
    id: 19,
    moves: 25,
    timeLimit: 90,
    goals: [
      {
        type: "jelly",
        target: 40,
        label: "40 gelatinas en 90s",
      },
    ],
    jellyMap: xe(0.55),
  },
  {
    id: 20,
    moves: 30,
    timeLimit: 120,
    goals: [
      {
        type: "score",
        target: 25000,
        label: "25000 puntos en 120s",
      },
      {
        type: "color",
        target: 30,
        color: 6,
        label: "30 rojos",
      },
    ],
  },
];
let Wt = 0;
function se() {
  return ++Wt;
}
function z(p, d, b) {
  return p.find((o) => o.row === d && o.col === b);
}
function De() {
  return Math.floor(Math.random() * Qt);
}
function Bt(p) {
  const d = [];
  for (let b = 0; b < w; b++) {
    for (let o = 0; o < w; o++) {
      let c = De();
      let m = 0;
      while (m < 200) {
        let i = false;
        if (o >= 2 && d[d.length - 1].type === c && d[d.length - 2].type === c) {
          i = true;
        }
        if (b >= 2) {
          const n = z(d, b - 1, o);
          const a = z(d, b - 2, o);
          if (n && a && n.type === c && a.type === c) {
            i = true;
          }
        }
        if (!i) {
          break;
        }
        c = De();
        m++;
      }
      d.push({
        id: se(),
        type: c,
        row: b,
        col: o,
        special: "none",
        jelly: p?.jellyMap?.[b]?.[o] ? 2 : 0,
        cookie: p?.cookieMap?.[b]?.[o] || false,
      });
    }
  }
  return d;
}
function We(p) {
  const matchedIds = new Set();
  const matchInfo = [];
  for (let o = 0; o < w; o++) {
    let c = 0;
    while (c < w) {
      const m = z(p, o, c);
      if (!m) {
        c++;
        continue;
      }
      let hLen = 1;
      const n = [m];
      while (c + hLen < w) {
        const a = z(p, o, c + hLen);
        if (a && a.type === m.type && a.special !== "color-bomb") {
          n.push(a);
          hLen++;
        } else {
          break;
        }
      }
      if (hLen >= 3) {
        for (const a of n) {
          matchedIds.add(a.id);
          const j = matchInfo.find((M) => M.id === a.id);
          if (j) {
            j.hLen = Math.max(j.hLen, hLen);
          } else {
            matchInfo.push({
              id: a.id,
              hLen,
              vLen: 1,
              type: a.type,
            });
          }
        }
      }
      c += hLen;
    }
  }
  for (let o = 0; o < w; o++) {
    let c = 0;
    while (c < w) {
      const m = z(p, c, o);
      if (!m) {
        c++;
        continue;
      }
      let vLen = 1;
      const n = [m];
      while (c + vLen < w) {
        const a = z(p, c + vLen, o);
        if (a && a.type === m.type && a.special !== "color-bomb") {
          n.push(a);
          vLen++;
        } else {
          break;
        }
      }
      if (vLen >= 3) {
        for (const a of n) {
          matchedIds.add(a.id);
          const j = matchInfo.find((M) => M.id === a.id);
          if (j) {
            j.vLen = Math.max(j.vLen, vLen);
          } else {
            matchInfo.push({
              id: a.id,
              hLen: 1,
              vLen,
              type: a.type,
            });
          }
        }
      }
      c += vLen;
    }
  }
  return {
    matchedIds,
    matchInfo,
  };
}
function Ze(p) {
  const d = Math.max(p.hLen, p.vLen);
  const b = Math.min(p.hLen, p.vLen);
  if (d >= 5) {
    return "color-bomb";
  }
  if (d === 4 && b === 1) {
    if (p.hLen === 4) {
      return "striped-h";
    }
    return "striped-v";
  }
  if (b >= 2 && d >= 3) {
    return "wrapped";
  }
  return "none";
}
function dt(grid, matchInfo, b) {
  const o = b === "h" ? matchInfo.filter((m) => m.hLen >= 3) : matchInfo.filter((m) => m.vLen >= 3);
  if (o.length === 0) {
    return;
  }
  const c = o.reduce((acc, item) => {
    if (Math.max(acc.hLen, acc.vLen) > Math.max(item.hLen, item.vLen)) {
      return acc;
    }
    return item;
  });
  return grid.find((m) => m.id === c.id);
}
function Et(grid, matchedIds, matchInfo) {
  const extra = new Set();
  let c = 0;
  for (const m of matchInfo) {
    const i = grid.find((a) => a.id === m.id);
    if (!i) {
      continue;
    }
    const n = Ze(m);
    if (n === "striped-h") {
      for (let a = 0; a < w; a++) {
        const j = z(grid, i.row, a);
        if (j && !matchedIds.has(j.id)) {
          extra.add(j.id);
        }
      }
      c += 200;
    } else if (n === "striped-v") {
      for (let a = 0; a < w; a++) {
        const j = z(grid, a, i.col);
        if (j && !matchedIds.has(j.id)) {
          extra.add(j.id);
        }
      }
      c += 200;
    } else if (n === "wrapped") {
      for (let a = -1; a <= 1; a++) {
        for (let j = -1; j <= 1; j++) {
          const M = z(grid, i.row + a, i.col + j);
          if (M && !matchedIds.has(M.id)) {
            extra.add(M.id);
          }
        }
      }
      c += 300;
    } else if (n === "color-bomb") {
      for (const a of grid) {
        if (a.type === i.type && !matchedIds.has(a.id)) {
          extra.add(a.id);
        }
      }
      c += 500;
    }
  }
  for (const m of matchedIds) {
    const i = grid.find((n) => n.id === m);
    if (i) {
      if (i.special === "striped-h") {
        for (let n = 0; n < w; n++) {
          const a = z(grid, i.row, n);
          if (a && !matchedIds.has(a.id)) {
            extra.add(a.id);
          }
        }
        c += 200;
      } else if (i.special === "striped-v") {
        for (let n = 0; n < w; n++) {
          const a = z(grid, n, i.col);
          if (a && !matchedIds.has(a.id)) {
            extra.add(a.id);
          }
        }
        c += 200;
      } else if (i.special === "wrapped") {
        for (let n = -2; n <= 2; n++) {
          for (let a = -2; a <= 2; a++) {
            const j = z(grid, i.row + n, i.col + a);
            if (j && !matchedIds.has(j.id)) {
              extra.add(j.id);
            }
          }
        }
        c += 300;
      } else if (i.special === "color-bomb") {
        for (const n of grid) {
          if (n.type === i.type && !matchedIds.has(n.id)) {
            extra.add(n.id);
          }
        }
        c += 500;
      }
    }
  }
  return {
    extra,
    points: c,
  };
}
function Be(p, d) {
  const b = [];
  for (let o = 0; o < w; o++) {
    const c = p.filter((n) => n.col === o).sort((n, a) => n.row - a.row);
    const m = [];
    for (let n = 0; n < c.length; n++) {
      m.push({
        ...c[n],
        row: w - 1 - (c.length - 1 - n),
      });
    }
    const i = w - c.length;
    for (let n = 0; n < i; n++) {
      const type = De();
      m.unshift({
        id: se(),
        type,
        row: n,
        col: o,
        special: "none",
        jelly: d?.jellyMap?.[n]?.[o] ? 2 : 0,
        cookie: d?.cookieMap?.[n]?.[o] || false,
      });
    }
    b.push(...m);
  }
  return b;
}
const EeComponent = ({ type, special, size = 52 }) => {
  const o = _[type];
  const c = At[type];
  const m = P[type];
  const i = c;
  const n = `${o}cc`;
  const a = special === "color-bomb";
  const j = ["#ff3385", "#ff6b35", "#ffd600", "#39ff14", "#00e5ff", "#a855f7", "#ff3385"];
  const M = [
    "M30,22 Q22,-2 26,12 Q30,22 30,22 M70,22 Q78,-2 74,12 Q70,22 70,22",
    "M30,30 Q15,15 25,25 Q30,30 30,30 M70,30 Q85,15 75,25 Q70,30 70,30",
    "M30,28 Q20,8 28,18 Q30,28 30,28 M70,28 Q80,8 72,18 Q70,28 70,28",
    "M25,35 Q15,18 22,28 Q25,35 25,35 M75,35 Q85,18 78,28 Q75,35 75,35",
    "M30,28 Q18,5 26,18 Q30,28 30,28 M70,28 Q82,5 74,18 Q70,28 70,28",
    "M28,26 Q12,0 24,14 Q28,26 28,26 M72,26 Q88,0 76,14 Q72,26 72,26",
    "M30,30 Q20,12 28,22 Q30,30 30,30 M70,30 Q80,12 72,22 Q70,30 70,30",
  ];
  const Q = "M50,45 C20,45 15,70 20,85 C25,105 40,108 50,108 C60,108 75,105 80,85 C85,70 80,45 50,45";
  const D = 78;
  const cy_1 = D - 4;
  const J = D + 8;
  const cy = D + 1;
  const ue = M[type] || M[0];
  const R = special !== "none";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 115"
      style={{
        filter: a
          ? "drop-shadow(0 0 10px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(255,214,0,0.6))"
          : R
            ? `drop-shadow(0 0 8px ${m}) drop-shadow(0 0 16px ${m})`
            : `drop-shadow(0 0 4px ${m})`,
        overflow: "visible",
        animation: R ? "specialFloat 2s ease-in-out infinite" : "candyFloat 3s ease-in-out infinite",
      }}
    >
      <defs>
        <radialGradient id={`bodyGrad${type}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={n} />
          <stop offset="60%" stopColor={o} />
          <stop offset="100%" stopColor={i} />
        </radialGradient>
        {a && (
          <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            {j.map((me, oe) => (
              <stop key={oe} offset={`${String((oe / (j.length - 1)) * 100)}%`} stopColor={me} />
            ))}
          </linearGradient>
        )}
        <radialGradient id={`earGrad${type}`} cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor={n} />
          <stop offset="100%" stopColor={i} />
        </radialGradient>
        {R && (
          <filter id={`glowFilter${type}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      <ellipse cx="50" cy="112" rx="28" ry="5" fill="rgba(0,0,0,0.3)" />
      <path d={Q} fill="rgba(0,0,0,0.2)" transform="translate(0, 3)" />
      <path d={ue} fill={`url(#earGrad${type})`} stroke={i} strokeWidth="1.5" />
      <path
        d={Q}
        fill={a ? "url(#rainbowGrad)" : `url(#bodyGrad${type})`}
        stroke={a ? "#fff" : i}
        strokeWidth="1.5"
      />
      <ellipse cx="50" cy="88" rx="18" ry="12" fill="rgba(255,255,255,0.35)" />
      <ellipse cx="28" cy={cy} rx="7" ry="4" fill="#ff8ac2" opacity="0.7" />
      <ellipse cx="72" cy={cy} rx="7" ry="4" fill="#ff8ac2" opacity="0.7" />
      <ellipse cx="36" cy={cy_1} rx="5.5" ry="7" fill="#222" />
      <ellipse cx="64" cy={cy_1} rx="5.5" ry="7" fill="#222" />
      <circle cx="38" cy={cy_1 - 2.5} r="2.2" fill="#fff" />
      <circle cx="66" cy={cy_1 - 2.5} r="2.2" fill="#fff" />
      <circle cx="34" cy={cy_1 + 2.5} r="1.2" fill="#fff" opacity="0.5" />
      <circle cx="62" cy={cy_1 + 2.5} r="1.2" fill="#fff" opacity="0.5" />
      <path
        d={`M42,${J} Q50,${J + 6} 58,${J}`}
        stroke="#222"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="50" cy={J - 3} rx="2.5" ry="1.8" fill="#ff8ac2" opacity="0.8" />
      {special === "striped-h" && (
        <>
          <line
            x1="10"
            y1="65"
            x2="90"
            y2="65"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.8"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="80"
            x2="90"
            y2="80"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.8"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="95"
            x2="90"
            y2="95"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.8"
            strokeLinecap="round"
          />
        </>
      )}
      {special === "striped-v" && (
        <>
          <line
            x1="30"
            y1="50"
            x2="30"
            y2="108"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.8"
            strokeLinecap="round"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="108"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.8"
            strokeLinecap="round"
          />
          <line
            x1="70"
            y1="50"
            x2="70"
            y2="108"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.8"
            strokeLinecap="round"
          />
        </>
      )}
      {special === "wrapped" && (
        <>
          <rect
            x="18"
            y="48"
            width="64"
            height="58"
            rx="12"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.9"
          />
          <circle
            cx="50"
            cy="77"
            r="32"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.6"
          />
        </>
      )}
      {special === "color-bomb" && (
        <>
          <circle cx="20" cy="55" r="3" fill="#fff" opacity="0.9" />
          <circle cx="80" cy="95" r="2.5" fill="#fff" opacity="0.9" />
          <circle cx="85" cy="50" r="2" fill="#ffd600" opacity="0.9" />
          <circle cx="15" cy="100" r="2.5" fill="#ff3385" opacity="0.9" />
          <polygon
            points="50,20 53,30 63,30 55,37 58,47 50,40 42,47 45,37 37,30 47,30"
            fill="#ffd600"
            opacity="0.9"
          />
        </>
      )}
    </svg>
  );
};
function TComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [m, setM] = React.useState("select");
  const [n, setN] = React.useState([]);
  const [j, setJ] = React.useState(null);
  const [Q, setQ] = React.useState(0);
  const [C, setC] = React.useState(1);
  const [ge, setGe] = React.useState(20);
  const [R, setR] = React.useState(null);
  const [oe, setOe] = React.useState(0);
  const [ve, setVe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("candycrush_best") || "0");
    } catch {
      return 0;
    }
  });
  const [ne, setNe] = React.useState([]);
  const [ie, setIe] = React.useState([]);
  const [le, setLe] = React.useState([]);
  const [xt, setXt] = React.useState({});
  const [gt, setGt] = React.useState(false);
  const [Oe, setOe_1] = React.useState("");
  const [reaction, setReaction] = React.useState("idle");
  const [Ne, setNe_1] = React.useState(null);
  const [ee, setEe] = React.useState(null);
  const [ze, setZe] = React.useState(false);
  const [Ue, setUe] = React.useState(false);
  const [mt, setMt] = React.useState(null);
  const [bt, setBt] = React.useState(false);
  const [ht, setHt] = React.useState([]);
  const [yt, setYt] = React.useState(new Set());
  const [jt, setJt] = React.useState(new Set());
  const [qe, setQe] = React.useState(null);
  const FRef = React.useRef(null);
  const IRef = React.useRef(0);
  const ZRef = React.useRef(0);
  const ARef = React.useRef(false);
  const HRef = React.useRef({});
  const LRef = React.useRef(null);
  const vtRef = React.useRef([]);
  const wtRef = React.useRef([]);
  const JeRef = React.useRef(0);
  const VRef = React.useRef(null);
  const URef = React.useRef(null);
  const $eRef = React.useRef([]);
  const WRef = React.useRef(null);
  React.useEffect(() => {
    $eRef.current = n;
  }, [n]);
  React.useEffect(() => {
    vtRef.current = ne;
  }, [ne]);
  React.useEffect(() => {
    wtRef.current = ie;
  }, [ie]);
  React.useEffect(() => {
    if (m !== "playing" || n.length === 0 || ARef.current) {
      return;
    }
    const { matchedIds } = We(n);
    if (matchedIds.size > 0) {
      ARef.current = true;
      setGt(true);
      ye([...n]).then(() => {
        ARef.current = false;
        setGt(false);
      });
    }
  }, [m, n.length]);
  const fe = React.useCallback(
    (t) => {
      playClick();
      const r = K.find((g) => g.id === t) || K[0];
      setC(t);
      setEe(r);
      setGe(r.moves);
      setR(r.timeLimit || null);
      setLe(r.goals);
      const s = {};
      for (const g of r.goals) {
        s[g.type + (g.color !== undefined ? `_${g.color}` : "")] = 0;
      }
      setXt(s);
      HRef.current = s;
      setQ(0);
      IRef.current = 0;
      setOe(0);
      ZRef.current = 0;
      setNe([]);
      setIe([]);
      setJ(null);
      setOe_1("");
      setNe_1(null);
      setReaction("happy");
      ARef.current = false;
      setGt(false);
      setZe(false);
      setUe(false);
      setHt([]);
      setBt(false);
      setMt(null);
      setYt(new Set());
      setJt(new Set());
      setQe(null);
      if (WRef.current) {
        clearTimeout(WRef.current);
      }
      const l = Bt(r);
      setN(l);
      setM("playing");
      if (LRef.current) {
        clearInterval(LRef.current);
      }
      if (r.timeLimit) {
        LRef.current = setInterval(() => {
          setR((g) => {
            if (g === null || g <= 1) {
              return (LRef.current && clearInterval(LRef.current), setTimeout(() => Re(false), 300), 0);
            }
            return g - 1;
          });
        }, 1000);
      }
    },
    [playClick],
  );
  React.useEffect(
    () => () => {
      if (LRef.current) {
        clearInterval(LRef.current);
      }
      if (VRef.current) {
        clearInterval(VRef.current);
      }
      if (URef.current) {
        clearInterval(URef.current);
      }
      if (JeRef.current) {
        cancelAnimationFrame(JeRef.current);
      }
      if (WRef.current) {
        clearTimeout(WRef.current);
      }
    },
    [],
  );
  React.useEffect(() => {
    if (VRef.current) {
      clearInterval(VRef.current);
    }
    if (ne.length !== 0) {
      VRef.current = setInterval(() => {
        setNe((t) =>
          t
            .map((r) => ({
              ...r,
              x: r.x + r.vx,
              y: r.y + r.vy,
              vy: r.vy + 0.35,
              life: r.life - 0.025,
              vx: r.vx * 0.98,
            }))
            .filter((r) => r.life > 0),
        );
      }, 20);
      return () => {
        if (VRef.current) {
          clearInterval(VRef.current);
        }
      };
    }
  }, [ne.length === 0]);
  React.useEffect(() => {
    if (URef.current) {
      clearInterval(URef.current);
    }
    if (ie.length !== 0) {
      URef.current = setInterval(() => {
        setIe((t) =>
          t
            .map((r) => ({
              ...r,
              y: r.y - 2,
              life: r.life - 0.015,
              scale: r.scale + 0.008,
              rotation: r.rotation + (r.text.includes("MEGA") ? 2 : 0),
            }))
            .filter((r) => r.life > 0),
        );
      }, 20);
      return () => {
        if (URef.current) {
          clearInterval(URef.current);
        }
      };
    }
  }, [ie.length === 0]);
  function te(t, r, s, l = 35, g = "circle", glow = true) {
    const X = [];
    for (let y = 0; y < l; y++) {
      const T = Math.random() * Math.PI * 2;
      const k = 2 + Math.random() * 12;
      const f = ["circle", "star", "diamond", "heart", "spark"];
      const size = 3 + Math.random() * 10;
      const life = 0.8 + Math.random() * 1.2;
      X.push({
        id: se(),
        x: t + (Math.random() - 0.5) * 20,
        y: r + (Math.random() - 0.5) * 20,
        vx: Math.cos(T) * k,
        vy: Math.sin(T) * k - 6,
        life,
        color: s,
        size,
        shape: g === "circle" ? f[Math.floor(Math.random() * f.length)] : g,
        glow,
      });
    }
    setNe((y) => [...y, ...X]);
  }
  function he(x, y, text, l) {
    setIe((g) => [
      ...g,
      {
        id: se(),
        x,
        y,
        text,
        life: 1.8,
        color: l,
        scale: 0.8,
        rotation: (Math.random() - 0.5) * 10,
      },
    ]);
  }
  function kt() {
    const t = [
      "#ff3385",
      "#ffd600",
      "#00e5ff",
      "#39ff14",
      "#a855f7",
      "#ff6b35",
      "#ffffff",
      "#ff99cc",
      "#66ffff",
    ];
    const r = Array.from({
      length: 160,
    }).map((s, l) => ({
      id: se(),
      x: Math.random() * 100,
      y: -10 - Math.random() * 30,
      color: t[l % t.length],
      delay: Math.random() * 3,
      speed: 1.5 + Math.random() * 5,
      size: 3 + Math.random() * 12,
    }));
    setHt(r);
    setTimeout(() => setHt([]), 10000);
  }
  function Re(t) {
    if (LRef.current) {
      clearInterval(LRef.current);
    }
    if (
      le.every((s) => {
        if (s.type === "score") {
          return IRef.current >= s.target;
        }
        const l = s.type + (s.color !== undefined ? `_${s.color}` : "");
        return (HRef.current[l] || 0) >= s.target;
      }) ||
      t
    ) {
      setM("levelcomplete");
      playWin();
      setVe((g) => {
        const S = Math.max(g, IRef.current);
        localStorage.setItem("candycrush_best", String(S));
        return S;
      });
      const s = lt[Math.floor(Math.random() * lt.length)];
      setNe_1(s);
      setReaction("celebrate");
      kt();
      setBt(true);
      setTimeout(() => setBt(false), 1500);
      const l = K.find((g) => g.id === C + 1);
      if (l) {
        setQe(l.id);
        WRef.current = setTimeout(() => {
          setM("transition");
          setTimeout(() => {
            fe(l.id);
          }, 1200);
        }, 3500);
      }
    } else {
      setM("gameover");
      playLose();
      setReaction("sad");
    }
  }
  async function ye(t) {
    let grid = [...t];
    let s = 0;
    let cascadeCount = 0;
    let g = {};
    let S = 0;
    let X = 0;
    let y = false;
    let T = new Set();
    while (cascadeCount < 15) {
      const { matchedIds, matchInfo } = We(grid);
      if (matchedIds.size === 0) {
        break;
      }
      cascadeCount++;
      T = new Set([...T, ...matchedIds]);
      setYt(new Set(matchedIds));
      await new Promise((resolve) => setTimeout(resolve, 180));
      setYt(new Set());
      const { extra, points } = Et(grid, matchedIds, matchInfo);
      s += points;
      const Y = new Set([...matchedIds, ...extra]);
      s += Y.size * 60 * cascadeCount;
      for (const u of Y) {
        const v = grid.find((E) => E.id === u);
        if (v) {
          g[v.type] = (g[v.type] || 0) + 1;
          if (v.jelly && v.jelly > 0) {
            S += 1;
          }
          if (v.cookie) {
            X += 1;
          }
        }
      }
      if (
        cascadeCount >= 3 &&
        !y &&
        ((y = true),
        setUe(true),
        setZe(true),
        setTimeout(() => {
          setUe(false);
          setZe(false);
        }, 600),
        FRef.current)
      ) {
        const u = FRef.current.getBoundingClientRect();
        const v = u.left + u.width / 2;
        const E = u.top + u.height / 2;
        for (const Fe of _) {
          te(v + (Math.random() - 0.5) * 200, E + (Math.random() - 0.5) * 200, Fe, 25, "star", true);
        }
        he(v, E - 50, "MEGA COMBO!", "#ffd600");
      }
      const ae = [];
      const G = dt(grid, matchInfo, "h");
      const B = dt(grid, matchInfo, "v");
      if (G) {
        const u = matchInfo.find((v) => v.id === G.id);
        if (u) {
          const v = Ze(u);
          if (v !== "none") {
            ae.push({
              row: G.row,
              col: G.col,
              special: v,
              type: G.type,
            });
          }
        }
      }
      if (B && (!G || B.id !== G.id)) {
        const u = matchInfo.find((v) => v.id === B.id);
        if (u) {
          const v = Ze(u);
          if (v !== "none") {
            ae.push({
              row: B.row,
              col: B.col,
              special: v,
              type: B.type,
            });
          }
        }
      }
      if (FRef.current) {
        const u = FRef.current.getBoundingClientRect();
        const v = u.width / w;
        const E = u.height / w;
        for (const Fe of Y) {
          const q = grid.find((pe) => pe.id === Fe);
          if (q) {
            const pe = u.left + q.col * v + v / 2;
            const Xe = u.top + q.row * E + E / 2;
            te(pe, Xe, _[q.type], 20, "circle", true);
            if (q.jelly && q.jelly > 0) {
              te(pe, Xe, "#ff88cc", 10, "diamond", true);
            }
            if (q.cookie) {
              te(pe, Xe, "#d4a373", 10, "star", true);
            }
          }
        }
      }
      const et = grid.filter((u) => !Y.has(u.id));
      let je = Be(et, ee || undefined);
      const tt = new Set();
      for (const u of je) {
        if (u.row < 3 && !et.find((v) => v.col === u.col && v.row === u.row)) {
          tt.add(u.id);
        }
      }
      setJt(tt);
      setTimeout(() => setJt(new Set()), 600);
      for (const u of ae) {
        const v = z(je, u.row, u.col);
        if (v) {
          v.special = u.special;
        } else {
          je.push({
            id: se(),
            type: u.type,
            row: u.row,
            col: u.col,
            special: u.special,
            jelly: ee?.jellyMap?.[u.row]?.[u.col] ? 2 : 0,
            cookie: ee?.cookieMap?.[u.row]?.[u.col] || false,
          });
        }
      }
      grid = je;
      if (cascadeCount >= 1 && ((ZRef.current += 1), setOe(ZRef.current), ZRef.current >= 2)) {
        const u = it[Math.min(ZRef.current - 2, it.length - 1)];
        setOe_1(u);
        setReaction("excited");
        setTimeout(() => {
          setReaction("happy");
          setOe_1("");
        }, 1200);
      }
      if (FRef.current) {
        const u = FRef.current.getBoundingClientRect();
        const v = u.left + u.width / 2;
        const E = u.top + u.height / 2 - 40;
        he(v, E, `+${Y.size * 60 * cascadeCount}`, "#ffd600");
      }
      setN(grid);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (cascadeCount > 0) {
      s = Math.floor(s * (1 + ZRef.current * 0.3));
      IRef.current += s;
      setQ(IRef.current);
      const k = {
        ...HRef.current,
      };
      for (const f of le) {
        const h = f.type + (f.color !== undefined ? `_${f.color}` : "");
        if (f.type === "score") {
          k[h] = IRef.current;
        } else if (f.type === "color" && f.color !== undefined) {
          k[h] = (k[h] || 0) + (g[f.color] || 0);
        } else if (f.type === "jelly") {
          k[h] = (k[h] || 0) + S;
        } else if (f.type === "cookie") {
          k[h] = (k[h] || 0) + X;
        }
      }
      HRef.current = k;
      setXt(k);
    }
    return {
      grid,
      points: s,
      cascadeCount,
    };
  }
  async function St(t, r) {
    if (ARef.current || gt || Math.abs(t.row - r.row) + Math.abs(t.col - r.col) !== 1) {
      return;
    }
    ARef.current = true;
    setGt(true);
    playClick();
    const $eRef_current = $eRef.current;
    const l = $eRef_current.map((y) => {
      if (y.id === t.id) {
        return {
          ...y,
          row: r.row,
          col: r.col,
        };
      }
      if (y.id === r.id) {
        return {
          ...y,
          row: t.row,
          col: t.col,
        };
      }
      return y;
    });
    setN(l);
    await new Promise((resolve) => setTimeout(resolve, 250));
    const g = l.find((y) => y.id === t.id);
    const S = l.find((y) => y.id === r.id);
    let X = false;
    if (g.special !== "none" && S.special !== "none") {
      const y = new Set();
      for (let f = -2; f <= 2; f++) {
        for (let h = -2; h <= 2; h++) {
          const N = z(l, g.row + f, g.col + h);
          if (N) {
            y.add(N.id);
          }
        }
      }
      for (let f = -2; f <= 2; f++) {
        for (let h = -2; h <= 2; h++) {
          const N = z(l, S.row + f, S.col + h);
          if (N) {
            y.add(N.id);
          }
        }
      }
      for (let f = 0; f < w; f++) {
        const h = z(l, g.row, f);
        if (h) {
          y.add(h.id);
        }
      }
      for (let f = 0; f < w; f++) {
        const h = z(l, f, g.col);
        if (h) {
          y.add(h.id);
        }
      }
      for (let f = 0; f < w; f++) {
        const h = z(l, S.row, f);
        if (h) {
          y.add(h.id);
        }
      }
      for (let f = 0; f < w; f++) {
        const h = z(l, f, S.col);
        if (h) {
          y.add(h.id);
        }
      }
      const T = l.filter((f) => !y.has(f.id));
      const k = Be(T, ee || undefined);
      setN(k);
      IRef.current += 2000 + y.size * 80;
      setQ(IRef.current);
      playCorrect();
      X = true;
      setZe(true);
      setUe(true);
      setTimeout(() => {
        setZe(false);
        setUe(false);
      }, 700);
      if (FRef.current) {
        const f = FRef.current.getBoundingClientRect();
        const h = f.left + f.width / 2;
        const N = f.top + f.height / 2;
        for (const Y of _) {
          te(h, N, Y, 35, "star", true);
        }
        he(h, N - 60, "MEGA BLAST!", "#ff3385");
      }
      await ye(k);
    }
    if (!X && (g.special === "color-bomb" || S.special === "color-bomb")) {
      const y = g.special === "color-bomb" ? g : S;
      const T = g.special === "color-bomb" ? S : g;
      const k = new Set();
      for (const N of l) {
        if (N.type === T.type) {
          k.add(N.id);
        }
      }
      k.add(y.id);
      const f = l.filter((N) => !k.has(N.id));
      const h = Be(f, ee || undefined);
      setN(h);
      IRef.current += 800 + k.size * 60;
      setQ(IRef.current);
      playCorrect();
      X = true;
      if (FRef.current) {
        const N = FRef.current.getBoundingClientRect();
        const Y = N.width / w;
        const ae = N.height / w;
        const G = N.left + y.col * Y + Y / 2;
        const B = N.top + y.row * ae + ae / 2;
        te(G, B, _[T.type], 45, "circle", true);
        he(G, B - 30, "COLOR BOMB!", _[T.type]);
      }
      await ye(h);
    }
    if (!X) {
      const { matchedIds } = We(l);
      if (matchedIds.size === 0) {
        playWrong();
        setN($eRef_current);
        setOe(0);
        ZRef.current = 0;
        setReaction("sad");
        setTimeout(() => setReaction("idle"), 700);
        ARef.current = false;
        setGt(false);
        return;
      }
      playCorrect();
      ZRef.current = 0;
      setOe(0);
      await ye(l);
    }
    setGe((y) => {
      const T = y - 1;
      if (T <= 0 && !ee?.timeLimit) {
        setTimeout(() => Re(false), 400);
      }
      return T;
    });
    ARef.current = false;
    setGt(false);
  }
  const Nt = (t) => {
    if (!(m !== "playing" || ARef.current)) {
      if (!j) {
        setJ(t);
        playClick();
        return;
      }
      if (j.id === t.id) {
        setJ(null);
        return;
      }
      St(j, t);
      setJ(null);
    }
  };
  React.useEffect(() => {
    if (m !== "playing") {
      return;
    }
    if (
      le.every((r) => {
        if (r.type === "score") {
          return IRef.current >= r.target;
        }
        const s = r.type + (r.color !== undefined ? `_${r.color}` : "");
        return (HRef.current[s] || 0) >= r.target;
      }) &&
      le.length > 0
    ) {
      Re(true);
    }
  }, [Q, xt, m]);
  const zt = (t) => {
    const r = t.type + (t.color !== undefined ? `_${t.color}` : "");
    return HRef.current[r] || 0;
  };
  const Mt = (t) => {
    if (t.type === "score") {
      return IRef.current >= t.target;
    }
    const r = t.type + (t.color !== undefined ? `_${t.color}` : "");
    return (HRef.current[r] || 0) >= t.target;
  };
  const Re1Component = ({ reaction, size = 160 }) => {
    const s = reaction === "celebrate";
    const l = reaction === "excited";
    const g = reaction === "sad";
    const S = reaction === "idle" || reaction === "happy";
    return (
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 200 240"
        className="drop-shadow-2xl"
        style={{
          filter: "drop-shadow(0 0 20px rgba(255,51,133,0.3))",
        }}
      >
        <ellipse cx="100" cy="225" rx="50" ry="12" fill="rgba(0,0,0,0.3)" />
        <ellipse cx="75" cy="210" rx="14" ry="20" fill="#ff8ac2" />
        <ellipse cx="125" cy="210" rx="14" ry="20" fill="#ff8ac2" />
        <ellipse cx="100" cy="180" rx="42" ry="38" fill="#ffc2e0" />
        <ellipse cx="100" cy="180" rx="35" ry="30" fill="#ffe0f0" />
        <circle cx="100" cy="195" r="4" fill="#ff8ac2" opacity="0.6" />
        <ellipse cx="55" cy="165" rx="18" ry="12" fill="#ff8ac2" transform="rotate(-20 55 165)" />
        <ellipse cx="145" cy="165" rx="18" ry="12" fill="#ff8ac2" transform="rotate(20 145 165)" />
        <circle cx="42" cy="178" r="10" fill="#ffe0f0" />
        <circle cx="158" cy="178" r="10" fill="#ffe0f0" />
        <circle cx="100" cy="110" r="55" fill="#ffe0f0" />
        <circle cx="100" cy="110" r="50" fill="#fff0f7" />
        <circle cx="50" cy="80" r="15" fill="#ff8ac2" />
        <circle cx="150" cy="80" r="15" fill="#ff8ac2" />
        <circle cx="50" cy="80" r="10" fill="#ffc2e0" />
        <circle cx="150" cy="80" r="10" fill="#ffc2e0" />
        <path d="M 85 60 Q 75 40 85 50 Q 100 30 115 50 Q 125 40 115 60" fill="#ff8ac2" />
        <path d="M 85 55 Q 75 45 80 60 Q 85 70 90 60 Q 95 50 85 55" fill="#ff3385" />
        <path d="M 115 55 Q 125 45 120 60 Q 115 70 110 60 Q 105 50 115 55" fill="#ff3385" />
        <circle cx="100" cy="58" r="5" fill="#ff3385" />
        <ellipse cx="65" cy="125" rx="10" ry="6" fill="#ff8ac2" opacity={g ? 0.2 : 0.5}>
          <animate
            attributeName="opacity"
            values={g ? "0.2;0.15;0.2" : "0.5;0.3;0.5"}
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="135" cy="125" rx="10" ry="6" fill="#ff8ac2" opacity={g ? 0.2 : 0.5}>
          <animate
            attributeName="opacity"
            values={g ? "0.2;0.15;0.2" : "0.5;0.3;0.5"}
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        {g ? (
          <>
            <ellipse cx="75" cy="108" rx="8" ry="10" fill="#333" />
            <ellipse cx="125" cy="108" rx="8" ry="10" fill="#333" />
            <circle cx="68" cy="120" r="3" fill="#00e5ff" opacity="0.7">
              <animate attributeName="cy" values="120;140" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="132" cy="120" r="3" fill="#00e5ff" opacity="0.7">
              <animate attributeName="cy" values="120;140" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </>
        ) : (
          <>
            <ellipse cx="75" cy="108" rx={s || l ? 9 : 7} ry={s || l ? 11 : 9} fill="#333" />
            <ellipse cx="125" cy="108" rx={s || l ? 9 : 7} ry={s || l ? 11 : 9} fill="#333" />
            <circle cx="78" cy="104" r="3" fill="#fff" />
            <circle cx="128" cy="104" r="3" fill="#fff" />
            <circle cx="73" cy="112" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="123" cy="112" r="1.5" fill="#fff" opacity="0.6" />
            {S && (
              <>
                <rect x="60" y="100" width="30" height="20" fill="#fff0f7">
                  <animate
                    attributeName="height"
                    values="20;0;20"
                    dur="4s"
                    begin="0.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="100;110;100"
                    dur="4s"
                    begin="0.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="110" y="100" width="30" height="20" fill="#fff0f7">
                  <animate
                    attributeName="height"
                    values="20;0;20"
                    dur="4s"
                    begin="0.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values="100;110;100"
                    dur="4s"
                    begin="0.5s"
                    repeatCount="indefinite"
                  />
                </rect>
              </>
            )}
          </>
        )}
        {g ? (
          <path
            d="M 90 135 Q 100 125 110 135"
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        ) : s ? (
          <path
            d="M 82 132 Q 100 155 118 132"
            stroke="#333"
            strokeWidth="3"
            fill="#ff8ac2"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M 88 135 Q 100 145 112 135"
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}
        {(l || s) && (
          <>
            <polygon points="50,70 53,78 61,78 55,83 57,91 50,86 43,91 45,83 39,78 47,78" fill="#ffd600">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 50 80;360 50 80"
                dur="3s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="150,70 153,78 161,78 155,83 157,91 150,86 143,91 145,83 139,78 147,78"
              fill="#ffd600"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 150 80;-360 150 80"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </polygon>
            <circle cx="40" cy="95" r="3" fill="#00e5ff">
              <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="160" cy="95" r="3" fill="#ff3385">
              <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    );
  };
  switch (m) {
    case "select":
      return (
        <StarfieldBackground>
          <SoundToggles />
          <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
            <div
              className="fixed inset-0 pointer-events-none overflow-hidden"
              style={{
                zIndex: 0,
              }}
            >
              {Array.from({
                length: 20,
              }).map((t, r) => (
                <div
                  key={r}
                  className="absolute rounded-full opacity-25"
                  style={{
                    left: `${String((r * 7.3) % 100)}%`,
                    top: `${String((r * 13.7) % 100)}%`,
                    width: `${String(60 + ((r * 17) % 120))}px`,
                    height: `${String(60 + ((r * 17) % 120))}px`,
                    background: `radial-gradient(circle, ${P[r % 7]}, transparent)`,
                    animation: `floatCloud ${String(8 + (r % 8))}s ease-in-out infinite`,
                    animationDelay: `${String((r * 0.7) % 5)}s`,
                    filter: "blur(1px)",
                    transform: `perspective(500px) translateZ(${String(20 + (r % 30))}px)`,
                  }}
                />
              ))}
              {Array.from({
                length: 40,
              }).map((t, r) => (
                <div
                  key={`star-${r}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${String((r * 3.7) % 100)}%`,
                    top: `${String((r * 5.3) % 100)}%`,
                    width: `${String(2 + (r % 4))}px`,
                    height: `${String(2 + (r % 4))}px`,
                    background: "#fff",
                    opacity: 0.3 + (r % 5) * 0.1,
                    animation: `starTwinkle ${String(1 + (r % 3))}s ease-in-out infinite`,
                    animationDelay: `${String((r * 0.3) % 3)}s`,
                    boxShadow: `0 0 ${String(4 + (r % 6))}px rgba(255,255,255,0.5)`,
                  }}
                />
              ))}
              {Array.from({
                length: 6,
              }).map((t, r) => (
                <div
                  key={`deco-${r}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${String((r * 16.7) % 100)}%`,
                    top: `${String((r * 23.3) % 100)}%`,
                    opacity: 0.12,
                    animation: `floatCandy ${String(10 + (r % 8))}s ease-in-out infinite`,
                    animationDelay: `${String((r * 1.5) % 6)}s`,
                    transform: `scale(${String(0.6 + (r % 3) * 0.2)})`,
                    filter: `drop-shadow(0 0 20px ${P[r % 7]})`,
                  }}
                >
                  <EeComponent type={r % 7} special="none" size={40 + (r % 3) * 15} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <Link
                to="/juegos"
                className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
                style={{
                  textShadow: "0 0 10px rgba(0,228,255,0.3)",
                }}
              >
                <ArrowLeftIcon size={16} /> Volver
              </Link>
            </div>
            <div className="text-center mb-10 relative z-10">
              <div
                className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-4 animate-bounce"
                style={{
                  background: "linear-gradient(145deg, #ff3385, #ffd600)",
                  boxShadow:
                    "0 12px 40px rgba(255,51,133,0.4), inset 0 4px 12px rgba(255,255,255,0.3), inset 0 -4px 12px rgba(0,0,0,0.2), 0 0 60px rgba(255,51,133,0.3)",
                  transform: "rotateX(15deg)",
                  perspective: "800px",
                }}
              >
                <CandyIcon size={48} className="text-white drop-shadow-lg" />
              </div>
              <h1
                className="text-4xl md:text-6xl font-black mb-3"
                style={{
                  textShadow:
                    "0 0 40px rgba(255,51,133,0.5), 0 4px 8px rgba(0,0,0,0.3), 0 0 80px rgba(0,229,255,0.2)",
                  background: "linear-gradient(135deg, #ff3385, #ffd600, #00e5ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,51,133,0.3))",
                }}
              >
                Candy Crush Español
              </h1>
              <p className="text-white/40 text-sm font-medium">
                ¡Match-3 espectacular! Intercambia mascotas kawaii, completa objetivos y aprende palabras
              </p>
              <div className="mt-4 flex justify-center">
                <Re1Component reaction="idle" size={120} />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto relative z-10">
              {K.map((t) => {
                const r = !!t.timeLimit;
                return (
                  <div key={t.id} className="group relative">
                    <div
                      className="absolute -inset-[3px] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, #ff3385, #ffd600, #00e5ff, #39ff14)",
                        backgroundSize: "300% 300%",
                        animation: "gradientRotate 3s linear infinite",
                        filter: "blur(8px)",
                        zIndex: 0,
                        transform: "perspective(500px) rotateX(2deg)",
                        boxShadow: "0 0 30px rgba(255,51,133,0.4)",
                      }}
                    />
                    <button
                      onClick={() => fe(t.id)}
                      className="relative z-10 rounded-2xl p-4 text-center transition-all hover:scale-105 hover:-translate-y-1 w-full overflow-hidden"
                      style={{
                        background: "rgba(14,22,64,.7)",
                        border: "1px solid rgba(255,255,255,.15)",
                        transformStyle: "preserve-3d",
                        boxShadow:
                          "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 rgba(0,0,0,0)",
                        transition: "box-shadow 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={(s) => {
                        s.currentTarget.style.transform =
                          "rotateY(12deg) rotateX(12deg) scale(1.08) translateY(-8px) translateZ(20px)";
                        s.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 40px ${P[t.id % 7]}, inset 0 1px 0 rgba(255,255,255,0.1)`;
                      }}
                      onMouseLeave={(s) => {
                        s.currentTarget.style.transform = "";
                        s.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 rgba(0,0,0,0)";
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                        style={{
                          background: r
                            ? "linear-gradient(135deg, #ff6b35, #ffd600)"
                            : "linear-gradient(135deg, #ff3385, #ffd600)",
                        }}
                      />
                      <div
                        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-black text-lg relative"
                        style={{
                          background: `linear-gradient(135deg, ${_[t.id % 7]}, ${_[(t.id + 2) % 7]})`,
                          boxShadow: `0 0 20px ${P[t.id % 7]}, inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,.3)`,
                        }}
                      >
                        {t.id}
                        <div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white opacity-40"
                          style={{
                            boxShadow: "0 0 6px rgba(255,255,255,0.5)",
                          }}
                        />
                      </div>
                      <h3 className="text-white font-black text-sm mb-1">Nivel {t.id}</h3>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {r && <ClockIcon size={10} className="text-[#ff6b35]" />}
                        <span className="text-[10px] font-bold text-white/50">
                          {t.moves} movs{r ? ` / ${t.timeLimit}s` : ""}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {t.goals.slice(0, 2).map((s, l) => (
                          <div
                            key={l}
                            className="text-[9px] font-bold px-2 py-1 rounded-full inline-block"
                            style={{
                              background: "rgba(255,255,255,.08)",
                              color: "rgba(255,255,255,.6)",
                            }}
                          >
                            {s.label}
                          </div>
                        ))}
                      </div>
                      {t.id > 15 && (
                        <div className="absolute top-1 right-1">
                          <FlameIcon size={12} className="text-[#ff6b35] animate-pulse" />
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10 relative z-10">
              <p className="text-white/30 text-xs font-medium">
                Mejor puntuación:{" "}
                <span
                  className="text-[#ffd600] font-bold text-lg"
                  style={{
                    textShadow: "0 0 15px rgba(255,214,0,0.5)",
                  }}
                >
                  {ve.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </StarfieldBackground>
      );
    case "transition":
      return (
        <StarfieldBackground>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="text-center p-10 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
                border: "1px solid rgba(255,214,0,.3)",
                boxShadow:
                  "0 0 60px rgba(255,214,0,.15), inset 0 0 40px rgba(255,214,0,0.05), 0 24px 80px rgba(0,0,0,.5)",
                transformStyle: "preserve-3d",
                transform: "perspective(800px) rotateX(2deg)",
                animation: "cardLift 0.6s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-80"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff3385, #00e5ff, #ffd600)",
                  backgroundSize: "300% 300%",
                  animation: "gradientRotate 3s linear infinite",
                  filter: "blur(25px)",
                }}
              />
              <div
                className="flex justify-center mb-4"
                style={{
                  animation: "charBounce 1.2s ease-in-out infinite",
                }}
              >
                <Re1Component reaction="celebrate" size={100} />
              </div>
              <ChevronRightIcon
                size={48}
                className="text-[#ffd600] mx-auto mb-2 animate-bounce"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.5))",
                }}
              />
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff3385)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,.3))",
                }}
              >
                ¡Nivel {C} completado!
              </h2>
              <p className="text-white/60 text-sm font-bold">Preparando nivel {qe}...</p>
              <div className="mt-6 flex justify-center gap-1">
                {[0, 1, 2].map((t) => (
                  <div
                    key={t}
                    className="w-3 h-3 rounded-full bg-[#ffd600] animate-pulse"
                    style={{
                      animationDelay: `${String(t * 0.2)}s`,
                      filter: "drop-shadow(0 0 6px rgba(255,214,0,0.6))",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </StarfieldBackground>
      );
    default:
      return (
        <StarfieldBackground>
          <SoundToggles />
          <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{
              zIndex: 0,
            }}
          >
            {Array.from({
              length: 16,
            }).map((t, r) => (
              <div
                key={r}
                className="absolute rounded-full opacity-20"
                style={{
                  left: `${String((r * 11.3) % 100)}%`,
                  top: `${String((r * 17.7) % 100)}%`,
                  width: `${String(80 + ((r * 23) % 150))}px`,
                  height: `${String(80 + ((r * 23) % 150))}px`,
                  background: `radial-gradient(circle, ${P[r % 7]}, transparent)`,
                  animation: `floatCloud ${String(10 + (r % 10))}s ease-in-out infinite`,
                  animationDelay: `${String((r * 0.9) % 5)}s`,
                  filter: "blur(2px)",
                  transform: `perspective(600px) translateZ(${String(30 + (r % 40))}px)`,
                }}
              />
            ))}
            {Array.from({
              length: 50,
            }).map((t, r) => (
              <div
                key={`star-${r}`}
                className="absolute rounded-full"
                style={{
                  left: `${String((r * 4.1) % 100)}%`,
                  top: `${String((r * 6.3) % 100)}%`,
                  width: `${String(2 + (r % 3))}px`,
                  height: `${String(2 + (r % 3))}px`,
                  background: "#fff",
                  opacity: 0.3 + (r % 5) * 0.1,
                  animation: `starTwinkle ${String(1 + (r % 3))}s ease-in-out infinite`,
                  animationDelay: `${String((r * 0.4) % 3)}s`,
                  boxShadow: `0 0 ${String(3 + (r % 5))}px rgba(255,255,255,0.6)`,
                }}
              />
            ))}
            {Array.from({
              length: 8,
            }).map((t, r) => (
              <div
                key={`pet-${r}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${String((r * 16.7) % 100)}%`,
                  top: `${String((r * 23.3) % 100)}%`,
                  opacity: 0.08,
                  animation: `floatCandy ${String(12 + (r % 8))}s ease-in-out infinite`,
                  animationDelay: `${String((r * 1.5) % 6)}s`,
                  transform: `scale(${String(0.6 + (r % 3) * 0.2)})`,
                }}
              >
                <EeComponent type={r % 7} special="none" size={40 + (r % 3) * 15} />
              </div>
            ))}
          </div>
          {Ue && (
            <div
              className="fixed inset-0 pointer-events-none z-50"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent)",
                animation: "megaFlash 0.6s ease-out forwards",
              }}
            />
          )}
          {ze && !Ue && (
            <div
              className="fixed inset-0 pointer-events-none z-40"
              style={{
                background: "radial-gradient(circle, rgba(239,68,68,0.3), transparent 70%)",
                animation: "redFlash 0.5s ease-out forwards",
                mixBlendMode: "screen",
              }}
            />
          )}
          {bt && (
            <div
              className="fixed inset-0 pointer-events-none z-50"
              style={{
                background: "radial-gradient(circle, rgba(255,215,0,0.6), rgba(255,215,0,0.3), transparent)",
                animation: "goldenFlash 1.2s ease-out forwards",
              }}
            />
          )}
          <div className="max-w-5xl mx-auto px-4 py-3 min-h-screen relative z-10">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <Link
                to="/juegos"
                className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
                style={{
                  textShadow: "0 0 10px rgba(0,228,255,0.3)",
                }}
              >
                <ArrowLeftIcon size={16} /> Volver
              </Link>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    if (LRef.current) {
                      clearInterval(LRef.current);
                    }
                    setM("select");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,.2), 0 0 15px rgba(255,255,255,0.05)",
                    transform: "perspective(400px) rotateX(3deg)",
                  }}
                >
                  <LayersIcon size={12} /> Niveles
                </button>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{
                    background: "rgba(255,51,133,.12)",
                    border: "1px solid rgba(255,51,133,.25)",
                    color: "#ff3385",
                    boxShadow: "0 0 20px rgba(255,51,133,0.3), 0 4px 12px rgba(0,0,0,.2)",
                    transform: "perspective(400px) rotateX(3deg)",
                  }}
                >
                  <CandyIcon size={12} /> Nivel {C}
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{
                    background: "rgba(0,229,255,.12)",
                    border: "1px solid rgba(0,229,255,.25)",
                    color: "#00e5ff",
                    boxShadow: "0 0 20px rgba(0,229,255,0.3), 0 4px 12px rgba(0,0,0,.2)",
                    transform: "perspective(400px) rotateX(3deg)",
                  }}
                >
                  <MousePointer2Icon size={12} /> {ge} movs
                </div>
                {R !== null && (
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${R <= 10 ? "animate-pulse" : ""}`}
                    style={{
                      background: R <= 10 ? "rgba(255,51,51,.2)" : "rgba(255,107,53,.12)",
                      border: R <= 10 ? "1px solid rgba(255,51,51,.5)" : "1px solid rgba(255,107,53,.25)",
                      color: R <= 10 ? "#ff3333" : "#ff6b35",
                      boxShadow:
                        R <= 10
                          ? "0 0 25px rgba(255,51,51,0.5), 0 4px 12px rgba(0,0,0,.2)"
                          : "0 0 20px rgba(255,107,53,0.3), 0 4px 12px rgba(0,0,0,.2)",
                      transform: "perspective(400px) rotateX(3deg)",
                    }}
                  >
                    <ClockIcon size={12} /> {R}s
                  </div>
                )}
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{
                    background: "rgba(255,214,0,.12)",
                    border: "1px solid rgba(255,214,0,.25)",
                    color: "#ffd600",
                    boxShadow: "0 0 20px rgba(255,214,0,0.3), 0 4px 12px rgba(0,0,0,.2)",
                    transform: "perspective(400px) rotateX(3deg)",
                  }}
                >
                  <ZapIcon size={12} /> {Q.toLocaleString()}
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{
                    background: "rgba(57,255,20,.12)",
                    border: "1px solid rgba(57,255,20,.25)",
                    color: "#39ff14",
                    boxShadow: "0 0 20px rgba(57,255,20,0.3), 0 4px 12px rgba(0,0,0,.2)",
                    transform: "perspective(400px) rotateX(3deg)",
                  }}
                >
                  <FlameIcon size={12} /> x{oe}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {le.map((t, r) => {
                const s = Mt(t);
                const l = t.type === "score" ? Q : zt(t);
                const g =
                  t.type === "score"
                    ? Math.min(100, (Q / t.target) * 100)
                    : Math.min(100, (l / t.target) * 100);
                return (
                  <div
                    key={r}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold flex flex-col gap-1 min-w-[130px]"
                    style={{
                      background: s ? "rgba(57,255,20,.12)" : "rgba(255,255,255,.06)",
                      border: s ? "1px solid rgba(57,255,20,.3)" : "1px solid rgba(255,255,255,.12)",
                      boxShadow: s
                        ? "0 0 20px rgba(57,255,20,0.3), 0 4px 12px rgba(0,0,0,.3)"
                        : "0 4px 12px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,0.05)",
                      transform: "perspective(500px) rotateX(2deg)",
                      transformStyle: "preserve-3d",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          color: s ? "#39ff14" : "rgba(255,255,255,.6)",
                        }}
                      >
                        {t.label}
                      </span>
                      {s && <StarIcon size={10} className="text-[#39ff14]" />}
                    </div>
                    <div
                      className="h-2.5 rounded-full overflow-hidden relative"
                      style={{
                        background: "rgba(255,255,255,.08)",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,.3)",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500 relative"
                        style={{
                          width: `${String(g)}%`,
                          background: s
                            ? "linear-gradient(90deg, #39ff14, #00e5ff)"
                            : "linear-gradient(90deg, #ff3385, #ffd600)",
                          boxShadow: s
                            ? "0 0 20px rgba(57,255,20,0.8), 0 0 40px rgba(57,255,20,0.4)"
                            : "0 0 15px rgba(255,51,133,0.6), 0 0 30px rgba(255,51,133,0.3)",
                        }}
                      >
                        {g > 10 && (
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                              animation: "shimmerSlide 1.5s ease-in-out infinite",
                            }}
                          />
                        )}
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mb-2">
              <h1
                className="text-3xl md:text-4xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #ff3385, #ffd600, #00e5ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(255,51,133,.4))",
                }}
              >
                Candy Crush
              </h1>
              {Oe && (
                <div
                  className="text-2xl font-black mt-1"
                  style={{
                    color: "#ffd600",
                    textShadow:
                      "0 0 20px rgba(255,214,0,.9), 0 0 40px rgba(255,51,133,.5), 0 0 60px rgba(0,229,255,.4)",
                    animation: "comboPop3D 0.6s ease-out forwards",
                    transform: "perspective(500px) rotateX(8deg) rotateZ(-3deg)",
                    transformStyle: "preserve-3d",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,.5))",
                  }}
                >
                  {Oe}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex justify-center relative">
                <div
                  className="absolute -inset-[6px] rounded-[32px] z-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #ff3385, #ffd600, #00e5ff, #39ff14, #a855f7, #ff3385)",
                    backgroundSize: "400% 400%",
                    animation: "gradientRotate 4s linear infinite",
                    filter: "blur(6px)",
                    opacity: 0.9,
                    transform: "perspective(1000px) rotateX(3deg)",
                  }}
                />
                <div
                  className="absolute -inset-[6px] rounded-[32px] z-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #ff3385, #ffd600, #00e5ff, #39ff14, #a855f7, #ff3385)",
                    backgroundSize: "400% 400%",
                    animation: "gradientRotate 4s linear infinite",
                    opacity: 0.5,
                    transform: "perspective(1000px) rotateX(3deg)",
                  }}
                />
                <div
                  className="absolute -inset-[3px] rounded-[26px] z-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,51,133,0.3), rgba(0,229,255,0.3))",
                    opacity: 0.6,
                    filter: "blur(2px)",
                    transform: "perspective(1000px) rotateX(3deg)",
                  }}
                />
                <div
                  ref={FRef}
                  className="relative grid gap-1.5 p-4 rounded-[22px] select-none z-10"
                  style={{
                    gridTemplateColumns: `repeat(${w}, 1fr)`,
                    background: "linear-gradient(180deg, rgba(20,28,70,.95), rgba(8,12,35,.9))",
                    border: "2px solid rgba(255,255,255,.2)",
                    boxShadow: ze
                      ? "0 0 100px rgba(255,51,133,.5), 0 24px 70px rgba(0,0,0,.5), inset 0 0 50px rgba(255,51,133,0.15), 0 0 120px rgba(255,51,133,0.2)"
                      : "0 0 60px rgba(255,51,133,.3), 0 24px 70px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px rgba(0,229,255,0.1)",
                    width: "min(96vw, 520px)",
                    height: "min(96vw, 520px)",
                    animation: ze ? "shakeBoard 0.5s ease-in-out" : "none",
                    transform: "perspective(1000px) rotateX(3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-[22px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,51,133,0.12), transparent, rgba(0,229,255,0.12))",
                      mixBlendMode: "screen",
                    }}
                  />
                  {n.map((t) => {
                    const r = j?.id === t.id;
                    const s = mt === t.id;
                    const l = yt.has(t.id);
                    const g = jt.has(t.id);
                    const S = t.special !== "none";
                    return (
                      <button
                        key={t.id}
                        onClick={() => Nt(t)}
                        onMouseEnter={() => setMt(t.id)}
                        onMouseLeave={() => setMt(null)}
                        className="relative flex items-center justify-center transition-all duration-200 rounded-xl overflow-hidden"
                        style={{
                          aspectRatio: "1",
                          border: r
                            ? "3px solid #fff"
                            : t.special === "color-bomb"
                              ? "2px solid rgba(255,214,0,0.9)"
                              : "1px solid rgba(255,255,255,.12)",
                          boxShadow: r
                            ? "0 0 40px rgba(255,255,255,0.7), 0 8px 24px rgba(0,0,0,.5), 0 0 80px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.2)"
                            : s
                              ? `0 0 30px rgba(255,255,255,0.5), 0 8px 24px rgba(0,0,0,.5), 0 0 60px ${P[t.type]}, inset 0 0 15px rgba(255,255,255,0.15), 0 12px 30px rgba(0,0,0,0.4)`
                              : S
                                ? `0 0 16px ${P[t.type]}, 0 3px 8px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,0.05)`
                                : "0 3px 8px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                          background: l ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.04)",
                          transform: l
                            ? "scale(1.35) translateY(-16px) translateZ(60px) rotateZ(15deg)"
                            : s
                              ? "perspective(500px) rotateX(15deg) rotateY(-15deg) translateZ(40px) scale(1.15)"
                              : g
                                ? "translateY(0) scale(1)"
                                : "perspective(500px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)",
                          zIndex: s || l ? 20 : 1,
                          animation: l
                            ? "matchGlow 0.25s ease-in-out, matchPop 0.25s ease-in-out, matchExplosion 0.25s ease-in-out"
                            : g
                              ? "tileDropBounce 0.6s ease-out"
                              : S
                                ? "tileFloat 2s ease-in-out infinite"
                                : "tileFloat 3s ease-in-out infinite",
                          animationDelay: S && !l && !g ? `${String((t.row * t.col * 0.1) % 2)}s` : "0s",
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
                            zIndex: 1,
                          }}
                        />
                        {S && (
                          <div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              background:
                                t.special === "color-bomb"
                                  ? "radial-gradient(circle, rgba(255,214,0,0.55), transparent 70%)"
                                  : "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
                              animation: "haloPulse 1.2s ease-in-out infinite",
                              zIndex: 0,
                            }}
                          />
                        )}
                        {(t.special === "striped-h" || t.special === "striped-v") && (
                          <div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              border: "2px dashed rgba(255,255,255,0.4)",
                              animation: "specialRotate 3s linear infinite",
                              zIndex: 2,
                            }}
                          />
                        )}
                        {t.special === "wrapped" && (
                          <div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              border: "2px dotted rgba(255,255,255,0.5)",
                              animation: "wrappedPulse 1.5s ease-in-out infinite",
                              zIndex: 2,
                            }}
                          />
                        )}
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${P[t.type]} 0%, transparent 70%)`,
                            opacity: s ? 0.7 : l ? 0.9 : 0.3,
                            transition: "opacity 0.2s ease",
                            zIndex: 0,
                          }}
                        />
                        <div
                          style={{
                            transform: l ? "scale(1.3) translateZ(30px) rotateZ(20deg)" : "scale(1)",
                            transition: "transform 0.2s ease",
                            filter: l
                              ? `drop-shadow(0 0 20px ${P[t.type]}) brightness(1.8)`
                              : "drop-shadow(0 2px 4px rgba(0,0,0,.3))",
                            zIndex: 3,
                          }}
                        >
                          <EeComponent type={t.type} special={t.special} size={52} />
                        </div>
                        {t.jelly && t.jelly > 0 && (
                          <div
                            className="absolute bottom-0.5 right-0.5 text-[8px] font-black px-1 rounded-full"
                            style={{
                              background: t.jelly === 2 ? "rgba(255,51,133,0.85)" : "rgba(255,136,204,0.7)",
                              color: "#fff",
                              boxShadow: "0 0 8px rgba(255,51,133,0.5), 0 2px 4px rgba(0,0,0,.3)",
                              zIndex: 4,
                            }}
                          >
                            {t.jelly}
                          </div>
                        )}
                        {t.cookie && (
                          <div
                            className="absolute top-0.5 left-0.5"
                            style={{
                              zIndex: 4,
                            }}
                          >
                            <LockIcon size={10} className="text-[#d4a373]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {ne.map((t) => {
              const r =
                t.shape === "star"
                  ? {
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    }
                  : t.shape === "diamond"
                    ? {
                        transform: `rotate(45deg) scale(${t.life})`,
                      }
                    : t.shape === "heart"
                      ? {
                          clipPath:
                            "polygon(50% 15%, 61% 0%, 80% 0%, 100% 20%, 100% 40%, 50% 100%, 0% 40%, 0% 20%, 20% 0%, 39% 0%)",
                        }
                      : t.shape === "spark"
                        ? {
                            clipPath:
                              "polygon(50% 0%, 55% 40%, 100% 50%, 55% 60%, 50% 100%, 45% 60%, 0% 50%, 45% 40%)",
                          }
                        : {
                            borderRadius: "50%",
                          };
              return (
                <div
                  key={t.id}
                  className="fixed pointer-events-none"
                  style={{
                    left: t.x,
                    top: t.y,
                    width: t.size,
                    height: t.size,
                    background: t.color,
                    boxShadow: t.glow
                      ? `0 0 ${t.size * 3}px ${t.color}, 0 0 ${t.size * 6}px ${t.color}, 0 0 ${t.size * 10}px ${t.color}`
                      : "none",
                    opacity: t.life,
                    zIndex: 9999,
                    ...r,
                  }}
                />
              );
            })}
            {ie.map((t) => (
              <div
                key={t.id}
                className="fixed pointer-events-none font-black"
                style={{
                  left: t.x,
                  top: t.y,
                  color: t.color,
                  opacity: t.life,
                  textShadow: `0 0 20px ${t.color}, 0 0 40px ${t.color}, 0 0 60px ${t.color}, 0 0 80px ${t.color}, 0 4px 8px rgba(0,0,0,.5)`,
                  zIndex: 9999,
                  transform: `translateX(-50%) scale(${t.scale}) rotate(${t.rotation}deg) rotateX(${t.text.includes("MEGA") ? 20 : 12}deg)`,
                  transformStyle: "preserve-3d",
                  fontSize: t.text.includes("MEGA") ? "2.4rem" : "1.8rem",
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))",
                  animation: "scoreFloat3D 0.3s ease-out",
                }}
              >
                {t.text}
              </div>
            ))}
            {ht.map((t) => {
              const r = t.id % 3 === 0;
              const s = t.id % 3 === 1;
              return (
                <div
                  key={t.id}
                  className="fixed pointer-events-none z-[9999]"
                  style={{
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    width: t.size,
                    height: r ? t.size * 0.6 : t.size,
                    background: t.color,
                    borderRadius: s ? "50%" : r ? "2px" : "0",
                    clipPath:
                      !r && !s
                        ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                        : "none",
                    animation: `confettiFall ${t.speed}s linear ${t.delay}s infinite`,
                    opacity: 0.8,
                    transform: `rotate(${t.id * 30}deg)`,
                    boxShadow: `0 0 10px ${t.color}`,
                  }}
                />
              );
            })}
            {m === "levelcomplete" && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center"
                style={{
                  background: "rgba(3,4,17,.88)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
                    border: "1px solid rgba(57,255,20,.3)",
                    boxShadow:
                      "0 0 60px rgba(57,255,20,.15), inset 0 0 40px rgba(57,255,20,0.05), 0 24px 80px rgba(0,0,0,.5)",
                    transformStyle: "preserve-3d",
                    transform: "perspective(800px) rotateX(2deg)",
                    animation: "cardLift 0.6s ease-out",
                  }}
                >
                  <div
                    className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-80"
                    style={{
                      background: "linear-gradient(135deg, #39ff14, #00e5ff, #ffd600, #39ff14)",
                      backgroundSize: "300% 300%",
                      animation: "gradientRotate 3s linear infinite",
                      filter: "blur(25px)",
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    {Array.from({
                      length: 30,
                    }).map((t, r) => (
                      <div
                        key={r}
                        className="absolute pointer-events-none"
                        style={{
                          left: `${String((r * 3.7) % 100)}%`,
                          top: `${String((r * 5.3) % 100)}%`,
                          width: `${String(4 + (r % 8))}px`,
                          height: `${String(4 + (r % 8))}px`,
                          background: ["#ff3385", "#ffd600", "#00e5ff", "#39ff14", "#a855f7"][r % 5],
                          clipPath:
                            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                          animation: `confettiFall ${String(2 + (r % 3))}s ease-in infinite`,
                          animationDelay: `${String((r * 0.2) % 2)}s`,
                          opacity: 0.7,
                          boxShadow: `0 0 10px ${["#ff3385", "#ffd600", "#00e5ff", "#39ff14", "#a855f7"][r % 5]}`,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className="flex justify-center mb-4"
                    style={{
                      animation: "charBounce 1s ease-in-out infinite",
                    }}
                  >
                    <Re1Component reaction="celebrate" size={100} />
                  </div>
                  <PartyPopperIcon
                    size={56}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 16px",
                      filter: "drop-shadow(0 0 15px rgba(57,255,20,.5))",
                    }}
                  />
                  <h2
                    className="text-3xl font-black mb-2"
                    style={{
                      background: "linear-gradient(135deg, #39ff14, #00e5ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,.3))",
                    }}
                  >
                    ¡Nivel Completado!
                  </h2>
                  <p className="text-white/50 text-sm mb-4">Objetivos completados</p>
                  {Ne && (
                    <div
                      className="mb-6 p-4 rounded-2xl relative overflow-hidden"
                      style={{
                        background: "rgba(255,214,0,.12)",
                        border: "1px solid rgba(255,214,0,.3)",
                        boxShadow:
                          "0 0 30px rgba(255,214,0,0.15), 0 8px 24px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                        transform: "perspective(500px) rotateX(3deg)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="absolute -inset-1 opacity-40"
                        style={{
                          background: "linear-gradient(90deg, #ff3385, #ffd600, #00e5ff)",
                          filter: "blur(15px)",
                        }}
                      />
                      <p className="text-xs text-white/40 mb-1 relative z-10">Recompensa de aprendizaje</p>
                      <p
                        className="text-2xl font-black text-[#ffd600] relative z-10"
                        style={{
                          textShadow: "0 0 20px rgba(255,214,0,.5)",
                        }}
                      >
                        {Ne.es}
                      </p>
                      <p className="text-sm font-bold text-white/60 relative z-10">{Ne.zh}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(255,51,133,.12)",
                        border: "1px solid rgba(255,51,133,.2)",
                        boxShadow: "0 0 20px rgba(255,51,133,0.15), 0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateY(-3deg)",
                      }}
                    >
                      <ZapIcon
                        size={16}
                        style={{
                          color: "#ff3385",
                          margin: "0 auto 4px",
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
                          color: "#ff3385",
                        }}
                      >
                        {Q.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(255,214,0,.12)",
                        border: "1px solid rgba(255,214,0,.2)",
                        boxShadow: "0 0 20px rgba(255,214,0,0.15), 0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateY(3deg)",
                      }}
                    >
                      <StarIcon
                        size={16}
                        style={{
                          color: "#ffd600",
                          margin: "0 auto 4px",
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
                        }}
                      >
                        {ve.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={() => {
                        if (WRef.current) {
                          clearTimeout(WRef.current);
                        }
                        const t = K.find((r) => r.id === C + 1);
                        fe(t ? t.id : 1);
                      }}
                      className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #39ff14, #00e5ff)",
                        boxShadow:
                          "0 0 25px rgba(57,255,20,.3), inset 0 2px 4px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,.3)",
                        transform: "perspective(400px) rotateX(5deg)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {C < K.length ? "Siguiente Nivel" : "Repetir"}
                    </button>
                    <button
                      onClick={() => {
                        playClick();
                        if (LRef.current) {
                          clearInterval(LRef.current);
                        }
                        if (WRef.current) {
                          clearTimeout(WRef.current);
                        }
                        setM("select");
                      }}
                      className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid rgba(255,255,255,.12)",
                        color: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateX(5deg)",
                      }}
                    >
                      Menú
                    </button>
                    <P_1 currentGameId="word-candy" />
                  </div>
                  {qe && (
                    <p className="text-[10px] text-white/30 mt-3">
                      Siguiente nivel en {C < K.length ? "3 segundos..." : "---"}
                    </p>
                  )}
                </div>
              </div>
            )}
            {m === "gameover" && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center"
                style={{
                  background: "rgba(3,4,17,.88)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
                    border: "1px solid rgba(255,51,133,.2)",
                    boxShadow:
                      "0 0 60px rgba(255,51,133,.15), inset 0 0 40px rgba(255,51,133,0.05), 0 24px 80px rgba(0,0,0,.5)",
                    transformStyle: "preserve-3d",
                    transform: "perspective(800px) rotateX(2deg)",
                    animation: "cardLift 0.6s ease-out",
                  }}
                >
                  <div
                    className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-80"
                    style={{
                      background: "linear-gradient(135deg, #ff3385, #ffd600, #00e5ff, #ff3385)",
                      backgroundSize: "300% 300%",
                      animation: "gradientRotate 3s linear infinite",
                      filter: "blur(25px)",
                    }}
                  />
                  <div
                    className="flex justify-center mb-4"
                    style={{
                      animation: "charWiggle 2s ease-in-out infinite",
                    }}
                  >
                    <Re1Component reaction="sad" size={100} />
                  </div>
                  <TrophyIcon
                    size={56}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 16px",
                      filter: "drop-shadow(0 0 15px rgba(255,214,0,.5))",
                    }}
                  />
                  <h2
                    className="text-3xl font-black mb-2"
                    style={{
                      background: "linear-gradient(135deg, #ff3385, #ffd600)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,.3))",
                    }}
                  >
                    ¡Dulce Fin!
                  </h2>
                  <p className="text-white/50 text-sm mb-6">Sin movimientos restantes</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(255,51,133,.12)",
                        border: "1px solid rgba(255,51,133,.2)",
                        boxShadow: "0 0 20px rgba(255,51,133,0.15), 0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateY(-3deg)",
                      }}
                    >
                      <ZapIcon
                        size={16}
                        style={{
                          color: "#ff3385",
                          margin: "0 auto 4px",
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
                          color: "#ff3385",
                        }}
                      >
                        {Q.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(255,214,0,.12)",
                        border: "1px solid rgba(255,214,0,.2)",
                        boxShadow: "0 0 20px rgba(255,214,0,0.15), 0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateY(3deg)",
                      }}
                    >
                      <StarIcon
                        size={16}
                        style={{
                          color: "#ffd600",
                          margin: "0 auto 4px",
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
                        }}
                      >
                        {ve.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(0,229,255,.12)",
                        border: "1px solid rgba(0,229,255,.2)",
                        boxShadow: "0 0 20px rgba(0,229,255,0.15), 0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateY(-3deg)",
                      }}
                    >
                      <CandyIcon
                        size={16}
                        style={{
                          color: "#00e5ff",
                          margin: "0 auto 4px",
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
                        className="text-lg font-black"
                        style={{
                          color: "#00e5ff",
                        }}
                      >
                        {C}
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(57,255,20,.12)",
                        border: "1px solid rgba(57,255,20,.2)",
                        boxShadow: "0 0 20px rgba(57,255,20,0.15), 0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateY(3deg)",
                      }}
                    >
                      <FlameIcon
                        size={16}
                        style={{
                          color: "#39ff14",
                          margin: "0 auto 4px",
                        }}
                      />
                      <p
                        className="text-xs"
                        style={{
                          color: "rgba(207,216,255,.5)",
                        }}
                      >
                        Combo Max
                      </p>
                      <p
                        className="text-lg font-black"
                        style={{
                          color: "#39ff14",
                        }}
                      >
                        {oe}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={() => fe(C)}
                      className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 flex items-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #ff3385, #ffd600)",
                        boxShadow:
                          "0 0 25px rgba(255,51,133,.3), inset 0 2px 4px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,.3)",
                        transform: "perspective(400px) rotateX(5deg)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <RotateCcwIcon size={16} /> Reintentar
                    </button>
                    <button
                      onClick={() => {
                        playClick();
                        if (LRef.current) {
                          clearInterval(LRef.current);
                        }
                        setM("select");
                      }}
                      className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid rgba(255,255,255,.12)",
                        color: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,.2)",
                        transform: "perspective(400px) rotateX(5deg)",
                      }}
                    >
                      Menú
                    </button>
                    <P_1 currentGameId="word-candy" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="fixed bottom-4 right-4 z-50 pointer-events-none hidden md:block"
            style={{
              animation: "charIdle 3s ease-in-out infinite",
            }}
          >
            <Re1Component reaction={reaction} size={120} />
          </div>
          <div
            className="fixed bottom-4 right-4 z-50 pointer-events-none md:hidden"
            style={{
              animation: "charIdle 3s ease-in-out infinite",
            }}
          >
            <Re1Component reaction={reaction} size={80} />
          </div>
          <style>{`
        @keyframes charIdle { 0%, 100%{transform: translateY(0)} 50%{transform: translateY(-8px)} }
        @keyframes charBounce { 0%, 100%{transform: translateY(0) scale(1)} 50%{transform: translateY(-16px) scale(1.08)} }
        @keyframes charWiggle { 0%, 100%{transform: rotate(0deg)} 25%{transform: rotate(-8deg)} 75%{transform: rotate(8deg)} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(140vh) rotate(720deg);opacity:0} }
        @keyframes floatCloud { 0%, 100%{transform: translateY(0) scale(1)} 50%{transform: translateY(-30px) scale(1.1)} }
        @keyframes floatCandy { 0%, 100%{transform: translateY(0) rotate(0deg)} 50%{transform: translateY(-20px) rotate(10deg)} }
        @keyframes starTwinkle { 0%, 100%{opacity: 0.3} 50%{opacity: 0.8} }
        @keyframes stripeShimmer { 0%{background-position: 0 0} 100%{background-position: 0 12px} }
        @keyframes wrappedPulse { 0%, 100%{transform: scale(1); opacity: 0.6} 50%{transform: scale(1.05); opacity: 0.8} }
        @keyframes shakeBoard { 0%, 100%{transform: perspective(1000px) rotateX(3deg) translateX(0) rotate(0deg)} 20%{transform: perspective(1000px) rotateX(3deg) translateX(-8px) rotate(-3deg)} 40%{transform: perspective(1000px) rotateX(3deg) translateX(8px) rotate(3deg)} 60%{transform: perspective(1000px) rotateX(3deg) translateX(-5px) rotate(-2deg)} 80%{transform: perspective(1000px) rotateX(3deg) translateX(5px) rotate(2deg)} }
        @keyframes megaFlash { 0%{opacity: 0.5} 100%{opacity: 0} }
        @keyframes comboPop { 0%{transform: scale(0.5); opacity: 0} 50%{transform: scale(1.2); opacity: 1} 100%{transform: scale(1); opacity: 1} }
        @keyframes comboPop3D { 0%{transform: perspective(500px) rotateX(8deg) rotateZ(-3deg) scale(0.3); opacity: 0; text-shadow: 0 0 0 transparent} 50%{transform: perspective(500px) rotateX(8deg) rotateZ(-3deg) scale(1.3); opacity: 1; text-shadow: 0 0 30px rgba(255,214,0,.9)} 70%{transform: perspective(500px) rotateX(8deg) rotateZ(-3deg) scale(1.1); opacity: 1} 100%{transform: perspective(500px) rotateX(8deg) rotateZ(-3deg) scale(1); opacity: 1} }
        @keyframes gradientRotate { 0%{background-position: 0% 50%} 50%{background-position: 100% 50%} 100%{background-position: 0% 50%} }
        @keyframes haloPulse { 0%, 100%{opacity: 0.4; transform: scale(1)} 50%{opacity: 0.8; transform: scale(1.1)} }
        @keyframes goldenFlash { 0%{opacity: 0} 20%{opacity: 1} 100%{opacity: 0} }
        @keyframes matchGlow { 0%{filter: brightness(1) drop-shadow(0 0 0 transparent)} 50%{filter: brightness(2.5) drop-shadow(0 0 30px rgba(255,255,255,0.9))} 100%{filter: brightness(1) drop-shadow(0 0 0 transparent)} }
        @keyframes matchPop { 0%{transform: scale(1) translateY(0) translateZ(0)} 50%{transform: scale(1.3) translateY(-10px) translateZ(40px)} 100%{transform: scale(0) translateY(-20px) translateZ(60px)} }
        @keyframes matchExplosion { 0%{transform: scale(1) rotateZ(0deg)} 50%{transform: scale(1.4) rotateZ(20deg)} 100%{transform: scale(0) rotateZ(45deg)} }
        @keyframes tileDropBounce { 0%{transform: translateY(-60px) scale(0.8); opacity: 0.6} 60%{transform: translateY(4px) scale(1.05); opacity: 1} 80%{transform: translateY(-2px) scale(0.98)} 100%{transform: translateY(0) scale(1)} }
        @keyframes shimmerSlide { 0%{transform: translateX(-100%)} 100%{transform: translateX(100%)} }
        @keyframes redFlash { 0%{opacity: 0} 20%{opacity: 1} 40%{opacity: 0.5} 60%{opacity: 0.8} 100%{opacity: 0} }
        @keyframes scoreFloat3D { 0%{transform: translateX(-50%) scale(0.5) rotateX(20deg); opacity: 0} 50%{transform: translateX(-50%) scale(1.2) rotateX(-5deg); opacity: 1} 100%{transform: translateX(-50%) scale(1) rotateX(8deg); opacity: 1} }
        @keyframes cardLift { 0%{transform: perspective(800px) rotateX(10deg) translateY(40px) scale(0.9); opacity: 0} 60%{transform: perspective(800px) rotateX(-2deg) translateY(-4px) scale(1.02); opacity: 1} 100%{transform: perspective(800px) rotateX(2deg) translateY(0) scale(1); opacity: 1} }
        @keyframes neonPulse { 0%, 100%{box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor} 50%{box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor} }
        @keyframes explosionBurst { 0%{transform: scale(1); opacity: 1} 50%{transform: scale(1.5); opacity: 0.8} 100%{transform: scale(2); opacity: 0} }
        @keyframes tileFloat { 0%, 100%{transform: translateY(0) translateZ(0)} 50%{transform: translateY(-3px) translateZ(10px)} }
        @keyframes specialRotate { 0%{transform: rotate(0deg) scale(1)} 50%{transform: rotate(180deg) scale(1.1)} 100%{transform: rotate(360deg) scale(1)} }
        @keyframes borderGlow { 0%, 100%{border-color: rgba(255,255,255,0.2)} 50%{border-color: rgba(255,255,255,0.5)} }
        @keyframes candyFloat { 0%, 100%{transform: translateY(0) translateZ(0)} 50%{transform: translateY(-4px) translateZ(15px)} }
        @keyframes specialFloat { 0%, 100%{transform: translateY(0) translateZ(0) rotate(0deg)} 50%{transform: translateY(-5px) translateZ(20px) rotate(5deg)} }
      `}</style>
        </StarfieldBackground>
      );
  }
}
export { TComponent as default };
