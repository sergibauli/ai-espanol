// Dibujo a pincel de «Pincel mágico · 神笔»: pinta un icono de lucide trazo a trazo con aspecto de tinta china.
// Capas por trazo: sangrado (tinta húmeda que se extiende), trazo principal con borde irregular y vetas de pincel seco.
// El pincel dorado recorre cada trazo; la cabeza de cada trazo deja una gota (el golpe del pincel al apoyarse).
import * as React from "react";

const TINTA = "#1c120c";
const PUNTA = [-2, -1, 0, 1, 2];

/** Pinceles de tinta: filtros SVG compartidos (ids únicos por dibujo) */
function Filtros({ id, seco = 0.5 }) {
  return (
    <defs>
      <filter id={`${id}-borde`} x="-4" y="-4" width="32" height="32" filterUnits="userSpaceOnUse">
        <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="7" result="ruido" />
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="0.38" xChannelSelector="R" yChannelSelector="G" result="movido" />
        <feGaussianBlur in="movido" stdDeviation="0.05" />
      </filter>
      <filter id={`${id}-sangre`} x="-4" y="-4" width="32" height="32" filterUnits="userSpaceOnUse">
        <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="3" result="ruido" />
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="movido" />
        <feGaussianBlur in="movido" stdDeviation="0.38" />
      </filter>
      <filter id={`${id}-seco`} x="-4" y="-4" width="32" height="32" filterUnits="userSpaceOnUse">
        <feTurbulence type="fractalNoise" baseFrequency="5 0.6" numOctaves="1" seed="11" result="vetas" />
        <feColorMatrix in="vetas" type="matrix" values={`0 0 0 0 0.96  0 0 0 0 0.91  0 0 0 0 0.8  0 0 0 ${-3.2 * seco} ${1.45 * seco}`} result="papel" />
        <feComposite in="papel" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  );
}

/** Pincel de caligrafía con mango de bambú lacado y virola de oro (la punta está en 0,0) */
export function PincelSvg({ escala = 1 }) {
  return (
    <g transform={`scale(${escala}) rotate(-38)`}>
            <path d="M0 0 C -0.55 -0.9 -0.65 -2.1 -0.42 -3.2 L 0.42 -3.2 C 0.65 -2.1 0.55 -0.9 0 0 Z" fill="#1c120c" />
      <path d="M-0.15 -1.2 C -0.3 -2 -0.3 -2.6 -0.2 -3.1" stroke="#5a463a" strokeWidth=".12" fill="none" />
      <rect x="-0.5" y="-4.1" width="1" height="0.95" rx=".18" fill="#f2c14e" stroke="#8a5a1e" strokeWidth=".08" />
      <rect x="-0.38" y="-11.6" width="0.76" height="7.55" rx=".3" fill="#8f0c21" />
      <rect x="-0.38" y="-11.6" width="0.28" height="7.55" rx=".14" fill="#e0485a" opacity=".55" />
      <rect x="-0.44" y="-8.2" width="0.88" height="0.28" fill="#c8961e" />
      <rect x="-0.44" y="-10.6" width="0.88" height="0.28" fill="#c8961e" />
      <circle cx="0" cy="-12" r=".55" fill="none" stroke="#c8961e" strokeWidth=".18" />
    </g>
  );
}

const ETIQUETAS = { path: "path", circle: "circle", rect: "rect", line: "line", polyline: "polyline", polygon: "polygon", ellipse: "ellipse" };

/**
 * <DibujoTinta nodos duracion animar terminado onFin progresoRef />
 * - animar: pinta trazo a trazo en `duracion` ms; si no, se muestra entero (galería).
 * - terminado: completa el dibujo al instante (el alumno ya acertó).
 * - progresoRef.current: avance 0–1 del dibujo (para puntuar la rapidez).
 */
export function DibujoTinta({ nodos, duracion = 8000, animar = true, terminado = false, onFin, progresoRef, color = TINTA, pincel = true, className = "", grosor = 1.3, retraso = 0 }) {
  const id = "pm" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const svgRef = React.useRef(null);
  const pincelRef = React.useRef(null);
  const finRef = React.useRef(onFin);
  finRef.current = onFin;
  const terminadoRef = React.useRef(terminado);
  terminadoRef.current = terminado;
  const reducido = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  React.useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const capas = nodos.map((_, i) => ({
      principal: svg.querySelector(`[data-p="${i}"]`),
      copias: [...svg.querySelectorAll(`[data-p="${i}"]`)],
      sangre: svg.querySelector(`[data-s="${i}"]`),
      seco: svg.querySelector(`[data-v="${i}"]`),
      gota: svg.querySelector(`[data-g="${i}"]`),
    }));
    const largos = capas.map((c) => {
      try {
        return Math.max(0.5, c.principal.getTotalLength());
      } catch {
        return 10;
      }
    });
    const poner = (i, p) => {
      const L = largos[i];
      const off = String(L * (1 - p));
      for (const el of [...capas[i].copias, capas[i].sangre, capas[i].seco]) {
        if (!el) continue;
        el.style.strokeDasharray = `${L} ${L + 1}`;
        el.style.strokeDashoffset = off;
      }
      if (capas[i].gota) capas[i].gota.style.opacity = p > 0 ? "1" : "0";
      svg.querySelector(`[data-t="${i}"]`)?.classList.toggle("is-hecho", p >= 1);
    };
    const completar = () => {
      capas.forEach((_, i) => poner(i, 1));
      if (pincelRef.current) pincelRef.current.style.opacity = "0";
      if (progresoRef) progresoRef.current = 1;
    };
    if (!animar || reducido) {
      completar();
      if (animar) finRef.current?.();
      return;
    }
    capas.forEach((_, i) => poner(i, 0));
    // Reparto del tiempo: proporcional a la longitud, con un mínimo por trazo y una pausa al levantar el pincel
    const pausa = 140;
    const total = largos.reduce((a, b) => a + b, 0);
    const util = Math.max(1200, duracion - pausa * nodos.length);
    const tiempos = largos.map((L) => Math.max(260, (L / total) * util));
    const escala = util / tiempos.reduce((a, b) => a + b, 0);
    const tramos = [];
    let t0 = 0;
    for (const t of tiempos) {
      tramos.push([t0, t0 + t * escala]);
      t0 += t * escala + pausa;
    }
    const fin = t0;
    let raf = 0;
    let inicio = 0;
    let acabado = false;
    const arranque = performance.now() + retraso;
    const paso = (ahora) => {
      if (ahora < arranque && !terminadoRef.current) {
        raf = requestAnimationFrame(paso);
        return;
      }
      if (!inicio) inicio = ahora;
      if (terminadoRef.current) {
        completar();
        return;
      }
      const t = ahora - inicio;
      let punto = null;
      tramos.forEach(([a, b], i) => {
        const p = t <= a ? 0 : t >= b ? 1 : (t - a) / (b - a);
        // Facilidad: el pincel arranca despacio, corre y frena al final
        const pe = p <= 0 || p >= 1 ? p : p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        poner(i, pe);
        if (p > 0 && p < 1) punto = { i, L: largos[i] * pe };
        else if (!punto && t > b && t < b + pausa) punto = { i, L: largos[i], alzado: true };
      });
      if (progresoRef) progresoRef.current = Math.min(1, t / fin);
      const pin = pincelRef.current;
      if (pin && punto) {
        try {
          const q = capas[punto.i].principal.getPointAtLength(punto.L);
          pin.setAttribute("transform", `translate(${q.x} ${q.y - (punto.alzado ? 0.9 : 0)})`);
          pin.style.opacity = "1";
        } catch {}
      }
      if (t >= fin) {
        if (!acabado) {
          acabado = true;
          if (pin) pin.style.opacity = "0";
          finRef.current?.();
        }
        return;
      }
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [nodos, duracion, animar]); // eslint-disable-line react-hooks/exhaustive-deps

  // Si llega «terminado» con el bucle ya parado (o sin animación), se completa igualmente
  React.useEffect(() => {
    if (!terminado || !svgRef.current) return;
    svgRef.current.querySelectorAll("[data-p],[data-s],[data-v]").forEach((el) => {
      el.style.strokeDashoffset = "0";
    });
    svgRef.current.querySelectorAll("[data-g]").forEach((el) => (el.style.opacity = "1"));
    svgRef.current.querySelectorAll("[data-t]").forEach((el) => el.classList.add("is-hecho"));
    if (pincelRef.current) pincelRef.current.style.opacity = "0";
  }, [terminado]);

  const forma = (tag, attrs, extra) => React.createElement(ETIQUETAS[tag] || "path", { ...attrs, ...extra });
  const inicioDe = (tag, a) => {
    if (tag === "path") {
      const m = String(a.d).match(/^\s*M\s*(-?[\d.]+)[\s,]*(-?[\d.]+)/i);
      return m ? [Number(m[1]), Number(m[2])] : null;
    }
    if (tag === "line") return [Number(a.x1), Number(a.y1)];
    if (tag === "polyline" || tag === "polygon") {
      const n = String(a.points).trim().split(/[\s,]+/).map(Number);
      return [n[0], n[1]];
    }
    if (tag === "rect") return [Number(a.x) + Number(a.rx || 0), Number(a.y)];
    if (tag === "circle" || tag === "ellipse") return [Number(a.cx) + Number(a.r || a.rx), Number(a.cy)];
    return null;
  };

  return (
    <svg ref={svgRef} className={`pm-dibujo ${className}`} viewBox="-2 -2 28 28" aria-hidden="true" focusable="false">
      <Filtros id={id} />
      {nodos.map(([tag, attrs], i) => {
        const ini = inicioDe(tag, attrs);
        return (
          <g key={i} data-t={i} className="pm-trazo">
            <g filter={`url(#${id}-sangre)`} className="pm-trazo__sangre">
              {forma(tag, attrs, { "data-s": i, fill: "none", stroke: color, strokeWidth: grosor * 1.2, strokeLinecap: "round", strokeLinejoin: "round", opacity: 0.26 })}
            </g>
            <g filter={`url(#${id}-borde)`}>
              {/* Punta ancha: varias pasadas desplazadas en diagonal → trazo grueso o fino según la dirección */}
              {PUNTA.map((k) => (
                <g key={k} transform={`translate(${k * 0.15} ${-k * 0.15})`}>
                  {forma(tag, attrs, { "data-p": i, fill: "none", stroke: color, strokeWidth: grosor * 0.62, strokeLinecap: "round", strokeLinejoin: "round" })}
                </g>
              ))}
              {ini && <circle data-g={i} cx={ini[0]} cy={ini[1]} r={grosor * 0.62} fill={color} style={{ opacity: animar ? 0 : 1 }} className="pm-gota" />}
            </g>
            <g filter={`url(#${id}-seco)`} className="pm-trazo__seco">
              {forma(tag, attrs, { "data-v": i, fill: "none", stroke: color, strokeWidth: grosor * 0.95, strokeLinecap: "round", strokeLinejoin: "round" })}
            </g>
          </g>
        );
      })}
      {pincel && animar && (
        <g ref={pincelRef} className="pm-pincel" style={{ opacity: 0 }}>
          <PincelSvg escala={0.95} />
        </g>
      )}
    </svg>
  );
}

/** Sello rojo 印 que cae sobre el pergamino */
export function SelloCae({ texto = "印", fallo = false }) {
  return (
    <span className={`pm-sello-cae ${fallo ? "is-fallo" : ""}`} aria-hidden="true">
      <span className="pm-sello-cae__polvo">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ "--a": `${i * (360 / 14)}deg`, "--r": `${46 + (i % 3) * 14}px`, "--s": `${4 + (i % 4) * 2}px` }} />
        ))}
      </span>
      <span className="pm-sello-cae__cara" translate="no">
        {texto}
      </span>
    </span>
  );
}

/** Pergamino horizontal con rodillos sobre la mesa de laca (cae y se desenrolla en 3D con la clase is-abre) */
export function Pergamino({ children, className = "", estado }) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => el.style.setProperty("--mitad", `${Math.round(el.clientWidth / 2 - 18)}px`);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`pm-pergamino ${className}`} data-estado={estado}>
      <span className="pm-pergamino__sombra" aria-hidden="true" />
      <span className="pm-rodillo pm-rodillo--izq" aria-hidden="true" />
      <div className="pm-papel">
        <span className="pm-papel__montes" aria-hidden="true" />
        {children}
      </div>
      <span className="pm-rodillo pm-rodillo--der" aria-hidden="true" />
    </div>
  );
}

/** Estallido de oro cuando el dibujo cobra vida (rayos y chispas que salen hacia la cámara) */
export function Destello() {
  return (
    <span className="pm-destello" aria-hidden="true">
      <i className="pm-destello__halo" />
      {Array.from({ length: 12 }, (_, i) => (
        <i key={`r${i}`} className="pm-destello__rayo" style={{ "--a": `${i * 30}deg` }} />
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <i key={`c${i}`} className="pm-destello__chispa" style={{ "--a": `${i * 20 + (i % 3) * 7}deg`, "--r": `${90 + (i % 4) * 40}px`, "--z": `${120 + (i % 5) * 60}px`, "--d": `${(i % 6) * 0.04}s` }} />
      ))}
    </span>
  );
}

/** Farolillos rojos que se balancean en 3D a los lados de la mesa */
export function Farolillos() {
  return (
    <>
      {["学", "福"].map((t, i) => (
        <span key={t} className={`pm-farol pm-farol--${i ? "der" : "izq"}`} aria-hidden="true">
          <i className="pm-farol__cuerda" />
          <i className="pm-farol__cuerpo" translate="no">
            <b>{t}</b>
          </i>
          <i className="pm-farol__borla" />
        </span>
      ))}
    </>
  );
}

/** Partículas de oro flotando sobre la mesa */
export function PolvoOro({ n = 18 }) {
  return (
    <span className="pm-polvo" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ "--x": `${(i * 53) % 100}%`, "--d": `${(i * 0.71) % 7}s`, "--t": `${7 + (i % 5) * 1.4}s`, "--s": `${2 + (i % 3)}px` }} />
      ))}
    </span>
  );
}

