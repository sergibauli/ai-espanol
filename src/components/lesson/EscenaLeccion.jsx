import * as React from "react";
import { HeartIcon, ZapIcon, TargetIcon, ClockIcon } from "lucide-react";
import { MonoNube } from "../../../packages/imperial/src/index.js";
import { sfx, estallido, fuegos } from "./fx.js";

/*
 * v34 · Puesta en escena de las lecciones (solo presentación: no toca la lógica ni el progreso).
 * Estilos en src/styles/v34-leccion.css. Todo se anima con transform/opacity; con prefers-reduced-motion
 * se ve la versión quieta, igual de clara.
 */

export const sinMovimiento = () => typeof window !== "undefined" && Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

/* ---------- Barra de progreso: el Rey Mono vuela en su nube, deja estela y enciende farolillos ---------- */
const HITOS = [25, 50, 75, 100];
export function BarraViaje({ progress, fin }) {
  const previo = React.useRef(progress);
  const [vuela, setVuela] = React.useState(false);
  React.useEffect(() => {
    if (progress > previo.current) {
      setVuela(true);
      const t = setTimeout(() => setVuela(false), 900);
      previo.current = progress;
      return () => clearTimeout(t);
    }
    previo.current = progress;
  }, [progress]);
  return (
    <div className={`lp-bar-wrap lx-barra ${vuela ? "is-vuela" : ""}`}>
      <div className="lp-bar">
        <i style={{ width: `${progress}%` }} />
      </div>
      <span className="lx-estela" style={{ left: `${progress}%` }} aria-hidden="true" />
      {HITOS.map((h) => (
        <span key={h} className={`lx-farol ${progress >= h ? "is-encendido" : ""} ${h === 100 ? "es-meta" : ""}`} style={{ left: `${h}%` }} aria-hidden="true">
          <i />
        </span>
      ))}
      <MonoNube pose={fin ? "trofeo" : vuela ? "feliz" : "poder"} tamano={54} className="lp-bar-mono lx-bar-mono" style={{ left: `${progress}%` }} />
    </div>
  );
}

/* ---------- Corazones: al perder uno, se parte y cae ---------- */
export function Corazones({ hearts }) {
  const previo = React.useRef(hearts);
  const [roto, setRoto] = React.useState(0);
  React.useEffect(() => {
    if (hearts < previo.current) {
      setRoto((n) => n + 1);
      sfx("corazon");
    }
    previo.current = hearts;
  }, [hearts]);
  return (
    <div className={`lp-hearts lx-vidas ${hearts <= 1 ? "es-ultima" : ""}`} aria-label={`Vidas · 生命 ${hearts}`}>
      <span className="lx-vidas__ico" key={`c${roto}`}>
        <HeartIcon size={20} fill="currentColor" />
      </span>
      <b key={`n${roto}`} className={roto ? "lx-vidas__num is-baja" : "lx-vidas__num"}>
        {hearts}
      </b>
      {roto > 0 && (
        <span className="lx-vidas__roto" key={`r${roto}`} aria-hidden="true">
          <i />
          <i />
        </span>
      )}
    </div>
  );
}

/* ---------- Racha: llamas doradas que crecen; con 5 y 10 seguidos, el Rey Mono cruza en la nube ---------- */
export function Racha({ racha }) {
  if (racha < 2) return null;
  const nivel = racha >= 8 ? 3 : racha >= 5 ? 2 : racha >= 3 ? 1 : 0;
  return (
    <div className={`ej-racha lx-racha lx-racha--${nivel}`} key={racha} title="Aciertos seguidos · 连续答对">
      <span className="lx-llamas" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <b>×{racha}</b>
      <span lang="zh">连对</span>
    </div>
  );
}

export function NubeVoladora({ racha }) {
  const [vuelo, setVuelo] = React.useState(null);
  React.useEffect(() => {
    if (racha === 5 || racha === 10 || racha === 15) {
      setVuelo(racha);
      sfx("racha");
      const t = setTimeout(() => setVuelo(null), 2600);
      return () => clearTimeout(t);
    }
  }, [racha]);
  if (!vuelo || sinMovimiento()) return null;
  // Dentro de .lp-root (fija): el vuelo cruza solo la zona de la lección, no el menú lateral
  return (
    <div className="lx-vuelo" aria-hidden="true" key={vuelo}>
      <span className="lx-vuelo__estela" />
      <MonoNube pose="poder" tamano={120} className="lx-vuelo__mono" />
      <span className="lx-vuelo__cartel" translate="no">
        <b>¡{vuelo} seguidas!</b>
        <small lang="zh">筋斗云 · 连对 {vuelo}</small>
      </span>
    </div>
  );
}

/* ---------- Sello del resultado: cae con golpe, destello dorado y lluvia de monedas; al fallar, tinta que se corre ---------- */
export function SelloResultado({ ok, racha = 0 }) {
  React.useEffect(() => {
    const quieto = sinMovimiento();
    const golpe = setTimeout(() => {
      sfx("sello");
      if (quieto) return;
      if (ok) {
        // Las monedas salen de la respuesta correcta (o del centro del pergamino)
        const ancla = document.querySelector(".lp-main .is-bien, .lp-main .ej-tablero, .lp-main .ej-input") || document.querySelector(".lp-main .pg-rollo");
        const r = ancla?.getBoundingClientRect();
        const x = r ? r.left + r.width / 2 : innerWidth / 2;
        const y = r ? r.top + r.height / 2 : innerHeight / 2;
        estallido(x, y, { fuerza: 1 + Math.min(racha, 8) * 0.12 });
        if (racha >= 3) sfx("racha");
      }
    }, quieto ? 0 : 230);
    return () => clearTimeout(golpe);
  }, [ok, racha]);
  return (
    <aside className={`ej-resultado lx-sello ${ok ? "es-bien" : "es-mal"}`} aria-hidden="true">
      <span className="lx-sello__onda" />
      <span className="ej-resultado__rayos" />
      <span className="lx-sello__cuerpo">
        <b lang="zh">{ok ? "对" : "错"}</b>
        <small>{ok ? "¡Bien!" : "Revisa"}</small>
      </span>
      {ok && racha >= 3 && (
        <span className="lx-sello__racha">
          ×{racha} <span lang="zh">连对</span>
        </span>
      )}
    </aside>
  );
}

/* Mancha de tinta que se corre sobre la opción equivocada (se coloca encima con coordenadas de la ventana) */
export function TintaFallo() {
  const [caja, setCaja] = React.useState(null);
  React.useLayoutEffect(() => {
    const el = document.querySelector(".lp-main .is-mal, .lp-main .ej-tablero, .lp-main .ej-input");
    const main = document.querySelector(".lp-main");
    if (!el || !main) return;
    const r = el.getBoundingClientRect();
    const m = main.getBoundingClientRect();
    setCaja({ left: r.left - m.left + main.scrollLeft, top: r.top - m.top + main.scrollTop, width: r.width, height: r.height });
  }, []);
  if (!caja) return null;
  return (
    <aside className="lx-tinta" style={caja} aria-hidden="true">
      <svg viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M30 48 C24 26 56 14 78 22 C96 8 132 12 146 26 C172 22 186 44 172 58 C182 78 150 90 128 82 C110 96 74 92 62 80 C38 88 16 70 30 48 Z" />
        <circle cx="22" cy="24" r="5" />
        <circle cx="182" cy="84" r="4" />
        <circle cx="170" cy="14" r="3" />
      </svg>
    </aside>
  );
}

/* ---------- Palabra escrita a pincel: aparece de izquierda a derecha con un trazo de oro debajo ---------- */
export function TituloPincel({ texto, zh }) {
  const largo = String(texto || "").length;
  const tam = largo > 34 ? "es-muy-larga" : largo > 18 ? "es-larga" : "";
  return (
    <div className={`lx-titulo ${tam}`}>
      <div className="lp-word lx-palabra">
        <span className="lx-palabra__tinta">{texto}</span>
      </div>
      <svg className="lx-trazo" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6 15 C60 6 120 20 170 11 S260 8 294 13" pathLength="1" />
      </svg>
      {zh && (
        <div className="lp-zh-big lx-zh" lang="zh">
          {zh}
        </div>
      )}
    </div>
  );
}

/* Frase de ejemplo sobre una banda de seda que entra desplegándose */
export function BandaSeda({ children }) {
  return (
    <div className="lp-example lx-seda">
      <span className="lx-seda__brillo" aria-hidden="true" />
      <span className="lx-seda__txt">{children}</span>
    </div>
  );
}

/* ---------- Pantalla final ---------- */
function useCuenta(objetivo, duracion = 1100, retraso = 500) {
  const [n, setN] = React.useState(() => (sinMovimiento() ? objetivo : 0));
  React.useEffect(() => {
    if (sinMovimiento()) return setN(objetivo);
    let raf = 0;
    let t0 = 0;
    const arranca = setTimeout(() => {
      const paso = (t) => {
        t0 ||= t;
        const k = Math.min(1, (t - t0) / duracion);
        setN(Math.round(objetivo * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(paso);
      };
      raf = requestAnimationFrame(paso);
    }, retraso);
    return () => {
      clearTimeout(arranca);
      cancelAnimationFrame(raf);
    };
  }, [objetivo, duracion, retraso]);
  return n;
}

export function FinLeccion({ result, children }) {
  const estrellas = result.accuracy >= 90 ? 3 : result.accuracy >= 60 ? 2 : 1;
  const xp = useCuenta(result.xp, 1000, 1200);
  const precision = useCuenta(result.accuracy, 1100, 1300);
  React.useEffect(() => {
    const t = [setTimeout(() => fuegos({ cohetes: result.perfect || result.unitDone ? 9 : 6 }), 350), ...[0, 1, 2].slice(0, estrellas).map((i) => setTimeout(() => sfx("tap"), 850 + i * 220)), setTimeout(() => sfx("sello"), 720)];
    return () => t.forEach(clearTimeout);
  }, [result, estrellas]);
  const titulo = result.unitDone ? `¡Clase ${result.clase} de la unidad ${result.unit} completada!` : result.perfect ? "¡Lección perfecta!" : "¡Lección completada!";
  const tituloZh = result.unitDone ? `第${result.clase}课完成 · 获得印章` : result.perfect ? "满分完成！" : "课程完成！";
  return (
    <div className={`lp-center lp-end lx-fin ${result.unitDone ? "unit-done" : ""}`}>
      <div className="lx-fin__escena">
        <span className="lx-fin__rayos" aria-hidden="true" />
        <span className="lx-fin__aura" aria-hidden="true" />
        <MonoNube pose="trofeo" tamano={150} className="lx-fin__mono" />
        <span className="lx-fin__sello" aria-hidden="true">
          <b lang="zh">{result.unitDone ? "单元" : result.perfect ? "满分" : "完成"}</b>
          <small>{result.unitDone ? "Clase" : result.perfect ? "Perfecta" : "Completada"}</small>
        </span>
      </div>
      <div className="lx-estrellas" role="img" aria-label={`${estrellas} de 3 estrellas · ${estrellas}颗星`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`lx-estrella ${i < estrellas ? "is-ganada" : ""}`} style={{ "--i": i }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.6l2.9 6 6.5.8-4.8 4.5 1.2 6.5L12 17.2l-5.8 3.2 1.2-6.5L2.6 9.4l6.5-.8z" />
            </svg>
          </span>
        ))}
      </div>
      <h2 className="lp-word lx-fin__titulo">{titulo}</h2>
      <div className="lp-zh-big lx-fin__zh">{tituloZh}</div>
      <div className="lp-stats lx-fin__stats">
        <div className="lp-stat xp lx-stat lx-stat--xp" style={{ "--i": 0 }}>
          <small>Experiencia · 经验</small>
          <b>
            <ZapIcon size={20} /> +{xp}
          </b>
        </div>
        <div className="lp-stat ok lx-stat lx-stat--ok" style={{ "--i": 1 }}>
          <small>Precisión · 正确率</small>
          <b>
            <TargetIcon size={20} /> {precision}%
          </b>
        </div>
        <div className="lp-stat time lx-stat lx-stat--t" style={{ "--i": 2 }}>
          <small>Tiempo · 用时</small>
          <b>
            <ClockIcon size={20} /> {Math.floor(result.seconds / 60)}:{String(result.seconds % 60).padStart(2, "0")}
          </b>
        </div>
      </div>
      {children}
    </div>
  );
}
