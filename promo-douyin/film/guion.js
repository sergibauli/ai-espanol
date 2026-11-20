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
const SPRITES = ["mono-serio", "mono-grande", "mono-lift", "mono-guino", "mono-saluda", "mono-trofeo", "mono-feliz", "mono-poder", "dragon-v2", "dragon-luz", "dragon", "nube", "montes", "rodillo"];
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
  M.crearDecor();
  M.crearEscenario(M.sprite("dragon-luz", 2.4, { aditivo: true, onda: 0.06 }));
  S.mono = M.sprite("mono-grande", 1.9);
  S.monoLift = M.sprite("mono-lift", 1.6);
  S.guino = M.sprite("mono-guino", 1.5);
  S.serio = M.sprite("mono-serio", 1.25);
  S.saluda = M.sprite("mono-lift", 1.45);
  S.trofeo = M.sprite("mono-trofeo", 1.3);
  S.feliz = M.sprite("mono-feliz", 1.2);
  S.poder = M.sprite("mono-poder", 1.3);
  S.dragon = M.sprite("dragon-v2", 2.8, { onda: 0.05 });
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
function fondo({ libre = false, c1 = "#b3122b", c2 = "#2a0207", rayos = 0.35, nubes = 0.5, img = null, imgK = 0, asp = 1, blur = 2.5, zoom = 1, tinta = 0, brillo = 1, cx = 0.5, cy = 0.55, off = [0, 0] } = {}) {
  if (!libre) { c1 = "#4a0a14"; c2 = "#060102"; rayos = Math.min(rayos, 0.22); nubes = Math.min(nubes, 0.25); }
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
  const fr = await seq("puerta", 18 + lt * 30);
  fondo({ libre: true, c1: "#c8102e", c2: "#2a0207", rayos: 0.3, nubes: 0.15, img: fr, imgK: 1, asp: 540 / 960, blur: 0.3, zoom: 1.02 + lt * 0.05, brillo: 0.95, cy: 0.6 });
  const P = M.particulas.material.uniforms; P.uK.value = 1.2; P.uWarp.value = 4 * (1 - Math.exp(-lt * 1.5));
  C.destello(0.9 * (1 - eOut(seg(lt, 0, 0.4))) + 0.5 * Math.exp(-Math.max(0, lt - 4 * B) * 8) * (lt > 4 * B ? 1 : 0));
  C.texto("g1", "想去<em>西班牙</em>", "tit2 grande", lt, 0.12, BAR * 2 - 0.08, { y: 290, entrada: "golpe", temblor: 12, salida: "golpe" });
  C.texto("g2", "留学 · 工作 · 旅行？", "sub grande banda", lt, 1.5 * B, BAR * 2 - 0.08, { y: 470, entrada: "pincel", dur: 0.3 });
  C.texto("g3", "<em>零基础</em>也能学会！", "golpe", lt, 4 * B, BAR * 2 - 0.08, { y: 1180, entrada: "golpe", temblor: 12, escala: 0.62, salida: "golpe" });
  C.texto("g4", "悟空西语 · 从 A1 到 B2", "franja", lt, 2.5 * B, BAR * 2 - 0.08, { y: 1400, entrada: "pincel", dur: 0.35 });
  C.destello(eIn(seg(lt, BAR * 2 - 0.2, BAR * 2)));
};

// 1 · PROBLEMA: las dudas del estudiante, en tinta
ESC.problema = async (lt) => {
  fondo({ libre: true, c1: "#2a1a12", c2: "#070403", rayos: 0, nubes: 0.15, tinta: 0.82 });
  M.particulas.material.uniforms.uK.value = 0.35;
  const sale = seg(lt, 6 * B, 6 * B + 0.3);
  [[-0.9, -2.15, -0.5, 0], [1.0, -2.3, -1, 1], [0.1, -2.6, 0.3, 2]].forEach(([x, y, z, i]) => spr(S.montes[i], { x: x + lt * 0.03 * (i - 1), y, z, a: 0.55, t: lt }));
  // palabras difíciles flotando de fondo
  C.tinta(1 - eOut(seg(lt, 0, 0.35)));
  const kp = eBack(seg(lt, 0, 0.5), 1.6);
  spr(S.serio, { x: 0, y: -1.15, z: 0.6, a: lt < 6 * B ? clamp(lt * 4) : 0, t: lt, esc: kp, rz: Math.sin(lt * 7) * 0.04 });
  ["ser / estar", "subjuntivo", "¿por o para?", "pretérito", "el / la", "-ar -er -ir"].forEach((w, i) => {
    const a = i / 6 * Math.PI * 2 + lt * 1.1;
    const p = proy(Math.sin(a) * 1.25, -0.7 + Math.cos(a * 1.0) * 0.55, Math.cos(a) * 0.8);
    const el = C.chip("pw" + i, w, "", lt, 0.15 + i * 0.12, 6 * B, { x: p.x, y: p.y, cls: "tinta", flota: 0, escala: 0.75 });
    if (el) el.style.zIndex = Math.cos(a) > 0 ? 5 : 0;
  });
  C.texto("p1", "单词<em>背了就忘</em>？", "golpe rojo", lt, 0.05, 6 * B + 0.25, { y: 470, entrada: "golpe", temblor: 10, escala: 0.66, salida: "izq" });
  C.texto("p2", "语法<em>越学越乱</em>？", "golpe rojo", lt, 2 * B, 6 * B + 0.25, { y: 625, entrada: "golpe", temblor: 10, escala: 0.66, salida: "izq" });
  C.texto("p3", "想开口却<em>不敢说</em>？", "golpe rojo", lt, 4 * B, 6 * B + 0.25, { y: 780, entrada: "golpe", temblor: 10, escala: 0.66, salida: "izq" });
  // giro: aparece el Rey Mono guiñando
  C.texto("p4", "别慌！", "golpe", lt, 6 * B, BAR * 2, { y: 560, entrada: "golpe", temblor: 16, escala: 1.1 });
  C.texto("p5", "让<em>悟空</em>带你学", "sub grande", lt, 6.5 * B, BAR * 2, { y: 760, entrada: "letras" });
  const km = eBack(seg(lt, 6 * B, 6 * B + 0.4), 2);
  spr(S.guino, { x: 0.15, y: lerp(-3.5, -1.15, km), z: 0.5, a: sale > 0 ? 1 : 0, t: lt, rz: Math.sin(lt * 6) * 0.05 });
  C.destello(eIn(seg(lt, BAR * 2 - 0.18, BAR * 2)) * 0.9);
};

// 2 · REVELACIÓN: el móvil sale de la puerta (drop)
ESC.revelacion = async (lt) => {
  fondo({ libre: true, c1: "#7a0c1c", c2: "#060102", rayos: 0.45, nubes: 0.2, img: T.paisaje, imgK: 0.85, asp: 1598 / 1000, blur: 1.2, zoom: 1.15 + lt * 0.04, brillo: 0.7, off: [0.05, 0] });
  const pv = await seq("portadaV", 10 + Math.max(0, lt - 1.2) * 30 * 2.3);
  M.particulas.material.uniforms.uK.value = 1.1;
  C.destello(1 - eOut(seg(lt, 0, 0.45)));
  const k = eOut(seg(lt, 0.05, 1.3));
  const m = moviles[0];
  const orb = seg(lt, 1.2, BAR * 2);
  m.poner({ x: lerp(0, 0.18, orb), y: lerp(1.2, -0.86, k), z: lerp(-16, 0, k), rx: (1 - k) * 0.8 - 0.1 * k, ry: (1 - k) * Math.PI * 4 + k * lerp(0.42, -0.32, eInOut(orb)), rz: (1 - k) * 0.4, s: 1.2, img: pv, halo: 0.7 });
  M.sacarTarjeta(0, m, await seq("portadaV", 10), { x: 0.02, y: 0.025, w: 0.96, h: 0.13 }, seg(lt, 1.5, 2.1), { x: -0.12, y: 0.12, z: 1.6, rx: -0.12, ry: 0.32, rz: -0.04, s: 1.05 });
  const kd = seg(lt, 0.6, BAR * 2);

  C.texto("r1", "悟空西语", "tit grande", lt, 2 * B, BAR * 2, { y: 245, entrada: "golpe", temblor: 8 });
  C.texto("r2", "WUKONG ESPAÑOL", "es", lt, 3 * B, BAR * 2, { y: 410, entrada: "pincel", dur: 0.45 });
  C.texto("r3", "专为<em>中国学生</em>打造的西语神器", "sub", lt, 3.5 * B, BAR * 2, { y: 520, entrada: "letras" });
};

// 3 · APRENDER: ruta por mundos A1→B2 (un mundo por beat)
ESC.aprender = async (lt) => {
  const i = clamp(Math.floor((lt / B - 2) / 1.1), 0, 3);
  const nivel = ["A1", "A2", "B1", "B2"][lt < 2 * B ? 0 : i];
  fondo({ c1: ["#1f6b4a", "#b3122b", "#25407a", "#4a2a8a"][lt < 2 * B ? 0 : i], c2: "#06080a", rayos: 0.3, nubes: 0.4, img: T["ruta" + nivel], imgK: 0.6, asp: 1, blur: 5.5, brillo: 0.6 });
  const k = eOut(seg(lt, 0, 0.6));
  const cambio = lt >= 2 * B ? golpeBeat(lt - 2 * B, 1.1) : 0;
  const img = lt < 1.2 * BAR ? await seq("ruta3", lt * 30 * 2.0) : await seq("ruta3", 300 + (lt - 1.2 * BAR) * 30 * 3.2);
  const orb = eInOut(seg(lt, 0.5, BAR * 2));
  moviles[0].poner({ x: lerp(2.5, 0.25, k) - orb * 0.3, y: -0.7, z: cambio * 0.4, rx: -0.14, ry: lerp(-1.3, -0.42, k) + orb * 0.7, rz: lerp(0.3, 0.02, k), s: 1.36, img, flash: cambio * 0.3 });
  M.sacarTarjeta(0, moviles[0], await seq("ruta3", 0), { x: 0.0, y: 0.072, w: 1.0, h: 0.053 }, seg(lt, 0.9, 1.5), { x: 0, y: 0.62, z: 1.7, rx: -0.25, ry: -0.18 + orb * 0.3, rz: 0.03, s: 1.12 });
  C.texto("a1", "A1→B2 <em>闯关地图</em>", "tit2", lt, 0.1, BAR * 2, { y: 200, entrada: "pincel", dur: 0.4 });
  C.texto("a1es", "RUTA DE APRENDIZAJE · A1–B2", "es-peq", lt, 0.1 + 0.15, BAR * 2, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("a2", "<em>四大世界</em>，一关关往上闯", "sub", lt, B, BAR * 2, { y: 378, entrada: "letras" });


  M.camara.position.y += golpeBeat(lt) * 0.015;
};

// 4 · LECCIONES: ejercicio → ¡correcto! → ¡lección perfecta!
ESC.lecciones = async (lt) => {
  const cambio = 2.5 * B, fin = 5 * B;
  fondo({ rayos: 0.4 });
  const k = eOut(seg(lt, 0, 0.5));
  const fr = await seq("acierto", lt < cambio ? 0 : 7 + (lt - cambio) * 30);
  const frFin = lt >= fin ? await seq("fin", 14 + (lt - fin) * 30) : null;
  const kz = eInOut(seg(lt, fin, fin + 0.6));
  const salto = lt > cambio ? Math.sin(seg(lt, cambio, cambio + 0.3) * Math.PI) * 0.12 : 0;
  moviles[0].poner({
    x: lerp(-2.4, -0.1, k), y: -0.7 + salto, z: kz * 0.4, rx: -0.12, ry: lerp(1.2, 0.38, k) - eInOut(seg(lt, 0.5, BAR * 2)) * 0.6, rz: lerp(-0.3, 0, k), s: 1.34,
    img: lt >= fin ? frFin : fr,
    zoom: kz > 0 ? { cx: 0.5, cy: lerp(0.5, 0.4, kz), s: 1 + kz * 0.35 } : null,
    tap: lt > 1.2 * B && lt < cambio + 0.1 ? { x: ZOOM.tap.x, y: ZOOM.tap.y, k: seg(lt, 1.2 * B, cambio) } : null,
    flash: (lt > cambio ? 0.3 * (1 - seg(lt, cambio, cambio + 0.3)) : 0) + (lt > fin ? 0.4 * (1 - seg(lt, fin, fin + 0.3)) : 0),
  });
  M.particulas.material.uniforms.uWarp.value = lt > cambio ? 3 * (1 - Math.exp(-(lt - cambio) * 3)) : 0;
  const frOk = await seq("acierto", 40);
  const sale = seg(lt, fin - 0.35, fin);
  M.sacarTarjeta(0, moviles[0], frOk, { x: 0.52, y: 0.34, w: 0.36, h: 0.23 }, seg(lt, cambio + 0.1, cambio + 0.55) * (1 - sale), { x: 0.42, y: -0.1, z: 1.9, rx: -0.1, ry: -0.35, rz: -0.06, s: 1.25 });
  M.sacarTarjeta(1, moviles[0], frOk, { x: 0.72, y: 0.1, w: 0.22, h: 0.075 }, seg(lt, cambio + 0.35, cambio + 0.8) * (1 - sale), { x: 0.5, y: 0.7, z: 2.3, rx: 0, ry: -0.2, rz: 0.18, s: 1.8 });
  M.sacarTarjeta(2, moviles[0], frOk, { x: 0.0, y: 0.82, w: 1.0, h: 0.09 }, seg(lt, cambio + 0.6, cambio + 1.0) * (1 - sale), { x: -0.05, y: -1.6, z: 1.9, rx: 0.15, ry: 0.25, rz: 0.03, s: 1.1 });
  C.texto("l1", "边学<em>边练</em>", "tit2", lt, 0.1, BAR * 2, { y: 200, entrada: "pincel", dur: 0.4 });
  C.texto("l1es", "LECCIONES INTERACTIVAS", "es-peq", lt, 0.1 + 0.15, BAR * 2, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("l2", "<em>即时反馈</em>，越学越上瘾", "sub", lt, B, BAR * 2, { y: 378, entrada: "letras" });
  C.chip("l4", "¡Perfecto!", "满分", lt, fin, BAR * 2, { x: 640, y: 1480, cls: "oro", rot: 5 });
  C.texto("l5", CIFRAS.leccion, "sub peq", lt, fin + 0.2, BAR * 2, { y: 505, entrada: "sube" });
};

// 5 · UNIDADES: teoría, vocabulario y diálogos (tres móviles en abanico)
ESC.unidades = async (lt) => {
  fondo({ rayos: 0.2 });
  const k = eOut(seg(lt, 0, 0.5));
  const img = await seq("unidad1", lt * 30 * 2.0);
  const orb = eInOut(seg(lt, 0.4, BAR * 2));
  moviles[0].poner({ x: lerp(-2.4, -0.25, k), y: -0.7, z: 0, rx: -0.12, ry: lerp(1.1, 0.5, k) - orb * 0.55, s: 1.3, img });
  const fv = await seq("unidad1", 170);
  [[0.18, "¡Hola!"], [0.35, "Buenos días"], [0.52, "Buenas tardes"]].forEach(([y], i) => {
    const ini = 4 * B + i * 0.55 * B;
    M.sacarTarjeta(i, moviles[0], fv, { x: 0.04, y, w: 0.92, h: 0.15 }, seg(lt, ini, ini + 0.45), { x: 0.18, y: 0.2 - i * 0.6, z: 1.8 + i * 0.1, rx: -0.05, ry: -0.38, rz: (i - 1) * 0.04, s: 0.8 });
  });
  C.texto("u1", `${CIFRAS.unidades} 个<em>单元</em>`, "tit2", lt, 0.1, BAR * 2, { y: 200, entrada: "golpe", temblor: 6 });
  C.texto("u1es", "DEL A1 AL B2 · TEORÍA EN CHINO", "es-peq", lt, 0.25, BAR * 2, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("u2", "语法·词汇·对话，<em>中文讲解</em>", "sub", lt, B, BAR * 2, { y: 378, entrada: "letras" });
  post(() => C.rotulo("u3", "从第一课学起", "Unidad 1 · Hola y adiós", lt, 0.6 * B, 3 * B, { x: 215, y: 640, punto: moviles[0].punto(0.5, 0.35) }));
};

// 6 · HERRAMIENTAS: pronunciación, diccionario, repaso
ESC.herramientas = async (lt) => {
  fondo({ rayos: 0.25 });
  const vids = [await seq("pron", 10 + lt * 30 * 1.2), await seq("dicc", 5 + lt * 30 * 1.3)];
  ["发音神殿", "西汉词典"].forEach((nom, i) => {
    const k = eBack(seg(lt, i * 0.35 * B, i * 0.35 * B + 0.45), 1.5);
    const x = i ? 0.6 : -0.6;
    moviles[i].poner({ x: x * 1.05, y: lerp(-5, -0.55, k), z: i ? -0.2 : 0.1, ry: (i ? -1 : 1) * 0.42 + Math.sin(lt * 1.2 + i) * 0.06, rx: -0.12, s: 0.98, img: vids[i], halo: 0.35 });
    const p = proy(x, -0.5 - 1.12 * 0.98 - 0.1, 0);
    C.libre("hn" + i, nom, "sello doble", lt, i * 0.35 * B + 0.2, 2 * BAR, { x: Math.max(220, Math.min(p.x, 820)), y: Math.min(p.y + 25, 1470), escala: 0.9, rot: i ? 4 : -4 });
  });
  const fd = await seq("dicc", 141), fp = await seq("pron", 60);
  M.sacarTarjeta(0, moviles[1], fd, { x: 0.06, y: 0.07, w: 0.88, h: 0.3 }, seg(lt, 4.6 * B, 5.2 * B), { x: 0.25, y: 0.5, z: 2.0, rx: -0.12, ry: -0.3, rz: 0.04, s: 1.1 });
  M.sacarTarjeta(1, moviles[0], fp, { x: 0.12, y: 0.53, w: 0.76, h: 0.15 }, seg(lt, 2.4 * B, 3.0 * B), { x: -0.5, y: -1.75, z: 2.0, rx: 0.1, ry: 0.35, rz: -0.03, s: 1.3 });
  C.texto("h1", "发音·<em>词典</em>", "tit2", lt, 0.05, 2 * BAR, { y: 200, entrada: "pincel", dur: 0.35 });
  C.texto("h1es", "PRONUNCIACIÓN · DICCIONARIO", "es-peq", lt, 0.2, 2 * BAR, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("h2", "<em>一站搞定</em>，随时随地学", "sub", lt, 0.5 * B, 2 * BAR, { y: 378, entrada: "letras" });
};

// 7 · PRÁCTICA: exámenes por nivel + PDF
ESC.practica = async (lt) => {
  const NIV = ["examA1", "examA2", "examB1", "examB2"];
  const idx = clamp(Math.floor(lt / B), 0, 3);
  fondo({ c1: ["#1f6b4a", "#b3122b", "#25407a", "#4a2a8a"][idx], c2: "#07040a", rayos: 0.45, nubes: 0.5 });
  const kf = eOut(seg(lt, 0, 0.55));
  const fase2 = seg(lt, 4 * B, 5 * B);
  // primer compás: los cuatro mundos de examen a golpe de beat; segundo: el examen y el PDF
  const img = await seq("examenes", 4 + lt * 30 * 1.45);
  moviles[0].poner({ x: lerp(0, -0.55, eInOut(fase2)), y: -0.7, rx: -0.12, z: lerp(0, -0.6, eInOut(fase2)), ry: (1 - kf) * Math.PI + Math.sin(lt * 1.5) * 0.08 + eInOut(fase2) * 0.35, rx: -0.05, s: 1.4, img, flash: lt < 4 * B ? golpeBeat(lt) * 0.25 : 0 });
  // la hoja impresa sale del móvil
  const kp = eOut(seg(lt, 5 * B, 6.4 * B));
  papel.visible = lt > 5 * B; papel.material.map = T.impresion;
  papel.position.set(lerp(-0.55, 0.35, kp), lerp(-0.6, -0.45, kp), lerp(-0.7, 0.9, kp));
  papel.rotation.set(-0.08 * kp, lerp(0.6, -0.22, kp), lerp(0, 0.06, kp));
  papel.scale.setScalar(lerp(0.3, 0.9, kp));
  C.texto("x1", "A1–B2 <em>分级模考</em>", "tit2", lt, 0.05, BAR * 2, { y: 200, entrada: "golpe", temblor: 6 });
  C.texto("x1es", "EXÁMENES POR NIVEL", "es-peq", lt, 0.05 + 0.15, BAR * 2, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("x2", "听说读写，<em>四项全练</em>", "sub", lt, B, 4 * B, { y: 378, entrada: "letras" });
  C.texto("x3", "<em>一键打印</em> PDF 试卷", "sub", lt, 4 * B + 0.15, BAR * 2, { y: 378, entrada: "letras" });
  C.chip("x4", `${CIFRAS.modelos} 套模拟题`, "", lt, 6.2 * B, BAR * 2, { x: 300, y: 1500, cls: "oro", rot: -4 });
};

// 7b · CORRECCIÓN: el examen se corrige solo (aciertos, fallos y explicación en chino)
ESC.correccion = async (lt) => {
  fondo({ rayos: 0.25 });
  const k = eOut(seg(lt, 0, 0.5));
  const fase2 = lt >= 3 * B;
  const img = fase2 ? T.examenOk : await seq("correccionV", lt * 30 * 1.6);
  const kz = fase2 ? Math.sin(Math.PI * seg(lt, 3 * B, 5.2 * B)) : 0;
  moviles[0].poner({ x: lerp(2.4, 0.15, k), y: -0.62, ry: lerp(-1.1, -0.15, k), rx: -0.05, s: 1.4, img, flash: fase2 ? 0.4 * (1 - seg(lt, 3 * B, 3 * B + 0.25)) : 0,
    zoom: kz > 0.01 ? { cx: 0.72, cy: 0.25, s: 1 + 0.7 * kz } : null });
  M.sacarTarjeta(0, moviles[0], T.examenOk, { x: 0.05, y: 0.52, w: 0.9, h: 0.2 }, seg(lt, 5.3 * B, 5.9 * B), { x: 0.15, y: -1.3, z: 2.0, rx: 0.08, ry: -0.3, rz: -0.03, s: 1.0 });
  M.sacarTarjeta(1, moviles[0], T.examenOk, { x: 0.72, y: 0.18, w: 0.22, h: 0.1 }, seg(lt, 3.5 * B, 4.0 * B), { x: 0.5, y: 0.55, z: 2.2, rx: 0, ry: -0.2, rz: 0.15, s: 1.8 });
  C.texto("co1", "自动<em>批改</em>", "tit2", lt, 0.05, BAR * 2, { y: 200, entrada: "golpe", temblor: 6 });
  C.texto("co1es", "CORRECCIÓN AUTOMÁTICA", "es-peq", lt, 0.2, BAR * 2, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("co2", "做完就批改，<em>错在哪</em>一目了然", "sub", lt, 0.5 * B, BAR * 2, { y: 378, entrada: "letras" });
  post(() => {
    const m = moviles[0];
    C.rotulo("co3", "对错一秒出", "Aciertos y fallos al instante", lt, 3.3 * B, BAR * 2, { x: 215, y: 640, punto: m.punto(0.85, 0.23) });
  });
  C.chip("co5", "¡Correcto!", "回答正确", lt, 4 * B, 5.2 * B, { x: 300, y: 1420, cls: "jade", rot: -5 });
};

// 8 · TUTOR: conversación con el Rey Mono
ESC.tutor = async (lt) => {
  const ftu = await seq("tutorV", 190);
  fondo({ c1: "#c8102e", c2: "#260206", rayos: 0.7, nubes: 0.5 });
  const k = eOut(seg(lt, 0, 0.45));
  moviles[0].poner({ x: lerp(0, 0.28, k), y: -0.62, z: lerp(-6, 0, k), ry: -0.2 + Math.sin(lt * 1.7) * 0.05, rx: -0.04, s: 1.4, img: await seq("tutorV", 30 + lt * 30 * 1.45), halo: 0.6 + golpeBeat(lt) * 0.4 });
  M.sacarTarjeta(0, moviles[0], ftu, { x: 0.2, y: 0.52, w: 0.72, h: 0.2 }, seg(lt, 4.6 * B, 5.2 * B), { x: 0.2, y: -1.35, z: 2.0, rx: 0.08, ry: -0.3, rz: -0.03, s: 1.25 });
  M.sacarTarjeta(1, moviles[0], ftu, { x: 0.25, y: 0.43, w: 0.68, h: 0.07 }, seg(lt, 3.6 * B, 4.1 * B), { x: 0.3, y: 0.55, z: 1.9, rx: -0.1, ry: -0.3, rz: 0.04, s: 1.3 });
  C.texto("tu1", "口语<em>陪练</em>", "tit2", lt, 0.05, 2 * BAR, { y: 200, entrada: "golpe", temblor: 6 });
  C.texto("tu1es", "TUTOR ORAL · REY MONO", "es-peq", lt, 0.05 + 0.15, 2 * BAR, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("tu2", "和<em>美猴王</em>对话，模拟口语考试", "sub", lt, 0.5 * B, 2 * BAR, { y: 378, entrada: "letras" });
  post(() => {
    const m = moviles[0];
    C.rotulo("tu4", "说错马上改", "Te corrige al momento", lt, 0.6 * B, 2 * BAR, { x: 205, y: 560, punto: m.punto(0.5, 0.25) });
  });
};

// 9 · TV: la serie del Rey Mono (móvil en horizontal)
ESC.tv = async (lt) => {
  fondo({ rayos: 0.4 });
  const k = eOut(seg(lt, 0, 0.5));
  const img = await seq("tvV", lt * 30 * 2.4);
  const orb = eInOut(seg(lt, 0.4, 2 * BAR));
  moviles[0].poner({ x: lerp(2.4, 0.2, k) - orb * 0.35, y: -0.72, rx: -0.12, ry: lerp(-1.1, -0.4, k) + orb * 0.75, s: 1.32, img, halo: 0.6 });
  M.sacarTarjeta(0, moviles[0], await seq("tvV", 0), { x: 0.04, y: 0.075, w: 0.92, h: 0.125 }, seg(lt, 0.8 * B, 1.4 * B) * (1 - seg(lt, 4.2 * B, 4.7 * B)), { x: 0, y: 0.55, z: 1.9, rx: -0.15, ry: -0.2 + orb * 0.3, rz: 0.02, s: 1.15 });
  C.texto("tv1", "美猴王<em>动画</em>", "tit2", lt, 0.05, 2 * BAR, { y: 200, entrada: "golpe", temblor: 6 });
  C.texto("tv1es", "SERIE ORIGINAL · WUKONG TV", "es-peq", lt, 0.2, 2 * BAR, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("tv2", "<em>追剧</em>也能学西语", "sub", lt, 0.5 * B, 2 * BAR, { y: 378, entrada: "letras" });
  C.chip("tv3", "¡Hola, Wukong!", "你好，悟空！", lt, 5 * B, 2 * BAR, { x: 540, y: 1470, cls: "oro", rot: -3 });
};

// 10 · JUEGOS: carrusel 3D de seis móviles
ESC.juegos = async (lt, sec) => {
  fondo({ rayos: 0.3 });
  const nb = sec ? sec.fin - sec.ini : 3;
  // partidas reales: concurso de preguntas → ahorcado → ruleta (un compás cada una)
  const JS = nb >= 4 ? [["concurso", "抢答竞赛", 95, 1.8, 0, 1], ["ahorcado", "猜词游戏", 30, 2.4, 1, 1.75], ["ruleta", "单词轮盘", 90, 4.2, 1.75, 2.5], ["viaje", "美猴王之旅", 125, 3.4, 2.5, 4]] : [["ahorcado", "猜词游戏", 8, 2.0, 0, 1]];
  let j = JS.findIndex((x) => lt / BAR >= x[4] && lt / BAR < x[5]); if (j < 0) j = JS.length - 1;
  const [nombre, zh, f0, vel, b0, b1] = JS[j];
  const ZJ = { concurso: [0.5, 0.52, 0.45, 0.85], ahorcado: [0.5, 0.33, 0.45, 0.95], ruleta: [0.5, 0.4, 0.05, 0.55], viaje: [0.5, 0.42, 0.05, 0.9] }[nombre];
  const lj = lt - b0 * BAR, durJ = (b1 - b0) * BAR;
  const SAL = { concurso: [{ x: 0.5, y: 0.38, w: 0.5, h: 0.16 }, 150, 0.45], ahorcado: [{ x: 0.08, y: 0.2, w: 0.84, h: 0.3 }, 100, 0.55], ruleta: [{ x: 0.0, y: 0.03, w: 1.0, h: 0.13 }, 330, 0.6], viaje: [{ x: 0.02, y: 0.72, w: 0.96, h: 0.1 }, 560, 0.62] }[nombre];
  const fs = await seq(nombre, SAL[1]);
  M.sacarTarjeta(0, moviles[0], fs, SAL[0], seg(lj / durJ, SAL[2], SAL[2] + 0.12) * (1 - seg(lj / durJ, 0.94, 1)), { x: 0.15, y: 0.45, z: 2.0, rx: -0.1, ry: -0.3, rz: 0.04, s: nombre === "concurso" ? 1.5 : 1.0 });
  const img = await seq(nombre, f0 + lj * 30 * vel);
  const kg = eOut(seg(lj, 0, 0.35));
  const giro = j === 0 ? (1 - eOut(seg(lt, 0, 0.5))) * 1.3 : (1 - kg) * Math.PI;
  const kzj = Math.sin(Math.PI * seg(lj / durJ, ZJ[2], ZJ[3]));
  moviles[0].poner({ x: -0.05, y: -0.7, z: kzj * 0.35, rx: -0.12, ry: 0.4 - seg(lj, 0, durJ) * 0.6 + giro, s: 1.32, img, halo: 0.6, zoom: kzj > 0.01 ? { cx: ZJ[0], cy: ZJ[1], s: 1 + 0.5 * kzj } : null, flash: j > 0 ? 0.3 * (1 - seg(lj, 0, 0.25)) : 0 });
  C.texto("j1", `${CIFRAS.juegos} 款<em>小游戏</em>`, "tit2", lt, 0.05, BAR * nb, { y: 200, entrada: "golpe", temblor: 6 });
  C.texto("j1es", "APRENDE JUGANDO", "es-peq", lt, 0.2, BAR * nb, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("j2", "<em>边玩边学</em>，单词越玩越熟", "sub", lt, 0.5 * B, BAR * nb, { y: 378, entrada: "letras" });
  JS.forEach(([n, z, , , a0, a1], i) => C.chip("jn" + i, z, "", lt, a0 * BAR + 0.15, a1 * BAR - 0.05, { x: 300, y: 1470, cls: "oro", rot: -4 }));
  M.camara.position.y += golpeBeat(lt) * 0.015;
};

// 11 · TURBO RUSH 3D: velocidad
ESC.turbo = async (lt) => {
  fondo({ rayos: 0.8 });
  // solo el vídeo de la portada del juego, con su logo oficial encima
  const img = await seq("turboP", lt * 30 * 1.55);
  const F = M.fondo.uniforms; F.uImg.value = img; F.uImgK.value = 0.6; F.uImgAsp.value = 540 / 960; F.uImgBlur.value = 3.5; F.uImgZoom.value = 1.1 + lt * 0.03; F.uBrillo.value = 0.7;
  const k = eOut(seg(lt, 0, 0.45));
  moviles[0].poner({ x: 0, y: -0.78, z: lerp(-8, 0.1, k), ry: -0.08, rx: -0.06, s: 1.26, img, zoom: { cx: 0.5, cy: 0.52, s: 1.02 + seg(lt, 0, 2 * BAR) * 0.15 }, halo: 0.8 });
  C.velocidad(0.6 * k, lt, 540, 1150);
  M.particulas.material.uniforms.uWarp.value = lt * 4;
  C.libre("tr1", `<img src="/promo-douyin/film/recursos/turbo-logo.png">`, "logo-juego", lt, 0.15, BAR * 2, { x: 540, y: 285, entrada: "golpe", dur: 0.35, rot: -2 });
  C.texto("tr3", "<em>西游极速</em> · 冲对单词就加速！", "sub", lt, 1.2 * B, BAR * 2, { y: 555, entrada: "letras" });
};

// 12 · PROGRESO
ESC.progreso = async (lt) => {
  fondo({ c1: "#c8961e", c2: "#3a1404", rayos: 0.6, nubes: 0.5 });
  const k = eOut(seg(lt, 0, 0.5));
  moviles[0].poner({ x: lerp(-2.5, -0.15, k), y: -0.62, z: 0, ry: lerp(1.4, 0.25, k), rx: -0.05, s: 1.4, img: await seq("progreso", lt * 30 * 1.5) });
  spr(S.trofeo, { x: 0.95, y: -1.55, z: 0.9, a: k, t: lt, esc: eBack(seg(lt, B, B + 0.4)), rz: Math.sin(lt * 4) * 0.05 });
  C.texto("pg1", "学习<em>进度</em>", "tit2", lt, 0.05, BAR, { y: 200, entrada: "golpe", temblor: 6 });
  C.texto("pg1es", "MI PROGRESO", "es-peq", lt, 0.05 + 0.15, BAR, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("pg2", "预测你的<em>通过概率</em>", "sub", lt, 0.5 * B, BAR, { y: 378, entrada: "letras" });
  C.chip("pg3", "¡Apto!", "合格！", lt, 2 * B, BAR, { x: 280, y: 1400, cls: "jade", rot: -6 });
  post(() => C.lupa("pg4", CAP.progreso, { x: 0.03, y: 0.04, w: 0.36, h: 0.2 }, lt, 1.2 * B, 2.2 * B, { x: 300, y: 800, ancho: 420, rot: -4, desde: moviles[0].punto(0.2, 0.12) }));
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
    const p = proy(Math.sin(a) * 1.05, -0.45 + Math.cos(a * 2) * 0.12 + (i % 2 ? 0.55 : -0.55) * 0, Math.cos(a) * 1.0 - 0.4);
    const el = C.chip("id" + i, l, "", lt, 0.1 + i * 0.07, BAR, { x: Math.max(330, Math.min(760, p.x)), y: p.y + (i - 3) * 95, cls: i === 0 ? "oro" : "tinta", flota: 0, escala: 0.85 });
    if (el) { el.style.zIndex = Math.cos(a) > 0 ? 5 : 0; el.style.filter = Math.cos(a) > 0 ? "none" : "brightness(.6)"; }
  });
  C.texto("i1", "7 种<em>讲解语言</em>", "tit2", lt, 0.05, BAR, { y: 200, entrada: "pincel", dur: 0.4 });
  C.texto("i1es", "7 IDIOMAS DE AYUDA", "es-peq", lt, 0.05 + 0.15, BAR, { y: 292, entrada: "pincel", dur: 0.4 });
  C.texto("i2", "讲解<em>随心切换</em>，看不懂也不怕", "sub", lt, 0.5 * B, BAR, { y: 378, entrada: "letras" });
};

// 14 · BENEFICIOS: cifras
ESC.beneficios = async (lt) => {
  fondo({ c1: "#a50f27", c2: "#1a0204", rayos: 0.55, nubes: 0.5, cy: 0.42 });
  M.particulas.material.uniforms.uK.value = 1.2;
  const C4 = [[CIFRAS.unidades, "个单元", "UNIDADES", "单"], [CIFRAS.modelos, "套模拟题", "EXÁMENES", "考"], [CIFRAS.juegos, "款小游戏", "JUEGOS", "戏"], ["7", "种讲解语言", "IDIOMAS", "语"]];
  const POS = [[310, 760], [730, 760], [310, 1140], [730, 1140]];
  C4.forEach(([n, zh, es, sello], j) => {
    const ini = j * 1.5 * B + 0.1;
    if (lt < ini) return;
    const el = C.libre("pl" + j, `<span class="sl">${sello}</span><span class="n"></span><span class="z">${zh}</span><span class="e">${es}</span><span class="brillo"></span>`, "placa", lt, ini, BAR * 2, { x: POS[j][0], y: POS[j][1], entrada: "sube", dur: 0.01 });
    if (!el) return;
    const k = seg(lt, ini, ini + 0.45);
    const giro = (1 - eBack(k, 1.6)) * 100; // gira en 3D desde el canto
    const flota = Math.sin(lt * 2.2 + j) * 6;
    const sale = seg(lt, BAR * 2 - 0.22, BAR * 2);
    el.style.opacity = clamp(k * 4) * (1 - sale);
    el.style.transform = `translate(${POS[j][0] - 190}px, ${POS[j][1] - 165 + flota}px) perspective(1100px) rotateY(${(j % 2 ? -1 : 1) * giro}deg) rotateX(${(1 - eOut(k)) * 18}deg) scale(${0.85 + 0.15 * eOut(k)})`;
    el.querySelector(".n").textContent = String(Math.round(+n * eOut(seg(lt, ini + 0.1, ini + 0.55))));
    el.style.setProperty("--b", `${lerp(-220, 520, seg(lt, ini + 0.35, ini + 0.85))}px`);
  });
  C.texto("bt", "一个网站 <em>全部搞定</em>", "tit2", lt, 0.05, BAR * 2, { y: 300, entrada: "pincel", dur: 0.4 });
  C.texto("bte", "TODO EN UNA SOLA WEB", "es-peq", lt, 0.25, BAR * 2, { y: 405, entrada: "pincel", dur: 0.4 });
  C.texto("bts", "从 <em>A1</em> 到 <em>B2</em>，一路陪你进阶", "sub", lt, 4.8 * B, BAR * 2, { y: 1410, entrada: "letras" });
  spr(S.trofeo, { x: 0, y: -1.9, z: 0.6, a: clamp(lt * 3), t: lt, esc: 1 + golpeBeat(lt, 1.5) * 0.08, rz: Math.sin(lt * 3) * 0.05 });
};

// 15 · CIERRE: vuelo con el dragón + logo + QR
ESC.cierre = async (lt) => {
  const fase2 = lt >= PANEL;
  const fr = await seq("vuelo", Math.min(lt * 30, SEQ.vuelo.n - 1));
  fondo({ libre: true, c1: "#c8102e", c2: "#2a0207", rayos: 0.6, nubes: 0.7, img: fr, imgK: fase2 ? 0.5 : 0.85, asp: 16 / 9, blur: fase2 ? 4 : 2.5, zoom: 1.0, brillo: fase2 ? 0.55 : 0.55, off: [0.08, 0] });
  // panel de cine flotante con el vuelo (compases 25-26)
  const kp = eOut(seg(lt, 0, 0.6)), sp = eIn(seg(lt, PANEL - 0.4, PANEL));
  marcoPanel.visible = !fase2;
  panel.material.map = fr;
  marcoPanel.position.set(0, lerp(-3, -0.25, kp) + sp * 4, lerp(-4, 0.2, kp));
  marcoPanel.rotation.set(-0.12 * (1 - kp) + Math.sin(lt) * 0.03, Math.sin(lt * 0.8) * 0.12, -0.02);
  C.texto("c1", "和悟空一起", "tit medio", lt, 0.1, PANEL - 0.05, { y: 360, entrada: "pincel", dur: 0.4 });
  C.texto("c2", "闯荡<em>西语世界</em>", "sub grande", lt, 1 * B, PANEL - 0.05, { y: 1400, entrada: "letras" });
  // logo y llamada a la acción (desde el compás 27)
  const l = lt - PANEL;
  C.destello(fase2 ? 1 - eOut(seg(l, 0, 0.4)) : 0);
  C.libre("c3", "悟", "sello", l, 0, 99, { x: 540, y: 225, entrada: "golpe", escala: 0.85, rot: -4 });
  C.texto("c4", "悟空西语", "tit grande", l, 0.15, 99, { y: 400, entrada: "golpe", temblor: 8 });
  C.texto("c5", "WUKONG ESPAÑOL", "es", l, 0.4, 99, { y: 545, entrada: "pincel", dur: 0.45 });
  C.libre("c6b", `<img src="/promo-douyin/film/recursos/qr-wechat.png">`, "marco-qr grande", l, 2 * B, 99, { x: 540, y: 1010, entrada: "pop", rot: 0 });
  C.libre("c11", "<b>¥39</b><span>一次付费 · 永久使用</span>", "precio", l, 1.2 * B, 99, { x: 540, y: 690, entrada: "golpe", dur: 0.3, rot: -2 });
  C.texto("c7b", "微信扫码<em>立即咨询</em>", "sub", l, 2.6 * B, 99, { y: 1240, entrada: "sube" });
  C.texto("c9", "sergibauli.github.io/wukong-espanol", "url", l, 3.5 * B, 99, { y: 1325, entrada: "sube" });
  C.texto("c10", "今天就<em>开口说西语</em>！", "sub grande", l, 4.5 * B, 99, { y: 1420, entrada: "letras" });
  spr(S.saluda, { x: -1.15, y: -1.6, z: 0.7, a: fase2 ? clamp(l * 3) : 0, t: lt, esc: eBack(seg(l, 0.3, 0.8)), rz: Math.sin(lt * 2.5) * 0.06 });
  spr(S.dragon2, { x: 1.25, y: lerp(-3, -1.25, eOut(seg(l, 0.3, 1.2))), z: 0.2, ry: Math.PI, a: fase2 ? 1 : 0, t: lt, rz: 0.1 });
  nubes(lt, fase2 ? 1 : 0.5, -1);
};

// ---------------- bucle principal ----------------
let CAP_ZOOM, CAP_JUEGOS;
let POST = [];
const post = (fn) => POST.push(fn);
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
  M.decor.k = ["gancho", "cierre", "turbo", "beneficios"].includes(sec.id) ? 0 : clamp(lt * 2.5);
  M.animarDecor(t);
  M.ocultarTarjetas();
  POST = []; M.VIDA.t = t; M.VIDA.k = ["juegos", "turbo"].includes(sec.id) ? 0.6 : 1;
  await ESC[sec.id](lt, sec);
  M.camara.lookAt(0, M.camara.position.y * 0.5, 0);
  M.camara.updateMatrixWorld(true);
  for (const fn of POST) fn();
  const tFin = sec.fin * BAR, kSal = seg(t, tFin - 0.3, tFin);
  if (kSal > 0 && !["gancho", "cierre", "beneficios"].includes(sec.id) && moviles[0].g.visible) { moviles[0].g.position.z += eIn(kSal) * 6.5; moviles[0].g.rotation.z += eIn(kSal) * 0.4; C.destello(eIn(kSal) * 0.85); }
  if (!["gancho", "problema"].includes(sec.id)) C.barrido(seg(lt, 0, 0.42));
  if (!["gancho", "problema", "cierre"].includes(sec.id)) C.nubesOro(t);
  M.render(t);
  C.terminarCapa();
};

(async () => {
  await preparar();
  const mat = await import("./material.js");
  CAP_ZOOM = mat.ZOOM; CAP_JUEGOS = mat.JUEGOS;
  window.LISTO = true;
})();
