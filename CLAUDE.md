# AI Español · contexto para Claude Code

App web (PWA) para que estudiantes chinos aprendan español y preparen el DELE A1–B2. Explicaciones en español + chino simplificado.

## Comandos
- `npm install` · `npm run dev` (Vite, http://localhost:5173) · `npm run build` (sale en `dist/`)
- Deploy: cada push a `main` construye y publica en GitHub Pages (`.github/workflows/deploy.yml`). URL: https://sergibauli.github.io/ai-espanol/

## Arquitectura
- React 19 + React Router 7 (**HashRouter**, rutas `#/...`) + Clerk (login) + lucide-react (iconos `XxxIcon`). Vite 7, `base: './'`.
- `src/App.jsx`: todas las rutas (páginas con `React.lazy`), layout, `RequireAuth`, `ErrorBoundary`.
- `src/lib/`: `auth.jsx` (useAppAuth), `i18n.jsx` (useLanguage, ES/中文), `progress.js` (progreso de módulos), `srs.js` (repaso espaciado), `favorites.js`, `sound.jsx`, `aiTutor.js` + `ai-generator.js` (DeepSeek), loaders de exámenes.
- `src/data/`: contenido (80 módulos + `plus/` con lectura, errores típicos y banco de examen por módulo; `modulos/catalog.json` = índice ligero, se regenera con `node scripts/build-catalog.mjs`; exámenes, 80 modelos oficiales DELE, diccionarios ES–ZH). Son ficheros grandes: no los leas enteros, busca con grep.
- `src/pages/` (juegos en `juegos/`, DELE en `dele/`, pestañas de módulo en `modulo/`).
- Estilos: `src/styles/app.css` es Tailwind 3 **ya compilado** (no hay config de Tailwind; solo funcionan las clases que ya existen en ese CSS). `src/styles/overrides.css` = ajustes de diseño. `public/overrides.js` = parches DOM heredados (a eliminar).
- Persistencia: progreso en `localStorage` (claves `dele_*`). Campus (clases, deberes, roles) en `src/lib/campus.jsx` → Worker `worker/` (KV + Clerk); sin `VITE_API_URL` va en modo demo local.
- Diseño v3: clases `ui-*` de `src/styles/modern.css` para pantallas nuevas (Inicio, Campus, Generador de exámenes, Profesores).

## Idiomas de ayuda e IA (v11)
- El alumno elige el idioma de ayuda (中文, English, Français, Deutsch, Nederlands, Русский, 日本語) con `SelectorIdioma` (menú lateral, barra superior en móvil y portada). `src/lib/i18n.jsx` guarda `ayuda`; `src/lib/traductorDom.js` sustituye en el DOM los trozos en chino por ese idioma con los diccionarios `public/i18n/<idioma>/ui.json` y `m<N>.json` (por unidad, con la teoría completa traducida). Lo que no está en el diccionario se queda en chino; los textos decorativos llevan `translate="no"`.
- Tras añadir o cambiar textos en chino: `node scripts/traducir.mjs` (DeepSeek, reanudable, solo traduce lo que falta).
- En la guía de cada unidad, el botón «Traducción» muestra la explicación completa debajo, en el idioma de ayuda (`TraduccionGuia` en `UnitPage.jsx`).
- IA limitada a 5 usos por semana y alumno (`LIMITE_SEMANAL` en `deepseekClient.js`, `AI_WEEKLY` en el Worker). Una conversación con el tutor o el examinador cuenta como un uso (`usoConversacion`); el plan semanal automático de Mi DELE no cuenta. `CuotaIA` muestra lo que queda.
- DELE por nivel (`/oficial/A1…B2`): cada nivel es un mundo (bambú, linternas, tinta, Ciudad Prohibida) con escenario SVG (`components/dele/EscenasNivel.jsx`), partículas (`ParticulasNivel`) y tarjetas propias (`styles/dele-niveles.css`). Unidades usa los mismos mundos.

## Ojo
- Código recuperado por descompilación: dentro de las páginas los nombres de variables son genéricos (`i`, `t`, `setU`). Renómbralos al tocar cada fichero.
- Hay claves de DeepSeek y un admin (`admin/314159`) en el frontend: ver `ANALISIS.md`. No añadas más secretos al código; usa variables `VITE_*` y un backend/proxy.
- Antes de dar algo por terminado: `npm run build` sin errores y prueba la ruta afectada en el navegador.
