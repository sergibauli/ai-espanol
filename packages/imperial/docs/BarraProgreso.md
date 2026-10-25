---
category: Indicadores
---
# BarraProgreso

Barra de progreso imperial con brillo para mostrar avance, notas de criterios o progreso de unidades DELE.

## Cuándo usarlo
- Para representar avance de unidades, misiones o secciones dentro de un `Pergamino`.
- Para mostrar notas por competencia en criterios de corrección o resultados.
- Úsala en variante `fina` dentro de tarjetas cuando el espacio es reducido.
- No la uses como medidor circular de nota global; para eso usa `PanelCorreccion`.

## Props clave
- `valor`: valor actual, de 0 a `max`. Por defecto 0.
- `max`: valor máximo de referencia. Por defecto 100.
- `tono`: color del relleno: `"jade"`, `"oro"` o `"laca"`.
- `etiqueta`: texto superior descriptivo, por ejemplo `"Comprensión de lectura"`.
- `mostrarValor`: si es `true` muestra el porcentaje calculado. Por defecto `true`.
- `fina`: versión delgada de 6 px sin etiqueta ni porcentaje, ideal para tarjetas.

## Ejemplo
```jsx
import { BarraProgreso, Pergamino } from '@ai-espanol/imperial';

export const ProgresoUnidad = () => (
  <Pergamino style={{ display: 'grid', gap: 16, maxWidth: 420 }}>
    <BarraProgreso
      etiqueta="Unidad 2 · Por favor y gracias"
      valor={55}
      tono="oro"
    />
    <BarraProgreso
      etiqueta="Comprensión de lectura"
      valor={82}
      tono="jade"
    />
    <BarraProgreso
      etiqueta="Expresión escrita"
      valor={34}
      tono="laca"
    />
  </Pergamino>
);
```

## Reglas
- Usa `tono="jade"` para resultados aprobados o completados, `tono="oro"` para progreso general y `tono="laca"` para alertas o bajo rendimiento.
- La variante `fina` no muestra etiqueta ni porcentaje; ponla dentro de tarjetas para no duplicar información.
- El contenido con barras debe apoyarse sobre `Pergamino` o tarjetas dentro de una `Escena` noche, nunca como elemento suelto sin contexto.