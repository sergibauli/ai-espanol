import { Sello, Escena } from "@ai-espanol/imperial";

export const Tonos = () => (
  <Escena variante="papel" style={{ display: "flex", gap: 28, alignItems: "center", width: 560 }}>
    <Sello texto="Completada" sub="已完成" />
    <Sello texto="Apto" sub="合格" tono="jade" grande />
    <Sello texto="Nuevo" tono="oro" giro={6} />
  </Escena>
);
