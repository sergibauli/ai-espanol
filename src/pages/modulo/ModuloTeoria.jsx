import {
  BookMarkedIcon,
  ArrowRightIcon,
  LightbulbIcon,
  ZapIcon,
  SparklesIcon,
  BookOpenIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  StarIcon,
  DownloadIcon,
  FlameIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
  InfoIcon,
  LayoutGridIcon,
  ChevronLeftIcon,
  EyeOffIcon,
  EyeIcon,
  SplitIcon,
  LanguagesIcon,
  MessageSquareIcon,
  PencilIcon,
} from "lucide-react";
import * as React from "react";
function SComponent({ text, cc }) {
  const n = [];
  let a = text;
  let l = 0;
  const i = /(\*\*[^*]+\*\*|"[^"]+"|«[^»]+»)/;
  while (a.length) {
    const x = a.match(i);
    if (!x) {
      n.push(<span key={l++}>{a}</span>);
      break;
    }
    const p = x.index;
    if (p > 0) {
      n.push(<span key={l++}>{a.slice(0, p)}</span>);
    }
    const m = x[0];
    if (m.startsWith("**")) {
      n.push(
        <strong
          key={l++}
          style={{
            color: "#ffd600",
            textShadow: "0 0 12px rgba(255,214,0,0.35)",
            fontWeight: 800,
          }}
        >
          {m.slice(2, -2)}
        </strong>,
      );
    } else {
      n.push(
        <span
          key={l++}
          className="px-1.5 py-0.5 rounded-md font-bold"
          style={{
            color: cc,
            background: `${cc}14`,
            border: `1px solid ${cc}28`,
          }}
        >
          {m}
        </span>,
      );
    }
    a = a.slice(p + m.length);
  }
  return <>{n}</>;
}
const ue = {
  note: {
    icon: InfoIcon,
    label: "Nota clave",
    color: "#00d4ff",
  },
  error: {
    icon: TriangleAlertIcon,
    label: "Error común",
    color: "#ff3860",
  },
  tip: {
    icon: LightbulbIcon,
    label: "Truco",
    color: "#ffd600",
  },
  ok: {
    icon: CircleCheckIcon,
    label: "Correcto",
    color: "#39ff14",
  },
  fire: {
    icon: FlameIcon,
    label: "Imprescindible",
    color: "#ff6b35",
  },
};
function ye(s) {
  if (/❌|⚠️|ERROR/i.test(s)) {
    return "error";
  }
  if (/✅|✔/.test(s)) {
    return "ok";
  }
  if (/💡|TRUCO|TIP/i.test(s)) {
    return "tip";
  }
  if (/🔥|⭐|🎯|🧠/.test(s)) {
    return "fire";
  }
  return "note";
}
function je(s) {
  return /^(📌|❌|✅|✔|💡|⚠️|🔥|⭐|🎯|🧠|📝|📖)/.test(s.trim());
}
function ve(s) {
  return s
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}
function we(s) {
  const t = s
    .split(
      `
`,
    )
    .map((a) => a.trim())
    .filter(Boolean);
  if (je(t[0])) {
    const title = t[0].replace(/[:\s]+$/, "");
    return {
      kind: "callout",
      tone: ye(t[0]),
      title,
      lines: t.slice(1),
    };
  }
  if (t.length >= 2 && t.every((a) => a.includes("|"))) {
    return {
      kind: "table",
      rows: t.map((a) =>
        a
          .split("|")
          .map((l) => l.trim())
          .filter(Boolean),
      ),
    };
  }
  const n = t.filter((a) => /\S+\s*(=|→|➜|➡)\s*\S+/.test(a));
  if (t.length >= 2 && n.length >= Math.ceil(t.length * 0.7)) {
    return {
      kind: "pairs",
      pairs: t
        .map((l) => l.replace(/^[•\-\*]\s*/, ""))
        .map((left) => {
          const i = left.match(/^(.*?)\s*(?:=|→|➜|➡)\s*(.*)$/);
          if (i) {
            return {
              left: i[1].trim(),
              right: i[2].trim(),
            };
          }
          return {
            left,
            right: "",
          };
        }),
    };
  }
  if (t.length >= 2 && t.filter((a) => /^[•\-\*]/.test(a)).length >= Math.ceil(t.length * 0.7)) {
    return {
      kind: "list",
      items: t.map((a) => a.replace(/^[•\-\*]\s*/, "")),
    };
  }
  if (t.length === 1 && t[0].endsWith(":") && t[0].length < 60) {
    return {
      kind: "heading",
      text: t[0].replace(/:$/, ""),
    };
  }
  return {
    kind: "para",
    text: t.join(`
`),
  };
}
function ke(text) {
  if (text) {
    return ve(text).map(we);
  }
  return [];
}
function NeComponent({ block, cc, delay }) {
  const a = ue[block.tone];
  const { icon: Icon, color } = a;
  return (
    <div
      className="trc-callout"
      style={{
        animationDelay: `${delay}ms`,
        "--tc": color,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${color}1c`,
            border: `1.5px solid ${color}50`,
            boxShadow: `0 0 16px ${color}35`,
          }}
        >
          <Icon
            size={17}
            style={{
              color,
            }}
          />
        </span>
        <span
          className="font-black text-sm uppercase tracking-wider"
          style={{
            color,
            textShadow: `0 0 12px ${color}50`,
          }}
        >
          {block.title || a.label}
        </span>
      </div>
      <div className="space-y-2 pl-1">
        {block.lines.map((x, p) => (
          <p key={p} className="text-sm md:text-base leading-relaxed text-white/85">
            <SComponent text={x.replace(/^[•\-\*]\s*/, "")} cc={cc} />
          </p>
        ))}
      </div>
    </div>
  );
}
function EComponent({ block, cc, delay }) {
  return (
    <div
      className="grid gap-2.5 sm:grid-cols-2"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {block.pairs.map((a, l) => (
        <div
          key={l}
          className="trc-pair group"
          style={{
            animationDelay: `${delay + l * 60}ms`,
            "--tc": cc,
          }}
        >
          <span
            className="font-black text-white text-sm md:text-base group-hover:text-transparent group-hover:bg-clip-text transition-all"
            style={{}}
          >
            {a.left}
          </span>
          {a.right && (
            <>
              <ArrowRightIcon
                size={13}
                className="shrink-0 mx-1 opacity-60"
                style={{
                  color: cc,
                }}
              />
              <span
                className="text-sm md:text-base font-semibold"
                style={{
                  color: `${cc}e6`,
                }}
              >
                {a.right}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
function SeComponent({ block, cc, delay }) {
  return (
    <div className="space-y-2.5">
      {block.items.map((a, l) => (
        <div
          key={l}
          className="trc-list-item"
          style={{
            animationDelay: `${delay + l * 70}ms`,
            "--tc": cc,
          }}
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-black"
            style={{
              background: `linear-gradient(135deg, ${cc}30, ${cc}10)`,
              border: `1px solid ${cc}45`,
              color: cc,
              boxShadow: `0 0 10px ${cc}25`,
            }}
          >
            {l + 1}
          </span>
          <span className="text-sm md:text-base leading-relaxed text-white/88 flex-1">
            <SComponent text={a} cc={cc} />
          </span>
        </div>
      ))}
    </div>
  );
}
function CeComponent({ block, cc, delay }) {
  const [a, ...l] = block.rows;
  return (
    <div
      className="overflow-x-auto rounded-2xl trc-fade"
      style={{
        animationDelay: `${delay}ms`,
        border: `1px solid ${cc}30`,
        boxShadow: `0 0 24px ${cc}10`,
      }}
    >
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr
            style={{
              background: `linear-gradient(90deg, ${cc}22, ${cc}0a)`,
            }}
          >
            {a.map((i, x) => (
              <th
                key={x}
                className="px-4 py-3 text-left font-black uppercase tracking-wider text-xs"
                style={{
                  color: cc,
                }}
              >
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {l.map((i, x) => (
            <tr
              key={x}
              className="transition-colors hover:bg-white/[.04]"
              style={{
                borderTop: "1px solid rgba(255,255,255,.06)",
              }}
            >
              {i.map((p, m) => (
                <td key={m} className="px-4 py-2.5 text-white/85">
                  <SComponent text={p} cc={cc} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function ZeComponent({ es, zh, cc, index, showChinese }) {
  const [i, setI] = React.useState(false);
  const p = i || showChinese;
  if (zh) {
    return (
      <button
        type="button"
        onClick={() => setI((m) => !m)}
        className="trc-flip w-full text-left"
        style={{
          animationDelay: `${index * 80}ms`,
          "--tc": cc,
        }}
      >
        <div
          className="trc-flip-inner"
          style={{
            transform: p ? "rotateX(180deg)" : "rotateX(0deg)",
          }}
        >
          <div className="trc-flip-face">
            <div className="flex items-start gap-3">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${cc}18`,
                  border: `1px solid ${cc}40`,
                  boxShadow: `0 0 12px ${cc}25`,
                }}
              >
                <ZapIcon
                  size={14}
                  style={{
                    color: cc,
                  }}
                />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base md:text-lg leading-relaxed">{es}</p>
                {zh && (
                  <span
                    className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.18em]"
                    style={{
                      color: `${cc}90`,
                    }}
                  >
                    <LanguagesIcon size={11} /> Toca para ver 中文
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            className="trc-flip-face trc-flip-back"
            style={{
              background: `linear-gradient(135deg, ${cc}16, rgba(0,212,255,.07))`,
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(0,212,255,.14)",
                  border: "1px solid rgba(0,212,255,.4)",
                  boxShadow: "0 0 12px rgba(0,212,255,.25)",
                }}
              >
                <LanguagesIcon
                  size={14}
                  style={{
                    color: "#00d4ff",
                  }}
                />
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-bold text-base md:text-lg leading-relaxed"
                  style={{
                    color: "rgba(0,212,255,.9)",
                  }}
                >
                  {zh || "—"}
                </p>
                <p className="mt-1.5 text-xs text-white/50 italic">{es}</p>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  }
  return (
    <div
      className="trc-fade rounded-2xl p-4 flex items-start gap-3"
      style={{
        animationDelay: `${index * 80}ms`,
        background: "rgba(0,0,0,.28)",
        border: `1px solid ${cc}30`,
      }}
    >
      <span
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: `${cc}18`,
          border: `1px solid ${cc}40`,
          boxShadow: `0 0 12px ${cc}25`,
        }}
      >
        <ZapIcon
          size={14}
          style={{
            color: cc,
          }}
        />
      </span>
      <p className="text-white font-bold text-base md:text-lg leading-relaxed">{es}</p>
    </div>
  );
}
function RComponent({ text, cc }) {
  const n = ke(text);
  let delay = 0;
  return (
    <div className="space-y-4">
      {n.map((block, i) => {
        delay += 90;
        switch (block.kind) {
          case "callout":
            return <NeComponent key={i} block={block} cc={cc} delay={delay} />;
          case "pairs":
            return <EComponent key={i} block={block} cc={cc} delay={delay} />;
          case "list":
            return <SeComponent key={i} block={block} cc={cc} delay={delay} />;
          case "table":
            return <CeComponent key={i} block={block} cc={cc} delay={delay} />;
          case "heading":
            return (
              <div
                key={i}
                className="trc-fade flex items-center gap-3 pt-2"
                style={{
                  animationDelay: `${delay}ms`,
                }}
              >
                <BookMarkedIcon
                  size={16}
                  style={{
                    color: cc,
                  }}
                />
                <h4
                  className="font-black text-white text-base md:text-lg"
                  style={{
                    textShadow: `0 0 14px ${cc}45`,
                  }}
                >
                  {block.text}
                </h4>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${cc}55, transparent)`,
                  }}
                />
              </div>
            );
          default:
            return (
              <p
                key={i}
                className="trc-fade text-sm md:text-base leading-[1.9] text-white/85"
                style={{
                  animationDelay: `${delay}ms`,
                }}
              >
                {block.text
                  .split(
                    `
`,
                  )
                  .map((x, p) => (
                    <span key={p} className="block mb-1.5 last:mb-0">
                      <SComponent text={x} cc={cc} />
                    </span>
                  ))}
              </p>
            );
        }
      })}
      <style>{`
        .trc-fade { opacity:0; animation: trcIn .55s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes trcIn { from { opacity:0; transform: translateY(14px) scale(.985); } to { opacity:1; transform:none; } }

        .trc-callout {
          position:relative; border-radius:18px; padding:18px 20px; overflow:hidden;
          opacity:0; animation: trcIn .55s cubic-bezier(.2,.8,.2,1) forwards;
          background: linear-gradient(135deg, color-mix(in srgb, var(--tc) 9%, transparent), transparent 65%);
          border:1.5px solid color-mix(in srgb, var(--tc) 32%, transparent);
          box-shadow: 0 0 26px color-mix(in srgb, var(--tc) 9%, transparent), inset 0 1px 0 rgba(255,255,255,.05);
        }
        .trc-callout::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:4px;
          background: linear-gradient(180deg, var(--tc), transparent);
          box-shadow: 0 0 14px var(--tc);
        }

        .trc-pair {
          display:flex; align-items:center; gap:6px; flex-wrap:wrap;
          padding:10px 14px; border-radius:14px;
          opacity:0; animation: trcIn .5s cubic-bezier(.2,.8,.2,1) forwards;
          background: linear-gradient(135deg, color-mix(in srgb, var(--tc) 8%, transparent), rgba(255,255,255,.02));
          border:1px solid color-mix(in srgb, var(--tc) 22%, transparent);
          transition: all .3s ease;
        }
        .trc-pair:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--tc) 55%, transparent); box-shadow: 0 8px 24px color-mix(in srgb, var(--tc) 16%, transparent); }

        .trc-list-item {
          display:flex; align-items:flex-start; gap:12px;
          padding:11px 14px; border-radius:14px;
          opacity:0; animation: trcIn .5s cubic-bezier(.2,.8,.2,1) forwards;
          background: rgba(255,255,255,.028);
          border:1px solid rgba(255,255,255,.06);
          transition: all .3s ease;
        }
        .trc-list-item:hover { border-color: color-mix(in srgb, var(--tc) 45%, transparent); background: color-mix(in srgb, var(--tc) 6%, transparent); transform: translateX(4px); }

        .trc-flip { perspective: 900px; opacity:0; animation: trcIn .5s cubic-bezier(.2,.8,.2,1) forwards; display:block; }
        .trc-flip-inner { position:relative; transform-style: preserve-3d; transition: transform .6s cubic-bezier(.3,.9,.3,1); display:grid; }
        .trc-flip-face {
          grid-area: 1/1; backface-visibility: hidden; -webkit-backface-visibility: hidden;
          border-radius: 16px; padding: 16px;
          background: rgba(0,0,0,.28);
          border: 1px solid color-mix(in srgb, var(--tc) 24%, transparent);
          transition: box-shadow .3s ease;
        }
        .trc-flip:hover .trc-flip-face { box-shadow: 0 0 18px color-mix(in srgb, var(--tc) 14%, transparent); }
        .trc-flip-back { transform: rotateX(180deg); }
      `}</style>
    </div>
  );
}
const B = ["📖", "🧠", "✨", "💡", "🔥", "🌟", "⚡", "🎓"];
const F = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#b829dd", "#ff3860", "#46ff9a"];
function MeComponent() {
  const sRef = React.useRef(null);
  React.useEffect(() => {
    const sRef_current = sRef.current;
    if (!sRef_current) {
      return;
    }
    const n = sRef_current.getContext("2d");
    if (!n) {
      return;
    }
    let a = 0;
    const l = [];
    const i = ["#ff00aa20", "#00d4ff20", "#ffd60020", "#39ff1420", "#ff6b3520"];
    function x() {
      sRef_current.width = sRef_current.offsetWidth;
      sRef_current.height = sRef_current.offsetHeight;
    }
    x();
    window.addEventListener("resize", x);
    const p = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches ? 7 : 22;
    for (let c = 0; c < p; c++) {
      l.push({
        x: Math.random() * sRef_current.width,
        y: Math.random() * sRef_current.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        col: i[Math.floor(Math.random() * i.length)],
      });
    }
    function m() {
      if (document.hidden) {
        a = requestAnimationFrame(m);
        return;
      }
      n.clearRect(0, 0, sRef_current.width, sRef_current.height);
      l.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < 0) {
          c.x = sRef_current.width;
        }
        if (c.x > sRef_current.width) {
          c.x = 0;
        }
        if (c.y < 0) {
          c.y = sRef_current.height;
        }
        if (c.y > sRef_current.height) {
          c.y = 0;
        }
        n.beginPath();
        n.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        n.fillStyle = c.col;
        n.globalAlpha = c.alpha;
        n.fill();
        n.globalAlpha = 1;
      });
      a = requestAnimationFrame(m);
    }
    m();
    return () => {
      cancelAnimationFrame(a);
      window.removeEventListener("resize", x);
    };
  }, []);
  return (
    <canvas
      ref={sRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
      }}
    />
  );
}
function EeComponent({ notes, onChange, onDownload }) {
  return (
    <div
      className="relative h-full flex flex-col"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative flex-1 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f5f0e6 0%, #ebe4d6 100%)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(255,214,0,0.1), inset 0 0 60px rgba(0,0,0,0.05)",
          transform: "rotateY(-2deg) rotateX(1deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center py-4 gap-3"
          style={{
            background: "linear-gradient(90deg, #d4c9b8, #e8dcc8)",
            borderRight: "2px solid #c4b9a8",
          }}
        >
          {Array.from({
            length: 20,
          }).map((a, l) => (
            <div
              key={l}
              className="w-5 h-3 rounded-full"
              style={{
                background: "linear-gradient(180deg, #c0c0c0, #808080)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 left-8 overflow-auto">
          <div
            className="min-h-full p-6"
            style={{
              backgroundImage: "linear-gradient(#c4b9a830 1px, transparent 1px)",
              backgroundSize: "100% 28px",
              lineHeight: "28px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PencilIcon
                  size={14}
                  style={{
                    color: "#8b7355",
                  }}
                />
                <span
                  className="text-xs font-bold"
                  style={{
                    color: "#8b7355",
                  }}
                >
                  Mis Notas / 我的笔记
                </span>
              </div>
              <button
                onClick={onDownload}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  color: "#fff",
                  boxShadow: "0 0 15px rgba(255,0,170,0.3)",
                }}
              >
                <DownloadIcon size={12} /> Descargar
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(a) => onChange(a.target.value)}
              placeholder="Escribe tus notas aquí... / 在这里写笔记..."
              className="w-full min-h-[400px] resize-none focus:outline-none bg-transparent text-sm"
              style={{
                color: "#4a4035",
                fontFamily: '"Comic Sans MS", "Segoe UI", cursive',
                lineHeight: "28px",
              }}
            />
          </div>
        </div>
        <div
          className="absolute bottom-0 right-0 w-12 h-12"
          style={{
            background: "linear-gradient(135deg, transparent 50%, #d4c9b8 50%)",
            filter: "drop-shadow(-2px -2px 4px rgba(0,0,0,0.2))",
          }}
        />
      </div>
    </div>
  );
}
function YeComponent({ teoria, moduloTitulo, moduloNumero, showChineseGlobal = false }) {
  const [l, setL] = React.useState({});
  const [x, setX] = React.useState({});
  const [m, setM] = React.useState({});
  const [u, setU] = React.useState(0);
  const [E, setE] = React.useState({});
  const [q, setQ] = React.useState({});
  const [X, setX_1] = React.useState(null);
  const [$, set$] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );
  const v = $ ? 1 : 4;
  React.useEffect(() => {
    const o = window.matchMedia("(max-width: 767px)");
    const r = () => {
      set$(o.matches);
      setU(0);
    };
    r();
    o.addEventListener?.("change", r);
    return () => o.removeEventListener?.("change", r);
  }, []);
  React.useEffect(() => {
    setU(0);
    const o = [];
    teoria.forEach((r, h) => {
      o.push(
        setTimeout(
          () =>
            setQ((y) => ({
              ...y,
              [h]: true,
            })),
          h * 120,
        ),
      );
    });
    return () => o.forEach(clearTimeout);
  }, [teoria]);
  const L = (idx) => {
    setL((r) => ({
      ...r,
      [idx]: !r[idx],
    }));
  };
  const V = (idx) => {
    setX((r) => ({
      ...r,
      [idx]: !r[idx],
    }));
  };
  const Z = (idx, r) => {
    setE((h) => ({
      ...h,
      [idx]: r,
    }));
  };
  const G = (idx, titulo) => {
    const h = E[idx] || "";
    const y = new Blob(
      [
        `=== Notas: ${titulo} ===

${h}`,
      ],
      {
        type: "text/plain;charset=utf-8",
      },
    );
    const d = URL.createObjectURL(y);
    const j = document.createElement("a");
    j.href = d;
    j.download = `notas_${titulo.replace(/\s+/g, "_").toLowerCase()}.txt`;
    document.body.appendChild(j);
    j.click();
    document.body.removeChild(j);
    URL.revokeObjectURL(d);
  };
  const parseDescription = (o) => {
    if (o) {
      return o
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong style="color:#ffd600;text-shadow:0 0 10px rgba(255,214,0,0.3);">$1</strong>',
        )
        .replace(/\n/g, "<br/>");
    }
    return "";
  };
  const w = Math.max(1, Math.ceil(teoria.length / v));
  const C = u * v;
  const K = teoria.slice(C, C + v).map((item, r) => ({
    item,
    idx: C + r,
  }));
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 relative">
      <MeComponent />
      <div className="relative z-10 mb-10 text-center">
        <div
          className="inline-block px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-4"
          style={{
            background: "rgba(255,214,0,0.12)",
            color: "#ffd600",
            border: "1px solid rgba(255,214,0,0.25)",
            boxShadow: "0 0 20px rgba(255,214,0,0.1)",
          }}
        >
          <SparklesIcon size={14} className="inline mr-2" /> Módulo {moduloNumero}
        </div>
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-3"
          style={{
            textShadow: "0 0 40px rgba(255,214,0,0.25), 0 0 80px rgba(255,214,0,0.1)",
          }}
        >
          {moduloTitulo}
        </h1>
        <div
          className="h-1.5 w-40 mx-auto rounded-full"
          style={{
            background: "linear-gradient(90deg, #ff00aa, #00d4ff, #ffd600)",
          }}
        />
        <div className="mt-6 max-w-3xl mx-auto grid grid-cols-3 gap-2 md:gap-4">
          {[
            {
              value: teoria.length,
              label: "conceptos",
              icon: BookOpenIcon,
              color: "#00d4ff",
            },
            {
              value: w,
              label: "secciones",
              icon: LayoutGridIcon,
              color: "#ff00aa",
            },
            {
              value: `${Math.min(100, Math.round(((u + 1) / w) * 100))}%`,
              label: "recorrido",
              icon: SparklesIcon,
              color: "#ffd600",
            },
          ].map((o, r) => {
            const Icon = o.icon;
            return (
              <div key={r} className="theory-metric rounded-2xl px-3 py-4">
                <Icon
                  size={16}
                  className="mx-auto mb-2"
                  style={{
                    color: o.color,
                  }}
                />
                <div className="text-xl md:text-2xl font-black text-white">{o.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[.16em] text-white/45">
                  {o.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {teoria.length > v && (
        <div className="relative z-10 mb-7 rounded-3xl p-4 md:p-5 theory-section-nav">
          <div className="flex items-center justify-between gap-3 mb-4">
            <button
              onClick={() => setU((o) => Math.max(0, o - 1))}
              disabled={u === 0}
              className="theory-nav-arrow"
              aria-label="Sección anterior"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <div className="text-center">
              <p className="text-white font-black text-lg">
                {$ ? "Concepto" : "Bloque"} {u + 1} de {w}
              </p>
              <p className="text-white/45 text-xs">Avanza paso a paso, sin contenido amontonado</p>
            </div>
            <button
              onClick={() => setU((o) => Math.min(w - 1, o + 1))}
              disabled={u === w - 1}
              className="theory-nav-arrow"
              aria-label="Sección siguiente"
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-center">
            {Array.from({
              length: w,
            }).map((o, r) => (
              <button
                key={r}
                onClick={() => setU(r)}
                className={`theory-section-chip ${u === r ? "is-active" : ""}`}
              >
                <span>{String(r + 1).padStart(2, "0")}</span>
                <small>
                  {r * v + 1}–{Math.min(teoria.length, (r + 1) * v)}
                </small>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="relative z-10 space-y-5">
        {K.map(({ item, idx }) => {
          const h = l[idx];
          const y = x[idx];
          const d = F[idx % F.length];
          const j = q[idx];
          const k = X === idx;
          const showChinese = m[idx] ?? showChineseGlobal;
          return (
            <div
              key={item.id ?? idx}
              className="relative rounded-3xl overflow-hidden transition-all duration-500"
              style={{
                opacity: j ? 1 : 0,
                transform: j ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                transitionDelay: `${idx * 80}ms`,
              }}
              onMouseEnter={() => setX_1(idx)}
              onMouseLeave={() => setX_1(null)}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] opacity-0 transition-opacity duration-500"
                style={{
                  opacity: k ? 0.8 : 0,
                  background: `conic-gradient(from 0deg, ${d}, ${d}80, #fff, ${d}80, ${d})`,
                  animation: "modTeoriaBorderSpin 4s linear infinite",
                  filter: "blur(0.5px)",
                }}
              />
              <div
                className="absolute -inset-[3px] rounded-[26px] -z-10 opacity-0 transition-opacity duration-500"
                style={{
                  opacity: k ? 0.5 : 0,
                  background: d,
                  filter: "blur(20px)",
                }}
              />
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,24,68,0.95) 0%, rgba(10,14,48,0.98) 50%, rgba(8,12,40,0.99) 100%)",
                  border: `2px solid ${k ? `${d}60` : "rgba(255,255,255,0.08)"}`,
                  boxShadow: k
                    ? `0 0 30px ${d}20, 0 20px 60px rgba(0,0,0,0.4)`
                    : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                  transition: "all 0.4s ease",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${d}, transparent)`,
                    opacity: k ? 1 : 0.4,
                    transition: "opacity 0.3s",
                  }}
                />
                <div
                  onClick={() => L(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(g) => {
                    if (g.key === "Enter" || g.key === " ") {
                      g.preventDefault();
                      L(idx);
                    }
                  }}
                  aria-expanded={!!h}
                  className="w-full text-left p-5 md:p-8 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${d}30, ${d}10)`,
                        border: `2px solid ${d}50`,
                        boxShadow: `0 0 20px ${d}30`,
                        transform: k ? "scale(1.1) rotate(-3deg)" : "scale(1)",
                      }}
                    >
                      <span
                        className="text-xl font-black"
                        style={{
                          color: d,
                          textShadow: `0 0 10px ${d}80`,
                        }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2
                        className="text-xl md:text-2xl font-bold text-white mb-1"
                        style={{
                          textShadow: `0 0 15px ${d}40`,
                        }}
                      >
                        {item.titulo}
                      </h2>
                      {showChinese && (
                        <p
                          className="text-sm md:text-base font-bold"
                          style={{
                            color: `${d}cc`,
                          }}
                        >
                          {item.tituloChino}
                        </p>
                      )}
                      {!h && (
                        <>
                          <p className="theory-card-preview mt-2 text-sm leading-relaxed text-white/48">
                            {item.descripcion
                              .replace(/\*\*/g, "")
                              .replace(/\s+/g, " ")
                              .slice(0, $ ? 92 : 145)}
                            …
                          </p>
                          <span
                            className="theory-tap-hint mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.15em]"
                            style={{
                              color: d,
                              background: `${d}12`,
                              border: `1px solid ${d}28`,
                            }}
                          >
                            <SparklesIcon size={11} /> Toca para descubrir
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(g) => {
                          g.stopPropagation();
                          setM((J) => ({
                            ...J,
                            [idx]: !showChinese,
                          }));
                        }}
                        className="p-2.5 rounded-xl transition-all hover:scale-110"
                        style={{
                          background: showChinese ? "rgba(0,212,255,.16)" : "rgba(255,255,255,.05)",
                          border: `1.5px solid ${showChinese ? "rgba(0,212,255,.55)" : "rgba(255,255,255,.15)"}`,
                        }}
                        title={showChinese ? "Ocultar chino" : "Mostrar chino"}
                      >
                        {showChinese ? (
                          <EyeOffIcon
                            size={16}
                            style={{
                              color: "#00d4ff",
                            }}
                          />
                        ) : (
                          <EyeIcon
                            size={16}
                            style={{
                              color: "rgba(255,255,255,.62)",
                            }}
                          />
                        )}
                      </button>
                      <button
                        onClick={(g) => {
                          g.stopPropagation();
                          V(idx);
                        }}
                        className="p-2.5 rounded-xl transition-all hover:scale-110"
                        style={{
                          background: y ? `${d}30` : "rgba(255,255,255,0.05)",
                          border: `1.5px solid ${y ? `${d}80` : "rgba(255,255,255,0.15)"}`,
                          boxShadow: y ? `0 0 15px ${d}40` : "none",
                        }}
                        title="Modo Split / 分屏模式"
                      >
                        <SplitIcon
                          size={16}
                          style={{
                            color: y ? d : "rgba(255,255,255,0.5)",
                          }}
                        />
                      </button>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: h ? `${d}20` : "rgba(255,255,255,0.05)",
                          border: `1.5px solid ${h ? `${d}60` : "rgba(255,255,255,0.15)"}`,
                          transform: h ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <ChevronDownIcon
                          size={18}
                          style={{
                            color: h ? d : "rgba(255,255,255,0.5)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center text-xl pointer-events-none select-none"
                    style={{
                      background: `linear-gradient(135deg, ${d}15, ${d}05)`,
                      border: `1px solid ${d}30`,
                      animation: `modTeoriaFloat 4s ease-in-out infinite ${idx * 0.5}s`,
                      opacity: 0.7,
                    }}
                  >
                    {B[idx % B.length]}
                  </div>
                </div>
                {h && (
                  <div
                    className="px-6 md:px-8 pb-6 md:pb-8"
                    style={{
                      animation: "modTeoriaExpand 0.5s ease-out",
                    }}
                  >
                    {y ? (
                      <div
                        className="flex flex-col lg:flex-row gap-6"
                        style={{
                          minHeight: "500px",
                        }}
                      >
                        <div className="lg:w-3/5 space-y-5">
                          <OComponent
                            compact={$}
                            item={item}
                            cc={d}
                            parseDescription={parseDescription}
                            showChinese={showChinese}
                            onToggleChinese={() =>
                              setM((g) => ({
                                ...g,
                                [idx]: !showChinese,
                              }))
                            }
                          />
                        </div>
                        <div
                          className="lg:w-2/5"
                          style={{
                            minHeight: "450px",
                          }}
                        >
                          <EeComponent
                            notes={E[idx] || ""}
                            onChange={(g) => Z(idx, g)}
                            onDownload={() => G(idx, item.titulo)}
                          />
                        </div>
                      </div>
                    ) : (
                      <OComponent
                        compact={$}
                        item={item}
                        cc={d}
                        parseDescription={parseDescription}
                        showChinese={showChinese}
                        onToggleChinese={() =>
                          setM((g) => ({
                            ...g,
                            [idx]: !showChinese,
                          }))
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {teoria.length === 0 && (
        <div className="text-center py-20 relative z-10">
          <div className="text-5xl mb-4 opacity-30">📚</div>
          <p className="text-white/40 font-medium">No hay contenido teórico disponible</p>
        </div>
      )}
      <style>{`
        @keyframes modTeoriaBorderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes modTeoriaFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes modTeoriaExpand {
          0% { opacity: 0; transform: translateY(-10px) scaleY(0.95); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .theory-mobile-stage { min-height:44px; border-radius:14px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.04); color:rgba(255,255,255,.5); padding:9px 12px; font-size:11px; font-weight:900; transition:.25s ease; }
        .theory-mobile-stage.is-active { color:#081128; background:linear-gradient(135deg,#fef08a,#67e8f9); border-color:transparent; box-shadow:0 10px 28px rgba(103,232,249,.16); transform:translateY(-2px); }
        @media (max-width:767px) {
          .theory-card-preview { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
          .theory-content-readable { min-width:0; }
          .theory-concept-card, .theory-chinese-panel { padding:18px !important; border-radius:20px !important; }
        }
      `}</style>
    </div>
  );
}
function OComponent({ item, cc, parseDescription, showChinese, onToggleChinese, compact }) {
  const [x, setX] = React.useState("idea");
  const m = [
    {
      id: "idea",
      label: "💡 Idea",
    },
    ...(item.descripcionChino
      ? [
          {
            id: "chino",
            label: "🌏 中文",
          },
        ]
      : []),
    ...(item.ejemplos?.length
      ? [
          {
            id: "ejemplos",
            label: "⚡ Ejemplos",
          },
        ]
      : []),
  ];
  return (
    <div className="space-y-6 theory-content-readable">
      {compact && (
        <div
          className="sticky top-2 z-20 grid gap-2 rounded-2xl border border-white/10 bg-slate-950/90 p-2 shadow-xl backdrop-blur-xl"
          style={{
            gridTemplateColumns: `repeat(${m.length}, minmax(0, 1fr))`,
          }}
        >
          {m.map((c) => (
            <button
              key={c.id}
              className={`theory-mobile-stage ${x === c.id ? "is-active" : ""}`}
              onClick={() => {
                if (c.id === "chino" && !showChinese) {
                  onToggleChinese();
                }
                setX(c.id);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      {(!compact || x === "idea") && (
        <div
          className="rounded-3xl p-6 md:p-8 relative overflow-hidden theory-concept-card"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            border: `1.5px solid ${cc}25`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px ${cc}08`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${cc}, transparent)`,
              opacity: 0.5,
            }}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${cc}18`,
                  border: `1px solid ${cc}38`,
                  boxShadow: `0 0 18px ${cc}18`,
                }}
              >
                <LightbulbIcon
                  size={18}
                  style={{
                    color: cc,
                  }}
                />
              </span>
              <div>
                <span
                  className="block text-xs font-black uppercase tracking-[.2em]"
                  style={{
                    color: `${cc}dd`,
                  }}
                >
                  Idea esencial
                </span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  Lee, comprende y revisa los ejemplos
                </span>
              </div>
            </div>
            {(item.descripcionChino || item.ejemplos?.some((c) => c.chino)) && (
              <button onClick={onToggleChinese} className="theory-chinese-toggle">
                {showChinese ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                {showChinese ? "Ocultar chino" : "Mostrar chino"}
              </button>
            )}
          </div>
          <div
            className="theory-prose theory-prose-classic text-base md:text-lg"
            style={{
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <RComponent text={item.descripcion} cc={cc} />
          </div>
        </div>
      )}
      {item.descripcionChino && showChinese && (!compact || x === "chino") && (
        <div
          className="rounded-3xl p-6 md:p-7 relative overflow-hidden theory-chinese-panel"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.04), rgba(0,212,255,0.01))",
            border: "1.5px solid rgba(0,212,255,0.2)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
              opacity: 0.4,
            }}
          />
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareIcon
              size={16}
              style={{
                color: "#00d4ff",
              }}
            />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{
                color: "rgba(0,212,255,0.7)",
              }}
            >
              中文解释
            </span>
          </div>
          <div
            className="text-base md:text-lg leading-[1.9]"
            style={{
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <RComponent text={item.descripcionChino} cc="#00d4ff" />
          </div>
        </div>
      )}
      {item.ejemplos && item.ejemplos.length > 0 && (!compact || x === "ejemplos") && (
        <div
          className="rounded-3xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,214,0,0.04), rgba(255,214,0,0.01))",
            border: "1.5px solid rgba(255,214,0,0.2)",
            boxShadow: "0 0 25px rgba(255,214,0,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, #ffd600, transparent)",
              opacity: 0.5,
            }}
          />
          <div className="flex items-center gap-2 mb-4">
            <StarIcon
              size={16}
              style={{
                color: "#ffd600",
              }}
            />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{
                color: "rgba(255,214,0,0.7)",
              }}
            >
              Ejemplos / 例句
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {item.ejemplos.map((c, u) => (
              <ZeComponent key={u} es={c.espanol} zh={c.chino} cc={cc} index={u} showChinese={showChinese} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export { YeComponent as default };
