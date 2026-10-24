import * as React from "react";
import { XIcon, Volume2Icon, Volume1Icon, MicIcon, CheckIcon, RotateCcwIcon, ArrowRightIcon, SquareIcon, PlayIcon } from "lucide-react";
import { speak } from "../lesson/fx.js";

// Normaliza: minúsculas, sin tildes (salvo ñ), sin puntuación.
function norm(t) {
  if (!t) return "";
  let s = String(t).toLowerCase().replace(/ñ/g, "\u0001").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0001/g, "ñ");
  s = s.replace(/[¡!¿?.,;:"'«»]/g, " ");
  return s.replace(/\s+/g, " ").trim();
}

// Distancia de Levenshtein.
function lev(a, b) {
  a = a || ""; b = b || "";
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[n];
}

function ratio(a, b) {
  return 1 - lev(a, b) / Math.max(a.length, b.length, 1);
}

// Comprueba si un transcript coincide con el objetivo según el tipo.
function matches(kind, transcript, target) {
  const t = norm(transcript);
  const g = norm(target);
  if (!t) return false;
  if (kind === "silaba") {
    if (t.includes(g)) return true;
    return t.split(" ").some((w) => ratio(w, g) >= 0.6);
  }
  if (kind === "palabra") {
    if (t === g) return true;
    if (t.split(" ").includes(g)) return true;
    return ratio(t, g) >= 0.75;
  }
  // frase
  const tw = g.split(" ").filter(Boolean);
  const hw = t.split(" ").filter(Boolean);
  if (!tw.length) return false;
  const found = tw.filter((w) => hw.some((h) => h === w || ratio(h, w) >= 0.8)).length;
  return found / tw.length >= 0.7;
}

export default function PracticePlayer({ item, familia, onClose }) {
  const steps = React.useMemo(() => {
    const raw = [];
    raw.push({ kind: "silaba", es: item.s, zh: familia.consejoZh, label: "Sílaba · 音节" });
    raw.push({ kind: "palabra", es: item.ej, zh: item.ejZh, label: "Palabra · 单词" });
    (item.palabras || []).forEach((p) => raw.push({ kind: "palabra", es: p.es, zh: p.zh, label: "Palabra · 单词" }));
    (item.frases || []).forEach((f) => raw.push({ kind: "frase", es: f.es, zh: f.zh, label: "Frase · 句子" }));
    const seen = new Set();
    return raw.filter((s) => {
      const k = (s.es || "").toLowerCase();
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [item, familia]);

  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const [mode, setMode] = React.useState(SR ? "speech" : "self");
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState("idle");
  const [heard, setHeard] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [ended, setEnded] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState(null);

  const recRef = React.useRef(null);
  const mediaRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const playTimer = React.useRef(null);

  const step = steps[index];
  const total = steps.length;

  // Bloquea scroll y cierra con Escape.
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Reproduce el audio del paso al cambiar.
  React.useEffect(() => {
    if (ended || !step) return;
    setPhase("idle");
    setHeard("");
    clearTimeout(playTimer.current);
    playTimer.current = setTimeout(() => {
      try { speak(step.es, 0.85); } catch (e) {}
    }, 350);
    return () => clearTimeout(playTimer.current);
  }, [index, ended]);

  // Limpia recognizer/recording al desmontar o cambiar de paso.
  React.useEffect(() => {
    return () => {
      if (recRef.current) { try { recRef.current.abort(); } catch (e) {} recRef.current = null; }
      if (mediaRef.current && mediaRef.current.state !== "inactive") { try { mediaRef.current.stop(); } catch (e) {} }
      if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
    };
  }, [index, ended]);

  // Revoca blob URLs.
  React.useEffect(() => {
    return () => { if (audioUrl) URL.revokeObjectURL(audioUrl); };
  }, [audioUrl]);

  // Registra el resultado del paso en el momento de la respuesta (no sobrescribe un acierto)
  const record = (i, ok) =>
    setResults((prev) => {
      const copy = prev.slice();
      copy[i] = copy[i] === true ? true : ok;
      return copy;
    });

  const startListening = () => {
    if (!SR) { setMode("self"); setPhase("self"); return; }
    try {
      const rec = new SR();
      recRef.current = rec;
      rec.lang = "es-ES";
      rec.interimResults = false;
      rec.maxAlternatives = 5;
      rec.continuous = false;
      setPhase("listening");
      rec.onresult = (ev) => {
        const res = ev.results[0];
        const alts = [];
        for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
        const best = alts[0] || "";
        setHeard(best);
        const ok = alts.some((a) => matches(step.kind, a, step.es));
        record(index, ok);
        setPhase(ok ? "ok" : "bad");
      };
      rec.onerror = (e) => {
        const err = e && e.error;
        if (err === "network" || err === "not-allowed" || err === "service-not-allowed" || err === "audio-capture") {
          setMode("self");
          setPhase("self");
        } else if (err === "no-speech") {
          record(index, false);
          setHeard("");
          setPhase("bad");
        }
      };
      rec.onend = () => {
        setPhase((p) => (p === "listening" ? "idle" : p));
        recRef.current = null;
      };
      rec.start();
    } catch (e) {
      setMode("self");
      setPhase("self");
    }
  };

  const stopListening = () => {
    if (recRef.current) { try { recRef.current.stop(); } catch (e) {} }
  };

  const onMic = () => {
    if (phase === "listening") stopListening();
    else startListening();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      mediaRef.current = mr;
      const chunks = [];
      mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
      };
      mr.start();
      setRecording(true);
    } catch (e) {
      // getUserMedia falla: solo autoevaluación
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRef.current && mediaRef.current.state === "recording") {
      try { mediaRef.current.stop(); } catch (e) {}
    }
    setRecording(false);
  };

  const playRecording = () => {
    if (!audioUrl) return;
    try { new Audio(audioUrl).play(); } catch (e) {}
  };

  const goNext = () => {
    if (recRef.current) { try { recRef.current.abort(); } catch (e) {} recRef.current = null; }
    if (mediaRef.current && mediaRef.current.state !== "inactive") { try { mediaRef.current.stop(); } catch (e) {} }
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
    setRecording(false);
    if (index + 1 >= total) setEnded(true);
    else setIndex((i) => i + 1);
  };

  const retry = () => {
    setPhase("idle");
    setHeard("");
    try { speak(step.es, 0.55); } catch (e) {}
  };

  const correct = results.filter((r) => r === true).length;
  const pct = ended ? 100 : ((index + (phase === "ok" ? 1 : 0)) / total) * 100;

  if (ended) {
    const ratio0 = total ? correct / total : 0;
    const stars = ratio0 >= 0.9 ? 3 : ratio0 >= 0.6 ? 2 : 1;
    const title = ratio0 >= 0.7 ? "¡Sílaba dominada! · 音节掌握！" : "¡Buen trabajo! · 做得好！";
    return (
      <div className="pp-overlay" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="pp-card" onClick={(e) => e.stopPropagation()}>
          <div className="pp-top">
            <button className="pp-close" aria-label="Cerrar" onClick={onClose}><XIcon /></button>
            <div className="pp-bar"><i className="pp-bar-fill" style={{ width: pct + "%" }} /></div>
            <span className="pp-count">{total}/{total}</span>
          </div>
          <div className="pp-end">
            <h2>{title}</h2>
            <div className="pp-stars">
              {[0, 1, 2].map((i) => (
                <span key={i} className={"pp-star" + (i < stars ? " on" : "")}>★</span>
              ))}
            </div>
            <p>{correct}/{total} correctas · 正确</p>
            <div className="pp-end-btns">
              <button className="pp-btn" onClick={() => { setResults([]); setIndex(0); setPhase("idle"); setHeard(""); setEnded(false); }}>
                <RotateCcwIcon size={18} /> Practicar otra vez · 再练一次
              </button>
              <button className="pp-btn ghost" onClick={onClose}>Volver · 返回</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!step) return null;

  return (
    <div className="pp-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="pp-card" onClick={(e) => e.stopPropagation()}>
        <div className="pp-top">
          <button className="pp-close" aria-label="Cerrar" onClick={onClose}><XIcon /></button>
          <div className="pp-bar"><i className="pp-bar-fill" style={{ width: pct + "%" }} /></div>
          <span className="pp-count">{index + 1}/{total}</span>
        </div>

        <div className="pp-kind">{step.label}</div>
        <div className={"pp-target " + step.kind}>{step.es}</div>
        <div className="pp-zh">{step.zh}</div>

        <div className="pp-listen">
          <button className="pp-btn-sound" onClick={() => speak(step.es, 0.85)}><Volume2Icon size={18} /> Escuchar · 听</button>
          <button className="pp-btn-sound slow" onClick={() => speak(step.es, 0.55)}><Volume1Icon size={18} /> Lento · 慢速</button>
        </div>

        {mode === "speech" ? (
          <div className="pp-speech">
            <button className={"pp-mic" + (phase === "listening" ? " listening" : "")} aria-label="Hablar" onClick={onMic}>
              <MicIcon size={38} />
            </button>
            <div className="pp-mic-hint">
              {phase === "listening" ? "Te escucho… · 正在听…" : "Pulsa y di la palabra · 点击并说出来"}
            </div>
            {phase === "listening" && (
              <div className="pp-wave"><i /><i /><i /><i /><i /></div>
            )}
          </div>
        ) : (
          <div className="pp-self">
            <p className="pp-note">El reconocimiento de voz no está disponible: grábate y compara · 语音识别不可用：录音后自己对比</p>
            {recording ? (
              <button className="pp-btn" onClick={stopRecording}><SquareIcon size={18} /> Parar · 停止</button>
            ) : (
              <button className="pp-btn" onClick={startRecording}><MicIcon size={18} /> Grabar · 录音</button>
            )}
            {audioUrl && !recording && (
              <button className="pp-btn ghost" onClick={playRecording}><PlayIcon size={18} /> Escuchar mi voz · 听我的录音</button>
            )}
            <button className="pp-btn" onClick={() => { record(index, true); setPhase("ok"); }}>
              <CheckIcon size={18} /> Lo dije bien · 我说对了
            </button>
            <button className="pp-btn ghost" onClick={() => { setPhase("self"); setHeard(""); }}>
              <RotateCcwIcon size={18} /> Repetir · 再试
            </button>
          </div>
        )}

        {phase === "ok" && (
          <div className="pp-foot ok">
            <div>
              <strong>¡Muy bien! · 太棒了！</strong>
              {heard ? <div className="pp-heard">Te he oído: «{heard}» · 我听到</div> : null}
            </div>
            <button className="pp-continue" onClick={goNext}>Continuar · 继续 <ArrowRightIcon size={18} /></button>
          </div>
        )}
        {phase === "bad" && (
          <div className="pp-foot bad">
            <div>
              <strong>Casi… inténtalo otra vez · 差一点，再试一次</strong>
              {heard ? <div className="pp-heard">Te he oído: «{heard}» · 我听到</div> : null}
            </div>
            <div className="pp-foot-btns">
              <button className="pp-retry" onClick={retry}><RotateCcwIcon size={18} /> Repetir · 再试</button>
              <button className="pp-skip" onClick={goNext}>Saltar · 跳过</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
