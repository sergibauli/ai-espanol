import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon, Volume2Icon, LanguagesIcon, PlayIcon, PauseIcon, ChevronRightIcon, RotateCcwIcon } from "lucide-react";
import { sfx, speakWait, stopSpeak, confetti, audioProgress } from "./fx.js";
import { addXp } from "../../lib/gamification.js";
import { CAST } from "./StoryPlayer.jsx";
import { temaDeDialogo, fondoDe, repartoDe, visemas } from "../../lib/dialogoEscena.js";
import "../../styles/dialogo.css";

// Posiciones de la cara (en % del ancho del escenario) según cuántos personajes hablan
const POS = { 1: [50], 2: [25, 76], 3: [18, 50, 82], 4: [13, 38, 62, 87] };
// Alto de la cabeza en el escenario (% del alto) y altura a la que empieza
const CABEZA = 15;
const ARRIBA = 11;

/** Personaje ilustrado en capas: imagen, boca (interior), mandíbula que baja al hablar y párpados. */
function Actor({ a, flip }) {
  const b = a.boca;
  const menton = b.y + a.cabeza * 0.32;
  const mascara = `linear-gradient(to bottom, transparent ${b.y - 0.15}%, #000 ${b.y + 0.35}%), radial-gradient(${b.w * 1.25}% ${(menton - b.y) * 0.95}% at ${b.x}% ${(b.y + menton) / 2}%, #000 62%, transparent 100%)`;
  const src = `./dialogo/${a.img}.webp`;
  return (
    <div className={`dlg-pj ${flip ? "flip" : ""}`} style={{ aspectRatio: `${a.w} / 1200`, "--mand": b.mandibula }}>
      <img className="dlg-pj-base" src={src} alt="" draggable={false} />
      <i className="dlg-boca" style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w * 0.78}%`, "--labio": b.labio }} />
      <img className="dlg-pj-mandibula" src={src} alt="" draggable={false} style={{ WebkitMaskImage: mascara, maskImage: mascara }} />
      {a.ojos.map((o, k) => (
        <i key={k} className="dlg-parpado" style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${a.ojo[0]}%`, height: `${a.ojo[1] * 1.5}%`, "--piel": o.piel }} />
      ))}
    </div>
  );
}

/** Escenario de los diálogos de una unidad: fondo ilustrado, personajes a ambos lados que hablan por turnos
 *  con la boca sincronizada con la voz, cuadro de diálogo y guion con traducción por frase. */
export function DialogStage({ story, onClose }) {
  const lineas = story.lineas;
  const fondo = React.useMemo(() => fondoDe(temaDeDialogo(story.titulo, lineas.map((l) => l.es).join(" "))), [story, lineas]);
  const reparto = React.useMemo(() => {
    const nombres = [...new Set(lineas.filter((l) => l.quien !== "narrador").map((l) => l.nombre))].slice(0, 4);
    const voz = Object.fromEntries(lineas.map((l) => [l.nombre, CAST[l.quien]?.voice === "f"]));
    const pos = POS[nombres.length] || POS[2];
    return repartoDe(nombres, (n) => voz[n]).map((a, i) => ({ ...a, x: pos[i], lado: pos[i] < 50 ? "izq" : pos[i] > 50 ? "der" : "centro" }));
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
  const stageRef = React.useRef(null);

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

  // Al abrir (tras el telón): primera frase
  React.useEffect(() => {
    const t = ++token.current;
    const id = setTimeout(() => say(0, t), 1500);
    return () => clearTimeout(id);
  }, [say]);

  React.useEffect(() => {
    const el = guionRef.current?.querySelector(`[data-i="${playing >= 0 ? playing : shown - 1}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [shown, playing]);

  // Sincronía labial: la mandíbula del que habla sigue las vocales de la frase al ritmo real del audio
  React.useEffect(() => {
    if (playing < 0) return;
    const l = lineas[playing];
    const el = stageRef.current?.querySelector(`.dlg-actor[data-n="${CSS.escape(l.nombre)}"]`);
    if (!el) return;
    const vis = visemas(l.es);
    const t0 = performance.now();
    const estimado = Math.max(1200, l.es.length * 78);
    let raf = 0;
    let abre = 0;
    let red = 0;
    const tick = () => {
      const p = audioProgress() ?? (performance.now() - t0) / estimado;
      const [ta, tr] = p >= 1 ? [0, 0] : vis[Math.min(vis.length - 1, Math.floor(p * vis.length))];
      abre += (ta - abre) * 0.45;
      red += (tr - red) * 0.35;
      el.style.setProperty("--abre", abre.toFixed(3));
      el.style.setProperty("--red", red.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--abre", "0");
      el.style.setProperty("--red", "0");
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
  const ademan = (es) => (/\?/.test(es) ? "pregunta" : /!/.test(es) ? "exclama" : "explica");

  return createPortal(
    <div className="lp-root dlg" role="dialog" aria-modal="true" aria-label={story.titulo}>
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
          <div className="dlg-stage" ref={stageRef} style={{ backgroundImage: `url(./dialogo/${fondo.img}.webp)` }}>
            <div className="dlg-embers" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, k) => (
                <i key={k} style={{ left: `${(k * 53) % 100}%`, animationDelay: `${(k * 0.73) % 6}s`, animationDuration: `${6 + (k % 5)}s` }} />
              ))}
            </div>
            {hablante && !done && <div className="dlg-spot" style={{ left: `${hablante.x}%` }} aria-hidden="true" />}

            {reparto.map((a) => {
              const habla = playing >= 0 && hablante?.nombre === a.nombre;
              const turno = hablante?.nombre === a.nombre;
              // Voltea la imagen para que mire (y gesticule) hacia el centro
              const flip = (a.lado === "izq" && a.mira === "izq") || (a.lado === "der" && a.mira === "der");
              const caraX = flip ? 100 - a.cara : a.cara;
              return (
                <div
                  key={a.nombre}
                  data-n={a.nombre}
                  className={`dlg-actor ${a.lado} ${habla ? `talk a-${ademan(lActual.es)}` : ""} ${turno ? "turn" : "idle"}`}
                  style={{ left: `${a.x}%`, top: `${ARRIBA}cqh`, height: `${(CABEZA * 100) / a.cabeza}cqh`, translate: `-${caraX}% 0`, "--parpadeo": `${3.4 + (a.nombre.length % 5) * 0.55}s` }}
                >
                  <div className="dlg-figure">
                    <Actor a={a} flip={flip} />
                  </div>
                </div>
              );
            })}

            {lActual && !done && (
              <div key={actual} className={`dlg-balloon ${hablante?.lado || "centro"} ${playing === actual ? "live" : ""}`} style={{ "--x": `${hablante?.x ?? 50}%` }} onClick={() => replay(actual)}>
                <span className="dlg-balloon-name">{lActual.nombre}</span>
                <p>{lActual.es}</p>
                {(tradTodo || trad.has(actual)) && <p className="dlg-zh">{lActual.zh}</p>}
              </div>
            )}
            <div className="dlg-drape l" aria-hidden="true" />
            <div className="dlg-drape r" aria-hidden="true" />
          </div>
        </section>

        <section className="dlg-script" ref={guionRef}>
          <div className="dlg-script-title">
            <b translate="no">{story.tituloZh}</b>
            <span>{story.titulo}</span>
            <small>
              {fondo.es} · {fondo.zh}
            </small>
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
                <div className="dlg-line-av">{a && <img src={`./dialogo/cara-${a.id}.webp`} alt="" />}</div>
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
