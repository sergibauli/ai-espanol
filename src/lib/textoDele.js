// Da estructura a los textos de los exámenes DELE: muchos llegan como un único bloque sin saltos
// (cartas, artículos, transcripciones). Devuelve bloques que <TextoDele> pinta con separación.
//
// Tipos de bloque:
//   { tipo: "saludo" | "parrafo" | "despedida" | "firma" | "audio" | "nota" | "foto", texto }
//   { tipo: "turno", voz, detalle, texto }   — intervención de una voz en una transcripción
//   { tipo: "lista", items: [texto] }        — viñetas «• …» o «- …»

const ABREVIATURAS = /(?:\b(?:Sr|Sra|Srta|Dr|Dra|D|Dña|Ud|Uds|etc|pág|núm|tel|Avda|Av|aprox|p\. ej|EE\. UU|S\.A|h|min)\.)$/i;

const SALUDO =
  /^((?:¡?Hola|Querid[oa]s?|Estimad[oa]s?|Apreciad[oa]s?|Muy señor(?:a|es)? mí[oa]s?|Señor(?:a|es)?|A quien corresponda|Buenos días|Buenas tardes|Buenas noches)(?:,?\s+(?:a\s+)?(?:tod[oa]s|[A-ZÁÉÍÓÚÑ][\wáéíóúñü.-]*)){0,5}\s*(?:y\s+[A-ZÁÉÍÓÚÑ][\wáéíóúñü-]*)?\s*[:!,])\s+(?=[¿¡«"A-ZÁÉÍÓÚÑ])/;

const DESPEDIDA =
  /\s((?:Un (?:fuerte )?abrazo(?: fuerte)?|Un beso|Muchos besos|Besos|Besitos|Abrazos|Un saludo(?: cordial)?|Saludos(?: cordiales)?|Atentamente|Cordialmente|Recibe un cordial saludo|Reciba un cordial saludo|Hasta pronto|Nos vemos(?: pronto)?|Un cariño|Con cariño|Gracias de antemano)[^.!?]{0,25}?)[,.]?\s+([A-ZÁÉÍÓÚÑ][\wáéíóúñü-]+(?:\s+(?:de\s+)?[A-ZÁÉÍÓÚÑ][\wáéíóúñü-]+){0,3})\.?\s*$/;

const CONECTORES =
  /^(?:Además|Sin embargo|No obstante|Por otro lado|Por otra parte|Por una parte|En cambio|Por eso|Por ello|Por último|Por fin|Al final|Finalmente|Después|Luego|Ahora|Hoy|Al principio|En primer lugar|En segundo lugar|En tercer lugar|Primero|Segundo|Tercero|El primer|La primera|El segundo|La segunda|El tercer|El último|La última|Otro|Otra|Pero|Así|En resumen|En conclusión|Para terminar|En definitiva|Mientras tanto|Desde entonces|Aquel día|Un día|Esta semana|El mes pasado|El año pasado|Este año|En verano|En invierno|Por la mañana|Por la tarde|Por la noche|Los lunes|Los fines de semana|También|Asimismo|De hecho|Es decir|En cuanto a|Respecto a|Con respecto a|Según|Para|Si)\b/;

const contarPalabras = (texto) => (texto.match(/\S+/g) || []).length;

// Corta en frases sin romper abreviaturas ni cifras («3.5», «Sr. López»)
export function frases(texto) {
  const salida = [];
  let actual = "";
  const trozos = texto.split(/(?<=[.!?…»"])\s+(?=[¿¡«"(A-ZÁÉÍÓÚÑ0-9])/);
  for (const trozo of trozos) {
    actual = actual ? `${actual} ${trozo}` : trozo;
    if (ABREVIATURAS.test(actual)) continue;
    salida.push(actual);
    actual = "";
  }
  if (actual) salida.push(actual);
  return salida;
}

// Agrupa frases en párrafos de lectura cómoda (≈45–80 palabras), cortando preferentemente en conectores
function agruparEnParrafos(texto) {
  const total = contarPalabras(texto);
  if (total <= 70) return [texto];
  const objetivo = total <= 140 ? Math.ceil(total / 2) : Math.min(65, Math.ceil(total / 3));
  const lista = frases(texto);
  const parrafos = [];
  let actual = [];
  let palabras = 0;
  lista.forEach((frase, indice) => {
    const enFrase = contarPalabras(frase);
    const siguienteEsConector = CONECTORES.test(frase);
    const quedan = lista.slice(indice).reduce((suma, f) => suma + contarPalabras(f), 0);
    const cortar =
      actual.length >= 2 &&
      quedan >= 25 &&
      (palabras >= objetivo || (palabras >= objetivo * 0.6 && siguienteEsConector) || palabras + enFrase > objetivo * 1.35);
    if (cortar) {
      parrafos.push(actual.join(" "));
      actual = [];
      palabras = 0;
    }
    actual.push(frase);
    palabras += enFrase;
  });
  if (actual.length) parrafos.push(actual.join(" "));
  return parrafos;
}

// Texto con saltos de línea propios: se respetan (párrafos con línea en blanco, viñetas con «•» o «-»)
function bloquesConSaltos(texto) {
  const bloques = [];
  for (const parte of texto.split(/\n\s*\n/)) {
    const lineas = parte.split("\n").map((linea) => linea.trim()).filter(Boolean);
    if (!lineas.length) continue;
    const vinetas = lineas.filter((linea) => /^[•·\-–*]\s+/.test(linea));
    if (vinetas.length >= 2 && vinetas.length === lineas.length) {
      bloques.push({ tipo: "lista", items: lineas.map((linea) => linea.replace(/^[•·\-–*]\s+/, "")) });
      continue;
    }
    if (lineas.length > 1 && vinetas.length >= 2) {
      const cabecera = lineas.filter((linea) => !/^[•·\-–*]\s+/.test(linea));
      cabecera.forEach((linea) => bloques.push({ tipo: "parrafo", texto: linea }));
      bloques.push({ tipo: "lista", items: vinetas.map((linea) => linea.replace(/^[•·\-–*]\s+/, "")) });
      continue;
    }
    // Una sola línea muy larga dentro de un texto con saltos: también se trocea
    if (lineas.length === 1 && contarPalabras(lineas[0]) > 110) {
      agruparEnParrafos(lineas[0]).forEach((p) => bloques.push({ tipo: "parrafo", texto: p }));
      continue;
    }
    bloques.push({ tipo: "parrafo", texto: lineas.join("\n") });
  }
  return bloques;
}

// Transcripciones y guiones: «[AUDIO 1] [VOZ 1 - mujer, 30 años, Caribe] Texto… [pausa breve] …»
function bloquesDeGuion(texto) {
  const bloques = [];
  const regex = /\[([^\]]+)\]/g;
  let ultimo = 0;
  let turno = null;
  const anadirTexto = (trozo) => {
    const limpio = trozo.replace(/\s+/g, " ").trim();
    if (!limpio) return;
    if (turno) turno.texto = turno.texto ? `${turno.texto} ${limpio}` : limpio;
    else bloques.push({ tipo: "parrafo", texto: limpio });
  };
  let coincidencia;
  while ((coincidencia = regex.exec(texto))) {
    anadirTexto(texto.slice(ultimo, coincidencia.index));
    ultimo = regex.lastIndex;
    const etiqueta = coincidencia[1].trim();
    const voz = etiqueta.match(/^(VOZ\s*\d+|LOCUTOR[AE]?S?|NARRADOR[A]?|ENTREVISTADOR[A]?|CANDIDAT[OA])\s*(?:[-–—:]\s*(.*))?$/i);
    if (voz) {
      turno = { tipo: "turno", voz: voz[1].toUpperCase(), detalle: (voz[2] || "").trim(), texto: "" };
      // Si la misma voz sigue hablando, se une al turno anterior
      const previo = bloques[bloques.length - 1];
      if (previo?.tipo === "turno" && previo.voz === turno.voz && previo.detalle === turno.detalle) turno = previo;
      else bloques.push(turno);
    } else if (/^AUDIO\s*\d*/i.test(etiqueta) || /^(TEXTO|MENSAJE|ANUNCIO|NOTICIA|CONVERSACI[OÓ]N)\s*\d+/i.test(etiqueta)) {
      turno = null;
      bloques.push({ tipo: "audio", texto: etiqueta });
    } else if (/^FOTOGRAF[IÍ]A/i.test(etiqueta)) {
      turno = null;
      bloques.push({ tipo: "foto", texto: etiqueta.replace(/^FOTOGRAF[IÍ]A\s*(\d*)\s*:?\s*/i, (_, n) => (n ? `Fotografía ${n} · ` : "")) });
    } else if (turno) {
      turno.texto = `${turno.texto} ⟨${etiqueta}⟩`.trim();
    } else {
      bloques.push({ tipo: "nota", texto: etiqueta });
    }
  }
  anadirTexto(texto.slice(ultimo));
  return bloques.filter((bloque) => bloque.tipo !== "turno" || bloque.texto);
}

export function esGuion(texto) {
  return /\[(?:VOZ\s*\d|AUDIO\s*\d|FOTOGRAF)/i.test(texto || "");
}

export function parrafosDele(entrada) {
  const texto = String(entrada ?? "").replace(/\r/g, "").trim();
  if (!texto) return [];
  if (esGuion(texto)) return bloquesDeGuion(texto);
  if (texto.includes("\n")) return bloquesConSaltos(texto);

  const bloques = [];
  let cuerpo = texto;
  // Cartas, correos y mensajes: saludo y despedida en su propia línea
  const largoSuficiente = contarPalabras(texto) >= 45;
  const saludo = largoSuficiente ? cuerpo.match(SALUDO) : null;
  if (saludo) {
    bloques.push({ tipo: "saludo", texto: saludo[1] });
    cuerpo = cuerpo.slice(saludo[0].length);
  }
  const despedida = largoSuficiente ? cuerpo.match(DESPEDIDA) : null;
  let cierre = [];
  if (despedida && (saludo || contarPalabras(cuerpo) > 60)) {
    cuerpo = cuerpo.slice(0, despedida.index).trim();
    cierre = [
      { tipo: "despedida", texto: `${despedida[1].trim()},` },
      { tipo: "firma", texto: despedida[2].trim() },
    ];
  }
  agruparEnParrafos(cuerpo).forEach((parrafo) => bloques.push({ tipo: "parrafo", texto: parrafo }));
  return [...bloques, ...cierre];
}

// Trozos de una línea con los huecos «______» marcados para pintarlos como casillas
export function trozosConHuecos(texto) {
  return String(texto).split(/(_{3,})/).map((trozo) => ({ hueco: /^_{3,}$/.test(trozo), texto: trozo }));
}
