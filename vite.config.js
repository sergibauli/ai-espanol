import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: la app se sirve en https://sergibauli.github.io/ai-espanol/ (HashRouter)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 4000 },
});
