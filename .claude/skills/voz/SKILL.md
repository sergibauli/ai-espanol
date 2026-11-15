---
name: voz
description: Genera con la voz clonada del profesor (Fish Audio) o con la voz femenina los MP3 que falten en AI Español y actualiza los índices de audio. Úsala al añadir palabras, frases, diálogos, diccionario o pronunciación, o cuando el usuario diga que un audio suena con otra voz o no suena.
---

# Voz del profesor (Fish Audio)

- Voz del profesor (hombre): voz por defecto de `scripts/tts.py`. Voz femenina: `VOICE=5e816f5a0658460b960881a24733c418` con `PREFIX="F|"`.
- La app busca `public/audio/<fnv1a(texto)>.mp3` (femenina: `fnv1a("F|"+texto)`), solo si el hash está en `src/data/audio-index.json` / `audio-index-f.json`. Si no está, usa la voz del navegador (suena distinta: es justo lo que hay que evitar).
- Regla de diálogos: personajes femeninos (`esMujer` en `src/lib/lessons.js`) → voz femenina; hombres y roles neutros → voz del profesor. Si aparece un nombre nuevo de mujer, añádelo a `FEMENINOS`.

## Pasos
1. Lista los textos que faltan (escribe un pequeño script con Node que importe los datos, calcule el FNV-1a de 32 bits y compare con los índices). Guarda dos JSON: textos de hombre y textos de mujer.
2. Genera en segundo plano (pide la clave al entorno; nunca la escribas en archivos):
   ```bash
   FISH_KEY=$FISH_KEY INDEX=audio-index-new.json python3 .claude/skills/voz/scripts/tts.py "$PWD" hombre.json < /dev/null
   FISH_KEY=$FISH_KEY VOICE=5e816f5a0658460b960881a24733c418 PREFIX="F|" INDEX=audio-index-f-new.json python3 .claude/skills/voz/scripts/tts.py "$PWD" mujer.json < /dev/null
   ```
   `tts.py` escribe en `INDEX` solo el lote actual: por eso se usa un índice temporal.
3. Fusiona los temporales con `audio-index.json` y `audio-index-f.json` (unión de conjuntos, ordenado) y borra los temporales.
4. Comprueba que ya no falta ningún texto y despliega (skill `desplegar`). Cada MP3 pesa ~25 KB: avisa al usuario si un lote supera unos miles de archivos.

## Audios de los exámenes (DELE oficiales y de práctica)
- Solo voces de España: diputados españoles de VoxPopuli clonados en Fish Audio (`scripts/voces-dele-pool.json`, `hNN` hombres, `mNN` mujeres; sexo comprobado por la altura de la voz).
- Cada examen tiene su propio reparto (`src/data/reparto-dele.json`, narrador + voces que necesita, sin repetir el examen anterior ni un reparto entero). Lógica en `src/lib/vocesDele.js`; reproducción en `src/lib/vocesDeleApp.js`.
- Tras añadir o cambiar exámenes:
  ```bash
  node scripts/reparto-dele.mjs > /tmp/lista.json
  python3 scripts/voces-dele-referencias.py <parquets VoxPopuli> /tmp/ref   # solo si hay voces sin id de Fish
  FISH_KEY=proxy-injected python3 scripts/voces-dele.py /tmp/lista.json /tmp/ref
  ```
  Si el script descarta una voz (no suena del sexo que toca), repite los dos pasos. Borra luego los MP3 de `public/audio/dele` que no estén en `audio-index-dele.json`.
