# AI Español · Preparación DELE (v1, código recuperado)

Este es el código fuente de la versión que está publicada en GitHub Pages (`sergibauli/ai-espanol`, rama `main`).
El código original se había perdido y en el repositorio solo quedaba el build compilado. Lo he recuperado
descompilando ese build (23-10-2026).

- **Stack:** React 19 · React Router 7 (HashRouter) · Clerk · lucide-react · Vite 7
- **Estilos:** `src/styles/app.css` es el CSS de Tailwind ya compilado del build original (Tailwind 3).
  `src/styles/overrides.css` reúne los ajustes de las "Rondas 1–6".
- **Verificación:** las 74 rutas de la app se han comparado en el navegador contra la web publicada y el texto renderizado es idéntico.

## Uso

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ (base relativa, válido para /ai-espanol/)
```

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/App.jsx`, `src/main.jsx` | Rutas (lazy), layout, ErrorBoundary, ClerkProvider |
| `src/lib/` | auth, i18n, progreso de módulos, repaso espaciado (SRS), favoritos, sonido, tutor IA, buscador, loaders |
| `src/components/` | TopNav, Pizarra, Favoritos, TutorChat, Mascota, fondos animados… |
| `src/pages/` | Dashboard, Módulos, Pronunciación, Karaoke, Gramática, Diccionarios… |
| `src/pages/modulo/` | Pestañas del módulo (Teoría, Vocabulario, Diálogos, Ejercicios, Juegos, Repaso…) |
| `src/pages/juegos/` | 47 juegos |
| `src/pages/dele/` | Exámenes de práctica y exámenes oficiales DELE A1–B2 |
| `src/data/` | 60 módulos, exámenes, 80 modelos oficiales, diccionarios ES–ZH, canciones, gramática |
| `public/` | manifest, service worker, icono, vídeo de la mascota, APK, `overrides.js` |

## Notas sobre la recuperación

- Los nombres de las variables locales los asignó el descompilador (`i`, `t`, `setU`…). Los módulos centrales
  (`lib/`, `App.jsx`, componentes globales) tienen nombres descriptivos que les he puesto según lo que hacen.
- Se han corregido 2 fallos que ya existían en producción: `<Crown>` en `ExamDetailPage` y `<X>` en `KaraokePage`
  eran componentes no definidos que rompían la pantalla al mostrarse.
- Ver `ANALISIS.md` para problemas de seguridad y el plan de modernización.
