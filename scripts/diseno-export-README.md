# AI Español · Pantallas actuales para rediseño

Este paquete contiene **todas las pantallas actuales** de la web AI Español (https://sergibauli.github.io/ai-espanol/), para que un experto en diseño las mejore. Después, el equipo de desarrollo implementará en la web real los diseños mejorados.

## Qué es la app
- PWA educativa para que **estudiantes chinos aprendan español** y preparen el examen oficial **DELE (A1–B2)**.
- Todo texto visible es **bilingüe: español + chino simplificado** (por ejemplo «Iniciar sesión · 登录»). Hay que mantenerlo en los rediseños.
- Uso principal en **móvil** (alumnos en China), también en escritorio.
- Mascota: el **Rey Mono** (Sun Wukong en versión chibi propia, 6 poses en `recursos/public/mono/`). No usar personajes con copyright ni estilo Duolingo.

## Contenido de la carpeta
| Carpeta | Qué hay |
|---|---|
| `index.html` | Galería: abre esto primero. Muestra cada pantalla con sus capturas y el enlace a su HTML. |
| `html/NN-nombre.html` | Cada pantalla como **HTML estático autónomo**: el DOM ya renderizado con todo su CSS dentro. Se abre directamente en el navegador (sin JavaScript, sin servidor). Las animaciones CSS siguen funcionando; los lienzos (`canvas`) de los juegos son imágenes fijas. |
| `capturas/escritorio/` | Captura de página completa a 1366 px de ancho (JPG). |
| `capturas/movil/` | Captura de página completa a 390 px (iPhone, ×2, JPG). |
| `recursos/` | Imágenes y texturas que usan los HTML (papel, cielo nocturno, dragones, nubes, rodillos, Rey Mono…). |
| `pantallas.json` | Lista de pantallas: id, título y ruta en la app. |

## Estética actual («imperial china sobre pergamino»)
Se puede llevar mucho más lejos, pero conviene conservar la identidad:
- **Laca roja** `#c8102e` / oscura `#8f0c21`
- **Oro** `#f2c14e` / oscuro `#c8961e`
- **Tinta** `#3b2416` (texto sobre pergamino), marrón secundario `#6b4a2b`
- **Pergamino** (`recursos/public/theme/papel.jpg`, tonos `#fbf1dc` – `#efd9ad`) sobre **cielo nocturno** (`noche-tile.jpg`, `#0e1a33`)
- **Jade** `#2f8f52` / `#1d6339` como color de éxito y acentos
- Filetes dobles dorados, sellos rojos con caligrafía (STKaiti / KaiTi), rodillos de pergamino, nubes doradas, dragones
- Tipografías (Google Fonts): **Cinzel** (títulos imperiales), **Unbounded** (titulares grandes), **Plus Jakarta Sans** (interfaz), **Source Serif 4** (textos de lectura), **JetBrains Mono** (números); chino con STKaiti/KaiTi para lo caligráfico y la fuente del sistema para el resto.

## Mapa de pantallas (orden del recorrido de un alumno)
1. **Portada y acceso** (01–02). Solo se puede iniciar sesión; no hay registro libre.
2. **Ruta de aprendizaje** (03–06): un mapa-camino por nivel, cada uno con su mundo (A1 Pekín nevado, A2 Ruta de la Seda, B1 Suzhou/Shanghái de noche, B2 Guilin/Tíbet). Cada unidad se divide en **clases de ~50 min**: monedas = clases, cofre = examen de la unidad.
3. **Unidades** (07) y **dentro de una unidad** (08–11): selector de clase, guía de teoría, lecciones, diálogos, ejercicios, juegos, palabras, lectura y cultura, examen de la clase.
4. **DELE** (12–19): elegir nivel, modelos de examen, examen oficial completo (lectura, audición con transcripción por voces, escritura, oral), práctica y generador de exámenes.
5. **Panel del alumno** (20–21): Mi DELE (probabilidad de aprobar, plan semanal, errores) y diagnóstico de nivel.
6. **Juegos** (22–29): hub y juegos (Mapa mental, Teatro de diálogos, Dragón de jade, Escape del palacio, Kahoot, Memory, Ahorcado…).
7. **Herramientas** (30–39): diccionario, pronunciación, repaso espaciado, tutor IA, examinador oral, gramática, consejos, ayudas, vídeos, audición de acentos.
8. **Presentación** (40).

## Restricciones para que el diseño se pueda implementar
- La app es **React 19**. Puedo traducir cualquier HTML/CSS a sus componentes, pero el contenido es **dinámico** (90 unidades, 193 clases, 88 exámenes): diseña **plantillas** que funcionen con textos largos y cortos, en español y chino, no maquetas con un texto concreto.
- **Móvil primero**: 390 px sin scroll horizontal, botones táctiles ≥ 44 px, barra inferior de navegación fija en móvil y menú lateral en escritorio.
- **Contraste AA** (texto ≥ 4,5:1). Ya hubo problemas de texto blanco sobre pergamino: evítalo.
- Animaciones: preferentemente CSS/SVG (transform/opacity), 60 fps en móvil medio, con alternativa para `prefers-reduced-motion`.
- Imágenes nuevas: bienvenidas, pero optimizadas (WebP/SVG); la web se usa con conexiones lentas.

## Formato de entrega ideal (para implementarlo rápido)
Por cada pantalla rediseñada:
1. Un **HTML + CSS** autónomo con el mismo nombre de fichero que el original (por ejemplo `08-unidad.html`), con CSS limpio en un `<style>` o `.css` aparte, clases con nombres claros y los estados (hover, activo, correcto/incorrecto, vacío, cargando).
2. Las **imágenes nuevas** en una carpeta `recursos-nuevos/`.
3. Si hay un **sistema de diseño** común (colores, tipografías, botones, tarjetas, sellos, insignias), un `sistema-diseno.html` + `.css` con los componentes y sus variables CSS: es lo que más acelera la implementación en todas las pantallas a la vez.
4. Notas breves de comportamiento y animación (qué se anima, cuándo, duración).
- `capturas/*/09-…-pantalla.jpg`, `11-…-pantalla.jpg` y `15-…-pantalla.jpg`: vista de pantalla de la lección, el examen de la clase y la audición DELE (paneles que en la captura de página completa salen pequeños).
