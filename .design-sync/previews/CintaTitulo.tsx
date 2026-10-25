import { CintaTitulo, Escena } from "@ai-espanol/imperial";

export const Oro = () => (
  <Escena variante="noche" style={{ display: "grid", placeItems: "center" }}>
    <CintaTitulo texto="Aprende jugando" zh="边玩边学" />
  </Escena>
);

export const Laca = () => (
  <Escena variante="papel" style={{ display: "grid", placeItems: "center" }}>
    <CintaTitulo texto="Una invitación de cumpleaños" zh="官方试卷" tono="laca" />
  </Escena>
);
