import * as React from "react";

/*
  Fuegos artificiales en <canvas> para las celebraciones de la Ruta (oro, laca y jade).
  - Cohetes con estela que suben y estallan en peonías, anillos, sauces dorados y crisantemos con chisporroteo.
  - Mezcla aditiva, estelas por persistencia, destello en cada estallido.
  - DPR limitado a 2, mitad de chispas en móvil, se pausa con la pestaña oculta y al acabar limpia y libera (onFin).
  - pointer-events: none (lo pone el CSS .fa-lienzo): nunca tapa la interacción.
*/
const PALETAS = [
  ["#fffbe6", "#f6d77e", "#f2c14e"], // oro
  ["#ffe1d6", "#ff5a66", "#c8102e"], // laca
  ["#e6fff0", "#6fe6ab", "#1f9d63"], // jade
  ["#ffffff", "#ffe9a8", "#ffb347"], // ámbar
];
const TIPOS = ["peonia", "anillo", "sauce", "crisantemo"];
const GRAVEDAD = 95;

// Sprite de resplandor por color (se dibuja una vez y se reutiliza con drawImage)
function crearResplandor(color) {
  const lienzo = document.createElement("canvas");
  lienzo.width = lienzo.height = 64;
  const c = lienzo.getContext("2d");
  const degradado = c.createRadialGradient(32, 32, 0, 32, 32, 32);
  degradado.addColorStop(0, "#ffffff");
  degradado.addColorStop(0.18, color);
  degradado.addColorStop(0.5, `${color}55`);
  degradado.addColorStop(1, `${color}00`);
  c.fillStyle = degradado;
  c.fillRect(0, 0, 64, 64);
  return lienzo;
}

export function FuegosArtificiales({ nivel = "clase", onFin }) {
  const refLienzo = React.useRef(null);
  const fin = React.useRef(onFin);
  fin.current = onFin;

  React.useEffect(() => {
    const lienzo = refLienzo.current;
    const ctx = lienzo?.getContext("2d");
    if (!ctx) return undefined;
    const movil = window.innerWidth <= 700;
    const dpr = Math.min(window.devicePixelRatio || 1, movil ? 1.5 : 2);
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    lienzo.width = Math.round(ancho * dpr);
    lienzo.height = Math.round(alto * dpr);
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    const escala = Math.max(0.62, Math.min(1.25, Math.min(ancho, alto) / 820));
    const densidad = movil ? 0.5 : 1;
    const resplandores = PALETAS.map((paleta) => crearResplandor(paleta[1]));

    // Guion de lanzamientos (ms): clase = ramillete corto; unidad = castillo con traca final
    const guion =
      nivel === "unidad"
        ? [0, 240, 560, 900, 1300, 1700, 2100, 2500, 2900, 3300, 3380, 3460, 3550]
        : [0, 250, 600, 1000, 1450, 1900];
    const cohetes = [];
    const chispas = [];
    const destellos = [];
    let lanzados = 0;

    const lanzar = (indice) => {
      const final = nivel === "unidad" && indice >= guion.length - 4;
      const x = ancho * (0.14 + Math.random() * 0.72);
      const y = alto * (0.13 + Math.random() * (final ? 0.2 : 0.3));
      cohetes.push({
        x0: x + (Math.random() - 0.5) * 120,
        y0: alto + 12,
        x1: x,
        y1: y,
        x: x,
        y: alto + 12,
        t: 0,
        dura: 0.62 + Math.random() * 0.25,
        paleta: final ? 0 : indice % PALETAS.length,
        tipo: final ? "sauce" : TIPOS[(indice + (Math.random() < 0.35 ? 1 : 0)) % TIPOS.length],
        grande: final || indice % 3 === 0,
      });
    };

    const estallar = (cohete) => {
      const { x1: x, y1: y, tipo, paleta } = cohete;
      const fuerza = (cohete.grande ? 250 : 190) * escala;
      const cuantas = Math.round((cohete.grande ? 110 : 76) * densidad);
      destellos.push({ x, y, vida: 0.36, vidaMax: 0.36, radio: fuerza * 0.9, paleta });
      for (let i = 0; i < cuantas; i++) {
        const angulo = (i / cuantas) * Math.PI * 2 + Math.random() * 0.12;
        let rapidez = fuerza * (0.35 + Math.random() * 0.65);
        let vida = 1.1 + Math.random() * 0.7;
        let peso = 1;
        let freno = 1.7;
        let colores = PALETAS[paleta];
        let grosor = 1.6 + Math.random() * 1.2;
        if (tipo === "anillo") {
          rapidez = fuerza * (i % 4 === 0 ? 0.42 : 0.95);
          if (i % 4 === 0) colores = PALETAS[(paleta + 1) % PALETAS.length];
          vida = 1 + Math.random() * 0.3;
        } else if (tipo === "sauce") {
          colores = PALETAS[0];
          vida = 1.4 + Math.random() * 0.5;
          peso = 1.35;
          freno = 1.25;
          grosor = 1.4 + Math.random();
        } else if (tipo === "crisantemo") {
          rapidez = fuerza * (0.75 + Math.random() * 0.3);
          vida = 1.35 + Math.random() * 0.5;
          if (i % 3 === 0) colores = PALETAS[3];
        }
        chispas.push({
          x,
          y,
          px: x,
          py: y,
          vx: Math.cos(angulo) * rapidez,
          vy: Math.sin(angulo) * rapidez - 20,
          vida,
          vidaMax: vida,
          peso,
          freno,
          grosor: grosor * (0.8 + escala * 0.3),
          color: colores[1 + (i % 2)],
          paleta: PALETAS.indexOf(colores),
          chisporrotea: tipo === "crisantemo" || tipo === "sauce",
        });
      }
    };

    let tiempo = 0; // reloj propio en segundos: no avanza con la pestaña oculta
    let anterior = 0;
    let raf = 0;
    let acabado = false;
    const terminar = () => {
      if (acabado) return;
      acabado = true;
      cancelAnimationFrame(raf);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, lienzo.width, lienzo.height);
      // Libera la memoria del lienzo
      lienzo.width = lienzo.height = 0;
      fin.current?.();
    };

    const cuadro = (ahora) => {
      const dt = Math.min(0.09, anterior ? (ahora - anterior) / 1000 : 0.016);
      anterior = ahora;
      tiempo += dt;
      while (lanzados < guion.length && tiempo * 1000 >= guion[lanzados]) lanzar(lanzados++);

      // Persistencia: se borra un poco cada cuadro para dejar estela
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(0,0,0,${(1 - Math.exp(-dt * 13)).toFixed(3)})`; // mismo desvanecido a cualquier fps
      ctx.fillRect(0, 0, ancho, alto);
      ctx.globalCompositeOperation = "lighter";

      // Cohetes subiendo
      for (let i = cohetes.length - 1; i >= 0; i--) {
        const cohete = cohetes[i];
        cohete.t += dt / cohete.dura;
        const k = Math.min(1, cohete.t);
        const e = 1 - (1 - k) ** 2.4;
        const x = cohete.x0 + (cohete.x1 - cohete.x0) * e + Math.sin(k * 9) * 3;
        const y = cohete.y0 + (cohete.y1 - cohete.y0) * e;
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = "#ffe9a8";
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(cohete.x, cohete.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.drawImage(resplandores[0], x - 9, y - 9, 18, 18);
        if (Math.random() < 0.6) chispas.push({ x, y, px: x, py: y, vx: (Math.random() - 0.5) * 30, vy: 30 + Math.random() * 40, vida: 0.35, vidaMax: 0.35, peso: 0.6, freno: 2, grosor: 1.1, color: "#f6d77e", paleta: 0, chisporrotea: false });
        cohete.x = x;
        cohete.y = y;
        if (k >= 1) {
          cohetes.splice(i, 1);
          estallar(cohete);
        }
      }

      // Destello de cada estallido
      for (let i = destellos.length - 1; i >= 0; i--) {
        const destello = destellos[i];
        destello.vida -= dt;
        if (destello.vida <= 0) {
          destellos.splice(i, 1);
          continue;
        }
        const f = destello.vida / destello.vidaMax;
        const radio = destello.radio * (1.2 - f * 0.6);
        ctx.globalAlpha = f * 0.75;
        ctx.drawImage(resplandores[destello.paleta], destello.x - radio, destello.y - radio, radio * 2, radio * 2);
      }

      // Chispas
      for (let i = chispas.length - 1; i >= 0; i--) {
        const chispa = chispas[i];
        chispa.vida -= dt;
        if (chispa.vida <= 0) {
          chispas[i] = chispas[chispas.length - 1];
          chispas.pop();
          continue;
        }
        const freno = Math.exp(-chispa.freno * dt);
        chispa.vx *= freno;
        chispa.vy = chispa.vy * freno + GRAVEDAD * chispa.peso * dt;
        chispa.px = chispa.x;
        chispa.py = chispa.y;
        chispa.x += chispa.vx * dt;
        chispa.y += chispa.vy * dt;
        const f = chispa.vida / chispa.vidaMax;
        let alfa = Math.min(1, f * 1.8);
        if (chispa.chisporrotea && f < 0.35) alfa *= Math.random() < 0.5 ? 0.25 : 1.4;
        ctx.globalAlpha = Math.min(1, alfa);
        ctx.strokeStyle = f > 0.8 ? "#fffdf2" : chispa.color;
        ctx.lineWidth = chispa.grosor * (0.5 + f * 0.6);
        ctx.beginPath();
        ctx.moveTo(chispa.px, chispa.py);
        ctx.lineTo(chispa.x, chispa.y);
        ctx.stroke();
        if (!movil && f > 0.25) {
          const lado = chispa.grosor * 5.5;
          ctx.globalAlpha = alfa * 0.4;
          ctx.drawImage(resplandores[Math.max(0, chispa.paleta)], chispa.x - lado / 2, chispa.y - lado / 2, lado, lado);
        }
      }

      if (lanzados >= guion.length && !cohetes.length && !chispas.length && !destellos.length) return terminar();
      raf = requestAnimationFrame(cuadro);
    };

    // Pausa con la pestaña oculta
    const alCambiarVisibilidad = () => {
      cancelAnimationFrame(raf);
      anterior = 0;
      if (!document.hidden && !acabado) raf = requestAnimationFrame(cuadro);
    };
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    raf = requestAnimationFrame(cuadro);
    return () => {
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      cancelAnimationFrame(raf);
      acabado = true;
      lienzo.width = lienzo.height = 0;
    };
  }, [nivel]);

  return <canvas ref={refLienzo} className="fa-lienzo" aria-hidden="true" />;
}
