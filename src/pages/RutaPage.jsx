import * as React from "react";
import { Link, useSearchParams } from "react-router";
import { BookOpenIcon, LockIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { GameStats, GoalRing } from "../components/ui/GameStats.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { useGame, BADGES, setDailyGoal } from "../lib/gamification.js";
import { buildLesson, lessonId, LESSON_META, LESSONS_PER_MODULE } from "../lib/lessons.js";
import { progresoUnidad, moduloDeClase, plusDeClase } from "../lib/clases.js";
import { getModuleProgress } from "../lib/progress.js";
import { loadModule, loadModulePlus } from "../lib/examGenerator.js";
import CATALOG from "../data/modulos/catalog.json";
import STOPS from "../data/china-stops.json";
import { Moneda, PanelJade } from "../../packages/imperial/src/index.js";
import { MundoRuta, momentoRuta } from "../components/ruta/MundoRuta.jsx";

import { MonoViajero } from "../components/ruta/MonoViajero.jsx";
import { Celebracion } from "../components/ruta/Celebracion.jsx";
import { TransicionNivel } from "../components/ruta/TransicionNivel.jsx";
import { CabeceraRuta } from "../components/ruta/CabeceraRuta.jsx";
import { SelloPasaporte, FiltroTinta, fechaSello } from "../components/ruta/SelloPasaporte.jsx";
import { Pictograma, PaisajeBanda, paisajeDe } from "../components/ruta/paisajes.jsx";
import { ANCHO_CARRIL, FILA, ajustarFila, ARRIBA, ENTRADA, puntosCamino, trazado, tramo, puntoCurva, formaDe } from "../components/ruta/geometria.js";
import { Medallon, MarcaHecha, CofreImperial, GlifoClase } from "../components/ruta/Medallon.jsx";
import { Recorrido, RecorridoDefs } from "../components/ruta/Recorrido.jsx";
import { FichaClase } from "../components/ruta/FichaClase.jsx";
import { TramoPintado } from "../components/ruta/TramoPintado.jsx";
import { camaraBase, crearDirector, transformCartel, transformSuelo } from "../components/ruta/camara3d.js";
import "../styles/v13-ruta-mundos.css";
import "../styles/v14-ruta.css";
import "../styles/v22-ruta.css";
import "../styles/movil-ruta.css";
import "../styles/v23-ruta-recorridos.css";
import "../styles/v25-ruta.css";
import "../styles/v26-ruta.css";
import "../styles/v27-ruta-3d.css";

const BASE_URL = import.meta.env.BASE_URL || "./";
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

// v20 · El camino de cada unidad (escenario, monedas y viñetas: ~500 nodos animados) solo se construye cuando se acerca
// a la pantalla; mientras tanto se reserva su altura exacta. La unidad actual y sus vecinas se construyen siempre.
function CaminoPerezoso({ forzar, className, dataVin, style, children }) {
  const ref = React.useRef(null);
  const [ver, setVer] = React.useState(Boolean(forzar));
  React.useEffect(() => {
    if (forzar) setVer(true);
  }, [forzar]);
  React.useEffect(() => {
    if (ver) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVer(true);
      return undefined;
    }
    const ojo = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        ojo.disconnect();
        React.startTransition(() => setVer(true));
      },
      { rootMargin: "900px 0px" },
    );
    ojo.observe(el);
    return () => ojo.disconnect();
  }, [ver]);
  return (
    <div ref={ref} className={className} data-vin={dataVin} style={style}>
      {ver ? children : null}
    </div>
  );
}

export default function RutaPage() {
  const game = useGame();
  const [params, setParams] = useSearchParams();
  const level = params.get("nivel") || firstOpenLevel(game.lessons);
  const lv = LEVELS.find((nivel) => nivel.key === level) || LEVELS[0];
  const mods = CATALOG.filter((unidad) => unidad.nivel === lv.key);
  const esMovil = useEsMovil();
  ajustarFila(esMovil);
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
  const mainRef = React.useRef(null);
  const director = React.useRef(null);
  const [inclinar, setInclinar] = React.useState(false); // inclinación del móvil (opcional)
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
  // v25 · Un solo Rey Mono en pantalla: en la Ruta manda el viajero (el asistente flotante se oculta)
  React.useEffect(() => {
    document.body.classList.add("en-ruta");
    return () => document.body.classList.remove("en-ruta");
  }, []);
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
    // v25 · Encuadre: el botón Empezar, la clase actual y el examen de la unidad a la vista sin hacer scroll
    const encuadrar = () => {
      const nodo = currentRef.current;
      if (!nodo) return;
      const movil = window.innerWidth <= 700;
      // Arriba: pestañas de nivel + estandarte fijo de la unidad (móvil); abajo: barra inferior + 24 px
      const tiras = movil ? document.querySelector(".rh-niveles") : null;
      const pestanas = tiras ? (parseFloat(getComputedStyle(tiras).top) || 56) + tiras.offsetHeight : 0; // posición ya fijada
      const estandarte = movil ? nodo.closest(".ruta-unit")?.querySelector(".ru-estandarte")?.offsetHeight || 80 : 0;
      const arriba = movil ? pestanas + estandarte + 6 : 24;
      const abajo = window.innerHeight - (window.innerWidth <= 1000 ? 96 + 24 : 16);
      const rNodo = nodo.getBoundingClientRect();
      const cofre = nodo.closest(".ruta-unit")?.querySelector(".rp-cofre");
      const rCofre = cofre?.getBoundingClientRect();
      // v27 · Medidas reales (el tablero está en perspectiva): del botón Empezar al cartel del premio del examen
      const rEmpezar = nodo.querySelector(".rp-empezar")?.getBoundingClientRect();
      const rPremio = cofre?.querySelector(".rp-cofre-premio, .rp-cofre-cartel")?.getBoundingClientRect();
      const bloqueArriba = rEmpezar ? rEmpezar.top - 8 : rNodo.top - (movil ? 66 : 96);
      const bloqueAbajo = rPremio ? rPremio.bottom + 10 : rCofre ? rCofre.bottom + (movil ? 44 : 56) : rNodo.bottom + 60;
      const libre = abajo - arriba - (bloqueAbajo - bloqueArriba);
      const delta = libre >= 0 ? bloqueArriba - arriba - libre * 0.45 : bloqueArriba - arriba;
      let contenedor = nodo.parentElement;
      while (contenedor && contenedor !== document.body) {
        const estilo = getComputedStyle(contenedor);
        if (/(auto|scroll)/.test(estilo.overflowY) && contenedor.scrollHeight > contenedor.clientHeight) break;
        contenedor = contenedor.parentElement;
      }
      const destino = contenedor && contenedor !== document.body ? contenedor : window;
      destino.scrollBy({ top: delta, behavior: sinMovimiento() ? "auto" : "smooth" });
    };
    // v27 · Se mide con los tableros en su postura de reposo y luego la cámara vuela: acercamiento a la clase actual
    // al cargar, vuelo desde lo alto al cambiar de nivel
    const temporizador = setTimeout(() => {
      const dir = director.current;
      if (dir) dir.medirEnReposo(encuadrar);
      else encuadrar();
      dir?.volar(nivelPrevio.current && nivelPrevio.current !== level ? "vuelo" : "acercar", currentRef.current);
      nivelPrevio.current = level;
    }, 400);
    return () => clearTimeout(temporizador);
  }, [level]);
  const nivelPrevio = React.useRef(null);

  // v27 · Director de la cámara 3D (una rAF para toda la página; duerme cuando no hay nada que mover)
  React.useEffect(() => {
    const dir = crearDirector(mainRef.current);
    director.current = dir;
    dir.sincronizar();
    return () => {
      dir.destruir();
      director.current = null;
    };
  }, []);
  React.useEffect(() => {
    director.current?.sincronizar();
  });
  const alternarInclinacion = async () => {
    const dir = director.current;
    if (!dir) return;
    if (inclinar) {
      dir.desactivarInclinacion();
      setInclinar(false);
    } else setInclinar(await dir.activarInclinacion());
  };

  // Popover: se cierra al tocar fuera o con Escape (y devuelve el foco a la moneda)
  React.useEffect(() => {
    if (!abierta) return undefined;
    const alTocar = (evento) => {
      if (!evento.target.closest?.(".ruta-node-wrap.abierto, .rp-ficha")) setAbierta(null);
    };
    const alTeclear = (evento) => {
      if (evento.key !== "Escape") return;
      document.querySelector(".ruta-node-wrap.abierto .path-node")?.focus();
      setAbierta(null);
    };
    document.addEventListener("pointerdown", alTocar);
    document.addEventListener("keydown", alTeclear);
    return () => {
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
    const [unidad, plus] = await Promise.all([loadModule(numero), loadModulePlus(numero)]);
    const mod = moduloDeClase(unidad, clase);
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
  const tamanoMono = esMovil ? 90 : 140;
  // El nivel (map-XX) y el momento del día van en .ruta-main: el CSS los lee de ahí en vez de con :has()
  const momento = momentoRuta();
  const progresoModulos = getModuleProgress();
  const anclaFicha = React.useCallback(() => document.querySelector(".ruta-node-wrap.abierto .rp-moneda"), []);

  return (
    <LightShell>
      <div className="ruta-layout rt14 rt16 rt22">
        <main ref={mainRef} className={`ruta-main map-${lv.key} mr-on r3-on`} data-momento={momento}>
          <MundoRuta key={lv.key} nivel={lv.key} momento={momento} fiesta={Boolean(fiesta) && !fiesta.saltada} />
          <RecorridoDefs />
          <TransicionNivel destino={transicion?.destino} clave={transicion?.clave} onCubre={irANivel} onFin={() => setTransicion(null)} />
          <CabeceraRuta
            region={REGION[lv.key]}
            tema={modActual?.titulo.split(" - ")[0]}
            marcado={nivelMarcado}
            onCambiar={cambiarNivel}
            niveles={LEVELS.map((nivel) => ({ key: nivel.key, region: REGION[nivel.key][0], ...resumenNivel(nivel) }))}
          />

          {esMovil && typeof window !== "undefined" && "DeviceOrientationEvent" in window && (
            <button type="button" className={`r3-inclinar ${inclinar ? "on" : ""}`} onClick={alternarInclinacion} aria-pressed={inclinar} title="Mover el mapa al inclinar el móvil · 倾斜手机看3D">
              <span aria-hidden="true">3D</span> {inclinar ? "Inclinación activada" : "Inclinar el móvil"} <i translate="no">体感</i>
            </button>
          )}
          {mods.map((unidad, idx) => {
            const numero = unidad.numero;
            const idxActual = Math.max(0, mods.findIndex((m) => current && current.startsWith(`${m.numero}-`)));
            const parada = STOP[numero];
            const prog = progresos[numero];
            const paradas = prog.total;
            const forma = formaDe(lv.key, idx);
            const pts = puntosCamino(idx, paradas, forma);
            const alcanzada = unlocked(idx, 1);
            const alto = ARRIBA + paradas * FILA + 78;
            const cam = camaraBase(alto, esMovil); // postura de reposo del tablero 3D (el director la anima)
            const cartel = (x, y, alza = 0, extra = null) => ({ "data-gx": x, "data-gy": y, "data-alza": alza, style: { ...extra, transform: transformCartel(cam, x, y, "centro", alza) } });
            const enFiesta = fiesta?.numero === numero;
            // Durante el sello de la celebración el mapa enseña todavía el estado anterior
            const retenida = enFiesta && fiesta.fase !== "viaje";
            const iActual = prog.clases.findIndex((clase) => current === `${numero}-${clase.n}`);
            const oroHasta = Math.min(retenida ? fiesta.i : prog.completadas, paradas);
            const unidadGanada = prog.completa && !retenida;
            // v26 · Examen: bloqueado (faltan clases) · abierto (todas hechas) · aprobado (examen de la unidad superado)
            const examenAprobado = Boolean(progresoModulos[`modulo-${numero}`]?.completed) && !retenida;
            const estadoExamen = examenAprobado ? "aprobado" : prog.completadas >= paradas && !retenida ? "abierto" : "bloqueado";
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
            const paisaje = paisajeDe(parada);
            // Clase que se desbloquea al terminar la celebración (candado que salta en pedazos)
            const iDesbloquea = fiesta && fiesta.fase === "viaje" && !fiesta.saltada ? (enFiesta ? fiesta.i + 1 : fiesta.unidad && mods[idx - 1]?.numero === fiesta.numero ? 0 : -1) : -1;
            return (
              <section key={numero} id={`ruta-u${numero}`} className={`ruta-unit pz-${paisaje.tipo} ${unidadGanada ? "ganada" : ""} ${alcanzada ? "" : "lejana"} ${abierta?.startsWith(`${numero}-`) ? "ru-con-pop" : ""}`} style={{ "--pc": paisaje.c, "--pd": paisaje.d, "--ps": paisaje.suelo, "--pt": paisaje.tinta }}>
                <header className="ru-estandarte" style={{ "--c": paisaje.c, "--d": paisaje.d }}>
                  <span className="ru-paisaje" aria-hidden="true">
                    <PaisajeBanda tipo={paisaje.tipo} semilla={numero} />
                  </span>
                  <span className="ru-medallon">
                    <Moneda tamano={esMovil ? 46 : 68} tono="oro" brillo={alcanzada}>
                      <Pictograma tipo={paisaje.tipo} tamano={esMovil ? 26 : 38} className="ru-pictograma" />
                    </Moneda>
                    <b className="ru-num" translate="no">
                      U{numero}
                    </b>
                  </span>
                  <div className="ru-textos">
                    <span className="ru-lugar">
                      <span translate="no">{parada?.lugarZh?.startsWith(parada?.ciudadZh || "\u0000") ? parada?.lugarZh : `${parada?.ciudadZh}·${parada?.lugarZh}`}</span> {parada?.ciudad} · {parada?.lugar}
                    </span>
                    <h2>
                      <small>
                        {lv.key} · Unidad {numero} <span translate="no">第{numero}单元</span>
                      </small>
                      <span className="ru-titulo">{titulo}</span> <i>{unidad.tituloChino.split(" - ")[0]}</i>
                    </h2>
                  </div>
                  <span className="ru-clases" title={`${prog.completadas}/${prog.total} clases · 课`}>
                    <span className="ru-segmentos" aria-hidden="true">
                      {prog.clases.map((clase) => (
                        <i key={clase.n} className={clase.completada && !(retenida && clase.n === fiesta.n) ? "hecha" : ""} />
                      ))}
                      <i className={`examen ${estadoExamen === "aprobado" ? "hecha" : ""}`} />
                    </span>
                    <b>
                      {retenida ? Math.max(0, prog.completadas - 1) : prog.completadas}/{prog.total} clases <span translate="no">课</span>
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
                <CaminoPerezoso forzar={Math.abs(idx - idxActual) <= 1 || enFiesta} className="ruta-camino-wrap ru-terreno" dataVin={ladoVineta} style={{ height: alto, "--vin-y": `${Math.max(20, masDesviada[1] - 70)}px` }}>
                  <span className="ru-marca-agua" aria-hidden="true">
                    <Pictograma tipo={paisaje.tipo} tamano={260} />
                    <b translate="no">{parada?.lugarZh}</b>
                  </span>
                  <div className={`ruta-camino r3-tablero rf-${forma.tipo}`} data-forma={forma.tipo} data-alto={alto} style={{ width: ANCHO_CARRIL, height: alto }}>
                    {/* v27 · Suelo del tablero 3D: todo lo que va pintado en el plano (se inclina en perspectiva) */}
                    <div className="r3-suelo" style={{ transform: transformSuelo(cam) }}>
                    {/* v26 · Camino y terreno PINTADOS con el mismo pintor que el fondo (scripts/tramos-ruta.py) */}
                    <TramoPintado src={`${BASE_URL}theme/ruta/tramos/${lv.key}-v${forma.variante}-p${Math.min(3, Math.max(2, paradas))}-f${FILA}.webp`} pts={pts} forma={forma} alto={alto} carril={ANCHO_CARRIL} />
                    {/* Cuerpo ilustrado del recorrido: muralla, río con puente, tinta, escalinata o nubes (v24) */}
                    <Recorrido forma={forma} pts={pts} hechas={oroHasta} alcanzada={alcanzada} alto={alto} soloBruma />
                    <svg className="ruta-carretera" width={ANCHO_CARRIL} height={alto} aria-hidden="true">
                      {alcanzada && (
                        <>
                          <path className="halo" d={trazado(pts, oroHasta, forma)} />
                          <path className="oro" d={trazado(pts, oroHasta, forma)} />
                          <path className="luz" d={trazado(pts, oroHasta, forma)} />
                        </>
                      )}
                      {/* Tramo recién ganado: se dibuja en oro una sola vez */}
                      {enFiesta && fiesta.fase === "trazo" && fiesta.i < paradas && (
                        <g className="rc-trazo">
                          <path className="oro" pathLength="1" d={tramo(pts[fiesta.i], pts[fiesta.i + 1], forma)} />
                          <path className="luz" pathLength="1" d={tramo(pts[fiesta.i], pts[fiesta.i + 1], forma)} />
                        </g>
                      )}
                    </svg>
                    {/* Destello que recorre el oro de vez en cuando y huellas que laten hacia la siguiente parada */}
                    {alcanzada && (iActual >= 0 || idx === mods.indexOf(modActual) - 1) && <span className="rc-brillo-camino" style={{ offsetPath: `path("${trazado(pts, oroHasta, forma)}")` }} aria-hidden="true" />}
                    {iActual >= 0 &&
                      !retenida &&
                      [0.24, 0.42, 0.6, 0.78].map((t, k) => {
                        const [x, y] = puntoCurva(pts[iActual], pts[iActual + 1], t, forma);
                        return <span key={t} className="rc-huella" style={{ left: x, top: y, "--k": k, "--lado": x > ANCHO_CARRIL / 2 ? 1 : -1 }} aria-hidden="true" />;
                      })}
                    {/* Sombras de contacto de lo que está de pie (medallones y pabellón): elipses en el suelo, opuestas a la luz */}
                    {pts.map(([x, y], i) => (
                      <span key={`s${i}`} className={`r3-sombra ${i === paradas ? "templo" : ""}`} style={{ left: x, top: y }} aria-hidden="true" />
                    ))}
                    </div>
                    {prog.clases.map((clase, i) => {
                      const clave = `${numero}-${clase.n}`;
                      const esLaDeFiesta = enFiesta && fiesta.n === clase.n;
                      const isDone = clase.completada && !(esLaDeFiesta && !fiesta.monedaHecha);
                      const isOpen = unlocked(idx, clase.n);
                      const isCurrent = fiesta && fiesta.fase !== "viaje" ? esLaDeFiesta && !fiesta.monedaHecha : current === clave;
                      const estaAbierta = abierta === clave;
                      const siguiente = clase.lecciones.findIndex((hecha) => !hecha);
                      const estado = isDone ? "done" : isOpen ? "open" : "locked";
                      const tamanoMoneda = Math.round(((isCurrent ? 104 : 86) - (esMovil ? 12 : 0)) * (estado === "locked" ? 0.76 : 1));
                      const abrir = () => {
                        if (!isOpen) setNegada(clave);
                        setAbierta(estaAbierta ? null : clave);
                      };
                      return (
                        <div
                          key={clave}
                          className={`ruta-node-wrap rp-parada ${estado} ${isCurrent ? "actual" : ""} ${estaAbierta ? "abierto" : ""} ${esLaDeFiesta ? "rp-recien" : ""} ${esLaDeFiesta && fiesta.monedaHecha ? "rp-gira" : ""} ${negada === clave ? "rp-niega" : ""} ${iDesbloquea === i ? "rp-desbloquea" : ""}`}
                          {...cartel(pts[i][0], pts[i][1], esMovil ? 8 : 10)}
                          ref={esLaDeFiesta ? fiestaRef : isCurrent ? currentRef : null}
                        >
                          {isCurrent && (
                            <button type="button" className="rp-empezar" onClick={abrir} tabIndex={-1} aria-hidden="true" style={{ "--dxe": `${ANCHO_CARRIL / 2 - pts[i][0]}px` }}>
                              <span className="rp-emp-ala izq" />
                              <span className="rp-emp-ala der" />
                              <span className="rp-emp-luz" />
                              <span className="rp-emp-play" />
                              <span className="rp-emp-textos">
                                <b>
                                  {clase.hechas ? "Seguir" : "Empezar"} <span className="rp-emp-zh" translate="no">{clase.hechas ? "继续" : "开始"}</span>
                                </b>
                                <small>
                                  {clase.hechas ? `${clase.hechas}/${LESSONS_PER_MODULE} lecciones` : `${LESSONS_PER_MODULE} lecciones`} · ~{clase.minutos || 50} min <i translate="no">{LESSONS_PER_MODULE}个小练习</i>
                                </small>
                              </span>
                            </button>
                          )}
                          {isCurrent && (
                            <span className="md-haz" aria-hidden="true" />
                          )}
                          {isCurrent && (
                            <span className="md-aura" aria-hidden="true">
                              <i />
                              <i />
                              <i />
                              <i />
                            </span>
                          )}
                          <span className="rp-peana" aria-hidden="true" />
                          <span className="rp-onda" aria-hidden="true" />
                          {iDesbloquea === i && (
                            <span className="rp-cadenas" aria-hidden="true">
                              <i />
                              <i />
                              <b />
                            </span>
                          )}
                          {estado === "locked" && <span className="rp-bruma" aria-hidden="true" />}
                          <button
                            type="button"
                            className={`path-node ${estado} ${isCurrent ? "current" : ""}`}
                            onClick={abrir}
                            onPointerMove={inclinarMoneda}
                            onPointerLeave={soltarMoneda}
                            onPointerDown={girarMoneda}
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
                              <Medallon tamano={tamanoMoneda} estado={isDone ? "hecha" : isCurrent ? "actual" : isOpen ? "abierta" : "cerrada"}>
                                <GlifoClase n={clase.n} estado={isDone ? "hecha" : isCurrent ? "actual" : isOpen ? "abierta" : "cerrada"} tamano={isCurrent ? (esMovil ? 44 : 52) : isOpen || isDone ? (esMovil ? 34 : 40) : esMovil ? 26 : 30} />
                              </Medallon>
                              {isDone && <MarcaHecha perfecta={clase.nota === 100} />}
                              {esLaDeFiesta && fiesta.monedaHecha && !fiesta.saltada && (
                                <span className="rp-sello-estampa" aria-hidden="true" translate="no">
                                  成
                                </span>
                              )}
                              {estado === "locked" && (
                                <span className="md-candado" aria-hidden="true">
                                  <LockIcon size={esMovil ? 11 : 13} strokeWidth={3} />
                                </span>
                              )}
                            </span>
                            <span className="ruta-clase-sello">
                              Clase {clase.n} <i translate="no">第{clase.n}课</i>
                            </span>
                          </button>
                          {estaAbierta && (
                            <FichaClase
                              ancla={anclaFicha}
                              abierta={isOpen}
                              nivel={lv.key}
                              color={lv.color}
                              oscuro={lv.dark}
                              numero={numero}
                              clase={clase}
                              titulo={clase.titulo || titulo}
                              lugar={parada?.ciudad || ""}
                              paisaje={paisaje.tipo}
                              siguiente={siguiente}
                              cargando={loading}
                              movil={esMovil}
                              onEmpezar={(k) => start(numero, clase.n, k)}
                              onCerrar={() => setAbierta(null)}
                            />
                          )}
                        </div>
                      );
                    })}
                    <Link
                      to={`/modulos/modulo-${numero}?tab=examen&examen=unidad&clase=${paradas}`}
                      className={`ruta-chest rp-cofre ex-${estadoExamen} ${unidadGanada ? "ganado" : ""}`}
                      {...cartel(pts[paradas][0], pts[paradas][1], 0, { "--orden": idx % 4 })}
                      title="Examen de la unidad · 单元考试"
                      aria-label={`Examen de la unidad ${numero}${estadoExamen === "bloqueado" ? ", bloqueado" : estadoExamen === "aprobado" ? ", aprobado" : ""} · 单元考试`}
                    >
                      {estadoExamen === "abierto" && <span className="rp-rayos" aria-hidden="true" />}
                      <span className="rp-moneda">
                        <span className={`rp-templo t-${lv.key}`} aria-hidden="true" />
                        <span className="rp-templo-cofre">
                          <CofreImperial abierto={estadoExamen !== "bloqueado"} tamano={esMovil ? 50 : 58} />
                        </span>
                        {estadoExamen === "bloqueado" && (
                          <span className="rp-cadenas-ex" aria-hidden="true">
                            <i />
                            <i />
                          </span>
                        )}
                        {estadoExamen === "aprobado" && (
                          <span className="rp-estrellas" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                          </span>
                        )}
                        {estadoExamen === "bloqueado" && (
                          <span className="rp-cofre-candado" aria-hidden="true">
                            <LockIcon size={esMovil ? 16 : 18} strokeWidth={2.6} />
                          </span>
                        )}
                        {estadoExamen === "aprobado" && (
                          <span className="rp-cofre-sello" aria-hidden="true" translate="no">
                            成
                          </span>
                        )}
                      </span>
                      <span className="ruta-clase-sello rp-cofre-cartel">
                        {estadoExamen === "aprobado" ? "Aprobado" : estadoExamen === "abierto" ? "¡A por el examen!" : "Examen"} <span translate="no">{estadoExamen === "aprobado" ? "通过" : estadoExamen === "abierto" ? "去考试" : "考试"}</span>
                      </span>
                      {estadoExamen === "bloqueado" ? (
                        <span className="rp-cofre-premio bloqueado">
                          Completa las clases · {Math.min(prog.completadas, paradas)}/{paradas} <i translate="no">先完成本单元的课</i>
                        </span>
                      ) : estadoExamen === "abierto" ? (
                        <span className="rp-cofre-premio" title="Al aprobar: sello del pasaporte · 通过后获得护照印章">
                          <span className="rp-premio-sello" aria-hidden="true">
                            <Pictograma tipo={paisaje.tipo} tamano={16} />
                          </span>
                          Gana el sello de {parada?.ciudad} <i translate="no">赢得印章</i>
                        </span>
                      ) : null}
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
                        forma={forma}
                        reposoEn={iMono >= 0 && iMono < paradas && !monoSeVa ? reposoMono(pts[iMono], pts[iMono + 1], tamanoMono, esMovil) : null}
                        onLlegada={monoSeVa ? () => setFiesta((actual) => (actual ? { ...actual, monoSalio: true } : actual)) : undefined}
                      />
                    )}
                  </div>
                </CaminoPerezoso>
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
                  <button key={meta} type="button" aria-pressed={game.goal === meta} className={`ui-chip ${game.goal === meta ? "is-on" : ""}`} onClick={() => setDailyGoal(meta)}>
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
            <FiltroTinta />
            <div className="sp-pagina" data-nivel={lv.key}>
              <span className="sp-pagina-cabecera" aria-hidden="true">
                <b translate="no">入境 · 签证</b> Visado {lv.key} · {REGION[lv.key][0]}
              </span>
              <div className="sp-rejilla">
                {(() => {
                  const iSiguiente = mods.findIndex((unidad) => !progresos[unidad.numero]?.completa);
                  return mods.map((unidad, k) => {
                    const recienGanado = fiesta?.unidad && fiesta.numero === unidad.numero;
                    const conseguido = progresos[unidad.numero]?.completa && !(recienGanado && fiesta.fase === "sello");
                    return (
                      <SelloPasaporte
                        key={unidad.numero}
                        numero={unidad.numero}
                        parada={STOP[unidad.numero]}
                        conseguido={conseguido}
                        fecha={fechaSello(fechaUnidad(game.lessons, unidad.numero) || (conseguido ? Date.now() : 0))}
                        recien={recienGanado && conseguido}
                        siguiente={k === iSiguiente}
                      />
                    );
                  });
                })()}
              </div>
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

// v27 · Rey Mono: siempre junto a la clase actual, en el lado CONTRARIO al que sigue el camino (nunca tapa la
// siguiente parada ni el botón Empezar) y mirando a la moneda
function reposoMono(actual, siguiente, tamano, movil) {
  let lado = siguiente[0] < actual[0] - 4 ? 1 : siguiente[0] > actual[0] + 4 ? -1 : actual[0] > ANCHO_CARRIL / 2 ? 1 : -1;
  const x = actual[0] + lado * tamano * 0.74;
  // En el móvil no hay margen fuera del carril: si no cabe, se queda del lado de dentro, a la altura de la moneda
  const holgura = movil ? 8 : 150;
  if (x - tamano * 0.45 < -holgura || x + tamano * 0.45 > ANCHO_CARRIL + holgura) {
    return [actual[0] - lado * tamano * 0.8, actual[1] + tamano * 0.42];
  }
  return [x, actual[1] + tamano * 0.1];
}

// v27 · Moneda 3D: se inclina hacia el puntero (con el reflejo siguiéndolo) y da una vuelta al pulsarla
function monedaDe(evento) {
  return sinMovimiento() ? null : evento.currentTarget.querySelector(".md3");
}
function inclinarMoneda(evento) {
  const moneda = monedaDe(evento);
  if (!moneda) return;
  const caja = moneda.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (evento.clientX - caja.left) / caja.width));
  const y = Math.max(0, Math.min(1, (evento.clientY - caja.top) / caja.height));
  moneda.style.setProperty("--ry", `${((x - 0.5) * 46).toFixed(1)}deg`);
  moneda.style.setProperty("--rx", `${((0.5 - y) * 40).toFixed(1)}deg`);
  moneda.style.setProperty("--mx", `${(x * 100).toFixed(0)}%`);
  moneda.style.setProperty("--my", `${(y * 100).toFixed(0)}%`);
  moneda.classList.add("md3-mira");
}
function soltarMoneda(evento) {
  const moneda = monedaDe(evento);
  if (!moneda) return;
  moneda.classList.remove("md3-mira");
  for (const v of ["--rx", "--ry", "--mx", "--my"]) moneda.style.removeProperty(v);
}
function girarMoneda(evento) {
  const moneda = monedaDe(evento);
  if (!moneda) return;
  moneda.classList.remove("md3-gira");
  void moneda.offsetWidth; // reinicia la animación
  moneda.classList.add("md3-gira");
  clearTimeout(moneda.__gira);
  moneda.__gira = setTimeout(() => moneda.classList.remove("md3-gira"), 1000);
}

// Fecha (ms) de la última lección hecha de la unidad: la fecha del sello del pasaporte
function fechaUnidad(lessons, numero) {
  let ultima = 0;
  for (const [id, dato] of Object.entries(lessons)) {
    if ((id.startsWith(`m${numero}-l`) || id.startsWith(`m${numero}-c`)) && dato?.at) ultima = Math.max(ultima, new Date(dato.at).getTime() || 0);
  }
  return ultima;
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
  ["🎓", "Aprobar el examen", "通过考试"],
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
  ["🏆", "Preparo el B2", "准备B2", "B2"],
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

// v25 · Icono propio del botón Empezar: pincel de caligrafía que traza hacia la derecha
function PincelIcono() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M3 19.5c3.2.4 5.6-.6 7-2.6" fill="none" stroke="#8f0c21" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9.6 16.4l3.2-4.4 2.6 2.1-3.6 4z" fill="#3b2416" />
      <path d="M12.8 12l7.4-9 1.6 1.3-6.4 9.8z" fill="#8f0c21" />
      <path d="M13.6 11.6l6.6-8" stroke="#f6d77e" strokeWidth=".9" strokeLinecap="round" />
    </svg>
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
