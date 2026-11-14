import { CpuIcon, SparklesIcon, BotIcon, ArrowLeftIcon, ListChecksIcon, TargetIcon, LoaderCircleIcon, CheckIcon, PlayIcon, GavelIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { c as generarConCache, e as extraerJson, a as pedirIA } from "../../lib/ai-generator.js";
import "../../styles/v14-fix-recursos.css";
const NIVELES = ["A1", "A2", "B1", "B2"];
const AGENTES = [
  { key: "planificador", label: "Planificador", labelZh: "规划者", icon: ListChecksIcon, sello: "规" },
  { key: "generador", label: "Generador", labelZh: "生成者", icon: SparklesIcon, sello: "生" },
  { key: "evaluador", label: "Evaluador", labelZh: "评估者", icon: TargetIcon, sello: "评" },
  { key: "corrector", label: "Corrector", labelZh: "批改者", icon: GavelIcon, sello: "批" },
];
const SISTEMA_PLAN =
  "Eres el agente Planificador de un enjambre de agentes de estudio de español. Devuelve SOLO JSON válido, sin markdown.";
const SISTEMA_GENERADOR = "Eres el agente Generador de ejercicios de español. Devuelve SOLO JSON válido, sin markdown.";
const SISTEMA_CORRECTOR = "Eres el agente Corrector de español. Devuelve SOLO JSON válido, sin markdown.";
function EnjambrePage() {
  const [fase, setFase] = React.useState("input");
  const [objetivo, setObjetivo] = React.useState("");
  const [nivel, setNivel] = React.useState("A2");
  const [plan, setPlan] = React.useState([]);
  const [paso, setPaso] = React.useState(0);
  const [ejercicios, setEjercicios] = React.useState([]);
  const [respuestas, setRespuestas] = React.useState({});
  const [soluciones, setSoluciones] = React.useState({});
  const [resultado, setResultado] = React.useState(null);
  const [estadoAgentes, setEstadoAgentes] = React.useState({});
  const [error, setError] = React.useState("");
  const [notaTotal, setNotaTotal] = React.useState(0);
  const marcarAgente = (agente, estado) =>
    setEstadoAgentes((r) => ({
      ...r,
      [agente]: estado,
    }));
  const desplegar = async () => {
    if (!objetivo.trim()) {
      setError("Escribe tu objetivo / 请输入目标");
      return;
    }
    setError("");
    setFase("planning");
    marcarAgente("planificador", "running");
    try {
      const a = `Crea un plan de estudio de 3 pasos para lograr: "${objetivo.trim()}" (nivel ${nivel}). Devuelve SOLO JSON con esta estructura: {"plan":["paso 1","paso 2","paso 3"]}. Los pasos deben ser concretos y progresivos.`;
      const s = await generarConCache("enjambre-plan", a, SISTEMA_PLAN);
      let r = extraerJson(s);
      if (!r?.plan?.length) {
        r = extraerJson(await pedirIA(SISTEMA_PLAN, a));
      }
      if (!r?.plan?.length) {
        throw new Error("Plan no válido");
      }
      setPlan(r.plan.slice(0, 3));
      marcarAgente("planificador", "done");
      setFase("plan");
    } catch (error) {
      setError(error.message);
      setFase("input");
      marcarAgente("planificador", "pending");
    }
  };
  const generarPractica = async (pasoTexto) => {
    setFase("practice");
    marcarAgente("generador", "running");
    setEjercicios([]);
    setRespuestas({});
    setSoluciones({});
    setResultado(null);
    try {
      const s = `Genera 4 ejercicios interactivos de español nivel ${nivel} para practicar: "${pasoTexto}". Devuelve SOLO JSON con esta estructura: {"ejercicios":[{"tipo":"seleccionar","pregunta":"...","opciones":["a) ...","b) ...","c) ...","d) ..."],"respuesta":0},{"tipo":"completar","pregunta":"Completa: ...","respuesta":"palabra"}]}. Mezcla los dos tipos. "respuesta" en seleccionar es el índice 0-3 de la opción correcta.`;
      const r = await generarConCache("enjambre-gen", s, SISTEMA_GENERADOR);
      let t = extraerJson(r);
      if (!t?.ejercicios?.length) {
        t = extraerJson(await pedirIA(SISTEMA_GENERADOR, s));
      }
      if (!t?.ejercicios?.length) {
        throw new Error("No se pudieron generar ejercicios");
      }
      setEjercicios(t.ejercicios.slice(0, 4));
      marcarAgente("generador", "done");
      marcarAgente("evaluador", "running");
    } catch (error) {
      setError(error.message);
      setFase("plan");
      marcarAgente("generador", "pending");
    }
  };
  const corregir = async () => {
    setFase("correcting");
    marcarAgente("corrector", "running");
    try {
      const a = ejercicios.map(
        (t, d) => `Ejercicio ${d + 1} (${t.tipo}): ${t.pregunta}
Respuesta esperada: ${t.tipo === "seleccionar" ? (t.opciones || [])[t.respuesta] : t.respuesta}
Respuesta del estudiante: ${respuestas[d] ?? "(sin responder)"}`,
      ).join(`

`);
      const s = await pedirIA(
        SISTEMA_CORRECTOR,
        `Corrige estas respuestas de un estudiante de español nivel ${nivel}:

${a}

Devuelve SOLO JSON: {"nota":0-10,"aciertos":N,"feedback":"2 frases en español de feedback y ánimo"}.`,
      );
      const r = extraerJson(s);
      setResultado(
        r || {
          nota: 5,
          aciertos: 0,
          feedback: "No se pudo corregir.",
        },
      );
      setNotaTotal((t) => t + (r?.nota || 0));
      marcarAgente("corrector", "done");
      marcarAgente("evaluador", "done");
      setFase("done");
    } catch (error) {
      setResultado({
        nota: 5,
        aciertos: 0,
        feedback: `Error al corregir: ${error.message}`,
      });
      marcarAgente("corrector", "done");
      setFase("done");
    }
  };
  const siguientePaso = () => {
    const siguiente = paso + 1;
    if (siguiente >= plan.length) {
      setPaso(siguiente);
      return;
    }
    setPaso(siguiente);
    generarPractica(plan[siguiente]);
  };
  const reiniciar = () => {
    setFase("input");
    setObjetivo("");
    setPlan([]);
    setPaso(0);
    setEjercicios([]);
    setRespuestas({});
    setSoluciones({});
    setResultado(null);
    setEstadoAgentes({});
    setError("");
    setNotaTotal(0);
  };
  const AGENTE_ESTADO = { pending: "En espera · 等待", running: "Trabajando · 工作中", done: "Hecho · 完成" };
  return (
    <LightShell>
      <div className="rx-page rx-hoja gm-no-adapt rx-enj">
        <div className="rx-wrap is-estrecho">
          <Link to="/juegos" className="sh-back">
            <ArrowLeftIcon size={16} aria-hidden="true" /> Juegos · 游戏
          </Link>
          <header className="rx-enj__hero">
            <span className="rx-enj__ceja">
              <CpuIcon size={16} aria-hidden="true" /> Enjambre de agentes · 智能体集群
            </span>
            <h1>
              Enjambre IA <span className="rx-zh">智能体集群</span>
            </h1>
            <p>
              4 agentes que planifican, generan, evalúan y corrigen por ti.
              <span>四个智能体为你规划、出题、评估和批改。</span>
            </p>
          </header>
          <ol className="rx-enj__agentes" aria-label="Agentes · 智能体">
            {AGENTES.map((agente) => {
              const estado = estadoAgentes[agente.key] || "pending";
              const Icono = agente.icon;
              return (
                <li key={agente.key} className={`rx-enj__agente is-${estado}`}>
                  <span className="rx-sello" aria-hidden="true">
                    {agente.sello}
                  </span>
                  <b>
                    <Icono size={14} aria-hidden="true" /> {agente.label}
                  </b>
                  <small>{agente.labelZh}</small>
                  <em>{AGENTE_ESTADO[estado]}</em>
                </li>
              );
            })}
          </ol>
          {fase === "input" && (
            <form
              className="rx-card rx-enj__panel"
              onSubmit={(evento) => {
                evento.preventDefault();
                desplegar();
              }}
            >
              <label className="rx-campo">
                <span>
                  <TargetIcon size={16} aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px" }} /> ¿Qué quieres lograr? · 你的目标是什么？
                </span>
                <input className="rx-input" value={objetivo} onChange={(evento) => setObjetivo(evento.target.value)} placeholder="Ej.: Dominar el pretérito indefinido · 例如：掌握简单过去时" />
              </label>
              <div className="rx-filtros" role="group" aria-label="Nivel · 级别">
                <p className="rx-filtros__titulo">Nivel · 级别</p>
                {NIVELES.map((opcion) => (
                  <button key={opcion} type="button" aria-pressed={nivel === opcion} onClick={() => setNivel(opcion)} className={`rx-chip rx-nv-${opcion}`}>
                    {opcion}
                  </button>
                ))}
              </div>
              <button type="submit" className="rx-btn rx-enj__accion">
                <BotIcon size={18} aria-hidden="true" /> Desplegar enjambre · 启动集群
              </button>
              {error && (
                <p className="rx-aviso" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
          {(fase === "planning" || fase === "correcting") && (
            <div className="rx-card rx-enj__cargando" role="status">
              <LoaderCircleIcon size={34} className="animate-spin" aria-hidden="true" />
              <p>{fase === "planning" ? "El Planificador está creando tu plan… · 规划者正在制定计划" : "El Corrector evalúa tus respuestas… · 批改者正在评分"}</p>
            </div>
          )}
          {fase === "plan" && (
            <section className="rx-card rx-enj__panel">
              <h2 className="rx-h3 rx-enj__titulo">
                <ListChecksIcon size={18} aria-hidden="true" /> Plan del enjambre · 集群计划
              </h2>
              <ol className="rx-enj__plan">
                {plan.map((textoPaso, indice) => (
                  <li key={indice} className={indice < paso ? "is-hecho" : indice === paso ? "is-actual" : ""}>
                    <span className="rx-consejo__num">{indice < paso ? <CheckIcon size={16} aria-label="Hecho · 完成" /> : indice + 1}</span>
                    <p className="rx-texto">{textoPaso}</p>
                  </li>
                ))}
              </ol>
              {paso < plan.length ? (
                <button type="button" className="rx-btn rx-enj__accion" onClick={() => generarPractica(plan[paso])}>
                  <PlayIcon size={16} aria-hidden="true" /> Paso {paso + 1}: generar práctica · 生成练习
                </button>
              ) : (
                <p className="rx-enj__final">
                  Todos los pasos completados · 全部完成 — Nota total · 总分: {notaTotal} / {plan.length * 10}
                </p>
              )}
              {error && (
                <p className="rx-aviso" role="alert">
                  {error}
                </p>
              )}
            </section>
          )}
          {fase === "practice" && (
            <section className="rx-card rx-enj__panel">
              <h2 className="rx-h3 rx-enj__titulo">
                <SparklesIcon size={18} aria-hidden="true" /> Paso {paso + 1}: {plan[paso]}
              </h2>
              <p className="rx-texto-zh">El Generador creó estos ejercicios · 回答下面的练习</p>
              {ejercicios.map((ejercicio, indice) => (
                <div key={indice} className="rx-gen__pregunta">
                  <p className="rx-texto">
                    <b>
                      {indice + 1}. {ejercicio.pregunta}
                    </b>
                  </p>
                  {ejercicio.tipo === "seleccionar" && (
                    <div className="rx-gen__opciones">
                      {(ejercicio.opciones || []).map((opcion, clave) => (
                        <button key={clave} type="button" aria-pressed={respuestas[indice] === clave} className={`rx-opcion ${respuestas[indice] === clave ? "is-elegida" : ""}`} onClick={() => setRespuestas((previas) => ({ ...previas, [indice]: clave }))}>
                          {opcion}
                        </button>
                      ))}
                    </div>
                  )}
                  {ejercicio.tipo === "completar" && (
                    <input className="rx-input" value={respuestas[indice] || ""} onChange={(evento) => setRespuestas((previas) => ({ ...previas, [indice]: evento.target.value }))} placeholder="Tu respuesta · 你的答案" aria-label={`Respuesta ${indice + 1} · 答案`} />
                  )}
                </div>
              ))}
              <button type="button" className="rx-btn rx-enj__accion" onClick={corregir}>
                <GavelIcon size={16} aria-hidden="true" /> Corregir · AI批改
              </button>
            </section>
          )}
          {fase === "done" && resultado && (
            <section className="rx-card rx-enj__panel">
              <div className={`rx-enj__nota ${resultado.nota >= 7 ? "is-alta" : resultado.nota >= 5 ? "is-media" : "is-baja"}`}>
                <b>{resultado.nota}</b>
                <span>/ 10 · aciertos · 答对: {resultado.aciertos}</span>
              </div>
              <p className="rx-caja rx-texto">{resultado.feedback}</p>
              <button type="button" className="rx-btn is-papel" style={{ justifySelf: "start" }} onClick={() => setSoluciones(Object.fromEntries(ejercicios.map((_, indice) => [indice, true])))}>
                Ver soluciones · 查看答案
              </button>
              {ejercicios.some((_, indice) => soluciones[indice]) && (
                <ol className="rx-enj__soluciones">
                  {ejercicios.map((ejercicio, indice) => (
                    <li key={indice}>{ejercicio.tipo === "seleccionar" ? (ejercicio.opciones || [])[ejercicio.respuesta] : ejercicio.respuesta}</li>
                  ))}
                </ol>
              )}
              <div className="rx-filtros" style={{ justifyContent: "center" }}>
                {paso + 1 < plan.length ? (
                  <button type="button" className="rx-btn" onClick={siguientePaso}>
                    <PlayIcon size={16} aria-hidden="true" /> Siguiente paso · 下一步
                  </button>
                ) : (
                  <p className="rx-enj__final">
                    Enjambre completado · 集群完成 — Nota total · 总分: {notaTotal} / {plan.length * 10}
                  </p>
                )}
                <button type="button" className="rx-btn is-papel" onClick={reiniciar}>
                  Reiniciar · 重来
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </LightShell>
  );
}
export { EnjambrePage as default };
