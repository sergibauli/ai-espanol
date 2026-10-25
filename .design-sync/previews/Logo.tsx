import { Logo, Escena } from "@ai-espanol/imperial";

export const SobreLaca = () => (
  <Escena variante="laca" style={{ width: 420, display: "grid", gap: 20 }}>
    <Logo tamano={56} />
    <Logo tamano={36} subtitulo={false} />
  </Escena>
);

export const SobrePapel = () => (
  <Escena variante="papel" style={{ width: 420 }}>
    <Logo tono="claro" tamano={56} />
  </Escena>
);

export const SobreNoche = () => (
  <Escena variante="noche" style={{ width: 420 }}>
    <Logo tamano={64} />
  </Escena>
);
