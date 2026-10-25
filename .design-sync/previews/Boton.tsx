import { Boton, Escena } from "@ai-espanol/imperial";

export const Variantes = () => (
  <Escena variante="papel" style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
    <Boton variante="laca">Empezar ahora</Boton>
    <Boton variante="oro">Reclamar premio</Boton>
    <Boton variante="papel">Ya tengo cuenta</Boton>
    <Boton variante="jade">Comprobar</Boton>
  </Escena>
);

export const Tamanos = () => (
  <Escena variante="papel" style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
    <Boton tamano="sm">Siguiente</Boton>
    <Boton>Continuar</Boton>
    <Boton tamano="lg" zh="开始学习">Aprender</Boton>
  </Escena>
);

export const SobreLaNoche = () => (
  <Escena variante="noche" style={{ display: "grid", gap: 14, maxWidth: 360 }}>
    <Boton variante="laca" ancho zh="立即注册">Inscríbete ahora</Boton>
    <Boton variante="fantasma" ancho>Ver el temario</Boton>
    <Boton variante="papel" ancho disabled>
      Bloqueado
    </Boton>
  </Escena>
);
