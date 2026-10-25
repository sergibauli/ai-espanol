---
category: DELE
---
# PanelCorreccion

Panel de corrección DELE que muestra la nota en anillo, el sello bilingüe Apto/No apto, el desglose por criterios y un comentario. Úsalo como panel de resultado de una prueba evaluada.

## Cuándo usarlo
- Para mostrar la nota global de una corrección DELE con desglose por criterios.
- En pantallas de revisión de expresión escrita u oral evaluada por IA o profesor.
- Como cierre de una práctica con resultado apto o no apto.
- No lo uses como tarjeta de examen ni como contenedor genérico: ya dibuja su propio `Pergamino`.

## Props clave
- `puntuacion?: number` — nota global de 0 a 100, controla el anillo y el valor mostrado.
- `apto?: boolean` — si se omite, se calcula automáticamente como `puntuacion >= 60`.
- `nivel?: Nivel` — muestra una etiqueta como `Corrección DELE A1`.
- `criterios?: { nombre: string; nota: number; max?: number }[]` — barras de progreso por criterio; `max` por defecto es 100.
- `comentario?: string` — comentario de corrección bajo las barras.
- `className?: string` — clases adicionales aplicadas al `Pergamino` interno.

## Ejemplo
```jsx
import { Escena, PanelCorreccion } from "@ai-espanol/imperial";
export const ResultadoA1 = () => (
  <Escena variante="noche">
    <PanelCorreccion
      puntuacion={74}
      nivel="A1"
      criterios={[
        { nombre: "Coherencia", nota: 72 },
        { nombre: "Gramática", nota: 64 },
      ]}
      comentario="Revisa la concordancia: «las clases empiezan», no «las clases empieza»."
    />
  </Escena>
);
```

## Reglas
- `PanelCorreccion` ya incluye un `Pergamino`; no lo envuelvas en otro `Pergamino`.
- Mantén coherencia entre `puntuacion` y `apto`; si no pasas `apto`, el corte de aprobado es 60.
- El sello bilingüe Apto/合格 o No apto/不合格 es automático; no necesitas traducciones manuales.
- Las barras de criterios cambian de color según su propio porcentaje: jade si llega al 60 %, laca si no.