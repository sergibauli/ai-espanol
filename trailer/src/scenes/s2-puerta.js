// s2-puerta · REVELACIÓN DEL TÍTULO (6 s). Todo es función pura de t.
// Capas (de fondo a frente): clip «puertav» con travelling → rayos volumétricos → partículas lejanas → linternas →
// bloque de título (DOM con perspectiva 3D: aura, logotipo de oro, caligrafía, sello, cinta) → nubes 祥云, partículas
// cercanas, chispas, anillos de impacto y luz final.
const W = 1080, H = 1920, DUR = 6;
const CX = 520;                       // eje del bloque de texto (centrado en la zona segura 110…930)
const FOCO = { x: 540, y: 840 };      // hueco de la puerta: punto de fuga del travelling
const T_LOGO = 1.5, T_SELLO = 3.5, T_SALTO = 5.5;
const TXT = { ai: "AI", es: "Español", zh: "跨进西班牙语之门", l1: "为中国学生打造", l2: "DELE A1–B2", sello: "西" };

const fract = (x) => x - Math.floor(x);
/** anillo de choque suave (corona con degradado radial), aditivo */
function anillo(g, x, y, r, ky, grosor, alfa, rgb) {
  if (alfa <= 0.004) return; const r0 = Math.max(0, r - grosor), r1 = r + grosor * 0.35; const gr = g.createRadialGradient(0, 0, r0, 0, 0, r1);
  gr.addColorStop(0, `rgba(${rgb},0)`); gr.addColorStop(0.72, `rgba(${rgb},${0.55 * alfa})`); gr.addColorStop(0.86, `rgba(255,252,238,${alfa})`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.save(); g.translate(x, y); g.scale(1, ky); g.globalAlpha = 1; g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r1, 0, 6.283); g.fill(); g.restore();
}
const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return [c, c.getContext("2d")]; };
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, k) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(",")})`; };

/** Texto de oro macizo: sombra, extrusión, canto, cara metálica y bisel interior. items = [{text, font, x, y, size}] */
function oro3D(w, h, items, { depth = 16, rim = 6 } = {}) {
  const [c, g] = mk(w, h); g.textAlign = "center"; g.textBaseline = "alphabetic"; g.lineJoin = "round";
  const each = (ctx, fn) => items.forEach((it) => { ctx.font = it.font; fn(it); });
  // sombra de contacto + contorno oscuro (separa del fondo luminoso)
  g.save(); g.shadowColor = "rgba(30,2,4,0.9)"; g.shadowBlur = 34; g.shadowOffsetY = 16; g.strokeStyle = "#2a0406"; g.lineWidth = rim + 14;
  each(g, (it) => g.strokeText(it.text, it.x + depth * 0.3, it.y + depth)); g.restore();
  // extrusión
  for (let i = depth; i >= 1; i--) {
    const k = 1 - i / depth; const col = mix("#3a0808", "#b8780f", k * k);
    g.fillStyle = col; g.strokeStyle = col; g.lineWidth = rim;
    each(g, (it) => { g.strokeText(it.text, it.x + i * 0.3, it.y + i); g.fillText(it.text, it.x + i * 0.3, it.y + i); });
  }
  // canto biselado
  each(g, (it) => { const gr = g.createLinearGradient(0, it.y - it.size * 0.8, 0, it.y + 6); gr.addColorStop(0, "#fffdf0"); gr.addColorStop(0.45, "#ffe9a8"); gr.addColorStop(1, "#8a5408"); g.strokeStyle = gr; g.lineWidth = rim; g.strokeText(it.text, it.x, it.y); });
  // cara metálica (horizonte reflejado)
  each(g, (it) => {
    const gr = g.createLinearGradient(0, it.y - it.size * 0.74, 0, it.y);
    [[0, "#fff8dc"], [0.2, "#ffe9a8"], [0.42, "#f2c14e"], [0.52, "#a86a0c"], [0.56, "#ffe08a"], [0.78, "#e2a52c"], [1, "#8f5a0a"]].forEach(([p, col]) => gr.addColorStop(p, col));
    g.fillStyle = gr; g.fillText(it.text, it.x, it.y);
  });
  // bisel interior: luz arriba-izquierda, sombra abajo-derecha
  const [m, mg] = mk(w, h); mg.textAlign = "center"; mg.fillStyle = "#fff"; each(mg, (it) => mg.fillText(it.text, it.x, it.y));
  const edge = (dx, dy, col, a) => { const [e, eg] = mk(w, h); eg.drawImage(m, 0, 0); eg.globalCompositeOperation = "destination-out"; eg.drawImage(m, dx, dy); eg.globalCompositeOperation = "source-in"; eg.fillStyle = col; eg.fillRect(0, 0, w, h); g.globalAlpha = a; g.drawImage(e, 0, 0); g.globalAlpha = 1; };
  edge(2.5, 4, "#fffef2", 0.95); edge(-2, -3.5, "#5e3404", 0.6);
  return c;
}

/** nube auspiciosa 祥云 vectorial con volumen (640×340) */
function nube() {
  const [c, g] = mk(640, 340); const lobes = [[150, 215, 62], [235, 165, 88], [352, 140, 104], [468, 178, 78], [540, 222, 50]];
  const body = () => { g.beginPath(); lobes.forEach(([x, y, r]) => { g.moveTo(x + r, y); g.arc(x, y, r, 0, Math.PI * 2); }); g.roundRect(95, 205, 495, 66, 33); g.moveTo(130, 232); g.bezierCurveTo(70, 236, 40, 262, 8, 250); g.bezierCurveTo(48, 290, 110, 282, 170, 268); g.closePath(); };
  g.lineJoin = "round"; g.save(); g.shadowColor = "rgba(70,20,0,0.5)"; g.shadowBlur = 26; g.shadowOffsetY = 14; g.strokeStyle = "#8a4f0c"; g.lineWidth = 11; body(); g.stroke(); g.restore();
  g.strokeStyle = "#ffe9a8"; g.lineWidth = 4; body(); g.stroke();
  const gr = g.createLinearGradient(0, 40, 0, 280); gr.addColorStop(0, "#fff8e0"); gr.addColorStop(0.45, "#ffe3a0"); gr.addColorStop(0.8, "#e9a93c"); gr.addColorStop(1, "#b9741a");
  g.fillStyle = gr; body(); g.fill();
  g.save(); body(); g.clip();
  // volumen: luz por lóbulo arriba-izquierda y penumbra abajo
  for (const [x, y, r] of lobes) { const h = g.createRadialGradient(x - r * 0.3, y - r * 0.45, 2, x, y, r * 1.05); h.addColorStop(0, "rgba(255,255,255,0.95)"); h.addColorStop(0.45, "rgba(255,246,214,0.35)"); h.addColorStop(0.85, "rgba(214,140,40,0)"); h.addColorStop(1, "rgba(150,80,10,0.4)"); g.fillStyle = h; g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill(); }
  const sh = g.createLinearGradient(0, 200, 0, 285); sh.addColorStop(0, "rgba(160,84,10,0)"); sh.addColorStop(1, "rgba(140,60,10,0.6)"); g.fillStyle = sh; g.fillRect(0, 200, 640, 100);
  g.restore();
  // volutas (trazo oscuro + reflejo)
  g.lineCap = "round";
  const voluta = (x, y, r, dir) => { const tr = (ox, oy) => { g.beginPath(); for (let i = 0; i <= 70; i++) { const a = (i / 70) * Math.PI * 3.3 * dir + Math.PI * 0.9, rr = r * (1 - (i / 70) * 0.85); const px = x + ox + Math.cos(a) * rr, py = y + oy + Math.sin(a) * rr; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); }; g.strokeStyle = "rgba(255,250,225,0.9)"; g.lineWidth = 5; tr(1.5, 3); g.strokeStyle = "#a5650f"; g.lineWidth = 5; tr(0, 0); };
  voluta(240, 180, 54, 1); voluta(360, 162, 68, -1); voluta(468, 192, 44, 1);
  return c;
}

/** linterna roja vectorial (260×620), anclada arriba en el centro */
function linterna() {
  const [c, g] = mk(260, 620); const x = 130;
  g.strokeStyle = "#7a4c0c"; g.lineWidth = 5; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 150); g.stroke();
  const oro = g.createLinearGradient(x - 50, 0, x + 50, 0); oro.addColorStop(0, "#8a5408"); oro.addColorStop(0.35, "#ffe9a8"); oro.addColorStop(0.6, "#f2c14e"); oro.addColorStop(1, "#7a4c0c");
  // cuerpo
  const cy = 270, rx = 112, ry = 122; g.save(); g.shadowColor = "rgba(255,120,40,0.9)"; g.shadowBlur = 40;
  const rg = g.createRadialGradient(x - 14, cy - 10, 8, x, cy, rx * 1.05); rg.addColorStop(0, "#ffd27a"); rg.addColorStop(0.28, "#ff6a3a"); rg.addColorStop(0.62, "#d4142f"); rg.addColorStop(1, "#6e0717");
  g.fillStyle = rg; g.beginPath(); g.ellipse(x, cy, rx, ry, 0, 0, Math.PI * 2); g.fill(); g.restore();
  g.strokeStyle = "rgba(255,222,140,0.75)"; g.lineWidth = 3; [1, 0.74, 0.44, 0.14].forEach((k) => { g.beginPath(); g.ellipse(x, cy, rx * k, ry, 0, 0, Math.PI * 2); g.stroke(); });
  g.fillStyle = oro; g.strokeStyle = "#5e3404"; g.lineWidth = 2;
  [[150, 96, 26], [cy + ry - 12, 96, 26]].forEach(([y, w, h]) => { g.beginPath(); g.roundRect(x - w / 2, y - h / 2 - 6, w, h, 7); g.fill(); g.stroke(); });
  // borla
  g.fillStyle = oro; g.beginPath(); g.arc(x, cy + ry + 22, 13, 0, Math.PI * 2); g.fill(); g.stroke();
  for (let i = -6; i <= 6; i++) { g.strokeStyle = i % 2 ? "#c8102e" : "#e8253f"; g.lineWidth = 4; g.beginPath(); g.moveTo(x + i * 2.2, cy + ry + 34); g.quadraticCurveTo(x + i * 3.4, cy + ry + 110, x + i * 4.2, 600 - Math.abs(i) * 5); g.stroke(); }
  g.fillStyle = oro; g.fillRect(x - 17, cy + ry + 34, 34, 10);
  return c;
}

/** sello rojo con el carácter en reserva */
function sello(kit, font) {
  const S = 204, [c, g] = mk(S, S); const r = kit.rng(77);
  g.save(); g.shadowColor = "rgba(40,0,6,0.7)"; g.shadowBlur = 16; g.shadowOffsetY = 6;
  const gr = g.createLinearGradient(0, 0, S, S); gr.addColorStop(0, "#e2183a"); gr.addColorStop(0.55, "#c8102e"); gr.addColorStop(1, "#8f0c21");
  g.fillStyle = gr; g.beginPath(); g.roundRect(18, 18, S - 36, S - 36, 22); g.fill(); g.restore();
  g.strokeStyle = "#fff1d0"; g.lineWidth = 6; g.beginPath(); g.roundRect(34, 34, S - 68, S - 68, 12); g.stroke();
  g.fillStyle = "#fff6d8"; g.font = font; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(TXT.sello, S / 2, S / 2 + 6);
  // desgaste de la tinta
  g.globalCompositeOperation = "destination-out";
  for (let i = 0; i < 150; i++) { const e = r() < 0.6; const a = r() * Math.PI * 2, d = e ? 72 + r() * 24 : r() * 74; g.globalAlpha = 0.35 + r() * 0.5; g.beginPath(); g.arc(S / 2 + Math.cos(a) * d * (e ? 1.15 : 1), S / 2 + Math.sin(a) * d * (e ? 1.15 : 1), 0.8 + r() * (e ? 3.2 : 1.6), 0, Math.PI * 2); g.fill(); }
  return c;
}

export default {
  async setup(root, kit) {
    const { FONT, PAL, el } = kit; const R = kit.rng(20262);
    root.style.background = "#f6e2a6";
    this.seq = kit.sequence("puertav");
    [this.cv, this.g] = kit.canvas2d(root);
    [this.rc, this.rg] = mk(540, 960);                       // rayos a media resolución (suaves)
    this.glow = (() => { const [c, g] = mk(128, 128); const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, "rgba(255,246,216,1)"); r.addColorStop(0.18, "rgba(255,222,140,0.8)"); r.addColorStop(0.5, "rgba(255,180,70,0.22)"); r.addColorStop(1, "rgba(255,160,40,0)"); g.fillStyle = r; g.fillRect(0, 0, 128, 128); return c; })();
    this.glowRojo = (() => { const [c, g] = mk(128, 128); const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, "rgba(255,170,90,0.9)"); r.addColorStop(0.4, "rgba(255,80,30,0.35)"); r.addColorStop(1, "rgba(255,40,0,0)"); g.fillStyle = r; g.fillRect(0, 0, 128, 128); return c; })();

    // --- fuentes ---
    const fLogo = (px) => `900 ${px}px ${FONT.latinDisplay}`, fZh = (px) => `${px}px ${FONT.zhBrush}`, fL1 = (px) => `900 ${px}px ${FONT.zhSerif}`, fL2 = (px) => `900 ${px}px ${FONT.latinMod}`;
    await Promise.all([kit.fontReady(fLogo(100), TXT.ai + TXT.es), kit.fontReady(fZh(100), TXT.zh), kit.fontReady(fL1(50), TXT.l1 + "·" + TXT.sello), kit.fontReady(fL2(40), TXT.l2)]);
    const [, mg] = mk(8, 8); const anchoDe = (font, s) => { mg.font = font; return mg.measureText(s).width; };

    // --- rayos ---
    this.rays = Array.from({ length: 54 }, (_, i) => ({ a: (i / 54) * Math.PI * 2 + R() * 0.1, w: 0.012 + R() * R() * 0.07, len: 0.55 + R() * 0.45, sp: (R() - 0.5) * 0.09, ph: R() * 6.28, fq: 0.7 + R() * 1.6, k: 0.35 + R() * 0.65 }));
    // --- partículas doradas en profundidad ---
    this.parts = Array.from({ length: 230 }, () => { let x = (R() * 2 - 1) * 2.4, y = (R() * 2 - 1) * 3.8; const d = Math.hypot(x, y); if (d < 0.5) { x *= 0.5 / (d + 0.01) * 1.4; y *= 0.5 / (d + 0.01) * 1.4; } return { x, y, z: R(), s: 0.5 + R() * R() * 1.6, ph: R() * 6.28, fq: 1 + R() * 3 }; });
    // --- chispas de impacto ---
    this.sparks = Array.from({ length: 90 }, () => { const a = R() * Math.PI * 2; return { c: Math.cos(a), s: Math.sin(a) * 0.62, v: 500 + R() * 1500, life: 0.45 + R() * 0.6, w: 2 + R() * 4 }; });
    this.tinta = Array.from({ length: 46 }, () => { const a = R() * Math.PI * 2; return { c: Math.cos(a), s: Math.sin(a), v: 160 + R() * 640, life: 0.35 + R() * 0.5, w: 3 + R() * 7, oro: R() < 0.35 }; });

    // --- linternas y nubes (sprites nítidos) ---
    this.sprLint = linterna(); this.sprNube = nube();
    this.lints = [{ x: 118, y: -70, s: 0.95, ph: 0.3, d: 1.9 }, { x: 975, y: -150, s: 0.74, ph: 2.1, d: 1.5 }];
    // nubes: posición relativa al foco, profundidad (parallax), escala, espejo
    this.nubes = [
      { x: -500, y: 800, d: 2.6, s: 1.15, f: 1, ph: 0.4 }, { x: 470, y: 900, d: 3.0, s: 1.35, f: -1, ph: 1.7 },
      { x: -590, y: 380, d: 1.7, s: 0.62, f: 1, ph: 3.1 }, { x: 600, y: 500, d: 1.9, s: 0.7, f: -1, ph: 4.4 },
      { x: 520, y: -690, d: 1.4, s: 0.6, f: -1, ph: 2.6 },
    ];

    // --- bloque de título (DOM con perspectiva) ---
    this.persp = el("div", { position: "absolute", left: 0, top: 0, width: W + "px", height: H + "px", perspective: "1500px", perspectiveOrigin: `${CX}px 520px` }, root);
    this.bloque = el("div", { position: "absolute", left: 0, top: 0, width: W + "px", height: H + "px", transformStyle: "preserve-3d", transformOrigin: `${CX}px 520px` }, this.persp);
    const put = (c, x, y, origin = "50% 50%") => { Object.assign(c.style, { position: "absolute", left: x - c.width / 2 + "px", top: y - c.height / 2 + "px", transformOrigin: origin, willChange: "transform" }); this.bloque.appendChild(c); return c; };

    // aura de laca oscura detrás del logotipo (da contraste y tapa el rótulo del clip)
    const [au, ag] = mk(1100, 600); { ag.translate(550, 300); ag.scale(0.92, 0.5); const r = ag.createRadialGradient(0, 0, 0, 0, 0, 600); r.addColorStop(0, "rgba(58,4,12,0.93)"); r.addColorStop(0.45, "rgba(74,6,18,0.86)"); r.addColorStop(0.72, "rgba(110,8,24,0.45)"); r.addColorStop(1, "rgba(143,12,33,0)"); ag.fillStyle = r; ag.fillRect(-600, -620, 1200, 1240); }
    this.aura = put(au, CX, 455);

    // logotipo en dos líneas, ajustado al ancho seguro
    const esPx = Math.floor(100 * 800 / anchoDe(fLogo(100), TXT.es)), aiPx = Math.round(esPx * 1.5);
    const LW = 960, LH = 470, yAI = 40 + aiPx * 0.76, yES = yAI + 34 + esPx * 0.78;
    this.logoBase = oro3D(LW, LH, [{ text: TXT.ai, font: fLogo(aiPx), x: LW / 2, y: yAI, size: aiPx }, { text: TXT.es, font: fLogo(esPx), x: LW / 2, y: yES, size: esPx }], { depth: 18, rim: 7 });
    const [lc, lg] = mk(LW, LH); this.logo = put(lc, CX, 452); this.lg = lg; this.LW = LW; this.LH = LH;

    // caligrafía: un lienzo por carácter
    const zh = [...TXT.zh], zhPx = 108, paso = 101, x0 = CX - (paso * (zh.length - 1)) / 2;
    this.zh = zh.map((ch, i) => {
      const [c, g] = mk(170, 170); g.font = fZh(zhPx); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
      g.save(); g.shadowColor = "rgba(30,0,6,0.85)"; g.shadowBlur = 18; g.shadowOffsetY = 8; g.strokeStyle = "#3a0508"; g.lineWidth = 15; g.strokeText(ch, 85, 88); g.restore();
      g.strokeStyle = "#8f0c21"; g.lineWidth = 7; g.strokeText(ch, 85, 88);
      const gr = g.createLinearGradient(0, 30, 0, 145); gr.addColorStop(0, "#fffef4"); gr.addColorStop(0.5, "#ffefb8"); gr.addColorStop(1, "#f2c14e"); g.fillStyle = gr; g.fillText(ch, 85, 88);
      return { c: put(c, x0 + i * paso, 694), rot: (R() - 0.5) * 10 };
    });

    // cinta de laca con la línea de apoyo
    const CW = 790, CH = 112; const [cc, cg] = mk(CW, CH);
    {
      const forma = () => { cg.beginPath(); cg.moveTo(0, 8); cg.lineTo(CW - 6, 8); cg.lineTo(CW - 40, CH / 2); cg.lineTo(CW - 6, CH - 8); cg.lineTo(0, CH - 8); cg.closePath(); };
      cg.save(); cg.shadowColor = "rgba(30,0,6,0.6)"; cg.shadowBlur = 8; cg.shadowOffsetY = 4; const gr = cg.createLinearGradient(0, 8, 0, CH - 8); gr.addColorStop(0, "#d91a38"); gr.addColorStop(0.5, "#b10d27"); gr.addColorStop(1, "#7c0a1c"); cg.fillStyle = gr; forma(); cg.fill(); cg.restore();
      cg.save(); forma(); cg.clip(); const or = cg.createLinearGradient(0, 0, CW, 0); or.addColorStop(0, "#c8961e"); or.addColorStop(0.5, "#ffe9a8"); or.addColorStop(1, "#c8961e"); cg.fillStyle = or; cg.fillRect(0, 8, CW, 5); cg.fillRect(0, CH - 13, CW, 5); cg.fillStyle = "rgba(255,233,168,0.55)"; cg.fillRect(0, 19, CW, 2); cg.fillRect(0, CH - 21, CW, 2); cg.restore();
      let p1 = 56, p2 = 43; const sep = " · "; const ancho = () => anchoDe(fL1(p1), TXT.l1 + sep) + anchoDe(fL2(p2), TXT.l2); const k = Math.min(1, 630 / ancho()); p1 = Math.floor(p1 * k); p2 = Math.floor(p2 * k);
      const w1 = anchoDe(fL1(p1), TXT.l1 + sep), tot = ancho(); const xi = 100 + (CW - 100 - 46 - tot) / 2; cg.textBaseline = "middle"; cg.textAlign = "left";
      const tg = cg.createLinearGradient(0, 26, 0, CH - 26); tg.addColorStop(0, "#fffdf0"); tg.addColorStop(1, "#ffd978");
      cg.shadowColor = "rgba(40,0,6,0.8)"; cg.shadowBlur = 4; cg.shadowOffsetY = 3; cg.fillStyle = tg;
      cg.font = fL1(p1); cg.fillText(TXT.l1 + sep, xi, CH / 2 + 2); cg.font = fL2(p2); cg.fillText(TXT.l2, xi + w1, CH / 2 + 3);
    }
    this.CINTA = { x: 142, y: 866, w: CW, h: CH };
    this.cinta = put(cc, this.CINTA.x + CW / 2, this.CINTA.y, "0% 50%");
    this.SELLO = { x: 176, y: 860 };
    this.sello = put(sello(kit, `900 118px ${FONT.zhSerif}`), this.SELLO.x, this.SELLO.y);

    // lienzo frontal (nubes, partículas cercanas, chispas, luz)
    [this.cv2, this.g2] = kit.canvas2d(root);
  },

  async update(t, kit) {
    const { clamp, lerp, prog, ease, noise1, spring } = kit; const g = this.g, g2 = this.g2;
    const beat = Math.exp(-fract(t * 2) * 7);                                   // pulso a 120 BPM
    const kS = prog(t, T_SALTO, DUR), salto = Math.pow(kS, 2);                // embestida final
    const llegada = Math.exp(-t * 6);                                           // llegada desde la hipervelocidad
    const dL = t - T_LOGO, dS = t - T_SELLO;
    const golpe = (d, amp) => (d >= 0 ? amp * Math.exp(-d * 8) : 0);
    const amp = golpe(dL, 30) + golpe(dS, 20) + salto * 14;
    const shx = noise1(t * 43, 3) * amp, shy = noise1(t * 47, 9) * amp;
    // empuje de cámara (1 = reposo): entra frenando, avanza sin parar, se lanza al final
    const push = 1 - 0.3 * llegada + 0.045 * t + 3.2 * salto;
    const Sbg = 1.075 + (push - 0.7) * 0.2 + salto * 1.4;

    // ---------- fondo: clip repartido en los 6 s (≈0,9×) con mezcla entre fotogramas ----------
    const fi = (t / DUR) * (this.seq.n - 1), i0 = Math.floor(fi), fr = fi - i0;
    const [a, b] = await Promise.all([this.seq.get(i0), this.seq.get(i0 + 1)]);
    const fx = FOCO.x + noise1(t * 0.5, 21) * 10, fy = FOCO.y + noise1(t * 0.4, 5) * 12;
    const bw = W * Sbg, bh = H * Sbg, bx = fx - fx * Sbg + shx, by = fy - fy * Sbg + shy;
    g.globalCompositeOperation = "source-over"; g.globalAlpha = 1; g.imageSmoothingQuality = "high";
    g.drawImage(a, bx, by, bw, bh); if (fr > 0.02) { g.globalAlpha = fr; g.drawImage(b, bx, by, bw, bh); g.globalAlpha = 1; }
    // placa de laca propia sobre el rótulo del clip (sus caracteres no son texto nuestro): aparece con el rayo que la enciende
    { const kp = prog(fi, 84, 89); if (kp > 0) { const u = 2 * Sbg, pcx = bx + lerp(287, 307, prog(fi, 100, 159)) * u, pcy = by + 212 * u, pw = 226 * u, ph = 76 * u;
      g.save(); g.globalAlpha = kp; g.shadowColor = "rgba(255,214,120,0.9)"; g.shadowBlur = 30 * Sbg; const lg = g.createLinearGradient(0, pcy - ph / 2, 0, pcy + ph / 2); lg.addColorStop(0, "#6a0a1a"); lg.addColorStop(1, "#3d050e"); g.fillStyle = lg; g.beginPath(); g.roundRect(pcx - pw / 2, pcy - ph / 2, pw, ph, 8 * Sbg); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = "#e9c46a"; g.lineWidth = 4 * Sbg; g.stroke(); g.strokeStyle = "rgba(242,193,78,0.55)"; g.lineWidth = 1.5 * Sbg; g.beginPath(); g.roundRect(pcx - pw / 2 + 12 * Sbg, pcy - ph / 2 + 12 * Sbg, pw - 24 * Sbg, ph - 24 * Sbg, 4 * Sbg); g.stroke();
      const f = 1 - prog(fi, 86, 100); if (f > 0) { g.globalCompositeOperation = "lighter"; g.globalAlpha = f * kp; g.drawImage(this.glow, pcx - pw, pcy - ph * 2, pw * 2, ph * 4); } g.restore(); } }
    // gradación: oscurece bordes superiores/inferiores para dar contraste a las capas
    { const v = g.createLinearGradient(0, 0, 0, H); v.addColorStop(0, "rgba(60,6,14,0.34)"); v.addColorStop(0.22, "rgba(60,6,14,0.12)"); v.addColorStop(0.7, "rgba(60,6,14,0)"); v.addColorStop(1, "rgba(40,4,20,0.38)"); g.fillStyle = v; g.fillRect(0, 0, W, H); }

    // ---------- rayos volumétricos ----------
    const rayI = 0.34 + 0.5 * llegada + (dL >= 0 ? 0.5 * Math.exp(-dL * 2.2) + 0.2 : 0) + (dS >= 0 ? 0.28 * Math.exp(-dS * 3) : 0) + 0.07 * beat + 0.12 * prog(t, 3, 5.5) + 1.3 * salto;
    const sx = 540 + shx * 0.5, sy = lerp(600, 470, ease.outCubic(prog(t, 0.2, 1.5))) + shy * 0.5;
    const rg = this.rg; rg.globalCompositeOperation = "source-over"; rg.clearRect(0, 0, 540, 960); rg.globalCompositeOperation = "lighter";
    const grad = rg.createRadialGradient(sx / 2, sy / 2, 20, sx / 2, sy / 2, 900); grad.addColorStop(0, "rgba(255,244,205,0.9)"); grad.addColorStop(0.25, "rgba(255,220,130,0.5)"); grad.addColorStop(0.7, "rgba(255,190,90,0.12)"); grad.addColorStop(1, "rgba(255,180,80,0)"); rg.fillStyle = grad;
    for (const r of this.rays) {
      const ang = r.a + r.sp * t + 0.05 * Math.sin(t * 0.6 + r.ph); const abajo = 0.45 + 0.55 * Math.max(0, Math.sin(ang));   // más fuertes hacia abajo, como en la puerta
      const al = rayI * r.k * abajo * (0.6 + 0.4 * Math.sin(t * r.fq + r.ph)); if (al <= 0.01) continue;
      const L = 1000 * r.len * (1 + salto); rg.globalAlpha = Math.min(1, al * 0.5);
      rg.beginPath(); rg.moveTo(sx / 2, sy / 2); rg.lineTo(sx / 2 + Math.cos(ang - r.w) * L, sy / 2 + Math.sin(ang - r.w) * L); rg.lineTo(sx / 2 + Math.cos(ang + r.w) * L, sy / 2 + Math.sin(ang + r.w) * L); rg.closePath(); rg.fill();
    }
    rg.globalAlpha = 1;
    g.globalCompositeOperation = "lighter"; g.drawImage(this.rc, 0, 0, W, H);
    // filos nítidos a resolución completa
    g.lineCap = "round";
    for (let i = 0; i < this.rays.length; i += 2) { const r = this.rays[i]; const ang = r.a + r.sp * t + 0.05 * Math.sin(t * 0.6 + r.ph); const al = rayI * r.k * (0.5 + 0.5 * Math.sin(t * r.fq * 1.3 + r.ph * 2)); if (al < 0.05) continue; const L0 = 230 + 120 * r.len, L1 = (700 + 900 * r.len) * (1 + salto); const lg = g.createLinearGradient(sx + Math.cos(ang) * L0, sy + Math.sin(ang) * L0, sx + Math.cos(ang) * L1, sy + Math.sin(ang) * L1); lg.addColorStop(0, "rgba(255,246,216,0)"); lg.addColorStop(0.25, `rgba(255,240,190,${Math.min(0.75, al * 0.55)})`); lg.addColorStop(1, "rgba(255,220,140,0)"); g.strokeStyle = lg; g.lineWidth = 1.5 + r.k * 2.5; g.beginPath(); g.moveTo(sx + Math.cos(ang) * L0, sy + Math.sin(ang) * L0); g.lineTo(sx + Math.cos(ang) * L1, sy + Math.sin(ang) * L1); g.stroke(); }

    // ---------- partículas (lejanas detrás del título, cercanas delante) ----------
    const Dz = 0.045 * t + 0.3 * (1 - Math.exp(-t / 0.22)) + 0.55 * Math.pow(prog(t, T_SALTO - 0.1, DUR), 3);
    const vz = 0.045 + (0.3 / 0.22) * Math.exp(-t / 0.22) + (t > T_SALTO - 0.1 ? 0.55 * 3 * Math.pow(prog(t, T_SALTO - 0.1, DUR), 2) / 0.6 : 0);
    const F = 560, VPx = 540 + shx, VPy = 760 + shy;
    g2.globalCompositeOperation = "source-over"; g2.globalAlpha = 1; g2.clearRect(0, 0, W, H);
    const pintaParticulas = (ctx, frente) => {
      ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      for (const p of this.parts) {
        const z = 0.3 + fract(p.z - Dz) * 7.7; if ((z < 2.4) !== frente) continue;
        const x = VPx + (p.x + 0.08 * Math.sin(t * 0.7 + p.ph)) * F / z, y = VPy + (p.y + 0.1 * Math.cos(t * 0.5 + p.ph)) * F / z;
        if (x < -120 || x > W + 120 || y < -120 || y > H + 120) continue;
        const al = clamp((z - 0.3) / 0.6) * clamp((8 - z) / 2) * (0.55 + 0.45 * Math.sin(t * p.fq + p.ph)) * (z < 1.2 ? 0.55 : 1);
        const sz = p.s * F / z * 0.016, z2 = z + vz * 7.7 * 0.03; const x2 = VPx + p.x * F / z2, y2 = VPy + p.y * F / z2; const dl = Math.hypot(x - x2, y - y2);
        if (dl > sz * 1.5) { ctx.globalAlpha = al * 0.7; ctx.strokeStyle = "#ffe6a0"; ctx.lineWidth = Math.max(1.2, sz * 0.9); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x, y); ctx.stroke(); }
        ctx.globalAlpha = al; const d = Math.max(5, sz * 7); ctx.drawImage(this.glow, x - d / 2, y - d / 2, d, d);
        if (sz > 2.2) { ctx.globalAlpha = al * 0.9; ctx.fillStyle = "#fffbe8"; ctx.beginPath(); ctx.arc(x, y, Math.min(sz * 0.5, 5), 0, 6.283); ctx.fill(); }
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
    };
    pintaParticulas(g, false);

    // ---------- linternas (primer plano superior, se mecen y acusan los golpes) ----------
    g.globalCompositeOperation = "source-over";
    for (const l of this.lints) {
      const k = Math.max(0.9, 1 + (push - 1) * l.d); const ax = 540 + (l.x - 540) * k + shx * 1.3, ay = l.y - (k - 1) * 520 + shy * 1.3;
      const kick = (dL >= 0 ? 0.16 * Math.exp(-dL * 1.6) * Math.sin(dL * 9) : 0) + (dS >= 0 ? 0.1 * Math.exp(-dS * 1.8) * Math.sin(dS * 9) : 0);
      const rot = 0.06 * Math.sin(t * 1.5 + l.ph) + kick * (l.x < 540 ? 1 : -1) + 0.28 * llegada * (l.x < 540 ? 1 : -1); const s = l.s * k;
      g.save(); g.translate(ax, ay); g.rotate(rot); g.scale(s, s); g.drawImage(this.sprLint, -130, 0);
      g.globalCompositeOperation = "lighter"; g.globalAlpha = 0.55 + 0.15 * beat; g.drawImage(this.glowRojo, -330, -60, 660, 660); g.restore();
    }

    // ---------- bloque de título ----------
    const visL = dL >= -0.2;
    const kIn = prog(t, T_LOGO - 0.2, T_LOGO);                                    // caída
    const sLogo = dL < 0 ? lerp(4.2, 1, ease.inCubic(kIn)) : 1 + 0.13 * Math.exp(-dL * 7) * Math.cos(dL * 17) + 0.012 * beat * (dL > 0.4 ? 1 : 0);
    const rotY = Math.sin(t * 0.9 + 0.4) * 5.5 + (dL < 0 ? -22 * (1 - kIn) : -9 * Math.exp(-dL * 4) * Math.cos(dL * 10));
    const rotX = Math.cos(t * 0.7) * 3 + (dL >= 0 ? 7 * Math.exp(-dL * 5) * Math.cos(dL * 13) : 10 * (1 - kIn));
    const sB = 1 + 0.02 * prog(t, T_LOGO, T_SALTO) + 0.75 * salto;
    this.bloque.style.transform = `translate3d(${-shx * 0.5}px,${-shy * 0.5 - 90 * salto}px,0) rotateX(${rotX.toFixed(3)}deg) rotateY(${rotY.toFixed(3)}deg) scale(${sB.toFixed(4)})`;
    // aura
    const kA = ease.outExpo(prog(t, T_LOGO - 0.05, T_LOGO + 0.35));
    this.aura.style.opacity = visL ? (kA * (1 - 0.35 * salto)).toFixed(3) : "0";
    this.aura.style.transform = `translateZ(-60px) scale(${(0.3 + 0.7 * kA).toFixed(3)},${(0.3 + 0.7 * kA + 0.25 * ease.outCubic(prog(t, T_SELLO - 0.1, T_SELLO + 0.3))).toFixed(3)})`;
    // logotipo + brillo que lo barre
    this.logo.style.opacity = visL ? ease.outQuad(prog(t, T_LOGO - 0.2, T_LOGO - 0.06)).toFixed(3) : "0";
    this.logo.style.transform = `translateZ(40px) scale(${sLogo.toFixed(4)})`;
    if (visL) {
      const lg = this.lg, LW = this.LW, LH = this.LH; lg.globalCompositeOperation = "source-over"; lg.clearRect(0, 0, LW, LH); lg.drawImage(this.logoBase, 0, 0);
      lg.globalCompositeOperation = "source-atop";
      const barrido = (k, fuerza) => { if (k <= 0 || k >= 1) return; const x = lerp(-320, LW + 320, k); const gr = lg.createLinearGradient(x - 170, 0, x + 170, 120); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(0.42, `rgba(255,252,235,${0.35 * fuerza})`); gr.addColorStop(0.5, `rgba(255,255,255,${fuerza})`); gr.addColorStop(0.58, `rgba(255,252,235,${0.35 * fuerza})`); gr.addColorStop(1, "rgba(255,255,255,0)"); lg.fillStyle = gr; lg.fillRect(0, 0, LW, LH); };
      barrido(ease.inOutCubic(prog(t, 2.0, 2.7)), 0.95); barrido(ease.inOutCubic(prog(t, 4.5, 5.2)), 0.85);
      const fl = (dL >= 0 ? Math.exp(-dL * 9) : kIn * 0.6) + 0.5 * salto; if (fl > 0.01) { lg.fillStyle = `rgba(255,250,225,${Math.min(0.9, fl)})`; lg.fillRect(0, 0, LW, LH); }
    }
    // caligrafía: pinceladas una a una
    this.zh.forEach((z, i) => {
      const d = t - (T_LOGO + 0.14 + i * 0.05); const s = d < 0 ? 0 : 1 + 1.5 * Math.exp(-d * 13) + 0.1 * Math.exp(-d * 6) * Math.sin(d * 22);
      const y = d < 0 ? 0 : -46 * Math.exp(-d * 10) + Math.sin(t * 1.6 + i * 0.8) * 3.5;
      z.c.style.opacity = d < 0 ? "0" : clamp(d / 0.07).toFixed(3);
      z.c.style.transform = `translate3d(0,${y.toFixed(2)}px,10px) rotate(${(z.rot * Math.exp(-Math.max(0, d) * 5) * 3).toFixed(2)}deg) scale(${s.toFixed(4)})`;
    });
    // sello: cae y estampa en 3,5 s
    const kSe = prog(t, T_SELLO - 0.2, T_SELLO);
    const sSe = dS < 0 ? lerp(3.6, 1, ease.inCubic(kSe)) : 1 - 0.12 * Math.exp(-dS * 9) * Math.cos(dS * 20);
    this.sello.style.opacity = dS < -0.2 ? "0" : ease.outQuad(prog(t, T_SELLO - 0.2, T_SELLO - 0.08)).toFixed(3);
    this.sello.style.transform = `translateZ(70px) rotate(${(dS < 0 ? lerp(-34, -9, kSe) : -9 + 5 * Math.exp(-dS * 8) * Math.sin(dS * 18)).toFixed(2)}deg) scale(${sSe.toFixed(4)})`;
    // cinta: se desenrolla desde el sello
    const kC = ease.outCubic(prog(t, T_SELLO + 0.02, T_SELLO + 0.42));
    this.cinta.style.opacity = dS < 0.02 ? "0" : "1";
    this.cinta.style.clipPath = `inset(-20px ${((1 - kC) * 100).toFixed(2)}% -20px 0)`;
    this.cinta.style.transform = `translateZ(30px) scaleY(${(dS < 0 ? 1 : 1 + 0.25 * Math.exp(-dS * 9) * Math.cos(dS * 16)).toFixed(4)})`;

    // ---------- frente: nubes 祥云 con parallax ----------
    for (const n of this.nubes) {
      const k = Math.max(0.86, 1 + (push - 1) * n.d); const s = n.s * (0.9 + 0.1 * k) * (1 + salto * n.d * 0.3);
      const x = FOCO.x + n.x * k + Math.sin(t * 0.5 + n.ph) * 16 + shx * 1.6, y = FOCO.y + n.y * k + Math.cos(t * 0.65 + n.ph) * 10 + shy * 1.6;
      if (x < -700 || x > W + 700 || y < -500 || y > H + 500) continue;
      g2.save(); g2.translate(x, y); g2.scale(s * n.f, s); g2.drawImage(this.sprNube, -320, -170); g2.restore();
    }
    pintaParticulas(g2, true);

    // ---------- impactos ----------
    g2.globalCompositeOperation = "lighter";
    const lx = CX, ly = 465;
    if (dL >= -0.02 && dL < 1.2) {
      const d = Math.max(0, dL);
      // anillos de choque
      { const k = d / 0.7; if (k < 1) anillo(g2, lx, ly, 440 + 1400 * ease.outCubic(k), 0.6, 50 + 130 * k, (1 - k) * (1 - k), "255,238,180"); }
      // chispas
      for (const s of this.sparks) { const k = d / s.life; if (k >= 1) continue; const r = s.v * (1 - Math.exp(-3.2 * d)) / 3.2, r0 = s.v * (1 - Math.exp(-3.2 * Math.max(0, d - 0.035))) / 3.2; const gy = 520 * d * d; g2.globalAlpha = (1 - k) * (1 - k); g2.strokeStyle = k < 0.25 ? "#fffbe6" : "#ffd27a"; g2.lineWidth = s.w * (1 - k * 0.6); g2.beginPath(); g2.moveTo(lx + s.c * (400 + r0), ly + s.s * (330 + r0) + 520 * Math.max(0, d - 0.035) ** 2); g2.lineTo(lx + s.c * (400 + r), ly + s.s * (330 + r) + gy); g2.stroke(); const dd = s.w * 7 * (1 - k); g2.drawImage(this.glow, lx + s.c * (400 + r) - dd / 2, ly + s.s * (330 + r) + gy - dd / 2, dd, dd); }
      // fogonazo
      const f = Math.exp(-d * 8); if (f > 0.02) { g2.globalAlpha = f * 0.85; g2.drawImage(this.glow, lx - 1300, ly - 1000, 2600, 2000); }
    }
    if (dS >= -0.02 && dS < 0.9) {
      const d = Math.max(0, dS), X = this.SELLO.x, Y = this.SELLO.y;
      const k = d / 0.5; if (k < 1) anillo(g2, X, Y, 110 + 560 * ease.outCubic(k), 1, 90 * (1 - k * 0.5), (1 - k) * (1 - k) * 0.9, "255,190,130");
      const f = Math.exp(-d * 10); if (f > 0.02) { g2.globalAlpha = f * 0.8; g2.drawImage(this.glowRojo, X - 500, Y - 500, 1000, 1000); }
      g2.globalCompositeOperation = "source-over";
      for (const s of this.tinta) { const kk = d / s.life; if (kk >= 1) continue; const r = 95 + s.v * (1 - Math.exp(-4 * d)) / 4; g2.globalAlpha = 1 - kk; g2.fillStyle = s.oro ? "#ffe9a8" : "#d4142f"; g2.beginPath(); g2.arc(X + s.c * r, Y + s.s * r + 380 * d * d, s.w * (1 - kk * 0.7), 0, 6.283); g2.fill(); }
      g2.globalCompositeOperation = "lighter";
    }
    // destello del filo de la cinta al desenrollarse
    if (dS > 0.02 && kC < 0.995) { const x = this.CINTA.x + this.CINTA.w * kC - shx * 0.5, y = this.CINTA.y - shy * 0.5; g2.globalAlpha = 0.95 * (1 - kC * 0.6); g2.drawImage(this.glow, x - 110, y - 110, 220, 220); g2.fillStyle = "#fffbe6"; g2.fillRect(x - 3, y - 60, 6, 120); }

    // ---------- luz: llegada (t=0) y embestida final hacia la puerta ----------
    g2.globalCompositeOperation = "source-over"; g2.globalAlpha = 1;
    const luz = 0.42 * Math.exp(-t * 5.5) + salto * 0.62;
    if (luz > 0.005) {
      const R0 = 260 + 2300 * (t < 1 ? 1 : ease.outQuad(kS)); const rg2 = g2.createRadialGradient(FOCO.x, FOCO.y - 120, 0, FOCO.x, FOCO.y - 120, R0);
      const a0 = Math.min(1, luz * 1.25); rg2.addColorStop(0, `rgba(255,252,238,${a0})`); rg2.addColorStop(0.4, `rgba(255,236,170,${a0 * 0.85})`); rg2.addColorStop(0.75, `rgba(255,200,100,${a0 * 0.45})`); rg2.addColorStop(1, "rgba(255,170,70,0)");
      g2.fillStyle = rg2; g2.fillRect(0, 0, W, H);
      if (salto > 0.4) { g2.fillStyle = `rgba(255,246,216,${clamp((salto - 0.4) * 0.5)})`; g2.fillRect(0, 0, W, H); }
    }
  },
};
