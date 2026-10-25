---
name: corrector-dele
description: Corrige textos escritos y transcripciones orales de estudiantes chinos de español según los criterios del DELE (A1–B2) - nota orientativa por criterio, errores marcados con su corrección y explicación en chino, y consejos para subir de nivel. Úsala cuando el usuario pegue una redacción o una respuesta oral para corregir, o pida integrar o mejorar la corrección de la app.
---

# Corrector DELE

La nota es orientativa: no sustituye a un examinador acreditado (dilo siempre). Si el usuario aporta las escalas oficiales del Instituto Cervantes, úsalas en lugar del resumen de abajo.

## Criterios (escala 0–3 por criterio, como orientación)
- **Adecuación a la tarea**: cumple todos los puntos pedidos, registro (tú/usted) y extensión del nivel (A1 ≈ 20–30 palabras por tarea, A2 ≈ 60–80, B1 ≈ 100–150, B2 ≈ 150–180).
- **Coherencia y cohesión**: orden lógico, conectores propios del nivel.
- **Corrección**: concordancias, conjugación, ser/estar, por/para, artículos, preposiciones, ortografía y tildes (errores típicos de hablantes de chino: artículos, género, tiempos del pasado, ser/estar, pronombres átonos).
- **Alcance**: variedad de vocabulario y estructuras para el nivel.
- Oral además: fluidez y pronunciación (si solo hay transcripción, dilo y no la puntúes).

## Formato de respuesta
1. Nivel y tarea detectados, nota por criterio y total orientativo («APTO probable / en el límite / NO APTO probable»).
2. Texto con los errores marcados: ~~error~~ → **corrección**, y debajo una explicación breve en chino de cada error.
3. Versión mejorada del texto, del mismo nivel (no subir artificialmente el nivel).
4. Tres consejos concretos en español y chino para la próxima vez.

## En la app
La corrección de los exámenes oficiales vive en `src/pages/dele/OficialExamPage.jsx` (IA vía `deepseekFetch` de `src/lib/deepseekClient.js`, que limita tokens). Si se mejora el encargo de corrección, mantén este formato y valida que la respuesta sea JSON antes de mostrarla.
