import * as React from "react";
import { PlayIcon, CheckIcon } from "lucide-react";
import { isLessonDone } from "../../lib/gamification.js";
import { esMujer } from "../../lib/lessons.js";
import { temaDeDialogo, fondoDe, repartoDe } from "../../lib/dialogoEscena.js";
import "../../styles/dialogo-tarjetas.css";

const ACTOS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

/** Mini escenario de la tarjeta: fondo del tema y los personajes del diálogo, de medio cuerpo, mirándose. */
function MiniEscena({ reparto, fondo }) {
  const pos = reparto.length > 2 ? [20, 50, 80] : [28, 72];
  return (
    <div className="td-escena" style={{ backgroundImage: `url(./dialogo/${fondo.img}.webp)` }}>
      {reparto.slice(0, 3).map((a, i) => {
        const lado = pos[i] < 50 ? "izq" : pos[i] > 50 ? "der" : "centro";
        const flip = (lado === "izq" && a.mira === "izq") || (lado === "der" && a.mira === "der");
        const caraX = flip ? 100 - a.cara : a.cara;
        return (
          <img
            key={a.nombre}
            className={`td-pj ${lado} ${flip ? "flip" : ""}`}
            src={`./dialogo/${a.img}.webp`}
            alt=""
            loading="lazy"
            draggable={false}
            style={{ left: `${pos[i]}%`, height: `${Math.max(3400 / a.cabeza, 110)}%`, translate: `-${caraX}% 0` }}
          />
        );
      })}
      <span className="td-play" aria-hidden="true">
        <PlayIcon size={22} fill="currentColor" />
      </span>
    </div>
  );
}

/** Lista de diálogos de la unidad en tarjetas-escena (sin emojis). */
export function TarjetasDialogo({ dialogos, numero, onAbrir }) {
  return (
    <div className="td-lista">
      {dialogos.map((d, i) => {
        const lineas = d.lineas || [];
        const nombres = [...new Set(lineas.map((l) => l.personaje))].slice(0, 3);
        const fondo = fondoDe(temaDeDialogo(d.titulo, lineas.map((l) => l.texto).join(" ")));
        const reparto = repartoDe(nombres, esMujer);
        const visto = isLessonDone(`story-${numero}-${d.id}`);
        return (
          <button key={d.id || i} type="button" className={`td-card ${visto ? "visto" : ""}`} style={{ "--i": i }} onClick={() => onAbrir(d)}>
            <MiniEscena reparto={reparto} fondo={fondo} />
            <span className="td-acto" translate="no">
              第{ACTOS[i] || i + 1}幕
            </span>
            <span className={`td-estado ${visto ? "on" : ""}`}>
              {visto ? <CheckIcon size={13} strokeWidth={3} /> : null}
              {visto ? "Visto · 已看" : "Nuevo · 新"}
            </span>
            <span className="td-info">
              <b className="td-titulo">{d.titulo}</b>
              {d.tituloChino && <span className="td-zh">{d.tituloChino}</span>}
              <span className="td-meta">
                <span className="td-caras">
                  {reparto.map((a) => (
                    <img key={a.nombre} src={`./dialogo/cara-${a.id}.webp`} alt="" loading="lazy" />
                  ))}
                </span>
                <span className="td-nombres">{nombres.join(" · ")}</span>
                <span className="td-frases">
                  {lineas.length} frases · {lineas.length} 句
                </span>
              </span>
              <span className="td-lugar">
                {fondo.es} · {fondo.zh}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
