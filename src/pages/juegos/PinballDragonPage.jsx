// Pinball del dragón · 龙之弹球 — la máquina dice una palabra (en chino y en voz, en español) y hay que
// darle con la bola a la placa con esa palabra. Placa equivocada = la bola se rompe y se pierde.
import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeftIcon, PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon, RotateCcwIcon, LayersIcon, TrophyIcon, ZapIcon, MegaphoneIcon } from "lucide-react";
import { ElegirUnidadJuego } from "../../components/juegos/ElegirUnidadJuego.jsx";
import { vocabularioJuego, todasLasPalabras } from "../../lib/vocabularioJuegos.js";
import { speak } from "../../components/lesson/fx.js";
import { useSound } from "../../lib/sound.jsx";
import { addXp } from "../../lib/gamification.js";
import { MotorPinball, ANCHO, ALTO } from "./pinballMotor.js";
import "../../styles/v25-pinball.css";

const ACIERTOS_POR_NIVEL = 4;

// ---------- Utilidades ----------
const limpiar = (t) => String(t ?? "").replace(/\s+/g, " ").trim();
const normal = (t) => limpiar(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const tieneChino = (t) => /[一-鿿]/.test(String(t || ""));
function barajar(lista) {
  const c = [...lista];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}
function distancia(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m || !n) return Math.max(m, n);
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
const parecido = (a, b) => {
  const x = normal(a);
  const y = normal(b);
  let d = distancia(x, y) / Math.max(x.length, y.length);
  if (x[0] === y[0]) d -= 0.12;
  if (x.split(" ")[0] === y.split(" ")[0] && x.includes(" ")) d -= 0.1; // mismo artículo
  if (Math.abs(x.length - y.length) <= 2) d -= 0.06;
  return d;
};
const reducidoInicial = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function configNivel(nivel) {
  if (nivel <= 1) return { n: 3, similar: false, movil: false, velocidad: 0 };
  if (nivel === 2) return { n: 4, similar: false, movil: false, velocidad: 0 };
  if (nivel === 3) return { n: 4, similar: true, movil: false, velocidad: 0 };
  if (nivel === 4) return { n: 5, similar: true, movil: true, velocidad: 0.9 };
  return { n: 6, similar: true, movil: true, velocidad: Math.min(1.9, 1.15 + (nivel - 5) * 0.15) };
}

function construirPalabras(contenido) {
  const vistas = new Set();
  const lista = [];
  for (const v of contenido.vocabulario || []) {
    const es = limpiar(v.espanol).replace(/\s*\(.*?\)\s*/g, " ").trim();
    const zh = limpiar(v.chino);
    if (!es || !zh || es.length > 22 || !tieneChino(zh) || vistas.has(normal(es))) continue;
    vistas.add(normal(es));
    lista.push({ es, zh });
  }
  const relleno = [];
  if (lista.length < 8) {
    for (const v of barajar(todasLasPalabras())) {
      const es = limpiar(v.espanol);
      if (!es || es.length > 18 || vistas.has(normal(es)) || !tieneChino(v.chino)) continue;
      vistas.add(normal(es));
      relleno.push({ es, zh: limpiar(v.chino) });
      if (relleno.length >= 24) break;
    }
  }
  return { preguntas: lista.length ? lista : relleno.slice(0, 8), banco: [...lista, ...relleno] };
}

// Pitidos breves de la máquina (linternas, tirachinas, flippers)
let audioCtx = null;
function tono(frec, dur = 0.06, tipo = "square", vol = 0.03) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = tipo;
    o.frequency.value = frec;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.connect(g).connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + dur + 0.02);
  } catch {}
}

function Volver() {
  return (
    <Link to="/juegos" className="pb-volver">
      <ArrowLeftIcon size={18} aria-hidden="true" />
      <span>Volver · 返回</span>
    </Link>
  );
}

function capturar(e) {
  try {
    e.currentTarget.setPointerCapture?.(e.pointerId);
  } catch {}
}

// ---------- Página ----------
export default function PinballDragonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const numero = Number(new URLSearchParams(location.search).get("m")) || null;
  const contenido = React.useMemo(() => (numero ? vocabularioJuego(numero) : null), [numero]);
  if (!contenido)
    return (
      <ElegirUnidadJuego
        juego={{
          titulo: "Pinball del dragón",
          tituloZh: "龙之弹球",
          sello: "龙",
          desc: "Escucha la palabra y dale con la bola a la placa correcta · 听词语，用弹珠击中正确的词牌",
        }}
        onElegir={(n) => navigate(`${location.pathname}?m=${n}`)}
        error={numero ? "Esa unidad no existe · 没有这个单元" : ""}
      />
    );
  return <JuegoPinball key={contenido.numero} contenido={contenido} />;
}

function JuegoPinball({ contenido }) {
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playLose, playSpell, playClick } = useSound();
  const [reducido, setReducido] = React.useState(reducidoInicial);
  const canvasRef = React.useRef(null);
  const mesaRef = React.useRef(null);
  const motorRef = React.useRef(null);
  const datos = React.useMemo(() => construirPalabras(contenido), [contenido]);
  const claveRecord = `dele_pinball_record_${contenido.numero}`;
  const [record, setRecord] = React.useState(() => {
    try {
      return Number(localStorage.getItem(claveRecord)) || 0;
    } catch {
      return 0;
    }
  });
  const recordRef = React.useRef(record);
  const [fase, setFase] = React.useState("inicio"); // inicio | jugando | pausa | fin
  const [hud, setHud] = React.useState({ puntos: 0, bolas: 3, mult: 1, combo: 0, rampas: 0, enCarril: true });
  const [pregunta, setPregunta] = React.useState(null);
  const [nivel, setNivel] = React.useState(1);
  const [banner, setBanner] = React.useState(null);
  const [mono, setMono] = React.useState(null);
  const [resultado, setResultado] = React.useState(null);
  const [vozAuto, setVozAuto] = React.useState(true);
  const [tactil, setTactil] = React.useState({ izq: false, der: false, lanzar: false });

  // Estado de juego que no necesita re-render
  const J = React.useRef({ cola: [], nivel: 1, aciertos: 0, pregunta: null, temporizadores: [] });
  const vivo = React.useRef({});
  vivo.current = { soundEnabled, playCorrect, playWrong, playWin, playLose, playSpell, vozAuto, fase };

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const cambio = () => {
      setReducido(mq.matches);
      if (motorRef.current) motorRef.current.reducido = mq.matches;
    };
    mq.addEventListener?.("change", cambio);
    return () => mq.removeEventListener?.("change", cambio);
  }, []);

  const mostrarBanner = React.useCallback((b, ms = 1400) => {
    const id = Math.random();
    setBanner({ ...b, id });
    const t = setTimeout(() => setBanner((x) => (x?.id === id ? null : x)), ms);
    J.current.temporizadores.push(t);
  }, []);
  const celebrar = React.useCallback((pose, texto) => {
    const id = Math.random();
    setMono({ pose, texto, id });
    const t = setTimeout(() => setMono((x) => (x?.id === id ? null : x)), 1900);
    J.current.temporizadores.push(t);
  }, []);

  const decir = React.useCallback((texto) => {
    if (vivo.current.soundEnabled !== false) speak(texto, 0.9);
  }, []);

  // ---- Rondas ----
  const siguientePregunta = React.useCallback(() => {
    const j = J.current;
    if (!j.cola.length) j.cola = barajar(datos.preguntas).filter((p) => p.es !== j.pregunta?.es);
    if (!j.cola.length) j.cola = barajar(datos.preguntas);
    return j.cola.shift();
  }, [datos]);

  const nuevaRonda = React.useCallback(
    (repetir = null) => {
      const motor = motorRef.current;
      if (!motor) return;
      const j = J.current;
      const p = repetir || siguientePregunta();
      j.pregunta = p;
      const cfg = configNivel(j.nivel);
      let pool = datos.banco.filter((x) => normal(x.es) !== normal(p.es) && x.zh !== p.zh);
      if (cfg.similar) {
        pool = pool
          .map((x) => ({ x, d: parecido(x.es, p.es) }))
          .sort((a, b) => a.d - b.d)
          .slice(0, Math.max(cfg.n + 2, 6))
          .map((o) => o.x);
      }
      const distractores = barajar(pool).slice(0, cfg.n - 1);
      motor.ponerDianas([{ texto: p.es, correcta: true }, ...distractores.map((d) => ({ texto: d.es, correcta: false }))], cfg);
      setPregunta(p);
      if (vivo.current.vozAuto) decir(p.es);
    },
    [datos, siguientePregunta, decir],
  );

  // ---- Eventos del motor ----
  const alEvento = React.useCallback(
    (ev) => {
      const s = vivo.current;
      const j = J.current;
      const suena = s.soundEnabled !== false;
      switch (ev.tipo) {
        case "linterna":
          if (suena) tono(520 + Math.random() * 160, 0.07, "square", 0.025);
          break;
        case "sling":
          if (suena) tono(330, 0.05, "sawtooth", 0.02);
          break;
        case "flipper":
          if (suena) tono(140, 0.03, "triangle", 0.03);
          break;
        case "carril":
          if (suena) tono(880, 0.08, "sine", 0.04);
          break;
        case "lanzar":
          if (suena) tono(200 + ev.carga * 200, 0.12, "triangle", 0.05);
          break;
        case "rampa":
          if (suena) s.playSpell?.();
          mostrarBanner({ es: "¡Rampa del dragón!", zh: "龙道 +750", tipo: "oro" }, 1100);
          break;
        case "multiplicador":
          if (suena) s.playSpell?.();
          mostrarBanner({ es: `Multiplicador ×${ev.mult}`, zh: "福禄寿 · 倍数提升", tipo: "oro" });
          break;
        case "bolaExtra":
          if (suena) s.playWin?.();
          mostrarBanner({ es: "¡Bola extra!", zh: ev.motivo === "rampa" ? "三次龙道 · 加一球" : "五连击 · 加一球", tipo: "jade" }, 1700);
          celebrar("poder", "¡Bola extra! · 加球！");
          break;
        case "salvabola":
          mostrarBanner({ es: "¡Salvabola!", zh: "保球 · 再来一次", tipo: "jade" });
          break;
        case "acierto": {
          if (suena) s.playCorrect?.();
          j.aciertos++;
          const subeNivel = j.aciertos % ACIERTOS_POR_NIVEL === 0;
          if (subeNivel) {
            j.nivel++;
            setNivel(j.nivel);
          }
          mostrarBanner(
            subeNivel
              ? { es: `¡Nivel ${j.nivel}!`, zh: `第 ${j.nivel} 关 · 更难了`, tipo: "oro" }
              : { es: "¡Correcto!", zh: `答对了 · ${j.pregunta?.zh || ""}`, tipo: "jade" },
            1200,
          );
          if (ev.combo >= 3) celebrar(ev.combo >= 5 ? "trofeo" : "feliz", `¡Combo ×${ev.combo}! · ${ev.combo} 连击`);
          const t = setTimeout(() => nuevaRonda(), 650);
          j.temporizadores.push(t);
          break;
        }
        case "fallo": {
          if (suena) s.playWrong?.();
          const correcta = j.pregunta;
          mostrarBanner({ es: `¡Bola rota! Era «${correcta?.es}»`, zh: `打错了：${ev.texto} ✗ · 球碎了`, tipo: "rojo" }, 2000);
          if (correcta) setTimeout(() => decir(correcta.es), 350);
          // la palabra fallada vuelve un poco más tarde
          if (correcta) j.cola.splice(Math.min(2, j.cola.length), 0, correcta);
          const t = setTimeout(() => {
            if (motorRef.current && !motorRef.current.fin) nuevaRonda();
          }, 1300);
          j.temporizadores.push(t);
          break;
        }
        case "bolaPerdida":
          if (ev.motivo === "desague") {
            if (suena) s.playWrong?.();
            mostrarBanner({ es: "Bola perdida", zh: "失球 · 再发射一次", tipo: "rojo" });
          }
          break;
        case "fin": {
          if (suena) s.playLose?.();
          const m = motorRef.current;
          const puntos = m.puntos;
          const aciertos = m.aciertos;
          const nuevo = puntos > recordRef.current && puntos > 0;
          if (nuevo) {
            recordRef.current = puntos;
            setRecord(puntos);
            try {
              localStorage.setItem(claveRecord, String(puntos));
            } catch {}
          }
          const xp = Math.min(60, aciertos * 4 + Math.floor(puntos / 10000));
          if (xp > 0) addXp(xp);
          setTimeout(() => {
            setResultado({ puntos, aciertos, fallos: m.fallos, nivel: j.nivel, xp, nuevo });
            setFase("fin");
          }, 900);
          break;
        }
        default:
      }
    },
    [mostrarBanner, celebrar, nuevaRonda, decir, claveRecord],
  );
  const alEventoRef = React.useRef(alEvento);
  alEventoRef.current = alEvento;

  // ---- Motor: crear, redimensionar, HUD ----
  React.useEffect(() => {
    const canvas = canvasRef.current;
    try {
      window.scrollTo(0, 0); // al llegar desde el pabellón desplazado, la mesa debe verse entera
    } catch {}
    const imgs = { dragon: new Image(), nube: new Image() };
    const motor = new MotorPinball({ canvas, reducido: reducidoInicial(), alEvento: (e) => alEventoRef.current(e), imgs });
    motorRef.current = motor;
    if (import.meta.env.DEV) window.__pinball = motor; // solo para pruebas locales
    const ajustar = () => {
      const caja = mesaRef.current?.getBoundingClientRect();
      if (!caja) return;
      const marco = 20; // relleno de la cabina (10 px por lado)
      const ancho = Math.max(180, Math.min(caja.width - marco, ((caja.height - marco) * ANCHO) / ALTO));
      motor.redimensionar(Math.floor(ancho), Math.floor((ancho * ALTO) / ANCHO), Math.min(2, window.devicePixelRatio || 1));
    };
    let cargadas = 0;
    const alCargar = () => {
      cargadas++;
      ajustar();
    };
    imgs.dragon.onload = alCargar;
    imgs.nube.onload = alCargar;
    imgs.dragon.src = "./theme/dragon-enroscado.webp";
    imgs.nube.src = "./theme/nube-oro.png";
    void cargadas;
    ajustar();
    const ro = new ResizeObserver(ajustar);
    if (mesaRef.current) ro.observe(mesaRef.current);
    motor.pausado = true;
    motor.iniciar();
    const hudTimer = setInterval(() => {
      const m = motorRef.current;
      if (!m) return;
      setHud((h) => {
        const n = { puntos: m.puntos, bolas: m.bolas, mult: m.mult, combo: m.combo, rampas: m.rampas, enCarril: m.bola.enCarril && !m.lanzada };
        for (const k in n) if (n[k] !== h[k]) return n;
        return h;
      });
    }, 110);
    const oculta = () => {
      if (document.hidden && vivo.current.fase === "jugando") {
        motor.pausado = true;
        setFase("pausa");
      }
    };
    document.addEventListener("visibilitychange", oculta);
    return () => {
      motor.detener();
      ro.disconnect();
      clearInterval(hudTimer);
      document.removeEventListener("visibilitychange", oculta);
      for (const t of J.current.temporizadores) clearTimeout(t);
      if (window.__pinball === motor) delete window.__pinball;
    };
  }, []);

  const empezar = React.useCallback(() => {
    const m = motorRef.current;
    if (!m) return;
    for (const t of J.current.temporizadores) clearTimeout(t);
    J.current = { cola: [], nivel: 1, aciertos: 0, pregunta: null, temporizadores: [] };
    setNivel(1);
    setResultado(null);
    m.reiniciarPartida();
    nuevaRonda();
    m.pausado = false;
    setFase("jugando");
    playClick?.();
  }, [nuevaRonda, playClick]);

  const pausar = React.useCallback(() => {
    const m = motorRef.current;
    if (!m) return;
    if (vivo.current.fase === "jugando") {
      m.pausado = true;
      m.flipper(-1, false);
      m.flipper(1, false);
      setFase("pausa");
    } else if (vivo.current.fase === "pausa") {
      m.pausado = false;
      setFase("jugando");
    }
  }, []);

  // ---- Teclado ----
  React.useEffect(() => {
    const teclas = (e, abajo) => {
      const m = motorRef.current;
      if (!m) return;
      const k = e.key;
      if (vivo.current.fase === "inicio" && abajo && (k === "Enter" || k === " ")) {
        e.preventDefault();
        empezar();
        return;
      }
      if ((k === "p" || k === "P" || k === "Escape") && abajo) {
        if (vivo.current.fase === "jugando" || vivo.current.fase === "pausa") {
          e.preventDefault();
          pausar();
        }
        return;
      }
      if (vivo.current.fase !== "jugando") return;
      if (k === "ArrowLeft" || k === "z" || k === "Z" || k === "Shift") {
        e.preventDefault();
        m.flipper(-1, abajo);
      } else if (k === "ArrowRight" || k === "m" || k === "M" || k === "/") {
        e.preventDefault();
        m.flipper(1, abajo);
      } else if (k === " " || k === "ArrowDown" || k === "Enter") {
        e.preventDefault();
        if (e.repeat) return;
        m.cargar(abajo);
      } else if ((k === "o" || k === "O") && abajo && J.current.pregunta) {
        decir(J.current.pregunta.es);
      }
    };
    const down = (e) => teclas(e, true);
    const up = (e) => teclas(e, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [empezar, pausar, decir]);

  // ---- Táctil ----
  const pulsar = (cual, abajo) => (e) => {
    const m = motorRef.current;
    if (!m || vivo.current.fase !== "jugando") return;
    e.preventDefault();
    if (abajo) capturar(e);
    if (cual === "izq") m.flipper(-1, abajo);
    else if (cual === "der") m.flipper(1, abajo);
    else m.cargar(abajo);
    setTactil((t) => ({ ...t, [cual]: abajo }));
  };
  const tocarMesa = (abajo) => (e) => {
    const m = motorRef.current;
    if (!m || vivo.current.fase !== "jugando" || e.pointerType === "mouse") return;
    const caja = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - caja.left) / caja.width;
    if (abajo) {
      capturar(e);
      if (m.bola.enCarril && !m.lanzada && x > 0.8) {
        e.currentTarget.dataset.lado = "lanzar";
        m.cargar(true);
        return;
      }
      e.currentTarget.dataset.lado = x < 0.5 ? "izq" : "der";
      m.flipper(x < 0.5 ? -1 : 1, true);
    } else {
      const lado = e.currentTarget.dataset.lado;
      if (lado === "lanzar") m.cargar(false);
      else if (lado) m.flipper(lado === "izq" ? -1 : 1, false);
      e.currentTarget.dataset.lado = "";
    }
  };

  const etiqueta = `U${contenido.numero}${contenido.nivel ? ` · ${contenido.nivel}` : ""}`;
  const bolasVisibles = Math.max(0, hud.bolas);

  return (
    <div className={`pb-raiz gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
      <div className="pb-barra">
        <Volver />
        <span className="pb-titulo" translate="no">
          龙之弹球 <small>Pinball del dragón</small>
        </span>
        <span className="pb-unidad">{etiqueta}</span>
        <div className="pb-herramientas">
          <button type="button" className="pb-icono" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"} aria-pressed={!soundEnabled}>
            {soundEnabled ? <Volume2Icon size={18} /> : <VolumeXIcon size={18} />}
          </button>
          <button type="button" className={`pb-icono pb-icono--texto ${vozAuto ? "is-on" : ""}`} onClick={() => setVozAuto((v) => !v)} aria-pressed={vozAuto}>
            Voz auto · 自动朗读
          </button>
          {(fase === "jugando" || fase === "pausa") && (
            <button type="button" className="pb-icono" onClick={pausar} aria-label="Pausa · 暂停">
              {fase === "pausa" ? <PlayIcon size={18} /> : <PauseIcon size={18} />}
            </button>
          )}
        </div>
      </div>

      <div className="pb-juego">
        {/* Pantalla imperial */}
        <aside className="pb-pantalla" aria-live="polite">
          <div className="pb-pantalla__marco">
            <div className="pb-busca">
              <small>Busca · 找到这个词</small>
              <strong className="pb-busca__zh" lang="zh">{pregunta ? pregunta.zh : "—"}</strong>
              <button type="button" className="pb-oir" onClick={() => pregunta && decir(pregunta.es)} disabled={!pregunta} aria-label="Oír la palabra en español · 听西语发音">
                <MegaphoneIcon size={18} aria-hidden="true" />
                <span>Oír · 听</span>
              </button>
            </div>
            <div className="pb-marcador">
              <div className="pb-dato pb-dato--puntos">
                <small>Puntos · 分数</small>
                <b translate="no">{hud.puntos.toLocaleString("es-ES")}</b>
              </div>
              <div className="pb-dato">
                <small>Bolas · 球</small>
                <span className="pb-bolas" aria-label={`${bolasVisibles} bolas`}>
                  {Array.from({ length: Math.max(3, bolasVisibles) }, (_, i) => (
                    <i key={i} className={i < bolasVisibles ? "is-llena" : ""} />
                  ))}
                </span>
              </div>
              <div className="pb-dato">
                <small>Mult. · 倍数</small>
                <b translate="no">×{hud.mult}</b>
              </div>
              <div className="pb-dato">
                <small>Nivel · 关</small>
                <b translate="no">{nivel}</b>
              </div>
              <div className={`pb-dato pb-dato--combo ${hud.combo > 1 ? "is-on" : ""}`}>
                <small>Combo · 连击</small>
                <b translate="no">
                  <ZapIcon size={14} aria-hidden="true" />×{hud.combo}
                </b>
              </div>
            </div>
          </div>
          <ul className="pb-reglas">
            <li>
              <span className="pb-ico pb-ico--oro" aria-hidden="true">✓</span>
              <span>
                Dale a la placa correcta: puntos, combo y palabra nueva. <em>击中正确词牌：得分、连击。</em>
              </span>
            </li>
            <li>
              <span className="pb-ico pb-ico--rojo" aria-hidden="true">✗</span>
              <span>
                Placa equivocada: <b>la bola se rompe y pierdes una bola</b>. <em>打错词牌：球会碎，失去一颗球。</em>
              </span>
            </li>
            <li>
              <span className="pb-ico" aria-hidden="true">龙</span>
              <span>
                3 rampas del dragón o combo ×5 = bola extra; carriles 福禄寿 = multiplicador. <em>三次龙道或五连击加一球；福禄寿 = 倍数。</em>
              </span>
            </li>
            <li className="pb-teclas pb-solo-escritorio">
              <span><kbd>←</kbd>/<kbd>Z</kbd> flipper izq. · 左</span>
              <span><kbd>→</kbd>/<kbd>M</kbd> flipper der. · 右</span>
              <span><kbd>Espacio</kbd> mantén y suelta para lanzar · 发射</span>
              <span><kbd>O</kbd> oír · 听 · <kbd>P</kbd> pausa · 暂停</span>
            </li>
          </ul>
        </aside>

        {/* Mesa */}
        <div className="pb-zona">
          <div ref={mesaRef} className="pb-mesa">
            <div className="pb-cabina">
              <canvas
                ref={canvasRef}
                className="pb-canvas"
                role="img"
                aria-label="Mesa de pinball de laca roja con dragón dorado, linternas y placas con palabras · 红漆弹球台"
                onPointerDown={tocarMesa(true)}
                onPointerUp={tocarMesa(false)}
                onPointerCancel={tocarMesa(false)}
              />
              {hud.enCarril && fase === "jugando" && (
                <div className="pb-aviso-lanzar" aria-hidden="true">
                  <span className="pb-solo-escritorio">Mantén <kbd>Espacio</kbd> y suelta · 按住空格再松开</span>
                  <span className="pb-solo-movil">Mantén «Lanzar» y suelta · 按住发射</span>
                </div>
              )}
              {banner && (
                <div key={banner.id} className={`pb-banner pb-banner--${banner.tipo}`} role="status">
                  <strong>{banner.es}</strong>
                  <span>{banner.zh}</span>
                </div>
              )}
              {mono && (
                <div key={mono.id} className="pb-mono" aria-hidden="true">
                  <img src={`./mono/${mono.pose}.webp`} alt="" />
                  <span>{mono.texto}</span>
                </div>
              )}
            </div>
          </div>
          <div className="pb-tactil">
            <button
              type="button"
              className={`pb-boton-flipper ${tactil.izq ? "is-on" : ""}`}
              onPointerDown={pulsar("izq", true)}
              onPointerUp={pulsar("izq", false)}
              onPointerCancel={pulsar("izq", false)}
              onContextMenu={(e) => e.preventDefault()}
              aria-label="Flipper izquierdo · 左挡板"
            >
              <span aria-hidden="true">◀</span> 左
            </button>
            <button
              type="button"
              className={`pb-boton-lanzar ${tactil.lanzar ? "is-on" : ""}`}
              onPointerDown={pulsar("lanzar", true)}
              onPointerUp={pulsar("lanzar", false)}
              onPointerCancel={pulsar("lanzar", false)}
              onContextMenu={(e) => e.preventDefault()}
              disabled={!hud.enCarril}
            >
              Lanzar
              <br />
              发射
            </button>
            <button
              type="button"
              className={`pb-boton-flipper ${tactil.der ? "is-on" : ""}`}
              onPointerDown={pulsar("der", true)}
              onPointerUp={pulsar("der", false)}
              onPointerCancel={pulsar("der", false)}
              onContextMenu={(e) => e.preventDefault()}
              aria-label="Flipper derecho · 右挡板"
            >
              右 <span aria-hidden="true">▶</span>
            </button>
          </div>
        </div>
      </div>

      {fase === "inicio" &&
        createPortal(
          <div className="pb-modal" role="dialog" aria-modal="true" aria-labelledby="pb-inicio-titulo">
            <div className="pb-tarjeta">
              <img className="pb-tarjeta__mono" src="./mono/saluda.webp" alt="Rey Mono · 美猴王" />
              <span className="pb-sello" translate="no" aria-hidden="true">龙</span>
              <h2 id="pb-inicio-titulo">
                Pinball del dragón <span lang="zh">龙之弹球</span>
              </h2>
              <p className="pb-tarjeta__unidad">
                {etiqueta} · {contenido.titulo} <span lang="zh">{contenido.tituloChino}</span>
              </p>
              <ol className="pb-como">
                <li>
                  <b>Escucha y lee.</b> La pantalla muestra una palabra en chino y la máquina la dice en español.
                  <em>屏幕显示中文，机器读出西语。</em>
                </li>
                <li>
                  <b>Apunta con los flippers</b> y dale con la bola a la placa con esa palabra: puntos, combo y palabra nueva.
                  <em>用挡板把球打到正确的词牌上。</em>
                </li>
                <li className="pb-como--peligro">
                  <b>¡Cuidado!</b> Si golpeas una placa equivocada, la bola se rompe y pierdes una bola. Si la bola cae por abajo, también.
                  <em>打到错误的词牌，球会碎掉，失去一颗球；球掉下去也一样。</em>
                </li>
                <li>
                  <b>Cada 4 aciertos sube el nivel:</b> más placas, palabras parecidas y placas que se mueven.
                  <em>每答对4次升一关：词牌更多、更相似，还会移动。</em>
                </li>
              </ol>
              <p className="pb-tarjeta__controles">
                <span className="pb-solo-escritorio">
                  <kbd>←</kbd> <kbd>→</kbd> o <kbd>Z</kbd> <kbd>M</kbd> flippers · <kbd>Espacio</kbd> lanzar
                </span>
                <span className="pb-solo-movil">Botones grandes abajo o toca cada mitad de la mesa · 点击下方按钮或桌面左右两侧</span>
              </p>
              {record > 0 && (
                <p className="pb-tarjeta__record">
                  <TrophyIcon size={16} aria-hidden="true" /> Récord · 最高分: <b translate="no">{record.toLocaleString("es-ES")}</b>
                </p>
              )}
              <div className="pb-tarjeta__botones">
                <button type="button" className="pb-boton pb-boton--oro" onClick={empezar} autoFocus>
                  <PlayIcon size={18} aria-hidden="true" /> Jugar · 开始
                </button>
                <Link to="/juegos/pinball-dragon" className="pb-boton pb-boton--papel">
                  <LayersIcon size={18} aria-hidden="true" /> Otra unidad · 换单元
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {fase === "pausa" &&
        createPortal(
          <div className="pb-modal" role="dialog" aria-modal="true" aria-label="Pausa · 暂停">
            <div className="pb-tarjeta pb-tarjeta--corta">
              <span className="pb-sello" translate="no" aria-hidden="true">停</span>
              <h2>
                Pausa <span lang="zh">暂停</span>
              </h2>
              <div className="pb-tarjeta__botones">
                <button type="button" className="pb-boton pb-boton--oro" onClick={pausar} autoFocus>
                  <PlayIcon size={18} aria-hidden="true" /> Seguir · 继续
                </button>
                <button type="button" className="pb-boton pb-boton--papel" onClick={empezar}>
                  <RotateCcwIcon size={18} aria-hidden="true" /> Reiniciar · 重来
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {fase === "fin" &&
        resultado &&
        createPortal(
          <div className="pb-modal" role="dialog" aria-modal="true" aria-labelledby="pb-fin-titulo">
            <div className="pb-tarjeta">
              <img className="pb-tarjeta__mono" src={resultado.nuevo || resultado.aciertos >= 8 ? "./mono/trofeo.webp" : resultado.aciertos >= 3 ? "./mono/guino.webp" : "./mono/serio.webp"} alt="Rey Mono · 美猴王" />
              <span className="pb-sello" translate="no" aria-hidden="true">终</span>
              <h2 id="pb-fin-titulo">
                {resultado.nuevo ? "¡Nuevo récord!" : "Fin de la partida"} <span lang="zh">{resultado.nuevo ? "新纪录！" : "游戏结束"}</span>
              </h2>
              <div className="pb-resumen">
                <div>
                  <small>Puntos · 分数</small>
                  <b translate="no">{resultado.puntos.toLocaleString("es-ES")}</b>
                </div>
                <div>
                  <small>Aciertos · 答对</small>
                  <b translate="no">{resultado.aciertos}</b>
                </div>
                <div>
                  <small>Fallos · 答错</small>
                  <b translate="no">{resultado.fallos}</b>
                </div>
                <div>
                  <small>Nivel · 关</small>
                  <b translate="no">{resultado.nivel}</b>
                </div>
              </div>
              <p className="pb-tarjeta__record">
                <TrophyIcon size={16} aria-hidden="true" /> Récord · 最高分: <b translate="no">{record.toLocaleString("es-ES")}</b>
                {resultado.xp > 0 && <span className="pb-xp">+{resultado.xp} XP</span>}
              </p>
              <div className="pb-tarjeta__botones">
                <button type="button" className="pb-boton pb-boton--oro" onClick={empezar} autoFocus>
                  <RotateCcwIcon size={18} aria-hidden="true" /> Otra vez · 再玩
                </button>
                <Link to="/juegos/pinball-dragon" className="pb-boton pb-boton--papel">
                  <LayersIcon size={18} aria-hidden="true" /> Otra unidad · 换单元
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
