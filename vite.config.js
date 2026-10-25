import { randomBytes } from 'node:crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  plugins: [react()],
  // Con el Worker (VITE_API_URL) la clave de DeepSeek no se incrusta en la web
  define: { __DS_KEY__: JSON.stringify(process.env.VITE_API_URL ? "" : encodedDeepseekKey()) },
  build: { chunkSizeWarningLimit: 4000 },
});
