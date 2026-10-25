import * as React from "react";
import { useSearchParams } from "react-router";
import { MicIcon, SquareIcon, PlayIcon, Volume2Icon, ClockIcon, RotateCcwIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { speak, speakIA } from "../components/lesson/fx.js";
import { deepseekFetch, isAIAvailable } from "../lib/deepseekClient.js";
import { u as useCorrection, C as CorrectionCard } from "../components/CorrectionDisplay.jsx";

const TASKS = {
  A1: {
    tarea: "Presentación personal y exposición de un tema",
    zh: "自我介绍和话题陈述",
    prep: 600,
    habla: 120,
    preguntas: 3,
    temas: ["Mi familia", "Mi casa", "Mi día a día", "Mi ciudad", "Mis comidas favoritas"],
  },
  A2: {
    tarea: "Monólogo sobre un tema y conversación",
    zh: "话题独白和对话",
    prep: 720,
    habla: 150,
    preguntas: 3,
    temas: ["Mis últimas vacaciones", "Mi trabajo o mis estudios", "Mis aficiones", "Un amigo importante", "Mi barrio"],
  },
  B1: {
    tarea: "Presentación de un tema y conversación",
    zh: "话题陈述和对话",
    prep: 900,
    habla: 180,
    preguntas: 4,
    temas: ["Las redes sociales", "Aprender idiomas", "Vivir en el extranjero", "El deporte y la salud", "El trabajo del futuro"],
  },
  B2: {
    tarea: "Valoración de propuestas y debate",
    zh: "评价建议和辩论",
    prep: 1200,
    habla: 240,
    preguntas: 4,
    temas: ["Cómo reducir el tráfico en las ciudades", "Mejorar la educación", "El turismo responsable", "La tecnología en la escuela", "Trabajar desde casa"],
  },
};

const PUNTOS_FALLBACK = [
  "Presenta el tema",
  "Da ejemplos de tu experiencia",
  "Explica ventajas e inconvenientes",
  "Termina con tu opinión",
];

const PREGUNTAS_FALLBACK = [
  "¿Por qué has elegido este tema?",
  "¿Puedes dar otro ejemplo?",
  "¿Qué opinas tú personalmente?",
  "¿Cómo era antes y cómo es ahora?",
];

const FASES = ["elegir", "preparar", "monologo", "conversacion", "corregir"];

// formatea segundos como mm:ss
function fmt(seg) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ExaminadorOralPage() {
  const { correctText, isCorrecting } = useCorrection();
  // Tarea que llega desde un examen o una unidad (?nivel=&tema=&tarea=&puntos=[…])
  const [params] = useSearchParams();
  const pNivel = TASKS[params.get("nivel")] ? params.get("nivel") : null;
  const pPuntos = (() => {
    try {
      return JSON.parse(params.get("puntos") || "[]").filter(Boolean).slice(0, 6);
    } catch {
      return [];
    }
  })();
  const tareaExterna = params.get("tarea") || "";
  const [fase, setFase] = React.useState("elegir");
  const [nivel, setNivel] = React.useState(pNivel || "B1");
  const [tema, setTema] = React.useState(params.get("tema") || TASKS[pNivel || "B1"].temas[0]);
  const [rapido, setRapido] = React.useState(true);
  const [puntos, setPuntos] = React.useState([]);
  const [notas, setNotas] = React.useState("");
  const [segundos, setSegundos] = React.useState(0);
  const [grabando, setGrabando] = React.useState(false);
  const [transcripcion, setTranscripcion] = React.useState("");
  const [dialogo, setDialogo] = React.useState([]);
  const [preguntaActual, setPreguntaActual] = React.useState("");
  const [respuesta, setRespuesta] = React.useState("");
  const [idxPregunta, setIdxPregunta] = React.useState(0);
  const [correccion, setCorreccion] = React.useState(null);
  const [limitReached, setLimitReached] = React.useState(false);
  const [audioMonologo, setAudioMonologo] = React.useState(null);
  const [audiosRespuestas, setAudiosRespuestas] = React.useState([]);
  const [recDisponible, setRecDisponible] = React.useState(true);

  const timerRef = React.useRef(null);
  const mediaRecRef = React.useRef(null);
  const chunksRef = React.useRef([]);
  const recRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const finalRef = React.useRef("");

  const task = TASKS[nivel];
  const prepTiempo = rapido ? 60 : task.prep;
  const hablaTiempo = rapido ? 90 : task.habla;

  // limpia intervalos, grabadora y reconocimiento
  const limpiar = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
      try { mediaRecRef.current.stop(); } catch { /* ignore */ }
    }
    mediaRecRef.current = null;
    chunksRef.current = [];
    if (recRef.current) {
      try { recRef.current.stop(); } catch { /* ignore */ }
      recRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setGrabando(false);
  }, []);

  React.useEffect(() => () => limpiar(), [limpiar]);

  // arranca reconocimiento de voz continuo si existe
  const iniciarReconocimiento = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    try {
      const rec = new SR();
      rec.lang = "es-ES";
      rec.interimResults = true;
      rec.continuous = true;
      finalRef.current = "";
      rec.onresult = (e) => {
        let final = finalRef.current;
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) final += r[0].transcript + " ";
          else interim += r[0].transcript;
        }
        finalRef.current = final;
        setTranscripcion((final + interim).trim());
      };
      rec.onerror = () => { /* silencioso */ };
      rec.start();
      recRef.current = rec;
    } catch { /* ignore */ }
  };

  // arranca grabación de audio
  const iniciarGrabacion = async (onDone) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setRecDisponible(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        if (onDone) onDone(url);
      };
      mr.start();
      mediaRecRef.current = mr;
      setGrabando(true);
      setRecDisponible(true);
    } catch {
      setRecDisponible(false);
      setGrabando(false);
    }
  };

  const detenerGrabacion = () => {
    if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
      try { mediaRecRef.current.stop(); } catch { /* ignore */ }
    }
    if (recRef.current) {
      try { recRef.current.stop(); } catch { /* ignore */ }
      recRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setGrabando(false);
  };

  // pide puntos guía a la IA (o usa fallback)
  const cargarPuntos = async () => {
    // Tarea que viene de un examen o de una unidad: se respetan sus puntos
    if (pPuntos.length && tema === params.get("tema")) {
      setPuntos(pPuntos.map((p) => ({ es: p, zh: "" })));
      return;
    }

    if (!isAIAvailable()) {
      setPuntos(PUNTOS_FALLBACK.map((p) => ({ es: p, zh: "" })));
      return;
    }
    try {
      const res = await deepseekFetch("", {
        body: JSON.stringify({
          messages: [
            { role: "system", content: "Devuelve SOLO JSON válido." },
            { role: "user", content: `Nivel ${nivel}, tema "${tema}". Da 4 puntos concretos (en español, cortos) que el candidato debe cubrir en un monólogo oral, con su traducción al chino. Formato: {"puntos":[{"es":"...","zh":"..."}]}` },
          ],
          temperature: 0.6,
          max_tokens: 400,
          response_format: { type: "json_object" },
        }),
      });
      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content || "{}";
      const parsed = JSON.parse(content);
      const arr = Array.isArray(parsed.puntos) ? parsed.puntos : [];
      if (arr.length >= 3) setPuntos(arr.slice(0, 4));
      else setPuntos(PUNTOS_FALLBACK.map((p) => ({ es: p, zh: "" })));
    } catch {
      setPuntos(PUNTOS_FALLBACK.map((p) => ({ es: p, zh: "" })));
    }
  };

  // inicia la prueba
  const empezar = async () => {
    setTranscripcion("");
    setDialogo([]);
    setIdxPregunta(0);
    setCorreccion(null);
    setAudioMonologo(null);
    setAudiosRespuestas([]);
    await cargarPuntos();
    setFase("preparar");
    setSegundos(prepTiempo);
    iniciarTimer(prepTiempo, () => setFase("monologo"));
  };

  const iniciarTimer = (total, onEnd) => {
    if (timerRef.current) clearInterval(timerRef.current);
    let t = total;
    setSegundos(t);
    timerRef.current = setInterval(() => {
      t -= 1;
      setSegundos(t);
      if (t <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        onEnd();
      }
    }, 1000);
  };

  // fase monologo
  React.useEffect(() => {
    if (fase === "monologo") {
      setSegundos(hablaTiempo);
      iniciarTimer(hablaTiempo, () => finalizarMonologo());
      iniciarGrabacion((url) => setAudioMonologo(url));
      iniciarReconocimiento();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase]);

  const finalizarMonologo = () => {
    detenerGrabacion();
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setFase("conversacion");
  };

  // fase conversacion: pide primera pregunta
  React.useEffect(() => {
    if (fase === "conversacion" && idxPregunta === 0 && dialogo.length === 0) {
      pedirPregunta(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase]);

  const pedirPregunta = async (i) => {
    setRespuesta("");
    setTranscripcion("");
    const baseFallback = PREGUNTAS_FALLBACK[i % PREGUNTAS_FALLBACK.length];
    let q = baseFallback;
    if (isAIAvailable()) {
      try {
        const res = await deepseekFetch("", {
          body: JSON.stringify({
            messages: [
              { role: "system", content: `Eres el entrevistador del examen DELE ${nivel}. Haz UNA pregunta breve y natural de seguimiento sobre lo que ha dicho el candidato, adecuada al nivel ${nivel}. Solo la pregunta.` },
              { role: "user", content: `Monólogo del candidato: ${transcripcion || "(sin texto)"}\nConversación previa: ${dialogo.map((d) => `E: ${d.q}\nC: ${d.a}`).join("\n") || "(ninguna)"}` },
            ],
            temperature: 0.7,
            max_tokens: 80,
          }),
        });
        const json = await res.json();
        const content = (json?.choices?.[0]?.message?.content || "").trim();
        if (content) q = content;
      } catch { /* fallback */ }
    }
    setPreguntaActual(q);
    speakIA(q);
  };

  const iniciarRespuesta = () => {
    finalRef.current = "";
    setTranscripcion("");
    iniciarGrabacion((url) => setAudiosRespuestas((a) => [...a, url]));
    iniciarReconocimiento();
  };

  const enviarRespuesta = () => {
    detenerGrabacion();
    const a = transcripcion.trim();
    setDialogo((d) => [...d, { q: preguntaActual, a }]);
    const siguiente = idxPregunta + 1;
    setIdxPregunta(siguiente);
    if (siguiente >= task.preguntas) {
      setFase("corregir");
    } else {
      setTimeout(() => pedirPregunta(siguiente), 400);
    }
  };

  // fase corregir
  React.useEffect(() => {
    if (fase === "corregir") {
      generarCorreccion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase]);

  const generarCorreccion = async () => {
    let texto = "MONÓLOGO:\n" + (transcripcion || "(sin grabación)") + "\n\nCONVERSACIÓN:\n";
    dialogo.forEach((d) => {
      texto += `Entrevistador: ${d.q}\nCandidato: ${d.a}\n`;
    });
    try {
      const r = await correctText(
        texto,
        "monologo",
        nivel,
        `Prueba oral DELE ${nivel}: ${tareaExterna || task.tarea}. Tema: ${tema}`,
        { nivel, puntosGuia: puntos.map((p) => p.es) }
      );
      if (r?.limitReached) setLimitReached(true);
      else if (r?.data) setCorreccion(r.data);
    } catch { /* ignore */ }
  };

  const reset = () => {
    limpiar();
    setFase("elegir");
    setTranscripcion("");
    setDialogo([]);
    setPreguntaActual("");
    setRespuesta("");
    setIdxPregunta(0);
    setCorreccion(null);
    setLimitReached(false);
    setAudioMonologo(null);
    setAudiosRespuestas([]);
    setPuntos([]);
    setNotas("");
  };

  const pasoActual = FASES.indexOf(fase);

  return (
    <LightShell>
      <div className="ui-page">
        <SectionHero
          eyebrow="Examinador oral IA · AI口语考官"
          title="Examen oral DELE"
          titleZh="AI模拟DELE口语考试"
          description="Practica la expresión e interacción orales del DELE con un examinador de IA: preparación cronometrada, monólogo, conversación y corrección."
          descriptionZh="用AI考官练习DELE口语表达与互动：限时准备、独白、对话和批改。"
        />
        <div className="oe-steps">
          {FASES.map((f, i) => (
            <span key={f} className={"oe-step" + (i <= pasoActual ? " on" : "")} />
          ))}
        </div>

        <div className="oe-card">
          {fase === "elegir" && (
            <div className="oe-elegir">
              <h3>Elige tu nivel · 选择你的级别</h3>
              <div className="oe-levels">
                {Object.keys(TASKS).map((n) => (
                  <button
                    key={n}
                    className={"oe-level" + (nivel === n ? " on" : "")}
                    onClick={() => { setNivel(n); setTema(TASKS[n].temas[0]); }}
                  >{n}</button>
                ))}
              </div>
              <p className="oe-task"><strong>{tareaExterna || task.tarea}</strong> · {task.zh}</p>
              <h4>Tema · 话题</h4>
              <div className="oe-temas">
                {task.temas.map((t) => (
                  <button key={t} className={"oe-tema" + (tema === t ? " on" : "")} onClick={() => setTema(t)}>{t}</button>
                ))}
              </div>
              <label className="oe-toggle">
                <input type="checkbox" checked={rapido} onChange={(e) => setRapido(e.target.checked)} />
                Modo rápido · 快速模式
              </label>
              <button className="oe-start" onClick={empezar}><PlayIcon size={16} /> Empezar · 开始</button>
            </div>
          )}

          {fase === "preparar" && (
            <div className="oe-preparar">
              <h3><ClockIcon size={16} /> Preparación · 准备阶段</h3>
              <div className="oe-timer">{fmt(segundos)}</div>
              <p><strong>{tema}</strong></p>
              <ul className="oe-puntos">
                {puntos.map((p, i) => (
                  <li key={i}>{p.es} {p.zh && <span className="oe-zh">· {p.zh}</span>}</li>
                ))}
              </ul>
              <textarea className="oe-notas" placeholder="Notas · 笔记" value={notas} onChange={(e) => setNotas(e.target.value)} />
              <button className="oe-start" onClick={() => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } setFase("monologo"); }}>
                <PlayIcon size={16} /> Empezar a hablar · 开始说
              </button>
            </div>
          )}

          {fase === "monologo" && (
            <div className="oe-monologo">
              <h3><ClockIcon size={16} /> Monólogo · 独白</h3>
              <div className="oe-timer">{fmt(segundos)}</div>
              <p><strong>{tema}</strong></p>
              <button
                className={"oe-mic" + (grabando ? " rec" : "")}
                onClick={grabando ? detenerGrabacion : () => iniciarGrabacion((url) => setAudioMonologo(url))}
              >
                {grabando ? <SquareIcon size={28} /> : <MicIcon size={28} />}
              </button>
              {!recDisponible && (
                <p className="oe-note">Si el reconocimiento de voz no funciona, escribe lo que has dicho · 如果语音识别不可用，请输入你说的内容</p>
              )}
              <textarea className="oe-transcript" value={transcripcion} onChange={(e) => setTranscripcion(e.target.value)} placeholder="Tu discurso · 你的发言" />
              <button className="oe-start" onClick={finalizarMonologo}>Terminar · 结束</button>
            </div>
          )}

          {fase === "conversacion" && (
            <div className="oe-conversacion">
              <h3>Conversación · 对话 ({idxPregunta + 1}/{task.preguntas})</h3>
              {preguntaActual && (
                <div className="oe-q-row">
                  <img className="oe-avatar" src="./mono/serio.png" alt="examinador" />
                  <div className="oe-q">
                    <span>{preguntaActual}</span>
                    <button className="oe-replay" onClick={() => speakIA(preguntaActual)}><Volume2Icon size={14} /></button>
                  </div>
                </div>
              )}
              <button
                className={"oe-mic" + (grabando ? " rec" : "")}
                onClick={grabando ? detenerGrabacion : iniciarRespuesta}
              >
                {grabando ? <SquareIcon size={24} /> : <MicIcon size={24} />}
              </button>
              <textarea className="oe-a" value={transcripcion} onChange={(e) => setTranscripcion(e.target.value)} placeholder="Tu respuesta · 你的回答" />
              <button className="oe-start" onClick={enviarRespuesta} disabled={!transcripcion.trim()}>
                Responder · 回答
              </button>
            </div>
          )}

          {fase === "corregir" && (
            <div className="oe-corregir">
              <h3>Corrección · 批改</h3>
              {isCorrecting && !correccion && <p>Corrigiendo como un examinador… · 考官批改中…</p>}
              {limitReached && <p>Has alcanzado el límite de correcciones. · 已达到批改上限。</p>}
              {correccion && <CorrectionCard data={correccion} />}
              {audioMonologo && (
                <div className="oe-audio">
                  <p>Monólogo · 独白</p>
                  <audio controls src={audioMonologo} />
                </div>
              )}
              {audiosRespuestas.map((u, i) => (
                <div key={i} className="oe-audio">
                  <p>Respuesta {i + 1} · 回答 {i + 1}</p>
                  <audio controls src={u} />
                </div>
              ))}
              <p className="oe-note">La pronunciación y la fluidez no se puntúan automáticamente: escucha tu grabación. · 发音和流利度无法自动评分，请回听录音。</p>
              <button className="oe-start" onClick={reset}><RotateCcwIcon size={16} /> Otra vez · 再来一次</button>
            </div>
          )}
        </div>
      </div>
    </LightShell>
  );
}
