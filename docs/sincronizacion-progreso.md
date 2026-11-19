# Progreso con la cuenta (sincronización entre dispositivos)

El progreso del alumno se guarda en `localStorage` como siempre (mismas claves, mismo formato) y además en su cuenta:
el Worker lo guarda en KV como `progress:<userId de Clerk>`.

- Reglas y fusión (módulo puro): `src/lib/syncReglas.js`
- Motor del cliente: `src/lib/syncProgreso.js`. Se importa el primero en `main.jsx`. Intercepta `localStorage.setItem/removeItem`, así que no hay que tocar las páginas.
- Arranque por sesión: `SincronizadorProgreso` en `src/App.jsx`
- Indicador: `src/components/ui/EstadoGuardado.jsx` (menú lateral y cabecera de «Mi progreso»)
- Worker: `GET /progress` y `PUT /progress` en `worker/src/index.js`
- Pruebas: `npm run test:sync` (fusión) y `scripts/sync-e2e/` (Worker local + dos navegadores)

## Inventario de claves

### Se sincronizan (progreso del alumno)

| Clave | Qué es | Cómo se fusiona |
|---|---|---|
| `dele_module_progress`, `dele_class_progress` | Unidades y clases (`modulo-N`, `modulo-N#cK`) | Unión por id. Cuenta como completada si lo está en cualquiera de los dos; se queda la mejor nota y la última visita |
| `ai-espanol:game-v1` | XP, XP diaria, lecciones, insignias, vidas, meta | **XP, `perfect` y XP diaria: suma de los avances** de cada dispositivo desde su última sincronización (cada dispositivo guarda una «base»). Lecciones: unión, con el mejor `best`. Insignias: unión. Meta: la cambiada. Vidas: las del lado más reciente |
| `ai-espanol:active-days` | Racha | Unión de días, ordenada (últimos 400) |
| `dele_srs_v1` | Tarjetas de repaso | Por tarjeta (palabra normalizada), la de `lastReview` más reciente; las bajas no resucitan |
| `dele_favorites` | Favoritos | Unión por palabra; las bajas no resucitan |
| `dele_guia_visto_<N>` | Fichas de teoría vistas | Unión; desmarcar cuenta como baja |
| `dele_pron_oidas`, `dele_pron_dominadas`, `dele_pron_perfectas`, `dele_visited_silabas`, `dele_tv_vistos` | Conjuntos de pronunciación y TV | Unión |
| `ai-espanol:dele-v1` | Respuestas, errores y tareas por destreza (Mi progreso) | Unión por momento `t`. En los errores se queda el mayor número de repasos. Se mantienen los límites de la app (1500, 400 y 200) |
| `ai-espanol:exam-history` | Historial del generador de exámenes | Todos los intentos (los 50 más recientes) |
| `oficial_res_<nivel>_<modelo>` | Resultado de modelos oficiales | Arriba queda el último resultado, que es lo que lee la página. Se añaden `intentos` (todos) y `mejor` (la mejor nota). Si la página reescribe el resultado al corregir otra prueba del mismo examen en menos de 3 h, cuenta como el mismo intento |
| `dele_tv_progreso`, `memory_best` | Mapas `{clave: número}` | El mayor por clave |
| `dele_<juego>_record_*`, `ahorcado_best`, `apalabrados_best`, `scramble_best`, `kahoot_beststreak` | Récords | El máximo. En `dele_escape_record_*` y `dele_mahjong_*_record_*` (tiempo) gana el mínimo |
| `ai-espanol:onboarded`, `ai-espanol:tutor-level`, `dele_mahjong_tutorial_visto`, `dele_pizarra_notes`, `dele_clase_actual_<N>`, `dele_mapa_mental_m<N>_<c>` | Indicadores, preferencias del alumno y textos suyos | Gana el último que se escribió |

**XP: por qué la suma de avances y no el máximo.** Con el máximo, si el alumno gana 50 XP en el móvil y 30 en el ordenador sin conexión, se pierden 30. Con la suma de los avances se cuentan los 80 y no se duplica nada, porque cada dispositivo solo aporta lo ganado desde su última sincronización. Si un dispositivo entra por primera vez con progreso propio (no tiene base), se suma todo, porque es estudio distinto.

**Bajas.** En las colecciones donde se puede quitar algo (favoritos, SRS y fichas vistas) se guardan los últimos 600 eventos de alta y baja por clave, con su fecha. Así un favorito borrado en el móvil no vuelve desde el ordenador. Si una página con datos viejos reescribe la lista sin los elementos que acaban de llegar de otro dispositivo, eso no cuenta como baja.

### No se sincronizan (se quedan en el dispositivo)

| Clave | Motivo |
|---|---|
| `ai-espanol:ia-cache-v1`, `dele_ai_gen_cache_v1`, `dele_chat_cache_v1`, `dele_generated_content_v1` | Cachés de IA y contenido generado |
| `ai-espanol:conv-*` (sessionStorage), `dele_chat_history_v1` | Conversaciones |
| `ai-espanol:ia-semana`, `dele_tokens_used`, `dele_tokens_date` | Cuota local de IA. La cuota real la cuenta el Worker |
| `ai-espanol:campus-demo-v1`, `ai-espanol:campus-demo-role` | Campus en modo demo |
| `ai-espanol:banco-cola` | Cola de envío al servidor |
| `ai-espanol:cielo`, `ai-espanol:idioma-ayuda`, `dele_sound_enabled`, `dele_music_enabled`, `dele_pizarra_open/width/pos`, `dele_mahjong_disposicion`, `ofx_open`, `ai-espanol:games-recent` | Preferencias de este dispositivo. El idioma de ayuda va por dispositivo: un alumno puede tener el móvil en chino y el portátil en inglés |
| `dele_oficial_borrador_*` | Examen a medias en este navegador (se borra al terminar) |
| `dele_auth`, `dele_expiry` (sessionStorage) | Sesión del admin local |
| `ai-espanol:ruta-vista:*`, `ai-espanol:unidades-nivel`, `ud-puertas-*`, `pv_puertas`, `mono-fab-pista` (sessionStorage) | Estado de la sesión |
| `ai-espanol:sync-*` | Estado interno de la sincronización |

Una clave nueva solo se sincroniza si se añade a `REGLAS` en `syncReglas.js`. El Worker rechaza cualquier otra.

## Cómo funciona

1. **Al entrar con Clerk**: descarga la cuenta (`GET /progress`), fusiona clave a clave y sube solo lo que cambia (`PUT /progress` con la revisión descargada). Si otro dispositivo subió entre medias, el Worker responde 409 y el cliente vuelve a descargar y fusionar. Si llegan datos de la cuenta, las páginas se vuelven a montar una vez para mostrarlos.
2. **Después**: cada escritura en una clave de progreso queda pendiente, con su fecha, en `ai-espanol:sync-meta`. Se sube 8 s después del último cambio, como mucho una vez cada 45 s, y también al ocultar la pestaña (`visibilitychange` o `pagehide`, con `keepalive`). Al volver a la pestaña se descarga si han pasado más de 60 s.
3. **Sin conexión**: lo pendiente se guarda en local. Se reintenta a los 5 s, 15 s, 60 s y 180 s, y también con el evento `online`. El indicador muestra «Sin conexión, se guardará luego · 离线，稍后保存».
4. **Migración**: el progreso que ya hay en el navegador, sin dueño, lo adopta el primer alumno de Clerk que entra y se sube a su cuenta.
5. **Varias cuentas en un navegador**: `ai-espanol:sync-meta.owner` guarda de quién es lo local. Si entra otro alumno, lo del anterior se aparta en `ai-espanol:sync-stash:<id>` (con lo que tuviera pendiente) y se carga lo del nuevo. Al volver el anterior, recupera lo suyo y lo pendiente se sube. Lo que se estudie sin sesión se queda con el último dueño.
6. **Admin local (`admin/314159`) y sin `VITE_API_URL`**: no se hace ninguna petición y el indicador no aparece. El admin no adopta el progreso sin dueño.

Límites: 300 KB por clave, 2 MB por alumno y 3000 claves.

## Despliegue

### GitHub (Pages)
`.github/workflows/deploy.yml` ya pasa `VITE_API_URL: ${{ vars.VITE_API_URL }}`. Hay que crear la **variable** (no un secreto) en
*Settings → Secrets and variables → Actions → Variables → New repository variable*:

- `VITE_API_URL` = URL del Worker sin barra final, p. ej. `https://ai-espanol-campus.<subdominio>.workers.dev`

Con la variable vacía, la web sigue funcionando solo en local, como ahora. Ojo: con `VITE_API_URL` el Campus deja el modo demo y usa el Worker.

### Worker
```bash
cd worker
npx wrangler deploy
```
- El binding KV `CAMPUS` ya está en `wrangler.toml`; el progreso usa el mismo namespace (claves `progress:*`), no hace falta otro.
- `CLERK_ISSUER` en `wrangler.toml` tiene que ser la instancia de Clerk que usa la web: la de `pk_test` ahora, la de producción si se pasa a `pk_live`.
- `ALLOWED_ORIGINS` ya incluye `https://sergibauli.github.io`.
- El Worker importa `../src/lib/syncReglas.js`; `wrangler deploy` lo empaqueta solo.
- Los endpoints de progreso no necesitan `CLERK_SECRET_KEY`, pero el resto del Worker sí.
- **Cuota de KV:** el plan gratuito permite 1000 escrituras al día en toda la cuenta. Cada subida es una escritura y un alumno estudiando sube como mucho una vez cada 45 s, es decir, unas 40 escrituras por media hora. Con pocos alumnos basta. Con más, hace falta el plan Workers Paid (5 $/mes, 1 millón de escrituras).
- KV tiene consistencia eventual entre regiones (hasta unos 60 s). El control de revisión evita casi todos los conflictos. Si dos dispositivos del mismo alumno suben a la vez desde regiones distintas, la revisión 409 puede no detectarlo y se perdería la última subida de uno, aunque lo local de ese dispositivo se conserva. Si hiciera falta, la solución es un Durable Object por alumno.

## Pruebas
```bash
npm run test:sync
```
Extremo a extremo (Worker local, emisor de tokens de prueba en lugar de Clerk, app en dos contextos de Playwright):
```bash
node scripts/sync-e2e/emisor-tokens.mjs &
(cd worker && npx wrangler dev --local --port 8787 --var CLERK_ISSUER:http://127.0.0.1:8790) &
VITE_API_URL=http://127.0.0.1:8787 VITE_SIN_CLERK=1 npx vite --port 5173 &
node scripts/sync-e2e/dos-dispositivos.cjs /tmp
node scripts/sync-e2e/sin-conexion.cjs /tmp
```
