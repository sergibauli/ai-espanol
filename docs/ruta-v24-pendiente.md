# Ruta «Aprender» v24 · estado y tareas pendientes

Rama: `claude/ecstatic-cray-jv4rk0` (no publicado en main). Código: `src/pages/RutaPage.jsx`, `src/components/ruta/{geometria.js,Recorrido.jsx,Medallon.jsx,MundoRuta.jsx,mundos/*}`, `src/styles/v23-ruta-recorridos.css`, texturas `public/theme/ruta/` (generadas con `scripts/texturas-ruta.py`).

## Revisión externa (dos revisores independientes, solo capturas)
- Dirección de arte: **5,3/10** (antes 4,0). «Collage de vectores con sombra paralela, no una escena compuesta».
- UX de juego: **6,0/10** (antes 5,9). La lectura del progreso baja de 6 a 5.
- Objetivo: ≥ 9 en ambos, con revisores nuevos e independientes en cada ronda.

## Prioridad 1 (lo que más sube la nota)
1. Una sola gramática de camino por nivel en todas las unidades (las «nubes» de cada 3.ª unidad rompen el aprendizaje); nubes solo como transición entre unidades.
2. Camino anclado al terreno: base, sombra de contacto, oclusión con capas del fondo, extremos fundidos con niebla bajo el estandarte (muralla A1 y torre B2 flotan).
3. Tinta B1 de calidad: presión variable, dry brush, interior translúcido, oro fino solo en lo recorrido.
4. Iconos del medallón: grabado en oro / cloisonné monocromo o carácter caligráfico, no emojis.
5. Estandarte en móvil: título en 2 líneas con el chino debajo, lugar en línea propia sin duplicar, chip «0/2» dentro del rollo (hoy se corta).
6. «Empezar»: 50–55 % del ancho, pegado al nodo (≤ 12 px), icono propio, y que diga la lección («Empezar · Lección 1 … 开始»).
7. Examen de la unidad actual visible sin scroll; el examen aprobado con estado claro (sello 成 / copa).

## Prioridad 2
- Bloqueadas al 70–80 % del tamaño, bronce oxidado / candado chino de latón, desaturadas, sin plataforma decorativa; camino pendiente apagado y recorrido en oro.
- «Hecha»: sello rojo estampado con textura de tinta y tramo dorado.
- Etiquetas «Lección 1 · 第1课».
- Un solo Rey Mono en pantalla; el bocadillo «¡Hola!» nunca sobre el camino.
- `padding-bottom` = barra inferior + 24 px en móvil; fundido bajo las pestañas A1–B2.
- Marcas de agua de lugar (南京长江大桥…) al 3–4 % y fuera de la columna del camino; quitar sellos sueltos.
- Fondos de A1, A2 y B1 aún sin repintar (solo B2): luz clave por nivel con sombras proyectadas, niebla por bandas, viñetas integradas en planos (sin «pegatinas» flotantes), gradación de color por nivel.
- Recompensa visible: «+XP» en el examen, pestañas inactivas legibles.

## Verificación
Capturas con progreso sembrado (unidad 1 hecha, 2 actual) en 1366×860 y 390×844 de los cuatro niveles; `npm run build` sin errores; `prefers-reduced-motion`.

## v25 · Hecho en esta ronda
- **Fondos pintados** (A1, A2, B1, B2) con `scripts/fondos-ruta.py` (numpy/PIL, procedural y propio): tres planos raster
  (`public/theme/ruta/fondo-<N>-{lejos,medio,cerca}.webp`) con luz clave por nivel (A1 sol de invierno a la derecha,
  A2 atardecer a la izquierda, B1 luna, B2 mañana a la izquierda), caras en sombra, nieve, dunas con cresta, karst,
  perspectiva aérea, niebla por bandas y reflejos en el agua. `MundoRuta.jsx` los compone con parallax de scroll.
- **Animación del fondo**: niebla que deriva (`niebla-{blanca,arena,noche}.webp`), rayos de la luz clave, brillo del
  agua y `ParticulasRuta.jsx` (canvas: nieve en 3 profundidades; polvo, ráfagas y farolillos 孔明灯; lluvia, pétalos,
  ondas y luciérnagas; aves y hojas). Pausa fuera de pantalla y con la pestaña oculta, 30 fps y menos partículas en
  móvil, nada con `prefers-reduced-motion`. Se retiran los mundos SVG antiguos y las viñetas laterales.
- Camino: una sola forma por nivel; terreno bajo el camino con falda y sombra proyectada opuesta a la luz; bruma sobre
  el tramo pendiente; piezas de primer plano (oclusión); entrada fundida en niebla bajo el estandarte; banda de nubes
  como transición entre unidades. B1: boceto pálido en lo pendiente y tinta rica con 飞白 y pan de oro en lo recorrido.
- Medallones con cifra caligráfica (壹贰叁…) en vez de emojis; moneda del estandarte con pictograma propio; bloqueadas
  al 76 % con bronce apagado y candado chino de latón; «Clase N · 第N课»; Empezar con la clase («Empezar · Clase 1 /
  开始 第1课»), icono de pincel, ~50 % del ancho y a 10 px de la parada; encuadre inicial con la clase y el examen a la
  vista; examen con «+1 sello 印章» y estado «Aprobado 通过» con sello 成; estandarte móvil en dos líneas; un solo Rey Mono.

## v26 · Ronda 2 (camino y paisaje, una sola ilustración)
- El camino y su terreno se PINTAN en raster con el mismo pintor que el fondo: `node scripts/geometria-tramos.mjs`
  (exporta las curvas de `geometria.js`) y `python3 scripts/tramos-ruta.py` (usa las funciones de `fondos-ruta.py`:
  misma paleta, luz clave, grano, sombras proyectadas, perspectiva aérea y niebla). 48 tramos en
  `public/theme/ruta/tramos/<N>-v<0-2>-p<2|3>-f<150|120>.webp` (2,9 MB). Regenerar si cambian pasos o curvas.
- Formas sacadas del paisaje: A1 Gran Muralla en la cresta nevada con torres; A2 senda entre dunas (las dunas con la
  misma `cordillera(forma="duna")` del fondo); B1 puente de piedra en zigzag 九曲桥 de noche con islas, farolillos,
  reflejo y espuma; B2 escalones tallados en la caliza entre torres kársticas, bambú y bruma. 3 variantes por nivel.
- Examen con escala de jefe y 3 estados (bloqueado con candado y «Completa las clases · 0/2», abierto con brillo y
  «Gana el sello de <ciudad>», aprobado con sello 成 en la peana), según `getModuleProgress()[modulo-N].completed`.
- Medallones: bloqueadas en oro envejecido con la cifra atenuada y candado en la esquina; hechas con check de jade;
  etiquetas crema con texto marrón ≥ 12 px; la clase actual sin píldora (la anuncia «EMPEZAR 开始 · 5 lecciones ·
  ~50 min»). Sombras de medallones y pabellón al lado contrario de la luz del nivel; B1 sin rayos (luz de farolillos).
- Estandarte: «U2» bajo la moneda, barra segmentada (clases + examen) con «0/2 clases 课»; en móvil, compacto y fijo
  bajo las pestañas. Escritorio sin filetes rojos. Rey Mono más grande (100/140 px) con sombra de contacto.
