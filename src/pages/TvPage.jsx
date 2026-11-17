import * as React from "react";
import { PlayIcon, CheckIcon, Volume2Icon, RotateCcwIcon, XIcon, ClapperboardIcon, SparklesIcon, LockIcon, TvIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { SERIES } from "../data/tv.js";
import { speak } from "../components/lesson/fx.js";
import "../styles/tv.css";
import "../styles/movil-recursos.css";

// TV · 电视 v3: escenario imperial en 3D. El televisor (con grosor real, faroles y columnas en primer plano) flota sobre un suelo
// en perspectiva y se inclina siguiendo al ratón; los episodios van en un carrusel 3D («coverflow») bajo la pantalla.
// Vistos en dele_tv_vistos (["rey-mono-1", …]); punto donde se quedó cada episodio en dele_tv_progreso ({clave: segundos}).
// Un episodio con `estreno` futuro (AAAA-MM-DD) sale bloqueado con cuenta atrás y se abre solo ese día.
const CLAVE_VISTOS = "dele_tv_vistos";
const CLAVE_PROGRESO = "dele_tv_progreso";
const SEGUNDOS_AUTOPLAY = 8;
const DIAS_NUEVO = 7;
const CAPAS_GROSOR = 7;

function leerJson(clave, porDefecto) {
  try {
    return JSON.parse(localStorage.getItem(clave) || "null") ?? porDefecto;
  } catch {
    return porDefecto;
  }
}
function guardarJson(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {}
}
const fechaEstreno = (episodio) => (episodio.estreno ? new Date(`${episodio.estreno}T00:00:00`) : null);
const estaEstrenado = (episodio, ahora = Date.now()) => !episodio.estreno || fechaEstreno(episodio).getTime() <= ahora;
const esNuevo = (episodio, ahora = Date.now()) => {
  const fecha = fechaEstreno(episodio);
  return !!fecha && fecha.getTime() <= ahora && ahora - fecha.getTime() < DIAS_NUEVO * 864e5;
};
function cuentaAtras(fecha, ahora) {
  const restante = Math.max(0, fecha.getTime() - ahora);
  const dias = Math.floor(restante / 864e5);
  const horas = Math.floor((restante % 864e5) / 36e5);
  const minutos = Math.floor((restante % 36e5) / 6e4);
  return dias > 0 ? `${dias} d ${horas} h` : `${horas} h ${String(minutos).padStart(2, "0")} min`;
}
const FECHA_CORTA = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" });
const aSegundos = (texto) => texto.split(":").reduce((total, parte) => total * 60 + Number(parte), 0);

// Chispas doradas con posiciones fijas (deterministas) para que no cambien en cada render.
const CHISPAS = Array.from({ length: 26 }, (_, indice) => ({
  izquierda: (indice * 37) % 100,
  retraso: -((indice * 1.7) % 9),
  duracion: 7 + ((indice * 13) % 7),
  tamano: 2 + ((indice * 7) % 4),
}));

export default function TvPage() {
  const serie = SERIES[0];
  const [ahora, setAhora] = React.useState(() => Date.now());
  const emitidos = serie.episodios.filter((episodio) => estaEstrenado(episodio, ahora));
  const pendientes = serie.episodios.filter((episodio) => !estaEstrenado(episodio, ahora));
  const [vistos, setVistos] = React.useState(() => new Set(leerJson(CLAVE_VISTOS, [])));
  const [progreso, setProgreso] = React.useState(() => leerJson(CLAVE_PROGRESO, {}));
  const claveDe = (episodio) => `${serie.id}-${episodio.n}`;
  const [actual, setActual] = React.useState(() => emitidos.find((episodio) => !vistos.has(claveDe(episodio))) || emitidos[0]);
  // fase: "cartel" (telón cerrado con la tarjeta de título) · "emision" (telón abierto) · "fin" (cuenta atrás al siguiente)
  const [fase, setFase] = React.useState("cartel");
  const [cuenta, setCuenta] = React.useState(SEGUNDOS_AUTOPLAY);
  const refVideo = React.useRef(null);
  const refTele = React.useRef(null);
  const refEscena = React.useRef(null);
  const ultimoGuardado = React.useRef(0);
  const inicioDeslizar = React.useRef(null);
  const siguiente = emitidos.find((episodio) => episodio.n === actual.n + 1);
  const ultimo = emitidos[emitidos.length - 1];
  const numVistos = emitidos.filter((episodio) => vistos.has(claveDe(episodio))).length;

  // Carrusel: emitidos, después los que tienen estreno futuro y, si no hay ninguno, la tarjeta «Próximamente».
  const tarjetas = [
    ...emitidos.map((episodio) => ({ tipo: "emitido", episodio })),
    ...pendientes.map((episodio) => ({ tipo: "pendiente", episodio })),
    ...(serie.proximamente && !pendientes.length ? [{ tipo: "pronto" }] : []),
  ];
  const indiceActual = Math.max(0, tarjetas.findIndex((tarjeta) => tarjeta.episodio?.n === actual.n));
  const [foco, setFoco] = React.useState(indiceActual);
  React.useEffect(() => setFoco(indiceActual), [indiceActual]);
  const mover = (paso) => setFoco((valor) => Math.min(tarjetas.length - 1, Math.max(0, valor + paso)));

  // El reloj solo hace falta para la cuenta atrás de los estrenos
  React.useEffect(() => {
    if (!pendientes.length) return undefined;
    const reloj = setInterval(() => setAhora(Date.now()), 30000);
    return () => clearInterval(reloj);
  }, [pendientes.length]);

  // Cuenta atrás de «siguiente episodio»
  React.useEffect(() => {
    if (fase !== "fin" || !siguiente) return undefined;
    if (cuenta <= 0) {
      elegir(siguiente, true);
      return undefined;
    }
    const temporizador = setTimeout(() => setCuenta((valor) => valor - 1), 1000);
    return () => clearTimeout(temporizador);
  }, [fase, cuenta, siguiente]); // eslint-disable-line react-hooks/exhaustive-deps

  // Inclinación 3D del escenario siguiendo al ratón (variables CSS, sin re-render)
  const alMoverPuntero = (evento) => {
    const escena = refEscena.current;
    if (!escena || evento.pointerType !== "mouse") return;
    const caja = escena.getBoundingClientRect();
    escena.style.setProperty("--mx", (((evento.clientX - caja.left) / caja.width) * 2 - 1).toFixed(3));
    escena.style.setProperty("--my", (((evento.clientY - caja.top) / caja.height) * 2 - 1).toFixed(3));
  };
  const alSalirPuntero = () => {
    refEscena.current?.style.setProperty("--mx", "0");
    refEscena.current?.style.setProperty("--my", "0");
  };

  const reproducir = () => {
    setFase("emision");
    const video = refVideo.current;
    if (!video) return;
    const guardado = progreso[claveDe(actual)];
    if (guardado && video.duration && guardado < video.duration - 2 && video.currentTime < 1) video.currentTime = guardado;
    video.play?.().catch(() => {});
  };
  function elegir(episodio, empezar = false) {
    setActual(episodio);
    setCuenta(SEGUNDOS_AUTOPLAY);
    setFase(empezar ? "emision" : "cartel");
    refTele.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (empezar) requestAnimationFrame(() => refVideo.current?.play?.().catch(() => {}));
  }
  const alAvanzar = (evento) => {
    const segundos = evento.currentTarget.currentTime;
    if (Math.abs(segundos - ultimoGuardado.current) < 2) return;
    ultimoGuardado.current = segundos;
    const nuevo = { ...progreso, [claveDe(actual)]: Math.round(segundos) };
    setProgreso(nuevo);
    guardarJson(CLAVE_PROGRESO, nuevo);
  };
  const alTerminar = () => {
    const nuevos = new Set(vistos);
    nuevos.add(claveDe(actual));
    setVistos(nuevos);
    guardarJson(CLAVE_VISTOS, [...nuevos]);
    const sinPunto = { ...progreso };
    delete sinPunto[claveDe(actual)];
    setProgreso(sinPunto);
    guardarJson(CLAVE_PROGRESO, sinPunto);
    setCuenta(SEGUNDOS_AUTOPLAY);
    setFase("fin");
  };
  const fraccionVista = (episodio) => {
    if (vistos.has(claveDe(episodio))) return 1;
    const segundos = progreso[claveDe(episodio)];
    const duracion = aSegundos(episodio.duracion);
    return segundos && duracion ? Math.min(1, segundos / duracion) : 0;
  };
  const alPulsarTarjeta = (indice, tarjeta) => {
    if (indice !== foco) return setFoco(indice);
    if (tarjeta.tipo === "emitido") elegir(tarjeta.episodio, true);
  };
  const alTeclaCarrusel = (evento) => {
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      mover(-1);
    } else if (evento.key === "ArrowRight") {
      evento.preventDefault();
      mover(1);
    }
  };

  return (
    <div className="tv">
      {/* ===== Escenario 3D: marquesina, televisor y suelo ===== */}
      <section ref={refEscena} className={`tv-escena fase-${fase}`} onPointerMove={alMoverPuntero} onPointerLeave={alSalirPuntero} aria-label={`AI Español TV · ${serie.titulo}`}>
        <div className="tv-escena-fondo" style={{ backgroundImage: `url(${actual.poster})` }} aria-hidden="true" />
        <div className="tv-haces" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="tv-chispas" aria-hidden="true">
          {CHISPAS.map((chispa, indice) => (
            <i
              key={indice}
              style={{ left: `${chispa.izquierda}%`, animationDelay: `${chispa.retraso}s`, animationDuration: `${chispa.duracion}s`, width: chispa.tamano, height: chispa.tamano }}
            />
          ))}
        </div>
        <div className="tv-suelo" aria-hidden="true">
          <span className="tv-suelo-plano" />
        </div>

        <header className="tv-marquesina">
          <p className="tv-en-emision">
            <span className="tv-punto" aria-hidden="true" /> En emisión · <span lang="zh-Hans">热播中</span>
          </p>
          <p className="tv-ceja">
            <TvIcon size={14} strokeWidth={2.6} aria-hidden="true" /> AI Español TV · <span lang="zh-Hans">电视</span> · Serie original · Temporada 1
          </p>
          <h1 className="tv-titulo">
            <span className="tv-titulo-es">{serie.titulo}</span>
            <span className="tv-titulo-zh" lang="zh-Hans">
              {serie.tituloZh}
            </span>
          </h1>
          <span className="tv-bombillas" aria-hidden="true" />
        </header>

        {/* Televisor: inclinación (ratón) › subida de entrada › flotación › aparato con grosor */}
        <div ref={refTele} className="tv-set">
          <span className="tv-columna izq" aria-hidden="true" />
          <span className="tv-columna der" aria-hidden="true" />
          <div className="tv-alza">
            <div className="tv-flota">
              <div className="tv-ambiente" style={{ backgroundImage: `url(${actual.poster})` }} aria-hidden="true" />
              <div className="tv-grosor" aria-hidden="true">
                {Array.from({ length: CAPAS_GROSOR }, (_, capa) => (
                  <i key={capa} style={{ "--z": capa + 1 }} />
                ))}
              </div>
              <span className="tv-farol izq" aria-hidden="true" />
              <span className="tv-farol der" aria-hidden="true" />
              <div className="tv-marco">
                <span className="tv-esquina a" aria-hidden="true" />
                <span className="tv-esquina b" aria-hidden="true" />
                <span className="tv-esquina c" aria-hidden="true" />
                <span className="tv-esquina d" aria-hidden="true" />
                <div className="tv-pantalla">
                  <video
                    key={actual.video}
                    ref={refVideo}
                    src={actual.video}
                    poster={actual.poster}
                    controls={fase !== "cartel"}
                    playsInline
                    preload="metadata"
                    onPlay={() => setFase("emision")}
                    onTimeUpdate={alAvanzar}
                    onEnded={alTerminar}
                  />
                  <span className="tv-ia" translate="no">
                    Creado con IA · AI生成
                  </span>
                  {/* Encendido tipo tubo de rayos catódicos al cambiar de episodio */}
                  <span key={`encendido-${actual.n}`} className="tv-encendido" aria-hidden="true" />
                  <span className="tv-cristal" aria-hidden="true" />

                  {/* Telón de terciopelo que se abre al empezar */}
                  <div className="tv-telon" aria-hidden="true">
                    <span className="tv-telon-hoja izq" />
                    <span className="tv-telon-hoja der" />
                    <span className="tv-telon-cenefa" />
                  </div>

                  {fase === "cartel" && (
                    <button type="button" className="tv-tarjeta-titulo" onClick={reproducir} aria-label={`Reproducir episodio ${actual.n}: ${actual.titulo}`}>
                      <span className="tv-tarjeta-sello" translate="no" lang="zh-Hans">
                        第{actual.n}集
                      </span>
                      <span className="tv-tarjeta-n">Episodio {actual.n}</span>
                      <span className="tv-tarjeta-nombre">
                        {actual.titulo}
                        <small lang="zh-Hans">{actual.tituloZh}</small>
                      </span>
                      <span className="tv-play-grande">
                        <PlayIcon size={38} strokeWidth={2.4} fill="currentColor" />
                      </span>
                      {progreso[claveDe(actual)] > 0 && <span className="tv-reanudar">Continuar donde lo dejaste · 继续播放</span>}
                    </button>
                  )}

                  {fase === "fin" && (
                    <div className="tv-fin" role="status">
                      <div className="tv-fuegos" aria-hidden="true">
                        {CHISPAS.slice(0, 16).map((chispa, indice) => (
                          <i key={indice} style={{ "--a": `${indice * (360 / 16)}deg`, animationDelay: `${(indice % 3) * 0.12}s` }} />
                        ))}
                      </div>
                      <p className="tv-fin-titulo">
                        <CheckIcon size={22} strokeWidth={3} aria-hidden="true" /> ¡Episodio {actual.n} visto!
                        <span lang="zh-Hans">第{actual.n}集看完了！</span>
                      </p>
                      {siguiente ? (
                        <>
                          <button type="button" className="tv-siguiente" onClick={() => elegir(siguiente, true)}>
                            <span className="tv-siguiente-mini">
                              <img src={siguiente.poster} alt="" />
                              <svg viewBox="0 0 44 44" aria-hidden="true">
                                <circle cx="22" cy="22" r="19" style={{ "--p": cuenta / SEGUNDOS_AUTOPLAY }} />
                              </svg>
                              <b>{cuenta}</b>
                            </span>
                            <span className="tv-siguiente-texto">
                              <small>Siguiente episodio · 下一集</small>
                              {siguiente.n}. {siguiente.titulo} <span lang="zh-Hans">{siguiente.tituloZh}</span>
                            </span>
                          </button>
                          <div className="tv-fin-botones">
                            <button type="button" className="tv-btn-mini" onClick={() => setFase("emision")}>
                              <XIcon size={15} strokeWidth={2.6} aria-hidden="true" /> Quedarme aquí · 留下
                            </button>
                            <button type="button" className="tv-btn-mini" onClick={() => elegir(actual, true)}>
                              <RotateCcwIcon size={15} strokeWidth={2.6} aria-hidden="true" /> Volver a ver · 重看
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="tv-pronto">
                            Continuará… <span lang="zh-Hans">未完待续……</span>
                          </p>
                          <button type="button" className="tv-btn-mini" onClick={() => elegir(actual, true)}>
                            <RotateCcwIcon size={15} strokeWidth={2.6} aria-hidden="true" /> Volver a ver · 重看
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <span className="tv-placa" translate="no" aria-hidden="true">
                  <span className="tv-led" /> AI Español TV · 电视
                </span>
              </div>
              <span className="tv-peana" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="tv-mando">
          <div className="tv-mando-acciones">
            <button type="button" className="tv-btn tv-btn-oro" onClick={() => {
                if (fase !== "cartel") return elegir(actual, true);
                refTele.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                reproducir();
              }}>
              <PlayIcon size={18} strokeWidth={2.6} fill="currentColor" aria-hidden="true" />
              {numVistos > 0 ? "Seguir viendo" : "Ver ahora"} · Ep. {actual.n}
              <span lang="zh-Hans">{numVistos > 0 ? "继续观看" : "立即观看"}</span>
            </button>
            {esNuevo(ultimo, ahora) && ultimo.n !== actual.n && (
              <button type="button" className="tv-btn tv-btn-cristal" onClick={() => elegir(ultimo, true)}>
                <SparklesIcon size={17} strokeWidth={2.4} aria-hidden="true" /> Nuevo: Ep. {ultimo.n} · <span lang="zh-Hans">新一集</span>
              </button>
            )}
          </div>
          <div className="tv-temporada" aria-label={`Has visto ${numVistos} de ${emitidos.length} episodios`}>
            <span className="tv-temporada-barra">
              <span style={{ width: `${(numVistos / emitidos.length) * 100}%` }} />
            </span>
            <span>
              {numVistos}/{emitidos.length} vistos · <span lang="zh-Hans">已看{numVistos}集</span>
            </span>
          </div>
          <p className="tv-sinopsis">
            {serie.sinopsis}
            <span lang="zh-Hans">{serie.sinopsisZh}</span>
          </p>
          <p className="tv-aviso-ia">
            Serie creada con inteligencia artificial · <span lang="zh-Hans">本剧由人工智能生成</span>
          </p>
        </div>
      </section>

      {/* ===== Carrusel 3D de episodios ===== */}
      <section className="tv-lista" aria-labelledby="tv-lista-titulo">
        <div className="tv-lista-cabecera">
          <h2 id="tv-lista-titulo">
            <ClapperboardIcon size={20} strokeWidth={2.4} aria-hidden="true" /> Episodios · <span lang="zh-Hans">剧集</span>
          </h2>
          <span className="tv-lista-cuenta">
            {emitidos.length} episodios · <span lang="zh-Hans">共{emitidos.length}集</span>
          </span>
        </div>
        <div
          className="tv-carrusel"
          tabIndex={0}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Episodios · 剧集 (← →)"
          onKeyDown={alTeclaCarrusel}
          onTouchStart={(evento) => (inicioDeslizar.current = evento.touches[0].clientX)}
          onTouchEnd={(evento) => {
            if (inicioDeslizar.current === null) return;
            const distancia = evento.changedTouches[0].clientX - inicioDeslizar.current;
            inicioDeslizar.current = null;
            if (Math.abs(distancia) > 40) mover(distancia < 0 ? 1 : -1);
          }}
        >
          <button type="button" className="tv-flecha izq" onClick={() => mover(-1)} disabled={foco === 0} aria-label="Episodio anterior · 上一集">
            <ChevronLeftIcon size={26} strokeWidth={2.6} />
          </button>
          <ol className="tv-cf">
            {tarjetas.map((tarjeta, indice) => {
              const distancia = indice - foco;
              const lejania = Math.abs(distancia);
              const estilo = { "--d": distancia, "--ad": lejania, "--s": Math.max(-1, Math.min(1, distancia)), zIndex: 50 - lejania };
              const enFoco = distancia === 0;
              if (tarjeta.tipo === "emitido") {
                const episodio = tarjeta.episodio;
                const visto = vistos.has(claveDe(episodio));
                const activo = episodio.n === actual.n;
                return (
                  <li key={episodio.n} style={estilo} className={`${enFoco ? "foco" : ""} ${lejania > 2 ? "lejos" : ""}`} aria-hidden={lejania > 2}>
                    <button
                      type="button"
                      className={`tv-episodio ${activo ? "activo" : ""}`}
                      onClick={() => alPulsarTarjeta(indice, tarjeta)}
                      aria-current={activo}
                      tabIndex={enFoco ? 0 : -1}
                      aria-label={`Episodio ${episodio.n}: ${episodio.titulo} · 第${episodio.n}集 ${episodio.tituloZh}`}
                    >
                      <span className="tv-miniatura">
                        <img src={episodio.poster} alt="" loading="lazy" decoding="async" />
                        <span className="tv-num" aria-hidden="true">
                          {episodio.n}
                        </span>
                        <span className="tv-play" aria-hidden="true">
                          <PlayIcon size={22} strokeWidth={2.6} fill="currentColor" />
                        </span>
                        <span className="tv-duracion">{episodio.duracion}</span>
                        {esNuevo(episodio, ahora) && <span className="tv-cinta-nuevo">Nuevo · 新</span>}
                        {visto && (
                          <span className="tv-visto" title="Visto · 已看">
                            <CheckIcon size={13} strokeWidth={3} /> Visto · <span lang="zh-Hans">已看</span>
                          </span>
                        )}
                        {activo && <span className="tv-en-pantalla">En pantalla · 播放中</span>}
                        <span className="tv-barra-ep" aria-hidden="true">
                          <span style={{ width: `${fraccionVista(episodio) * 100}%` }} />
                        </span>
                      </span>
                      <span className="tv-episodio-texto">
                        <b>{episodio.titulo}</b>
                        <small lang="zh-Hans">
                          第{episodio.n}集 · {episodio.tituloZh}
                        </small>
                      </span>
                    </button>
                  </li>
                );
              }
              if (tarjeta.tipo === "pendiente") {
                const episodio = tarjeta.episodio;
                return (
                  <li key={episodio.n} style={estilo} className={`${enFoco ? "foco" : ""} ${lejania > 2 ? "lejos" : ""}`} aria-hidden={lejania > 2}>
                    <button type="button" className="tv-episodio tv-proximo" onClick={() => alPulsarTarjeta(indice, tarjeta)} tabIndex={enFoco ? 0 : -1} aria-disabled="true">
                      <span className="tv-miniatura">
                        {episodio.poster && <img src={episodio.poster} alt="" loading="lazy" decoding="async" />}
                        <span className="tv-candado">
                          <LockIcon size={22} strokeWidth={2.4} aria-hidden="true" />
                          <b>Estreno {FECHA_CORTA.format(fechaEstreno(episodio))}</b>
                          <small>Faltan {cuentaAtras(fechaEstreno(episodio), ahora)}</small>
                        </span>
                      </span>
                      <span className="tv-episodio-texto">
                        <b>
                          {episodio.n}. {episodio.titulo}
                        </b>
                        <small lang="zh-Hans">第{episodio.n}集 · 即将上映</small>
                      </span>
                    </button>
                  </li>
                );
              }
              return (
                <li key="pronto" style={estilo} className={`${enFoco ? "foco" : ""} ${lejania > 2 ? "lejos" : ""}`} aria-hidden={lejania > 2}>
                  <button type="button" className="tv-episodio tv-proximo" onClick={() => alPulsarTarjeta(indice, tarjeta)} tabIndex={enFoco ? 0 : -1} aria-disabled="true">
                    <span className="tv-miniatura">
                      <span className="tv-candado">
                        <span className="tv-candado-zh" translate="no">
                          待
                        </span>
                      </span>
                    </span>
                    <span className="tv-episodio-texto">
                      <b>{serie.proximamente.es}</b>
                      <small lang="zh-Hans">{serie.proximamente.zh}</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <button type="button" className="tv-flecha der" onClick={() => mover(1)} disabled={foco === tarjetas.length - 1} aria-label="Episodio siguiente · 下一集">
            <ChevronRightIcon size={26} strokeWidth={2.6} />
          </button>
        </div>
        <ol className="tv-puntos" aria-hidden="true">
          {tarjetas.map((tarjeta, indice) => (
            <li key={indice} className={indice === foco ? "foco" : ""} onClick={() => setFoco(indice)} />
          ))}
        </ol>
      </section>

      {/* ===== Ficha del episodio ===== */}
      <article className="tv-ficha" key={actual.n}>
        <div className="tv-ficha-cabeza">
          <p className="tv-ficha-n">
            <span className="tv-ficha-sello" translate="no" lang="zh-Hans">
              {actual.n}
            </span>
            Episodio {actual.n} · <span lang="zh-Hans">第{actual.n}集</span> · {actual.duracion}
            {esNuevo(actual, ahora) && <span className="tv-chip-nuevo">Nuevo · 新</span>}
          </p>
          <h2>
            {actual.titulo} <span lang="zh-Hans">{actual.tituloZh}</span>
          </h2>
          <p className="tv-resumen">
            {actual.resumen}
            <span lang="zh-Hans">{actual.resumenZh}</span>
          </p>
        </div>
        {actual.frases?.length > 0 && (
          <div className="tv-ficha-frases">
            <h3>
              Frases del episodio · <span lang="zh-Hans">本集句子</span>
            </h3>
            <ul className="tv-frases">
              {actual.frases.map((frase, indice) => (
                <li key={frase.es} style={{ "--i": indice }}>
                  <button type="button" onClick={() => speak(frase.es)} aria-label={`Escuchar · 听: ${frase.es}`}>
                    <Volume2Icon size={16} strokeWidth={2.4} />
                  </button>
                  <span>
                    {frase.es}
                    <small lang="zh-Hans">{frase.zh}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
