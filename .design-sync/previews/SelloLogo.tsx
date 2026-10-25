import { SelloLogo } from "@ai-espanol/imperial";

export const Tamanos = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-end", padding: 16 }}>
    <SelloLogo tamano={32} />
    <SelloLogo tamano={64} />
    <SelloLogo tamano={120} />
  </div>
);
