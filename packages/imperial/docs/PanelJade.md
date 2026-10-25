---
category: Fundamentos
---
# PanelJade

Panel de jade en acuarela con marco de oro ornamental, esquinas de nube y montes en la parte de abajo. Es la alternativa luminosa al pergamino para paneles laterales, tarjetas de ventajas y el bloque de entrada de la portada.

## Cuándo usarlo
- Paneles del lateral (meta diaria, pasaporte de sellos, desafíos del día, logros).
- Tarjetas de ventajas o accesos con `variante="tarjeta"`: moneda con icono encima del título.
- Un bloque destacado sobre un fondo ilustrado (portada, mapa).
- Para lectura larga o ejercicios, mejor `Pergamino`.

## Props clave
- `titulo` y `tituloZh`: cabecera en crema con el chino en oro.
- `icono`: nombre de un `Icono` (se pinta dentro de una `Moneda` de oro) o un nodo propio.
- `variante`: `panel` (cabecera en fila) o `tarjeta` (centrada).
- `as`: etiqueta del contenedor (`section` por defecto).

## Ejemplo
```jsx
import { PanelJade, Boton } from "@ai-espanol/imperial";

<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 200px)", gap: 24 }}>
  <PanelJade variante="tarjeta" icono="juegos" titulo="Aprende jugando" tituloZh="游戏化学习" />
  <PanelJade variante="tarjeta" icono="dele" titulo="Preparación DELE" tituloZh="DELE备考" />
</div>
<PanelJade titulo="Meta diaria" tituloZh="每日目标" style={{ marginTop: 24 }}>
  <p style={{ margin: 0, color: "#cdeee4" }}>10/30 XP hoy</p>
</PanelJade>
```

## Reglas
- El texto dentro va en crema (`#fff6dc`) o menta clara (`#cdeee4`); nunca tinta oscura directamente sobre el jade.
- Deja al menos 20 px entre paneles: el marco dorado sobresale unos 8 px y las esquinas 13 px.
- Botón principal dentro: `Boton variante="laca"`; los demás, `oro` o `papel`.
