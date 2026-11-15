// s1-hook · 4 s · GANCHO: gota de oro → «想学西班牙语？» → sello rojo «别再死记硬背！» → hipervelocidad hacia la luz.
// Todo es función pura de t (sin estado acumulado). Capas: Three.js (túnel) + lienzo 2D (titulares, tinta, luz).

const DUR = 4;
const VPX = 510, VPY = 860;                // punto de fuga = centro de la zona segura
const WORDS = ["¡Hola!", "Gracias", "Amigo", "Te quiero", "¡Vamos!", "Fiesta", "Sol", "España", "Ñ", "¿Qué tal?", "Corazón", "Vida", "Amor", "¡Olé!", "Sueño", "Luna", "Besos", "Feliz"];
const ZH1 = ["想学", "西班牙语？"];
const ZH2 = ["别再", "死记硬背！"];

// --- viaje por el túnel: velocidad con «patadas» en los golpes y aceleración exponencial final ---
const V0 = 15, L = 96;
const KICKS = [[0.5, 60, 5], [2.0, 70, 5], [3.0, 36, 6]];
const FT = 3.38, FA = 26, FB = 7.4;
function speed(t) { let v = V0; for (const [t0, A, a] of KICKS) if (t > t0) v += A * Math.exp(-a * (t - t0)); if (t > FT) v += FA * (Math.exp(FB * (t - FT)) - 1); return v; }
function travel(t) { let d = V0 * t; for (const [t0, A, a] of KICKS) if (t > t0) d += (A * (1 - Math.exp(-a * (t - t0)))) / a; if (t > FT) { const dt = t - FT; d += FA * ((Math.exp(FB * dt) - 1) / FB - dt); } return d; }
const mod = (x, m) => ((x % m) + m) % m;

export default {
  async setup(root, kit) {
    const { THREE, PAL, FONT, W, H } = kit;
    const R = kit.rng(20261);
    await Promise.all([
      kit.fontReady(`400 200px ${FONT.zhBrush}`, ZH1.join("")),
      kit.fontReady(`900 200px ${FONT.zhSerif}`, ZH2.join("")),
      kit.fontReady(`900 150px ${FONT.latinDisplay}`, WORDS.join(" ")),
    ]);
    root.style.background = PAL.noche;
    const wrap = (this.wrap = kit.el("div", { position: "absolute", left: 0, top: 0, width: W + "px", height: H + "px", transformOrigin: `${VPX}px ${VPY}px` }, root));

    // ================= Three.js: túnel =================
    const three = (this.three = kit.makeThree(wrap, { alpha: false, fov: 62 }));
    const { scene, camera, renderer } = three;
    renderer.toneMapping = THREE.NoToneMapping;
    camera.position.set(0, 0, 0); camera.near = 0.05; camera.far = 400;
    camera.setViewOffset(W, H, W / 2 - VPX, H / 2 - VPY, W, H); camera.updateProjectionMatrix();
    scene.add(camera);
    const add = { transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, toneMapped: false };

    // fondo: noche azul con resplandor índigo y brasas rojas en los bordes
    const bgTx = kit.canvasTexture(540, 960, (g) => {
      const cx = 270, cy = 480;
      let r = g.createRadialGradient(cx, cy, 0, cx, cy, 620);
      r.addColorStop(0, "#3a2f86"); r.addColorStop(0.1, "#222a70"); r.addColorStop(0.3, "#121742"); r.addColorStop(0.6, "#0a0d27"); r.addColorStop(1, "#03040c");
      g.fillStyle = r; g.fillRect(0, 0, 540, 960);
      g.globalCompositeOperation = "lighter";
      for (const [x, y, rad, col] of [[40, 120, 330, "120,14,40"], [520, 860, 380, "110,10,36"], [500, 90, 260, "30,60,150"], [30, 900, 280, "40,50,160"]]) {
        r = g.createRadialGradient(x, y, 0, x, y, rad); r.addColorStop(0, `rgba(${col},0.42)`); r.addColorStop(1, `rgba(${col},0)`); g.fillStyle = r; g.fillRect(0, 0, 540, 960);
      }
    });
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(118, 210), new THREE.MeshBasicMaterial({ map: bgTx, toneMapped: false, depthTest: false, depthWrite: false }));
    bg.position.z = -150; bg.renderOrder = -10; camera.add(bg); this.bg = bg;

    // luz del fondo del túnel
    const glowTx = kit.glowTexture(256, "255,226,150");
    const core = (this.core = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTx, ...add })));
    core.position.z = -120; core.renderOrder = -5; camera.add(core);
    const core2 = (this.core2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: kit.glowTexture(256, "255,250,235"), ...add })));
    core2.position.z = -119; core2.renderOrder = -4; camera.add(core2);

    // anillos dorados (puertas de luna) que marcan la profundidad
    this.rings = [];
    const ringGeo = new THREE.RingGeometry(6.9, 7.04, 120), ringGeo2 = new THREE.RingGeometry(7.3, 7.34, 120);
    for (let i = 0; i < 10; i++) {
      const grp = new THREE.Group();
      const m1 = new THREE.MeshBasicMaterial({ color: i % 3 === 1 ? 0xff5a48 : 0xffd27a, side: THREE.DoubleSide, ...add });
      grp.add(new THREE.Mesh(ringGeo, m1), new THREE.Mesh(ringGeo2, m1));
      // cuentas de luz sobre el anillo
      const n = 12, pos = new Float32Array(n * 3);
      for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2; pos[k * 3] = Math.cos(a) * 7.17; pos[k * 3 + 1] = Math.sin(a) * 7.17; }
      const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pm = new THREE.PointsMaterial({ map: glowTx, size: 0.9, color: 0xffe9a8, sizeAttenuation: true, ...add });
      grp.add(new THREE.Points(pg, pm));
      grp.userData = { z0: (i / 10) * L, m1, pm, spin: (i % 2 ? 1 : -1) * (0.25 + R() * 0.3), ph: R() * 6.28 };
      scene.add(grp); this.rings.push(grp);
    }

    // palabras españolas luminosas
    const wordTx = (txt, red) => kit.canvasTexture(1024, 256, (g) => {
      g.textAlign = "center"; g.textBaseline = "middle";
      let size = 168; g.font = `900 ${size}px ${FONT.latinDisplay}`;
      const mw = g.measureText(txt).width; if (mw > 900) { size *= 900 / mw; g.font = `900 ${size}px ${FONT.latinDisplay}`; }
      g.shadowColor = red ? "rgba(255,60,50,1)" : "rgba(255,190,70,1)"; g.shadowBlur = 34;
      g.fillStyle = red ? "#ff5a4a" : "#f2c14e"; g.fillText(txt, 512, 132); g.fillText(txt, 512, 132);
      g.shadowBlur = 0;
      const gr = g.createLinearGradient(0, 132 - size * 0.45, 0, 132 + size * 0.45);
      if (red) { gr.addColorStop(0, "#fff3ea"); gr.addColorStop(0.55, "#ffb49c"); gr.addColorStop(1, "#ff5a48"); }
      else { gr.addColorStop(0, "#fffbe8"); gr.addColorStop(0.5, "#ffe9a8"); gr.addColorStop(1, "#f2b33a"); }
      g.fillStyle = gr; g.fillText(txt, 512, 132);
    });
    this.words = [];
    const wGeo = new THREE.PlaneGeometry(4.4, 1.1);
    const NW = WORDS.length;
    for (let i = 0; i < NW; i++) {
      const red = i % 4 === 2; const tx = wordTx(WORDS[i], red);
      // ángulo lejos de la horizontal: las palabras pasan por encima y por debajo del titular
      const side = i % 2 ? 1 : -1; const a = side * (0.5 + R() * 2.14);
      const rad = 2.5 + R() * 2.3;
      const meshes = [];
      for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(wGeo, new THREE.MeshBasicMaterial({ map: tx, ...add, blending: k ? THREE.AdditiveBlending : THREE.NormalBlending })); m.renderOrder = 5 - k; scene.add(m); meshes.push(m); }
      this.words.push({ meshes, x: Math.cos(a) * rad * 0.62, y: Math.sin(a) * rad, z0: mod((i * 0.618034 + 0.07) * L, L), s: 0.8 + R() * 0.55, tilt: (R() - 0.5) * 0.24 });
    }

    // estelas (cuadriláteros radiales con cola transparente)
    const NS = (this.NS = 620);
    this.st = Array.from({ length: NS }, () => { const a = R() * 6.2832, r = 1.3 + Math.pow(R(), 0.7) * 9.5; const c = R(); return { a, r, z0: R() * L, w: 0.012 + R() * 0.03, len: 0.6 + R() * 0.9, col: c < 0.14 ? [1, 0.3, 0.22] : c < 0.4 ? [1, 0.96, 0.82] : [1, 0.74, 0.28], b: 0.35 + R() * 0.65 }; });
    const sGeo = new THREE.BufferGeometry();
    this.sPos = new Float32Array(NS * 12); const sCol = new Float32Array(NS * 12); const idx = new Uint16Array(NS * 6);
    this.st.forEach((s, i) => { for (let k = 0; k < 2; k++) for (let c = 0; c < 3; c++) sCol[i * 12 + k * 3 + c] = s.col[c] * s.b; for (let k = 0; k < 6; k++) idx[i * 6 + k] = i * 4 + [0, 1, 2, 2, 1, 3][k]; });
    sGeo.setAttribute("position", new THREE.BufferAttribute(this.sPos, 3)); sGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3)); sGeo.setIndex(new THREE.BufferAttribute(idx, 1));
    this.sMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, ...add });
    const sMesh = new THREE.Mesh(sGeo, this.sMat); sMesh.frustumCulled = false; scene.add(sMesh); this.sGeo = sGeo;

    // polvo de oro
    const ND = (this.ND = 520);
    this.dust = Array.from({ length: ND }, () => ({ a: R() * 6.2832, r: 0.7 + R() * 7, z0: R() * L, ph: R() * 6.28, sp: 0.4 + R() }));
    this.dPos = new Float32Array(ND * 3); const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute("position", new THREE.BufferAttribute(this.dPos, 3));
    this.dMat = new THREE.PointsMaterial({ map: glowTx, size: 0.34, color: 0xffd98a, sizeAttenuation: true, ...add });
    const dMesh = new THREE.Points(dGeo, this.dMat); dMesh.frustumCulled = false; scene.add(dMesh); this.dGeo = dGeo;

    // ================= lienzo 2D: titulares, tinta, luz =================
    [this.c, this.g] = kit.canvas2d(wrap);
    this.tmp = document.createElement("canvas"); this.tmp.width = W; this.tmp.height = H; this.tg = this.tmp.getContext("2d");

    // caracteres dorados (un sprite por carácter)
    const goldChar = (ch, size) => {
      const pad = 70, c = document.createElement("canvas"), m = document.createElement("canvas").getContext("2d");
      m.font = `400 ${size}px ${FONT.zhBrush}`; const cw = m.measureText(ch).width;
      c.width = Math.ceil(cw + pad * 2); c.height = Math.ceil(size * 1.3 + pad * 2);
      const g = c.getContext("2d"); g.font = m.font; g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
      const x = c.width / 2, y = c.height / 2; const ex = Math.max(5, size * 0.035);
      // halo + contorno oscuro
      g.shadowColor = "rgba(255,150,30,0.9)"; g.shadowBlur = 46; g.strokeStyle = "#2a0c06"; g.lineWidth = size * 0.085; g.strokeText(ch, x, y + ex * 0.5);
      g.shadowColor = "rgba(0,0,0,0.85)"; g.shadowBlur = 18; g.shadowOffsetY = 10; g.strokeText(ch, x, y + ex * 0.5); g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0;
      // extrusión (canto)
      for (let k = Math.round(ex); k >= 1; k--) { g.fillStyle = k % 2 ? "#7a3d08" : "#9a5410"; g.fillText(ch, x, y + k); }
      // cara metálica
      const gr = g.createLinearGradient(0, y - size * 0.52, 0, y + size * 0.52);
      gr.addColorStop(0, "#fffbe6"); gr.addColorStop(0.22, "#ffe9a8"); gr.addColorStop(0.46, "#f2c14e"); gr.addColorStop(0.56, "#c8861a"); gr.addColorStop(0.64, "#ffe08a"); gr.addColorStop(0.86, "#f2b63c"); gr.addColorStop(1, "#b9760f");
      g.fillStyle = gr; g.fillText(ch, x, y);
      g.strokeStyle = "rgba(255,252,228,0.75)"; g.lineWidth = Math.max(1.5, size * 0.008); g.strokeText(ch, x, y - 1);
      return { c, cw };
    };
    const layout = (line, size, cy, track = 0) => {
      const chars = [...line].map((ch) => ({ ch, ...goldChar(ch, size) }));
      const total = chars.reduce((s, o) => s + o.cw, 0) + track * (chars.length - 1); let x = VPX - total / 2;
      return chars.map((o) => { const r = { ...o, x: x + o.cw / 2, y: cy, size }; x += o.cw + track; return r; });
    };
    {
      const m = document.createElement("canvas").getContext("2d"); m.font = `400 100px ${FONT.zhBrush}`;
      const s2 = Math.min(230, (860 / m.measureText(ZH1[1]).width) * 100);
      const s1 = Math.min(400, (640 / m.measureText(ZH1[0]).width) * 100);
      this.h1 = [...layout(ZH1[0], s1, 655, 10), ...layout(ZH1[1], s2, 965, 0)];
      this.h1.forEach((o, i) => { o.t0 = 0.5 + i * 0.028; o.rot = (R() - 0.5) * 0.5; o.tilt = (R() - 0.5) * 0.07; o.ph = R() * 6.28; });
    }

    // sello rojo «别再死记硬背！»
    const SW = (this.SW = 860), SH = (this.SH = 640), SP = 60;
    this.seal = document.createElement("canvas"); this.seal.width = SW + SP * 2; this.seal.height = SH + SP * 2;
    {
      const g = this.seal.getContext("2d"); g.translate(SP, SP);
      const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
      const gr = g.createLinearGradient(0, 0, SW * 0.4, SH); gr.addColorStop(0, "#e2183a"); gr.addColorStop(0.5, PAL.laca); gr.addColorStop(1, PAL.lacaOscura);
      g.fillStyle = "#3d040e"; rr(0, 20, SW, SH, 44); g.fill(); g.fillStyle = "#6e0a1c"; rr(0, 10, SW, SH, 44); g.fill();
      g.fillStyle = gr; rr(0, 0, SW, SH, 44); g.fill();
      // brillo de laca
      const hl = g.createLinearGradient(0, 0, 0, SH * 0.5); hl.addColorStop(0, "rgba(255,170,150,0.34)"); hl.addColorStop(1, "rgba(255,170,150,0)"); g.fillStyle = hl; rr(8, 8, SW - 16, SH * 0.5, 38); g.fill();
      g.strokeStyle = "#ffe9a8"; g.lineWidth = 9; rr(26, 26, SW - 52, SH - 52, 26); g.stroke();
      g.strokeStyle = "rgba(255,233,168,0.6)"; g.lineWidth = 3; rr(44, 44, SW - 88, SH - 88, 16); g.stroke();
      g.strokeStyle = "#ffe9a8"; g.lineWidth = 6; g.lineJoin = "miter";
      for (const [cx, cy, dx, dy] of [[62, 62, 1, 1], [SW - 62, 62, -1, 1], [62, SH - 62, 1, -1], [SW - 62, SH - 62, -1, -1]]) { g.beginPath(); g.moveTo(cx + dx * 70, cy); g.lineTo(cx, cy); g.lineTo(cx, cy + dy * 70); g.moveTo(cx + dx * 46, cy + dy * 20); g.lineTo(cx + dx * 20, cy + dy * 20); g.lineTo(cx + dx * 20, cy + dy * 46); g.lineTo(cx + dx * 46, cy + dy * 46); g.stroke(); }
      // texto
      g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
      const put = (txt, size, y, maxW) => {
        g.font = `900 ${size}px ${FONT.zhSerif}`; const mw = g.measureText(txt).width; if (mw > maxW) { size *= maxW / mw; g.font = `900 ${size}px ${FONT.zhSerif}`; }
        g.shadowColor = "rgba(60,0,8,0.9)"; g.shadowBlur = 0; g.shadowOffsetX = 5; g.shadowOffsetY = 8; g.fillStyle = "#4a0612"; g.fillText(txt, SW / 2, y);
        g.shadowColor = "transparent"; g.shadowOffsetX = g.shadowOffsetY = 0;
        const tg = g.createLinearGradient(0, y - size * 0.5, 0, y + size * 0.5); tg.addColorStop(0, "#fffdf2"); tg.addColorStop(0.6, "#fff0c4"); tg.addColorStop(1, "#ffd27a");
        g.fillStyle = tg; g.fillText(txt, SW / 2, y);
      };
      put(ZH2[0], 240, 196, 620); put(ZH2[1], 178, 440, 730);
      // desgaste de sello estampado
      g.globalCompositeOperation = "destination-out";
      for (let i = 0; i < 300; i++) { const e = R() < 0.55; const x = e ? (R() < 0.5 ? R() * 26 : SW - R() * 26) : R() * SW, y = e && R() < 0.5 ? R() * SH : e ? (R() < 0.5 ? R() * 22 : SH - R() * 22) : R() * SH; g.globalAlpha = 0.25 + R() * 0.6; g.beginPath(); g.arc(e && R() < 0.5 ? x : R() * SW * (e ? 1 : 0) + (e ? 0 : x), y, 0.8 + R() * (e ? 5 : 1.5), 0, 6.3); g.fill(); }
      g.globalAlpha = 1; g.globalCompositeOperation = "source-over";
    }
    this.sealC = { x: VPX, y: 850, rot: -0.085 };
    this.cut = { y0: 118, m: -0.2 };       // línea de corte/tachado en coordenadas locales del sello (origen en su centro)

    // rayos de luz (textura radial)
    this.rays = document.createElement("canvas"); this.rays.width = this.rays.height = 1024;
    {
      const g = this.rays.getContext("2d"); g.translate(512, 512);
      for (let i = 0; i < 46; i++) { const a = R() * 6.2832, w = 0.012 + R() * 0.06, len = 300 + R() * 212; const gr = g.createRadialGradient(0, 0, 0, 0, 0, len); const al = 0.12 + R() * 0.3; gr.addColorStop(0, `rgba(255,236,170,${al})`); gr.addColorStop(0.5, `rgba(255,200,90,${al * 0.5})`); gr.addColorStop(1, "rgba(255,180,60,0)"); g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, len, a - w, a + w); g.closePath(); g.fill(); }
    }
    this.glow = document.createElement("canvas"); this.glow.width = this.glow.height = 256;
    { const g = this.glow.getContext("2d"); const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, "rgba(255,252,236,1)"); gr.addColorStop(0.2, "rgba(255,232,160,0.85)"); gr.addColorStop(0.5, "rgba(255,190,80,0.32)"); gr.addColorStop(1, "rgba(255,160,40,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }

    // salpicaduras y chispas (semillas)
    const mkSplash = (n, spikes, reach) => ({
      drops: Array.from({ length: n }, () => ({ a: R() * 6.2832, d: reach * (0.25 + Math.pow(R(), 1.4) * 0.95), s: 5 + Math.pow(R(), 2.2) * 34, k: 0.6 + R() * 0.8 })),
      spikes: Array.from({ length: spikes }, () => ({ a: R() * 6.2832, len: reach * (0.45 + R() * 0.75), w: 8 + R() * 26 })),
    });
    this.splash1 = mkSplash(64, 22, 560); this.splash2 = mkSplash(70, 26, 640);
    const mkSparks = (n, v) => Array.from({ length: n }, () => { const a = R() * 6.2832; const sp = v * (0.3 + R()); return { vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.35 + R() * 0.6, w: 2 + R() * 4 }; });
    this.sparks = { a: mkSparks(70, 1500), b: mkSparks(80, 1700), c: mkSparks(46, 1300), d: mkSparks(60, 1500), e: mkSparks(70, 2200) };
  },

  async update(t, kit) {
    const { THREE, W, H, clamp, lerp, prog, ease, noise1 } = kit;
    const g = this.g; const D = travel(t), V = speed(t);
    const fin = prog(t, FT, DUR);                       // 0..1 hipervelocidad final
    const imp = (t0, k = 7) => (t >= t0 ? Math.exp(-k * (t - t0)) : 0);
    const I1 = imp(0.5), I2 = imp(2.0), I25 = imp(2.5, 9), I3 = imp(3.0), I35 = imp(3.5, 6);

    // ---------- cámara: temblor en impactos + alabeo ----------
    const sh = 30 * I1 + 46 * I2 + 14 * I25 + 30 * I3 + 20 * I35 + 16 * fin * fin;
    const sx = noise1(t * 34, 1) * sh, sy = noise1(t * 34, 2) * sh, sr = noise1(t * 30, 3) * sh * 0.0009;
    const punch = 1.05 + 0.05 * I1 + 0.07 * I2 + 0.03 * I3 + 0.02 * Math.sin(t * 1.3) + 0.1 * ease.inCubic(fin);
    this.wrap.style.transform = `translate(${sx.toFixed(2)}px,${sy.toFixed(2)}px) rotate(${sr.toFixed(5)}rad) scale(${punch.toFixed(4)})`;

    // ---------- Three: túnel ----------
    const { renderer, scene, camera } = this.three;
    const roll = 0.1 * Math.sin(t * 0.9 + 0.4) + 0.5 * ease.inCubic(fin);
    camera.rotation.set(noise1(t * 1.1, 7) * 0.015, noise1(t * 0.9, 8) * 0.02, roll);
    camera.fov = 62 + 5 * I1 + 7 * I2 + 30 * ease.inQuad(fin); camera.updateProjectionMatrix(); this.bg.scale.setScalar(Math.tan((camera.fov * Math.PI) / 360) / Math.tan((62 * Math.PI) / 360));
    const zOf = (z0) => -L + mod(z0 + D, L) + 3;
    const farFade = (z) => prog(z, -L + 3, -L + 30);

    for (const r of this.rings) {
      const u = r.userData, z = zOf(u.z0); r.position.z = z; r.rotation.z = u.ph + t * u.spin;
      const o = farFade(z) * (0.38 + 0.5 * prog(z, -40, -6)) * (1 - prog(z, -1, 2)); u.m1.opacity = o; u.pm.opacity = o * 0.9;
    }
    const stretch = clamp((V - 12) * 0.011, 0.04, 14);
    for (const w of this.words) {
      const z = zOf(w.z0);
      w.meshes.forEach((m, k) => {
        const zz = z - k * stretch * 1.3; m.position.set(w.x, w.y, zz); m.rotation.z = roll + w.tilt; m.scale.setScalar(w.s);
        m.visible = zz < 1.5 && zz > -L; m.material.opacity = farFade(zz) * [1, 0.24, 0.12, 0.06][k] * (1 - 0.6 * prog(zz, -2.5, 1.5));
      });
    }
    const P = this.sPos; const sl = clamp(V * 0.034, 0.5, 90);
    for (let i = 0; i < this.NS; i++) {
      const s = this.st[i], z = zOf(s.z0), ca = Math.cos(s.a), sa = Math.sin(s.a), x = ca * s.r, y = sa * s.r, wx = -sa * s.w * (1 + sl * 0.03), wy = ca * s.w * (1 + sl * 0.03), z2 = z - sl * s.len, o = i * 12;
      P[o] = x + wx; P[o + 1] = y + wy; P[o + 2] = z; P[o + 3] = x - wx; P[o + 4] = y - wy; P[o + 5] = z;
      P[o + 6] = x + wx * 0.2; P[o + 7] = y + wy * 0.2; P[o + 8] = z2; P[o + 9] = x - wx * 0.2; P[o + 10] = y - wy * 0.2; P[o + 11] = z2;
    }
    this.sGeo.attributes.position.needsUpdate = true; this.sMat.opacity = 0.75 + 0.25 * fin;
    const Pd = this.dPos;
    for (let i = 0; i < this.ND; i++) { const d = this.dust[i], a = d.a + Math.sin(t * d.sp + d.ph) * 0.12; Pd[i * 3] = Math.cos(a) * d.r; Pd[i * 3 + 1] = Math.sin(a) * d.r; Pd[i * 3 + 2] = zOf(d.z0); }
    this.dGeo.attributes.position.needsUpdate = true;
    const cs = 26 + 6 * Math.sin(t * 6.283 * 2) + 60 * I1 + 70 * I2 + 30 * I3 + 500 * ease.inCubic(fin);
    this.core.scale.setScalar(cs * 1.6); this.core.material.opacity = 0.8; this.core2.scale.setScalar(cs * 0.55); this.core2.material.opacity = 0.95;
    renderer.render(scene, camera);

    // ---------- 2D ----------
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = "source-over"; g.clearRect(0, 0, W, H);

    // rayos giratorios (respiran con los golpes)
    const rayA = 0.2 + 0.75 * I1 + 0.8 * I2 + 0.5 * I3 + 0.9 * fin + 0.3 * prog(t, 0, 0.5);
    g.globalCompositeOperation = "lighter";
    for (const [dir, sc, al] of [[1, 2.6, 0.55], [-1, 3.3, 0.35]]) {
      g.save(); g.translate(VPX, VPY); g.rotate(dir * (t * 0.35 + 0.6)); const s = sc * (1 + 0.25 * I1 + 0.3 * I2 + 1.2 * ease.inQuad(fin)); g.scale(s, s); g.globalAlpha = clamp(rayA * al); g.drawImage(this.rays, -512, -512); g.restore();
    }
    g.globalCompositeOperation = "source-over"; g.globalAlpha = 1;

    // salpicadura de tinta
    const splash = (sp, t0, cx, cy, colA, colB, dur) => {
      const age = t - t0; if (age < 0 || age > dur) return; const e = ease.outExpo(clamp(age / 0.45)); const die = 1 - ease.inQuad(prog(age, dur * 0.45, dur));
      g.save(); g.translate(cx, cy);
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, 700); gr.addColorStop(0, colA); gr.addColorStop(1, colB); g.fillStyle = gr;
      for (const s of sp.spikes) { const len = s.len * e, w = s.w * die * 1.3; if (w < 0.5) continue; const ca = Math.cos(s.a), sa = Math.sin(s.a), i0 = len * (0.12 + 0.8 * (1 - die)); g.beginPath(); g.moveTo(ca * i0 - sa * w, sa * i0 + ca * w); g.lineTo(ca * len, sa * len); g.lineTo(ca * i0 + sa * w, sa * i0 - ca * w); g.closePath(); g.fill(); }
      for (const d of sp.drops) { const dd = d.d * ease.outExpo(clamp(age / (0.45 * d.k))); const r = d.s * die; if (r < 0.5) continue; g.beginPath(); g.arc(Math.cos(d.a) * dd, Math.sin(d.a) * dd + 260 * age * age, r, 0, 6.3); g.fill(); }
      const br = 150 * e * Math.pow(die, 4) * (1 - prog(age, 0.12, 0.5)); if (br > 1) { g.beginPath(); for (let k = 0; k <= 40; k++) { const a = (k / 40) * 6.2832, rr = br * (1 + 0.2 * Math.sin(a * 7 + 1) + 0.12 * Math.sin(a * 13)); g[k ? "lineTo" : "moveTo"](Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath(); g.fill(); }
      g.restore();
    };
    splash(this.splash1, 0.5, VPX, 800, "#fff3c4", "#e89a1c", 0.62);
    splash(this.splash2, 2.0, VPX, 850, "#ff3550", "#8f0c21", 0.8);

    // ondas de choque
    const ring = (t0, cx, cy, maxR, col, lw = 34, dur = 0.55) => { const a = t - t0; if (a < 0 || a > dur) return; const p = a / dur, e = ease.outExpo(p); g.strokeStyle = col; g.lineWidth = lw * (1 - p) + 0.5; g.globalAlpha = 1 - p * p; g.beginPath(); g.arc(cx, cy, maxR * e, 0, 6.3); g.stroke(); g.globalAlpha = 1; };
    g.globalCompositeOperation = "lighter";
    ring(0.5, VPX, 800, 980, "#ffe9a8"); ring(0.56, VPX, 800, 640, "#f2c14e", 16);
    ring(1.0, VPX, 800, 760, "rgba(255,233,168,0.6)", 10, 0.5); ring(1.5, VPX, 800, 760, "rgba(255,233,168,0.6)", 10, 0.5);
    ring(2.0, VPX, 850, 1100, "#ff6a5a", 40); ring(2.06, VPX, 850, 720, "#ffe9a8", 14);
    ring(3.0, VPX, 850, 900, "#ffe9a8", 22); ring(3.5, VPX, VPY, 1300, "#fff6d8", 30, 0.45);
    g.globalCompositeOperation = "source-over";

    // gota de oro que cae (0–0,5 s)
    if (t < 0.56) {
      const p = t / 0.5, q = 0.3 * p + 0.7 * p * p; const x = VPX + 150 * (1 - q) * (1 - q), y = 250 + 550 * q, v = 0.3 + 1.4 * p;
      g.save(); g.globalCompositeOperation = "lighter";
      const tl = 260 + 560 * v, ang = Math.atan2(550 * v, -300 * (1 - q)); g.translate(x, y); g.rotate(ang - Math.PI / 2);
      const gr = g.createLinearGradient(0, 0, 0, -tl); gr.addColorStop(0, "rgba(255,246,216,0.95)"); gr.addColorStop(0.25, "rgba(255,200,90,0.55)"); gr.addColorStop(1, "rgba(255,170,50,0)");
      g.fillStyle = gr; g.beginPath(); g.moveTo(-26, 0); g.quadraticCurveTo(-8, -tl * 0.5, 0, -tl); g.quadraticCurveTo(8, -tl * 0.5, 26, 0); g.closePath(); g.fill();
      const gs = (300 + 120 * Math.sin(t * 50)) * (1 + 2.6 * prog(t, 0.44, 0.56)); g.globalAlpha = 1 - prog(t, 0.5, 0.56); g.drawImage(this.glow, -gs / 2, -gs / 2, gs, gs); g.drawImage(this.glow, -gs / 5, -gs / 5, gs / 2.5, gs / 2.5);
      g.restore();
      // chispas que suelta la gota
      g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = "#ffe9a8";
      for (let i = 0; i < 26; i++) { const born = i / 26 * 0.5, a = t - born; if (a < 0 || a > 0.35) continue; const bp = born / 0.5, bq = 0.3 * bp + 0.7 * bp * bp; const bx = VPX + 150 * (1 - bq) * (1 - bq), by = 250 + 550 * bq; const s = this.sparks.c[i]; g.globalAlpha = 1 - a / 0.35; g.beginPath(); g.arc(bx + s.vx * 0.12 * a, by + s.vy * 0.08 * a - 120 * a, s.w * (1 - a / 0.35) + 0.5, 0, 6.3); g.fill(); }
      g.restore();
    }

    // ---------- titular 1: «想学西班牙语？» ----------
    if (t >= 0.5 && t < 2.2) {
      const tg = this.tg; tg.setTransform(1, 0, 0, 1, 0, 0); tg.globalCompositeOperation = "source-over"; tg.globalAlpha = 1; tg.clearRect(0, 0, W, H);
      const out = ease.inCubic(prog(t, 1.78, 2.0));
      const grow = 1 + 0.07 * prog(t, 0.5, 2) + 0.07 * imp(1.0, 9) + 0.07 * imp(1.5, 9);
      for (let i = 0; i < this.h1.length; i++) {
        const o = this.h1[i], age = t - o.t0; if (age < 0) continue;
        const b = Math.exp(-14 * age) * Math.cos(age * 22), k = 1 - b;      // muelle (rebote corto por debajo de 1)
        let sc = (1 + (b > 0 ? 3.4 * b : 0.9 * b)) * grow; let rot = o.rot * b * 2 + o.tilt + Math.sin(t * 2.4 + o.ph) * 0.012;
        let x = VPX + (o.x - VPX) * grow, y = 800 + (o.y - 800) * grow + Math.sin(t * 3 + o.ph) * 5;
        if (i === this.h1.length - 1) { const j = imp(1.5, 5) * Math.sin((t - 1.5) * 20); y -= 60 * Math.abs(j); rot += 0.35 * j; sc *= 1 + 0.25 * imp(1.5, 6); }   // «？» salta
        if (out > 0) { const f = 1 + out * 5; x = VPX + (x - VPX) * f; y = 800 + (y - 800) * f + out * 200 * (o.y < 800 ? -1 : 1); sc *= 1 + out * 2.4; rot += out * o.rot * 2; }
        tg.save(); tg.translate(x, y); tg.rotate(rot); tg.scale(sc, sc); tg.globalAlpha = clamp(age / 0.04) * (1 - prog(out, 0.55, 1)); tg.drawImage(o.c, -o.c.width / 2, -o.c.height / 2); tg.restore();
      }
      // brillo que barre (solo sobre el texto)
      for (const [a, b] of [[0.72, 1.12], [1.42, 1.78]]) {
        const p = prog(t, a, b); if (p <= 0 || p >= 1) continue; const bx = lerp(-300, W + 300, ease.inOutCubic(p));
        tg.save(); tg.globalCompositeOperation = "source-atop"; tg.translate(bx, 0); tg.transform(1, 0, -0.45, 1, 0, 0);
        const gr = tg.createLinearGradient(-150, 0, 150, 0); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(0.5, "rgba(255,255,245,0.9)"); gr.addColorStop(1, "rgba(255,255,255,0)"); tg.fillStyle = gr; tg.fillRect(-150 + 400, 0, 300, H); tg.restore();
      }
      g.drawImage(this.tmp, 0, 0);
      // fogonazo blanco del impacto
      if (I1 > 0.02) { g.save(); g.globalCompositeOperation = "lighter"; g.globalAlpha = clamp(I1 * I1 * 1.2); const s = 1500 + 900 * (1 - I1); g.drawImage(this.glow, VPX - s / 2, 800 - s / 2, s, s); g.restore(); }
    }

    // ---------- titular 2: sello rojo «别再死记硬背！» ----------
    if (t >= 1.84 && t < 3.86) {
      const S = this.seal, C = this.sealC, cut = this.cut;
      const drop = prog(t, 1.84, 2.0); const land = t - 2.0;
      let sc = land < 0 ? lerp(5.2, 1, ease.inCubic(drop)) : 1 - 0.09 * Math.exp(-9 * land) * Math.cos(land * 26);
      sc *= 1 + 0.035 * prog(t, 2, 3.5) + 0.05 * imp(2.5, 10) + 0.06 * imp(3.0, 9);
      const rot = C.rot + (land < 0 ? (1 - drop) * 0.5 : 0.03 * Math.exp(-7 * land) * Math.sin(land * 22));
      const crack = t >= 3.0 ? 10 + 12 * imp(3.0, 5) + 6 * prog(t, 3, 3.5) : 0;
      const fly = ease.inQuad(prog(t, 3.5, 3.86));
      const nx = -cut.m / Math.hypot(1, cut.m), ny = 1 / Math.hypot(1, cut.m);     // normal de la línea de corte (hacia abajo)
      const half = (sign) => {
        g.save(); g.translate(C.x, C.y); g.rotate(rot); g.scale(sc, sc);
        const off = sign * (crack + fly * 1500); g.translate(nx * off + sign * fly * 500, ny * off); g.rotate(sign * (fly * 0.7 + (crack ? 0.012 : 0))); g.scale(1 + fly * 1.6, 1 + fly * 1.6);
        if (t >= 3.0) { g.beginPath(); const yL = cut.y0 + cut.m * -700, yR = cut.y0 + cut.m * 700; if (sign < 0) { g.moveTo(-700, -700); g.lineTo(700, -700); g.lineTo(700, yR); g.lineTo(-700, yL); } else { g.moveTo(-700, 700); g.lineTo(700, 700); g.lineTo(700, yR); g.lineTo(-700, yL); } g.closePath(); g.clip(); }
        g.shadowColor = `rgba(20,0,6,${0.75 * (1 - fly)})`; g.shadowBlur = 50; g.shadowOffsetY = 26;
        g.globalAlpha = land < 0 ? clamp(drop * 3) : 1; g.drawImage(S, -S.width / 2, -S.height / 2); g.restore();
      };
      if (t < 3.0) half(-1); else { half(-1); half(1); }
      // tachado: pincelada de oro (2,5 s) → grieta de luz (3 s)
      if (t >= 2.5) {
        const p = ease.outExpo(prog(t, 2.5, 2.68)); const x0 = -470, x1 = lerp(x0, 470, p); const hot = imp(2.5, 5) + imp(3.0, 5);
        g.save(); g.translate(C.x, C.y); g.rotate(rot); g.scale(sc, sc); g.globalCompositeOperation = "lighter";
        const thick = (t < 3 ? 40 : lerp(40, 16, prog(t, 3, 3.2)) + crack * 1.6) * (1 - ease.outCubic(prog(t, 3.5, 3.63))); const steps = 30;
        if (thick > 0.5) {
          for (const [wm, col, op, oy] of [[1.5, "rgba(50,4,10,0.85)", "source-over", 7], [1, "#f2c14e", "source-over", 0], [0.62, "#ffe9a8", "source-over", -2], [0.24, "rgba(255,255,245,1)", "lighter", -3]]) {
            g.globalCompositeOperation = op; g.fillStyle = col; g.save(); g.translate(0, oy); g.beginPath();
            for (let k = 0; k <= steps; k++) { const u = k / steps, x = lerp(x0, x1, u), w = thick * wm * 0.5 * (0.25 + 0.75 * Math.sin(Math.PI * Math.pow(u, 0.6))) * (1 + 0.25 * noise1(u * 9, 5)); g[k ? "lineTo" : "moveTo"](x, cut.y0 + cut.m * x - w); }
            for (let k = steps; k >= 0; k--) { const u = k / steps, x = lerp(x0, x1, u), w = thick * wm * 0.5 * (0.25 + 0.75 * Math.sin(Math.PI * Math.pow(u, 0.6))) * (1 + 0.25 * noise1(u * 9, 6)); g.lineTo(x, cut.y0 + cut.m * x + w); }
            g.closePath(); g.fill(); g.restore();
          }
          g.globalCompositeOperation = "lighter"; g.globalAlpha = clamp(hot); { const gl = 300; for (let k = 0; k < 5; k++) { const x = lerp(x0, x1, (k + 0.5) / 5); g.drawImage(this.glow, x - gl / 2, cut.y0 + cut.m * x - gl / 2, gl, gl); } } g.globalAlpha = 1;
          if (p < 1) { const gs = 420; g.drawImage(this.glow, x1 - gs / 2, cut.y0 + cut.m * x1 - gs / 2, gs, gs); }
        }
        g.restore();
      }
      if (I2 > 0.02) { g.save(); g.globalCompositeOperation = "lighter"; g.globalAlpha = clamp(I2 * I2); const s = 1700 + 800 * (1 - I2); g.drawImage(this.glow, C.x - s / 2, C.y - s / 2, s, s); g.restore(); }
    }

    // ---------- chispas ----------
    const sparks = (arr, t0, cx, cy, col, grav = 1500) => {
      const a = t - t0; if (a < 0 || a > 1) return; g.save(); g.globalCompositeOperation = "lighter"; g.strokeStyle = col; g.lineCap = "round";
      for (const s of arr) { if (a > s.life) continue; const d = 1 - Math.exp(-4 * a), x = cx + (s.vx * d) / 4, y = cy + (s.vy * d) / 4 + grav * a * a * 0.5, vx = s.vx * Math.exp(-4 * a), vy = s.vy * Math.exp(-4 * a) + grav * a; g.globalAlpha = 1 - a / s.life; g.lineWidth = s.w; g.beginPath(); g.moveTo(x, y); g.lineTo(x - vx * 0.03, y - vy * 0.03); g.stroke(); }
      g.restore();
    };
    sparks(this.sparks.a, 0.5, VPX, 800, "#ffe9a8"); sparks(this.sparks.b, 2.0, VPX, 850, "#ffb070");
    sparks(this.sparks.c, 2.5, VPX + 60, 950, "#fff6d8", 900); sparks(this.sparks.d, 3.0, VPX, 950, "#ffe9a8"); sparks(this.sparks.e, 3.5, VPX, 900, "#fff6d8", 0);

    // ---------- luz final: crece hasta casi llenar la pantalla ----------
    if (fin > 0) {
      const e = ease.inCubic(fin); g.save(); g.globalCompositeOperation = "lighter";
      const s = 300 + 3000 * e; g.globalAlpha = clamp(0.25 + fin * 1.2); g.drawImage(this.glow, VPX - s / 2, VPY - s / 2, s, s);
      g.globalCompositeOperation = "source-over"; g.globalAlpha = 1; const a = Math.pow(fin, 3.2), rad = 500 + 1100 * e;
      const gr = g.createRadialGradient(VPX, VPY, 0, VPX, VPY, rad); gr.addColorStop(0, `rgba(255,253,240,${a})`); gr.addColorStop(0.3, `rgba(255,236,160,${a * 0.97})`); gr.addColorStop(0.62, `rgba(248,196,80,${a * 0.9})`); gr.addColorStop(1, `rgba(214,120,30,${a * 0.72})`);
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.globalCompositeOperation = "lighter"; g.globalAlpha = clamp(a * 0.7); g.translate(VPX, VPY); g.rotate(t * 0.35 + 0.6); g.scale(3.4, 3.4); g.drawImage(this.rays, -512, -512);
      g.restore();
    }
  },
};
