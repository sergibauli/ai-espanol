// v23 · Vocabulario de la clase en tarjetas: emoji (o sello con la inicial), palabra, chino, audio y frase de ejemplo.
// «Modo repaso» tapa el chino para ponerse a prueba: tocar la tarjeta lo descubre.
import * as React from "react";
import { Volume2Icon, EyeIcon, EyeOffIcon } from "lucide-react";
import { speak } from "../lesson/fx.js";
import VOCAB_EMOJI from "../../data/vocab-emoji.json";

const MIN = Object.fromEntries(Object.entries(VOCAB_EMOJI).map(([k, v]) => [k.toLowerCase(), v]));
const sinArticulo = (w) => w.replace(/^(el|la|los|las|un|una)\s+/i, "");
export function emojiDe(palabra) {
  const w = String(palabra || "").trim();
  return VOCAB_EMOJI[w] || MIN[w.toLowerCase()] || MIN[sinArticulo(w).toLowerCase()] || null;
}

function Tarjeta({ v, i, repaso }) {
  const [visto, setVisto] = React.useState(false);
  React.useEffect(() => setVisto(false), [repaso]);
  const emoji = emojiDe(v.espanol);
  const tapado = repaso && !visto;
  return (
    <div
      className={`ud-palabra ${tapado ? "tapada" : ""}`}
      style={{ "--i": i }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
        e.currentTarget.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
        e.currentTarget.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.removeProperty("--rx");
        e.currentTarget.style.removeProperty("--ry");
      }}
    >
      <span className="ud-palabra-sello" aria-hidden="true" translate="no">
        {String(i + 1).padStart(2, "0")}
      </span>
      <button
        type="button"
        className="ud-palabra-main"
        onClick={() => {
          speak(v.espanol);
          setVisto(true);
        }}
        aria-label={`Escuchar ${v.espanol}`}
      >
        <span className={`ud-palabra-pic ${emoji ? "" : "inicial"}`} aria-hidden="true" translate="no">
          {emoji || sinArticulo(v.espanol).charAt(0).toUpperCase()}
        </span>
        <span className="ud-palabra-txt">
          <b>{v.espanol}</b>
          <span className="ud-palabra-zh" lang="zh">
            {v.chino}
          </span>
        </span>
        <span className="ud-palabra-audio" aria-hidden="true">
          <Volume2Icon size={17} />
        </span>
      </button>
      {v.ejemplo && (
        <button type="button" className="ud-palabra-ej" onClick={() => speak(v.ejemplo)}>
          «{v.ejemplo}»
        </button>
      )}
    </div>
  );
}

export function PalabrasUnidad({ vocabulario = [], clase, varias }) {
  const [repaso, setRepaso] = React.useState(false);
  const [todas, setTodas] = React.useState(false);
  const limite = 24;
  const lista = todas ? vocabulario : vocabulario.slice(0, limite);
  if (!vocabulario.length) return <p className="ud-vacio">Esta clase no tiene palabras nuevas · 本课没有新词</p>;
  return (
    <div className="ud-palabras-zona">
      <div className="ud-barra">
        <span className="ud-barra-info">
          <b>{vocabulario.length}</b> {varias ? `palabras de la clase ${clase}` : "palabras"} · <span lang="zh">词汇</span>
        </span>
        <button type="button" className={`ud-interruptor ${repaso ? "on" : ""}`} onClick={() => setRepaso((r) => !r)} aria-pressed={repaso}>
          {repaso ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />} Modo repaso · <span lang="zh">复习</span>
        </button>
      </div>
      <div className="ud-palabras">
        {lista.map((v, i) => (
          <Tarjeta key={v.id || v.espanol} v={v} i={i} repaso={repaso} />
        ))}
      </div>
      {vocabulario.length > limite && (
        <button type="button" className="ud-mas" onClick={() => setTodas((x) => !x)}>
          {todas ? "Ver menos" : `Ver las ${vocabulario.length} palabras`}
        </button>
      )}
    </div>
  );
}
