import * as React from "react";
import "../styles/v19-mono-fab.css";

/*
  Botón flotante del Rey Mono (abre el tutor IA).
  - Doble clic / doble toque → abre el asistente (onAbrir). También al mantener pulsado (táctil),
    al tocar el botón del bocadillo y con Intro/Espacio desde el teclado.
  - Un clic simple → el mono da un saltito, cambia de pose y dice un consejo breve (no abre nada).
  - En reposo flota sobre su nube dorada, parpadea (guiño) de vez en cuando y brilla.
*/
const CONSEJOS = [
  ["Repasa 10 minutos cada día", "每天复习十分钟"],
  ["Lee en voz alta: ¡ayuda mucho!", "大声朗读很有帮助！"],
  ["Ser = quién eres; estar = cómo estás", "ser 是本质，estar 是状态"],
  ["Apunta las palabras nuevas", "记下新单词"],
  ["Equivocarse también es aprender", "犯错也是学习"],
  ["En el DELE, lee primero las preguntas", "DELE考试先读问题"],
  ["¡Paso a paso se llega lejos!", "千里之行，始于足下"],
  ["Escucha la frase y repítela", "听一句，跟读一句"],
];
const POSES = ["feliz", "guino", "poder", "trofeo"];
const ESPERA_DOBLE = 400;
const PULSACION_LARGA = 520;

export function MonoFlotante({ onAbrir }) {
  const [pose, setPose] = React.useState("saluda");
  const [bocadillo, setBocadillo] = React.useState(null); // { es, zh, pista }
  const [salto, setSalto] = React.useState(0);
  const [saliendo, setSaliendo] = React.useState(false);
  const ultimo = React.useRef(0);
  const temporizador = React.useRef(0);
  const largo = React.useRef(0);
  const abiertoPorLargo = React.useRef(false);
  const consejo = React.useRef(Math.floor(Math.random() * CONSEJOS.length));

  const ocultarLuego = (ms) => {
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => {
      setBocadillo(null);
      setPose("saluda");
    }, ms);
  };
  React.useEffect(() => () => (clearTimeout(temporizador.current), clearTimeout(largo.current)), []);

  // Primera vez en la sesión: explica cómo se abre
  React.useEffect(() => {
    let visto = false;
    try {
      visto = sessionStorage.getItem("mono-fab-pista") === "1";
      sessionStorage.setItem("mono-fab-pista", "1");
    } catch {}
    if (visto) return undefined;
    const t = setTimeout(() => {
      setBocadillo({ pista: true });
      ocultarLuego(5200);
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  const abrir = () => {
    clearTimeout(temporizador.current);
    setBocadillo(null);
    setSaliendo(true);
    setPose("poder");
    setTimeout(() => {
      setSaliendo(false);
      setPose("saluda");
      onAbrir();
    }, window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : 380);
  };

  const onClick = (e) => {
    if (abiertoPorLargo.current) {
      abiertoPorLargo.current = false;
      return;
    }
    // Teclado (Intro/Espacio): abre directamente
    if (e.detail === 0) return abrir();
    const ahora = Date.now();
    if (e.detail >= 2 || ahora - ultimo.current < ESPERA_DOBLE) {
      ultimo.current = 0;
      return abrir();
    }
    ultimo.current = ahora;
    // Clic simple: saltito, pose nueva y un consejo
    const [es, zh] = CONSEJOS[consejo.current++ % CONSEJOS.length];
    setPose(POSES[consejo.current % POSES.length]);
    setSalto((n) => n + 1);
    setBocadillo({ es, zh });
    ocultarLuego(4200);
  };

  // Mantener pulsado (táctil) también abre
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse") return;
    clearTimeout(largo.current);
    largo.current = setTimeout(() => {
      abiertoPorLargo.current = true;
      navigator.vibrate?.(12);
      abrir();
    }, PULSACION_LARGA);
  };
  const cancelarLargo = () => clearTimeout(largo.current);

  return (
    <div className={`mf gm-no-adapt ${saliendo ? "is-saliendo" : ""} ${bocadillo ? "con-bocadillo" : ""}`}>
      {bocadillo && (
        <div className={`mf-bocadillo ${bocadillo.pista ? "es-pista" : ""}`} role="status">
          {bocadillo.pista ? (
            <p>
              <b>¡Hola! Soy el Rey Mono</b>
              <span lang="zh">你好！我是美猴王</span>
            </p>
          ) : (
            <p>
              <b>{bocadillo.es}</b>
              <span lang="zh">{bocadillo.zh}</span>
            </p>
          )}
          <button type="button" className="mf-bocadillo__abrir" onClick={abrir}>
            Pregúntame · <span lang="zh">问我</span>
          </button>
        </div>
      )}
      <span className="mf-pista" aria-hidden="true">
        Doble clic para hablar · <span lang="zh">双击聊天</span>
      </span>
      <button
        type="button"
        className="mf-boton"
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerUp={cancelarLargo}
        onPointerLeave={cancelarLargo}
        onPointerCancel={cancelarLargo}
        onContextMenu={(e) => e.preventDefault()}
        aria-label="Rey Mono, tutor IA: doble clic o Intro para abrir · 美猴王AI导师：双击打开"
        title="Doble clic: tutor IA · 双击：AI导师"
      >
        <span className="mf-aura" aria-hidden="true" />
        <span className="mf-cuerpo" aria-hidden="true">
          <span key={salto} className={`mf-salto ${salto ? "salta" : ""}`}>
            <img className="mf-mono base" src="./mono/saluda.png" alt="" draggable="false" style={{ opacity: pose === "saluda" ? 1 : 0 }} />
            <img className="mf-mono guino" src="./mono/guino.png" alt="" draggable="false" />
            {pose !== "saluda" && <img className="mf-mono pose" src={`./mono/${pose}.png`} alt="" draggable="false" />}
          </span>
          <svg className="mf-nube" viewBox="-24 0 184 70">
            <defs>
              <linearGradient id="mf-nube-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff7d6" />
                <stop offset=".45" stopColor="#f6d77e" />
                <stop offset="1" stopColor="#d9a43a" />
              </linearGradient>
            </defs>
            <path className="mf-nube__estela" d="M12 56C-2 60-12 52-22 57M10 64C-4 68-10 62-20 66" fill="none" stroke="#f2c14e" strokeOpacity=".75" strokeWidth="3" strokeLinecap="round" />
            <path d="M14 50C4 50 4 36 16 35c0-11 16-15 22-5 6-14 28-14 32 0 8-10 28-8 28 6 14-6 28 2 22 12 14 0 14 14 0 14H22c-12 0-14-10-8-12Z" fill="url(#mf-nube-g)" stroke="#b07a1a" strokeWidth="2" />
            <path d="M38 47a8 8 0 1 1 12 6M82 44a9 9 0 1 0-14 7M104 51a6 6 0 1 1 9 4" fill="none" stroke="#fffaf0" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span className="mf-destellos">
            <i /><i /><i /><i />
          </span>
        </span>
        <span className="mf-sello" aria-hidden="true" translate="no">问</span>
      </button>
    </div>
  );
}
