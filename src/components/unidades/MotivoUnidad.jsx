// Siluetas de la «ventana de luna» de cada tarjeta de unidad (SVG ligero, sin imágenes).
// Colores con currentColor/opacity para que tomen el tono del tema.
const MOTIVOS = {
  montes: (
    <>
      <path d="M0 62 L18 40 L30 52 L48 26 L66 50 L78 38 L100 60 L120 44 V80 H0Z" opacity=".35" />
      <path d="M0 70 L22 54 L40 66 L62 46 L84 64 L104 52 L120 62 V80 H0Z" opacity=".6" />
      <path d="M78 30 q4-6 8 0 q-4 2-8 0Z M88 24 q3-4 6 0 q-3 1.5-6 0Z" opacity=".5" />
    </>
  ),
  nubes: (
    <>
      <path d="M8 40 q6-10 16-4 q6-10 18-2 q10-2 10 6 H8Z" opacity=".45" />
      <path d="M70 30 q5-8 13-3 q6-8 15-1 q8-1 8 5 H70Z" opacity=".35" />
      <path d="M0 66 q14-14 30-4 q12-14 28-2 q14-12 30 0 q14-10 32 2 V80 H0Z" opacity=".6" />
    </>
  ),
  olas: (
    <>
      <path d="M0 56 q10-8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V80 H0Z" opacity=".35" />
      <path d="M0 64 q10-8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V80 H0Z" opacity=".55" />
      <path d="M0 72 q10-7 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V80 H0Z" opacity=".8" />
    </>
  ),
  bambu: (
    <>
      {[10, 22, 96, 108].map((x, i) => (
        <g key={x} opacity={i % 2 ? 0.45 : 0.7}>
          <rect x={x} y={i % 2 ? 14 : 4} width="4" height="76" rx="2" />
          <path d={`M${x + 4} 30 q10-6 16-2 q-8 4-16 2Z M${x} 44 q-10-6-16-2 q8 4 16 2Z`} />
        </g>
      ))}
      <path d="M0 72 q30-8 60 0 t60 0 V80 H0Z" opacity=".6" />
    </>
  ),
  tejado: (
    <>
      <path d="M14 46 q46-10 92 0 l-8 4 H22Z" opacity=".75" />
      <path d="M28 36 q32-8 64 0 l-6 4 H34Z" opacity=".55" />
      <rect x="30" y="50" width="60" height="22" opacity=".45" />
      <rect x="54" y="56" width="12" height="16" rx="6" opacity=".7" />
      <path d="M0 74 H120 V80 H0Z" opacity=".7" />
    </>
  ),
  flores: (
    <>
      <path d="M0 70 C20 52 40 58 60 40 S100 22 120 20" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".55" />
      {[[22, 58], [44, 48], [64, 38], [86, 30], [104, 23]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity=".8">
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 3.2} cy={Math.sin((a * Math.PI) / 180) * 3.2} r="2.6" />
          ))}
        </g>
      ))}
      <path d="M0 76 q30-6 60 0 t60 0 V80 H0Z" opacity=".55" />
    </>
  ),
  farolillos: (
    <>
      <path d="M0 14 q60 14 120 0" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".5" />
      {[18, 46, 74, 102].map((x, i) => (
        <g key={x} opacity={i % 2 ? 0.55 : 0.8}>
          <line x1={x} y1={16 + (i % 2) * 2} x2={x} y2={22 + (i % 2) * 2} stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx={x} cy={30 + (i % 2) * 2} rx="7" ry="8" />
        </g>
      ))}
      <path d="M0 70 q30-8 60 0 t60 0 V80 H0Z" opacity=".55" />
    </>
  ),
  abaco: (
    <>
      {[30, 44, 58].map((y) => (
        <g key={y}>
          <line x1="10" y1={y} x2="110" y2={y} stroke="currentColor" strokeWidth="1.2" opacity=".45" />
          {[18, 28, 38, 74, 84].map((x, i) => (
            <ellipse key={x} cx={x + ((y / 2) % 7)} cy={y} rx="4.4" ry="3.2" opacity={i < 3 ? 0.75 : 0.45} />
          ))}
        </g>
      ))}
      <path d="M0 72 q30-6 60 0 t60 0 V80 H0Z" opacity=".55" />
    </>
  ),
};

export function MotivoUnidad({ motivo }) {
  return (
    <svg className="u19-motivo" viewBox="0 0 120 80" preserveAspectRatio="xMidYMax slice" fill="currentColor" aria-hidden="true">
      {MOTIVOS[motivo] || MOTIVOS.montes}
    </svg>
  );
}
