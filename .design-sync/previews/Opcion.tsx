import { Opcion, Pergamino } from "@ai-espanol/imperial";

export const Correccion = () => (
  <Pergamino titulo="¿Qué significa «gracias»?" style={{ display: "grid", gap: 10, maxWidth: 460 }}>
    <Opcion letra="a" estado="incorrecta">请</Opcion>
    <Opcion letra="b" estado="correcta">谢谢</Opcion>
    <Opcion letra="c" estado="apagada">再见</Opcion>
    <Opcion letra="d" estado="apagada">你好</Opcion>
  </Pergamino>
);

export const Concurso = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: 560, padding: 12 }}>
    <Opcion letra="a" tono="rojo">Hola</Opcion>
    <Opcion letra="b" tono="azul">Gracias</Opcion>
    <Opcion letra="c" tono="oro">Adiós</Opcion>
    <Opcion letra="d" tono="jade">Por favor</Opcion>
  </div>
);

export const Elegida = () => (
  <div style={{ display: "grid", gap: 10, width: 420, padding: 12 }}>
    <Opcion letra="a">Yo soy de Pekín.</Opcion>
    <Opcion letra="b" estado="elegida">Yo estoy de Pekín.</Opcion>
  </div>
);
