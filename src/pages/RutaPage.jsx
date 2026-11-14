import * as React from "react";
import { Link, useSearchParams } from "react-router";
import { BookOpenIcon, LockIcon, CheckIcon, StarIcon, XIcon, ChevronRightIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { GameStats, GoalRing } from "../components/ui/GameStats.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { useGame, BADGES, setDailyGoal } from "../lib/gamification.js";
import { buildLesson, lessonId, LESSON_META, LESSONS_PER_MODULE } from "../lib/lessons.js";
import { progresoUnidad, moduloDeClase, plusDeClase } from "../lib/clases.js";
import { loadAllModules, loadModulePlus } from "../lib/examGenerator.js";
import CATALOG from "../data/modulos/catalog.json";
import STOPS from "../data/china-stops.json";
import { Moneda, PanelJade } from "../../packages/imperial/src/index.js";
import { MundoRuta, EscenaTramo } from "../components/ruta/MundoRuta.jsx";
import { VideoEscena } from "../components/portada/VideoEscena.jsx";

const FONDO_A1 = [{ consulta: "", src: "./video/ruta-pekin.mp4", poster: "./video/ruta-pekin.jpg" }];
import { MonoViajero } from "../components/ruta/MonoViajero.jsx";
import { Celebracion } from "../components/ruta/Celebracion.jsx";
import { TransicionNivel } from "../components/ruta/TransicionNivel.jsx";
import { ANCHO_CARRIL, FILA, ARRIBA, ENTRADA, puntosCamino, trazado, tramo, puntoCurva } from "../components/ruta/geometria.js";
import "../styles/v13-ruta-mundos.css";
import "../styles/v14-ruta.css";

const STOP = Object.fromEntries(STOPS.map((parada) => [parada.n, parada]));
const REGION = { A1: ["Pekín y el norte", "北京与华北"], A2: ["La Ruta de la Seda", "丝绸之路"], B1: ["El este de China", "华东"], B2: ["El sur y el oeste", "西南与华南"] };

const LEVELS = [
  { key: "A1", es: "Principiante", zh: "入门", color: "#b81c2e", dark: "#8f0c21" },
  { key: "A2", es: "Elemental", zh: "初级", color: "#2f8f52", dark: "#1d6339" },
  { key: "B1", es: "Intermedio", zh: "中级", color: "#c8901e", dark: "#8a5a1e" },
  { key: "B2", es: "Avanzado", zh: "中高级", color: "#7a4fc4", dark: "#4f2f8a" },
];
const POSES_MONO = ["saluda", "poder", "feliz", "guino"];
// Tiempos de la celebración (ms desde que empieza): moneda → trazo dorado → viaja el mono → fin
const TIEMPOS_FIESTA = { clase: { moneda: 380, trazo: 950, viaje: 2300, fin: 5200 }, unidad: { moneda: 380, trazo: 1100, viaje: 3700, fin: 6400 } };
const sinMovimiento = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ¿Pantalla de móvil? (para el tamaño del mono y de las monedas)
function useEsMovil() {
  const [movil, setMovil] = React.useState(() => window.matchMedia?.("(max-width: 700px)").matches || false);
  React.useEffect(() => {
    const consulta = window.matchMedia?.("(max-width: 700px)");
    if (!consulta) return undefined;
    const alCambiar = () => setMovil(consulta.matches);
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);
  return movil;
}

// Clases completadas que el mapa ya ha «visto» en cada nivel (para celebrar las nuevas al volver al mapa)
const claveVista = (nivel) => `ai-espanol:ruta-vista:${nivel}`;
function leerVista(nivel) {
  try {
    return sessionStorage.getItem(claveVista(nivel));
  } catch {
    return null;
  }
}

// Demostración por URL (?demo=clase | ?demo=unidad): marca clases como hechas SOLO en pantalla, sin tocar el progreso real
function conDemo(progreso, clasesDemo) {
  if (!clasesDemo?.length) return progreso;
  const clases = progreso.clases.map((clase) => (clasesDemo.includes(clase.n) ? { ...clase, completada: true, hechas: LESSONS_PER_MODULE, lecciones: clase.lecciones.map(() => true), fraccion: 1 } : clase));
  const completadas = clases.filter((clase) => clase.completada).length;
  return { ...progreso, clases, completadas, completa: completadas === clases.length, siguiente: clases.find((clase) => !clase.completada) || null };
}

export default function RutaPage() {
  const game = useGame();
  const [params, setParams] = useSearchParams();
  const level = params.get("nivel") || firstOpenLevel(game.lessons);
  const lv = LEVELS.find((nivel) => nivel.key === level) || LEVELS[0];
  const mods = CATALOG.filter((unidad) => unidad.nivel === lv.key);
  const esMovil = useEsMovil();
  const [abierta, setAbierta] = React.useState(null); // parada con el popover abierto («unidad-clase»)
  const [negada, setNegada] = React.useState(null); // parada bloqueada que acaba de tocarse (vaivén)
  const [lesson, setLesson] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [demo, setDemo] = React.useState(null); // { numero, clases: [n…] }
  const [fiesta, setFiesta] = React.useState(null); // celebración en curso
  const [transicion, setTransicion] = React.useState(null); // { destino, clave } telón entre niveles
  const [listo, setListo] = React.useState(false);
  const currentRef = React.useRef(null);
  const fiestaRef = React.useRef(null);
  const [onboarded, setOnboarded] = React.useState(() => {
    try {
      const created = window.Clerk?.user?.createdAt ? new Date(window.Clerk.user.createdAt).getTime() : 0;
      const isNewAccount = created && Date.now() - created < 30 * 60 * 1000;
      return !isNewAccount || localStorage.getItem("ai-espanol:onboarded") === "1" || Object.keys(game.lessons).length > 0;
    } catch {
      return true;
    }
  });

  // Progreso por clases de una unidad (con la demo aplicada solo en pantalla)
  const progresoDe = (numero) => conDemo(progresoUnidad(numero, game.lessons), demo?.numero === numero ? demo.clases : null);
  const progresos = Object.fromEntries(mods.map((unidad) => [unidad.numero, progresoDe(unidad.numero)]));
  // Estado de cada parada (clase): hecha, disponible o bloqueada
  const claseHecha = (numero, n) => Boolean(progresos[numero]?.clases.find((clase) => clase.n === n)?.completada);
  const unlocked = (idx, n) => {
    const { numero } = mods[idx];
    const estado = progresos[numero].clases.find((clase) => clase.n === n);
    if (estado?.completada || estado?.hechas) return true;
    if (n > 1) return claseHecha(numero, n - 1);
    if (idx === 0) return true;
    const anterior = progresos[mods[idx - 1].numero];
    return anterior.completa || claseHecha(mods[idx - 1].numero, anterior.total);
  };
  let current = null;
  mods.forEach((unidad, idx) => {
    for (const clase of progresos[unidad.numero].clases) if (!current && unlocked(idx, clase.n) && !clase.completada) current = `${unidad.numero}-${clase.n}`;
  });

  // ---------- Celebración: detectar clases que acaban de pasar a «completada» ----------
  const firma = mods.flatMap((unidad) => progresos[unidad.numero].clases.filter((clase) => clase.completada).map((clase) => `${unidad.numero}-${clase.n}`)).join(",");
  const [vista, setVista] = React.useState(() => ({ nivel: lv.key, firma: leerVista(lv.key) ?? firma }));
  if (vista.nivel !== lv.key) {
    setVista({ nivel: lv.key, firma: leerVista(lv.key) ?? firma });
  } else if (listo && !lesson && !fiesta && vista.firma !== firma) {
    const antes = new Set(vista.firma.split(","));
    const nuevas = firma.split(",").filter((clave) => clave && !antes.has(clave));
    setVista({ nivel: lv.key, firma });
    if (nuevas.length) {
      const [numero, n] = nuevas[nuevas.length - 1].split("-").map(Number);
      const progreso = progresos[numero];
      setFiesta({ id: Date.now(), numero, n, i: progreso.clases.findIndex((clase) => clase.n === n), unidad: progreso.completa, fase: "sello", monedaHecha: false, monoSalio: false, saltada: false });
    }
  }
  React.useEffect(() => {
    if (demo) return;
    try {
      sessionStorage.setItem(claveVista(vista.nivel), vista.firma);
    } catch {}
  }, [vista, demo]);
  React.useEffect(() => {
    const temporizador = setTimeout(() => setListo(true), 900);
    return () => clearTimeout(temporizador);
  }, []);

  // Guion de la celebración
  const idFiesta = fiesta?.id;
  const fiestaSaltada = fiesta?.saltada;
  const fiestaDeUnidad = fiesta?.unidad;
  React.useEffect(() => {
    if (!idFiesta) return undefined;
    const cambiar = (cambios) => setFiesta((actual) => (actual?.id === idFiesta ? { ...actual, ...cambios } : actual));
    const acabar = () => setFiesta((actual) => (actual?.id === idFiesta ? null : actual));
    if (fiestaSaltada) {
      const fin = setTimeout(acabar, 2600);
      return () => clearTimeout(fin);
    }
    if (sinMovimiento()) {
      cambiar({ monedaHecha: true });
      const relojes = [setTimeout(() => cambiar({ fase: "viaje" }), 1900), setTimeout(acabar, 2400)];
      return () => relojes.forEach(clearTimeout);
    }
    const t = TIEMPOS_FIESTA[fiestaDeUnidad ? "unidad" : "clase"];
    fiestaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const relojes = [
      setTimeout(() => cambiar({ monedaHecha: true }), t.moneda),
      setTimeout(() => cambiar({ fase: "trazo" }), t.trazo),
      setTimeout(() => cambiar({ fase: "viaje" }), t.viaje),
      setTimeout(acabar, t.fin),
    ];
    // Se salta tocando o con una tecla (sin bloquear lo que se toque)
    const saltar = () => cambiar({ monedaHecha: true, fase: "viaje", saltada: true });
    const escucha = setTimeout(() => {
      document.addEventListener("pointerdown", saltar, { once: true });
      document.addEventListener("keydown", saltar, { once: true });
    }, 450);
    return () => {
      relojes.forEach(clearTimeout);
      clearTimeout(escucha);
      document.removeEventListener("pointerdown", saltar);
      document.removeEventListener("keydown", saltar);
    };
  }, [idFiesta, fiestaSaltada, fiestaDeUnidad]);

  // Demo por URL: completa (solo en pantalla) la clase actual o lo que queda de su unidad
  const pedidoDemo = params.get("demo");
  React.useEffect(() => {
    if (!listo || demo || !current || !["clase", "unidad"].includes(pedidoDemo)) return;
    const [numero, n] = current.split("-").map(Number);
    const pendientes = progresos[numero].clases.filter((clase) => !clase.completada).map((clase) => clase.n);
    setDemo({ numero, clases: pedidoDemo === "unidad" ? pendientes : [n] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listo, pedidoDemo]);

  React.useEffect(() => {
    const temporizador = setTimeout(() => currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    return () => clearTimeout(temporizador);
  }, [level]);

  // Popover: se cierra al tocar fuera o con Escape (y devuelve el foco a la moneda)
  React.useEffect(() => {
    if (!abierta) return undefined;
    const alTocar = (evento) => {
      if (!evento.target.closest?.(".ruta-node-wrap.abierto")) setAbierta(null);
    };
    const alTeclear = (evento) => {
      if (evento.key !== "Escape") return;
      document.querySelector(".ruta-node-wrap.abierto .path-node")?.focus();
      setAbierta(null);
    };
    document.addEventListener("pointerdown", alTocar);
    document.addEventListener("keydown", alTeclear);
    // Que el popover quede entero a la vista (por encima de la barra inferior del móvil)
    const ajuste = setTimeout(() => {
      const parada = document.querySelector(".ruta-node-wrap.abierto");
      const pop = parada?.querySelector(".rp-pop");
      if (!pop) return;
      // Altura real del popover (su animación de entrada lo escala): parte de la caja de la parada
      const abajo = parada.getBoundingClientRect().bottom + 40 + pop.offsetHeight;
      const limite = window.innerHeight - (window.innerWidth <= 1000 ? 104 : 18);
      if (abajo > limite) window.scrollBy({ top: abajo - limite, behavior: sinMovimiento() ? "auto" : "smooth" });
    }, 40);
    return () => {
      clearTimeout(ajuste);
      document.removeEventListener("pointerdown", alTocar);
      document.removeEventListener("keydown", alTeclear);
    };
  }, [abierta]);
  React.useEffect(() => {
    if (!negada) return undefined;
    const temporizador = setTimeout(() => setNegada(null), 620);
    return () => clearTimeout(temporizador);
  }, [negada]);

  // Lección `index` de la clase `clase`: solo con el contenido de esa clase
  const start = async (numero, clase, index) => {
    setLoading(true);
    const [all, plus] = await Promise.all([loadAllModules(), loadModulePlus(numero)]);
    const mod = moduloDeClase(all.find((unidad) => unidad.numero === numero), clase);
    setLesson(buildLesson(mod, plusDeClase(plus, numero, clase), index, Date.now(), Boolean(game.lessons[lessonId(numero, index, clase)])));
    setLoading(false);
    setAbierta(null);
  };

  // Cambio de nivel con telón: el nivel cambia cuando el telón cubre el mapa
  const irANivel = (clave) =>
    setParams((previos) => {
      const nuevos = new URLSearchParams(previos);
      nuevos.set("nivel", clave);
      nuevos.delete("demo");
      return nuevos;
    });
  const cambiarNivel = (clave) => {
    if (clave === (transicion?.destino || lv.key)) return;
    setAbierta(null);
    setFiesta(null);
    setDemo(null);
    setTransicion((previa) => ({ destino: clave, clave: (previa?.clave || 0) + 1 }));
  };

  const modActual = mods.find((unidad) => current?.startsWith(`${unidad.numero}-`)) || mods[0];
  const resumenNivel = (nivel) => {
    const unidades = CATALOG.filter((unidad) => unidad.nivel === nivel.key).map((unidad) => (nivel.key === lv.key ? progresos[unidad.numero] : progresoUnidad(unidad.numero, game.lessons)));
    return { hechas: unidades.reduce((suma, progreso) => suma + progreso.completadas, 0), total: unidades.reduce((suma, progreso) => suma + progreso.total, 0) };
  };
  const nivelMarcado = transicion?.destino || lv.key;
  const tamanoMono = esMovil ? 84 : 118;

  return (
    <LightShell>
      <div className="ruta-layout rt14 rt16">
        {/* v16 · Como la maqueta: la escena de los dos dragones y el Templo del Cielo de fondo en toda la pantalla;
            la ruta de cada nivel (con su propio mundo) flota encima en una ventana con marco dorado */}
        <div className="ruta-fondo-cine" aria-hidden="true">
          <div className="ruta-fondo-pegado">
            <VideoEscena variantes={FONDO_A1} conVelo={false} prioridad />
          </div>
        </div>
        <main className={`ruta-main map-${lv.key} mr-on`}>
          <MundoRuta key={lv.key} nivel={lv.key} fiesta={Boolean(fiesta) && !fiesta.saltada} />
          <TransicionNivel destino={transicion?.destino} clave={transicion?.clave} onCubre={irANivel} onFin={() => setTransicion(null)} />
          <span className="ruta-dragon d1" aria-hidden="true" />
          <span className="ruta-dragon d2" aria-hidden="true" />
          <div className="ruta-region-title">
            <span>
              <b>{REGION[lv.key][0]}</b> <i>{REGION[lv.key][1]}</i>
              <em>{modActual?.titulo.split(" - ")[0]}</em>
              <small>Viaja parada a parada: cada unidad es un lugar de China · 每个单元都是中国的一站</small>
            </span>
          </div>
          <nav className="rn-niveles" style={{ "--i": LEVELS.findIndex((nivel) => nivel.key === nivelMarcado) }} aria-label="Niveles · 级别">
            <span className="rn-indicador" aria-hidden="true" />
            {LEVELS.map((nivel) => {
              const { hechas, total } = resumenNivel(nivel);
              return (
                <button key={nivel.key} type="button" className={`rn-nivel ${nivel.key === nivelMarcado ? "on" : ""}`} aria-pressed={nivel.key === nivelMarcado} onClick={() => cambiarNivel(nivel.key)}>
                  <b>{nivel.key}</b>
                  <em>{REGION[nivel.key][0]}</em>
                  <span className="rn-barra" aria-hidden="true">
                    <i style={{ transform: `scaleX(${total ? hechas / total : 0})` }} />
                  </span>
                  <small title="Clases hechas · 已完成课程">
                    {hechas}/{total} <span>clases · 课</span>
                  </small>
                </button>
              );
            })}
          </nav>

          {mods.map((unidad, idx) => {
            const numero = unidad.numero;
            const parada = STOP[numero];
            const prog = progresos[numero];
            const paradas = prog.total;
            const pts = puntosCamino(idx, paradas);
            const alcanzada = unlocked(idx, 1);
            const alto = ARRIBA + paradas * FILA + 78;
            const enFiesta = fiesta?.numero === numero;
            // Durante el sello de la celebración el mapa enseña todavía el estado anterior
            const retenida = enFiesta && fiesta.fase !== "viaje";
            const iActual = prog.clases.findIndex((clase) => current === `${numero}-${clase.n}`);
            const oroHasta = Math.min(retenida ? fiesta.i : prog.completadas, paradas);
            const unidadGanada = prog.completa && !retenida;
            // Dónde está el Rey Mono en esta unidad (−1 = no está aquí)
            let iMono = iActual;
            let monoSeVa = false;
            if (fiesta && !enFiesta && !fiesta.monoSalio) iMono = -1; // aún no ha salido de la unidad anterior
            if (enFiesta) {
              if (retenida) iMono = fiesta.i;
              else if (iActual < 0 && !fiesta.monoSalio) {
                iMono = paradas; // viaja hasta el cofre y sale
                monoSeVa = true;
              }
            }
            // Viñeta del paisaje en móvil: solo una por tramo, en el lado contrario a la parada más desviada
            const masDesviada = pts.reduce((mejor, punto) => (Math.abs(punto[0] - ANCHO_CARRIL / 2) > Math.abs(mejor[0] - ANCHO_CARRIL / 2) ? punto : mejor), pts[0]);
            const ladoVineta = masDesviada[0] > ANCHO_CARRIL / 2 ? "izq" : "der";
            const titulo = unidad.titulo.split(" - ")[0];
            return (
              <section key={numero} id={`ruta-u${numero}`} className={`ruta-unit ${unidadGanada ? "ganada" : ""} ${alcanzada ? "" : "lejana"}`}>
                <header className="ru-estandarte" style={{ "--c": lv.color, "--d": lv.dark }}>
                  <span className="ru-medallon">
                    <Moneda tamano={esMovil ? 46 : 68} tono="oro" brillo={alcanzada}>
                      <Emoji3D emoji={parada?.emoji || unidad.icono} size={esMovil ? 22 : 34} />
                    </Moneda>
                    <b className="ru-num" translate="no">
                      {numero}
                    </b>
                  </span>
                  <div className="ru-textos">
                    <span className="ru-lugar">
                      <span translate="no">{parada?.ciudadZh}·{parada?.lugarZh}</span> {parada?.ciudad} · {parada?.lugar}
                    </span>
                    <h2>
                      <small>
                        {lv.key} · Unidad {numero} <span translate="no">第{numero}单元</span>
                      </small>
                      <span className="ru-titulo">{titulo}</span> <i>{unidad.tituloChino.split(" - ")[0]}</i>
                    </h2>
                  </div>
                  <span className="ru-clases" title={`${prog.completadas}/${prog.total} clases · 课`}>
                    <span className="ru-pips" aria-hidden="true">
                      {prog.clases.map((clase) => (
                        <i key={clase.n} className={clase.completada && !(retenida && clase.n === fiesta.n) ? "hecha" : ""} />
                      ))}
                    </span>
                    <b>
                      {retenida ? Math.max(0, prog.completadas - 1) : prog.completadas}/{prog.total} <span>clases · 课</span>
                    </b>
                  </span>
                  <span className="ru-sello" translate="no" aria-hidden="true">
                    {parada?.ciudadZh?.slice(0, 2)}
                  </span>
                  <Link to={`/modulos/modulo-${numero}`} className="ru-guia" title="Teoría, vocabulario, diálogos y juegos de la unidad · 单元指南" aria-label={`Guía de la unidad ${numero} · 单元指南`}>
                    <BookOpenIcon size={20} />
                    <span>
                      Guía <i>指南</i>
                    </span>
                  </Link>
                </header>
                <div className="ruta-camino-wrap" data-vin={ladoVineta} style={{ height: alto, "--vin-y": `${Math.max(20, masDesviada[1] - 70)}px` }}>
                  <EscenaTramo nivel={lv.key} idx={idx} />
                  <div className="ruta-camino" style={{ width: ANCHO_CARRIL, height: alto }}>
                    <svg className="ruta-carretera" width={ANCHO_CARRIL} height={alto} aria-hidden="true">
                      <path className="borde" d={trazado(pts)} />
                      <path className="piedra" d={trazado(pts)} />
                      {alcanzada && (
                        <>
                          <path className="halo" d={trazado(pts, oroHasta)} />
                          <path className="oro" d={trazado(pts, oroHasta)} />
                          <path className="luz" d={trazado(pts, oroHasta)} />
                        </>
                      )}
                      {/* Tramo recién ganado: se dibuja en oro una sola vez */}
                      {enFiesta && fiesta.fase === "trazo" && fiesta.i < paradas && (
                        <g className="rc-trazo">
                          <path className="oro" pathLength="1" d={tramo(pts[fiesta.i], pts[fiesta.i + 1])} />
                          <path className="luz" pathLength="1" d={tramo(pts[fiesta.i], pts[fiesta.i + 1])} />
                        </g>
                      )}
                    </svg>
                    {/* Destello que recorre el oro de vez en cuando y huellas que laten hacia la siguiente parada */}
                    {alcanzada && (iActual >= 0 || idx === mods.indexOf(modActual) - 1) && <span className="rc-brillo-camino" style={{ offsetPath: `path("${trazado(pts, oroHasta)}")` }} aria-hidden="true" />}
                    {iActual >= 0 &&
                      !retenida &&
                      [0.24, 0.42, 0.6, 0.78].map((t, k) => {
                        const [x, y] = puntoCurva(pts[iActual], pts[iActual + 1], t);
                        return <span key={t} className="rc-huella" style={{ left: x, top: y, "--k": k }} aria-hidden="true" />;
                      })}
                    {prog.clases.map((clase, i) => {
                      const clave = `${numero}-${clase.n}`;
                      const esLaDeFiesta = enFiesta && fiesta.n === clase.n;
                      const isDone = clase.completada && !(esLaDeFiesta && !fiesta.monedaHecha);
                      const isOpen = unlocked(idx, clase.n);
                      const isCurrent = fiesta && fiesta.fase !== "viaje" ? esLaDeFiesta && !fiesta.monedaHecha : current === clave;
                      const estaAbierta = abierta === clave;
                      const siguiente = clase.lecciones.findIndex((hecha) => !hecha);
                      const estado = isDone ? "done" : isOpen ? "open" : "locked";
                      const tamanoMoneda = (isCurrent ? 92 : 80) - (esMovil ? 10 : 0);
                      return (
                        <div
                          key={clave}
                          className={`ruta-node-wrap rp-parada ${estado} ${isCurrent ? "actual" : ""} ${estaAbierta ? "abierto" : ""} ${esLaDeFiesta ? "rp-recien" : ""} ${negada === clave ? "rp-niega" : ""}`}
                          style={{ left: pts[i][0], top: pts[i][1] }}
                          ref={esLaDeFiesta ? fiestaRef : isCurrent ? currentRef : null}
                        >
                          {isCurrent && (
                            <div className="rp-empezar">
                              {clase.hechas ? "SEGUIR" : "EMPEZAR"} <span translate="no">{clase.hechas ? "继续" : "开始"}</span>
                            </div>
                          )}
                          <span className="rp-peana" aria-hidden="true" />
                          <span className="rp-onda" aria-hidden="true" />
                          <button
                            type="button"
                            className={`path-node ${estado} ${isCurrent ? "current" : ""}`}
                            onClick={() => {
                              if (!isOpen) setNegada(clave);
                              setAbierta(estaAbierta ? null : clave);
                            }}
                            aria-expanded={estaAbierta}
                            aria-label={`Clase ${clase.n} de la unidad ${numero}${isDone ? ", completada" : isOpen ? "" : ", bloqueada"} · 第${clase.n}课`}
                          >
                            {isCurrent && (
                              <span className="rp-energia" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                              </span>
                            )}
                            {isOpen && !isDone && <span className="ruta-clase-anillo" style={{ "--p": Math.round((clase.hechas / LESSONS_PER_MODULE) * 100) }} aria-hidden="true" />}
                            <span className="rp-moneda">
                              <Moneda tamano={tamanoMoneda} tono={isDone ? "oro" : isCurrent ? "jade" : isOpen ? "oro" : "bronce"} brillo={isDone || isCurrent}>
                                {isDone ? clase.nota === 100 ? <StarIcon size={26} fill="currentColor" /> : <CheckIcon size={28} strokeWidth={3.5} /> : isCurrent ? null : isOpen ? <Emoji3D emoji={i === 0 ? unidad.icono : LESSON_META[Math.min(i, 4)].emoji} size={32} /> : <LockIcon size={20} />}
                              </Moneda>
                              <span className="rp-brillo" aria-hidden="true" />
                            </span>
                            <span className="ruta-clase-sello" translate="no">
                              第{clase.n}课
                            </span>
                          </button>
                          {estaAbierta && (
                            <div className={`rp-pop ${isOpen ? "" : "cerrada"}`} role="dialog" aria-label={`Clase ${clase.n} · 第${clase.n}课`} style={{ "--c": isOpen ? lv.color : "#5a4632", "--d": isOpen ? lv.dark : "#2b1d10", "--dx": `${ANCHO_CARRIL / 2 - pts[i][0]}px` }}>
                              <header>
                                <span className="rp-pop-sello" translate="no">
                                  第{clase.n}课
                                </span>
                                <div>
                                  <b>Clase {clase.n}</b>
                                  <span>
                                    {clase.titulo ? `${clase.titulo} · ` : ""}~{clase.minutos || 50} min · 分钟
                                  </span>
                                </div>
                                <button type="button" className="rp-pop-cerrar" onClick={() => setAbierta(null)} aria-label="Cerrar · 关闭">
                                  <XIcon size={18} />
                                </button>
                              </header>
                              {isOpen ? (
                                <>
                                  <div className="rp-pop-lecciones">
                                    {LESSON_META.map((meta, k) => {
                                      const hecha = clase.lecciones[k];
                                      const disponible = k === 0 || hecha || clase.lecciones[k - 1];
                                      return (
                                        <button key={meta.key} type="button" className={`rp-pop-leccion ${hecha ? "hecha" : ""} ${k === siguiente ? "siguiente" : ""}`} style={{ "--k": k }} disabled={loading || !disponible} onClick={() => start(numero, clase.n, k)}>
                                          <i>{hecha ? <CheckIcon size={14} strokeWidth={4} /> : k + 1}</i>
                                          <span>
                                            {meta.es} <em>{meta.zh}</em>
                                          </span>
                                          <small>{hecha ? "otra vez · 再练" : k === siguiente ? "+10 XP" : disponible ? "" : <LockIcon size={13} />}</small>
                                        </button>
                                      );
                                    })}
                                  </div>
                                  <Link className="rp-pop-abrir" style={{ "--k": LESSON_META.length }} to={`/modulos/modulo-${numero}?clase=${clase.n}`}>
                                    Abrir la clase completa · 打开本课 <ChevronRightIcon size={16} />
                                  </Link>
                                </>
                              ) : (
                                <p className="rp-pop-aviso">
                                  <LockIcon size={18} /> Termina la clase anterior para desbloquearla.
                                  <span>完成上一课后解锁</span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <Link
                      to={`/modulos/modulo-${numero}?tab=examen&examen=unidad&clase=${paradas}`}
                      className={`ruta-chest rp-cofre ${unidadGanada ? "ganado" : ""}`}
                      style={{ left: pts[paradas][0], top: pts[paradas][1], "--orden": idx % 4 }}
                      title="Examen de la unidad · 单元考试"
                      aria-label={`Examen de la unidad ${numero} · 单元考试`}
                    >
                      <span className="rp-peana" aria-hidden="true" />
                      {unidadGanada && <span className="rp-rayos" aria-hidden="true" />}
                      <span className="rp-moneda">
                        <Moneda tamano={esMovil ? 84 : 96} tono={unidadGanada ? "oro" : "bronce"} brillo={unidadGanada}>
                          <Emoji3D emoji={unidadGanada ? "🏆" : "🎁"} size={esMovil ? 38 : 44} />
                        </Moneda>
                        <span className="rp-brillo" aria-hidden="true" />
                      </span>
                      <span className="ruta-clase-sello" translate="no">
                        考试
                      </span>
                    </Link>
                    {iMono >= 0 && (
                      <MonoViajero
                        desde={iMono > 0 && !monoSeVa ? pts[iMono - 1] : ENTRADA}
                        hasta={pts[iMono]}
                        pose={POSES_MONO[idx % POSES_MONO.length]}
                        tamano={tamanoMono}
                        salida={monoSeVa}
                        retraso={fiesta ? 0 : 700}
                        seguir={Boolean(fiesta)}
                        onLlegada={monoSeVa ? () => setFiesta((actual) => (actual ? { ...actual, monoSalio: true } : actual)) : undefined}
                      />
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </main>

        <aside className="ruta-side">
          <span className="ruta-dragon d3" aria-hidden="true" />
          <GameStats />
          <PanelJade as="div" className="ruta-goal">
            <GoalRing pct={game.goalPct} size={78}>
              <Moneda tamano={58} tono="oro">
                <Emoji3D emoji="🎯" size={28} />
              </Moneda>
            </GoalRing>
            <div style={{ flex: 1 }}>
              <h3 className="im-jade__titulo">
                Meta diaria <span className="im-zh">每日目标</span>
              </h3>
              <div className="ruta-jade-dato">
                {game.dailyXp}/{game.goal} XP hoy · 今日
              </div>
              <div className="ui-row" style={{ gap: 6, marginTop: 8 }}>
                {[20, 30, 50].map((meta) => (
                  <button key={meta} className={`ui-chip ${game.goal === meta ? "is-on" : ""}`} onClick={() => setDailyGoal(meta)}>
                    {meta} XP
                  </button>
                ))}
              </div>
            </div>
          </PanelJade>
          <PanelJade as="div" className="ruta-passport" titulo="Pasaporte del viaje" tituloZh="旅行护照" icono={<Emoji3D emoji="🛂" size={26} />}>
            <small className="ruta-jade-dato">
              {CATALOG.filter((unidad) => progresoDe(unidad.numero).completa).length}/{CATALOG.length} sellos · 印章
            </small>
            <div className="ruta-stamps">
              {mods.map((unidad) => {
                const recienGanado = fiesta?.unidad && fiesta.numero === unidad.numero;
                const conseguido = progresos[unidad.numero]?.completa && !(recienGanado && fiesta.fase === "sello");
                return (
                  <span key={unidad.numero} className={`ruta-stamp ${conseguido ? "got" : ""} ${recienGanado && conseguido ? "recien" : ""}`} title={`${STOP[unidad.numero]?.ciudad} · ${STOP[unidad.numero]?.lugar}`}>
                    <Emoji3D emoji={STOP[unidad.numero]?.emoji || "🏯"} size={24} />
                  </span>
                );
              })}
            </div>
          </PanelJade>
          <PanelJade as="div" titulo="Desafíos del día" tituloZh="每日挑战">
            {dailyQuests(game).map((desafio) => (
              <div key={desafio.es} className="quest">
                <Emoji3D emoji={desafio.emoji} size={36} />
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: 14 }}>{desafio.es}</b>
                  <div className="quest-bar">
                    <i style={{ width: `${Math.min(100, (desafio.have / desafio.need) * 100)}%` }} />
                    <em>
                      {Math.min(desafio.have, desafio.need)} / {desafio.need}
                    </em>
                  </div>
                </div>
                <Emoji3D emoji={desafio.have >= desafio.need ? "🏆" : "🎁"} size={30} />
              </div>
            ))}
          </PanelJade>
          <PanelJade as="div" titulo={`Nivel ${game.level}`} tituloZh="等级">
            <div className="ui-between" style={{ marginBottom: 8 }}>
              <span className="ruta-jade-dato">Experiencia · 经验</span>
              <span className="ruta-jade-dato">
                {game.into}/{game.need} XP
              </span>
            </div>
            <div className="quest-bar">
              <i style={{ width: `${game.pct}%` }} />
            </div>
          </PanelJade>
          <PanelJade as="div" titulo="Logros" tituloZh="成就">
            <div className="ruta-badges">
              {BADGES.map((logro) => {
                const conseguido = game.badges.includes(logro.id);
                return (
                  <div key={logro.id} className={`ruta-badge ${conseguido ? "got" : ""}`} title={`${logro.es} · ${logro.zh}`}>
                    <Emoji3D emoji={logro.emoji} size={40} />
                    <small>{logro.es}</small>
                  </div>
                );
              })}
            </div>
          </PanelJade>
        </aside>
      </div>
      {fiesta && !fiesta.saltada && (
        <Celebracion
          key={fiesta.id}
          tipo={fiesta.unidad ? "unidad" : "clase"}
          n={fiesta.n}
          lugar={`${STOP[fiesta.numero]?.ciudad} · ${STOP[fiesta.numero]?.lugar} ${STOP[fiesta.numero]?.ciudadZh}·${STOP[fiesta.numero]?.lugarZh}`}
          saliendo={fiesta.fase === "viaje"}
        />
      )}
      {!onboarded && <Onboarding onDone={(nivel) => { setOnboarded(true); setParams({ nivel }); }} />}
      {lesson && <LessonPlayer lesson={lesson} onClose={() => setLesson(null)} />}
    </LightShell>
  );
}

function firstOpenLevel(lessons) {
  for (const l of LEVELS) {
    const mods = CATALOG.filter((m) => m.nivel === l.key);
    if (mods.some((m) => !progresoUnidad(m.numero, lessons).completa)) return l.key;
  }
  return "A1";
}

// Bienvenida de la primera vez (motivo, nivel y meta diaria), como en las apps de idiomas
const REASONS = [
  ["🎓", "Aprobar el DELE", "通过DELE考试"],
  ["💼", "Trabajo", "工作"],
  ["✈️", "Viajar", "旅行"],
  ["🏫", "Estudiar en España", "去西班牙留学"],
  ["🎵", "Cultura y ocio", "文化娱乐"],
  ["🧠", "Ejercitar la mente", "锻炼大脑"],
];
const START = [
  ["🌱", "Empiezo de cero", "零基础", "A1"],
  ["📖", "Conozco algunas palabras", "会一些单词", "A1"],
  ["💬", "Puedo tener conversaciones básicas", "能进行简单对话", "A2"],
  ["🗣️", "Hablo con soltura sobre muchos temas", "能流利交流", "B1"],
  ["🏆", "Preparo el DELE B2", "准备DELE B2", "B2"],
];
const GOALS = [
  [10, "Casual · 5 min/día", "轻松"],
  [20, "Normal · 10 min/día", "普通"],
  [30, "Serio · 15 min/día", "认真"],
  [50, "Intenso · 20 min/día", "高强度"],
];

function Onboarding({ onDone }) {
  const [step, setStep] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const [level, setLevel] = React.useState("A1");
  const questions = [
    ["¿Para qué aprendes español?", "你为什么学西班牙语？"],
    ["¿Cuánto español sabes?", "你的西班牙语水平如何？"],
    ["¿Cuál es tu meta diaria?", "你的每日目标是什么？"],
  ];
  const opts = step === 0 ? REASONS : step === 1 ? START : GOALS;
  const next = () => {
    if (step === 1) setLevel(START[pick][3]);
    if (step === 2) {
      setDailyGoal(GOALS[pick][0]);
      try {
        localStorage.setItem("ai-espanol:onboarded", "1");
      } catch {}
      return onDone(level);
    }
    setStep((s) => s + 1);
    setPick(null);
  };
  return (
    <div className="onb">
      <header className="lp-top">
        <div className="lp-bar" style={{ background: "#e5e5e5" }}>
          <i style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      </header>
      <main className="onb-main">
        <div className="onb-q">
          <img src="./mono-face.webp" alt="" className="mono-big e3d-float" style={{ width: 120, height: 120 }} />
          <div className="lp-char-bubble" style={{ fontSize: 20 }}>
            <span>
              {questions[step][0]}
              <br />
              <small style={{ color: "#777", fontWeight: 600 }}>{questions[step][1]}</small>
            </span>
          </div>
        </div>
        <div className={`onb-opts ${step === 0 ? "grid2" : ""}`}>
          {opts.map((o, i) => (
            <button key={i} className={`lp-option ${pick === i ? "picked" : ""}`} style={{ background: pick === i ? "#ddf4ff" : "#fff", borderColor: pick === i ? "#84d8ff" : "#e5e5e5", color: "#4b4b4b" }} onClick={() => setPick(i)}>
              {typeof o[0] === "number" ? <Emoji3D emoji={["🌱", "🔥", "⚡", "🚀"][i]} size={36} /> : <Emoji3D emoji={o[0]} size={36} />}
              <span>
                {o[1]}
                <br />
                <small style={{ color: "#777", fontWeight: 600 }}>{o[2]}</small>
              </span>
            </button>
          ))}
        </div>
      </main>
      <footer className="lp-foot" style={{ background: "#fff", borderColor: "#e5e5e5" }}>
        <div className="lp-foot-inner">
          <button className="lp-btn" disabled={pick === null} onClick={next} style={pick === null ? { "--c": "#e5e5e5", "--d": "#cecece", color: "#afafaf" } : undefined}>
            Continuar · 继续
          </button>
        </div>
      </footer>
    </div>
  );
}

// Desafíos diarios calculados a partir de la actividad de hoy
function dailyQuests(game) {
  const today = new Date().toDateString();
  const todayLessons = Object.entries(game.lessons).filter(([, v]) => new Date(v.at).toDateString() === today);
  const stories = todayLessons.filter(([k]) => k.startsWith("story-")).length;
  const perfect = todayLessons.filter(([k, v]) => !k.startsWith("story-") && v.score === 100).length;
  return [
    { emoji: "⚡", es: `Gana ${game.goal} XP · 获得${game.goal}经验`, have: game.dailyXp, need: game.goal },
    { emoji: "🎯", es: "Completa 2 lecciones · 完成2课", have: todayLessons.length - stories, need: 2 },
    { emoji: "💎", es: "Haz 1 lección perfecta · 1次满分", have: perfect, need: 1 },
    { emoji: "📖", es: "Lee 1 historia · 读1个故事", have: stories, need: 1 },
  ];
}
