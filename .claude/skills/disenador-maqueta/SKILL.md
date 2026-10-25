---
name: disenador-maqueta
description: Aplica a una sección de AI Español el diseño de una maqueta del usuario (imágenes de Doubao en ../designs) recortando piezas reales de la imagen (personajes, dragones, sellos, rodillos, texturas) y ajustando CSS hasta que se parezca, comprobándolo con capturas lado a lado. Úsala cuando el usuario pida que una pantalla quede «como en mi diseño», más espectacular, o cuando entregue imágenes nuevas.
---

# Diseñador a partir de maquetas

Lee antes `ai-espanol-contexto` (paleta, recursos ya recortados en `public/theme` y `public/mono`).

## Recortar piezas de una imagen
- Recorte simple: `ffmpeg -i maqueta.png -vf "crop=W:H:X:Y" salida.jpg` (las maquetas suelen ser 2304×1728; mide sobre una versión reducida y multiplica).
- Sujeto con fondo transparente (personaje, dragón, sello, objeto 3D) con la visión de macOS:
  ```bash
  swift .claude/skills/disenador-maqueta/scripts/lift.swift recorte.png pieza.png
  ```
  Recorta antes una zona ajustada alrededor del objeto. Lo que quede de otros elementos se borra con `ffmpeg … geq` (poner alfa a 0 en una zona) y los bordes cortados se suavizan con un degradado de alfa.
- Texturas (papel, cielo): recorta zonas limpias sin interfaz ni bordes de pantalla; para que se repitan sin cortes usa espejo (`hflip`/`vflip` + `hstack`/`vstack`). Revisa siempre la textura final: un recorte con restos de la maqueta se nota en toda la app.
- Guarda en `public/theme/` o `public/mono/` con nombre en español y tamaño razonable (PNG < 300 KB).

## Aplicar y comprobar
1. Añade CSS en un bloque nuevo al final de `src/styles/parchment.css`, con selectores específicos y `!important` solo donde un estilo en línea o el adaptador lo exijan. Si hace falta, añade una clase gancho en el JSX (sin cambiar la lógica).
2. Capturas (una vez: `cd .claude/skills/disenador-maqueta/scripts && npm install`; servidor `npm run dev` o `vite preview`):
   ```bash
   node .claude/skills/disenador-maqueta/scripts/shot.mjs "http://127.0.0.1:5190/#/ruta" captura.jpg 1366 860
   node .claude/skills/disenador-maqueta/scripts/shot.mjs "http://127.0.0.1:5190/#/ruta" movil.jpg 390 844
   ```
   Monta maqueta y captura lado a lado (`ffmpeg … hstack`) y compáralas antes de dar algo por terminado. Envía la comparación al usuario.
3. Nada de emojis como iconos principales ni personajes con copyright. Si algo no se puede imitar bien con código, pide al usuario la pieza suelta generada con Doubao (fondo transparente).
