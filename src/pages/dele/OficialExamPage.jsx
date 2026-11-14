import {
  MicIcon,
  BookOpenIcon,
  SparklesIcon,
  GraduationCapIcon,
  ChevronRightIcon,
  Volume2Icon,
  ChevronDownIcon,
  TriangleAlertIcon,
  ArrowLeftIcon,
  ListChecksIcon,
  ClockIcon,
  PenToolIcon,
  HeadphonesIcon,
  KeyRoundIcon,
  LoaderCircleIcon,
  TargetIcon,
  SquareIcon,
  EyeOffIcon,
  CircleCheckIcon,
  CircleXIcon,
  EyeIcon,
  PlayIcon,
  GaugeIcon,
  InfoIcon,
  PauseIcon,
  RotateCcwIcon,
  ClipboardListIcon,
  ImageIcon,
  UserCheckIcon,
} from "lucide-react";
import * as React from "react";
import TextoDele from "../../components/dele/TextoDele.jsx";
import "../../styles/v14-fix-examenes.css";
import { turnosDeAudio, anuncioAudio } from "../../lib/vocesDele.js";

// Índice de MP3 con voces nativas (Piper) generados por scripts/voces-dele.py; se carga solo al abrir un audio
let indiceVocesDele = null;
const cargarIndiceVoces = () =>
  (indiceVocesDele ??= import("../../data/audio-index-dele.json")
    .then((modulo) => new Set(modulo.default || modulo))
    .catch(() => new Set()));
const urlVozDele = (clave) => `${import.meta.env.BASE_URL || "./"}audio/dele/${clave}.mp3`;
import { useParams, Link } from "react-router";
import * as jsxRuntime from "react/jsx-runtime";
import { u as u_1, C as C_2 } from "../../components/CorrectionDisplay.jsx";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
import {
  i as i_2,
  b as b_1,
  c as c_2,
  r as r_2,
  e,
  d,
  f,
  o,
  g,
  h,
  j as j_1,
  k as k_2,
  m,
  q,
  n,
  s,
} from "../../lib/oficial-loader.js";
const c = "#e0b566";
const C = "#f6dfa8";
// Paleta imperial (laca roja + tinta) igual para todos los niveles: el papel es claro, el acento debe ser oscuro (AA)
const ACENTO_IMPERIAL = { color: "#c8102e", glow: "#8f0c21" };
const be = { A1: ACENTO_IMPERIAL, A2: ACENTO_IMPERIAL, B1: ACENTO_IMPERIAL, B2: ACENTO_IMPERIAL };
const ETIQUETA_CORTA_PRUEBA = {
  1: { es: "Lectura", zh: "阅读", zhLargo: "阅读理解" },
  2: { es: "Audición", zh: "听力", zhLargo: "听力理解" },
  3: { es: "Escritura", zh: "写作", zhLargo: "书面表达" },
  4: { es: "Oral", zh: "口语", zhLargo: "口语表达" },
};
const $s = {
  1: BookOpenIcon,
  2: HeadphonesIcon,
  3: PenToolIcon,
  4: MicIcon,
};
function B() {
  if (typeof window === "undefined") {
    return null;
  }
  const window_speechSynthesis = window.speechSynthesis;
  if (
    window_speechSynthesis &&
    typeof window_speechSynthesis.cancel === "function" &&
    typeof window_speechSynthesis.speak === "function"
  ) {
    return window_speechSynthesis;
  }
  return null;
}
let Me = [];
function ke() {
  const t = B();
  if (!t) {
    return [];
  }
  const r = t.getVoices();
  if (r && r.length) {
    Me = r;
  }
  return Me;
}
if (typeof window !== "undefined") {
  ke();
  window.speechSynthesis?.addEventListener?.("voiceschanged", () => {
    ke();
  });
}
const Cs = [
  [/espa(ñ|n)a|castellano|peninsular|madrid/i, "es-ES"],
  [/m(é|e)xico/i, "es-MX"],
  [/argentina|rioplatense|buenos aires/i, "es-AR"],
  [/colombia|bogot(á|a)/i, "es-CO"],
  [/chile|santiago de chile/i, "es-CL"],
  [/per(ú|u)|lima|andino|andes/i, "es-PE"],
  [/caribe|cuba|rep(ú|u)blica dominicana|puerto rico|venezuela/i, "es-US"],
  [/centroam(é|e)rica|guatemala|honduras|costa rica/i, "es-US"],
  [/estados unidos|norteam(é|e)rica/i, "es-US"],
];
const Ss = [
  [/natural|neural|premium|enhanced|plus/i, 8],
  [/google/i, 6],
  [/online|network/i, 4],
  [
    /m(ó|o)nica|helena|laura|elvira|paulina|sabina|marina|monica|pablo|jorge|(á|a)lvaro|enriqueta|carlos|diego|juan|camila|lupe/i,
    3,
  ],
  [/desktop|default|predeterminad/i, -2],
  [
    /espeak|compact|robot|zarvox|albert|bad news|good news|bubbles|cellos|jester|organ|superstar|trinoids|whisper|zarvox/i,
    -12,
  ],
];
const X = (t) => {
  const r = `${t.name || ""} ${t.voiceURI || ""}`;
  let l = 0;
  for (const [s, g] of Ss) {
    if (s.test(r)) {
      l += g;
    }
  }
  if (/es[-_]es/i.test(t.lang || "")) {
    l += 2;
  }
  if (t.localService === false) {
    l += 1;
  }
  return l;
};
function As(t) {
  const r = ke().filter((x) => /^es\b|^es[-_]/i.test((x.lang || "").replace("_", "-")));
  if (!r.length) {
    return;
  }
  const l = (x) => x.slice().sort((u, d) => X(d) - X(u))[0];
  const s = Cs.find(([x]) => x.test(t || ""))?.[1];
  if (s) {
    const x = r.filter((u) => (u.lang || "").replace("_", "-").toLowerCase() === s.toLowerCase());
    if (x.length) {
      const u = l(x);
      if (X(u) >= 0) {
        return u;
      }
      const d = l(r);
      if (X(d) > X(u)) {
        return d;
      }
      return u;
    }
  }
  const g = r.filter((x) => /es[-_]es/i.test(x.lang || ""));
  const i = g.length ? l(g) : null;
  const n = l(r);
  if (i && X(i) >= X(n) - 2) {
    return i;
  }
  return i || n;
}
function zs(t) {
  const r = () => Math.random();
  const l = (n) => {
    const x = n.slice();
    for (let u = x.length - 1; u > 0; u--) {
      const d = Math.floor(r() * (u + 1));
      [x[u], x[d]] = [x[d], x[u]];
    }
    return x;
  };
  const s = new Map();
  const pruebas = (t.pruebas || []).map((n) => ({
    ...n,
    tareas: (n.tareas || []).map((x) => {
      const items = (x.items || []).map((d) => {
        const b = d.opciones || [];
        if (b.length > 3 || b.every((v) => /^[A-Z]$/.test(String(v).trim())) || b.length < 2) {
          s.set(`${n.prueba}-${x.num}-${d.num}`, d.correcta);
          return d;
        }
        const j = l(b.map((v, N) => N));
        s.set(`${n.prueba}-${x.num}-${d.num}`, j.indexOf(d.correcta));
        return {
          ...d,
          opciones: j.map((v) => b[v]),
          correcta: j.indexOf(d.correcta),
        };
      });
      return {
        ...x,
        items,
      };
    }),
  }));
  let t_claves = t.claves;
  if (t.claves) {
    const n = (x) => {
      if (x === "auditiva") {
        return 2;
      }
      return 1;
    };
    t_claves = Object.fromEntries(
      Object.entries(t.claves).map(([x, u]) => [
        x,
        u.map((d) => ({
          ...d,
          items: (d.items || []).map((b) => {
            const correcta = s.get(`${n(x)}-${d.tarea}-${b.num}`);
            if (correcta === undefined) {
              return b;
            }
            return {
              ...b,
              correcta,
            };
          }),
        })),
      ]),
    );
  }
  return {
    ...t,
    pruebas,
    claves: t_claves,
  };
}
function ZComponent({ children, color = c }) {
  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide"
      style={{
        background: `${color}14`,
        color: `${color}dd`,
        border: `1px solid ${color}33`,
      }}
    >
      {children}
    </span>
  );
}
function YComponent({ titulo, icono, color = c, children, abiertoInicial = false, contador }) {
  const [n, setN] = React.useState(abiertoInicial);
  return (
    <div
      className="rounded-2xl overflow-hidden mb-3.5"
      style={{
        background: "rgba(0,0,0,.22)",
        border: `1px solid ${color}22`,
      }}
    >
      <button
        onClick={() => setN((u) => !u)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-white/[.02]"
      >
        {icono &&
          jsxRuntime.jsx(icono, {
            size: 14,
            style: {
              color,
            },
            className: "shrink-0",
          })}
        <span
          className="text-[11.5px] font-black uppercase tracking-[0.14em] flex-1"
          style={{
            color: `${color}dd`,
          }}
        >
          {titulo}
        </span>
        {contador !== undefined && (
          <span
            className="text-[11px] font-black px-2 py-0.5 rounded-md"
            style={{
              background: `${color}18`,
              color: `${color}cc`,
            }}
          >
            {contador}
          </span>
        )}
        <ChevronDownIcon
          size={14}
          className="shrink-0 transition-transform"
          style={{
            color: `${color}99`,
            transform: n ? "rotate(180deg)" : "none",
          }}
        />
      </button>
      {n && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
function Ge1Component({ children, color = c, icono = InfoIcon }) {
  return (
    <div
      className="rounded-2xl p-3.5 mb-4 flex items-start gap-2.5"
      style={{
        background: `${color}0d`,
        border: `1px solid ${color}2e`,
      }}
    >
      {jsxRuntime.jsx(icono, {
        size: 14,
        style: {
          color,
          marginTop: 2,
        },
        className: "shrink-0",
      })}
      <div className="text-white/60 text-[12.5px] leading-relaxed flex-1">{children}</div>
    </div>
  );
}
function Ne1Component({ texto, color = c }) {
  // Sin texto no se pinta la caja vacía de instrucciones
  if (!texto || !String(texto).trim()) return null;
  return (
    <div
      className="ofe-instr rounded-xl p-3.5 mb-4"
      style={{
        background: "rgba(224,181,102,.06)",
        border: `1px solid ${color}22`,
      }}
    >
      <div
        className="text-[11px] font-black uppercase tracking-[0.16em] mb-1"
        style={{
          color,
        }}
      >
        INSTRUCCIONES
      </div>
      <p className="text-white/65 text-[12.5px] leading-relaxed">{texto}</p>
    </div>
  );
}
function EsComponent({ texto }) {
  const r = texto.replace(/^\[|\]$/g, "").replace(/^FOTOGRAF[IÍ]A\s*\d*\s*:?\s*/i, "");
  const l = (texto.match(/FOTOGRAF[IÍ]A\s*\d*/i) || ["FOTOGRAFÍA"])[0];
  return (
    <div
      className="rounded-2xl overflow-hidden mb-3.5"
      style={{
        border: `1px solid ${c}35`,
        background: "linear-gradient(140deg, rgba(224,181,102,.07), rgba(0,0,0,.3))",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: "rgba(0,0,0,.3)",
          borderBottom: `1px solid ${c}22`,
        }}
      >
        <ImageIcon
          size={13}
          style={{
            color: c,
          }}
        />
        <span
          className="text-[11px] font-black uppercase tracking-[0.2em]"
          style={{
            color: C,
          }}
        >
          {l.toUpperCase()}
        </span>
      </div>
      <p className="p-4 text-white/70 text-[13px] leading-[1.75]">{r}</p>
    </div>
  );
}
function TsComponent({ escena, semilla }) {
  const l = [
    ["#1e3a5f", "#2d6a8f", "#f4a261", "#e9c46a"],
    ["#2a1e3f", "#4c3a73", "#f6bd60", "#84a98c"],
    ["#0f3d3e", "#1b6b62", "#f2cc8f", "#e07a5f"],
    ["#3d2b1f", "#6b4f3a", "#ffd6a5", "#a3b18a"],
  ];
  const s = l[semilla % l.length];
  return (
    <div
      className="rounded-2xl overflow-hidden relative mb-3.5"
      style={{
        border: `1px solid ${c}35`,
        background: "#0a0d1c",
      }}
    >
      <svg viewBox="0 0 400 240" className="w-full block">
        <defs>
          <linearGradient id="cielo2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s[0]} />
            <stop offset="100%" stopColor={s[1]} />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#cielo2)" />
        <circle cx="318" cy="54" r="26" fill={s[2]} opacity="0.5" />
        <rect x="0" y="150" width="400" height="90" fill={s[3]} opacity="0.7" />
        <rect x="18" y="86" width="46" height="66" fill={s[0]} opacity="0.85" />
        <rect x="300" y="92" width="52" height="60" fill={s[1]} opacity="0.75" />
        <circle cx="120" cy="122" r="12" fill={s[2]} />
        <rect x="110" y="134" width="20" height="34" rx="7" fill={s[1]} />
        <circle cx="272" cy="118" r="12" fill={s[3]} />
        <rect x="262" y="130" width="20" height="38" rx="7" fill={s[2]} />
      </svg>
      {escena && (
        <div
          className="p-3"
          style={{
            background: "rgba(255,255,255,.03)",
            borderTop: `1px solid ${c}20`,
          }}
        >
          <div
            className="text-[11px] font-black uppercase tracking-wider mb-1"
            style={{
              color: c,
            }}
          >
            {escena.titulo}
          </div>
          <p className="text-white/55 text-[12.5px] leading-relaxed">{escena.descripcion}</p>
        </div>
      )}
    </div>
  );
}
function GeComponent({ guion, velocidad, setVelocidad, items, clips }) {
  const { t: t_1 } = useLanguage();
  const n = React.useMemo(() => {
    const y = h(clips);
    if (y.length) {
      return y;
    }
    const A = (items || []).filter((z) => z.textoAudio);
    if (A.length) {
      return A.map((z, E) => ({
        etiqueta: z.etiqueta || `Parte ${E + 1}`,
        texto: z.textoAudio,
        tipo: "locucion",
      }));
    }
    return j_1(guion);
  }, [guion, items, clips]);
  const [x, setX] = React.useState(false);
  const [d, setD] = React.useState(null);
  const [k, setK] = React.useState(false);
  const [v, setV] = React.useState(false);
  const TRef = React.useRef(0);
  const audioActualRef = React.useRef(null);
  const [vocesNativas, setVocesNativas] = React.useState(null);
  React.useEffect(() => {
    let vivo = true;
    cargarIndiceVoces().then((indice) => vivo && setVocesNativas(indice));
    return () => {
      vivo = false;
    };
  }, []);
  const pararAudioNativo = () => {
    audioActualRef.current?.pause();
    audioActualRef.current = null;
  };
  const onClick = React.useCallback(() => {
    TRef.current += 1;
    B()?.cancel();
    pararAudioNativo();
    setX(false);
    setD(null);
  }, []);
  React.useEffect(
    () => () => {
      TRef.current += 1;
      B()?.cancel();
      pararAudioNativo();
    },
    [],
  );
  const V = React.useCallback(
    (y) => {
      const A = B();
      const hayNativas = vocesNativas && vocesNativas.size > 0;
      if (!hayNativas && (!A || typeof window.SpeechSynthesisUtterance !== "function")) {
        alert(t_1("Tu navegador no permite reproducir este audio.", "你的浏览器无法播放此音频。"));
        return;
      }
      A?.cancel();
      pararAudioNativo();
      const z = TRef.current + 1;
      TRef.current = z;
      const E = n.slice(y).filter((S) => k_2(S.texto));
      if (!E.length) {
        return;
      }
      setX(true);
      const R = 3000;
      const P = 5000;
      const M = [];
      const K = (S) =>
        new Promise((resolve) => {
          M.push(window.setTimeout(resolve, S));
        });
      // MP3 con voz nativa; si no está generado o falla, la voz del navegador
      const reproducirNativo = (clave) =>
        new Promise((resolve) => {
          const audio = new Audio(urlVozDele(clave));
          audio.playbackRate = Math.min(1.3, Math.max(0.6, velocidad / 0.9));
          audio.onended = () => resolve(true);
          audio.onerror = () => resolve(false);
          audioActualRef.current = audio;
          audio.play().catch(() => resolve(false));
        });
      const decir = async (turno, contexto) => {
        if (vocesNativas?.has(turno.clave) && (await reproducirNativo(turno.clave))) return;
        if (TRef.current === z) await J(turno.texto, contexto);
      };
      const reproducirSegmento = async (texto) => {
        const turnos = turnosDeAudio(texto);
        for (let indice = 0; indice < turnos.length; indice++) {
          if (TRef.current !== z) return;
          await decir(turnos[indice], texto);
          if (indice < turnos.length - 1 && TRef.current === z) await K(350);
        }
      };
      const J = (S, G) =>
        new Promise((resolve) => {
          if (!A || typeof window.SpeechSynthesisUtterance !== "function") return resolve();
          const q = new window.SpeechSynthesisUtterance(S);
          const D = As(G);
          if (D) {
            q.voice = D;
            q.lang = D.lang || "es-ES";
          } else {
            q.lang = "es-ES";
          }
          q.rate = velocidad;
          q.pitch = 1;
          q.volume = 1;
          q.onend = () => resolve();
          q.onerror = () => resolve();
          A.speak(q);
        });
      const de = (S, G) => `Audio ${(String(S).match(/\d+/) || [])[0] || String(G)}.`;
      (async () => {
        for (let S = 0; S < E.length; S++) {
          if (TRef.current !== z) {
            M.forEach(clearTimeout);
            return;
          }
          const G = y + S;
          setD(G);
          const p = E[S].etiqueta || `Audio ${S + 1}`;
          await decir(anuncioAudio(de(p, S + 1)), p);
          if (TRef.current !== z) {
            M.forEach(clearTimeout);
            return;
          }
          await K(R);
          if (TRef.current !== z) {
            M.forEach(clearTimeout);
            return;
          }
          await reproducirSegmento(E[S].texto);
          if (S < E.length - 1) {
            if (TRef.current !== z) {
              M.forEach(clearTimeout);
              return;
            }
            await K(P);
          }
        }
        M.forEach(clearTimeout);
        if (TRef.current === z) {
          setX(false);
          setD(null);
        }
      })();
    },
    [n, velocidad, t_1, vocesNativas],
  );
  const U = React.useMemo(() => k_2(guion), [guion]);
  return (
    <div
      className="rounded-2xl p-4 mb-4"
      style={{
        background: `linear-gradient(140deg, ${c}0d, rgba(0,0,0,.22))`,
        border: `1px solid ${c}28`,
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            if (x) {
              return onClick();
            }
            return V(0);
          }}
          className="xm-ofe-play gm-no-adapt flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[12.5px] transition-transform hover:scale-[1.03]"
          style={{
            background: `linear-gradient(135deg, ${c}, ${C})`,
            color: "#17130a",
            boxShadow: `0 0 22px ${c}40`,
          }}
        >
          <PlayIcon size={14} />
          {x ? t_1("Reiniciar audio", "重新播放") : t_1("Escuchar todo el audio", "播放完整音频")}
        </button>
        {x && (
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-bold text-white/60"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <SquareIcon size={12} /> {t_1("Parar", "停止")}
          </button>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          <GaugeIcon size={13} className="text-white/35" />
          {[0.75, 0.9, 1, 1.15].map((y) => (
            <button
              key={y}
              onClick={() => {
                setVelocidad(y);
                if (x) {
                  onClick();
                }
              }}
              className="px-2 py-1 rounded-md text-[11px] font-black transition-colors"
              style={{
                background: velocidad === y ? `${c}25` : "rgba(255,255,255,.04)",
                color: velocidad === y ? C : "rgba(255,255,255,.4)",
                border: `1px solid ${velocidad === y ? `${c}50` : "rgba(255,255,255,.08)"}`,
              }}
            >
              {y}x
            </button>
          ))}
        </div>
      </div>
      <div
        className="mt-3 h-1 rounded-full overflow-hidden"
        style={{
          background: "rgba(255,255,255,.07)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${n.length ? ((d === null ? 0 : d + 1) / n.length) * 100 : 0}%`,
            background: `linear-gradient(90deg, ${c}, ${C})`,
          }}
        />
      </div>
      {n.length > 0 && (
        <div className="mt-3.5">
          <div
            className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
            style={{
              color: `${c}bb`,
            }}
          >
            {t_1("Escuchar por partes", "分段播放")} · {n.length}
          </div>
          <div className="flex flex-wrap gap-2">
            {n.map((y, A) => {
              const z = d === A && x;
              return (
                <button
                  key={A}
                  onClick={() => V(A)}
                  title={y.texto.slice(0, 160)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors max-w-full"
                  style={{
                    background: z ? `${c}22` : "rgba(255,255,255,.045)",
                    border: `1px solid ${z ? `${c}60` : "rgba(255,255,255,.09)"}`,
                    color: z ? C : "rgba(255,255,255,.6)",
                  }}
                >
                  <Volume2Icon
                    size={11}
                    style={{
                      color: c,
                    }}
                  />
                  <span className="truncate max-w-[190px]">{Is(y, A, t_1)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 mt-3.5">
        <button
          onClick={() => {
            setK((y) => !y);
          }}
          className="flex items-center gap-1.5 text-[11px] font-bold text-white/35 hover:text-white/65 transition-colors"
        >
          {k ? <EyeOffIcon size={12} /> : <EyeIcon size={12} />}
          {k
            ? t_1("Ocultar guion", "隐藏脚本")
            : t_1("Ver guion con marcas de locución", "查看带播音标记的脚本")}
        </button>
        <button
          onClick={() => {
            setV((y) => !y);
          }}
          className="flex items-center gap-1.5 text-[11px] font-bold text-white/35 hover:text-white/65 transition-colors"
        >
          {v ? <EyeOffIcon size={12} /> : <EyeIcon size={12} />}
          {v ? t_1("Ocultar transcripción", "隐藏文本") : t_1("Ver transcripción", "查看文本")}
        </button>
      </div>
      {k && (
        <div
          className="mt-2.5 rounded-xl p-3.5 max-h-80 overflow-y-auto whitespace-pre-line text-[12.5px] leading-relaxed"
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {n.map((y, A) => (
            <span key={A} className="block mb-2">
              <span
                className="font-mono text-[11px] font-black mr-1.5"
                style={{
                  color: c,
                }}
              >
                [{y.etiqueta}]
              </span>
              <span className="text-white/60">{y.texto}</span>
            </span>
          ))}
        </div>
      )}
      {v && (
        <div
          className="mt-2.5 rounded-xl p-3.5 max-h-80 overflow-y-auto"
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <TextoDele texto={guion} variante="guion" />
        </div>
      )}
      <p className="mt-2.5 text-[11px] text-white/25">
        {t_1(
          "Cada audio se reproduce con la voz española de tu dispositivo.",
          "音频使用设备的西班牙语语音合成播放。",
        )}
      </p>
    </div>
  );
}
function Is(t, r, l) {
  const s = t.etiqueta || "";
  if (/^(AUDIO|PISTA|CLIP)\s*\d/i.test(s)) {
    return s;
  }
  if (s.match(/VOZ\s*\d*/i)) {
    return s.replace(/\s*[-–—]\s*/g, " · ").slice(0, 60);
  }
  if (/^(Parte|pausa|ruido|sonido)/i.test(s)) {
    if (s.length > 34) {
      return `${s.slice(0, 34)}…`;
    }
    return s;
  }
  return `${l("Parte", "第")} ${r + 1}`;
}
function LeComponent({ item, valor, onSelect, corregido, color, t: t_1 }) {
  const [showSupport, setShowSupport] = React.useState(false);
  const isRight = corregido && valor === item.correcta;
  const isWrong = corregido && valor !== undefined && valor !== item.correcta;
  const hasKey = !!(item.justificacion || item.fraseSoporte);
  const letterMode = o(item.opciones);
  const optionClass = (index) => {
    const picked = valor === index;
    if (corregido) {
      if (index === item.correcta) return "is-right";
      if (picked) return "is-wrong";
      return "is-dim";
    }
    return picked ? "is-picked" : "";
  };
  // Ítem con estilos propios (v12-examenes.css): fuera del adaptador de colores
  return (
    <div className={`ofe-item xm-item gm-no-adapt ${isRight ? "is-ok" : isWrong ? "is-bad" : ""}`} style={{ "--xm-lvl": color }}>
      <div className="xm-item-head">
        <span className="xm-item-num">{item.num}</span>
        <p data-enunciado={item.num} className="xm-item-q">
          {item.enunciado}
        </p>
        {corregido &&
          (isRight ? (
            <span className="xm-item-flag ok">
              <CircleCheckIcon size={16} /> {t_1("Correcta", "正确")}
            </span>
          ) : isWrong ? (
            <span className="xm-item-flag bad">
              <CircleXIcon size={16} /> {t_1("Incorrecta", "错误")}
            </span>
          ) : (
            <span className="xm-item-flag none">{t_1("Sin responder", "未作答")}</span>
          ))}
      </div>
      {letterMode ? (
        <div className="xm-item-letters">
          <span className="xm-item-hint">{t_1("Marque el texto", "选择对应文本")}</span>
          {item.opciones.map((option, index) => (
            <button
              key={index}
              type="button"
              data-opcion={index}
              data-item={item.num}
              data-correcta={index === item.correcta ? "1" : "0"}
              aria-pressed={valor === index}
              onClick={() => !corregido && onSelect(index)}
              disabled={corregido}
              className={`xm-item-letter ${optionClass(index)}`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="xm-item-opts">
          {item.opciones.map((option, index) => (
            <button
              key={index}
              type="button"
              data-opcion={index}
              data-item={item.num}
              data-correcta={index === item.correcta ? "1" : "0"}
              aria-pressed={valor === index}
              onClick={() => !corregido && onSelect(index)}
              disabled={corregido}
              className={`xm-item-opt ${optionClass(index)}`}
            >
              <span className="xm-item-abc">{g(index)}</span>
              <span className="xm-item-txt">{option}</span>
            </button>
          ))}
        </div>
      )}
      {corregido && hasKey && (
        <div data-clave={item.num} className="xm-item-key">
          <div className="xm-item-key-head">
            <KeyRoundIcon size={14} />
            <span>{t_1("Clave", "答案与依据")}</span>
            <b>
              {g(item.correcta)} · {item.opciones[item.correcta]}
            </b>
          </div>
          {item.justificacion && (
            <p data-justificacion={item.num} className="xm-item-why">
              {item.justificacion}
            </p>
          )}
          {item.fraseSoporte && (
            <>
              <button type="button" onClick={() => setShowSupport((value) => !value)} className="xm-item-support-btn">
                <EyeIcon size={14} />{" "}
                {showSupport
                  ? t_1("Ocultar la frase que lo justifica", "隐藏依据句")
                  : t_1("Ver la frase que lo justifica", "查看依据句")}
              </button>
              {showSupport && (
                <p data-frase={item.num} className="xm-item-support">
                  «{item.fraseSoporte}»
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
function VeComponent({ rubrica, color }) {
  const { t: t_1 } = useLanguage();
  if (f(rubrica)) {
    return (
      <div className="space-y-2.5">
        {rubrica.map((s, g) => (
          <div
            key={g}
            className="rounded-xl overflow-hidden"
            style={{
              background: "rgba(0,0,0,.2)",
              border: "1px solid rgba(255,255,255,.07)",
            }}
          >
            <div
              className="px-3.5 py-2 flex items-center gap-2"
              style={{
                background: `${color}10`,
                borderBottom: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <TargetIcon
                size={12}
                style={{
                  color,
                }}
              />
              <span
                className="text-[11.5px] font-black uppercase tracking-wider"
                style={{
                  color: `${color}dd`,
                }}
              >
                {s.criterio}
              </span>
              {s.descripcion && <span className="text-[11px] text-white/35">{s.descripcion}</span>}
            </div>
            <div
              className="divide-y"
              style={{
                borderColor: "rgba(255,255,255,.05)",
              }}
            >
              {(s.bandas || []).map((i, n) => (
                <div key={n} className="flex items-start gap-3 px-3.5 py-2.5">
                  <span
                    className="shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-[11px] font-black"
                    style={{
                      background: /no apto|insuficiente|0|1/i.test(i.banda)
                        ? "rgba(200,16,46,.13)"
                        : "rgba(46,107,63,.13)",
                      color: /no apto|insuficiente|0|1/i.test(i.banda) ? "#a3122a" : "#2e6b3f",
                    }}
                  >
                    {i.banda}
                    {i.puntos ? ` · ${i.puntos}` : ""}
                  </span>
                  <span className="text-white/60 text-[12px] leading-relaxed flex-1">{i.descriptor}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-[11px] text-white/25">
          {t_1(
            "En el examen real, la expresión escrita la valoran dos calificadores y la oral, el entrevistador (40 %) y un calificador (60 %).",
            "真实考试中，书面表达由两位评分员评定，口语由面试官（40%）和评分员（60%）评定。",
          )}
        </p>
      </div>
    );
  }
  return null;
}
function OsComponent({ entrevistador, color }) {
  const { t: t_1 } = useLanguage();
  if (m(entrevistador)) {
    return (
      <div
        className="rounded-2xl overflow-hidden mb-3.5"
        style={{
          background: "linear-gradient(140deg, rgba(200,150,30,.06), rgba(0,0,0,.26))",
          border: "1px solid rgba(200,150,30,.22)",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: "rgba(0,0,0,.28)",
            borderBottom: "1px solid rgba(200,150,30,.18)",
          }}
        >
          <UserCheckIcon size={14} className="ofx-acento" />
          <span className="text-[11px] font-black uppercase tracking-[0.18em] ofx-acento">
            {t_1("Guion del entrevistador", "考官脚本")}
          </span>
          {entrevistador.tiempos && (
            <span className="ml-auto text-[11px] font-bold text-white/40">
              <ClockIcon size={10} className="inline mr-1" />
              {entrevistador.tiempos}
            </span>
          )}
        </div>
        <div className="p-4 space-y-3">
          {(entrevistador.fases || []).map((s, g) => (
            <div
              key={g}
              className="rounded-xl p-3.5"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11.5px] font-black text-white/85">{s.fase}</span>
                {s.tiempo && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                    style={{
                      background: "rgba(200,150,30,.14)",
                      color: "#d8b4fe",
                    }}
                  >
                    {s.tiempo}
                  </span>
                )}
              </div>
              {q(s) && <p className="text-white/55 text-[12px] leading-relaxed mb-2">{q(s)}</p>}
              {(s.preguntas || []).length > 0 && (
                <ul className="space-y-1.5">
                  {(s.preguntas || []).map((i, n) => (
                    <li key={n} className="flex items-start gap-2 text-[12.5px] text-white/70">
                      <span
                        className="font-mono text-[11px] mt-0.5 shrink-0"
                        style={{
                          color,
                        }}
                      >
                        {n + 1}.
                      </span>
                      <span className="leading-relaxed">{i}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {n(entrevistador).length > 0 && (
            <div
              className="rounded-xl p-3.5"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div className="text-[11px] font-black uppercase tracking-[0.16em] text-white/35 mb-2">
                {t_1("Preguntas de apoyo", "辅助提问")}
              </div>
              <ul className="space-y-1.5">
                {n(entrevistador).map((s, g) => (
                  <li key={g} className="flex items-start gap-2 text-[12.5px] text-white/55">
                    <span className="text-white/25 shrink-0">·</span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {s(entrevistador) && (
            <div
              className="rounded-xl p-3.5 flex items-start gap-2.5"
              style={{
                background: "rgba(251,191,36,.07)",
                border: "1px solid rgba(251,191,36,.22)",
              }}
            >
              <TriangleAlertIcon size={13} className="text-amber-300 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-300 mb-1">
                  {t_1("Si el candidato se bloquea", "若考生卡住")}
                </div>
                <p className="text-white/60 text-[12px] leading-relaxed">{s(entrevistador)}</p>
              </div>
            </div>
          )}
          {entrevistador.notas && (
            <p className="text-white/40 text-[11.5px] leading-relaxed">{entrevistador.notas}</p>
          )}
        </div>
      </div>
    );
  }
  return null;
}
function RsComponent({ encuesta }) {
  return (
    <div
      className="rounded-2xl p-4 mb-3.5"
      style={{
        background: "rgba(0,0,0,.25)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
        style={{
          color: c,
        }}
      >
        ENCUESTA · {String(encuesta.tema || "").toUpperCase()}
      </div>
      <p className="text-white/75 text-[13px] font-bold mb-2.5">{encuesta.pregunta}</p>
      <div className="space-y-1.5">
        {(encuesta.frases || []).map((r, l) => (
          <label key={l} className="flex items-start gap-2 text-[12.5px] text-white/55">
            <input type="radio" name="enc-oficial" className="mt-1 accent-amber-400" />
            {r}
          </label>
        ))}
      </div>
    </div>
  );
}
function Oe1Component({ tarea, color, extra }) {
  const { t: t_1 } = useLanguage();
  const itemCount = (tarea.items || []).length;
  // Cabecera de tarea: cinta de laca roja con sello (estilos en v12-examenes.css)
  return (
    <div className="ofe-thead xm-thead gm-no-adapt">
      <span className="xm-thead-seal">
        <small>TAREA</small>
        {tarea.num}
      </span>
      <div className="xm-thead-text">
        <div className="xm-thead-title">{tarea.titulo}</div>
        <div className="xm-thead-tags">
          {tarea.genero && <span className="xm-thead-tag">{tarea.genero}</span>}
          {tarea.subgenero && tarea.subgenero !== tarea.genero && tarea.subgenero !== tarea.tipoAudio && (
            <span className="xm-thead-tag">{tarea.subgenero}</span>
          )}
          {tarea.tipoAudio && <span className="xm-thead-tag">{tarea.tipoAudio}</span>}
          {tarea.ambito && <span className="xm-thead-tag soft">{e(tarea.ambito)}</span>}
          {tarea.subtema && <span className="xm-thead-sub">{tarea.subtema}</span>}
          {tarea.tiempo && (
            <span className="xm-thead-meta">
              <ClockIcon size={12} />
              {tarea.tiempo}
            </span>
          )}
          <span className="xm-thead-meta">
            {itemCount ? `${itemCount} ${t_1("ítems", "题")}` : `${(tarea.puntosGuia || []).length} ${t_1("puntos guía", "提示要点")}`}
          </span>
        </div>
      </div>
      {extra}
    </div>
  );
}
function PsComponent({ tarea }) {
  const { t: t_1 } = useLanguage();
  const tarea_material = tarea.material;
  return (
    <>
      {tarea.texto && (
        <div
          className="ofe-paper rounded-2xl p-4 mb-4"
          style={{
            background: "rgba(0,0,0,.25)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {tarea.tituloTexto && (
            <div
              className="text-center text-white/85 font-black text-[15px] mb-2.5 pb-2"
              style={{
                borderBottom: "1px solid rgba(255,255,255,.09)",
              }}
            >
              {tarea.tituloTexto}
            </div>
          )}
          <TextoDele texto={tarea.texto} variante="lectura" />
          <div
            className="flex flex-wrap items-center gap-3 mt-3 pt-2.5"
            style={{
              borderTop: "1px dashed rgba(255,255,255,.09)",
            }}
          >
            {tarea.palabras ? (
              <span className="text-[11px] font-bold text-white/25">
                {tarea.palabras} {t_1("palabras", "词")}
              </span>
            ) : null}
            {tarea.fuente && <span className="text-[11px] italic text-white/25">{tarea.fuente}</span>}
          </div>
        </div>
      )}
      {tarea_material?.bloques && tarea_material.bloques.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
          {tarea_material.bloques.map((s) => (
            <div
              key={s.letra}
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,0,0,.24)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="font-mono font-black text-[11px] w-5 h-5 rounded flex items-center justify-center"
                  style={{
                    background: `${c}18`,
                    color: C,
                    border: `1px solid ${c}30`,
                  }}
                >
                  {s.letra}
                </span>
                {s.titulo && <span className="text-white/80 font-bold text-[12.5px]">{s.titulo}</span>}
              </div>
              <TextoDele texto={s.texto} variante="compacto" data-bloque={s.letra} />
            </div>
          ))}
        </div>
      )}
      {tarea_material?.enunciados && tarea_material.enunciados.length > 0 && tarea.tipo !== "relacionar" && (
        <div
          className="rounded-2xl p-3.5 mb-4"
          style={{
            background: "rgba(0,0,0,.22)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div
            className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
            style={{
              color: c,
            }}
          >
            Enunciados
          </div>
          <ul className="space-y-1.5">
            {tarea_material.enunciados.map((s, g) => (
              <li key={g} className="flex items-start gap-2 text-[12.5px] text-white/55">
                <span
                  className="font-mono text-[11px] mt-0.5 shrink-0"
                  style={{
                    color: C,
                  }}
                >
                  {g + 1}.
                </span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
          {typeof tarea_material.sobrantes === "number" && tarea_material.sobrantes > 0 && (
            <p className="text-[11px] text-white/25 mt-2">
              Hay {tarea_material.sobrantes} {t_1("opciones que no se utilizan.", "个选项不使用。")}
            </p>
          )}
        </div>
      )}
      {tarea_material?.fragmentos && tarea_material.fragmentos.length > 0 && (
        <div
          className="rounded-2xl p-3.5 mb-4"
          style={{
            background: "rgba(0,0,0,.22)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div
            className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
            style={{
              color: c,
            }}
          >
            Fragmentos
          </div>
          <div className="space-y-1.5">
            {tarea_material.fragmentos.map((s) => (
              <div key={s.letra} className="flex gap-2 text-[12px] text-white/55">
                <span
                  className="font-mono font-black shrink-0"
                  style={{
                    color: C,
                  }}
                >
                  {s.letra}
                </span>
                <TextoDele texto={s.texto} variante="compacto" className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      )}
      {tarea_material?.textos && tarea_material.textos.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
          {tarea_material.textos.map((s, g) => (
            <div
              key={g}
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,0,0,.24)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              {(s.titulo || s.tituloTexto) && (
                <div className="text-white/80 font-bold text-[12.5px] mb-1.5">
                  {s.titulo || s.tituloTexto}
                </div>
              )}
              <TextoDele texto={s.texto} variante="compacto" />
              {s.palabras ? (
                <div className="text-[11px] text-white/25 mt-1.5">
                  {s.palabras} {t_1("palabras", "词")}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
function IaComponent() {
  const { level = "A1", examId = "1" } = useParams();
  const nivel = String(level).toUpperCase();
  const { t: t_1 } = useLanguage();
  const { correctText, isCorrecting } = u_1();
  const [examen, setExamen] = React.useState(null);
  const [cargando, setCargando] = React.useState(true);
  // null | "no-encontrado" | "error"
  const [fallo, setFallo] = React.useState(null);
  const [intento, setIntento] = React.useState(0);
  const [b, setB] = React.useState("p1");
  const [j, setJ] = React.useState({});
  const [N, setN_1] = React.useState(false);
  const [O, setO] = React.useState(false);
  const [U, setU_1] = React.useState(false);
  const [velocidad, setVelocidad] = React.useState(0.9);
  const [E, setE] = React.useState({});
  const [P, setP] = React.useState({});
  const [K, setK] = React.useState({});
  const [de, setDe] = React.useState(null);
  const GRef = React.useRef(null);
  React.useEffect(() => {
    let activo = true;
    setCargando(true);
    setFallo(null);
    setExamen(null);
    setJ({});
    setN_1(false);
    setO(false);
    setU_1(false);
    setE({});
    setP({});
    setK({});
    setB("p1");
    const numeroModelo = /^\d+$/.test(String(examId)) ? Number(examId) : NaN;
    if (!i_2(nivel) || !Number.isFinite(numeroModelo)) {
      setFallo("no-encontrado");
      setCargando(false);
      return () => {
        activo = false;
      };
    }
    b_1(nivel, numeroModelo)
      .then((modelo) => {
        if (!activo) return;
        if (modelo && Array.isArray(modelo.pruebas)) {
          setExamen(zs(modelo));
        } else {
          setFallo("no-encontrado");
        }
        setCargando(false);
      })
      .catch(() => {
        if (!activo) return;
        setFallo("error");
        setCargando(false);
      });
    return () => {
      activo = false;
      B()?.cancel();
    };
  }, [nivel, examId, intento]);
  const p = be[nivel] || be.A1;
  const q = React.useCallback(
    (a, o) =>
      setJ((h) => ({
        ...h,
        [a]: o,
      })),
    [],
  );
  const D = React.useCallback(
    (a) => {
      const o = (examen ? c_2(examen, a)?.tareas : []) || [];
      let bien = 0;
      let total = 0;
      o.forEach(($) =>
        ($.items || []).forEach((w) => {
          total += 1;
          if (j[`p${a}-${$.num}-${w.num}`] === w.correcta) {
            bien += 1;
          }
        }),
      );
      return {
        bien,
        total,
        pct: total ? Math.round((bien / total) * 100) : 0,
      };
    },
    [examen, j],
  );
  const Q = React.useMemo(() => D(1), [D]);
  const W = React.useMemo(() => D(2), [D]);
  const ae = React.useCallback((a) => {
    const o = Object.values(a)
      .map((h) => {
        if (typeof h?.puntuacion === "number") {
          return h.puntuacion;
        }
        return null;
      })
      .filter((h) => h !== null);
    if (o.length) {
      return Math.round(o.reduce((acc, item) => acc + item, 0) / o.length);
    }
    return null;
  }, []);
  const mediaEsc = React.useMemo(() => ae(P), [P, ae]);
  const mediaOral = React.useMemo(() => ae(K), [K, ae]);
  React.useEffect(() => {
    if (!examen || (!N && !O)) {
      return;
    }
    const a = [];
    if (N) {
      a.push(Q.pct);
    }
    if (O) {
      a.push(W.pct);
    }
    const total = a.length ? Math.round(a.reduce((acc, item) => acc + item, 0) / a.length) : 0;
    try {
      localStorage.setItem(
        `oficial_res_${nivel}_${examen.modelo}`,
        JSON.stringify({
          lectura: N ? Q.pct : null,
          audicion: O ? W.pct : null,
          total,
          fecha: new Date().toISOString(),
        }),
      );
    } catch {}
  }, [N, O, Q.pct, W.pct, examen, nivel]);
  const Ce = React.useCallback(
    async (a, o, h, m) => {
      if (!o.trim()) {
        return;
      }
      const $ = h === "escritura" ? setP : setK;
      $((I) => ({
        ...I,
        [a]: null,
      }));
      const w = await correctText(o, h, nivel, `${m.titulo}. ${m.instrucciones}`, {
        nivel,
        tipo: m.tipo,
        genero: m.genero,
        situacion: m.situacion,
        destinatario: m.destinatario,
        proposito: m.proposito,
        puntosGuia: m.puntosGuia,
        minPalabras: m.minPalabras,
        maxPalabras: m.maxPalabras,
        rubrica: m.rubrica,
        modeloRespuesta: m.modeloRespuesta,
      });
      $((I) => ({
        ...I,
        [a]: w.data ?? null,
      }));
    },
    [correctText, nivel],
  );
  const es = React.useCallback(
    (a) => {
      const o = window;
      const h = o.SpeechRecognition || o.webkitSpeechRecognition;
      if (!h) {
        alert(t_1("Tu navegador no soporta reconocimiento de voz.", "你的浏览器不支持语音识别。"));
        return;
      }
      try {
        GRef.current?.stop();
      } catch {}
      const m = new h();
      m.lang = "es-ES";
      m.continuous = true;
      m.interimResults = true;
      m.maxAlternatives = 1;
      let $ = "";
      m.onresult = (w) => {
        let I = "";
        for (let L = w.resultIndex; L < w.results.length; L++) {
          if (w.results[L].isFinal) {
            $ += `${w.results[L][0].transcript} `;
          } else {
            I += w.results[L][0].transcript;
          }
        }
        setE((L) => ({
          ...L,
          [a]: $ + I,
        }));
      };
      m.onerror = () => setDe(null);
      m.onend = () => {
        setDe(null);
        setE((w) => ({
          ...w,
          [a]: $.trim(),
        }));
      };
      m.start();
      GRef.current = m;
      setDe(a);
      setE((w) => ({
        ...w,
        [a]: "",
      }));
    },
    [t_1],
  );
  const ss = React.useCallback(() => {
    try {
      GRef.current?.stop();
    } catch {}
    setDe(null);
  }, []);
  if (cargando) {
    return (
      <StarfieldBackground>
        <div className="ofx-estado gm-no-adapt" role="status" aria-live="polite">
          <div className="ofx-estado-card">
            <span className="ofx-spinner" aria-hidden="true" />
            <p className="ofx-estado-es">Cargando el modelo oficial…</p>
            <p className="ofx-estado-zh" lang="zh-CN">正在加载官方试卷…</p>
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  if (!examen) {
    const nivelValido = i_2(nivel);
    const rutaVuelta = nivelValido ? `/oficial/${nivel}` : "/oficial";
    const esError = fallo === "error";
    return (
      <StarfieldBackground>
        <div className="ofx-estado gm-no-adapt">
          <div className="ofx-estado-card" role="alert">
            <span className="ofx-sello" aria-hidden="true" translate="no">
              {esError ? "误" : "无"}
            </span>
            <h1 className="ofx-estado-titulo">
              {esError ? "No se pudo cargar el examen" : "Examen no encontrado"}
              <span className="ofx-estado-zh" lang="zh-CN">
                {esError ? "试卷加载失败" : "未找到该试卷"}
              </span>
            </h1>
            <p className="ofx-estado-texto">
              {esError
                ? "Revisa tu conexión e inténtalo de nuevo."
                : `No existe el modelo «${examId}» en el nivel ${nivelValido ? nivel : "indicado"}.`}
              <span className="ofx-estado-zh" lang="zh-CN">
                {esError ? "请检查网络连接后重试。" : `${nivelValido ? nivel + " 级别中" : ""}没有编号为「${examId}」的试卷。`}
              </span>
            </p>
            <div className="ofx-estado-acciones">
              {esError && (
                <button type="button" className="ofx-btn ofx-btn-oro" onClick={() => setIntento((v) => v + 1)}>
                  <RotateCcwIcon size={16} aria-hidden="true" /> Reintentar · 重试
                </button>
              )}
              <Link to={rutaVuelta} className="ofx-btn ofx-btn-laca">
                <ArrowLeftIcon size={16} aria-hidden="true" />
                {nivelValido ? `Modelos ${nivel} · 返回${nivel}试卷列表` : "Exámenes oficiales · 返回官方试卷"}
              </Link>
            </div>
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  const _ = r_2(examen);
  const ee = c_2(examen, 1);
  const se = c_2(examen, 2);
  const Se = c_2(examen, 3);
  const te = c_2(examen, 4);
  const xe = b === "claves" ? null : c_2(examen, Number(b.slice(1)));
  const n_evaluacion = examen.evaluacion;
  return (
    <StarfieldBackground>
      <style>{`
        .of-scroll { scroll-margin-top: 108px; }
        @keyframes ofIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .of-in { animation: ofIn .4s cubic-bezier(.16,1,.3,1) both; }
      `}</style>
      <img className="ofe-dragon" src={`${import.meta.env.BASE_URL}theme/dragon-enroscado.webp`} alt="" aria-hidden="true" />
      <div className="ofe max-w-5xl mx-auto px-4 py-8">
        <Link
          to={`/oficial/${nivel}`}
          className="inline-flex items-center gap-2 text-white/50 hover:text-amber-300 transition-all mb-6 text-sm group"
        >
          <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t_1("Volver a los modelos", "返回模型列表")}
        </Link>
        <div
          className="ofe-ribbon relative rounded-3xl overflow-hidden mb-6 p-5 md:p-6"
          style={{
            border: `1px solid ${p.color}30`,
            background: `linear-gradient(140deg, ${p.color}12, rgba(10,13,28,.96) 52%, rgba(24,18,10,.92))`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${p.glow}, ${c}, transparent)`,
            }}
          />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${p.color}, ${p.glow})`,
                  color: "#0b0f1e",
                  boxShadow: `0 0 24px ${p.glow}50`,
                }}
              >
                {nivel}
              </div>
              <div>
                <div
                  className="text-[11px] font-black uppercase tracking-[0.2em]"
                  style={{
                    color: `${c}99`,
                  }}
                >
                  {examen.codigo || `MODELO ${String(examen.modelo).padStart(2, "0")}`}
                </div>
                <h1 className="text-white font-black text-xl md:text-2xl leading-tight">{examen.temaCentral}</h1>
                <div className="ofe-ribbon-zh">
                  {/Simulacro nuevo/.test(examen.titulo || "") ? (
                    <>
                      模拟题 <span className="ofe-seal">新</span>
                    </>
                  ) : (
                    <>
                      官方试卷 <span className="ofe-seal">真题</span>
                    </>
                  )}
                </div>
                <p className="text-white/35 text-[12px] font-bold mt-0.5">{examen.titulo}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-white/40">
              <span className="flex items-center gap-1.5">
                <ListChecksIcon
                  size={12}
                  style={{
                    color: p.glow,
                  }}
                />{" "}
                {_.lectura.preguntas + _.audicion.preguntas} {t_1("ítems", "题")}
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon
                  size={12}
                  style={{
                    color: p.glow,
                  }}
                />{" "}
                {_.lectura.minutos + _.audicion.minutos + _.escritura.minutos} min
              </span>
            </div>
          </div>
          {(_.generosLectura.length > 0 || _.variedadesAudio.length > 0) && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {examen.ambito && <ZComponent color="#94a3b8">{e(examen.ambito)}</ZComponent>}
              {_.generosLectura.slice(0, 4).map((a, o) => (
                <ZComponent key={`g${o}`} color={p.glow}>
                  {a}
                </ZComponent>
              ))}
              {_.tiposAudio.slice(0, 3).map((a, o) => (
                <ZComponent key={`a${o}`} color="#60a5fa">
                  {a}
                </ZComponent>
              ))}
              {_.variedadesAudio.map((a, o) => (
                <ZComponent key={`v${o}`} color="#a855f7">
                  {a}
                </ZComponent>
              ))}
            </div>
          )}
        </div>
        <div className="ofe-tabs ofx-tabs grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-5" role="tablist" aria-label="Pruebas del examen · 考试科目">
          {examen.pruebas.map((prueba) => {
            const idPestana = `p${prueba.prueba}`;
            const activa = b === idPestana;
            const IconoPrueba = $s[prueba.prueba] || BookOpenIcon;
            const corta = ETIQUETA_CORTA_PRUEBA[prueba.prueba] || { es: `Prueba ${prueba.prueba}`, zh: "" };
            return (
              <button
                key={prueba.prueba}
                type="button"
                role="tab"
                aria-selected={activa}
                onClick={() => {
                  B()?.cancel();
                  setB(idPestana);
                }}
                className="ofe-tab ofx-tab relative rounded-2xl p-3.5 text-left transition-all overflow-hidden"
                style={{
                  background: activa
                    ? `linear-gradient(140deg, ${p.color}26, rgba(12,16,34,.9))`
                    : "rgba(255,255,255,.03)",
                  border: `1px solid ${activa ? `${p.glow}55` : "rgba(255,255,255,.07)"}`,
                  boxShadow: activa ? `0 0 26px ${p.glow}25` : "none",
                }}
              >
                {activa && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
                    }}
                  />
                )}
                <IconoPrueba size={15} aria-hidden="true" />
                <div className="ofx-tab-meta text-[11px] font-black uppercase tracking-[0.16em] mt-2">
                  PRUEBA {prueba.prueba}
                  {prueba.duracion ? ` · ${prueba.duracion} min` : ""}
                </div>
                <div className="ofx-tab-nombre text-[12px] font-black leading-tight">
                  <span className="ofx-tab-larga">{prueba.nombre}</span>
                  <span className="ofx-tab-corta">{corta.es}</span>
                  {corta.zh && (
                    <span className="ofx-tab-zh" lang="zh-CN">
                      {corta.zhLargo}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
          <button
            type="button"
            role="tab"
            aria-selected={b === "claves"}
            onClick={() => {
              B()?.cancel();
              setB("claves");
            }}
            className="ofe-tab ofx-tab relative rounded-2xl p-3.5 text-left transition-all overflow-hidden"
            style={{
              background:
                b === "claves"
                  ? `linear-gradient(140deg, ${p.color}26, rgba(12,16,34,.9))`
                  : "rgba(255,255,255,.03)",
              border: `1px solid ${b === "claves" ? `${p.glow}55` : "rgba(255,255,255,.07)"}`,
            }}
          >
            {b === "claves" && (
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
                }}
              />
            )}
            <KeyRoundIcon size={15} aria-hidden="true" />
            <div className="ofx-tab-meta text-[11px] font-black uppercase tracking-[0.16em] mt-2">CORRECCIÓN</div>
            <div className="ofx-tab-nombre text-[12px] font-black leading-tight">
              <span className="ofx-tab-larga">Claves y evaluación</span>
              <span className="ofx-tab-corta">Claves</span>
              <span className="ofx-tab-zh" lang="zh-CN">
                答案与评分
              </span>
            </div>
          </button>
        </div>
        {xe && (xe.tareas || []).length > 1 && (
          <nav className="ofx-saltos gm-no-adapt" aria-label="Ir a la tarea · 跳至任务">
            <span className="ofx-saltos-rot">
              Ir a · <span lang="zh-CN">跳至</span>
            </span>
            {(xe.tareas || []).map((tarea) => {
              const tituloCorto = (tarea.titulo || "").trim();
              return (
                <button
                  key={tarea.num}
                  type="button"
                  title={tituloCorto || `Tarea ${tarea.num}`}
                  onClick={() =>
                    document.getElementById(`tarea-${tarea.num}`)?.scrollIntoView({
                      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                      block: "start",
                    })
                  }
                >
                  <b>T{tarea.num}</b>
                  {tituloCorto ? (
                    <span>
                      {tituloCorto.slice(0, 28)}
                      {tituloCorto.length > 28 ? "…" : ""}
                    </span>
                  ) : (
                    <span>
                      Tarea {tarea.num} · <span lang="zh-CN">任务{tarea.num}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
        {b === "p1" && ee && (
          <div className="of-in">
            <EComponent
              titulo={ee.nombre}
              res={Q}
              corregido={N}
              color={p.glow}
              onCorregir={() => setN_1(true)}
              onVerClaves={() => setU_1((a) => !a)}
              mostrarClaves={U}
              duracion={ee.duracion}
            />
            {(ee.tareas || []).map((a) => (
              <div
                key={a.num}
                id={`tarea-${a.num}`}
                className="ofe-tarea of-scroll rounded-3xl overflow-hidden mb-6"
                style={{
                  background: "linear-gradient(150deg, rgba(255,255,255,.045), rgba(255,255,255,.012))",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <Oe1Component tarea={a} color={p.glow} />
                <div className="p-5">
                  <Ne1Component texto={a.instrucciones} />
                  <PsComponent tarea={a} />
                  <div className="space-y-2.5">
                    {(a.items || []).map((o) => (
                      <LeComponent
                        key={o.num}
                        item={o}
                        color={p.glow}
                        t={t_1}
                        valor={j[`p1-${a.num}-${o.num}`]}
                        onSelect={(h) => q(`p1-${a.num}-${o.num}`, h)}
                        corregido={N || U}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {b === "p2" && se && (
          <div className="of-in">
            <EComponent
              titulo={se.nombre}
              res={W}
              corregido={O}
              color={p.glow}
              onCorregir={() => {
                B()?.cancel();
                setO(true);
              }}
              onVerClaves={() => setU_1((a) => !a)}
              mostrarClaves={U}
              duracion={se.duracion}
            />
            {(se.tareas || []).map((a) => (
              <div
                key={a.num}
                id={`tarea-${a.num}`}
                className="ofe-tarea of-scroll rounded-3xl overflow-hidden mb-6"
                style={{
                  background: "linear-gradient(150deg, rgba(255,255,255,.045), rgba(255,255,255,.012))",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <Oe1Component tarea={a} color={p.glow} />
                <div className="p-5">
                  <Ne1Component texto={a.instrucciones} />
                  {a.guion ? (
                    <GeComponent
                      guion={a.guion}
                      items={a.items}
                      clips={a.clips}
                      velocidad={velocidad}
                      setVelocidad={setVelocidad}
                    />
                  ) : (
                    <Ge1Component icono={TriangleAlertIcon} color="#a8741e">
                      {t_1("Este modelo no incluye el guion de audio.", "该模型未包含音频脚本。")}
                    </Ge1Component>
                  )}
                  {a.fichaTecnica && null}
                  {a.material?.bloques && a.material.bloques.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
                      {a.material.bloques.map((o) => (
                        <div
                          key={o.letra}
                          className="rounded-xl p-3"
                          style={{
                            background: "rgba(0,0,0,.24)",
                            border: "1px solid rgba(255,255,255,.07)",
                          }}
                        >
                          <span
                            className="font-mono font-black text-[11px] mr-2"
                            style={{
                              color: C,
                            }}
                          >
                            {o.letra}
                          </span>
                          <TextoDele texto={o.texto} variante="compacto" className="mt-1" />
                        </div>
                      ))}
                    </div>
                  )}
                  {a.parejas && a.parejas.length > 0 && (
                    <YComponent
                      titulo={t_1("Opciones para relacionar", "配对选项")}
                      icono={ClipboardListIcon}
                      color={p.glow}
                      contador={a.parejas.length}
                      abiertoInicial
                    >
                      <div className="space-y-1.5">
                        {a.parejas.map((o, h) => (
                          <div key={h} className="flex items-start gap-2 text-[12.5px] text-white/65">
                            <span
                              className="font-mono font-black text-[11px] mt-0.5 shrink-0 w-4 text-center"
                              style={{
                                color: C,
                              }}
                            >
                              {String(o.corresponde || o.letra || "").trim() || String.fromCharCode(65 + h)}
                            </span>
                            <span className="leading-relaxed flex-1">{o.enunciado}</span>
                          </div>
                        ))}
                        {typeof a.sobrantes === "number" && a.sobrantes > 0 && (
                          <p className="text-[11px] text-white/25">
                            {a.sobrantes} {t_1("opciones no se utilizan.", "个选项不使用。")}
                          </p>
                        )}
                      </div>
                    </YComponent>
                  )}
                  <div className="space-y-2.5">
                    {(a.items || []).map((o) => (
                      <LeComponent
                        key={o.num}
                        item={o}
                        color={p.glow}
                        t={t_1}
                        valor={j[`p2-${a.num}-${o.num}`]}
                        onSelect={(h) => q(`p2-${a.num}-${o.num}`, h)}
                        corregido={O || U}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {b === "p3" && Se && (
          <div className="of-in">
            <Ge1Component icono={SparklesIcon} color={p.glow}>
              {t_1(
                "Escribe tu respuesta y pulsa «Corregir con IA». Recibirás puntuación, errores, correcciones y consejos adaptados a tu nivel. Al final de cada tarea tienes la rúbrica oficial y un modelo de respuesta.",
                "写下你的答案并点击“AI 批改”。你会得到分数、错误、修改和针对你级别的建议。每项任务末尾附有官方评分标准与参考范文。",
              )}
            </Ge1Component>
            {(Se.tareas || []).map((a) => {
              const o = `esc-${a.num}`;
              const h = d(E[o]);
              const m = a.minPalabras || 0;
              const $ = a.maxPalabras || 0;
              const w = h >= m && h <= $ + 25;
              const a_material = a.material;
              return (
                <div
                  key={a.num}
                  id={`tarea-${a.num}`}
                  className="ofe-tarea of-scroll rounded-3xl overflow-hidden mb-6"
                  style={{
                    background: "linear-gradient(150deg, rgba(255,255,255,.045), rgba(255,255,255,.012))",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <Oe1Component
                    tarea={a}
                    color={p.glow}
                    extra={
                      <span
                        className="text-[11px] font-black uppercase tracking-wider"
                        style={{
                          color: `${c}aa`,
                        }}
                      >
                        {m}–{$} {t_1("palabras", "词")}
                      </span>
                    }
                  />
                  <div className="p-5">
                    <Ne1Component texto={a.instrucciones} />
                    {(a.situacion || a.destinatario || a.proposito) && (
                      <div className="grid sm:grid-cols-3 gap-2.5 mb-4">
                        {a.situacion && (
                          <div
                            className="rounded-xl p-3"
                            style={{
                              background: "rgba(59,130,246,.07)",
                              border: "1px solid rgba(59,130,246,.2)",
                            }}
                          >
                            <div className="text-[11px] font-black uppercase tracking-[0.16em] ofx-acento mb-1">
                              {t_1("Situación", "情境")}
                            </div>
                            <p className="text-white/65 text-[12px] leading-relaxed">{a.situacion}</p>
                          </div>
                        )}
                        {a.destinatario && (
                          <div
                            className="rounded-xl p-3"
                            style={{
                              background: "rgba(200,150,30,.07)",
                              border: "1px solid rgba(200,150,30,.2)",
                            }}
                          >
                            <div className="text-[11px] font-black uppercase tracking-[0.16em] ofx-acento mb-1">
                              {t_1("Destinatario", "收件人")}
                            </div>
                            <p className="text-white/65 text-[12px] leading-relaxed">{a.destinatario}</p>
                          </div>
                        )}
                        {a.proposito && (
                          <div
                            className="rounded-xl p-3"
                            style={{
                              background: "rgba(46,107,63,.07)",
                              border: "1px solid rgba(46,107,63,.2)",
                            }}
                          >
                            <div className="text-[11px] font-black uppercase tracking-[0.16em] ofx-acento mb-1">
                              {t_1("Propósito", "目的")}
                            </div>
                            <p className="text-white/65 text-[12px] leading-relaxed">{a.proposito}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {a_material && (a_material.contenido || a_material.guionAudio) && (
                      <div
                        className="rounded-2xl p-4 mb-4"
                        style={{
                          background: "rgba(0,0,0,.25)",
                          border: "1px solid rgba(255,255,255,.07)",
                        }}
                      >
                        <div
                          className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
                          style={{
                            color: c,
                          }}
                        >
                          {a_material.tipo === "audio"
                            ? t_1("Estímulo oral", "听力材料")
                            : t_1("Texto estímulo", "阅读材料")}
                          {a_material.palabras ? ` · ${a_material.palabras} ${t_1("palabras", "词")}` : ""}
                        </div>
                        {a_material.contenido && (
                          <TextoDele texto={a_material.contenido} variante={a_material.tipo === "audio" ? "guion" : "compacto"} />
                        )}
                        {a_material.guionAudio && (
                          <div className="mt-3">
                            <GeComponent
                              guion={a_material.guionAudio}
                              velocidad={velocidad}
                              setVelocidad={setVelocidad}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {(a.puntosGuia || []).length > 0 && (
                      <div
                        className="rounded-2xl p-3.5 mb-4"
                        style={{
                          background: "rgba(0,0,0,.2)",
                          border: "1px solid rgba(255,255,255,.07)",
                        }}
                      >
                        <div
                          className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
                          style={{
                            color: `${c}bb`,
                          }}
                        >
                          {t_1("Puntos guía", "提示要点")}
                        </div>
                        <ul className="space-y-1.5">
                          {(a.puntosGuia || []).map((L, le) => (
                            <li key={le} className="flex items-start gap-2 text-[12.5px] text-white/60">
                              <span
                                className="font-mono text-[11px] mt-0.5 shrink-0"
                                style={{
                                  color: p.glow,
                                }}
                              >
                                {le + 1}.
                              </span>
                              <span className="leading-relaxed">{L}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <textarea
                      value={E[o] || ""}
                      onChange={(L) =>
                        setE((le) => ({
                          ...le,
                          [o]: L.target.value,
                        }))
                      }
                      rows={7}
                      placeholder={t_1("Escribe aquí tu texto en español…", "在此用西班牙语写下你的文章…")}
                      className="w-full rounded-xl p-3.5 text-[13.5px] text-white/85 outline-none resize-y leading-relaxed placeholder:text-white/20"
                      style={{
                        background: "rgba(0,0,0,.28)",
                        border: `1px solid ${w ? "rgba(46,107,63,.35)" : "rgba(255,255,255,.09)"}`,
                      }}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                      <span
                        className="text-[11px] font-bold"
                        style={{
                          color: w ? "#2e6b3f" : "rgba(255,255,255,.35)",
                        }}
                      >
                        {h} {t_1("palabras", "词")} ·{" "}
                        {w
                          ? t_1("extensión correcta", "字数合适")
                          : t_1(`objetivo ${m}-${$}`, `目标 ${m}-${$}`)}
                      </span>
                      <button
                        onClick={() => Ce(o, E[o] || "", "escritura", a)}
                        disabled={isCorrecting || !(E[o] || "").trim()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[12.5px] transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
                        style={{
                          background: `linear-gradient(180deg, ${p.color}, ${p.glow})`,
                          color: "#fff6e0",
                          border: "2px solid #f2c14e",
                        }}
                      >
                        {isCorrecting ? (
                          <LoaderCircleIcon size={14} className="animate-spin" />
                        ) : (
                          <SparklesIcon size={14} />
                        )}
                        {isCorrecting ? t_1("Corrigiendo…", "批改中…") : t_1("Corregir con IA", "AI 批改")}
                      </button>
                    </div>
                    {P[o] && <C_2 data={P[o]} />}
                    {f(a.rubrica) && (
                      <div className="mt-4">
                        <YComponent
                          titulo={t_1("Rúbrica de evaluación", "评分标准")}
                          icono={TargetIcon}
                          color={p.glow}
                          contador={(a.rubrica || []).length}
                        >
                          <VeComponent rubrica={a.rubrica || []} color={p.glow} />
                        </YComponent>
                      </div>
                    )}
                    {a.modeloRespuesta && (
                      <YComponent
                        titulo={t_1("Modelo de respuesta", "参考范文")}
                        icono={GraduationCapIcon}
                        color={c}
                      >
                        <TextoDele texto={a.modeloRespuesta} variante="compacto" />
                      </YComponent>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {b === "p4" && te && (
          <div className="of-in">
            <Ge1Component icono={SparklesIcon} color={p.glow}>
              {t_1(
                "Prepara cada tarea en voz alta. Puedes escribir tus ideas o grabarte con el micrófono y pedir la corrección por IA. Abajo tienes el guion del entrevistador y la rúbrica oficial.",
                "先准备每项任务并大声练习。你可以写下来，或用麦克风录音后请求 AI 批改。下方附有考官脚本与官方评分标准。",
              )}
              {te.preparacion ? ` ${t_1("Tiempo de preparación", "准备时间")}: ${te.preparacion} min.` : ""}
            </Ge1Component>
            {(te.tareas || []).map((a) => {
              const o = `oral-${a.num}`;
              const h = d(E[o]);
              const m = de === o;
              return (
                <div
                  key={a.num}
                  id={`tarea-${a.num}`}
                  className="ofe-tarea of-scroll rounded-3xl overflow-hidden mb-6"
                  style={{
                    background: "linear-gradient(150deg, rgba(255,255,255,.045), rgba(255,255,255,.012))",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <Oe1Component
                    tarea={a}
                    color={p.glow}
                    extra={
                      a.obligatoria ? (
                        <span
                          className="text-[11px] font-black px-1.5 py-0.5 rounded"
                          style={{
                            background: "#b3382f30",
                            color: "#f8a9a2",
                            border: "1px solid #b3382f60",
                          }}
                        >
                          OBLIGATORIA
                        </span>
                      ) : undefined
                    }
                  />
                  <div className="p-5">
                    <Ne1Component texto={a.instrucciones} />
                    {a.situacion && (
                      <div
                        className="rounded-xl p-3.5 mb-3.5"
                        style={{
                          background: "rgba(59,130,246,.07)",
                          border: "1px solid rgba(59,130,246,.2)",
                        }}
                      >
                        <div className="text-[11px] font-black uppercase tracking-[0.16em] mb-1 ofx-acento">
                          SITUACIÓN
                        </div>
                        <p className="text-white/65 text-[12.5px] leading-relaxed">{a.situacion}</p>
                      </div>
                    )}
                    {(a.opciones || []).length > 0 && (
                      <div className="mb-3.5">
                        <div
                          className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
                          style={{
                            color: `${c}aa`,
                          }}
                        >
                          {t_1("Opciones (elige una)", "选项（选一项）")}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(a.opciones || []).map(($) => (
                            <span
                              key={$}
                              className="px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-white/60"
                              style={{
                                background: "rgba(255,255,255,.05)",
                                border: "1px solid rgba(255,255,255,.1)",
                              }}
                            >
                              {$}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {(a.propuestas || []).length > 0 && (
                      <div
                        className="rounded-2xl p-3.5 mb-3.5"
                        style={{
                          background: "rgba(0,0,0,.24)",
                          border: "1px solid rgba(255,255,255,.07)",
                        }}
                      >
                        <div
                          className="text-[11px] font-black uppercase tracking-[0.16em] mb-2"
                          style={{
                            color: c,
                          }}
                        >
                          {t_1("Propuestas para valorar", "待评估方案")} · {(a.propuestas || []).length}
                        </div>
                        <ul className="space-y-1.5">
                          {(a.propuestas || []).map(($, w) => (
                            <li key={w} className="flex items-start gap-2 text-[12.5px] text-white/60">
                              <span
                                className="font-mono text-[11px] mt-0.5 shrink-0"
                                style={{
                                  color: p.glow,
                                }}
                              >
                                {w + 1}.
                              </span>
                              <span className="leading-relaxed">{$}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {a.foto && <EsComponent texto={a.foto} />}
                    {!a.foto && a.escena && (
                      <TsComponent escena={a.escena} semilla={(examen.modelo || 0) + a.num} />
                    )}
                    {a.encuesta && <RsComponent encuesta={a.encuesta} />}
                    {a.cuadernilloCandidato && a.cuadernilloCandidato !== a.instrucciones && (
                      <YComponent
                        titulo={t_1("Cuadernillo del candidato", "考生手册")}
                        icono={ClipboardListIcon}
                        color={p.glow}
                      >
                        <TextoDele texto={a.cuadernilloCandidato} variante="compacto" />
                      </YComponent>
                    )}
                    {(a.puntosGuia || []).length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {(a.puntosGuia || []).map(($, w) => (
                          <li key={w} className="flex items-start gap-2 text-[12.5px] text-white/55">
                            <span
                              className="font-mono text-[11px] mt-0.5 shrink-0"
                              style={{
                                color: p.glow,
                              }}
                            >
                              {w + 1}.
                            </span>
                            <span className="leading-relaxed">{$}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <textarea
                      value={E[o] || ""}
                      onChange={($) =>
                        setE((w) => ({
                          ...w,
                          [o]: $.target.value,
                        }))
                      }
                      rows={5}
                      placeholder={t_1(
                        "Escribe aquí tus ideas o el texto reconocido por el micrófono…",
                        "在此写下你的思路或麦克风识别出的文字…",
                      )}
                      className="w-full rounded-xl p-3.5 text-[13.5px] text-white/85 outline-none resize-y leading-relaxed placeholder:text-white/20"
                      style={{
                        background: "rgba(0,0,0,.28)",
                        border: "1px solid rgba(255,255,255,.09)",
                      }}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (m) {
                              return ss();
                            }
                            return es(o);
                          }}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-black transition-colors"
                          style={{
                            background: m ? "rgba(239,68,68,.16)" : "rgba(255,255,255,.05)",
                            border: `1px solid ${m ? "rgba(239,68,68,.45)" : "rgba(255,255,255,.1)"}`,
                            color: m ? "#a3122a" : "rgba(255,255,255,.6)",
                          }}
                        >
                          {m ? <SquareIcon size={12} /> : <MicIcon size={12} />}
                          {m
                            ? t_1("Detener grabación", "停止录音")
                            : t_1("Grabar con micrófono", "麦克风录音")}
                        </button>
                        <span className="text-[11px] font-bold text-white/30">
                          {h} {t_1("palabras", "词")}
                        </span>
                      </div>
                      <button
                        onClick={() => Ce(o, E[o] || "", "monologo", a)}
                        disabled={isCorrecting || !(E[o] || "").trim()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[12.5px] transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
                        style={{
                          background: `linear-gradient(180deg, ${p.color}, ${p.glow})`,
                          color: "#fff6e0",
                          border: "2px solid #f2c14e",
                        }}
                      >
                        {isCorrecting ? (
                          <LoaderCircleIcon size={14} className="animate-spin" />
                        ) : (
                          <SparklesIcon size={14} />
                        )}
                        {isCorrecting ? t_1("Corrigiendo…", "批改中…") : t_1("Corregir con IA", "AI 批改")}
                      </button>
                    </div>
                    <a className="oe-link" href={`#/examinador-oral?nivel=${encodeURIComponent(nivel || "")}&tema=${encodeURIComponent(a.titulo || "")}&tarea=${encodeURIComponent(a.instrucciones || "")}&puntos=${encodeURIComponent(JSON.stringify(a.puntosGuia || []))}`}>
                        🎙️ Hacer esta tarea con el examinador IA · 用AI考官模拟
                      </a>
                    {K[o] && <C_2 data={K[o]} />}
                    {a.entrevistador && (
                      <div className="mt-4">
                        <OsComponent entrevistador={a.entrevistador} color={p.glow} />
                      </div>
                    )}
                    {f(a.rubrica) && (
                      <YComponent
                        titulo={t_1("Rúbrica de evaluación", "评分标准")}
                        icono={TargetIcon}
                        color={p.glow}
                        contador={(a.rubrica || []).length}
                      >
                        <VeComponent rubrica={a.rubrica || []} color={p.glow} />
                      </YComponent>
                    )}
                    {a.ejemploEsperado && (
                      <YComponent
                        titulo={t_1("Ejemplo de lo esperado", "示例回答")}
                        icono={GraduationCapIcon}
                        color={c}
                      >
                        <TextoDele texto={a.ejemploEsperado} variante="compacto" />
                      </YComponent>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {b === "claves" && (
          <div className="of-in">
            <GsComponent
              evaluacion={n_evaluacion}
              materia={examen}
              res1={Q}
              res2={W}
              corregido1={N}
              corregido2={O}
              mediaEsc={mediaEsc}
              mediaOral={mediaOral}
              color={p.glow}
            />
            <UeComponent
              titulo="Claves · Comprensión de lectura · 答案 · 阅读理解"
              claves={examen.claves?.lectura || []}
              tareas={ee?.tareas || []}
              t={t_1}
            />
            <UeComponent
              titulo="Claves · Comprensión auditiva · 答案 · 听力理解"
              claves={examen.claves?.auditiva || qs(examen, 2)}
              tareas={se?.tareas || []}
              t={t_1}
            />
          </div>
        )}
        <div className="flex items-center justify-between gap-3 mt-8">
          {(() => {
            const a = ["p1", "p2", "p3", "p4", "claves"];
            const o = a.indexOf(b);
            const h = a[o - 1];
            const m = a[o + 1];
            const $ = (w) => {
              if (w === "claves") {
                return t_1("Claves y evaluación", "答案与评分");
              }
              return c_2(examen, Number(w.slice(1)))?.nombre || "";
            };
            return (
              <>
                {h ? (
                  <button
                    onClick={() => {
                      B()?.cancel();
                      setB(h);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-bold text-white/55 hover:text-white/85 transition-colors"
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.09)",
                    }}
                  >
                    <ArrowLeftIcon size={13} /> {$(h)}
                  </button>
                ) : (
                  <span />
                )}
                {m ? (
                  <button
                    onClick={() => {
                      B()?.cancel();
                      setB(m);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-black transition-transform hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(180deg, ${p.color}, ${p.glow})`,
                      color: "#fff6e0",
                      border: "2px solid #f2c14e",
                    }}
                  >
                    {$(m)} <ChevronRightIcon size={13} />
                  </button>
                ) : (
                  <Link
                    to={`/oficial/${nivel}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-black"
                    style={{
                      background: `linear-gradient(135deg, ${c}, ${C})`,
                      color: "#17130a",
                    }}
                  >
                    {t_1("Terminar y volver", "完成并返回")} <ChevronRightIcon size={13} />
                  </Link>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </StarfieldBackground>
  );
}
function qs(t, r) {
  return (c_2(t, r)?.tareas || []).map((l) => ({
    tarea: l.num,
    items: (l.items || []).map((s) => ({
      num: s.num,
      correcta: s.correcta,
      justificacion: s.justificacion,
      fraseSoporte: s.fraseSoporte,
    })),
  }));
}
function MsComponent({ minutos }) {
  const totalSegundos = Math.max(0, Math.round((minutos || 0) * 60));
  const [restantes, setRestantes] = React.useState(totalSegundos);
  const [enMarcha, setEnMarcha] = React.useState(true);
  React.useEffect(() => {
    if (!enMarcha || restantes <= 0) {
      return;
    }
    const intervalo = window.setInterval(() => setRestantes((seg) => (seg <= 1 ? 0 : seg - 1)), 1000);
    return () => window.clearInterval(intervalo);
  }, [enMarcha, restantes]);
  if (!totalSegundos) {
    return null;
  }
  const mm = String(Math.floor(restantes / 60)).padStart(2, "0");
  const ss = String(restantes % 60).padStart(2, "0");
  const estado = restantes === 0 ? "fin" : restantes <= 300 ? "aviso" : "normal";
  return (
    <div className={`ofx-reloj gm-no-adapt ofx-reloj-${estado}`} role="timer" aria-label={`Tiempo restante · 剩余时间 ${mm}:${ss}`}>
      <ClockIcon size={16} aria-hidden="true" />
      <span className="ofx-reloj-cifra">
        {mm}:{ss}
      </span>
      <button
        type="button"
        onClick={() => setEnMarcha((v) => !v)}
        title={enMarcha ? "Pausar · 暂停" : "Reanudar · 继续"}
        aria-label={enMarcha ? "Pausar · 暂停" : "Reanudar · 继续"}
      >
        {enMarcha ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      </button>
      <button
        type="button"
        onClick={() => {
          setRestantes(totalSegundos);
          setEnMarcha(true);
        }}
        title="Reiniciar la cuenta · 重置计时"
        aria-label="Reiniciar la cuenta · 重置计时"
      >
        <RotateCcwIcon size={16} />
      </button>
    </div>
  );
}
function EComponent({ titulo, res, corregido, onCorregir, onVerClaves, mostrarClaves, color, duracion }) {
  return (
    <div
      className="ofe-phead rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3"
      style={{
        background: "linear-gradient(140deg, rgba(255,255,255,.045), rgba(255,255,255,.012))",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div className="flex items-center gap-3">
        <ListChecksIcon
          size={16}
          style={{
            color,
          }}
        />
        <div>
          <div className="text-white/80 font-black text-[13.5px]">{titulo}</div>
          <div className="text-[11px] font-bold text-white/30">
            {duracion ? `${duracion} min · ` : ""}
            Responde y corrige para ver tu puntuación · <span lang="zh-CN">作答后批改查看得分</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <MsComponent minutos={duracion} />
        {corregido && (
          <div className={`ofx-nota gm-no-adapt ${res.pct >= 60 ? "ofx-nota-apto" : "ofx-nota-noapto"}`}>
            <span className="ofx-nota-pct">{res.pct}%</span>
            <span className="ofx-nota-frac">
              {res.bien}/{res.total}
            </span>
          </div>
        )}
        <button
          onClick={onVerClaves}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-black text-[12px] transition-colors"
          style={{
            background: mostrarClaves ? `${c}22` : "rgba(255,255,255,.05)",
            border: `1px solid ${mostrarClaves ? `${c}55` : "rgba(255,255,255,.1)"}`,
            color: mostrarClaves ? C : "rgba(255,255,255,.55)",
          }}
        >
          {mostrarClaves ? <EyeOffIcon size={13} /> : <KeyRoundIcon size={13} />}
          {mostrarClaves ? "Ocultar claves · 隐藏答案" : "Ver claves · 查看答案"}
        </button>
        <button
          onClick={onCorregir}
          disabled={corregido}
          className="xm-ofe-correct gm-no-adapt flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[12.5px] transition-transform hover:scale-[1.02] disabled:hover:scale-100"
          style={{
            background: corregido ? "rgba(255,255,255,.06)" : "linear-gradient(135deg, #e0b566, #f6dfa8)",
            color: corregido ? "rgba(255,255,255,.5)" : "#17130a",
          }}
        >
          <CircleCheckIcon size={14} />{" "}
          {corregido ? "Corregido · 已批改" : "Corregir prueba · 批改本项"}
        </button>
      </div>
    </div>
  );
}
function GsComponent({
  evaluacion,
  materia,
  res1,
  res2,
  corregido1,
  corregido2,
  mediaEsc,
  mediaOral,
  color,
}) {
  const { t: t_1 } = useLanguage();
  const b = (bien, total) => {
    if (total) {
      return (bien / total) * 25;
    }
    return 0;
  };
  const k = corregido1 ? b(res1.bien, res1.total) : null;
  const j = corregido2 ? b(res2.bien, res2.total) : null;
  const v = mediaEsc !== null ? (mediaEsc / 100) * 25 : null;
  const N = mediaOral !== null ? (mediaOral / 100) * 25 : null;
  const T = k !== null || v !== null ? (k || 0) + (v || 0) : null;
  const O = j !== null || N !== null ? (j || 0) + (N || 0) : null;
  const min = evaluacion?.grupo1?.minimo ?? 30;
  const U = k !== null && v !== null;
  const y = j !== null && N !== null;
  const A = U && y ? T >= min && O >= min : null;
  const z = (R) => {
    if (R === null) {
      return "—";
    }
    return R.toFixed(2).replace(".", ",");
  };
  const E = [
    [t_1("Comprensión de lectura", "阅读理解"), k, "25"],
    [t_1("Expresión e interacción escritas", "书面表达"), v, "25"],
    [t_1("Comprensión auditiva", "听力理解"), j, "25"],
    [t_1("Expresión e interacción orales", "口头表达"), N, "25"],
  ];
  return (
    <div
      className="rounded-3xl overflow-hidden mb-6"
      style={{
        background: "linear-gradient(150deg, rgba(255,255,255,.05), rgba(255,255,255,.014))",
        border: "1px solid rgba(255,255,255,.09)",
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-3.5"
        style={{
          background: "rgba(0,0,0,.24)",
          borderBottom: `1px solid ${c}18`,
        }}
      >
        <GraduationCapIcon
          size={16}
          style={{
            color,
          }}
        />
        <div>
          <div className="text-white font-black text-[15px] leading-tight">
            {t_1("Sistema de calificación", "评分系统")}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-white/30">
            {evaluacion?.criterio || t_1("APTO si ≥30,00 puntos en cada grupo", "两组各≥30分即通过")}
          </div>
        </div>
        <div className="ml-auto text-right">
          <div
            className="font-mono font-black text-xl"
            style={{
              color: A === null ? "rgba(255,255,255,.35)" : A ? "#2e6b3f" : "#a3122a",
            }}
          >
            {A === null ? "—" : A ? "APTO" : "NO APTO"}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-white/25">
            {t_1("provisional", "暂定")}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="grid sm:grid-cols-4 gap-2.5 mb-4">
          {E.map(([R, P, M]) => (
            <div
              key={R}
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,0,0,.22)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div className="text-[11px] font-black uppercase tracking-wider text-white/30 mb-1">{R}</div>
              <div
                className="font-mono font-black text-lg"
                style={{
                  color: P === null ? "rgba(255,255,255,.3)" : C,
                }}
              >
                {z(P)}
                <span className="text-white/25 text-[12px]">/{M}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-2.5">
          <BeComponent
            etiqueta={t_1("Grupo 1 (lectura + escritura)", "第一组（阅读+写作）")}
            valor={T}
            max={50}
            min={min}
            color={color}
          />
          <BeComponent
            etiqueta={t_1("Grupo 2 (audición + oral)", "第二组（听力+口语）")}
            valor={O}
            max={50}
            min={min}
            color={color}
          />
          <div
            className="rounded-xl p-3"
            style={{
              background: `${c}0d`,
              border: `1px solid ${c}28`,
            }}
          >
            <div className="text-[11px] font-black uppercase tracking-wider text-white/30 mb-1">
              {t_1("Total", "总分")}
            </div>
            <div
              className="font-mono font-black text-lg"
              style={{
                color: C,
              }}
            >
              {T === null && O === null ? "—" : ((T || 0) + (O || 0)).toFixed(2).replace(".", ",")}
              <span className="text-white/25 text-[12px]">/{evaluacion?.total ?? 100}</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-white/25 mt-3 leading-relaxed">
          {t_1(
            "Las pruebas objetivas puntúan con la clave oficial (1 punto por acierto). La escritura y el oral se estiman a partir de la corrección por IA y solo se muestran si has pedido la corrección.",
            "客观题按官方答案计分（答对得1分）。写作与口语根据AI批改估算，仅在你请求批改后显示。",
          )}
        </p>
        {(!U || !y) && (
          <p className="text-[11px] text-amber-300/70 mt-1">
            {t_1(
              "Completa las pruebas y sus correcciones para obtener un veredicto definitivo.",
              "完成所有测试及批改后可获得最终判定。",
            )}
          </p>
        )}
        <div className="mt-3 text-[11px] text-white/30">
          {t_1("Modelo", "模型")} {materia.codigo || materia.modelo} · {materia.temaCentral}
        </div>
      </div>
    </div>
  );
}
function BeComponent({ etiqueta, valor, max, min, color }) {
  const i = valor !== null && valor >= min;
  const n = valor === null ? 0 : Math.min((valor / max) * 100, 100);
  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: "rgba(0,0,0,.22)",
        border: `1px solid ${valor === null ? "rgba(255,255,255,.07)" : i ? "rgba(46,107,63,.28)" : "rgba(200,16,46,.28)"}`,
      }}
    >
      <div className="text-[11px] font-black uppercase tracking-wider text-white/30 mb-1">{etiqueta}</div>
      <div
        className="font-mono font-black text-lg"
        style={{
          color: valor === null ? "rgba(255,255,255,.3)" : i ? "#2e6b3f" : "#a3122a",
        }}
      >
        {valor === null ? "—" : valor.toFixed(2).replace(".", ",")}
        <span className="text-white/25 text-[12px]">/{max}</span>
      </div>
      <div
        className="h-1.5 rounded-full mt-2 overflow-hidden"
        style={{
          background: "rgba(255,255,255,.07)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${n}%`,
            background: i ? "linear-gradient(90deg,#3f8a5a,#2e6b3f)" : `linear-gradient(90deg,${color},${C})`,
          }}
        />
      </div>
      <div className="text-[11px] font-bold text-white/25 mt-1.5">min. {min}</div>
    </div>
  );
}
function UeComponent({ titulo, claves, tareas, t: t_1 }) {
  const [abierto, setAbierto] = React.useState(true);
  const totalItems = claves.reduce((acc, clave) => acc + (clave.items || []).length, 0);
  if (!claves.length) {
    return null;
  }
  return (
    <section className="ofx-claves gm-no-adapt">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="ofx-claves-cab"
        aria-expanded={abierto}
      >
        <KeyRoundIcon size={18} aria-hidden="true" className="ofx-claves-ico" />
        <span className="ofx-claves-tit">
          <strong>{titulo}</strong>
          <small>
            {totalItems} ítems con justificación · {totalItems} 题含依据
          </small>
        </span>
        <ChevronDownIcon size={18} aria-hidden="true" className={abierto ? "ofx-rot" : ""} />
      </button>
      {abierto && (
        <div className="ofx-claves-cuerpo">
          {claves.map((clave) => {
            const tarea = tareas.find((t) => t.num === clave.tarea);
            return (
              <div key={clave.tarea} className="ofx-claves-tarea">
                <div className="ofx-claves-tarea-cab">
                  <span className="ofx-claves-chip">
                    Tarea {clave.tarea} · <span lang="zh-CN">任务{clave.tarea}</span>
                  </span>
                  {tarea?.titulo && <span className="ofx-claves-tarea-tit">{tarea.titulo}</span>}
                </div>
                <ol className="ofx-claves-lista">
                  {(clave.items || []).map((itemClave) => {
                    const itemTarea = (tarea?.items || []).find((it) => it.num === itemClave.num);
                    const letra = g(itemClave.correcta);
                    const textoOpcion = itemTarea?.opciones?.[itemClave.correcta];
                    const mostrarTexto =
                      textoOpcion && String(textoOpcion).trim().toUpperCase() !== String(letra).trim().toUpperCase();
                    const frase = itemClave.fraseSoporte || itemTarea?.fraseSoporte;
                    const justificacion = itemClave.justificacion || itemTarea?.justificacion;
                    return (
                      <li key={itemClave.num} className="ofx-clave">
                        <div className="ofx-clave-cab">
                          <span className="ofx-clave-num">{itemClave.num}</span>
                          <span className="ofx-clave-resp">
                            <b>{letra}</b>
                            {mostrarTexto ? ` · ${textoOpcion}` : ""}
                          </span>
                        </div>
                        {justificacion && <p className="ofx-clave-just">{justificacion}</p>}
                        {frase && <p className="ofx-clave-frase">«{frase}»</p>}
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
export { IaComponent as default };
