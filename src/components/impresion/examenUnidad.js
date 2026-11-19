// Fuente de impresión de un examen de unidad (o de clase) recién generado, para imprimirlo antes de hacerlo.
// examGenerator se importa al pulsar el botón, así la página de la unidad no lo descarga antes.
export function fuenteExamenUnidad(numero, { clase = null, tituloClase = "", total } = {}) {
  return async () => {
    const { generateExam } = await import("../../lib/examGenerator.js");
    const preguntas = total || (clase ? 12 : 25);
    const examen = await generateExam({
      modulos: [numero],
      clase: clase || undefined,
      total: preguntas,
      minutos: Math.round(preguntas * 1.3),
      conLectura: !clase,
      seed: Math.floor(Math.random() * 1e9),
    });
    const deClase = examen.config?.clase;
    return {
      tipo: "generado",
      examen,
      extra: {
        tipo: deClase ? `Examen de la clase ${deClase}` : "Examen de la unidad",
        tipoZh: deClase ? `第${deClase}课小测验` : "单元考试",
        sello: deClase ? "课" : "单",
        codigo: `Unidad ${numero}${deClase ? ` · Clase ${deClase}` : ""}`,
        titulo: deClase && tituloClase ? tituloClase : undefined,
      },
    };
  };
}
