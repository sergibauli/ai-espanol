---
category: Acciones
---
# Boton

Botón imperial en píldora, con marco dorado y mayúsculas, para acciones principales, premios y confirmaciones.

## Cuándo usarlo
- Para la acción principal de una pantalla: empezar unidad, comprobar respuesta o inscribirse.
- Para acciones destacadas de premio o recompensa con `variante="oro"`.
- Para acciones secundarias o terciarias junto al botón principal con `papel` o `fantasma`.
- No lo uses para navegación de menú lateral; ahí usa `MenuLacado` con `Icono`.

## Props clave
- `variante`: `"laca"` acción principal, `"oro"` premio/destacado, `"papel"` secundaria, `"jade"` confirmar, `"fantasma"` terciaria.
- `tamano`: `"sm"`, `"md"` por defecto o `"lg"`.
- `ancho`: booleano; `true` ocupa todo el ancho disponible.
- `zh`: subtítulo chino que aparece tras el texto principal.
- `icono`: `ReactNode` a la izquierda del texto, normalmente `<Icono nombre="..." />`.
- Hereda `ButtonHTMLAttributes`: `disabled`, `type`, `onClick`, etc.

## Ejemplo
```jsx
import { Boton, Escena, Icono } from "@ai-espanol/imperial";

export function PanelInicio() {
  return (
    <Escena variante="papel" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Boton variante="laca" ancho icono={<Icono nombre="ruta" />} zh="开始路线">
        Empezar ruta
      </Boton>
      <Boton variante="oro" ancho zh="领取每日奖励">
        Reclamar premio diario
      </Boton>
      <Boton variante="papel" ancho>Ver temario</Boton>
      <Boton variante="jade" tamano="lg" disabled>Comprobar</Boton>
    </Escena>
  );
}
```

## Reglas
- Mantén una única acción principal laca o jade por vista; las secundarias van en `papel` o `fantasma`.
- Coloca siempre `Boton` sobre `Escena noche` o `Escena papel`, no sobre fondos crudos sin tema imperial.
- Usa `zh` para refuerzo bilingüe y usa `Icono` del sistema; no emojis como icono.
- No capitalices manualmente los textos: el componente ya aplica mayúsculas y marco dorado imperial.