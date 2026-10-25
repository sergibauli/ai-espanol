---
category: Indicadores
---
# InsigniaNivel

Disco de nivel MCER/DELE con color propio que identifica de un vistazo el nivel del estudiante o del contenido.

## Cuándo usarlo
- Para señalar el nivel DELE/MCER de una unidad, examen, alumno o logro.
- En cabeceras de tarjetas, listas de progreso y perfiles donde el nivel sea un dato principal.
- Para diferenciar visualmente A1, A2, B1, B2, C1 y C2 por color institucional.
- No lo uses para notas numéricas ni para niveles que no pertenezcan a la escala MCER/DELE.

## Props clave
- `nivel`: `"A1" | "A2" | "B1" | "B2" | "C1" | "C2"`; define el texto y el color del disco. Por defecto es `"A1"`.
- `tamano`: `"sm" | "md" | "lg"`; controla el tamaño del disco. `"md"` es el ideal para tarjetas.
- `className`: clase opcional para ajustar posición o márgenes sin cambiar el color del nivel.

## Ejemplo
```jsx
import { Escena, Pergamino, InsigniaNivel } from "@ai-espanol/imperial";

export const NivelesDisponibles = () => (
  <Escena variante="noche">
    <Pergamino titulo="Elige tu nivel" tituloZh="选择你的等级">
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <InsigniaNivel nivel="A1" />
        <InsigniaNivel nivel="A2" />
        <InsigniaNivel nivel="B1" tamano="lg" />
        <InsigniaNivel nivel="B2" />
        <InsigniaNivel nivel="C1" />
        <InsigniaNivel nivel="C2" />
      </div>
    </Pergamino>
  </Escena>
);
```

## Reglas
- Mantén siempre el texto visible: no coloques la insignia sobre fondos lacados o dorados que compitan con su color.
- Usa un solo tamaño coherente por contexto; reserva `lg` para pantallas de resultado o nivel protagonista.
- Acompaña la insignia con la traducción china del nivel en el texto cercano, por ejemplo: “B1 · 中级”.
- No sustituyas la insignia por emojis ni por sellos: cada elemento tiene un significado distinto.