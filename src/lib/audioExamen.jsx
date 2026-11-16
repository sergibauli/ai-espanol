// Reproductor único de los audios de los exámenes DELE (MP3 con voces de España).
//
// Por qué existe: iOS Safari, la WebView de WeChat y otros navegadores móviles solo dejan sonar un
// <audio> si su primer play() ocurre dentro del toque del alumno. Antes cada frase creaba un
// `new Audio()` y lo lanzaba tras un `await`/`setTimeout`: en el iPhone sonaba la primera y el resto
// se rechazaba en silencio (NotAllowedError → voz del navegador, que tampoco suena fuera del gesto).
// Aquí hay UN solo elemento <audio>: se desbloquea en el primer toque y luego solo se le cambia el `src`.
import React from "react";

// WAV de 0,01 s en silencio (16 kHz, 160 muestras a cero) para desbloquear el elemento dentro del toque
const SILENCIO =
  "data:audio/wav;base64,UklGRmQBAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YUABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";

let elemento = null;
let desbloqueado = false;
let vozDesbloqueada = false;
let sesion = 0;
let clipActual = null; // { arrancar, terminar, sesion }
let estado = { sonando: false, pausado: false, fallo: null };
const oyentes = new Set();

function emitir(cambios) {
  estado = { ...estado, ...cambios };
  oyentes.forEach((oyente) => oyente(estado));
}

export function elementoAudioExamen() {
  if (!elemento && typeof Audio !== "undefined") {
    elemento = new Audio();
    elemento.preload = "auto";
    elemento.setAttribute("playsinline", "");
    elemento.setAttribute("webkit-playsinline", "");
  }
  return elemento;
}

// Llamar de forma SÍNCRONA dentro del toque (antes de cualquier await). Idempotente.
export function desbloquearAudioExamen() {
  const audio = elementoAudioExamen();
  if (audio && !desbloqueado) {
    desbloqueado = true;
    audio.src = SILENCIO;
    try {
      audio.play()?.catch(() => {});
    } catch {
      /* navegadores antiguos */
    }
  }
  // Voz del navegador (solo se usa si falta el MP3): en iOS también hay que estrenarla en el toque
  try {
    const voz = window.speechSynthesis;
    if (voz && !vozDesbloqueada && typeof window.SpeechSynthesisUtterance === "function") {
      vozDesbloqueada = true;
      const vacio = new window.SpeechSynthesisUtterance(" ");
      vacio.volume = 0;
      voz.speak(vacio);
    }
    voz?.resume?.();
  } catch {
    /* sin síntesis */
  }
}

// Empieza una reproducción nueva (para la anterior). Devuelve el número de sesión.
export function empezarAudioExamen() {
  pararAudioExamen();
  desbloquearAudioExamen();
  emitir({ sonando: true, pausado: false, fallo: null });
  return sesion;
}

export const sesionAudioExamen = () => sesion;
export const audioExamenVigente = (numero) => numero === sesion;

export function terminarAudioExamen(numero) {
  if (numero === sesion) emitir({ sonando: false, pausado: false, fallo: null });
}

export function pararAudioExamen() {
  sesion += 1;
  const clip = clipActual;
  clipActual = null;
  elemento?.pause();
  clip?.terminar("parado");
  emitir({ sonando: false, pausado: false, fallo: null });
}

export function pausarAudioExamen() {
  if (!estado.sonando || estado.pausado) return;
  elemento?.pause();
  try {
    window.speechSynthesis?.pause?.();
  } catch {
    /* sin síntesis */
  }
  emitir({ pausado: true });
}

// Desde el toque del alumno
export function reanudarAudioExamen() {
  if (!estado.pausado) return;
  emitir({ pausado: false });
  try {
    window.speechSynthesis?.resume?.();
  } catch {
    /* sin síntesis */
  }
  if (estado.fallo) return reintentarAudioExamen();
  if (clipActual && elemento && !elemento.ended) {
    elemento.play()?.catch((error) => clipActual?.fallar(error));
  }
}

// Desde el botón «Reintentar» del aviso (es un toque: el play() vuelve a estar permitido)
export function reintentarAudioExamen() {
  desbloquearAudioExamen();
  if (clipActual) clipActual.arrancar(true);
  else emitir({ fallo: null });
}

// Espera que se detiene mientras el audio está en pausa. Resuelve false si se paró.
export function esperarAudioExamen(ms) {
  const numero = sesion;
  return new Promise((resolve) => {
    let resta = ms;
    let antes = Date.now();
    const paso = () => {
      if (numero !== sesion) return resolve(false);
      const ahora = Date.now();
      if (!estado.pausado && !estado.fallo) resta -= ahora - antes;
      antes = ahora;
      if (resta <= 0) return resolve(true);
      setTimeout(paso, Math.min(100, resta));
    };
    paso();
  });
}

// Reproduce un MP3 en el elemento único. Resuelve "fin" o "parado".
// Si falla (red, fichero, bloqueo del navegador) reintenta una vez y luego muestra el aviso
// (estado.fallo) y espera a que el alumno pulse «Reintentar» o pare el audio.
export function tocarAudioExamen(url, { ritmo = 1, alAvanzar } = {}) {
  const audio = elementoAudioExamen();
  if (!audio) return Promise.resolve("parado");
  const numero = sesion;
  if (!estado.sonando) emitir({ sonando: true, pausado: false, fallo: null });
  return new Promise((resolve) => {
    let reintentos = 0;
    let intento = 0; // el evento «error» y el rechazo de play() llegan juntos: un solo fallo por intento
    let fallado = -1;
    let acabado = false;
    const alTerminar = () => terminar("fin");
    const alError = () => fallar(audio.error || new Error("error"));
    const alTiempo = () => {
      if (alAvanzar && audio.duration) alAvanzar(Math.min(1, audio.currentTime / audio.duration));
    };
    const alCargar = () => {
      audio.playbackRate = ritmo;
    };
    function limpiar() {
      audio.removeEventListener("ended", alTerminar);
      audio.removeEventListener("error", alError);
      audio.removeEventListener("timeupdate", alTiempo);
      audio.removeEventListener("loadedmetadata", alCargar);
    }
    function terminar(resultado) {
      if (acabado) return;
      acabado = true;
      limpiar();
      if (clipActual === clip) clipActual = null;
      if (numero === sesion && estado.fallo) emitir({ fallo: null });
      resolve(resultado);
    }
    function fallar(error) {
      if (acabado || numero !== sesion) return;
      if (error?.name === "AbortError") return; // el src cambió: no es un fallo
      if (fallado === intento) return;
      fallado = intento;
      const bloqueado = error?.name === "NotAllowedError";
      console.warn("[audio examen]", bloqueado ? "bloqueado por el navegador" : "no se pudo cargar", url, error);
      if (!bloqueado && reintentos < 1) {
        reintentos += 1;
        setTimeout(() => !acabado && numero === sesion && arrancar(false), 600);
        return;
      }
      emitir({ fallo: { bloqueado, url } });
    }
    function arrancar(manual) {
      if (acabado || numero !== sesion) return;
      if (manual) reintentos = 0;
      intento += 1;
      if (estado.fallo) emitir({ fallo: null, pausado: false });
      audio.src = url;
      audio.defaultPlaybackRate = ritmo;
      audio.playbackRate = ritmo;
      if (estado.pausado) return; // se arrancará al reanudar
      try {
        const promesa = audio.play();
        promesa?.catch(fallar);
      } catch (error) {
        fallar(error);
      }
    }
    const clip = { arrancar, terminar, fallar, sesion: numero };
    clipActual = clip;
    audio.addEventListener("ended", alTerminar);
    audio.addEventListener("error", alError);
    audio.addEventListener("timeupdate", alTiempo);
    audio.addEventListener("loadedmetadata", alCargar);
    arrancar(false);
  });
}

export function useAudioExamen() {
  const [actual, setActual] = React.useState(estado);
  React.useEffect(() => {
    oyentes.add(setActual);
    setActual(estado);
    return () => oyentes.delete(setActual);
  }, []);
  return actual;
}

// Aviso con botón para reintentar cuando un MP3 no carga o el navegador lo bloquea
export function AvisoAudioExamen({ className = "" }) {
  const { fallo } = useAudioExamen();
  if (!fallo) return null;
  return (
    <div className={`aviso-audio-examen ${className}`} role="alert">
      <span>
        {fallo.bloqueado
          ? "El navegador ha detenido el audio. Toca «Continuar» para seguir escuchando."
          : "No se ha podido cargar este audio. Revisa la conexión y vuelve a intentarlo."}
        <span className="zh" lang="zh-CN">
          {fallo.bloqueado ? "浏览器暂停了音频，请点击“继续”接着听。" : "音频加载失败，请检查网络后重试。"}
        </span>
      </span>
      <button type="button" onClick={reintentarAudioExamen}>
        {fallo.bloqueado ? "Continuar · 继续" : "Reintentar · 重试"}
      </button>
    </div>
  );
}
