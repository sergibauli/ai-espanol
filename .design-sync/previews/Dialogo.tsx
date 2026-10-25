import { Dialogo, Escena } from "@ai-espanol/imperial";

export const EnLaCafeteria = () => (
  <Escena variante="noche" style={{ maxWidth: 560 }}>
    <Dialogo
      lineas={[
        { quien: "Camarero", texto: "Buenos días, ¿qué desea tomar?", zh: "早上好，您想喝点什么？" },
        { quien: "Mei", texto: "Un café con leche, por favor.", zh: "请给我一杯拿铁。" },
        { quien: "Camarero", texto: "¿Algo para comer?", zh: "要吃点什么吗？" },
        { quien: "Mei", texto: "Sí, una tostada con tomate.", zh: "要，一份番茄吐司。" },
      ]}
    />
  </Escena>
);
