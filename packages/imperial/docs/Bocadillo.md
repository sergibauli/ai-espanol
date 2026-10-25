---
category: Personajes
---
# Bocadillo

Bocadillo de diálogo con nombre del personaje y opción de traducción al chino; úsalo para mostrar intervenciones habladas dentro de una conversación.

## Cuándo usarlo
- Para frases cortas de un personaje con su nombre visible.
- Para crear diálogos bilingües español–chino en ejercicios y simulaciones DELE.
- Para alternar intervenciones manualmente con `lado="derecha"` e `lado="izquierda"`.
- No lo uses para textos largos o explicaciones: ahí conviene un `Pergamino` o una tarjeta.

## Props clave
- `quien?: string` — nombre del personaje que habla; se muestra como etiqueta superior.
- `texto: string` — frase principal en español.
- `zh?: string` — traducción china que aparece junto al texto.
- `lado?: "izquierda" | "derecha"` — orientación del bocadillo; por defecto `"izquierda"`.
- `className?: string` — clases adicionales para ajustar espaciado o disposición.

## Ejemplo
```jsx
import { Bocadillo, Escena } from "@ai-espanol/imperial";

export const DialogoSaludo = () => (
  <Escena variante="papel" style={{ display: "grid", gap: 16, maxWidth: 520 }}>
    <Bocadillo
      quien="Lucía"
      texto="¡Hola! ¿Cómo estás?"
      zh="你好！你好吗？"
    />
    <Bocadillo
      quien="Wang Lei"
      texto="Muy bien, gracias. ¿Y tú?"
      zh="很好，谢谢。你呢？"
      lado="derecha"
    />
  </Escena>
);
```

## Reglas
- Mantén los textos bilingües: español en `texto` y chino en `zh`, sin mezclarlos en una misma prop.
- Alterna `lado="izquierda"` y `lado="derecha"` para que la conversación se lea con claridad.
- No uses emojis dentro del bocadillo; el tono visual lo aportan la Escena, el Pergamino o la Mascota.
- Coloca los bocadillos sobre una `Escena` o un `Pergamino`; no los uses como contenedor principal de una pantalla.