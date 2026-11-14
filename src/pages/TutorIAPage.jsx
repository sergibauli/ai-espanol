import * as React from "react";
import { MicIcon, SendIcon, Volume2Icon, RotateCcwIcon, WifiOffIcon, HourglassIcon, RefreshCwIcon, MessageCircleIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { deepseekFetch, usoConversacion } from "../lib/deepseekClient.js";
import { CuotaIA, useCuotaIA, diasParaRenovar } from "../components/ui/CuotaIA.jsx";
import { historyWindow } from "../lib/historial.js";
import { addXp } from "../lib/gamification.js";
import { CintaTitulo, InsigniaNivel } from "../../packages/imperial/src/index.js";
import "../styles/v16-maquetas.css";

const LEVELS = ["A1", "A2", "B1", "B2"];
const TOPICS = [
  ["☕", "En un café", "在咖啡馆", "Vamos a practicar: yo soy el camarero de un café en Madrid y tú eres el cliente. Empieza tú."],
  ["🎓", "Examen oral DELE", "DELE口语", "Hazme una simulación de la prueba oral del DELE de mi nivel: preséntame la tarea 1 y hazme preguntas una a una."],
  ["⚖️", "Ser y estar", "ser和estar", "Explícame la diferencia entre ser y estar con ejemplos muy fáciles y luego ponme 3 frases para practicar."],
  ["✈️", "De viaje", "旅行", "Practiquemos una conversación en el aeropuerto: tú eres el empleado y yo el viajero."],
  ["🗣️", "Corrige mi frase", "改错", "Quiero que corrijas mis frases. Te escribiré una y me explicas los errores."],
  ["🏠", "Hablar de mí", "自我介绍", "Hazme preguntas sencillas sobre mí (familia, trabajo, aficiones) para practicar."],
];

// Frases para empezar cuando la conversación está vacía
const SUGERENCIAS = [
  ["Hola, me llamo Li y soy de Shanghái.", "你好，我叫李，我来自上海。"],
  ["¿Cómo se dice «我很累» en español?", "用西语怎么说「我很累」？"],
  ["Corrige: «Yo soy cansado hoy».", "请改错"],
  ["¿Qué diferencia hay entre «por» y «para»?", "por 和 para 有什么区别？"],
];

const SALUDO = { role: "assistant", content: "¡Hola! Soy Rey Mono 🐵. ¿De qué quieres hablar hoy? 你好！我是你的西语老师，今天想聊什么？" };

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
  const [msgs, setMsgs] = React.useState([SALUDO]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [talking, setTalking] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const videoRef = React.useRef(null);
  const listaRef = React.useRef(null);
  const cuota = useCuotaIA();

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // v16: el Rey Mono se mueve siempre (maqueta animada); con reduced-motion solo cuando habla o piensa
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!quieto || talking || busy) video.play().catch(() => {});
    else video.pause();
  }, [talking, busy]);
  // Baja al último mensaje desplazando solo la lista (scrollIntoView movía toda la página en el móvil)
  React.useEffect(() => {
    const lista = listaRef.current;
    if (lista && msgs.length > 1) lista.scrollTo({ top: lista.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);
  React.useEffect(() => () => speechSynthesis?.cancel?.(), []);

  // Pide la respuesta para una conversación (sin los avisos de error, que no se envían a la IA)
  const pedir = async (conversacion) => {
    setMsgs(conversacion);
    setBusy(true);
    try {
      const res = await deepseekFetch("", {
        uso: usoConversacion("tutor-ia"),
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "system", content: systemPrompt(level) }, ...historyWindow(conversacion)], temperature: 0.7, max_tokens: 400 }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (!res.ok || !reply) {
        const limite = res.status === 429 || data?.error?.code === "limite_semanal";
        setMsgs((actuales) => [...actuales, { role: "error", tipo: limite ? "limite" : "fallo" }]);
        return;
      }
      setMsgs((actuales) => [...actuales, { role: "assistant", content: reply }]);
      addXp(2);
      speakEs(reply, () => setTalking(true), () => setTalking(false));
    } catch {
      setMsgs((actuales) => [...actuales, { role: "error", tipo: "red" }]);
    } finally {
      setBusy(false);
    }
  };

  const send = (text) => {
    const texto = String(text || "").trim();
    if (!texto || busy) return;
    setInput("");
    pedir([...msgs.filter((m) => m.role !== "error"), { role: "user", content: texto }]);
  };
  const reintentar = () => !busy && pedir(msgs.filter((m) => m.role !== "error"));

  const listen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Tu navegador no permite dictado por voz. Escribe tu mensaje. 你的浏览器不支持语音输入。");
    const reconocimiento = new SR();
    reconocimiento.lang = "es-ES";
    reconocimiento.interimResults = false;
    reconocimiento.onstart = () => setListening(true);
    reconocimiento.onend = () => setListening(false);
    reconocimiento.onresult = (evento) => send(evento.results[0][0].transcript);
    reconocimiento.start();
  };

  const vacia = msgs.length === 1 && !busy;
  const agotada = cuota.restantes === 0;
  const estado = listening ? ["escucha", "Te escucho… · 我在听"] : busy ? ["piensa", "Pensando… · 思考中"] : talking ? ["habla", "Hablando… · 说话中"] : ["turno", "Tu turno · 轮到你了"];
  return (
    <LightShell>
      <div className="tutor tutor-imp tp-tutor v16-tutor">
        <aside className="tutor-stage">
          <div className={`tutor-avatar ${talking ? "talking" : ""} ${busy ? "thinking" : ""} ${listening ? "listening" : ""}`}>
            <span className="tutor-halo" aria-hidden="true" />
            <video ref={videoRef} src="./video/tutor-mono.mp4" poster="./video/tutor-mono.jpg" muted loop playsInline autoPlay aria-hidden="true" />
            <span className="tutor-ring" />
          </div>
          <div className="tp-tutor-id">
            <div className="tutor-nombre">
              <b>Rey Mono</b>
              <small>AI老师 · tutor de español</small>
            </div>
            <div className={`tutor-status ${estado[0]}`} role="status" aria-live="polite">
              <i aria-hidden="true" />
              {estado[1]}
            </div>
          </div>
          <CuotaIA variante="panel" className="tp-tutor-cuota" />
          <div className="tp-tutor-bloque">
            <span className="tp-tutor-rotulo">Tu nivel · 你的级别</span>
            <div className="tutor-levels" role="group" aria-label="Nivel · 级别">
              {LEVELS.map((nivel) => (
                <button
                  key={nivel}
                  className={level === nivel ? "on" : ""}
                  aria-pressed={level === nivel}
                  aria-label={`Nivel ${nivel}`}
                  onClick={() => {
                    setLevel(nivel);
                    try {
                      localStorage.setItem("ai-espanol:tutor-level", nivel);
                    } catch {}
                  }}
                >
                  <InsigniaNivel nivel={nivel} tamano="sm" />
                </button>
              ))}
            </div>
          </div>
          <div className="tp-tutor-bloque tp-tutor-temas">
            <span className="tp-tutor-rotulo">Practica un tema · 选择话题</span>
            <div className="tutor-topics">
              {TOPICS.map(([emoji, es, zh, prompt]) => (
                <button key={es} className="tutor-topic" onClick={() => send(prompt)} disabled={busy}>
                  <span className="tutor-topic-ic">
                    <Emoji3D emoji={emoji} size={26} />
                  </span>
                  <span>
                    {es}
                    <small>{zh}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
        <section className="tutor-chat" aria-label="Conversación con Rey Mono · 对话">
          <header className="tutor-head">
            <CintaTitulo texto="Tutor IA" zh="AI 西语老师" tono="laca" />
            <span className="tutor-head-sub">
              Habla o escribe: te contesto a tu nivel <InsigniaNivel nivel={level} tamano="sm" />
            </span>
          </header>
          <div className="tutor-msgs" aria-live="polite" ref={listaRef}>
            <div className="tp-dia" aria-hidden="true">
              <span>Hoy · 今天</span>
            </div>
            {msgs.map((m, indice) =>
              m.role === "error" ? (
                <ErrorTutor key={indice} tipo={m.tipo} dias={diasParaRenovar(cuota)} onReintentar={reintentar} />
              ) : (
                <div key={indice} className={`tutor-msg ${m.role}`}>
                  {m.role === "assistant" && <img src="./mono-face.webp" alt="" className="tutor-cara" />}
                  <div className="tutor-bubble">
                    {m.role === "assistant" && <span className="tutor-quien">Rey Mono</span>}
                    {m.content.split("\n").map((line, k) => (
                      <p key={k} className={line.startsWith("✏️") ? "fix" : ""}>
                        {line}
                      </p>
                    ))}
                    {m.role === "assistant" && (
                      <button className="tutor-replay" onClick={() => speakEs(m.content, () => setTalking(true), () => setTalking(false))} aria-label="Escuchar · 朗读">
                        <Volume2Icon size={15} />
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
            {vacia && (
              <div className="tp-vacio">
                <span className="tp-vacio-sello" aria-hidden="true" translate="no">
                  <i>开</i>
                  <i>口</i>
                </span>
                <p className="tp-vacio-tit">
                  <MessageCircleIcon size={17} aria-hidden="true" /> Empieza con una frase · 用一句话开始
                </p>
                <div className="tp-sugerencias">
                  {SUGERENCIAS.map(([es, zh]) => (
                    <button key={es} className="tp-sugerencia" onClick={() => send(es)} disabled={agotada}>
                      <span>{es}</span>
                      <small>{zh}</small>
                    </button>
                  ))}
                </div>
                {agotada && <p className="tp-vacio-aviso">Esta semana ya no quedan consultas de IA · 本周AI次数已用完</p>}
              </div>
            )}
            {busy && (
              <div className="tutor-msg assistant tp-escribiendo">
                <img src="./mono-face.webp" alt="" className="tutor-cara" />
                <div className="tutor-bubble typing" role="status">
                  <span className="tp-escribiendo-txt">Rey Mono está escribiendo · 正在输入</span>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>
          <form
            className="tutor-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <button type="button" className={`tutor-mic ${listening ? "on" : ""}`} onClick={listen} aria-label="Hablar · 语音输入" aria-pressed={listening}>
              <MicIcon size={22} />
            </button>
            <input className="ui-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe en español (o en chino) · 用西语或中文输入" aria-label="Tu mensaje · 你的消息" />
            <button className="tutor-send" disabled={!input.trim() || busy} aria-label="Enviar · 发送">
              <SendIcon size={20} />
            </button>
            <button
              type="button"
              className="tutor-mic tutor-reset"
              title="Nueva conversación · 新对话"
              onClick={() => (sessionStorage.removeItem("ai-espanol:conv-tutor-ia"), setMsgs([SALUDO]))}
              aria-label="Nueva conversación · 新对话"
            >
              <RotateCcwIcon size={18} />
            </button>
          </form>
        </section>
      </div>
    </LightShell>
  );
}

// Aviso dentro del chat cuando la IA no contesta: sin conexión, fallo del servicio o cuota semanal agotada
function ErrorTutor({ tipo, dias, onReintentar }) {
  if (tipo === "limite") {
    return (
      <div className="tp-aviso limite" role="alert">
        <span className="tp-aviso-ic" aria-hidden="true">
          <HourglassIcon size={22} />
        </span>
        <div>
          <b>Has usado tus 5 consultas de IA de esta semana</b>
          <span className="tp-aviso-zh">本周5次AI已用完</span>
          <p>
            Se renuevan el lunes (en {dias} día{dias > 1 ? "s" : ""}). Mientras, repasa con las unidades y los juegos. · 周一更新（{dias}天后）。在此之前可以用单元和游戏复习。
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="tp-aviso" role="alert">
      <span className="tp-aviso-ic" aria-hidden="true">
        <WifiOffIcon size={22} />
      </span>
      <div>
        <b>{tipo === "red" ? "No hay conexión con Rey Mono" : "Rey Mono no ha podido contestar"}</b>
        <span className="tp-aviso-zh">{tipo === "red" ? "网络连接失败" : "AI暂时无法回答"}</span>
        <p>Comprueba tu conexión e inténtalo otra vez. No se gasta otra consulta. · 请检查网络后重试，不会多扣次数。</p>
        <button type="button" className="tp-aviso-btn" onClick={onReintentar}>
          <RefreshCwIcon size={16} aria-hidden="true" /> Reintentar · 重试
        </button>
      </div>
    </div>
  );
}
