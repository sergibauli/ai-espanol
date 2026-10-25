---
category: Acciones
---
# FichaLetra

Ficha de letra de marfil para juegos de deletreo, apalabrados o teclados: representa letras, puntos y estados de colocación.

## Cuándo usarlo
- Para armar palabras desordenadas, apalabrados o ejercicios de ortografía DELE.
- Para mostrar el estado de cada letra: normal, colocada, correcta, pista o vacía.
- Para representar fichas tipo Scrabble con puntos.
- NO usar para texto continuo ni para botones de acción; es una letra de juego.

## Props clave
- `letra?: string` — letra visible dentro de la ficha.
- `puntos?: number` — puntos pequeños abajo a la derecha, estilo apalabrados.
- `estado?: "normal" | "colocada" | "correcta" | "pista" | "vacia"` — estado visual de la letra.
- `tamano?: number` — lado en px, por defecto `48`.
- `onClick?: () => void` — acción al tocar la ficha.
- `className?: string` — clases adicionales.

## Ejemplo
```jsx
import { FichaLetra, Pergamino } from "@ai-espanol/imperial";

export const PalabraApalabrada = () => (
  <Pergamino variante="rollo" titulo="HOLA" tituloZh="你好">
    <div style={{ display: "flex", gap: 12 }}>
      <FichaLetra letra="H" puntos={4} estado="correcta" tamano={56} />
      <FichaLetra letra="O" puntos={1} estado="correcta" tamano={56} />
      <FichaLetra letra="L" puntos={1} estado="colocada" />
      <FichaLetra letra="A" puntos={1} estado="pista" />
      <FichaLetra estado="vacia" />
    </div>
  </Pergamino>
);
```

## Reglas
- Usa `FichaLetra` dentro de filas flex o grid; no la estires como botón ancho.
- Mantén los estados visibles claramente: `pista` para ayuda, `vacia` para huecos, `correcta` para aciertos.
- En apalabrados usa `puntos`; en palabras desordenadas usa estados de colocación.
- No uses emojis como contenido de la ficha; la letra es el protagonista.