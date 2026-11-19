// Base común de efectos para los juegos (v32).
// Todo lo que hace que un juego «se sienta» igual de vivo que Fichas del palacio:
//  - FondoMundo: el mundo del nivel de la unidad (bambú, linternas, tinta, Ciudad Prohibida) detrás del juego.
//  - useJuegoFx(): acierto (estallido dorado + cartel con el significado + audio + Rey Mono contento),
//    fallo (temblor + cartel con la respuesta + Rey Mono serio) y frases del Rey Mono.
//  - CapaJuegoFx: pinta cartel, estallido y Rey Mono en un portal (fuera de .app-stage, que tiene transform).
//  - PantallaFinal: estrellas, datos de la partida y repaso de las palabras con audio.
// Todo respeta prefers-reduced-motion (sin estallidos, sin confeti, sin temblores).
import * as React from "react";
import { createPortal } from "react-dom";
import { CheckIcon, XIcon, Volume2Icon, StarIcon } from "lucide-react";
import { ESCENAS } from "../dele/EscenasNivel.jsx";
import { ParticulasNivel } from "../ui/ParticulasNivel.jsx";
import { speak, confetti } from "../lesson/fx.js";
import "../../styles/juego-fx.css";

export const sinMovimiento = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];

const FRASES = {
  acierto: [
    ["¡Muy bien!", "太棒了！"],
    ["¡Eso es!", "就是这样！"],
    ["¡Genial!", "真厉害！"],
    ["¡Perfecto!", "完美！"],
  ],
  fallo: [
    ["¡Casi! Mira la respuesta.", "差一点！看看正确答案。"],
    ["No pasa nada, ¡sigue!", "没关系，继续加油！"],
    ["Recuérdala para la próxima.", "下次记住它哦。"],
  ],
};

/** Escenario del nivel (el mismo que en Elegir unidad y Unidades), con velo para que el juego se lea bien. */
export function FondoMundo({ nivel = "A1" }) {
  const Escena = ESCENAS[nivel] || ESCENAS.A1;
  return (
    <div className="jfx-mundo" data-nivel={nivel} aria-hidden="true" translate="no">
      <Escena />
      {!sinMovimiento() && <ParticulasNivel nivel={nivel} />}
      <div className="jfx-mundo__velo" />
    </div>
  );
}

/** Focos de plató que barren el escenario (Kahoot, Ruleta): conos de luz cálida y polvo dorado. */
export function FocosEscenario({ tono = "oro" }) {
  return (
    <div className={`jfx-focos jfx-focos--${tono}`} aria-hidden="true">
      <span className="jfx-foco jfx-foco--a" />
      <span className="jfx-foco jfx-foco--b" />
      <span className="jfx-foco jfx-foco--c" />
      <span className="jfx-foco jfx-foco--d" />
      <span className="jfx-focos__suelo" />
    </div>
  );
}

/**
 * Cuenta atrás 3 · 2 · 1 · ¡Ya! con monedas de oro que giran en 3D.
 * Llama a onFin al terminar (al instante con prefers-reduced-motion).
 */
export function CuentaAtras({ onFin, desde = 3 }) {
  const [n, setN] = React.useState(desde);
  const finRef = React.useRef(onFin);
  finRef.current = onFin;
  React.useEffect(() => {
    if (sinMovimiento()) {
      finRef.current?.();
      return undefined;
    }
    if (n < 0) {
      finRef.current?.();
      return undefined;
    }
    const t = setTimeout(() => setN((x) => x - 1), n === 0 ? 650 : 800);
    return () => clearTimeout(t);
  }, [n]);
  if (n < 0 || sinMovimiento()) return null;
  return createPortal(
    <div className="jfx-cuenta gm-no-adapt" role="status" aria-live="assertive">
      <span className="jfx-cuenta__aro" key={`a${n}`} />
      <span className={`jfx-cuenta__moneda${n === 0 ? " is-ya" : ""}`} key={n}>
        <b>{n === 0 ? "¡Ya!" : n}</b>
        {n === 0 && <i translate="no">开始</i>}
      </span>
    </div>,
    document.body,
  );
}

/** Lanza un elemento que vuela en 3D de un punto a otro (p. ej. la palabra de la ruleta al panel). */
export function volarFicha(texto, desde, hasta, clase = "") {
  if (sinMovimiento() || !desde || !hasta || typeof document === "undefined") return;
  const a = desde.getBoundingClientRect();
  const b = hasta.getBoundingClientRect();
  const el = document.createElement("span");
  el.className = `jfx-vuelo ${clase}`;
  el.textContent = texto;
  el.setAttribute("aria-hidden", "true");
  el.setAttribute("translate", "no");
  document.body.appendChild(el);
  const x0 = a.left + a.width / 2;
  const y0 = a.top + a.height / 2;
  const x1 = b.left + b.width / 2;
  const y1 = b.top + b.height / 2;
  const animacion = el.animate(
    [
      { transform: `translate(${x0}px, ${y0}px) translate(-50%, -50%) scale(0.4) rotateY(0deg) rotateX(40deg)`, opacity: 0 },
      { transform: `translate(${(x0 + x1) / 2}px, ${Math.min(y0, y1) - 120}px) translate(-50%, -50%) scale(1.35) rotateY(200deg) rotateX(-10deg)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${x1}px, ${y1}px) translate(-50%, -50%) scale(1) rotateY(360deg) rotateX(0deg)`, opacity: 0.2 },
    ],
    { duration: 850, easing: "cubic-bezier(.3,.7,.3,1)", fill: "forwards" },
  );
  animacion.onfinish = () => el.remove();
}

/**
 * Estado de los efectos de un juego.
 * - acierto({ es, zh, desde, racha, decir }) · desde: elemento (o {x,y}) donde nace el estallido
 * - fallo({ es, zh, desde, nota })            · enseña la respuesta correcta
 * - mono(pose, es, zh)                         · pose: saluda | feliz | guino | serio | poder | trofeo
 * - cartel({ es, zh, nota })                   · solo el cartel con el significado (tono informativo)
 * - temblor: número que cambia en cada fallo (úsalo como key o para añadir la clase jfx-tiembla)
 */
export function useJuegoFx({ inicio = ["¡Vamos allá!", "我们开始吧！"] } = {}) {
  const [estado, setEstado] = React.useState(() => ({
    cartel: null,
    estallido: null,
    temblor: 0,
    mono: { id: 0, pose: "saluda", es: inicio[0], zh: inicio[1] },
  }));
  const contador = React.useRef(1);
  const relojes = React.useRef({});

  const programar = React.useCallback((clave, ms, fn) => {
    clearTimeout(relojes.current[clave]);
    relojes.current[clave] = setTimeout(fn, ms);
  }, []);
  React.useEffect(() => () => Object.values(relojes.current).forEach(clearTimeout), []);

  const mono = React.useCallback(
    (pose, es = "", zh = "") => {
      const id = contador.current++;
      setEstado((s) => ({ ...s, mono: { id, pose, es, zh } }));
      if (es) programar("bocadillo", 3400, () => setEstado((s) => (s.mono.id === id ? { ...s, mono: { ...s.mono, es: "", zh: "" } } : s)));
    },
    [programar],
  );

  const punto = (desde) => {
    if (!desde) return { x: window.innerWidth / 2, y: window.innerHeight * 0.42 };
    if (typeof desde.x === "number") return desde;
    const caja = (desde.current || desde).getBoundingClientRect?.();
    return caja ? { x: caja.left + caja.width / 2, y: caja.top + caja.height / 2 } : { x: window.innerWidth / 2, y: window.innerHeight * 0.42 };
  };

  const acierto = React.useCallback(
    ({ es, zh, desde, racha = 0, decir = true, nota = "" } = {}) => {
      const id = contador.current++;
      const p = punto(desde);
      setEstado((s) => ({
        ...s,
        cartel: es ? { id, tono: "bien", es, zh, nota } : s.cartel,
        estallido: sinMovimiento() ? null : { id, ...p },
      }));
      programar("cartel", 2900, () => setEstado((s) => (s.cartel?.id === id ? { ...s, cartel: null } : s)));
      programar("estallido", 1100, () => setEstado((s) => (s.estallido?.id === id ? { ...s, estallido: null } : s)));
      if (racha >= 3) mono("poder", `¡Racha de ${racha}!`, `连对 ${racha} 个！`);
      else mono("feliz", ...azar(FRASES.acierto));
      if (decir && es) setTimeout(() => speak(es, 0.9), 260);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mono, programar],
  );

  const fallo = React.useCallback(
    ({ es, zh, nota = "La respuesta · 正确答案" } = {}) => {
      const id = contador.current++;
      setEstado((s) => ({ ...s, temblor: s.temblor + 1, cartel: es ? { id, tono: "mal", es, zh, nota } : s.cartel }));
      programar("cartel", 3600, () => setEstado((s) => (s.cartel?.id === id ? { ...s, cartel: null } : s)));
      mono("serio", ...azar(FRASES.fallo));
    },
    [mono, programar],
  );

  /** Cartel informativo (sin acierto ni fallo): p. ej. al colocar o tocar una palabra */
  const cartel = React.useCallback(
    ({ es, zh, nota = "" }) => {
      const id = contador.current++;
      setEstado((s) => ({ ...s, cartel: { id, tono: "info", es, zh, nota } }));
      programar("cartel", 2600, () => setEstado((s) => (s.cartel?.id === id ? { ...s, cartel: null } : s)));
    },
    [programar],
  );

  const cerrarCartel = React.useCallback(() => setEstado((s) => ({ ...s, cartel: null })), []);

  return { estado, acierto, fallo, mono, cartel, cerrarCartel };
}

/** Cartel con el significado: palabra en español, chino y botón de audio. */
export function CartelSignificado({ cartel, onCerrar }) {
  if (!cartel) return null;
  const bien = cartel.tono === "bien";
  return (
    <div className={`jfx-cartel jfx-cartel--${cartel.tono}`} key={cartel.id} role="status" aria-live="polite">
      <span className="jfx-cartel__sello" aria-hidden="true" translate="no">
        {bien ? "对" : cartel.tono === "info" ? "词" : "记"}
      </span>
      <div className="jfx-cartel__txt">
        {cartel.nota && <small>{cartel.nota}</small>}
        <b lang="es">{cartel.es}</b>
        {cartel.zh && (
          <i lang="zh-CN" translate="no">
            {cartel.zh}
          </i>
        )}
      </div>
      <button type="button" className="jfx-cartel__oir" onClick={() => speak(cartel.es, 0.85)} aria-label={`Escuchar · 听: ${cartel.es}`}>
        <Volume2Icon size={20} aria-hidden="true" />
      </button>
      <button type="button" className="jfx-cartel__cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
        <XIcon size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

/** Rey Mono con bocadillo bilingüe; cambia de pose según lo que pasa en el juego. */
export function MonoReactivo({ mono }) {
  if (!mono) return null;
  return (
    <div className={`jfx-mono jfx-mono--${mono.pose}${mono.es ? " jfx-mono--habla" : ""}`} aria-live="polite">
      {mono.es && (
        <p className="jfx-mono__bocadillo" key={`b${mono.id}`}>
          <b>{mono.es}</b>
          {mono.zh && <span translate="no">{mono.zh}</span>}
        </p>
      )}
      <img key={`m${mono.id}`} src={`./mono/${mono.pose}.webp`} alt="" aria-hidden="true" className="jfx-mono__img" />
    </div>
  );
}

/** Estallido dorado (rayos, aro y chispas) en un punto de la pantalla. */
export function Estallido({ estallido }) {
  if (!estallido) return null;
  return (
    <span className="jfx-estallido" key={estallido.id} style={{ left: estallido.x, top: estallido.y }} aria-hidden="true">
      <span className="jfx-estallido__luz" />
      <span className="jfx-estallido__aro" />
      {Array.from({ length: 12 }, (_, i) => (
        <i key={i} style={{ "--a": `${i * 30}deg`, "--d": `${70 + (i % 3) * 26}px` }} />
      ))}
    </span>
  );
}

/** Capa de efectos en un portal: cartel, estallido y Rey Mono. */
export function CapaJuegoFx({ fx, conMono = true }) {
  if (typeof document === "undefined") return null;
  const { estado, cerrarCartel } = fx;
  return createPortal(
    <div className={`jfx-capa gm-no-adapt${sinMovimiento() ? " is-reducido" : ""}`}>
      <CartelSignificado cartel={estado.cartel} onCerrar={cerrarCartel} />
      <Estallido estallido={estado.estallido} />
      {estado.temblor > 0 && <span className="jfx-flash" key={`f${estado.temblor}`} aria-hidden="true" />}
      {conMono && <MonoReactivo mono={estado.mono} />}
    </div>,
    document.body,
  );
}

/** Botón de la base común. tono: oro | laca | claro */
export function BotonFx({ tono = "oro", className = "", children, ...resto }) {
  return (
    <button type="button" className={`jfx-boton jfx-boton--${tono} ${className}`} {...resto}>
      {children}
    </button>
  );
}

const POSE_FINAL = ["serio", "guino", "feliz", "trofeo"];
const TITULO_FINAL = [
  ["¡A practicar más!", "再练练吧！"],
  ["¡Buen comienzo!", "好的开始！"],
  ["¡Muy bien hecho!", "做得很好！"],
  ["¡Perfecto!", "完美通关！"],
];

/**
 * Pantalla final común.
 * - estrellas: 0–3 · datos: [{ etiqueta, valor }] · repaso: [{ es, zh, ok }]
 * - sello: carácter del medallón · titulo/tituloZh opcionales (si no, según las estrellas)
 * - children: botones (BotonFx)
 */
export function PantallaFinal({ estrellas = 0, sello = "胜", titulo, tituloZh, datos = [], repaso = [], nota, children }) {
  const n = Math.max(0, Math.min(3, estrellas));
  const [t, tz] = titulo ? [titulo, tituloZh] : TITULO_FINAL[n];
  const botonesRef = React.useRef(null);
  React.useEffect(() => {
    if (n === 3 && !sinMovimiento()) confetti({ count: 120, duration: 2400 });
  }, [n]);
  // Foco en el primer botón sin desplazar la tarjeta (en móvil, autoFocus la bajaba y escondía las estrellas)
  React.useEffect(() => {
    botonesRef.current?.querySelector("button, a")?.focus({ preventScroll: true });
  }, []);
  const fallos = repaso.filter((x) => !x.ok).length;
  return createPortal(
    <div className={`jfx-modal gm-no-adapt${sinMovimiento() ? " is-reducido" : ""}`} role="dialog" aria-modal="true" aria-labelledby="jfx-fin-titulo">
      <div className={`jfx-fin jfx-fin--${n}`}>
        <span className="jfx-fin__rayos" aria-hidden="true" />
        <img className="jfx-fin__mono" src={`./mono/${POSE_FINAL[n]}.webp`} alt="" aria-hidden="true" />
        <span className="jfx-fin__sello" aria-hidden="true" translate="no">
          {sello}
        </span>
        <h2 id="jfx-fin-titulo" className="jfx-fin__titulo">
          {t}
          <span translate="no">{tz}</span>
        </h2>
        <div className="jfx-estrellas" aria-label={`${n} de 3 estrellas · ${n} 颗星`}>
          {[0, 1, 2].map((i) => (
            <StarIcon key={i} size={46} className={i < n ? "is-llena" : ""} style={{ "--i": i }} aria-hidden="true" />
          ))}
        </div>
        {datos.length > 0 && (
          <div className="jfx-datos">
            {datos.map((d) => (
              <div key={d.etiqueta}>
                <small>{d.etiqueta}</small>
                <strong>{d.valor}</strong>
              </div>
            ))}
          </div>
        )}
        {nota && <p className="jfx-fin__nota">{nota}</p>}
        {repaso.length > 0 && (
          <details className="jfx-repaso" open>
            <summary>
              Repaso de palabras · 单词复习 <span>{fallos ? `${fallos} para repasar · 待复习` : "todo bien · 全对"}</span>
            </summary>
            <ul>
              {[...repaso].sort((a, b) => Number(a.ok) - Number(b.ok)).map((x, i) => (
                <li key={`${x.es}-${i}`} className={x.ok ? "is-ok" : "is-mal"}>
                  <span className="jfx-repaso__marca" aria-label={x.ok ? "Bien · 对" : "Repasar · 复习"}>
                    {x.ok ? <CheckIcon size={14} /> : <XIcon size={14} />}
                  </span>
                  <b lang="es">{x.es}</b>
                  <i lang="zh-CN" translate="no">
                    {x.zh}
                  </i>
                  <button type="button" onClick={() => speak(x.es, 0.85)} aria-label={`Escuchar · 听: ${x.es}`}>
                    <Volume2Icon size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )}
        <div className="jfx-fin__botones" ref={botonesRef}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Estrellas según el porcentaje de aciertos. */
export const estrellasPorAciertos = (aciertos, total) => {
  if (!total) return 0;
  const r = aciertos / total;
  return r >= 0.9 ? 3 : r >= 0.6 ? 2 : r > 0 ? 1 : 0;
};
