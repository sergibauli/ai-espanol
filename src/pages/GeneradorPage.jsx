import {
  SparklesIcon,
  Trash2Icon,
  Volume2Icon,
  BookOpenIcon,
  MicIcon,
  LoaderCircleIcon,
  SaveIcon,
  FileTextIcon,
  HeadphonesIcon,
  PenToolIcon,
  MessageCircleIcon,
  SquareIcon,
  HistoryIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { Link } from "react-router";
import { u as useCorreccion, C as Correccion } from "../components/CorrectionDisplay.jsx";
import { c as generarConCache, e as extraerJson, a as pedirIA } from "../lib/ai-generator.js";
import "../styles/v14-fix-recursos.css";
const CLAVE_HISTORIAL = "dele_generated_content_v1";
const NIVELES = ["A1", "A2", "B1", "B2"];
function leerHistorial() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_HISTORIAL) || "[]");
  } catch {
    return [];
  }
}
function guardarHistorial(lista) {
  try {
    localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(lista));
  } catch {}
}
const system =
  "Eres un generador experto de exámenes DELE de español para estudiantes chinos. Devuelve SOLO un objeto JSON válido, sin markdown, sin comentarios y sin texto fuera del JSON. El contenido debe ser completo y desarrollado, NUNCA vacío.";
function crearPrompt(tema, nivel) {
  const user = `Genera un examen DELE completo de nivel ${nivel} sobre el tema "${tema}". Escribe TODO el contenido en español (los campos "chinese" en chino). Devuelve únicamente un JSON con exactamente esta estructura, con contenido real y desarrollado en cada campo (nada de arrays vacíos, nada de repetir solo el título):

{
  "theme": "${tema}",
  "level": "${nivel}",
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
const examenCompleto = (examen) =>
  examen &&
  Array.isArray(examen.vocabulary) &&
  examen.vocabulary.length >= 5 &&
  examen.reading?.text?.length > 60 &&
  Array.isArray(examen.reading?.questions) &&
  examen.reading.questions.length >= 3 &&
  Array.isArray(examen.listening?.questions) &&
  examen.listening.questions.length >= 3;
function GeneradorPage() {
  const [tema, setTema] = React.useState("");
  const [nivel, setNivel] = React.useState("A1");
  const [generando, setGenerando] = React.useState(false);
  const [error, setError] = React.useState("");
  const [examen, setExamen] = React.useState(null);
  const [historial, setHistorial] = React.useState(leerHistorial);
  const [verHistorial, setVerHistorial] = React.useState(false);
  const [guardado, setGuardado] = React.useState(false);
  const generar = async () => {
    if (!tema.trim()) {
      setError("Escribe un tema · 请先输入主题");
      return;
    }
    setGenerando(true);
    setError("");
    setExamen(null);
    try {
      const { system, user } = crearPrompt(tema.trim(), nivel);
      let respuesta = await generarConCache("examen", `${nivel} ${tema.trim()}`, system);
      let resultado = extraerJson(respuesta);
      for (let intento = 2; intento <= 3 && !examenCompleto(resultado); intento++) {
        respuesta = await pedirIA(system, user);
        resultado = extraerJson(respuesta);
      }
      if (examenCompleto(resultado)) setExamen(resultado);
      else setError("La IA no devolvió un examen completo tras 3 intentos. Prueba otro tema o reintenta · AI未返回完整考试（已重试3次）");
    } catch (fallo) {
      setError(fallo.message || "Error");
    }
    setGenerando(false);
  };
  const guardar = () => {
    if (!examen) return;
    const lista = [{ id: `examen-${Date.now()}`, mode: "examen", level: nivel, theme: tema.trim(), createdAt: Date.now(), data: examen }, ...historial].slice(0, 30);
    setHistorial(lista);
    guardarHistorial(lista);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 1500);
  };
  const abrir = (entrada) => {
    setTema(entrada.theme);
    setNivel(entrada.level);
    setExamen(entrada.data);
    setVerHistorial(false);
  };
  const borrar = (indice) => {
    const lista = historial.filter((_, i) => i !== indice);
    setHistorial(lista);
    guardarHistorial(lista);
  };
  return (
    <div className="rx-page rx-hoja">
      <div className="rx-wrap is-estrecho">
        <div className="gm-no-adapt">
          <SectionHero
            eyebrow="IA Lab · AI实验室"
            title="Generador IA de exámenes"
            titleZh="AI 生成 DELE 试卷"
            description="Escribe un tema y la IA crea un examen DELE completo con tareas de comprensión y expresión. Para exámenes al instante sin IA, usa el generador automático."
            descriptionZh="输入主题，AI 生成完整的 DELE 试卷。"
            actions={
              <Link className="ui-btn" to="/examenes/generador">
                Generador automático · 自动出题
              </Link>
            }
          />
        </div>
        <form
          className="rx-card rx-gen__form"
          onSubmit={(evento) => {
            evento.preventDefault();
            generar();
          }}
        >
          <div className="rx-gen__campos">
            <label className="rx-campo">
              <span>Tema del examen · 考试主题</span>
              <input className="rx-input" value={tema} onChange={(evento) => setTema(evento.target.value)} placeholder="Ej.: La comida · 例如：食物" />
            </label>
            <label className="rx-campo">
              <span>Nivel · 级别</span>
              <select className="rx-input" value={nivel} onChange={(evento) => setNivel(evento.target.value)}>
                {NIVELES.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="rx-filtros">
            <button type="submit" className="rx-btn" disabled={generando}>
              {generando ? <LoaderCircleIcon size={18} className="animate-spin" aria-hidden="true" /> : <SparklesIcon size={18} aria-hidden="true" />}
              {generando ? "Generando… · 生成中" : "Generar · 生成"}
            </button>
            {examen && (
              <button type="button" className="rx-btn is-oro" onClick={guardar}>
                {guardado ? <CheckIcon size={18} aria-hidden="true" /> : <SaveIcon size={18} aria-hidden="true" />} {guardado ? "Guardado · 已保存" : "Guardar · 保存"}
              </button>
            )}
            <button type="button" className="rx-btn is-papel" aria-expanded={verHistorial} onClick={() => setVerHistorial((visible) => !visible)}>
              <HistoryIcon size={18} aria-hidden="true" /> Historial · 历史 ({historial.length})
            </button>
          </div>
          {error && (
            <p className="rx-aviso" role="alert">
              {error}
            </p>
          )}
        </form>
        {verHistorial && (
          <section className="rx-card rx-gen__historial" aria-label="Historial · 历史">
            <h3 className="rx-h3">
              Historial generado <span className="rx-zh">生成历史</span>
            </h3>
            {historial.length === 0 ? (
              <div className="rx-vacio">
                <span className="rx-sello" aria-hidden="true">
                  空
                </span>
                <p>
                  Aún no has guardado ningún examen
                  <span>还没有保存的试卷，生成后点击“保存”。</span>
                </p>
              </div>
            ) : (
              <ul className="rx-gen__lista">
                {historial.map((entrada, indice) => (
                  <li key={entrada.id}>
                    <button type="button" className="rx-gen__abrir" onClick={() => abrir(entrada)}>
                      <span className={`rx-tag rx-nv-${entrada.level}`}>{entrada.level}</span>
                      <span>
                        <b>{entrada.theme}</b>
                        <small>{new Date(entrada.createdAt).toLocaleString()}</small>
                      </span>
                    </button>
                    <button type="button" className="rx-btn is-papel is-mini rx-gen__borrar" onClick={() => borrar(indice)} aria-label={`Borrar ${entrada.theme} · 删除`}>
                      <Trash2Icon size={18} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
        {examen && <ExamenGenerado examen={examen} />}
      </div>
    </div>
  );
}
function leerEnVoz(texto) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const frase = new SpeechSynthesisUtterance(texto.replace(/[*_#`]/g, "").trim());
  frase.lang = "es-ES";
  frase.rate = 0.9;
  window.speechSynthesis.speak(frase);
}
function BloqueExamen({ icono, sello, titulo, children }) {
  return (
    <section className="rx-card rx-gen__bloque">
      <div className="rx-gen__bloque-cabeza">
        <span className="rx-sello is-mini" aria-hidden="true">
          {sello}
        </span>
        <h3 className="rx-h3">
          {icono} {titulo}
        </h3>
      </div>
      {children}
    </section>
  );
}
function PreguntaTest({ pregunta, indice, elegidas, setElegidas }) {
  const elegida = elegidas[indice];
  const respondida = elegida !== undefined;
  return (
    <div className="rx-gen__pregunta">
      <div className="rx-gen__enunciado">
        <p>
          {indice + 1}. {pregunta.question}
        </p>
        <button type="button" className="rx-btn is-papel is-mini" onClick={() => leerEnVoz(pregunta.question)} aria-label="Escuchar pregunta · 听问题">
          <Volume2Icon size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="rx-gen__opciones">
        {(pregunta.options || []).map((opcion, clave) => {
          const estado = !respondida ? "" : clave === pregunta.correctAnswer ? "is-ok" : clave === elegida ? "is-mal" : "is-apagada";
          return (
            <button key={clave} type="button" className={`rx-opcion ${estado}`} disabled={respondida} onClick={() => setElegidas((previas) => ({ ...previas, [indice]: clave }))}>
              {opcion}
            </button>
          );
        })}
      </div>
      {respondida && (
        <p className={`rx-gen__veredicto ${elegida === pregunta.correctAnswer ? "is-ok" : "is-mal"}`} role="status">
          {elegida === pregunta.correctAnswer ? (
            <>
              <CheckIcon size={16} aria-hidden="true" /> Correcta · 正确
            </>
          ) : (
            <>
              <XIcon size={16} aria-hidden="true" /> La correcta era · 正确答案：{(pregunta.options || [])[pregunta.correctAnswer]}
            </>
          )}
        </p>
      )}
    </div>
  );
}
function PracticaOral({ etiqueta, texto, setTexto, correccion, grabando, onGrabar, onParar, onCorregir, corrigiendo }) {
  return (
    <div className="rx-gen__practica">
      <label className="rx-campo">
        <span>{etiqueta}</span>
        <textarea className="rx-input" value={texto} onChange={(evento) => setTexto(evento.target.value)} rows={4} placeholder="Escribe aquí o pulsa Grabar… · 在这里写或按录音…" />
      </label>
      <div className="rx-filtros">
        <button type="button" className="rx-btn" onClick={onCorregir} disabled={corrigiendo || !texto.trim()}>
          {corrigiendo ? <LoaderCircleIcon size={16} className="animate-spin" aria-hidden="true" /> : <SparklesIcon size={16} aria-hidden="true" />}
          {corrigiendo ? "Corrigiendo… · 批改中" : "Corregir con IA · AI批改"}
        </button>
        {grabando ? (
          <button type="button" className="rx-btn is-oro" onClick={onParar}>
            <SquareIcon size={16} aria-hidden="true" /> Detener · 停止
          </button>
        ) : (
          <button type="button" className="rx-btn is-papel" onClick={onGrabar}>
            <MicIcon size={16} aria-hidden="true" /> Grabar · 录音
          </button>
        )}
      </div>
      {correccion && <Correccion data={correccion} />}
    </div>
  );
}
function ExamenGenerado({ examen }) {
  const { correctText, isCorrecting } = useCorreccion();
  const [respuestasLectura, setRespuestasLectura] = React.useState({});
  const [respuestasAudicion, setRespuestasAudicion] = React.useState({});
  const [redacciones, setRedacciones] = React.useState({});
  const [correccionesEscritura, setCorreccionesEscritura] = React.useState({});
  const [monologo, setMonologo] = React.useState("");
  const [correccionMonologo, setCorreccionMonologo] = React.useState(null);
  const [grabandoMonologo, setGrabandoMonologo] = React.useState(false);
  const [interaccion, setInteraccion] = React.useState("");
  const [correccionInteraccion, setCorreccionInteraccion] = React.useState(null);
  const [grabandoInteraccion, setGrabandoInteraccion] = React.useState(false);
  const reconocedorRef = React.useRef(null);
  const textoFinalRef = React.useRef("");
  const grabar = (setGrabando, setTexto, setCorreccion) => {
    const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Reconocimiento) {
      alert("Tu navegador no soporta voz · 浏览器不支持语音");
      return;
    }
    if (reconocedorRef.current) {
      try {
        reconocedorRef.current.abort();
      } catch {}
    }
    const reconocedor = new Reconocimiento();
    reconocedor.lang = "es-ES";
    reconocedor.interimResults = true;
    reconocedor.continuous = false;
    let definitivo = "";
    reconocedor.onresult = (evento) => {
      let provisional = "";
      for (let k = evento.resultIndex; k < evento.results.length; k++) {
        const trozo = evento.results[k][0].transcript;
        if (evento.results[k].isFinal) definitivo += trozo;
        else provisional += trozo;
      }
      textoFinalRef.current = definitivo;
      setTexto(definitivo + provisional);
    };
    reconocedor.onend = () => {
      setGrabando(false);
      setTexto(textoFinalRef.current);
    };
    reconocedor.onerror = () => setGrabando(false);
    reconocedorRef.current = reconocedor;
    setGrabando(true);
    setTexto("");
    setCorreccion(null);
    textoFinalRef.current = "";
    try {
      reconocedor.start();
    } catch {
      setGrabando(false);
    }
  };
  const parar = (setGrabando) => {
    setGrabando(false);
    reconocedorRef.current?.stop();
  };
  const corregir = async (texto, tipo, alCorregir, tarea) => {
    if (!texto.trim() || isCorrecting) return;
    const resultado = await correctText(texto, tipo, examen.level, tarea);
    if (resultado.data) alCorregir(resultado.data);
  };
  return (
    <div className="rx-gen__examen">
      <div className="rx-cabecera gm-no-adapt">
        <span className={`rx-sello is-nivel rx-nv-${examen.level}`} aria-hidden="true">
          {examen.level}
        </span>
        <h2 className="rx-h2">
          {examen.theme} <span className="rx-zh">· {examen.level} 级试卷</span>
        </h2>
      </div>
      <BloqueExamen icono={<BookOpenIcon size={18} aria-hidden="true" />} sello="词" titulo="Vocabulario · 词汇">
        <div className="rx-gen__vocab">
          {(examen.vocabulary || []).map((palabra, indice) => (
            <div key={indice} className="rx-gen__palabra">
              <div>
                <p>
                  <b>{palabra.word}</b> <span>— {palabra.chinese}</span>
                </p>
                <small>{palabra.definition}</small>
              </div>
              <button type="button" className="rx-btn is-papel is-mini" onClick={() => leerEnVoz(palabra.word)} aria-label={`Escuchar ${palabra.word} · 听`}>
                <Volume2Icon size={18} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </BloqueExamen>
      <BloqueExamen icono={<FileTextIcon size={18} aria-hidden="true" />} sello="读" titulo={`Lectura · 阅读: ${examen.reading?.title || ""}`}>
        <p className="rx-texto rx-gen__lectura">{examen.reading?.text}</p>
        {(examen.reading?.questions || []).map((pregunta, indice) => (
          <PreguntaTest key={indice} pregunta={pregunta} indice={indice} elegidas={respuestasLectura} setElegidas={setRespuestasLectura} />
        ))}
      </BloqueExamen>
      <BloqueExamen icono={<HeadphonesIcon size={18} aria-hidden="true" />} sello="听" titulo={`Audición · 听力: ${examen.listening?.title || ""}`}>
        <button type="button" className="rx-btn is-oro" onClick={() => leerEnVoz(examen.listening?.transcription || "")}>
          <Volume2Icon size={18} aria-hidden="true" /> Escuchar audio · 播放听力
        </button>
        <details className="rx-gen__transcripcion">
          <summary>Ver transcripción · 查看原文</summary>
          <p className="rx-texto">{examen.listening?.transcription}</p>
        </details>
        {(examen.listening?.questions || []).map((pregunta, indice) => (
          <PreguntaTest key={indice} pregunta={pregunta} indice={indice} elegidas={respuestasAudicion} setElegidas={setRespuestasAudicion} />
        ))}
      </BloqueExamen>
      <BloqueExamen icono={<PenToolIcon size={18} aria-hidden="true" />} sello="写" titulo="Escritura · 写作">
        {["optionA", "optionB"].map((opcion) => (
          <div key={opcion} className="rx-gen__tarea">
            <p className="rx-texto">
              <b>{examen.writing?.[opcion]?.title}</b>
            </p>
            <p className="rx-texto-zh">{examen.writing?.[opcion]?.description}</p>
            <textarea
              className="rx-input"
              value={redacciones[opcion] || ""}
              onChange={(evento) => setRedacciones((previas) => ({ ...previas, [opcion]: evento.target.value }))}
              rows={4}
              placeholder="Escribe tu texto… · 写下你的作文…"
              aria-label={`${examen.writing?.[opcion]?.title || "Redacción"} · 作文`}
            />
            <button
              type="button"
              className="rx-btn"
              onClick={() => corregir(redacciones[opcion] || "", "escritura", (datos) => setCorreccionesEscritura((previas) => ({ ...previas, [opcion]: datos })), examen.writing?.[opcion]?.title)}
              disabled={isCorrecting || !(redacciones[opcion] || "").trim()}
            >
              {isCorrecting ? <LoaderCircleIcon size={16} className="animate-spin" aria-hidden="true" /> : <SparklesIcon size={16} aria-hidden="true" />}
              {isCorrecting ? "Corrigiendo… · 批改中" : "Corregir con IA · AI批改"}
            </button>
            {correccionesEscritura[opcion] && <Correccion data={correccionesEscritura[opcion]} />}
          </div>
        ))}
      </BloqueExamen>
      <BloqueExamen icono={<MicIcon size={18} aria-hidden="true" />} sello="说" titulo="Monólogo · 独白">
        {["topic1", "topic2"].map((clave) => (
          <div key={clave} className="rx-gen__tarea">
            <p className="rx-texto">
              <b>{examen.monologue?.[clave]?.title}</b>
            </p>
            <p className="rx-texto-zh">{examen.monologue?.[clave]?.description}</p>
          </div>
        ))}
        <PracticaOral
          etiqueta="Practica tu monólogo · 练习你的独白"
          texto={monologo}
          setTexto={setMonologo}
          correccion={correccionMonologo}
          grabando={grabandoMonologo}
          corrigiendo={isCorrecting}
          onGrabar={() => grabar(setGrabandoMonologo, setMonologo, setCorreccionMonologo)}
          onParar={() => parar(setGrabandoMonologo)}
          onCorregir={() => corregir(monologo, "monologo", setCorreccionMonologo, examen.monologue?.topic1?.title)}
        />
      </BloqueExamen>
      <BloqueExamen icono={<MessageCircleIcon size={18} aria-hidden="true" />} sello="谈" titulo="Interacción · 互动">
        <p className="rx-texto">{examen.interaction?.situation}</p>
        {(examen.interaction?.questions || []).map((pregunta, indice) => (
          <div key={indice} className="rx-gen__tarea">
            <p className="rx-texto">
              <b>
                {indice + 1}. {pregunta.question}
              </b>
            </p>
            {pregunta.help && <p className="rx-texto-zh">{pregunta.help}</p>}
            {pregunta.usefulPhrases?.length > 0 && (
              <div className="rx-filtros">
                {pregunta.usefulPhrases.map((frase, clave) => (
                  <span key={clave} className="rx-tag is-plano">
                    {frase}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        <PracticaOral
          etiqueta="Practica la interacción · 练习互动"
          texto={interaccion}
          setTexto={setInteraccion}
          correccion={correccionInteraccion}
          grabando={grabandoInteraccion}
          corrigiendo={isCorrecting}
          onGrabar={() => grabar(setGrabandoInteraccion, setInteraccion, setCorreccionInteraccion)}
          onParar={() => parar(setGrabandoInteraccion)}
          onCorregir={() => corregir(interaccion, "interaccion", setCorreccionInteraccion, examen.interaction?.situation)}
        />
      </BloqueExamen>
    </div>
  );
}
export { GeneradorPage as default };
