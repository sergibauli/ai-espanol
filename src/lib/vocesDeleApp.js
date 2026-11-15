// Reproducción en la app de los MP3 de voces de España de los exámenes (ver src/lib/vocesDele.js).
// El índice de MP3 y el reparto de voces se descargan solo la primera vez que se abre un audio.
let carga = null;
export const cargarVocesDele = () =>
  (carga ??= Promise.all([
    import("../data/audio-index-dele.json").then((modulo) => new Set(modulo.default || modulo)),
    import("../data/reparto-dele.json").then((modulo) => modulo.default || modulo),
  ])
    .then(([claves, repartos]) => ({ claves, repartos }))
    .catch(() => ({ claves: new Set(), repartos: {} })));

export const urlVozDele = (clave) => `${import.meta.env.BASE_URL || "./"}audio/dele/${clave}.mp3`;

// Velocidad del reproductor (la de la voz del navegador, 0.9 = normal) → velocidad del MP3
export const ritmoMp3 = (velocidad) => Math.min(1.3, Math.max(0.6, (Number(velocidad) || 0.9) / 0.9));

// Reproduce un MP3; resuelve true al terminar o false si falla. alAvanzar recibe 0…1.
export function reproducirMp3(clave, velocidad, { alEmpezar, alAvanzar } = {}) {
  return new Promise((resolve) => {
    const audio = new Audio(urlVozDele(clave));
    audio.playbackRate = ritmoMp3(velocidad);
    audio.onended = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.onpause = () => {
      if (!audio.ended) resolve(false);
    };
    if (alAvanzar) audio.ontimeupdate = () => audio.duration && alAvanzar(Math.min(1, audio.currentTime / audio.duration));
    alEmpezar?.(audio);
    audio.play().catch(() => resolve(false));
  });
}
