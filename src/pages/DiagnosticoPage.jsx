import * as React from "react";
import { Link, useNavigate } from "react-router";
import { Volume2Icon, LanguagesIcon, PuzzleIcon, HeadphonesIcon, ArrowRightIcon, CheckIcon, XIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { speak } from "../components/lesson/fx.js";
import { loadAllModules } from "../lib/examGenerator.js";
import { recordAnswer, setDele, LEVELS, SKILLS } from "../lib/progresoDele.js";
import CATALOG from "../data/modulos/catalog.json";
import { bancoNivel, registrarItem } from "../lib/banco.js";

const nivelDe = (m) => m.nivel || CATALOG.find((c) => c.numero === m.numero)?.nivel;

// Diagnóstico adaptativo: 15 preguntas (5 por destreza); acierto → sube de nivel, fallo → baja
const PLAN = ["vocabulario", "gramatica", "audicion"];
const TOTAL = 15;
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);

async function buildPools(mods) {
  const pools = {};
  for (const lv of LEVELS) {
    const banco = (await bancoNivel(lv)).map((it) => ({ id: it.id, pregunta: it.enunciado, preguntaChino: it.enunciadoZh, opciones: it.opciones, respuestaCorrecta: it.opciones[it.correcta] }));
    const ms = mods.filter((m) => nivelDe(m) === lv);
    const vocab = ms.flatMap((m) => (m.vocabulario || []).filter((v) => v.espanol && v.chino));
    const gram = ms.flatMap((m) => (m.ejercicios?.seleccionar || []).filter((q) => q.opciones?.length >= 3 && q.opciones.includes(q.respuestaCorrecta)));
    pools[lv] = { vocab, gram: [...gram, ...banco, ...banco] };
  }
  return pools;
}

function makeItem(pools, skill, li) {
  const { vocab, gram } = pools[LEVELS[li]];
  if (skill === "gramatica" && gram.length) {
    const q = gram[Math.floor(Math.random() * gram.length)];
    const opts = shuffle(q.opciones);
    return { skill, li, id: q.id, prompt: q.pregunta, promptZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "", options: opts, answer: opts.indexOf(q.respuestaCorrecta) };
  }
  const v = vocab[Math.floor(Math.random() * vocab.length)];
  const others = shuffle(vocab.filter((x) => x.espanol !== v.espanol)).slice(0, 3);
  if (skill === "audicion") {
    const opts = shuffle([v.espanol, ...others.map((x) => x.espanol)]);
    return { skill, li, prompt: "Escucha y elige lo que oyes · 听音选择", speak: v.espanol, options: opts, answer: opts.indexOf(v.espanol) };
  }
  const opts = shuffle([v.chino, ...others.map((x) => x.chino)]);
  return { skill: "vocabulario", li, prompt: `¿Qué significa «${v.espanol}»?`, promptZh: "选择正确的意思", options: opts, answer: opts.indexOf(v.chino) };
}

const ICONO = { vocabulario: LanguagesIcon, gramatica: PuzzleIcon, audicion: HeadphonesIcon };
const LETRAS = ["A", "B", "C", "D", "E"];

// Escalera A1 → B2 con la posición actual de cada destreza (o la del nivel de la pregunta)
function Escalera({ actual }) {
  return (
    <ol className="in-dg-escalera" aria-label={`Nivel de la pregunta: ${LEVELS[actual]}`}>
      {LEVELS.map((codigo, indice) => (
        <li key={codigo} className={indice === actual ? "on" : indice < actual ? "pasado" : ""} style={{ "--i": indice }}>
          {codigo}
        </li>
      ))}
    </ol>
  );
}

export default function DiagnosticoPage() {
  const navigate = useNavigate();
  const [pools, setPools] = React.useState(null);
  const [posicion, setPosicion] = React.useState({ vocabulario: 1, gramatica: 1, audicion: 1 });
  const [historial, setHistorial] = React.useState([]);
  const [pregunta, setPregunta] = React.useState(null);
  const [elegida, setElegida] = React.useState(null);
  const [empezado, setEmpezado] = React.useState(false);

  React.useEffect(() => {
    loadAllModules().then(buildPools).then(setPools);
  }, []);
  const siguiente = React.useCallback(
    (nuevaPosicion, nuevoHistorial) => {
      if (nuevoHistorial.length >= TOTAL) return setPregunta(null);
      const destreza = PLAN[nuevoHistorial.length % PLAN.length];
      const nueva = makeItem(pools, destreza, nuevaPosicion[destreza]);
      setPregunta(nueva);
      setElegida(null);
      if (nueva.speak) setTimeout(() => speak(nueva.speak, 0.85), 300);
    },
    [pools],
  );

  const responder = (indice) => {
    if (elegida != null) return;
    setElegida(indice);
    const acierto = indice === pregunta.answer;
    if (pregunta.id) registrarItem(pregunta.id, acierto);
    recordAnswer({ skill: pregunta.skill, level: LEVELS[pregunta.li], ok: acierto, src: "diagnóstico", error: { prompt: pregunta.prompt, given: pregunta.options[indice], correct: pregunta.options[pregunta.answer], options: pregunta.options, answer: pregunta.answer, speak: pregunta.speak, type: pregunta.speak ? "listen" : "choice" } });
    const nuevoHistorial = [...historial, { skill: pregunta.skill, li: pregunta.li, ok: acierto }];
    const nuevaPosicion = { ...posicion, [pregunta.skill]: Math.max(0, Math.min(3, posicion[pregunta.skill] + (acierto ? 1 : -1))) };
    setTimeout(() => {
      setHistorial(nuevoHistorial);
      setPosicion(nuevaPosicion);
      siguiente(nuevaPosicion, nuevoHistorial);
    }, 900);
  };

  // Nivel estimado por destreza: media de los niveles en que acertó, desplazada por su posición final
  const estimar = (destreza) => {
    const intentos = historial.filter((x) => x.skill === destreza);
    if (!intentos.length) return 0;
    const nivelesAcertados = intentos.filter((x) => x.ok).map((x) => x.li);
    const mejor = nivelesAcertados.length ? Math.max(...nivelesAcertados) : 0;
    return Math.round((mejor + posicion[destreza]) / 2 - (nivelesAcertados.length ? 0 : 0.5) + 0.01);
  };
  const terminado = empezado && historial.length >= TOTAL;
  const resultado = terminado ? Object.fromEntries(PLAN.map((destreza) => [destreza, Math.max(0, Math.min(3, estimar(destreza)))])) : null;
  const global = resultado ? LEVELS[Math.round(Object.values(resultado).sort((a, b) => a - b)[1])] : null;
  React.useEffect(() => {
    if (terminado) setDele({ diag: { t: Date.now(), nivel: global, destrezas: Object.fromEntries(Object.entries(resultado).map(([clave, valor]) => [clave, LEVELS[valor]])) } });
  }, [terminado]);
  const empezar = () => (setEmpezado(true), siguiente(posicion, []));

  return (
    <LightShell>
      <div className="ui-page in-dg gm-no-adapt">
        {!empezado ? (
          <>
            <header className="in-md-hero in-dg-hero">
              <span className="in-md-hero__dragon" aria-hidden="true" />
              <span className="in-md-hero__sello" aria-hidden="true" translate="no">
                测
              </span>
              <div className="in-md-hero__texto">
                <p className="in-ceja">
                  Diagnóstico <span lang="zh">· 水平测试</span>
                </p>
                <h1>¿Cuál es tu nivel?</h1>
                <p className="in-md-hero__zh" lang="zh">
                  5分钟测出你的西班牙语水平
                </p>
                <p className="in-md-hero__desc">
                  15 preguntas que se adaptan a ti: si aciertas, sube la dificultad; si fallas, baja. Al final te decimos tu nivel por destreza y por dónde empezar.
                  <small lang="zh">题目会根据你的回答自动调整难度，最后给出各项能力的水平和学习起点。</small>
                </p>
                <button type="button" className="in-boton-oro in-dg-cta" disabled={!pools} onClick={empezar}>
                  <span className="in-boton-oro__et">{pools ? "5 minutos · 5分钟" : "Un momento · 请稍等"}</span>
                  <span className="in-boton-oro__txt">{pools ? "Empezar el diagnóstico · 开始测试" : "Preparando preguntas… · 准备中…"}</span>
                  <ArrowRightIcon size={22} strokeWidth={2.8} aria-hidden="true" />
                </button>
              </div>
              <div className="in-dg-hero__mono" aria-hidden="true">
                <span className="in-dg-hero__rayos" />
                <img src="./mono/saluda.png" alt="" />
                <img className="in-dg-hero__nube" src="./theme/nube-oro.png" alt="" />
              </div>
            </header>
            <section className="in-md-bloque in-dg-como" aria-labelledby="in-dg-como-t">
              <h2 className="in-titulo" id="in-dg-como-t">
                <span>Cómo funciona</span> <small lang="zh">测试说明</small>
              </h2>
              <div className="in-dg-pasos">
                {PLAN.map((destreza) => {
                  const Icono = ICONO[destreza];
                  return (
                    <article key={destreza} className="in-dg-paso">
                      <span className="in-medallon" aria-hidden="true">
                        <Icono size={22} strokeWidth={2.4} />
                      </span>
                      <h3>
                        {SKILLS[destreza].es}
                        <small lang="zh">{SKILLS[destreza].zh}</small>
                      </h3>
                      <p>5 preguntas · 5道题</p>
                    </article>
                  );
                })}
                <article className="in-dg-paso in-dg-paso--escalera">
                  <h3>
                    Se adapta a ti
                    <small lang="zh">难度自动调整</small>
                  </h3>
                  <Escalera actual={1} />
                  <p>Aciertas → sube · 答对升级 · Fallas → baja · 答错降级</p>
                </article>
              </div>
            </section>
          </>
        ) : terminado ? (
          <section className="in-papel in-dg-resultado" aria-live="polite">
            <div className="in-dg-resultado__escena" aria-hidden="true">
              <span className="in-dg-resultado__rayos" />
              <img src="./mono/trofeo.png" alt="" />
            </div>
            <p className="in-dg-resultado__ceja">Resultado · 测试结果</p>
            <h1>
              Tu nivel <span lang="zh">你的水平</span>
            </h1>
            <span className="in-dg-resultado__sello" translate="no">
              {global}
            </span>
            <div className="in-dg-destrezas">
              {PLAN.map((destreza, indice) => {
                const Icono = ICONO[destreza];
                return (
                  <div key={destreza} className="in-dg-destreza" style={{ "--i": indice }}>
                    <span className="in-medallon" aria-hidden="true">
                      <Icono size={20} strokeWidth={2.4} />
                    </span>
                    <span>
                      {SKILLS[destreza].es}
                      <small lang="zh">{SKILLS[destreza].zh}</small>
                    </span>
                    <b>{LEVELS[resultado[destreza]]}</b>
                  </div>
                );
              })}
            </div>
            <div className="in-dg-acciones">
              <button type="button" className="in-boton-oro" onClick={() => navigate(`/ruta?nivel=${global}`)}>
                <span className="in-boton-oro__et">Tu ruta · 你的路线</span>
                <span className="in-boton-oro__txt">
                  Empezar en {global} · 从{global}开始
                </span>
                <ArrowRightIcon size={22} strokeWidth={2.8} aria-hidden="true" />
              </button>
              <Link to="/mi-dele" className="in-boton-crema">
                Ver mi panel DELE · 我的DELE
              </Link>
            </div>
          </section>
        ) : pregunta ? (
          <section className="in-papel in-dg-pregunta" aria-labelledby="in-dg-enunciado">
            <div className="in-dg-cab">
              <p className="in-dg-cab__titulo">
                Diagnóstico <span lang="zh">· 水平测试</span>
              </p>
              <ol className="in-dg-cuentas" aria-label={`Pregunta ${historial.length + 1} de ${TOTAL}`}>
                {Array.from({ length: TOTAL }, (_, indice) => {
                  const hecho = historial[indice];
                  return <li key={indice} className={hecho ? (hecho.ok ? "ok" : "mal") : indice === historial.length ? "actual" : ""} />;
                })}
              </ol>
            </div>
            <div className="in-dg-meta">
              <span className="in-dg-meta__num">
                {historial.length + 1}
                <small>/{TOTAL}</small>
              </span>
              <span className="in-dg-meta__destreza">
                {React.createElement(ICONO[pregunta.skill], { size: 16, strokeWidth: 2.6, "aria-hidden": true })}
                {SKILLS[pregunta.skill].es} · {SKILLS[pregunta.skill].zh}
              </span>
              <Escalera actual={pregunta.li} />
            </div>
            <h2 id="in-dg-enunciado" className="in-dg-enunciado">
              {pregunta.prompt}
            </h2>
            {pregunta.promptZh && (
              <p className="in-dg-zh" lang="zh">
                {pregunta.promptZh}
              </p>
            )}
            {pregunta.speak && (
              <button type="button" className="in-dg-sonido" onClick={() => speak(pregunta.speak, 0.85)}>
                <span aria-hidden="true">
                  <Volume2Icon size={26} strokeWidth={2.4} />
                </span>
                Escuchar otra vez · 再听
              </button>
            )}
            <div className="in-dg-opciones" key={historial.length}>
              {pregunta.options.map((opcion, indice) => {
                const estado = elegida == null ? "" : indice === pregunta.answer ? "ok" : indice === elegida ? "mal" : "off";
                return (
                  <button key={indice} type="button" className={`in-dg-opcion ${estado}`} style={{ "--i": indice }} onClick={() => responder(indice)} disabled={elegida != null} aria-label={`${LETRAS[indice]}: ${opcion}`}>
                    <span className="in-dg-opcion__letra" aria-hidden="true">
                      {estado === "ok" ? <CheckIcon size={18} strokeWidth={3} /> : estado === "mal" ? <XIcon size={18} strokeWidth={3} /> : LETRAS[indice]}
                    </span>
                    <span className="in-dg-opcion__txt">{opcion}</span>
                  </button>
                );
              })}
            </div>
            <p className="in-sr" aria-live="assertive">
              {elegida == null ? "" : elegida === pregunta.answer ? "¡Correcto! · 正确" : `Incorrecto. La respuesta es ${pregunta.options[pregunta.answer]}`}
            </p>
          </section>
        ) : null}
      </div>
    </LightShell>
  );
}
