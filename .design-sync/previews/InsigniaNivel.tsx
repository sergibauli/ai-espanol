import { InsigniaNivel } from "@ai-espanol/imperial";

export const Niveles = () => (
  <div style={{ display: "flex", gap: 18, padding: 16, alignItems: "center" }}>
    {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((n) => (
      <InsigniaNivel key={n} nivel={n} />
    ))}
  </div>
);

export const Tamanos = () => (
  <div style={{ display: "flex", gap: 18, padding: 16, alignItems: "center" }}>
    <InsigniaNivel nivel="B1" tamano="sm" />
    <InsigniaNivel nivel="B1" />
    <InsigniaNivel nivel="B1" tamano="lg" />
  </div>
);
