import * as React from "react";
import { speak } from "../lesson/fx.js";
import { duracionVoz, reducido } from "./salas.js";

// Hook: reproduce con speak y expone el nivel (0…1) mientras suena, para animar la onda
export function useVoz() {
  const [nivel, setNivel] = React.useState(0);
  const [texto, setTexto] = React.useState("");
  const temporizador = React.useRef(null);
  React.useEffect(() => () => clearTimeout(temporizador.current), []);
  const hablar = React.useCallback((t, velocidad = 0.85, voz) => {
    try {
      speak(t, velocidad, voz);
    } catch {}
    clearTimeout(temporizador.current);
    setTexto(t);
    setNivel(1);
    temporizador.current = setTimeout(() => {
      setNivel(0);
      setTexto("");
    }, duracionVoz(t, velocidad));
  }, []);
  return { nivel, texto, hablar };
}

// Onda de tinta y oro: con `analizador` dibuja la voz real del micrófono; si no, una onda viva según `nivel`.
export default function OndaViva({ nivel = 0, analizador = null, color = "#c8102e", oro = "#f2c14e", alto = 96, className = "" }) {
  const lienzo = React.useRef(null);
  const estado = React.useRef({ energia: 0, fase: 0, objetivo: 0 });
  estado.current.objetivo = analizador ? 1 : nivel;

  React.useEffect(() => {
    const canvas = lienzo.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const quieto = reducido();
    const datos = analizador ? new Uint8Array(analizador.fftSize) : null;
    let raf = 0;
    let ancho = 0;
    let altoPx = 0;
    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = canvas.clientWidth;
      altoPx = canvas.clientHeight;
      canvas.width = Math.max(1, ancho * dpr);
      canvas.height = Math.max(1, altoPx * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(medir) : null;
    ro?.observe(canvas);

    const trazo = (amplitud, frecuencia, desfase, estilo, grosor, alfa) => {
      const medio = altoPx / 2;
      ctx.beginPath();
      for (let x = 0; x <= ancho; x += 3) {
        const u = x / ancho;
        const envolvente = Math.sin(Math.PI * u) ** 1.6;
        let y;
        if (datos) {
          const i = Math.floor(u * (datos.length - 1));
          y = ((datos[i] - 128) / 128) * medio * 0.95 * envolvente * (1 + desfase * 0.15);
        } else {
          y = Math.sin(u * frecuencia + estado.current.fase * (1 + desfase * 0.3) + desfase) * amplitud * envolvente * medio * 0.85;
          y += Math.sin(u * frecuencia * 2.3 - estado.current.fase * 1.7) * amplitud * envolvente * medio * 0.18;
        }
        if (x === 0) ctx.moveTo(x, medio + y);
        else ctx.lineTo(x, medio + y);
      }
      ctx.globalAlpha = alfa;
      ctx.strokeStyle = estilo;
      ctx.lineWidth = grosor;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const dibujar = () => {
      const s = estado.current;
      s.energia += (Math.max(0.06, s.objetivo) - s.energia) * 0.08;
      s.fase += 0.06 + s.energia * 0.16;
      if (datos) analizador.getByteTimeDomainData(datos);
      ctx.clearRect(0, 0, ancho, altoPx);
      const e = s.energia;
      trazo(e * 0.55, 9, 2.1, color, 1.5, 0.35);
      trazo(e * 0.8, 13, 1, oro, 2, 0.75);
      trazo(e, 11, 0, color, 3, 0.95);
    };

    if (quieto) {
      estado.current.energia = Math.max(0.06, estado.current.objetivo);
      dibujar();
    } else {
      const bucle = () => {
        if (!document.hidden) dibujar();
        raf = requestAnimationFrame(bucle);
      };
      bucle();
    }
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [analizador, color, oro, reducido() ? nivel : 0]);

  return <canvas ref={lienzo} className={`pv-onda ${className}`} style={{ height: alto }} aria-hidden="true" />;
}

// Sello rojo que se estampa (acierto, sílaba dominada…)
export function SelloEstampa({ texto = "好", sub, className = "" }) {
  return (
    <span className={`pv-estampa ${className}`} aria-hidden="true">
      <span className="pv-estampa__tinta" />
      <span className="pv-estampa__sello" translate="no">
        {texto}
        {sub && <small>{sub}</small>}
      </span>
    </span>
  );
}
