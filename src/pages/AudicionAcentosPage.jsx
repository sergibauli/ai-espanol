import * as React from "react";
import { PlayIcon, SquareIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { recordAnswer } from "../lib/progresoDele.js";
import DIALOGOS from "../data/audicion-acentos.json";

// Audición con acentos reales (España, México, Argentina): como en el DELE, se escucha dos veces y luego se responde
const PAIS = { España: { zh: "西班牙", c: "#c8102e" }, México: { zh: "墨西哥", c: "#2f8f52" }, Argentina: { zh: "阿根廷", c: "#2f6fd6" } };
const MAX = 2;

function Dialogo({ d, onBack }) {
  const [vez, setVez] = React.useState(0);
  const [linea, setLinea] = React.useState(-1);
  const [resp, setResp] = React.useState({});
  const [corregido, setCorregido] = React.useState(false);
  const audio = React.useRef(null);
  const parar = () => {
    audio.current?.pause();
    audio.current = null;
    setLinea(-1);
  };
  React.useEffect(() => parar, []);
  const tocar = (i = 0) => {
    if (i >= d.lineas.length) return setLinea(-1);
    setLinea(i);
    const a = new Audio(`./${d.lineas[i].audio}`);
    audio.current = a;
    a.onended = () => audio.current === a && setTimeout(() => tocar(i + 1), 350);
    a.play().catch(() => setLinea(-1));
  };
  const escuchar = () => {
    if (linea >= 0) return parar();
    if (vez >= MAX && !corregido) return;
    setVez((v) => v + 1);
    tocar(0);
  };
  const corregir = () => {
    setCorregido(true);
    d.preguntas.forEach((q, i) => recordAnswer({ skill: "audicion", level: d.nivel, ok: resp[i] === q.correcta, src: `audición ${d.acento}`, error: { prompt: q.pregunta, given: q.opciones[resp[i]], correct: q.opciones[q.correcta], options: q.opciones, answer: q.correcta, type: "choice" } }));
  };
  const aciertos = d.preguntas.filter((q, i) => resp[i] === q.correcta).length;
  return (
    <div className="au-card">
      <button className="au-back" onClick={onBack}>
        ← Todos los audios · 返回
      </button>
      <div className="au-head">
        <span className="au-pais" style={{ "--c": PAIS[d.acento].c }}>
          {d.acento} · {PAIS[d.acento].zh}
        </span>
        <span className="au-nivel">{d.nivel}</span>
      </div>
      <h2>
        {d.titulo} <small>{d.tituloZh}</small>
      </h2>
      <p className="au-ctx">
        {d.contexto}
        <small>{d.contextoZh}</small>
      </p>
      <button className={`au-play ${linea >= 0 ? "on" : ""}`} onClick={escuchar} disabled={vez >= MAX && linea < 0 && !corregido}>
        {linea >= 0 ? <SquareIcon size={22} /> : <PlayIcon size={22} fill="currentColor" />}
        {linea >= 0 ? `Escuchando… ${linea + 1}/${d.lineas.length}` : vez >= MAX && !corregido ? "Ya has escuchado 2 veces · 已听两遍" : `Escuchar (${vez}/${MAX}) · 播放`}
      </button>
      <div className="au-qs">
        {d.preguntas.map((q, i) => (
          <div key={i} className="au-q">
            <b>
              {i + 1}. {q.pregunta}
            </b>
            <small>{q.preguntaZh}</small>
            <div className="au-ops">
              {q.opciones.map((o, k) => (
                <button key={k} className={`au-op ${resp[i] === k ? "on" : ""} ${corregido ? (k === q.correcta ? "ok" : resp[i] === k ? "bad" : "") : ""}`} disabled={corregido} onClick={() => setResp((r) => ({ ...r, [i]: k }))}>
                  {"abc"[k]}) {o}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!corregido ? (
        <button className="wel-btn red au-check" disabled={Object.keys(resp).length < d.preguntas.length} onClick={corregir}>
          Corregir · 批改
        </button>
      ) : (
        <>
          <p className="au-score">
            {aciertos}/{d.preguntas.length} correctas · 正确
          </p>
          <h3>Transcripción · 原文</h3>
          <div className="au-trans">
            {d.lineas.map((l, i) => (
              <p key={i} className={linea === i ? "on" : ""} onClick={() => (parar(), tocar(i))}>
                <b>{l.quien}:</b> {l.es}
                <small>{l.zh}</small>
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AudicionAcentosPage() {
  const [sel, setSel] = React.useState(null);
  const d = DIALOGOS.find((x) => x.id === sel);
  return (
    <LightShell>
      <div className="ui-page">
        <SectionHero eyebrow="Audición · 听力" title="Acentos del español" titleZh="西班牙、墨西哥、阿根廷口音" description="En el DELE B1 y B2 oirás acentos de España y de América. Practica con voces reales de cada país: escucha dos veces, responde y después mira la transcripción." descriptionZh="DELE B1、B2会出现不同国家的口音。听两遍，作答，然后看原文。" />
        {d ? (
          <Dialogo key={d.id} d={d} onBack={() => setSel(null)} />
        ) : (
          ["A2", "B1", "B2"].map((lv) => (
            <section key={lv}>
              <h2 className="unit-h2">{lv}</h2>
              <div className="au-grid">
                {DIALOGOS.filter((x) => x.nivel === lv).map((x) => (
                  <button key={x.id} className="au-item" onClick={() => setSel(x.id)}>
                    <span className="au-pais" style={{ "--c": PAIS[x.acento].c }}>
                      {x.acento} · {PAIS[x.acento].zh}
                    </span>
                    <b>{x.titulo}</b>
                    <small>{x.tituloZh}</small>
                  </button>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </LightShell>
  );
}
