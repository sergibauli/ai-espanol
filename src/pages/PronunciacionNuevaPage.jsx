import * as React from "react";
import { Link } from "react-router";
import { Volume2Icon, PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { speak } from "../components/lesson/fx.js";
import FAMILIAS from "../data/pronunciacion.json";

// Pronunciación: familias de sílabas del español con ejemplo, consejo en chino y audio
export default function PronunciacionNuevaPage() {
  const [solo, setSolo] = React.useState(false);
  const [open, setOpen] = React.useState(() => FAMILIAS.find((f) => f.dificil)?.id);
  const [heard, setHeard] = React.useState(() => new Set());
  const list = FAMILIAS.filter((f) => !solo || f.dificil);
  const fam = FAMILIAS.find((f) => f.id === open) || list[0];
  const play = (t) => {
    speak(t, 0.85);
    setHeard((h) => new Set(h).add(t));
  };

  return (
    <LightShell>
      <div className="unit-page pron-sheet" style={{ maxWidth: 1080 }}>
        <section className="imperial-hero pron-hero">
          <span className="imperial-cloud c1" />
          <span className="imperial-cloud c2" />
          <div className="imperial-hero-text">
            <small>发音 · PRONUNCIACIÓN</small>
            <h1>El templo de los sonidos</h1>
            <p>21 familias de sílabas · escucha, repite y fíjate en las marcadas con 🐉: son las más difíciles para hablantes de chino.</p>
            <div className="ui-row" style={{ marginTop: 14 }}>
              <Link to="/pronunciacion/templo" className="btn3d" style={{ "--c": "#f2c14e", "--d": "#c8961e", color: "#5a0a16", padding: "11px 16px", textDecoration: "none" }}>
                🎮 Jugar al Templo de las Sílabas
              </Link>
            </div>
          </div>
          <div className="imperial-hero-art">
            <Emoji3D emoji="🗣️" size={84} float />
            <span className="pron-hero-zh">声音殿堂</span>
          </div>
        </section>

        <div className="pron-filter">
          <button className={!solo ? "on" : ""} onClick={() => setSolo(false)}>
            Todas · 全部 ({FAMILIAS.length})
          </button>
          <button className={solo ? "on" : ""} onClick={() => setSolo(true)}>
            🐉 Difíciles para chinos · 难点 ({FAMILIAS.filter((f) => f.dificil).length})
          </button>
        </div>

        <div className="pron-layout">
          <div className="pron-families">
            {list.map((f) => (
              <button key={f.id} className={`pron-fam ${fam?.id === f.id ? "on" : ""} ${f.dificil ? "hard" : ""}`} onClick={() => setOpen(f.id)}>
                <b>{f.silabas.map((s) => s.s)[0].replace(/[aeiou]+$/, "") || f.id}</b>
                <small>{f.titulo}</small>
                {f.dificil && <i className="pron-dot" title="Difícil para hablantes de chino" />}
              </button>
            ))}
          </div>

          {fam && (
            <section className="pron-panel">
              <div className="ui-between" style={{ alignItems: "flex-start" }}>
                <div>
                  <h2 className="unit-h2" style={{ margin: 0 }}>
                    {fam.titulo} <small>{fam.tituloZh}</small>
                  </h2>
                  {fam.dificil && <span className="pron-badge">🐉 Sonido difícil para hablantes de chino · 中国学生难点</span>}
                </div>
              </div>
              <div className="pron-tip">
                <Emoji3D emoji="💡" size={36} />
                <p>{fam.consejoZh}</p>
              </div>
              <div className="pron-grid">
                {fam.silabas.map((s) => (
                  <div key={s.s} className={`pron-card ${heard.has(s.s) ? "heard" : ""}`}>
                    <button className="pron-syl" onClick={() => play(s.s)}>
                      {s.s}
                      <Volume2Icon size={18} />
                    </button>
                    <button className="pron-word" onClick={() => play(s.ej)}>
                      <b>{s.ej}</b>
                      <small>{s.ejZh}</small>
                    </button>
                  </div>
                ))}
              </div>
              <button className="btn3d pron-all" style={{ "--c": "#c8102e", "--d": "#8f0c21" }} onClick={() => fam.silabas.forEach((s, i) => setTimeout(() => play(s.s), i * 1100))}>
                ▶ Escuchar toda la familia · 连续播放
              </button>
            </section>
          )}
        </div>

        <div className="pron-player" aria-label="Reproductor de familias">
          <button aria-label="Familia anterior" onClick={() => setOpen(list[(list.indexOf(fam) - 1 + list.length) % list.length].id)}>
            <SkipBackIcon size={20} fill="currentColor" />
          </button>
          <button className="play" aria-label="Escuchar toda la familia" onClick={() => fam.silabas.forEach((s, i) => setTimeout(() => play(s.s), i * 1100))}>
            <PlayIcon size={26} fill="currentColor" />
          </button>
          <button aria-label="Familia siguiente" onClick={() => setOpen(list[(list.indexOf(fam) + 1) % list.length].id)}>
            <SkipForwardIcon size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </LightShell>
  );
}
