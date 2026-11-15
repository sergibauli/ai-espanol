// s4-unidades · escena de PRODUCTO (6 s). Móviles 3D con capturas reales sobre un salón de laca roja y noche,
// nubes auspiciosas, suelo espejo, y piezas reales de la lección que despegan de la pantalla hacia la cámara.
// Todo es función pura de t (sin estado acumulado).
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const DUR = 6;
const FLOOR_Y = -1.98;
const HERO_S = 1.6;
const SIDE_S = 1.36;
const GOLD_GRAD = "linear-gradient(180deg,#fffbe8 0%,#ffe9a8 20%,#f2c14e 46%,#b97f12 57%,#ffe9a8 72%,#f2c14e 100%)";
const SHINE = "linear-gradient(105deg,rgba(255,255,255,0) 42%,rgba(255,255,255,.95) 50%,rgba(255,255,255,0) 58%)";

// impulso que decae desde el golpe b
const imp = (t, b, k = 6) => (t < b ? 0 : Math.exp(-k * (t - b)));
// muelle con rebote suave (0→1) desde x=0
const spr = (x, f = 0.9, d = 3) => (x <= 0 ? 0 : 1 - Math.exp(-d * x) * Math.cos(f * Math.PI * x));
// interpolación por claves: [[t, v, ease?], …]
function kf(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, e] = keys[i];
    if (t <= t1) { const [t0, v0] = keys[i - 1]; const u = (t - t0) / (t1 - t0); return v0 + (v1 - v0) * (e ? e(u) : u); }
  }
  return keys[keys.length - 1][1];
}
function rrect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }

/** nube auspiciosa (祥云) dorada pintada a mano */
function paintCloud(g, w, h, variant) {
  const lobes = variant === 0
    ? [[0.2, 0.66, 0.1], [0.34, 0.52, 0.15], [0.52, 0.4, 0.2], [0.7, 0.54, 0.15], [0.83, 0.67, 0.09]]
    : [[0.24, 0.62, 0.13], [0.42, 0.46, 0.18], [0.6, 0.56, 0.14], [0.74, 0.66, 0.1]];
  const baseY = 0.76 * h, bx0 = 0.1 * w, bx1 = 0.92 * w, bh = 0.13 * h;
  const shapes = () => { g.beginPath(); for (const [x, y, r] of lobes) { g.moveTo(x * w + r * w, y * h); g.arc(x * w, y * h, r * w, 0, Math.PI * 2); } g.rect(bx0 + bh / 2, baseY - bh, bx1 - bx0 - bh, bh); g.moveTo(bx0 + bh, baseY - bh / 2); g.arc(bx0 + bh / 2, baseY - bh / 2, bh / 2, 0, Math.PI * 2); g.moveTo(bx1, baseY - bh / 2); g.arc(bx1 - bh / 2, baseY - bh / 2, bh / 2, 0, Math.PI * 2); };
  g.save(); g.shadowColor = "rgba(255,200,90,.55)"; g.shadowBlur = 26; g.lineJoin = "round";
  shapes(); g.strokeStyle = "#8a5a10"; g.lineWidth = 12; g.stroke(); g.restore();
  const gr = g.createLinearGradient(0, 0.15 * h, 0, baseY); gr.addColorStop(0, "#fff6d8"); gr.addColorStop(0.45, "#f8d376"); gr.addColorStop(1, "#c8961e");
  shapes(); g.fillStyle = gr; g.fill();
  // volutas
  g.strokeStyle = "#a8720f"; g.lineWidth = 5; g.lineCap = "round";
  lobes.forEach(([x, y, r], i) => { g.beginPath(); const dir = i % 2 ? -1 : 1; for (let a = 0; a <= 1; a += 0.02) { const ang = dir * (a * Math.PI * 3.1) + Math.PI * 0.9; const rr = r * w * (0.72 - 0.56 * a); const px = x * w + Math.cos(ang) * rr, py = y * h + Math.sin(ang) * rr * 0.92; a === 0 ? g.moveTo(px, py) : g.lineTo(px, py); } g.stroke(); });
  // cola
  g.beginPath(); g.moveTo(bx0 + 8, baseY - bh * 0.4); g.quadraticCurveTo(0.03 * w, baseY + 0.02 * h, 0.0, baseY - 0.02 * h); g.strokeStyle = "#f2c14e"; g.lineWidth = 7; g.stroke();
}

export default {
  async setup(root, kit) {
    const { THREE, PAL, el } = kit;
    const FONT = Object.fromEntries(Object.entries(kit.FONT).map(([k, v]) => [k, v.replace(/"/g, "'")])); // comillas simples: van dentro de style="…"
    const V3 = THREE.Vector3;
    root.style.background = PAL.lacaProfunda;
    const three = (this.three = kit.makeThree(root, { alpha: false, fov: 35 }));
    const { renderer, scene, camera } = three;
    renderer.toneMapping = THREE.NoToneMapping; // las capturas deben verse con su color real
    scene.add(camera);

    // ---------- entorno para los metales ----------
    const envTex = kit.canvasTexture(512, 256, (g) => {
      const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, "#ffe2a0"); gr.addColorStop(0.3, "#c8102e"); gr.addColorStop(0.62, "#3a0612"); gr.addColorStop(1, "#0b0f2a"); g.fillStyle = gr; g.fillRect(0, 0, 512, 256);
      for (const [x, y, r, c] of [[110, 70, 70, "255,246,216"], [330, 50, 90, "255,220,140"], [450, 120, 50, "255,180,90"], [230, 150, 40, "255,120,90"]]) { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(${c},1)`); rg.addColorStop(1, `rgba(${c},0)`); g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2); }
    });
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromEquirectangular(envTex).texture; pm.dispose();

    // ---------- fondo: laca roja que se hunde en la noche ----------
    const bgTex = kit.canvasTexture(512, 1024, (g) => {
      const gr = g.createLinearGradient(0, 0, 0, 1024); gr.addColorStop(0, "#050818"); gr.addColorStop(0.3, "#0b0f2a"); gr.addColorStop(0.44, "#2c0a2c"); gr.addColorStop(0.56, "#7d0a1e"); gr.addColorStop(0.68, "#4a0612"); gr.addColorStop(0.82, "#1c0512"); gr.addColorStop(1, "#090414"); g.fillStyle = gr; g.fillRect(0, 0, 512, 1024);
      const rg = g.createRadialGradient(256, 560, 0, 256, 560, 300); rg.addColorStop(0, "rgba(220,30,46,.7)"); rg.addColorStop(0.5, "rgba(200,16,46,.28)"); rg.addColorStop(1, "rgba(200,16,46,0)"); g.fillStyle = rg; g.fillRect(0, 0, 512, 1024);
      // estrellas en la parte alta
      const r = kit.rng(41); for (let i = 0; i < 220; i++) { const y = r() * 470; g.fillStyle = `rgba(255,236,190,${0.25 + r() * 0.6})`; g.beginPath(); g.arc(r() * 512, y, 0.5 + r() * 1.1, 0, 7); g.fill(); }
    });
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(60, 62), new THREE.MeshBasicMaterial({ map: bgTex, depthWrite: false })); bg.position.set(0, 3, -42); bg.renderOrder = -10; scene.add(bg);

    // ---------- gran halo / puerta de luna con filigrana ----------
    const haloTex = kit.canvasTexture(1024, 1024, (g) => {
      g.translate(512, 512);
      for (let i = 0; i < 72; i++) { g.save(); g.rotate((i / 72) * Math.PI * 2); const gr = g.createLinearGradient(0, -150, 0, -500); gr.addColorStop(0, "rgba(255,225,150,.0)"); gr.addColorStop(0.25, `rgba(255,215,130,${i % 2 ? 0.34 : 0.16})`); gr.addColorStop(1, "rgba(255,200,110,0)"); g.fillStyle = gr; g.beginPath(); const hw = i % 2 ? 9 : 16; g.moveTo(-2, -150); g.lineTo(2, -150); g.lineTo(hw, -500); g.lineTo(-hw, -500); g.closePath(); g.fill(); g.restore(); }
    });
    const ringTex = kit.canvasTexture(1024, 1024, (g) => {
      g.translate(512, 512); g.strokeStyle = "#ffe9a8"; g.shadowColor = "#f2c14e"; g.shadowBlur = 18;
      g.lineWidth = 9; g.beginPath(); g.arc(0, 0, 430, 0, 7); g.stroke();
      g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 400, 0, 7); g.stroke(); g.beginPath(); g.arc(0, 0, 470, 0, 7); g.stroke();
      g.shadowBlur = 6;
      for (let i = 0; i < 48; i++) { g.save(); g.rotate((i / 48) * Math.PI * 2); g.lineWidth = 4; g.strokeRect(-14, -462, 28, 22); if (i % 2 === 0) { g.beginPath(); g.arc(0, -386, 6, 0, 7); g.fillStyle = "#ffe9a8"; g.fill(); } g.restore(); }
    });
    const addMat = (map, opacity = 1, color = 0xffffff) => new THREE.MeshBasicMaterial({ map, transparent: true, opacity, color, blending: THREE.AdditiveBlending, depthWrite: false });
    this.halo = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), addMat(haloTex, 0.8)); this.halo.position.set(0, 0.3, -7); scene.add(this.halo);
    this.ring = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 8.6), addMat(ringTex, 0.75)); this.ring.position.set(0, 0.3, -6.5); scene.add(this.ring);
    this.ring2 = new THREE.Mesh(new THREE.PlaneGeometry(12.4, 12.4), addMat(ringTex, 0.1)); this.ring2.position.set(0, 0.3, -6.8); scene.add(this.ring2);
    const glowT = kit.glowTexture(256, "255,214,130"), glowR = kit.glowTexture(256, "255,70,60");
    const sprite = (map, s, opacity) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false })); sp.scale.set(s, s, 1); return sp; };
    this.backGlow = sprite(glowR, 11, 0.75); this.backGlow.position.set(0, 0.3, -6); scene.add(this.backGlow);
    this.coreGlow = sprite(glowT, 7, 0.6); this.coreGlow.position.set(0, 0.2, -1.2); scene.add(this.coreGlow);

    // ---------- nubes auspiciosas en capas ----------
    const cloudTex = [0, 1].map((v) => kit.canvasTexture(768, 384, (g) => paintCloud(g, 768, 384, v)));
    const cr = kit.rng(7); this.clouds = [];
    const cloudDefs = [
      // x, y, z, tamaño, velocidad, variante, opacidad, tinte
      [-5.2, 4.6, -16, 6.4, 0.22, 0, 0.75, 0xd08a6a], [5.6, 6.4, -18, 7.2, -0.18, 1, 0.7, 0xc07a66], [-6.4, -0.6, -14, 5.2, 0.26, 1, 0.8, 0xe0a070], [6.2, 0.9, -13, 5.0, -0.3, 0, 0.85, 0xe8aa74],
      [-3.4, 3.1, -9, 3.0, 0.34, 1, 0.95, 0xffd9a0], [3.9, 3.9, -9.5, 3.2, -0.3, 0, 0.95, 0xffd9a0], [-4.2, -1.55, -7, 3.4, 0.4, 0, 1, 0xffe2b0], [4.3, -1.5, -6.5, 3.2, -0.42, 1, 1, 0xffe2b0],
      [-2.9, -2.25, 2.6, 2.6, 0.5, 1, 1, 0xffffff], [3.0, -2.45, 3.0, 2.4, -0.55, 0, 1, 0xffffff], [-2.6, 3.2, 1.5, 1.7, 0.3, 0, 0.95, 0xffffff],
    ];
    for (const [x, y, z, s, v, variant, op, tint] of cloudDefs) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex[variant], transparent: true, opacity: op, color: tint, depthWrite: false })); sp.scale.set(s, s / 2, 1); sp.userData = { x, y, z, v, ph: cr() * 6.28 }; scene.add(sp); this.clouds.push(sp);
    }

    // ---------- suelo de laca espejo ----------
    const floorTex = kit.canvasTexture(1024, 1024, (g) => {
      g.translate(512, 512);
      const rg = g.createRadialGradient(0, 0, 0, 0, 0, 500); rg.addColorStop(0, "rgba(110,10,26,.42)"); rg.addColorStop(0.2, "rgba(80,8,20,.62)"); rg.addColorStop(0.6, "rgba(38,5,14,.9)"); rg.addColorStop(1, "rgba(20,3,12,.97)");
      g.beginPath(); g.arc(0, 0, 500, 0, 7); g.fillStyle = rg; g.fill();
      const ring = (r, w, c) => { g.beginPath(); g.arc(0, 0, r, 0, 7); g.lineWidth = w; g.strokeStyle = c; g.stroke(); };
      ring(494, 12, "#c8961e"); ring(486, 4, "#ffe9a8"); ring(468, 3, "rgba(242,193,78,.8)"); ring(410, 2, "rgba(242,193,78,.35)");
      for (let i = 0; i < 64; i++) { g.save(); g.rotate((i / 64) * Math.PI * 2); g.strokeStyle = "rgba(242,193,78,.6)"; g.lineWidth = 3; g.strokeRect(-12, -456, 24, 30); g.restore(); }
    });
    const floor = new THREE.Mesh(new THREE.CircleGeometry(6.4, 96), new THREE.MeshBasicMaterial({ map: floorTex, transparent: true, depthWrite: false })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, FLOOR_Y, 0); floor.renderOrder = 2; scene.add(floor);
    // anillos dorados grabados en el suelo
    const floorRing = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), addMat(ringTex, 0.5)); floorRing.rotation.x = -Math.PI / 2; floorRing.position.set(0, FLOOR_Y + 0.01, 0); floorRing.renderOrder = 3; scene.add(floorRing); this.floorRing = floorRing;
    this.floorGlow = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), addMat(glowT, 0.5)); this.floorGlow.rotation.x = -Math.PI / 2; this.floorGlow.position.set(0, FLOOR_Y + 0.02, 0); this.floorGlow.renderOrder = 3; scene.add(this.floorGlow);
    // onda de choque en el suelo
    this.shock = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 96), new THREE.MeshBasicMaterial({ color: 0xffe9a8, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); this.shock.rotation.x = -Math.PI / 2; this.shock.position.set(0, FLOOR_Y + 0.03, 0); this.shock.renderOrder = 4; scene.add(this.shock);

    // ---------- luces ----------
    scene.add(new THREE.AmbientLight(0xfff0e0, 0.9));
    const key = new THREE.DirectionalLight(0xffe2b0, 2.6); key.position.set(2.5, 4, 6); scene.add(key);
    const rimL = new THREE.PointLight(0xff3040, 60, 30); rimL.position.set(-5, 2, -2); scene.add(rimL);
    const rimR = new THREE.PointLight(0xffc860, 70, 30); rimR.position.set(5, 3, -2.5); scene.add(rimR);
    this.frontL = new THREE.PointLight(0xffe9a8, 0, 20); this.frontL.position.set(0, 0.4, 3.2); scene.add(this.frontL);

    // ---------- móviles (+ gemelos para el reflejo) ----------
    const mirrorRoot = new THREE.Group(); mirrorRoot.scale.y = -1; mirrorRoot.position.y = 2 * FLOOR_Y; scene.add(mirrorRoot);
    const mkPhone = async (src, scale) => {
      const p = await kit.phoneMesh(kit.asset(src), { scale }); scene.add(p);
      const m = await kit.phoneMesh(kit.asset(src), { scale }); m.userData.screen.material.color.setScalar(0.7); mirrorRoot.add(m);
      p.userData.mirror = m; return p;
    };
    this.hero = await mkPhone("screens/ruta.jpg", HERO_S);
    this.left = await mkPhone("screens/modulos.jpg", SIDE_S);
    this.right = await mkPhone("screens/modulos_modulo-1.jpg", SIDE_S);
    // pantalla de la lección real (se enciende en t=4) y barrido de brillo
    const lecImg = await kit.loadImage(kit.asset("s4-unidades/leccion.jpg"));
    const lecTex = new THREE.Texture(lecImg); lecTex.colorSpace = THREE.SRGBColorSpace; lecTex.anisotropy = 8; lecTex.needsUpdate = true;
    const sGeo = this.hero.userData.screen.geometry, sz = 0.014 * HERO_S;
    this.lesson = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({ map: lecTex, toneMapped: false })); this.lesson.position.z = sz + 0.002; this.hero.add(this.lesson);
    const bandTex = kit.canvasTexture(256, 8, (g) => { const gr = g.createLinearGradient(0, 0, 256, 0); gr.addColorStop(0.3, "rgba(255,255,255,0)"); gr.addColorStop(0.5, "rgba(255,246,216,1)"); gr.addColorStop(0.7, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 8); });
    bandTex.center.set(0.5, 0.5); bandTex.rotation = 0.55;
    const mkSweep = (phone, scale) => { const tx = bandTex.clone(); tx.needsUpdate = true; const m = new THREE.Mesh(phone.userData.screen.geometry, addMat(tx, 0)); m.position.z = 0.014 * scale + 0.004; phone.add(m); phone.userData.sweep = m; };
    mkSweep(this.hero, HERO_S); mkSweep(this.left, SIDE_S); mkSweep(this.right, SIDE_S);
    this.flash = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({ color: 0xfff2cc, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); this.flash.position.z = sz + 0.006; this.hero.add(this.flash);
    this.screenGlow = sprite(glowT, 5, 0); this.screenGlow.position.z = -0.2; this.hero.add(this.screenGlow);

    // ---------- piezas reales que despegan de la pantalla (hijas de la cámara) ----------
    const K = 1170 / 924; // de coordenadas de vista previa a píxeles reales de la captura
    const crop = (im, x, y, w, h) => [im, x * K, y * K, w * K, h * K];
    const modImg = await kit.loadImage(kit.asset("screens/modulos.jpg"));
    const m1Img = await kit.loadImage(kit.asset("screens/modulos_modulo-1.jpg"));
    const cardTex = (c, w, h, r, border = 10) => kit.canvasTexture(w, h, (g) => {
      rrect(g, 0, 0, w, h, r); const gg = g.createLinearGradient(0, 0, w, h); gg.addColorStop(0, "#fff6d8"); gg.addColorStop(0.5, "#f2c14e"); gg.addColorStop(1, "#c8961e"); g.fillStyle = gg; g.fill();
      g.save(); rrect(g, border, border, w - border * 2, h - border * 2, Math.max(4, r - border)); g.clip(); g.drawImage(c[0], c[1], c[2], c[3], c[4], border, border, w - border * 2, h - border * 2); g.restore();
    });
    const vocabT = cardTex(crop(lecImg, 150, 505, 625, 500), 800, 640, 56, 12);
    const pillT = cardTex(crop(lecImg, 238, 1206, 452, 132), 720, 210, 105, 0);
    const unitT = cardTex(crop(modImg, 57, 1080, 390, 560), 520, 746, 60, 10);
    const bubbleT = kit.canvasTexture(720, 300, (g) => {
      g.shadowColor = "rgba(60,10,10,.35)"; g.shadowBlur = 18; g.shadowOffsetY = 8;
      g.beginPath(); g.moveTo(150, 205); g.lineTo(110, 285); g.lineTo(250, 210); g.closePath(); rrect(g, 20, 20, 680, 200, 70);
      g.fillStyle = "#ffffff"; g.fill(); g.beginPath(); g.moveTo(150, 205); g.lineTo(110, 285); g.lineTo(250, 210); g.closePath(); g.fill();
      g.shadowColor = "transparent"; rrect(g, 20, 20, 680, 200, 70); g.strokeStyle = "#f2c14e"; g.lineWidth = 8; g.stroke();
      const c = crop(lecImg, 312, 1388, 302, 64); g.drawImage(c[0], c[1], c[2], c[3], c[4], 70, 62, 580, 123);
    });
    const coinT = kit.canvasTexture(512, 512, (g) => { g.beginPath(); g.arc(256, 256, 254, 0, 7); g.clip(); const c = crop(m1Img, 462 - 178, 993 - 178, 356, 356); g.drawImage(c[0], c[1], c[2], c[3], c[4], 0, 0, 512, 512); });
    const itemRoot = new THREE.Group(); camera.add(itemRoot); this.items = [];
    const plane = (tx, w, h) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, transparent: true, toneMapped: false, side: THREE.DoubleSide })); m.renderOrder = 20; return m; };
    const sw = 0.925 * HERO_S - 0.07 * HERO_S, sh = 2 * HERO_S - 0.07 * HERO_S; // tamaño de la pantalla del héroe
    const onScreen = (cx, cy) => new V3((cx / 924 - 0.5) * sw, (0.5 - cy / 2000) * sh, sz + 0.02); // punto de la captura → local del móvil
    const add = (obj, o) => { obj.visible = false; itemRoot.add(obj); this.items.push({ obj, ...o }); };
    // tarjeta de vocabulario «Hola · 你好»: despega de su sitio exacto en la pantalla
    add(plane(vocabT, 1, 0.8), { tb: 4.0, from: onScreen(462, 755), s0: (625 / 924) * sw, s1: 0.68, to: new V3(-0.2, 0.3, -4.2), ry: 0.3, rz: -0.07, seed: 1 });
    add(plane(bubbleT, 1, 300 / 720), { tb: 4.25, from: onScreen(462, 1420), s0: (360 / 924) * sw, s1: 0.5, to: new V3(0.2, 0.0, -3.6), ry: -0.32, rz: 0.06, seed: 2 });
    add(plane(pillT, 1, 210 / 720), { tb: 4.25, from: onScreen(462, 1272), s0: (452 / 924) * sw, s1: 0.44, to: new V3(-0.25, -0.13, -3.9), ry: 0.26, rz: 0.05, seed: 3, lag: 0.08 });
    add(plane(unitT, 0.697, 1), { tb: 4.5, from: onScreen(462, 900), s0: 0.1, s1: 0.5, to: new V3(0.3, -0.3, -4.3), ry: -0.36, rz: 0.08, seed: 4 });
    // moneda de la unidad (captura real) con canto dorado
    const gold = new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 1, roughness: 0.22 });
    const coin = new THREE.Group(); const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.07, 64), gold); rim.rotation.x = Math.PI / 2; coin.add(rim);
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.47, 64), new THREE.MeshBasicMaterial({ map: coinT, toneMapped: false })); face.position.z = 0.037; coin.add(face);
    const faceB = face.clone(); faceB.rotation.y = Math.PI; faceB.position.z = -0.037; coin.add(faceB);
    add(coin, { tb: 4.75, from: onScreen(462, 900), s0: 0.08, s1: 0.36, to: new V3(-0.3, -0.38, -3.8), ry: 0.4, rz: 0, seed: 5, spin: 1 });
    // discos de jade (玉璧) con aro de oro
    const jadeMat = new THREE.MeshStandardMaterial({ color: 0x35c796, metalness: 0.15, roughness: 0.12, emissive: 0x0b5a40, emissiveIntensity: 0.6 });
    const mkJade = () => { const g = new THREE.Group(); const shp = new THREE.Shape(); shp.absarc(0, 0, 0.42, 0, Math.PI * 2, false); const hole = new THREE.Path(); hole.absarc(0, 0, 0.13, 0, Math.PI * 2, true); shp.holes.push(hole); const geo = new THREE.ExtrudeGeometry(shp, { depth: 0.05, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 3, curveSegments: 48 }); geo.translate(0, 0, -0.025); g.add(new THREE.Mesh(geo, jadeMat)); const t1 = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.04, 12, 64), gold); g.add(t1); const t2 = new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.025, 10, 48), gold); g.add(t2); return g; };
    add(mkJade(), { tb: 4.75, from: onScreen(462, 900), s0: 0.08, s1: 0.3, to: new V3(0.37, 0.34, -3.9), ry: -0.5, rz: 0, seed: 6, spin: -1, lag: 0.06 });
    add(mkJade(), { tb: 4.75, from: onScreen(462, 900), s0: 0.08, s1: 0.26, to: new V3(0.08, -0.82, -3.4), ry: 0.6, rz: 0, seed: 7, spin: 1, lag: 0.12 });

    // ---------- partículas doradas ----------
    const pr = kit.rng(99); const N = 240; this.pN = N; this.pSeed = [];
    for (let i = 0; i < N; i++) this.pSeed.push([pr() * 14 - 7, pr() * 13 - 3, pr() * 16 - 11, 0.15 + pr() * 0.5, pr() * 6.28, pr()]);
    const mkPts = (size, op) => { const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N / 2 * 3), 3)); const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: glowT, size, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true })); pts.frustumCulled = false; pts.renderOrder = 30; scene.add(pts); return pts; };
    this.ptsA = mkPts(0.11, 0.9); this.ptsB = mkPts(0.24, 0.6);
    // chispas que salen de la pantalla en t=4
    const BN = 90; this.bN = BN; this.bSeed = []; for (let i = 0; i < BN; i++) { const a = pr() * 6.28, e = pr() * 0.9 + 0.15; this.bSeed.push([Math.cos(a) * e, Math.sin(a) * e * 1.5, 0.6 + pr() * 2.6, 0.5 + pr() * 0.8, pr() * 0.75]); }
    { const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(BN * 3), 3)); this.burst = new THREE.Points(geo, new THREE.PointsMaterial({ map: glowT, size: 0.16, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); this.burst.frustumCulled = false; this.burst.renderOrder = 31; scene.add(this.burst); }

    // ---------- post: bloom moderado ----------
    const rt = new THREE.WebGLRenderTarget(kit.W, kit.H, { samples: 4, type: THREE.HalfFloatType });
    this.composer = new EffectComposer(renderer, rt); this.composer.addPass(new RenderPass(scene, camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(kit.W, kit.H), 0.45, 0.6, 1.0); this.composer.addPass(this.bloom); this.composer.addPass(new OutputPass());

    // ---------- textos (DOM) ----------
    await Promise.all([
      kit.fontReady(`180px ${FONT.zhBrush}`, "个单元全程中文讲解"), kit.fontReady(`900 180px ${FONT.latinMod}`, "90A1B2"),
      kit.fontReady(`900 72px ${FONT.zhSerif}`, "词汇对话语法练习·"),
    ]);
    const ui = el("div", { position: "absolute", inset: 0 }, root);
    this.lightUp = el("div", { position: "absolute", inset: 0, opacity: 0, background: "radial-gradient(ellipse 80% 60% at 50% 52%, rgba(255,246,216,1) 0%, rgba(255,214,120,.85) 40%, rgba(255,160,60,0) 100%)", mixBlendMode: "screen" }, ui);
    const goldText = (parent, html, style = {}) => {
      const wrap = el("div", { position: "relative", display: "inline-block", whiteSpace: "nowrap", lineHeight: "1.15", ...style }, parent);
      const pad = { padding: "0.1em 0.08em" };
      el("div", { ...pad, color: "#2a0308", WebkitTextStroke: "20px #2a0308", textShadow: "0 14px 34px rgba(0,0,0,.8), 0 0 70px rgba(143,12,33,.9)" }, wrap, html);
      const abs = { position: "absolute", left: 0, top: 0, ...pad };
      el("div", { ...abs, color: "#6e3f08", WebkitTextStroke: "3px #6e3f08", transform: "translateY(7px)" }, wrap, html);
      el("div", { ...abs, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }, wrap, html);
      const shine = el("div", { ...abs, background: SHINE, backgroundSize: "300% 100%", backgroundRepeat: "no-repeat", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }, wrap, html);
      return { wrap, shine };
    };
    const row = (top) => el("div", { position: "absolute", left: "70px", width: "860px", top: top + "px", display: "flex", justifyContent: "center", alignItems: "center", transformOrigin: "50% 55%", willChange: "transform" }, ui);
    // «90 个单元»
    this.r1 = row(238);
    this.t1 = goldText(this.r1, `<span style="font:900 172px ${FONT.latinMod};letter-spacing:-0.04em;margin-right:22px">90</span><span style="font:196px ${FONT.zhBrush}">个单元</span>`);
    // «A1 → B2»
    this.r2 = row(262);
    const lvl = (s) => goldText(this.r2, `<span style="font:900 176px ${FONT.latinMod};letter-spacing:-0.03em">${s}</span>`);
    this.a1 = lvl("A1");
    this.arrow = el("div", { width: "190px", height: "120px", margin: "0 18px", flex: "none", position: "relative" }, this.r2,
      `<svg width="190" height="120" viewBox="0 0 190 120" style="position:absolute;left:0;top:0;overflow:visible"><defs><linearGradient id="s4ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset=".5" stop-color="#f2c14e"/><stop offset="1" stop-color="#b97f12"/></linearGradient></defs><path d="M6 44 H112 V14 L184 60 L112 106 V76 H6 Z" fill="url(#s4ag)" stroke="#2a0308" stroke-width="12" stroke-linejoin="round" paint-order="stroke"/></svg>`);
    this.b2 = lvl("B2");
    // cierre «全程中文讲解»
    this.r3 = row(244);
    this.t3 = goldText(this.r3, `<span style="font:138px ${FONT.zhBrush};letter-spacing:0.01em">全程中文讲解</span>`);
    // tira «词汇 · 对话 · 语法 · 练习»
    this.band = el("div", { position: "absolute", left: 0, width: "1080px", top: "1330px", height: "128px", background: "linear-gradient(180deg,#d4142f 0%,#a80d26 45%,#6d0818 100%)", boxShadow: "0 0 0 5px #f2c14e, 0 0 0 9px #6d0818, 0 0 0 12px #c8961e, 0 18px 50px rgba(0,0,0,.6)", willChange: "clip-path" }, ui);
    el("div", { position: "absolute", inset: "0", background: "repeating-linear-gradient(90deg, rgba(255,233,168,.07) 0 2px, transparent 2px 46px)" }, this.band);
    this.bandShine = el("div", { position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(255,255,255,0) 44%,rgba(255,246,216,.5) 50%,rgba(255,255,255,0) 56%)", backgroundSize: "300% 100%", backgroundRepeat: "no-repeat" }, this.band);
    const strip = el("div", { position: "absolute", left: "70px", width: "860px", top: 0, height: "128px", display: "flex", justifyContent: "center", alignItems: "center" }, this.band);
    this.words = [];
    ["词汇", "·", "对话", "·", "语法", "·", "练习"].forEach((w, i) => {
      const dot = w === "·";
      const s = el("span", { display: "inline-block", font: `900 76px ${FONT.zhSerif}`, margin: dot ? "0 16px" : "0", background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: "drop-shadow(0 4px 0 #4a0612) drop-shadow(0 0 14px rgba(0,0,0,.55))", willChange: "transform" }, strip, w);
      this.words.push({ s, tb: 4 + Math.floor((i + 1) / 2) * 0.25, dot });
    });
    this.V = { a: new V3(), b: new V3(), c: new V3() };
  },

  async update(t, kit) {
    const { THREE, ease, prog, lerp, noise1, clamp } = kit; const { camera } = this.three; const { a: va, b: vb } = this.V;
    const E = ease;
    // golpes de ritmo
    const beatsStrong = [1, 2, 3, 4, 5];
    const pulse = beatsStrong.reduce((s, b) => s + imp(t, b, 5), 0) + [2.5, 3.5, 4.25, 4.5, 4.75, 5.5].reduce((s, b) => s + 0.45 * imp(t, b, 7), 0);
    const shake = beatsStrong.reduce((s, b) => s + imp(t, b, 9), 0);
    const rush = E.inCubic(prog(t, 5.0, DUR)); // aceleración final

    // ---------- cámara ----------
    const ang = kf(t, [[0, 0.34], [1.2, 0.2, E.outCubic], [2, 0.24], [4, -0.26, E.inOutCubic], [4.7, -0.08, E.outCubic], [6, 0.05]]);
    const dist = kf(t, [[0, 10.4], [1.1, 9.05, E.outCubic], [2, 8.95], [4, 8.95], [4.55, 6.5, E.outExpo], [5.1, 6.15], [6, 3.9, E.inCubic]]);
    const camY = kf(t, [[0, -0.35], [1.2, 0.5, E.outCubic], [4, 0.55], [4.6, 0.42, E.outCubic], [6, 0.5]]);
    const lookY = kf(t, [[0, -0.25], [1.1, 0.18, E.outCubic], [4, 0.18], [4.6, 0.3, E.outCubic], [6, 0.52, E.inCubic]]);
    camera.position.set(Math.sin(ang) * dist + noise1(t * 38, 1) * 0.07 * shake, camY + noise1(t * 38, 2) * 0.07 * shake + noise1(t * 0.9, 3) * 0.04, Math.cos(ang) * dist);
    camera.lookAt(0, lookY, 0); camera.rotation.z += noise1(t * 30, 4) * 0.006 * shake - 0.05 * rush;
    camera.updateMatrixWorld(true);

    // ---------- móvil héroe ----------
    const hero = this.hero;
    const rise = spr(t + 0.12);
    const bob = Math.sin(t * 1.9) * 0.035 * prog(t, 1.2, 2);
    hero.position.set(0, -4.6 * (1 - rise) + bob - 0.06 * imp(t, 4, 6), kf(t, [[0, 0], [2, 0], [2.6, 0.25, E.outCubic], [4, 0.25], [4.5, 0, E.outCubic]]));
    const spin = (1 - E.outCubic(prog(t, -0.15, 1.0))) * -Math.PI * 2.3;
    hero.rotation.set(
      kf(t, [[0, 0.55], [1.0, 0.04, E.outCubic], [6, 0.02]]) + Math.sin(t * 1.3) * 0.015,
      kf(t, [[0, -0.34], [2, -0.34], [2.5, 0, E.outBack], [4, -0.04], [4.5, -0.2, E.outCubic], [6, -0.02, E.inOutCubic]]) + spin,
      kf(t, [[0, -0.2], [1.0, 0.05, E.outCubic], [2, 0.04], [2.5, 0, E.outCubic]]));
    // pantalla: apagada en el giro, se enciende de golpe en t=1
    const on = t < 1 ? 0.42 + 0.1 * prog(t, 0, 1) : 1;
    hero.userData.screen.material.color.setScalar(on);
    this.lesson.visible = t >= 4;
    this.flash.material.opacity = 0.4 * imp(t, 1, 7) + 0.38 * imp(t, 4, 9) + 0.12 * imp(t, 2, 9) + 0.3 * rush;
    const sweepAt = (m, t0, d = 0.55) => { const u = prog(t, t0, t0 + d); m.material.map.offset.x = lerp(0.75, -0.75, u); return u > 0 && u < 1 ? Math.sin(u * Math.PI) : 0; };
    hero.userData.sweep.material.opacity = 0.75 * Math.max(sweepAt(hero.userData.sweep, t < 2.9 ? 1.02 : t < 4.9 ? 3.0 : 5.0));
    this.screenGlow.material.opacity = (t < 1 ? 0.08 : 0.22) + 0.3 * imp(t, 1, 4) + 0.3 * imp(t, 4, 4) + 0.3 * rush;
    this.screenGlow.scale.setScalar(5.2 + 2.2 * imp(t, 1, 4) + 2.5 * imp(t, 4, 4) + 5 * rush);
    this.frontL.intensity = 6 * imp(t, 1, 3) + 8 * imp(t, 4, 3) + 3;

    // ---------- móviles laterales en abanico ----------
    const side = (p, sgn, te) => {
      p.visible = t >= te - 0.02 && t < 4.6;
      const u = spr(t - te, 1.25, 4.2), out = E.inCubic(prog(t, 3.96, 4.5));
      const fan = 0.05 * imp(t, 3, 5) + 0.04 * imp(t, 3.5, 6);
      p.position.set(sgn * (lerp(4.4, 1.1, u) + fan * 2 + out * 6.5), lerp(-2.6, -0.14, u) + Math.sin(t * 1.7 + sgn) * 0.03 + out * 0.8, lerp(-5, -1.15, u) + out * 2);
      p.rotation.set(0.02, -sgn * (lerp(2.9, 0.42, u) + fan - out * 1.6), -sgn * (lerp(0.5, 0.075, u) + fan * 0.6));
      p.userData.sweep.material.opacity = 0.6 * sweepAt(p.userData.sweep, te + 0.45, 0.5);
    };
    side(this.left, -1, 2.0); side(this.right, 1, 2.5);
    for (const p of [hero, this.left, this.right]) { const m = p.userData.mirror; m.visible = p.visible; m.position.copy(p.position); m.rotation.copy(p.rotation); }
    hero.updateMatrixWorld(true);

    // ---------- escenario ----------
    this.halo.rotation.z = t * 0.12; this.halo.material.opacity = 0.3 + 0.25 * pulse + 0.5 * rush; this.halo.scale.setScalar(1 + 0.06 * pulse + 0.5 * rush);
    this.ring.rotation.z = -t * 0.22; this.ring.scale.setScalar(kf(t, [[0, 0.55], [1.0, 0.9], [1.25, 1, E.outBack]]) + 0.05 * pulse + 0.6 * rush); this.ring.material.opacity = 0.45 + 0.3 * pulse;
    this.ring2.rotation.z = t * 0.1; this.ring2.scale.setScalar(1 + 0.04 * pulse + 0.4 * rush);
    this.backGlow.material.opacity = 0.28 + 0.14 * pulse + 0.3 * rush; this.backGlow.scale.setScalar(11 + 1.5 * pulse + 10 * rush);
    this.coreGlow.material.opacity = 0.16 + 0.16 * pulse + 0.3 * rush;
    this.floorRing.rotation.z = t * 0.3; this.floorRing.material.opacity = 0.25 + 0.3 * pulse;
    this.floorGlow.material.opacity = 0.14 + 0.25 * pulse;
    // onda de choque en los golpes fuertes
    let sb = -1; for (const b of [1, 2, 3, 4]) if (t >= b) sb = b;
    if (sb < 0) this.shock.visible = false; else { const u = prog(t, sb, sb + 0.7); this.shock.visible = u < 1; this.shock.scale.setScalar(1 + E.outCubic(u) * 9); this.shock.material.opacity = 0.8 * (1 - u) * (1 - u); }
    for (const c of this.clouds) { const d = c.userData; c.position.set(d.x + d.v * (t - 3) * (1 + 3 * rush) + Math.sign(d.x) * (d.z > 0 ? 2.2 * (1 - E.outCubic(prog(t, 0, 1.2))) + 4 * E.inCubic(prog(t, 3.9, 4.6)) : 0), d.y + Math.sin(t * 0.8 + d.ph) * 0.12, d.z); }

    // partículas ambientales: suben despacio y al final se lanzan hacia la cámara
    const fill = (pts, off) => { const arr = pts.geometry.attributes.position.array; const n = this.pN / 2; for (let i = 0; i < n; i++) { const s = this.pSeed[i + off]; const y = ((s[1] + 3 + t * s[3]) % 13 + 13) % 13 - 3; const z = s[2] + rush * (9 + s[5] * 14); arr[i * 3] = s[0] + Math.sin(t * 0.7 + s[4]) * 0.3 * (1 + rush * 2) + s[0] * rush * 0.4; arr[i * 3 + 1] = y; arr[i * 3 + 2] = ((z + 11) % 20) - 11; } pts.geometry.attributes.position.needsUpdate = true; };
    fill(this.ptsA, 0); fill(this.ptsB, this.pN / 2);
    this.ptsA.material.opacity = 0.75 + 0.25 * pulse; this.ptsB.material.opacity = 0.45 + 0.3 * pulse;
    { // chispas de la pantalla (t=1 al encenderse, t=4 al abrirse la lección)
      const b0 = t >= 4 ? 4 : 1; const u = t - b0; const arr = this.burst.geometry.attributes.position.array; const live = u >= 0 && u < 1.6;
      this.burst.visible = live;
      if (live) { va.set(0, 0.2, 0.1); hero.localToWorld(va); for (let i = 0; i < this.bN; i++) { const s = this.bSeed[i]; const k = 1 - Math.exp(-2.6 * u * s[3]); arr[i * 3] = va.x + s[0] * k * 3.2; arr[i * 3 + 1] = va.y + s[1] * k * 2.6 + u * 0.3; arr[i * 3 + 2] = va.z + s[2] * k * 1.6; } this.burst.geometry.attributes.position.needsUpdate = true; this.burst.material.opacity = clamp(1.2 * (1 - u / 1.6)); }
    }

    // ---------- piezas que despegan de la pantalla ----------
    for (const it of this.items) {
      const tb = it.tb + (it.lag || 0); const o = it.obj; o.visible = t >= tb; if (!o.visible) continue;
      const lt = t - tb; const u = E.outCubic(prog(lt, 0, 0.55)); const pop = spr(lt, 1.5, 5);
      va.copy(it.from); hero.localToWorld(va); camera.worldToLocal(va);       // origen: su sitio en la pantalla
      vb.copy(it.to); vb.z += 0.16 * lt; vb.x *= 1 + 0.05 * lt;                   // deriva hacia la cámara
      const fly = E.inCubic(prog(t, 5.1 + it.seed * 0.035, DUR));                 // salida acelerada rozando la cámara
      vb.z += fly * 5.2; vb.x += Math.sign(vb.x || 1) * fly * 2.0; vb.y += Math.min(vb.y, 0.05) * fly * 1.6;
      o.position.lerpVectors(va, vb, u); o.position.y += Math.sin(u * Math.PI) * 0.12 + Math.sin(t * 2.1 + it.seed) * 0.018 * u;
      o.scale.setScalar(lerp(it.s0, it.s1, pop));
      const heroRy = hero.rotation.y - Math.atan2(camera.position.x, camera.position.z);
      o.rotation.set(Math.sin(t * 1.6 + it.seed) * 0.06 * u, lerp(heroRy, it.ry, u) + (it.spin ? it.spin * (1 - E.outCubic(prog(lt, 0, 1.1))) * 7 + it.spin * fly * 5 : 0) + Math.sin(t * 1.3 + it.seed * 2) * 0.07 * u, lerp(0, it.rz, u) + fly * it.seed * 0.12);
    }

    // ---------- render ----------
    this.bloom.strength = 0.45 + 0.2 * imp(t, 1, 4) + 0.2 * imp(t, 4, 4) + 0.4 * rush;
    this.composer.render();
    this.lightUp.style.opacity = String(0.42 * E.inCubic(prog(t, 5.4, DUR)) + 0.12 * imp(t, 4, 8));

    // ---------- textos ----------
    const slam = (row, t0, t1, opt = {}) => {
      const vis = t >= t0 && t < t1; row.style.display = vis ? "flex" : "none"; if (!vis) return 0;
      const lt = t - t0; const inS = lerp(1.7, 1, E.outExpo(prog(lt, 0, 0.2))) + 0.07 * Math.exp(-7 * lt) * Math.sin(lt * 26) + (opt.grow || 0) * lt;
      const out = E.inCubic(prog(t, t1 - 0.09, t1));
      const sh = imp(t, t0, 10);
      row.style.transform = `translate(${noise1(t * 40, 7) * 16 * sh}px, ${noise1(t * 40, 8) * 16 * sh - out * 260}px) scale(${inS * (1 + out * 0.5)}) rotate(${lerp(-5, 0, E.outExpo(prog(lt, 0, 0.22)))}deg)`;
      row.style.opacity = String(1 - out);
      return lt;
    };
    const shine = (node, lt, t0 = 0.22, d = 0.5) => { node.style.backgroundPosition = `${lerp(160, -60, prog(lt, t0, t0 + d))}% 0`; };
    let lt = slam(this.r1, 2.0, 3.0); shine(this.t1.shine, lt);
    lt = slam(this.r2, 3.0, 4.0);
    if (t >= 3 && t < 4) {
      shine(this.a1.shine, lt, 0.3, 0.3); shine(this.b2.shine, lt, 0.5, 0.3);
      const ua = E.outExpo(prog(lt, 0.06, 0.26)); this.arrow.style.clipPath = `inset(-20px ${(1 - ua) * 110}% -20px -20px)`; this.arrow.style.transform = `translateX(${(1 - ua) * -40 + Math.sin(lt * 9) * 5 * prog(lt, 0.3, 0.5)}px)`;
      const ub = prog(lt, 0.14, 0.3); this.b2.wrap.style.visibility = lt >= 0.14 ? "visible" : "hidden"; this.b2.wrap.style.transform = `scale(${lerp(2.2, 1, E.outExpo(ub)) + 0.08 * Math.exp(-8 * (lt - 0.14)) * Math.sin((lt - 0.14) * 28)})`;
    }
    lt = slam(this.r3, 5.0, DUR + 1, { grow: 0.045 }); shine(this.t3.shine, lt, 0.25, 0.55);
    // tira inferior
    const bandIn = E.outExpo(prog(t, 3.94, 4.14));
    this.band.style.display = t >= 3.94 ? "block" : "none";
    this.band.style.clipPath = `inset(-30px ${(1 - bandIn) * 100}% -60px 0)`;
    this.band.style.transform = `translateY(${-8 * imp(t, 5, 8)}px) scaleY(${1 + 0.12 * imp(t, 5, 8)})`;
    this.bandShine.style.backgroundPosition = `${lerp(160, -60, prog(t, 5.05, 5.6))}% 0`;
    for (const w of this.words) {
      const l = t - w.tb; w.s.style.visibility = l >= 0 ? "visible" : "hidden"; if (l < 0) continue;
      const s = lerp(w.dot ? 0 : 1.8, 1, E.outExpo(prog(l, 0, 0.18))) + 0.1 * Math.exp(-8 * l) * Math.sin(l * 28) + 0.1 * imp(t, 5, 8);
      w.s.style.transform = `translateY(${-30 * Math.exp(-9 * l) * Math.abs(Math.sin(l * 14))}px) scale(${s})`;
    }
  },
};
