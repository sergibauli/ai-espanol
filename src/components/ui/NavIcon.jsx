import * as React from "react";

// Iconos propios del menú (dibujo de línea en laca roja sobre medallón dorado)
const R = "#8f0c21";
const PATHS = {
  ruta: (
    <>
      <path d="M8 19 24 9l16 10Z" fill={R} />
      <path d="M12 28 24 21l12 7Z" fill={R} />
      <rect x="16" y="28" width="16" height="11" rx="1" fill="none" stroke={R} strokeWidth="2.6" />
      <path d="M22 39v-6h4v6" fill={R} />
    </>
  ),
  unidades: (
    <>
      <rect x="13" y="13" width="22" height="22" rx="2" fill="#fff6dc" stroke={R} strokeWidth="2.4" />
      <rect x="10" y="9" width="28" height="5" rx="2.5" fill={R} />
      <rect x="10" y="34" width="28" height="5" rx="2.5" fill={R} />
      <path d="M18 20h12M18 25h12M18 30h8" stroke={R} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  dele: (
    <>
      <path d="m17 30-4 11 6-3 3 5 3-9M31 30l4 11-6-3-3 5-3-9" fill={R} />
      <circle cx="24" cy="21" r="12" fill="#fff6dc" stroke={R} strokeWidth="2.6" />
      <path d="m24 13 2.4 5 5.4.6-4 3.7 1.1 5.3L24 25l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6Z" fill={R} />
    </>
  ),
  juegos: (
    <>
      <path d="M24 6v4" stroke={R} strokeWidth="2.4" />
      <rect x="17" y="9" width="14" height="4" rx="1.5" fill={R} />
      <ellipse cx="24" cy="24" rx="13" ry="11" fill={R} />
      <path d="M24 13v22M17 14.5c-3 6-3 13 0 19M31 14.5c3 6 3 13 0 19" stroke="#f2c14e" strokeWidth="1.6" fill="none" />
      <rect x="17" y="34" width="14" height="4" rx="1.5" fill={R} />
      <path d="M24 38v6" stroke={R} strokeWidth="2.4" />
    </>
  ),
  diccionario: (
    <>
      <path d="M24 14c-4-3-9-3-14-2v24c5-1 10-1 14 2 4-3 9-3 14-2V12c-5-1-10-1-14 2Z" fill="#fff6dc" stroke={R} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 14v24" stroke={R} strokeWidth="2.2" />
      <path d="M14 20h6M14 25h6M28 20h6M28 25h6M28 30h4" stroke={R} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  pronunciacion: (
    <>
      <path d="M14 9h20" stroke={R} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M17 9v3M31 9v3" stroke={R} strokeWidth="2.4" />
      <circle cx="24" cy="25" r="11" fill={R} />
      <circle cx="24" cy="25" r="4.5" fill="#f2c14e" />
      <path d="M8 19c-2.5 4-2.5 8 0 12M40 19c2.5 4 2.5 8 0 12" stroke={R} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  ),
  tutor: (
    <>
      <circle cx="11" cy="24" r="5" fill={R} />
      <circle cx="37" cy="24" r="5" fill={R} />
      <circle cx="24" cy="25" r="13" fill={R} />
      <path d="M15 27c0-5 4-8 9-8s9 3 9 8-4 9-9 9-9-4-9-9Z" fill="#fff6dc" />
      <circle cx="20" cy="26" r="1.8" fill={R} />
      <circle cx="28" cy="26" r="1.8" fill={R} />
      <path d="M21 31c2 1.6 4 1.6 6 0" stroke={R} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M12 15c4-4 20-4 24 0" stroke="#f2c14e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="m24 11 2 3h-4Z" fill="#f2c14e" />
    </>
  ),
  progreso: (
    <>
      <path d="M8 32a16 16 0 0 1 32 0" fill="none" stroke={R} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M8 32a16 16 0 0 1 9-14.4" fill="none" stroke="#f2c14e" strokeWidth="3.4" strokeLinecap="round" />
      <path d="m24 32 8-10" stroke={R} strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="32" r="3.4" fill={R} />
      <rect x="12" y="36" width="24" height="4" rx="2" fill={R} />
    </>
  ),
  repaso: (
    <>
      <circle cx="24" cy="24" r="14" fill="#fff6dc" stroke={R} strokeWidth="2.4" />
      <path d="M24 10a7 7 0 0 1 0 14 7 7 0 0 0 0 14 14 14 0 0 1 0-28Z" fill={R} />
      <circle cx="24" cy="17" r="2.4" fill="#fff6dc" />
      <circle cx="24" cy="31" r="2.4" fill={R} />
    </>
  ),
};

export function NavIcon({ name, size = 40 }) {
  return (
    <svg className="nav-ic" viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
