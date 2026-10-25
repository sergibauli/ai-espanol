# Imperial · AI Español — cómo construir con este sistema

App para estudiantes chinos que preparan el DELE (A1–B2). Estética imperial china: **noche azul con destellos dorados como lienzo, contenido sobre pergamino, acentos de laca roja y oro, jade para el éxito**. Todos los textos visibles son bilingües: español + chino simplificado (props `zh`, `tituloZh`, `labelZh`, `descripcionZh`).

## Montaje
No hay provider: basta con cargar `styles.css`, que define los tokens en `:root` y las tipografías (Cinzel para títulos, Plus Jakarta Sans para la interfaz, Noto Serif SC para el chino). Composición canónica de una pantalla:

```jsx
import { Escena, MenuLacado, HeroSeccion, Pergamino, TarjetaUnidad, Boton } from "@ai-espanol/imperial";

<div style={{ display: "flex", minHeight: "100vh" }}>
  <MenuLacado activo="unidades" items={[{ id: "unidades", icono: "unidades", label: "Unidades", labelZh: "单元" }]} />
  <Escena variante="noche" style={{ flex: 1, borderRadius: 0, display: "grid", gap: 24, alignContent: "start" }}>
    <HeroSeccion ceja="Unidades · 单元" titulo="Tu camino del A1 al B2" tituloZh="从A1到B2" mascota="saluda"
      acciones={<Boton variante="oro">Continuar</Boton>} />
    <Pergamino titulo="A1 · Principiante" tituloZh="初级">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 16 }}>
        <TarjetaUnidad numero={1} titulo="Hola y adiós" tituloZh="你好和再见" icono="👋" estado="completada" progreso={1} />
      </div>
    </Pergamino>
  </Escena>
</div>
```

## Reglas de composición
- El fondo de cada pantalla es `<Escena variante="noche">`; el contenido nunca va directamente sobre la noche: va dentro de `Pergamino` (o de tarjetas). Cada página abre con `HeroSeccion` o `CintaTitulo`.
- Acción principal = `Boton variante="laca"`; premio o destacado = `oro`; secundaria = `papel`; confirmar = `jade`. Un solo botón laca por bloque.
- Corrección: acierto en jade (`Opcion estado="correcta"`, `Sello tono="jade"`), error en laca. Resultado de examen = `PanelCorreccion`.
- Niveles siempre con `InsigniaNivel` (A1 laca, A2 jade, B1 oro, B2 púrpura).
- El menú usa solo `Icono` (nombres: ruta, unidades, dele, juegos, diccionario, pronunciacion, repaso, progreso, tutor). Nunca emojis en el menú; sí se permiten emojis dentro de `TarjetaUnidad` y `TarjetaJuego`.
- La mascota es el Rey Mono (`Mascota`, poses: saluda, guino, serio, poder, feliz, trofeo): para bienvenida, ánimo y recompensas.

## Estilo propio (maquetación y pegamento)
No hay clases utilitarias: para tu maquetación usa `style` con CSS grid/flex y los tokens `var(--im-*)`:
- Color: `--im-laca-300/500/700/900`, `--im-oro-100/300/500/600/800`, `--im-papel-50/100/200/300`, `--im-papel-borde`, `--im-tinta-300/500/700/900`, `--im-noche-700/800/900/950`, `--im-jade-300/500/700`, `--im-azul-500`, `--im-purpura-500`.
- Tipografía: `--im-font-display` (títulos, solo mayúsculas visuales), `--im-font-ui` (texto), `--im-font-zh` (chino), `--im-font-letra` (letras sueltas con minúscula).
- Forma y espacio: `--im-radio-sm/md/lg/pill`, `--im-sombra-papel`, `--im-sombra-oro`, `--im-brillo-oro`, `--im-esp-1` … `--im-esp-6` (4–32 px).
- Clases reutilizables: `.im-fichas` (fila centrada de `FichaLetra`), `.im-zh` (texto chino).

## Dónde mirar
`styles.css` → `_ds_bundle.css` contiene todos los tokens y las clases `im-*`. La documentación de cada componente (props, ejemplo y reglas) está en su `.prompt.md`.
