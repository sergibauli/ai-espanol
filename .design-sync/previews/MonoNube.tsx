import { MonoNube, Escena } from "@ai-espanol/imperial";

export const EnLaNoche = () => (
  <Escena variante="noche" style={{ width: 560, display: "flex", gap: 30, alignItems: "flex-end", justifyContent: "center" }}>
    <MonoNube pose="saluda" />
    <MonoNube pose="poder" tamano={180} estela />
  </Escena>
);

export const SobrePapel = () => (
  <Escena variante="papel" style={{ width: 360, display: "grid", placeItems: "center" }}>
    <MonoNube pose="feliz" tamano={160} />
  </Escena>
);
