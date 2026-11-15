// Piezas comunes de los juegos «Dragón de jade» y «Escape del palacio» (prefijo jb-).
// La elección de unidad usa el selector común (components/juegos/SelectorTemaJuego.jsx).
import * as React from "react";
import { Link, useLocation } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import CATALOGO from "../../data/modulos/catalog.json";
import { contenidoJuego, parametrosJuego, todasLasPalabras } from "../../lib/contenidoJuego.js";

export const NIVELES = ["A1", "A2", "B1", "B2"];

export function barajar(lista, rnd = Math.random) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export const limpiar = (texto) => String(texto ?? "").replace(/\s+/g, " ").trim();
export const sinAcentos = (texto) => limpiar(texto).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
export const tieneChino = (texto) => /[一-鿿]/.test(String(texto || ""));

/** Respuesta correcta de un ejercicio «seleccionar» (texto o índice) */
export function respuestaSeleccionar(ejercicio) {
  const r = ejercicio?.respuestaCorrecta;
  if (typeof r === "number") return ejercicio.opciones?.[r];
  return r;
}

/** Hook: contenido del juego según ?m=N&clase=K; «todas» = vocabulario de todas las unidades */
export function useContenidoJuego() {
  const location = useLocation();
  return React.useMemo(() => {
    const consulta = new URLSearchParams(location.search || (window.location.hash.split("?")[1] ?? ""));
    if (consulta.get("m") === "todas") {
      const palabras = barajar(todasLasPalabras()).slice(0, 80);
      return {
        numero: "todas",
        clase: null,
        titulo: "Todas las unidades",
        tituloChino: "全部单元",
        nivel: "A1–B2",
        vocabulario: palabras,
        dialogos: [],
        teoria: [],
        ejercicios: {},
      };
    }
    const { numero, clase } = parametrosJuego();
    return numero ? contenidoJuego(numero, clase) : null;
  }, [location.search, location.pathname]);
}

/** Clave de récord por unidad y clase */
export const claveRecord = (juego, contenido) => `dele_${juego}_record_${contenido?.numero ?? "x"}_${contenido?.clase ?? "u"}`;
export function leerNumero(clave, porDefecto = 0) {
  try {
    const v = Number(localStorage.getItem(clave));
    return Number.isFinite(v) && v > 0 ? v : porDefecto;
  } catch {
    return porDefecto;
  }
}
export function guardarNumero(clave, valor) {
  try {
    localStorage.setItem(clave, String(valor));
  } catch {}
}

export function usePrefiereMenosMovimiento() {
  const [reducido, setReducido] = React.useState(() => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const cambio = () => setReducido(mq.matches);
    mq.addEventListener?.("change", cambio);
    return () => mq.removeEventListener?.("change", cambio);
  }, []);
  return reducido;
}

/** Sello rojo con caligrafía */
export function Sello({ children, className = "", grande = false }) {
  return (
    <span className={`jb-sello ${grande ? "jb-sello--grande" : ""} ${className}`} translate="no" aria-hidden="true">
      {children}
    </span>
  );
}

export function Volver({ to = "/juegos" }) {
  return (
    <Link to={to} className="jb-volver">
      <ArrowLeftIcon size={18} aria-hidden="true" />
      <span>Volver · 返回</span>
    </Link>
  );
}

/** Etiqueta «Unidad N · Clase K» */
export function etiquetaContenido(c) {
  if (!c) return "";
  if (c.numero === "todas") return "Todas las unidades · 全部单元";
  const nivel = c.nivel || CATALOGO.find((u) => u.numero === c.numero)?.nivel || "";
  return `U${c.numero}${c.clase ? ` · Clase ${c.clase} 第${c.clase}课` : ""}${nivel ? ` · ${nivel}` : ""}`;
}

/** Frases de la clase (diálogos y «ordenar») de longitud razonable */
export function frasesDeClase(c, min = 3, max = 9) {
  const frases = [];
  for (const o of c?.ejercicios?.ordenar || []) if (o?.respuestaCorrecta) frases.push({ texto: limpiar(o.respuestaCorrecta), zh: limpiar(o.explicacion && tieneChino(o.explicacion) && !o.explicacion.includes("正确的顺序") ? o.explicacion : "") });
  for (const d of c?.dialogos || [])
    for (const l of d?.lineas || []) if (l?.texto && !tieneChino(l.texto)) frases.push({ texto: limpiar(l.texto), zh: limpiar(l.traduccion) });
  for (const t of c?.teoria || []) for (const e of t?.ejemplos || []) if (e?.espanol) frases.push({ texto: limpiar(e.espanol), zh: limpiar(e.chino) });
  for (const v of c?.vocabulario || []) if (v?.ejemplo && typeof v.ejemplo === "string" && !tieneChino(v.ejemplo)) frases.push({ texto: limpiar(v.ejemplo), zh: "" });
  const vistas = new Set();
  return frases.filter((f) => {
    const n = palabrasDe(f.texto).length;
    if (n < min || n > max || vistas.has(f.texto) || tieneChino(f.texto)) return false;
    vistas.add(f.texto);
    return true;
  });
}

/** Separa una frase en palabras (mantiene la puntuación pegada a la palabra) */
export const palabrasDe = (texto) => limpiar(texto).split(" ").filter(Boolean);
