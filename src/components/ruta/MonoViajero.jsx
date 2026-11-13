import * as React from "react";
import { MonoNube } from "../../../packages/imperial/src/index.js";
import { ANCHO_CARRIL, tramo } from "./geometria.js";

/*
  El Rey Mono en su nube (筋斗云) viaja por la curva del camino.
  - El movimiento se escribe con rAF directamente en style.transform (sin re-render por fotograma);
    la curva se muestrea una vez con getPointAtLength para ir a velocidad uniforme.
  - En reposo flota junto a la parada, la nube suelta volutas y mira hacia la parada.
  - En viaje: pose «poder», inclinación al acelerar y frenar, estela dorada (partículas recicladas con WAAPI),
    aterrizaje con rebote y destello.
  - Al tocarlo o pasar el ratón cambia de pose y suelta un bocadillo bilingüe de ánimo.
  Props: desde/hasta = puntos [x, y] del carril; salida = se va (unidad terminada) y avisa con onLlegada; seguir = el scroll le acompaña.
*/
const FRASES = [
  ["¡Tú puedes!", "你可以的！"],
  ["¡Vamos a por la siguiente!", "走，下一课！"],
  ["Paso a paso se llega lejos", "千里之行，始于足下"],
  ["¡Muy bien, sigue así!", "很好，继续加油！"],
  ["Hoy, un poquito más", "今天再学一点"],
  ["¡Ánimo, viajero!", "加油，旅行者！"],
  ["Sin prisa, pero sin pausa", "不怕慢，只怕站"],
  ["¡Eres un crack!", "你真棒！"],
];
const POSES_TOQUE = ["guino", "feliz", "poder", "trofeo", "serio", "saluda"];
const DURACION_VIAJE = 1900;
const MUESTRAS = 56;
const igual = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
const suave = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
const sinMovimiento = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function MonoViajero({ desde, hasta, pose = "saluda", tamano = 118, salida = false, retraso = 0, seguir = false, onLlegada }) {
  const refMedida = React.useRef(null);
  const refMover = React.useRef(null);
  const refInclina = React.useRef(null);
  const refGiro = React.useRef(null);
  const refSalto = React.useRef(null);
  const refEstela = React.useRef(null);
  const posicion = React.useRef(null); // última parada en la que está (o hacia la que va)
  const avisar = React.useRef(onLlegada);
  avisar.current = onLlegada;
  const [viajando, setViajando] = React.useState(false);
  const [contento, setContento] = React.useState(false);
  const [toque, setToque] = React.useState(null); // { pose, frase } mientras dura el bocadillo
  const numToques = React.useRef(Math.floor(Math.random() * FRASES.length));

  // Lado en el que descansa respecto a la parada (hacia el centro del carril) y separación
  const separacion = tamano * 0.85;
  const ladoDe = (p) => (p[0] > ANCHO_CARRIL / 2 ? -1 : 1);
  const reposo = (p) => [p[0] + ladoDe(p) * separacion, p[1] - tamano * 0.29];

  React.useEffect(() => {
    const mover = refMover.current;
    const inclina = refInclina.current;
    const giro = refGiro.current;
    const salto = refSalto.current;
    if (!mover) return undefined;
    const fijar = (x, y, grados = 0) => {
      mover.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      inclina.style.transform = `rotate(${grados.toFixed(2)}deg)`;
    };
    const mirar = (sentido) => (giro.style.transform = `scaleX(${sentido})`);
    const origen = posicion.current || desde;
    const llegada = salida ? [hasta[0], hasta[1] - tamano * 0.7] : reposo(hasta);

    // Ya está en su sitio (re-render sin cambio de parada)
    if (!salida && igual(posicion.current, hasta)) {
      fijar(llegada[0], llegada[1]);
      mirar(-ladoDe(hasta));
      return undefined;
    }
    const previa = posicion.current;
    const esEntrada = !previa;
    posicion.current = hasta;
    if (sinMovimiento() || igual(origen, hasta)) {
      fijar(llegada[0], llegada[1]);
      mirar(-ladoDe(hasta));
      if (salida) mover.style.opacity = "0";
      avisar.current?.();
      return undefined;
    }

    // Muestreo de la curva a velocidad uniforme
    const medida = refMedida.current;
    medida.setAttribute("d", tramo(origen, hasta));
    const largo = medida.getTotalLength();
    const puntos = Array.from({ length: MUESTRAS + 1 }, (_, i) => {
      const p = medida.getPointAtLength((largo * i) / MUESTRAS);
      return [p.x, p.y];
    });
    const partida = esEntrada ? [origen[0], origen[1] - tamano * 0.29] : reposo(origen);
    const difInicio = [partida[0] - origen[0], partida[1] - origen[1]];
    const difFin = [llegada[0] - hasta[0], llegada[1] - hasta[1]];
    const sentido = llegada[0] - partida[0] >= 0 ? 1 : -1;
    const duracion = Math.max(1100, Math.min(2300, (DURACION_VIAJE * largo) / 190));
    fijar(partida[0], partida[1]);
    mirar(sentido);

    // Estela: partículas recicladas, animadas con WAAPI (transform + opacity)
    const chispas = refEstela.current ? [...refEstela.current.children] : [];
    let turno = 0;
    let ultimaChispa = 0;
    const cadaMs = chispas.length > 10 ? 48 : 95;
    const soltarChispa = (x, y) => {
      const chispa = chispas[turno++ % chispas.length];
      if (!chispa?.animate) return;
      const bx = x - sentido * tamano * 0.25 + (Math.random() - 0.5) * tamano * 0.4;
      const by = y + tamano * 0.42 + (Math.random() - 0.5) * 14;
      const base = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0)`;
      const escala = 0.6 + Math.random() * 0.9;
      chispa.animate(
        [
          { opacity: 0.95, transform: `${base} scale(${escala}) rotate(0deg)` },
          { opacity: 0, transform: `${base} translate(${-sentido * 16}px, ${8 + Math.random() * 14}px) scale(.15) rotate(140deg)` },
        ],
        { duration: 620 + Math.random() * 380, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    };

    // El scroll acompaña al mono (se cancela si el alumno mueve la página)
    let acompanar = seguir;
    const soltar = () => (acompanar = false);
    if (seguir) for (const evento of ["wheel", "touchstart", "keydown"]) window.addEventListener(evento, soltar, { passive: true, once: true });

    let raf;
    let t0;
    let terminado = false;
    const paso = (ahora) => {
      t0 ??= ahora;
      const k = Math.min(1, (ahora - t0) / duracion);
      const e = suave(k);
      const f = e * MUESTRAS;
      const i = Math.min(MUESTRAS - 1, Math.floor(f));
      const r = f - i;
      const px = puntos[i][0] + (puntos[i + 1][0] - puntos[i][0]) * r;
      const py = puntos[i][1] + (puntos[i + 1][1] - puntos[i][1]) * r;
      const x = px + difInicio[0] + (difFin[0] - difInicio[0]) * e;
      const y = py + difInicio[1] + (difFin[1] - difInicio[1]) * e - Math.sin(Math.PI * e) * 16;
      // Se inclina hacia delante al acelerar y hacia atrás al frenar
      fijar(x, y, sentido * 11 * Math.sin(2 * Math.PI * k));
      if (ahora - ultimaChispa > cadaMs && k > 0.04 && k < 0.96) {
        ultimaChispa = ahora;
        soltarChispa(x, y);
      }
      if (acompanar) {
        const caja = mover.getBoundingClientRect();
        const desvio = caja.top - window.innerHeight * 0.42;
        if (Math.abs(desvio) > 2) window.scrollBy(0, desvio * 0.085);
      }
      if (k < 1) {
        raf = requestAnimationFrame(paso);
        return;
      }
      terminado = true;
      setViajando(false);
      if (salida) {
        // Se va volando hacia la siguiente unidad
        const adios = salto.animate?.([{ opacity: 1, transform: "translateY(0) scale(1)" }, { opacity: 0, transform: `translateY(${tamano * 0.6}px) scale(.55)` }], { duration: 420, easing: "cubic-bezier(.55,0,.8,.2)", fill: "forwards" });
        if (adios) adios.onfinish = () => avisar.current?.();
        else avisar.current?.();
        return;
      }
      mirar(-ladoDe(hasta));
      mover.classList.add("aterriza");
      setContento(true);
      avisar.current?.();
    };
    const arranque = setTimeout(() => {
      setViajando(true);
      raf = requestAnimationFrame(paso);
    }, retraso);
    const finRebote = setTimeout(() => {
      mover.classList.remove("aterriza");
      setContento(false);
    }, retraso + duracion + 1300);
    return () => {
      clearTimeout(arranque);
      clearTimeout(finRebote);
      cancelAnimationFrame(raf);
      mover.classList.remove("aterriza");
      if (seguir) for (const evento of ["wheel", "touchstart", "keydown"]) window.removeEventListener(evento, soltar);
      // Si se interrumpe antes de llegar (o el doble montaje de StrictMode), el siguiente viaje vuelve a salir del origen
      if (!terminado) {
        posicion.current = previa;
        setViajando(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desde[0], desde[1], hasta[0], hasta[1], salida, tamano]);

  // Toque / ratón: nueva pose + bocadillo de ánimo durante unos segundos
  React.useEffect(() => {
    if (!toque) return undefined;
    const temporizador = setTimeout(() => setToque(null), 2800);
    return () => clearTimeout(temporizador);
  }, [toque]);
  const animar = () => {
    const n = numToques.current++;
    setToque({ pose: POSES_TOQUE[n % POSES_TOQUE.length], frase: FRASES[n % FRASES.length], n });
  };

  const poseVisible = viajando ? "poder" : toque?.pose || (contento ? "feliz" : pose);
  const bocadilloHacia = reposo(hasta)[0] < ANCHO_CARRIL / 2 ? "der" : "izq";
  return (
    <>
      <svg className="rv-medida" width="0" height="0" aria-hidden="true">
        <path ref={refMedida} />
      </svg>
      <div className="rv-estela" ref={refEstela} aria-hidden="true">
        {Array.from({ length: tamano > 100 ? 16 : 8 }, (_, i) => (
          <i key={i} className={i % 3 === 0 ? "estrella" : ""} />
        ))}
      </div>
      <div className={`rv ${viajando ? "viaja" : "reposa"}`} ref={refMover} style={{ "--rv": `${tamano}px` }}>
        <div className="rv-inclina" ref={refInclina}>
          <div className="rv-salto" ref={refSalto}>
            <span className="rv-sombra" aria-hidden="true" />
            <span className="rv-destello" aria-hidden="true" />
            <span className="rv-volutas" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <button type="button" className="rv-toque" onClick={animar} onPointerEnter={(evento) => evento.pointerType === "mouse" && !toque && animar()} aria-label="Rey Mono: toca para recibir ánimo · 点一下孙悟空，给你加油">
              <span className="rv-giro" ref={refGiro}>
                <MonoNube key={poseVisible} pose={poseVisible} tamano={tamano} className="rv-mono" />
              </span>
            </button>
            {toque && (
              <div key={toque.n} className={`rv-bocadillo ${bocadilloHacia}`} role="status">
                <b>{toque.frase[0]}</b>
                <span>{toque.frase[1]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
