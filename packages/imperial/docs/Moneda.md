---
category: Indicadores
---
# Moneda

Moneda imperial de oro con anillo de perlas y campo central. Es el medallón del sistema: nodos del mapa de Aprender, iconos de tarjetas y premios.

## Cuándo usarlo
- Nodos de un recorrido: `oro` para lo hecho, `jade` para el paso actual, `bronce` para lo pendiente o bloqueado.
- Medallón detrás de un `Icono` en tarjetas y cabeceras (`PanelJade` la usa sola cuando le pasas `icono`).
- Premio o cofre al final de un tramo, con `brillo`.

## Props clave
- `tono`: `oro`, `jade` o `bronce`.
- `tamano`: diámetro en px (72 por defecto).
- `brillo`: resplandor dorado alrededor.
- `children`: icono centrado (un `Icono`, un icono de línea o un emoji).

## Ejemplo
```jsx
import { Moneda, Icono } from "@ai-espanol/imperial";

<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <Moneda tono="oro" brillo><Icono nombre="dele" tamano={34} /></Moneda>
  <Moneda tono="jade" tamano={92} brillo />
  <Moneda tono="bronce"><span style={{ fontSize: 22 }}>🔒</span></Moneda>
</div>
```

## Reglas
- Solo una moneda `jade` por recorrido: marca dónde está el alumno (junto a `MonoNube`).
- El icono va en laca roja sobre oro y en oro sobre bronce; no pongas texto largo dentro.
