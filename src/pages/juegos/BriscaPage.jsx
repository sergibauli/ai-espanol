// Brisca del Rey Mono · 美猴王纸牌 — la brisca con la baraja española; cada carta de tu mano lleva un reto de la unidad.
import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { HelpCircleIcon, Volume2Icon, VolumeXIcon, LayersIcon, PlayIcon, RotateCcwIcon, XIcon, CheckIcon, TrophyIcon, SparklesIcon } from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { useModalAccesible } from "../../lib/useModalAccesible.js";
import { chispasOro } from "./ja-comun.jsx";
import { useContenidoJuego, usePrefiereMenosMovimiento, SelectorUnidad, Sello, Volver, etiquetaContenido, claveRecord, leerNumero, guardarNumero, sinAcentos } from "./jbComun.jsx";
import { PALOS, PALO, NUMEROS, NOMBRE, PUNTOS, crearBaraja, ganadorBaza, jugadaMono, crearFabricaRetos, nombreCarta, nombreConArticulo, nombreZh, valor, fuerza, ETIQUETA_RETO } from "./briscaLogica.js";
import { Carta, Dorso, SimboloPalo, precargarBaraja } from "./CartasBaraja.jsx";
import "../../styles/v13-juegos-b.css";
import "../../styles/v13-juegos-a.css";
import "../../styles/v22-brisca.css";

const BONUS = 2;

export default function BriscaPage() {
  const contenido = useContenidoJuego();
  if (!contenido)
    return (
      <SelectorUnidad
        titulo="Brisca del Rey Mono"
        tituloChino="美猴王纸牌"
        icono={<Sello grande>牌</Sello>}
        descripcion="La baraja española contra el Rey Mono: cada carta trae un reto de tu clase · 用西班牙纸牌挑战美猴王，每张牌都有一道本课的题"
      />
    );
  return <JuegoBrisca key={`${contenido.numero}-${contenido.clase}`} contenido={contenido} />;
}

// ---------- Partida ----------
function nuevaPartida(siguienteReto) {
  const mazo = crearBaraja();
  const muestra = mazo[mazo.length - 1];
  const manoJ = [];
  const manoM = [];
  const retrasos = {};
  for (let i = 0; i < 3; i++) {
    const a = mazo.shift();
    const b = mazo.shift();
    manoJ.push({ ...a, reto: siguienteReto(a) });
    manoM.push(b);
    retrasos[a.id] = i * 260;
    retrasos[b.id] = i * 260 + 130;
  }
  retrasos[muestra.id] = 820;
  return {
    mazo,
    triunfo: muestra.palo,
    muestra,
    manoJ,
    manoM,
    mesa: [],
    bazasJ: [],
    bazasM: [],
    ptsJ: 0,
    ptsM: 0,
    saberJ: 0,
    saberM: 0,
    turno: "j",
    fase: "jugar",
    ganador: null,
    racha: 0,
    bastones: 0,
    armado: false,
    aciertos: 0,
    retos: 0,
    retrasos,
    aviso: null,
    bazas: 0,
    selladas: [],
    burla: null,
  };
}

function JuegoBrisca({ contenido }) {
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playLose, playClick, playSpell } = useSound();
  const reducido = usePrefiereMenosMovimiento();
  const fabrica = React.useMemo(() => crearFabricaRetos(contenido), [contenido]);
  const [pantalla, setPantalla] = React.useState("intro"); // intro · juego · fin
  const [p, setP] = React.useState(null);
  const [reto, setReto] = React.useState(null); // { carta, respuesta }
  const [ayuda, setAyuda] = React.useState(false);
  const [resultado, setResultado] = React.useState(null);
  const claveRec = claveRecord("brisca", contenido);
  const mesaRef = React.useRef(null);
  React.useEffect(() => precargarBaraja(), []);

  const empezar = () => {
    playSpell?.();
    setResultado(null);
    setReto(null);
    setP(nuevaPartida(fabrica));
    setPantalla("juego");
  };

  // --- Turno del Rey Mono ---
  React.useEffect(() => {
    if (!p || p.fase !== "jugar" || p.turno !== "m" || p.mesa.length >= 2 || !p.manoM.length) return undefined;
    const t = setTimeout(() => {
      setP((s) => {
        if (s.fase !== "jugar" || s.turno !== "m") return s;
        const carta = jugadaMono(s.manoM, s.mesa[0] || null, s.triunfo, s.mazo.length);
        return { ...s, manoM: s.manoM.filter((c) => c.id !== carta.id), mesa: [...s.mesa, { carta, palo: carta.palo, quien: "m" }], turno: "j", retrasos: {}, aviso: null };
      });
      playClick?.();
    }, 950);
    return () => clearTimeout(t);
  }, [p?.fase, p?.turno, p?.mesa.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Nombre de la carta que juega el Rey Mono (vocabulario de la baraja)
  const ultimaMono = p?.mesa.find((e) => e.quien === "m")?.carta;
  React.useEffect(() => {
    if (ultimaMono && pantalla === "juego") speak(nombreConArticulo(ultimaMono), 0.95);
  }, [ultimaMono?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Resolver la baza, recoger y robar ---
  React.useEffect(() => {
    if (!p) return undefined;
    if (p.fase === "jugar" && p.mesa.length === 2) {
      const t = setTimeout(() => {
        setP((s) => {
          if (s.mesa.length !== 2 || s.fase !== "jugar") return s;
          const g = s.mesa.some((e) => e.forzada) ? "m" : ganadorBaza(s.mesa[0], s.mesa[1], s.triunfo) === 0 ? s.mesa[0].quien : s.mesa[1].quien;
          return { ...s, fase: "resuelve", ganador: g };
        });
      }, 700);
      return () => clearTimeout(t);
    }
    if (p.fase === "resuelve") {
      const pts = p.mesa.reduce((t, e) => t + valor(e.carta), 0);
      if (p.ganador === "j") {
        playCorrect?.();
        if (pts >= 10 && mesaRef.current) {
          const r = mesaRef.current.querySelector(".bz-baza")?.getBoundingClientRect();
          if (r) chispasOro(r.left + r.width / 2, r.top + r.height / 2, 30);
        }
      }
      const t = setTimeout(() => {
        setP((s) => {
          const cartas = s.mesa.map((e) => e.carta);
          const suma = cartas.reduce((t2, c) => t2 + valor(c), 0);
          const gj = s.ganador === "j";
          return {
            ...s,
            fase: "recogido",
            mesa: [],
            bazasJ: gj ? [...s.bazasJ, ...cartas] : s.bazasJ,
            bazasM: gj ? s.bazasM : [...s.bazasM, ...cartas],
            ptsJ: s.ptsJ + (gj ? suma : 0),
            ptsM: s.ptsM + (gj ? 0 : suma),
            bazas: s.bazas + 1,
            retrasos: {},
          };
        });
      }, 1500);
      return () => clearTimeout(t);
    }
    if (p.fase === "recogido") {
      const t = setTimeout(() => {
        setP((s) => {
          const mazo = [...s.mazo];
          let manoJ = s.manoJ.map((c) => (s.selladas.includes(c.id) ? { ...c, reto: fabrica(c) } : c));
          let manoM = s.manoM;
          const retrasos = {};
          const orden = s.ganador === "j" ? ["j", "m"] : ["m", "j"];
          orden.forEach((q, i) => {
            const c = mazo.shift();
            if (!c) return;
            retrasos[c.id] = i * 200;
            if (q === "j") manoJ = [...manoJ, { ...c, reto: fabrica(c) }];
            else manoM = [...manoM, c];
          });
          const fin = !manoJ.length && !manoM.length;
          return { ...s, mazo, manoJ, manoM, retrasos, selladas: [], burla: null, turno: s.ganador, fase: fin ? "fin" : "jugar", ganador: fin ? s.ganador : null };
        });
      }, 520);
      return () => clearTimeout(t);
    }
    if (p.fase === "fin") {
      const t = setTimeout(() => terminar(p), 700);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [p?.fase, p?.mesa.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const terminar = (s) => {
    const totalJ = s.ptsJ + s.saberJ;
    const totalM = s.ptsM + s.saberM;
    const estado = totalJ > totalM ? "gana" : totalJ < totalM ? "pierde" : "empate";
    const xp = Math.max(5, s.aciertos * 2 + (estado === "gana" ? 20 : estado === "empate" ? 10 : 5));
    let premio = null;
    try {
      premio = addXp(xp);
    } catch {}
    const record = leerNumero(claveRec);
    const nuevoRecord = totalJ > record;
    if (nuevoRecord) guardarNumero(claveRec, totalJ);
    setResultado({ estado, totalJ, totalM, xp, nuevoRecord, record: Math.max(record, totalJ), s, subeNivel: premio?.levelUp });
    setPantalla("fin");
    if (estado === "gana") {
      playWin?.();
      speak("¡Has ganado la partida!", 0.95);
      chispasOro(innerWidth / 2, innerHeight * 0.35, 60);
      setTimeout(() => chispasOro(innerWidth * 0.3, innerHeight * 0.45, 40), 350);
      setTimeout(() => chispasOro(innerWidth * 0.7, innerHeight * 0.45, 40), 650);
    } else {
      (estado === "empate" ? playWin : playLose)?.();
      speak(estado === "empate" ? "¡Empate!" : "¡Gana el Rey Mono! Otra vez será.", 0.95);
    }
  };

  // --- Tu jugada ---
  const puedesJugar = pantalla === "juego" && p?.fase === "jugar" && p.turno === "j" && p.mesa.length < 2 && !reto;
  const elegirCarta = (carta) => {
    if (!puedesJugar) return;
    playClick?.();
    speak(nombreConArticulo(carta), 0.95);
    setReto({ carta, respuesta: null });
  };
  const responder = (opcion) => {
    if (!reto || reto.respuesta !== null) return;
    const acierto = sinAcentos(opcion) === sinAcentos(reto.carta.reto.correcta);
    setReto({ ...reto, respuesta: opcion, acierto });
    if (acierto) playCorrect?.();
    else playWrong?.();
    if (reto.carta.reto.audio) setTimeout(() => speak(reto.carta.reto.audio, 0.9), 350);
  };
  const BURLAS = [
    { es: "¡Ji, ji! Esa carta queda sellada.", zh: "嘻嘻！这张牌被封住了。" },
    { es: "¡Ja! Con esa no juegas, discípulo.", zh: "哈！这张你出不了，徒弟。" },
    { es: "Mi 金箍棒 sella tu carta. ¡Prueba otra!", zh: "我的金箍棒封住了你的牌，换一张吧！" },
    { es: "¡Uy! Ni las nubes te salvan de esa.", zh: "哎呀！筋斗云也救不了你。" },
  ];
  const jugarCarta = () => {
    if (!reto || reto.respuesta === null) return;
    const { carta, acierto } = reto;
    setReto(null);
    if (!acierto) {
      // Fallo: la carta queda sellada (封) y no se puede tirar en esta baza
      setP((s) => {
        if (s.fase !== "jugar" || s.mesa.length >= 2) return s;
        const selladas = [...new Set([...s.selladas, carta.id])];
        const libres = s.manoJ.filter((c) => !selladas.includes(c.id));
        const base = { ...s, selladas, racha: 0, retos: s.retos + 1, burla: BURLAS[s.retos % BURLAS.length], aviso: null, retrasos: {} };
        if (libres.length) return base;
        // Todas falladas: el Rey Mono gana la baza sin más (tu carta de menos valor va a la mesa)
        const peor = [...s.manoJ].sort((a, b) => valor(a) - valor(b) || fuerza(a) - fuerza(b))[0];
        return {
          ...base,
          manoJ: s.manoJ.filter((c) => c.id !== peor.id),
          mesa: [...s.mesa, { carta: peor, palo: peor.palo, quien: "j", forzada: true }],
          armado: false,
          turno: "m",
          aviso: "pierdes",
        };
      });
      return;
    }
    setP((s) => {
      if (s.fase !== "jugar" || s.mesa.length >= 2 || !s.manoJ.some((c) => c.id === carta.id)) return s;
      const usaBaston = s.armado && s.bastones > 0;
      let racha = s.racha + 1;
      let bastones = s.bastones - (usaBaston ? 1 : 0);
      let aviso = null;
      if (racha >= 3) {
        racha = 0;
        bastones = Math.min(2, bastones + 1);
        aviso = "baston";
      }
      return {
        ...s,
        manoJ: s.manoJ.filter((c) => c.id !== carta.id),
        mesa: [...s.mesa, { carta, palo: usaBaston ? s.triunfo : carta.palo, quien: "j", baston: usaBaston }],
        saberJ: s.saberJ + BONUS,
        racha,
        bastones,
        armado: false,
        aciertos: s.aciertos + 1,
        retos: s.retos + 1,
        turno: "m",
        retrasos: {},
        aviso,
        burla: null,
      };
    });
  };
  const cancelarReto = () => {};

  // --- Animación FLIP: cada carta vuela de donde estaba a donde está ahora y se gira si cambia de cara ---
  const posRef = React.useRef(new Map());
  const caraRef = React.useRef(new Map());
  const mazoRect = React.useRef(null);
  React.useLayoutEffect(() => {
    const raiz = mesaRef.current;
    if (!raiz) return;
    const mazoEl = raiz.querySelector(".bz-mazo");
    if (mazoEl) mazoRect.current = mazoEl.getBoundingClientRect();
    const nuevas = new Map();
    const caras = new Map();
    raiz.querySelectorAll(".bz-carta[data-carta]").forEach((el) => {
      const id = el.dataset.carta;
      const r = el.getBoundingClientRect();
      nuevas.set(id, r);
      caras.set(id, el.dataset.cara);
      if (reducido || !el.animate) return;
      const retraso = Number(el.dataset.retraso || 0);
      const previa = posRef.current.get(id) || (mazoRect.current && el.dataset.origen === "mazo" ? mazoRect.current : null);
      if (previa) {
        const dx = previa.left - r.left;
        const dy = previa.top - r.top;
        const esc = previa.width / (r.width || 1);
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1 || Math.abs(esc - 1) > 0.02)
          // Vuelo en arco: la carta se levanta de la mesa (más grande, inclinada y con más sombra) y vuelve a posarse
          el.animate(
            [
              { transform: `translate(${dx}px, ${dy}px) scale(${esc}) rotateZ(0deg)`, filter: "drop-shadow(0 4px 6px rgba(0,0,0,.35))" },
              { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 40}px) scale(${(esc + 1) / 2 + 0.16}) rotateZ(${dx > 0 ? -8 : 8}deg)`, filter: "drop-shadow(0 26px 22px rgba(0,0,0,.45))", offset: 0.5 },
              { transform: "translate(0, 0) scale(1) rotateZ(0deg)", filter: "drop-shadow(0 4px 6px rgba(0,0,0,.35))" },
            ],
            { duration: 680, delay: retraso, easing: "cubic-bezier(.3,.7,.3,1)", fill: "backwards" },
          );
      }
      const caraPrevia = caraRef.current.get(id) ?? (posRef.current.has(id) ? undefined : "abajo");
      if (caraPrevia && caraPrevia !== el.dataset.cara && el.firstElementChild) {
        const desde = caraPrevia === "abajo" ? 180 : 0;
        const hasta = el.dataset.cara === "abajo" ? 180 : 0;
        el.firstElementChild.animate([{ transform: `rotateY(${desde}deg)` }, { transform: `rotateY(${hasta}deg)` }], { duration: 560, delay: retraso + 160, easing: "ease-in-out", fill: "backwards" });
      }
    });
    posRef.current = nuevas;
    caraRef.current = caras;
  }, [p, pantalla, reducido]);
  React.useEffect(() => {
    const medir = () => {
      const raiz = mesaRef.current;
      if (!raiz) return;
      const m = new Map();
      raiz.querySelectorAll(".bz-carta[data-carta]").forEach((el) => m.set(el.dataset.carta, el.getBoundingClientRect()));
      posRef.current = m;
      const mazoEl = raiz.querySelector(".bz-mazo");
      if (mazoEl) mazoRect.current = mazoEl.getBoundingClientRect();
    };
    addEventListener("resize", medir);
    addEventListener("scroll", medir, true);
    return () => {
      removeEventListener("resize", medir);
      removeEventListener("scroll", medir, true);
    };
  }, []);

  return (
    <div className="bz gm-no-adapt">
      <header className="bz-cabecera">
        <Volver />
        <div className="bz-titulo">
          <Sello>牌</Sello>
          <div>
            <h1>
              Brisca del Rey Mono <span translate="no">· 美猴王纸牌</span>
            </h1>
            <p>{etiquetaContenido(contenido)}</p>
          </div>
        </div>
        <div className="bz-acciones">
          <button type="button" className="bz-icono" onClick={() => setAyuda(true)} aria-label="Cómo se juega · 玩法" title="Cómo se juega · 玩法">
            <HelpCircleIcon size={20} />
          </button>
          <button type="button" className="bz-icono" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"}>
            {soundEnabled ? <Volume2Icon size={20} /> : <VolumeXIcon size={20} />}
          </button>
          <Link to="/juegos/brisca" className="bz-icono bz-icono--texto" title="Cambiar unidad · 更换单元">
            <LayersIcon size={18} aria-hidden="true" />
            <span>Unidad · 单元</span>
          </Link>
        </div>
      </header>

      {pantalla === "intro" && <Intro onEmpezar={empezar} contenido={contenido} />}
      {pantalla !== "intro" && p && (
        <Mesa
          p={p}
          mesaRef={mesaRef}
          puedesJugar={puedesJugar}
          elegirCarta={elegirCarta}
          seleccionada={reto?.carta?.id}
          armar={() => setP((s) => ({ ...s, armado: !s.armado && s.bastones > 0 }))}
        />
      )}

      {reto && createPortal(<ModalReto reto={reto} triunfo={p?.triunfo} armado={p?.armado} libres={p ? p.manoJ.filter((c) => c.id !== reto.carta.id && !p.selladas.includes(c.id)).length : 0} onResponder={responder} onJugar={jugarCarta} onCancelar={cancelarReto} />, document.body)}
      {ayuda &&
        createPortal(
          <Hoja titulo="Cómo se juega · 玩法" onCerrar={() => setAyuda(false)}>
            <Reglas />
            <VocabularioBaraja />
          </Hoja>,
          document.body,
        )}
      {pantalla === "fin" && resultado && createPortal(<Final r={resultado} onOtra={empezar} />, document.body)}
    </div>
  );
}

// ---------- Mesa ----------
function Marcador({ quien, nombre, nombreZh, cartas, saber, activo, pose }) {
  return (
    <div className={`bz-marcador bz-marcador--${quien}${activo ? " is-activo" : ""}`}>
      {pose ? <img src={`./mono/${pose}.webp`} alt="" className="bz-avatar" /> : <span className="bz-avatar bz-avatar--tu" translate="no">你</span>}
      <div className="bz-marcador-nombre">
        <b>{nombre}</b>
        <small translate="no">{nombreZh}</small>
      </div>
      <div className="bz-puntos" title={`Cartas ${cartas} + saber ${saber}`}>
        <span className="bz-puntos-total">{cartas + saber}</span>
        <small>
          牌 {cartas} · 智 +{saber}
        </small>
      </div>
    </div>
  );
}

function Monton({ cartas, quien }) {
  const ultimas = cartas.slice(-2);
  const capas = Math.min(6, Math.floor(cartas.length / 4));
  return (
    <div className={`bz-monton bz-monton--${quien}`} aria-label={`${quien === "j" ? "Tus bazas · 你的牌墩" : "Bazas del Rey Mono · 美猴王的牌墩"}: ${cartas.length}`}>
      {cartas.length === 0 && <span className="bz-monton-vacio">{quien === "j" ? "Tus bazas · 你的牌墩" : "Bazas · 牌墩"}</span>}
      {cartas.length > 0 && (
        <div className="bz-monton-pila" style={{ "--capas": capas }}>
          {ultimas.map((c, i) => (
            <Carta key={c.id} carta={c} bocaAbajo conCara className={`bz-en-monton is-${i}`} />
          ))}
        </div>
      )}
      {cartas.length > 0 && <span className="bz-monton-num">{cartas.length}</span>}
    </div>
  );
}

function mensajeDe(p) {
  if (p.fase === "resuelve" && p.mesa.some((e) => e.forzada)) return { es: "¡Fallaste todos los retos! El Rey Mono se lleva la baza", zh: "全部答错！美猴王拿走这一墩", tono: "mal" };
  if (p.fase === "jugar" && p.turno === "j" && p.burla) return { es: `Rey Mono: «${p.burla.es}»`, zh: `美猴王：「${p.burla.zh}」`, tono: "mal" };
  if (p.fase === "resuelve") {
    const pts = p.mesa.reduce((t, e) => t + valor(e.carta), 0);
    return p.ganador === "j" ? { es: `¡Ganas la baza! +${pts}`, zh: `你赢了这一墩！+${pts}`, tono: "bien" } : { es: `El Rey Mono gana la baza +${pts}`, zh: `美猴王赢了这一墩 +${pts}`, tono: "mal" };
  }
  if (p.fase === "recogido" || p.fase === "fin") return { es: "Robamos cartas…", zh: "摸牌…" };
  if (p.turno === "m") return { es: "El Rey Mono piensa…", zh: "美猴王在思考…" };
  const m = p.mesa[0];
  if (m) return { es: `El Rey Mono juega ${nombreConArticulo(m.carta)}. ¡Te toca!`, zh: `美猴王出了${nombreZh(m.carta)}，轮到你！` };
  return { es: "Sales tú: elige una carta y supera su reto", zh: "你先出牌：选一张牌，完成它的挑战" };
}

function Mesa({ p, mesaRef, puedesJugar, elegirCarta, seleccionada, armar }) {
  const msg = mensajeDe(p);
  const muestraEnMazo = p.mazo.length > 0;
  const poseMono = p.fase === "resuelve" ? (p.ganador === "m" ? "feliz" : "serio") : p.turno === "m" ? "guino" : "saluda";
  const gana = (e) => p.fase === "resuelve" && e.quien === p.ganador;
  return (
    <div className={`bz-mesa${p.armado ? " is-armado" : ""}`} ref={mesaRef}>
      <div className="bz-fila bz-fila--rival">
        <Marcador quien="m" nombre="Rey Mono" nombreZh="美猴王" cartas={p.ptsM} saber={p.saberM} activo={p.turno === "m" && p.fase === "jugar"} pose={poseMono} />
        <div className="bz-mano bz-mano--rival" aria-label={`Cartas del Rey Mono: ${p.manoM.length}`}>
          {p.manoM.map((c, i) => (
            <div key={c.id} className="bz-slot" style={{ "--i": i - (p.manoM.length - 1) / 2 }}>
              <Carta carta={c} bocaAbajo origen="mazo" retraso={p.retrasos[c.id]} />
            </div>
          ))}
        </div>
      </div>

      <div className="bz-tapete">
        <div className="bz-mazo-zona">
          <div className="bz-mazo-pila">
            {muestraEnMazo && (
              <button type="button" className="bz-muestra" onClick={() => speak(nombreConArticulo(p.muestra), 0.95)} aria-label={`Triunfo: ${nombreCarta(p.muestra)}`}>
                <Carta carta={p.muestra} origen="mazo" retraso={p.retrasos[p.muestra.id]} />
              </button>
            )}
            {p.mazo.length > 1 && (
              <div className="bz-mazo" style={{ "--capas": Math.min(6, Math.ceil(p.mazo.length / 6)) }}>
                <div className="bz-carta bz-carta--fija">
                  <Dorso />
                </div>
                <span className="bz-mazo-num">{p.mazo.length}</span>
              </div>
            )}
          </div>
          <div className="bz-triunfo">
            <SimboloPalo palo={p.triunfo} size={22} />
            <span>
              Triunfo: <b>{PALO[p.triunfo].es}</b> <small translate="no">王牌 {PALO[p.triunfo].zh}</small>
            </span>
          </div>
        </div>

        <div className="bz-baza" aria-live="polite">
          <div className={`bz-bocadillo${msg.tono ? ` is-${msg.tono}` : ""}`}>
            <b>{msg.es}</b>
            <small>{msg.zh}</small>
          </div>
          <div className="bz-jugadas">
            {p.mesa.map((e, i) => (
              <button
                type="button"
                key={e.carta.id}
                className={`bz-jugada bz-jugada--${e.quien} is-${i}${gana(e) ? " is-gana" : ""}${p.fase === "resuelve" && !gana(e) ? " is-pierde" : ""}`}
                onClick={() => speak(nombreConArticulo(e.carta), 0.95)}
                aria-label={`${e.quien === "j" ? "Tu carta" : "Carta del Rey Mono"}: ${nombreCarta(e.carta)}`}
              >
                <Carta carta={e.carta} />
                <span className="bz-jugada-nombre">
                  {nombreCarta(e.carta)} <small translate="no">{nombreZh(e.carta)}</small>
                </span>
                {e.baston && <span className="bz-baston-sello">金箍棒 · triunfo</span>}
              </button>
            ))}
            {!p.mesa.length && p.fase === "jugar" && <div className="bz-hueco" aria-hidden="true" />}
          </div>
        </div>

        <div className="bz-montones">
          <Monton cartas={p.bazasM} quien="m" />
          <Monton cartas={p.bazasJ} quien="j" />
        </div>
      </div>

      <div className="bz-fila bz-fila--tuya">
        <div className="bz-poderes">
          <div className="bz-racha" title="3 aciertos seguidos = 金箍棒 · 连对3次得金箍棒">
            <small>Racha · 连对</small>
            <span>
              {[0, 1, 2].map((i) => (
                <i key={i} className={i < p.racha ? "is-on" : ""} />
              ))}
            </span>
          </div>
          <button type="button" className={`bz-baston${p.armado ? " is-on" : ""}`} disabled={!p.bastones} onClick={armar} aria-pressed={p.armado}>
            <SimboloPalo palo="bastos" size={26} />
            <span>
              <b>金箍棒 ×{p.bastones}</b>
              <small>{p.armado ? "Tu próxima carta es triunfo · 下一张变王牌" : "Convierte una carta en triunfo · 变王牌"}</small>
            </span>
          </button>
        </div>
        <div className={`bz-mano bz-mano--tuya${puedesJugar ? " is-turno" : ""}`}>
          {p.manoJ.map((c, i) => (
            <div key={c.id} className={`bz-slot${seleccionada === c.id ? " is-elegida" : ""}${p.selladas.includes(c.id) ? " is-sellada" : ""}`} style={{ "--i": i - (p.manoJ.length - 1) / 2 }}>
              {p.selladas.includes(c.id) && (
                <span className="bz-sello-fallo bz-sello-fallo--mano" aria-hidden="true">
                  封
                </span>
              )}
              <button type="button" className="bz-boton-carta" disabled={!puedesJugar || p.selladas.includes(c.id)} onClick={() => elegirCarta(c)} aria-label={`${nombreCarta(c)} · reto: ${ETIQUETA_RETO[c.reto?.tipo] || ""}`}>
                <Carta carta={c} origen="mazo" retraso={p.retrasos[c.id]} inclinable />
                <span className="bz-reto-tag">
                  <i translate="no">{c.reto?.sello}</i> {ETIQUETA_RETO[c.reto?.tipo]}
                </span>
                {(PUNTOS[c.n] || 0) > 0 && <span className="bz-valor">{PUNTOS[c.n]}</span>}
              </button>
            </div>
          ))}
        </div>
        <Marcador quien="j" nombre="Tú" nombreZh="你" cartas={p.ptsJ} saber={p.saberJ} activo={puedesJugar} />
      </div>
      {p.aviso === "pierdes" && (
        <div className="bz-toast bz-toast--mal" role="status">
          封 ¡Todas tus cartas selladas! El Rey Mono gana la baza · 全部被封，美猴王赢了这一墩
        </div>
      )}
      {p.aviso === "baston" && (
        <div className="bz-toast" role="status">
          <SparklesIcon size={18} aria-hidden="true" /> ¡3 aciertos! Ganas el 金箍棒 · 连对三次，获得金箍棒！
        </div>
      )}
    </div>
  );
}

// ---------- Modal del reto ----------
function ModalReto({ reto, triunfo, armado, libres, onResponder, onJugar, onCancelar }) {
  const ref = React.useRef(null);
  useModalAccesible(ref, { enfocar: true, onEscape: onCancelar });
  const { carta, respuesta, acierto } = reto;
  const r = carta.reto;
  const contestado = respuesta !== null;
  return (
    <div className="bz-modal-fondo gm-no-adapt" onClick={onCancelar}>
      <div className={`bz-modal bz-reto${contestado ? (acierto ? " is-bien" : " is-mal") : ""}`} ref={ref} role="dialog" aria-modal="true" aria-label="Reto de la carta · 卡牌挑战" onClick={(e) => e.stopPropagation()}>
        <div className="bz-reto-carta">
          <Carta carta={carta} className={armado ? "is-dorada" : ""} inclinable />
          {contestado && !acierto && (
            <span className="bz-sello-fallo" aria-hidden="true">
              封
            </span>
          )}
          <button type="button" className="bz-reto-nombre" onClick={() => speak(nombreConArticulo(carta), 0.9)}>
            <Volume2Icon size={16} aria-hidden="true" />
            <span>
              {contestado || r.tipo !== "baraja" ? nombreConArticulo(carta) : "¿…?"}
              <small translate="no">{contestado || r.tipo !== "baraja" ? nombreZh(carta) : ""}</small>
            </span>
          </button>
          {carta.palo === triunfo && <span className="bz-reto-triunfo">Triunfo · 王牌</span>}
        </div>
        <div className="bz-reto-cuerpo">
          <p className="bz-reto-tipo">
            <Sello>{r.sello}</Sello> {ETIQUETA_RETO[r.tipo]} · +{BONUS} 智
          </p>
          <h2 className="bz-reto-pregunta">{r.es}</h2>
          {r.zh && <p className="bz-reto-zh">{r.zh}</p>}
          <div className={`bz-opciones${r.opciones.length === 2 ? " is-dos" : ""}`}>
            {r.opciones.map((o) => {
              const correcta = sinAcentos(o) === sinAcentos(r.correcta);
              const estado = contestado ? (correcta ? " is-correcta" : o === respuesta ? " is-error" : " is-apagada") : "";
              return (
                <button key={o} type="button" className={`bz-opcion${estado}`} disabled={contestado} onClick={() => onResponder(o)}>
                  {o}
                  {contestado && correcta && <CheckIcon size={18} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
          {contestado && (
            <div className="bz-reto-feedback" role="status">
              <p className="bz-reto-veredicto">
                {acierto ? `¡Correcto! +${BONUS} puntos de saber · 答对了！+${BONUS}` : libres ? "¡Fallo! Esta carta queda sellada 封: elige otra · 答错了！这张牌被封住，换一张" : "¡Fallo! No te quedan cartas libres: el Rey Mono gana la baza · 答错了！没有可出的牌，美猴王赢这一墩"}
              </p>
              {r.nota && (
                <p className="bz-reto-nota">
                  {r.audio && (
                    <button type="button" className="bz-mini-audio" onClick={() => speak(r.audio, 0.85)} aria-label="Escuchar · 听">
                      <Volume2Icon size={15} />
                    </button>
                  )}
                  {r.nota}
                </p>
              )}
              <button type="button" className={`bz-boton${acierto ? " bz-boton--oro" : ""}`} onClick={onJugar} autoFocus>
                {acierto ? (
                  <>
                    <PlayIcon size={18} aria-hidden="true" /> Jugar la carta · 出牌
                  </>
                ) : libres ? (
                  <>
                    <RotateCcwIcon size={18} aria-hidden="true" /> Elegir otra carta · 换一张牌
                  </>
                ) : (
                  <>Ceder la baza · 认输这一墩</>
                )}
              </button>
            </div>
          )}
          {!contestado && <p className="bz-reto-pie">Si fallas, la carta queda sellada y no la puedes tirar · 答错的话，这张牌会被封住，不能出</p>}
        </div>
      </div>
    </div>
  );
}

// ---------- Reglas, vocabulario e inicio ----------
function Reglas() {
  return (
    <div className="bz-reglas">
      <h3>
        La brisca <small translate="no">· 布里斯卡牌</small>
      </h3>
      <ol>
        <li>
          <b>Tres cartas en la mano.</b> La última carta del mazo, boca arriba, marca el <b>triunfo</b> (el palo más fuerte).
          <small>每人手里三张牌。牌堆最下面翻开的那张决定「王牌」花色（最强的花色）。</small>
        </li>
        <li>
          <b>Cada uno juega una carta: es una baza.</b> Gana la carta más alta del palo que salió primero, salvo que alguien juegue triunfo. No es obligatorio seguir el palo.
          <small>每人出一张牌为一墩。先出的花色里最大的牌赢，除非有人出王牌。不必跟同花色。</small>
        </li>
        <li>
          <b>Quien gana la baza se lleva las cartas, roba primero y sale.</b> <small>赢的人收走这墩牌、先摸牌、下一轮先出。</small>
        </li>
        <li>
          <b>Cada carta de tu mano trae un reto de la unidad.</b> Si aciertas, juegas la carta y ganas +{BONUS} puntos de saber. <b>Si fallas, la carta queda sellada (封) y no la puedes tirar</b>: elige otra y responde a su reto. Si fallas los retos de todas tus cartas, el Rey Mono gana la baza. Con 3 aciertos seguidos ganas el <b>金箍棒</b>: convierte tu próxima carta en triunfo.
          <small>你手里的每张牌都有一道本单元的题。答对才能出这张牌，并得 {BONUS} 分。答错这张牌会被封住，不能出，要换一张再答。如果所有牌都答错，美猴王直接赢这一墩。连对三次获得「金箍棒」：下一张牌变成王牌。</small>
        </li>
        <li>
          <b>Al final se suman los puntos de las cartas (120 en total) y los de saber.</b> ¡Gana quien tenga más!
          <small>最后把牌面分（共120分）和答题分相加，分高者胜！</small>
        </li>
      </ol>
      <h3>
        Valor y fuerza de las cartas <small translate="no">· 牌的分值与大小</small>
      </h3>
      <div className="bz-valores">
        {[1, 3, 12, 11, 10, 7, 6, 5, 4, 2].map((n) => (
          <span key={n} className={`bz-valor-chip${PUNTOS[n] ? " is-puntua" : ""}`} onClick={() => speak(NOMBRE[n].es, 0.9)}>
            <b>{NOMBRE[n].es}</b>
            <small translate="no">{NOMBRE[n].zh}</small>
            <i>{PUNTOS[n] || 0}</i>
          </span>
        ))}
      </div>
      <p className="bz-nota-orden">De más fuerte a menos: as, tres, rey, caballo, sota, siete… dos · 从大到小：A、三、国王、骑士、侍从、七……二</p>
    </div>
  );
}

function VocabularioBaraja() {
  const ejemplo = (palo, n) => ({ id: `v-${palo}${n}`, palo, n });
  return (
    <div className="bz-vocab">
      <h3>
        La baraja española <small translate="no">· 西班牙纸牌</small>
      </h3>
      <p className="bz-vocab-intro">40 cartas, 4 palos, del 1 al 7 y tres figuras. Toca para escuchar · 40张牌，4种花色，1到7加三张人物牌。点击听发音</p>
      <div className="bz-palos">
        {PALOS.map((palo) => (
          <button key={palo} type="button" className={`bz-palo bz-palo--${palo}`} onClick={() => speak(`los ${PALO[palo].es}`, 0.9)}>
            <SimboloPalo palo={palo} size={46} />
            <b>{PALO[palo].es}</b>
            <small translate="no">{PALO[palo].zh}</small>
          </button>
        ))}
      </div>
      <div className="bz-figuras">
        {[10, 11, 12].map((n, i) => {
          const c = ejemplo(PALOS[i + 1], n);
          return (
            <button key={n} type="button" className="bz-figura" onClick={() => speak(`${NOMBRE[n].art} ${NOMBRE[n].es}`, 0.9)}>
              <div className="bz-figura-carta">
                <Carta carta={c} inclinable />
              </div>
              <b>
                {NOMBRE[n].art} {NOMBRE[n].es}
              </b>
              <small translate="no">{NOMBRE[n].zh}</small>
            </button>
          );
        })}
      </div>
      <div className="bz-numeros">
        {NUMEROS.filter((n) => n <= 7).map((n) => (
          <button key={n} type="button" onClick={() => speak(NOMBRE[n].es, 0.9)}>
            <b>{n}</b> {NOMBRE[n].es}
          </button>
        ))}
      </div>
      <p className="bz-vocab-ej">
        Se dice: <b>el tres de copas</b>, <b>la sota de oros</b>, <b>el rey de espadas</b> · 读法：杯三、金币侍从、剑国王
      </p>
      <p className="bz-credito">
        Ilustraciones: Basquetteur (Wikimedia Commons), <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>; monedas de oros redibujadas · 插图：Basquetteur（维基共享资源）
      </p>
    </div>
  );
}

function Intro({ onEmpezar, contenido }) {
  const muestra = [
    { id: "i1", palo: "oros", n: 1 },
    { id: "i2", palo: "copas", n: 12 },
    { id: "i3", palo: "espadas", n: 11 },
    { id: "i4", palo: "bastos", n: 10 },
  ];
  return (
    <div className="bz-intro">
      <section className="bz-intro-hero">
        <div className="bz-abanico" aria-hidden="true">
          {muestra.map((c, i) => (
            <div key={c.id} className="bz-abanico-carta" style={{ "--i": i - 1.5 }}>
              <Carta carta={c} inclinable />
            </div>
          ))}
        </div>
        <div className="bz-intro-texto">
          <img src="./mono/poder.webp" alt="" className="bz-intro-mono" />
          <h2>
            ¡Te reto a una brisca! <span translate="no">来一局布里斯卡吧！</span>
          </h2>
          <p>
            Juega con la baraja española contra el Rey Mono. Cada carta de tu mano trae un reto de <b>{contenido.titulo}</b>: si aciertas, la tiras y ganas puntos; si fallas, queda sellada con un 封 y tendrás que probar con otra. ¡Falla todas y el Rey Mono se lleva la baza!
          </p>
          <p className="bz-zh">用西班牙纸牌和美猴王对战。你手里的每张牌都有一道「{contenido.tituloChino || contenido.titulo}」的题：答对才能出牌并得分；答错这张牌就被「封」住，只能换一张。全部答错，美猴王直接赢这一墩！</p>
          <button type="button" className="bz-boton bz-boton--oro bz-boton--grande" onClick={onEmpezar}>
            <PlayIcon size={20} aria-hidden="true" /> Repartir cartas · 发牌
          </button>
        </div>
      </section>
      <div className="bz-intro-paneles">
        <section className="bz-panel">
          <Reglas />
        </section>
        <section className="bz-panel">
          <VocabularioBaraja />
        </section>
      </div>
    </div>
  );
}

function Hoja({ titulo, onCerrar, children }) {
  const ref = React.useRef(null);
  useModalAccesible(ref, { enfocar: true, onEscape: onCerrar });
  return (
    <div className="bz-modal-fondo gm-no-adapt" onClick={onCerrar}>
      <div className="bz-modal bz-hoja" ref={ref} role="dialog" aria-modal="true" aria-label={titulo} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="bz-modal-cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
          <XIcon size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

function Final({ r, onOtra }) {
  const ref = React.useRef(null);
  useModalAccesible(ref, { enfocar: true });
  const { s } = r;
  const titulo = r.estado === "gana" ? { es: "¡Has ganado!", zh: "你赢了！" } : r.estado === "empate" ? { es: "¡Empate!", zh: "平局！" } : { es: "Gana el Rey Mono", zh: "美猴王赢了" };
  return (
    <div className="bz-modal-fondo gm-no-adapt">
      <div className={`bz-modal bz-final is-${r.estado}`} ref={ref} role="dialog" aria-modal="true" aria-label={titulo.es}>
        <div className="bz-final-rayos" aria-hidden="true" />
        <img src={`./mono/${r.estado === "gana" ? "trofeo" : r.estado === "empate" ? "guino" : "feliz"}.webp`} alt="" className="bz-final-mono" />
        <h2>
          {titulo.es} <span translate="no">{titulo.zh}</span>
        </h2>
        <div className="bz-final-marcador">
          <div className="bz-final-col">
            <span className="bz-sello-pts">{r.totalJ}</span>
            <b>Tú · 你</b>
            <small>
              Cartas {s.ptsJ} + saber {s.saberJ}
            </small>
          </div>
          <span className="bz-final-vs">VS</span>
          <div className="bz-final-col">
            <span className="bz-sello-pts is-mono">{r.totalM}</span>
            <b>Rey Mono · 美猴王</b>
            <small>
              Cartas {s.ptsM} + saber {s.saberM}
            </small>
          </div>
        </div>
        <ul className="bz-final-datos">
          <li>
            <CheckIcon size={16} aria-hidden="true" /> Retos acertados · 答对: <b>{s.aciertos}</b> / {s.retos}
          </li>
          <li>
            <SparklesIcon size={16} aria-hidden="true" /> +{r.xp} XP{r.subeNivel ? " · ¡Subes de nivel! 升级了！" : ""}
          </li>
          <li>
            <TrophyIcon size={16} aria-hidden="true" /> {r.nuevoRecord ? "¡Nuevo récord! · 新纪录！" : "Récord · 纪录"}: <b>{r.record}</b>
          </li>
        </ul>
        <div className="bz-final-botones">
          <button type="button" className="bz-boton bz-boton--oro" onClick={onOtra}>
            <RotateCcwIcon size={18} aria-hidden="true" /> Otra partida · 再来一局
          </button>
          <Link to="/juegos/brisca" className="bz-boton">
            <LayersIcon size={18} aria-hidden="true" /> Otra unidad · 换单元
          </Link>
          <Link to="/juegos" className="bz-boton">
            Juegos · 游戏
          </Link>
        </div>
      </div>
    </div>
  );
}
