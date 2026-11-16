import { randomBytes } from 'node:crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import trozosDatos from './scripts/vite-trozos-datos.mjs';

// v21 · Service worker con Workbox (vite-plugin-pwa): precarga la interfaz y guarda en caché lo que se va usando
// (código de cada sección, imágenes, traducciones) para que la app abra al instante y funcione sin red.
// Mantiene el nombre service-worker.js para que los móviles que ya tienen la app instalada se actualicen solos.
const pwa = VitePWA({
  filename: 'service-worker.js',
  injectRegister: false,
  manifest: false,
  registerType: 'autoUpdate',
  workbox: {
    cleanupOutdatedCaches: true,
    skipWaiting: true,
    clientsClaim: true,
    navigateFallback: 'index.html',
    globPatterns: ['index.html', 'assets/index-*.{js,css}', 'assets/*.css', 'icons/*.{png,svg}', 'theme/*.{webp,jpg}', 'mono/*.webp'],
    maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
    runtimeCaching: [
      { urlPattern: ({ url, request }) => request.destination === 'script' || url.pathname.includes('/assets/'), handler: 'StaleWhileRevalidate', options: { cacheName: 'ae-codigo', expiration: { maxEntries: 400, maxAgeSeconds: 60 * 24 * 3600 } } },
      // Los audios no se guardan aquí: Safari pide trozos (Range) y una copia entera rompería la reproducción
      { urlPattern: ({ url }) => url.pathname.includes('/i18n/'), handler: 'StaleWhileRevalidate', options: { cacheName: 'ae-idiomas', expiration: { maxEntries: 200 } } },
      { urlPattern: ({ request }) => request.destination === 'image', handler: 'CacheFirst', options: { cacheName: 'ae-imagenes', expiration: { maxEntries: 300, maxAgeSeconds: 120 * 24 * 3600 } } },
      { urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com', handler: 'StaleWhileRevalidate', options: { cacheName: 'ae-fuentes', expiration: { maxEntries: 30 } } },
    ],
  },
});

// Clave de DeepSeek (solo si no hay Worker): se lee de DEEPSEEK_API_KEY (sin prefijo VITE_, para que Vite
// nunca la publique en claro) y se inyecta cifrada con XOR + sal aleatoria por build. Ver src/lib/deepseekClient.js.
function encodedDeepseekKey() {
  const raw = process.env.DEEPSEEK_API_KEY || '';
  if (!raw) return null;
  const salt = randomBytes(32);
  const data = Buffer.from(raw).map((b, i) => b ^ salt[i % salt.length]);
  return { s: salt.toString('base64'), k: Buffer.from(data).toString('base64') };
}

// base relativa: la app se sirve en https://sergibauli.github.io/ai-espanol/ (HashRouter)
export default defineConfig({
  base: './',
  plugins: [react(), pwa, trozosDatos()],
  // Con el Worker (VITE_API_URL) la clave de DeepSeek no se incrusta en la web
  define: { __DS_KEY__: JSON.stringify(process.env.VITE_API_URL ? "" : encodedDeepseekKey()) },
  build: { chunkSizeWarningLimit: 4000 },
});
