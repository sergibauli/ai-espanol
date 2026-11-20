// Guion y montaje del vídeo de Douyin «Wukong Español · 悟空西语».
// Cada sección es una función del tiempo local; el ritmo sale de tiempo.mjs (130 BPM).
import * as M from "./motor.js";
import * as C from "./capa.js";
import { BEAT, BAR, FPS, SECCIONES, DURACION, CORTA } from "../tiempo.mjs";
const PANEL = CORTA ? 0 : 2 * BAR; // en la versión corta el cierre va directo al logo
import { CAP, SEQ, CIFRAS, ZOOM } from "./material.js";
const { THREE, clamp, seg, lerp, eOut, eIn, eInOut, eBack, muelle } = M;
window.FPS = FPS; window.DURACION = DURACION;
const RC = "/promo-douyin/film/recursos/";
const T = M.texturas;
const B = BEAT;

// ---------------- recursos ----------------
const SPRITES = ["mono-grande", "mono-lift", "mono-guino", "mono-saluda", "mono-trofeo", "mono-feliz", "mono-poder", "dragon-v2", "dragon-luz", "dragon", "nube", "montes", "rodillo"];
const RUTA = { A1: "/public/theme/ruta/fondo-A1-lejos.webp", A2: "/public/theme/ruta/fondo-A2-lejos.webp", B1: "/public/theme/ruta/fondo-B1-lejos.webp", B2: "/public/theme/ruta/fondo-B2-lejos.webp" };
const S = {}; // sprites
let moviles = [], papel, panel, marcoPanel;

async function preparar() {
  for (const [f, txt] of [["150px 'Ma Shan Zheng'", "悟空西语零基础"], ["900 64px 'Noto Sans SC'", "专为中国学生打造"], ["700 64px 'Noto Sans SC'", "中文"], ["900 54px 'Cinzel'", "HOLA"], ["700 54px 'Cinzel'", "HOLA"], ["170px 'ZCOOL QingKe HuangYou'", "零基础也能"]]) await document.fonts.load(f, txt);
  await document.fonts.ready;
  M.texturasCanvas();
  const mapa = {};
  for (const k of SPRITES) mapa[k] = RC + k + ".png";
  for (const [k, u] of Object.entries(RUTA)) mapa["ruta" + k] = u;
  for (const [k, u] of Object.entries(CAP)) mapa[k] = u;
  mapa.qr = "/promo-douyin/film/qr-web.png";
  await M.precargar(mapa);
  for (let i = 0; i < 6; i++) moviles.push(new M.Movil());
  S.mono = M.sprite("mono-grande", 2.1);
  S.monoLift = M.sprite("mono-lift", 1.6);
  S.guino = M.sprite("mono-guino", 1.5);
  S.saluda = M.sprite("mono-saluda", 1.55);
  S.trofeo = M.sprite("mono-trofeo", 1.3);
  S.feliz = M.sprite("mono-feliz", 1.2);
  S.poder = M.sprite("mono-poder", 1.3);
  S.dragon = M.sprite("dragon-v2", 3.2, { onda: 0.05 });
  S.dragon2 = M.sprite("dragon-v2", 2.6, { onda: 0.05 });
  S.luzI = M.sprite("dragon-luz", 2.4, { aditivo: true, onda: 0.04 });
  S.luzD = M.sprite("dragon-luz", 2.4, { aditivo: true, onda: 0.04 });
  S.montes = [M.sprite("montes", 2.2), M.sprite("montes", 2.8), M.sprite("montes", 1.8)];
  S.nubes = Array.from({ length: 8 }, () => M.sprite("nube", 0.32));
  // papel impreso (A4) y panel de cine
  papel = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5 * 1.414), new THREE.MeshBasicMaterial({ map: T.impresion || T.portada, side: THREE.DoubleSide, toneMapped: false }));
  papel.visible = false; M.escena.add(papel);
  panel = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6 * 9 / 16), new THREE.MeshBasicMaterial({ toneMapped: false }));
  marcoPanel = new THREE.Mesh(new THREE.BoxGeometry(2.72, 2.6 * 9 / 16 + 0.12, 0.05), new THREE.MeshPhysicalMaterial({ color: 0xe8b860, metalness: 1, roughness: 0.25 }));
  panel.position.z = 0.03; marcoPanel.add(panel); marcoPanel.visible = false; M.escena.add(marcoPanel);
}

// ---------------- utilidades de escena ----------------
function proy(x, y, z) { const v = new THREE.Vector3(x, y, z).project(M.camara); return { x: (v.x + 1) * 540, y: (1 - v.y) * 960, z: v.z }; }
function spr(s, { x = 0, y = 0, z = 0, h = null, rz = 0, ry = 0, a = 1, t = 0, brillo = 0, esc = 1 }) {
  s.visible = a > 0.001; s.position.set(x, y, z); s.rotation.set(0, ry, rz); s.scale.setScalar(esc);
  const u = s.material.uniforms; u.uA.value = a; u.uT.value = t; u.uBrillo.value = brillo;
}
function fondo({ c1 = "#b3122b", c2 = "#2a0207", rayos = 0.35, nubes = 0.5, img = null, imgK = 0, asp = 1, blur = 2.5, zoom = 1, tinta = 0, brillo = 1, cx = 0.5, cy = 0.55, off = [0, 0] } = {}) {
  const F = M.fondo.uniforms;
  F.uC1.value.set(c1); F.uC2.value.set(c2); F.uRayos.value = rayos; F.uNubes.value = nubes;
  F.uImg.value = img; F.uImgK.value = img ? imgK : 0; F.uImgAsp.value = asp; F.uImgBlur.value = blur; F.uImgZoom.value = zoom;
  F.uTinta.value = tinta; F.uBrillo.value = brillo; F.uCentro.value.set(cx, cy); F.uImgOff.value.set(off[0], off[1]);
}
const golpeBeat = (lt, cada = 1) => Math.exp(-((lt / B) % cada) * B * 9); // pulso en cada beat
async function seq(nombre, i) {
  const s = SEQ[nombre]; const n = clamp(Math.floor(i), 0, s.n - 1);
  return M.fotogramaSeq(s.url(n));
}
function nubes(t, k = 1, zBase = -2) {
  S.nubes.forEach((n, i) => {
    const y = -2.6 + (i % 4) * 1.6 + Math.sin(i * 7.3) * 0.4;
    const x = ((i * 1.37 + t * (0.12 + (i % 3) * 0.05)) % 4.4) - 2.2;
    spr(n, { x: i % 2 ? x : -x, y, z: zBase - (i % 3) * 1.5, a: 0.65 * k, esc: 2.5 + (i % 3) });
  });
}
function chipsNivel(lt, ini, pos, paso = 1) {
  const NIV = [["A1", "竹林世界", "jade"], ["A2", "灯笼世界", ""], ["B1", "水墨世界", "azul"], ["B2", "紫禁城", "morado"]];
  NIV.forEach(([n, zh, cls], i) => C.chip("niv" + n, n, zh, lt, ini + i * B * paso, 99, { x: pos[i][0], y: pos[i][1], cls, rot: i % 2 ? 4 : -4 }));
}

// ---------------- secciones ----------------
const ESC = {};

// 0 · GANCHO: el cristal se rompe y sale el Rey Mono
ESC.gancho = async (lt) => {
  const tR = 0.36; // momento de la rotura (impacto)
  const roto = lt >= tR;
  fondo({ c1: "#d4182f", c2: "#2a0207", rayos: roto ? 1.0 : 0, nubes: 0.6, tinta: roto ? 0 : 1, cy: 0.5 });
  const P = M.particulas.material.uniforms;
  P.uWarp.value = roto ? 9 * (1 - Math.exp(-(lt - tR) * 1.6)) : 0; P.uK.value = roto ? 1.3 : 0.2; P.uVel.value = 0.3;
  if (!roto) { M.ponerCristales(0); C.grietas(eOut(seg(lt, 0.0, tR)), 540, 900); }
  else { M.ponerCristales(lt - tR); C.destello(1 - seg(lt, tR, tR + 0.4)); }
  // Rey Mono saltando hacia la cámara
  const k = eOut(seg(lt, tR, tR + 0.6));
  const bob = Math.sin(lt * 3) * 0.04;
  spr(S.mono, { x: lerp(0.2, 0.05, k), y: lerp(-0.2, -1.05, k) + bob, z: lerp(-9, 1.1, k) - seg(lt, 1, 3.6) * 0.5, rz: (1 - muelle(seg(lt, tR, tR + 1))) * -0.5, a: roto ? 1 : 0, t: lt });
  // dragón dorado que cruza detrás
  const d = seg(lt, tR, BAR * 2);
  spr(S.dragon, { x: lerp(-2.6, 1.0, eOut(d)), y: lerp(2.6, 1.0, eOut(d)), z: -2.5, rz: lerp(0.6, -0.15, d), a: roto ? clamp((lt - tR) * 3) * 0.95 : 0, t: lt });
  spr(S.luzI, { x: -1.4, y: -1.6, z: -3.5, a: roto ? 0.5 : 0, t: lt, rz: 0.3 });
  // textos
  C.texto("g1", "零基础", "golpe", lt, 2 * B, BAR * 2 - 0.1, { y: 290, entrada: "golpe", temblor: 14, escala: 1.25, salida: "golpe" });
  C.texto("g2", "也能考过<em>西语</em>？", "golpe", lt, 3 * B, BAR * 2 - 0.1, { y: 490, entrada: "golpe", temblor: 12, escala: 0.74, salida: "golpe" });
  C.chip("gc1", "¡Hola!", "你好", lt, 4 * B, BAR * 2 - 0.15, { x: 250, y: 1020, rot: -8 });
  C.chip("gc2", "Gracias", "谢谢", lt, 5 * B, BAR * 2 - 0.15, { x: 760, y: 1150, rot: 6 });
  C.chip("gc3", "¿Qué tal?", "你好吗", lt, 6 * B, BAR * 2 - 0.15, { x: 280, y: 1330, rot: -5, cls: "jade" });
  C.chip("gc4", "¡Vamos!", "出发", lt, 7 * B, BAR * 2 - 0.15, { x: 730, y: 1440, rot: 5, cls: "oro" });
  // tinta para pasar al «problema»
  C.tinta(eIn(seg(lt, BAR * 2 - 0.42, BAR * 2 - 0.02)));
  M.camara.position.x += Math.sin(lt * 70) * 0.04 * Math.exp(-Math.max(0, lt - tR) * 5) * (roto ? 1 : 0);
};

// 1 · PROBLEMA: las dudas del estudiante, en tinta
ESC.problema = async (lt) => {
  fondo({ c1: "#2a1a12", c2: "#070403", rayos: 0, nubes: 0.15, tinta: 0.82 });
  M.particulas.material.uniforms.uK.value = 0.35;
  const sale = seg(lt, 6 * B, 6 * B + 0.3);
  [[-0.9, -2.15, -0.5, 0], [1.0, -2.3, -1, 1], [0.1, -2.6, 0.3, 2]].forEach(([x, y, z, i]) => spr(S.montes[i], { x: x + lt * 0.03 * (i - 1), y, z, a: 0.55, t: lt }));
  // palabras difíciles flotando de fondo
  [["ser · estar", 180, 0], ["subjuntivo", 1500, 1], ["¿por o para?", 330, 2], ["pretérito imperfecto", 1640, 3]].forEach(([w, y, i]) =>
    C.texto("f" + i, w, "fantasma", lt, 0, BAR * 2, { y, x: 540 + (i % 2 ? -1 : 1) * (60 - lt * 40), entrada: "sube" }));
  C.tinta(1 - eOut(seg(lt, 0, 0.35)));
  C.texto("p1", "单词<em>背了就忘</em>？", "golpe rojo", lt, 0.05, 6 * B + 0.25, { y: 560, entrada: "golpe", temblor: 10, escala: 0.68, salida: "izq" });
  C.texto("p2", "语法<em>越学越乱</em>？", "golpe rojo", lt, 2 * B, 6 * B + 0.25, { y: 800, entrada: "golpe", temblor: 10, escala: 0.68, salida: "izq" });
  C.texto("p3", "想开口却<em>不敢说</em>？", "golpe rojo", lt, 4 * B, 6 * B + 0.25, { y: 1040, entrada: "golpe", temblor: 10, escala: 0.68, salida: "izq" });
  // giro: aparece el Rey Mono guiñando
  C.texto("p4", "别慌！", "golpe", lt, 6 * B, BAR * 2, { y: 560, entrada: "golpe", temblor: 16, escala: 1.1 });
  C.texto("p5", "让<em>悟空</em>带你学", "sub grande", lt, 6.5 * B, BAR * 2, { y: 760, entrada: "letras" });
  const km = eBack(seg(lt, 6 * B, 6 * B + 0.4), 2);
  spr(S.guino, { x: 0.15, y: lerp(-3.5, -1.15, km), z: 0.5, a: sale > 0 ? 1 : 0, t: lt, rz: Math.sin(lt * 6) * 0.05 });
  C.destello(eIn(seg(lt, BAR * 2 - 0.18, BAR * 2)) * 0.9);
};

// 2 · REVELACIÓN: el móvil sale de la puerta (drop)
ESC.revelacion = async (lt) => {
  const fr = await seq("puerta", lt * 30 + 20);
  fondo({ c1: "#c8102e", c2: "#3a0610", rayos: 0.25, nubes: 0.3, img: fr, imgK: 0.92, asp: 540 / 960, blur: 1.2, zoom: 1.05 + lt * 0.02, brillo: 0.85 });
  M.particulas.material.uniforms.uK.value = 1.1;
  C.destello(1 - eOut(seg(lt, 0, 0.45)));
  const k = eOut(seg(lt, 0.05, 1.3));
  const m = moviles[0];
  m.poner({ x: 0, y: lerp(1.2, -0.82, k) + Math.sin(lt * 2) * 0.025, z: lerp(-16, 0, k), rx: (1 - k) * 0.8, ry: (1 - k) * Math.PI * 4 + Math.sin(lt * 1.4) * 0.12 * k, rz: (1 - k) * 0.4, s: 1.22, img: T.portada, halo: 0.7 });
  const kd = seg(lt, 0.6, BAR * 2);
  spr(S.luzI, { x: -1.15, y: lerp(-2.5, -0.3, eOut(kd)), z: -1.2, rz: 0.15, a: 0.85 * clamp(kd * 3), t: lt });
  spr(S.luzD, { x: 1.15, y: lerp(-2.6, -0.4, eOut(kd)), z: -1.2, ry: Math.PI, rz: -0.15, a: 0.85 * clamp(kd * 3), t: lt + 1 });
  C.texto("r1", "悟空西语", "tit grande", lt, 2 * B, BAR * 2, { y: 245, entrada: "golpe", temblor: 8 });
  C.texto("r2", "WUKONG ESPAÑOL", "es", lt, 3 * B, BAR * 2, { y: 410, entrada: "pincel", dur: 0.45 });
  C.texto("r3", "专为<em>中国学生</em>打造的西语神器", "sub", lt, 4.5 * B, BAR * 2, { y: 520, entrada: "letras" });
};

// 3 · APRENDER: ruta por mundos A1→B2 (un mundo por beat)
ESC.aprender = async (lt) => {
  const i = clamp(Math.floor((lt / B - 2) / 1.25), 0, 3);
  const nivel = ["A1", "A2", "B1", "B2"][lt < 2 * B ? 0 : i];
  fondo({ c1: ["#1f6b4a", "#b3122b", "#25407a", "#4a2a8a"][lt < 2 * B ? 0 : i], c2: "#06080a", rayos: 0.3, nubes: 0.4, img: T["ruta" + nivel], imgK: 0.7, asp: 1, blur: 3.5, brillo: 0.8 });
  const k = eOut(seg(lt, 0, 0.6));
  const cambio = lt >= 2 * B ? golpeBeat(lt - 2 * B, 1.25) : 0;
  moviles[0].poner({ x: lerp(2.5, 0.32, k), y: -0.7, z: cambio * 0.15, rx: -0.08, ry: lerp(-1.3, -0.24, k) + Math.sin(lt) * 0.05, rz: lerp(0.3, 0.02, k), s: 1.28, img: T["ruta" + nivel], flash: cambio * 0.3 });
  C.texto("a1", "A1→B2 闯关地图", "tit medio", lt, 0.1, BAR * 2, { y: 225, entrada: "pincel", dur: 0.4 });
  C.texto("a2", "<em>四大世界</em>，一关一关往上升", "sub", lt, B, BAR * 2, { y: 385, entrada: "letras" });
  chipsNivel(lt, 2 * B - 0.05, [[205, 720], [210, 900], [205, 1080], [215, 1260]], 1.25);
  M.camara.position.y += golpeBeat(lt) * 0.015;
};

// 4 · LECCIONES: ejercicio → ¡correcto! → ¡lección perfecta!
ESC.lecciones = async (lt) => {
  const cambio = 2.5 * B, fin = 5 * B;
  fondo({ c1: lt > cambio ? "#1f8a5a" : "#c8102e", c2: "#2a0207", rayos: 0.5, nubes: 0.5 });
  const k = eOut(seg(lt, 0, 0.5));
  const fr = await seq("acierto", lt < cambio ? 0 : 4 + (lt - cambio) * 30);
  const kz = eInOut(seg(lt, fin, fin + 0.6));
  const salto = lt > cambio ? Math.sin(seg(lt, cambio, cambio + 0.3) * Math.PI) * 0.12 : 0;
  moviles[0].poner({
    x: lerp(-2.4, 0, k), y: -0.7 + salto, z: kz * 0.5, rx: -0.05, ry: lerp(1.2, 0.12, k) - kz * 0.12, rz: lerp(-0.3, 0, k), s: 1.28,
    img: fr, img2: T.perfecta, mezcla: seg(lt, fin, fin + 0.15),
    zoom: kz > 0 ? { cx: 0.5, cy: lerp(0.5, 0.36, kz), s: 1 + kz * 0.55 } : null,
    tap: lt > 1.2 * B && lt < cambio + 0.1 ? { x: ZOOM.tap.x, y: ZOOM.tap.y, k: seg(lt, 1.2 * B, cambio) } : null,
    flash: (lt > cambio ? 0.3 * (1 - seg(lt, cambio, cambio + 0.3)) : 0) + (lt > fin ? 0.4 * (1 - seg(lt, fin, fin + 0.3)) : 0),
  });
  M.particulas.material.uniforms.uWarp.value = lt > cambio ? 3 * (1 - Math.exp(-(lt - cambio) * 3)) : 0;
  C.texto("l1", "边学边练", "tit medio", lt, 0.1, BAR * 2, { y: 220, entrada: "pincel", dur: 0.4 });
  C.texto("l2", "答对<em>立刻反馈</em>，越学越上瘾", "sub", lt, B, BAR * 2, { y: 380, entrada: "letras" });
  C.chip("l3", "¡Correcto!", "答对了", lt, cambio, fin, { x: 300, y: 1360, cls: "jade", rot: -6 });
  C.chip("l4", "¡Perfecto!", "满分", lt, fin, BAR * 2, { x: 300, y: 1360, cls: "oro", rot: -6 });
  C.texto("l5", CIFRAS.leccion, "sub peq", lt, fin + 0.2, BAR * 2, { y: 505, entrada: "sube" });
};

// 5 · UNIDADES: teoría, vocabulario y diálogos (tres móviles en abanico)
ESC.unidades = async (lt) => {
  fondo({ c1: "#b3122b", c2: "#2a0207", rayos: 0.4, nubes: 0.6 });
  const giro = eInOut(seg(lt, 4 * B, 5 * B)); // el abanico gira para centrar el diálogo
  const imgs = [T.teoria, T.vocabulario, T.dialogo];
  imgs.forEach((img, i) => {
    const k = eBack(seg(lt, i * 0.5 * B, i * 0.5 * B + 0.5), 1.4);
    const ang = (i - 1) * 0.62 - giro * 0.62;
    const r = 3.2;
    const fuera = 1 - clamp(k);
    moviles[i].poner({ x: Math.sin(ang) * r * 0.5, y: -0.7 - fuera * 4, z: Math.cos(ang) * r - r - Math.abs(ang) * 0.3, ry: -ang * 0.9, rx: -0.04, s: 0.95 + (i === 2 ? giro * 0.15 : 0), img, halo: 0.3 + (Math.abs(ang) < 0.2 ? 0.4 : 0), brillo: 1 - Math.min(0.35, Math.abs(ang) * 0.5) });
  });
  C.texto("u1", `${CIFRAS.unidades} 个单元`, "tit medio", lt, 0.1, BAR * 2, { y: 215, entrada: "golpe", temblor: 6 });
  C.texto("u2", "语法·词汇·对话，<em>中文讲解</em>", "sub", lt, B, BAR * 2, { y: 375, entrada: "letras" });
  C.chip("u3", "el vocabulario", "词汇", lt, 2 * B, 4 * B, { x: 330, y: 1460, rot: -4 });
  // diálogo con voces
  C.libre("u4", "¿Y de segundo?<small>第二道菜要什么？</small>", "burbuja", lt, 5 * B, BAR * 2, { x: 330, y: 1240, rot: -3 });
  C.libre("u5", "El pollo asado, por favor.<small>请给我烤鸡。</small>", "burbuja der", lt, 6 * B, BAR * 2, { x: 650, y: 1420, rot: 3 });
  C.ondas(seg(lt, 5 * B, 5 * B + 0.2), lt, 540, 1580, 300);
  C.texto("u6", "<em>地道发音</em>，一点就听", "sub peq", lt, 5 * B, BAR * 2, { y: 505, entrada: "sube" });
};

// 6 · HERRAMIENTAS: pronunciación, diccionario, repaso
ESC.herramientas = async (lt) => {
  fondo({ c1: "#8f0c21", c2: "#1d0205", rayos: 0.5, nubes: 0.4 });
  const imgs = [T.pronunciacion, T.diccionario, T.repaso];
  const nombres = ["发音", "词典", "复习"];
  imgs.forEach((img, i) => {
    const k = eBack(seg(lt, i * B * 0.75, i * B * 0.75 + 0.45), 1.6);
    const x = (i - 1) * 1.02;
    moviles[i].poner({ x, y: lerp(-5, -0.55, k) + (i === 1 ? 0.12 : 0), z: i === 1 ? 0.25 : -0.2, ry: (1 - i) * 0.28 + Math.sin(lt * 2 + i) * 0.05, rx: -0.05, s: 0.66, img, halo: 0.35 });
    const p = proy(x, -0.55 - 1.12 * 0.66 - 0.12, 0);
    C.libre("hn" + i, nombres[i], "sello doble", lt, i * B * 0.75 + 0.2, BAR, { x: p.x, y: Math.min(p.y + 30, 1430), escala: 1, rot: -4 + i * 4 });
  });
  C.texto("h1", "发音·词典·复习", "tit medio", lt, 0.05, BAR, { y: 230, entrada: "pincel", dur: 0.35 });
  C.texto("h2", "<em>一站搞定</em>，随时随地学", "sub", lt, 0.5 * B, BAR, { y: 390, entrada: "letras" });
  C.chip("h3", "agua", "水", lt, 2.2 * B, BAR, { x: 540, y: 1500, cls: "jade" });
};

// 7 · PRÁCTICA: exámenes por nivel + PDF
ESC.practica = async (lt) => {
  const NIV = ["examA1", "examA2", "examB1", "examB2"];
  const idx = clamp(Math.floor(lt / B), 0, 3);
  fondo({ c1: ["#1f6b4a", "#b3122b", "#25407a", "#4a2a8a"][idx], c2: "#07040a", rayos: 0.45, nubes: 0.5 });
  const kf = eOut(seg(lt, 0, 0.55));
  const fase2 = seg(lt, 4 * B, 5 * B);
  // primer compás: los cuatro mundos de examen a golpe de beat; segundo: el examen y el PDF
  const img = lt < 4 * B ? T[NIV[idx]] : T.examen;
  moviles[0].poner({ x: lerp(0, -0.55, eInOut(fase2)), y: -0.7, z: lerp(0, -0.6, eInOut(fase2)), ry: (1 - kf) * Math.PI + Math.sin(lt * 1.5) * 0.08 + eInOut(fase2) * 0.35, rx: -0.05, s: 1.28, img, flash: lt < 4 * B ? golpeBeat(lt) * 0.25 : 0 });
  // la hoja impresa sale del móvil
  const kp = eOut(seg(lt, 5 * B, 6.4 * B));
  papel.visible = lt > 5 * B; papel.material.map = T.impresion;
  papel.position.set(lerp(-0.55, 0.55, kp), lerp(-0.6, -0.75, kp), lerp(-0.7, 0.9, kp));
  papel.rotation.set(-0.08 * kp, lerp(0.6, -0.22, kp), lerp(0, 0.06, kp));
  papel.scale.setScalar(lerp(0.3, 1, kp));
  C.texto("x1", "A1–B2 分级模考", "tit medio", lt, 0.05, BAR * 2, { y: 220, entrada: "golpe", temblor: 6 });
  C.texto("x2", "听·说·读·写 <em>四项全练</em>", "sub", lt, B, 4 * B, { y: 385, entrada: "letras" });
  C.texto("x3", "<em>一键打印</em> PDF 试卷", "sub", lt, 4 * B + 0.15, BAR * 2, { y: 385, entrada: "letras" });
  ["A1", "A2", "B1", "B2"].forEach((n, i) => C.chip("xn" + n, n, "", lt, i * B, 4 * B, { x: 170 + i * 0, y: 760 + i * 170, cls: ["jade", "", "azul", "morado"][i], rot: -5 }));
  C.chip("x4", `${CIFRAS.modelos} 套模拟题`, "", lt, 6 * B, BAR * 2, { x: 300, y: 1470, cls: "oro", rot: -4 });
};

// 8 · TUTOR: conversación con el Rey Mono
ESC.tutor = async (lt) => {
  fondo({ c1: "#c8102e", c2: "#260206", rayos: 0.7, nubes: 0.5 });
  const k = eOut(seg(lt, 0, 0.45));
  moviles[0].poner({ x: lerp(0, 0.28, k), y: -0.7, z: lerp(-6, 0, k), ry: -0.2 + Math.sin(lt * 1.7) * 0.05, rx: -0.04, s: 1.28, img: T.tutor, halo: 0.6 + golpeBeat(lt) * 0.4 });
  C.texto("tu1", "口语陪练", "tit medio", lt, 0.05, BAR, { y: 220, entrada: "golpe", temblor: 6 });
  C.texto("tu2", "和<em>美猴王</em>对话，模拟口语考试", "sub", lt, 0.5 * B, BAR, { y: 385, entrada: "letras" });
  C.libre("tu3", "¿Cómo te llamas?<small>你叫什么名字？</small>", "burbuja", lt, 1 * B, BAR, { x: 330, y: 1150, rot: -3 });
  C.libre("tu4", "Me llamo Li.<small>我叫小李。</small>", "burbuja der", lt, 2.2 * B, BAR, { x: 620, y: 1360, rot: 3 });
  C.ondas(seg(lt, 2.2 * B, 2.4 * B), lt, 620, 1500, 220, "#ffd54a");
};

// 9 · TV: la serie del Rey Mono (móvil en horizontal)
ESC.tv = async (lt) => {
  fondo({ c1: "#25407a", c2: "#05070f", rayos: 0.5, nubes: 0.6 });
  const kg = eInOut(seg(lt, 0.1, 0.75));
  const fr = SEQ.tv ? await seq("tv", lt * 30) : T.tv;
  moviles[0].poner({ x: 0, y: -0.35, z: 0.2, rz: kg * Math.PI / 2, ry: Math.sin(lt * 1.2) * 0.08, rx: -0.05, s: lerp(1.0, 1.1, kg), img: kg > 0.5 ? fr : T.tvLista, apaisado: kg > 0.5, halo: 0.5 });
  C.texto("tv1", "美猴王动画", "tit medio", lt, 0.05, BAR, { y: 260, entrada: "golpe", temblor: 6 });
  C.texto("tv2", "<em>追剧</em>也能学西语", "sub", lt, 0.5 * B, BAR, { y: 425, entrada: "letras" });
  C.chip("tv3", "¡Hola, Wukong!", "", lt, 2 * B, BAR, { x: 540, y: 1330, cls: "oro" });
};

// 10 · JUEGOS: carrusel 3D de seis móviles
ESC.juegos = async (lt) => {
  fondo({ c1: "#d4182f", c2: "#2a0207", rayos: 0.8, nubes: 0.6 });
  const JUEGOS = CAP_JUEGOS;
  const paso = Math.floor(lt / B), fr = (lt / B) % 1;
  const ang0 = (paso + eOut(clamp(fr * 2.2))) * (Math.PI * 2 / 6);
  const R = 1.45;
  JUEGOS.forEach((j, i) => {
    const a = i * (Math.PI * 2 / 6) - ang0 + Math.PI * 2 / 6;
    const x = Math.sin(a) * R, z = Math.cos(a) * R - R;
    moviles[i].poner({ x, y: -0.72, z, ry: a, s: 0.98, img: T[j.clave], brillo: 0.55 + 0.45 * Math.max(0, Math.cos(a)), halo: Math.cos(a) > 0.9 ? 0.6 : 0 });
  });
  const actual = JUEGOS[((paso + 1) % 6 + 6) % 6];
  C.texto("j1", `${CIFRAS.juegos} 款小游戏`, "tit medio", lt, 0.05, BAR * 2, { y: 215, entrada: "golpe", temblor: 6 });
  C.texto("j2", "<em>边玩边学</em>，单词自动记牢", "sub", lt, 0.5 * B, BAR * 2, { y: 380, entrada: "letras" });
  JUEGOS.forEach((j, i) => C.chip("jn" + i, j.zh, "", lt, (i + 0) * B + 0.08, (i + 1) * B + 0.05, { x: 540, y: 1500, cls: "oro" }));
  M.camara.position.y += golpeBeat(lt) * 0.02;
  void actual;
};

// 11 · TURBO RUSH 3D: velocidad
ESC.turbo = async (lt) => {
  fondo({ c1: "#ff6a1a", c2: "#3a0505", rayos: 1.0, nubes: 0.3, cy: 0.45 });
  const fr = SEQ.turbo ? await seq("turbo", lt * (SEQ.turbo.fps || 30)) : T.turbo;
  const k = eOut(seg(lt, 0, 0.4));
  const vol = Math.sin(lt * 2.6) * 0.16;
  moviles[0].poner({ x: vol * 0.6, y: -0.5, z: lerp(-8, 0.55, k), rz: vol * 0.6, ry: vol * 0.5, rx: -0.08, s: 1.28, img: fr, halo: 0.8, apaisado: !!(SEQ.turbo && SEQ.turbo.apaisado) });
  C.velocidad(0.9 * k, lt, 540, 1000);
  M.particulas.material.uniforms.uWarp.value = lt * 6; M.particulas.material.uniforms.uK.value = 1.4;
  const sh = golpeBeat(lt) * 0.05;
  M.camara.position.x += Math.sin(lt * 60) * sh; M.camara.position.y += Math.cos(lt * 47) * sh;
  C.texto("tr1", "3D 极速赛车", "golpe", lt, 0.05, BAR * 2, { y: 250, entrada: "golpe", temblor: 14, escala: 0.8 });
  C.texto("tr2", "WUKONG TURBO RUSH", "es", lt, B, BAR * 2, { y: 410, entrada: "pincel", dur: 0.4 });
  C.texto("tr3", CIFRAS.turboSub, "sub", lt, 3 * B, BAR * 2, { y: 520, entrada: "letras" });
  C.chip("tr4", CIFRAS.turboPalabra, CIFRAS.turboPalabraZh, lt, 5 * B, BAR * 2, { x: 300, y: 1450, cls: "oro", rot: -6 });
};

// 12 · PROGRESO
ESC.progreso = async (lt) => {
  fondo({ c1: "#c8961e", c2: "#3a1404", rayos: 0.6, nubes: 0.5 });
  const k = eOut(seg(lt, 0, 0.5));
  moviles[0].poner({ x: lerp(-2.5, -0.15, k), y: -0.7, z: 0, ry: lerp(1.4, 0.25, k), rx: -0.05, s: 1.28, img: lt < 2 * B ? T.progreso : T.progreso2, flash: lt > 2 * B ? 0.3 * (1 - seg(lt, 2 * B, 2 * B + 0.25)) : 0 });
  spr(S.trofeo, { x: 0.95, y: -1.55, z: 0.9, a: k, t: lt, esc: eBack(seg(lt, B, B + 0.4)), rz: Math.sin(lt * 4) * 0.05 });
  C.texto("pg1", "学习进度", "tit medio", lt, 0.05, BAR, { y: 220, entrada: "golpe", temblor: 6 });
  C.texto("pg2", "<em>通过概率</em>实时预测", "sub", lt, 0.5 * B, BAR, { y: 385, entrada: "letras" });
  C.chip("pg3", "¡Apto!", "通过", lt, 2 * B, BAR, { x: 280, y: 1400, cls: "jade", rot: -6 });
};

// 13 · IDIOMAS: siete idiomas de ayuda en órbita (respiro musical)
ESC.idiomas = async (lt) => {
  fondo({ c1: "#3b2416", c2: "#0a0503", rayos: 0.3, nubes: 0.8, img: T.papel, imgK: 0.0 });
  M.particulas.material.uniforms.uVel.value = 0.12;
  const k = eOut(seg(lt, 0, 0.5));
  moviles[0].poner({ x: 0, y: -0.45, z: lerp(-3, -0.4, k), ry: lt * 0.5 - 0.4, rx: -0.06, s: 0.95, img: T.idiomas, halo: 0.6 });
  const L = ["中文", "English", "Français", "Deutsch", "Nederlands", "Русский", "日本語"];
  L.forEach((l, i) => {
    const a = i / L.length * Math.PI * 2 + lt * 0.9;
    const p = proy(Math.sin(a) * 1.55, -0.45 + Math.cos(a * 2) * 0.12 + (i % 2 ? 0.55 : -0.55) * 0, Math.cos(a) * 1.0 - 0.4);
    const el = C.chip("id" + i, l, "", lt, 0.1 + i * 0.07, BAR, { x: p.x, y: p.y + (i - 3) * 60, cls: i === 0 ? "oro" : "tinta", flota: 0 });
    if (el) { el.style.zIndex = Math.cos(a) > 0 ? 5 : 0; el.style.filter = Math.cos(a) > 0 ? "none" : "brightness(.6)"; }
  });
  C.texto("i1", "7 种辅助语言", "tit medio", lt, 0.05, BAR, { y: 220, entrada: "pincel", dur: 0.4 });
  C.texto("i2", "讲解<em>随心切换</em>，看不懂也不怕", "sub", lt, 0.5 * B, BAR, { y: 385, entrada: "letras" });
};

// 14 · BENEFICIOS: cifras
ESC.beneficios = async (lt) => {
  fondo({ c1: "#d4182f", c2: "#2a0207", rayos: 0.9, nubes: 0.6 });
  const i = clamp(Math.floor(lt / (2 * B)), 0, 3);
  const C4 = [[CIFRAS.unidades, "个单元", "unidades"], [CIFRAS.modelos, "套模拟题", "exámenes"], [CIFRAS.juegos, "款游戏", "juegos"], ["7", "种辅助语言", "idiomas"]];
  C4.forEach(([n, zh, es], j) => {
    const ini = j * 2 * B, fin = j === 3 ? BAR * 2 : (j + 1) * 2 * B;
    const kk = seg(lt, ini, ini + 0.5);
    const valor = Math.round(+n * eOut(kk));
    C.libre("bn" + j, String(valor), "cifra", lt, ini, fin, { y: 820, entrada: "golpe", dur: 0.25 });
    C.texto("bz" + j, zh, "sub grande", lt, ini + 0.1, fin, { y: 1010, entrada: "golpe" });
    C.texto("be" + j, es.toUpperCase(), "es", lt, ini + 0.2, fin, { y: 1130, entrada: "pincel", dur: 0.3 });
  });
  spr(S.trofeo, { x: 0, y: -1.75, z: 0.5, a: 1, t: lt, esc: 1 + golpeBeat(lt, 2) * 0.12, rz: Math.sin(lt * 3) * 0.05 });
  spr(S.luzI, { x: -1.2, y: 0.4, z: -1.5, a: 0.7, t: lt, rz: 0.2 });
  spr(S.luzD, { x: 1.2, y: 0.4, z: -1.5, ry: Math.PI, a: 0.7, t: lt + 1, rz: -0.2 });
  C.texto("bt", "一个 App，全部搞定", "sub", lt, 0, BAR * 2, { y: 300, entrada: "letras" });
  void i;
};

// 15 · CIERRE: vuelo con el dragón + logo + QR
ESC.cierre = async (lt) => {
  const fase2 = lt >= PANEL;
  const fr = await seq("vuelo", Math.min(lt * 30, SEQ.vuelo.n - 1));
  fondo({ c1: "#c8102e", c2: "#2a0207", rayos: 0.6, nubes: 0.7, img: fr, imgK: fase2 ? 0.5 : 0.85, asp: 16 / 9, blur: fase2 ? 4 : 2.5, zoom: 1.0, brillo: fase2 ? 0.55 : 0.75, off: [0.08, 0] });
  // panel de cine flotante con el vuelo (compases 25-26)
  const kp = eOut(seg(lt, 0, 0.6)), sp = eIn(seg(lt, PANEL - 0.4, PANEL));
  marcoPanel.visible = !fase2;
  panel.material.map = fr;
  marcoPanel.position.set(0, lerp(-3, -0.25, kp) + sp * 4, lerp(-4, 0.2, kp));
  marcoPanel.rotation.set(-0.12 * (1 - kp) + Math.sin(lt) * 0.03, Math.sin(lt * 0.8) * 0.12, -0.02);
  C.texto("c1", "和悟空一起", "tit medio", lt, 0.1, PANEL - 0.05, { y: 360, entrada: "pincel", dur: 0.4 });
  C.texto("c2", "闯荡<em>西语世界</em>", "sub grande", lt, 1 * B, PANEL - 0.05, { y: 1450, entrada: "letras" });
  // logo y llamada a la acción (desde el compás 27)
  const l = lt - PANEL;
  C.destello(fase2 ? 1 - eOut(seg(l, 0, 0.4)) : 0);
  C.libre("c3", "悟", "sello", l, 0, 99, { x: 540, y: 250, entrada: "golpe", escala: 1.15, rot: -4 });
  C.texto("c4", "悟空西语", "tit grande", l, 0.15, 99, { y: 455, entrada: "golpe", temblor: 8 });
  C.texto("c5", "WUKONG ESPAÑOL", "es", l, 0.4, 99, { y: 610, entrada: "pincel", dur: 0.45 });
  C.libre("c6", `<img src="/promo-douyin/film/qr-web.png">`, "marco-qr", l, 2 * B, 99, { x: 540, y: 935, entrada: "pop" });
  C.texto("c7", "扫码<em>立即开学</em>", "sub grande", l, 3 * B, 99, { y: 1215, entrada: "letras" });
  C.texto("c8", "sergibauli.github.io/wukong-espanol", "url", l, 4 * B, 99, { y: 1325, entrada: "sube" });
  C.texto("c9", "今天就<em>开口说西语</em>！", "sub", l, 5 * B, 99, { y: 1425, entrada: "letras" });
  spr(S.saluda, { x: -1.0, y: -1.35, z: 0.7, a: fase2 ? clamp(l * 3) : 0, t: lt, esc: eBack(seg(l, 0.3, 0.8)), rz: Math.sin(lt * 2.5) * 0.06 });
  spr(S.dragon2, { x: 1.05, y: lerp(-3, -1.25, eOut(seg(l, 0.3, 1.2))), z: 0.2, ry: Math.PI, a: fase2 ? 1 : 0, t: lt, rz: 0.1 });
  nubes(lt, fase2 ? 1 : 0.5, -1);
};

// ---------------- bucle principal ----------------
let CAP_ZOOM, CAP_JUEGOS;
window.pintar = async (t) => {
  C.empezarCapa(); C.limpiarFx(); C.destello(0);
  M.camara.position.set(0, 0, 9); M.camara.lookAt(0, 0, 0);
  for (const m of moviles) m.g.visible = false;
  for (const s of Object.values(S)) (Array.isArray(s) ? s : [s]).forEach((x) => (x.visible = false));
  papel.visible = false; marcoPanel.visible = false;
  M.ponerCristales(-1);
  const P = M.particulas.material.uniforms; P.uK.value = 1; P.uVel.value = 0.25; P.uExplota.value = 0; P.uWarp.value = 0;
  const sec = SECCIONES.find((s) => t >= s.ini * BAR && t < s.fin * BAR) || SECCIONES[SECCIONES.length - 1];
  const lt = t - sec.ini * BAR;
  await ESC[sec.id](lt);
  M.camara.lookAt(0, M.camara.position.y * 0.5, 0);
  M.render(t);
  C.terminarCapa();
};

(async () => {
  await preparar();
  const mat = await import("./material.js");
  CAP_ZOOM = mat.ZOOM; CAP_JUEGOS = mat.JUEGOS;
  window.LISTO = true;
})();
