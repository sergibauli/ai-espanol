import { HeroSeccion, Boton } from "@ai-espanol/imperial";

export const Unidades = () => (
  <div style={{ width: 860 }}>
    <HeroSeccion
      ceja="Unidades · 单元"
      titulo="Tu camino del A1 al B2"
      tituloZh="从A1到B2的学习之路"
      descripcion="80 unidades con diálogos, vocabulario, gramática y juegos. Completa una y se abre la siguiente."
      descripcionZh="80个单元：对话、词汇、语法和游戏。完成一个，解锁下一个。"
      mascota="saluda"
      acciones={
        <>
          <Boton variante="oro">Continuar unidad 2</Boton>
          <Boton variante="fantasma">Ver todas</Boton>
        </>
      }
    />
  </div>
);

export const SinMascota = () => (
  <div style={{ width: 860 }}>
    <HeroSeccion ceja="DELE · 考试" titulo="Exámenes DELE oficiales" tituloZh="DELE官方模拟考试" descripcion="Simulacros con tiempo real y corrección según los criterios de los examinadores." />
  </div>
);
