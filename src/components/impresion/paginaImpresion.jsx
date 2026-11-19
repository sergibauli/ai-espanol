import * as React from "react";

// Marco de página común a todo lo que se imprime (A4, cabecera y pie en cada página con «Página X de Y").
// Va en un <style> propio porque el texto de la cabecera depende del examen; solo existe mientras el
// componente que imprime está montado.
const comillas = (t) => `"${String(t || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ")}"`;

const FUENTE = `"Plus Jakarta Sans", "Noto Sans SC", "Noto Serif SC", "PingFang SC", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`;

export function EstiloPagina({ izquierda = "Wukong Español · 悟空西语", centro = "", derecha = "Nombre · 姓名: ______________________", pieIzquierda = "", pieCentro = "Fecha · 日期: ____ / ____ / ________" }) {
  const css = `
@media print {
  @page {
    size: A4;
    margin: 19mm 16mm 17mm 16mm;
    @top-left { content: ${comillas(izquierda)}; font: 700 8pt ${FUENTE}; color: #8f0c21; letter-spacing: .04em; vertical-align: bottom; padding-bottom: 2.2mm; border-bottom: 2.2pt double #c8961e; }
    @top-center { content: ${comillas(centro)}; font: 600 8pt ${FUENTE}; color: #3b2416; vertical-align: bottom; padding-bottom: 2.2mm; border-bottom: 2.2pt double #c8961e; }
    @top-right { content: ${comillas(derecha)}; font: 500 8pt ${FUENTE}; color: #3b2416; vertical-align: bottom; padding-bottom: 2.2mm; border-bottom: 2.2pt double #c8961e; }
    @bottom-left { content: ${comillas(pieIzquierda)}; font: 500 7.5pt ${FUENTE}; color: #6b5a40; vertical-align: top; padding-top: 2.2mm; border-top: .8pt solid #c8961e; }
    @bottom-center { content: ${comillas(pieCentro)}; font: 500 7.5pt ${FUENTE}; color: #6b5a40; vertical-align: top; padding-top: 2.2mm; border-top: .8pt solid #c8961e; }
    @bottom-right { content: "Página " counter(page) " de " counter(pages) "  ·  第 " counter(page) " 页"; font: 700 7.5pt ${FUENTE}; color: #8f0c21; vertical-align: top; padding-top: 2.2mm; border-top: .8pt solid #c8961e; }
  }
  @page portada {
    margin: 11mm;
    @top-left { content: none; border: 0; } @top-center { content: none; border: 0; } @top-right { content: none; border: 0; }
    @bottom-left { content: none; border: 0; } @bottom-center { content: none; border: 0; } @bottom-right { content: none; border: 0; }
  }
}`;
  return <style>{css}</style>;
}
