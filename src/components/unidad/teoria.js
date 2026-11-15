// v23 · Convierte el texto de teoría de una unidad (con sus emojis, viñetas, «=» y tablas markdown) en bloques con jerarquía:
//   h (título de apartado) · p (párrafo) · pares (equivalencias «20 = veinte») · list (viñetas, con sub-viñetas)
//   table (tabla markdown) · note / tip / error (tablillas colgadas)
// El chino se analiza con la misma función para emparejar cada bloque con su traducción (mismo tipo y orden).

const BULLET = /^([•\-–*→✅▪◦·]|\d+[.º)](?=\s)|\p{Extended_Pictographic}️?)\s*/u;
const EMOJI_INICIAL = /^(\p{Extended_Pictographic}|️|‍|\s)+/u;
const NOTA = /^📌/u;
const ERROR = /^❌/u;
const CONSEJO = /^(💡|✅\s*CONSEJO|⭐)/u;
const TITULO_EMOJI = /^(🔹|🔸|📊|📖|📝|🎯|🗣️?|🧩|📚|🔑|⚠️?)/u;

// «20 = veinte», «Disculpe (usted) = Formal», «yo → hablo», «Masculino: veintiún años»
export function separar(texto) {
  const m = texto.match(/^(.{1,60}?)\s(?:=|→|⇒)\s(.+)$/) || texto.match(/^(.{1,40}?)\s[–-]\s(.+)$/) || texto.match(/^([^:：]{2,36})[:：]\s(.+)$/);
  return m ? { term: m[1].trim(), def: m[2].trim() } : { term: texto, def: "" };
}
const esPar = (l) => /^.{1,40}?\s(=|→)\s.+$/.test(l) && l.length <= 90;
const limpiarTitulo = (l) => l.replace(EMOJI_INICIAL, "").replace(/[:：]\s*$/, "").trim();

export function analizarTeoria(texto) {
  const bloques = [];
  let cur = null;
  const cerrar = () => (cur = null);
  for (const crudo of String(texto || "").replace(/：[ \t]*$/gm, ":").split("\n")) {
    const sangria = crudo.match(/^\s*/)[0].length;
    const l = crudo.trim();
    if (!l) {
      if (cur && !["list", "table", "pares"].includes(cur.type)) cerrar();
      continue;
    }
    // Tablas markdown
    if (l.startsWith("|")) {
      if (/^\|[\s|:-]+\|?$/.test(l)) continue;
      const celdas = l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      if (cur?.type !== "table") bloques.push((cur = { type: "table", rows: [] }));
      cur.rows.push(celdas);
      continue;
    }
    // 📌 TÍTULO: → subtítulo; 📌 texto largo → nota
    if (NOTA.test(l)) {
      const resto = l.replace(EMOJI_INICIAL, "").trim();
      if (/[:：]$/.test(resto) && resto.length <= 100) {
        bloques.push({ type: "h", nivel: 2, text: limpiarTitulo(resto) });
        cerrar();
      } else {
        const [cab, ...cuerpo] = resto.split(/[:：]\s/);
        bloques.push((cur = { type: "note", titulo: cuerpo.length && cab.length < 40 ? cab : "", lines: [cuerpo.length && cab.length < 40 ? cuerpo.join(": ") : resto].filter(Boolean) }));
      }
      continue;
    }
    if (ERROR.test(l) || CONSEJO.test(l)) {
      const tipo = ERROR.test(l) ? "error" : "tip";
      const resto = l.replace(EMOJI_INICIAL, "").replace(/^(ERROR(ES)? COMÚN(ES)?|CONSEJO|ATENCIÓN|OJO|TRUCO)\s*[:：]?\s*/i, "").trim();
      bloques.push((cur = { type: tipo, lines: resto && !/[:：]$/.test(resto) ? [resto] : [] }));
      continue;
    }
    if (cur && ["note", "error", "tip"].includes(cur.type)) {
      cur.lines.push(l.replace(BULLET, ""));
      continue;
    }
    // Títulos: «🔹 REGLA 1: …», «Las decenas en español:»
    if (TITULO_EMOJI.test(l) || (/[:：]$/.test(l) && l.length <= 80 && !BULLET.test(l))) {
      bloques.push({ type: "h", nivel: TITULO_EMOJI.test(l) ? 1 : 2, text: limpiarTitulo(l) });
      cerrar();
      continue;
    }
    // Sub-viñeta (sangrada) → cuelga del último punto de la lista
    if (sangria >= 2 && BULLET.test(l) && cur?.type === "list" && cur.items.length) {
      (cur.items[cur.items.length - 1].sub ||= []).push(l.replace(BULLET, ""));
      continue;
    }
    if (BULLET.test(l)) {
      const ordenada = /^\d+[.º)]\s/.test(l);
      if (cur?.type !== "list") bloques.push((cur = { type: "list", ordenada, items: [] }));
      cur.items.push({ ...separar(l.replace(BULLET, "")), raw: l.replace(BULLET, "") });
      continue;
    }
    // Líneas seguidas tipo «20 = veinte» → tabla de equivalencias
    if (esPar(l)) {
      if (cur?.type !== "pares") bloques.push((cur = { type: "pares", items: [] }));
      cur.items.push({ ...separar(l), raw: l });
      continue;
    }
    if (/^\.\.\.|^…/.test(l) && cur?.type === "pares") {
      cur.items.push({ term: "…", def: "" });
      continue;
    }
    bloques.push({ type: "p", text: l });
    cerrar();
  }
  return bloques;
}

/** Empareja cada bloque español con el bloque chino del mismo tipo y orden */
export function emparejar(es, zh) {
  const cuenta = {};
  const orden = es.map((b) => (cuenta[b.type] = (cuenta[b.type] ?? -1) + 1));
  const zhPorTipo = {};
  zh.forEach((b) => (zhPorTipo[b.type] ||= []).push(b));
  return es.map((b, i) => [b, zh[i] && zh[i].type === b.type ? zh[i] : zhPorTipo[b.type]?.[orden[i]] || null]);
}

/** Términos cortos que se pueden escuchar (para la barra «Escucha») */
export function terminosAudibles(bloques) {
  const out = [];
  for (const b of bloques) {
    if (b.type === "list" || b.type === "pares") for (const x of b.items) if (x.term && x.term.length <= 32 && /[a-záéíóúñ]/i.test(x.term) && !/^\d+$/.test(x.term) && !/-(\s|\*|$)/.test(x.term)) out.push(x.term.replace(/\*\*/g, ""));
    if (b.type === "pares") for (const x of b.items) if (/^\d+$/.test(x.term) && x.def) out.push(x.def.replace(/\s*\(.*\)\s*$/, ""));
  }
  return [...new Set(out)];
}
