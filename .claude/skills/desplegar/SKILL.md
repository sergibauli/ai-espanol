---
name: desplegar
description: Compila, publica AI Español en GitHub Pages (push a main de sergibauli/ai-espanol), espera al workflow y pasa una prueba de humo por las rutas principales de la web publicada. Úsala cuando el usuario diga desplegar, publicar, subir o «deploy», o al terminar un bloque de cambios.
---

# Desplegar AI Español

1. Comprueba el uso por horas (`get_usage`): despliega siempre antes del 99 %.
2. Una sola vez: `cd .claude/skills/desplegar/scripts && npm install` (instala puppeteer-core para la prueba de humo; usa el Chrome del sistema).
3. Ejecuta desde la raíz del repo, con un mensaje que diga qué cambia para el alumno:
   ```bash
   .claude/skills/desplegar/scripts/deploy.sh "v7.x: qué cambia"
   ```
   El script compila, hace commit (con la línea Co-Authored-By), push con el token de `gh` del usuario `sergibauli`, espera al workflow y abre cada ruta en la web publicada.
4. Lee el final: `deploy <sha>: completed success` y `humo OK`. Si alguna ruta sale con `CRASH`, poco texto o errores, arréglala antes de dar el despliegue por bueno.
5. Si hay audio generándose en segundo plano, no despliegues hasta que termine y se fusionen los índices (skill `voz`), o se subirán MP3 sin índice.
