import { Escena, CintaTitulo, Pergamino } from "@ai-espanol/imperial";

export const Noche = () => (
  <Escena variante="noche" style={{ width: 560, height: 260, display: "grid", placeItems: "center" }}>
    <CintaTitulo texto="Exámenes DELE" zh="DELE考试" />
  </Escena>
);

export const NocheConPergamino = () => (
  <Escena variante="noche" style={{ width: 560 }}>
    <Pergamino titulo="Lecciones" tituloZh="课程">
      <p style={{ margin: 0 }}>El contenido siempre va sobre pergamino; la noche es el lienzo de la app.</p>
    </Pergamino>
  </Escena>
);

export const PapelYLaca = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: 560 }}>
    <Escena variante="papel" style={{ height: 160 }}>
      <b>Papel</b>
    </Escena>
    <Escena variante="laca" style={{ height: 160 }}>
      <b>Laca</b>
    </Escena>
  </div>
);
