import { TarjetaExamen, Escena } from "@ai-espanol/imperial";

export const PorNivel = () => (
  <Escena variante="papel" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: 760 }}>
    <TarjetaExamen nivel="A1" titulo="DELE A1" tituloZh="入门级" datos={["4 pruebas", "2 h 25 min"]} progreso={0.6} accion="Seguir" />
    <TarjetaExamen nivel="A2" titulo="DELE A2" tituloZh="初级" datos={["4 pruebas", "3 h"]} progreso={0.15} accion="Seguir" />
    <TarjetaExamen nivel="B1" titulo="DELE B1" tituloZh="中级" datos={["4 pruebas", "3 h 40 min"]} />
    <TarjetaExamen nivel="B2" titulo="DELE B2" tituloZh="中高级" datos={["4 pruebas", "4 h"]} />
  </Escena>
);
