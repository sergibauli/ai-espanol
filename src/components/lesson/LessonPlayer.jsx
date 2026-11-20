import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon, Volume2Icon, SnailIcon, CheckIcon, ZapIcon, TargetIcon, MicIcon } from "lucide-react";
import { Emoji3D } from "../ui/Emoji3D.jsx";
import { sfx, speak, estallido } from "./fx.js";
import { addXp, loseHeart, refillHearts, getGame } from "../../lib/gamification.js";
import { recordAnswer } from "../../lib/progresoDele.js";
import CATALOG from "../../data/modulos/catalog.json";

const levelOf = (n) => CATALOG.find((m) => m.numero === Number(n))?.nivel || "A1";
import { Pergamino, FondoCielo } from "./Pergamino.jsx";
import "../../styles/v28-ejercicios.css";
import "../../styles/v34-leccion.css";
import { BarraViaje, Corazones, Racha, NubeVoladora, SelloResultado, TintaFallo, TituloPincel, BandaSeda, FinLeccion, sinMovimiento } from "./EscenaLeccion.jsx";
import { IconoTipo, IcoBorrar, TrazoBien, TrazoMal } from "./IconosEjercicio.jsx";
import { useModalAccesible } from "../../lib/useModalAccesible.js";

const TEACH = new Set(["learn", "tip", "dialog", "speak"]);
const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[¿?¡!.,;:«»"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
const noAccents = (s) => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "");

function SpeakButtons({ text, big = false }) {
  return (
    <span className="ui-row" style={{ gap: 6 }}>
      <button className={`lp-speak ${big ? "big" : ""}`} onClick={() => speak(text)} aria-label="Escuchar">
        <Volume2Icon size={big ? 30 : 18} />
      </button>
      {big && (
        <button className="lp-speak slow" onClick={() => speak(text, 0.55)} aria-label="Escuchar despacio">
          <SnailIcon size={20} />
        </button>
      )}
    </span>
  );
}

// Pronunciación con el reconocimiento de voz del navegador: se compara lo oído con la palabra (sin tildes ni signos)
const SR = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
function parecido(a, b) {
  const x = noAccents(a);
  const y = noAccents(b);
  if (!x || !y) return 0;
  const d = Array.from({ length: x.length + 1 }, (_, i) => [i, ...Array(y.length).fill(0)]);
  for (let j = 1; j <= y.length; j++) d[0][j] = j;
  for (let i = 1; i <= x.length; i++) for (let j = 1; j <= y.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
  return 1 - d[x.length][y.length] / Math.max(x.length, y.length);
}

function Pronunciar({ texto, level, onExito, pequeno = false }) {
  const [estado, setEstado] = React.useState("listo");
  const [oido, setOido] = React.useState("");
  const boton = React.useRef(null);
  if (!SR) return null;
  const escuchar = () => {
    if (estado === "escucha") return;
    speechSynthesis?.cancel?.();
    const r = new SR();
    r.lang = "es-ES";
    r.interimResults = false;
    r.maxAlternatives = 4;
    r.onstart = () => setEstado("escucha");
    r.onerror = () => setEstado("listo");
    r.onend = () => setEstado((e) => (e === "escucha" ? "listo" : e));
    r.onresult = (e) => {
      const alts = Array.from(e.results[0], (a) => a.transcript);
      const ok = Math.max(...alts.map((a) => parecido(a, texto))) >= 0.72;
      setOido(alts[0] || "");
      setEstado(ok ? "bien" : "mal");
      sfx(ok ? "ok" : "bad");
      recordAnswer({ skill: "oral", level, ok, src: "pronunciación", error: ok ? undefined : { prompt: texto, given: alts[0], correct: texto, speak: texto, type: "speak" } });
      if (ok) {
        const r = boton.current?.getBoundingClientRect();
        if (r) estallido(r.left + r.width / 2, r.top + r.height / 2, { fuerza: pequeno ? 0.5 : 0.9 });
        onExito?.();
      }
    };
    r.start();
  };
  return (
    <div className={`lp-pron ${estado} ${pequeno ? "peq" : ""}`}>
      <button className="lp-pron-btn" ref={boton} onClick={escuchar} aria-label="Pronunciar">
        <MicIcon size={pequeno ? 16 : 22} />
        {!pequeno && <span>{estado === "escucha" ? "Te escucho… · 我在听" : "Pronuncia · 跟读"}</span>}
      </button>
      {estado === "bien" && <span className="lp-pron-sello">¡Bien dicho! · 说得好</span>}
      {estado === "mal" && !pequeno && (
        <span className="lp-pron-oido">
          He oído «{oido}» · 再试一次
        </span>
      )}
    </div>
  );
}

function Learn({ step, level, onNext }) {
  React.useEffect(() => {
    const t = setTimeout(() => speak(step.es), 350);
    return () => clearTimeout(t);
  }, [step]);
  const avance = React.useRef(null);
  React.useEffect(() => () => clearTimeout(avance.current), []);
  return (
    <div className="lp-center lx-ficha">
      <Cabecera tipo="learn" es="Palabra nueva" zh="新词" />
      <Pergamino className="lp-rollo">
        <span className="lx-halo">
          <Emoji3D emoji={step.emoji} size={96} float />
        </span>
        <TituloPincel texto={step.es} zh={step.zh} />
        <div className="lp-acciones">
          <SpeakButtons text={step.es} big />
          <Pronunciar texto={step.es} level={level} onExito={() => (avance.current = setTimeout(onNext, 1400))} />
        </div>
        {step.example && <BandaSeda>{step.example}</BandaSeda>}
      </Pergamino>
      {SR && <div className="lp-pista">Di la palabra en voz alta para pasar a la siguiente · 读出这个词就能继续</div>}
    </div>
  );
}

// «Di en voz alta»: la palabra se aprueba pronunciándola (si el navegador tiene reconocimiento de voz)
function Hablar({ step, level, onNext }) {
  const avance = React.useRef(null);
  React.useEffect(() => () => clearTimeout(avance.current), []);
  return (
    <div className="lp-center lx-ficha lx-ficha--voz">
      <Cabecera tipo="speak" es="Di en voz alta" zh="读出来" />
      <Pergamino className="lp-rollo">
        {step.emoji && (
          <span className="lx-halo">
            <Emoji3D emoji={step.emoji} size={80} float />
          </span>
        )}
        <span className="lx-ondas-voz" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <TituloPincel texto={step.es} zh={step.zh} />
        <div className="lp-acciones">
          <SpeakButtons text={step.es} big />
          <Pronunciar texto={step.es} level={level} onExito={() => (avance.current = setTimeout(onNext, 1300))} />
        </div>
      </Pergamino>
      <div className="lp-pista">Escúchala y repítela: si la dices bien, pasas sola · 听一遍再读，读对了自动继续</div>
    </div>
  );
}

function Tip({ step, level }) {
  return (
    <div className="lp-tip">
      <Cabecera tipo="tip" es="Idea clave" zh="要点" />
      <h2 className="lp-title">{step.title}</h2>
      {step.titleZh && <div className="lp-zh">{step.titleZh}</div>}
      <div className="lp-points">
        {step.points.map((p, i) => (
          <div key={i} className="lp-point" style={{ animationDelay: `${i * 120}ms` }}>
            <b>{p.es}</b>
            {p.zh && <span>{p.zh}</span>}
          </div>
        ))}
        {step.summary && (
          <div className="lp-point">
            <b>{step.summary}</b>
            {step.summaryZh && <span>{step.summaryZh}</span>}
          </div>
        )}
      </div>
      {step.examples?.map((e, i) => (
        <div key={i} className="lp-example-row">
          <SpeakButtons text={e.espanol} />
          <Pronunciar texto={e.espanol} level={level} pequeno />
          <div>
            <div style={{ fontWeight: 800 }}>{e.espanol}</div>
            <div className="lp-zh">{e.chino}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Diálogo sobre pergamino: medallón de jade por personaje y bocadillos de jade con marco de oro
function Dialog({ step, level, emoji }) {
  const caras = {};
  const cara = (who) => (caras[who] ??= Object.keys(caras).length % 2 ? "👨" : "👩");
  return (
    <div className="lp-tip lp-dialogo">
      {emoji && <Emoji3D emoji={emoji} size={92} float className="lp-dialogo__icono" />}
      <h2 className="lp-title">
        {step.title}
        <span className="lp-dialogo__sello" aria-hidden="true">对话</span>
      </h2>
      {step.titleZh && <div className="lp-dialogo__zh">{step.titleZh}</div>}
      <div className="lp-chat">
        {step.lines.map((l, i) => (
          <div key={i} className="lp-linea" style={{ animationDelay: `${i * 160}ms` }}>
            <span className="lp-linea__cara">
              <span className="lp-linea__disco">
                <Emoji3D emoji={cara(l.who)} size={40} />
              </span>
              <small>{l.who}</small>
            </span>
            <div className="lp-bubble">
              <div className="lp-bubble__texto">
                <div className="lp-bubble__es">{l.es}</div>
                {l.zh && <div className="lp-zh">{l.zh}</div>}
              </div>
              <span className="lp-bubble__voz">
                <SpeakButtons text={l.es} />
                <Pronunciar texto={l.es} level={level} pequeno />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cabecera de cada juego: icono propio del tipo + nombre en español y chino
function Cabecera({ tipo, es, zh }) {
  return (
    <div className="ej-cabecera">
      <span className="ej-cabecera__ico">
        <IconoTipo tipo={tipo} size={34} />
      </span>
      <span className="ej-cabecera__txt">
        <b>{es}</b>
        <span lang="zh">{zh}</span>
      </span>
    </div>
  );
}

// Enunciado en una tablilla con marco de oro
function Enunciado({ texto, zh, children }) {
  return (
    <div className="ej-enunciado">
      <h2 className="ej-enunciado__es">{texto}</h2>
      {zh && <div className="ej-enunciado__zh">{zh}</div>}
      {children}
    </div>
  );
}

// Clase de estado común de cada opción (elegida / correcta / incorrecta tras comprobar)
const estado = (locked, value, i, answer) => `${value === i ? "is-elegida" : ""} ${locked && i === answer ? "is-bien" : ""} ${locked && value === i && i !== answer ? "is-mal" : ""}`;

function MarcaEstado() {
  return (
    <span className="ej-marca" aria-hidden="true">
      <span className="ej-marca__bien"><TrazoBien size={22} /></span>
      <span className="ej-marca__mal"><TrazoMal size={20} /></span>
    </span>
  );
}

function Choice({ step, value, onChange, locked }) {
  React.useEffect(() => {
    if (step.type === "listen" || step.speak) {
      const t = setTimeout(() => speak(step.speak), 300);
      return () => clearTimeout(t);
    }
  }, [step]);
  const escucha = step.type === "listen";
  const [sonando, setSonando] = React.useState(0);
  React.useEffect(() => {
    if (!sonando) return;
    const t = setTimeout(() => setSonando(0), 1500);
    return () => clearTimeout(t);
  }, [sonando]);
  const tocarGong = (lento) => {
    setSonando((n) => n + 1);
    speak(step.speak, lento ? 0.55 : undefined);
  };
  return (
    <div className={`ej ej--${escucha ? "listen" : "choice"}`}>
      <Cabecera tipo={escucha ? "listen" : "choice"} es={escucha ? "Escucha y elige" : "Elige la respuesta"} zh={escucha ? "听音选择" : "选择正确答案"} />
      {escucha ? (
        <div className={`ej-gong ${sonando ? "is-sonando" : ""}`} key={sonando}>
          <button className="ej-gong__btn" onClick={() => tocarGong(false)} aria-label="Escuchar · 听">
            <span className="ej-gong__ondas" aria-hidden="true" />
            <span className="lx-gong-anillos" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <Volume2Icon size={40} />
          </button>
          <button className="ej-gong__lento" onClick={() => tocarGong(true)} aria-label="Escuchar despacio · 慢速">
            <SnailIcon size={20} />
            <span>Despacio · 慢速</span>
          </button>
        </div>
      ) : (
        <Enunciado texto={step.prompt} zh={step.promptZh}>
          {step.speak && (
            <button className="ej-oir" onClick={() => speak(step.speak)} aria-label="Escuchar · 听">
              <Volume2Icon size={18} />
            </button>
          )}
        </Enunciado>
      )}
      <div className="ej-opciones">
        {step.options.map((o, i) => (
          <button
            key={i}
            disabled={locked}
            aria-pressed={value === i}
            style={{ "--i": i }}
            className={`ej-opcion ${estado(locked, value, i, step.answer)}`}
            onClick={() => {
              sfx("tap");
              onChange(i);
            }}
          >
            <span className="ej-moneda">{i + 1}</span>
            <span className="ej-opcion__txt">{o}</span>
            <MarcaEstado />
          </button>
        ))}
      </div>
    </div>
  );
}

function TrueFalse({ step, value, onChange, locked }) {
  return (
    <div className="ej ej--tf">
      <Cabecera tipo="tf" es="¿Verdadero o falso?" zh="对还是错？" />
      <Enunciado texto={step.prompt} zh={step.promptZh} />
      <div className="ej-sellos">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            disabled={locked}
            className={`ej-sello-btn ${v ? "es-verdad" : "es-falso"} ${estado(locked, value, v, step.answer)}`}
            onClick={() => {
              sfx("tap");
              onChange(v);
            }}
          >
            <span className="ej-sello-btn__disco">{v ? <TrazoBien size={46} /> : <TrazoMal size={42} />}</span>
            <span className="ej-sello-btn__es">{v ? "Verdadero" : "Falso"}</span>
            <span className="ej-sello-btn__zh" lang="zh">{v ? "对" : "错"}</span>
            <MarcaEstado />
          </button>
        ))}
      </div>
    </div>
  );
}

// Quien pregunta: el Rey Mono en un medallón, con bocadillo de pergamino (nada de avatares tipo emoji)
function Character({ text, speakText }) {
  return (
    <div className="ej-mono">
      <span className="ej-mono__medallon" aria-hidden="true">
        <img src="./mono/serio.webp" alt="" />
      </span>
      <div className="ej-mono__bocadillo">
        {speakText && (
          <button className="ej-oir" onClick={() => speak(speakText)} aria-label="Escuchar">
            <Volume2Icon size={16} />
          </button>
        )}
        <span>{text}</span>
      </div>
    </div>
  );
}

function Pictures({ step, value, onChange, locked }) {
  return (
    <div className="ej ej--pictures">
      <Cabecera tipo="pictures" es="¿Cuál es?" zh="选出图片" />
      <Enunciado texto={step.prompt} zh={step.promptZh} />
      <div className="ej-cartas">
        {step.options.map((o, i) => (
          <button
            key={i}
            disabled={locked}
            aria-pressed={value === i}
            style={{ "--i": i }}
            className={`ej-carta ${estado(locked, value, i, step.answer)}`}
            onClick={() => {
              sfx("tap");
              speak(o, 1);
              onChange(i);
            }}
          >
            <span className="ej-carta__arte">
              <Emoji3D emoji={step.pics[i]} size={72} />
            </span>
            <span className="ej-carta__pie">
              <span className="ej-moneda">{i + 1}</span>
              {o}
            </span>
            <MarcaEstado />
          </button>
        ))}
      </div>
    </div>
  );
}

// Ordenar: las fichas vuelan al tablero (FLIP) o se arrastran; cerca del tablero, un imán las atrae
function Build({ step, value = [], onChange, locked }) {
  const used = new Set(value);
  const raiz = React.useRef(null);
  const tablero = React.useRef(null);
  const vuelo = React.useRef(null);
  const arrastre = React.useRef(null);
  const ignorarClic = React.useRef(false);
  const [iman, setIman] = React.useState(false);

  // Vuelo de la ficha desde donde estaba hasta su nuevo sitio
  React.useLayoutEffect(() => {
    const v = vuelo.current;
    vuelo.current = null;
    if (!v || sinMovimiento()) return;
    const el = raiz.current?.querySelector(`[data-ficha="${v.destino}-${v.ti}"]`);
    if (!el?.animate) return;
    const r = el.getBoundingClientRect();
    const dx = v.rect.left - r.left;
    const dy = v.rect.top - r.top;
    el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${v.escala || 1})` },
        { transform: `translate(${dx * 0.12}px, ${dy * 0.12 - 10}px) scale(1.1) rotate(${dx > 0 ? -3 : 3}deg)`, offset: 0.72 },
        { transform: "none" },
      ],
      { duration: 420, easing: "cubic-bezier(.2,.8,.3,1)" },
    );
  }, [value]);

  const poner = (i, rect, escala) => {
    vuelo.current = { ti: i, destino: "tablero", rect, escala };
    sfx("tap");
    speak(step.tiles[i], 1);
    onChange([...value, i]);
  };
  const quitar = (ti, rect) => {
    vuelo.current = { ti, destino: "bandeja", rect };
    onChange(value.filter((x) => x !== ti));
  };

  // Arrastrar con el dedo o el ratón (tocar sigue funcionando igual)
  const empieza = (e, i) => {
    if (locked || used.has(i) || e.button > 0 || sinMovimiento()) return;
    arrastre.current = { i, x0: e.clientX, y0: e.clientY, el: e.currentTarget, activo: false, dx: 0, dy: 0, cerca: false };
    window.addEventListener("pointermove", mueve);
    window.addEventListener("pointerup", suelta, { once: true });
    window.addEventListener("pointercancel", suelta, { once: true });
  };
  const mueve = (e) => {
    const a = arrastre.current;
    if (!a) return;
    let dx = e.clientX - a.x0;
    let dy = e.clientY - a.y0;
    if (!a.activo) {
      if (Math.hypot(dx, dy) < 8) return;
      a.activo = true;
      a.el.classList.add("is-arrastrada");
      a.base = a.el.getBoundingClientRect();
    }
    const t = tablero.current?.getBoundingClientRect();
    if (t) {
      const cx = a.base.left + a.base.width / 2 + dx;
      const cy = a.base.top + a.base.height / 2 + dy;
      const ox = Math.max(t.left - cx, 0, cx - t.right);
      const oy = Math.max(t.top - cy, 0, cy - t.bottom);
      const dist = Math.hypot(ox, oy);
      const cerca = dist < 80;
      if (cerca) {
        // Imán: la ficha se deja llevar hacia el tablero
        const tira = dist === 0 ? 0.15 : 0.45 * (1 - dist / 80);
        const tx = Math.min(Math.max(cx, t.left + 30), t.right - 30);
        const ty = t.top + t.height / 2;
        dx += (tx - cx) * tira;
        dy += (ty - cy) * tira;
      }
      if (cerca !== a.cerca) {
        a.cerca = cerca;
        setIman(cerca);
      }
    }
    a.dx = dx;
    a.dy = dy;
    a.el.style.transform = `translate(${dx}px, ${dy}px) scale(1.1) rotate(${Math.max(-8, Math.min(8, dx / 30))}deg)`;
  };
  const suelta = () => {
    window.removeEventListener("pointermove", mueve);
    window.removeEventListener("pointercancel", suelta);
    window.removeEventListener("pointerup", suelta);
    const a = arrastre.current;
    arrastre.current = null;
    if (!a?.activo) return;
    ignorarClic.current = true;
    setTimeout(() => (ignorarClic.current = false), 0);
    const rect = a.el.getBoundingClientRect();
    a.el.classList.remove("is-arrastrada");
    a.el.style.transform = "";
    setIman(false);
    if (a.cerca) poner(a.i, rect, 1.1);
    else a.el.animate?.([{ transform: `translate(${a.dx}px, ${a.dy}px) scale(1.1)` }, { transform: "none" }], { duration: 320, easing: "cubic-bezier(.3,1.4,.5,1)" });
  };
  React.useEffect(() => () => window.removeEventListener("pointermove", mueve), []);

  return (
    <div className="ej ej--build" ref={raiz}>
      <Cabecera tipo="build" es="Ordena la frase" zh="排列句子" />
      <Character text={step.prompt} />
      <div ref={tablero} className={`ej-tablero ${value.length ? "" : "is-vacio"} ${iman ? "is-iman" : ""}`}>
        {value.length === 0 && <span className="ej-tablero__pista">Toca o arrastra las fichas en orden · 按顺序点击或拖动</span>}
        {value.map((ti) => (
          <button key={ti} data-ficha={`tablero-${ti}`} className="ej-ficha is-puesta" disabled={locked} onClick={(e) => quitar(ti, e.currentTarget.getBoundingClientRect())}>
            {step.tiles[ti]}
          </button>
        ))}
      </div>
      <div className="ej-fichas">
        {step.tiles.map((t, i) => (
          <button
            key={i}
            data-ficha={`bandeja-${i}`}
            style={{ "--i": i }}
            className={`ej-ficha lx-arrastrable ${used.has(i) ? "is-hueco" : ""}`}
            disabled={locked || used.has(i)}
            onPointerDown={(e) => empieza(e, i)}
            onClick={(e) => {
              if (ignorarClic.current) return;
              poner(i, e.currentTarget.getBoundingClientRect());
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// Tapa la solución si aparece dentro de un texto de ayuda (pistas o traducción): nunca se debe dar la respuesta en pantalla
function taparSolucion(texto, answer) {
  let t = String(texto || "");
  const quita = (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const letra = (c) => /[a-zñ0-9]/i.test(c || "");
  for (const a of String(answer || "").split(/\s*\/\s*/).map((x) => x.trim()).filter(Boolean)) {
    const buscado = quita(a);
    let desde = 0;
    for (;;) {
      const plano = quita(t);
      const i = plano.indexOf(buscado, desde);
      if (i < 0) break;
      // Solo palabras enteras: «en» no tapa «enero»
      if (letra(plano[i - 1]) || letra(plano[i + buscado.length])) {
        desde = i + 1;
        continue;
      }
      t = t.slice(0, i) + "_".repeat(buscado.length) + t.slice(i + buscado.length);
      desde = i + buscado.length;
    }
  }
  return t;
}

function TypeIt({ step, value = "", onChange, locked, onEnter }) {
  const [verPista, setVerPista] = React.useState(false);
  const pista = taparSolucion(step.hint, step.answer);
  const zh = taparSolucion(step.promptZh, step.answer);
  return (
    <div className="ej ej--type">
      <Cabecera tipo="type" es="Escribe en español" zh="用西语写" />
      {step.character ? <Character text={step.prompt} /> : <Enunciado texto={step.prompt} />}
      {zh && <div className="ej-enunciado__zh ej-suelto">{zh}</div>}
      <div className="ej-escribir">
        <input
          className="ej-input"
          autoFocus
          value={value}
          disabled={locked}
          placeholder="Escribe aquí · 在这里输入"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnter()}
          autoCapitalize="off"
          autoComplete="off"
          spellCheck={false}
        />
        {pista && !locked && (
          verPista ? (
            <div className="ej-pista" role="status">
              <IconoTipo tipo="tip" size={20} />
              <span>{pista}</span>
            </div>
          ) : (
            <button type="button" className="ej-pista-btn" onClick={() => setVerPista(true)}>
              <IconoTipo tipo="tip" size={18} /> Pista · 提示
            </button>
          )
        )}
      </div>
      <div className="ej-teclado" aria-label="Teclado español">
        {["áéíóúüñ¿¡", "qwertyuiop", "asdfghjklñ", "zxcvbnm"].map((row) => (
          <div key={row} className="ej-teclado__fila">
            {[...new Set(row)].map((c) => (
              <button key={c} className={`ej-tecla ${"áéíóúüñ¿¡".includes(c) ? "es-especial" : ""}`} disabled={locked} onClick={() => onChange(value + c)}>
                {c}
              </button>
            ))}
          </div>
        ))}
        <div className="ej-teclado__fila">
          <button className="ej-tecla es-ancha" disabled={locked} onClick={() => onChange(value + " ")}>
            espacio · 空格
          </button>
          <button className="ej-tecla es-borrar" disabled={locked} onClick={() => onChange(value.slice(0, -1))} aria-label="Borrar · 删除">
            <IcoBorrar size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Match({ step, onDone }) {
  const [left] = React.useState(() => step.pairs.map((p, i) => ({ i, t: p.a })).sort(() => Math.random() - 0.5));
  const [right] = React.useState(() => step.pairs.map((p, i) => ({ i, t: p.b })).sort(() => Math.random() - 0.5));
  const [sel, setSel] = React.useState(null);
  const [done, setDone] = React.useState([]);
  const [bad, setBad] = React.useState(null);
  const caja = React.useRef(null);
  const [hilos, setHilos] = React.useState([]);
  // Hilo de oro que une la pareja acertada, con chispas en el centro
  const unir = (i) => {
    const c = caja.current;
    const a = c?.querySelector(`[data-par="a-${i}"]`)?.getBoundingClientRect();
    const b = c?.querySelector(`[data-par="b-${i}"]`)?.getBoundingClientRect();
    if (!c || !a || !b) return;
    const r = c.getBoundingClientRect();
    const h = { id: `${i}-${Date.now()}`, x1: a.left + a.width / 2 - r.left, y1: a.top + a.height / 2 - r.top, x2: b.left + b.width / 2 - r.left, y2: b.top + b.height / 2 - r.top };
    setHilos((l) => [...l, h]);
    setTimeout(() => setHilos((l) => l.filter((x) => x.id !== h.id)), 1100);
    estallido(r.left + (h.x1 + h.x2) / 2, r.top + (h.y1 + h.y2) / 2, { monedas: 4, chispas: 12, fuerza: 0.8 });
  };
  const pick = (side, item) => {
    if (done.includes(item.i)) return;
    if (side === "a") speak(item.t, 1);
    if (!sel || sel.side === side) return setSel({ side, ...item });
    if (sel.i === item.i) {
      sfx("ok");
      unir(item.i);
      const next = [...done, item.i];
      setDone(next);
      setSel(null);
      if (next.length === step.pairs.length) setTimeout(onDone, 650);
    } else {
      sfx("bad");
      setBad([sel.i, item.i, side]);
      setSel(null);
      setTimeout(() => setBad(null), 500);
    }
  };
  const cls = (side, item) =>
    `ej-ficha ej-ficha--par ${done.includes(item.i) ? "is-pareja" : ""} ${sel && sel.side === side && sel.i === item.i ? "is-elegida" : ""} ${bad && ((side === bad[2] && bad[1] === item.i) || (side !== bad[2] && bad[0] === item.i)) ? "is-mal ej-tiembla" : ""}`;
  return (
    <div className="ej ej--match">
      <Cabecera tipo="match" es="Une las parejas" zh="连线配对" />
      <div className="ej-parejas-cuenta" aria-live="polite">
        {step.pairs.map((_, k) => (
          <i key={k} className={k < done.length ? "is-hecha" : ""} />
        ))}
        <span>
          {done.length}/{step.pairs.length}
        </span>
      </div>
      <div className="ej-parejas" ref={caja}>
        <svg className="lx-hilos" aria-hidden="true">
          {hilos.map((h) => (
            <path key={h.id} d={`M${h.x1} ${h.y1} C${(h.x1 + h.x2) / 2} ${h.y1 - 18}, ${(h.x1 + h.x2) / 2} ${h.y2 + 18}, ${h.x2} ${h.y2}`} pathLength="1" />
          ))}
        </svg>
        <div className="ej-parejas__col">
          {left.map((x) => (
            <button key={x.i} data-par={`a-${x.i}`} style={{ "--i": x.i }} className={cls("a", x)} onClick={() => pick("a", x)}>
              {x.t}
            </button>
          ))}
        </div>
        <div className="ej-parejas__col">
          {right.map((x) => (
            <button key={x.i} data-par={`b-${x.i}`} style={{ "--i": x.i }} className={cls("b", x)} onClick={() => pick("b", x)} lang="zh">
              {x.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function checkAnswer(step, value) {
  if (step.type === "choice" || step.type === "listen" || step.type === "pictures") return { ok: value === step.answer, solution: step.options[step.answer] };
  if (step.type === "tf") return { ok: value === step.answer, solution: step.answer ? "Verdadero" : "Falso" };
  if (step.type === "build") {
    const built = (value || []).map((i) => step.tiles[i]).join(" ");
    return { ok: norm(built) === norm(step.answer), solution: step.answer };
  }
  if (step.type === "type") {
    const options = String(step.answer).split(/\s*\/\s*/);
    const exact = options.some((a) => norm(a) === norm(value));
    const loose = options.some((a) => noAccents(a) === noAccents(value));
    return { ok: exact || loose, accent: !exact && loose, solution: step.answer };
  }
  return { ok: true };
}

/** Lección a pantalla completa. onClose(resultado|null) */
export function LessonPlayer({ lesson, onClose }) {
  const total = lesson.steps.length;
  const [queue, setQueue] = React.useState(() => lesson.steps.map((_, i) => i));
  const [pos, setPos] = React.useState(0);
  const [value, setValue] = React.useState(undefined);
  const [feedback, setFeedback] = React.useState(null);
  const [mistakes, setMistakes] = React.useState(0);
  // Racha de aciertos seguidos: solo se muestra (no cuenta para la puntuación)
  const [racha, setRacha] = React.useState(0);
  const [hearts, setHearts] = React.useState(() => getGame().hearts);
  const [result, setResult] = React.useState(null);
  const [retried] = React.useState(() => new Set());
  const [startedAt] = React.useState(Date.now());
  const step = lesson.steps[queue[pos]];
  // Tab no sale de la lección y, al cerrarla, el foco vuelve a donde estaba (sin foco inicial: Intro avanza la lección)
  const raiz = React.useRef(null);
  useModalAccesible(raiz);

  React.useEffect(() => {
    // Con la página arriba, el menú lateral se ve entero junto a la lección; al cerrar se vuelve donde estaba
    const y = window.scrollY;
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    // Mientras la lección está abierta, la página de debajo deja de pintarse y de animarse (era la causa principal del lag)
    document.documentElement.classList.add("lp-abierta");
    return () => {
      document.documentElement.classList.remove("lp-abierta");
      document.body.style.overflow = "";
      window.scrollTo(0, y);
      speechSynthesis?.cancel?.();
    };
  }, []);

  const finish = React.useCallback(() => {
    const interactive = lesson.steps.filter((s) => !TEACH.has(s.type)).length;
    const accuracy = interactive ? Math.max(0, Math.round(((interactive - mistakes) / interactive) * 100)) : 100;
    const perfect = mistakes === 0;
    const xp = 10 + (perfect ? 5 : 0);
    const r = addXp(xp, { lessonId: lesson.id, score: accuracy, perfect });
    // Fanfarria; los fuegos artificiales los lanza la pantalla final (FinLeccion)
    sfx("win");
    // ¿Con esta lección se completa la clase? (sus 5 lecciones hechas; la clase 1 usa los ids antiguos mN-lI)
    const partes = String(lesson.id).match(/^m(\d+)(?:-c(\d+))?-l\d+$/);
    const unit = partes?.[1];
    const clase = partes?.[2] || "1";
    const prefijo = clase === "1" ? `m${unit}-l` : `m${unit}-c${clase}-l`;
    const lessons = getGame().lessons || {};
    const unitDone = Boolean(unit) && [0, 1, 2, 3, 4].every((i) => lessons[`${prefijo}${i}`]);
    setResult({ xp, accuracy, perfect, unit, clase, unitDone, seconds: Math.round((Date.now() - startedAt) / 1000), ...r });
  }, [lesson, mistakes, startedAt]);

  // Pantallas con pergamino (palabra nueva, «di en voz alta» y todos los ejercicios sobre el paisaje)
  const conPergamino = !result && step && !["dialog", "tip"].includes(step.type);
  const [cerrando, setCerrando] = React.useState(false);
  const cierre = React.useRef(null);
  React.useEffect(() => () => clearTimeout(cierre.current), []);
  const avanzar = () => {
    setCerrando(false);
    setFeedback(null);
    setValue(undefined);
    if (pos + 1 >= queue.length) finish();
    else setPos((p) => p + 1);
  };
  // Antes de cambiar de pantalla el pergamino se enrolla (300 ms); sin animaciones se pasa directamente
  const next = () => {
    if (cerrando) return;
    const sinMovimiento = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!conPergamino || sinMovimiento) return avanzar();
    setCerrando(true);
    cierre.current = setTimeout(avanzar, 300);
  };

  const check = () => {
    const res = checkAnswer(step, value);
    // Progreso por destreza y cuaderno de errores
    const skill = step.type === "listen" ? "audicion" : ["build", "type"].includes(step.type) ? "gramatica" : step.type === "tf" ? "lectura" : "vocabulario";
    const given = Array.isArray(value) ? value.join(" ") : step.options ? step.options[value] : String(value ?? "");
    recordAnswer({ skill, level: levelOf(lesson.modulo), ok: res.ok, src: `lección ${lesson.modulo}`, error: { prompt: step.prompt || step.speak, given, correct: res.solution, explain: step.explain, options: step.options, answer: step.answer, speak: step.speak, type: step.type } });
    if (res.ok) {
      sfx("ok");
      setRacha((r) => r + 1);
    } else {
      sfx("bad");
      setRacha(0);
      setMistakes((m) => m + 1);
      setHearts(loseHeart());
      if (!retried.has(queue[pos])) {
        retried.add(queue[pos]);
        setQueue((q) => [...q, q[pos]]);
      }
    }
    // Lo que contestó el alumno, legible (solo para enseñarlo tachado junto a la solución)
    const tuya = step.type === "build" ? (value || []).map((i) => step.tiles[i]).join(" ") : step.type === "tf" ? (value ? "Verdadero" : "Falso") : step.options ? step.options[value] : String(value ?? "");
    setFeedback({ ...res, explain: step.explain, tuya });
  };

  // Tras comprobar, la opción correcta queda a la vista por encima del panel de corrección (en móvil lo tapaba)
  React.useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => document.querySelector(".lp-main .is-bien")?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 120);
    return () => clearTimeout(t);
  }, [feedback]);

  const canCheck = step && !TEACH.has(step.type) && step.type !== "match" && value !== undefined && value !== "" && !(Array.isArray(value) && !value.length);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Enter" || result) return;
      if (feedback || TEACH.has(step?.type)) next();
      else if (canCheck) check();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const progress = result ? 100 : Math.round((pos / queue.length) * 100);
  const nivel = levelOf(lesson.modulo);
  const outOfHearts = hearts <= 0 && !result && feedback && !feedback.ok;

  const body = result ? (
    <FinLeccion result={result}>
      {result.levelUp && <div className="ui-chip is-on lx-logro" style={{ fontSize: 15 }}><ZapIcon size={16} /> ¡Subes de nivel! · 升级了！</div>}
      {result.goalReached && <div className="ui-chip ok lx-logro" style={{ fontSize: 15 }}><TargetIcon size={16} /> ¡Meta diaria cumplida! · 完成今日目标</div>}
      {result.newBadges?.map((b) => (
        <div key={b.id} className="ui-chip warn lx-logro" style={{ fontSize: 15 }}>
          <Emoji3D emoji={b.emoji} size={22} /> Logro: {b.es} · {b.zh}
        </div>
      ))}
    </FinLeccion>
  ) : outOfHearts ? (
    <div className="lp-center">
      <img className="ej-sin-vidas" src="./mono/serio.webp" alt="" />
      <h2 className="lp-word" style={{ fontSize: 30 }}>Te has quedado sin vidas</h2>
      <div className="lp-zh-big">生命值用完了</div>
      <p className="ui-muted" style={{ textAlign: "center", maxWidth: 420 }}>
        Las vidas se recargan solas (una cada 30 min). También puedes repetir la lección desde el principio con las vidas llenas.
      </p>
    </div>
  ) : step.type === "learn" ? (
    <Learn step={step} level={levelOf(lesson.modulo)} onNext={next} />
  ) : step.type === "speak" ? (
    <Hablar step={step} level={levelOf(lesson.modulo)} onNext={next} />
  ) : step.type === "tip" ? (
    <Tip step={step} level={levelOf(lesson.modulo)} />
  ) : step.type === "dialog" ? (
    <Dialog step={step} level={levelOf(lesson.modulo)} emoji={lesson.emoji} />
  ) : step.type === "tf" ? (
    <TrueFalse step={step} value={value} onChange={setValue} locked={!!feedback} />
  ) : step.type === "build" ? (
    <Build key={queue[pos] + "-" + pos} step={step} value={value} onChange={setValue} locked={!!feedback} />
  ) : step.type === "type" ? (
    <TypeIt key={pos} step={step} value={value} onChange={setValue} locked={!!feedback} onEnter={() => canCheck && check()} />
  ) : step.type === "pictures" ? (
    <Pictures key={pos} step={step} value={value} onChange={setValue} locked={!!feedback} />
  ) : step.type === "match" ? (
    <Match key={pos} step={step} onDone={next} />
  ) : (
    <Choice key={pos} step={step} value={value} onChange={setValue} locked={!!feedback} />
  );

  return createPortal(
    <div
      className={`lp-root lx lx-mundo-${nivel} ${!result && ["dialog", "tip"].includes(step?.type) ? "lp-fondo-pergamino" : "lp-fondo-paisaje"} lp-paso-${result ? "fin" : step?.type} ${cerrando ? "pg-cierra" : ""} ${feedback && !result ? (feedback.ok ? "lx-hay-acierto" : "lx-hay-fallo") : ""} ${racha >= 3 ? `lx-en-racha lx-racha-${Math.min(3, Math.floor(racha / 3))}` : ""}`}
      ref={raiz}
      role="dialog"
      aria-modal="true"
      aria-label={lesson.es}
    >
      {!(!result && ["dialog", "tip"].includes(step?.type)) && <FondoCielo mundo={nivel} progreso={progress} paso={pos} />}
      <NubeVoladora racha={racha} />
      <header className="lp-top">
        <button className="lp-close" onClick={() => onClose(null)} aria-label="Salir">
          <XIcon size={22} />
        </button>
        <BarraViaje progress={progress} fin={Boolean(result)} />
        {!result && <Racha racha={racha} />}
        <Corazones hearts={hearts} />
      </header>
      <main className={`lp-main ${feedback && !result ? (feedback.ok ? "ej-acierto" : "ej-fallo") : ""}`} key={result ? "end" : `${pos}-${queue[pos]}`}>
        {conPergamino && !["learn", "speak"].includes(step.type) ? <Pergamino>{body}</Pergamino> : body}
        {feedback && !result && !outOfHearts && <SelloResultado ok={feedback.ok} racha={racha} />}
        {feedback && !feedback.ok && !result && !outOfHearts && <TintaFallo />}
      </main>
      <footer className={`lp-foot ${feedback ? (feedback.ok ? "ok" : "bad") : ""}`}>
        <div className="lp-foot-inner">
          {feedback && !result && !outOfHearts && (
            <div className="lp-feedback" role="status">
              <img className={`lp-mono lx-mono ${feedback.ok ? "lx-mono--salta" : "lx-mono--niega"}`} src={`./mono/${feedback.ok ? (racha >= 3 ? "poder" : pos % 2 ? "guino" : "feliz") : "serio"}.webp`} alt="" />
              <div>
                <b>{feedback.ok ? (feedback.accent ? "¡Bien! Ojo con la tilde · 注意重音" : "¡Correcto! · 正确！") : "Solución correcta · 正确答案"}</b>
                {!feedback.ok && feedback.tuya && (
                  <div className="lx-tuya">
                    <small>Tu respuesta · 你的答案</small>
                    <s>{feedback.tuya}</s>
                  </div>
                )}
                {(!feedback.ok || feedback.accent) && (
                  <div className="lp-solution">
                    <small>Respuesta · 答案</small>
                    {feedback.solution}
                  </div>
                )}
                {feedback.explain && (
                  <div className="lp-explain">
                    <IconoTipo tipo="tip" size={20} />
                    <span>{feedback.explain}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          {result ? (
            <button className="lp-btn" onClick={() => onClose(result)}>
              Continuar · 继续
            </button>
          ) : outOfHearts ? (
            <div className="ui-row" style={{ width: "100%", justifyContent: "flex-end" }}>
              <button className="lp-btn ghost" onClick={() => onClose(null)}>
                Salir
              </button>
              <button
                className="lp-btn"
                onClick={() => {
                  refillHearts();
                  setHearts(getGame().hearts);
                  setQueue(lesson.steps.map((_, i) => i));
                  setPos(0);
                  setMistakes(0);
                  setFeedback(null);
                  setValue(undefined);
                }}
              >
                Repetir con vidas llenas
              </button>
            </div>
          ) : feedback || TEACH.has(step.type) ? (
            <button className={`lp-btn ${feedback && !feedback.ok ? "bad" : ""}`} onClick={next}>
              {step.type === "speak" && !feedback ? "Saltar · 跳过" : TEACH.has(step.type) && !feedback ? "Entendido · 明白了" : "Continuar · 继续"}
            </button>
          ) : step.type === "match" ? (
            <button className="lp-btn ghost" onClick={next}>
              Saltar · 跳过
            </button>
          ) : (
            <button className="lp-btn" disabled={!canCheck} onClick={check}>
              <CheckIcon size={20} /> Comprobar · 检查
            </button>
          )}
        </div>
      </footer>
    </div>,
    document.body,
  );
}
