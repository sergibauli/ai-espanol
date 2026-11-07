// Piezas comunes de los juegos «Dragón de jade» y «Escape del palacio» (prefijo jb-)
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeftIcon, LayersIcon } from "lucide-react";
import CATALOGO from "../../data/modulos/catalog.json";
import { clasesDe } from "../../lib/clases.js";
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

/** Selector de unidad y clase cuando no llega ?m= en la ruta */
export function SelectorUnidad({ titulo, tituloChino, icono, descripcion }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [nivel, setNivel] = React.useState("A1");
  const [unidad, setUnidad] = React.useState(null);
  const unidades = CATALOGO.filter((u) => u.nivel === nivel);
  const ir = (numero, clase) => navigate(`${location.pathname}?m=${numero}${clase ? `&clase=${clase}` : ""}`);
  const clases = unidad ? clasesDe(unidad.numero) : [];
  return (
    <div className="jb-selector gm-no-adapt">
      <Volver />
      <header className="jb-selector__cabecera">
        {icono}
        <h1 className="jb-titulo">
          {titulo} <span translate="no">· {tituloChino}</span>
        </h1>
        <p className="jb-sub">{descripcion}</p>
      </header>
      <div className="jb-pergamino jb-selector__panel">
        {!unidad ? (
          <>
            <p className="jb-selector__paso">1 · Elige una unidad · 选择单元</p>
            <div className="jb-pestanas" role="tablist" aria-label="Nivel · 级别">
              {NIVELES.map((n) => (
                <button key={n} type="button" role="tab" aria-selected={nivel === n} className={`jb-pestana ${nivel === n ? "is-activa" : ""}`} onClick={() => setNivel(n)}>
                  {n}
                </button>
              ))}
              <button type="button" className="jb-pestana jb-pestana--todas" onClick={() => ir("todas")}>
                <LayersIcon size={16} aria-hidden="true" /> Todas · 全部
              </button>
            </div>
            <ul className="jb-unidades">
              {unidades.map((u) => (
                <li key={u.numero}>
                  <button type="button" className="jb-unidad" onClick={() => (clasesDe(u.numero).length > 1 ? setUnidad(u) : ir(u.numero))}>
                    <span className="jb-unidad__num" translate="no">
                      {u.numero}
                    </span>
                    <span className="jb-unidad__txt">
                      <strong>{u.titulo}</strong>
                      <small>{u.tituloChino}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <button type="button" className="jb-enlace" onClick={() => setUnidad(null)}>
              <ArrowLeftIcon size={16} aria-hidden="true" /> Otras unidades · 其他单元
            </button>
            <p className="jb-selector__paso">
              2 · Unidad {unidad.numero}: {unidad.titulo} — elige una clase · 选择课
            </p>
            <ul className="jb-unidades">
              <li>
                <button type="button" className="jb-unidad" onClick={() => ir(unidad.numero)}>
                  <span className="jb-unidad__num">全</span>
                  <span className="jb-unidad__txt">
                    <strong>Toda la unidad</strong>
                    <small>整个单元</small>
                  </span>
                </button>
              </li>
              {clases.map((c) => (
                <li key={c.n}>
                  <button type="button" className="jb-unidad" onClick={() => ir(unidad.numero, c.n)}>
                    <span className="jb-unidad__num">{c.n}</span>
                    <span className="jb-unidad__txt">
                      <strong>Clase {c.n}{c.titulo ? ` · ${c.titulo}` : ""}</strong>
                      <small>第{c.n}课{c.tituloChino ? ` · ${c.tituloChino}` : ""}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
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
