---
category: Indicadores
---
# Sello

Sello de tinta imperial con texto principal y segunda línea opcional en chino para marcar estados, resultados o novedades.

## Cuándo usarlo
- Marcar una tarjeta o panel como completada, apta, nueva o superada con un golpe visual inmediato.
- Refuerza el resultado de una corrección o reto sin depender solo del color.
- Señalar contenido destacado recién añadido o recompensas, sobre pergamino o tarjeta.
- No lo uses como elemento interactivo o dentro de un botón; es informativo y decorativo.

## Props clave
- `texto`: texto principal corto, p. ej. `"Completada"`, `"Apto"`, `"Nuevo"`.
- `sub`: segunda línea, normalmente la traducción al chino (`已完成`, `合格`).
- `tono`: `"laca"` (rojo, por defecto), `"jade"` o `"oro"`.
- `grande`: si `true`, agranda el sello para paneles de resultado.
- `giro`: grados de inclinación; por defecto `-8`, p. ej. `6` para orientación opuesta.

## Ejemplo
```jsx
import { Escena, Sello } from "@ai-espanol/imperial";

export const SellosDeUnidad = () => (
  <Escena variante="papel" style={{ display: "flex", gap: 28, alignItems: "center" }}>
    <Sello texto="Completada" sub="已完成" />
    <Sello texto="Apto" sub="合格" tono="jade" grande />
    <Sello texto="Nuevo" tono="oro" giro={6} />
  </Escena>
);
```

## Reglas
- Usa el sello solo para estados con significado, no como adorno repetido en cada tarjeta.
- Mantén `sub` en chino para conservar la identidad bilingüe del sistema.
- El tono por defecto es laca; reserva `jade` para aprobados/logros positivos y `oro` para novedades o recompensas.
- No lo conviertas en botón ni lo pongas dentro de una acción principal.