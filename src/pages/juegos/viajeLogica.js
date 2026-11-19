// El viaje del Rey Mono · 美猴王之旅 — tablero (espiral 7×7) y fábrica de preguntas de la unidad.
import { barajar, limpiar, sinAcentos, tieneChino, respuestaSeleccionar } from "./jbComun.jsx";
import { todasLasPalabras } from "../../lib/contenidoJuego.js";

// ---------- Tablero ----------
export const LADO = 7; // cuadrícula 7×7: anillo exterior (24) + anillo interior (16) = 40 casillas; el centro 3×3 es la meta
export const META = 40;

/** Coordenadas [columna, fila] de las casillas 0…39 en espiral (sentido horario desde la esquina superior izquierda) */
export const CELDAS = (() => {
  const out = [];
  const anillo = (a, b) => {
    for (let c = a; c <= b; c++) out.push([c, a]);
    for (let f = a + 1; f <= b; f++) out.push([b, f]);
    for (let c = b - 1; c >= a; c--) out.push([c, b]);
    for (let f = b - 1; f > a; f--) out.push([a, f]);
  };
  anillo(0, 6);
  anillo(1, 5);
  return out;
})();

/** Centro (en % del tablero) de una posición 0…40 */
export function centroDe(pos) {
  if (pos >= META) return { x: 50, y: 50 };
  const [c, f] = CELDAS[pos];
  return { x: ((c + 0.5) / LADO) * 100, y: ((f + 0.5) / LADO) * 100 };
}

// Casillas especiales (mezcla de oca y parchís, con temas del Viaje al Oeste)
export const ESPECIALES = {
  0: { tipo: "salida", sello: "山", es: "Monte de Flores y Frutos", zh: "花果山", corto: "Salida" },
  3: { tipo: "melocoton", sello: "桃", es: "Melocotón de la inmortalidad", zh: "蟠桃", corto: "Melocotón" },
  5: { tipo: "nube", sello: "云", es: "Nube voladora", zh: "筋斗云", corto: "Nube" },
  6: { tipo: "puente", sello: "桥", es: "Puente", zh: "仙桥", corto: "Puente", destino: 12 },
  9: { tipo: "pagoda", sello: "塔", es: "Pagoda (casilla segura)", zh: "宝塔 · 安全格", corto: "Pagoda" },
  10: { tipo: "linterna", sello: "灯", es: "Linterna", zh: "灯笼", corto: "Linterna" },
  12: { tipo: "puente", sello: "桥", es: "Puente", zh: "仙桥", corto: "Puente", fin: true },
  14: { tipo: "nube", sello: "云", es: "Nube voladora", zh: "筋斗云", corto: "Nube" },
  16: { tipo: "pozo", sello: "井", es: "Pozo", zh: "古井", corto: "Pozo" },
  18: { tipo: "pagoda", sello: "塔", es: "Pagoda (casilla segura)", zh: "宝塔 · 安全格", corto: "Pagoda" },
  21: { tipo: "linterna", sello: "灯", es: "Linterna", zh: "灯笼", corto: "Linterna" },
  23: { tipo: "nube", sello: "云", es: "Nube voladora", zh: "筋斗云", corto: "Nube" },
  26: { tipo: "laberinto", sello: "迷", es: "Laberinto", zh: "迷宫", corto: "Laberinto", destino: 20 },
  27: { tipo: "pagoda", sello: "塔", es: "Pagoda (casilla segura)", zh: "宝塔 · 安全格", corto: "Pagoda" },
  29: { tipo: "dragon", sello: "龙", es: "Dragón", zh: "恶龙", corto: "Dragón", destino: 24 },
  30: { tipo: "linterna", sello: "灯", es: "Linterna", zh: "灯笼", corto: "Linterna" },
  32: { tipo: "nube", sello: "云", es: "Nube voladora", zh: "筋斗云", corto: "Nube" },
  34: { tipo: "melocoton", sello: "桃", es: "Melocotón de la inmortalidad", zh: "蟠桃", corto: "Melocotón" },
  35: { tipo: "pagoda", sello: "塔", es: "Pagoda (casilla segura)", zh: "宝塔 · 安全格", corto: "Pagoda" },
  37: { tipo: "dragon", sello: "龙", es: "Dragón", zh: "恶龙", corto: "Dragón", destino: 31 },
};
export const NUBES = Object.keys(ESPECIALES)
  .map(Number)
  .filter((n) => ESPECIALES[n].tipo === "nube");
export const esSegura = (pos) => pos === 0 || ESPECIALES[pos]?.tipo === "pagoda";

/** Reglas de cada casilla especial (para la ayuda y la leyenda) */
export const REGLAS_CASILLAS = [
  { tipo: "nube", sello: "云", es: "Nube voladora: vuelas a la siguiente nube y vuelves a jugar.", zh: "筋斗云：飞到下一朵云，再玩一次。" },
  { tipo: "puente", sello: "桥", es: "De puente a puente: del 6 al 12 y vuelves a jugar.", zh: "仙桥：从6号飞到12号，再玩一次。" },
  { tipo: "linterna", sello: "灯", es: "Linterna: responde otra pregunta; si aciertas (doble acierto), tiras otra vez.", zh: "灯笼：再答一题，连对两题就再掷一次。" },
  { tipo: "pozo", sello: "井", es: "Pozo: para salir necesitas acertar una pregunta extra en tu próximo turno.", zh: "古井：下回合要先答对一道额外的题才能出来。" },
  { tipo: "laberinto", sello: "迷", es: "Laberinto: pregunta extra; si fallas, te pierdes y vuelves al 20.", zh: "迷宫：额外一题，答错就迷路，退回20号。" },
  { tipo: "dragon", sello: "龙", es: "Dragón: te hace retroceder (29 → 24, 37 → 31).", zh: "恶龙：让你后退（29→24，37→31）。" },
  { tipo: "melocoton", sello: "桃", es: "Melocotón de la inmortalidad: te protege del próximo dragón.", zh: "蟠桃：保护你躲过下一条恶龙。" },
  { tipo: "pagoda", sello: "塔", es: "Pagoda: casilla segura, nadie te puede adelantar.", zh: "宝塔：安全格，别人不能把你赶走。" },
];

// ---------- Fábrica de preguntas ----------
const ARTICULO = /^(el|la|los|las|un|una|unos|unas)\s+(.+)$/i;
const DEFINIDOS = ["el", "la", "los", "las"];
const INDEFINIDOS = ["un", "una", "unos", "unas"];
const PRONOMBRES = /^\s*[•·\-]?\s*(yo|tú|él\/ella\/usted|él\/ella|nosotros\/as|nosotros|vosotros\/as|vosotros|ellos\/ellas\/ustedes|ellos\/as|ellos\/ellas)\s*[:→=]?\s*([a-záéíóúüñ*]+(?: [a-záéíóúüñ*]+)?)\s*(?:$|[=(（,·]|\s-\s)/i;
const PERSONAS = ["yo", "tú", "él/ella/usted", "nosotros/as", "vosotros/as", "ellos/ellas/ustedes"];
const PERSONA_ZH = ["我", "你", "他/她/您", "我们", "你们", "他们/她们/您们"];
const personaDe = (p) => {
  const t = p.toLowerCase();
  if (t === "yo") return 0;
  if (t === "tú") return 1;
  if (t.startsWith("él")) return 2;
  if (t.startsWith("nosotros")) return 3;
  if (t.startsWith("vosotros")) return 4;
  return 5;
};

// Presente de verbos muy frecuentes: solo se usan si la unidad contiene alguna de sus formas
const VERBOS_BASE = {
  ser: ["soy", "eres", "es", "somos", "sois", "son"],
  estar: ["estoy", "estás", "está", "estamos", "estáis", "están"],
  tener: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
  ir: ["voy", "vas", "va", "vamos", "vais", "van"],
  hablar: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
  comer: ["como", "comes", "come", "comemos", "coméis", "comen"],
  vivir: ["vivo", "vives", "vive", "vivimos", "vivís", "viven"],
  hacer: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
  querer: ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
  poder: ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],
  llamarse: ["me llamo", "te llamas", "se llama", "nos llamamos", "os llamáis", "se llaman"],
  gustar: ["me gusta", "te gusta", "le gusta", "nos gusta", "os gusta", "les gusta"],
  trabajar: ["trabajo", "trabajas", "trabaja", "trabajamos", "trabajáis", "trabajan"],
  estudiar: ["estudio", "estudias", "estudia", "estudiamos", "estudiáis", "estudian"],
  venir: ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
  salir: ["salgo", "sales", "sale", "salimos", "salís", "salen"],
};
const VERBO_ZH = { ser: "是", estar: "在/处于", tener: "有", ir: "去", hablar: "说", comer: "吃", vivir: "住", hacer: "做", querer: "想要", poder: "能", llamarse: "叫…名字", gustar: "喜欢", trabajar: "工作", estudiar: "学习", venir: "来", salir: "出去" };

const corta = (t, max = 40) => limpiar(t).length <= max;
const zhONada = (t) => (tieneChino(t) ? limpiar(t) : "");

function opcionesCon(correcta, distractores, n = 4) {
  const vistos = new Set([sinAcentos(correcta)]);
  const otras = [];
  for (const d of barajar(distractores)) {
    const k = sinAcentos(d);
    if (!k || vistos.has(k)) continue;
    vistos.add(k);
    otras.push(limpiar(d));
    if (otras.length >= n - 1) break;
  }
  return otras.length >= 1 ? barajar([limpiar(correcta), ...otras]) : null;
}

/** Tablas de conjugación de la teoría («yo hablo / tú hablas…») */
function tablasDeTeoria(teoria) {
  const tablas = [];
  for (const t of teoria || []) {
    let actual = null;
    for (const linea of String(t?.descripcion || "").split("\n")) {
      const m = linea.match(PRONOMBRES);
      if (!m) continue;
      const forma = m[2].replace(/\*/g, "").toLowerCase();
      if (forma.length < 2 || /-\s*$/.test(m[2])) continue;
      const p = personaDe(m[1]);
      if (!actual || p === 0 || actual.formas[p]) {
        actual = { titulo: limpiar(t.titulo), formas: [] };
        tablas.push(actual);
      }
      actual.formas[p] = forma;
    }
  }
  return tablas.filter((t) => t.formas.filter(Boolean).length >= 4);
}

/**
 * Crea las preguntas de la unidad. `plus` = datos de src/data/plus/modulo-N.json (o null).
 * Cada pregunta: { tipo, sello, es, zh, opciones, correcta, audio, escuchar?, explicacion (zh), clave }
 */
export function crearPreguntas(c, plus) {
  let vocab = (c.vocabulario || []).map((v) => ({ es: limpiar(v.espanol), zh: limpiar(v.chino) })).filter((v) => v.es && v.zh && tieneChino(v.zh) && corta(v.es, 36));
  if (vocab.length < 8)
    vocab = [...vocab, ...barajar(todasLasPalabras()).slice(0, 30).map((v) => ({ es: limpiar(v.espanol), zh: limpiar(v.chino) })).filter((v) => v.es && v.zh && tieneChino(v.zh))];
  const es = vocab.map((v) => v.es);
  const zh = vocab.map((v) => v.zh);
  const grupos = {};
  const add = (p) => {
    if (!p || !p.opciones || p.opciones.length < 2) return;
    if (!p.opciones.some((o) => sinAcentos(o) === sinAcentos(p.correcta))) return;
    p.clave = sinAcentos(`${p.tipo}|${p.es}|${p.correcta}`);
    (grupos[p.tipo] ||= []).push(p);
  };

  // Traducir (es → zh) y decir (zh → es)
  for (const v of vocab) {
    add({ tipo: "traducir", sello: "译", es: `¿Qué significa «${v.es}»?`, zh: "这个词是什么意思？", opciones: opcionesCon(v.zh, zh), correcta: v.zh, audio: v.es, explicacion: `«${v.es}» 的意思是「${v.zh}」。` });
    add({ tipo: "decir", sello: "说", es: `¿Cómo se dice «${v.zh}» en español?`, zh: "用西班牙语怎么说？", opciones: opcionesCon(v.es, es), correcta: v.es, audio: v.es, explicacion: `「${v.zh}」用西班牙语说 «${v.es}»。` });
    // Escuchar y elegir (lo que oyes o su significado)
    if (Math.random() < 0.5) add({ tipo: "escuchar", sello: "听", es: "Escucha y elige lo que oyes", zh: "听录音，选出你听到的词", opciones: opcionesCon(v.es, es), correcta: v.es, audio: v.es, escuchar: true, explicacion: `你听到的是 «${v.es}»（${v.zh}）。` });
    else add({ tipo: "escuchar", sello: "听", es: "Escucha y elige el significado", zh: "听录音，选出正确的意思", opciones: opcionesCon(v.zh, zh), correcta: v.zh, audio: v.es, escuchar: true, explicacion: `你听到的是 «${v.es}»，意思是「${v.zh}」。` });
  }

  // Artículo correcto
  for (const v of vocab) {
    const m = v.es.match(ARTICULO);
    if (!m || m[2].split(" ").length > 3) continue;
    const art = m[1].toLowerCase();
    const def = DEFINIDOS.includes(art);
    const serie = def ? DEFINIDOS : INDEFINIDOS;
    const genero = /^(la|las|una|unas)$/.test(art) ? "阴性" : "阳性";
    const numero = /s$/.test(art) ? "复数" : "单数";
    add({ tipo: "articulo", sello: "冠", es: `Elige el artículo: ___ ${m[2]}`, zh: `选择正确的冠词（${v.zh}）`, opciones: [...serie], correcta: art, audio: v.es, explicacion: `«${m[2]}» 是${genero}${numero}，所以用 «${art}»：${v.es}（${v.zh}）。` });
  }

  // Conjugar: tablas de la teoría y verbos frecuentes que aparecen en la unidad
  const textoUnidad = sinAcentos(
    [
      ...vocab.map((v) => v.es),
      ...(c.dialogos || []).flatMap((d) => (d?.lineas || []).map((l) => l?.texto || "")),
      ...(c.teoria || []).flatMap((t) => [t?.descripcion || "", ...(t?.ejemplos || []).map((e) => e?.espanol || "")]),
    ].join(" "),
  );
  const tablas = tablasDeTeoria(c.teoria).map((t) => ({ ...t, verboZh: "" }));
  for (const [inf, formas] of Object.entries(VERBOS_BASE)) {
    const presentes = formas.filter((f) => new RegExp(`(^|[^a-z])${sinAcentos(f)}([^a-z]|$)`).test(textoUnidad)).length;
    if (presentes >= 2 && !tablas.some((t) => t.formas.includes(formas[0]))) tablas.push({ titulo: inf, formas, verboZh: VERBO_ZH[inf], infinitivo: inf });
  }
  for (const t of tablas) {
    const llenas = t.formas.map((f, i) => (f ? i : -1)).filter((i) => i >= 0);
    for (const p of barajar(llenas).slice(0, 3)) {
      const pista = llenas.filter((i) => i !== p).slice(0, 2).map((i) => `${PERSONAS[i].split("/")[0]} ${t.formas[i]}`).join(" · ");
      const correcta = t.formas[p];
      const opciones = opcionesCon(correcta, t.formas.filter(Boolean));
      const verbo = t.infinitivo ? `«${t.infinitivo}»${t.verboZh ? `（${t.verboZh}）` : ""}` : `«${t.titulo}»`;
      add({
        tipo: "conjugar",
        sello: "变",
        es: `Conjuga ${t.infinitivo ? `«${t.infinitivo}»` : "el verbo"}: ${PERSONAS[p]} ___`,
        zh: `动词变位（${pista}）→ ${PERSONA_ZH[p]}`,
        opciones,
        correcta,
        audio: `${PERSONAS[p].split("/")[0]} ${correcta}`,
        explicacion: `${verbo} 的现在时：${PERSONAS[p]} → ${correcta}。完整变位：${t.formas.map((f, i) => (f ? `${PERSONAS[i].split("/")[0]} ${f}` : "")).filter(Boolean).join("，")}。`,
      });
    }
  }

  // Completar (ejercicios de la unidad y huecos del plus)
  const huecos = [];
  for (const e of c.ejercicios?.completar || []) {
    if (!/_{2,}/.test(e?.pregunta || "") || !e?.respuestaCorrecta || !corta(e.respuestaCorrecta, 26)) continue;
    huecos.push({ frase: limpiar(e.pregunta), zh: zhONada(e.preguntaChino) !== limpiar(e.pregunta) ? zhONada(e.preguntaChino) : "", r: limpiar(e.respuestaCorrecta), exp: zhONada(e.explicacion) || zhONada(e.pista) });
  }
  for (const h of plus?.huecos || []) {
    if (!/_{2,}/.test(h?.frase || "") || !h?.respuesta || !corta(h.respuesta, 26)) continue;
    huecos.push({ frase: limpiar(h.frase), zh: "", r: limpiar(h.respuesta), exp: zhONada(h.pistaZh) });
  }
  const respuestasHuecos = huecos.map((h) => h.r);
  for (const h of huecos) {
    const largo = h.r.split(" ").length;
    const ops = opcionesCon(h.r, [...respuestasHuecos, ...es.filter((x) => Math.abs(x.split(" ").length - largo) <= 1)]);
    const completa = h.frase.replace(/_{2,}/, h.r);
    add({ tipo: "completar", sello: "填", es: h.frase, zh: h.zh || "填空：选出正确答案", opciones: ops, correcta: h.r, audio: completa, explicacion: `${h.exp ? `${h.exp} ` : ""}正确的句子：«${completa}»` });
  }

  // Elegir (seleccionar de la unidad + banco del plus)
  for (const e of c.ejercicios?.seleccionar || []) {
    const correcta = limpiar(respuestaSeleccionar(e));
    const opciones = (e.opciones || []).map(limpiar).filter(Boolean);
    if (!correcta || opciones.length < 2 || opciones.some((o) => o.length > 60)) continue;
    const resto = opciones.filter((o) => sinAcentos(o) !== sinAcentos(correcta)).slice(0, 3);
    const pes = limpiar(e.pregunta);
    const pzh = limpiar(e.preguntaChino);
    const soloZh = tieneChino(pes);
    add({ tipo: "elegir", sello: "选", es: soloZh ? "Elige la respuesta correcta" : pes, zh: soloZh ? pes : pzh && pzh !== pes ? pzh : "选择正确答案", opciones: barajar([correcta, ...resto]), correcta, audio: tieneChino(correcta) ? "" : correcta, explicacion: zhONada(e.explicacion) || `正确答案是 «${correcta}»。` });
  }
  for (const b of plus?.banco || []) {
    const opciones = (b?.opciones || []).map(limpiar).filter(Boolean);
    const correcta = typeof b?.correcta === "number" ? opciones[b.correcta] : limpiar(b?.correcta);
    if (!correcta || opciones.length < 2 || opciones.some((o) => o.length > 60) || !b.pregunta) continue;
    add({ tipo: "elegir", sello: "选", es: limpiar(b.pregunta), zh: zhONada(b.preguntaZh) || "选择正确答案", opciones: barajar(opciones.slice(0, 4).includes(correcta) ? opciones.slice(0, 4) : [correcta, ...opciones.filter((o) => o !== correcta).slice(0, 3)]), correcta, audio: tieneChino(correcta) ? "" : correcta, explicacion: zhONada(b.explicacionZh) || `正确答案是 «${correcta}»。` });
  }

  // Errores típicos del plus: ¿cuál está bien?
  for (const e of plus?.errores || []) {
    if (!e?.correcto || !e?.incorrecto || !corta(e.correcto, 60)) continue;
    add({ tipo: "error", sello: "错", es: "¿Qué frase es correcta?", zh: "哪个句子是正确的？", opciones: barajar([limpiar(e.correcto), limpiar(e.incorrecto)]), correcta: limpiar(e.correcto), audio: limpiar(e.correcto), explicacion: zhONada(e.explicacionZh) || `正确的是 «${limpiar(e.correcto)}»。` });
  }

  // Verdadero o falso
  for (const e of c.ejercicios?.verdaderoFalso || []) {
    if (typeof e?.respuestaCorrecta !== "boolean" || !e.pregunta || !corta(e.pregunta, 110)) continue;
    const pes = limpiar(e.pregunta);
    const soloZh = tieneChino(pes);
    const correcta = e.respuestaCorrecta ? "Verdadero · 对" : "Falso · 错";
    add({ tipo: "vf", sello: "判", es: soloZh ? "¿Verdadero o falso?" : pes, zh: soloZh ? pes : zhONada(e.preguntaChino) || "对还是错？", opciones: ["Verdadero · 对", "Falso · 错"], correcta, audio: "", explicacion: zhONada(e.explicacion) || `答案：${correcta}。` });
  }

  // Frases de la teoría, los diálogos y el plus con un hueco
  const frases = [];
  for (const t of c.teoria || []) for (const ej of t?.ejemplos || []) if (ej?.espanol && !tieneChino(ej.espanol)) frases.push({ es: limpiar(ej.espanol), zh: limpiar(ej.chino) });
  for (const d of c.dialogos || []) for (const l of d?.lineas || []) if (l?.texto && !tieneChino(l.texto)) frases.push({ es: limpiar(l.texto), zh: limpiar(l.traduccion) });
  for (const f of plus?.frases || []) if (f?.es) frases.push({ es: limpiar(f.es), zh: limpiar(f.zh) });
  const palabrasVocab = new Set(vocab.flatMap((v) => v.es.toLowerCase().split(" ")));
  const limpia = (p) => p.replace(/[¿?¡!.,;:«»"()—–]/g, "");
  const todasPalabras = [...new Set(frases.flatMap((f) => f.es.split(" ").map(limpia)).filter((p) => p.length >= 3 && /^[a-záéíóúüñ]+$/i.test(p)))];
  for (const f of barajar(frases).slice(0, 24)) {
    const partes = f.es.split(" ");
    if (partes.length < 3 || partes.length > 12) continue;
    const candidatas = partes.map((p, i) => ({ p: limpia(p), i })).filter((x) => x.p.length >= 3 && /^[a-záéíóúüñ]+$/i.test(x.p));
    if (!candidatas.length) continue;
    const elegida = candidatas.find((x) => palabrasVocab.has(x.p.toLowerCase())) || [...candidatas].sort((a, b) => b.p.length - a.p.length)[0];
    const mayus = /^[A-ZÁÉÍÓÚÑ]/.test(elegida.p);
    const forma = (w) => (mayus ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase());
    const ops = opcionesCon(forma(elegida.p), todasPalabras.filter((p) => Math.abs(p.length - elegida.p.length) <= 4).map(forma));
    const hueco = partes.map((p, i) => (i === elegida.i ? p.replace(elegida.p, "_____") : p)).join(" ");
    add({ tipo: "frase", sello: "句", es: hueco, zh: tieneChino(f.zh) ? f.zh : "补全句子", opciones: ops, correcta: forma(elegida.p), audio: f.es, explicacion: `完整的句子：«${f.es}»${tieneChino(f.zh) ? `（${f.zh}）` : ""}。` });
  }

  for (const k of Object.keys(grupos)) grupos[k] = barajar(grupos[k]);
  return grupos;
}

/**
 * Baraja de preguntas sin repetir en la partida: alterna tipos (nunca dos seguidos del mismo si se puede)
 * y, si se agotan todas, vuelve a barajar avisando con `repetida`.
 */
export function crearMazoPreguntas(grupos) {
  const original = Object.fromEntries(Object.entries(grupos).map(([k, v]) => [k, [...v]]));
  let colas = Object.fromEntries(Object.entries(original).map(([k, v]) => [k, [...v]]));
  const usadas = new Set();
  let ultimo = "";
  let ronda = 0;
  const total = Object.values(original).reduce((s, v) => s + v.length, 0);
  // Peso de cada tipo: más vocabulario, pero siempre variado
  const PESO = { traducir: 3, decir: 3, escuchar: 3, conjugar: 3, completar: 3, elegir: 3, articulo: 2, frase: 2, error: 2, vf: 1 };
  return {
    total,
    siguiente() {
      for (let intento = 0; intento < 2; intento++) {
        const tipos = Object.keys(colas).filter((k) => colas[k].some((p) => !usadas.has(p.clave)));
        if (tipos.length) {
          const candidatos = tipos.length > 1 ? tipos.filter((t) => t !== ultimo) : tipos;
          const bolsa = candidatos.flatMap((t) => Array(PESO[t] || 1).fill(t));
          const tipo = bolsa[Math.floor(Math.random() * bolsa.length)];
          while (colas[tipo].length) {
            const p = colas[tipo].shift();
            if (usadas.has(p.clave)) continue;
            usadas.add(p.clave);
            ultimo = tipo;
            return { ...p, opciones: barajar(p.opciones), repetida: ronda > 0 };
          }
          continue;
        }
        // Se agotaron: nueva ronda
        ronda++;
        usadas.clear();
        colas = Object.fromEntries(Object.entries(original).map(([k, v]) => [k, barajar(v)]));
      }
      return null;
    },
  };
}

export const ETIQUETA = {
  traducir: "Traducir · 翻译",
  decir: "Decir · 说",
  escuchar: "Escuchar · 听力",
  articulo: "Artículo · 冠词",
  conjugar: "Conjugar · 变位",
  completar: "Completar · 填空",
  elegir: "Elegir · 选择",
  error: "¿Cuál es correcta? · 辨错",
  vf: "¿Verdad? · 判断",
  frase: "Frase · 句子",
};

/** Movimiento con rebote en la meta (como en la oca): lista de posiciones que recorre la ficha */
export function recorrido(desde, pasos) {
  const camino = [];
  let p = desde;
  let dir = 1;
  for (let i = 0; i < pasos; i++) {
    if (p === META) dir = -1;
    p += dir;
    camino.push(p);
  }
  return camino;
}
