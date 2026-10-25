import { Icono } from "@ai-espanol/imperial";

const nombres = ["ruta", "unidades", "dele", "juegos", "diccionario", "pronunciacion", "repaso", "progreso", "tutor"] as const;

export const Todos = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 96px)", gap: 14, padding: 16 }}>
    {nombres.map((n) => (
      <div key={n} style={{ display: "grid", justifyItems: "center", gap: 6, font: "600 12px var(--im-font-ui)", color: "var(--im-tinta-500)" }}>
        <span style={{ width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center", background: "radial-gradient(circle at 35% 30%, #fff7da, var(--im-oro-500))", boxShadow: "0 0 0 2px #fff3cf, 0 4px 10px rgba(0,0,0,.2)" }}>
          <Icono nombre={n} tamano={48} />
        </span>
        {n}
      </div>
    ))}
  </div>
);
