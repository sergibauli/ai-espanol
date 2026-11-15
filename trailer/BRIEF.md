# Tráiler Douyin de AI Español · brief común para todas las escenas

**Qué es.** Vídeo promocional vertical (1080×1920, 30 fps, 42 s) para Douyin de *AI Español* (AI 西班牙语): web app para que
estudiantes chinos aprendan español y preparen el DELE A1–B2. Público: jóvenes chinos. El dueño quiere que sea
**espectacular, cinematográfico, con gráficos 3D y efectos impactantes**, muy por encima de un pase de diapositivas.
Nivel de referencia: tráiler de videojuego / anuncio de app premium. Cada segundo tiene que tener movimiento con intención.

## Cómo funciona el proyecto (carpeta `/home/user/ai-espanol/trailer`)
- Cada escena es UN fichero `src/scenes/<id>.js` con `export default { async setup(root, kit) {…}, async update(t, kit) {…} }`.
  - `setup` se llama una vez: `root` es un `<div>` de 1080×1920 (position absolute, overflow hidden). Construye ahí DOM, lienzos 2D y/o Three.js.
  - `update(t)` pinta el fotograma del segundo `t` **local** de la escena (0…duración). Puede ser async (p. ej. esperar un fotograma de clip).
- **Determinismo absoluto**: el vídeo se renderiza fotograma a fotograma y en trozos paralelos, en cualquier orden. `update(t)` debe ser
  **función pura de t**: prohibido Math.random(), Date.now(), performance.now(), requestAnimationFrame, setTimeout, transiciones/animaciones CSS,
  `<video>`, estado acumulado entre fotogramas (nada de `x += v`). Aleatoriedad → `kit.rng(semilla)` en setup. Partículas → posición = f(semilla, t).
- `src/kit.js` (léelo entero, es corto): paleta `PAL`, fuentes `FONT`, `SAFE`, easings, `prog/remap/spring/noise1/rng`, `sequence()` para clips,
  `makeThree()`, `phoneMesh()` (móvil 3D con captura), `canvasTexture/glowTexture/loadTexture`, `el/canvas2d/splitChars`, `fontReady`.
  Three.js 0.187 está instalado (`kit.THREE`; puedes importar `three/addons/...`: EffectComposer, UnrealBloomPass, RoundedBoxGeometry, TextGeometry no tiene fuentes CJK → para texto 3D usa texturas de canvas o DOM con transform 3D).
  **No modifiques kit.js, engine.js, timeline.js ni ficheros de otras escenas.** Si necesitas un helper, ponlo en tu fichero.
- El motor (engine.js) ya pone encima: un **destello dorado en cada corte** (±0,25 s), viñeta y grano de película. Por eso:
  **no hagas fundidos a negro ni de entrada ni de salida**; tu escena debe estar llena de imagen desde t=0 hasta el último fotograma, entrar ya en movimiento y salir acelerando/creciendo en luz hacia el corte.
- Texto en canvas/WebGL: antes de pintarlo `await kit.fontReady('900 80px "Noto Serif SC"', texto)` (las fuentes chinas cargan por subconjuntos).
- Rendimiento: se renderiza con WebGL por software (SwiftShader). Objetivo < 1,5 s por fotograma. Bloom (UnrealBloomPass) permitido con moderación; evita miles de luces, sombras dinámicas caras y shaders muy pesados.

## Probar (obligatorio, varias rondas)
El servidor de desarrollo ya está en marcha en http://localhost:5180 (no lo reinicies; si no responde: `cd /home/user/ai-espanol/trailer && (nohup npx vite --port 5180 --strictPort >/tmp/trailer-vite.log 2>&1 &)`).
```bash
cd /home/user/ai-espanol/trailer
node tools/frames.mjs --scene <id> --t 0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5 --out /tmp/claude-0/-home-user-ai-espanol/449dc1a6-6fbf-56e2-91f1-a409245168d7/scratchpad/<id> --sheet /tmp/claude-0/-home-user-ai-espanol/449dc1a6-6fbf-56e2-91f1-a409245168d7/scratchpad/<id>/sheet.jpg
```
Genera JPG 1080×1920 por cada t y una hoja de contactos. **Mira la hoja y también fotogramas a tamaño completo con la herramienta Read**, critica
con dureza (¿es impactante?, ¿se lee el texto en 1 s?, ¿hay zonas muertas?, ¿algo cortado o solapado?, ¿se ve barato?) y mejora. Mínimo 4 rondas de mejora.
Comprueba la continuidad de movimiento mirando fotogramas consecutivos (p. ej. --t 1.0,1.033,1.066,1.1). Mira siempre t=0 y el último fotograma (duración−0.034).
Errores de consola salen en la salida de frames.mjs (PAGEERROR/CONSOLE): corrígelos todos.

## Dirección de arte (no inventar otra estética)
- Mundo: China imperial fantástica + España. Laca roja `#c8102e/#8f0c21`, oro `#f2c14e/#c8961e/#ffe9a8`, noche azul `#0b0f2a`, tinta, pergamino, jade.
  Nubes auspiciosas (祥云), linternas, sellos rojos con caligrafía, filetes dorados, rayos de luz, partículas doradas, tinta que se expande.
- Mascota: el **Rey Mono** (assets/mono/*.png con fondo transparente: saluda, guino, serio, poder, feliz, trofeo; assets/theme/portada-v2-mono.webp). Nunca otros personajes.
- **Como mucho UN dragón en pantalla en todo momento. Nunca dos dragones** (era el fallo del tráiler anterior).
- Tipografía: chino = protagonista (titulares con `FONT.zhBrush` o `FONT.zhSerif` 900; apoyo `FONT.zhSans`). Español = `FONT.latinDisplay` (Cinzel Decorative, como la web) y cifras con `FONT.latinMod`.
  Titulares ENORMES (120–260 px), con oro metálico (degradados, bisel, brillo que barre), contorno/sombra para legibilidad sobre cualquier fondo. Pocas palabras por pantalla.
  Cada texto debe permanecer legible ≥ 0,8 s. Escribe el chino EXACTAMENTE como se da en tu encargo (no inventes ni traduzcas tú otras frases; no añadas cifras ni afirmaciones nuevas como «gratis»).
- Zona segura Douyin (`kit.SAFE`): texto y elementos clave entre y=230 y y=1480, y x entre 70 y 930. Fuera de eso solo fondo/ambiente (pero el fondo llena todo el 1080×1920).
- Movimiento: cámara viva (travelling, parallax, giro 3D, micro-temblor en impactos), entradas con muelle/overshoot, golpes de ritmo cada 0,5 s (120 BPM: los impactos
  importantes en múltiplos de 0,5 s), estelas, destellos, profundidad con capas. Nada de simples fundidos de opacidad.
- Recursos (en `public/assets/`, úsalos con `kit.asset('…')`): `theme/` (dragon.png, dragon-enroscado.png, nube-oro.png, rodillo.png, papel.jpg, noche-tile.jpg, montes-tinta.png,
  sello-monedas.png, disco-jade.png, jade.png, lazo-oro.png, mapa-china.webp, portada-v2-fondo.jpg, portada-v2-dragon.webp, pergamino-dialogo.webp…), `mono/`, `icons/icon-512.png` (icono de la app),
  `screens/*.jpg` (capturas reales de la app, 1170×2532), `seq/<clip>/NNNN.jpg` (fotogramas de los clips animados; ver `kit.SEQ`). Mira las imágenes con Read antes de usarlas.
  Puedes generar más recursos propios (SVG, canvas, recortes con Python/PIL) y guardarlos en `public/assets/<id-escena>/`. No descargues imágenes de Internet.
- Capturas extra de la app real: `node tools/capture.cjs <dir> /ruta1 /ruta2` (app servida en http://localhost:5173; rutas en /home/user/ai-espanol/src/App.jsx; `CLICK="Texto"` para pulsar algo). No toques el código de la app.
- Usa la skill `frontend-design:frontend-design` (herramienta Skill) al empezar para fijar el criterio de diseño.

## Entrega
Tu fichero de escena terminado y probado, y un resumen de 5–8 líneas: qué se ve segundo a segundo, en qué instantes hay impactos fuertes (para sincronizar el sonido), tiempo medio por fotograma y cualquier pega pendiente.
