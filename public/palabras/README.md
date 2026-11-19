# Diccionario del «Palacio de las palabras · 字母宫殿»

`es.txt.gz` es la lista de palabras válidas del juego `#/juegos/palacio-palabras` (antes «Apalabrados»).
La página la descarga solo al abrir el juego, la guarda en la Cache API (`palacio-diccionario-v1`)
y la valida con un `Set`; el Rey Mono busca sus jugadas con ella en un Web Worker.

## Fuente y licencia

- **Fuente:** lista de palabras de Letterpress, repositorio [atebits/Words](https://github.com/atebits/Words),
  fichero `Words/es.txt`, commit `f4976d6a6d34beb431dec8d4b443a138f4dc8bee` (636 598 palabras).
  Es la misma lista que publica el paquete npm `an-array-of-spanish-words` (MIT).
- **Licencia:** [CC0 1.0 Universal](LICENSE-CC0.txt) (dominio público). Se puede copiar, modificar y
  redistribuir sin condiciones; la atribución se mantiene aquí por cortesía.
- Incluye formas flexionadas: plurales, femeninos y conjugaciones completas («casas», «comimos»,
  «hablábamos», «ñandú», «xilófono»).
- Se añaden 137 formas con pronombre enclítico que aparecen en las unidades de la app («acostarse»,
  «cómpramelo») cuando su base está en la lista.

## Normalización (`scripts/build-diccionario-palacio.mjs`)

- Minúsculas, **sin tildes ni diéresis** (á→a, ü→u): la comparación no distingue «ñandú» de «ñandu».
- La **Ñ es una letra propia** (ficha aparte): «año» ≠ «ano».
- **CH, LL y RR no son fichas dobles**: el juego no tiene fichas dobles, se forman con dos fichas
  sueltas (C+H, L+L, R+R), igual que en la lista.
- Se descartan las palabras con **K o W** (el juego no tiene esas fichas) y las de más de 13 letras
  (no caben en el tablero de 13×13). Quedan 589 631 palabras.

## Formato

Texto UTF-8 comprimido con gzip, una palabra por línea, en orden alfabético y con **codificación por
prefijo**: cada línea empieza por el carácter `48 + n` (`'0'` = 0, `'1'` = 1…) donde `n` es el número
de letras iniciales que comparte con la palabra anterior, seguido del resto de la palabra.
Ejemplo: `casa`, `casas`, `casero` → `0casa`, `4s`, `3ero`. Ocupa ~270 KB (7 MB sin comprimir).

La traducción al chino de las palabras que la tienen sale de `src/data/palacio-lexico.json`
(diccionarios ES–ZH y vocabulario de las unidades), no de esta lista.

Regenerar: `node scripts/build-diccionario-palacio.mjs` (descarga la versión fijada) o
`node scripts/build-diccionario-palacio.mjs ruta/a/es.txt`.
