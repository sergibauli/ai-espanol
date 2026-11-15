// s5-dele · PREPARACIÓN DEL EXAMEN DELE (6 s)
// Viaje de cámara 3D por un corredor con cuatro arcos imperiales (A1 bambú → A2 linternas → B1 tinta → B2 Ciudad Prohibida).
// Ritmo (120 BPM): 0,5 cae el «88» · 1,5/2,5/3,5/4,5 medallón + móvil de cada nivel · 2/3/4/5 se cruza cada arco · 5,5 sello «通过».
// Todo es función pura de t (sin estado acumulado).
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const D = 56, ZS = D / 40, PHZ = 15, A = 0.85, TAU = Math.PI * 2;
const BLOOM = false;
/** avance de cámara en «portales»: rápido al cruzar (t entero), lento al contemplar (t = x,5). g(2+k) = 1+k */
const gOf = (t) => t - 1 + (A * Math.sin(TAU * (t - 1))) / TAU;
const vOf = (t) => 1 + A * Math.cos(TAU * (t - 1));
const LV = [
  { id: "A1", ch: "竹", col: "#1fa878", bright: "#6ff0bf", deep: "#0a4a35", screen: "screens/oficial_A1.jpg" },
  { id: "A2", ch: "灯", col: "#ea580c", bright: "#ffb056", deep: "#7a1d06", screen: "s5-dele/oficial_A2.jpg" },
  { id: "B1", ch: "山", col: "#2563eb", bright: "#8cb6ff", deep: "#0c2470", screen: "s5-dele/oficial_B1.jpg" },
  { id: "B2", ch: "龙", col: "#7c3aed", bright: "#d6b0ff", deep: "#2e0f6e", screen: "screens/oficial_B2.jpg" },
];
const ZBG = ["#04231b", "#300b08", "#06123a", "#1b0838", "#5a1408"];      // color de niebla/fondo por zona
const ZTINT = ["#46e0a8", "#ff8f3d", "#5a90ff", "#b074ff", "#ffd170"];    // luz por zona
const IMPACTS = [[0.5, 16], [1.5, 13], [2, 9], [2.5, 13], [3, 9], [3.5, 13], [4, 9], [4.5, 13], [5, 12], [5.5, 30]];
const GOLD = "linear-gradient(180deg,#fffbe6 0%,#ffe9a8 28%,#f2c14e 50%,#b3740f 63%,#ffe39a 80%,#c8961e 100%)";

export default {
  async setup(root, kit) {
    const { THREE, PAL, FONT, el } = kit;
    const R = kit.rng(5055);
    const rr = (a, b) => a + (b - a) * R();
    root.style.background = "#04231b";
    await Promise.all([
      kit.fontReady(`400 200px "Ma Shan Zheng"`, "竹灯山龙和真实考试一样通过"),
      kit.fontReady(`900 100px "Noto Serif SC"`, "套 DELE 模拟题阅读 · 听力 · 写作 · 口语"),
      kit.fontReady(`900 100px "Unbounded"`, "0123456789"),
      kit.fontReady(`900 100px "Cinzel Decorative"`, "A1A2B1B2"),
    ]);

    const three = (this.three = kit.makeThree(root, { alpha: false, fov: 35 }));
    const { scene, camera, renderer } = three;
    scene.background = new THREE.Color(ZBG[0]);
    scene.fog = new THREE.Fog(ZBG[0], 14, 110);
    scene.add((this.amb = new THREE.AmbientLight(0xffffff, 0.75)));
    const sun = (this.sun = new THREE.DirectionalLight(0xfff0d0, 2.1)); scene.add(sun); scene.add(sun.target);
    this.bgCols = ZBG.map((c) => new THREE.Color(c)); this.tintCols = ZTINT.map((c) => new THREE.Color(c));
    this.dummy = new THREE.Object3D();

    // ---------- texturas ----------
    const glowW = kit.glowTexture(128, "255,255,255");
    const texPlaque = (lv) => kit.canvasTexture(512, 512, (g) => {
      const gr = g.createRadialGradient(256, 200, 20, 256, 256, 380); gr.addColorStop(0, lv.col); gr.addColorStop(1, lv.deep);
      g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
      g.strokeStyle = "#f2c14e"; g.lineWidth = 26; g.strokeRect(13, 13, 486, 486);
      g.strokeStyle = "#8a5a10"; g.lineWidth = 5; g.strokeRect(40, 40, 432, 432);
      g.font = `400 350px "Ma Shan Zheng"`; g.textAlign = "center"; g.textBaseline = "middle";
      g.shadowColor = "rgba(0,0,0,.6)"; g.shadowBlur = 18; g.shadowOffsetY = 10;
      const tg = g.createLinearGradient(0, 90, 0, 430); tg.addColorStop(0, "#fffbe6"); tg.addColorStop(0.5, "#ffd86b"); tg.addColorStop(1, "#e6a520");
      g.fillStyle = tg; g.fillText(lv.ch, 256, 272);
    });
    const texBamboo = kit.canvasTexture(64, 256, (g) => {
      const gr = g.createLinearGradient(0, 0, 64, 0); gr.addColorStop(0, "#14553a"); gr.addColorStop(0.45, "#8be3ae"); gr.addColorStop(1, "#0f3f2b");
      g.fillStyle = gr; g.fillRect(0, 0, 64, 256); g.fillStyle = "#0b3324"; g.fillRect(0, 0, 64, 10); g.fillStyle = "rgba(220,255,230,.5)"; g.fillRect(0, 10, 64, 4);
    });
    texBamboo.wrapT = THREE.RepeatWrapping; texBamboo.repeat.set(1, 12);
    const texLeaf = kit.canvasTexture(128, 48, (g) => {
      const gr = g.createLinearGradient(0, 0, 128, 0); gr.addColorStop(0, "#1c7a4c"); gr.addColorStop(0.6, "#7ff0b4"); gr.addColorStop(1, "#d8ffe6");
      g.fillStyle = gr; g.beginPath(); g.moveTo(2, 24); g.quadraticCurveTo(50, -8, 126, 24); g.quadraticCurveTo(50, 56, 2, 24); g.fill();
      g.strokeStyle = "rgba(10,60,35,.7)"; g.lineWidth = 2; g.beginPath(); g.moveTo(4, 24); g.lineTo(122, 24); g.stroke();
    });
    const texLantern = kit.canvasTexture(128, 200, (g) => {
      g.strokeStyle = "#f2c14e"; g.lineWidth = 3; g.beginPath(); g.moveTo(64, 0); g.lineTo(64, 26); g.stroke();
      const gr = g.createRadialGradient(64, 92, 6, 64, 96, 70); gr.addColorStop(0, "#fff3b8"); gr.addColorStop(0.45, "#ff9a2e"); gr.addColorStop(1, "#b3200c");
      g.fillStyle = gr; g.beginPath(); g.ellipse(64, 96, 54, 64, 0, 0, TAU); g.fill();
      g.strokeStyle = "rgba(120,20,5,.45)"; g.lineWidth = 2; for (const rx of [18, 36]) { g.beginPath(); g.ellipse(64, 96, rx, 64, 0, 0, TAU); g.stroke(); }
      g.fillStyle = "#f2c14e"; g.fillRect(36, 24, 56, 13); g.fillRect(36, 155, 56, 13);
      g.fillStyle = "#e0401a"; g.fillRect(60, 168, 8, 30);
    });
    const texMount = (seed) => kit.canvasTexture(512, 512, (g) => {
      const r = kit.rng(seed);
      const tones = [["#7ea6f2", "#27408a"], ["#4a71d6", "#152868"], ["#213c9c", "#081240"]];
      tones.forEach(([top, bot], L) => {
        const base = 150 + L * 95; g.beginPath(); g.moveTo(0, 512);
        let x = 0, y = base + r() * 60; g.lineTo(0, y);
        while (x < 512) { const nx = x + 40 + r() * 70, ny = base + (r() - 0.5) * 150 - (L === 0 ? 60 : 0); g.quadraticCurveTo(x + (nx - x) * 0.5, Math.min(y, ny) - 30 - r() * 50, nx, ny); x = nx; y = ny; }
        g.lineTo(512, 512); g.closePath();
        const gr = g.createLinearGradient(0, base - 120, 0, base + 260); gr.addColorStop(0, top); gr.addColorStop(1, bot); g.fillStyle = gr; g.fill();
        const mist = g.createLinearGradient(0, base + 60, 0, base + 200); mist.addColorStop(0, "rgba(200,220,255,0)"); mist.addColorStop(1, "rgba(200,220,255,.5)"); g.fillStyle = mist; g.fillRect(0, base + 60, 512, 140);
      });
      g.globalCompositeOperation = "destination-in"; const f = g.createLinearGradient(0, 380, 0, 512); f.addColorStop(0, "#000"); f.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = f; g.fillRect(0, 0, 512, 512);
    });
    const texPalace = (seed, gold) => kit.canvasTexture(512, 640, (g) => {
      const r = kit.rng(seed); const tiers = 3;
      for (let i = 0; i < tiers; i++) {
        const w = 190 + i * 110, cy = 120 + i * 150, cx = 256, bodyH = 96;
        g.fillStyle = gold ? "#7a1410" : "#3a1560"; g.fillRect(cx - w * 0.42, cy, w * 0.84, bodyH);
        g.fillStyle = "#ffd470"; const n = 3 + i * 2; for (let k = 0; k < n; k++) { if (r() < 0.2) continue; const ww = (w * 0.74) / n; g.fillRect(cx - w * 0.37 + k * ww + ww * 0.18, cy + 26, ww * 0.62, bodyH - 44); }
        g.beginPath(); g.moveTo(cx - w * 0.72, cy - 24); g.quadraticCurveTo(cx - w * 0.5, cy + 6, cx - w * 0.38, cy + 4); g.lineTo(cx + w * 0.38, cy + 4); g.quadraticCurveTo(cx + w * 0.5, cy + 6, cx + w * 0.72, cy - 24);
        g.quadraticCurveTo(cx + w * 0.42, cy - 30, cx + w * 0.24, cy - 78); g.lineTo(cx - w * 0.24, cy - 78); g.quadraticCurveTo(cx - w * 0.42, cy - 30, cx - w * 0.72, cy - 24); g.closePath();
        const gr = g.createLinearGradient(0, cy - 78, 0, cy + 6); gr.addColorStop(0, gold ? "#ffe9a8" : "#b48cff"); gr.addColorStop(1, gold ? "#c8861e" : "#4a1f8f"); g.fillStyle = gr; g.fill();
        g.strokeStyle = "#ffe9a8"; g.lineWidth = 5; g.stroke();
      }
      g.globalCompositeOperation = "destination-in"; const f = g.createLinearGradient(0, 500, 0, 640); f.addColorStop(0, "#000"); f.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = f; g.fillRect(0, 0, 512, 640);
    });
    const texGround = kit.canvasTexture(256, 512, (g) => {
      g.fillStyle = "#5c5c66"; g.fillRect(0, 0, 256, 512);
      for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? "#6c6c78" : "#4c4c58"; g.fillRect(34, i * 128 + 3, 188, 122); }
      g.fillStyle = "#ffffff"; g.fillRect(14, 0, 9, 512); g.fillRect(233, 0, 9, 512);
      g.fillStyle = "#d8d8e4"; g.fillRect(120, 0, 16, 512);
      g.strokeStyle = "#ffffff"; g.lineWidth = 5; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(128, i * 128 + 30); g.lineTo(160, i * 128 + 64); g.lineTo(128, i * 128 + 98); g.lineTo(96, i * 128 + 64); g.closePath(); g.stroke(); }
    });
    texGround.wrapT = THREE.RepeatWrapping; texGround.repeat.set(1, 30 * ZS);
    const texRays = kit.canvasTexture(512, 512, (g) => {
      g.translate(256, 256); const r = kit.rng(77);
      for (let i = 0; i < 26; i++) { const a = (i / 26) * TAU + r() * 0.1, w = 0.03 + r() * 0.06; const gr = g.createRadialGradient(0, 0, 10, 0, 0, 256); gr.addColorStop(0, "rgba(255,240,190,.9)"); gr.addColorStop(1, "rgba(255,200,90,0)"); g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 256, a - w, a + w); g.closePath(); g.fill(); }
      const c = g.createRadialGradient(0, 0, 0, 0, 0, 120); c.addColorStop(0, "rgba(255,252,230,1)"); c.addColorStop(1, "rgba(255,220,130,0)"); g.fillStyle = c; g.fillRect(-256, -256, 512, 512);
    });
    const texTiles = kit.canvasTexture(64, 64, (g) => { const gr = g.createLinearGradient(0, 0, 64, 0); gr.addColorStop(0, "#555"); gr.addColorStop(0.5, "#fff"); gr.addColorStop(1, "#555"); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); g.fillStyle = "rgba(0,0,0,.35)"; g.fillRect(0, 0, 64, 5); });
    texTiles.wrapS = texTiles.wrapT = THREE.RepeatWrapping; texTiles.repeat.set(3.4, 3);
    const texCloud = await kit.loadTexture(kit.asset("theme/nube-oro.png"));

    // ---------- suelo, cielo, estelas ----------
    const groundGeo = new THREE.PlaneGeometry(9, 380 * ZS, 1, 190); groundGeo.rotateX(-Math.PI / 2);
    { const p = groundGeo.attributes.position, cols = new Float32Array(p.count * 3), c = new THREE.Color();
      for (let i = 0; i < p.count; i++) { const z = p.getZ(i) - 140 * ZS, zone = kit.clamp(Math.floor(-z / D), 0, 4); c.set(ZTINT[zone]).multiplyScalar(0.3); cols.set([c.r, c.g, c.b], i * 3); }
      groundGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3)); }
    const ground = new THREE.Mesh(groundGeo, new THREE.MeshBasicMaterial({ map: texGround, vertexColors: true })); ground.position.set(0, -4.7, -140 * ZS); scene.add(ground);
    this.sky = new THREE.Mesh(new THREE.PlaneGeometry(420, 420), new THREE.MeshBasicMaterial({ map: glowW, transparent: true, opacity: 0.55, fog: false, depthWrite: false, depthTest: false })); this.sky.renderOrder = -10; scene.add(this.sky);
    this.rays = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshBasicMaterial({ map: texRays, transparent: true, opacity: 0, fog: false, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending })); this.rays.renderOrder = -9; scene.add(this.rays);

    const inst = (geo, mat, n) => { const m = new THREE.InstancedMesh(geo, mat, n); m.frustumCulled = false; scene.add(m); return m; };
    // estelas de velocidad a lo largo de todo el recorrido
    const NS = 260; this.streaks = inst(new THREE.BoxGeometry(0.035, 0.035, 7), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }), NS);
    { const c = new THREE.Color(); for (let i = 0; i < NS; i++) { const a = R() * TAU, rad = rr(2.6, 9), z = rr(60, -250) * ZS; this.dummy.position.set(Math.cos(a) * rad, Math.sin(a) * rad * 1.3 + 1, z); this.dummy.rotation.set(0, 0, 0); this.dummy.scale.set(1, 1, rr(0.5, 1.6)); this.dummy.updateMatrix(); this.streaks.setMatrixAt(i, this.dummy.matrix); c.set(ZTINT[kit.clamp(Math.floor(-z / D), 0, 4)]).lerp(new THREE.Color("#ffffff"), 0.45); this.streaks.setColorAt(i, c); } }

    // ---------- zona A1: bambú ----------
    const NB = 70; const bamboo = inst(new THREE.CylinderGeometry(0.17, 0.21, 30, 8, 1, true), new THREE.MeshBasicMaterial({ map: texBamboo }), NB);
    { const c = new THREE.Color(); for (let i = 0; i < NB; i++) { const s = i % 2 ? 1 : -1; this.dummy.position.set(s * rr(3.7, 10), 6, rr(48, -37) * ZS); this.dummy.rotation.set(rr(-0.05, 0.05), 0, rr(-0.07, 0.07)); const k = rr(0.7, 1.5); this.dummy.scale.set(k, 1, k); this.dummy.updateMatrix(); bamboo.setMatrixAt(i, this.dummy.matrix); c.setScalar(rr(0.3, 0.8)); bamboo.setColorAt(i, c); } }
    const NL = 170; this.leaves = inst(new THREE.PlaneGeometry(1.0, 0.36), new THREE.MeshBasicMaterial({ map: texLeaf, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide }), NL);
    this.leafSeed = Array.from({ length: NL }, () => ({ x: (R() < 0.5 ? -1 : 1) * rr(1.3, 7), y: R() * 15, z: rr(46, -40) * ZS, v: rr(1.2, 2.6), w: rr(1.5, 4) * (R() < 0.5 ? -1 : 1), ph: R() * TAU, s: rr(0.6, 1.4) }));

    // ---------- zona A2: linternas ----------
    const NLa = 54; this.lanterns = inst(new THREE.PlaneGeometry(1.15, 1.8), new THREE.MeshBasicMaterial({ map: texLantern, transparent: true, alphaTest: 0.5, toneMapped: false }), NLa);
    this.lanGlow = inst(new THREE.PlaneGeometry(4.4, 4.4), new THREE.MeshBasicMaterial({ map: glowW, color: 0xff7a1f, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }), NLa);
    this.lanSeed = Array.from({ length: NLa }, (_, i) => ({ x: (i % 2 ? 1 : -1) * rr(2.3, 8.5), y: R() * 14, z: rr(-41, -79) * ZS, v: rr(0.35, 0.9), ph: R() * TAU, s: rr(0.7, 1.5) }));

    // ---------- zona B1: montañas de tinta + niebla ----------
    const mTex = [texMount(11), texMount(23), texMount(37)];
    for (let i = 0; i < 12; i++) { const s = i % 2 ? 1 : -1; const m = new THREE.Mesh(new THREE.PlaneGeometry(17, 17), new THREE.MeshBasicMaterial({ map: mTex[i % 3], transparent: true, depthWrite: false })); m.position.set(s * rr(12, 14), rr(1.5, 3.2), (-82 - i * 3.1) * ZS); m.scale.x = R() < 0.5 ? -1 : 1; scene.add(m); }
    const NM = 34; this.mist = inst(new THREE.PlaneGeometry(11, 4.4), new THREE.MeshBasicMaterial({ map: glowW, color: 0xb9d2ff, transparent: true, opacity: 0.2, depthWrite: false }), NM);
    this.mistSeed = Array.from({ length: NM }, () => ({ x: rr(-9, 9), y: rr(-4.6, 1.5), z: rr(-80, -119) * ZS, v: rr(-0.9, 0.9), s: rr(0.7, 1.6) }));

    // ---------- zona B2 + final: tejados de palacio, nubes de oro, chispas ----------
    const pTex = [texPalace(5, false), texPalace(9, false), texPalace(14, true), texPalace(21, true)];
    for (let i = 0; i < 26; i++) { const s = i % 2 ? 1 : -1, z = (-122 - i * 4.4) * ZS, gold = z < -160 * ZS; const m = new THREE.Mesh(new THREE.PlaneGeometry(13, 16.2), new THREE.MeshBasicMaterial({ map: pTex[(i % 2) + (gold ? 2 : 0)], transparent: true, depthWrite: false })); m.position.set(s * rr(10, 12.5), 3.2 + rr(-0.6, 1.4), z); scene.add(m); }
    const NC = 30; this.clouds = inst(new THREE.PlaneGeometry(5.2, 1.82), new THREE.MeshBasicMaterial({ map: texCloud, transparent: true, depthWrite: false, toneMapped: false }), NC);
    this.cloudSeed = Array.from({ length: NC }, (_, i) => ({ x: (i % 2 ? 1 : -1) * rr(2.6, 8), y: rr(-4.2, 6), z: (i < 9 ? rr(34, 2) : rr(-158, -250)) * ZS, v: rr(-0.5, 0.5), s: rr(0.6, 1.5) }));
    const pts = (n, z0, z1, color, size) => { const pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) pos.set([rr(-9.5, 9.5), rr(-4.5, 9), rr(z0, z1) * ZS], i * 3); const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); const p = new THREE.Points(g, new THREE.PointsMaterial({ map: glowW, color, size, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true })); p.frustumCulled = false; scene.add(p); return p; };
    this.dust = [pts(240, 48, -40, 0x8dffcf, 0.34), pts(200, -40, -80, 0xffb060, 0.3), pts(220, -80, -120, 0xbcd4ff, 0.3), pts(900, -120, -262, 0xffd879, 0.36)];

    // ---------- portales ----------
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xe6a92e, metalness: 0.85, roughness: 0.3, emissive: 0x7a4a08, emissiveIntensity: 0.3 });
    const lacaMat = new THREE.MeshStandardMaterial({ color: 0xc8102e, metalness: 0.25, roughness: 0.4, emissive: 0x4a0612, emissiveIntensity: 0.35 });
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-5.3, 5.45); roofShape.quadraticCurveTo(-4.1, 4.5, -2.6, 4.55); roofShape.lineTo(2.6, 4.55); roofShape.quadraticCurveTo(4.1, 4.5, 5.3, 5.45);
    roofShape.quadraticCurveTo(3.3, 5.0, 2.3, 6.0); roofShape.lineTo(-2.3, 6.0); roofShape.quadraticCurveTo(-3.3, 5.0, -5.3, 5.45);
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 1.5, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 2, curveSegments: 14 }); roofGeo.translate(0, 0, -0.75);
    const eaveCurve = new THREE.CatmullRomCurve3([[-5.3, 5.45], [-4.4, 4.82], [-2.9, 4.56], [0, 4.52], [2.9, 4.56], [4.4, 4.82], [5.3, 5.45]].map(([x, y]) => new THREE.Vector3(x, y, 0.86)));
    const eaveGeo = new THREE.TubeGeometry(eaveCurve, 40, 0.085, 6);
    const colGeo = new THREE.CylinderGeometry(0.4, 0.4, 8.6, 20), bandGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.42, 20), baseGeo = new THREE.BoxGeometry(1.3, 0.7, 1.3);
    this.portals = []; this.phones = [];
    for (let k = 0; k < 4; k++) {
      const lv = LV[k], grp = new THREE.Group(); grp.position.z = -(k + 1) * D; scene.add(grp);
      const lvMat = new THREE.MeshStandardMaterial({ color: lv.col, metalness: 0.3, roughness: 0.45, emissive: lv.col, emissiveIntensity: 0.22 });
      const roofMat = new THREE.MeshStandardMaterial({ color: lv.col, map: texTiles, metalness: 0.3, roughness: 0.45, emissive: lv.col, emissiveMap: texTiles, emissiveIntensity: 0.3 });
      const neon = new THREE.MeshBasicMaterial({ color: lv.bright, toneMapped: false });
      for (const s of [-1, 1]) {
        const c = new THREE.Mesh(colGeo, lacaMat); c.position.set(s * 3.15, -0.4, 0); grp.add(c);
        for (const y of [-4.1, 3.4, 0.2]) { const b = new THREE.Mesh(bandGeo, y === 0.2 ? lvMat : goldMat); b.position.set(s * 3.15, y, 0); if (y === 0.2) b.scale.y = 0.5; grp.add(b); }
        const b = new THREE.Mesh(baseGeo, lvMat); b.position.set(s * 3.15, -4.45, 0); grp.add(b);
        const strip = new THREE.Mesh(new THREE.BoxGeometry(0.09, 7.2, 0.09), neon); strip.position.set(s * 2.68, -0.5, 0.2); grp.add(strip);
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), goldMat); orb.position.set(s * 5.3, 5.52, 0); grp.add(orb);
      }
      const l1 = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.6, 0.8), lvMat); l1.position.y = 3.85; grp.add(l1);
      const l2 = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.34, 1.0), goldMat); l2.position.y = 4.34; grp.add(l2);
      const l3 = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.09, 0.09), neon); l3.position.set(0, 3.5, 0.3); grp.add(l3);
      grp.add(new THREE.Mesh(roofGeo, roofMat)); grp.add(new THREE.Mesh(eaveGeo, goldMat));
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.2, 1.62), goldMat); ridge.position.y = 6.06; grp.add(ridge);
      const plaqueTex = texPlaque(lv);
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.3, 0.18), [goldMat, goldMat, goldMat, goldMat, new THREE.MeshBasicMaterial({ map: plaqueTex, toneMapped: false }), goldMat]); plaque.position.set(0, 2.42, 0.62); plaque.rotation.x = 0.1; grp.add(plaque);
      const halo = new THREE.Mesh(new THREE.PlaneGeometry(22, 22), new THREE.MeshBasicMaterial({ map: glowW, color: lv.col, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false })); halo.position.set(0, 0, -1.2); grp.add(halo);
      const veil = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 8.4), new THREE.MeshBasicMaterial({ color: ZTINT[k + 1], transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); veil.position.set(0, -0.5, -0.1); grp.add(veil);
      this.portals.push({ grp, plaque, halo });
      const phone = await kit.phoneMesh(kit.asset(lv.screen), { scale: 1.75, rim: 0xf2c14e }); scene.add(phone);
      const pglow = new THREE.Mesh(new THREE.PlaneGeometry(7, 9), new THREE.MeshBasicMaterial({ map: glowW, color: lv.col, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false })); pglow.position.z = -0.35; phone.add(pglow);
      this.phones.push(phone);
    }

    if (BLOOM) {
      const comp = (this.comp = new EffectComposer(renderer)); comp.setPixelRatio(1); comp.setSize(kit.W, kit.H);
      comp.addPass(new RenderPass(scene, camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(kit.W / 2, kit.H / 2), 0.35, 0.6, 0.86); comp.addPass(this.bloom);
      comp.addPass(new OutputPass());
    }

    // ---------- capa DOM: destellos y rótulos ----------
    const abs = { position: "absolute", left: 0, top: 0 };
    this.flash = el("div", { ...abs, width: "1080px", height: "1920px", pointerEvents: "none" }, root);
    this.goldOut = el("div", { ...abs, width: "1080px", height: "1920px", background: "radial-gradient(ellipse 90% 70% at 50% 48%, #fff6d8 0%, #ffd678 45%, #e2731c 100%)", opacity: 0, mixBlendMode: "screen" }, root);
    this.shade = el("div", { ...abs, width: "1080px", height: "1920px", background: "radial-gradient(ellipse 70% 34% at 50% 40%, rgba(20,4,10,.62) 0%, rgba(20,4,10,.3) 55%, rgba(20,4,10,0) 100%)", opacity: 0 }, root);
    const ui = (this.ui = el("div", { ...abs, width: "1080px", height: "1920px" }, root));

    /** texto de oro metálico letra a letra: cada letra = contorno oscuro detrás + degradado delante */
    const goldChars = (text, { size, font, weight = 900, top, stroke = 10, gap = 0, grad = GOLD }) => {
      const wrap = el("div", { ...abs, width: "1080px", top: top + "px", textAlign: "center", font: `${weight} ${size}px ${font}`, lineHeight: "1.2", whiteSpace: "nowrap", letterSpacing: gap + "px" }, ui);
      const chars = [...text].map((ch) => {
        const c = el("span", { display: "inline-block", position: "relative", whiteSpace: "pre", transformOrigin: "50% 60%" }, wrap);
        el("span", { color: "#2a0b04", WebkitTextStroke: `${stroke}px #2a0b04`, textShadow: "0 10px 26px rgba(0,0,0,.8), 0 0 46px rgba(0,0,0,.55)" }, c, ch === " " ? "&nbsp;" : ch);
        el("span", { position: "absolute", left: 0, top: 0, background: grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }, c, ch === " " ? "&nbsp;" : ch);
        return c;
      });
      return { wrap, chars };
    };
    // «88»
    this.num = el("div", { ...abs, width: "1080px", top: "410px", textAlign: "center", font: `900 400px ${FONT.latinMod}`, lineHeight: "1", letterSpacing: "-14px", transformOrigin: "50% 55%" }, ui);
    this.numBack = el("div", { color: "#2a0b04", WebkitTextStroke: "22px #2a0b04", textShadow: "0 18px 50px rgba(0,0,0,.85), 0 0 90px rgba(255,170,40,.55)" }, this.num, "88");
    this.numFront = el("div", { position: "absolute", left: 0, top: 0, width: "1080px", background: GOLD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }, this.num, "88");
    this.sub = goldChars("套 DELE 模拟题", { size: 112, font: FONT.zhSerif, top: 880, stroke: 12 });
    // anillos de impacto
    const ring = (x, y, color) => el("div", { ...abs, width: "200px", height: "200px", left: x - 100 + "px", top: y - 100 + "px", borderRadius: "50%", border: `14px solid ${color}`, boxShadow: `0 0 50px ${color}, inset 0 0 40px ${color}`, opacity: 0 }, ui);
    this.ring88 = ring(540, 640, "#ffe9a8");
    // medallones
    this.med = LV.map((lv, k) => {
      const m = el("div", { ...abs, width: "340px", height: "340px", left: "-170px", top: "-170px", borderRadius: "50%", background: `radial-gradient(circle at 34% 28%, ${lv.bright} 0%, ${lv.col} 46%, ${lv.deep} 100%)`, border: "12px solid #f2c14e", boxSizing: "border-box", boxShadow: `0 0 0 5px #7a4a08, 0 0 0 9px #ffe9a8, 0 0 90px 18px ${lv.col}, 0 16px 40px rgba(0,0,0,.6), inset 0 -18px 40px rgba(0,0,0,.35), inset 0 14px 30px rgba(255,255,255,.35)`, textAlign: "center", font: `900 150px ${FONT.latinDisplay}`, lineHeight: "316px", color: "#fffbe6", textShadow: "0 6px 0 rgba(0,0,0,.35), 0 0 30px rgba(255,255,255,.6)", opacity: 0 }, ui, lv.id);
      const r = ring(0, 0, lv.bright); ui.insertBefore(r, m);
      return { m, r, side: k % 2 ? 1 : -1 };
    });
    // cierre
    this.head = goldChars("和真实考试一样", { size: 122, font: FONT.zhBrush, weight: 400, top: 520, stroke: 14 });
    this.skills = goldChars("阅读 · 听力 · 写作 · 口语", { size: 62, font: FONT.zhSerif, top: 720, stroke: 9, grad: "linear-gradient(180deg,#ffffff 0%,#fff6d8 55%,#ffd678 100%)" });
    // sello «通过»
    const noise = document.createElement("canvas"); noise.width = 230; noise.height = 140; { const g = noise.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, 230, 140); g.globalCompositeOperation = "destination-out"; for (let i = 0; i < 260; i++) { g.globalAlpha = rr(0.35, 1); g.beginPath(); g.ellipse(rr(0, 230), rr(0, 140), rr(0.4, 2.6), rr(0.4, 1.6), R() * 3, 0, TAU); g.fill(); } }
    const mask = `url(${noise.toDataURL()})`;
    this.stamp = el("div", { ...abs, width: "470px", height: "280px", left: "-235px", top: "-140px", opacity: 0 }, ui);
    el("div", { position: "absolute", inset: "0", borderRadius: "30px", background: "linear-gradient(160deg,#e3203c 0%,#c8102e 50%,#9d0b22 100%)", boxShadow: "inset 0 0 0 12px #c8102e, inset 0 0 0 19px #fff3d6", WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: "100% 100%", maskSize: "100% 100%", textAlign: "center", font: `400 200px ${FONT.zhBrush}`, lineHeight: "272px", color: "#fff6e0", letterSpacing: "10px" }, this.stamp, "通过");
    this.stampGlow = el("div", { ...abs, width: "900px", height: "900px", left: "90px", top: "670px", background: "radial-gradient(circle, rgba(255,240,200,.95) 0%, rgba(255,90,60,.55) 32%, rgba(200,16,46,0) 68%)", opacity: 0 }, ui); ui.insertBefore(this.stampGlow, this.stamp);
    this.ringStamp = ring(540, 1120, "#ffe9a8"); this.ringStamp2 = ring(540, 1120, "#ff5a48");
    this.sparks = Array.from({ length: 22 }, (_, i) => ({ e: el("div", { ...abs, width: "70px", height: "8px", left: "-35px", top: "-4px", borderRadius: "4px", background: "linear-gradient(90deg, rgba(255,233,168,0), #fff6d8)", opacity: 0 }, ui), a: (i / 22) * TAU + rr(-0.12, 0.12), d: rr(300, 560), s: rr(0.6, 1.5) }));
  },

  async update(t, kit) {
    const { THREE, clamp, lerp, prog, ease, spring, noise1 } = kit;
    const { scene, camera, renderer } = this.three; const dm = this.dummy;
    const g = gOf(t), v = vOf(t), camZ = -g * D;
    const speed01 = clamp((v - 1) / A * 0.5 + 0.5);                    // 0 contemplando · 1 cruzando
    const sm = (x) => x * x * (3 - 2 * x);

    // sacudida de impactos
    let shx = 0, shy = 0;
    for (const [ti, amp] of IMPACTS) { const d = t - ti; if (d >= 0 && d < 0.6) { const e = Math.exp(-d * 9) * amp; shx += e * Math.sin(d * 78 + ti * 3); shy += e * Math.cos(d * 64 + ti * 5); } }

    // color de zona
    const zi = clamp(Math.floor(g + 0.5), 0, 4), near = g - Math.round(g), rk = Math.round(g);
    const zc = (arr, out) => { if (Math.abs(near) < 0.09 && rk >= 1 && rk <= 4) out.copy(arr[rk - 1]).lerp(arr[rk], sm((near + 0.09) / 0.18)); else out.copy(arr[clamp(Math.floor(g), 0, 4)]); return out; };
    zc(this.bgCols, scene.background); scene.fog.color.copy(scene.background);
    const tint = zc(this.tintCols, this._tint || (this._tint = new THREE.Color()));
    const fin = prog(g, 4.0, 4.35);                                    // tras el arco B2: mundo de oro
    scene.fog.near = lerp(16, 30, fin); scene.fog.far = lerp(125, 190, fin);

    // cámara
    let weave = 0, roll = 0;
    for (let k = 0; k < 4; k++) { const side = k % 2 ? 1 : -1, P = 2 + k; const b = Math.exp(-Math.pow((t - (P - 0.17)) / 0.2, 2)); weave += -side * 0.75 * b; roll += side * 0.085 * Math.exp(-Math.pow((t - P) / 0.24, 2)); }
    const cx = weave + noise1(t * 0.9, 3) * 0.22 + shx * 0.006, cy = 0.1 + noise1(t * 0.8, 9) * 0.18 + shy * 0.006 + 0.5 * prog(t, 5, 6);
    camera.position.set(cx, cy, camZ); camera.lookAt(cx * 0.35, cy * 0.4 + 0.35 + 1.2 * fin, camZ - 30); camera.rotateZ(roll + noise1(t * 0.7, 21) * 0.012);
    camera.fov = 35 + 17 * Math.pow(speed01, 2.2) + 6 * ease.inCubic(prog(t, 5.5, 6)); camera.updateProjectionMatrix();
    this.sun.position.set(cx + 3, cy + 5, camZ + 8); this.sun.target.position.set(0, 0, camZ - 14);
    this.sky.position.set(0, 4 + 10 * fin, camZ - 250); this.sky.material.color.copy(tint); this.sky.material.opacity = 0.13 + 0.5 * fin;
    this.rays.position.set(0, 9, camZ - 240); this.rays.rotation.z = t * 0.35; this.rays.material.opacity = fin * 0.85;

    // estelas
    this.streaks.material.opacity = 0.08 + 0.62 * Math.pow(speed01, 1.5);

    // hojas de bambú
    this.leafSeed.forEach((s, i) => { const y = 8.5 - ((s.y + t * s.v) % 15); dm.position.set(s.x + Math.sin(t * 1.3 + s.ph) * 0.7, y, s.z); dm.rotation.set(Math.sin(t * s.w * 0.7 + s.ph) * 1.1, t * s.w * 0.4 + s.ph, t * s.w + s.ph); dm.scale.setScalar(s.s); dm.updateMatrix(); this.leaves.setMatrixAt(i, dm.matrix); });
    this.leaves.instanceMatrix.needsUpdate = true;
    // linternas
    this.lanSeed.forEach((s, i) => { const y = -6 + ((s.y + t * s.v) % 14), x = s.x + Math.sin(t * 0.9 + s.ph) * 0.35; dm.position.set(x, y, s.z); dm.rotation.set(0, 0, Math.sin(t * 1.4 + s.ph) * 0.12); dm.scale.setScalar(s.s); dm.updateMatrix(); this.lanterns.setMatrixAt(i, dm.matrix); dm.position.z -= 0.05; dm.rotation.set(0, 0, 0); dm.scale.setScalar(s.s * (1 + 0.12 * Math.sin(t * 7 + s.ph))); dm.updateMatrix(); this.lanGlow.setMatrixAt(i, dm.matrix); });
    this.lanterns.instanceMatrix.needsUpdate = true; this.lanGlow.instanceMatrix.needsUpdate = true;
    // niebla de tinta
    this.mistSeed.forEach((s, i) => { dm.position.set(s.x + t * s.v, s.y + Math.sin(t + i) * 0.2, s.z); dm.rotation.set(0, 0, 0); dm.scale.setScalar(s.s); dm.updateMatrix(); this.mist.setMatrixAt(i, dm.matrix); });
    this.mist.instanceMatrix.needsUpdate = true;
    // nubes de oro
    this.cloudSeed.forEach((s, i) => { dm.position.set(s.x + t * s.v, s.y + Math.sin(t * 0.8 + i) * 0.15, s.z); dm.rotation.set(0, 0, 0); dm.scale.setScalar(s.s); dm.updateMatrix(); this.clouds.setMatrixAt(i, dm.matrix); });
    this.clouds.instanceMatrix.needsUpdate = true;
    this.dust.forEach((p, i) => { p.position.y = Math.sin(t * 0.9 + i) * 0.25 + (i === 3 ? t * 0.15 : 0); });

    // portales y móviles
    for (let k = 0; k < 4; k++) {
      const L = 1.5 + k, side = k % 2 ? 1 : -1, pz = -(k + 1) * D, P = this.portals[k], ph = this.phones[k];
      const pulse = 1 + 0.16 * Math.exp(-Math.max(0, t - L) * 6) * (t >= L ? 1 : 0);
      P.halo.material.opacity = 0.36 + 0.08 * Math.sin(t * 5 + k); P.halo.scale.setScalar(pulse);
      P.plaque.scale.setScalar(1 + 0.22 * (t >= L ? Math.exp(-(t - L) * 7) : 0));
      const e = spring(t - (L - 0.5), 2.4, 7.5), x = ease.inQuad(prog(t, L + 0.06, L + 0.34));
      ph.position.set(side * (lerp(4.6, 0.62, e) + 3.6 * x), -0.75 + lerp(-2.2, 0, e) + Math.sin(t * 2.2 + k) * 0.08 + 0.7 * x, pz + PHZ);
      ph.rotation.set(-0.06 + 0.05 * Math.sin(t * 1.7 + k), -side * (lerp(-1.7, 0.3, e) - 1.5 * x) + Math.sin(t * 1.3 + k) * 0.04, side * (lerp(0.45, -0.07, e) + 0.3 * x));
      ph.visible = camZ > pz + PHZ + 0.3 && camZ < pz + 95;
    }

    renderer.toneMappingExposure = 1.1 + 0.5 * ease.inCubic(prog(t, 5.55, 6));
    if (this.comp) { this.bloom.strength = 0.35 + 0.15 * fin + 0.4 * ease.inCubic(prog(t, 5.5, 6)); this.comp.render(); } else renderer.render(scene, camera);

    // ================= DOM =================
    // destello al cruzar cada arco, con el color del mundo al que se entra
    let fl = 0, fc = ZTINT[1];
    for (let k = 0; k < 4; k++) { const d = t - (2 + k); const a = d < 0 ? Math.exp(d * 16) : Math.exp(-d * 8); if (a > fl) { fl = a; fc = ZTINT[k + 1]; } }
    const f88 = t >= 0.5 ? Math.exp(-(t - 0.5) * 9) * 0.5 : 0, fst = t >= 5.5 ? Math.exp(-(t - 5.5) * 10) * 0.85 : 0;
    this.flash.style.background = `radial-gradient(ellipse 85% 65% at 50% 46%, rgba(255,255,255,${(fl * 0.85 + f88 + fst).toFixed(3)}) 0%, ${fc} 55%, rgba(0,0,0,0) 100%)`;
    this.flash.style.opacity = clamp(fl * 0.55 + f88 + fst).toFixed(3);
    this.goldOut.style.opacity = (0.8 * ease.inCubic(prog(t, 5.55, 6))).toFixed(3);
    this.shade.style.opacity = (prog(t, 4.9, 5.1) * 0.9 + (1 - prog(t, 1.2, 1.5)) * 0.75).toFixed(3);
    this.shade.style.transform = t < 2 ? "translateY(-40px) scale(1.25)" : "translateY(-110px)";
    this.ui.style.transform = `translate(${shx.toFixed(2)}px, ${shy.toFixed(2)}px)`;
    const ringAt = (r, d, max, x, y, s0 = 0.6) => { if (d < 0 || d > 0.6) { r.style.opacity = 0; return; } const p = ease.outCubic(d / 0.6); r.style.opacity = (1 - p).toFixed(3); r.style.transform = `${x !== undefined ? `translate(${x}px,${y}px) ` : ""}scale(${(s0 + p * max).toFixed(3)})`; };

    // «88» + «套 DELE 模拟题»
    const out88 = ease.inCubic(prog(t, 1.22, 1.5));
    if (t < 1.52) {
      const val = Math.round(88 * ease.outCubic(prog(t, -0.14, 0.5))); const txt = String(val);
      if (this._n !== txt) { this.numBack.textContent = txt; this.numFront.textContent = txt; this._n = txt; }
      const d = t - 0.5; const land = d < 0 ? lerp(1.22, 1, ease.inCubic(prog(t, -0.1, 0.5))) : 1 + 0.13 * Math.exp(-d * 7) * Math.cos(d * 26) + 0.05 * d;
      this.num.style.transform = `translateY(${(-out88 * 260).toFixed(1)}px) scale(${(land * (1 + out88 * 4.5)).toFixed(4)})`;
      this.num.style.opacity = (1 - prog(t, 1.36, 1.5)).toFixed(3);
      const sw = (t - 0.5) * 1.6;                                      // brillo que barre
      this.numFront.style.filter = `brightness(${(1 + 0.9 * Math.exp(-Math.pow((sw - 0.5) * 4, 2)) + (d >= 0 ? 0.8 * Math.exp(-d * 8) : 0)).toFixed(3)})`;
      this.num.style.display = "block"; this.sub.wrap.style.display = "block";
      this.sub.chars.forEach((c, i) => { const s = spring(t - 0.16 - i * 0.03, 3, 9); const o = ease.inCubic(prog(t, 1.2 + i * 0.012, 1.46)); c.style.transform = `translateY(${((1 - s) * 90 + o * 420).toFixed(1)}px) scale(${(Math.max(0, s) * (1 + o * 1.8)).toFixed(3)}) rotate(${((1 - s) * -14).toFixed(2)}deg)`; c.style.opacity = (clamp(s * 3) * (1 - prog(t, 1.34 + i * 0.01, 1.48))).toFixed(3); c.style.filter = `brightness(${(1 + 0.8 * Math.exp(-Math.pow((t - 0.72) * 5 - i / 8 * 1.6, 2) * 3)).toFixed(3)})`; });
    } else { this.num.style.display = "none"; this.sub.wrap.style.display = "none"; }
    ringAt(this.ring88, t - 0.5, 6);

    // medallones: golpe grande en el pulso del nivel y después se anclan arriba como marcador de progreso
    this.med.forEach(({ m, r, side }, k) => {
      const L = 1.5 + k, d = t - L;
      if (d < -0.12) { m.style.opacity = 0; r.style.opacity = 0; return; }
      const bx = 540 - side * 200, by = 1255, dx = 197 + k * 196, dy = 312;
      const dock = ease.inOutCubic(prog(t, L + 0.52, L + 0.86));
      const slam = d < 0 ? lerp(3.4, 1.25, ease.inQuad(prog(d, -0.12, 0))) : 1 + 0.25 * Math.exp(-d * 8) * Math.cos(d * 24);
      const beat = t > L + 0.86 ? 1 + 0.1 * Math.max(...[2, 3, 4, 5, 5.5].map((b) => (t >= b ? Math.exp(-(t - b) * 9) : 0))) : 1;
      const sc = lerp(slam, 0.37, dock) * beat, x = lerp(bx, dx, dock), y = lerp(by, dy, dock) - Math.sin(dock * Math.PI) * 120;
      m.style.opacity = clamp((d + 0.12) / 0.08).toFixed(3);
      m.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(lerp(side * -9, 0, dock) + (d < 0 ? side * 20 * (1 - prog(d, -0.12, 0)) : 0)).toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      m.style.filter = `brightness(${(1 + (d >= 0 ? 0.5 * Math.exp(-d * 9) : 0)).toFixed(3)})`;
      ringAt(r, d, 4.5, bx, by, 1.5);
    });

    // cierre: «和真实考试一样» + «阅读 · 听力 · 写作 · 口语»
    const showEnd = t >= 4.96; this.head.wrap.style.display = this.skills.wrap.style.display = showEnd ? "block" : "none";
    if (showEnd) {
      const grow = 1 + 0.035 * (t - 5);
      this.head.wrap.style.transform = `scale(${grow.toFixed(4)})`;
      this.head.chars.forEach((c, i) => { const d = t - 5 - i * 0.028; const s = d < 0 ? 0 : 1 + 1.5 * Math.exp(-d * 13) - 0.12 * Math.exp(-d * 6) * Math.sin(d * 30); c.style.opacity = clamp((d + 0.02) * 30).toFixed(3); c.style.transform = `scale(${s.toFixed(4)}) rotate(${(d < 0 ? 0 : -10 * Math.exp(-d * 12) * (i % 2 ? 1 : -1)).toFixed(2)}deg)`; c.style.filter = `brightness(${(1 + 0.9 * Math.exp(-Math.pow((t - 5.32) * 4 - i / 7, 2) * 5) + (t >= 5.5 ? 0.6 * Math.exp(-(t - 5.5) * 8) : 0)).toFixed(3)})`; });
      this.skills.chars.forEach((c, i) => { const w = Math.floor(i / 5); const s = spring(t - 5.1 - w * 0.07 - (i % 5) * 0.012, 3.2, 10); c.style.opacity = clamp(s * 4).toFixed(3); c.style.transform = `translateY(${((1 - s) * 70).toFixed(1)}px) scale(${Math.max(0, s).toFixed(3)})`; });
    }

    // sello «通过»
    const ds = t - 5.5;
    if (t < 5.3) { this.stamp.style.opacity = 0; this.stampGlow.style.opacity = 0; }
    else {
      const sc = 1.22 * (ds < 0 ? lerp(4.2, 1, ease.inQuart(prog(t, 5.3, 5.5))) : 1 - 0.07 * Math.exp(-ds * 10) * Math.cos(ds * 34) + 0.04 * ds);
      this.stamp.style.opacity = clamp((t - 5.3) / 0.1).toFixed(3);
      this.stamp.style.transform = `translate(540px, 1120px) rotate(${(ds < 0 ? lerp(-34, -8, prog(t, 5.3, 5.5)) : -8 + 2.5 * Math.exp(-ds * 10) * Math.sin(ds * 30)).toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      this.stamp.style.filter = `drop-shadow(0 ${(ds < 0 ? 70 : 12)}px ${(ds < 0 ? 50 : 18)}px rgba(40,0,6,.7)) brightness(${(1 + (ds >= 0 ? 1.4 * Math.exp(-ds * 9) : 0)).toFixed(3)})`;
      this.stampGlow.style.opacity = (ds < 0 ? 0 : 0.35 + 0.65 * Math.exp(-ds * 6)).toFixed(3);
      this.stampGlow.style.transform = `scale(${(ds < 0 ? 0.5 : 0.8 + 0.5 * ease.outCubic(prog(ds, 0, 0.5))).toFixed(3)})`;
    }
    ringAt(this.ringStamp, ds, 9); ringAt(this.ringStamp2, ds - 0.06, 6);
    this.sparks.forEach(({ e, a, d, s }) => { if (ds < 0 || ds > 0.5) { e.style.opacity = 0; return; } const p = ease.outCubic(ds / 0.5), rad = 150 + d * p; e.style.opacity = (1 - ds / 0.5).toFixed(3); e.style.transform = `translate(${(540 + Math.cos(a) * rad).toFixed(1)}px, ${(1120 + Math.sin(a) * rad * 0.8).toFixed(1)}px) rotate(${a.toFixed(3)}rad) scale(${(s * (1.4 - p * 0.8)).toFixed(3)}, ${s.toFixed(2)})`; });
  },
};
