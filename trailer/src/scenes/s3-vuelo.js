// s3-vuelo · 6 s · El Rey Mono recorre China en su nube y aparece EL dragón dorado (uno solo, el del clip).
// Montaje: pergamino colgante 3D (rollos, brocado, filete de oro) con recorte cuadrado del clip que sigue al mono;
// detrás, el mismo fotograma desenfocado a toda altura con nubes, rayos y chispas en parallax. Cortes cada 0,5 s.
const DUR = 6;
const CX = 510, CY = 702;          // centro del pergamino en px de pantalla
const WIN = 880;                   // lado de la ventana (px)
const MOUNT_W = 944, STRIP = 44;   // montura de brocado
const CAMZ = 960 / Math.tan((35 / 2) * Math.PI / 180); // a esta distancia 1 unidad = 1 px en z=0

// Planos: [t0, t1, fotograma inicial, fotograma final, zoom inicial, zoom final]
const SHOTS = [
  [0.0, 1.0, 46, 82, 1.0, 1.1],     // primer plano del mono
  [1.0, 1.5, 94, 124, 1.12, 1.0],   // templo
  [1.5, 2.0, 130, 158, 1.0, 1.1],   // Buda en la roca
  [2.0, 2.5, 166, 196, 1.12, 1.0],  // río
  [2.5, 3.0, 204, 228, 1.0, 1.08],  // primer plano sobre el río
  [3.0, 3.5, 246, 281, 1.1, 1.0],   // pagoda
  [3.5, 6.0, 283, 395, 1.0, 1.0],   // el dragón
];
const CUTS = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
// centro horizontal del recorte (fracción del ancho del clip) por fotograma
const TRACK = [[46, 0.6], [61, 0.58], [67, 0.53], [73, 0.48], [82, 0.53], [94, 0.57], [124, 0.56], [130, 0.44], [158, 0.42], [166, 0.5], [196, 0.48],
  [204, 0.47], [217, 0.44], [228, 0.44], [246, 0.52], [281, 0.5], [283, 0.5], [300, 0.52], [319, 0.555], [340, 0.585], [362, 0.6], [380, 0.62], [395, 0.64]];
// posición del sol en el clip (fracción x, y) por fotograma: de ahí nacen los rayos que desbordan el marco
const SUN = [[46, 0.33, 0.27], [82, 0.42, 0.3], [94, 0.32, 0.12], [124, 0.38, 0.2], [130, 0.4, 0.06], [158, 0.44, 0.06], [166, 0.53, 0.2], [196, 0.47, 0.22],
  [204, 0.32, 0.2], [228, 0.3, 0.2], [246, 0.56, 0.3], [281, 0.6, 0.32], [283, 0.65, 0.33], [319, 0.72, 0.39], [340, 0.7, 0.45], [370, 0.625, 0.525], [395, 0.6, 0.55]];
function track(tab, f, k = 1) {
  if (f <= tab[0][0]) return tab[0][k];
  for (let i = 1; i < tab.length; i++) if (f <= tab[i][0]) { const a = tab[i - 1], b = tab[i]; return a[k] + (b[k] - a[k]) * ((f - a[0]) / (b[0] - a[0] || 1)); }
  return tab[tab.length - 1][k];
}
const GOLD_FACE = "linear-gradient(180deg,#fffbe8 0%,#ffe9a8 24%,#f2c14e 47%,#b9800f 60%,#ffe39a 76%,#a86c08 100%)";

export default {
  async setup(root, kit) {
    const { THREE, PAL, FONT, el } = kit;
    root.style.background = PAL.noche;
    const three = (this.three = kit.makeThree(root, { alpha: false, fov: 35 }));
    const { scene, camera, renderer } = three;
    renderer.toneMapping = THREE.NoToneMapping;
    camera.near = 100; camera.far = 12000; camera.position.set(0, 0, CAMZ); camera.updateProjectionMatrix();
    scene.background = new THREE.Color(0x0b0a1e);
    this.seq = kit.sequence("vuelo");
    const R = kit.rng(303);
    const [nubeTx, esquinaTx] = await Promise.all([kit.loadTexture(kit.asset("theme/nube-oro.png")), kit.loadTexture(kit.asset("theme/barra-esquina.png"))]);
    await kit.fontReady(`800 46px ${FONT.latinMod}`, "A1B2");
    const glow = kit.glowTexture(128, "255,224,150"), glowW = kit.glowTexture(128, "255,246,216");
    const add = (map, opacity = 1, extra = {}) => new THREE.MeshBasicMaterial({ map, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, ...extra });

    // ---- fondo: el mismo fotograma, ampliado, desenfocado y oscurecido
    this.bgC = document.createElement("canvas"); this.bgC.width = 180; this.bgC.height = 320; this.bgG = this.bgC.getContext("2d");
    this.bgTx = new THREE.CanvasTexture(this.bgC); this.bgTx.colorSpace = THREE.SRGBColorSpace;
    this.bg = new THREE.Mesh(new THREE.PlaneGeometry(2250, 4000), new THREE.MeshBasicMaterial({ map: this.bgTx, toneMapped: false, depthWrite: false }));
    this.bg.position.z = -1500; this.bg.renderOrder = -10; scene.add(this.bg);

    // ---- rayos de sol (textura cónica) : una capa detrás del pergamino y otra delante que desborda el marco
    const rayTx = (seed, n) => kit.canvasTexture(1024, 1024, (g) => {
      const r = kit.rng(seed); g.translate(512, 512);
      for (let i = 0; i < n; i++) {
        const a = r() * Math.PI * 2, w = 0.012 + r() * 0.05, len = 300 + r() * 212, al = 0.25 + r() * 0.6;
        const gr = g.createRadialGradient(0, 0, 0, 0, 0, len); gr.addColorStop(0, `rgba(255,240,200,${al})`); gr.addColorStop(0.35, `rgba(255,214,130,${al * 0.5})`); gr.addColorStop(1, "rgba(255,190,90,0)");
        g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, len, a - w, a + w); g.closePath(); g.fill();
      }
      const c = g.createRadialGradient(0, 0, 0, 0, 0, 512); c.addColorStop(0, "rgba(255,246,216,0.9)"); c.addColorStop(0.12, "rgba(255,220,140,0.35)"); c.addColorStop(0.5, "rgba(255,200,110,0.06)"); c.addColorStop(1, "rgba(255,200,110,0)");
      g.fillStyle = c; g.fillRect(-512, -512, 1024, 1024);
    });
    this.rayBack = new THREE.Mesh(new THREE.PlaneGeometry(4400, 4400), add(rayTx(11, 26), 0.5)); this.rayBack.position.set(0, 300, -700); this.rayBack.renderOrder = -5; scene.add(this.rayBack);

    // ---- nubes auspiciosas en parallax (detrás y delante del pergamino); las de delante, ampliadas y desenfocadas
    this.clouds = [];
    const nubeSoft = kit.canvasTexture(800, 320, (g) => { g.imageSmoothingQuality = "high"; g.filter = "blur(7px) saturate(1.15)"; g.drawImage(nubeTx.image, 40, 30, 720, 252); });
    for (let i = 0; i < 22; i++) {
      const front = i >= 12; const z = front ? 150 + R() * 700 : -1200 + R() * 900; const s = front ? 3.6 + R() * 2.6 : 2 + R() * 3.2;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(200 * s, 70 * s), new THREE.MeshBasicMaterial({ map: nubeSoft, transparent: true, opacity: front ? 0.9 : 0.2 + R() * 0.3, depthWrite: false, toneMapped: false, color: front ? 0xffe2b0 : 0xd9b884 }));
      const yBand = front ? -650 - R() * 200 : -1100 + R() * 2200;
      m.position.set(0, yBand, z); if (R() > 0.5) m.scale.x = -1; m.renderOrder = front ? 30 : -4; scene.add(m);
      this.clouds.push({ m, x0: front ? (i - 12) * 360 + R() * 120 : R() * 3600, v: (front ? 300 + (z - 150) * 0.5 : 150) + R() * 100, ph: R() * 6.28 });
    }

    // ---- pergamino colgante 3D
    const G = (this.win = new THREE.Group()); G.position.set(CX - 540, 960 - CY, 0); scene.add(G);
    this.pend = new THREE.Group(); scene.add(this.pend); this.pend.add(G); // (pivote para el balanceo)
    scene.add(new THREE.AmbientLight(0xfff0dc, 1.5));
    const dl = new THREE.DirectionalLight(0xfff0d0, 2.2); dl.position.set(-400, 700, 1200); scene.add(dl);
    this.pl = new THREE.PointLight(0xffd27a, 3, 0, 0); this.pl.position.set(0, 0, 500); scene.add(this.pl);
    const gold = new THREE.MeshPhongMaterial({ color: 0xe0a93a, specular: 0xfff2c0, shininess: 70, emissive: 0x5a3a05 });
    const lacq = new THREE.MeshPhongMaterial({ color: 0xa30e24, specular: 0xffb090, shininess: 90, emissive: 0x2a0308 });
    const wood = new THREE.MeshPhongMaterial({ color: 0x3a120c, specular: 0xd08050, shininess: 60, emissive: 0x120403 });
    const bar = (w, h, d, mat, x, y, z = 0) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); G.add(m); return m; };
    const brocade = kit.canvasTexture(256, 256, (g) => {
      g.fillStyle = "#121640"; g.fillRect(0, 0, 256, 256);
      g.strokeStyle = "rgba(242,193,78,0.5)"; g.lineWidth = 2;
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { const cx = x * 64 + 32, cy = y * 64 + 32; g.beginPath(); g.moveTo(cx, cy - 26); g.lineTo(cx + 26, cy); g.lineTo(cx, cy + 26); g.lineTo(cx - 26, cy); g.closePath(); g.stroke(); g.beginPath(); g.arc(cx, cy, 9, 0, 6.3); g.stroke(); g.fillStyle = "rgba(200,16,46,0.75)"; g.beginPath(); g.arc(cx, cy, 4, 0, 6.3); g.fill(); }
    });
    brocade.wrapS = brocade.wrapT = THREE.RepeatWrapping; brocade.repeat.set(MOUNT_W / 128, (WIN + STRIP * 2) / 128);
    const mount = new THREE.Mesh(new THREE.BoxGeometry(MOUNT_W, WIN + STRIP * 2, 10), [lacq, lacq, lacq, lacq, new THREE.MeshPhongMaterial({ map: brocade, specular: 0x9a7a40, shininess: 30 }), wood]);
    mount.position.z = -6; G.add(mount);
    // imagen nítida
    this.imC = document.createElement("canvas"); this.imC.width = this.imC.height = WIN; this.imG = this.imC.getContext("2d"); this.imG.imageSmoothingQuality = "high";
    this.imTx = new THREE.CanvasTexture(this.imC); this.imTx.colorSpace = THREE.SRGBColorSpace; this.imTx.anisotropy = 8;
    const img = new THREE.Mesh(new THREE.PlaneGeometry(WIN, WIN), new THREE.MeshBasicMaterial({ map: this.imTx, toneMapped: false })); img.position.z = 0.5; G.add(img);
    // filete de oro + canto de laca
    const h = WIN / 2;
    bar(WIN + 28, 14, 20, gold, 0, h + 7, 6); bar(WIN + 28, 14, 20, gold, 0, -h - 7, 6); bar(14, WIN, 20, gold, -h - 7, 0, 6); bar(14, WIN, 20, gold, h + 7, 0, 6);
    bar(10, WIN + STRIP * 2, 26, lacq, -MOUNT_W / 2 - 3, 0, 2); bar(10, WIN + STRIP * 2, 26, lacq, MOUNT_W / 2 + 3, 0, 2);
    for (const [sx, sy] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { // esquinas doradas
      const c = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), new THREE.MeshBasicMaterial({ map: esquinaTx, transparent: true, depthWrite: false, toneMapped: false }));
      c.position.set(sx * (h - 70), sy * (h - 70), 3); c.scale.set(-sx, sy, 1); c.renderOrder = 2; G.add(c);
    }
    // rollos (arriba y abajo) con pomos de oro
    const roller = (y, r, len) => {
      const g = new THREE.Group(); g.position.set(0, y, 10); G.add(g);
      const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 28), lacq); c.rotation.z = Math.PI / 2; g.add(c);
      for (const s of [-1, 1]) {
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(r + 7, r + 7, 30, 28), gold); cap.rotation.z = Math.PI / 2; cap.position.x = s * (len / 2 + 13); g.add(cap);
        const knob = new THREE.Mesh(new THREE.SphereGeometry(r + 3, 20, 14), gold); knob.position.x = s * (len / 2 + 36); knob.scale.x = 0.75; g.add(knob);
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(r + 3, r + 3, 8, 28), gold); ring.rotation.z = Math.PI / 2; ring.position.x = s * (len / 2 - 70); g.add(ring);
      }
    };
    roller(h + STRIP + 14, 19, MOUNT_W + 16); roller(-h - STRIP - 18, 25, MOUNT_W + 30);
    // cordón dorado del que cuelga
    for (const s of [-1, 1]) { const c = bar(6, 520, 6, gold, s * 190, h + STRIP + 14 + 235, 4); c.rotation.z = s * 0.72; }
    // plaquita «A1 → B2»
    const tagTx = kit.canvasTexture(520, 180, (g) => {
      const rr = (x, y, w, hh, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + hh, r); g.arcTo(x + w, y + hh, x, y + hh, r); g.arcTo(x, y + hh, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
      const lg = g.createLinearGradient(0, 0, 0, 180); lg.addColorStop(0, "#d51a37"); lg.addColorStop(1, "#7d0a1c");
      g.shadowColor = "rgba(0,0,0,0.6)"; g.shadowBlur = 14; g.shadowOffsetY = 6; rr(16, 12, 488, 146, 30); g.fillStyle = lg; g.fill(); g.shadowColor = "transparent";
      const gg = g.createLinearGradient(0, 12, 0, 158); gg.addColorStop(0, "#fff0b8"); gg.addColorStop(0.5, "#f2c14e"); gg.addColorStop(1, "#b9800f");
      g.lineWidth = 7; g.strokeStyle = gg; g.stroke(); rr(30, 26, 460, 118, 20); g.lineWidth = 2; g.strokeStyle = "rgba(255,233,168,0.7)"; g.stroke();
      g.fillStyle = gg; g.font = `800 76px ${FONT.latinMod}`; g.textBaseline = "middle"; g.textAlign = "center";
      g.fillText("A1", 138, 88); g.fillText("B2", 386, 88);
      g.lineWidth = 9; g.lineCap = "round"; g.lineJoin = "round"; g.beginPath(); g.moveTo(224, 86); g.lineTo(296, 86); g.moveTo(274, 64); g.lineTo(298, 86); g.lineTo(274, 108); g.stroke(); // flecha →
    });
    this.tag = new THREE.Mesh(new THREE.PlaneGeometry(312, 108), new THREE.MeshBasicMaterial({ map: tagTx, transparent: true, toneMapped: false, depthWrite: false }));
    this.tag.renderOrder = 6; G.add(this.tag);
    // rayos que salen del marco + resplandor del sol (dentro del grupo: se inclinan con el pergamino)
    this.rayFront = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), add(rayTx(23, 18), 0.3, { depthTest: false })); this.rayFront.renderOrder = 8; G.add(this.rayFront);
    this.flare = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), add(glowW, 0, { depthTest: false })); this.flare.renderOrder = 9; G.add(this.flare);
    this.cutFlash = new THREE.Mesh(new THREE.PlaneGeometry(WIN, WIN), new THREE.MeshBasicMaterial({ color: 0xfff0c8, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); this.cutFlash.position.z = 1.5; this.cutFlash.renderOrder = 3; G.add(this.cutFlash);

    // ---- estela dorada que orbita el pergamino (pasa por delante y por detrás)
    this.trail = [];
    for (let i = 0; i < 110; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), add(i < 3 ? glowW : glow, 1)); m.renderOrder = 12; scene.add(m); this.trail.push(m); }
    // ---- chispas con profundidad
    const N = (this.N = 320); this.sp = []; const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) this.sp.push({ x: R() * 3400, y: (R() - 0.5) * 2600, z: -1100 + R() * 1900, v: 260 + R() * 700, ph: R() * 6.28, a: 20 + R() * 60 });
    const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.points = new THREE.Points(pg, new THREE.PointsMaterial({ map: glow, size: 26, sizeAttenuation: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    this.points.renderOrder = 11; this.points.frustumCulled = false; scene.add(this.points);
    // ---- líneas de velocidad
    this.streaks = [];
    for (let i = 0; i < 46; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), add(glow, 0.5)); m.renderOrder = 10; scene.add(m);
      this.streaks.push({ m, x: R() * 4200, y: (R() - 0.5) * 2300, z: -900 + R() * 1700, v: 2600 + R() * 2600, len: 260 + R() * 420, th: 5 + R() * 7 });
    }
    // ---- ráfaga de chispas en cada corte
    this.burst = []; const BN = 46; const bpos = new Float32Array(BN * 3);
    for (let i = 0; i < BN; i++) { const a = R() * 6.283; this.burst.push({ a, v: 380 + R() * 620, r0: 430 + R() * 60 }); }
    const bg2 = new THREE.BufferGeometry(); bg2.setAttribute("position", new THREE.BufferAttribute(bpos, 3));
    this.burstPts = new THREE.Points(bg2, new THREE.PointsMaterial({ map: glowW, size: 40, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    this.burstPts.renderOrder = 13; this.burstPts.frustumCulled = false; scene.add(this.burstPts);

    // ---- textos (DOM, oro metálico en tres capas: contorno oscuro, bisel, cara con brillo que barre)
    await Promise.all([kit.fontReady(`900 250px ${FONT.latinMod}`, "0123456789"), kit.fontReady(`900 130px ${FONT.zhSerif}`, "个单元学西班牙语"), kit.fontReady(`160px ${FONT.zhBrush}`, "游历中国")]);
    const ui = (this.ui = el("div", { position: "absolute", left: 0, top: 0, width: "1080px", height: "1920px", pointerEvents: "none" }, root));
    // sombra bajo los textos para asentarlos sobre el fondo
    this.shadow = el("div", { position: "absolute", left: 0, top: "1150px", width: "1080px", height: "770px", background: "radial-gradient(ellipse 62% 36% at 46% 28%,rgba(10,4,14,0.72) 0%,rgba(10,4,14,0.5) 55%,rgba(10,4,14,0) 100%)" }, ui);
    const goldText = (parent, text, font, stroke, style = {}) => {
      const w = el("div", { position: "relative", display: "inline-block", font, lineHeight: "1", whiteSpace: "pre", transformOrigin: "50% 60%", ...style }, parent);
      const base = { position: "absolute", left: 0, top: 0, font: "inherit", lineHeight: "inherit", letterSpacing: "inherit", whiteSpace: "pre" };
      const a = el("span", { ...base, position: "relative", display: "block", color: "#2a0408", webkitTextStroke: `${stroke}px #2a0408`, textShadow: "0 10px 26px rgba(0,0,0,0.85), 0 0 46px rgba(200,16,46,0.55)" }, w, text);
      const b = el("span", { ...base, color: "#7a4a08", webkitTextStroke: `${Math.max(2, stroke * 0.32)}px #6b3d05` }, w, text);
      const c = el("span", { ...base, color: "transparent", backgroundImage: `linear-gradient(105deg,rgba(255,255,255,0) 42%,rgba(255,255,255,0.95) 50%,rgba(255,255,255,0) 58%),${GOLD_FACE}`, backgroundSize: "300% 100%,100% 100%", backgroundRepeat: "no-repeat", webkitBackgroundClip: "text", backgroundClip: "text" }, w, text);
      return { w, face: c, set(s) { a.textContent = b.textContent = c.textContent = s; }, shine(p) { c.style.backgroundPosition = `${150 - p * 200}% 0,0 0`; } };
    };
    // bloque 1: «90» + «个单元»
    this.b1 = el("div", { position: "absolute", left: "70px", top: "1186px", width: "860px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }, ui);
    this.num = goldText(this.b1, "90", `900 300px ${FONT.latinMod}`, 24, { letterSpacing: "-14px" });
    this.num.w.style.width = "640px"; for (const s of this.num.w.children) { s.style.width = "640px"; s.style.textAlign = "center"; }
    this.uni = goldText(this.b1, "个单元", `900 88px ${FONT.zhSerif}`, 14, { writingMode: "vertical-rl", letterSpacing: "2px", transformOrigin: "50% 50%" });
    for (const s of this.uni.w.children) s.style.writingMode = "vertical-rl";
    // bloque 2: «游历中国 · 学西班牙语» en dos renglones (el punto es un rombo de laca y oro entre ambos)
    this.b2 = el("div", { position: "absolute", left: "70px", top: "1192px", width: "860px", height: "290px" }, ui);
    const l1 = el("div", { position: "absolute", left: 0, top: "0px", width: "860px", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "6px" }, this.b2);
    this.l1 = [..."游历中国"].map((ch) => goldText(l1, ch, `172px ${FONT.zhBrush}`, 16));
    this.dot = goldText(l1, "·", `900 120px ${FONT.zhSerif}`, 14, { marginLeft: "6px" });
    const l2 = (this.l2row = el("div", { position: "absolute", left: 0, top: "164px", width: "860px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", transformOrigin: "100% 50%" }, this.b2));
    this.l2 = [..."学西班牙语"].map((ch) => goldText(l2, ch, `900 122px ${FONT.zhSerif}`, 15));
    // velo de luz final
    this.veil = el("div", { position: "absolute", left: 0, top: 0, width: "1080px", height: "1920px", mixBlendMode: "screen", opacity: 0 }, root);
  },

  async update(t, kit) {
    const { THREE, clamp, lerp, prog, ease, spring, noise1 } = kit;
    const { scene, camera, renderer } = this.three;
    // ---- plano y fotograma
    let sh = SHOTS[SHOTS.length - 1]; for (const s of SHOTS) if (t >= s[0] && t < s[1]) { sh = s; break; }
    const p = prog(t, sh[0], sh[1]);
    const f = Math.round(lerp(sh[2], sh[3], p));
    const im = await this.seq.get(f - 1);
    const zoom = lerp(sh[4], sh[5], p), cw = 720 / zoom;
    const cx = clamp(track(TRACK, f) * 1280, cw / 2, 1280 - cw / 2), cy = clamp(360 + (zoom - 1) * 40, cw / 2, 720 - cw / 2);
    const g = this.imG; g.filter = "contrast(1.14) saturate(1.22)"; g.drawImage(im, cx - cw / 2, cy - cw / 2, cw, cw, 0, 0, WIN, WIN); g.filter = "none";
    const vg = g.createRadialGradient(WIN / 2, WIN / 2, WIN * 0.42, WIN / 2, WIN / 2, WIN * 0.76); vg.addColorStop(0, "rgba(20,6,4,0)"); vg.addColorStop(1, "rgba(20,6,4,0.5)"); g.fillStyle = vg; g.fillRect(0, 0, WIN, WIN);
    this.imTx.needsUpdate = true;
    // fondo desenfocado (recorte vertical del mismo fotograma, algo más abierto para que no coincida con la ventana)
    const b = this.bgG; b.filter = "blur(5px) saturate(1.7) brightness(0.8) contrast(1.2)"; const bw = 440, bx = clamp(cx + 40 - bw / 2, 0, 1280 - bw);
    b.drawImage(im, bx, 0, bw, 720, -12, -12, 204, 344); b.filter = "none";
    const dg = b.createLinearGradient(0, 0, 0, 320); dg.addColorStop(0, "rgba(11,15,60,0.5)"); dg.addColorStop(0.45, "rgba(90,10,30,0.2)"); dg.addColorStop(1, "rgba(60,6,22,0.5)"); b.fillStyle = dg; b.fillRect(0, 0, 180, 320);
    this.bgTx.needsUpdate = true;

    // ---- pulsos de ritmo
    let hit = 0, last = -1; for (const c of CUTS) if (t >= c) { hit += Math.exp(-9 * (t - c)); last = c; }
    const dLast = last < 0 ? 9 : t - last;
    const soft = [0.5, 4.0, 4.5, 5.0, 5.5].reduce((s, c) => s + (t >= c ? Math.exp(-7 * (t - c)) : 0), 0);
    const fin = ease.inCubic(prog(t, 4.4, DUR)); // empuje final

    // ---- cámara viva
    const shake = hit * 16 + fin * 7;
    camera.position.set(noise1(t * 0.7, 1) * 46 + noise1(t * 23, 3) * shake, noise1(t * 0.6, 2) * 34 + noise1(t * 27, 4) * shake, CAMZ - fin * 120);
    camera.lookAt(noise1(t * 0.5, 5) * 14, 0, 0);

    // ---- pergamino: entra ya en vuelo, se balancea, recibe un golpe en cada corte y se viene encima al final
    const G = this.win; const e = spring(t, 2.2, 5.5);
    const kick = last < 0 ? 0 : Math.exp(-7 * dLast) * Math.sin(dLast * 20) * 0.11 * (CUTS.indexOf(last) % 2 ? 1 : -1);
    G.rotation.y = lerp(-0.62, 0, e) + Math.sin(t * 1.25 + 0.5) * 0.2 * (1 - fin * 0.7) + kick;
    G.rotation.x = lerp(0.2, 0, e) + Math.sin(t * 0.95 + 1.2) * 0.045 - hit * 0.03;
    G.rotation.z = lerp(-0.07, 0, e) + Math.sin(t * 1.6) * 0.014;
    const sc = lerp(0.92, 1, e) * (1 + hit * 0.045 + soft * 0.012) * (1 + fin * 0.2);
    G.scale.setScalar(sc);
    G.position.set(CX - 540 + lerp(70, 0, e), 960 - CY + lerp(-60, 0, e) + Math.sin(t * 1.9) * 7 + fin * 46, lerp(-120, 0, e) + fin * 150);
    this.cutFlash.material.opacity = last < 0 ? 0 : 0.42 * Math.exp(-12 * dLast);
    this.pl.position.set(Math.sin(t * 1.7) * 620, 380 + Math.cos(t * 1.3) * 260, 420);
    this.pl.intensity = 2.4 + hit * 3 + fin * 3;
    // plaquita A1 → B2: cae con muelle en t=1,5 sobre la esquina superior derecha
    const tg = spring(t - 1.5, 2.6, 6);
    this.tag.visible = t >= 1.5; this.tag.position.set(270, WIN / 2 + 30 + (1 - tg) * 120, 30); this.tag.rotation.z = -0.05 + (1 - tg) * 0.5; this.tag.scale.setScalar(0.4 + 0.6 * tg);

    // ---- sol: rayos que desbordan el marco
    const sx = clamp((track(SUN, f, 1) * 1280 - cx) / cw, -0.47, 0.47) * WIN, sy = clamp((cy - track(SUN, f, 2) * 720) / cw, -0.47, 0.47) * WIN;
    this.rayFront.position.set(sx, sy, 24); this.rayFront.rotation.z = t * 0.16; this.rayFront.material.opacity = 0.1 + hit * 0.16 + soft * 0.1 + fin * 0.45;
    this.rayFront.scale.setScalar(0.8 + hit * 0.12 + fin * 0.75);
    this.flare.position.set(sx, sy, 26); const fs = 260 + hit * 130 + soft * 90 + ease.inCubic(prog(t, 5.0, DUR)) * 2600; this.flare.scale.set(fs, fs, 1); this.flare.material.opacity = 0.3 + hit * 0.15 + fin * 0.5;
    this.rayBack.rotation.z = -t * 0.1; this.rayBack.material.opacity = 0.34 + hit * 0.25 + fin * 0.4; this.rayBack.position.set(G.position.x + sx * 0.6, G.position.y + sy * 0.6 + 80, -700);

    // ---- fondo y nubes en parallax
    this.bg.position.set(-camera.position.x * 0.4 + Math.sin(t * 0.5) * 30, -camera.position.y * 0.4, -1500); this.bg.scale.setScalar(1 + hit * 0.02 + fin * 0.06);
    const speed = t + ease.inQuad(prog(t, 4.2, DUR)) * 1.6; // el viento acelera hacia el corte
    for (const c of this.clouds) { const x = (((c.x0 - c.v * speed) % 3600) + 3600) % 3600 - 1800; c.m.position.x = x; c.m.position.y += 0; c.m.rotation.z = Math.sin(t * 0.6 + c.ph) * 0.03; }
    const pa = this.points.geometry.attributes.position;
    for (let i = 0; i < this.N; i++) { const s = this.sp[i]; pa.setXYZ(i, (((s.x - s.v * speed) % 3400) + 3400) % 3400 - 1700, s.y + Math.sin(t * 1.4 + s.ph) * s.a + (speed * 40 + s.ph * 400) % 200, s.z); }
    pa.needsUpdate = true; this.points.material.opacity = 0.75 + hit * 0.25; this.points.material.size = 24 + hit * 10 + fin * 14;
    for (const s of this.streaks) {
      const x = (((s.x - s.v * speed) % 4200) + 4200) % 4200 - 2100; const k = 1 + fin * 2.2 + hit * 0.8;
      s.m.position.set(x, s.y, s.z); s.m.scale.set(s.len * k, s.th, 1); s.m.material.opacity = 0.05 + fin * 0.4 + hit * 0.22;
    }
    // ---- estela dorada
    const u0 = 0.4 + t * 2.7 + Math.max(0, t - 4.4) ** 2 * 1.5;
    for (let i = 0; i < this.trail.length; i++) {
      const m = this.trail[i], u = u0 - i * 0.03, k = 1 - i / this.trail.length;
      const rx = 560 * sc, rz = 330;
      m.position.set(G.position.x + Math.cos(u) * rx, G.position.y + Math.sin(u * 0.43 + 0.6) * 430 + Math.sin(u * 3 + i * 0.2) * 9, G.position.z + Math.sin(u) * rz + 20);
      const s = (i < 3 ? 190 - i * 30 : 16 + 74 * k * k) * (1 + hit * 0.5 + fin * 0.6); m.scale.set(s, s, 1); m.material.opacity = (i < 3 ? 0.95 : 0.75 * k);
    }
    // ---- ráfaga en cada corte
    const ba = this.burstPts.geometry.attributes.position;
    if (last >= 0 && dLast < 0.7) {
      const d = 1 - Math.exp(-5 * dLast);
      for (let i = 0; i < this.burst.length; i++) { const q = this.burst[i]; const r = (q.r0 + q.v * d) * sc; ba.setXYZ(i, G.position.x + Math.cos(q.a + last) * r, G.position.y + Math.sin(q.a + last) * r - 120 * dLast * dLast, 60 + (i % 5) * 40); }
      ba.needsUpdate = true; this.burstPts.material.opacity = Math.exp(-5.5 * dLast); this.burstPts.material.size = 46 - dLast * 30; this.burstPts.visible = true;
    } else this.burstPts.visible = false;

    renderer.render(scene, camera);

    // ---- textos
    // «90»: aparece en 0,5, cuenta 0→90 y clava el 90 en 1,0 junto a «个单元»; sale disparado en 2,85–3,0
    const out1 = ease.inCubic(prog(t, 2.82, 3.0));
    this.shadow.style.opacity = prog(t, 0.45, 0.6);
    this.b1.style.display = t >= 0.5 && t < 3.0 ? "flex" : "none";
    if (t >= 0.5 && t < 3.0) {
      const n = Math.round(90 * ease.outQuad(prog(t, 0.5, 0.97)));
      this.num.set(String(n));
      const inS = spring(t - 0.5, 3, 7), land = t >= 1 ? Math.exp(-8 * (t - 1)) * Math.cos((t - 1) * 16) : 0;
      const beat = t >= 1.5 ? hit * 0.035 : 0;
      this.num.w.style.transform = `translate(${-out1 * 900}px,${(1 - inS) * 120 + (t < 1 ? noise1(t * 40, 9) * 5 : 0)}px) scale(${(0.35 + 0.65 * inS) * (1 + land * 0.26 + beat)}) rotate(${-out1 * 14 + land * -2}deg)`;
      this.num.w.style.opacity = clamp(inS * 3) * (1 - out1 * 0.3);
      this.num.shine(prog(t, 1.0, 1.7));
      const us = spring(t - 1.0, 3.2, 7);
      this.uni.w.style.transform = `translate(${(1 - us) * 300 + out1 * 900}px,0) scale(${0.5 + 0.5 * us + beat}) rotate(${(1 - us) * 8 + out1 * 14}deg)`;
      this.uni.w.style.opacity = t >= 1 ? clamp(us * 4) : 0;
      this.uni.shine(prog(t, 1.25, 1.95));
    }
    // «游历中国» golpea carácter a carácter desde 3,0; «· 学西班牙语» entra en 3,5 con el dragón
    this.b2.style.display = t >= 3.0 ? "block" : "none";
    if (t >= 3.0) {
      const grow = 1 + fin * 0.05;
      this.l1.forEach((c, i) => {
        const s = spring(t - 3.0 - i * 0.07, 3, 7.5);
        c.w.style.transform = `translate(0,${(1 - s) * -150}px) scale(${(2.3 - 1.3 * s) * grow}) rotate(${(1 - s) * (i % 2 ? 9 : -9)}deg)`;
        c.w.style.opacity = clamp(s * 3.5); c.shine(t > 5 ? prog(t, 5.0, 5.7) : prog(t, 3.5 + i * 0.07, 4.2 + i * 0.07));
      });
      const sd = spring(t - 3.5, 3, 7); this.dot.w.style.transform = `scale(${sd * 1.0}) rotate(${(1 - sd) * 180}deg)`; this.dot.w.style.opacity = t >= 3.5 ? clamp(sd * 4) : 0;
      const s2 = spring(t - 3.5, 3, 7);
      [...this.l2].forEach((c, i) => {
        const s = spring(t - 3.5 - i * 0.045, 3.2, 7.5);
        c.w.style.transform = `translate(${(1 - s) * 220}px,${(1 - s) * 30}px) scale(${(0.4 + 0.6 * s) * grow})`;
        c.w.style.opacity = t >= 3.5 ? clamp(s * 4) : 0; c.shine(prog(t, 4.0 + i * 0.05, 4.8 + i * 0.05));
      });
      this.l2row.style.transform = `scale(${1 + (1 - s2) * 0.1})`;
    }
    // velo de luz que crece hacia el corte (el motor remata con su destello)
    const v = ease.inCubic(prog(t, 5.2, DUR));
    this.veil.style.opacity = v * 0.55;
    this.veil.style.background = `radial-gradient(ellipse 80% 60% at 58% 38%, rgba(255,246,216,1) 0%, rgba(255,214,120,0.75) 40%, rgba(200,60,30,0) 100%)`;
  },
};
