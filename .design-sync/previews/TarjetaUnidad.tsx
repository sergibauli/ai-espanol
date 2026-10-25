import { TarjetaUnidad, Pergamino } from "@ai-espanol/imperial";

const rejilla = { display: "grid", gridTemplateColumns: "repeat(4, 170px)", gap: 16 };

export const RejillaA1 = () => (
  <Pergamino titulo="A1 · Principiante" tituloZh="初级">
    <div style={rejilla}>
      <TarjetaUnidad numero={1} titulo="Hola y adiós" tituloZh="你好和再见" icono="👋" estado="completada" progreso={1} />
      <TarjetaUnidad numero={2} titulo="Por favor y gracias" tituloZh="请和谢谢" icono="🙏" estado="en-curso" progreso={0.55} />
      <TarjetaUnidad numero={3} titulo="Me llamo…" tituloZh="我叫…" icono="📛" estado="nuevo" />
      <TarjetaUnidad numero={4} titulo="¿De dónde eres?" tituloZh="你从哪里来？" icono="🌏" estado="bloqueada" />
    </div>
  </Pergamino>
);

export const EnCurso = () => (
  <div style={{ width: 200, padding: 12 }}>
    <TarjetaUnidad numero={7} titulo="La familia" tituloZh="家庭" icono="👨‍👩‍👧" estado="en-curso" progreso={0.3} />
  </div>
);
