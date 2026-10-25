---
name: ai-espanol-contexto
description: Mapa del proyecto AI Español (web para que estudiantes chinos aprendan español y preparen el DELE) con la estética imperial, dónde está cada dato, formatos y trampas conocidas. Léela antes de tocar diseño, contenido, audio o despliegue de este proyecto, y cuando otra skill del proyecto lo pida.
---

# AI Español · contexto del proyecto

Web en React 19 + Vite 7 + HashRouter + Clerk, publicada en GitHub Pages (`sergibauli/ai-espanol`). Público: estudiantes chinos; todo texto visible va en español + chino simplificado.

## Dónde está cada cosa
- Rutas: `src/App.jsx`. Marco (menú lateral, barra inferior móvil, cielo según la hora de China): `src/components/layout/LightShell.jsx`. Iconos del menú: `src/components/ui/NavIcon.jsx` (SVG propios, nada de emojis en el menú).
- Estilos: `src/styles/parchment.css` (se carga el último y manda; cada bloque lleva un comentario `/* ===== vX.Y · … */`). `modern.css` es el sistema base; `app.css` es Tailwind ya compilado (solo existen sus clases).
- Contenido: `src/data/modulos/modulos-XX-YY.js` (80 unidades: `vocabulario`, `teoria`, `dialogos`, `ejercicios`), `src/data/modulos/catalog.json` (índice), `src/data/pronunciacion.json` (21 familias, cada sílaba con `ej`, `palabras`, `frases`), `src/data/diccionarios/*`, exámenes de práctica en `src/data/examenes/*` (opción correcta = índice `correctAnswer`), modelos oficiales con `src/lib/oficial-loader.js`.
- Lecciones: `src/lib/lessons.js` (`buildLesson` con semilla = hora → distintas en cada intento; `buildPractice`; `buildAIChallenge`; `dialogToStory` asigna voz por género con `esMujer`).
- Audio: `speak(texto, velocidad, "m"|"f")` en `src/components/lesson/fx.js`. MP3 en `public/audio/<fnv1a>.mp3`; índices `src/data/audio-index.json` (voz del profesor) y `audio-index-f.json` (voz femenina, hash de `"F|"+texto`). Ver skill `voz`.
- Recursos de las maquetas: `public/theme/*` (papel, cielo, dragón, rodillos, sello…) y `public/mono/*.png` (6 poses del Rey Mono: saluda, guino, serio, poder, feliz, trofeo).
- Maquetas del usuario (Doubao): `../designs/*.png`.

## Estética (no inventar otra)
Pergamino (`public/theme/papel.jpg`) sobre cielo nocturno (`noche-tile.jpg`), laca roja `#c8102e`/`#8f0c21`, oro `#f2c14e`/`#c8961e`, tinta `#3b2416`, filetes dobles dorados, sellos rojos con caligrafía (`STKaiti, KaiTi`), rodillos de pergamino. Botones del menú: todos con el mismo formato dorado. Mascota: el Rey Mono (nunca personajes con copyright ni recursos de Duolingo).

## Trampas conocidas
- Páginas antiguas (`LEGACY_LIGHT` en LightShell) pasan por `lightAdapter.js`: marca paneles oscuros con `.la-paper` y oscurece textos claros con estilo en línea `!important`. Para excluir algo: clase `gm-no-adapt`.
- Dentro de `.app-stage` (juegos) hay `transform`, así que `position: fixed` no es relativo a la ventana: los modales van con `createPortal(…, document.body)`.
- La barra inferior móvil es fija y se oculta sola si hay `.lp-root` o `.pp-overlay` abiertos.
- Nunca poner claves en el repo (DeepSeek va ofuscada vía `__DS_KEY__` de `.env`; Fish solo por variable de entorno `FISH_KEY`).
- Antes de dar algo por hecho: `npm run build` sin errores y captura de la ruta tocada en escritorio (1366×860) y móvil (390×844).
- Desplegar con la skill `desplegar`, y siempre antes de que el uso por horas llegue al 99 %.
