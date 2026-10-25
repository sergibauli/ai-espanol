---
name: generador-examenes-dele
description: Genera simulacros DELE nuevos (A1–B2) con el mismo formato, condiciones y requisitos que los 80 modelos oficiales de AI Español, los valida contra la plantilla oficial y los publica en la app. Úsala cuando pidan «exámenes nuevos», «simulacros nuevos», «genera un DELE» o en la tarea programada quincenal.
---

# Generador de simulacros DELE

Crea modelos nuevos que el alumno ve en **DELE → Modelos oficiales por nivel** junto a los 20 oficiales de cada nivel, marcados como «nuevo». Mantiene exactamente el formato oficial del nivel: 4 pruebas, mismas tareas, mismo número de ítems y opciones, mismas instrucciones, duración y extensión de textos, guiones de audio con marcas `[AUDIO n] [VOZ n - sexo, edad, país]` y la evaluación oficial (APTO con ≥ 30 puntos en cada grupo).

## Cómo funciona
1. `scripts/generar.mjs <NIVEL>` elige al azar un modelo oficial del nivel como plantilla y la lista de temas ya usados (oficiales + nuevos).
2. DeepSeek (`deepseek-v4-pro`, vía la skill `deepseek`, clave en su `.env`) crea primero el plan (tema central nuevo y matriz) y después cada prueba por separado con la prueba equivalente de la plantilla como molde.
3. Las claves de lectura y audición se calculan a partir de los ítems (`correcta`, `justificacion`, `fraseSoporte`), así nunca descuadran.
4. `scripts/validar.mjs` rechaza el modelo si cambia algo del formato: número de pruebas, tareas, ítems u opciones, tipos, duración, claves que faltan, textos fuera del ±25 % de palabras, textos copiados, guiones sin marcas de voz, respuestas correctas siempre en la misma posición u opciones repetidas.
5. Si es válido se guarda en `src/data/oficial/nuevos/<NIVEL>-<NN>.json` y se regenera `nuevos/index.js`. `src/lib/oficial-loader.js` los añade detrás de los oficiales.

## Pasos
```bash
cd "<raíz del repo>"
node .claude/skills/generador-examenes-dele/scripts/generar.mjs A1        # uno por nivel: A1, A2, B1, B2
node .claude/skills/generador-examenes-dele/scripts/generar.mjs B1 --tema "Un intercambio de casas"
node .claude/skills/generador-examenes-dele/scripts/generar.mjs A2 --dry  # genera y valida sin guardar
node .claude/skills/generador-examenes-dele/scripts/validar.mjs src/data/oficial/nuevos/A1-21.json
```
Ejecuta siempre `ds.py` y estos scripts con la entrada cerrada (el script ya lo hace). Cada modelo tarda unos minutos (5 llamadas).

Después de generar:
1. **Revisión de calidad (Claude):** lee el plan y una tarea de cada prueba del JSON nuevo. Comprueba que el nivel de lengua es el del nivel (no más difícil), que cada ítem tiene una sola respuesta defendible con la `fraseSoporte` y que no hay contenido sensible. Si algo falla, borra el JSON, vuelve a generar y regenera el índice ejecutando de nuevo el script.
2. `npm run build` sin errores.
3. Despliega con la skill `desplegar` (GitHub Pages). **No publiques la web en Cloudflare.**

## Tarea programada
Hay una tarea programada quincenal («Simulacros DELE nuevos») que genera uno por nivel, revisa, compila y despliega. Si falla la validación de un nivel, deja ese nivel para la siguiente vez y lo anota en el resumen.

## Límites
- Un modelo por nivel y ejecución: así el banco crece despacio y con revisión.
- No toques los 80 modelos oficiales (`oficial-a1.js` … `oficial-b2.js`).
- Si DeepSeek no responde o el JSON no se puede leer, el script sale con error sin guardar nada.
