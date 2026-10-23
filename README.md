# AI Español · Preparación DELE (v3)

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


## Novedades v3 (23-10-2026)

- **Diseño v3** (`src/styles/modern.css`): nuevo Inicio con racha real, ruta por niveles y próxima clase; navegación bilingüe.
- **80 módulos** (61–80 nuevos, A2–B2: trabajo, correos formales, debate, medios, gastronomía, fiestas, por/para, ser/estar, pasiva, negocios China–mundo hispano, preparación DELE…).
- **Pestaña Descubre** en cada módulo (`src/data/plus/`): objetivos, lectura con preguntas, errores típicos de sinohablantes, frases útiles, cultura comparada con China, pronunciación, huecos y reto final.
- **Exámenes automáticos** (`src/lib/examGenerator.js`): generador en `#/examenes/generador` y pestaña *Examen* en cada módulo. Mezcla miles de preguntas, cronómetro, nota por destrezas, explicaciones en chino, enlace compartible y "asignar como deberes".
- **Campus en directo** (`#/campus`): clases por Tencent Meeting (botón activo 15 min antes), calendario semanal, deberes con entrega y corrección, alumnos/profesores y solicitudes. Roles: admin ve todo, profesor lo suyo, alumno lo suyo.
- **Página comercial** (`#/profesores`, pública): profesores nativos y chinos, packs y formulario de clase de prueba. Precios en `src/data/oferta.js`.

El contenido nuevo se generó con DeepSeek y se revisó con validaciones automáticas.
Para regenerar el índice ligero de módulos: `node scripts/build-catalog.mjs`.

## Activar el Campus real (sin esto funciona en modo demo, con datos solo en el navegador)

1. Clerk → API keys: copia la *Secret key*.
2. Cloudflare (cuenta gratuita):
   ```bash
   cd worker
   npx wrangler login
   npx wrangler kv namespace create CAMPUS      # pega el id en wrangler.toml
   npx wrangler secret put CLERK_SECRET_KEY
   npx wrangler secret put ADMIN_EMAILS         # tu email (y el de otros admins)
   npx wrangler secret put DEEPSEEK_API_KEY     # clave de DeepSeek para el tutor IA (nunca llega al navegador)
   npx wrangler deploy                          # te da la URL https://ai-espanol-campus.<tu>.workers.dev
   ```
3. Compila la web con esa URL: `VITE_API_URL=https://ai-espanol-campus.<tu>.workers.dev npm run build`.
4. En el Campus (como admin) da de alta a los profesores con el email de su cuenta. Los alumnos aparecen solos al iniciar sesión por primera vez; asígnales profesor y plan.

Workers.dev puede ir lento desde China; si pasa, añade un dominio propio al Worker.

## Clave de DeepSeek (tutor IA, correcciones, generador IA)

Todas las llamadas pasan por `src/lib/deepseekClient.js`:
- **Con el Worker desplegado** (`VITE_API_URL`): la clave vive en el Worker (`DEEPSEEK_API_KEY`) y la web llama a `/ai/chat`,
  con cuota diaria (200 por usuario con sesión, 20 por IP sin sesión). Es la opción segura.
- **Sin Worker**: añade el secreto `DEEPSEEK_API_KEY` en GitHub (Settings → Secrets → Actions). El build lo inyecta cifrado con
  una sal aleatoria: no aparece en claro en el código publicado ni lo detectan los bots que buscan `sk-…`, pero alguien con
  conocimientos puede recuperarlo desde el navegador. Úsalo solo como solución temporal y con una clave con poco saldo.
