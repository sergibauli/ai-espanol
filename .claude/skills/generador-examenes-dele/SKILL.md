---
name: generador-examenes-dele
description: Genera simulacros DELE nuevos (A1–B2) con el mismo formato, condiciones y requisitos que los 80 modelos oficiales de AI Español, los valida contra la plantilla oficial y los publica en la app. Úsala cuando pidan «exámenes nuevos», «simulacros nuevos», «genera un DELE» o en la tarea programada quincenal.
---

# Generador de simulacros DELE

Crea modelos nuevos que el alumno ve en **DELE → Modelos oficiales por nivel** junto a los 20 oficiales de cada nivel, marcados como «nuevo». Mantiene exactamente el formato oficial del nivel: 4 pruebas, mismas tareas, mismo número de ítems y opciones, mismas instrucciones, duración y extensión de textos, guiones de audio con marcas `[AUDIO n] [VOZ n - sexo, edad, país]` y la evaluación oficial (APTO con ≥ 30 puntos en cada grupo).

## Cómo funciona
1. `scripts/generar.mjs <NIVEL>` elige al azar un modelo oficial del nivel como plantilla y la lista de temas ya usados (oficiales + nuevos).
2. **Requisitos del nivel** (`src/data/requisitos-dele.json`, compartido con la corrección de la app): descriptor MCER, tipo y longitud de textos, gramática esperada y la que NO corresponde al nivel, léxico, audio, cómo deben ser las preguntas y distractores, tareas de escritura con su extensión, oral y qué necesita cada criterio para ser apto.
3. **Cifras medidas** (`calibracion-niveles.json`, generado por `scripts/calibrar.mjs` con los 80 oficiales): rango p10–p90 por nivel de palabras por frase (A1 ≈ 12 → B2 ≈ 19,5), % de palabras largas, variedad léxica, subjuntivo/condicional/pluscuamperfecto por 1000 palabras y **literalidad** de la respuesta correcta respecto a su frase del texto (A1 ≈ 0,93 casi literal → B2 ≈ 0,45 paráfrasis e inferencia).
4. DeepSeek (`deepseek-v4-pro`, vía la skill `deepseek`) recibe requisitos + cifras objetivo y genera el plan y cada tarea por separado con la tarea equivalente de la plantilla como molde. Las claves se calculan a partir de los ítems.
5. **Control de calidad en hasta 3 rondas**:
   - `validar.mjs`: formato idéntico al oficial (tareas, ítems, opciones, duración, extensión, guiones con voces, posiciones de la correcta).
   - `nivel.mjs`: dificultad medida dentro del rango de los oficiales del nivel; si es más fácil o más difícil, se rechaza indicando qué medida falla.
   - `examinar.mjs`: un segundo examinador de IA, independiente, valora el nivel MCER real de cada texto y revisa cada ítem (una sola respuesta defendible, ningún distractor correcto, dificultad del ítem adecuada).
   - Solo se regeneran las tareas con problemas, diciéndole al generador qué corregir. Si tras 3 rondas no aprueba, no se guarda nada.
6. Si aprueba se guarda en `src/data/oficial/nuevos/<NIVEL>-<NN>.json` y se regenera `nuevos/index.js`; `src/lib/oficial-loader.js` los añade detrás de los oficiales.

Si cambian los modelos oficiales, recalibra: `node .claude/skills/generador-examenes-dele/scripts/calibrar.mjs`.

## Pasos
```bash
cd "<raíz del repo>"
node .claude/skills/generador-examenes-dele/scripts/generar.mjs A1        # uno por nivel: A1, A2, B1, B2
node .claude/skills/generador-examenes-dele/scripts/generar.mjs B1 --tema "Un intercambio de casas"
node .claude/skills/generador-examenes-dele/scripts/generar.mjs A2 --dry  # genera y valida sin guardar
node .claude/skills/generador-examenes-dele/scripts/generar.mjs A1 --reemplazar A1-21  # rehace un simulacro concreto
node .claude/skills/generador-examenes-dele/scripts/validar.mjs src/data/oficial/nuevos/A1-21.json
```
Ejecuta siempre `ds.py` y estos scripts con la entrada cerrada (el script ya lo hace). Cada modelo tarda 10-30 minutos (unas 15-25 llamadas según las rondas de corrección).

## Coste y variedad
- **Redacción de tareas con `deepseek-chat`** (sin razonamiento): unas 5 veces menos tokens de salida que `deepseek-v4-pro`, que gasta ~80 % de su salida en razonar. `v4-pro` solo para el plan y el examinador; si `deepseek-chat` falla, el script recurre a `v4-pro`.
- **Rondas baratas:** solo se rehacen las tareas culpables; si falla solo la literalidad, se reescriben los ítems sin tocar el texto; el examinador solo revisa lo que cambió desde la ronda 2.
- **Variedad:** el plan rota el ámbito menos usado (personal, público, profesional, académico), evita los nombres de personajes ya usados y, en B1–B2, alterna voces de España e Hispanoamérica.
- **Aprende de su rendimiento:** `historial.json` guarda por nivel el modelo que redactó, las rondas, si aprobó y las llamadas. Si `deepseek-chat` falla 2 veces seguidas en un nivel, ese nivel pasa a redactarse con `deepseek-v4-pro` automáticamente. Revisa el historial al dar el resumen.
- **Claude:** la tarea programada arranca siempre en sesión nueva y Claude solo lee la hoja compacta (`resumen.mjs`), nunca el JSON entero.

## Reparto de trabajo: DeepSeek genera, Claude decide
- **DeepSeek (API del usuario)** hace todo lo masivo: plan, textos, guiones, ítems, regeneraciones y el examinador automático. Es lo barato.
- **Los controles de formato y dificultad** son cálculos locales: no gastan tokens.
- **Claude es el cerebro y el último filtro**, pero sin leer el JSON entero ni reescribir textos: revisa la hoja compacta y, si algo falla, **manda rehacer a DeepSeek** diciendo qué corregir. Nunca escribe a mano textos o ítems (gastaría sus tokens); su trabajo es juzgar y dirigir.

Después de generar (obligatorio para cada simulacro nuevo):
1. `node .claude/skills/generador-examenes-dele/scripts/resumen.mjs src/data/oficial/nuevos/<CODIGO>.json` → hoja de 3-5 mil tokens con medidas, arranque de cada texto y **todos** los ítems con la correcta marcada `*así*` y su frase de apoyo.
2. Claude revisa TODOS los ítems: una sola respuesta defendible con la frase de apoyo; distractores plausibles pero falsos; gramática y léxico del nivel (busca en los textos estructuras de `noEsperado` de `src/data/requisitos-dele.json`, p. ej. imperfecto de subjuntivo en A1/A2); temas y nombres adecuados; nada sensible.
3. Si algo falla: `node .claude/skills/generador-examenes-dele/scripts/generar.mjs <NIVEL> --rehacer <CODIGO> --tareas P1T2,P2T3 --motivo "qué corregir exactamente"` (DeepSeek rehace solo esas tareas y vuelven a pasar todos los controles). Repite la revisión de esas tareas. Si un simulacro no queda bien tras 2 intentos, bórralo y regenera el índice con otro nivel.
4. **Aprendizaje:** por cada problema que rechaces, añade una regla accionable de una frase en `aprendizajes.json` (en el nivel o en «todos»). DeepSeek no tiene memoria: así el sistema aprende y la siguiente generación ya no lo repite. No dupliques reglas; si una regla no sirve, reescríbela.
5. `npm run build` sin errores.
6. Despliega con la skill `desplegar` (GitHub Pages). **No publiques la web en Cloudflare.**

## Tarea programada
Hay una tarea programada quincenal («Simulacros DELE nuevos») que genera uno por nivel, revisa, compila y despliega. Si falla la validación de un nivel, deja ese nivel para la siguiente vez y lo anota en el resumen.

## Límites
- Un modelo por nivel y ejecución: así el banco crece despacio y con revisión.
- No toques los 80 modelos oficiales (`oficial-a1.js` … `oficial-b2.js`).
- Si DeepSeek no responde o el JSON no se puede leer, el script sale con error sin guardar nada.
