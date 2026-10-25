import { TarjetaJuego, Pergamino } from "@ai-espanol/imperial";

export const Juegos = () => (
  <Pergamino titulo="Aprende jugando" tituloZh="边玩边学" style={{ width: 760 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <TarjetaJuego icono="🏮" titulo="Kahoot Quiz" tituloZh="抢答" descripcion="Responde antes que el reloj." etiqueta="Vocabulario" />
      <TarjetaJuego icono="🀄" titulo="Memory" tituloZh="记忆配对" descripcion="Empareja palabra y traducción." etiqueta="Memoria" />
      <TarjetaJuego icono="🔤" titulo="Palabra desordenada" tituloZh="文字重组" descripcion="Ordena las letras." etiqueta="Ortografía" />
      <TarjetaJuego icono="🐉" titulo="Serpiente de letras" tituloZh="贪吃蛇" descripcion="Come las letras en orden." bloqueado />
    </div>
  </Pergamino>
);
