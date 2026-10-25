---
category: Personajes
---
# Dialogo

Conversación alterna en bocadillos izquierda/derecha para practicar interacciones orales del DELE.

## Cuándo usarlo
- Para representar diálogos DELE de la vida cotidiana: en una cafetería, en una tienda, en el médico o en la universidad.
- Para mostrar turnos entre dos personajes y reforzar comprensión con traducción china.
- Cuando necesitas una secuencia de varias intervenciones bilingües español-chino.
- NO lo uses para un único mensaje o aviso corto de la mascota; usa `Mascota` con `mensaje` o un solo `Bocadillo`.

## Props clave
- `lineas?: { quien?: string; texto: string; zh?: string }[]` — lista de intervenciones; el lado se alterna automáticamente según el orden.
- `lineas[].texto: string` — texto obligatorio en español de cada intervención.
- `lineas[].quien?: string` — nombre del personaje mostrado sobre el bocadillo.
- `lineas[].zh?: string` — traducción china opcional de la intervención.
- `className?: string` — clase extra para el contenedor del diálogo.

## Ejemplo
```jsx
import { Dialogo, Escena } from "@ai-espanol/imperial";

export function DialogoEstacion() {
  return (
    <Escena variante="noche" style={{ maxWidth: 640 }}>
      <Dialogo
        lineas={[
          { quien: "Taquillera", texto: "Buenos días, ¿a qué ciudad viaja?", zh: "早上好，您要去哪个城市？" },
          { quien: "Mei", texto: "A Granada, por favor.", zh: "请给我一张去格拉纳达的票。" },
          { quien: "Taquillera", texto: "¿Quiere billete de ida o ida y vuelta?", zh: "您要单程票还是往返票？" },
          { quien: "Mei", texto: "Ida y vuelta, salgo el lunes.", zh: "往返票，我周一出发。" },
        ]}
      />
    </Escena>
  );
}
```

## Reglas
- Los textos en español siempre deben ir acompañados de su traducción china en `zh` cuando exista.
- El orden de `lineas` establece los turnos y los lados se alternan automáticamente: no intentes controlar el lado manualmente.
- Mantén el diálogo con dos interlocutores para que la alternancia visual sea clara.
- No uses emojis dentro del diálogo; representa el contenido solo con texto y nombres de personaje.