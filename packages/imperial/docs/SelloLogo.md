---
category: Fundamentos
---
# SelloLogo

El sello del logo sin el nombre: para avatares, iconos de app, favicon o espacios muy pequeños.

## Cuándo usarlo
- Cuando no cabe el `Logo` completo (barras estrechas, insignias, carga de la app).
- No lo combines con otro texto «AI Español» al lado: para eso está `Logo`.

## Props clave
- `tamano`: lado en px (48 por defecto).

## Ejemplo
```jsx
import { SelloLogo } from "@ai-espanol/imperial";

<SelloLogo tamano={32} />
```

## Reglas
- Se ve bien desde 24 px; por debajo pierde la tilde-nube.
