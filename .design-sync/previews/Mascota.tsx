import { Mascota, Escena } from "@ai-espanol/imperial";

export const Poses = () => (
  <Escena variante="noche" style={{ display: "flex", gap: 8, alignItems: "flex-end", width: 760 }}>
    {(["saluda", "guino", "serio", "poder", "feliz", "trofeo"] as const).map((p) => (
      <Mascota key={p} pose={p} tamano={110} />
    ))}
  </Escena>
);

export const ConMensaje = () => (
  <Escena variante="papel" style={{ width: 560 }}>
    <Mascota pose="feliz" tamano={130} mensaje="¡Muy bien! Llevas 5 días seguidos estudiando." />
  </Escena>
);
