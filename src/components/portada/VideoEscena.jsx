import * as React from "react";
import { prefiereQuietud } from "./vida.js";

// Vídeo de fondo de la portada: siempre pinta primero la imagen (póster) y solo después carga el vídeo,
// en bucle silencioso. Al cerrar cada vuelta un velo de luz dorada tapa el salto al principio.
// Con prefers-reduced-motion o ahorro de datos se queda en la imagen fija.
//
// variantes: [{ consulta, src, poster, quieta, fin }] — la primera cuya media query se cumpla
// (consulta vacía = por defecto). «fin» corta el vídeo antes de su final (s); «velocidad» = playbackRate;
// «quieta» es la imagen para reduced-motion.
function elegir(variantes) {
  for (const variante of variantes) {
    if (!variante.consulta) return variante;
    try {
      if (window.matchMedia(variante.consulta).matches) return variante;
    } catch {}
  }
  return variantes[variantes.length - 1];
}

function ahorroDatos() {
  try {
    return Boolean(navigator.connection?.saveData);
  } catch {
    return false;
  }
}

export function VideoEscena({ variantes, className = "", retraso = 0, alVer = false, prioridad = false, encuadre }) {
  const refCaja = React.useRef(null);
  const refVideo = React.useRef(null);
  const [variante, setVariante] = React.useState(() => elegir(variantes));
  const [cargar, setCargar] = React.useState(false);
  const [listo, setListo] = React.useState(false);
  const [velo, setVelo] = React.useState(false);
  const quieto = React.useMemo(() => prefiereQuietud() || ahorroDatos(), []);

  // Cambia de vídeo si gira el móvil o se redimensiona la ventana (vertical ↔ panorámico)
  React.useEffect(() => {
    const consultas = variantes.filter((v) => v.consulta).map((v) => window.matchMedia(v.consulta));
    const revisar = () => setVariante(elegir(variantes));
    consultas.forEach((c) => c.addEventListener?.("change", revisar));
    return () => consultas.forEach((c) => c.removeEventListener?.("change", revisar));
  }, [variantes]);

  React.useEffect(() => setListo(false), [variante.src]);

  // Carga perezosa: tras la primera pintura (y la carga de la página) o cuando la sección se acerca a la pantalla
  React.useEffect(() => {
    if (quieto || cargar) return;
    let cancelado = false;
    let espera = 0;
    let observador = null;
    const empezar = () => {
      if (cancelado) return;
      espera = window.setTimeout(() => !cancelado && setCargar(true), retraso);
    };
    if (alVer && "IntersectionObserver" in window) {
      observador = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            observador.disconnect();
            empezar();
          }
        },
        { rootMargin: "300px 0px" }
      );
      if (refCaja.current) observador.observe(refCaja.current);
    } else if (document.readyState === "complete") empezar();
    else window.addEventListener("load", empezar, { once: true });
    return () => {
      cancelado = true;
      clearTimeout(espera);
      observador?.disconnect();
      window.removeEventListener("load", empezar);
    };
  }, [quieto, cargar, alVer, retraso]);

  // Reproduce solo mientras se ve y la pestaña está visible; vigila el final de la vuelta para el velo
  React.useEffect(() => {
    const video = refVideo.current;
    if (!cargar || !video) return;
    let visible = true;
    let cuadro = 0;
    let saltando = false;
    const fin = () => Math.min(variante.fin || Infinity, (video.duration || Infinity) - 0.08);
    const vigilar = () => {
      cuadro = 0;
      const limite = fin();
      if (Number.isFinite(limite)) {
        if (!saltando && video.currentTime >= limite - 0.55) setVelo(true);
        if (!saltando && video.currentTime >= limite) {
          saltando = true;
          video.currentTime = 0;
        }
      }
      if (!video.paused) cuadro = requestAnimationFrame(vigilar);
    };
    const alSaltar = () => {
      if (!saltando) return;
      saltando = false;
      setTimeout(() => setVelo(false), 120);
    };
    if (variante.velocidad) {
      video.defaultPlaybackRate = variante.velocidad;
      video.playbackRate = variante.velocidad;
    }
    const reproducir = () => {
      if (!visible || document.hidden) return video.pause();
      const promesa = video.play();
      promesa?.catch?.(() => {});
    };
    const alReproducir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(vigilar);
    };
    const alListo = () => setListo(true);
    const observador =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entradas) => {
            visible = entradas[0]?.isIntersecting ?? true;
            reproducir();
          })
        : null;
    observador?.observe(video);
    video.addEventListener("playing", alReproducir);
    video.addEventListener("playing", alListo);
    video.addEventListener("seeked", alSaltar);
    document.addEventListener("visibilitychange", reproducir);
    reproducir();
    return () => {
      cancelAnimationFrame(cuadro);
      observador?.disconnect();
      video.removeEventListener("playing", alReproducir);
      video.removeEventListener("playing", alListo);
      video.removeEventListener("seeked", alSaltar);
      document.removeEventListener("visibilitychange", reproducir);
    };
  }, [cargar, variante]);

  const imagen = quieto ? variante.quieta || variante.poster : variante.poster;
  return (
    <div ref={refCaja} className={`pc-video ${listo ? "listo" : ""} ${className}`} style={encuadre ? { "--pc-encuadre": encuadre } : undefined} aria-hidden="true">
      <img className="pc-video-poster" src={imagen} alt="" decoding="async" fetchPriority={prioridad ? "high" : "auto"} loading={prioridad ? "eager" : "lazy"} />
      {cargar && !quieto && (
        <video key={variante.src} ref={refVideo} className="pc-video-cine" src={variante.src} poster={variante.poster} muted playsInline autoPlay loop preload="auto" disablePictureInPicture disableRemotePlayback tabIndex={-1} />
      )}
      <span className={`pc-video-velo ${velo ? "activo" : ""}`} />
    </div>
  );
}
