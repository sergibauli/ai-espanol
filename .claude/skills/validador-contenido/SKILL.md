---
name: validador-contenido
description: Revisa todo el contenido de AI Español (80 unidades, pronunciación, exámenes de práctica, diccionario y audios) y señala errores - traducciones que faltan, respuestas que no están entre las opciones, palabras que no contienen su sílaba, audios sin la voz correcta. Úsala cuando el usuario pida revisar, validar o auditar el contenido, o después de generar contenido nuevo.
---

# Validador de contenido

1. Desde la raíz del repo:
   ```bash
   node .claude/skills/validador-contenido/scripts/validar.mjs /tmp/informe-contenido.json
   ```
   Imprime un resumen y deja el detalle en el JSON (no lo vuelques entero en la conversación: lee los recuentos y una muestra).
2. Clasifica lo encontrado:
   - **Datos rotos** (respuesta fuera de opciones, `correctAnswer` fuera de rango, vocabulario sin traducción): corrígelos en `src/data/...` uno a uno, sin reescribir de más.
   - **Calidad** (palabras que no contienen la sílaba, frases poco naturales, traducciones chinas dudosas): para lotes grandes, pide la revisión a DeepSeek (`python3 ~/.claude/skills/deepseek/scripts/ds.py "…" -f lote.json --json --out salida.json < /dev/null`) con instrucciones estrictas, y valida su salida con código antes de aplicarla (DeepSeek se inventa a veces palabras que no cumplen la regla).
   - **Audio que falta**: pásalo a la skill `voz`.
3. Vuelve a ejecutar el validador hasta que los avisos importantes estén a cero y resume al usuario qué se corrigió y qué queda.
