import * as React from "react";
import { parrafosDele, trozosConHuecos } from "../../lib/textoDele.js";

// Pinta un texto de examen DELE con párrafos, saludo/despedida de cartas, turnos de voz y huecos.
// variante: "lectura" (texto principal, tipografía grande con capitular),
//           "compacto" (anuncios, fragmentos, textos breves), "guion" (transcripciones).
function ConHuecos({ texto }) {
  const partes = trozosConHuecos(texto);
  return partes.map((parte, indice) =>
    parte.hueco ? (
      <span key={indice} className="td-hueco" aria-label="hueco · 空格">
        &nbsp;
      </span>
    ) : (
      <React.Fragment key={indice}>
        {parte.texto.split(/(⟨[^⟩]+⟩)/).map((trozo, posicion) =>
          /^⟨[^⟩]+⟩$/.test(trozo) ? (
            <em key={posicion} className="td-acot">
              {trozo.slice(1, -1)}
            </em>
          ) : (
            trozo
          ),
        )}
      </React.Fragment>
    ),
  );
}

const colorDeVoz = (voz) => {
  const numero = Number((voz.match(/\d+/) || [0])[0]);
  return `td-voz-${numero % 6}`;
};

export default function TextoDele({ texto, variante = "lectura", className = "", numerarParrafos, ...resto }) {
  const bloques = React.useMemo(() => parrafosDele(texto), [texto]);
  if (!bloques.length) return null;
  const totalParrafos = bloques.filter((bloque) => bloque.tipo === "parrafo").length;
  const numerar = numerarParrafos ?? (variante === "lectura" && totalParrafos >= 4);
  let numeroParrafo = 0;
  return (
    <div className={`td td-${variante} ${numerar ? "td-numerado" : ""} ${className}`} {...resto}>
      {bloques.map((bloque, indice) => {
        switch (bloque.tipo) {
          case "saludo":
            return (
              <p key={indice} className="td-saludo">
                {bloque.texto}
              </p>
            );
          case "despedida":
            return (
              <p key={indice} className="td-despedida">
                {bloque.texto}
              </p>
            );
          case "firma":
            return (
              <p key={indice} className="td-firma">
                {bloque.texto}
              </p>
            );
          case "audio":
            return (
              <div key={indice} className="td-audio" role="heading" aria-level={4}>
                <span>{bloque.texto}</span>
              </div>
            );
          case "foto":
            return (
              <div key={indice} className="td-foto">
                <span className="td-foto-icono" aria-hidden="true">
                  📷
                </span>
                <span>{bloque.texto}</span>
              </div>
            );
          case "nota":
            return (
              <p key={indice} className="td-nota">
                {bloque.texto}
              </p>
            );
          case "turno":
            return (
              <div key={indice} className={`td-turno ${colorDeVoz(bloque.voz)}`}>
                <div className="td-quien">
                  <span className="td-voz">{bloque.voz.replace(/^VOZ\s*/, "Voz ")}</span>
                  {bloque.detalle && <span className="td-detalle">{bloque.detalle}</span>}
                </div>
                <p className="td-dice">
                  <ConHuecos texto={bloque.texto} />
                </p>
              </div>
            );
          case "lista":
            return (
              <ul key={indice} className="td-lista">
                {bloque.items.map((item, posicion) => (
                  <li key={posicion}>
                    <ConHuecos texto={item} />
                  </li>
                ))}
              </ul>
            );
          default:
            numeroParrafo += 1;
            return (
              <p key={indice} className="td-p" data-n={numerar ? numeroParrafo : undefined}>
                <ConHuecos texto={bloque.texto} />
              </p>
            );
        }
      })}
    </div>
  );
}
