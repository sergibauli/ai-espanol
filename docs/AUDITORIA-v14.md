# Auditoría de calidad v14 · AI Español

Fecha: 13-11-2026. Recorrido automático de 43 rutas de `src/App.jsx` a 1366×860 y 390×844 (Playwright, sin login), con capturas, errores de consola, desbordamiento horizontal, colores del tema antiguo (azul/morado), botones < 40 px y textos < 11 px. Después, revisión manual de las capturas.

Ninguna ruta tiene scroll horizontal a 390 px. Los fallos, ordenados por impacto para el alumno:

| # | Impacto | Dónde | Hallazgo | Bloque |
|---|---|---|---|---|
| 1 | Alto | `/oficial/:nivel/:id` | Con un id no numérico (`/oficial/A1/a1-1`) la página **revienta** (`Cannot read properties of null (reading 'pruebas')`) y se queda en blanco. En móvil, las pestañas de las 5 pruebas parten las palabras con guiones («Com-pren-sión») y no se leen bien. | B |
| 2 | Alto | 8 juegos antiguos del hub (`/juegos/ruleta`, `ahorcado`, `memory`, `sopa`, `scramble`, `kahoot`, `apalabrados`, `uno`) | Pantalla de elección con fondo azul marino del tema antiguo, subtítulo («Selecciona un módulo…») oscuro sobre oscuro e ilegible, iconos con degradados azul/morado/rosa (26–53 elementos del tema antiguo por pantalla). | A |
| 3 | Alto | Juegos abiertos desde una clase | Hay que confirmar que usan solo el contenido de esa clase (`contenidoJuego.js`, `juegos-utils.js`). | A |
| 4 | Alto | `/examenes-nivel/:nivel` y `ExamDetailPage` | 160 elementos del tema antiguo: sello «DELE» morado, tarjetas A2/B1/B2 con degradados azul y morado, icono verde esmeralda; pestañas Vocabulario/Audición/Escritura/Ejercicios en morado/azul. 355–400 textos < 11 px. | B |
| 5 | Medio | `/enjambre` | Pantalla entera del tema neón antiguo (fondo negro, botón cian-morado, sin menú imperial). | C |
| 6 | Medio | `/videos`, `/gramatica`, `/consejos`, `/ayudas`, `/audicion` | Solo la cabecera es imperial: el cuerpo es blanco liso, con botones rosa pálido (Vídeos), chips azul/morado (Gramática), iconos de colores (Consejos). Vídeos tiene 30–45 botones < 40 px. | C |
| 7 | Medio | `/diccionarios` | 64 botones < 40 px en escritorio, 37–43 textos < 11 px. | C |
| 8 | Medio | Unidad (`/modulos/modulo-N`) | Iconos de juegos de la unidad (`unit-game-icon`) en azul/morado. | A |
| 9 | Medio | `scripts/build-clases.mjs` | Reparto de vocabulario con casos raros («Hola» de la unidad 1 cae en la clase 2) y títulos de clase demasiado largos. | D |
| 10 | Medio | `/juegos/mapa-mental` | Ramas verbos/sustantivos/adjetivos/expresiones deducidas por reglas: falla con palabras concretas. | D |
| 11 | Bajo | Código muerto | Campus, Profesores, HomePage, ModulosPage y `pages/modulo/Modulo*.jsx` sin ruta propia. | E |
| 12 | Bajo | `public/overrides.js`, `lightAdapter.js` | Parches DOM heredados que aún se cargan en cada página. | E |
| 13 | Seguridad | `lib/auth.jsx`, claves DeepSeek | Admin `admin/314159` y clave de DeepSeek en el navegador (ver `ANALISIS.md`). | E |
| 14 | Pendiente externo | Unidades 81–90 | Sin traducciones a los otros idiomas de ayuda ni audio del profesor: requieren las claves de DeepSeek y Fish Audio, que no hay en este entorno. **No se simula.** | — |

Rutas que la otra sesión («Dirección de diseño») está rehaciendo y que no se tocan aquí: `/`, `/ruta`, portada, login.

## Estado (14-11-2026)

Publicado en main: hallazgos 1–13 salvo el 13 (seguridad), que queda propuesto.

Pendiente y anotado:
- Seguridad: el acceso `admin/314159` y la bandera `dele_auth` en sessionStorage permiten entrar sin Clerk. Arreglo propuesto: quitar el login local y usar `publicMetadata.role = "admin"` de Clerk validado en el Worker. No se aplica para no cortar el acceso actual.
- Clases con muy pocas palabras para algunos juegos (19 en Ruleta, 15 en Memory, U47 c2 en Kahoot): ampliar vocabulario.
- Clases con todas las palabras del mismo tipo: el Mapa mental no ofrece «ramas»; propuesta: abrir en modo parejas.
- U36 «Posición de los pronombres» sin explicación en chino; 155 audios del profesor y 141 de voz femenina por generar; unidades 81–90 sin traducciones ni audio (requieren DeepSeek y Fish Audio).
- Resultados de Ruleta, Ahorcado, Memory, Sopa, UNO, Apalabrados y Scramble no revisados en captura; dibujo del Ahorcado tenue; animaciones de canvas no respetan `prefers-reduced-motion`.
- `LearningImpactScene.jsx` con sello «DELE» morado; chip B2 morado en Diccionario; `CorrectionDisplay` con estilos antiguos.
- Fases con IA (Enjambre, corrección del Generador y de exámenes) no verificables sin DeepSeek.
