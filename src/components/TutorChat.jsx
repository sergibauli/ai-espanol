import { Trash2Icon, XIcon, Volume2Icon, MicIcon, SendIcon, RefreshCwIcon, WifiOffIcon, HourglassIcon } from "lucide-react";
import * as React from "react";
import {
  getCachedAnswer,
  speakSpanish,
  buildTutorSystemPrompt,
  buildTutorUserMessage,
  historyWindow,
  cacheAnswer,
} from "../lib/aiTutor.js";
import { deepseekFetch, usoConversacion } from "../lib/deepseekClient.js";
import { CuotaIA } from "./ui/CuotaIA.jsx";

// Retrato del Rey Mono: el vídeo solo se descarga mientras habla; en reposo basta su cara
function TutorAvatar({ size, talking }) {
  return (
    <span className={`tp-chat-avatar ${talking ? "habla" : ""}`} style={{ width: size, height: size }} aria-hidden="true">
      {talking ? <video src="./mascota-reymono.mp4" autoPlay loop muted playsInline /> : <img src="./mono-face.webp" alt="" />}
    </span>
  );
}

const CHAT_HISTORY_KEY = "dele_chat_history_v1";
const TUTOR_GREETING = "¡Hola! 👋 Soy tu tutor de español. ¿Qué nivel DELE estás preparando? / 你好！我是你的西语导师，你在准备哪个级别？";
const saludo = () => ({ role: "assistant", content: TUTOR_GREETING, timestamp: Date.now() });

// Preguntas rápidas para la conversación vacía
const ATAJOS = [
  ["¿Ser o estar?", "ser 还是 estar？"],
  ["Corrige mi frase", "帮我改错"],
  ["Consejos para el DELE", "DELE备考建议"],
];

function loadChatHistory() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || "null");
    if (Array.isArray(guardado) && guardado.length > 0) return guardado.filter((m) => m.role !== "error");
  } catch {}
  return [saludo()];
}

function TutorChat() {
  const [abierto, setAbierto] = React.useState(false);
  const [mensajes, setMensajes] = React.useState(loadChatHistory);
  const [texto, setTexto] = React.useState("");
  const [pensando, setPensando] = React.useState(false);
  const [escuchando, setEscuchando] = React.useState(false);
  const listaRef = React.useRef(null);
  const entradaRef = React.useRef(null);
  const reconocimientoRef = React.useRef(null);

  React.useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(mensajes.filter((m) => m.role !== "error").slice(-50)));
    } catch {}
  }, [mensajes]);
  React.useEffect(() => {
    const lista = listaRef.current;
    if (lista) lista.scrollTo({ top: lista.scrollHeight, behavior: "smooth" });
  }, [mensajes, abierto, pensando]);
  React.useEffect(() => {
    if (!abierto) return;
    const t = setTimeout(() => entradaRef.current?.focus(), 300);
    const cerrarConEsc = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", cerrarConEsc);
    return () => (clearTimeout(t), window.removeEventListener("keydown", cerrarConEsc));
  }, [abierto]);

  // Pide la respuesta para la conversación dada (sus avisos de error no se envían)
  const pedir = async (conversacion, pregunta) => {
    setMensajes(conversacion);
    setPensando(true);
    const enCache = getCachedAnswer(pregunta);
    if (enCache) {
      setMensajes((actuales) => [...actuales, { role: "assistant", content: enCache, timestamp: Date.now() }]);
      speakSpanish(enCache);
      setPensando(false);
      return;
    }
    try {
      const res = await deepseekFetch("https://api.deepseek.com/v1/chat/completions", {
        uso: usoConversacion("tutor-chat"),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: buildTutorSystemPrompt() },
            ...historyWindow(conversacion.slice(0, -1)).map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: buildTutorUserMessage(pregunta) },
          ],
          temperature: 0.7,
          max_tokens: 900,
        }),
      });
      const datos = await res.json().catch(() => ({}));
      const respuesta = datos?.choices?.[0]?.message?.content;
      if (!res.ok || !respuesta) {
        const limite = res.status === 429 || datos?.error?.code === "limite_semanal";
        setMensajes((actuales) => [...actuales, { role: "error", tipo: limite ? "limite" : "fallo", timestamp: Date.now() }]);
      } else {
        setMensajes((actuales) => [...actuales, { role: "assistant", content: respuesta, timestamp: Date.now() }]);
        cacheAnswer(pregunta, respuesta);
        speakSpanish(respuesta);
      }
    } catch {
      setMensajes((actuales) => [...actuales, { role: "error", tipo: "red", timestamp: Date.now() }]);
    }
    setPensando(false);
  };

  const enviar = (forzado) => {
    const pregunta = (forzado ?? texto).trim();
    if (!pregunta || pensando) return;
    setTexto("");
    pedir([...mensajes.filter((m) => m.role !== "error"), { role: "user", content: pregunta, timestamp: Date.now() }], pregunta);
  };
  const reintentar = () => {
    if (pensando) return;
    const conversacion = mensajes.filter((m) => m.role !== "error");
    const ultima = conversacion[conversacion.length - 1];
    if (ultima?.role === "user") pedir(conversacion, ultima.content);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };
  const dictar = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Tu navegador no soporta reconocimiento de voz / 浏览器不支持语音识别");
      return;
    }
    if (escuchando) {
      reconocimientoRef.current?.stop();
      setEscuchando(false);
      return;
    }
    const reconocimiento = new SR();
    reconocimiento.lang = "es-ES";
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;
    reconocimiento.onresult = (e) => {
      const dicho = e.results?.[0]?.[0]?.transcript || "";
      if (dicho) enviar(dicho);
    };
    reconocimiento.onend = () => setEscuchando(false);
    reconocimiento.onerror = () => setEscuchando(false);
    reconocimientoRef.current = reconocimiento;
    try {
      reconocimiento.start();
      setEscuchando(true);
    } catch {
      setEscuchando(false);
    }
  };
  const limpiar = () => {
    setMensajes([saludo()]);
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch {}
  };

  const vacia = mensajes.length === 1 && !pensando;
  return (
    <>
      {!abierto && (
        <button type="button" onClick={() => setAbierto(true)} className="tp-chat-fab gm-no-adapt" aria-label="Abrir el tutor IA · 打开AI导师" title="Tutor IA · AI导师">
          <span className="tp-chat-fab-onda" aria-hidden="true" />
          <TutorAvatar size={54} talking={pensando} />
          <span className="tp-chat-fab-sello" aria-hidden="true" translate="no">
            问
          </span>
        </button>
      )}
      {abierto && (
        <div className="tp-chat gm-no-adapt" role="dialog" aria-modal="false" aria-label="Tutor IA · AI导师">
          <header className="tp-chat-cab">
            <TutorAvatar size={44} talking={pensando} />
            <div className="tp-chat-cab-txt">
              <h3>Tutor IA · Rey Mono</h3>
              <p>{pensando ? "Escribiendo… · 正在输入" : "Pregúntame lo que quieras · 有问题尽管问"}</p>
            </div>
            <button type="button" onClick={limpiar} className="tp-chat-icono" title="Nueva conversación · 新对话" aria-label="Nueva conversación · 新对话">
              <Trash2Icon size={18} />
            </button>
            <button type="button" onClick={() => setAbierto(false)} className="tp-chat-icono" title="Cerrar · 关闭" aria-label="Cerrar · 关闭">
              <XIcon size={20} />
            </button>
          </header>
          <div className="tp-chat-cuota">
            <CuotaIA />
          </div>
          <div className="tp-chat-lista" ref={listaRef} aria-live="polite">
            {mensajes.map((m, indice) =>
              m.role === "error" ? (
                <div key={indice} className={`tp-chat-error ${m.tipo === "limite" ? "limite" : ""}`} role="alert">
                  {m.tipo === "limite" ? <HourglassIcon size={18} aria-hidden="true" /> : <WifiOffIcon size={18} aria-hidden="true" />}
                  <div>
                    <b>{m.tipo === "limite" ? "Consultas de esta semana agotadas" : m.tipo === "red" ? "Sin conexión" : "No he podido contestar"}</b>
                    <span>{m.tipo === "limite" ? "本周AI次数已用完，周一更新" : m.tipo === "red" ? "网络连接失败" : "AI暂时无法回答"}</span>
                    {m.tipo !== "limite" && (
                      <button type="button" onClick={reintentar}>
                        <RefreshCwIcon size={14} aria-hidden="true" /> Reintentar · 重试
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div key={indice} className={`tp-chat-msg ${m.role === "user" ? "yo" : "ia"}`}>
                  {m.role !== "user" && <img src="./mono-face.webp" alt="" className="tp-chat-cara" />}
                  <div className="tp-chat-burbuja">
                    {m.content}
                    {m.role === "assistant" && (
                      <button type="button" onClick={() => speakSpanish(m.content)} className="tp-chat-oir" title="Escuchar · 朗读">
                        <Volume2Icon size={13} aria-hidden="true" /> Escuchar · 朗读
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
            {vacia && (
              <div className="tp-chat-atajos">
                {ATAJOS.map(([es, zh]) => (
                  <button type="button" key={es} onClick={() => enviar(es)}>
                    {es}
                    <small>{zh}</small>
                  </button>
                ))}
              </div>
            )}
            {pensando && (
              <div className="tp-chat-msg ia">
                <img src="./mono-face.webp" alt="" className="tp-chat-cara" />
                <div className="tp-chat-burbuja tp-chat-puntos" role="status" aria-label="Escribiendo · 正在输入">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>
          <div className="tp-chat-pie">
            <input
              ref={entradaRef}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Escribe en español o 中文…"
              aria-label="Tu pregunta · 你的问题"
              disabled={pensando}
            />
            <button type="button" onClick={dictar} className={`tp-chat-mic ${escuchando ? "on" : ""}`} title="Hablar · 语音输入" aria-label="Hablar · 语音输入" aria-pressed={escuchando}>
              <MicIcon size={18} />
            </button>
            <button type="button" onClick={() => enviar()} disabled={!texto.trim() || pensando} className="tp-chat-enviar" aria-label="Enviar · 发送">
              <SendIcon size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export { TutorChat };
