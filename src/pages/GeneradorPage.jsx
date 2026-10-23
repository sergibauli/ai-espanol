import {
  SparklesIcon,
  Trash2Icon,
  Volume2Icon,
  BookOpenIcon,
  MicIcon,
  ArrowLeftIcon,
  LoaderCircleIcon,
  SaveIcon,
  FileTextIcon,
  HeadphonesIcon,
  PenToolIcon,
  MessageCircleIcon,
  SquareIcon,
  HistoryIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { u, C } from "../components/CorrectionDisplay.jsx";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { c as c_1, e, a } from "../lib/ai-generator.js";
const Q = "dele_generated_content_v1";
const he = ["A1", "A2", "B1", "B2"];
function fe() {
  try {
    return JSON.parse(localStorage.getItem(Q) || "[]");
  } catch {
    return [];
  }
}
function W(r) {
  try {
    localStorage.setItem(Q, JSON.stringify(r));
  } catch {}
}
const system =
  "Eres un generador experto de exámenes DELE de español para estudiantes chinos. Devuelve SOLO un objeto JSON válido, sin markdown, sin comentarios y sin texto fuera del JSON. El contenido debe ser completo y desarrollado, NUNCA vacío.";
function je(r, c) {
  const user = `Genera un examen DELE completo de nivel ${c} sobre el tema "${r}". Escribe TODO el contenido en español (los campos "chinese" en chino). Devuelve únicamente un JSON con exactamente esta estructura, con contenido real y desarrollado en cada campo (nada de arrays vacíos, nada de repetir solo el título):

{
  "theme": "${r}",
  "level": "${c}",
  "vocabulary": [ 8 objetos, cada uno así: {"word": "una palabra del tema en español", "definition": "definición breve en español", "chinese": "中文翻译", "example": "una frase de ejemplo en español usando la palabra"} ],
  "reading": {
    "textType": "artículo",
    "title": "un título para la lectura",
    "text": "un texto completo de 120 a 180 palabras en español sobre el tema",
    "questions": [ 5 objetos, cada uno: {"question": "pregunta de comprensión en español", "options": ["a) opción 1", "b) opción 2", "c) opción 3", "d) opción 4"], "correctAnswer": 0, "explanation": "explicación breve de la respuesta correcta"} ]
  },
  "listening": {
    "title": "un título para la audición",
    "transcription": "un texto hablado completo de 80 a 120 palabras en español sobre el tema",
    "questions": [ 5 objetos, cada uno: {"question": "pregunta en español", "options": ["a) ...", "b) ...", "c) ...", "d) ..."], "correctAnswer": 0} ]
  },
  "writing": {
    "optionA": {"title": "título de la tarea de escritura A", "description": "descripción de lo que debe escribir"},
    "optionB": {"title": "título de la tarea de escritura B", "description": "descripción de lo que debe escribir"}
  },
  "monologue": {
    "topic1": {"title": "tema para hablar 2 minutos", "description": "instrucciones del monólogo"},
    "topic2": {"title": "otro tema para hablar 2 minutos", "description": "instrucciones del monólogo"}
  },
  "interaction": {
    "situation": "una situación de conversación con el examinador",
    "questions": [ 3 objetos, cada uno: {"question": "pregunta del examinador en español", "help": "ayuda breve", "usefulPhrases": ["frase útil 1", "frase útil 2", "frase útil 3", "frase útil 4"]} ]
  }
}

IMPORTANTE: "correctAnswer" es un número entero de 0 a 3 (el índice de la opción correcta). No escribas explicaciones fuera del JSON.`;
  return {
    system,
    user,
  };
}
function PeComponent() {
  const [r] = React.useState("examen");
  const [c, setC] = React.useState("");
  const [y, setY] = React.useState("A1");
  const [S, setS] = React.useState(false);
  const [w, setW] = React.useState("");
  const [h, setH] = React.useState(null);
  const [g, setG] = React.useState(fe);
  const [O, setO] = React.useState(false);
  const [D, setD] = React.useState(false);
  const P = (s) =>
    s &&
    Array.isArray(s.vocabulary) &&
    s.vocabulary.length >= 5 &&
    s.reading?.text?.length > 60 &&
    Array.isArray(s.reading?.questions) &&
    s.reading.questions.length >= 3 &&
    Array.isArray(s.listening?.questions) &&
    s.listening.questions.length >= 3;
  const $ = async () => {
    if (!c.trim()) {
      setW("Escribe un tema / 请先输入主题");
      return;
    }
    setS(true);
    setW("");
    setH(null);
    try {
      const { system, user } = je(c.trim(), y);
      const m = `${y} ${c.trim()}`;
      let p = null;
      let j = await c_1("examen", m, system);
      p = e(j);
      for (let T = 2; T <= 3 && !P(p); T++) {
        j = await a(system, user);
        p = e(j);
      }
      if (P(p)) {
        setH(p);
      } else {
        setW(
          "La IA no devolvió un examen completo tras 3 intentos. Prueba otro tema o reintenta / AI未返回完整考试（已重试3次）",
        );
      }
    } catch (error) {
      setW(error.message || "Error");
    }
    setS(false);
  };
  const H = () => {
    if (!h) {
      return;
    }
    const f = [
      {
        id: `${r}-${Date.now()}`,
        mode: r,
        level: y,
        theme: c.trim(),
        createdAt: Date.now(),
        data: h,
      },
      ...g,
    ].slice(0, 30);
    setG(f);
    W(f);
    setD(true);
    setTimeout(() => setD(false), 1500);
  };
  const G = (s) => {
    setC(s.theme);
    setY(s.level);
    setH(s.data);
    setO(false);
  };
  return (
    <StarfieldBackground>
      <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-6 text-sm font-bold"
        >
          <ArrowLeftIcon size={16} /> Volver / 返回
        </Link>
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
            style={{
              background: "rgba(168,85,247,.14)",
              border: "1px solid rgba(168,85,247,.35)",
            }}
          >
            <SparklesIcon
              size={16}
              style={{
                color: "#c084fc",
              }}
            />
            <span className="text-sm font-black text-white">Agentes IA de Contenido · AI内容智能体</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-2"
            style={{
              textShadow: "0 0 30px rgba(168,85,247,.3)",
            }}
          >
            Generador IA
          </h1>
          <p className="text-white/50 text-lg">Genera exámenes DELE completos con un solo clic</p>
        </div>
        <div
          className="rounded-3xl p-6 mb-8"
          style={{
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={c}
              onChange={(s) => setC(s.target.value)}
              placeholder="Tema del examen (ej. La comida) / 考试主题"
              className="md:col-span-2 px-4 py-3 rounded-xl text-white font-bold bg-white/5 border border-white/10 outline-none placeholder:text-white/30 focus:border-purple-400/50"
            />
            <select
              value={y}
              onChange={(s) => setY(s.target.value)}
              className="px-4 py-3 rounded-xl text-white font-bold bg-white/5 border border-white/10 outline-none focus:border-purple-400/50"
            >
              {he.map((s) => (
                <option key={s} value={s} className="bg-slate-900">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={$}
              disabled={S}
              className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-black text-sm transition-transform hover:scale-105 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg,#a855f7,#ec4899)",
                boxShadow: "0 0 30px rgba(168,85,247,.4)",
              }}
            >
              {S ? <LoaderCircleIcon size={16} className="animate-spin" /> : <SparklesIcon size={16} />}
              {S ? "Generando... / 生成中" : "Generar / 生成"}
            </button>
            {h && (
              <button
                onClick={H}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-black text-sm transition-transform hover:scale-105"
                style={{
                  background: "rgba(57,255,20,.15)",
                  border: "1px solid rgba(57,255,20,.4)",
                  color: "#39ff14",
                }}
              >
                <SaveIcon size={16} /> {D ? "Guardado ✓" : "Guardar / 保存"}
              </button>
            )}
            <button
              onClick={() => setO((s) => !s)}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-black transition-transform hover:scale-105"
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "rgba(255,255,255,.6)",
              }}
            >
              <HistoryIcon size={16} /> Historial ({g.length})
            </button>
          </div>
          {w && <p className="mt-3 text-sm font-bold text-red-400">{w}</p>}
        </div>
        {O && g.length > 0 && (
          <div
            className="rounded-3xl p-5 mb-8"
            style={{
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <h3 className="text-white font-black mb-3">Historial generado / 生成历史</h3>
            <div className="space-y-2">
              {g.map((s, f) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <button onClick={() => G(s)} className="flex-1 text-left">
                    <p className="text-white font-bold text-sm">
                      📝 {s.theme} · {s.level}
                    </p>
                    <p className="text-white/35 text-xs">{new Date(s.createdAt).toLocaleString()}</p>
                  </button>
                  <button
                    onClick={() => {
                      const m = g.filter((p, j) => j !== f);
                      setG(m);
                      W(m);
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/10"
                  >
                    <Trash2Icon
                      size={14}
                      style={{
                        color: "rgba(255,77,77,.5)",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {h && (
          <div className="space-y-5">
            <YeComponent exam={h} />
          </div>
        )}
      </div>
    </StarfieldBackground>
  );
}
function B(r) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return;
  }
  window.speechSynthesis.cancel();
  const c = new SpeechSynthesisUtterance(r.replace(/[*_#`]/g, "").trim());
  c.lang = "es-ES";
  c.rate = 0.9;
  window.speechSynthesis.speak(c);
}
function YeComponent({ exam }) {
  const { correctText, isCorrecting } = u();
  const [y, setY] = React.useState({});
  const [S, setS] = React.useState({});
  const [w, setW] = React.useState({});
  const [h, setH] = React.useState({});
  const [g, setG] = React.useState("");
  const [O, setO] = React.useState(null);
  const [D, setD] = React.useState(false);
  const [P, setP] = React.useState("");
  const [H, setH_1] = React.useState(null);
  const [s, setS_1] = React.useState(false);
  const mRef = React.useRef(null);
  const pRef = React.useRef("");
  const j = (setRec, setText, setCorr) => {
    const i = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!i) {
      alert("Tu navegador no soporta voz / 浏览器不支持语音");
      return;
    }
    if (mRef.current) {
      try {
        mRef.current.abort();
      } catch {}
    }
    const l = new i();
    l.lang = "es-ES";
    l.interimResults = true;
    l.continuous = false;
    let d = "";
    l.onresult = (x) => {
      let b = "";
      for (let k = x.resultIndex; k < x.results.length; k++) {
        const R = x.results[k][0].transcript;
        if (x.results[k].isFinal) {
          d += R;
        } else {
          b += R;
        }
      }
      pRef.current = d;
      setText(d + b);
    };
    l.onend = () => {
      setRec(false);
      setText(pRef.current);
    };
    l.onerror = () => setRec(false);
    mRef.current = l;
    setRec(true);
    setText("");
    setCorr(null);
    pRef.current = "";
    try {
      l.start();
    } catch {
      setRec(false);
    }
  };
  const T = (setRec) => {
    setRec(false);
    mRef.current?.stop();
  };
  const J = async (t, a, o, i) => {
    if (!t.trim() || isCorrecting) {
      return;
    }
    const l = await correctText(t, a, exam.level, i);
    if (l.data) {
      o(l.data);
    }
  };
  const V1Component = ({ icon, color, title, children }) => (
    <div
      className="rounded-3xl p-6"
      style={{
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: `${color}20`,
            border: `1px solid ${color}45`,
          }}
        >
          {icon}
        </div>
        <h3 className="text-white font-black text-lg">{title}</h3>
      </div>
      {children}
    </div>
  );
  const XComponent = ({ picked, oi, isCorrect, o: o_1, onPick }) => {
    let background = "rgba(255,255,255,.04)";
    let border = "1px solid rgba(255,255,255,.1)";
    let color = "rgba(255,255,255,.8)";
    if (picked !== undefined) {
      if (isCorrect) {
        background = "rgba(57,255,20,.15)";
        border = "1px solid rgba(57,255,20,.5)";
        color = "#39ff14";
      } else if (picked === oi) {
        background = "rgba(255,77,77,.15)";
        border = "1px solid rgba(255,77,77,.5)";
        color = "#ff4d4d";
      } else {
        color = "rgba(255,255,255,.35)";
      }
    }
    return (
      <button
        onClick={onPick}
        disabled={picked !== undefined}
        className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all disabled:pointer-events-none hover:scale-[1.01]"
        style={{
          background,
          border,
          color,
        }}
      >
        {o_1}
      </button>
    );
  };
  const FComponent = ({ q, i: i_1, picks, setPicks }) => (
    <div
      className="p-3 rounded-xl"
      style={{
        background: "rgba(0,0,0,.2)",
      }}
    >
      <div className="flex items-start gap-2 mb-1">
        <p className="text-white font-bold flex-1">
          {i_1 + 1}. {q.question}
        </p>
        <button
          onClick={() => B(q.question)}
          className="p-1.5 rounded-lg shrink-0"
          style={{
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.1)",
          }}
          title="Escuchar pregunta"
        >
          <Volume2Icon
            size={12}
            style={{
              color: "rgba(255,255,255,.5)",
            }}
          />
        </button>
      </div>
      <div className="space-y-1.5">
        {(q.options || []).map((o, d) => (
          <XComponent
            key={d}
            oi={d}
            o={o}
            picked={picks[i_1]}
            isCorrect={d === q.correctAnswer}
            onPick={() =>
              setPicks((x) => ({
                ...x,
                [i_1]: d,
              }))
            }
          />
        ))}
      </div>
      {picks[i_1] !== undefined && (
        <p
          className="text-xs mt-2 font-bold"
          style={{
            color: picks[i_1] === q.correctAnswer ? "#39ff14" : "#ff4d4d",
          }}
        >
          {picks[i_1] === q.correctAnswer
            ? "✓ Correcta / 正确"
            : `✗ La correcta era: ${(q.options || [])[q.correctAnswer]}`}
        </p>
      )}
    </div>
  );
  const VComponent = ({ label, text, setText, corr, setCorr, rec, setRec, tipo, tarea }) => (
    <div
      className="p-4 rounded-xl"
      style={{
        background: "rgba(0,0,0,.2)",
      }}
    >
      <p className="text-white font-bold mb-2">{label}</p>
      <textarea
        value={text}
        onChange={(R) => setText(R.target.value)}
        rows={4}
        placeholder="Escribe aquí o pulsa Grabar... / 在这里写或按录音..."
        className="w-full px-3 py-2.5 rounded-xl text-white text-sm bg-black/30 border border-white/15 outline-none placeholder:text-white/30 focus:border-orange-400/50 resize-none mb-2"
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => J(text, tipo, setCorr, tarea)}
          disabled={isCorrecting || !text.trim()}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-black text-xs transition-transform hover:scale-105 disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg,#ff6b35,#ff00aa)",
          }}
        >
          {isCorrecting ? (
            <LoaderCircleIcon size={13} className="animate-spin" />
          ) : (
            <SparklesIcon size={13} />
          )}
          {isCorrecting ? "Corrigiendo..." : "Corregir con IA / AI批改"}
        </button>
        {rec ? (
          <button
            onClick={() => T(setRec)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black"
            style={{
              background: "rgba(239,68,68,.25)",
              border: "1px solid rgba(239,68,68,.5)",
              color: "#ff4d4d",
            }}
          >
            <SquareIcon size={12} /> Detener / 停止
          </button>
        ) : (
          <button
            onClick={() => j(setRec, setText, setCorr)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.15)",
              color: "rgba(255,255,255,.7)",
            }}
          >
            <MicIcon size={12} /> Grabar / 录音
          </button>
        )}
      </div>
      {corr && <C data={corr} />}
    </div>
  );
  return (
    <>
      <div className="text-center py-3">
        <h2 className="text-2xl font-black text-white">
          {exam.theme} · {exam.level}
        </h2>
      </div>
      <V1Component
        icon={<BookOpenIcon size={17} color="#39ff14" />}
        color="#39ff14"
        title="Vocabulario / 词汇"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(exam.vocabulary || []).map((t, a) => (
            <div
              key={a}
              className="p-3 rounded-xl flex items-start gap-2"
              style={{
                background: "rgba(255,255,255,.03)",
              }}
            >
              <div className="flex-1">
                <p className="text-white font-bold">
                  {t.word} <span className="text-white/40 text-sm">— {t.chinese}</span>
                </p>
                <p className="text-white/50 text-xs">{t.definition}</p>
              </div>
              <button
                onClick={() => B(t.word)}
                className="p-1.5 rounded-lg shrink-0"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
                title="Escuchar"
              >
                <Volume2Icon
                  size={12}
                  style={{
                    color: "rgba(255,255,255,.5)",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </V1Component>
      <V1Component
        icon={<FileTextIcon size={17} color="#00d4ff" />}
        color="#00d4ff"
        title={`Lectura: ${exam.reading?.title || ""} / 阅读`}
      >
        <p className="text-white/75 leading-relaxed mb-4 whitespace-pre-line">{exam.reading?.text}</p>
        <div className="space-y-2">
          {(exam.reading?.questions || []).map((t, a) => (
            <FComponent key={a} q={t} i={a} picks={y} setPicks={setY} />
          ))}
        </div>
      </V1Component>
      <V1Component
        icon={<HeadphonesIcon size={17} color="#ff6b35" />}
        color="#ff6b35"
        title={`Listening: ${exam.listening?.title || ""} / 听力`}
      >
        <button
          onClick={() => B(exam.listening?.transcription || "")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black mb-3 transition-transform hover:scale-105"
          style={{
            background: "rgba(255,107,53,.15)",
            border: "1px solid rgba(255,107,53,.4)",
            color: "#ffb33b",
          }}
        >
          <Volume2Icon size={14} /> Escuchar audio / 播放听力
        </button>
        <p className="text-white/60 italic mb-4 whitespace-pre-line">{exam.listening?.transcription}</p>
        <div className="space-y-2">
          {(exam.listening?.questions || []).map((t, a) => (
            <FComponent key={a} q={t} i={a} picks={S} setPicks={setS} />
          ))}
        </div>
      </V1Component>
      <V1Component icon={<PenToolIcon size={17} color="#ffd600" />} color="#ffd600" title="Escritura / 写作">
        <div className="space-y-3">
          {["optionA", "optionB"].map((t) => (
            <div
              key={t}
              className="p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,.03)",
              }}
            >
              <p className="text-white font-bold mb-1">{exam.writing?.[t]?.title}</p>
              <p className="text-white/50 text-sm mb-2">{exam.writing?.[t]?.description}</p>
              <textarea
                value={w[t] || ""}
                onChange={(a) =>
                  setW((o) => ({
                    ...o,
                    [t]: a.target.value,
                  }))
                }
                rows={4}
                placeholder="Escribe tu texto... / 写下你的作文..."
                className="w-full px-3 py-2.5 rounded-xl text-white text-sm bg-black/30 border border-white/15 outline-none placeholder:text-white/30 focus:border-yellow-400/50 resize-none mb-2"
              />
              <button
                onClick={() =>
                  J(
                    w[t] || "",
                    "escritura",
                    (a) =>
                      setH((o) => ({
                        ...o,
                        [t]: a,
                      })),
                    exam.writing?.[t]?.title,
                  )
                }
                disabled={isCorrecting || !(w[t] || "").trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-black text-xs transition-transform hover:scale-105 disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                }}
              >
                {isCorrecting ? (
                  <LoaderCircleIcon size={13} className="animate-spin" />
                ) : (
                  <SparklesIcon size={13} />
                )}
                {isCorrecting ? "Corrigiendo..." : "Corregir con IA / AI批改"}
              </button>
              {h[t] && <C data={h[t]} />}
            </div>
          ))}
        </div>
      </V1Component>
      <V1Component icon={<MicIcon size={17} color="#ff00aa" />} color="#ff00aa" title="Monólogo / 独白">
        <div className="space-y-3 mb-3">
          {["topic1", "topic2"].map((t) => (
            <div
              key={t}
              className="p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,.03)",
              }}
            >
              <p className="text-white font-bold mb-1">{exam.monologue?.[t]?.title}</p>
              <p className="text-white/50 text-sm">{exam.monologue?.[t]?.description}</p>
            </div>
          ))}
        </div>
        <VComponent
          label="Practica tu monólogo / 练习你的独白"
          text={g}
          setText={setG}
          corr={O}
          setCorr={setO}
          rec={D}
          setRec={setD}
          tipo="monologo"
          tarea={exam.monologue?.topic1?.title}
        />
      </V1Component>
      <V1Component
        icon={<MessageCircleIcon size={17} color="#c084fc" />}
        color="#c084fc"
        title="Interacción / 互动"
      >
        <p className="text-white/70 mb-3">{exam.interaction?.situation}</p>
        {(exam.interaction?.questions || []).map((t, a) => (
          <div
            key={a}
            className="p-3 rounded-xl mb-2"
            style={{
              background: "rgba(255,255,255,.03)",
            }}
          >
            <p className="text-white font-bold text-sm">
              {a + 1}. {t.question}
            </p>
            {t.help && <p className="text-white/40 text-xs mt-1">{t.help}</p>}
            {t.usefulPhrases?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {t.usefulPhrases.map((o, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(168,85,247,.15)",
                      color: "#c084fc",
                    }}
                  >
                    {o}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="mt-3">
          <VComponent
            label="Practica la interacción / 练习互动"
            text={P}
            setText={setP}
            corr={H}
            setCorr={setH_1}
            rec={s}
            setRec={setS_1}
            tipo="interaccion"
            tarea={exam.interaction?.situation}
          />
        </div>
      </V1Component>
    </>
  );
}
export { PeComponent as default };
