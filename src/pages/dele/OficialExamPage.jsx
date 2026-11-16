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
import { createPortal } from "react-dom";
import { FileDownIcon } from "lucide-react";
import { CuotaIA } from "../../components/ui/CuotaIA.jsx";
import ImpresionExamen from "../../components/examen/ImpresionExamen.jsx";
import {
  PRUEBAS_SX,
  SalaHero,
  Medallones,
  TareasTabs,
  Instrucciones,
  TableroJade,
  PreguntaSX,
  Incienso,
  Esquinas,
  OndasCirculares,
  Linterna,
  PincelPalabras,
  MedallonJade,
  Confeti,
  resaltarFrase,
  reducirMovimiento,
  formatoReloj,
  recurso,
} from "../../components/examen/SalaExamen.jsx";
import "../../styles/v14-fix-examenes.css";
import { turnosDeAudio, anuncioAudio, claveOficial } from "../../lib/vocesDele.js";

// MP3 con voces nativas de España y reparto de voces de cada examen (se cargan al abrir un audio)
import { cargarVocesDele as cargarIndiceVoces, urlVozDele } from "../../lib/vocesDeleApp.js";
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
// Barajado de opciones estable por examen (semilla = nivel + modelo) para poder guardar y continuar
function zs(t) {
  let semilla = 0;
  for (const ch of `${t.nivel || t.level || ""}-${t.modelo || t.id || ""}`) semilla = (Math.imul(semilla, 31) + ch.charCodeAt(0)) | 0;
  const r = () => {
    semilla = (semilla + 0x6d2b79f5) | 0;
    let x = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
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
function GeComponent({ guion, velocidad, setVelocidad, items, clips, examenClave, modoExamen = false, transcripcionLibre = true }) {
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
  // Escuchas de cada parte (en el DELE cada audio suena dos veces)
  const [escuchas, setEscuchas] = React.useState({});
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
      const hayNativas = vocesNativas && vocesNativas.claves.size > 0;
      const reparto = vocesNativas?.repartos?.[examenClave];
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
        if (vocesNativas?.claves.has(turno.clave) && (await reproducirNativo(turno.clave))) return;
        if (TRef.current === z) await J(turno.texto, contexto);
      };
      const reproducirSegmento = async (texto) => {
        const turnos = turnosDeAudio(texto, reparto);
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
          setEscuchas((prev) => ({ ...prev, [G]: (prev[G] || 0) + 1 }));
          const p = E[S].etiqueta || `Audio ${S + 1}`;
          await decir(anuncioAudio(de(p, S + 1), reparto), p);
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
    [n, velocidad, t_1, vocesNativas, examenClave],
  );
  const total = n.length;
  const agotada = (indice) => modoExamen && (escuchas[indice] || 0) >= 2;
  const todasAgotadas = total > 0 && n.every((_, indice) => agotada(indice));
  const parteVista = d ?? Object.keys(escuchas).map(Number).sort((p1, p2) => p2 - p1)[0] ?? 0;
  const vecesParte = escuchas[parteVista] || 0;
  const frac = total ? (x ? (parteVista + 0.5) / total : Object.keys(escuchas).length / total) : 0;
  const etiquetaParte = (indice) => Is(n[indice] || {}, indice, t_1);
  return (
    <div className="sx-gong-caja gm-no-adapt">
      <div className={`sx-gong ${x ? "sonando" : ""}`}>
        <OndasCirculares frac={frac} />
        <button
          type="button"
          className="sx-gong-boton"
          disabled={!x && todasAgotadas}
          onClick={() => (x ? onClick() : V(0))}
          aria-label={x ? "Parar el audio · 停止" : "Escuchar todo el audio · 播放完整音频"}
          title={x ? "Parar · 停止" : "Escuchar todo · 播放全部"}
        >
          {x ? <PauseIcon fill="currentColor" /> : <PlayIcon fill="currentColor" />}
        </button>
        <div className="sx-gong-t">
          {total ? `${Math.min(parteVista + 1, total)} / ${total}` : "—"}
        </div>
      </div>
      <div className="sx-ainfo">
        <div className="now">
          {x ? "● Sonando · " : "Audio · "}
          <span className="sx-zh" lang="zh-CN">{x ? "正在播放" : "音频"}</span>
        </div>
        <h3>
          {total ? etiquetaParte(parteVista) : t_1("Audio", "音频")}
          <span className="sx-zh" lang="zh-CN">第{Math.min(parteVista + 1, total || 1)}段</span>
        </h3>
        <div className="sx-linternas">
          <Linterna encendida={vecesParte >= 1} />
          <Linterna encendida={vecesParte >= 2} />
          <div className="txt">
            {vecesParte ? `Escucha ${Math.min(vecesParte, 2)} de 2` : "Cada audio suena dos veces"}
            <span className="sx-zh" lang="zh-CN">{vecesParte ? `第${Math.min(vecesParte, 2)}遍 / 共2遍` : "每段播放两遍"}</span>
          </div>
        </div>
        {total > 1 && (
          <div className="sx-tablillas" aria-label="Escuchar por partes · 分段播放">
            {n.map((parte, indice) => (
              <button
                key={indice}
                type="button"
                className={`sx-tablilla ${d === indice && x ? "on" : ""}`}
                disabled={agotada(indice)}
                onClick={() => V(indice)}
                title={(parte.texto || "").slice(0, 160)}
              >
                {indice + 1}
                <small>{etiquetaParte(indice)}</small>
                {escuchas[indice] ? <span className="vez">{"✓".repeat(Math.min(2, escuchas[indice]))}</span> : null}
              </button>
            ))}
          </div>
        )}
        <div className="sx-vel" role="group" aria-label="Velocidad · 语速">
          {[0.75, 0.9, 1, 1.15].map((y) => (
            <button
              key={y}
              type="button"
              aria-pressed={velocidad === y}
              onClick={() => {
                setVelocidad(y);
                if (x) onClick();
              }}
            >
              {String(y).replace(".", ",")}×
            </button>
          ))}
        </div>
        <div className="sx-lock">
          {transcripcionLibre ? (
            <>
              <button type="button" onClick={() => setV((y) => !y)}>
                {v ? <EyeOffIcon size={13} /> : <EyeIcon size={13} />}
                {v ? "Ocultar transcripción · 隐藏原文" : "Ver transcripción · 查看原文"}
              </button>
              <button type="button" onClick={() => setK((y) => !y)}>
                {k ? <EyeOffIcon size={13} /> : <EyeIcon size={13} />}
                {k ? "Ocultar guion · 隐藏脚本" : "Guion por partes · 分段脚本"}
              </button>
            </>
          ) : (
            <>
              <KeyRoundIcon size={14} />
              {modoExamen
                ? "La transcripción se abre al entregar la prueba · 交卷后可看原文"
                : "La transcripción se abre al comprobar una pregunta · 检查后可看原文"}
            </>
          )}
        </div>
        {transcripcionLibre && v && (
          <div className="sx-transc">
            <TextoDele texto={guion} variante="guion" />
          </div>
        )}
        {transcripcionLibre && k && (
          <div className="sx-transc">
            {n.map((y, A) => (
              <p key={A} style={{ margin: "0 0 8px", fontSize: 13.5, lineHeight: 1.55 }}>
                <b style={{ color: "#8f0c21" }}>[{y.etiqueta}]</b> {y.texto}
              </p>
            ))}
          </div>
        )}
      </div>
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
  // ===== Sala imperial: modo, corrección por pregunta, borrador guardado, temporizadores e impresión
  const [modo, setModo] = React.useState("practica");
  const [comprobadas, setComprobadas] = React.useState({});
  const [tareaIdx, setTareaIdx] = React.useState({});
  const [actual, setActual] = React.useState(null);
  const [guia, setGuia] = React.useState({});
  const [temaOral, setTemaOral] = React.useState({});
  const [tiempos, setTiempos] = React.useState({});
  const [relojEnMarcha, setRelojEnMarcha] = React.useState(true);
  const [prep, setPrep] = React.useState({ restantes: 0, enMarcha: false });
  const [habla, setHabla] = React.useState({});
  const [zoom, setZoom] = React.useState(1);
  const [imprimir, setImprimir] = React.useState(null);
  const hojaRef = React.useRef(null);
  const salaRef = React.useRef(null);
  const borradorListo = React.useRef(false);
  const claveBorrador = examen ? `dele_oficial_borrador_${nivel}_${examen.modelo}` : null;
  // Cargar el borrador guardado (guardar y continuar)
  React.useEffect(() => {
    borradorListo.current = false;
    if (!examen) return;
    let guardado = null;
    try {
      guardado = JSON.parse(localStorage.getItem(claveBorrador) || "null");
    } catch {}
    const base = {};
    (examen.pruebas || []).forEach((pr) => {
      if (pr.duracion) base[`p${pr.prueba}`] = pr.duracion * 60;
    });
    setJ(guardado?.j || {});
    setComprobadas(guardado?.comprobadas || {});
    setE(guardado?.E || {});
    setP(guardado?.P || {});
    setK(guardado?.K || {});
    setN_1(!!guardado?.N);
    setO(!!guardado?.O);
    setModo(guardado?.modo === "examen" ? "examen" : "practica");
    setTiempos({ ...base, ...(guardado?.tiempos || {}) });
    setGuia(guardado?.guia || {});
    setTemaOral(guardado?.temaOral || {});
    setTareaIdx(guardado?.tareaIdx || {});
    if (guardado?.b) setB(guardado.b);
    setPrep({ restantes: (c_2(examen, 4)?.preparacion || 0) * 60, enMarcha: false });
    borradorListo.current = true;
  }, [examen, claveBorrador]);
  React.useEffect(() => {
    if (!examen || !borradorListo.current) return;
    const temporizador = window.setTimeout(() => {
      try {
        localStorage.setItem(claveBorrador, JSON.stringify({ j, comprobadas, E, P, K, N, O, modo, tiempos, guia, temaOral, tareaIdx, b, fecha: Date.now() }));
      } catch {}
    }, 600);
    return () => window.clearTimeout(temporizador);
  }, [examen, claveBorrador, j, comprobadas, E, P, K, N, O, modo, tiempos, guia, temaOral, tareaIdx, b]);
  // Temporizador de la prueba activa (varilla de incienso)
  const quedaTiempo = (tiempos[b] || 0) > 0;
  React.useEffect(() => {
    if (!examen || !relojEnMarcha || imprimir || !quedaTiempo) return;
    const clave = b;
    const intervalo = window.setInterval(() => setTiempos((t) => ({ ...t, [clave]: Math.max(0, (t[clave] || 0) - 1) })), 1000);
    return () => window.clearInterval(intervalo);
  }, [examen, b, relojEnMarcha, imprimir, quedaTiempo]);
  // En modo examen, al acabarse el tiempo se entrega la prueba
  React.useEffect(() => {
    if (modo !== "examen") return;
    if (tiempos.p1 === 0 && !N) setN_1(true);
    if (tiempos.p2 === 0 && !O) {
      B()?.cancel();
      setO(true);
    }
  }, [modo, tiempos.p1, tiempos.p2, N, O]);
  // Preparación del oral y cronómetro mientras se graba
  const quedaPrep = prep.restantes > 0;
  React.useEffect(() => {
    if (!prep.enMarcha || !quedaPrep) return;
    const intervalo = window.setInterval(() => setPrep((pr) => ({ restantes: Math.max(0, pr.restantes - 1), enMarcha: pr.restantes > 1 })), 1000);
    return () => window.clearInterval(intervalo);
  }, [prep.enMarcha, quedaPrep]);
  React.useEffect(() => {
    if (!de) return;
    const intervalo = window.setInterval(() => setHabla((h) => ({ ...h, [de]: (h[de] || 0) + 1 })), 1000);
    return () => window.clearInterval(intervalo);
  }, [de]);
  // Si en práctica se han comprobado todas las preguntas de una prueba, queda corregida (y se guarda la nota)
  React.useEffect(() => {
    if (!examen) return;
    const todas = (num) => {
      const claves = (c_2(examen, num)?.tareas || []).flatMap((t) => (t.items || []).map((it) => `p${num}-${t.num}-${it.num}`));
      return claves.length > 0 && claves.every((k) => comprobadas[k]);
    };
    if (!N && todas(1)) setN_1(true);
    if (!O && todas(2)) setO(true);
  }, [examen, comprobadas, N, O]);
  // Descarga en PDF: se pinta la versión imprimible y se abre el diálogo del navegador
  React.useEffect(() => {
    if (!imprimir) return;
    document.body.classList.add("sx-imprimiendo");
    const fin = () => setImprimir(null);
    window.addEventListener("afterprint", fin);
    const temporizador = window.setTimeout(() => window.print(), 400);
    return () => {
      window.clearTimeout(temporizador);
      window.removeEventListener("afterprint", fin);
      document.body.classList.remove("sx-imprimiendo");
    };
  }, [imprimir]);
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
  const n_evaluacion = examen.evaluacion;
  const modoExamen = modo === "examen";
  const numPrueba = b === "claves" ? "claves" : Number(b.slice(1));
  const pruebaActual = b === "claves" ? null : c_2(examen, numPrueba);
  const tareasActuales = pruebaActual?.tareas || [];
  const idxTarea = Math.min(tareaIdx[b] || 0, Math.max(0, tareasActuales.length - 1));
  const tareaActual = tareasActuales[idxTarea];
  const cfgPrueba = PRUEBAS_SX[numPrueba] || PRUEBAS_SX[1];
  const corregidaPrueba = (num) => (num === 1 ? N : num === 2 ? O : false);
  const clavesDe = (num, tarea) => (tarea.items || []).map((it) => `p${num}-${tarea.num}-${it.num}`);
  const reveladaItem = (key, num) => corregidaPrueba(num) || (U && (!modoExamen || corregidaPrueba(num))) || (!modoExamen && !!comprobadas[key]);
  const estadoItem = (key, num, it) => {
    const valor = j[key];
    if (reveladaItem(key, num)) return valor === undefined ? "" : valor === it.correcta ? "ok" : "ko";
    return valor === undefined ? "" : "r";
  };
  const progresoPrueba = (num) => {
    const ts = c_2(examen, num)?.tareas || [];
    if (num <= 2) {
      const claves = ts.flatMap((t) => clavesDe(num, t));
      return claves.length ? claves.filter((k) => j[k] !== undefined).length / claves.length : 0;
    }
    if (num === 3) return ts.length ? ts.filter((t) => d(E[`esc-${t.num}`]) >= (t.minPalabras || 1)).length / ts.length : 0;
    return ts.length ? ts.filter((t) => (E[`oral-${t.num}`] || "").trim()).length / ts.length : 0;
  };
  const pruebaHecha = (num) => {
    if (num <= 2) return corregidaPrueba(num);
    const ts = c_2(examen, num)?.tareas || [];
    const res = num === 3 ? P : K;
    return ts.length > 0 && ts.every((t) => res[`${num === 3 ? "esc" : "oral"}-${t.num}`]);
  };
  const subir = () => {
    const destino = salaRef.current?.querySelector(".sx-medallas");
    destino?.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "start" });
  };
  const cambiarPrueba = (id) => {
    B()?.cancel();
    ss();
    if (CSS?.highlights) CSS.highlights.delete("sx-frase");
    setB(id === "claves" ? "claves" : `p${id}`);
    setActual(null);
    subir();
  };
  const cambiarTarea = (indice) => {
    B()?.cancel();
    if (CSS?.highlights) CSS.highlights.delete("sx-frase");
    setTareaIdx((t) => ({ ...t, [b]: indice }));
    setActual(null);
    window.setTimeout(() => salaRef.current?.querySelector(".sx-sala")?.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "start" }), 30);
  };
  const irAPregunta = (key) => {
    const [, num, tnum] = key.match(/^p(\d+)-(\d+)-/) || [];
    const pr = c_2(examen, Number(num));
    const indice = Math.max(0, (pr?.tareas || []).findIndex((t) => String(t.num) === tnum));
    if (b !== `p${num}`) setB(`p${num}`);
    setTareaIdx((t) => ({ ...t, [`p${num}`]: indice }));
    setActual(key);
    window.setTimeout(() => {
      const el = document.getElementById(`q-${key}`);
      el?.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "center" });
      el?.focus({ preventScroll: true });
    }, 60);
  };
  const navTeclas = (ev) => {
    if (ev.key !== "ArrowDown" && ev.key !== "ArrowUp") return;
    const actualQ = ev.target.closest?.(".sx-q");
    if (!actualQ) return;
    const todas = [...(salaRef.current?.querySelectorAll(".sx-sala .sx-q") || [])];
    const siguiente = todas[todas.indexOf(actualQ) + (ev.key === "ArrowDown" ? 1 : -1)];
    if (siguiente) {
      ev.preventDefault();
      siguiente.focus({ preventScroll: true });
      siguiente.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "center" });
    }
  };
  const entregar = (num) => {
    const ts = c_2(examen, num)?.tareas || [];
    const sinResponder = ts.flatMap((t) => clavesDe(num, t)).filter((k) => j[k] === undefined).length;
    if (sinResponder && !window.confirm(`Quedan ${sinResponder} preguntas sin responder. ¿Corregir igualmente?\n还有 ${sinResponder} 题未作答，确定要批改吗？`)) return;
    if (num === 1) setN_1(true);
    else {
      B()?.cancel();
      setO(true);
    }
  };
  const rehacerPrueba = (num) => {
    if (!window.confirm("¿Borrar tus respuestas de esta prueba y empezar de nuevo?\n确定清除本项答案并重新开始吗？")) return;
    const prefijo = `p${num}-`;
    const sin = (obj) => Object.fromEntries(Object.entries(obj).filter(([k]) => !k.startsWith(prefijo)));
    setJ(sin);
    setComprobadas(sin);
    if (num === 1) setN_1(false);
    else setO(false);
    setU_1(false);
    const pr = c_2(examen, num);
    if (pr?.duracion) setTiempos((t) => ({ ...t, [`p${num}`]: pr.duracion * 60 }));
  };
  const repetirFallos = () => {
    const fallos = [1, 2].flatMap((num) => (c_2(examen, num)?.tareas || []).flatMap((t) => (t.items || []).filter((it) => j[`p${num}-${t.num}-${it.num}`] !== it.correcta).map((it) => `p${num}-${t.num}-${it.num}`)));
    if (!fallos.length) return;
    const fuera = (obj) => Object.fromEntries(Object.entries(obj).filter(([k]) => !fallos.includes(k)));
    setJ(fuera);
    setComprobadas(fuera);
    setN_1(false);
    setO(false);
    setU_1(false);
    setModo("practica");
    irAPregunta(fallos[0]);
  };
  const empezarDeNuevo = () => {
    if (!window.confirm("¿Borrar todo lo hecho en este examen y empezar de cero?\n确定清除本套试卷的所有作答并重新开始吗？")) return;
    try {
      localStorage.removeItem(claveBorrador);
    } catch {}
    setIntento((v) => v + 1);
  };
  // Puntuación (misma regla que antes: 25 puntos por prueba, APTO con ≥30 en cada grupo)
  const aNota = (bien, total) => (total ? (bien / total) * 25 : 0);
  const pLect = N ? aNota(Q.bien, Q.total) : null;
  const pAud = O ? aNota(W.bien, W.total) : null;
  const pEsc = mediaEsc !== null ? (mediaEsc / 100) * 25 : null;
  const pOral = mediaOral !== null ? (mediaOral / 100) * 25 : null;
  const grupo1 = pLect !== null || pEsc !== null ? (pLect || 0) + (pEsc || 0) : null;
  const grupo2 = pAud !== null || pOral !== null ? (pAud || 0) + (pOral || 0) : null;
  const minimo = n_evaluacion?.grupo1?.minimo ?? 30;
  const completo = pLect !== null && pEsc !== null && pAud !== null && pOral !== null;
  const apto = completo ? grupo1 >= minimo && grupo2 >= minimo : null;
  const puntuacion = { pLect, pAud, pEsc, pOral, grupo1, grupo2, apto, minimo };
  const esNuevo = /Simulacro nuevo/.test(examen.titulo || "");
  const tiempoTotal = pruebaActual?.duracion ? pruebaActual.duracion * 60 : 0;
  const incienso =
    b === "p4" && te?.preparacion ? (
      <Incienso
        restantes={prep.restantes}
        total={te.preparacion * 60}
        enMarcha={prep.enMarcha}
        etiqueta="Preparación · 准备"
        onToggle={() => setPrep((pr) => ({ ...pr, enMarcha: !pr.enMarcha && pr.restantes > 0 }))}
        onReset={() => setPrep({ restantes: te.preparacion * 60, enMarcha: false })}
      />
    ) : tiempoTotal ? (
      <Incienso
        restantes={tiempos[b] ?? tiempoTotal}
        total={tiempoTotal}
        enMarcha={relojEnMarcha}
        onToggle={modoExamen ? undefined : () => setRelojEnMarcha((v) => !v)}
        onReset={modoExamen ? undefined : () => setTiempos((t) => ({ ...t, [b]: tiempoTotal }))}
      />
    ) : null;
  const chips =
    numPrueba === 1 || numPrueba === 2
      ? [`${(numPrueba === 1 ? _.lectura : _.audicion).preguntas} preguntas · 题`, `${tareasActuales.length} tareas · 项`, tareaActual?.genero || tareaActual?.tipoAudio, esNuevo ? "Simulacro nuevo · 新模拟题" : "Modelo oficial · 官方真题"]
      : numPrueba === 3
        ? [`${tareasActuales.length} tareas · 项`, tareaActual ? `${tareaActual.minPalabras}–${tareaActual.maxPalabras} palabras · 词` : null, "Corrección con IA · AI批改"]
        : numPrueba === 4
          ? [`${tareasActuales.length} tareas · 项`, te?.preparacion ? `Preparación ${te.preparacion} min · 准备` : null, "Examinador IA · AI考官"]
          : [examen.temaCentral, esNuevo ? "Simulacro nuevo · 新模拟题" : "Modelo oficial · 官方真题"];
  const tablero = (num) =>
    num <= 2 ? (
      <TableroJade
        modoExamen={modoExamen && !corregidaPrueba(num)}
        actual={actual}
        onIr={irAPregunta}
        grupos={(c_2(examen, num)?.tareas || []).map((t) => ({
          titulo: `Tarea ${t.num} · 任务${t.num}`,
          items: (t.items || []).map((it) => {
            const key = `p${num}-${t.num}-${it.num}`;
            return { key, num: it.num, estado: estadoItem(key, num, it) };
          }),
        }))}
      />
    ) : null;
  const preguntas = (num, tarea) =>
    (tarea.items || []).map((it) => {
      const key = `p${num}-${tarea.num}-${it.num}`;
      const revelada = reveladaItem(key, num);
      return (
        <PreguntaSX
          key={key}
          id={`q-${key}`}
          item={it}
          valor={j[key]}
          onSelect={(v) => {
            if (revelada) return;
            q(key, v);
            setActual(key);
          }}
          revelada={revelada}
          modoExamen={modoExamen}
          actual={actual === key}
          onFoco={() => setActual(key)}
          onComprobar={() => setComprobadas((c) => ({ ...c, [key]: true }))}
          onReintentar={
            !modoExamen && !corregidaPrueba(num) && !U
              ? () => {
                  setComprobadas((c) => {
                    const x = { ...c };
                    delete x[key];
                    return x;
                  });
                  setJ((v) => {
                    const x = { ...v };
                    delete x[key];
                    return x;
                  });
                }
              : undefined
          }
          onVerTexto={num === 1 ? (frase) => resaltarFrase(hojaRef.current, frase) : undefined}
        />
      );
    });
  const barraAcciones = (num) => {
    const res = num === 1 ? Q : W;
    const ts = c_2(examen, num)?.tareas || [];
    const respondidas = ts.flatMap((t) => clavesDe(num, t)).filter((k) => j[k] !== undefined).length;
    const corregida = corregidaPrueba(num);
    return (
      <div className="sx-barra-acc gm-no-adapt">
        <div className="sx-res">
          {corregida ? (
            <>
              Nota · <span lang="zh-CN">得分</span> <b>{res.bien}/{res.total}</b> ({res.pct}%)
            </>
          ) : (
            <>
              Respondidas · <span lang="zh-CN">已答</span> <b>{respondidas}/{res.total}</b>
            </>
          )}
        </div>
        <div className="grupo">
          {(!modoExamen || corregida) && (
            <button type="button" className="sx-btn sx-btn-papel sx-btn-sm" onClick={() => setU_1((v) => !v)}>
              {U ? <EyeOffIcon size={15} /> : <KeyRoundIcon size={15} />} {U ? "Ocultar claves · 隐藏答案" : "Ver claves · 查看答案"}
            </button>
          )}
          {(corregida || respondidas > 0) && (
            <button type="button" className="sx-btn sx-btn-papel sx-btn-sm" onClick={() => rehacerPrueba(num)}>
              <RotateCcwIcon size={15} /> Rehacer · <span className="sx-zh" lang="zh-CN">重做</span>
            </button>
          )}
          {corregida ? (
            <button type="button" className="sx-btn sx-btn-oro sx-btn-sm" onClick={() => cambiarPrueba("claves")}>
              <GraduationCapIcon size={15} /> Ver la nota · <span className="sx-zh" lang="zh-CN">查看成绩</span>
            </button>
          ) : (
            <button type="button" className="sx-btn sx-btn-laca sx-btn-sm" onClick={() => entregar(num)}>
              <CircleCheckIcon size={15} /> {modoExamen ? "Entregar y corregir · 交卷批改" : "Corregir todo · 全部批改"}
            </button>
          )}
        </div>
      </div>
    );
  };
  const pieTareas = () => {
    const orden = ["p1", "p2", "p3", "p4", "claves"];
    const siguientePrueba = orden[orden.indexOf(b) + 1];
    const hayMasTareas = idxTarea < tareasActuales.length - 1;
    return (
      <div className="sx-pie">
        <button type="button" className="sx-btn sx-btn-papel" disabled={idxTarea === 0} onClick={() => cambiarTarea(idxTarea - 1)}>
          <ArrowLeftIcon size={16} /> Anterior · <span className="sx-zh" lang="zh-CN">上一项</span>
        </button>
        <span className="medio">
          Tarea {idxTarea + 1} de {tareasActuales.length} · <span lang="zh-CN">第{idxTarea + 1}项 / 共{tareasActuales.length}项</span>
        </span>
        {hayMasTareas ? (
          <button type="button" className="sx-btn sx-btn-laca" onClick={() => cambiarTarea(idxTarea + 1)}>
            Tarea {idxTarea + 2} · <span className="sx-zh" lang="zh-CN">下一项</span> <ChevronRightIcon size={16} />
          </button>
        ) : (
          siguientePrueba && (
            <button type="button" className="sx-btn sx-btn-laca" onClick={() => cambiarPrueba(siguientePrueba === "claves" ? "claves" : Number(siguientePrueba.slice(1)))}>
              {siguientePrueba === "claves" ? "Ver la nota · 查看成绩" : `${PRUEBAS_SX[Number(siguientePrueba.slice(1))].es} · ${PRUEBAS_SX[Number(siguientePrueba.slice(1))].zh}`} <ChevronRightIcon size={16} />
            </button>
          )
        )}
      </div>
    );
  };
  const barraMovil = () => {
    const pendiente = actual && j[actual] !== undefined && !modoExamen && !comprobadas[actual] && !corregidaPrueba(numPrueba);
    const hayMasTareas = idxTarea < tareasActuales.length - 1;
    return (
      <div className="sx-bnav gm-no-adapt">
        {numPrueba <= 2 && (
          <button type="button" className="sx-btn sx-btn-papel mini" aria-label="Tablero de preguntas · 题目导航" onClick={() => salaRef.current?.querySelector(".sx-mapa")?.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "center" })}>
            <ListChecksIcon size={18} />
          </button>
        )}
        <button type="button" className="sx-btn sx-btn-papel mini" aria-label="Tarea anterior · 上一项" disabled={idxTarea === 0} onClick={() => cambiarTarea(idxTarea - 1)}>
          <ArrowLeftIcon size={18} />
        </button>
        {pendiente ? (
          <button type="button" className="sx-btn sx-btn-laca" onClick={() => setComprobadas((c) => ({ ...c, [actual]: true }))}>
            <CircleCheckIcon size={16} /> Comprobar · 检查
          </button>
        ) : hayMasTareas ? (
          <button type="button" className="sx-btn sx-btn-laca" onClick={() => cambiarTarea(idxTarea + 1)}>
            Tarea {idxTarea + 2} · 下一项 <ChevronRightIcon size={16} />
          </button>
        ) : (
          <button type="button" className="sx-btn sx-btn-laca" onClick={() => cambiarPrueba(numPrueba === 4 ? "claves" : numPrueba + 1)}>
            {numPrueba === 4 ? "Ver la nota · 成绩" : `${PRUEBAS_SX[numPrueba + 1].es} · ${PRUEBAS_SX[numPrueba + 1].zh}`} <ChevronRightIcon size={16} />
          </button>
        )}
      </div>
    );
  };
  const tabsTareas = (
    <TareasTabs
      activa={idxTarea}
      onSelect={cambiarTarea}
      tareas={tareasActuales.map((t) => ({
        id: t.num,
        titulo: (t.titulo || t.genero || t.tipoAudio || "").trim(),
        ok: numPrueba <= 2 ? (t.items || []).length > 0 && clavesDe(numPrueba, t).every((k) => reveladaItem(k, numPrueba) || (modoExamen && j[k] !== undefined)) : numPrueba === 3 ? !!P[`esc-${t.num}`] : !!K[`oral-${t.num}`],
      }))}
    />
  );
  return (
    <StarfieldBackground>
      <div className="sx" ref={salaRef} onKeyDown={navTeclas}>
        <SalaHero
          prueba={numPrueba}
          codigo={`DELE ${nivel} · ${String(examen.modelo).padStart(2, "0")}`}
          subtitulo={examen.temaCentral}
          volverA={`/oficial/${nivel}`}
          modo={modo}
          onModo={(m) => {
            if (m === modo) return;
            if (m === "examen") setU_1(false);
            setModo(m);
          }}
          incienso={incienso}
          onPdf={() => setImprimir(N || O || mediaEsc !== null || mediaOral !== null ? "corregido" : "blanco")}
          chips={chips}
        />
        <Medallones
          activa={numPrueba}
          onSelect={cambiarPrueba}
          items={[
            ...examen.pruebas.map((pr) => ({ id: pr.prueba, min: pr.duracion, progreso: progresoPrueba(pr.prueba), hecho: pruebaHecha(pr.prueba) })),
            { id: "claves", progreso: [1, 2, 3, 4].filter(pruebaHecha).length / 4, hecho: apto === true },
          ]}
        />
        <div key={`${b}-${idxTarea}`} className="sx-sala sx-entra" style={{ "--sx-c": cfgPrueba.c }}>
          <Esquinas />
          {numPrueba !== "claves" && tabsTareas}
          {(numPrueba === 1 || numPrueba === 2) && tareaActual && (
            <>
              {barraAcciones(numPrueba)}
              <Instrucciones sello={cfgPrueba.glifo} texto={tareaActual.instrucciones} />
              {numPrueba === 1 ? (
                tieneMaterial(tareaActual) ? (
                  <div className="sx-split">
                    <MaterialLectura tarea={tareaActual} zoom={zoom} setZoom={setZoom} hojaRef={hojaRef} />
                    <div className="sx-qs">
                      {tablero(1)}
                      {preguntas(1, tareaActual)}
                    </div>
                  </div>
                ) : (
                  <div className="sx-qs sx-unacol">
                    {tablero(1)}
                    {preguntas(1, tareaActual)}
                  </div>
                )
              ) : (
                <>
                  {tareaActual.guion ? (
                    <GeComponent
                      key={`audio-${tareaActual.num}`}
                      guion={tareaActual.guion}
                      items={tareaActual.items}
                      clips={tareaActual.clips}
                      examenClave={claveOficial(examen.nivel || nivel, examen.modelo)}
                      velocidad={velocidad}
                      setVelocidad={setVelocidad}
                      modoExamen={modoExamen && !O}
                      transcripcionLibre={O || (!modoExamen && (U || clavesDe(2, tareaActual).some((k) => comprobadas[k])))}
                    />
                  ) : (
                    <Instrucciones sello="!" texto={t_1("Este modelo no incluye el guion de audio.", "该模型未包含音频脚本。")} />
                  )}
                  {tareaActual.material?.bloques?.length > 0 && (
                    <div className="sx-bloques" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: 18 }}>
                      {tareaActual.material.bloques.map((bl) => (
                        <div key={bl.letra} className="sx-bloque">
                          <div className="sx-bloque-cab">
                            <span className="sx-letra">{bl.letra}</span>
                            {bl.titulo}
                          </div>
                          <TextoDele texto={bl.texto} variante="compacto" />
                        </div>
                      ))}
                    </div>
                  )}
                  {tareaActual.parejas?.length > 0 && (
                    <details className="sx-plegable" open style={{ marginBottom: 18 }}>
                      <summary>
                        <ClipboardListIcon size={16} /> Opciones para relacionar · <span lang="zh-CN">配对选项</span> ({tareaActual.parejas.length})
                      </summary>
                      <ul className="sx-lista-num">
                        {tareaActual.parejas.map((pa, i) => (
                          <li key={i}>
                            <span className="sx-letra">{String(pa.corresponde || pa.letra || "").trim() || String.fromCharCode(65 + i)}</span>
                            <span>{pa.enunciado}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  {tablero(2)}
                  <div className="sx-qgrid">{preguntas(2, tareaActual)}</div>
                </>
              )}
              {pieTareas()}
            </>
          )}
          {numPrueba === 3 && tareaActual && (() => {
            const a = tareaActual;
            const o = `esc-${a.num}`;
            const palabras = d(E[o]);
            const mat = a.material;
            return (
              <>
                <Instrucciones sello="写" texto={a.instrucciones || a.titulo} zh="写下你的回答，然后点击“AI 批改”。每次批改计入每周5次AI额度。" />
                <div className="sx-escritorio">
                  <div className="sx-encargo">
                    {(a.situacion || a.destinatario || a.proposito) && (
                      <div className="sx-cartela">
                        {a.situacion && (
                          <div style={{ "--sx-c2": "#1f4e8c" }}>
                            <span className="ico" aria-hidden="true">境</span>
                            <div className="k">Situación · <span lang="zh-CN">情境</span></div>
                            <p>{a.situacion}</p>
                          </div>
                        )}
                        {a.destinatario && (
                          <div style={{ "--sx-c2": "#b07a12" }}>
                            <span className="ico" aria-hidden="true">收</span>
                            <div className="k">Para · <span lang="zh-CN">收件人</span></div>
                            <p>{a.destinatario}</p>
                          </div>
                        )}
                        {a.proposito && (
                          <div style={{ "--sx-c2": "#1d6b3a" }}>
                            <span className="ico" aria-hidden="true">的</span>
                            <div className="k">Propósito · <span lang="zh-CN">目的</span></div>
                            <p>{a.proposito}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {mat && (mat.contenido || mat.guionAudio) && (
                      <div className="sx-sobre">
                        <div className="sx-sobre-de">
                          {mat.tipo === "audio" ? "Estímulo oral · 听力材料" : "Texto de partida · 阅读材料"}
                          {mat.palabras ? ` · ${mat.palabras} palabras` : ""}
                        </div>
                        {mat.contenido && <TextoDele texto={mat.contenido} variante={mat.tipo === "audio" ? "guion" : "compacto"} />}
                        {mat.guionAudio && (
                          <GeComponent guion={mat.guionAudio} examenClave={claveOficial(examen.nivel || nivel, examen.modelo)} velocidad={velocidad} setVelocidad={setVelocidad} />
                        )}
                      </div>
                    )}
                    {(a.puntosGuia || []).length > 0 && (
                      <div className="sx-bambu">
                        <div className="sx-bambu-k">
                          <span>
                            Puntos guía · <span lang="zh-CN">写作要点</span>
                          </span>
                          <span>
                            {a.puntosGuia.filter((_x, i) => guia[`${o}-${i}`]).length} / {a.puntosGuia.length}
                          </span>
                        </div>
                        {a.puntosGuia.map((pg, i) => (
                          <button key={i} type="button" className="sx-slip" aria-pressed={!!guia[`${o}-${i}`]} onClick={() => setGuia((g0) => ({ ...g0, [`${o}-${i}`]: !g0[`${o}-${i}`] }))}>
                            <span className="sl">{guia[`${o}-${i}`] ? "✓" : ""}</span>
                            <span className="tx">{pg}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="sx-lienzo">
                      <div className="sx-lienzo-cab">
                        <span>
                          写 Tu respuesta · <span lang="zh-CN">你的作文</span>
                        </span>
                        <span>✓ Se guarda solo · 自动保存</span>
                      </div>
                      <textarea
                        className="sx-renglones"
                        value={E[o] || ""}
                        onChange={(ev) => setE((le) => ({ ...le, [o]: ev.target.value }))}
                        placeholder="Escribe aquí tu texto en español… · 在此用西班牙语写作…"
                        aria-label={`Tu respuesta a la tarea ${a.num} · 你的作文`}
                        spellCheck={false}
                      />
                      <PincelPalabras palabras={palabras} minimo={a.minPalabras} maximo={a.maxPalabras} />
                      <div className="sx-iabar">
                        <CuotaIA />
                        <button type="button" className="sx-btn sx-btn-laca" onClick={() => Ce(o, E[o] || "", "escritura", a)} disabled={isCorrecting || !(E[o] || "").trim()}>
                          {isCorrecting ? <LoaderCircleIcon size={16} className="animate-spin" /> : <SparklesIcon size={16} />}
                          {isCorrecting ? "Corrigiendo… · 批改中" : "Corregir con IA · AI批改"}
                        </button>
                      </div>
                    </div>
                    {P[o] && (
                      <div className="sx-veredicto">
                        <C_2 data={P[o]} />
                      </div>
                    )}
                  </div>
                </div>
                {f(a.rubrica) && (
                  <details className="sx-plegable">
                    <summary>
                      <TargetIcon size={16} /> Rúbrica de evaluación · <span lang="zh-CN">评分标准</span>
                    </summary>
                    <div>
                      <VeComponent rubrica={a.rubrica || []} color={p.glow} />
                    </div>
                  </details>
                )}
                {a.modeloRespuesta && (
                  <details className="sx-plegable">
                    <summary>
                      <GraduationCapIcon size={16} /> Modelo de respuesta · <span lang="zh-CN">参考范文</span>
                    </summary>
                    <div>
                      <TextoDele texto={a.modeloRespuesta} variante="compacto" />
                    </div>
                  </details>
                )}
                {pieTareas()}
              </>
            );
          })()}
          {numPrueba === 4 && tareaActual && (() => {
            const a = tareaActual;
            const o = `oral-${a.num}`;
            const grabando = de === o;
            const palabras = d(E[o]);
            return (
              <>
                <Instrucciones sello="说" texto={a.instrucciones} zh="先准备，再按麦克风开始说。说完可以请 AI 批改（计入每周5次额度）。" />
                <div className="sx-oral">
                  <div>
                    <div className="sx-lamina">
                      <div className="sx-lamina-k">
                        Lámina · Tarea {a.num} {a.tiempo ? `· ${a.tiempo}` : ""} · <span lang="zh-CN">题卡</span>
                      </div>
                      <h3>{a.titulo}</h3>
                      {a.situacion && <p style={{ margin: "0 0 10px", fontSize: 14.5, lineHeight: 1.5 }}>{a.situacion}</p>}
                      {(a.opciones || []).length > 0 && (
                        <div className="sx-temas" role="group" aria-label="Elige un tema · 选一个题目">
                          {a.opciones.map((op, i) => (
                            <button key={i} type="button" className="sx-tema" aria-pressed={temaOral[o] === i} onClick={() => setTemaOral((t) => ({ ...t, [o]: i }))}>
                              {op}
                            </button>
                          ))}
                        </div>
                      )}
                      {(a.propuestas || []).length > 0 && (
                        <ul className="sx-lista-num" style={{ margin: "8px 0" }}>
                          {a.propuestas.map((pp, i) => (
                            <li key={i}>
                              <span>{i + 1}</span>
                              <span>{pp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {a.foto && <EsComponent texto={a.foto} />}
                      {!a.foto && a.escena && <TsComponent escena={a.escena} semilla={(examen.modelo || 0) + a.num} />}
                      {a.encuesta && <RsComponent encuesta={a.encuesta} />}
                      {(a.puntosGuia || []).length > 0 && (
                        <ul className="sx-aspectos">
                          {a.puntosGuia.map((pg, i) => (
                            <li key={i}>
                              <span>{i + 1}</span>
                              <span>{pg}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {a.cuadernilloCandidato && a.cuadernilloCandidato !== a.instrucciones && (
                        <details className="sx-plegable">
                          <summary>
                            <ClipboardListIcon size={16} /> Cuadernillo del candidato · <span lang="zh-CN">考生手册</span>
                          </summary>
                          <div>
                            <TextoDele texto={a.cuadernilloCandidato} variante="compacto" />
                          </div>
                        </details>
                      )}
                    </div>
                    <a
                      className="sx-examinador"
                      href={`#/examinador-oral?nivel=${encodeURIComponent(nivel || "")}&tema=${encodeURIComponent(a.titulo || "")}&tarea=${encodeURIComponent(a.instrucciones || "")}`}
                    >
                      <img src={recurso("mono/serio.webp")} alt="" aria-hidden="true" />
                      <p>
                        Hacer esta tarea con el examinador IA (cuenta como 1 uso)
                        <span className="sx-zh" lang="zh-CN">用 AI 考官模拟本项（计1次）</span>
                      </p>
                    </a>
                  </div>
                  <section className="sx-estudio gm-no-adapt">
                    <div className="sx-fases">
                      <button
                        type="button"
                        className={`sx-fase ${prep.enMarcha ? "on" : ""}`}
                        onClick={() => setPrep((pr) => (pr.restantes > 0 ? { ...pr, enMarcha: !pr.enMarcha } : { restantes: (te.preparacion || 0) * 60, enMarcha: true }))}
                        disabled={!te.preparacion}
                      >
                        Preparación · 准备
                        <b>{te.preparacion ? formatoReloj(prep.restantes) : "—"}</b>
                        {te.preparacion ? (prep.enMarcha ? "Pausar · 暂停" : "Empezar · 开始") : ""}
                      </button>
                      <div className={`sx-fase ${grabando ? "on" : ""}`}>
                        Hablando · 发言
                        <b>{formatoReloj(habla[o] || 0)}</b>
                        {a.tiempo ? `objetivo ${a.tiempo}` : ""}
                      </div>
                    </div>
                    <div className={`sx-micz ${grabando ? "graba" : ""}`}>
                      <OndasCirculares n={80} r0={66} r1={98} frac={1} color="#ffd27a" tenue="#ffd27a" />
                      <i className="halo" />
                      <i className="halo b" />
                      <button
                        type="button"
                        className="sx-micb"
                        aria-label={grabando ? "Detener grabación · 停止录音" : "Grabar con micrófono · 麦克风录音"}
                        onClick={() => {
                          if (grabando) return ss();
                          setHabla((h) => ({ ...h, [o]: 0 }));
                          return es(o);
                        }}
                      >
                        {grabando ? <SquareIcon fill="currentColor" /> : <MicIcon />}
                      </button>
                    </div>
                    <div className={`sx-grabando ${grabando ? "on" : ""}`}>
                      {grabando ? "Grabando · 录音中 — pulsa para parar" : "Pulsa el micrófono y habla · 点击麦克风开始说"}
                    </div>
                    <textarea
                      className="sx-renglones oral"
                      value={E[o] || ""}
                      onChange={(ev) => setE((w) => ({ ...w, [o]: ev.target.value }))}
                      placeholder="Aquí aparece lo que dices (o escribe tus ideas)… · 识别出的文字会显示在这里…"
                      aria-label="Transcripción de tu respuesta · 你的回答"
                    />
                    <div className="sx-iabar">
                      <span className="cuenta">
                        {palabras} palabras · <span lang="zh-CN">词</span>
                      </span>
                      <button type="button" className="sx-btn sx-btn-oro" onClick={() => Ce(o, E[o] || "", "monologo", a)} disabled={isCorrecting || !(E[o] || "").trim()}>
                        {isCorrecting ? <LoaderCircleIcon size={16} className="animate-spin" /> : <SparklesIcon size={16} />}
                        {isCorrecting ? "Corrigiendo… · 批改中" : "Corregir con IA · AI批改"}
                      </button>
                    </div>
                  </section>
                </div>
                <div style={{ marginTop: 14 }}>
                  <CuotaIA />
                </div>
                {K[o] && (
                  <div className="sx-veredicto">
                    <C_2 data={K[o]} />
                  </div>
                )}
                {a.entrevistador && (
                  <details className="sx-plegable">
                    <summary>
                      <UserCheckIcon size={16} /> Guion del entrevistador · <span lang="zh-CN">考官脚本</span>
                    </summary>
                    <div>
                      <OsComponent entrevistador={a.entrevistador} color={p.glow} />
                    </div>
                  </details>
                )}
                {f(a.rubrica) && (
                  <details className="sx-plegable">
                    <summary>
                      <TargetIcon size={16} /> Rúbrica de evaluación · <span lang="zh-CN">评分标准</span>
                    </summary>
                    <div>
                      <VeComponent rubrica={a.rubrica || []} color={p.glow} />
                    </div>
                  </details>
                )}
                {a.ejemploEsperado && (
                  <details className="sx-plegable">
                    <summary>
                      <GraduationCapIcon size={16} /> Ejemplo de lo esperado · <span lang="zh-CN">示例回答</span>
                    </summary>
                    <div>
                      <TextoDele texto={a.ejemploEsperado} variante="compacto" />
                    </div>
                  </details>
                )}
                {pieTareas()}
              </>
            );
          })()}
          {numPrueba === "claves" && (
            <>
              <div className="sx-diploma-zona gm-no-adapt">
                <i className="sx-rodv l" aria-hidden="true" />
                <i className="sx-rodv r" aria-hidden="true" />
                <div className="sx-diploma">
                  {apto && <Confeti />}
                  <img className="dragon l" src={recurso("theme/dragon-luz.webp")} alt="" aria-hidden="true" />
                  <img className="dragon r" src={recurso("theme/dragon-luz.webp")} alt="" aria-hidden="true" />
                  <div className="k">
                    RESULTADO DEL EXAMEN · <span lang="zh-CN">考试结果</span>
                  </div>
                  <h2>{apto === true ? "¡Enhorabuena!" : apto === false ? "¡Sigue entrenando!" : "Tu nota provisional"}</h2>
                  <span className="lema" lang="zh-CN">
                    {apto === true ? "恭喜通过" : apto === false ? "继续加油" : "暂定成绩"}
                  </span>
                  {apto === null && (
                    <p className="provisional">
                      Completa y corrige las cuatro pruebas para obtener el veredicto. · <span lang="zh-CN">完成并批改四项考试后即可得到最终结果。</span>
                    </p>
                  )}
                  <div className="sx-medallones">
                    <MedallonJade valor={grupo1} max={50} etiqueta="Grupo 1 · Lectura + Escrita" sub={`阅读 + 写作 · mín. ${minimo}`} />
                    <MedallonJade valor={grupo2} max={50} etiqueta="Grupo 2 · Auditiva + Oral" sub={`听力 + 口语 · mín. ${minimo}`} oro />
                  </div>
                  {apto !== null && (
                    <div className={`sx-veredicto-sello ${apto ? "" : "no"}`} translate="no">
                      {apto ? "合格" : "未过"}
                      <small>{apto ? "APTO" : "NO APTO"}</small>
                    </div>
                  )}
                  {apto && <img className="mono" src={recurso("mono/trofeo.webp")} alt="" aria-hidden="true" />}
                  <div className="sx-franjas">
                    {[
                      [1, pLect],
                      [3, pEsc],
                      [2, pAud],
                      [4, pOral],
                    ].map(([num, v]) => {
                      const cfg = PRUEBAS_SX[num];
                      return (
                        <button key={num} type="button" className="sx-franja" style={{ "--sx-c": cfg.c }} onClick={() => cambiarPrueba(num)}>
                          <div className="t">
                            <span translate="no">{cfg.glifo}</span>
                            {cfg.es}
                          </div>
                          {v === null ? (
                            <div className="pend">
                              {num <= 2 ? "Sin corregir · 未批改" : "Pide la corrección con IA · 请AI批改"} →
                            </div>
                          ) : (
                            <>
                              <div className="v">
                                {v.toFixed(1).replace(".", ",").replace(",0", "")}
                                <small> / 25</small>
                              </div>
                              <div className="bb">
                                <i style={{ width: `${(v / 25) * 100}%` }} />
                              </div>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="sx-acciones">
                    <button type="button" className="sx-btn sx-btn-laca" onClick={() => setImprimir("corregido")}>
                      <FileDownIcon size={17} /> PDF corregido · <span className="sx-zh" lang="zh-CN">下载批改版</span>
                    </button>
                    <button type="button" className="sx-btn sx-btn-oro" onClick={() => setImprimir("blanco")}>
                      <FileDownIcon size={17} /> Examen en blanco · <span className="sx-zh" lang="zh-CN">空白试卷</span>
                    </button>
                    {(N || O) && (
                      <button type="button" className="sx-btn sx-btn-papel" onClick={repetirFallos}>
                        <RotateCcwIcon size={16} /> Repetir fallos · <span className="sx-zh" lang="zh-CN">重做错题</span>
                      </button>
                    )}
                    <button type="button" className="sx-btn sx-btn-papel" onClick={empezarDeNuevo}>
                      <RotateCcwIcon size={16} /> Empezar de cero · <span className="sx-zh" lang="zh-CN">全部重来</span>
                    </button>
                  </div>
                  <p className="sx-nota-pie">
                    {n_evaluacion?.criterio || `APTO con ≥${minimo} puntos en cada grupo`}. Lectura y auditiva se puntúan con la clave oficial; escritura y oral, con la corrección por IA. ·{" "}
                    <span lang="zh-CN">阅读与听力按官方答案计分；写作与口语按 AI 批改估算。</span>
                  </p>
                </div>
              </div>
              <div className="sx-claves">
                <UeComponent titulo="Claves · Comprensión de lectura · 答案 · 阅读理解" claves={examen.claves?.lectura || []} tareas={ee?.tareas || []} t={t_1} />
                <UeComponent titulo="Claves · Comprensión auditiva · 答案 · 听力理解" claves={examen.claves?.auditiva || qs(examen, 2)} tareas={se?.tareas || []} t={t_1} />
              </div>
            </>
          )}
        </div>
        {numPrueba !== "claves" && barraMovil()}
      </div>
      {imprimir &&
        createPortal(
          <ImpresionExamen examen={examen} nivel={nivel} variante={imprimir} respuestas={j} textos={E} correccionesEsc={P} correccionesOral={K} temaOral={temaOral} puntuacion={puntuacion} />,
          document.body,
        )}
    </StarfieldBackground>
  );
}
function tieneMaterial(tarea) {
  const m = tarea.material;
  return Boolean(tarea.texto || m?.bloques?.length || m?.fragmentos?.length || m?.textos?.length || (m?.enunciados?.length > 0 && tarea.tipo !== "relacionar"));
}
function MaterialLectura({ tarea, zoom, setZoom, hojaRef }) {
  const m = tarea.material;
  const hayEnunciados = m?.enunciados?.length > 0 && tarea.tipo !== "relacionar";
  if (!tieneMaterial(tarea)) return null;
  return (
    <div className="sx-rollo gm-no-adapt">
      <i className="sx-rod t" aria-hidden="true" />
      <div className="sx-hoja" ref={hojaRef} style={{ "--sx-zoom": zoom }}>
        <div className="sx-hoja-cab">
          <span>
            {tarea.genero || "Texto"} · <span lang="zh-CN">原文</span>
          </span>
          <span className="sx-hoja-tools">
            <button type="button" onClick={() => setZoom((z) => Math.max(0.85, +(z - 0.1).toFixed(2)))} aria-label="Letra más pequeña · 缩小字体">
              A−
            </button>
            <button type="button" onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(2)))} aria-label="Letra más grande · 放大字体">
              A+
            </button>
          </span>
        </div>
        {tarea.tituloTexto && <h3>{tarea.tituloTexto}</h3>}
        {tarea.texto && <TextoDele texto={tarea.texto} variante="lectura" />}
        {m?.bloques?.length > 0 && (
          <div className="sx-bloques">
            {m.bloques.map((bl) => (
              <div key={bl.letra} className="sx-bloque">
                <div className="sx-bloque-cab">
                  <span className="sx-letra">{bl.letra}</span>
                  {bl.titulo}
                </div>
                <TextoDele texto={bl.texto} variante="compacto" data-bloque={bl.letra} />
              </div>
            ))}
          </div>
        )}
        {hayEnunciados && (
          <div className="sx-bloque" style={{ marginTop: 12 }}>
            <div className="sx-bloque-cab">Enunciados · 陈述</div>
            <ul className="sx-lista-num">
              {m.enunciados.map((en, i) => (
                <li key={i}>
                  <span>{i + 1}</span>
                  <span>{en}</span>
                </li>
              ))}
            </ul>
            {typeof m.sobrantes === "number" && m.sobrantes > 0 && <p style={{ fontSize: 12, margin: "8px 0 0" }}>Hay {m.sobrantes} opciones que no se utilizan · 有{m.sobrantes}个选项不使用</p>}
          </div>
        )}
        {m?.fragmentos?.length > 0 && (
          <div className="sx-bloques">
            {m.fragmentos.map((fr) => (
              <div key={fr.letra} className="sx-bloque">
                <div className="sx-bloque-cab">
                  <span className="sx-letra">{fr.letra}</span>
                  Fragmento · 片段
                </div>
                <TextoDele texto={fr.texto} variante="compacto" />
              </div>
            ))}
          </div>
        )}
        {m?.textos?.length > 0 && (
          <div className="sx-bloques">
            {m.textos.map((tx, i) => (
              <div key={i} className="sx-bloque">
                {(tx.titulo || tx.tituloTexto) && <div className="sx-bloque-cab">{tx.titulo || tx.tituloTexto}</div>}
                <TextoDele texto={tx.texto} variante="compacto" />
              </div>
            ))}
          </div>
        )}
        {(tarea.palabras || tarea.fuente) && (
          <div className="sx-hoja-pie">
            {tarea.palabras ? <span>{tarea.palabras} palabras · 词</span> : null}
            {tarea.fuente && <i>{tarea.fuente}</i>}
          </div>
        )}
      </div>
      <i className="sx-rod b" aria-hidden="true" />
    </div>
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
