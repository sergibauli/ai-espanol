import "../styles/v19-unidad.css";
import "../styles/v23-unidad.css";
import "../styles/v24-unidad-espectacular.css";
import "../styles/v25-unidad-ceremonia.css";
import "../styles/v26-unidad-portada.css";
import "../styles/v27-unidad-salas.css";
import "../styles/v30-guia.css";
import * as React from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { createPortal } from "react-dom";
import { ArrowLeftIcon, PlayIcon, CheckIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { StoryPlayer, CAST } from "../components/lesson/StoryPlayer.jsx";
import { DialogStage } from "../components/lesson/DialogStage.jsx";
import { TarjetasDialogo } from "../components/lesson/TarjetasDialogo.jsx";
import { speak } from "../components/lesson/fx.js";
import { useGame, getGame } from "../lib/gamification.js";
import { buildLesson, lessonId, LESSON_META, buildPractice, PRACTICE_TYPES, dialogToStory, buildAIChallenge } from "../lib/lessons.js";
import { loadModule, loadModulePlus } from "../lib/examGenerator.js";
import { markModuleVisited } from "../lib/progress.js";
import { clasesDe, claseValida, moduloDeClase, plusDeClase, progresoUnidad, sincronizarClase, ultimaClase, recordarClase } from "../lib/clases.js";
import CATALOG from "../data/modulos/catalog.json";
import STOPS from "../data/china-stops.json";
import "../styles/v22-volteo.css";
import { CabeceraUnidad, MapaClases } from "../components/unidad/CabeceraUnidad.jsx";
import { FichaTeoria } from "../components/unidad/FichaTeoria.jsx";
import { PalabrasUnidad } from "../components/unidad/PalabrasUnidad.jsx";
import { ESCENAS } from "../components/dele/EscenasNivel.jsx";

// Chispas doradas que saltan desde la pestaña pulsada
function chispas(boton) {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  } catch {}
  for (let i = 0; i < 12; i++) {
    const c = document.createElement("i");
    c.className = "ud-chispa";
    const ang = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
    const dist = 40 + Math.random() * 40;
    c.style.setProperty("--dx", `${Math.cos(ang) * dist}px`);
    c.style.setProperty("--dy", `${Math.sin(ang) * dist}px`);
    boton.appendChild(c);
    setTimeout(() => c.remove(), 800);
  }
}

import { GAMES, isReadyGame } from "./juegos/JuegosHubPage.jsx";
import "../styles/v14-fix-juegos.css";
import { u as useCorrection, C as CorrectionCard } from "../components/CorrectionDisplay.jsx";
import "../styles/movil-unidades.css";
const ModuloJuegos = React.lazy(() => import("./modulo/ModuloJuegos.jsx"));
const ModuloExamen = React.lazy(() => import("./modulo/ModuloExamen.jsx"));
const ModuloDescubre = React.lazy(() => import("./modulo/ModuloDescubre.jsx"));
const STORIES = import.meta.glob("../data/stories/*.json", { import: "default" });
// Colores de cada mundo (bambú, linternas, tinta, Ciudad Prohibida) para los detalles de las tarjetas
const LEVEL_COLORS = { A1: ["#2f8f52", "#1d6339"], A2: ["#d9542b", "#a33a17"], B1: ["#3d6378", "#26414f"], B2: ["#7b2d8e", "#4c1d5e"] };

// Pestañas de la unidad: sello, nombre y nombre chino
const PESTANAS = [
  { id: "guia", sello: "学", es: "Guía", zh: "语法" },
  { id: "palabras", sello: "词", es: "Palabras", zh: "词汇" },
  { id: "lecciones", sello: "课", es: "Lecciones", zh: "课" },
  { id: "dialogos", sello: "话", es: "Diálogos", zh: "对话" },
  { id: "practica", sello: "练", es: "Práctica", zh: "练习" },
  { id: "examen", sello: "考", es: "Examen", zh: "考试" },
];


// Producción de la unidad: redacción corregida como en el DELE y tarea oral con el examinador IA
const PALABRAS = { A1: [30, 50], A2: [60, 80], B1: [100, 150], B2: [150, 180] };
function ProduccionUnidad({ mod, nivel }) {
  const { correctText, isCorrecting } = useCorrection();
  const [txt, setTxt] = React.useState("");
  const [res, setRes] = React.useState(null);
  const tema = String(mod.titulo || "").split(" - ")[0];
  const puntos = [...(mod.teoria || []).slice(0, 3).map((t) => `Usa: ${t.titulo}`), "Usa al menos 5 palabras del vocabulario de la unidad"];
  const [min, max] = PALABRAS[nivel] || PALABRAS.A2;
  const enunciado = `Escribe un texto sobre «${tema}» con lo que has aprendido en esta unidad (${min}-${max} palabras).`;
  const palabras = (txt.match(/[\p{L}\p{N}]+/gu) || []).length;
  const corregir = async () => {
    const r = await correctText(txt, "escritura", nivel, `${tema}. ${enunciado}`, { nivel, puntosGuia: puntos, minPalabras: min, maxPalabras: max });
    setRes(r?.data || null);
  };
  return (
    <div className="unit-prod">
      <div className="unit-prod-task">
        <h3>✍️ Expresión escrita</h3>
        <p>{enunciado}</p>
        <ul>
          {puntos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={7} placeholder="Escribe aquí" />
        <div className="unit-prod-foot">
          <span className={palabras < min || palabras > max ? "fuera" : "ok"}>
            {palabras} / {min}–{max} palabras
          </span>
          <button className="wel-btn red" disabled={isCorrecting || !txt.trim()} onClick={corregir}>
            {isCorrecting ? "Corrigiendo…" : "Corregir como en el DELE"}
          </button>
        </div>
        {res && <CorrectionCard data={res} />}
      </div>
      <div className="unit-prod-task oral">
        <h3>🎙️ Expresión oral</h3>
        <p>Habla sobre «{tema}»: preparación, monólogo y preguntas del entrevistador, corregido con los criterios del DELE.</p>
        <a className="oe-link" href={`#/examinador-oral?nivel=${nivel}&tema=${encodeURIComponent(tema)}&tarea=${encodeURIComponent(`Monólogo sobre la unidad «${tema}»`)}&puntos=${encodeURIComponent(JSON.stringify(puntos))}`}>
          Empezar con el examinador IA
        </a>
      </div>
    </div>
  );
}

// Piezas 3D recortadas de las maquetas (public/theme)
const THEME = `${import.meta.env.BASE_URL}theme/`;


// Final de la clase: qué falta para terminarla y el paso siguiente (otra clase, examen de la unidad o la unidad siguiente)
function FinDeClase({ numero, estado, siguiente, total, siguienteUnidad, onIrClase, onExamen }) {
  if (!estado) return null;
  const ultima = !siguiente;
  return (
    <section className={`cls-fin gm-no-adapt ${estado.completada ? "hecha" : ""}`} id="u-fin-clase">
      <span className="cls-fin-sello" translate="no">
        {estado.completada ? "完成" : `第${estado.n}课`}
      </span>
      <div className="cls-fin-txt">
        {estado.completada ? (
          <>
            <h3>
              ¡Clase {estado.n} completada!
            </h3>
            <p>{ultima ? (total > 1 ? "Has hecho todas las clases. Demuestra lo aprendido con el examen de la unidad." : "Demuestra lo aprendido con el examen de la unidad.") : `Sigue con la clase ${siguiente.n}: ${siguiente.titulo}.`}</p>
          </>
        ) : (
          <>
            <h3>
              Para terminar la clase {estado.n}
            </h3>
            <p>Haz sus 5 lecciones ({estado.hechas}/5) o aprueba su examen corto con 80 o más.</p>
          </>
        )}
      </div>
      <div className="cls-fin-botones">
        {!estado.completada && (
          <button type="button" className="cls-btn-papel" onClick={onExamen}>
            📝 Examen de la clase
          </button>
        )}
        {siguiente ? (
          <button type="button" className={estado.completada ? "cls-btn-laca grande" : "cls-btn-papel"} onClick={() => onIrClase(siguiente.n)}>
            {estado.completada ? "Siguiente clase" : "Ir a la clase"} {siguiente.n} →
          </button>
        ) : (
          <>
            <button type="button" className={estado.completada ? "cls-btn-laca grande" : "cls-btn-papel"} onClick={onExamen}>
              🏆 Examen de la unidad
            </button>
            {estado.completada && siguienteUnidad && (
              <Link className="cls-btn-papel" to={`/modulos/modulo-${siguienteUnidad.numero}`}>
                Unidad {siguienteUnidad.numero} →
              </Link>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// Aviso a pantalla completa al terminar una clase durante la sesión
function CelebrarClase({ estado, siguiente, onIrClase, onExamen, onCerrar }) {
  return createPortal(
    <div className="cls-celebra gm-no-adapt" role="dialog" aria-modal="true" aria-label="Clase completada" onClick={onCerrar}>
      <div className="cls-celebra-hoja" onClick={(e) => e.stopPropagation()}>
        <span className="cls-celebra-sello" translate="no">
          完成
        </span>
        <img src={`${import.meta.env.BASE_URL}mono/trofeo.png`} alt="" className="cls-celebra-mono" onError={(e) => (e.currentTarget.style.display = "none")} />
        <h3>¡Clase {estado.n} completada!</h3>
        <p>{estado.titulo}</p>
        {siguiente ? (
          <button type="button" className="cls-btn-laca grande" onClick={() => onIrClase(siguiente.n)}>
            Empezar la clase {siguiente.n} →
          </button>
        ) : (
          <button type="button" className="cls-btn-laca grande" onClick={onExamen}>
            🏆 Examen de la unidad
          </button>
        )}
        <button type="button" className="cls-btn-texto" onClick={onCerrar}>
          Quedarme en esta clase
        </button>
      </div>
    </div>,
    document.body,
  );
}


export default function UnitPage() {
  const { moduloId } = useParams();
  const [params, setParams] = useSearchParams();
  const numero = Number(String(moduloId).replace(/\D/g, ""));
  const meta = CATALOG.find((m) => m.numero === numero);
  const [modCompleto, setModCompleto] = React.useState(null);
  const [plusCompleto, setPlusCompleto] = React.useState(null);
  const [story, setStory] = React.useState(undefined);
  const [lesson, setLesson] = React.useState(null);
  const [playStory, setPlayStory] = React.useState(false);
  const [reto, setReto] = React.useState(false);
  const [dialog, setDialog] = React.useState(null);
  const [types, setTypes] = React.useState(PRACTICE_TYPES.map((tipo) => tipo.key));
  const [extra, setExtra] = React.useState(() => params.get("tab"));
  // Pestaña abierta (Guía, Palabras, Lecciones…) y sentido del cambio, para la transición
  const [pestana, setPestana] = React.useState(() => (params.get("tab") ? "examen" : PESTANAS.some((x) => x.id === params.get("ver")) ? params.get("ver") : "guia"));
  const [sentido, setSentido] = React.useState(1);
  const cambiarPestana = (id, desplazar = true) => {
    setSentido(PESTANAS.findIndex((x) => x.id === id) >= PESTANAS.findIndex((x) => x.id === pestana) ? 1 : -1);
    setPestana(id);
    if (desplazar)
      requestAnimationFrame(() => {
        const barra = document.getElementById("u-pestanas");
        if (barra && barra.getBoundingClientRect().top < 0) barra.scrollIntoView({ behavior: "smooth", block: "start" });
      });
  };
  const [celebrar, setCelebrar] = React.useState(null);
  const [, refrescar] = React.useReducer((x) => x + 1, 0);
  const game = useGame();
  const [c1, c2] = LEVEL_COLORS[meta?.nivel] || LEVEL_COLORS.A1;

  // Clase abierta: la de la URL (?clase=2) o la última que el alumno tenía abierta en esta unidad
  const clase = claseValida(numero, params.get("clase") ?? ultimaClase(numero));
  const clases = clasesDe(numero);
  const info = clases.find((c) => c.n === clase) || clases[0];
  const mod = React.useMemo(() => moduloDeClase(modCompleto, clase), [modCompleto, clase]);
  const plus = React.useMemo(() => plusDeClase(plusCompleto, numero, clase), [plusCompleto, numero, clase]);

  React.useEffect(() => {
    if (!meta) return;
    markModuleVisited(`modulo-${numero}`);
    window.scrollTo(0, 0);
    loadModule(numero).then(setModCompleto);
    loadModulePlus(numero).then(setPlusCompleto);
    const load = STORIES[`../data/stories/modulo-${numero}.json`];
    load ? load().then((s) => setStory({ ...s, modulo: numero })) : setStory(null);
    // Registra como hechas las clases cuyas 5 lecciones ya estaban hechas (p. ej. las de antes de existir las clases)
    clases.forEach((c) => sincronizarClase(numero, c.n, getGame().lessons));
  }, [numero]);

  React.useEffect(() => {
    recordarClase(numero, clase);
    if (params.get("clase") !== String(clase))
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("clase", String(clase));
          return next;
        },
        { replace: true },
      );
  }, [numero, clase]);

  React.useEffect(() => {
    window.addEventListener("progreso-clases", refrescar);
    return () => window.removeEventListener("progreso-clases", refrescar);
  }, []);

  if (!meta) return <div className="ui-page">Módulo no encontrado · 未找到该单元</div>;
  const progreso = progresoUnidad(numero, game.lessons);
  const estado = progreso.clases.find((c) => c.n === clase) || progreso.clases[0];
  const siguienteClase = progreso.clases.find((c) => c.n === clase + 1) || null;
  const done = estado.lecciones;
  const nextIdx = done.findIndex((hecha) => !hecha);
  const prev = CATALOG.find((m) => m.numero === numero - 1);
  const next = CATALOG.find((m) => m.numero === numero + 1);
  const varias = clases.length > 1;
  const conHistoria = !varias || info.historia;
  const start = (i) => mod && setLesson(buildLesson(mod, plus, i, Date.now(), done[i]));

  const irAClase = (n) => {
    setCelebrar(null);
    setParams(
      (prevParams) => {
        const nuevos = new URLSearchParams(prevParams);
        nuevos.set("clase", String(n));
        nuevos.delete("tab");
        return nuevos;
      },
      { replace: false },
    );
    setExtra(null);
    requestAnimationFrame(() => document.getElementById("u-clases")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const abrirExamen = () => {
    setCelebrar(null);
    setExtra("examen");
    cambiarPestana("examen");
  };
  const alCerrarLeccion = () => {
    setLesson(null);
    const yaEstaba = estado.completada;
    const ahora = sincronizarClase(numero, clase, getGame().lessons);
    if (ahora && !yaEstaba) setCelebrar(clase);
  };

  // Botón principal del héroe: la lección siguiente de la clase, o pasar a la siguiente clase
  const cta = !mod
    ? { texto: "Cargando… · 加载中", accion: null }
    : nextIdx >= 0
      ? { texto: `${nextIdx === 0 ? "Empezar" : "Continuar"} · ${LESSON_META[nextIdx].es}`, accion: () => start(nextIdx) }
      : siguienteClase && !siguienteClase.completada
        ? { texto: `Clase ${siguienteClase.n} · 第${siguienteClase.n}课 →`, accion: () => irAClase(siguienteClase.n) }
        : { texto: "Repasar · 复习", accion: () => start(4) };

  return (
    <LightShell>
      <div className="unit-page ud" data-nivel={meta.nivel} style={{ "--c": c1, "--d": c2 }}>
        <div className="ud-mundo-fondo" aria-hidden="true">
          {React.createElement(ESCENAS[meta.nivel] || ESCENAS.A1)}
        </div>
        <Link to={`/modulos`} className="ud-volver">
          <ArrowLeftIcon size={16} /> Unidades {meta.nivel} · <span lang="zh">单元</span>
        </Link>

        <CabeceraUnidad meta={meta} parada={STOPS.find((x) => x.n === numero)} clase={clase} totalClases={clases.length} progreso={progreso} cta={cta} />

        <MapaClases progreso={progreso} actual={clase} onElegir={irAClase} onExamen={abrirExamen} info={info} />

        <nav className="ud-pestanas gm-no-adapt" id="u-pestanas" role="tablist" aria-label="Secciones de la clase">
          {PESTANAS.map((x) => (
            <button key={x.id} type="button" role="tab" id={`tab-${x.id}`} aria-selected={pestana === x.id} aria-controls="u-panel" className={pestana === x.id ? "on" : ""} onClick={(e) => (chispas(e.currentTarget), cambiarPestana(x.id, false))}>
              <span className="ud-pestana-sello" translate="no" aria-hidden="true">
                {x.sello}
              </span>
              <span className="ud-pestana-txt">
                <b>{x.es}</b>
                <small lang="zh">{x.zh}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="ud-panel gm-no-adapt" id="u-panel" role="tabpanel" aria-labelledby={`tab-${pestana}`} key={`${pestana}-${clase}`} style={{ "--sentido": sentido }}>
        {pestana === "guia" &&
          (mod ? (
            (mod.teoria || []).length > 0 ? (
              <FichaTeoria key={`guia-${numero}-${clase}`} teoria={mod.teoria} todas={modCompleto?.teoria || mod.teoria} numero={numero} />
            ) : (
              <p className="ud-vacio">Esta clase no tiene teoría nueva · 本课没有新语法</p>
            )
          ) : (
            <p className="ud-vacio">Cargando… · 加载中</p>
          ))}

        {pestana === "palabras" && mod && <PalabrasUnidad vocabulario={mod.vocabulario || []} clase={clase} varias={varias} />}

        {pestana === "lecciones" && (
          <>
            <h2 className="ud-seccion-tit">
              {varias ? `Lecciones de la clase ${clase}` : "Lecciones"} · <span lang="zh">课</span>
              <small>5 lecciones cortas: palabras, gramática y frases</small>
            </h2>
            <ol className="ud-lecciones" style={{ "--paisaje": `url(${THEME}paisaje-leccion.webp)` }}>
              {LESSON_META.map((l, i) => {
                const open = i === 0 || done[i - 1] || done[i];
                return (
                  <li key={l.key} className={`ud-leccion ${done[i] ? "hecha" : ""} ${open ? "" : "cerrada"} ${i === nextIdx ? "actual" : ""}`}>
                    <button type="button" disabled={!mod} onClick={() => start(i)}>
                      <span className="ud-leccion-disco">
                        <img src={`${THEME}${done[i] ? "lazo-oro" : open ? "disco-jade" : "disco-cerrado"}.png`} alt="" />
                        {done[i] && <CheckIcon className="ud-leccion-check" size={18} strokeWidth={4} />}
                        <i translate="no">{i + 1}</i>
                      </span>
                      <span className="ud-leccion-txt">
                        <b>{l.es}</b>
                        <small lang="zh">{l.zh}</small>
                        <em>{done[i] ? "Hecha ✓" : i === nextIdx ? "¡Ahora! · +10 XP" : "+10 XP"}</em>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </>
        )}

        {pestana === "dialogos" && (
          <>
        {story && conHistoria && (
          <>
            <h2 className="unit-h2" id="u-historia">
              Historia {varias && <small>(cierra la unidad: usa las palabras de todas las clases)</small>}
            </h2>
            <button className="unit-story" onClick={() => setPlayStory(true)}>
              <Emoji3D emoji={story.escena} size={96} float />
              <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <small>HISTORIA INTERACTIVA · +15 XP</small>
                <b>{story.titulo}</b>
                <span className="unit-cast">
                  {[...new Set(story.lineas.map((linea) => linea.quien))]
                    .filter((quien) => CAST[quien] && quien !== "narrador")
                    .map((quien) => (
                      <span key={quien} title={CAST[quien].name}>
                        <Emoji3D emoji={CAST[quien].emoji} size={34} />
                        {CAST[quien].name}
                      </span>
                    ))}
                </span>
              </span>
              <span className="unit-play">
                <PlayIcon size={26} fill="currentColor" />
              </span>
            </button>
          </>
        )}

        {mod?.dialogos?.length > 0 && (
          <>
            <h2 className="unit-h2" id="u-dialogos">
              Diálogos <small>({mod.dialogos.length} {mod.dialogos.length === 1 ? "conversación" : "conversaciones"} con voz)</small>
            </h2>
            <TarjetasDialogo dialogos={mod.dialogos} numero={numero} onAbrir={(d) => setDialog(dialogToStory(d, numero, story?.escena))} />
          </>
        )}

          {!mod?.dialogos?.length && !(story && conHistoria) && <p className="ud-vacio">Esta clase no tiene diálogos · 本课没有对话</p>}
          </>
        )}

        {pestana === "practica" && mod && (
          <>
            <section className="v27-sala practica" aria-labelledby="u-ejercicios">
              <span className="v27-sala__glifo" aria-hidden="true" translate="no">练</span>
              <span className="v27-sala__rayos" aria-hidden="true" />
              <img className="v27-sala__mono" src="./mono/poder.png" alt="" draggable="false" />
              <div className="v27-sala__txt">
                <small>Sala de entrenamiento · <span lang="zh">练功房</span></small>
                <h2 id="u-ejercicios">
                  Ejercicios <span lang="zh">练习</span>
                </h2>
                <p>
                  Elige los tipos que quieras: cambian de orden en cada intento · <span lang="zh">选择题型，每次顺序都不同</span>
                </p>
                <span className="v27-sala__cifra">
                  <b>{types.reduce((n, k) => n + (mod.ejercicios?.[k] || []).length, 0)}</b> ejercicios elegidos · <span lang="zh">已选题目</span>
                </span>
              </div>
            </section>
            <div className="v27-tipos" role="group" aria-label="Tipos de ejercicio · 题型">
              {PRACTICE_TYPES.filter((tipo) => (mod.ejercicios?.[tipo.key] || []).length).map((tipo, i) => {
                const on = types.includes(tipo.key);
                return (
                  <button key={tipo.key} type="button" aria-pressed={on} className={`v27-tipo ${on ? "on" : ""}`} style={{ "--c": c1, "--i": i }} onClick={() => setTypes((lista) => (on ? lista.filter((x) => x !== tipo.key) : [...lista, tipo.key]))}>
                    <span className="v27-tipo__medallon">
                      <Emoji3D emoji={tipo.emoji} size={40} />
                    </span>
                    <span className="v27-tipo__txt">
                      <b>{tipo.es}</b>
                      <small lang="zh">{tipo.zh}</small>
                      <em>{(mod.ejercicios?.[tipo.key] || []).length} ejercicios</em>
                    </span>
                    <span className="v27-tipo__sello" aria-hidden="true" translate="no">
                      {on ? "选" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="v27-acciones">
              <button type="button" className="v27-gran-btn jade" style={{ "--c": c1, "--d": c2 }} disabled={!types.length} onClick={() => setLesson(buildPractice(mod, types))}>
                <span className="v27-gran-btn__ico" aria-hidden="true">💪</span>
                <span>
                  <b>Practicar ahora</b>
                  <small lang="zh">开始练习</small>
                </span>
                <PlayIcon size={20} fill="currentColor" />
              </button>
              <button
                type="button"
                className="v27-gran-btn laca"
                disabled={reto}
                onClick={async () => {
                  setReto(true);
                  const retoNuevo = await buildAIChallenge(mod);
                  setReto(false);
                  setLesson(retoNuevo);
                }}
              >
                <span className="v27-gran-btn__ico" aria-hidden="true">✨</span>
                <span>
                  <b>{reto ? "Creando preguntas…" : "Reto nuevo con IA"}</b>
                  <small lang="zh">{reto ? "正在出题…" : "AI 新挑战"}</small>
                </span>
                <PlayIcon size={20} fill="currentColor" />
              </button>
            </div>

            <h2 className="unit-h2" id="u-produccion">Producción <small>(corregida con los criterios del DELE)</small></h2>
            <ProduccionUnidad mod={mod} nivel={meta.nivel} />

            <h2 className="unit-h2" id="u-juegos">Juegos <small>(con las palabras de esta unidad)</small></h2>
            <div className="unit-games">
              {[...GAMES].sort((a, b) => isReadyGame(b) - isReadyGame(a)).map((g) => {
                const Icon = g.icon;
                if (!isReadyGame(g))
                  return (
                    <div key={g.id} className="unit-game gm-locked" aria-disabled="true" title="Próximamente · 即将推出">
                      <span className="unit-game-icon" style={{ background: g.gradient }}>
                        <Icon size={24} color="#fff" />
                      </span>
                      <b>{g.name}</b>
                      <small>🔒 Próximamente</small>
                    </div>
                  );
                return (
                  <Link key={g.id} to={`${g.path}?m=${numero}&clase=${clase}`} className="unit-game">
                    <span className="unit-game-icon" style={{ background: g.gradient }}>
                      <Icon size={24} color="#fff" />
                    </span>
                    <b>{g.name}</b>
                  </Link>
                );
              })}
            </div>

          </>
        )}

        {pestana === "examen" && (
          <>
        <section className="v27-sala examen" aria-labelledby="u-extra">
          <span className="v27-sala__glifo" aria-hidden="true" translate="no">考</span>
          <span className="v27-sala__rayos" aria-hidden="true" />
          <img className="v27-sala__mono" src="./mono/trofeo.png" alt="" draggable="false" />
          <div className="v27-sala__txt">
            <small>Sala del examen imperial · <span lang="zh">科举考场</span></small>
            <h2 id="u-extra">
              Examen y lectura <span lang="zh">考试</span>
            </h2>
            <p>{varias ? "Examen corto de la clase o examen de toda la unidad · 本课小测或单元考试" : "Examen del módulo, lectura y errores típicos · 模块考试、阅读与常见错误"}</p>
          </div>
        </section>
        <div className="v27-puertas">
          {[
            ["descubre", "📖", "读", plus?.lectura ? "Lectura y cultura" : "Frases y errores típicos", plus?.lectura ? "阅读与文化" : "常用句与常见错误", plus?.lectura ? "Lee un texto de la unidad y descubre la cultura" : "Las frases clave y los errores que más se repiten"],
            ["examen", "📝", "考", varias ? "Examen · clase o unidad" : "Examen del módulo", varias ? "本课小测 · 单元考试" : "模块考试", "Ponte a prueba como en el DELE y gana tu sello"],
          ].map(([k, e, sello, es, zh, desc], i) => (
            <button key={k} type="button" aria-expanded={extra === k} className={`v27-puerta ${k} ${extra === k ? "on" : ""}`} style={{ "--i": i }} onClick={() => setExtra(extra === k ? null : k)}>
              <span className="v27-puerta__arco" aria-hidden="true">
                <span className="v27-puerta__sello" translate="no">{sello}</span>
                <Emoji3D emoji={e} size={64} />
              </span>
              <span className="v27-puerta__txt">
                <b>{es}</b>
                <small lang="zh">{zh}</small>
                <span>{desc}</span>
              </span>
              <span className="v27-puerta__cta">{extra === k ? "Cerrar · 收起" : "Abrir · 打开"}</span>
              <span className="v27-brillo" aria-hidden="true" />
            </button>
          ))}
        </div>
        {extra && mod && (
          <div className="unit-extra">
            <React.Suspense fallback={<div className="ui-empty">Cargando…</div>}>
              {extra === "descubre" && <ModuloDescubre key={`descubre-${clase}`} numero={numero} plus={plus} clase={clase} showChinese={false} />}
              {extra === "juegos" && <ModuloJuegos vocabulario={mod.vocabulario || []} moduloId={mod.id} />}
              {extra === "examen" && <ModuloExamen numero={numero} moduloId={mod.id} clase={varias ? clase : null} modoInicial={params.get("examen") === "unidad" ? "unidad" : undefined} />}
            </React.Suspense>
          </div>
        )}
          </>
        )}
        </div>

        {varias && (
          <FinDeClase numero={numero} estado={estado} siguiente={siguienteClase} total={clases.length} siguienteUnidad={next} onIrClase={irAClase} onExamen={abrirExamen} />
        )}

        <div className="unit-nav">
          {prev ? (
            <Link to={`/modulos/modulo-${prev.numero}`} className="unit-nav-btn">
              ← {prev.numero}. {prev.titulo.split(" - ")[0]}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/modulos/modulo-${next.numero}`} className="unit-nav-btn">
              {next.numero}. {next.titulo.split(" - ")[0]} →
            </Link>
          )}
        </div>
      </div>
      {lesson && <LessonPlayer lesson={lesson} onClose={alCerrarLeccion} />}
      {playStory && story && <StoryPlayer story={story} onClose={() => setPlayStory(false)} />}
      {dialog && <DialogStage story={dialog} onClose={() => setDialog(null)} />}
      {celebrar && !lesson && (
        <CelebrarClase
          estado={progreso.clases.find((c) => c.n === celebrar) || estado}
          siguiente={progreso.clases.find((c) => c.n === celebrar + 1) || null}
          onIrClase={irAClase}
          onExamen={abrirExamen}
          onCerrar={() => setCelebrar(null)}
        />
      )}
    </LightShell>
  );
}
