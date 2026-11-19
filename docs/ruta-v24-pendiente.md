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
