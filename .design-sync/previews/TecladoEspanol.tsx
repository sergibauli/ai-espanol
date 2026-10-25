import { TecladoEspanol, Pergamino } from "@ai-espanol/imperial";

export const Minusculas = () => (
  <Pergamino style={{ maxWidth: 560 }}>
    <TecladoEspanol />
  </Pergamino>
);

export const Mayusculas = () => (
  <Pergamino style={{ maxWidth: 560 }}>
    <TecladoEspanol mayusculas />
  </Pergamino>
);
