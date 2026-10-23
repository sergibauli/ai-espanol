# Análisis técnico y plan de modernización · AI Español v1

Fecha: 23-10-2026. Base: código recuperado del build publicado (rama `main`).

## 0. Situación del repositorio

| Rama | Qué contiene |
|---|---|
| `main` (publicada) | Solo el build compilado + parches `overrides.css/js`. **Sin código fuente.** |
| `v2` | Reescritura React + Vite (≈3.000 líneas) con backend Cloudflare Worker + Stripe. No está publicada y le faltan la mayoría de juegos, karaoke, pronunciación, etc. |
| `v1-build` | Build antiguo. |

**Recomendación:** subir este código recuperado como fuente oficial de `main` (o de una rama `v1-src`) y dejar de parchear JS compilado.

---

## 1. 🔴 Seguridad (urgente)

| # | Problema | Dónde | Acción |
|---|---|---|---|
| 1 | **2 claves de DeepSeek en el frontend**: `sk-be09…` (tutor, dashboard, corrección, tutor de voz) y `sk-01c4…` (generador IA). Cualquiera puede leerlas desde el navegador. | `lib/aiTutor.js`, `lib/ai-generator.js`, `components/CorrectionDisplay.jsx`, `pages/DashboardPage.jsx` | **Revocar las dos ya** en DeepSeek. *(Ya quitadas del código: ahora se leen de `VITE_DEEPSEEK_API_KEY`, pero siguen llegando al navegador; la solución definitiva es el proxy.)* Mover las llamadas a un proxy en el servidor (el Worker de la rama `v2` ya lo hace). |
| 2 | **Admin con contraseña en el código**: usuario `admin`, contraseña `314159`. Da acceso completo durante 90 min. | `lib/auth.jsx` | Eliminarlo y usar roles de Clerk (`publicMetadata.role = "admin"`). |
| 3 | **Clerk en modo desarrollo** (`pk_test_…`): tiene límites, muestra avisos de desarrollo y no sirve para usuarios reales. | `main.jsx` | Crear la instancia de producción y leer la clave de `import.meta.env.VITE_CLERK_PUBLISHABLE_KEY`. |
| 4 | El premium/paywall no existe en servidor: todo se guarda en `localStorage`, así que cualquiera puede desbloquearlo. | — | Guardar los permisos en el backend (KV/DB) y validarlos con el token de Clerk. |

## 2. 🟠 Errores y deuda técnica detectados

- **Service worker roto en el subpath:** `APP_SHELL = ['/', …]` cachea `sergibauli.github.io/` en lugar de `/ai-espanol/`, y el fallback offline devuelve `/`. Hay que usar rutas relativas (`./`) o `self.registration.scope`.
- **Parches sobre el build:** `overrides.js` redirige rutas y renombra etiquetas manipulando el DOM y `location.hash`. Ahora que hay código fuente, conviene integrarlo en `App.jsx` y `TopNav` y eliminar el script.
- **`overrides.css` con 34 KB de reglas `!important`** que pelean con Tailwind. Hay que pasarlas a los componentes.
- **Bundle principal de 2,2 MB:** los 60 módulos (`data/modulos/*`) se importan de forma estática en `data/modulos/index.js`, que usa el Dashboard. Hay que cargarlos bajo demanda, igual que ya hace `ModulosPage`.
- **Datos oficiales DELE en JS** (1,4–2,2 MB por nivel). Conviene pasarlos a JSON en `public/` y cargarlos con `fetch` (mejor caché y menos parseo).
- **Persistencia solo local:** 137 accesos a `localStorage`. El progreso, la racha, el SRS y los favoritos se pierden al cambiar de dispositivo. Hace falta sincronizar con un backend por usuario.
- **506 imágenes de `picsum.photos`** (fotos aleatorias) en los exámenes. Además de no ser estables, ese dominio suele estar bloqueado o ir lento en China continental.
- **Google Fonts y Clerk** también suelen ir mal desde China, tu público principal. Hay que autoalojar las fuentes y valorar un proveedor de login accesible en China (WeChat OAuth, como pide el briefing).
- **Fallos que ya estaban en producción** (corregidos en este código): `<Crown>` (resultado de examen) y `<X>` (Karaoke) no estaban definidos.
- **47 juegos** con mucha lógica duplicada (selector de módulo, puntuación, `PostGameNav`). Se pueden unificar en un `GameShell` común.

## 3. 🟢 Plan de modernización propuesto

**Fase 1 · Seguridad y base (1–2 días)**
1. Revocar las claves de DeepSeek, quitar el admin hardcodeado y pasar Clerk a producción con variables de entorno.
2. Desplegar el Worker de la rama `v2` (`worker/`) como proxy de IA. Cambiar `api.deepseek.com` por `VITE_API_URL`.
3. Subir este código a `main` y usar el workflow de GitHub Actions (`npm ci && npm run build` → Pages).
4. Arreglar las rutas del service worker.

**Fase 2 · Calidad de código (3–5 días)**
1. Pasar a Tailwind 4 con `@tailwindcss/vite` y regenerar el CSS desde las clases (sustituye al CSS compilado). Integrar `overrides.css`.
2. Añadir ESLint, Prettier y TypeScript progresivo (empezando por `lib/`).
3. Renombrar las variables locales de las páginas clave (Dashboard, Módulos, Oficiales) conforme se toquen.
4. Carga perezosa de módulos y datos DELE. Objetivo: bundle inicial por debajo de 400 KB.

**Fase 3 · Producto (según el briefing)**
1. Backend de progreso por usuario (Cloudflare D1/KV) con XP, rachas y sincronización entre dispositivos.
2. Modelo freemium real: módulos 1–5, prueba de nivel y 1 ensayo DELE A1 gratis; el resto premium con Stripe (ya preparado en `v2`).
3. WeChat OAuth y CDN accesible desde China.
4. Medidor MCER y analítica (precisión, vocabulario dominado) a partir de los datos del SRS que ya existen.

## 4. Lo que ya está bien y conviene conservar

- Contenido bilingüe muy completo: 60 módulos, 80 modelos oficiales DELE y diccionarios ES–ZH por nivel.
- Motor SRS (cajas 0/1/3/7/14/30 días) y progreso por módulo, sencillos y fáciles de migrar a backend.
- Rutas con lazy-loading y un ErrorBoundary global.
- La rama `v2` ya resuelve el backend (Worker, Stripe, Clerk JWT). Lo ideal es **llevar el backend de v2 a la UI de v1**, no al revés.
