// Divide cada unidad en «clases» de 50–60 minutos y escribe src/data/modulos/clases.json (índice ligero de ids).
// Uso: node scripts/build-clases.mjs   (determinista: mismo contenido → mismo reparto)
//
// Criterio pedagógico:
//  - La teoría se reparte en orden (progresión), 1–2 puntos por clase, equilibrando la longitud de los textos.
//  - Cada diálogo va a la clase con la que más vocabulario/teoría comparte.
//  - Cada palabra va a la clase cuya teoría o diálogos la usan, equilibrando tamaños (8–13 palabras por clase).
//  - Cada ejercicio (y cada elemento del plus: objetivos, banco, huecos, frases, errores) va a la clase cuyo
//    vocabulario/teoría contiene su enunciado o su respuesta; si no hay pistas, reparto equilibrado por posición.
//  - La lectura, el reto y la historia cierran la unidad (última clase); la cultura abre la primera.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dir = path.resolve("src/data/modulos");
const plusDir = path.resolve("src/data/plus");

// ---------- Carga de unidades (01-20 … 61-80 y las futuras 81-85, 86-90 si ya existen) ----------
const unidades = [];
const ficheros = fs.readdirSync(dir).filter((f) => /^modulos-\d+-\d+\.js$/.test(f)).sort();
for (const fichero of ficheros) {
  try {
    const mod = await import(pathToFileURL(path.join(dir, fichero)).href);
    const lista = Object.values(mod).find(Array.isArray) || [];
    unidades.push(...lista.filter((u) => u && Number.isFinite(u.numero)));
  } catch (e) {
    console.warn(`⚠️  ${fichero} no se pudo leer (se ignora): ${e.message}`);
  }
}
const vistos = new Set();
const todas = unidades.sort((a, b) => a.numero - b.numero).filter((u) => !vistos.has(u.numero) && vistos.add(u.numero));

function leerPlus(numero) {
  try {
    return JSON.parse(fs.readFileSync(path.join(plusDir, `modulo-${numero}.json`), "utf8"));
  } catch {
    return null;
  }
}

// ---------- Texto normalizado y coincidencias ----------
const normalizar = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const ARTICULOS = new Set(["el", "la", "los", "las", "un", "una", "unos", "unas", "lo", "al", "del"]);
const VACIAS = new Set(["para", "como", "pero", "este", "esta", "esto", "estos", "estas", "tiene", "tienes", "muy", "mas", "que", "con", "por", "una", "unos", "unas", "los", "las", "del", "son", "sus", "hay", "ser", "estar", "cuando", "donde", "tambien", "hola", "bien", "puedo", "quiero", "usted", "ustedes", "nosotros", "ellos", "ellas", "tengo", "esta", "estan", "eres", "somos", "todo", "todos", "cada", "otro", "otra", "aqui", "alli", "entre", "sobre", "desde", "hasta", "porque", "sino", "solo", "mucho", "mucha", "muchos", "muchas"]);

// Textos (solo strings) de cualquier objeto, sin las explicaciones en chino (se pierden al normalizar)
function textos(obj, fuera = new Set()) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  if (typeof obj === "number" || typeof obj === "boolean") return "";
  if (Array.isArray(obj)) return obj.map((x) => textos(x, fuera)).join(" \n ");
  return Object.entries(obj)
    .filter(([k]) => !fuera.has(k))
    .map(([, v]) => textos(v, fuera))
    .join(" \n ");
}
const SIN_ID = new Set(["id"]);
const preparado = (s) => {
  const n = normalizar(s);
  return { frase: ` ${n} `, tokens: n.split(" ").filter(Boolean) };
};

// Variantes de una palabra del vocabulario: «médico / médica», «el cabello (pelo)» → [medico, medica, cabello, pelo]
function variantes(espanol) {
  return String(espanol || "")
    .split(/[\/,;()（）]|\s-\s/)
    .map((v) => normalizar(v).split(" ").filter(Boolean))
    .map((t) => {
      while (t.length > 1 && ARTICULOS.has(t[0])) t.shift();
      return t;
    })
    .filter((t) => t.length && t.join("").length >= 2);
}
function coincide(vars, texto) {
  for (const t of vars) {
    if (t.length === 1) {
      const w = t[0];
      if (texto.frase.includes(` ${w} `)) return true;
      if (w.length >= 5) {
        const raiz = w.slice(0, w.length - (w.length >= 7 ? 2 : 1));
        if (texto.tokens.some((x) => x.startsWith(raiz) && x.length <= w.length + 3)) return true;
      }
    } else {
      if (texto.frase.includes(` ${t.join(" ")} `)) return true;
      const llenas = t.filter((x) => x.length >= 4 && !VACIAS.has(x));
      if (llenas.length >= 2 && llenas.every((x) => texto.tokens.includes(x))) return true;
    }
  }
  return false;
}

// ---------- Reparto equilibrado ----------
// puntos[i][c] = afinidad del elemento i con la clase c. Respeta la capacidad (ceil(n/K)) y, si hay
// elementos de sobra, deja al menos `minimo` en cada clase. Desempata por posición (orden original).
function repartir(puntos, K, { capacidad, minimo = 0, fijos = {}, prior = 0.001 } = {}) {
  const n = puntos.length;
  const cap = capacidad ?? Math.ceil(n / K);
  const asignado = new Array(n).fill(-1);
  const cuenta = new Array(K).fill(0);
  for (const [i, c] of Object.entries(fijos)) {
    asignado[i] = c;
    cuenta[c]++;
  }
  const libres = [];
  for (let i = 0; i < n; i++) if (asignado[i] < 0) libres.push(i);
  const libresN = libres.length;
  const conPrior = (i, c, k) => puntos[i][c] + prior * (K - Math.abs(c + 0.5 - ((k + 0.5) * K) / Math.max(1, libresN)));
  const pos = new Map(libres.map((i, k) => [i, k]));
  const orden = [...libres].sort((a, b) => {
    const m = (i) => {
      const s = [...puntos[i]].sort((x, y) => y - x);
      return s[0] - (s[1] ?? 0) + s[0] * 0.01;
    };
    return m(b) - m(a) || a - b;
  });
  for (const i of orden) {
    const clases = [...Array(K).keys()].filter((c) => cuenta[c] < cap);
    const lista = clases.length ? clases : [...Array(K).keys()];
    let mejor = lista[0];
    for (const c of lista) if (conPrior(i, c, pos.get(i)) > conPrior(i, mejor, pos.get(i))) mejor = c;
    asignado[i] = mejor;
    cuenta[mejor]++;
  }
  // Mejora local: intercambia parejas de elementos entre clases mientras suba la afinidad total
  const valor = (i, c) => conPrior(i, c, pos.get(i));
  for (let vuelta = 0, mejora = true; mejora && vuelta < 50; vuelta++) {
    mejora = false;
    for (const i of libres)
      for (const j of libres) {
        const a = asignado[i];
        const b = asignado[j];
        if (a === b || j <= i) continue;
        if (valor(i, b) + valor(j, a) > valor(i, a) + valor(j, b) + 1e-9) {
          asignado[i] = b;
          asignado[j] = a;
          mejora = true;
        }
      }
  }
  // Ninguna clase por debajo del mínimo: se le pasa el elemento más afín de la clase más llena
  for (let c = 0; c < K; c++) {
    while (cuenta[c] < minimo && libresN >= K * minimo) {
      const donante = [...Array(K).keys()].filter((d) => d !== c && cuenta[d] > minimo).sort((a, b) => cuenta[b] - cuenta[a])[0];
      if (donante === undefined) break;
      const candidatos = libres.filter((i) => asignado[i] === donante);
      if (!candidatos.length) break;
      const i = candidatos.sort((a, b) => puntos[b][c] - puntos[b][donante] - (puntos[a][c] - puntos[a][donante]) || a - b)[0];
      asignado[i] = c;
      cuenta[donante]--;
      cuenta[c]++;
    }
  }
  return asignado;
}

// Partición contigua de la teoría en K grupos de 1–2 puntos, equilibrando la longitud
function partirTeoria(teoria, K) {
  const largo = teoria.map((t) => String(t.descripcion || "").length + 200 * (t.ejemplos || []).length + 300);
  const maxPorClase = Math.max(2, Math.ceil(teoria.length / K));
  let mejor = null;
  const probar = (inicio, grupos) => {
    if (grupos.length === K) {
      if (inicio !== teoria.length) return;
      const pesos = grupos.map(([a, b]) => largo.slice(a, b).reduce((x, y) => x + y, 0));
      const coste = Math.max(...pesos) * 1000 + (Math.max(...pesos) - Math.min(...pesos));
      if (!mejor || coste < mejor.coste) mejor = { coste, grupos };
      return;
    }
    for (let tam = 1; tam <= maxPorClase && inicio + tam <= teoria.length; tam++) probar(inicio + tam, [...grupos, [inicio, inicio + tam]]);
  };
  probar(0, []);
  return mejor.grupos;
}

const minuscula = (s) => (s && /^\p{Lu}\p{Ll}/u.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
function tituloClase(teorias) {
  const es = teorias.map((t) => String(t.titulo || "").trim()).filter(Boolean);
  const zh = teorias.map((t) => String(t.tituloChino || "").trim()).filter(Boolean);
  let tituloEs = es[0] || "";
  if (es.length > 1) tituloEs = es.some((t) => /\sy\s/.test(t)) || es.join("").length > 52 ? es.join(" · ") : `${es[0]} y ${minuscula(es[1])}`;
  return { titulo: tituloEs, tituloChino: zh.join("、") };
}

// ---------- Reparto de una unidad ----------
function clasesDeUnidad(u) {
  const plus = leerPlus(u.numero);
  const teoria = u.teoria || [];
  const vocab = u.vocabulario || [];
  const dialogos = u.dialogos || [];
  const T = teoria.length;
  const V = vocab.length;
  let K = V > 26 || T >= 5 ? 3 : 2;
  K = Math.max(K, Math.ceil(T / 2));
  K = Math.max(1, Math.min(K, T || 1, Math.max(1, Math.floor(V / 3)) || 1));

  const grupos = T ? partirTeoria(teoria, K) : [[0, 0]];
  const claseDeTeoria = [];
  grupos.forEach(([a, b], c) => {
    for (let i = a; i < b; i++) claseDeTeoria[i] = c;
  });

  const textoTeoria = teoria.map((t) => ({ titulo: preparado(t.titulo), cuerpo: preparado(`${t.titulo}\n${t.descripcion}\n${textos(t.ejemplos)}`) }));
  const textoDialogo = dialogos.map((d) => preparado(`${d.titulo}\n${textos((d.lineas || []).map((l) => l.texto))}`));
  const vars = vocab.map((v) => variantes(v.espanol));

  // 1) Afinidad de cada palabra con la teoría de cada clase
  const afinTeoria = vocab.map((_, w) => {
    const s = new Array(K).fill(0);
    teoria.forEach((_, i) => {
      const c = claseDeTeoria[i];
      // Presencia (no suma): una clase con dos teorías no gana solo por tener más texto
      const p = (coincide(vars[w], textoTeoria[i].titulo) ? 3 : 0) + (coincide(vars[w], textoTeoria[i].cuerpo) ? 2 : 0);
      s[c] = Math.max(s[c], p);
    });
    return s;
  });
  const norm = (s) => {
    const tot = s.reduce((a, b) => a + b, 0);
    return tot ? s.map((x) => x / tot) : s.map(() => 0);
  };

  // Palabras «distintivas» de la teoría de cada clase (no aparecen en la teoría de otras)
  const tokensTeoria = Array.from({ length: K }, () => new Set());
  teoria.forEach((_, i) => textoTeoria[i].cuerpo.tokens.filter((x) => x.length >= 4 && !VACIAS.has(x)).forEach((x) => tokensTeoria[claseDeTeoria[i]].add(x)));
  const distintivas = (conjuntos) => conjuntos.map((set, c) => new Set([...set].filter((x) => conjuntos.every((o, d) => d === c || !o.has(x)))));
  const distTeoria = distintivas(tokensTeoria);
  const solape = (texto, set) => texto.tokens.filter((x, k, arr) => set.has(x) && arr.indexOf(x) === k).length;

  // 2) Diálogos: vocabulario compartido (ponderado por la clase de la palabra) + palabras distintivas de la teoría
  const puntosDialogo = textoDialogo.map((td) => {
    const s = new Array(K).fill(0);
    vocab.forEach((_, w) => {
      if (!coincide(vars[w], td)) return;
      norm(afinTeoria[w]).forEach((x, c) => (s[c] += x));
    });
    for (let c = 0; c < K; c++) s[c] += 0.25 * solape(td, distTeoria[c]);
    return s;
  });
  const capDialogos = Math.max(1, Math.ceil(dialogos.length / K));
  const claseDeDialogo = repartir(puntosDialogo, K, { capacidad: capDialogos, minimo: dialogos.length >= K ? 1 : 0 });

  // 3) Vocabulario definitivo: teoría (peso 2) + diálogos de la clase (peso 1)
  // Una palabra se presenta la primera vez que se usa: la primera clase donde aparece recibe un bonus
  // (mayor cuanto más se reutiliza después: es una palabra núcleo) y las clases posteriores, menos peso.
  const puntosVocab = vocab.map((_, w) => {
    const s = afinTeoria[w].map((x) => x * 2);
    const enDialogo = new Set(dialogos.map((_, d) => (coincide(vars[w], textoDialogo[d]) ? claseDeDialogo[d] : -1)));
    for (let c = 0; c < K; c++) if (enDialogo.has(c)) s[c] += 1;
    const primera = s.findIndex((x) => x > 0);
    if (primera < 0) return s;
    const reusos = s.filter((x, c) => c > primera && x > 0).length;
    return s.map((x, c) => (c === primera ? x + 3 + 2 * reusos : c > primera ? x * 0.4 : x));
  });
  if (process.env.DEBUG == u.numero) console.log(puntosVocab.map((s, w) => vocab[w].espanol + " " + s.map((x) => x.toFixed(1)).join("/")).join("\n"));
  const claseDePalabra = repartir(puntosVocab, K, { capacidad: Math.ceil(V / K), minimo: Math.min(3, Math.floor(V / K)), prior: 1.5 });

  // 4) Ejercicios y plus: vocabulario de la clase (peso 3) + palabras distintivas de su teoría y diálogos
  const tokensClase = Array.from({ length: K }, (_, c) => new Set(tokensTeoria[c]));
  dialogos.forEach((_, d) => textoDialogo[d].tokens.filter((x) => x.length >= 4 && !VACIAS.has(x)).forEach((x) => tokensClase[claseDeDialogo[d]].add(x)));
  const distClase = distintivas(tokensClase);
  const puntuar = (obj, fuera = SIN_ID) => {
    const t = preparado(textos(obj, fuera));
    const s = new Array(K).fill(0);
    vocab.forEach((_, w) => {
      if (coincide(vars[w], t)) s[claseDePalabra[w]] += 3;
    });
    for (let c = 0; c < K; c++) s[c] += solape(t, distClase[c]);
    return s;
  };
  const repartirLista = (lista, fijos = {}) => {
    const arr = Array.isArray(lista) ? lista : lista ? [lista] : [];
    const asign = repartir(arr.map((x) => puntuar(x)), K, { fijos });
    return { arr, asign };
  };

  const clases = Array.from({ length: K }, (_, c) => ({ n: c + 1 }));
  const ids = (arr, asign, c, clave = (x, i) => x?.id ?? i) => arr.map((x, i) => [x, i]).filter(([, i]) => asign[i] === c).map(([x, i]) => clave(x, i));

  // Ejercicios: cada tipo por separado, su parte proporcional
  const ejercicios = u.ejercicios || {};
  const ejReparto = Object.fromEntries(Object.entries(ejercicios).map(([tipo, lista]) => [tipo, repartirLista(lista)]));
  const otras = Object.fromEntries(["ejerciciosPracticos", "preguntasAbiertas", "preguntas"].map((k) => [k, repartirLista(u[k])]));

  // Plus: objetivos, frases, errores, huecos y banco (las preguntas de comprensión van con la lectura, al final)
  const plusReparto = {};
  if (plus) {
    for (const k of ["objetivos", "frases", "errores", "huecos"]) plusReparto[k] = repartirLista(plus[k]);
    const banco = plus.banco || [];
    const fijos = {};
    banco.forEach((q, i) => {
      if (q.habilidad === "comprension") fijos[i] = K - 1;
    });
    plusReparto.banco = { arr: banco, asign: repartir(banco.map((q, i) => (fijos[i] !== undefined ? new Array(K).fill(0) : puntuar(q, new Set(["explicacionZh", "preguntaZh"])))), K, { fijos, capacidad: Math.ceil(banco.length / K) + 1 }) };
  }

  for (let c = 0; c < K; c++) {
    const clase = clases[c];
    const teoriasC = teoria.filter((_, i) => claseDeTeoria[i] === c);
    Object.assign(clase, tituloClase(teoriasC));
    clase.teoria = teoriasC.map((t) => t.id);
    clase.vocabulario = ids(vocab, claseDePalabra, c);
    clase.dialogos = ids(dialogos, claseDeDialogo, c);
    clase.ejercicios = Object.fromEntries(Object.entries(ejReparto).map(([tipo, { arr, asign }]) => [tipo, ids(arr, asign, c)]).filter(([, l]) => l.length));
    for (const [k, { arr, asign }] of Object.entries(otras)) {
      const l = ids(arr, asign, c);
      if (l.length) clase[k] = l;
    }
    if (plus) {
      clase.plus = Object.fromEntries(Object.entries(plusReparto).map(([k, { arr, asign }]) => [k, ids(arr, asign, c, (_, i) => i)]));
      const objs = clase.plus.objetivos.map((i) => plus.objetivos[i]).filter(Boolean);
      if (objs.length) clase.objetivo = { es: objs[0].es, zh: objs[0].zh };
    }
    if (!clase.objetivo) {
      clase.objetivo = {
        es: `Entender y usar: ${teoriasC.map((t) => t.titulo).join(" · ")}`,
        zh: `理解并运用：${teoriasC.map((t) => t.tituloChino).join("、")}`,
      };
    }
    if (c === 0) clase.cultura = Boolean(plus?.cultura);
    if (c === K - 1) {
      clase.lectura = Boolean(plus?.lectura);
      clase.reto = Boolean(plus?.reto);
      clase.historia = true;
    }
    const nEj = Object.values(clase.ejercicios).reduce((a, l) => a + l.length, 0);
    const est = clase.vocabulario.length * 1.5 + clase.teoria.length * 9 + clase.dialogos.length * 4 + nEj * 0.6;
    clase.minutos = Math.max(45, Math.min(60, Math.round(est / 5) * 5));
  }
  return clases;
}

const salida = {};
for (const u of todas) salida[u.numero] = clasesDeUnidad(u);
fs.writeFileSync(path.join(dir, "clases.json"), JSON.stringify(salida));

// ---------- Estadísticas ----------
const lista = Object.values(salida).flat();
const media = (f) => (lista.reduce((a, c) => a + f(c), 0) / lista.length).toFixed(1);
const nEj = (c) => Object.values(c.ejercicios).reduce((a, l) => a + l.length, 0);
const mayor = Object.entries(salida)
  .flatMap(([u, cs]) => cs.map((c) => ({ u, c })))
  .sort((a, b) => b.c.vocabulario.length + nEj(b.c) - (a.c.vocabulario.length + nEj(a.c)))[0];
const vacias = lista.filter((c) => !c.teoria.length || !c.vocabulario.length).length;
console.log(`clases.json: ${todas.length} unidades → ${lista.length} clases (${(fs.statSync(path.join(dir, "clases.json")).size / 1024).toFixed(0)} KB)`);
console.log(`media por clase: ${media((c) => c.vocabulario.length)} palabras · ${media((c) => c.teoria.length)} teorías · ${media((c) => c.dialogos.length)} diálogos · ${media(nEj)} ejercicios`);
console.log(`clase más grande: unidad ${mayor.u}, clase ${mayor.c.n} (${mayor.c.vocabulario.length} palabras, ${nEj(mayor.c)} ejercicios) · clases sin teoría o sin vocabulario: ${vacias}`);
