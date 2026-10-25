import { Bocadillo, Escena } from "@ai-espanol/imperial";

export const Personajes = () => (
  <Escena variante="papel" style={{ display: "grid", gap: 16, maxWidth: 520 }}>
    <Bocadillo quien="Lucía" texto="¡Hola! ¿Cómo estás?" zh="你好！你好吗？" />
    <Bocadillo quien="Wang Lei" texto="Muy bien, gracias. ¿Y tú?" zh="很好，谢谢。你呢？" lado="derecha" />
  </Escena>
);
