import * as React from "react";

/*
  v25 · Partículas del fondo de la Ruta en un solo <canvas> ligero (sin DOM por partícula):
    A1 nieve en tres profundidades (los copos cercanos, grandes y desenfocados)
    A2 polvo dorado a contraluz, ráfagas de arena y farolillos de papel (孔明灯) que suben
    B1 lluvia fina, pétalos que caen y ondas en el agua
    B2 bandadas de aves, hojas de bambú que caen
  Se para fuera de pantalla, con la pestaña oculta y con prefers-reduced-motion; en móvil va a 30 fps y con menos partículas.
*/
const R = (a, b) => a + Math.random() * (b - a);

// Sprite de disco suave (para copos cercanos, polvo y halos): se dibuja una vez y se reutiliza
function sprite(color, tam = 64, duro = 0.35) {
  const c = document.createElement("canvas");
  c.width = c.height = tam;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(tam / 2, tam / 2, 0, tam / 2, tam / 2, tam / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(duro, color);
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, tam, tam);
  return c;
}

function crearSistema(nivel, w, h, movil) {
  const k = movil ? 0.45 : 1;
  const items = [];
  if (nivel === "A1") {
    const copo = sprite("rgba(255,255,255,1)", 64, 0.45);
    const copoSuave = sprite("rgba(255,255,255,.9)", 64, 0.05);
    for (let i = 0; i < 120 * k; i++) {
      const z = Math.random(); // 0 lejos · 1 cerca
      const cerca = z > 0.9;
      items.push({ t: "copo", x: R(0, w), y: R(-h, h), z, r: cerca ? R(5, 9) : 0.8 + z * 2.6, v: 18 + z * 55, f: R(0, 6.28), a: cerca ? 0.55 : 0.5 + z * 0.45, img: cerca ? copoSuave : copo });
    }
  } else if (nivel === "A2") {
    const polvo = sprite("rgba(255,226,160,1)", 32, 0.2);
    for (let i = 0; i < 70 * k; i++) items.push({ t: "polvo", x: R(0, w), y: R(h * 0.25, h), r: R(0.8, 2.6), v: R(8, 22), f: R(0, 6.28), img: polvo });
    for (let i = 0; i < 14 * k; i++) items.push({ t: "rafaga", x: R(-w, w), y: R(h * 0.62, h), l: R(40, 120), v: R(90, 170), a: R(0.12, 0.3) });
    const halo = sprite("rgba(255,170,80,.55)", 64, 0.05);
    for (let i = 0; i < Math.max(3, 7 * k); i++) items.push({ t: "farol", x: R(w * 0.05, w * 0.95), y: R(h * 0.3, h * 1.2), s: R(0.6, 1.25), v: R(10, 22), f: R(0, 6.28), img: halo });
  } else if (nivel === "B1") {
    for (let i = 0; i < 110 * k; i++) items.push({ t: "lluvia", x: R(0, w), y: R(0, h), l: R(10, 22), v: R(380, 560), a: R(0.12, 0.3) });
    for (let i = 0; i < 10 * k; i++) items.push({ t: "petalo", x: R(0, w), y: R(-h, h), s: R(3, 5.5), v: R(22, 40), f: R(0, 6.28), g: R(0, 6.28) });
    for (let i = 0; i < 6 * k; i++) items.push({ t: "onda", x: R(0, w), y: R(h * 0.7, h), e: R(0, 1), v: R(0.25, 0.45) });
    const luz = sprite("rgba(255,200,120,.9)", 32, 0.15);
    for (let i = 0; i < 8 * k; i++) items.push({ t: "luciernaga", x: R(0, w), y: R(h * 0.55, h * 0.9), f: R(0, 6.28), img: luz });
  } else {
    for (let b = 0; b < (movil ? 1 : 2); b++) {
      const n = 5 + b * 2;
      const x0 = R(-w * 0.6, -60);
      const y0 = R(h * 0.12, h * 0.32);
      for (let i = 0; i < n; i++) items.push({ t: "ave", x: x0 - i * R(16, 26), y: y0 + Math.abs(i - n / 2) * R(6, 10), s: R(0.7, 1.1) * (1 - b * 0.25), v: R(30, 38) - b * 6, f: R(0, 6.28) });
    }
    for (let i = 0; i < 14 * k; i++) items.push({ t: "hoja", x: R(0, w), y: R(-h, h), s: R(4, 7), v: R(26, 46), f: R(0, 6.28), g: R(0, 6.28) });
  }
  return items;
}

function paso(ctx, items, w, h, dt, t) {
  ctx.clearRect(0, 0, w, h);
  for (const p of items) {
    switch (p.t) {
      case "copo": {
        p.y += p.v * dt;
        p.x += Math.sin(t * 0.8 + p.f) * (6 + p.z * 14) * dt - 6 * dt;
        if (p.y > h + 12) { p.y = -12; p.x = R(0, w); }
        if (p.x < -12) p.x = w + 10;
        const d = p.r * 2;
        ctx.globalAlpha = p.a;
        ctx.drawImage(p.img, p.x - d, p.y - d, d * 2, d * 2);
        break;
      }
      case "polvo": {
        p.x += p.v * dt;
        p.y += Math.sin(t * 0.6 + p.f) * 6 * dt - 3 * dt;
        if (p.x > w + 6) { p.x = -6; p.y = R(h * 0.25, h); }
        ctx.globalAlpha = 0.35 + 0.35 * Math.sin(t * 2 + p.f);
        const d = p.r * 3;
        ctx.drawImage(p.img, p.x - d, p.y - d, d * 2, d * 2);
        break;
      }
      case "rafaga": {
        p.x += p.v * dt;
        if (p.x > w + p.l) { p.x = -p.l - R(0, w); p.y = R(h * 0.62, h); }
        const g = ctx.createLinearGradient(p.x - p.l, 0, p.x, 0);
        g.addColorStop(0, "rgba(255,230,180,0)");
        g.addColorStop(1, "rgba(255,236,196,1)");
        ctx.globalAlpha = p.a;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x - p.l, p.y + 3);
        ctx.quadraticCurveTo(p.x - p.l / 2, p.y - 2, p.x, p.y);
        ctx.stroke();
        break;
      }
      case "farol": {
        p.y -= p.v * dt;
        p.x += Math.sin(t * 0.4 + p.f) * 8 * dt + 4 * dt;
        if (p.y < -40) { p.y = h + R(20, 200); p.x = R(w * 0.05, w * 0.95); }
        const s = p.s;
        const fade = Math.min(1, p.y / (h * 0.35));
        ctx.globalAlpha = 0.9 * Math.max(0, fade) * (0.85 + 0.15 * Math.sin(t * 3 + p.f));
        ctx.drawImage(p.img, p.x - 22 * s, p.y - 24 * s, 44 * s, 44 * s);
        const g = ctx.createLinearGradient(0, p.y - 9 * s, 0, p.y + 7 * s);
        g.addColorStop(0, "#ffe6a8");
        g.addColorStop(0.6, "#ff9a3c");
        g.addColorStop(1, "#c8402a");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(p.x - 5 * s, p.y + 7 * s);
        ctx.quadraticCurveTo(p.x - 8 * s, p.y - 8 * s, p.x, p.y - 10 * s);
        ctx.quadraticCurveTo(p.x + 8 * s, p.y - 8 * s, p.x + 5 * s, p.y + 7 * s);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case "lluvia": {
        p.y += p.v * dt;
        p.x -= p.v * 0.18 * dt;
        if (p.y > h) { p.y = -p.l; p.x = R(0, w * 1.2); }
        ctx.globalAlpha = p.a;
        ctx.strokeStyle = "#c9d6ff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * 0.18, p.y - p.l);
        ctx.stroke();
        break;
      }
      case "petalo":
      case "hoja": {
        p.y += p.v * dt;
        p.x += Math.sin(t * 0.9 + p.f) * 22 * dt + (p.t === "hoja" ? 8 : -4) * dt;
        p.g += dt * 1.6;
        if (p.y > h + 10) { p.y = -10; p.x = R(0, w); }
        ctx.globalAlpha = 0.85;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.g);
        ctx.scale(1, Math.abs(Math.sin(p.g * 1.3)) * 0.7 + 0.3);
        ctx.fillStyle = p.t === "hoja" ? "#7fae6a" : "#f6a9c2";
        ctx.beginPath();
        if (p.t === "hoja") {
          ctx.moveTo(-p.s * 1.6, 0);
          ctx.quadraticCurveTo(0, -p.s * 0.6, p.s * 1.6, 0);
          ctx.quadraticCurveTo(0, p.s * 0.6, -p.s * 1.6, 0);
        } else {
          ctx.ellipse(0, 0, p.s, p.s * 0.6, 0, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
        break;
      }
      case "onda": {
        p.e += p.v * dt;
        if (p.e > 1) { p.e = 0; p.x = R(0, w); p.y = R(h * 0.7, h); }
        ctx.globalAlpha = (1 - p.e) * 0.35;
        ctx.strokeStyle = "#ffd9a0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, 4 + p.e * 26, 1.5 + p.e * 6, 0, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case "luciernaga": {
        p.x += Math.sin(t * 0.5 + p.f) * 10 * dt;
        p.y += Math.cos(t * 0.7 + p.f) * 8 * dt;
        ctx.globalAlpha = Math.max(0, Math.sin(t * 1.4 + p.f)) * 0.9;
        ctx.drawImage(p.img, p.x - 6, p.y - 6, 12, 12);
        break;
      }
      case "ave": {
        p.x += p.v * dt;
        p.y += Math.sin(t * 0.5 + p.f) * 4 * dt;
        if (p.x > w + 40) { p.x = -R(60, w * 0.8); }
        const ala = Math.sin(t * 7 + p.f) * 5 * p.s;
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = "#2c3e3a";
        ctx.lineWidth = 1.6 * p.s;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x - 8 * p.s, p.y - ala);
        ctx.quadraticCurveTo(p.x - 3 * p.s, p.y - 2 * p.s - ala * 0.4, p.x, p.y);
        ctx.quadraticCurveTo(p.x + 3 * p.s, p.y - 2 * p.s - ala * 0.4, p.x + 8 * p.s, p.y - ala);
        ctx.stroke();
        break;
      }
      default:
    }
  }
  ctx.globalAlpha = 1;
}

export function ParticulasRuta({ nivel }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas || typeof window === "undefined") return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const movil = window.matchMedia?.("(max-width: 700px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, movil ? 1.25 : 1.5);
    let w = 0;
    let h = 0;
    let items = [];
    const medir = () => {
      const caja = canvas.getBoundingClientRect();
      w = Math.max(1, caja.width);
      h = Math.max(1, caja.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      items = crearSistema(nivel, w, h, movil);
    };
    medir();
    let visible = true;
    let raf = 0;
    let antes = performance.now();
    let acumulado = 0;
    const intervalo = movil ? 1 / 30 : 1 / 60;
    const bucle = (ahora) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.1, (ahora - antes) / 1000);
      antes = ahora;
      acumulado += dt;
      if (acumulado >= intervalo - 0.002) {
        paso(ctx, items, w, h, acumulado, ahora / 1000);
        acumulado = 0;
      }
      raf = requestAnimationFrame(bucle);
    };
    const arrancar = () => {
      if (raf || !visible || document.hidden) return;
      antes = performance.now();
      raf = requestAnimationFrame(bucle);
    };
    const ojo = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; arrancar(); }) : null;
    ojo?.observe(canvas);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => medir()) : null;
    ro?.observe(canvas);
    document.addEventListener("visibilitychange", arrancar);
    arrancar();
    return () => {
      cancelAnimationFrame(raf);
      ojo?.disconnect();
      ro?.disconnect();
      document.removeEventListener("visibilitychange", arrancar);
    };
  }, [nivel]);
  return <canvas ref={ref} className="mr-particulas-canvas" aria-hidden="true" />;
}
