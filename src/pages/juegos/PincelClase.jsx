// Modo clase de «Pincel mágico · 神笔»: quien dibuja ve la palabra en secreto, pinta en el pergamino 60 s
// y su equipo la dice en voz alta. Un solo dispositivo (proyector o pasando el móvil), 2–4 equipos, sin servidor.
import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Undo2Icon, Trash2Icon, EraserIcon, CheckIcon, SkipForwardIcon, PlayIcon, Volume2Icon, PlusIcon, MinusIcon, TrophyIcon, RotateCcwIcon, BrushIcon, TimerIcon } from "lucide-react";
import { speak, confetti } from "../../components/lesson/fx.js";
import { useSound } from "../../lib/sound.jsx";
import { barajar, Sello, etiquetaContenido, usePrefiereMenosMovimiento } from "./jbComun.jsx";
import { Pergamino, PolvoOro, SelloCae } from "./pincelDibujo.jsx";

const SEGUNDOS = 60;
const COLORES = [
  { id: "tinta", es: "Tinta", zh: "墨", color: "#1c120c", halo: "rgba(28,18,12,.45)" },
  { id: "laca", es: "Laca", zh: "朱", color: "#c8102e", halo: "rgba(200,16,46,.4)" },
  { id: "jade", es: "Jade", zh: "翠", color: "#1d6339", halo: "rgba(29,99,57,.4)" },
  { id: "oro", es: "Oro", zh: "金", color: "#c8961e", halo: "rgba(242,193,78,.55)" },
];
/** Nombre en chino: el de siempre o, si la clase lo cambió, el nombre nuevo */
const zhDe = (e) => (EQUIPOS_BASE.some((b) => b.nombre === e.nombre) ? e.zh : e.nombre);
const EQUIPOS_BASE = [
  { nombre: "Dragón", zh: "龙队", sello: "龙" },
  { nombre: "Tigre", zh: "虎队", sello: "虎" },
  { nombre: "Grulla", zh: "鹤队", sello: "鹤" },
  { nombre: "Fénix", zh: "凤队", sello: "凤" },
];

let papelImg = null;
function cargarPapel() {
  if (papelImg) return papelImg;
  papelImg = new Image();
  papelImg.src = "./theme/papel.jpg";
  return papelImg;
}

// ---------- Lienzo de tinta ----------
const Lienzo = React.forwardRef(function Lienzo({ color, goma, activo }, ref) {
  const canvasRef = React.useRef(null);
  const trazos = React.useRef([]); // { color, halo, goma, pts: [{x,y,w}] } en coordenadas 0–1 (w relativo al ancho)
  const actual = React.useRef(null);
  const ultimo = React.useRef(null);
  const [, refrescar] = React.useState(0);

  const ctxDe = () => canvasRef.current?.getContext("2d");
  const tam = () => {
    const c = canvasRef.current;
    return { w: c.clientWidth, h: c.clientHeight };
  };

  const pintarSegmento = (ctx, t, a, b, W, H) => {
    ctx.save();
    ctx.globalCompositeOperation = t.goma ? "destination-out" : "source-over";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = t.goma ? "#000" : t.color;
    const ancho = ((a.w + b.w) / 2) * W;
    ctx.lineWidth = t.goma ? ancho * 3.2 : ancho;
    if (!t.goma) {
      ctx.shadowColor = t.halo;
      ctx.shadowBlur = Math.max(2, ancho * 0.7);
    }
    ctx.beginPath();
    ctx.moveTo(a.x * W, a.y * H);
    ctx.lineTo(b.x * W, b.y * H);
    ctx.stroke();
    if (!t.goma && ancho > 5) {
      // Vetas del pincel seco: hebras claras dentro del trazo, siempre en la misma posición relativa
      const dx = (b.x - a.x) * W;
      const dy = (b.y - a.y) * H;
      const l = Math.hypot(dx, dy) || 1;
      const nx = -dy / l;
      const ny = dx / l;
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = "#fff4dc";
      ctx.lineWidth = Math.max(0.6, ancho * 0.07);
      for (const k of [-0.3, 0.12, 0.34]) {
        ctx.beginPath();
        ctx.moveTo(a.x * W + nx * ancho * k, a.y * H + ny * ancho * k);
        ctx.lineTo(b.x * W + nx * ancho * k, b.y * H + ny * ancho * k);
        ctx.stroke();
      }
    }
    ctx.restore();
  };
  const pintarGota = (ctx, t, p, W, H) => {
    if (t.goma) return;
    ctx.save();
    ctx.fillStyle = t.color;
    ctx.shadowColor = t.halo;
    ctx.shadowBlur = p.w * W;
    ctx.beginPath();
    ctx.arc(p.x * W, p.y * H, (p.w * W) / 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const redibujar = React.useCallback(() => {
    const c = canvasRef.current;
    const ctx = ctxDe();
    if (!c || !ctx) return;
    const { w, h } = tam();
    ctx.clearRect(0, 0, w, h);
    for (const t of trazos.current) {
      if (t.pts.length) pintarGota(ctx, t, t.pts[0], w, h);
      for (let i = 1; i < t.pts.length; i++) pintarSegmento(ctx, t, t.pts[i - 1], t.pts[i], w, h);
    }
  }, []);

  // Tamaño con devicePixelRatio
  React.useLayoutEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const medir = () => {
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
      ctxDe().setTransform(dpr, 0, 0, dpr, 0, 0);
      redibujar();
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(c);
    return () => ro.disconnect();
  }, [redibujar]);

  const punto = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, t: e.timeStamp, p: e.pressure, tipo: e.pointerType, W: r.width };
  };

  const abajo = (e) => {
    if (!activo) return;
    e.preventDefault();
    canvasRef.current.setPointerCapture?.(e.pointerId);
    const q = punto(e);
    const c = COLORES.find((x) => x.id === color) || COLORES[0];
    const base = 0.0135 * Math.max(1, 560 / q.W);
    const w0 = q.tipo === "pen" && q.p > 0 ? base * (0.5 + q.p * 1.3) : base * 1.25; // al apoyar, el pincel carga tinta
    const t = { color: c.color, halo: c.halo, goma, pts: [{ x: q.x, y: q.y, w: w0 }] };
    trazos.current.push(t);
    actual.current = t;
    ultimo.current = q;
    const { w, h } = tam();
    pintarGota(ctxDe(), t, t.pts[0], w, h);
  };
  const mover = (e) => {
    const t = actual.current;
    if (!t) return;
    e.preventDefault();
    const eventos = e.nativeEvent.getCoalescedEvents?.() || [e.nativeEvent];
    const { w, h } = tam();
    const ctx = ctxDe();
    for (const ev of eventos.length ? eventos : [e.nativeEvent]) {
      const q = punto(ev);
      const prev = ultimo.current;
      const dist = Math.hypot((q.x - prev.x) * q.W, (q.y - prev.y) * q.W);
      if (dist < 0.8) continue;
      const dt = Math.max(1, q.t - prev.t);
      const v = dist / dt; // px por ms
      const base = 0.0135 * Math.max(1, 560 / q.W);
      // Presión del lápiz si la hay; si no, la velocidad: rápido = trazo fino, lento = trazo grueso
      const objetivo = q.tipo === "pen" && q.p > 0 ? base * (0.35 + q.p * 1.45) : base * Math.max(0.42, Math.min(1.45, 1.5 - v * 0.55));
      const anterior = t.pts[t.pts.length - 1];
      const wN = anterior.w * 0.72 + objetivo * 0.28;
      const nuevo = { x: q.x, y: q.y, w: wN };
      t.pts.push(nuevo);
      pintarSegmento(ctx, t, anterior, nuevo, w, h);
      ultimo.current = q;
    }
  };
  const arriba = () => {
    const t = actual.current;
    if (t && t.pts.length > 2) {
      // Remate: el pincel se levanta afinando el trazo
      const n = t.pts.length;
      const a = t.pts[n - 2];
      const b = t.pts[n - 1];
      const fin = { x: b.x + (b.x - a.x) * 0.8, y: b.y + (b.y - a.y) * 0.8, w: b.w * 0.35 };
      t.pts.push(fin);
      const { w, h } = tam();
      pintarSegmento(ctxDe(), t, b, fin, w, h);
    }
    actual.current = null;
    refrescar((x) => x + 1);
  };

  React.useImperativeHandle(ref, () => ({
    deshacer() {
      trazos.current.pop();
      redibujar();
      refrescar((x) => x + 1);
    },
    borrar() {
      trazos.current = [];
      redibujar();
      refrescar((x) => x + 1);
    },
    vacio: () => trazos.current.length === 0,
    exportar() {
      const c = canvasRef.current;
      if (!c) return null;
      const W = 560;
      const H = Math.round((W * c.clientHeight) / c.clientWidth);
      const o = document.createElement("canvas");
      o.width = W;
      o.height = H;
      const ctx = o.getContext("2d");
      const img = cargarPapel();
      try {
        if (img.complete && img.naturalWidth) ctx.drawImage(img, 0, 0, W, H);
        else {
          ctx.fillStyle = "#f3e4c2";
          ctx.fillRect(0, 0, W, H);
        }
        ctx.fillStyle = "rgba(255,248,230,.35)";
        ctx.fillRect(0, 0, W, H);
        ctx.drawImage(c, 0, 0, W, H);
        return o.toDataURL("image/jpeg", 0.82);
      } catch {
        return null;
      }
    },
  }));

  React.useEffect(() => {
    cargarPapel();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pm-lienzo ${goma ? "is-goma" : ""} ${activo ? "" : "is-inactivo"}`}
      onPointerDown={abajo}
      onPointerMove={mover}
      onPointerUp={arriba}
      onPointerCancel={arriba}
      onPointerLeave={(e) => actual.current && e.buttons === 0 && arriba()}
      aria-label="Pergamino para dibujar · 画纸"
      role="img"
    />
  );
});

// ---------- Modo clase ----------
export function ModoClase({ unidad, reparto, onSalir, avisoRelleno }) {
  const reducido = usePrefiereMenosMovimiento();
  const { soundEnabled, playCorrect, playWrong, playWin, playClick } = useSound();
  const [fase, setFase] = React.useState("equipos"); // equipos | turno | dibuja | resultado | final
  const [equipos, setEquipos] = React.useState(() => EQUIPOS_BASE.slice(0, 2).map((e) => ({ ...e, puntos: 0 })));
  const [rondas, setRondas] = React.useState(3);
  const [cola, setCola] = React.useState([]);
  const [turno, setTurno] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [color, setColor] = React.useState("tinta");
  const [goma, setGoma] = React.useState(false);
  const [fin, setFin] = React.useState(0);
  const [ahora, setAhora] = React.useState(0);
  const [resultado, setResultado] = React.useState(null); // { ok }
  const [galeria, setGaleria] = React.useState([]);
  const lienzo = React.useRef(null);
  const tickRef = React.useRef(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [fase]);

  const totalTurnos = equipos.length * rondas;
  const equipoActual = equipos[turno % equipos.length];
  const palabra = cola[turno];

  const empezarPartida = () => {
    playClick?.();
    const lista = [...barajar(reparto.propias), ...barajar(reparto.nivel), ...barajar(reparto.extra)];
    setCola(lista.slice(0, equipos.length * rondas));
    setEquipos((es) => es.map((e) => ({ ...e, puntos: 0 })));
    setGaleria([]);
    setTurno(0);
    setVisible(false);
    setFase("turno");
  };

  const aDibujar = () => {
    playClick?.();
    setVisible(false);
    setColor("tinta");
    setGoma(false);
    const t = Date.now() + SEGUNDOS * 1000;
    setFin(t);
    setAhora(Date.now());
    setFase("dibuja");
  };

  const cerrarTurno = React.useCallback(
    (ok) => {
      const dibujo = lienzo.current?.exportar?.() || null;
      setGaleria((g) => [...g, { palabra, ok, equipo: equipoActual.nombre, equipoZh: zhDe(equipoActual) === equipoActual.nombre ? "" : equipoActual.zh, sello: equipoActual.sello, dibujo }]);
      if (ok) setEquipos((es) => es.map((e, i) => (i === turno % es.length ? { ...e, puntos: e.puntos + 1 } : e)));
      setResultado({ ok, segundos: Math.max(0, Math.ceil((fin - Date.now()) / 1000)) });
      setFase("resultado");
      if (soundEnabled) {
        ok ? playCorrect?.() : playWrong?.();
        window.setTimeout(() => speak(palabra.es, 0.9), 450);
      }
    },
    [palabra, equipoActual, turno, fin, soundEnabled, playCorrect, playWrong],
  );

  // Reloj de 60 s
  React.useEffect(() => {
    if (fase !== "dibuja") return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setAhora(t);
      const quedan = Math.ceil((fin - t) / 1000);
      if (quedan <= 10 && quedan > 0 && quedan !== tickRef.current) {
        tickRef.current = quedan;
        soundEnabled && playClick?.();
      }
      if (t >= fin) cerrarTurno(false);
    }, 200);
    return () => window.clearInterval(id);
  }, [fase, fin, cerrarTurno, soundEnabled, playClick]);

  const siguienteTurno = () => {
    playClick?.();
    if (turno + 1 >= totalTurnos || turno + 1 >= cola.length) {
      setFase("final");
      soundEnabled && playWin?.();
      if (!reducido) confetti({ count: 140 });
      return;
    }
    setTurno((t) => t + 1);
    setVisible(false);
    setResultado(null);
    setFase("turno");
  };

  const quedan = Math.max(0, Math.ceil((fin - ahora) / 1000));
  const fraccion = Math.max(0, Math.min(1, (fin - ahora) / (SEGUNDOS * 1000)));

  const Barra = ({ titulo = "Dibuja para la clase", zh = "你画我猜" }) => (
    <div className="pm-barra">
      <button type="button" className="pm-volver" onClick={onSalir}>
        <ArrowLeftIcon size={18} aria-hidden="true" /> <span>Salir · 退出</span>
      </button>
      <span className="pm-barra__titulo">
        <Sello className="pm-barra__sello">画</Sello>
        <span>
          {titulo} <small translate="no">神笔 · {zh}</small>
        </span>
      </span>
      <span className="pm-unidad">{etiquetaContenido(unidad)}</span>
    </div>
  );

  const Marcador = ({ compacto = false }) => (
    <div className={`pm-marcador ${compacto ? "is-compacto" : ""}`} role="group" aria-label="Marcador · 比分">
      {equipos.map((e, i) => (
        <span key={i} className={`pm-equipo is-${i} ${fase !== "final" && i === turno % equipos.length ? "is-turno" : ""}`}>
          <i className="pm-equipo__sello" translate="no">
            {e.sello}
          </i>
          <span className="pm-equipo__nombre">{e.nombre}</span>
          <b key={e.puntos}>{e.puntos}</b>
        </span>
      ))}
    </div>
  );

  // ---------- Preparar equipos ----------
  if (fase === "equipos")
    return (
      <div className="pm-clase">
        <Barra />
        <section className="pm-prepara">
          <PolvoOro n={12} />
          <h2 className="pm-h2">
            Equipos <span translate="no">分队</span>
          </h2>
          <p className="pm-sub">
            En cada turno, un alumno del equipo mira la palabra en secreto y la dibuja. Su equipo tiene 60 segundos para decirla en voz alta en español.
            <span translate="no">每轮由一名队员偷偷看词并画出来，队友要在60秒内用西班牙语大声说出这个词。</span>
          </p>
          <ul className="pm-lista-equipos">
            {equipos.map((e, i) => (
              <li key={i} className={`pm-equipo-edit is-${i}`}>
                <i className="pm-equipo__sello" translate="no">
                  {e.sello}
                </i>
                <label>
                  <span className="pm-sr">Nombre del equipo {i + 1} · 队名</span>
                  <input value={e.nombre} maxLength={18} onChange={(ev) => setEquipos((es) => es.map((x, k) => (k === i ? { ...x, nombre: ev.target.value } : x)))} />
                </label>
                <small translate="no">{zhDe(e) === e.nombre ? "\u00a0" : e.zh}</small>
              </li>
            ))}
          </ul>
          <div className="pm-ajustes">
            <div className="pm-ajuste">
              <span>Número de equipos · 队数</span>
              <div className="pm-contador">
                <button type="button" className="pm-icono" onClick={() => setEquipos((es) => es.slice(0, Math.max(2, es.length - 1)))} disabled={equipos.length <= 2} aria-label="Menos equipos · 减少">
                  <MinusIcon size={18} aria-hidden="true" />
                </button>
                <b>{equipos.length}</b>
                <button type="button" className="pm-icono" onClick={() => setEquipos((es) => (es.length >= 4 ? es : [...es, { ...EQUIPOS_BASE[es.length], puntos: 0 }]))} disabled={equipos.length >= 4} aria-label="Más equipos · 增加">
                  <PlusIcon size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="pm-ajuste">
              <span>Turnos por equipo · 每队轮数</span>
              <div className="pm-contador">
                <button type="button" className="pm-icono" onClick={() => setRondas((r) => Math.max(1, r - 1))} disabled={rondas <= 1} aria-label="Menos turnos · 减少">
                  <MinusIcon size={18} aria-hidden="true" />
                </button>
                <b>{rondas}</b>
                <button type="button" className="pm-icono" onClick={() => setRondas((r) => Math.min(6, r + 1))} disabled={rondas >= 6} aria-label="Más turnos · 增加">
                  <PlusIcon size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="pm-ajuste">
              <span>Tiempo por dibujo · 每幅时间</span>
              <div className="pm-contador">
                <TimerIcon size={18} aria-hidden="true" />
                <b>{SEGUNDOS} s</b>
              </div>
            </div>
          </div>
          {avisoRelleno && (
            <p className="pm-aviso">
              {avisoRelleno.es} <span translate="no">{avisoRelleno.zh}</span>
            </p>
          )}
          <button type="button" className="pm-boton-oro pm-boton-oro--grande" onClick={empezarPartida}>
            <PlayIcon size={22} aria-hidden="true" /> Empezar · 开始
          </button>
        </section>
      </div>
    );

  // ---------- Turno: la palabra secreta ----------
  if (fase === "turno")
    return (
      <div className="pm-clase">
        <Barra />
        <Marcador />
        <section className="pm-turno">
          <PolvoOro n={10} />
          <p className="pm-turno__quien">
            Turno {turno + 1} de {Math.min(totalTurnos, cola.length)} · 第{turno + 1}轮
          </p>
          <h2 className={`pm-turno__equipo is-${turno % equipos.length}`}>
            <i translate="no">{equipoActual.sello}</i> {equipoActual.nombre} {zhDe(equipoActual) !== equipoActual.nombre && <span translate="no">{equipoActual.zh}</span>}
          </h2>
          <p className="pm-sub">
            Pasa el dispositivo a quien va a dibujar. ¡Que nadie más mire la pantalla!
            <span translate="no">把设备交给画画的同学。其他人不要看屏幕！</span>
          </p>
          <div className={`pm-secreto ${visible ? "is-visible" : ""}`}>
            <div className="pm-secreto__carta" aria-live="polite">
              {visible ? (
                <>
                  <b lang="es">{palabra.es}</b>
                  <span translate="no">{palabra.zh}</span>
                </>
              ) : (
                <span className="pm-secreto__tapa" translate="no">
                  秘
                </span>
              )}
            </div>
            <button type="button" className="pm-boton-claro" onClick={() => setVisible((v) => !v)}>
              {visible ? <EyeOffIcon size={19} aria-hidden="true" /> : <EyeIcon size={19} aria-hidden="true" />} {visible ? "Tapar · 遮住" : "Ver la palabra (solo quien dibuja) · 看词（只给画画的人）"}
            </button>
          </div>
          <button type="button" className="pm-boton-oro pm-boton-oro--grande" onClick={aDibujar}>
            <BrushIcon size={22} aria-hidden="true" /> ¡A dibujar! {SEGUNDOS} s · 开始画
          </button>
        </section>
      </div>
    );

  // ---------- Final ----------
  if (fase === "final") {
    const orden = [...equipos].map((e, i) => ({ ...e, i })).sort((a, b) => b.puntos - a.puntos);
    const empate = orden.length > 1 && orden[0].puntos === orden[1].puntos;
    return (
      <div className="pm-clase">
        <Barra />
        <section className="pm-final__tarjeta pm-podio-sec">
          <PolvoOro n={16} />
          <span className="pm-final__rayos" aria-hidden="true" />
          <img className="pm-final__mono" src="./mono/trofeo.webp" alt="" aria-hidden="true" />
          <h2 className="pm-final__titulo">
            {empate ? "¡Empate de maestros!" : `¡Gana ${orden[0].nombre}!`}
            <span translate="no">{empate ? "平局！" : `${zhDe(orden[0])}获胜！`}</span>
          </h2>
          <ol className="pm-podio">
            {orden.map((e, k) => (
              <li key={e.i} className={`pm-podio__paso is-${e.i} ${e.puntos === orden[0].puntos ? "is-primero" : ""}`} style={{ "--k": k }}>
                <i className="pm-equipo__sello" translate="no">
                  {e.sello}
                </i>
                <span>{e.nombre}</span>
                <b>{e.puntos}</b>
                <small>aciertos · 猜对</small>
              </li>
            ))}
          </ol>
          <div className="pm-final__botones">
            <button type="button" className="pm-boton-oro" onClick={empezarPartida}>
              <RotateCcwIcon size={20} aria-hidden="true" /> Otra partida · 再来一局
            </button>
            <button type="button" className="pm-boton-claro" onClick={() => setFase("equipos")}>
              <TrophyIcon size={18} aria-hidden="true" /> Cambiar equipos · 改队伍
            </button>
            <button type="button" className="pm-boton-claro" onClick={onSalir}>
              <ArrowLeftIcon size={18} aria-hidden="true" /> Modos de juego · 游戏模式
            </button>
          </div>
        </section>
        <section className="pm-galeria-sec">
          <h3 className="pm-galeria__titulo">
            <BrushIcon size={20} aria-hidden="true" /> Galería de la clase <span translate="no">全班画廊</span>
          </h3>
          <ul className="pm-galeria">
            {galeria.map((g, i) => (
              <li key={i} className={`pm-cuadro ${g.ok ? "is-ok" : "is-no"}`} style={{ "--i": i }}>
                <div className="pm-cuadro__papel pm-cuadro__papel--foto">
                  {g.dibujo ? <img src={g.dibujo} alt={`Dibujo de ${g.palabra.es} · ${g.palabra.zh}`} /> : <span className="pm-cuadro__vacio">—</span>}
                  <span className="pm-cuadro__sello" translate="no">
                    {g.ok ? "印" : "过"}
                  </span>
                </div>
                <div className="pm-cuadro__pie">
                  <b lang="es">{g.palabra.es}</b>
                  <span translate="no">{g.palabra.zh}</span>
                  <small>
                    {g.equipo} <span translate="no">{g.equipoZh}</span>
                  </small>
                </div>
                <button type="button" className="pm-oir pm-oir--mini" onClick={() => speak(g.palabra.es, 0.9)} aria-label={`Escuchar ${g.palabra.es} · 听`}>
                  <Volume2Icon size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  // ---------- Dibujar (y resultado encima) ----------
  return (
    <div className="pm-clase pm-clase--dibuja">
      <div className="pm-dibuja-cab">
        <Marcador compacto />
        <div className={`pm-reloj ${quedan <= 10 && fase === "dibuja" ? "is-prisa" : ""}`} role="timer" aria-label={`${quedan} segundos · 秒`}>
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="19" className="pm-reloj__fondo" />
            <circle cx="22" cy="22" r="19" className="pm-reloj__tinta" style={{ strokeDasharray: `${119.4 * fraccion} 119.4` }} />
          </svg>
          <b>{fase === "dibuja" ? quedan : resultado?.segundos ?? 0}</b>
        </div>
        <button type="button" className={`pm-chivato ${visible ? "is-visible" : ""}`} onClick={() => setVisible((v) => !v)} aria-label={visible ? "Tapar la palabra · 遮住" : "Ver la palabra · 看词"}>
          {visible ? <EyeOffIcon size={18} aria-hidden="true" /> : <EyeIcon size={18} aria-hidden="true" />}
          <span>{visible ? `${palabra.es} · ${palabra.zh}` : "Palabra · 词"}</span>
        </button>
      </div>

      <div className="pm-mesa pm-mesa--lienzo">
        <span className="pm-mesa__luz" aria-hidden="true" />
        <Pergamino className="pm-pergamino--lienzo">
          <Lienzo ref={lienzo} color={color} goma={goma} activo={fase === "dibuja"} />
        </Pergamino>
      </div>

      <div className="pm-herramientas" role="toolbar" aria-label="Pincel · 画笔">
        <div className="pm-tinteros">
          {COLORES.map((c) => (
            <button key={c.id} type="button" className={`pm-tintero is-${c.id} ${!goma && color === c.id ? "is-on" : ""}`} onClick={() => (setColor(c.id), setGoma(false))} aria-pressed={!goma && color === c.id} aria-label={`${c.es} · ${c.zh}`}>
              <i aria-hidden="true" />
              <span translate="no">{c.zh}</span>
            </button>
          ))}
          <button type="button" className={`pm-herr ${goma ? "is-on" : ""}`} onClick={() => setGoma((g) => !g)} aria-pressed={goma} aria-label="Goma · 橡皮">
            <EraserIcon size={20} aria-hidden="true" />
            <span>Goma · 橡皮</span>
          </button>
          <button type="button" className="pm-herr" onClick={() => lienzo.current?.deshacer()} aria-label="Deshacer · 撤销">
            <Undo2Icon size={20} aria-hidden="true" />
            <span>Deshacer · 撤销</span>
          </button>
          <button type="button" className="pm-herr" onClick={() => lienzo.current?.borrar()} aria-label="Borrar todo · 清空">
            <Trash2Icon size={20} aria-hidden="true" />
            <span>Borrar · 清空</span>
          </button>
        </div>
        <div className="pm-veredicto">
          <button type="button" className="pm-gran pm-gran--si" onClick={() => cerrarTurno(true)} disabled={fase !== "dibuja"}>
            <CheckIcon size={26} aria-hidden="true" /> Acertado <span translate="no">猜对了</span>
          </button>
          <button type="button" className="pm-gran pm-gran--no" onClick={() => cerrarTurno(false)} disabled={fase !== "dibuja"}>
            <SkipForwardIcon size={24} aria-hidden="true" /> Pasar <span translate="no">跳过</span>
          </button>
        </div>
      </div>

      {fase === "resultado" &&
        createPortal(
          <div className={`pm-modal ${reducido ? "is-reducido" : ""}`} role="dialog" aria-modal="true" aria-labelledby="pm-res-titulo">
            <div className={`pm-modal__tarjeta ${resultado?.ok ? "is-ok" : "is-no"}`}>
              <div className="pm-modal__sello">
                <SelloCae texto={resultado?.ok ? "印" : "过"} fallo={!resultado?.ok} />
              </div>
              <img className="pm-modal__mono" src={`./mono/${resultado?.ok ? "feliz" : "guino"}.webp`} alt="" aria-hidden="true" />
              <h2 id="pm-res-titulo" className="pm-modal__titulo">
                {resultado?.ok ? `¡Punto para ${equipoActual.nombre}!` : "¡Se acabó el turno!"}
                <span translate="no">{resultado?.ok ? `${zhDe(equipoActual)}得一分！` : "本轮结束！"}</span>
              </h2>
              <p className="pm-modal__palabra">
                <b lang="es">{palabra.es}</b>
                <span translate="no">{palabra.zh}</span>
                <button type="button" className="pm-oir" onClick={() => speak(palabra.es, 0.9)} aria-label={`Escuchar ${palabra.es} · 听`}>
                  <Volume2Icon size={18} aria-hidden="true" />
                </button>
              </p>
              <Marcador />
              <button type="button" className="pm-boton-oro" onClick={siguienteTurno} autoFocus>
                {turno + 1 >= Math.min(totalTurnos, cola.length) ? (
                  <>
                    <TrophyIcon size={20} aria-hidden="true" /> Ver resultados · 看结果
                  </>
                ) : (
                  <>
                    <SkipForwardIcon size={20} aria-hidden="true" /> Siguiente equipo · 下一队
                  </>
                )}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
