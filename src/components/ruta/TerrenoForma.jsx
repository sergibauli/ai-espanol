import * as React from "react";

/*
  v23 · Escenario de cada recorrido (va dentro del SVG del camino, debajo de todo).
  Relieve (cara lateral del camino), halo de suelo y agua del río; la tinta lleva borde de pincel (filtro tf-pincel).
*/
export function TerrenoForma({ forma, pts, camino }) {
  const tipo = forma.tipo;
  return (
    <g className={`tf tf-${tipo}`}>
      <defs>
        <linearGradient id="tf-pino" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".18" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="tf-bronce" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8cf9a" />
          <stop offset=".5" stopColor="#a8783c" />
          <stop offset="1" stopColor="#4a2f1b" />
        </linearGradient>
        <linearGradient id="tf-agua" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d8fc4" />
          <stop offset=".5" stopColor="#8fd3f0" />
          <stop offset="1" stopColor="#3d8fc4" />
        </linearGradient>
      </defs>
      {/* Halo de suelo bajo todo el recorrido */}
      <path className="tf-suelo" d={camino} />
      {/* Cara lateral (relieve) */}
      <path className="tf-lado" d={camino} />
      <path className="tf-lado-textura" d={camino} />
      {tipo === "rio" && (
        <>
          <path className="tf-orilla" d={camino} />
          <path className="tf-agua" d={camino} />
          <path className="tf-reflejo" d={camino} />
        </>
      )}
      {tipo === "pincel" && <path className="tf-aguada" d={camino} />}
      <filter id="tf-pincel" x="-20%" y="-5%" width="140%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.09" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="9" />
      </filter>
    </g>
  );
}
