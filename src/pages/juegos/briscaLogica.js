// Brisca del Rey Mono · 美猴王纸牌 — reglas de la brisca, rival y retos sacados de la unidad.
import { barajar, limpiar, sinAcentos, tieneChino, respuestaSeleccionar } from "./jbComun.jsx";
import { todasLasPalabras } from "../../lib/contenidoJuego.js";

// ---------- La baraja ----------
export const PALOS = ["oros", "copas", "espadas", "bastos"];
export const PALO = {
  oros: { es: "oros", zh: "金币", singular: "oro", color: "#b8860b", oscuro: "#6e4a0e", tono: "#f2c14e" },
  copas: { es: "copas", zh: "杯", singular: "copa", color: "#2f8f52", oscuro: "#164d2c", tono: "#7fd3a0" },
  espadas: { es: "espadas", zh: "剑", singular: "espada", color: "#2c4f8f", oscuro: "#0e1a33", tono: "#9db8e8" },
  bastos: { es: "bastos", zh: "棍", singular: "basto", color: "#c8102e", oscuro: "#6b0918", tono: "#ff8a8a" },
};
export const NUMEROS = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
export const NOMBRE = {
  1: { es: "as", zh: "A（一）", art: "el" },
  2: { es: "dos", zh: "二", art: "el" },
  3: { es: "tres", zh: "三", art: "el" },
  4: { es: "cuatro", zh: "四", art: "el" },
  5: { es: "cinco", zh: "五", art: "el" },
  6: { es: "seis", zh: "六", art: "el" },
  7: { es: "siete", zh: "七", art: "el" },
  10: { es: "sota", zh: "侍从", art: "la" },
  11: { es: "caballo", zh: "骑士", art: "el" },
  12: { es: "rey", zh: "国王", art: "el" },
};
// Puntos de la brisca (total 120) y orden de fuerza: as, tres, rey, caballo, sota, 7…2
export const PUNTOS = { 1: 11, 3: 10, 12: 4, 11: 3, 10: 2 };
const ORDEN = [1, 3, 12, 11, 10, 7, 6, 5, 4, 2];
export const fuerza = (carta) => ORDEN.length - ORDEN.indexOf(carta.n);
export const valor = (carta) => PUNTOS[carta.n] || 0;

export const nombreCarta = (c) => `${NOMBRE[c.n].es} de ${PALO[c.palo].es}`;
export const nombreConArticulo = (c) => `${NOMBRE[c.n].art} ${nombreCarta(c)}`;
export const nombreZh = (c) => `${PALO[c.palo].zh}${c.n > 7 ? "·" : ""}${NOMBRE[c.n].zh}`;

export function crearBaraja() {
  const cartas = [];
  for (const palo of PALOS) for (const n of NUMEROS) cartas.push({ id: `${palo[0]}${n}`, palo, n });
  return barajar(cartas);
}

/** Quién gana la baza: devuelve 0 (primera carta) o 1 (segunda). `palo` = palo efectivo (el 金箍棒 convierte en triunfo). */
export function ganadorBaza(primera, segunda, triunfo) {
  const p1 = primera.palo;
  const p2 = segunda.palo;
  if (p1 === p2) return fuerza(segunda.carta) > fuerza(primera.carta) ? 1 : 0;
  if (p2 === triunfo) return 1;
  return 0;
}

// ---------- El Rey Mono: rival sencillo con algo de estrategia ----------
export function jugadaMono(mano, mesa, triunfo, quedanEnMazo) {
  const coste = (c) => valor(c) * 3 + (c.palo === triunfo ? 14 + fuerza(c) : fuerza(c) * 0.4);
  const masBarata = (lista) => [...lista].sort((a, b) => coste(a) - coste(b))[0];
  if (!mesa) {
    // Sale él: descarta lo que menos duele; al final de la partida, saca sus triunfos fuertes
    if (!quedanEnMazo) {
      const fuertes = mano.filter((c) => c.palo === triunfo).sort((a, b) => fuerza(b) - fuerza(a));
      if (fuertes.length && fuerza(fuertes[0]) >= 8) return fuertes[0];
    }
    return masBarata(mano);
  }
  const enJuego = valor(mesa.carta);
  const gana = (c) => ganadorBaza(mesa, { carta: c, palo: c.palo }, triunfo) === 1;
  const ganadoras = mano.filter(gana);
  const delPalo = ganadoras.filter((c) => c.palo !== triunfo).sort((a, b) => valor(b) - valor(a) || fuerza(b) - fuerza(a));
  if (delPalo.length) return delPalo[0];
  const triunfos = ganadoras.filter((c) => c.palo === triunfo).sort((a, b) => fuerza(a) - fuerza(b));
  if (triunfos.length && (enJuego >= 10 || (enJuego >= 3 && valor(triunfos[0]) === 0) || (!quedanEnMazo && enJuego > 0))) return triunfos[0];
  // No gana barato: tira la carta que menos vale (sin regalar triunfos altos)
  const descartes = mano.filter((c) => !(c.palo === triunfo && valor(c) >= 4));
  return masBarata(descartes.length ? descartes : mano);
}

// ---------- Retos de la unidad ----------
const ARTICULO = /^(el|la|los|las|un|una|unos|unas)\s+(.+)$/i;
const DEFINIDOS = ["el", "la", "los", "las"];
const INDEFINIDOS = ["un", "una", "unos", "unas"];
const corta = (t, max = 34) => limpiar(t).length <= max;

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
  return otras.length ? barajar([limpiar(correcta), ...otras]) : null;
}

/** Fábrica de retos: cada carta de tu mano recibe uno (traducir, artículo, completar, elegir, verdadero/falso, frase o la propia carta) */
export function crearFabricaRetos(c) {
  let vocab = (c.vocabulario || []).map((v) => ({ es: limpiar(v.espanol), zh: limpiar(v.chino) })).filter((v) => v.es && v.zh && tieneChino(v.zh));
  // Solo la unidad: otras unidades únicamente si la unidad no llega a 4 palabras (ninguna de las 90 está en ese caso)
  if (vocab.length < 4) vocab = [...vocab, ...barajar(todasLasPalabras()).slice(0, 24).map((v) => ({ es: limpiar(v.espanol), zh: limpiar(v.chino) })).filter((v) => v.es && v.zh)];
  const es = vocab.map((v) => v.es);
  const zh = vocab.map((v) => v.zh);
  const retos = [];

  // Traducir (en los dos sentidos)
  barajar(vocab).forEach((v, i) => {
    if (i % 2 === 0) {
      const ops = opcionesCon(v.zh, zh);
      if (ops) retos.push({ tipo: "traducir", sello: "译", es: `¿Qué significa «${v.es}»?`, zh: "这个词是什么意思？", opciones: ops, correcta: v.zh, audio: v.es, nota: `${v.es} = ${v.zh}` });
    } else {
      const ops = opcionesCon(v.es, es);
      if (ops) retos.push({ tipo: "decir", sello: "说", es: `¿Cómo se dice «${v.zh}» en español?`, zh: "用西班牙语怎么说？", opciones: ops, correcta: v.es, audio: v.es, nota: `${v.zh} = ${v.es}` });
    }
  });

  // Artículo correcto
  for (const v of vocab) {
    const m = v.es.match(ARTICULO);
    if (!m || m[2].split(" ").length > 3) continue;
    const art = m[1].toLowerCase();
    const serie = DEFINIDOS.includes(art) ? DEFINIDOS : INDEFINIDOS;
    retos.push({ tipo: "articulo", sello: "冠", es: `Elige el artículo: ___ ${m[2]}`, zh: `选择正确的冠词（${v.zh}）`, opciones: serie, correcta: art, audio: v.es, nota: `${v.es} · ${v.zh}` });
  }

  // Completar (ejercicios de la unidad, con opciones)
  const completar = (c.ejercicios?.completar || []).filter((e) => /_{2,}/.test(e?.pregunta || "") && e?.respuestaCorrecta && corta(e.respuestaCorrecta, 26));
  const respuestas = completar.map((e) => limpiar(e.respuestaCorrecta));
  for (const e of completar) {
    const ops = opcionesCon(e.respuestaCorrecta, [...respuestas, ...es.filter((x) => x.split(" ").length <= 2)]);
    if (!ops) continue;
    const pzh = limpiar(e.preguntaChino);
    retos.push({ tipo: "completar", sello: "填", es: limpiar(e.pregunta), zh: pzh && pzh !== limpiar(e.pregunta) && tieneChino(pzh) ? pzh : "填空：选出正确答案", opciones: ops, correcta: limpiar(e.respuestaCorrecta), audio: limpiar(e.pregunta).replace(/_{2,}/, limpiar(e.respuestaCorrecta)), nota: limpiar(e.explicacion) });
  }

  // Elegir (seleccionar)
  for (const e of c.ejercicios?.seleccionar || []) {
    const correcta = limpiar(respuestaSeleccionar(e));
    const opciones = (e.opciones || []).map(limpiar).filter(Boolean);
    if (!correcta || opciones.length < 2 || !opciones.some((o) => sinAcentos(o) === sinAcentos(correcta)) || opciones.some((o) => o.length > 60)) continue;
    const resto = opciones.filter((o) => sinAcentos(o) !== sinAcentos(correcta)).slice(0, 3);
    const pes = limpiar(e.pregunta);
    const pzh = limpiar(e.preguntaChino);
    retos.push({ tipo: "elegir", sello: "选", es: pes, zh: pzh && pzh !== pes ? pzh : "选择正确答案", opciones: barajar([correcta, ...resto]), correcta, audio: tieneChino(correcta) ? "" : correcta, nota: limpiar(e.explicacion) });
  }

  // Verdadero o falso
  for (const e of c.ejercicios?.verdaderoFalso || []) {
    if (typeof e?.respuestaCorrecta !== "boolean" || !e.pregunta) continue;
    const pes = limpiar(e.pregunta);
    const pzh = limpiar(e.preguntaChino);
    retos.push({ tipo: "vf", sello: "判", es: pes, zh: pzh && pzh !== pes ? pzh : "对还是错？", opciones: ["Verdadero · 对", "Falso · 错"], correcta: e.respuestaCorrecta ? "Verdadero · 对" : "Falso · 错", audio: "", nota: limpiar(e.explicacion) });
  }

  // Frases de la teoría y los diálogos con un hueco
  const frases = [];
  for (const t of c.teoria || []) for (const ej of t?.ejemplos || []) if (ej?.espanol && !tieneChino(ej.espanol)) frases.push({ es: limpiar(ej.espanol), zh: limpiar(ej.chino) });
  for (const d of c.dialogos || []) for (const l of d?.lineas || []) if (l?.texto && !tieneChino(l.texto)) frases.push({ es: limpiar(l.texto), zh: limpiar(l.traduccion) });
  const palabrasVocab = new Set(vocab.flatMap((v) => v.es.toLowerCase().split(" ")));
  const limpia = (p) => p.replace(/[¿?¡!.,;:«»"()—–]/g, "");
  const todasPalabras = [...new Set(frases.flatMap((f) => f.es.split(" ").map(limpia)).filter((p) => p.length >= 3 && /^[a-záéíóúüñ]+$/i.test(p)))];
  for (const f of barajar(frases).slice(0, 14)) {
    const partes = f.es.split(" ");
    if (partes.length < 3 || partes.length > 12) continue;
    const candidatas = partes.map((p, i) => ({ p: limpia(p), i })).filter((x) => x.p.length >= 3 && /^[a-záéíóúüñ]+$/i.test(x.p));
    if (!candidatas.length) continue;
    const elegida = candidatas.find((x) => palabrasVocab.has(x.p.toLowerCase())) || [...candidatas].sort((a, b) => b.p.length - a.p.length)[0];
    const mayus = /^[A-ZÁÉÍÓÚÑ]/.test(elegida.p);
    const forma = (w) => (mayus ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase());
    const ops = opcionesCon(forma(elegida.p), todasPalabras.filter((p) => Math.abs(p.length - elegida.p.length) <= 4).map(forma));
    if (!ops) continue;
    const hueco = partes.map((p, i) => (i === elegida.i ? p.replace(elegida.p, "_____") : p)).join(" ");
    retos.push({ tipo: "frase", sello: "句", es: hueco, zh: f.zh && tieneChino(f.zh) ? f.zh : "补全句子", opciones: ops, correcta: forma(elegida.p), audio: f.es, nota: f.es });
  }

  let cola = barajar(retos);
  let usados = 0;
  return function siguienteReto(carta) {
    usados++;
    // Una de cada cuatro (y la primera): aprende el nombre de la propia carta
    if (usados % 4 === 1 || !cola.length) {
      const correcta = nombreCarta(carta);
      const otros = barajar([
        ...NUMEROS.filter((n) => n !== carta.n).map((n) => nombreCarta({ n, palo: carta.palo })),
        ...PALOS.filter((p) => p !== carta.palo).map((palo) => nombreCarta({ n: carta.n, palo })),
      ]).slice(0, 3);
      return { tipo: "baraja", sello: "牌", es: "¿Cómo se llama esta carta?", zh: "这张牌叫什么？", opciones: barajar([correcta, ...otros]), correcta, audio: nombreConArticulo(carta), nota: `${nombreConArticulo(carta)} · ${nombreZh(carta)}`, carta: true };
    }
    if (!cola.length) cola = barajar(retos);
    return cola.shift() || null;
  };
}

export const ETIQUETA_RETO = {
  traducir: "Traducir · 翻译",
  decir: "Decir · 说",
  articulo: "Artículo · 冠词",
  completar: "Completar · 填空",
  elegir: "Elegir · 选择",
  vf: "¿Verdad? · 判断",
  frase: "Frase · 句子",
  baraja: "La carta · 认牌",
};
