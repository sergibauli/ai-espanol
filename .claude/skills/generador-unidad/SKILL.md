---
name: generador-unidad
description: Amplía o crea contenido de una unidad de AI Español (teoría estructurada, vocabulario, diálogos con personajes, ejercicios, frases de pronunciación, preguntas tipo Kahoot) usando DeepSeek para el volumen y validando el formato exacto de la app. Úsala cuando el usuario pida más ejercicios, más palabras, más diálogos, una unidad nueva o «contenido nuevo» para una sección.
---

# Generador de contenido de unidades

Claude dirige y revisa; DeepSeek genera el volumen. Lee antes la skill `ai-espanol-contexto`.

## Formatos que hay que respetar (`src/data/modulos/modulos-XX-YY.js`)
- `vocabulario`: `{ id, espanol, chino, ... }`.
- `teoria`: `{ id, titulo, tituloChino, descripcion, descripcionChino, ejemplos: [{ espanol, chino }] }`. La guía entiende: títulos que terminan en «:», viñetas `•`, `-`, `1.`, `→`, líneas «término = explicación», tablas con `|`, y bloques que empiezan por `📌` (nota), `❌` (error común) o `💡` (consejo). Mantén la misma estructura en chino, en el mismo orden, para que se alinee línea a línea.
- `dialogos`: `{ id, titulo, tituloChino, lineas: [{ personaje, texto, traduccion }] }`. Usa nombres cuyo género reconozca `esMujer` (o añádelos a `FEMENINOS`) para que cada voz salga bien.
- `ejercicios`: `seleccionar` (`pregunta`, `preguntaChino`, `opciones`, `respuestaCorrecta` presente en `opciones`, `explicacion`), `verdaderoFalso`, `completar`, `ordenar`, `traducir`, `emparejar` (mira una unidad existente antes de generar).
- Pronunciación: `src/data/pronunciacion.json`, cada sílaba con `palabras` y `frases` `{ es, zh }`; cada palabra debe contener la sílaba.

## Pasos
1. Extrae a un JSON pequeño lo que ya existe de la unidad (para no repetir) y prepara un encargo autosuficiente: nivel DELE, formato exacto de salida, idioma (español + chino simplificado), reglas verificables.
2. Llama a DeepSeek con salida a archivo (no a la conversación):
   ```bash
   python3 ~/.claude/skills/deepseek/scripts/ds.py "<encargo>" -f existente.json --json --out nuevo.json < /dev/null
   ```
   Para lotes grandes usa `--batch` con varios archivos de entrada.
3. Valida con código antes de aplicar: JSON válido, campos obligatorios, sin duplicados, respuesta correcta entre las opciones, sílaba contenida, frases de 4–12 palabras. Lo que no cumpla se descarta o se vuelve a pedir solo eso con un encargo más estricto.
4. Fusiona en los datos, ejecuta `validador-contenido`, genera los audios nuevos con `voz`, compila, prueba la unidad en el navegador (escritorio y móvil) y despliega con `desplegar`.
5. Di al usuario cuántos elementos se añadieron, cuántos se descartaron y los tokens que gastó DeepSeek.
