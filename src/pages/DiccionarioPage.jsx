import * as React from "react";
import { createPortal } from "react-dom";
import { Volume2Icon, SearchIcon, XIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon, SnailIcon, SparklesIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { speak } from "../components/lesson/fx.js";
import { useFavorites } from "../lib/favorites.js";
import { temaZh, primerHan, ESTILOS_TEMA } from "../lib/temasDiccionario.js";
import "../styles/diccionario-imperial.css";
import "../styles/movil-recursos.css";

// Diccionario español–chino: cuatro tomos (uno por nivel, cada uno con su mundo),
// buscador protagonista y fichas de pergamino/tablilla con sello y audio con la voz del profesor.
const TOMOS = [
  { key: "A1", zh: "入门", nombre: "Tomo de Bambú", nombreZh: "竹简卷", emblema: "竹", load: () => import("../data/diccionarios/a1Dictionary.js").then((m) => m.a1Dictionary) },
  { key: "A2", zh: "初级", nombre: "Tomo de Linternas", nombreZh: "灯笼卷", emblema: "灯", load: () => import("../data/diccionarios/a2Dictionary.js").then((m) => m.a2Dictionary) },
  { key: "B1", zh: "中级", nombre: "Tomo de Tinta", nombreZh: "墨卷", emblema: "墨", load: () => import("../data/diccionarios/b1Dictionary.js").then((m) => m.b1Dictionary) },
  { key: "B2", zh: "高级", nombre: "Tomo del Palacio", nombreZh: "宫阙卷", emblema: "宫", load: () => import("../data/diccionarios/b2Dictionary.js").then((m) => m.b2Dictionary) },
];
const PAGE = 36;
const TEMAS_VISIBLES = 10;
const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const SUGERENCIAS = { A1: ["hola", "familia", "casa", "comer", "rojo"], A2: ["viaje", "salud", "trabajo", "amigo", "ciudad"], B1: ["empleo", "cultura", "noticia", "ley", "ciencia"], B2: ["historia", "filosofía", "economía", "arte", "sociedad"] };

const norm = (text) => String(text || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
// Inicial de la palabra sin signos (¿, ¡) ni tildes; la Ñ se conserva
const inicial = (text) => {
  const letra = String(text || "").replace(/^[^\p{L}]+/u, "")[0] || "";
  return letra.toUpperCase() === "Ñ" ? "Ñ" : norm(letra).toUpperCase();
};

/** Resalta en la palabra la parte que coincide con la búsqueda (sin tildes). */
function Resaltado({ texto, normal, consulta }) {
  if (!consulta || normal.length !== texto.length) return texto;
  const i = normal.indexOf(consulta);
  if (i < 0) return texto;
  return (
    <>
      {texto.slice(0, i)}
      <mark>{texto.slice(i, i + consulta.length)}</mark>
      {texto.slice(i + consulta.length)}
    </>
  );
}

const Ficha = React.memo(function Ficha({ entrada, indice, consulta, favorita, onAbrir, onFavorita }) {
  const { w: word } = entrada;
  return (
    <article className="dz-ficha" style={{ "--i": indice % 12 }}>
      <div className="dz-ficha__in">
        <button type="button" className="dz-ficha__abrir" onClick={() => onAbrir(indice)} aria-label={`${word.es} · ${word.zh} · Ver ficha · 查看词条`} />
        <span className="dz-ficha__sello" translate="no" aria-hidden="true">
          {primerHan(word.zh)}
        </span>
        <h3 className="dz-ficha__es">
          <Resaltado texto={word.es} normal={entrada.n} consulta={consulta} />
        </h3>
        <p className="dz-ficha__zh">{word.zh}</p>
        <span className="dz-ficha__tema">
          {word.theme}
          {temaZh(word.theme) && <small> · {temaZh(word.theme)}</small>}
        </span>
        <button type="button" className="dz-ficha__audio dz-moneda" onClick={() => speak(word.es)} aria-label={`Escuchar «${word.es}» · 听发音`}>
          <Volume2Icon size={20} />
        </button>
        <button type="button" className={`dz-ficha__fav ${favorita ? "is-on" : ""}`} onClick={() => onFavorita(word)} aria-pressed={favorita} aria-label="Guardar en Memoria · 收藏">
          <HeartIcon size={15} />
        </button>
        <span className="dz-ficha__brillo" aria-hidden="true" />
      </div>
    </article>
  );
});

/** Ilustración de cada tomo (SVG decorativo): bambú, farol, montes de tinta con luna y tejado del palacio. */
function TomoArte({ k }) {
  if (k === "A1")
    return (
      <svg className="dz-arte" viewBox="0 0 120 80" aria-hidden="true">
        <g fill="#3d6b26">
          <rect x="16" y="0" width="7" height="80" rx="3" />
          <rect x="38" y="8" width="6" height="72" rx="3" />
          <rect x="94" y="0" width="7" height="80" rx="3" />
        </g>
        <g stroke="#eadb9f" strokeWidth="1.6">
          <path d="M15 20h9M15 46h9M15 70h9M37 30h8M37 58h8M93 16h9M93 42h9M93 66h9" />
        </g>
        <g fill="#2f8f52">
          <path d="M23 22q16-12 32-4q-16 9-32 4z" />
          <path d="M23 24q10 10 26 12q-12-12-26-12z" opacity=".8" />
          <path d="M44 32q14-10 28-2q-14 8-28 2z" />
          <path d="M94 18q-16-12-30-3q15 8 30 3z" />
          <path d="M94 44q-14-6-26 2q14 6 26-2z" opacity=".85" />
          <path d="M101 68q8-12 18-12q-6 12-18 12z" />
        </g>
      </svg>
    );
  if (k === "A2")
    return (
      <svg className="dz-arte" viewBox="0 0 120 80" aria-hidden="true">
        <defs>
          <radialGradient id="dzFarolG" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#fff1a8" />
            <stop offset=".35" stopColor="#ffb347" />
            <stop offset=".75" stopColor="#e0283a" />
            <stop offset="1" stopColor="#7a0a1a" />
          </radialGradient>
        </defs>
        {[
          [60, 0, 1],
          [18, 14, 0.55],
          [102, 10, 0.6],
        ].map(([x, y, e]) => (
          <g key={x} transform={`translate(${x} ${y}) scale(${e})`}>
            <line x1="0" y1="0" x2="0" y2="10" stroke="#f2c14e" strokeWidth="2" />
            <rect x="-12" y="8" width="24" height="6" rx="2" fill="#f2c14e" />
            <ellipse cx="0" cy="36" rx="27" ry="23" fill="url(#dzFarolG)" />
            <g fill="none" stroke="#7a0a1a" strokeOpacity=".45" strokeWidth="1.4">
              <ellipse cx="0" cy="36" rx="9" ry="23" />
              <ellipse cx="0" cy="36" rx="18" ry="23" />
            </g>
            <rect x="-12" y="57" width="24" height="6" rx="2" fill="#f2c14e" />
            <path d="M-4 63h8l2 14h-12z" fill="#c8102e" />
          </g>
        ))}
      </svg>
    );
  if (k === "B1")
    return (
      <svg className="dz-arte" viewBox="0 0 120 80" aria-hidden="true">
        <circle cx="88" cy="20" r="12" fill="#f2c14e" />
        <circle cx="88" cy="20" r="17" fill="#f2c14e" opacity=".18" />
        <path d="M0 70L18 40L30 52L46 24L62 50L74 38L92 60L104 48L120 66V80H0Z" fill="#4a4652" />
        <path d="M0 76L22 56L38 66L56 46L74 64L90 54L120 74V80H0Z" fill="#26232c" />
        <path d="M8 62q30-8 60 2" stroke="#f2c14e" strokeWidth="1.2" fill="none" opacity=".6" />
        <path d="M30 20q6-4 12 0M40 16q5-3 10 0" stroke="#f6e7c8" strokeWidth="1.3" fill="none" />
      </svg>
    );
  return (
    <svg className="dz-arte" viewBox="0 0 120 80" aria-hidden="true">
      <path d="M8 34Q60 18 112 34L100 30Q60 22 20 30Z" fill="#f2c14e" />
      <path d="M14 34h92l-6 8H20z" fill="#b8860b" />
      <path d="M30 22Q60 10 90 22L82 19Q60 13 38 19Z" fill="#f6d77e" />
      <rect x="36" y="22" width="48" height="10" fill="#8f0c21" />
      <rect x="24" y="42" width="72" height="28" fill="#a3121f" />
      <g fill="#f2c14e">
        <rect x="30" y="42" width="4" height="28" />
        <rect x="46" y="42" width="4" height="28" />
        <rect x="70" y="42" width="4" height="28" />
        <rect x="86" y="42" width="4" height="28" />
      </g>
      <rect x="54" y="50" width="12" height="20" rx="6" fill="#3a1858" />
      <path d="M16 70h88l6 10H10z" fill="#d9c49a" />
    </svg>
  );
}

/** Cubierta de un tomo (se usa en la estantería y en la animación de apertura). */
function TomoTapa({ t, cuenta }) {
  return (
    <>
      <span className="dz-tomo__esquinas" aria-hidden="true" />
      <span className="dz-tomo__placa">
        <span className="dz-tomo__emblema" translate="no" aria-hidden="true">
          {t.emblema}
        </span>
        <span className="dz-tomo__nivel">{t.key}</span>
      </span>
      <TomoArte k={t.key} />
      <span className="dz-tomo__nombre">
        {t.nombre}
        <small>
          {t.nombreZh} · {t.zh}
        </small>
      </span>
      {cuenta ? <span className="dz-tomo__cuenta">{cuenta.toLocaleString("es-ES")} palabras · 词</span> : null}
      <span className="dz-tomo__brillo" aria-hidden="true" />
    </>
  );
}

/** Escala la cubierta pequeña (190×206) para llenar una tapa grande sin deformarla. */
function useTapaGrande(ref) {
  React.useLayoutEffect(() => {
    const caja = ref.current;
    const tapa = caja?.querySelector(".dz-tomo__tapa");
    if (!caja || !tapa) return;
    const ajustar = () => {
      const w = caja.offsetWidth;
      const h = caja.offsetHeight;
      const e = Math.min(w / 190, h / 206) || 1;
      tapa.style.width = `${w / e}px`;
      tapa.style.height = `${h / e}px`;
      tapa.style.transform = `scale(${e})`;
    };
    ajustar();
    const obs = typeof ResizeObserver !== "undefined" ? new ResizeObserver(ajustar) : null;
    obs?.observe(caja);
    return () => obs?.disconnect();
  }, [ref]);
}

/** Animación al elegir tomo: el libro vuela al centro, abre la tapa y pasa hojas. */
function AperturaTomo({ t, onFin }) {
  const frenteRef = React.useRef(null);
  useTapaGrande(frenteRef);
  React.useEffect(() => {
    const id = setTimeout(onFin, 3000);
    return () => clearTimeout(id);
  }, [onFin]);
  return createPortal(
    <div className="dz-apertura" data-tomo={t.key} onClick={onFin} onAnimationEnd={(e) => e.target === e.currentTarget && onFin()} role="presentation">
      <div className="dz-apertura__escena">
        <div className="dz-apertura__libro">
          <div className="dz-apertura__pag">
            <span className="dz-apertura__emb" translate="no" aria-hidden="true">
              {t.emblema}
            </span>
            <b>{t.nombre}</b>
            <span className="dz-apertura__zh">{t.nombreZh}</span>
            <small>Abriendo el tomo {t.key} · 正在打开</small>
          </div>
          <span className="dz-ap-hoja" style={{ "--k": 0 }} />
          <span className="dz-ap-hoja" style={{ "--k": 1 }} />
          <span className="dz-ap-hoja" style={{ "--k": 2 }} />
          <div className="dz-apertura__tapa">
            <div ref={frenteRef} className={`dz-apertura__frente dz-tomo--${t.key.toLowerCase()}`}>
              <span className="dz-tomo__tapa">
                <TomoTapa t={t} />
              </span>
            </div>
            <div className="dz-apertura__dorso">
              <span translate="no" aria-hidden="true">
                {t.emblema}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/** Ficha abierta como un libro: la tapa del tomo se abre y «Anterior/Siguiente» pasan la página. */
function Pliego({ word, tomo, posicion, total, favorita, onFavorita, onCerrar, onMover }) {
  const cerrarRef = React.useRef(null);
  const acciones = React.useRef({ onCerrar, onMover });
  acciones.current = { onCerrar, onMover };
  const previa = React.useRef(posicion);
  const [hoja, setHoja] = React.useState(null);
  const [navegado, setNavegado] = React.useState(false);
  const frenteRef = React.useRef(null);
  useTapaGrande(frenteRef);
  React.useEffect(() => {
    if (previa.current !== posicion) {
      setHoja({ dir: posicion > previa.current ? "sig" : "ant", id: posicion });
      setNavegado(true);
    }
    previa.current = posicion;
  }, [posicion]);
  React.useEffect(() => {
    const previo = document.activeElement;
    cerrarRef.current?.focus();
    const alPulsar = (e) => {
      if (e.key === "Escape") acciones.current.onCerrar();
      else if (e.key === "ArrowRight") acciones.current.onMover(1);
      else if (e.key === "ArrowLeft") acciones.current.onMover(-1);
    };
    document.addEventListener("keydown", alPulsar);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      previo?.focus?.({ preventScroll: true });
    };
  }, []);
  React.useEffect(() => {
    speak(word.es);
  }, [word]);
  const zhTema = temaZh(word.theme);

  return createPortal(
    <div className={`dz-modal ${navegado ? "is-navegado" : ""}`} data-tomo={tomo.key} role="dialog" aria-modal="true" aria-label={`${word.es} · ${word.zh}`} onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="dz-lf">
        <div className="dz-lf__libro">
          <span className="dz-lf__base" aria-hidden="true" />
          <section className="dz-lf__pag dz-lf__pag--izq">
            <div className="dz-lf__contenido" key={`i${posicion}`}>
              <span className="dz-lf__tomo">
                {tomo.key} · {tomo.nombre} · {tomo.nombreZh}
              </span>
              <span className="dz-lf__sello" translate="no" aria-hidden="true">
                {primerHan(word.zh)}
              </span>
              <h2 className="dz-lf__es">{word.es}</h2>
              <p className="dz-lf__zh">{word.zh}</p>
              <div className="dz-pliego__audios">
                <button type="button" className="dz-audio-grande" onClick={() => speak(word.es)}>
                  <Volume2Icon size={26} />
                  <span>
                    Escuchar <small>听发音</small>
                  </span>
                </button>
                <button type="button" className="dz-audio-lento" onClick={() => speak(word.es, 0.6)}>
                  <SnailIcon size={18} />
                  <span>
                    Lento <small>慢速</small>
                  </span>
                </button>
              </div>
              <span className="dz-lf__folio">— {posicion + 1} —</span>
            </div>
          </section>
          <section className="dz-lf__pag dz-lf__pag--der">
            <span className="dz-lf__marca" aria-hidden="true">
              <TomoArte k={tomo.key} />
            </span>
            <button ref={cerrarRef} type="button" className="dz-pliego__cerrar dz-lf__cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
              <XIcon size={20} />
            </button>
            <div className="dz-lf__contenido" key={`d${posicion}`}>
              {word.explanation && (
                <section className="dz-lf__bloque">
                  <h4>Explicación · 讲解</h4>
                  <p className="dz-lf__capitular">{word.explanation}</p>
                </section>
              )}
              {word.exampleEs && (
                <section className="dz-lf__bloque dz-lf__ejemplo">
                  <h4>Ejemplo · 例句</h4>
                  <button type="button" onClick={() => speak(word.exampleEs)} aria-label={`Escuchar el ejemplo · 听例句: ${word.exampleEs}`}>
                    <span className="dz-lf__moneda" aria-hidden="true">
                      <Volume2Icon size={18} />
                    </span>
                    <span>
                      “{word.exampleEs}”<small>{word.exampleZh}</small>
                    </span>
                  </button>
                </section>
              )}
              <div className="dz-pliego__pie">
                <span className="dz-pliego__temaetq">
                  {word.theme}
                  {zhTema && ` · ${zhTema}`}
                </span>
                <button type="button" className={`dz-pliego__fav ${favorita ? "is-on" : ""}`} aria-pressed={favorita} onClick={() => onFavorita(word)}>
                  <HeartIcon size={16} /> {favorita ? "Guardada · 已收藏" : "Guardar en Memoria · 收藏"}
                </button>
              </div>
              <span className="dz-lf__folio">
                {posicion + 1} / {total}
              </span>
            </div>
            <div className="dz-pliego__nav dz-lf__nav">
              <button type="button" onClick={() => onMover(-1)} disabled={posicion === 0}>
                <ChevronLeftIcon size={18} /> Anterior · 上一个
              </button>
              <button type="button" onClick={() => onMover(1)} disabled={posicion >= total - 1}>
                Siguiente · 下一个 <ChevronRightIcon size={18} />
              </button>
            </div>
          </section>
          {hoja && <span key={hoja.id} className={`dz-lf__hoja dz-lf__hoja--${hoja.dir}`} aria-hidden="true" onAnimationEnd={() => setHoja(null)} />}
          <div className={`dz-lf__tapa dz-tomo--${tomo.key.toLowerCase()}`} aria-hidden="true">
            <div className="dz-lf__frente" ref={frenteRef}>
              <span className="dz-tomo__tapa">
                <TomoTapa t={tomo} />
              </span>
            </div>
            <div className="dz-lf__dorso" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

const CHISPAS = [-210, -150, -95, -40, 15, 70, 120, 175, 230, -260, 260, 0].map((x, k) => ({ x, d: (k * 0.37) % 3.2, s: 3 + (k % 3) * 2 }));
const FAROLES = [
  { lado: "left", pos: "3%", top: 520, esc: 1, d: 0 },
  { lado: "right", pos: "2%", top: 760, esc: 0.75, d: 1.3 },
  { lado: "left", pos: "1%", top: 1250, esc: 0.6, d: 2.1 },
  { lado: "right", pos: "4%", top: 1700, esc: 0.9, d: 0.7 },
];
const reduceMovimiento = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const punteroFino = () => typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

/** Inclina un elemento siguiendo el puntero (variables CSS, un cálculo por fotograma). */
function useInclinacion(ref, { selector, max = 8 } = {}) {
  React.useEffect(() => {
    const raiz = ref.current;
    if (!raiz || reduceMovimiento() || !punteroFino()) return;
    let marco = 0;
    let actual = null;
    const soltar = (el) => el && (el.style.removeProperty("--rx"), el.style.removeProperty("--ry"), el.style.removeProperty("--mx"), el.style.removeProperty("--my"), el.classList.remove("is-inclinada"));
    const mover = (e) => {
      const el = selector ? e.target.closest?.(selector) : raiz;
      if (actual && actual !== el) soltar(actual);
      actual = el && raiz.contains(el) ? el : null;
      if (!actual || marco) return;
      const { clientX, clientY } = e;
      marco = requestAnimationFrame(() => {
        marco = 0;
        if (!actual) return;
        const r = actual.getBoundingClientRect();
        const x = (clientX - r.left) / r.width - 0.5;
        const y = (clientY - r.top) / r.height - 0.5;
        actual.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`);
        actual.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`);
        actual.style.setProperty("--mx", (x * 100).toFixed(1));
        actual.style.setProperty("--my", (y * 100).toFixed(1));
        actual.classList.add("is-inclinada");
      });
    };
    const salir = () => (soltar(actual), (actual = null));
    raiz.addEventListener("pointermove", mover);
    raiz.addEventListener("pointerleave", salir);
    return () => {
      cancelAnimationFrame(marco);
      raiz.removeEventListener("pointermove", mover);
      raiz.removeEventListener("pointerleave", salir);
    };
  }, [ref, selector, max]);
}

/** Escena de fondo: luna, montes de tinta en tres planos con paralaje, nubes, farolillos y celosía. */
function Fondo() {
  return (
    <div className="dz-fondo" aria-hidden="true">
      <span className="dz-fondo__luna" />
      <svg className="dz-fondo__monte dz-fondo__monte--1" viewBox="0 0 1200 260" preserveAspectRatio="none">
        <path d="M0 170 L90 120 L170 150 L260 80 L350 140 L430 100 L520 150 L610 70 L700 130 L790 95 L880 150 L960 85 L1050 135 L1130 105 L1200 140 V260 H0Z" />
      </svg>
      <svg className="dz-fondo__monte dz-fondo__monte--2" viewBox="0 0 1200 260" preserveAspectRatio="none">
        <path d="M0 200 L110 150 L200 185 L300 130 L400 190 L500 150 L600 195 L720 140 L820 190 L930 150 L1030 195 L1120 160 L1200 185 V260 H0Z" />
      </svg>
      <svg className="dz-fondo__monte dz-fondo__monte--3" viewBox="0 0 1200 260" preserveAspectRatio="none">
        <path d="M0 230 L140 195 L260 225 L380 190 L520 232 L660 200 L800 235 L940 205 L1080 232 L1200 210 V260 H0Z" />
      </svg>
      <span className="dz-fondo__nube dz-fondo__nube--1" />
      <span className="dz-fondo__nube dz-fondo__nube--2" />
      <span className="dz-fondo__nube dz-fondo__nube--3" />
      {FAROLES.map((f, k) => (
        <span key={k} className="dz-farol" style={{ [f.lado]: f.pos, top: f.top, "--esc": f.esc, "--d": `${f.d}s` }}>
          <span className="dz-farol__cuerpo" />
        </span>
      ))}
      <span className="dz-fondo__celosia" />
    </div>
  );
}

export default function DiccionarioPage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [level, setLevel] = React.useState("A1");
  const [words, setWords] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [recuentos, setRecuentos] = React.useState({});
  const [q, setQ] = React.useState("");
  const [theme, setTheme] = React.useState("");
  const [letra, setLetra] = React.useState("");
  const [limit, setLimit] = React.useState(PAGE);
  const [todosTemas, setTodosTemas] = React.useState(false);
  const [abierta, setAbierta] = React.useState(-1);
  const [intento, setIntento] = React.useState(0);
  const [lista, setLista] = React.useState(false);
  const [abriendo, setAbriendo] = React.useState(null);
  const resultadosRef = React.useRef(null);
  const abrirTomo = (clave) => {
    if (clave === level) return;
    setLevel(clave);
    if (reduceMovimiento()) return;
    setAbriendo(clave);
  };
  const finApertura = React.useCallback(() => {
    setAbriendo(null);
    resultadosRef.current?.scrollIntoView({ behavior: reduceMovimiento() ? "auto" : "smooth", block: "start" });
  }, []);
  React.useEffect(() => {
    const t = setTimeout(() => setLista(true), 3200);
    return () => clearTimeout(t);
  }, []);
  const tomo = TOMOS.find((t) => t.key === level);
  const centinela = React.useRef(null);
  const portadaRef = React.useRef(null);
  const rejillaRef = React.useRef(null);
  useInclinacion(portadaRef, { max: 5 });
  useInclinacion(rejillaRef, { selector: ".dz-ficha", max: 10 });

  React.useEffect(() => {
    let cancelado = false;
    setWords(null);
    setError(false);
    setTheme("");
    setLetra("");
    setLimit(PAGE);
    setAbierta(-1);
    tomo
      .load()
      .then((lista) => {
        if (cancelado) return;
        setWords(lista);
        setRecuentos((r) => ({ ...r, [tomo.key]: lista.length }));
      })
      .catch(() => !cancelado && setError(true));
    return () => {
      cancelado = true;
    };
  }, [level, intento]);

  // Índice preparado una vez por nivel: la búsqueda solo compara cadenas ya normalizadas
  const indice = React.useMemo(() => (words || []).map((w, id) => ({ w, id, n: norm(w.es), ini: inicial(w.es) })), [words]);
  const themes = React.useMemo(() => {
    const cuenta = new Map();
    for (const { w } of indice) if (w.theme) cuenta.set(w.theme, (cuenta.get(w.theme) || 0) + 1);
    return [...cuenta];
  }, [indice]);
  const letrasConPalabras = React.useMemo(() => new Set(indice.map((e) => e.ini)), [indice]);
  const palabraDelDia = words && words.length ? words[Math.floor(Date.now() / 86400000) % words.length] : null;

  const qDiferida = React.useDeferredValue(q);
  const consulta = norm(qDiferida.trim());
  const consultaZh = qDiferida.trim();
  const list = React.useMemo(
    () => indice.filter((e) => (!theme || e.w.theme === theme) && (!letra || e.ini === letra) && (!consulta || e.n.includes(consulta) || String(e.w.zh).includes(consultaZh))),
    [indice, theme, letra, consulta, consultaZh]
  );
  const visibles = list.slice(0, limit);
  // El Rey Mono reacciona a la búsqueda: guiña al empezar, celebra si hay resultados y se pone serio si no
  const pose = !words || !consulta ? "guino" : list.length ? "feliz" : "serio";
  const hayFiltros = Boolean(q || theme || letra);
  const limpiar = () => (setQ(""), setTheme(""), setLetra(""), setLimit(PAGE));
  const buscar = (texto) => (setQ(texto), setLimit(PAGE));

  // Carga progresiva al acercarse al final (además del botón «Ver más»)
  React.useEffect(() => {
    const nodo = centinela.current;
    if (!nodo || limit >= list.length || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver((ents) => ents.some((e) => e.isIntersecting) && setLimit((n) => n + PAGE), { rootMargin: "700px 0px" });
    obs.observe(nodo);
    return () => obs.disconnect();
  }, [limit, list.length]);

  const alternarFavorita = React.useCallback(
    (word) => (isFavorite(word.es) ? removeFavorite(word.es) : addFavorite(word.es, word.zh, `Diccionario ${word.level || level}`, word.level || level)),
    [isFavorite, removeFavorite, addFavorite, level]
  );
  const cerrar = React.useCallback(() => setAbierta(-1), []);
  const mover = React.useCallback(
    (paso) => {
      const j = Math.max(0, Math.min(list.length - 1, abierta + paso));
      if (j >= limit) setLimit((n) => n + PAGE);
      setAbierta(j);
    },
    [abierta, list.length, limit]
  );
  const temasMostrados = todosTemas ? themes : themes.slice(0, TEMAS_VISIBLES);
  const elegirTema = (t) => {
    setTheme(t);
    setLimit(PAGE);
    if (t && !temasMostrados.some(([x]) => x === t)) setTodosTemas(true);
  };

  return (
    <LightShell>
      <div className="unit-page dz" data-tomo={level} ref={rejillaRef}>
        <Fondo />

        <header className={`dz-portada ${lista ? "is-lista" : ""}`} ref={portadaRef}>
          <div className="dz-chispas" aria-hidden="true">
            {CHISPAS.map((c, k) => (
              <span key={k} style={{ "--x": `${c.x}px`, "--d": `${c.d}s`, "--s": `${c.s}px` }} />
            ))}
          </div>
          <div className="dz-escena">
            <div className="dz-inclina">
              <div className="dz-libro3d">
                <div className="dz-libro3d__pagina">
                  <div className="dz-libro3d__movil">
                    <span className="dz-ceja">Biblioteca imperial · 皇家书阁</span>
                    <h1 className="dz-titulo">
                      Diccionario<span className="dz-titulo__zh">西汉词典</span>
                    </h1>
                  </div>
                  <h2 className="dz-pagina__titulo">
                    Busca una palabra <span>查一个词</span>
                  </h2>
                  <label className="dz-buscador">
                    <span className="dz-buscador__icono" aria-hidden="true">
                      <SearchIcon size={22} />
                    </span>
                    <input
                      type="search"
                      value={q}
                      onChange={(e) => buscar(e.target.value)}
                      placeholder="Español o chino · 西语或中文"
                      aria-label="Buscar palabra · 搜索单词"
                      enterKeyHint="search"
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {q && (
                      <button type="button" className="dz-buscador__borrar" onClick={() => buscar("")} aria-label="Borrar · 清除">
                        <XIcon size={18} />
                      </button>
                    )}
                  </label>
                  <div className="dz-sugerencias">
                    <span>Prueba · 试试:</span>
                    {SUGERENCIAS[level].map((s) => (
                      <button key={s} type="button" onClick={() => buscar(s)} className={q === s ? "is-on" : ""}>
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="dz-pagina__pista">Toca una ficha para abrirla · 点击词卡查看详情</p>
                  <span className="dz-libro3d__cinta" aria-hidden="true" />
                </div>
                <span className="dz-hoja" style={{ "--k": 0 }} aria-hidden="true" />
                <span className="dz-hoja" style={{ "--k": 1 }} aria-hidden="true" />
                <span className="dz-hoja" style={{ "--k": 2 }} aria-hidden="true" />
                <div className="dz-libro3d__tapa">
                  <div className="dz-libro3d__frente" aria-hidden="true">
                    <span className="dz-tapa__esquina dz-tapa__esquina--1" />
                    <span className="dz-tapa__esquina dz-tapa__esquina--2" />
                    <span className="dz-tapa__esquina dz-tapa__esquina--3" />
                    <span className="dz-tapa__esquina dz-tapa__esquina--4" />
                    <span className="dz-tapa__medallon" translate="no">
                      典
                    </span>
                    <span className="dz-tapa__titulo">Diccionario</span>
                    <span className="dz-tapa__zh" translate="no">
                      西汉词典
                    </span>
                  </div>
                  <div className="dz-libro3d__dorso">
                    <span className="dz-ceja">Biblioteca imperial · 皇家书阁</span>
                    <h1 className="dz-titulo">
                      Diccionario<span className="dz-titulo__zh">西汉词典</span>
                    </h1>
                    <p className="dz-dorso__sub">
                      {words ? `${words.length.toLocaleString("es-ES")} palabras del ${tomo.nombre.toLowerCase()} con audio, explicación y ejemplo.` : "Abriendo el tomo…"}
                      <span>每个词都有真人发音、中文讲解和例句。</span>
                    </p>
                    <div className="dz-cifras">
                      <span>
                        <b>{words ? words.length.toLocaleString("es-ES") : "…"}</b>palabras · 词
                      </span>
                      <span>
                        <b>{themes.length || "…"}</b>temas · 主题
                      </span>
                      <span>
                        <b>4</b>tomos · 卷
                      </span>
                    </div>
                    <span className="dz-dorso__sello" translate="no" aria-hidden="true">
                      辞<br />典
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img key={pose} className="dz-portada__mono" src={`./mono/${pose}.webp`} alt="" aria-hidden="true" width="150" height="150" decoding="async" />
        </header>

        <nav className="dz-tomos" role="tablist" aria-label="Nivel · 级别">
          {TOMOS.map((t, n) => (
            <button key={t.key} type="button" role="tab" style={{ "--n": n }} aria-selected={level === t.key} className={`dz-tomo dz-tomo--${t.key.toLowerCase()} ${level === t.key ? "is-on" : ""}`} onClick={() => abrirTomo(t.key)}>
              <span className="dz-tomo__flota">
                <span className="dz-tomo__libro">
                  <span className="dz-tomo__tapa">
                    <TomoTapa t={t} cuenta={recuentos[t.key]} />
                  </span>
                  <span className="dz-tomo__lomo" translate="no" aria-hidden="true">
                    {t.key} · {t.nombreZh}
                  </span>
                  <span className="dz-tomo__cantos" aria-hidden="true" />
                  <span className="dz-tomo__cabeza" aria-hidden="true" />
                </span>
              </span>
              <span className="dz-tomo__sombra" aria-hidden="true" />
            </button>
          ))}
        </nav>
        <div className="dz-estante" aria-hidden="true" />

        {palabraDelDia && (
          <section className="dz-decreto" aria-label="Palabra del día · 每日一词">
            <span className="dz-decreto__sello" translate="no" aria-hidden="true">
              {primerHan(palabraDelDia.zh)}
            </span>
            <div className="dz-decreto__texto">
              <span className="dz-decreto__ceja">
                <SparklesIcon size={13} /> Palabra del día · 每日一词 · {level}
              </span>
              <div className="dz-decreto__palabra">
                <b>{palabraDelDia.es}</b>
                <span>{palabraDelDia.zh}</span>
              </div>
              {palabraDelDia.exampleEs && (
                <p>
                  “{palabraDelDia.exampleEs}” <span>{palabraDelDia.exampleZh}</span>
                </p>
              )}
            </div>
            <button type="button" className="dz-decreto__audio dz-moneda" onClick={() => speak(palabraDelDia.exampleEs || palabraDelDia.es)} aria-label="Escuchar · 听">
              <Volume2Icon size={24} />
            </button>
          </section>
        )}

        <section className="dz-filtros" aria-label="Filtros · 筛选">
          <div className="dz-temas" role="group" aria-label="Temas · 主题">
            <button type="button" aria-pressed={!theme} className={`dz-tema dz-tema--todos ${!theme ? "is-on" : ""}`} onClick={() => elegirTema("")}>
              <span className="dz-tema__emblema" translate="no" aria-hidden="true">
                全
              </span>
              <span className="dz-tema__txt">
                Todos los temas<small>全部主题</small>
              </span>
            </button>
            {temasMostrados.map(([t, n], i) => (
              <button key={t} type="button" aria-pressed={theme === t} className={`dz-tema dz-tema--${ESTILOS_TEMA[i % ESTILOS_TEMA.length]} ${theme === t ? "is-on" : ""}`} style={{ "--t": i + 1 }} onClick={() => elegirTema(theme === t ? "" : t)}>
                <span className="dz-tema__emblema" translate="no" aria-hidden="true">
                  {primerHan(temaZh(t), "词")}
                </span>
                <span className="dz-tema__txt">
                  {t}
                  {temaZh(t) && <small>{temaZh(t)}</small>}
                </span>
                <span className="dz-tema__n">{n}</span>
              </button>
            ))}
            {themes.length > TEMAS_VISIBLES && (
              <button type="button" className="dz-tema-mas" onClick={() => setTodosTemas((v) => !v)} aria-expanded={todosTemas}>
                {todosTemas ? "Menos temas · 收起" : `+${themes.length - TEMAS_VISIBLES} temas · 更多主题`}
              </button>
            )}
          </div>

          <div className="dz-abc" role="group" aria-label="Por letra · 按字母">
            <button type="button" className={!letra ? "is-on" : ""} onClick={() => (setLetra(""), setLimit(PAGE))} aria-pressed={!letra}>
              A–Z
            </button>
            {ALFABETO.map((l) => (
              <button key={l} type="button" translate="no" className={letra === l ? "is-on" : ""} disabled={!letrasConPalabras.has(l)} aria-pressed={letra === l} onClick={() => (setLetra(letra === l ? "" : l), setLimit(PAGE))}>
                {l}
              </button>
            ))}
          </div>
        </section>

        <section className="dz-portadilla" ref={resultadosRef} key={`p${level}`} aria-label={`${tomo.nombre} · ${tomo.nombreZh}`}>
          <span className={`dz-portadilla__arte dz-tomo--${level.toLowerCase()}`}>
            <TomoArte k={level} />
          </span>
          <div>
            <span className="dz-portadilla__ceja">Tomo abierto · 已打开的卷</span>
            <h2>
              {tomo.nombre} <span>{tomo.nombreZh}</span>
            </h2>
            <p>
              Nivel {level} · {tomo.zh} {words ? `· ${words.length.toLocaleString("es-ES")} palabras · ${themes.length} temas` : ""}
            </p>
          </div>
          <span className="dz-portadilla__sello" translate="no" aria-hidden="true">
            {tomo.emblema}
          </span>
        </section>

        {words && (
          <div className="dz-recuento" aria-live="polite">
            <span>
              <b>{list.length.toLocaleString("es-ES")}</b> {list.length === 1 ? "palabra" : "palabras"} · 个单词
              {letra && ` · ${letra}`}
              {theme && ` · ${theme}`}
              {q.trim() && ` · «${q.trim()}»`}
            </span>
            {hayFiltros && (
              <button type="button" onClick={limpiar}>
                <XIcon size={14} /> Quitar filtros · 清除筛选
              </button>
            )}
          </div>
        )}

        <div className="dz-resultados" key={level}>
          {error ? (
            <div className="dz-vacio" role="alert">
              <span className="dz-vacio__sello" aria-hidden="true">
                误
              </span>
              <p>
                No se pudo abrir este tomo
                <span>无法打开这一卷，请重试</span>
              </p>
              <button type="button" onClick={() => setIntento((n) => n + 1)}>
                Reintentar · 重试
              </button>
            </div>
          ) : !words ? (
            <div className="dz-rejilla dz-esqueleto" aria-label="Abriendo el tomo… 正在打开词典">
              {Array.from({ length: 8 }, (_, n) => (
                <span key={n} style={{ "--i": n }} />
              ))}
            </div>
          ) : !list.length ? (
            <div className="dz-vacio" role="status">
              <span className="dz-vacio__sello" aria-hidden="true">
                无
              </span>
              <p>
                No hay palabras con estos filtros en el nivel {level}
                <span>这一级别没有符合条件的单词</span>
              </p>
              <div className="dz-vacio__acciones">
                {hayFiltros && (
                  <button type="button" onClick={limpiar}>
                    <XIcon size={16} aria-hidden="true" /> Quitar filtros · 清除筛选
                  </button>
                )}
                {q.trim() &&
                  TOMOS.filter((t) => t.key !== level).map((t) => (
                    <button key={t.key} type="button" className="is-tomo" onClick={() => abrirTomo(t.key)}>
                      Buscar en {t.key} · 在{t.key}中搜索
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <>
              <div className="dz-rejilla">
                {visibles.map((entrada, index) => (
                  <Ficha key={entrada.id} entrada={entrada} indice={index} consulta={consulta} favorita={isFavorite(entrada.w.es)} onAbrir={setAbierta} onFavorita={alternarFavorita} />
                ))}
              </div>
              {limit < list.length && (
                <>
                  <div ref={centinela} className="dz-centinela" aria-hidden="true" />
                  <button type="button" className="dz-mas" onClick={() => setLimit((n) => n + PAGE)}>
                    Ver más palabras · 更多 <span>{(list.length - limit).toLocaleString("es-ES")}</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {abierta >= 0 && list[abierta] && (
          <Pliego word={list[abierta].w} tomo={tomo} posicion={abierta} total={list.length} favorita={isFavorite(list[abierta].w.es)} onFavorita={alternarFavorita} onCerrar={cerrar} onMover={mover} />
        )}
        {abriendo && (
          <AperturaTomo t={TOMOS.find((x) => x.key === abriendo)} onFin={finApertura} />
        )}
      </div>
    </LightShell>
  );
}
