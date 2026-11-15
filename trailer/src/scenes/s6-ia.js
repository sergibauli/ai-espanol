// s6-ia · 6 s · Tutor de IA (Rey Mono), examinador oral, pronunciación con voz real y juegos.
// Montaje de 4 golpes de 1,5 s con transiciones 3D: giro de cubo (1,5 s), zoom a través de la pantalla (3 s) y barrido de nube (4,5 s).
// Todo es función pura de t (sin estado entre fotogramas).
const TAU = Math.PI * 2;

export default {
  async setup(root, kit) {
    const { THREE, FONT, W, H, asset } = kit;
    const R = kit.rng(606);
    const three = kit.makeThree(root, { alpha: false, fov: 35 });
    const { scene, renderer } = three;
    this.three = three;
    renderer.toneMapping = THREE.NoToneMapping;
    scene.background = new THREE.Color(0x05060f);
    scene.add(new THREE.AmbientLight(0xfff0d8, 2.0));
    const dl = new THREE.DirectionalLight(0xffe0a0, 3.4); dl.position.set(2.5, 3, 6); scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0xff6a50, 1.8); dl2.position.set(-4, -1, 4); scene.add(dl2);

    // px de pantalla → unidades de mundo en el plano z (cámara en z=10)
    const U = H / (2 * 10 * Math.tan((35 * Math.PI) / 360));
    const P = (px, py, z = 0) => { const k = (10 - z) / 10; return new THREE.Vector3(((px - W / 2) / U) * k, ((H / 2 - py) / U) * k, z); };
    const S = (px) => px / U;
    this.P = P; this.S = S;

    const ADD = THREE.AdditiveBlending;
    const basic = (tex, o = {}) => new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide, ...o });
    const plane = (tex, wpx, hpx, parent, o = {}) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(S(wpx), S(hpx)), basic(tex, o)); parent.add(m); return m; };
    const glowTex = kit.glowTexture(128, "255,206,110");
    const whiteGlow = kit.glowTexture(128, "255,246,216");
    const streakTex = kit.canvasTexture(512, 64, (g) => { g.translate(256, 32); g.scale(1, 0.085); const gr = g.createRadialGradient(0, 0, 0, 0, 0, 256); gr.addColorStop(0, "rgba(255,250,230,1)"); gr.addColorStop(0.25, "rgba(255,220,140,0.6)"); gr.addColorStop(1, "rgba(255,200,100,0)"); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 256, 0, TAU); g.fill(); });
    const flare = (parent, px, py, z, w = 900) => { const g = new THREE.Group(); g.position.copy(P(px, py, 0)); g.position.z = z; parent.add(g); const a = plane(streakTex, w, w * 0.16, g, { blending: ADD }); const b = plane(whiteGlow, w * 0.3, w * 0.3, g, { blending: ADD }); a.renderOrder = b.renderOrder = 8; g.userData = { a, b }; return g; };
    this.setFlare = (f, v) => { f.visible = v > 0.01; f.userData.a.material.opacity = v; f.userData.b.material.opacity = v * 0.9; f.userData.a.scale.set(0.5 + v * 0.8, 0.6 + v * 0.6, 1); f.userData.b.scale.setScalar(0.5 + v); };

    // ---------- fuentes ----------
    const fSerif = (s) => `900 ${s}px ${FONT.zhSerif}`, fBrush = (s) => `${s}px ${FONT.zhBrush}`;
    await Promise.all([
      kit.fontReady(fSerif(100), "AI 导师 · 美猴王口语考官真人发音边玩边学你好！"),
      kit.fontReady(fBrush(100), "边玩边学"),
      kit.fontReady(`900 100px ${FONT.latinDisplay}`, "¡Hola!"),
      kit.fontReady(`900 100px ${FONT.latinMod}`, "ba be rr ñ ll j"),
    ]);

    // ---------- titular de oro metálico (textura + brillo que barre) ----------
    const sheenTex = kit.canvasTexture(256, 4, (g) => { const gr = g.createLinearGradient(0, 0, 256, 0); gr.addColorStop(0, "#000"); gr.addColorStop(0.42, "#000"); gr.addColorStop(0.5, "#fff"); gr.addColorStop(0.58, "#000"); gr.addColorStop(1, "#000"); g.fillStyle = gr; g.fillRect(0, 0, 256, 4); });
    const headline = (text, font, size, maxW, parent, px, py) => {
      const mc = document.createElement("canvas").getContext("2d"); mc.font = font(size);
      let tw = mc.measureText(text).width; if (tw > maxW) { size = Math.floor((size * maxW) / tw); mc.font = font(size); tw = mc.measureText(text).width; }
      const pad = Math.round(size * 0.34), cw = Math.ceil(tw + pad * 2), ch = Math.ceil(size * 1.6);
      const draw = (g, alphaOnly) => {
        g.font = font(size); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
        const x = cw / 2, y = ch / 2 + size * 0.02;
        if (alphaOnly) { g.fillStyle = "#000"; g.fillRect(0, 0, cw, ch); g.fillStyle = "#fff"; g.fillText(text, x, y); return; }
        g.save(); g.shadowColor = "rgba(8,0,3,0.85)"; g.shadowBlur = size * 0.24; g.shadowOffsetY = size * 0.09;
        g.strokeStyle = "#240107"; g.lineWidth = size * 0.21; g.strokeText(text, x, y); g.restore();
        for (let i = 6; i >= 1; i--) { g.strokeStyle = "#3a0410"; g.lineWidth = size * 0.14; g.strokeText(text, x, y + i * size * 0.014); } // canto extruido
        g.strokeStyle = "#8f0c21"; g.lineWidth = size * 0.14; g.strokeText(text, x, y);
        g.strokeStyle = "#f2c14e"; g.lineWidth = size * 0.06; g.strokeText(text, x, y);
        g.fillStyle = "#6b3f06"; g.fillText(text, x, y + size * 0.045);
        const gr = g.createLinearGradient(0, y - size * 0.5, 0, y + size * 0.5);
        gr.addColorStop(0, "#fffbe8"); gr.addColorStop(0.3, "#ffe08a"); gr.addColorStop(0.5, "#f2c14e"); gr.addColorStop(0.56, "#b3740f"); gr.addColorStop(0.74, "#f0b93f"); gr.addColorStop(1, "#fff0b8");
        g.fillStyle = gr; g.fillText(text, x, y);
        g.strokeStyle = "rgba(255,252,235,0.6)"; g.lineWidth = Math.max(1.5, size * 0.012); g.strokeText(text, x, y - size * 0.012);
      };
      const tex = kit.canvasTexture(cw, ch, (g) => draw(g, false));
      const aTex = kit.canvasTexture(cw, ch, (g) => draw(g, true)); aTex.colorSpace = THREE.NoColorSpace;
      const grp = new THREE.Group(); grp.position.copy(P(px, py)); grp.position.z = 0.6; parent.add(grp);
      const gl = plane(glowTex, cw * 1.3, ch * 2.1, grp, { blending: ADD, opacity: 0.4 }); gl.position.z = -0.05; gl.renderOrder = 5;
      const m = plane(tex, cw, ch, grp); m.renderOrder = 6;
      const sh = sheenTex.clone(); sh.needsUpdate = true;
      const sm = new THREE.Mesh(m.geometry, basic(sh, { alphaMap: aTex, blending: ADD, opacity: 0.95 })); sm.position.z = 0.01; sm.renderOrder = 7; grp.add(sm);
      grp.userData = { sheen: sh, glow: gl, flare: flare(grp, 540, 960, 0.05, cw * 1.25) };
      grp.userData.flare.position.set(0, 0, 0.05);
      return grp;
    };
    // entrada de titular: cae desde cerca de la cámara con rebote + destello anamórfico + brillo que barre
    this.animHead = (g, u, dir = 1) => {
      const a = kit.ease.outExpo(kit.prog(u, -0.08, 0.3));
      const w = Math.max(0, u - 0.28);
      const s = 1 + (1 - a) * 1.6 + 0.03 * Math.sin(u * 5.2) + 0.1 * Math.exp(-w * 10) * Math.sin(w * 30);
      g.scale.setScalar(s); g.rotation.z = (1 - a) * 0.22 * dir + 0.012 * Math.sin(u * 3.1);
      g.rotation.y = (1 - a) * 0.8 * dir + 0.13 * Math.sin(u * 2.3); g.rotation.x = 0.06 * Math.sin(u * 2.9 + 1);
      g.userData.sheen.offset.x = kit.remap(u, 0.22, 0.9, -0.62, 0.62);
      g.userData.glow.material.opacity = 0.3 + 0.55 * Math.exp(-Math.max(0, u - 0.05) * 5);
      this.setFlare(g.userData.flare, u < 0.12 ? 0 : 0.95 * Math.exp(-(u - 0.12) * 6));
    };

    // ---------- nube auspiciosa dibujada (nítida) ----------
    const cloudCanvas = (seed) => { const c = document.createElement("canvas"); c.width = 720; c.height = 300; const g = c.getContext("2d"); const r = kit.rng(seed);
      const bl = [[110, 205, 62], [205, 160, 88], [330, 128, 108], [455, 158, 92], [560, 200, 66], [640, 228, 40], [50, 232, 36]].map(([x, y, rr]) => [x + (r() - 0.5) * 16, y + (r() - 0.5) * 14, rr * (0.92 + r() * 0.16)]);
      const path = () => { g.beginPath(); for (const [x, y, rr] of bl) { g.moveTo(x + rr, y); g.arc(x, y, rr, 0, TAU); } g.rect(40, 200, 640, 62); };
      g.save(); g.beginPath(); g.rect(0, 0, 720, 264); g.clip();
      g.lineJoin = "round"; g.strokeStyle = "#8a5a0c"; g.lineWidth = 12; path(); g.stroke();
      const gr = g.createLinearGradient(0, 20, 0, 264); gr.addColorStop(0, "#fffbe6"); gr.addColorStop(0.45, "#ffdf8a"); gr.addColorStop(1, "#d9981f"); g.fillStyle = gr; path(); g.fill();
      g.strokeStyle = "rgba(160,104,16,0.85)"; g.lineWidth = 6; g.lineCap = "round";
      for (const [x, y, rr] of bl.slice(0, 5)) { g.beginPath(); for (let a = 0; a < 9.4; a += 0.2) { const q = rr * (0.62 - a * 0.052); const xx = x + Math.cos(a - 2.2) * q, yy = y + Math.sin(a - 2.2) * q; a ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); }
      g.restore(); return c; };
    const cloudTexs = [11, 23, 37].map((s) => { const t = new THREE.CanvasTexture(cloudCanvas(s)); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; });

    // ---------- fondo ----------
    const bgTex = (c0, c1, c2) => kit.canvasTexture(540, 960, (g) => {
      const gr = g.createRadialGradient(255, 440, 20, 270, 480, 700); gr.addColorStop(0, c0); gr.addColorStop(0.42, c1); gr.addColorStop(1, c2); g.fillStyle = gr; g.fillRect(0, 0, 540, 960);
      g.strokeStyle = "rgba(242,193,78,0.085)"; g.lineWidth = 1.5; // celosía china
      for (let y = -20; y < 980; y += 60) for (let x = -20; x < 560; x += 60) { g.strokeRect(x + 8, y + 8, 44, 44); g.strokeRect(x + 20, y + 20, 20, 20); }
    });
    const bg = new THREE.Group(); scene.add(bg);
    const mkBg = (tex, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(13.5, 23), basic(tex)); m.position.z = z; bg.add(m); return m; };
    this.bgNight = mkBg(bgTex("#2c2f96", "#0c1038", "#02030a"), -12); this.bgNight.renderOrder = -20;
    this.bgRed = mkBg(bgTex("#e8242c", "#8a0a1e", "#1c0206"), -11.9); this.bgRed.renderOrder = -19;
    // rayos giratorios
    const rays = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), basic(kit.canvasTexture(512, 512, (g) => {
      g.translate(256, 256); for (let i = 0; i < 20; i++) { g.rotate(TAU / 20); const gr = g.createRadialGradient(0, 0, 10, 0, 0, 256); gr.addColorStop(0, "rgba(255,215,120,0.6)"); gr.addColorStop(1, "rgba(255,215,120,0)"); g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 256, -0.06 - (i % 3) * 0.022, 0.06 + (i % 3) * 0.022); g.closePath(); g.fill(); }
    }), { blending: ADD, opacity: 0.3 }));
    rays.position.set(-0.13, 0.2, -9); rays.renderOrder = -18; bg.add(rays); this.rays = rays;
    // mandala dorado (dos aros ornamentales en 3D)
    const mandalaTex = kit.canvasTexture(1024, 1024, (g) => {
      g.translate(512, 512); const col = (a) => `rgba(255,214,128,${a})`; g.strokeStyle = col(0.95); g.fillStyle = col(0.95);
      const ring = (r, w) => { g.lineWidth = w; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke(); };
      ring(500, 7); ring(462, 2.5); ring(392, 4); ring(318, 2);
      g.lineWidth = 3; for (let i = 0; i < 96; i++) { const a = (i / 96) * TAU; g.beginPath(); g.moveTo(Math.cos(a) * 468, Math.sin(a) * 468); g.lineTo(Math.cos(a) * (i % 4 ? 484 : 496), Math.sin(a) * (i % 4 ? 484 : 496)); g.stroke(); }
      g.lineWidth = 5; for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU; g.beginPath(); g.arc(0, 0, 428, a, a + 0.17); g.stroke(); g.beginPath(); g.arc(0, 0, 410, a + 0.09, a + 0.26); g.stroke(); }
      for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; g.beginPath(); g.arc(Math.cos(a) * 355, Math.sin(a) * 355, i % 3 ? 9 : 17, 0, TAU); i % 3 ? g.fill() : g.stroke(); }
      g.lineWidth = 1.5; g.strokeStyle = col(0.5); for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU, b = a + (3 / 8) * TAU; g.beginPath(); g.moveTo(Math.cos(a) * 318, Math.sin(a) * 318); g.lineTo(Math.cos(b) * 318, Math.sin(b) * 318); g.stroke(); }
    });
    this.mandalas = [0, 1].map((i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), basic(mandalaTex, { blending: ADD, opacity: i ? 0.3 : 0.6 })); m.renderOrder = -15 + i; const h = new THREE.Group(); h.add(m); h.position.set(-0.1, 0.1, i ? -5.5 : -2.6); h.scale.setScalar(i ? 11.5 : 6.4); bg.add(h); m.userData.h = h; return m; });
    // haces de luz desde arriba
    const beamTex = kit.canvasTexture(64, 256, (g) => { const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, "rgba(255,236,170,0.9)"); gr.addColorStop(1, "rgba(255,220,140,0)"); g.fillStyle = gr; g.fillRect(0, 0, 64, 256); const gx = g.createLinearGradient(0, 0, 64, 0); gx.addColorStop(0, "#000"); gx.addColorStop(0.5, "rgba(0,0,0,0)"); gx.addColorStop(1, "#000"); g.globalCompositeOperation = "destination-out"; g.fillStyle = gx; g.fillRect(0, 0, 64, 256); });
    this.beams = Array.from({ length: 6 }, (_, i) => { const geo = new THREE.PlaneGeometry(1.5, 13); geo.translate(0, -6.5, 0); const m = new THREE.Mesh(geo, basic(beamTex, { blending: ADD, opacity: 0.2 })); m.position.set(-3.2 + i * 1.3, 5.6, -4 + (i % 3) * 0.8); m.renderOrder = -12; m.userData = { ph: R() * TAU, a: (i - 2.5) * 0.14 }; bg.add(m); return m; });
    // nubes doradas en paralaje (fondo)
    this.clouds = [];
    for (let i = 0; i < 12; i++) { const z = -8 + R() * 6, w = 420 + R() * 520; const m = plane(cloudTexs[i % 3], w, w * (300 / 720), bg, { opacity: 0.55 + R() * 0.4, color: 0xd8c0a0 }); m.renderOrder = -10; m.userData = { x0: (R() - 0.5) * 12, y: (R() - 0.5) * 11, z, v: (0.3 + R() * 0.6) * (i % 2 ? 1 : -1), span: 12 }; this.clouds.push(m); }
    // mar de nubes en primer plano (abajo) y jirones arriba: llenan la zona fuera del área segura
    this.fg = [];
    for (let i = 0; i < 9; i++) { const z = 2.2 + (i % 3) * 0.9, w = 620 + R() * 380; const m = plane(cloudTexs[i % 3], w, w * (300 / 720), scene, { opacity: 1, color: [0x9a6a3a, 0xd9a860, 0xffe6b0][i % 3] }); m.renderOrder = 12 + (i % 3); m.userData = { x0: (i / 9) * 6 + R() * 0.4, py: 1730 + (i % 3) * 80 + R() * 40, z, v: (0.5 + (i % 3) * 0.28) * (i % 2 ? 1 : -1), span: 6 }; this.fg.push(m); }
    // farolillos rojos colgando (arriba, ambiente)
    const lanternTex = kit.canvasTexture(256, 460, (g) => {
      g.strokeStyle = "#c8961e"; g.lineWidth = 4; g.beginPath(); g.moveTo(128, 0); g.lineTo(128, 70); g.stroke();
      const cap = g.createLinearGradient(80, 0, 176, 0); cap.addColorStop(0, "#8a5a0c"); cap.addColorStop(0.5, "#ffe9a8"); cap.addColorStop(1, "#8a5a0c");
      const body = g.createRadialGradient(105, 150, 10, 128, 180, 120); body.addColorStop(0, "#ff7a5a"); body.addColorStop(0.5, "#e01a30"); body.addColorStop(1, "#7a0818");
      g.fillStyle = body; g.beginPath(); g.ellipse(128, 185, 108, 100, 0, 0, TAU); g.fill();
      g.strokeStyle = "rgba(255,214,128,0.6)"; g.lineWidth = 3; for (let i = -3; i <= 3; i++) { g.beginPath(); g.ellipse(128, 185, Math.abs(i) * 32 + 4, 100, 0, i < 0 ? Math.PI / 2 : -Math.PI / 2, i < 0 ? Math.PI * 1.5 : Math.PI / 2); g.stroke(); }
      g.fillStyle = cap; g.fillRect(84, 70, 88, 22); g.fillRect(84, 278, 88, 22);
      g.strokeStyle = "#e01a30"; g.lineWidth = 5; for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(128 + i * 9, 300); g.lineTo(128 + i * 11, 440); g.stroke(); }
      g.fillStyle = "#f2c14e"; g.beginPath(); g.arc(128, 312, 13, 0, TAU); g.fill();
    });
    this.lanterns = [[80, -60, 270, 2.2], [1000, -80, 290, 2.6], [790, -90, 200, 1.2], [270, -80, 180, 0.8]].map(([px, py, hpx, z], i) => { const geo = new THREE.PlaneGeometry(S(hpx * 256 / 460), S(hpx)); geo.translate(0, -S(hpx) / 2, 0); const m = new THREE.Mesh(geo, basic(lanternTex)); m.position.copy(P(px, py, z)); m.renderOrder = 2; scene.add(m); const gl = plane(glowTex, hpx * 1.5, hpx * 1.5, m, { blending: ADD, opacity: 0.55 }); gl.position.set(0, -S(hpx) * 0.42, -0.02); m.userData = { ph: i * 1.7, gl }; return m; });
    // partículas doradas + bokeh
    const mkPts = (n, size, zr, op) => { const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3)); const data = Array.from({ length: n }, () => ({ x: (R() - 0.5) * 8, y: R() * 12, z: zr[0] + R() * (zr[1] - zr[0]), v: 0.35 + R() * 1.2, f: 0.6 + R() * 1.8, ph: R() * TAU, a: 0.1 + R() * 0.4 })); const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: glowTex, size, sizeAttenuation: true, transparent: true, depthWrite: false, blending: ADD, opacity: op, toneMapped: false })); pts.frustumCulled = false; pts.renderOrder = 9; scene.add(pts); return { pts, data }; };
    this.dust = [mkPts(380, 0.1, [-6, 4.5], 0.95), mkPts(30, 0.5, [3, 7], 0.1), mkPts(70, 0.24, [-3, 3], 0.5)];

    // ---------- móviles ----------
    const glareTex = kit.canvasTexture(256, 64, (g) => { g.fillStyle = "#000"; g.fillRect(0, 0, 256, 64); g.transform(1, 0, -0.9, 1, 30, 0); const gr = g.createLinearGradient(96, 0, 160, 0); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(0.5, "rgba(255,250,235,0.55)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(60, 0, 140, 64); });
    const phone = async (name, scale, parent) => {
      const p = await kit.phoneMesh(asset(`screens/${name}.jpg`), { scale });
      const mats = p.children[0].material; mats[0].metalness = 0.3; mats[0].roughness = 0.5; mats[1].metalness = 0.35; mats[1].roughness = 0.3; mats[1].emissive = new THREE.Color(0x7a5210);
      const g = new THREE.Group(); g.add(p); parent.add(g);
      const hl = new THREE.Mesh(new THREE.PlaneGeometry(scale * 2.6, scale * 3.6), basic(glowTex, { blending: ADD, opacity: 0.34 })); hl.position.z = -0.3 * scale; hl.renderOrder = -2; g.add(hl); // halo
      const gt = glareTex.clone(); gt.needsUpdate = true;
      const gm = new THREE.Mesh(new THREE.PlaneGeometry(0.925 * scale * 0.9, 2 * scale * 0.95), basic(gt, { blending: ADD, opacity: 0.9, side: THREE.FrontSide })); gm.position.z = 0.02 * scale; g.add(gm);
      g.userData = { glare: gt, halo: hl, scale };
      return g;
    };
    this.glare = (p, u) => { p.userData.glare.offset.x = kit.remap(u, 0, 0.55, 0.75, -0.75); };
    const monoTex = async (n) => { const t = await kit.loadTexture(asset(`mono/${n}.png`)); t.minFilter = THREE.LinearMipmapLinearFilter; return t; };
    const monkey = (tex, hpx, parent, px, py, z) => {
      const g = new THREE.Group(); g.position.copy(P(px, py, z)); parent.add(g);
      const gl = plane(glowTex, hpx * 1.5, hpx * 1.5, g, { blending: ADD, opacity: 0.8 }); gl.position.z = -0.1;
      const gl2 = plane(whiteGlow, hpx * 0.8, hpx * 0.8, g, { blending: ADD, opacity: 0.4 }); gl2.position.z = -0.09;
      const m = plane(tex, hpx * (236 / 420), hpx, g); m.renderOrder = 3; g.userData = { glow: gl, home: g.position.clone() }; return g;
    };
    // anillos / arcos de onda dorados
    const arcs = (n, parent, inner, outer, th0, thLen, color = 0xffd676) => Array.from({ length: n }, () => { const m = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 72, 1, th0, thLen), new THREE.MeshBasicMaterial({ color, transparent: true, depthWrite: false, blending: ADD, toneMapped: false, side: THREE.DoubleSide })); parent.add(m); return m; });
    // cometas dorados que orbitan el móvil en 3D (pasan por delante y por detrás)
    const cometGeo = new THREE.TorusGeometry(1, 0.011, 6, 72, 1.9);
    const comets = (parent, center, radius, n = 3) => { const g = new THREE.Group(); g.position.copy(center); parent.add(g); g.userData.list = Array.from({ length: n }, (_, i) => { const h = new THREE.Group(); h.rotation.set(1.22 + i * 0.2, (i - 1) * 0.5, i * 0.7); h.scale.setScalar(radius * (1 + i * 0.13)); g.add(h); const m = new THREE.Mesh(cometGeo, new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffd880 : 0xffb030, transparent: true, opacity: 0.6, depthWrite: false, blending: ADD, toneMapped: false })); h.add(m); const hd = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), basic(whiteGlow, { blending: ADD })); hd.position.set(Math.cos(1.9), Math.sin(1.9), 0); m.add(hd); m.userData = { sp: (2.6 + i * 0.9) * (i % 2 ? -1 : 1), ph: i * 2.1, hd, h }; return m; }); return g; };
    this.spinComets = (g, t) => { for (const m of g.userData.list) { m.rotation.z = t * m.userData.sp + m.userData.ph; m.userData.hd.rotation.set(-m.userData.h.rotation.x, 0, 0); } };

    // pivote del cubo (golpes 1 y 2)
    const RC = 1.9; this.RC = RC;
    const pivot = new THREE.Group(); pivot.position.set(0, 0, -RC); scene.add(pivot); this.pivot = pivot;
    const b1 = new THREE.Group(); b1.position.set(0, 0, RC); pivot.add(b1); this.b1 = b1;
    const b2 = new THREE.Group(); b2.position.set(RC, 0, 0); b2.rotation.y = Math.PI / 2; pivot.add(b2); this.b2 = b2;
    const b3 = new THREE.Group(); scene.add(b3); this.b3 = b3;
    const b4 = new THREE.Group(); scene.add(b4); this.b4 = b4;

    // ===== GOLPE 1 · AI 导师 · 美猴王 =====
    this.h1 = headline("AI 导师 · 美猴王", fSerif, 128, 860, b1, 500, 335);
    this.p1 = await phone("tutor-voz", 1.86, b1); this.p1.userData.home = P(668, 1010);
    this.c1 = comets(b1, P(668, 1010), 1.25);
    this.m1 = monkey(await monoTex("guino"), 900, b1, 262, 1120, 1.0);
    this.v1 = arcs(5, b1, 0.925, 1, -0.55, 1.1); this.v1.forEach((m) => { m.position.copy(P(380, 985, 1.15)); });
    const bubble = (text, font, fill, stroke, ink, tailLeft) => kit.canvasTexture(560, 340, (g) => {
      g.save(); g.shadowColor = "rgba(20,0,6,0.6)"; g.shadowBlur = 24; g.shadowOffsetY = 14;
      const gr = g.createLinearGradient(0, 30, 0, 250); gr.addColorStop(0, fill[0]); gr.addColorStop(1, fill[1]); g.fillStyle = gr;
      const tx = tailLeft ? 150 : 410;
      g.beginPath(); g.roundRect(34, 30, 492, 212, 70); g.moveTo(tx - 44, 236); g.lineTo(tx + (tailLeft ? -30 : 30), 312); g.lineTo(tx + 44, 236); g.fill(); g.restore();
      g.strokeStyle = stroke; g.lineWidth = 10; g.lineJoin = "round"; g.beginPath(); g.roundRect(34, 30, 492, 212, 70); g.stroke();
      g.fillStyle = gr; g.fillRect(tx - 38, 226, 76, 20);
      g.beginPath(); g.moveTo(tx - 42, 241); g.lineTo(tx + (tailLeft ? -30 : 30), 312); g.lineTo(tx + 42, 241); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.5)"; g.lineWidth = 3; g.beginPath(); g.roundRect(49, 45, 462, 182, 56); g.stroke();
      g.font = font; g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "rgba(0,0,0,0.3)"; g.fillText(text, 280, 143); g.fillStyle = ink; g.fillText(text, 280, 136);
    });
    const mkBubble = (tex, px, py, z, wpx) => { const g = new THREE.Group(); g.position.copy(P(px, py, z)); b1.add(g); const k = (10 - z) / 10; const gl = plane(glowTex, wpx * 1.5 * k, wpx * 1.0 * k, g, { blending: ADD, opacity: 0.6 }); gl.position.z = -0.06; for (let i = 3; i >= 1; i--) { const s = plane(tex, wpx * k, wpx * 0.607 * k, g, { color: 0x4a2a08 }); s.position.set(0, -0.012 * i, -0.02 * i); s.renderOrder = 4; } const m = plane(tex, wpx * k, wpx * 0.607 * k, g); m.renderOrder = 5; g.userData.fl = flare(g, 540, 960, 0.05, wpx * 1.5); g.userData.fl.position.set(0, 0, 0.05); return g; };
    this.bub1 = mkBubble(bubble("¡Hola!", `900 104px ${FONT.latinDisplay}`, ["#fffaf0", "#f1dfb4"], "#c8961e", "#a80d26", true), 300, 585, 1.6, 430);
    this.bub2 = mkBubble(bubble("你好！", fSerif(124), ["#f02040", "#8f0c21"], "#f2c14e", "#fff0c0", false), 705, 1335, 1.4, 430);

    // ===== GOLPE 2 · AI 口语考官 =====
    this.h2 = headline("AI 口语考官", fSerif, 172, 860, b2, 500, 345);
    this.p2 = await phone("examinador-oral", 1.8, b2); this.p2.userData.home = P(352, 1015);
    this.c2 = comets(b2, P(352, 1015), 1.2, 2);
    const sc = new THREE.Group(); sc.position.copy(P(748, 800, 0.9)); b2.add(sc); this.score = sc;
    const ro = S(165), ri = S(122);
    this.scoreGlow = plane(glowTex, 760, 760, sc, { blending: ADD, opacity: 0.5 }); this.scoreGlow.position.z = -0.08;
    const goldStd = new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.4, roughness: 0.3, emissive: 0x8a5a10 });
    const torus = new THREE.Mesh(new THREE.TorusGeometry(ro + S(9), S(9), 12, 96), goldStd); sc.add(torus);
    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(ri - S(6), S(6), 12, 96), goldStd); sc.add(torus2);
    const track = new THREE.Mesh(new THREE.RingGeometry(ri, ro, 96), new THREE.MeshBasicMaterial({ color: 0x2a0309, transparent: true, opacity: 0.9, depthWrite: false, toneMapped: false })); sc.add(track);
    this.fill = new THREE.Mesh(new THREE.RingGeometry(ri + S(4), ro - S(4), 120, 1, Math.PI / 2, -TAU), new THREE.MeshBasicMaterial({ map: kit.canvasTexture(256, 256, (g) => { const gr = g.createLinearGradient(0, 0, 256, 256); gr.addColorStop(0, "#fffbe8"); gr.addColorStop(0.5, "#ffd24e"); gr.addColorStop(1, "#ff9a1e"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }), transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide })); this.fill.position.z = 0.01; sc.add(this.fill);
    this.fillTip = plane(whiteGlow, 150, 150, sc, { blending: ADD }); this.fillTip.position.z = 0.04;
    this.mic = plane(kit.canvasTexture(256, 256, (g) => {
      const gr = g.createRadialGradient(100, 80, 10, 128, 128, 124); gr.addColorStop(0, "#ff3a4a"); gr.addColorStop(1, "#6d0818"); g.fillStyle = gr; g.beginPath(); g.arc(128, 128, 124, 0, TAU); g.fill();
      const go = g.createLinearGradient(0, 40, 0, 215); go.addColorStop(0, "#fffbe8"); go.addColorStop(0.5, "#f2c14e"); go.addColorStop(1, "#c8961e"); g.fillStyle = go; g.strokeStyle = go; g.lineCap = "round";
      g.shadowColor = "rgba(40,0,8,0.6)"; g.shadowBlur = 8; g.shadowOffsetY = 5;
      g.beginPath(); g.roundRect(100, 42, 56, 104, 28); g.fill();
      g.lineWidth = 11; g.beginPath(); g.arc(128, 116, 50, 0.08 * Math.PI, 0.92 * Math.PI); g.stroke();
      g.beginPath(); g.moveTo(128, 168); g.lineTo(128, 200); g.moveTo(98, 202); g.lineTo(158, 202); g.stroke();
    }), 232, 232, sc); this.mic.position.z = 0.02;
    this.sparks = Array.from({ length: 26 }, (_, i) => { const m = plane(whiteGlow, 70, 70, sc, { blending: ADD, opacity: 0 }); m.userData = { a: (i / 26) * TAU + R() * 0.2, v: 0.7 + R() * 1.3 }; return m; });
    this.scRings = arcs(3, sc, 0.955, 1, 0, TAU);
    this.scFlare = flare(sc, 540, 960, 0.1, 1100); this.scFlare.position.set(0, 0, 0.1);
    // onda de audio (barras 3D)
    const NB = 15; this.bars = [];
    const barTex = kit.canvasTexture(16, 128, (g) => { const gr = g.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, "#fffbe8"); gr.addColorStop(0.5, "#ffc93e"); gr.addColorStop(1, "#fffbe8"); g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, 16, 128, 8); g.fill(); });
    const waveG = new THREE.Group(); waveG.position.copy(P(748, 1185, 0.9)); b2.add(waveG); this.waveG = waveG;
    this.barGlow = plane(glowTex, 620, 420, waveG, { blending: ADD, opacity: 0.4 }); this.barGlow.position.z = -0.05;
    for (let i = 0; i < NB; i++) { const m = plane(barTex, 15, 100, waveG); m.position.x = S((i - (NB - 1) / 2) * 23); m.userData = { ph: R() * 10, w: 0.4 + 0.6 * Math.sin(((i + 0.5) / NB) * Math.PI) }; this.bars.push(m); }
    this.micWaves = arcs(4, sc, 0.95, 1, 0, TAU);

    // ===== GOLPE 3 · 真人发音 =====
    this.h3 = headline("真人发音", fSerif, 214, 860, b3, 500, 345);
    this.p3b = await phone("diccionarios", 1.5, b3); this.p3b.userData.home = P(205, 1050, -1.0);
    this.p3c = await phone("audicion", 1.5, b3); this.p3c.userData.home = P(875, 1050, -1.0);
    this.p3 = await phone("pronunciacion", 1.8, b3); this.p3.userData.home = P(540, 1020);
    this.c3 = comets(b3, P(540, 1020), 1.3);
    this.w3 = arcs(5, b3, 0.955, 1, 0, TAU); this.w3.forEach((m) => { m.position.copy(P(540, 1010, -0.5)); m.renderOrder = -3; });
    const tile = (txt) => kit.canvasTexture(320, 320, (g) => {
      const gr = g.createLinearGradient(0, 0, 0, 320); gr.addColorStop(0, "#27866a"); gr.addColorStop(1, "#06241c"); g.fillStyle = gr; g.fillRect(0, 0, 320, 320);
      const hi = g.createRadialGradient(90, 60, 10, 160, 160, 260); hi.addColorStop(0, "rgba(140,255,210,0.5)"); hi.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = hi; g.fillRect(0, 0, 320, 320);
      g.strokeStyle = "#f2c14e"; g.lineWidth = 12; g.beginPath(); g.roundRect(16, 16, 288, 288, 52); g.stroke();
      g.strokeStyle = "rgba(255,246,216,0.55)"; g.lineWidth = 3; g.beginPath(); g.roundRect(32, 32, 256, 256, 40); g.stroke();
      g.font = `900 ${txt.length > 1 ? 122 : 170}px ${FONT.latinMod}`; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillStyle = "rgba(0,0,0,0.5)"; g.fillText(txt, 160, 164); const go = g.createLinearGradient(0, 90, 0, 230); go.addColorStop(0, "#ffffff"); go.addColorStop(1, "#ffe08a"); g.fillStyle = go; g.fillText(txt, 160, 154);
    });
    const tileShape = (() => { const s = new THREE.Shape(), w = 1, r = 0.19, x = -0.5, y = -0.5; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + w - r); s.quadraticCurveTo(x + w, y + w, x + w - r, y + w); s.lineTo(x + r, y + w); s.quadraticCurveTo(x, y + w, x, y + w - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; })();
    const tileBody = new THREE.ExtrudeGeometry(tileShape, { depth: 0.16, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 3, curveSegments: 12 }); tileBody.translate(0, 0, -0.18);
    const tileFace = new THREE.ShapeGeometry(tileShape, 12); { const p = tileFace.attributes.position, uv = tileFace.attributes.uv; for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) + 0.5, p.getY(i) + 0.5); }
    const syl = [["ba", 128, 640, 178], ["be", 872, 625, 170], ["rr", 138, 985, 215], ["ñ", 890, 1000, 185], ["ll", 140, 1340, 172], ["j", 868, 1345, 176]];
    this.syl = syl.map(([txt, px, py, size], i) => {
      const g = new THREE.Group(); b3.add(g); const z = 1.6 + (i % 3) * 0.4, k = (10 - z) / 10, s = S(size) * k;
      const tr = plane(glowTex, size * 2.1 * k, size * 2.1 * k, g, { blending: ADD, opacity: 0.75 }); tr.position.z = -0.25 * s;
      const body = new THREE.Mesh(tileBody, goldStd); body.scale.setScalar(s); g.add(body);
      const face = new THREE.Mesh(tileFace, new THREE.MeshBasicMaterial({ map: tile(txt), toneMapped: false })); face.scale.setScalar(s); face.position.z = 0.022 * s; g.add(face);
      const ring = arcs(2, g, 0.93, 1, 0, TAU);
      g.userData = { from: P(540, 1000, 0.15), to: P(px, py, z), t0: 0.06 + i * 0.07, ring, rs: s, ph: R() * TAU, z };
      return g;
    });

    // ===== GOLPE 4 · 边玩边学 =====
    this.h4 = headline("边玩边学", fBrush, 250, 860, b4, 500, 345);
    this.fan = new THREE.Group(); b4.add(this.fan);
    const names = ["memoria", "juegos_dragon-jade", "juegos", "juegos_escape-palacio", "videos"];
    this.fanPhones = [];
    for (let i = 0; i < 5; i++) { const g = await phone(names[i], 1.5, this.fan); g.userData.i = i - 2; g.userData.halo.material.opacity = 0.3; this.fanPhones.push(g); }
    this.burst = plane(kit.canvasTexture(512, 512, (g) => { g.translate(256, 256); const r = kit.rng(5); for (let i = 0; i < 40; i++) { g.rotate(TAU / 40 + (r() - 0.5) * 0.05); const l = 150 + r() * 106; const gr = g.createLinearGradient(0, 0, l, 0); gr.addColorStop(0, "rgba(255,250,225,0.95)"); gr.addColorStop(1, "rgba(255,210,110,0)"); g.fillStyle = gr; g.beginPath(); g.moveTo(0, -5); g.lineTo(l, 0); g.lineTo(0, 5); g.fill(); } }), 1700, 1700, b4, { blending: ADD }); this.burst.position.copy(P(500, 1080, -1.2)); this.burst.renderOrder = -4;
    this.m4 = monkey(await monoTex("feliz"), 580, b4, 500, 1290, 1.7);
    // confeti dorado
    const NC = 420; this.NC = NC;
    this.conf = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.1, 0.055), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false }), NC); this.conf.frustumCulled = false; b4.add(this.conf);
    const cols = [0xfff6d8, 0xf2c14e, 0xffd676, 0xc8961e, 0xffe9a8, 0xf2c14e, 0xff4a3a]; const c = new THREE.Color();
    this.confD = Array.from({ length: NC }, (_, i) => { c.setHex(cols[i % cols.length]); this.conf.setColorAt(i, c); const a = R() * TAU, e = 0.2 + R() * 1.2, sp = 2.4 + R() * 5; return { burst: i % 3, vx: Math.cos(a) * Math.cos(e) * sp * 0.8, vy: Math.sin(e) * sp + 0.8, vz: Math.sin(a) * Math.cos(e) * sp * 0.7 + 0.9, rx: R() * 16 - 8, ry: R() * 16 - 8, ph: R() * TAU, s: 0.6 + R() * 1.4 }; });
    this.dummy = new THREE.Object3D();

    // ---------- barrido de nube (3 → 4) ----------
    this.wipe = new THREE.Mesh(new THREE.PlaneGeometry(9.4, 4.8), basic(kit.canvasTexture(1880, 960, (g) => {
      const gr = g.createLinearGradient(0, 0, 1880, 0); gr.addColorStop(0, "rgba(255,225,150,0)"); gr.addColorStop(0.27, "rgba(255,226,150,0.97)"); gr.addColorStop(0.5, "rgba(255,250,228,1)"); gr.addColorStop(0.73, "rgba(255,222,140,0.97)"); gr.addColorStop(1, "rgba(255,215,130,0)");
      g.fillStyle = gr; g.fillRect(0, 0, 1880, 960);
      const r2 = kit.rng(77), cc = [11, 23, 37].map(cloudCanvas);
      for (let i = 0; i < 46; i++) { const w = 380 + r2() * 520, x = r2() * 1880 - w / 2, y = r2() * 1000 - w * 0.25; g.globalAlpha = 0.75 + r2() * 0.25; g.drawImage(cc[i % 3], x, y, w, w * (300 / 720)); }
      g.globalAlpha = 1; g.globalCompositeOperation = "lighter"; for (let i = 0; i < 30; i++) { const y = r2() * 960, x = r2() * 900, l = 500 + r2() * 900; const lg = g.createLinearGradient(x, 0, x + l, 0); lg.addColorStop(0, "rgba(255,255,255,0)"); lg.addColorStop(0.5, "rgba(255,255,240,0.55)"); lg.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = lg; g.fillRect(x, y, l, 3 + r2() * 8); }
    }))); this.wipe.position.z = 5; this.wipe.renderOrder = 30; this.wipe.material.depthTest = false; scene.add(this.wipe);

    // destello DOM (zoom a través de la pantalla y aceleración final)
    this.flash = kit.el("div", { position: "absolute", left: 0, top: 0, width: W + "px", height: H + "px", pointerEvents: "none", mixBlendMode: "screen" }, root);
  },

  async update(t, kit) {
    const { prog, remap, ease, spring, lerp, noise1, clamp } = kit;
    const { scene, camera, renderer } = this.three; const P = this.P, S = this.S;
    const exp = Math.exp, sin = Math.sin, cos = Math.cos, PI = Math.PI;
    const beat = (t0, k = 7) => (t >= t0 ? exp(-(t - t0) * k) : 0); // pulso que decae tras t0
    const wrap = (x, span) => ((((x + span / 2) % span) + span) % span) - span / 2;

    // ---------- cámara ----------
    const hits = [[0.5, 0.6], [1, 0.6], [1.55, 1], [2, 0.5], [2.5, 1], [3.05, 1.3], [3.5, 0.6], [4, 0.9], [4.55, 1], [5, 1], [5.5, 1.2]];
    let sh = 0; for (const [h, a] of hits) if (t >= h) sh += a * exp(-(t - h) * 10);
    const cubeMid = sin(prog(t, 1.24, 1.68) * PI);
    const endP = ease.inCubic(prog(t, 5.3, 6));
    const push = [0, 1.5, 3, 4.5].reduce((s, b) => s + (t >= b ? 0.45 * (1 - exp(-(t - b) * 1.2)) * (t < b + 1.5 ? 1 : 0) : 0), 0); // travelling lento hacia dentro en cada golpe
    camera.position.set(0.2 * sin(t * 1.05 + 0.4) + sh * 0.07 * noise1(t * 38, 1), 0.13 * sin(t * 1.3 + 1) + sh * 0.07 * noise1(t * 38, 2), 10.25 - push + cubeMid * 1.7 - endP * 2.0);
    camera.lookAt(0, 0.04 * sin(t * 0.7), 0); camera.rotation.z += 0.014 * sin(t * 1.4) + sh * 0.012 * noise1(t * 30, 3) + endP * 0.07;

    // ---------- fondo ----------
    const red = clamp(ease.inOutCubic(prog(t, 1.3, 1.7)) - ease.inOutCubic(prog(t, 2.9, 3.15)) + ease.inOutCubic(prog(t, 4.28, 4.52)));
    this.bgRed.material.opacity = red;
    const pulse = 0.5 + 0.5 * cos(t * PI * 4); // 120 BPM
    this.rays.rotation.z = t * 0.35; this.rays.material.opacity = 0.12 + 0.06 * pulse + 0.06 * red + 0.4 * endP; this.rays.scale.setScalar(1 + 0.04 * pulse);
    this.mandalas.forEach((m, i) => { m.rotation.z = (i ? -0.5 : 0.8) * t; m.userData.h.rotation.set(0.35 * sin(t * 0.9 + i), 0.45 * sin(t * 0.7 + i * 2), 0); m.material.opacity = (i ? 0.13 : 0.26) + 0.22 * (sh > 1 ? 1 : sh) + 0.3 * endP; m.scale.setScalar(1 + 0.06 * (sh > 1 ? 1 : sh)); });
    this.beams.forEach((b, i) => { b.rotation.z = b.userData.a + 0.12 * sin(t * 1.1 + b.userData.ph); b.material.opacity = 0.07 + 0.05 * sin(t * 2.3 + b.userData.ph) + 0.2 * endP; });
    for (const c of this.clouds) { const d = c.userData; c.position.set(wrap(d.x0 + d.v * (t + 3), d.span), d.y + 0.08 * sin(t + d.x0), d.z); }
    for (const c of this.fg) { const d = c.userData, k = (10 - d.z) / 10; const p = P(540, d.py + 14 * sin(t * 1.3 + d.x0 * 3), d.z); c.position.set(wrap(d.x0 + d.v * (t + 2), d.span) * k, p.y, d.z); c.scale.setScalar(k); }
    this.lanterns.forEach((l) => { l.rotation.z = 0.13 * sin(t * 2.1 + l.userData.ph) + sh * 0.03; l.userData.gl.material.opacity = 0.45 + 0.2 * pulse; });
    for (const { pts, data } of this.dust) { const pa = pts.geometry.attributes.position; data.forEach((d, i) => { pa.setXYZ(i, d.x + d.a * sin(t * d.f + d.ph), wrap(d.y + (t + 2) * d.v * (1 + endP * 3), 12), d.z); }); pa.needsUpdate = true; }

    // ---------- transiciones ----------
    const cw = Math.max(0, t - 1.68);
    const cube = ease.inOutCubic(prog(t, 1.24, 1.68)) + 0.035 * exp(-cw * 9) * sin(cw * 26);
    const zoom = ease.inCubic(prog(t, 2.7, 3.06));
    const piv = this.pivot; piv.rotation.y = (-cube * PI) / 2;
    // zoom a través de la pantalla del examinador: el móvil 2 viene hacia la cámara hasta atravesarla
    const ph2 = this.p2.userData.home; piv.position.set(lerp(0, -ph2.x + camera.position.x, zoom), lerp(0, -ph2.y + camera.position.y - 0.3, zoom), -this.RC + zoom * (camera.position.z + 0.2));
    piv.rotation.z = zoom * 0.22;
    this.b1.visible = t < 1.7; this.b2.visible = t > 1.22 && t < 3.07; piv.visible = t < 3.07;
    this.b3.visible = t > 2.9 && t < 4.6; this.b4.visible = t > 4.24;
    const in3 = ease.outExpo(prog(t, 2.95, 3.4)); const out3 = ease.inCubic(prog(t, 4.2, 4.56));
    this.b3.position.set(-out3 * 6.5, out3 * 0.4, lerp(-34, 0, in3) + out3 * 1.5); this.b3.rotation.set(0, -out3 * 1.1 + (1 - in3) * 0.5, (1 - in3) * -0.5 + out3 * 0.15);
    const in4 = ease.outExpo(prog(t, 4.3, 4.74));
    this.b4.position.set((1 - in4) * 6.5, 0, 0); this.b4.rotation.y = (1 - in4) * 1.0;
    const wp = prog(t, 4.12, 4.7); this.wipe.visible = wp > 0 && wp < 1; this.wipe.position.set(lerp(6.6, -6.6, wp), 0.2 * sin(wp * 5), 5); this.wipe.rotation.z = -0.12;

    // ===== GOLPE 1 =====
    if (this.b1.visible) {
      this.animHead(this.h1, t + 0.1, 1);
      const a = spring(t + 0.22, 2.6, 6.5), p = this.p1, hm = p.userData.home;
      p.position.set(hm.x + (1 - a) * 3.2, hm.y + 0.05 * sin(t * 2.4), 0.05 + 0.2 * beat(1.0)); p.rotation.set(0.05 * sin(t * 1.9), -0.36 + (1 - a) * -1.5 + 0.13 * sin(t * 2.1), 0.035 + 0.02 * sin(t * 1.5));
      this.glare(p, t - 0.25); this.c1.position.copy(p.position); this.spinComets(this.c1, t);
      const m = this.m1, am = spring(t + 0.2, 2.8, 6), hp = m.userData.home;
      const hop = Math.abs(sin(t * PI * 2)) * 0.08;
      m.position.set(hp.x - (1 - am) * 2.4, hp.y + hop, hp.z); m.scale.setScalar((0.55 + 0.45 * am) * (1 + 0.07 * beat(0.5) + 0.07 * beat(1))); m.rotation.z = 0.05 * sin(t * PI * 2 + 0.6) - (1 - am) * 0.5; m.rotation.y = 0.2 * sin(t * 2.2);
      m.userData.glow.material.opacity = 0.6 + 0.25 * pulse;
      this.v1.forEach((r, i) => { const q = (((t * 1.7 + i / 5) % 1) + 1) % 1; r.scale.setScalar(S(110) + q * S(520)); r.material.opacity = (1 - q) * Math.min(1, q * 6) * prog(t, 0.05, 0.3); r.rotation.z = -0.1; });
      const pop = (g, t0, dir) => { const u = t - t0; g.visible = u >= 0; if (u < 0) return; const s = spring(u, 3.4, 6.5) * (1 + 0.12 * beat(1.0)); g.scale.setScalar(Math.max(0.0001, s)); g.rotation.set(0.12 * sin(t * 3 + dir), dir * (0.75 * exp(-u * 5) + 0.2) + 0.14 * sin(t * 2.6 + dir), -dir * 0.06 + 0.25 * dir * exp(-u * 6) * cos(u * 20)); this.setFlare(g.userData.fl, 0.9 * exp(-u * 7)); };
      pop(this.bub1, 0.22, 1); pop(this.bub2, 0.5, -1);
    }

    // ===== GOLPE 2 =====
    if (this.b2.visible) {
      const u = t - 1.5;
      this.animHead(this.h2, u - 0.08, -1); this.h2.visible = zoom < 0.5;
      const p = this.p2, hm = p.userData.home;
      p.position.set(hm.x, hm.y + 0.04 * sin(t * 2.3), 0.05); p.rotation.set(0.04 * sin(t * 2), (0.3 + 0.11 * sin(t * 2.2 + 1)) * (1 - zoom), -0.03 * (1 - zoom));
      this.glare(p, u - 0.25); this.c2.visible = zoom < 0.2; this.spinComets(this.c2, t);
      const sc = this.score; const done = beat(2.5), k9 = 0.91;
      sc.visible = u > 0.1 && zoom < 0.35; sc.scale.setScalar(Math.max(0.0001, spring(u - 0.1, 3.2, 6.5)) * k9 * (1 + 0.18 * done + 0.05 * beat(2.0))); sc.rotation.set(0.12 * sin(t * 2.1), -0.3 + 0.22 * sin(t * 2.5), 0);
      const f = ease.inOutCubic(prog(t, 1.72, 2.5));
      this.fill.geometry.setDrawRange(0, Math.round(f * 120) * 6);
      const ang = PI / 2 - f * TAU, rm = S(143); this.fillTip.position.set(cos(ang) * rm, sin(ang) * rm, 0.04); this.fillTip.material.opacity = f > 0.01 && f < 0.995 ? 1 : 0; this.fillTip.scale.setScalar(1 + 0.3 * sin(t * 40));
      this.scoreGlow.material.opacity = 0.35 + 0.35 * f + 0.6 * done; this.mic.scale.setScalar(1 + 0.07 * pulse + 0.2 * done);
      this.setFlare(this.scFlare, t >= 2.5 ? exp(-(t - 2.5) * 5) : 0);
      const d = t - 2.5; this.sparks.forEach((s) => { const q = d < 0 ? 0 : 1 - exp(-d * 5); const rr = S(150) + q * s.userData.v; s.position.set(cos(s.userData.a) * rr, sin(s.userData.a) * rr, 0.05); s.material.opacity = d < 0 ? 0 : exp(-d * 4); s.scale.setScalar(1.5 - q * 0.6); });
      this.scRings.forEach((r, i) => { const q = prog(t, 2.5 + i * 0.08, 3.0 + i * 0.08); r.scale.setScalar(S(170) + ease.outCubic(q) * S(420)); r.material.opacity = q > 0 ? (1 - q) * 0.95 : 0; r.position.z = 0.04; });
      this.micWaves.forEach((r, i) => { const q = (((u * 1.4 + i / 4) % 1) + 1) % 1; r.scale.setScalar(S(180) + q * S(190)); r.material.opacity = (1 - q) * Math.min(1, q * 5) * 0.55 * (t < 2.5 ? 1 : 0); r.position.z = -0.03; });
      const env = prog(u, 0.1, 0.35) * (1 - zoom);
      this.waveG.visible = zoom < 0.35; this.waveG.rotation.y = -0.3 + 0.22 * sin(t * 2.5); this.waveG.scale.setScalar(k9);
      this.bars.forEach((b, i) => { const d2 = b.userData; const h = (0.16 + 0.84 * Math.abs(noise1(t * 9 + d2.ph, i)) * (0.7 + 0.3 * sin(t * PI * 4 + i * 0.5))) * d2.w * 2.7 * env + 0.3 * done * d2.w; b.scale.set(1, Math.max(0.05, h), 1); });
      this.barGlow.material.opacity = 0.4 * env;
    }

    // ===== GOLPE 3 =====
    if (this.b3.visible) {
      const u = t - 3;
      this.animHead(this.h3, u - 0.1, 1);
      const p = this.p3, hm = p.userData.home; p.position.set(hm.x, hm.y + 0.04 * sin(t * 2.2), 0); p.rotation.set(0.04 * sin(t * 2), -0.1 + 0.14 * sin(t * 2.4), 0.015); p.scale.setScalar(1 + 0.03 * beat(3.5) + 0.04 * beat(4));
      this.glare(p, u - 0.35); this.c3.position.copy(p.position); this.spinComets(this.c3, t);
      const side = (ph, dir) => { const hb = ph.userData.home, ab = spring(u - 0.05, 2.6, 6); ph.position.set(hb.x - dir * (1 - ab) * 1.1 + dir * 0.05 * sin(t * 2), hb.y + 0.06 * sin(t * 1.9 + dir), hb.z); ph.rotation.set(0, -dir * (0.5 + 0.1 * sin(t * 2 + dir)), -dir * 0.1 * ab); };
      side(this.p3b, -1); side(this.p3c, 1);
      this.w3.forEach((r, i) => { const q = (((u * 1.5 + i / 5) % 1) + 1) % 1; r.scale.setScalar(S(330) + q * S(800)); r.material.opacity = (1 - q) * Math.min(1, q * 5) * 0.8; });
      this.syl.forEach((g, i) => {
        const d = g.userData, v = u - d.t0; g.visible = v > 0; if (v <= 0) return;
        const a = ease.outBack(prog(v, 0, 0.42), 2.2), a1 = Math.min(1, a), drift = Math.max(0, v - 0.42);
        g.position.lerpVectors(d.from, d.to, a); g.position.x *= 1 + drift * 0.02; g.position.z += drift * 0.25 + 0.5 * out3; g.position.y += 0.07 * sin(t * 3 + d.ph);
        g.scale.setScalar(Math.max(0.001, (0.25 + 0.75 * a1) * (1 + 0.2 * beat(4) + (i === 2 ? 0.22 : 0.07) * beat(3.5))));
        g.rotation.set(0.28 * sin(t * 2.3 + d.ph), (1 - a1) * 3.2 + 0.5 * sin(t * 2.7 + d.ph * 2), 0.1 * sin(t * 2 + d.ph) + (i % 2 ? 0.08 : -0.08));
        d.ring.forEach((r, j) => { const q = (((v * 1.6 + j * 0.5) % 1) + 1) % 1; r.scale.setScalar(d.rs * (0.55 + q * 0.75)); r.material.opacity = (1 - q) * 0.55; r.position.z = -0.2 * d.rs; });
      });
    }

    // ===== GOLPE 4 =====
    if (this.b4.visible) {
      const u = t - 4.5;
      this.animHead(this.h4, u - 0.08, -1); this.h4.scale.multiplyScalar(1 + 0.05 * beat(5) + 0.06 * beat(5.5));
      const open = spring(u + 0.02, 2.4, 5.2) * (1 + 0.1 * beat(5) + endP * 0.45);
      const sway = 0.05 * sin(u * 4.2);
      const pv = P(500, 2420), rad = S(1420);
      for (const g of this.fanPhones) {
        const i = g.userData.i, ang = (i * 0.165 + sway) * open;
        g.position.set(pv.x + sin(ang) * rad, pv.y + cos(ang) * rad + 0.05 * sin(t * 3 + i), -Math.abs(i) * 0.38 + (i === 0 ? 0.15 * beat(5) : 0) + endP * (0.5 - Math.abs(i) * 0.4));
        g.rotation.set(0.05 * sin(t * 2 + i), -ang * 2.2 + 0.12 * sin(t * 2.4 + i), -ang);
        this.glare(g, u - 0.3 - Math.abs(i) * 0.08);
      }
      this.burst.rotation.z = t * 0.9; this.burst.material.opacity = 0.16 + 0.4 * (beat(4.55, 4) + beat(5, 4) + beat(5.5, 4)) + 0.4 * endP; this.burst.scale.setScalar(0.85 + 0.25 * (beat(5, 5) + beat(5.5, 5)) + endP * 0.5);
      const m = this.m4, hp = m.userData.home, am = spring(u - 0.05, 3, 6);
      const jump = Math.abs(sin(u * PI * 2)) * 0.34 * prog(u, 0.1, 0.4);
      m.position.set(hp.x, hp.y - (1 - am) * 1.6 + jump, hp.z); m.scale.setScalar((0.6 + 0.4 * am) * (1 + 0.08 * beat(5) + 0.08 * beat(5.5) + endP * 0.22)); m.rotation.z = 0.1 * sin(u * PI * 2); m.rotation.y = 0.28 * sin(u * 3);
      m.userData.glow.material.opacity = 0.65 + 0.3 * pulse;
      const o = P(500, 1060), D = this.dummy, starts = [4.52, 5.0, 5.5];
      for (let i = 0; i < this.NC; i++) {
        const c = this.confD[i], v = t - starts[c.burst];
        if (v <= 0) { D.position.set(0, 0, -50); D.scale.setScalar(0.0001); }
        else { const k = (1 - exp(-2.4 * v)) / 2.4; D.position.set(o.x + c.vx * k, o.y + c.vy * k - 1.5 * v * v, 0.4 + c.vz * k); D.rotation.set(c.rx * v + c.ph, c.ry * v, c.ph); D.scale.setScalar(c.s * Math.min(1, v * 14)); }
        D.updateMatrix(); this.conf.setMatrixAt(i, D.matrix);
      }
      this.conf.instanceMatrix.needsUpdate = true;
    }

    // ---------- destello a pantalla completa (solo zoom y final; los impactos usan destellos 3D locales) ----------
    let f = 0; const add = (t0, amp, pre = 0, k = 8) => { const d = t - t0; f += amp * (d < 0 ? (pre ? prog(d, -pre, 0) ** 2 : 0) : exp(-d * k)); };
    add(1.5, 0.22, 0.12, 9); add(2.5, 0.1); add(3.03, 1.0, 0.2, 6.5); add(4, 0.08); add(5, 0.1); add(5.5, 0.12);
    f = Math.min(1, f + 0.85 * endP);
    this.flash.style.background = `radial-gradient(ellipse 85% 65% at 47% 46%, rgba(255,248,224,${f.toFixed(3)}) 0%, rgba(255,214,120,${(f * 0.85).toFixed(3)}) 50%, rgba(220,60,30,${(f * 0.55).toFixed(3)}) 100%)`;

    renderer.render(scene, camera);
  },
};
