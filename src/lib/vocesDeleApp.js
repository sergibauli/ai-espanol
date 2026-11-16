// Reproducción en la app de los MP3 de voces de España de los exámenes (ver src/lib/vocesDele.js).
// El índice de MP3 y el reparto de voces se descargan solo la primera vez que se abre un audio.
import { tocarAudioExamen } from "./audioExamen.jsx";

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

// Reproduce un MP3 en el reproductor único de los exámenes (src/lib/audioExamen.jsx, apto para iPhone/WeChat);
// resuelve true al terminar o false si se para. alAvanzar recibe 0…1.
export async function reproducirMp3(clave, velocidad, { alAvanzar } = {}) {
  const resultado = await tocarAudioExamen(urlVozDele(clave), { ritmo: ritmoMp3(velocidad), alAvanzar });
  return resultado === "fin";
}
