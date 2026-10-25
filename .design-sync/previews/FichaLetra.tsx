import { FichaLetra, Pergamino } from "@ai-espanol/imperial";

export const PalabraDesordenada = () => (
  <Pergamino variante="rollo" style={{ display: "grid", gap: 18, maxWidth: 520 }}>
    <div className="im-fichas">
      {"IGCSARA".split("").map((l, i) => (
        <FichaLetra key={i} letra={l} />
      ))}
    </div>
    <div className="im-fichas">
      <FichaLetra letra="G" estado="colocada" />
      <FichaLetra letra="R" estado="colocada" />
      <FichaLetra letra="A" estado="colocada" />
      <FichaLetra estado="vacia" />
      <FichaLetra estado="vacia" />
      <FichaLetra estado="vacia" />
      <FichaLetra letra="S" estado="pista" />
    </div>
  </Pergamino>
);

export const Apalabrados = () => (
  <div className="im-fichas" style={{ padding: 16 }}>
    {[["H", 4], ["O", 1], ["L", 1], ["A", 1]].map(([l, p]) => (
      <FichaLetra key={l} letra={l} puntos={p} estado="correcta" tamano={56} />
    ))}
  </div>
);
