import * as React from "react";
import { MicIcon, SendIcon, Volume2Icon, RotateCcwIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { deepseekFetch } from "../lib/deepseekClient.js";
import { addXp } from "../lib/gamification.js";

const LEVELS = ["A1", "A2", "B1", "B2"];
const TOPICS = [
  ["☕", "En un café", "在咖啡馆", "Vamos a practicar: yo soy el camarero de un café en Madrid y tú eres el cliente. Empieza tú."],
  ["🎓", "Examen oral DELE", "DELE口语", "Hazme una simulación de la prueba oral del DELE de mi nivel: preséntame la tarea 1 y hazme preguntas una a una."],
  ["⚖️", "Ser y estar", "ser和estar", "Explícame la diferencia entre ser y estar con ejemplos muy fáciles y luego ponme 3 frases para practicar."],
  ["✈️", "De viaje", "旅行", "Practiquemos una conversación en el aeropuerto: tú eres el empleado y yo el viajero."],
  ["🗣️", "Corrige mi frase", "改错", "Quiero que corrijas mis frases. Te escribiré una y me explicas los errores."],
  ["🏠", "Hablar de mí", "自我介绍", "Hazme preguntas sencillas sobre mí (familia, trabajo, aficiones) para practicar."],
];

const systemPrompt = (level) => `Eres "Rey Mono", tutor de español simpático y paciente de la app AI Español, para estudiantes CHINOS que preparan el DELE. Nivel del alumno: ${level}.
Reglas:
- Habla en español adaptado EXACTAMENTE al nivel ${level} (A1: frases muy cortas y vocabulario básico).
- Respuestas breves: máximo 3-4 frases. Termina SIEMPRE con una pregunta para que el alumno siga hablando.
- Si el alumno comete errores, empieza con una línea "✏️ Corrección: <frase corregida>" y una explicación muy breve EN CHINO entre paréntesis. Si no hay errores, felicítale brevemente.
- Si el alumno escribe en chino, entiéndelo, dale la frase en español y anímale a repetirla.
- Nunca des respuestas largas ni listas extensas. Sé cálido y usa algún emoji ocasionalmente.`;

// Voz del tutor en español (se omiten los fragmentos en chino)
function speakEs(text, onStart, onEnd) {
  try {
    const clean = text.replace(/[㐀-鿿　-〿＀-￯（）]+/g, " ").replace(/[✏️*_#]/g, "").trim();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "es-ES";
    u.rate = 0.95;
    const v = speechSynthesis.getVoices().find((x) => x.lang?.startsWith("es"));
    if (v) u.voice = v;
    u.onstart = onStart;
    u.onend = onEnd;
    u.onerror = onEnd;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    onEnd?.();
  }
}

export default function TutorIAPage() {
  const [level, setLevel] = React.useState(() => localStorage.getItem("ai-espanol:tutor-level") || "A1");
  const [msgs, setMsgs] = React.useState([{ role: "assistant", content: "¡Hola! Soy Rey Mono 🐵. ¿De qué quieres hablar hoy? 你好！我是你的西语老师，今天想聊什么？" }]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [talking, setTalking] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const videoRef = React.useRef(null);
  const endRef = React.useRef(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (talking || busy) v.play().catch(() => {});
    else v.pause();
  }, [talking, busy]);
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs]);
  React.useEffect(() => () => speechSynthesis?.cancel?.(), []);

  const send = async (text) => {
    const t = String(text || "").trim();
    if (!t || busy) return;
    const next = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await deepseekFetch("", {
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "system", content: systemPrompt(level) }, ...next.slice(-10)], temperature: 0.7, max_tokens: 400 }),
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content?.trim() || "Perdona, no te he entendido. ¿Puedes repetirlo? 请再说一遍。";
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
      addXp(2);
      speakEs(reply, () => setTalking(true), () => setTalking(false));
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Ahora mismo no puedo conectar. Inténtalo de nuevo en un momento. 网络连接失败，请稍后再试。" }]);
    } finally {
      setBusy(false);
    }
  };

  const listen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Tu navegador no permite dictado por voz. Escribe tu mensaje. 你的浏览器不支持语音输入。");
    const r = new SR();
    r.lang = "es-ES";
    r.interimResults = false;
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onresult = (e) => send(e.results[0][0].transcript);
    r.start();
  };

  return (
    <LightShell>
      <div className="tutor">
        <aside className="tutor-stage">
          <div className={`tutor-avatar ${talking ? "talking" : ""} ${busy ? "thinking" : ""} ${listening ? "listening" : ""}`}>
            <video ref={videoRef} src="./mascota-reymono.mp4" poster="./mono-full.jpg" muted loop playsInline />
            <span className="tutor-ring" />
          </div>
          <div className="tutor-status">{listening ? "🎤 Te escucho… 我在听" : busy ? "🤔 Pensando… 思考中" : talking ? "🗣️ Hablando… 说话中" : "😊 Tu turno · 轮到你了"}</div>
          <div className="tutor-levels">
            {LEVELS.map((l) => (
              <button
                key={l}
                className={`ui-chip ${level === l ? "is-on" : ""}`}
                onClick={() => {
                  setLevel(l);
                  try {
                    localStorage.setItem("ai-espanol:tutor-level", l);
                  } catch {}
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="tutor-topics">
            {TOPICS.map(([e, es, zh, prompt]) => (
              <button key={es} className="tutor-topic" onClick={() => send(prompt)} disabled={busy}>
                <Emoji3D emoji={e} size={30} />
                <span>
                  {es}
                  <small>{zh}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>
        <section className="tutor-chat">
          <div className="tutor-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`tutor-msg ${m.role}`}>
                {m.role === "assistant" && <img src="./mono-face.png" alt="" className="mono-logo" style={{ width: 38, height: 38 }} />}
                <div className="tutor-bubble">
                  {m.content.split("\n").map((line, k) => (
                    <p key={k} className={line.startsWith("✏️") ? "fix" : ""}>
                      {line}
                    </p>
                  ))}
                  {m.role === "assistant" && (
                    <button className="tutor-replay" onClick={() => speakEs(m.content, () => setTalking(true), () => setTalking(false))} aria-label="Escuchar">
                      <Volume2Icon size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="tutor-msg assistant">
                <img src="./mono-face.png" alt="" className="mono-logo" style={{ width: 38, height: 38 }} />
                <div className="tutor-bubble typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form
            className="tutor-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <button type="button" className={`tutor-mic ${listening ? "on" : ""}`} onClick={listen} aria-label="Hablar">
              <MicIcon size={22} />
            </button>
            <input className="ui-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe en español (o en chino) · 用西语或中文输入" />
            <button className="btn3d tutor-send" disabled={!input.trim() || busy} aria-label="Enviar">
              <SendIcon size={20} />
            </button>
            <button type="button" className="tutor-mic" title="Nueva conversación" onClick={() => setMsgs(msgs.slice(0, 1))} aria-label="Reiniciar">
              <RotateCcwIcon size={18} />
            </button>
          </form>
        </section>
      </div>
    </LightShell>
  );
}
