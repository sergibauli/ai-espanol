import { BarraProgreso, Pergamino } from "@ai-espanol/imperial";

export const Tonos = () => (
  <Pergamino style={{ display: "grid", gap: 16, maxWidth: 420 }}>
    <BarraProgreso etiqueta="Unidad 2 · Por favor y gracias" valor={55} tono="oro" />
    <BarraProgreso etiqueta="Comprensión de lectura" valor={82} tono="jade" />
    <BarraProgreso etiqueta="Expresión escrita" valor={34} tono="laca" />
  </Pergamino>
);

export const Fina = () => (
  <div style={{ display: "grid", gap: 12, width: 260, padding: 12 }}>
    <BarraProgreso valor={3} max={10} fina tono="oro" />
    <BarraProgreso valor={10} max={10} fina tono="jade" />
  </div>
);
