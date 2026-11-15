import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon, Volume2Icon, LanguagesIcon, PlayIcon, PauseIcon, ChevronRightIcon, RotateCcwIcon } from "lucide-react";
import { Personaje, CabezaPersonaje, rasgos, tunicaN, NUM_TUNICAS, gestoDe, emocionDe, visemas } from "./Personaje.jsx";
import { sfx, speakWait, stopSpeak, confetti, audioProgress } from "./fx.js";
import { addXp } from "../../lib/gamification.js";
import { CAST } from "./StoryPlayer.jsx";
import { DialogScene, temaDeDialogo, NOMBRE_TEMA } from "./DialogScenes.jsx";
import "../../styles/dialogo.css";

// Posiciones (en % del ancho del escenario) según cuántos personajes hablan
const POS = { 1: [50], 2: [23, 77], 3: [17, 50, 83], 4: [12, 37, 63, 88] };

/** Escenario teatral de los diálogos de una unidad: decorado según el tema, personajes a ambos lados
 *  que hablan por turnos, bocadillo sincronizado con la voz y guion con traducción por frase. */
export function DialogStage({ story, onClose }) {
  const lineas = story.lineas;
  const tema = React.useMemo(() => temaDeDialogo(story.titulo, lineas.map((l) => l.es).join(" ")), [story, lineas]);
  const reparto = React.useMemo(() => {
    const orden = [...new Set(lineas.filter((l) => l.quien !== "narrador").map((l) => l.nombre))].slice(0, 4);
    const pos = POS[orden.length] || POS[2];
    const usadas = new Set();
    return orden.map((nombre, i) => {
      const l = lineas.find((x) => x.nombre === nombre);
      const c = CAST[l.quien] || {};
      const r = rasgos(nombre, c.voice === "f", i);
      // Cada personaje con una túnica distinta
      let t = 0;
      while (usadas.has(r.tunica.robe) && t < NUM_TUNICAS) r.tunica = tunicaN(NUM_TUNICAS + t++ + i);
      usadas.add(r.tunica.robe);
      return { nombre, quien: l.quien, voice: c.voice, r, x: pos[i], lado: pos[i] < 50 ? "izq" : pos[i] > 50 ? "der" : "centro" };
    });
  }, [lineas]);
  const actor = (nombre) => reparto.find((r) => r.nombre === nombre);

  const [shown, setShown] = React.useState(1);
  const [playing, setPlaying] = React.useState(-1); // frase que suena
  const [auto, setAuto] = React.useState(false);
  const [trad, setTrad] = React.useState(() => new Set());
  const [tradTodo, setTradTodo] = React.useState(false);
  const [done, setDone] = React.useState(null);
  const token = React.useRef(0);
  const guionRef = React.useRef(null);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      token.current++;
      stopSpeak();
    };
  }, []);

  const say = React.useCallback(
    async (i, t) => {
      const l = lineas[i];
      setPlaying(i);
      await speakWait(l.es, 0.92, CAST[l.quien]?.voice);
      if (token.current === t) setPlaying(-1);
      return token.current === t;
    },
    [lineas],
  );

  // Al abrir: primera frase
  React.useEffect(() => {
    const t = ++token.current;
    const id = setTimeout(() => say(0, t), 450);
    return () => clearTimeout(id);
  }, [say]);

  React.useEffect(() => {
    const el = guionRef.current?.querySelector(`[data-i="${playing >= 0 ? playing : shown - 1}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [shown, playing]);

  // Sincronía labial: la boca del que habla sigue los visemas de la frase al ritmo real del audio
  const stageRef = React.useRef(null);
  React.useEffect(() => {
    if (playing < 0) return;
    const l = lineas[playing];
    const svg = stageRef.current?.querySelector(`.dlg-actor[data-n="${CSS.escape(l.nombre)}"] svg.pj`);
    if (!svg) return;
    const vis = visemas(l.es);
    const t0 = performance.now();
    const estimado = Math.max(1200, l.es.length * 78);
    let raf = 0;
    let prev = "";
    const tick = () => {
      const p = audioProgress() ?? (performance.now() - t0) / estimado;
      const v = p >= 1 ? "r" : vis[Math.min(vis.length - 1, Math.floor(p * vis.length))];
      if (v !== prev) svg.dataset.v = prev = v;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      svg.dataset.v = "r";
    };
  }, [playing, lineas]);

  const finish = () => {
    stopSpeak();
    const r = addXp(15, { lessonId: `story-${story.modulo}` });
    sfx("win");
    confetti();
    setDone(r);
  };

  const next = () => {
    if (shown < lineas.length) {
      sfx("tap");
      const t = ++token.current;
      setAuto(false);
      setShown(shown + 1);
      say(shown, t);
    } else finish();
  };

  const replay = (i) => {
    const t = ++token.current;
    setAuto(false);
    say(i, t);
  };

  const playAll = async () => {
    if (auto) {
      token.current++;
      stopSpeak();
      setAuto(false);
      setPlaying(-1);
      return;
    }
    const t = ++token.current;
    setAuto(true);
    const desde = shown >= lineas.length ? 0 : Math.max(0, shown - 1);
    if (desde === 0 && shown >= lineas.length) setShown(lineas.length);
    for (let i = desde; i < lineas.length; i++) {
      if (token.current !== t) return;
      setShown((n) => Math.max(n, i + 1));
      const ok = await say(i, t);
      if (!ok) return;
      await new Promise((r) => setTimeout(r, 380));
    }
    if (token.current === t) setAuto(false);
  };

  const toggleTrad = (i) =>
    setTrad((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  const actual = playing >= 0 ? playing : shown - 1;
  const lActual = lineas[actual];
  const hablante = lActual && actor(lActual.nombre);
  const fin = shown >= lineas.length;
  const [temaEs, temaZh] = NOMBRE_TEMA[tema];

  return createPortal(
    <div className={`lp-root dlg dlg-${tema}`} role="dialog" aria-modal="true" aria-label={story.titulo}>
      <header className="dlg-top">
        <button className="dlg-icon" onClick={onClose} aria-label="Salir · 退出">
          <XIcon size={22} />
        </button>
        <div className="dlg-seals" aria-label={`${shown} / ${lineas.length}`}>
          {lineas.map((_, i) => (
            <i key={i} className={`${i < shown ? "on" : ""} ${i === playing ? "now" : ""}`} />
          ))}
        </div>
        <button className={`dlg-icon ${tradTodo ? "on" : ""}`} onClick={() => setTradTodo((v) => !v)} aria-label="Traducción · 翻译" title="Traducción · 翻译">
          <LanguagesIcon size={22} />
        </button>
      </header>

      <div className="dlg-body">
        <section className="dlg-theatre">
          <div className="dlg-stage" ref={stageRef}>
            <DialogScene tema={tema} />
            <div className="dlg-clouds" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="dlg-embers" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, k) => (
                <i key={k} style={{ left: `${(k * 53) % 100}%`, animationDelay: `${(k * 0.73) % 6}s`, animationDuration: `${6 + (k % 5)}s` }} />
              ))}
            </div>
            {hablante && !done && <div className="dlg-spot" style={{ left: `${hablante.x}%` }} aria-hidden="true" />}
            <div className="dlg-valance" aria-hidden="true">
              <span className="dlg-tassel l" />
              <span className="dlg-tassel r" />
            </div>
            <div className="dlg-drape l" aria-hidden="true" />
            <div className="dlg-drape r" aria-hidden="true" />
            <div className="dlg-curtain l" aria-hidden="true" />
            <div className="dlg-curtain r" aria-hidden="true" />
            <div className="dlg-plaque">
              <b translate="no">{story.tituloZh}</b>
              <span>{story.titulo}</span>
              <small>
                {temaEs} · <span>{temaZh}</span>
              </small>
            </div>

            {reparto.map((r) => {
              const habla = playing >= 0 && hablante?.nombre === r.nombre;
              const turno = hablante?.nombre === r.nombre;
              const gesto = habla ? gestoDe(lActual.es) : turno ? "reposo" : "escucha";
              const emo = turno && lActual ? emocionDe(lActual.es) : "neutra";
              return (
                <div
                  key={r.nombre}
                  data-n={r.nombre}
                  className={`dlg-actor ${r.lado} ${habla ? "talk" : ""} ${turno ? "turn" : "idle"} g-${gesto} e-${emo}`}
                  style={{ left: `${r.x}%`, "--mira": hablante && hablante.nombre !== r.nombre ? (hablante.x > r.x) === (r.lado !== "der") ? "4px" : "-4px" : "0px" }}
                >
                  <div className="dlg-waves" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="dlg-figure">
                    <Personaje r={r.r} />
                  </div>
                  <span className="dlg-name">
                    {r.nombre}
                  </span>
                </div>
              );
            })}

            {lActual && !done && (
              <div key={actual} className={`dlg-balloon ${hablante?.lado || "centro"} ${playing === actual ? "live" : ""}`} style={{ "--x": `${hablante?.x ?? 50}%` }} onClick={() => replay(actual)}>
                <p>{lActual.es}</p>
                {(tradTodo || trad.has(actual)) && <p className="dlg-zh">{lActual.zh}</p>}
              </div>
            )}
          </div>
        </section>

        <section className="dlg-script" ref={guionRef}>
          <div className="dlg-script-title">
            <b translate="no">{story.tituloZh}</b>
            <span>{story.titulo}</span>
          </div>
          <div className="dlg-script-head">
            <span className="dlg-seal-mini" translate="no">
              剧本
            </span>
            Guion · 对话
          </div>
          {lineas.slice(0, shown).map((l, i) => {
            const a = actor(l.nombre);
            const lado = a?.lado === "der" ? "der" : "izq";
            const abierto = tradTodo || trad.has(i);
            return (
              <div key={i} data-i={i} className={`dlg-line ${lado} ${i === playing ? "live" : ""} ${i === actual ? "cur" : ""}`}>
                <div className="dlg-line-av">
                  {a && <CabezaPersonaje r={a.r} />}
                </div>
                <div className="dlg-line-box">
                  <div className="dlg-line-who">
                    <b>{l.nombre}</b>
                    {i === playing && (
                      <span className="dlg-eq" aria-label="Sonando · 播放中">
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                  </div>
                  <button className="dlg-line-es" onClick={() => replay(i)}>
                    {l.es}
                  </button>
                  <div className={`dlg-line-zh ${abierto ? "open" : ""}`}>
                    <div>{l.zh}</div>
                  </div>
                  <div className="dlg-line-tools">
                    <button onClick={() => replay(i)} aria-label="Escuchar · 听">
                      <Volume2Icon size={15} /> Escuchar · 听
                    </button>
                    {!tradTodo && (
                      <button className={trad.has(i) ? "on" : ""} onClick={() => toggleTrad(i)} aria-expanded={abierto}>
                        <LanguagesIcon size={15} /> {trad.has(i) ? "Ocultar · 隐藏" : "Traducción · 翻译"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {done && (
            <div className="dlg-done">
              <div className="dlg-done-seal" translate="no">
                完成
              </div>
              <h3>¡Diálogo completado!</h3>
              <p>对话完成！ +15 XP</p>
            </div>
          )}
        </section>
      </div>

      <footer className="dlg-foot">
        {done ? (
          <button className="dlg-btn gold" onClick={onClose}>
            Continuar · 继续
          </button>
        ) : (
          <>
            <button className={`dlg-btn ghost ${auto ? "on" : ""}`} onClick={playAll}>
              {auto ? <PauseIcon size={18} /> : fin ? <RotateCcwIcon size={18} /> : <PlayIcon size={18} />}
              <span>{auto ? "Pausa · 暂停" : fin ? "Escuchar todo · 全部重听" : "Reproducir todo · 全部播放"}</span>
            </button>
            <button className="dlg-btn" onClick={next}>
              <span>{fin ? "Terminar · 完成" : "Siguiente · 下一句"}</span>
              <ChevronRightIcon size={20} />
            </button>
          </>
        )}
      </footer>
    </div>,
    document.body,
  );
}
