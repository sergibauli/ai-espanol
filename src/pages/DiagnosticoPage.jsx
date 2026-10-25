import * as React from "react";
import { useNavigate } from "react-router";
import { Volume2Icon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { SectionHero } from "../components/ui/SectionHero.jsx";
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
  const lv = LEVELS[li];
  const { vocab, gram } = pools[lv];
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

export default function DiagnosticoPage() {
  const navigate = useNavigate();
  const [pools, setPools] = React.useState(null);
  const [pos, setPos] = React.useState({ vocabulario: 1, gramatica: 1, audicion: 1 });
  const [hist, setHist] = React.useState([]);
  const [item, setItem] = React.useState(null);
  const [picked, setPicked] = React.useState(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    loadAllModules().then(buildPools).then(setPools);
  }, []);
  const next = React.useCallback((p, h) => {
    if (h.length >= TOTAL) return setItem(null);
    const skill = PLAN[h.length % PLAN.length];
    const it = makeItem(pools, skill, p[skill]);
    setItem(it);
    setPicked(null);
    if (it.speak) setTimeout(() => speak(it.speak, 0.85), 300);
  }, [pools]);

  const answer = (i) => {
    if (picked != null) return;
    setPicked(i);
    const ok = i === item.answer;
    if (item.id) registrarItem(item.id, ok);
    recordAnswer({ skill: item.skill, level: LEVELS[item.li], ok, src: "diagnóstico", error: { prompt: item.prompt, given: item.options[i], correct: item.options[item.answer], options: item.options, answer: item.answer, speak: item.speak, type: item.speak ? "listen" : "choice" } });
    const h = [...hist, { skill: item.skill, li: item.li, ok }];
    const p = { ...pos, [item.skill]: Math.max(0, Math.min(3, pos[item.skill] + (ok ? 1 : -1))) };
    setTimeout(() => {
      setHist(h);
      setPos(p);
      next(p, h);
    }, 900);
  };

  // Nivel estimado por destreza: media de los niveles en que acertó, desplazada por su posición final
  const estimate = (skill) => {
    const hs = hist.filter((x) => x.skill === skill);
    if (!hs.length) return 0;
    const okLv = hs.filter((x) => x.ok).map((x) => x.li);
    const best = okLv.length ? Math.max(...okLv) : 0;
    return Math.round((best + pos[skill]) / 2 - (okLv.length ? 0 : 0.5) + 0.01);
  };
  const done = started && hist.length >= TOTAL;
  const res = done ? Object.fromEntries(PLAN.map((s) => [s, Math.max(0, Math.min(3, estimate(s)))])) : null;
  const global = res ? LEVELS[Math.round(Object.values(res).sort((a, b) => a - b)[1])] : null;
  React.useEffect(() => {
    if (done) setDele({ diag: { t: Date.now(), nivel: global, destrezas: Object.fromEntries(Object.entries(res).map(([k, v]) => [k, LEVELS[v]])) } });
  }, [done]);

  return (
    <LightShell>
      <div className="ui-page">
        <SectionHero eyebrow="Diagnóstico · 水平测试" title="¿Cuál es tu nivel?" titleZh="5分钟测出你的西班牙语水平" description="15 preguntas que se adaptan a ti: si aciertas, sube la dificultad; si fallas, baja. Al final te decimos tu nivel por destreza y por dónde empezar." descriptionZh="题目会根据你的回答自动调整难度，最后给出各项能力的水平和学习起点。" />
        <div className="dg-card">
          {!started ? (
            <div className="dg-start">
              <img src="./mono/saluda.png" alt="" />
              <p>Vocabulario · Gramática · Audición — A1 → B2</p>
              <button className="wel-btn red" disabled={!pools} onClick={() => (setStarted(true), next(pos, []))}>
                {pools ? "Empezar el diagnóstico · 开始测试" : "Preparando… · 准备中…"}
              </button>
            </div>
          ) : done ? (
            <div className="dg-result">
              <img src="./mono/trofeo.png" alt="" />
              <h2>
                Tu nivel: <b>{global}</b>
              </h2>
              <div className="dg-skills">
                {PLAN.map((s) => (
                  <div key={s} className="dg-skill">
                    <span>{SKILLS[s].es}</span>
                    <small>{SKILLS[s].zh}</small>
                    <b>{LEVELS[res[s]]}</b>
                  </div>
                ))}
              </div>
              <div className="dg-actions">
                <button className="wel-btn red" onClick={() => navigate(`/ruta?nivel=${global}`)}>
                  Empezar en {global} · 从{global}开始
                </button>
                <button className="wel-btn cream" onClick={() => navigate("/mi-dele")}>
                  Ver mi panel DELE · 我的DELE
                </button>
              </div>
            </div>
          ) : item ? (
            <div className="dg-q">
              <div className="pp-bar">
                <i className="pp-bar-fill" style={{ width: `${(hist.length / TOTAL) * 100}%` }} />
              </div>
              <div className="dg-meta">
                {hist.length + 1}/{TOTAL} · {SKILLS[item.skill].es} · {LEVELS[item.li]}
              </div>
              <h3>{item.prompt}</h3>
              {item.promptZh && <p className="dg-zh">{item.promptZh}</p>}
              {item.speak && (
                <button className="pp-btn-sound" onClick={() => speak(item.speak, 0.85)}>
                  <Volume2Icon size={18} /> Escuchar otra vez · 再听
                </button>
              )}
              <div className="dg-opts">
                {item.options.map((o, i) => (
                  <button key={i} className={`dg-opt ${picked == null ? "" : i === item.answer ? "ok" : i === picked ? "bad" : "off"}`} onClick={() => answer(i)}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </LightShell>
  );
}
