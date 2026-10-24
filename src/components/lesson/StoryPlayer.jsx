import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon, Volume2Icon, LanguagesIcon } from "lucide-react";
import { Emoji3D } from "../ui/Emoji3D.jsx";
import { sfx, speak, confetti } from "./fx.js";
import { addXp } from "../../lib/gamification.js";

// Reparto fijo de personajes de las historias
export const CAST = {
  lucia: { name: "Lucía", emoji: "👩‍🦰", color: "#ff7a1a", from: "Madrid" },
  liwei: { name: "Li Wei", emoji: "👨", color: "#1cb0f6", from: "上海" },
  carlos: { name: "Carlos", emoji: "🧔", color: "#58cc02", from: "México" },
  mei: { name: "Mei", emoji: "👧", color: "#ce82ff", from: "北京" },
  carmen: { name: "Carmen", emoji: "👵", color: "#ff4b8b", from: "Sevilla" },
  narrador: { name: "Narrador", emoji: "🐵", color: "#ffc800", from: "" },
};
const MOOD = { feliz: "😄", sorpresa: "😮", duda: "🤔", triste: "😢", risa: "😅", neutral: "🙂" };

/** Historia interactiva: líneas que aparecen una a una con voz + preguntas de comprensión. */
export function StoryPlayer({ story, onClose }) {
  const items = React.useMemo(() => {
    const out = [];
    story.lineas.forEach((l, i) => {
      out.push({ kind: "line", ...l });
      story.preguntas?.filter((q) => q.despues === i).forEach((q) => out.push({ kind: "q", ...q }));
    });
    return out;
  }, [story]);
  const [shown, setShown] = React.useState(1);
  const [answers, setAnswers] = React.useState({});
  const [showZh, setShowZh] = React.useState(false);
  const [done, setDone] = React.useState(null);
  const endRef = React.useRef(null);
  const last = items[shown - 1];
  const waiting = last?.kind === "q" && answers[shown - 1] !== last.correcta;

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      speechSynthesis?.cancel?.();
    };
  }, []);
  React.useEffect(() => {
    if (last?.kind === "line") speak(last.es, 0.92);
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [shown, last]);

  const next = () => {
    if (shown < items.length) {
      sfx("tap");
      setShown((n) => n + 1);
    } else {
      const r = addXp(15, { lessonId: `story-${story.modulo}` });
      sfx("win");
      confetti();
      setDone(r);
    }
  };

  return createPortal(
    <div className="lp-root story" role="dialog" aria-modal="true" aria-label={story.titulo}>
      <header className="lp-top">
        <button className="lp-close" onClick={onClose} aria-label="Salir">
          <XIcon size={22} />
        </button>
        <div className="lp-bar">
          <i style={{ width: `${done ? 100 : Math.round((shown / items.length) * 100)}%` }} />
        </div>
        <button className={`lp-close ${showZh ? "on" : ""}`} onClick={() => setShowZh((v) => !v)} aria-label="Mostrar chino" title="中文">
          <LanguagesIcon size={22} />
        </button>
      </header>
      <main className="lp-main story-main">
        <div className="story-scene">
          <Emoji3D emoji={story.escena} size={110} float />
          <h2 className="lp-title" style={{ textAlign: "center" }}>{story.titulo}</h2>
          <div className="lp-zh" style={{ textAlign: "center" }}>{story.tituloZh}</div>
        </div>
        {items.slice(0, shown).map((it, i) =>
          it.kind === "line" ? (
            it.quien === "narrador" ? (
              <div key={i} className="story-narr">
                {it.es}
                {showZh && <div className="lp-zh">{it.zh}</div>}
              </div>
            ) : (
              <div key={i} className={`story-line ${["liwei", "mei"].includes(it.quien) ? "right" : ""}`}>
                <div className="story-avatar" style={{ "--c": CAST[it.quien]?.color }}>
                  <Emoji3D emoji={CAST[it.quien]?.emoji || "🙂"} size={58} />
                  <span className="story-mood">
                    <Emoji3D emoji={MOOD[it.emocion] || "🙂"} size={24} />
                  </span>
                  <small>{CAST[it.quien]?.name}</small>
                </div>
                <button className="story-bubble" onClick={() => speak(it.es, 0.85)}>
                  <span>{it.es}</span>
                  {showZh && <span className="lp-zh">{it.zh}</span>}
                  <Volume2Icon size={15} className="story-spk" />
                </button>
              </div>
            )
          ) : (
            <div key={i} className="story-q">
              <div className="lp-eyebrow">❓ Pregunta · 问题</div>
              <b>{it.pregunta}</b>
              <div className="lp-zh">{it.preguntaZh}</div>
              <div className="lp-options">
                {it.opciones.map((o, k) => {
                  const picked = answers[i] === k;
                  return (
                    <button
                      key={k}
                      disabled={answers[i] === it.correcta}
                      className={`lp-option ${picked && k === it.correcta ? "right" : ""} ${picked && k !== it.correcta ? "wrong shake" : ""}`}
                      onClick={() => {
                        sfx(k === it.correcta ? "ok" : "bad");
                        setAnswers((a) => ({ ...a, [i]: k }));
                      }}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ),
        )}
        {done && (
          <div className="lp-center lp-end" style={{ marginTop: 20 }}>
            <Emoji3D emoji="🏆" size={120} float />
            <h2 className="lp-word" style={{ fontSize: 30 }}>¡Historia completada!</h2>
            <div className="lp-zh-big">故事完成！ +15 XP</div>
            {story.moraleja && (
              <div className="story-moral">
                <small>Frase para recordar · 记住这句话</small>
                <b>{story.moraleja.es}</b>
                <span>{story.moraleja.zh}</span>
              </div>
            )}
          </div>
        )}
        <div ref={endRef} style={{ height: 1 }} />
      </main>
      <footer className="lp-foot">
        <div className="lp-foot-inner">
          {done ? (
            <button className="lp-btn" onClick={onClose}>
              Continuar · 继续
            </button>
          ) : (
            <button className="lp-btn" disabled={waiting} onClick={next}>
              {waiting ? "Responde la pregunta · 请回答" : shown < items.length ? "Continuar · 继续" : "Terminar · 完成"}
            </button>
          )}
        </div>
      </footer>
    </div>,
    document.body,
  );
}
