// Pincel mágico · 神笔 — inspirado en la leyenda china del pincel mágico de Ma Liang.
// Modo solo: el pincel del Rey Mono dibuja una palabra de la unidad y el alumno la adivina antes de que acabe.
// Modo clase: alguien dibuja en el pergamino y la clase adivina en voz alta (un solo dispositivo, por equipos).
import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router";
import { ArrowLeftIcon, Volume2Icon, VolumeXIcon, PlayIcon, RotateCcwIcon, TrophyIcon, StarIcon, FlameIcon, ListIcon, CornerDownLeftIcon, UsersIcon, BrushIcon, SparklesIcon, EyeIcon } from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak, confetti } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { UNIDADES_VOCABULARIO, parametrosJuego } from "../../lib/vocabularioJuegos.js";
import { ICONOS, palabrasConDibujo, esCorrecta } from "../../lib/pincel.js";
import { barajar, claveRecord, leerNumero, guardarNumero, usePrefiereMenosMovimiento, SelectorUnidad, Sello, etiquetaContenido } from "./jbComun.jsx";
import { DibujoTinta, PincelSvg, Pergamino, PolvoOro, SelloCae } from "./pincelDibujo.jsx";
import { ModoClase } from "./PincelClase.jsx";
import "../../styles/v13-juegos-b.css";
import "../../styles/pincel.css";

const RONDAS = 10;
const DURACION = 8500; // lo que tarda el pincel en dibujar
const PRORROGA = 6000; // segundos extra con el dibujo terminado
const TECLAS = ["á", "é", "í", "ó", "ú", "ñ", "ü", "¿", "¡"];
const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];

const FRASES = {
  pinta: [
    ["¡Mira cómo pinta mi pincel!", "看我的神笔！"],
    ["¿Qué será? ¡Adivina!", "这是什么？猜猜看！"],
    ["Trazo a trazo…", "一笔一画……"],
  ],
  bien: [
    ["¡Exacto!", "完全正确！"],
    ["¡Qué vista!", "好眼力！"],
    ["¡Muy bien!", "很好！"],
    ["¡Perfecto!", "完美！"],
  ],
  rapido: [["¡Más rápido que mi pincel!", "比我的笔还快！"]],
  racha: [["¡Racha de tinta dorada!", "金墨连胜！"]],
  mal: [
    ["Casi… mira bien el dibujo.", "差一点……再看看。"],
    ["No es eso. ¡Sigue!", "不是这个，加油！"],
  ],
  fallo: [["Era esta palabra. ¡A la próxima!", "是这个词。下次加油！"]],
};

/** Contenido: la unidad elegida (?m=N) solo con su vocabulario */
function useUnidad() {
  const location = useLocation();
  return React.useMemo(() => {
    const consulta = new URLSearchParams(location.search || (window.location.hash.split("?")[1] ?? ""));
    if (consulta.get("m") === "todas") return { numero: "todas", nivel: "A1–B2", titulo: "Todas las unidades", tituloChino: "全部单元" };
    const { numero } = parametrosJuego();
    const u = numero && UNIDADES_VOCABULARIO.find((x) => x.numero === Number(numero));
    return u ? { numero: u.numero, nivel: u.nivel, titulo: u.titulo, tituloChino: u.tituloChino, clase: null } : null;
  }, [location.search, location.pathname]);
}

/** Palabras de la partida: primero la unidad, luego el mismo nivel y, si hiciera falta, el resto de la tabla */
function repartoPalabras(unidad) {
  const { propias, nivel, extra } = palabrasConDibujo(unidad.numero, UNIDADES_VOCABULARIO);
  return { propias, nivel, extra, todas: [...propias, ...nivel, ...extra] };
}

function elegirRondas(reparto) {
  const lista = [...barajar(reparto.propias), ...barajar(reparto.nivel), ...barajar(reparto.extra)].slice(0, RONDAS);
  return barajar(lista).map((p) => {
    const otras = barajar(reparto.todas.filter((x) => x.icono !== p.icono && x.es !== p.es));
    // Distractores: mejor de la misma categoría (más difícil) y de la unidad si es posible
    const parecidas = otras.filter((x) => x.cat === p.cat);
    const opciones = barajar([p, ...[...parecidas, ...otras].filter((x, i, a) => a.findIndex((y) => y.es === x.es) === i).slice(0, 2)]);
    return { palabra: p, opciones };
  });
}

// ---------- Página ----------
export default function PincelPage() {
  const unidad = useUnidad();
  if (!unidad)
    return (
      <SelectorUnidad
        titulo="Pincel mágico"
        tituloChino="神笔"
        icono={<Sello grande>笔</Sello>}
        descripcion="El pincel del Rey Mono dibuja y tú adivinas la palabra · 美猴王的神笔画画，你来猜词"
      />
    );
  return <Pincel key={unidad.numero} unidad={unidad} />;
}

/** Rey Mono con bocadillo */
function Mono({ estado, className = "" }) {
  return (
    <div className={`pm-mono is-${estado.pose} ${className}`} key={estado.id}>
      <img src={`./mono/${estado.pose}.webp`} alt="" aria-hidden="true" />
      {estado.es && (
        <p className="pm-bocadillo" aria-live="polite">
          <b>{estado.es}</b>
          <span translate="no">{estado.zh}</span>
        </p>
      )}
    </div>
  );
}

function Pincel({ unidad }) {
  const reducido = usePrefiereMenosMovimiento();
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playClick } = useSound();
  const reparto = React.useMemo(() => repartoPalabras(unidad), [unidad]);
  const [modo, setModo] = React.useState("inicio"); // inicio | solo | final | clase
  const clave = claveRecord("pincel", unidad);
  const [record, setRecord] = React.useState(() => leerNumero(clave));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [modo]);

  const [partida, setPartida] = React.useState(null);
  const empezar = () => {
    playClick?.();
    setPartida({ id: Math.random(), rondas: elegirRondas(reparto) });
    setModo("solo");
  };

  const avisoRelleno =
    unidad.numero !== "todas" && reparto.propias.length < RONDAS
      ? {
          es: `Esta unidad tiene ${reparto.propias.length} palabra${reparto.propias.length === 1 ? "" : "s"} con dibujo; completamos con palabras de otras unidades del nivel ${unidad.nivel}${reparto.propias.length + reparto.nivel.length < RONDAS ? " y de otros niveles" : ""}.`,
          zh: `本单元有 ${reparto.propias.length} 个可以画的词，其余的来自 ${unidad.nivel} 级其他单元${reparto.propias.length + reparto.nivel.length < RONDAS ? "和其他级别" : ""}。`,
        }
      : null;

  if (modo === "clase")
    return (
      <div className={`pm-raiz gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
        <ModoClase unidad={unidad} reparto={reparto} onSalir={() => setModo("inicio")} avisoRelleno={avisoRelleno} />
      </div>
    );

  if (modo === "solo" && partida)
    return (
      <div className={`pm-raiz gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
        <PartidaSolo
          key={partida.id}
          unidad={unidad}
          rondas={partida.rondas}
          clave={clave}
          record={record}
          onRecord={setRecord}
          onSalir={() => setModo("inicio")}
          onOtra={empezar}
          sonido={{ soundEnabled, toggleSound, playCorrect, playWrong, playWin, playClick }}
        />
      </div>
    );

  // ---------- Portada del juego ----------
  const muestra = reparto.propias[0] || reparto.todas[0];
  return (
    <div className={`pm-raiz gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
      <div className="pm-barra">
        <Link to="/juegos" className="pm-volver">
          <ArrowLeftIcon size={18} aria-hidden="true" /> <span>Juegos · 游戏</span>
        </Link>
        <span className="pm-unidad">{etiquetaContenido(unidad)}</span>
      </div>
      <section className="pm-portada">
        <PolvoOro />
        <div className="pm-portada__cab">
          <Sello grande className="pm-portada__sello">
            笔
          </Sello>
          <div>
            <h1 className="pm-titulo">
              Pincel mágico <span translate="no">神笔</span>
            </h1>
            <p className="pm-sub">
              Dice la leyenda que el joven Ma Liang tenía un pincel que daba vida a todo lo que pintaba. Hoy lo lleva el Rey Mono.
              <span translate="no">传说少年马良有一支神笔，画什么就变成什么。今天，神笔在美猴王手里。</span>
            </p>
            <p className="pm-unidad-nombre">
              {unidad.numero === "todas" ? "Todas las unidades" : unidad.titulo} <span translate="no">{unidad.tituloChino}</span>
            </p>
          </div>
        </div>

        <div className="pm-modos">
          <button type="button" className="pm-modo pm-modo--solo" onClick={empezar}>
            <span className="pm-modo__escena" aria-hidden="true">
              <Pergamino className="pm-pergamino--mini">
                {muestra && <DibujoTinta nodos={ICONOS[muestra.icono]} duracion={5200} className="pm-dibujo--mini" key={muestra.icono} />}
              </Pergamino>
              <img src="./mono/poder.webp" alt="" className="pm-modo__mono" />
            </span>
            <span className="pm-modo__texto">
              <Sello className="pm-modo__sello">猜</Sello>
              <b>Adivina el dibujo</b>
              <small translate="no">你来猜 · 单人</small>
              <span className="pm-modo__desc">
                El pincel pinta trazo a trazo. Escribe la palabra antes de que termine: cuanto antes, más puntos. {RONDAS} rondas.
                <i translate="no">神笔一笔一画地画，在画完之前写出这个词：越快得分越高。共{RONDAS}轮。</i>
              </span>
              <span className="pm-cta">
                <PlayIcon size={20} aria-hidden="true" /> Jugar · 开始
              </span>
            </span>
          </button>

          <button type="button" className="pm-modo pm-modo--clase" onClick={() => setModo("clase")}>
            <span className="pm-modo__escena" aria-hidden="true">
              <span className="pm-modo__equipos">
                {["甲", "乙", "丙"].map((t, i) => (
                  <span key={t} className={`pm-ficha-equipo is-${i}`} translate="no">
                    {t}
                  </span>
                ))}
              </span>
              <svg className="pm-modo__pincel" viewBox="-8 -14 16 16">
                <PincelSvg escala={1} />
              </svg>
            </span>
            <span className="pm-modo__texto">
              <Sello className="pm-modo__sello">画</Sello>
              <b>Dibuja para la clase</b>
              <small translate="no">你画我猜 · 全班</small>
              <span className="pm-modo__desc">
                Un alumno ve la palabra en secreto y la dibuja en 60 segundos; su equipo la dice en voz alta. Para proyector o pasando el móvil.
                <i translate="no">一个人偷偷看词，60秒内画出来，队友大声说出答案。适合投影或传手机。</i>
              </span>
              <span className="pm-cta pm-cta--jade">
                <UsersIcon size={20} aria-hidden="true" /> Preparar equipos · 分队
              </span>
            </span>
          </button>
        </div>

        <div className="pm-portada__pie">
          <span className="pm-dato">
            <BrushIcon size={16} aria-hidden="true" /> {reparto.propias.length} palabras con dibujo en esta unidad · 本单元可画词
          </span>
          {record > 0 && (
            <span className="pm-dato pm-dato--oro">
              <TrophyIcon size={16} aria-hidden="true" /> Récord · 最高分 {record}
            </span>
          )}
          {avisoRelleno && (
            <p className="pm-aviso">
              {avisoRelleno.es} <span translate="no">{avisoRelleno.zh}</span>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

// ---------- Partida en solitario ----------
function PartidaSolo({ unidad, rondas, clave, record, onRecord, onSalir, onOtra, sonido }) {
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playClick } = sonido;
  const reducido = usePrefiereMenosMovimiento();
  const [n, setN] = React.useState(0);
  const [fase, setFase] = React.useState("pinta"); // pinta | prorroga | acierto | fallo
  const [texto, setTexto] = React.useState("");
  const [verOpciones, setVerOpciones] = React.useState(false);
  const [puntos, setPuntos] = React.useState(0);
  const [racha, setRacha] = React.useState(0);
  const [mejorRacha, setMejorRacha] = React.useState(0);
  const [ganado, setGanado] = React.useState(null); // { puntos, rapido }
  const [historial, setHistorial] = React.useState([]); // { palabra, ok, puntos }
  const [mono, setMono] = React.useState({ pose: "poder", ...frase("pinta"), id: 0 });
  const [tiembla, setTiembla] = React.useState(false);
  const [final, setFinal] = React.useState(null);
  const [errorOpcion, setErrorOpcion] = React.useState(null);
  const progresoRef = React.useRef(0);
  const inicioProrroga = React.useRef(0);
  const inputRef = React.useRef(null);
  const timers = React.useRef(new Set());
  const [, forzar] = React.useState(0);
  const nRef = React.useRef(0);
  const historialRef = React.useRef([]);
  const terminadaRef = React.useRef(false);
  const anotar = (x) => {
    historialRef.current = [...historialRef.current, x];
    setHistorial(historialRef.current);
  };
  const ronda = rondas[n];

  const programar = React.useCallback((fn, ms) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
    return id;
  }, []);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function frase(clave2) {
    const [es, zh] = azar(FRASES[clave2]);
    return { es, zh };
  }
  const decir = (pose, clave2) => setMono({ pose, ...(clave2 ? frase(clave2) : { es: null, zh: null }), id: Math.random() });

  // Barra de tiempo: se redibuja cada 100 ms mientras pinta o en la prórroga
  React.useEffect(() => {
    if (fase !== "pinta" && fase !== "prorroga") return;
    const id = window.setInterval(() => forzar((x) => x + 1), 100);
    return () => window.clearInterval(id);
  }, [fase]);

  // En móvil, al revelar la palabra se vuelve a mostrar el pergamino (las opciones quedan más abajo)
  React.useEffect(() => {
    if ((fase === "acierto" || fase === "fallo") && window.innerWidth <= 760) {
      document.querySelector(".pm-juego .pm-mesa")?.scrollIntoView({ block: "center", behavior: reducido ? "auto" : "smooth" });
    }
  }, [fase, reducido]);

  // Prórroga agotada → fallo
  React.useEffect(() => {
    if (fase !== "prorroga") return;
    const id = programar(() => fallar(), PRORROGA);
    return () => {
      window.clearTimeout(id);
      timers.current.delete(id);
    };
  }, [fase, n]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (window.matchMedia?.("(pointer: fine)").matches) inputRef.current?.focus({ preventScroll: true });
  }, [n]);

  const finDibujo = React.useCallback(() => {
    setFase((f) => {
      if (f !== "pinta") return f;
      inicioProrroga.current = Date.now();
      return "prorroga";
    });
  }, []);

  const acertar = (porOpcion) => {
    const p = ronda.palabra;
    if (historialRef.current.length > nRef.current) return;
    const resto = fase === "pinta" ? 1 - progresoRef.current : 0;
    const nuevaRacha = racha + 1;
    let gan = 50 + Math.round(150 * resto) + Math.min(5, nuevaRacha - 1) * 10;
    if (porOpcion) gan = Math.round(gan * 0.5);
    setPuntos((x) => x + gan);
    setRacha(nuevaRacha);
    setMejorRacha((m) => Math.max(m, nuevaRacha));
    const rapido = resto > 0.55;
    setGanado({ puntos: gan, rapido, racha: nuevaRacha });
    anotar({ palabra: p, ok: true, puntos: gan });
    setFase("acierto");
    soundEnabled && playCorrect?.();
    if (soundEnabled) programar(() => speak(p.es, 0.9), 380);
    decir("feliz", nuevaRacha >= 3 && nuevaRacha % 3 === 0 ? "racha" : rapido ? "rapido" : "bien");
    programar(siguiente, reducido ? 1600 : 2600);
  };

  function fallar() {
    const p = ronda.palabra;
    if (historialRef.current.length > nRef.current) return;
    setRacha(0);
    setGanado(null);
    anotar({ palabra: p, ok: false, puntos: 0 });
    setFase("fallo");
    soundEnabled && playWrong?.();
    if (soundEnabled) programar(() => speak(p.es, 0.85), 500);
    decir("serio", "fallo");
    programar(siguiente, reducido ? 2200 : 3200);
  }

  function siguiente() {
    const sig = nRef.current + 1;
    if (sig >= rondas.length) return terminar();
    nRef.current = sig;
    progresoRef.current = 0;
    setN(sig);
    setTexto("");
    setVerOpciones(false);
    setErrorOpcion(null);
    setGanado(null);
    setFase("pinta");
    decir("poder", "pinta");
  }

  function terminar() {
    if (terminadaRef.current) return;
    terminadaRef.current = true;
    const h = historialRef.current;
    const aciertos = h.filter((x) => x.ok).length;
    const total = h.reduce((a, x) => a + x.puntos, 0);
    const estrellas = aciertos >= 9 ? 3 : aciertos >= 6 ? 2 : aciertos >= 3 ? 1 : 0;
    const xp = 10 + aciertos * 3 + estrellas * 5;
    try {
      addXp(xp);
    } catch {}
    const nuevoRecord = total > record;
    if (nuevoRecord) {
      guardarNumero(clave, total);
      onRecord(total);
    }
    setFinal({ aciertos, total, estrellas, xp, nuevoRecord });
    soundEnabled && playWin?.();
    if (!reducido && estrellas >= 2) confetti({ count: 110 });
  }

  const comprobar = (e) => {
    e?.preventDefault();
    if (fase !== "pinta" && fase !== "prorroga") return;
    if (!texto.trim()) return;
    if (esCorrecta(texto, ronda.palabra)) acertar(false);
    else {
      soundEnabled && playWrong?.();
      setTiembla(true);
      programar(() => setTiembla(false), 450);
      decir("serio", "mal");
    }
  };

  const elegir = (op) => {
    if (fase !== "pinta" && fase !== "prorroga") return;
    if (op.es === ronda.palabra.es) acertar(true);
    else {
      setErrorOpcion(op.es);
      fallar();
    }
  };

  const tecla = (t) => {
    playClick?.();
    const el = inputRef.current;
    if (!el) return setTexto((x) => x + t);
    const a = el.selectionStart ?? texto.length;
    const b = el.selectionEnd ?? texto.length;
    const nuevo = texto.slice(0, a) + t + texto.slice(b);
    setTexto(nuevo);
    requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
      el.setSelectionRange(a + t.length, a + t.length);
    });
  };

  // Tiempo restante (para la barra de tinta)
  let restante = 1;
  if (fase === "pinta") restante = 1 - progresoRef.current * (DURACION / (DURACION + PRORROGA));
  else if (fase === "prorroga") restante = Math.max(0, (PRORROGA - (Date.now() - inicioProrroga.current)) / (DURACION + PRORROGA));
  else restante = 0;
  const jugando = fase === "pinta" || fase === "prorroga";

  if (final)
    return <FinalSolo unidad={unidad} final={final} historial={historial} mejorRacha={mejorRacha} record={Math.max(record, final.total)} onSalir={onSalir} onOtra={onOtra} />;

  return (
    <div className={`pm-juego is-${fase}`}>
      <div className="pm-barra">
        <button type="button" className="pm-volver" onClick={onSalir}>
          <ArrowLeftIcon size={18} aria-hidden="true" /> <span>Salir · 退出</span>
        </button>
        <span className="pm-barra__titulo">
          <Sello className="pm-barra__sello">笔</Sello>
          <span>
            Pincel mágico <small translate="no">神笔 · 你来猜</small>
          </span>
        </span>
        <span className="pm-unidad">{etiquetaContenido(unidad)}</span>
        <button type="button" className="pm-icono" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"}>
          {soundEnabled ? <Volume2Icon size={19} aria-hidden="true" /> : <VolumeXIcon size={19} aria-hidden="true" />}
        </button>
      </div>

      <div className="pm-hud" role="group" aria-label="Estado · 状态">
        <span className="pm-chip pm-chip--rondas" aria-label={`Ronda ${n + 1} de ${rondas.length} · 第${n + 1}轮`}>
          <small>Ronda · 轮</small>
          <span className="pm-cuentas" aria-hidden="true">
            {rondas.map((_, i) => (
              <i key={i} className={i < historial.length ? (historial[i].ok ? "is-ok" : "is-no") : i === n ? "is-ahora" : ""} />
            ))}
          </span>
          <b>
            {n + 1}/{rondas.length}
          </b>
        </span>
        <span className="pm-chip">
          <small>Puntos · 分数</small>
          <b className="pm-puntos" key={puntos}>
            {puntos}
          </b>
        </span>
        <span className={`pm-chip ${racha >= 3 ? "is-fuego" : ""}`}>
          <FlameIcon size={17} aria-hidden="true" />
          <small>Racha · 连胜</small>
          <b>{racha}</b>
        </span>
      </div>

      <div className="pm-mesa">
        <span className="pm-mesa__luz" aria-hidden="true" />
        <PolvoOro n={14} />
        <Mono estado={mono} className="pm-mono--mesa" />
        <Pergamino className={tiembla ? "is-tiembla" : ""} estado={fase}>
          <DibujoTinta
            key={n}
            nodos={ICONOS[ronda.palabra.icono]}
            duracion={DURACION}
            onFin={finDibujo}
            progresoRef={progresoRef}
            terminado={!jugando}
            className="pm-dibujo--grande"
          />
          {fase === "acierto" && <SelloCae />}
          {fase === "fallo" && <SelloCae texto="失" fallo />}
          {!jugando && (
            <div className={`pm-revela ${fase === "fallo" ? "is-fallo" : ""}`} aria-live="assertive">
              <b lang="es">{ronda.palabra.es}</b>
              <span translate="no">{ronda.palabra.zh}</span>
              {ganado && (
                <em className="pm-ganado">
                  +{ganado.puntos} {ganado.rapido ? "· ¡rapidísimo! 神速" : ""}
                </em>
              )}
              <button type="button" className="pm-oir" onClick={() => speak(ronda.palabra.es, 0.9)} aria-label={`Escuchar ${ronda.palabra.es} · 听`}>
                <Volume2Icon size={18} aria-hidden="true" />
              </button>
            </div>
          )}
          {ronda.palabra.origen !== "unidad" && jugando && (
            <span className="pm-origen">{ronda.palabra.origen === "nivel" ? `Del nivel ${unidad.nivel} · 同级词` : "Palabra extra · 补充词"}</span>
          )}
        </Pergamino>
        <div className="pm-tiempo" aria-hidden="true">
          <span className={`pm-tiempo__tinta ${fase === "prorroga" ? "is-prisa" : ""}`} style={{ transform: `scaleX(${restante})` }} />
        </div>
        {fase === "prorroga" && <p className="pm-prisa">El pincel ha terminado: ¡última oportunidad! · 画完了，最后机会！</p>}
      </div>

      <form className={`pm-respuesta ${tiembla ? "is-tiembla" : ""}`} onSubmit={comprobar}>
        <label className="pm-campo">
          <span className="pm-sr">Escribe la palabra en español · 用西班牙语写出这个词</span>
          <input
            ref={inputRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe en español… · 写西班牙语…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            lang="es"
            disabled={!jugando}
            enterKeyHint="done"
          />
          <button type="submit" className="pm-enviar" disabled={!jugando || !texto.trim()} aria-label="Comprobar · 确认">
            <CornerDownLeftIcon size={20} aria-hidden="true" />
          </button>
        </label>
        <div className="pm-teclas" role="group" aria-label="Letras especiales · 特殊字母">
          {TECLAS.map((t) => (
            <button key={t} type="button" className="pm-tecla" onClick={() => tecla(t)} disabled={!jugando}>
              {t}
            </button>
          ))}
        </div>
        <p className="pm-nota">Los acentos no cuentan · 重音不扣分 — el artículo es opcional · 冠词可写可不写</p>
        {!verOpciones ? (
          <button type="button" className="pm-ver-opciones" onClick={() => setVerOpciones(true)} disabled={!jugando}>
            <ListIcon size={18} aria-hidden="true" /> Ver tres opciones (mitad de puntos) · 看三个选项（得分减半）
          </button>
        ) : (
          <div className="pm-opciones" role="group" aria-label="Opciones · 选项">
            {ronda.opciones.map((op) => {
              const correcta = !jugando && op.es === ronda.palabra.es;
              const mala = errorOpcion === op.es;
              return (
                <button key={op.es} type="button" className={`pm-opcion ${correcta ? "is-correcta" : ""} ${mala ? "is-mala" : ""}`} onClick={() => elegir(op)} disabled={!jugando}>
                  <b lang="es">{op.es}</b>
                </button>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
}

// ---------- Final y galería ----------
function FinalSolo({ unidad, final, historial, mejorRacha, record, onSalir, onOtra }) {
  const reducido = usePrefiereMenosMovimiento();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pm-final">
      <section className="pm-final__tarjeta">
        <PolvoOro n={16} />
        <span className="pm-final__rayos" aria-hidden="true" />
        <img className="pm-final__mono" src={`./mono/${final.estrellas >= 2 ? "trofeo" : final.estrellas === 1 ? "feliz" : "guino"}.webp`} alt="" aria-hidden="true" />
        <h2 className="pm-final__titulo">
          {final.estrellas >= 2 ? "¡Ojo de maestro!" : final.estrellas === 1 ? "¡Buen trazo!" : "¡Sigue practicando!"}
          <span translate="no">{final.estrellas >= 2 ? "大师的眼力！" : final.estrellas === 1 ? "画得好！" : "继续练习！"}</span>
        </h2>
        <div className="pm-estrellas" aria-label={`${final.estrellas} de 3 estrellas · 星`}>
          {[0, 1, 2].map((i) => (
            <StarIcon key={i} size={44} className={i < final.estrellas ? "is-on" : ""} style={{ "--i": i }} aria-hidden="true" />
          ))}
        </div>
        <div className="pm-final__datos">
          <span>
            <b>{final.total}</b> puntos · 分
          </span>
          <span>
            <b>
              {final.aciertos}/{historial.length}
            </b>{" "}
            aciertos · 猜对
          </span>
          <span>
            <b>{mejorRacha}</b> mejor racha · 最佳连胜
          </span>
          <span className="is-xp">
            <SparklesIcon size={16} aria-hidden="true" /> +{final.xp} XP
          </span>
        </div>
        <p className="pm-final__record">
          <TrophyIcon size={17} aria-hidden="true" /> {final.nuevoRecord ? "¡Nuevo récord! · 新纪录！" : `Récord · 最高分: ${record}`}
        </p>
        <div className="pm-final__botones">
          <button type="button" className="pm-boton-oro" onClick={onOtra} autoFocus>
            <RotateCcwIcon size={20} aria-hidden="true" /> Otra partida · 再来一局
          </button>
          <button type="button" className="pm-boton-claro" onClick={onSalir}>
            <BrushIcon size={18} aria-hidden="true" /> Modos de juego · 游戏模式
          </button>
          <Link to="/juegos" className="pm-boton-claro">
            <ArrowLeftIcon size={18} aria-hidden="true" /> Juegos · 游戏
          </Link>
        </div>
      </section>

      <section className="pm-galeria-sec">
        <h3 className="pm-galeria__titulo">
          <EyeIcon size={20} aria-hidden="true" /> Galería de la partida <span translate="no">本局画廊</span>
        </h3>
        <ul className="pm-galeria">
          {historial.map(({ palabra, ok, puntos }, i) => (
            <li key={i} className={`pm-cuadro ${ok ? "is-ok" : "is-no"}`} style={{ "--i": i }}>
              <div className="pm-cuadro__papel">
                <DibujoTinta nodos={ICONOS[palabra.icono]} animar={false} pincel={false} />
                <span className="pm-cuadro__sello" translate="no">
                  {ok ? "印" : "失"}
                </span>
              </div>
              <div className="pm-cuadro__pie">
                <b lang="es">{palabra.es}</b>
                <span translate="no">{palabra.zh}</span>
              </div>
              <button type="button" className="pm-oir pm-oir--mini" onClick={() => speak(palabra.es, 0.9)} aria-label={`Escuchar ${palabra.es} · 听`}>
                <Volume2Icon size={16} aria-hidden="true" />
              </button>
              {ok && <em className="pm-cuadro__pts">+{puntos}</em>}
            </li>
          ))}
        </ul>
        {!reducido && <span className="pm-sr">{unidad.titulo}</span>}
      </section>
    </div>
  );
}
