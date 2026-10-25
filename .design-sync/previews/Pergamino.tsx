import { Pergamino, Escena } from "@ai-espanol/imperial";

const texto = "Las palabras mágicas son «por favor» y «gracias». En España se usan mucho en tiendas, bares y en casa.";

export const Papel = () => (
  <Escena variante="noche" style={{ width: 600 }}>
    <Pergamino titulo="Las palabras mágicas" tituloZh="礼貌用语">
      <p style={{ margin: 0, lineHeight: 1.6 }}>{texto}</p>
    </Pergamino>
  </Escena>
);

export const Rollo = () => (
  <Escena variante="noche" style={{ width: 600, paddingTop: 40, paddingBottom: 40 }}>
    <Pergamino variante="rollo" titulo="Una invitación de cumpleaños" tituloZh="生日邀请">
      <p style={{ margin: 0, lineHeight: 1.6 }}>Querida Ana: el sábado celebro mi cumpleaños en casa a las ocho. ¿Vienes?</p>
    </Pergamino>
  </Escena>
);

export const Tablilla = () => (
  <div style={{ width: 600, padding: 12 }}>
    <Pergamino variante="tablilla" titulo="Guía rápida" tituloZh="快速指南">
      <p style={{ margin: 0, lineHeight: 1.6 }}>{texto}</p>
    </Pergamino>
  </div>
);
