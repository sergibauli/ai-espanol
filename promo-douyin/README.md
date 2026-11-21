# Vídeo promocional de Douyin · Wukong Español · 悟空西语

Vídeo vertical 1080×1920, 30 fps, ~78 s, H.264 + AAC (−14 LUFS), con voz femenina en chino (Fish Audio) y música original estilo Douyin (sintetizada aquí, sin derechos de terceros). El vídeo final publicado está en `public/video/promo-douyin.mp4` (página `#/promo`).

Todo se genera con código: una página Three.js pinta cada fotograma (móvil 3D, fondo animado, textos), Chromium sin pantalla hace la captura y ffmpeg monta el MP4 con el audio.

## Para continuar en otra sesión (otra persona / otra cuenta de Claude)

```sh
cd promo-douyin
npm install                                   # three, fuentes, qrcode
sh herramientas/empaquetar-capturas.sh unpack # recrea capturas/ desde capturas-mp4/ (grabaciones reales de la app)
sh herramientas/preparar-recursos.sh          # fotogramas de los vídeos de la portada
node audio/musica2.mjs                        # música → audio/musica2.wav
node herramientas/servidor.cjs 8765 &         # servidor estático (raíz = repo)
```

Voz (opcional; las frases están en `audio/locucion.json`). Necesita una clave de Fish Audio **solo como variable de entorno** (nunca en el repo) y acceso de red a `api.fish.audio`:

```sh
NODE_USE_ENV_PROXY=1 VOICE=5c353fdb312f4888836a9a5680099ef0 FISH_KEY=... node audio/voz-fish.mjs
MUSICA=musica2.wav TEMPO=1.0 node audio/mezcla.mjs larga   # → audio/mezcla.wav (voz + música, la música baja al hablar)
```

Render y montaje:

```sh
# fotogramas (~1–2 s cada uno; repartir el rango entre 4 procesos en paralelo)
N=$(node -e "import('./tiempo.mjs').then(m=>console.log(Math.ceil(m.DURACION*30)))")
node herramientas/render.cjs 0 $N fotogramas5
sh herramientas/montar.sh fotogramas5 audio/mezcla.wav salida/wukong-espanol-douyin.mp4
```

Trabajo por escenas (recomendado para iterar): `sh herramientas/escena.sh <id_seccion> <n>` genera `salida/escenas/<n>_<id>.mp4` solo con esa escena y su audio. Fotogramas sueltos para revisar: `node herramientas/vistazo.cjs index.html /tmp/x 12.5 30.0` (desde `film/`).

## Estructura
- `tiempo.mjs`: 130 BPM y la lista de secciones en compases (1 compás = 1,846 s). Cambiar aquí la duración de una escena mueve música e imagen a la vez.
- `film/guion.js`: las escenas (`ESC.<id>`). Las de la app usan `escenaVideo({ seq, tramos, tit, es, sub, chips, tarjetas })`: reproduce tramos de una grabación real dentro del móvil 3D y saca recortes de la pantalla en 3D (`tarjetas`). El bucle `window.pintar` añade cámara (dolly, deriva, pulso en cada compás), transición lateral entre escenas y gradación de color.
- `film/motor.js`: Three.js (móvil con material dorado y reflejos, pantalla con shader, fondo, partículas, decorado 3D: mandala, farolillos, fichas, focos, dragón; `sacarTarjeta`).
- `film/capa.js`: textos animados (DOM) y efectos 2D (tinta, barrido de luz, velocidad, grado de color).
- `film/material.js`: qué grabación/captura usa cada escena y las cifras reales (90 unidades, 88 modelos, 17 juegos, 7 idiomas).
- `herramientas/grabar-app.mjs`: graba la app real (necesita `npm run dev` en la raíz, puerto 5173) a 30 fps en `capturas/v2/<nombre>/`; `node herramientas/grabar-app.mjs <nombre…>`.
- `audio/musica2.mjs` (música), `audio/locucion.json` (guion de voz con segundos), `audio/mezcla.mjs`.

## Reglas del dueño
- No deben aparecer «DELE» ni «IA/AI» en el vídeo (el sello de IA de la TV se oculta al grabar).
- Textos en chino simplificado, tono Douyin; ejemplos en español correcto.
- Un solo QR (WeChat) + URL + precio ¥39 en el cierre.
- Al publicar en Douyin: activar la etiqueta «内容由AI生成» (voz sintética y serie generada).
- Enseñar las escenas por partes para su aprobación antes del render completo.
