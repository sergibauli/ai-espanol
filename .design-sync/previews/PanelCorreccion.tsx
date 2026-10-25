import { PanelCorreccion } from "@ai-espanol/imperial";

export const Apto = () => (
  <div style={{ maxWidth: 640 }}>
    <PanelCorreccion
      puntuacion={74}
      nivel="A1"
      criterios={[
        { nombre: "Adecuación a la tarea", nota: 80 },
        { nombre: "Coherencia", nota: 72 },
        { nombre: "Corrección gramatical", nota: 64 },
        { nombre: "Alcance léxico", nota: 78 },
      ]}
      comentario="Has respondido a los tres puntos del correo. Revisa la concordancia: «las clases empiezan», no «las clases empieza»."
    />
  </div>
);

export const NoApto = () => (
  <div style={{ maxWidth: 640 }}>
    <PanelCorreccion
      puntuacion={38}
      nivel="B1"
      criterios={[
        { nombre: "Adecuación a la tarea", nota: 30 },
        { nombre: "Coherencia", nota: 45 },
        { nombre: "Corrección gramatical", nota: 40 },
        { nombre: "Alcance léxico", nota: 36 },
      ]}
      comentario="El texto tiene 62 palabras de las 100 a 120 pedidas y no trata el segundo punto de la tarea."
    />
  </div>
);
