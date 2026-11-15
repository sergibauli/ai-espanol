// Piezas comunes de los juegos «Mapa mental» y «Teatro de diálogos» (prefijo ja-).
// La elección de unidad usa el selector común (components/juegos/SelectorTemaJuego.jsx).
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeftIcon, BookOpenIcon } from "lucide-react";
import CATALOGO from "../../data/modulos/catalog.json";
import { contenidoJuego } from "../../lib/contenidoJuego.js";

export const NIVELES = ["A1", "A2", "B1", "B2"];

export const reducido = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
export const nivelDe = (numero) => CATALOGO.find((u) => u.numero === Number(numero))?.nivel || "A1";
export const barajar = (lista) => {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

/** Contenido de la unidad/clase según ?m=N&clase=K (HashRouter) y funciones para cambiarla */
export function useContenidoJA() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const numero = Number(params.get("m")) || null;
  const claseTexto = params.get("clase");
  const clase = claseTexto && claseTexto !== "unidad" ? Number(claseTexto) || null : null;
  const contenido = React.useMemo(() => {
    if (!numero) return null;
    const datos = contenidoJuego(numero, clase);
    return datos ? { ...datos, nivel: datos.nivel || nivelDe(numero) } : null;
  }, [numero, clase]);
  const elegir = React.useCallback(
    (n, k) => navigate(`${location.pathname}?m=${n}${k ? `&clase=${k}` : ""}`),
    [navigate, location.pathname],
  );
  const quitar = React.useCallback(() => navigate(location.pathname), [navigate, location.pathname]);
  return { contenido, numero, clase, elegir, quitar };
}

/** Partículas doradas en un lienzo temporal (respeta prefers-reduced-motion) */
export function chispasOro(x, y, cantidad = 26) {
  if (reducido() || typeof document === "undefined") return;
  const lienzo = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  lienzo.className = "ja-chispas";
  lienzo.width = innerWidth * dpr;
  lienzo.height = innerHeight * dpr;
  document.body.appendChild(lienzo);
  const ctx = lienzo.getContext("2d");
  ctx.scale(dpr, dpr);
  const colores = ["#f2c14e", "#ffe08a", "#c8961e", "#fff4c8"];
  const chispas = Array.from({ length: cantidad }, (_, i) => {
    const angulo = (Math.PI * 2 * i) / cantidad + Math.random() * 0.4;
    const velocidad = 2 + Math.random() * 4.5;
    return { x, y, vx: Math.cos(angulo) * velocidad, vy: Math.sin(angulo) * velocidad - 1.5, vida: 1, r: 1.5 + Math.random() * 3, c: colores[i % colores.length] };
  });
  let ultimo = performance.now();
  const paso = (ahora) => {
    const dt = Math.min(2, (ahora - ultimo) / 16.7);
    ultimo = ahora;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    let vivas = 0;
    for (const p of chispas) {
      if (p.vida <= 0) continue;
      vivas++;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.12 * dt;
      p.vx *= 0.985;
      p.vida -= 0.018 * dt;
      ctx.globalAlpha = Math.max(0, p.vida);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      // Estrella de cuatro puntas
      const r = p.r * (0.6 + p.vida * 0.6);
      ctx.moveTo(p.x, p.y - r * 2);
      ctx.lineTo(p.x + r * 0.5, p.y - r * 0.5);
      ctx.lineTo(p.x + r * 2, p.y);
      ctx.lineTo(p.x + r * 0.5, p.y + r * 0.5);
      ctx.lineTo(p.x, p.y + r * 2);
      ctx.lineTo(p.x - r * 0.5, p.y + r * 0.5);
      ctx.lineTo(p.x - r * 2, p.y);
      ctx.lineTo(p.x - r * 0.5, p.y - r * 0.5);
      ctx.fill();
    }
    if (vivas) requestAnimationFrame(paso);
    else lienzo.remove();
  };
  requestAnimationFrame(paso);
}

/** Sello rojo con caligrafía */
export function SelloJA({ texto, grande = false }) {
  return (
    <span className={`ja-sello${grande ? " ja-sello-grande" : ""}`} translate="no" aria-hidden="true">
      {texto}
    </span>
  );
}

/** Cabecera común: volver, título con sello y chip de la unidad elegida */
export function CabeceraJA({ titulo, tituloZh, sello, contenido, onCambiar, children }) {
  return (
    <header className="ja-cabecera">
      <Link to="/juegos" className="ja-volver" aria-label="Volver a juegos · 返回游戏">
        <ArrowLeftIcon size={20} aria-hidden="true" />
        <span>Juegos · 游戏</span>
      </Link>
      <div className="ja-titulo">
        <SelloJA texto={sello} />
        <div>
          <h1>{titulo}</h1>
          <p>{tituloZh}</p>
        </div>
      </div>
      {contenido && (
        <button type="button" className="ja-chip-unidad" onClick={onCambiar} title="Cambiar unidad · 更换单元">
          <BookOpenIcon size={16} aria-hidden="true" />
          <span className="ja-chip-texto">
            <b>
              {contenido.nivel} · U{contenido.numero}
              {contenido.clase ? ` · C${contenido.clase}` : ""}
            </b>
            <small className="ja-chip-tema">{contenido.tituloChino || contenido.titulo}</small>
            <small className="ja-chip-movil">Cambiar · 更换</small>
          </span>
          <span className="ja-chip-cambiar">Cambiar · 更换</span>
        </button>
      )}
      {children}
    </header>
  );
}
