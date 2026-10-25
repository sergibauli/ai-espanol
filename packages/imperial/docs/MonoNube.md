---
category: Personajes
---
# MonoNube

El Rey Mono montado en su nube dorada voladora (筋斗云). Marca dónde está el alumno en el mapa de Aprender y sirve para pantallas de viaje o de avance.

## Cuándo usarlo
- Junto a la lección actual del mapa: el mono viaja por el camino hasta ella.
- En pantallas de bienvenida o de «sigue adelante».
- Para felicitar al terminar algo, mejor `Mascota` con la pose `trofeo`.

## Props clave
- `pose`: `saluda`, `guino`, `serio`, `poder`, `feliz` o `trofeo`.
- `tamano`: ancho en px (140 por defecto).
- `estela`: destellos detrás de la nube mientras se mueve.

## Ejemplo
```jsx
import { MonoNube, Escena } from "@ai-espanol/imperial";

<Escena variante="noche">
  <MonoNube pose="saluda" tamano={160} estela />
</Escena>
```

## Reglas
- Un solo `MonoNube` por pantalla: representa al alumno.
- Siempre flota; no lo pongas dentro de botones ni tarjetas pequeñas.
