// Motor de la película: Three.js (móvil 3D, fondo, partículas, nubes, dragón, cristales)
// + capa DOM (textos) + capa 2D (tinta, líneas de velocidad, grietas).
// Todo es función del tiempo t → render determinista fotograma a fotograma.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export const W = 1080, H = 1920;
const ESCALA = +(new URLSearchParams(location.search).get("escala") || 1);
const PUB = "/public/";

// ---------------- utilidades ----------------
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const lerp = (a, b, x) => a + (b - a) * x;
export const eOut = (x) => 1 - Math.pow(1 - x, 3);
export const eIn = (x) => x * x * x;
export const eInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const eExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const eBack = (x, s = 1.7) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
export const muelle = (x, f = 3.2, d = 5.5) => (x <= 0 ? 0 : 1 - Math.exp(-d * x) * Math.cos(f * Math.PI * x));
export function aleatorio(semilla) { let s = semilla >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// ---------------- renderer ----------------
const lienzo = document.getElementById("gl");
export const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, preserveDrawingBuffer: true, alpha: false });
renderer.setPixelRatio(1);
renderer.setSize(W * ESCALA, H * ESCALA, false);
lienzo.style.width = W + "px"; lienzo.style.height = H + "px";
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.autoClear = false;

export const escena = new THREE.Scene();
export const camara = new THREE.PerspectiveCamera(30, W / H, 0.05, 200);
camara.position.set(0, 0, 9);
const pmrem = new THREE.PMREMGenerator(renderer);
escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
escena.add(new THREE.AmbientLight(0xffffff, 0.25));
const luzOro = new THREE.DirectionalLight(0xffd58a, 2.2); luzOro.position.set(3, 4, 5); escena.add(luzOro);
const luzRoja = new THREE.DirectionalLight(0xff3040, 1.6); luzRoja.position.set(-4, -2, 2); escena.add(luzRoja);

// ---------------- texturas ----------------
const cargador = new THREE.TextureLoader();
const CACHE = new Map();
export function tex(url, { srgb = true, repetir = false } = {}) {
  if (CACHE.has(url)) return CACHE.get(url);
  const p = new Promise((ok, mal) => cargador.load(url, (t) => {
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    if (repetir) t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter;
    ok(t);
  }, undefined, () => mal(new Error("no carga " + url))));
  CACHE.set(url, p);
  return p;
}
const TEX = {}; // texturas ya resueltas por clave
export const texturas = TEX;
export async function precargar(mapa) {
  await Promise.all(Object.entries(mapa).map(async ([k, url]) => { TEX[k] = await tex(url); }));
}
// secuencias de fotogramas: carga bajo demanda con caché pequeña
const SEQ = new Map();
export async function fotogramaSeq(url) {
  if (!SEQ.has(url)) {
    SEQ.set(url, tex(url));
    if (SEQ.size > 10) { const [k, p] = SEQ.entries().next().value; SEQ.delete(k); CACHE.delete(k); p.then((t) => t.dispose()); }
  }
  return SEQ.get(url);
}

// ---------------- fondo (pase ortográfico) ----------------
const escenaFondo = new THREE.Scene();
const camFondo = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
export const fondo = new THREE.ShaderMaterial({
  depthTest: false, depthWrite: false, toneMapped: false,
  uniforms: {
    uT: { value: 0 }, uC1: { value: new THREE.Color("#b3122b") }, uC2: { value: new THREE.Color("#2a0207") },
    uImg: { value: null }, uImgK: { value: 0 }, uImgAsp: { value: 1 }, uImgBlur: { value: 2.5 }, uImgZoom: { value: 1 }, uImgOff: { value: new THREE.Vector2() },
    uRayos: { value: 0.35 }, uNubes: { value: 0.5 }, uCentro: { value: new THREE.Vector2(0.5, 0.55) }, uBrillo: { value: 1 }, uTinta: { value: 0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uT, uImgK, uImgAsp, uImgBlur, uImgZoom, uRayos, uNubes, uBrillo, uTinta;
    uniform vec3 uC1, uC2; uniform sampler2D uImg; uniform vec2 uCentro, uImgOff;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
      return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
    float fbm(vec2 p){ float s = 0., a = .5; for(int i=0;i<4;i++){ s += a*n(p); p = p*2.03 + 7.1; a *= .5; } return s; }
    void main(){
      vec2 p = vUv; vec2 asp = vec2(${(W / H).toFixed(4)}, 1.);
      vec2 d = (p - uCentro) * asp;
      float r = length(d);
      vec3 c = mix(uC1, uC2, smoothstep(0.0, 0.95, r));
      if (uImgK > 0.) {
        vec2 q = p - .5; q.x *= ${(W / H).toFixed(4)} / uImgAsp; q /= uImgZoom; q += .5 + uImgOff;
        vec3 im = texture2D(uImg, q, uImgBlur).rgb;
        c = mix(c, im * (1. - .55*smoothstep(.2,.9,r)), uImgK);
      }
      // nubes doradas tenues
      float cl = fbm(vec2(p.x*3. + uT*.05, p.y*5. - uT*.02));
      c += vec3(1., .78, .35) * smoothstep(.55, .85, cl) * .22 * uNubes;
      // rayos de luz desde el centro
      float ang = atan(d.y, d.x);
      float ray = pow(max(0., sin(ang*9. + uT*.6)*.5 + sin(ang*5. - uT*.4)*.5), 6.);
      c += vec3(1., .82, .45) * ray * uRayos * smoothstep(1.1, .05, r) * .55;
      // tinta (oscurece hacia papel negro)
      c = mix(c, vec3(.05,.03,.025) + vec3(.07,.05,.04)*fbm(p*6.+uT*.1), uTinta);
      // viñeta
      c *= 1. - .45*smoothstep(.45, 1.15, r);
      gl_FragColor = vec4(c * uBrillo, 1.);
      #include <colorspace_fragment>
    }`,
});
escenaFondo.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fondo));

// ---------------- partículas doradas ----------------
const NP = 700;
const rp = aleatorio(7);
const pGeo = new THREE.BufferGeometry();
const base = new Float32Array(NP * 3), tam = new Float32Array(NP), fase = new Float32Array(NP);
for (let i = 0; i < NP; i++) { base[i * 3] = (rp() * 2 - 1) * 5; base[i * 3 + 1] = (rp() * 2 - 1) * 7; base[i * 3 + 2] = -9 + rp() * 10; tam[i] = 0.4 + rp() * rp() * 2.6; fase[i] = rp() * 6.28; }
pGeo.setAttribute("position", new THREE.BufferAttribute(base, 3));
pGeo.setAttribute("aTam", new THREE.BufferAttribute(tam, 1));
pGeo.setAttribute("aFase", new THREE.BufferAttribute(fase, 1));
export const particulas = new THREE.Points(pGeo, new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
  uniforms: { uT: { value: 0 }, uK: { value: 1 }, uVel: { value: 0.25 }, uExplota: { value: 0 }, uWarp: { value: 0 } },
  vertexShader: `attribute float aTam, aFase; uniform float uT, uVel, uExplota, uWarp; varying float vA;
    void main(){ vec3 p = position; p.y = mod(p.y + uT*uVel*(0.6+aTam*.3) + 7., 14.) - 7.;
      p.x += sin(uT*.5 + aFase)*.25;
      p.xy *= 1. + uExplota*(1.+aTam*.4);
      p.z = mod(p.z + uWarp + 9., 10.) - 9.;
      vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;
      float tw = .55 + .45*sin(uT*3. + aFase*5.);
      gl_PointSize = aTam * 26. * ${ESCALA.toFixed(2)} / -mv.z * 6.;
      vA = tw * smoothstep(-9., -6., p.z); }`,
  fragmentShader: `varying float vA; uniform float uK;
    void main(){ vec2 q = gl_PointCoord - .5; float d = length(q);
      float a = smoothstep(.5, 0., d); a = a*a; float core = smoothstep(.12, 0., d);
      gl_FragColor = vec4(vec3(1., .8, .4)*a + vec3(1.,.97,.85)*core, 1.) * vA * uK; }`,
}));
escena.add(particulas);

// ---------------- sprites (mono, dragón, nubes…) ----------------
export function sprite(clave, alto = 1, { aditivo = false, onda = 0 } = {}) {
  const t = TEX[clave];
  const asp = t.image.width / t.image.height;
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide,
    blending: aditivo ? THREE.AdditiveBlending : THREE.NormalBlending,
    uniforms: { uMap: { value: t }, uA: { value: 1 }, uT: { value: 0 }, uOnda: { value: onda }, uTinte: { value: new THREE.Color(1, 1, 1) }, uBrillo: { value: 0 } },
    vertexShader: `varying vec2 vUv; uniform float uT, uOnda;
      void main(){ vUv = uv; vec3 p = position; p.y += sin(p.x*3.5 - uT*4.)*uOnda; p.z += cos(p.x*2.5 - uT*3.)*uOnda*.6;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.); }`,
    fragmentShader: `varying vec2 vUv; uniform sampler2D uMap; uniform float uA, uBrillo; uniform vec3 uTinte;
      void main(){ vec4 c = texture2D(uMap, vUv); c.rgb *= uTinte; c.rgb += uBrillo*c.a; gl_FragColor = vec4(c.rgb, c.a*uA);
        #include <colorspace_fragment>
      }`,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(alto * asp, alto, onda ? 24 : 1, 1), mat);
  m.visible = false; m.renderOrder = 2;
  escena.add(m);
  return m;
}

// ---------------- el móvil ----------------
const SW = 1.0, SH = SW * 2532 / 1170; // pantalla
const MW = SW + 0.075, MH = SH + 0.09, MR = 0.155, MD = 0.085;
function rectRedondo(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
}
const geoCuerpo = new THREE.ExtrudeGeometry(rectRedondo(MW - 0.04, MH - 0.04, MR - 0.02), { depth: MD, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 5, curveSegments: 20 });
geoCuerpo.translate(0, 0, -MD / 2);
const matOro = new THREE.MeshPhysicalMaterial({ color: 0xe8b860, metalness: 1, roughness: 0.22, clearcoat: 0.6, envMapIntensity: 1.4 });
const matLaca = new THREE.MeshPhysicalMaterial({ color: 0x120604, metalness: 0.3, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05 });
const geoPantalla = new THREE.PlaneGeometry(SW, SH);
const geoTrasera = new THREE.PlaneGeometry(MW - 0.06, MH - 0.06);
const geoIsla = new THREE.ShapeGeometry(rectRedondo(0.27, 0.075, 0.0375), 12);

const VERT_PANT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`;
const FRAG_PANT = `
  varying vec2 vUv;
  uniform sampler2D uTex, uTex2; uniform vec4 uRect, uRect2, uHi; uniform float uMix, uBrillo, uGlare, uHiK, uFlash, uOn, uRot;
  uniform vec3 uTap;
  vec3 muestra(sampler2D t, vec4 r, vec2 td){ vec2 u = r.xy + td*r.zw; return texture2D(t, vec2(u.x, 1.-u.y)).rgb; }
  void main(){
    vec2 p = vUv; vec2 S = vec2(${SW.toFixed(4)}, ${SH.toFixed(4)}); float rad = .115;
    vec2 q = abs((p-.5)*S) - (S*.5 - rad);
    float dist = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - rad;
    float mask = 1. - smoothstep(-.002, .002, dist);
    vec2 td = uRot > .5 ? vec2(1.-p.y, 1.-p.x) : vec2(p.x, 1.-p.y);
    vec3 c = muestra(uTex, uRect, td);
    if (uMix > 0.) c = mix(c, muestra(uTex2, uRect2, td), uMix);
    c *= uOn;
    // marco dorado de resalte
    if (uHiK > 0.) {
      vec2 a = uHi.xy, b = uHi.xy + uHi.zw;
      vec2 e = max(a - td, td - b); float dd = max(e.x*S.x, e.y*S.y);
      float borde = smoothstep(.012, .0, abs(dd + .004)) ;
      float fuera = step(0., dd);
      c = mix(c, c*.45, fuera*uHiK*.8);
      c += vec3(1., .78, .3) * borde * uHiK * 1.4;
    }
    // toque
    if (uTap.z > 0.) { float r = length((td - uTap.xy)*S); float an = uTap.z;
      c += vec3(1., .9, .6) * (smoothstep(.06*an+.02, .06*an, r) - smoothstep(.06*an, .06*an-.015, r)) * (1.-an) * 1.5;
      c += vec3(1.,.85,.5) * smoothstep(.04, 0., r) * (1.-an) * .5; }
    // reflejo del cristal
    float g = smoothstep(.10, 0., abs((p.x*.8 + p.y) - uGlare)) * .16 + smoothstep(.03, 0., abs((p.x*.8 + p.y) - uGlare - .16)) * .08;
    c += g * mask;
    c += uFlash;
    gl_FragColor = vec4(c * uBrillo, mask);
    #include <colorspace_fragment>
  }`;

export const VIDA = { t: 0, k: 1 }; // movimiento continuo del móvil (flota e inclina)
export class Movil {
  constructor() {
    this.g = new THREE.Group();
    this.cuerpo = new THREE.Mesh(geoCuerpo, [matLaca, matOro]);
    this.g.add(this.cuerpo);
    this.mat = new THREE.ShaderMaterial({
      transparent: true, toneMapped: false,
      uniforms: { uTex: { value: null }, uTex2: { value: null }, uRect: { value: new THREE.Vector4(0, 0, 1, 1) }, uRect2: { value: new THREE.Vector4(0, 0, 1, 1) },
        uMix: { value: 0 }, uBrillo: { value: 1 }, uGlare: { value: 0.5 }, uHi: { value: new THREE.Vector4() }, uHiK: { value: 0 }, uTap: { value: new THREE.Vector3() }, uFlash: { value: 0 }, uOn: { value: 1 }, uRot: { value: 0 } },
      vertexShader: VERT_PANT, fragmentShader: FRAG_PANT,
    });
    this.pantalla = new THREE.Mesh(geoPantalla, this.mat);
    this.pantalla.position.z = MD / 2 + 0.021;
    this.g.add(this.pantalla);
    const isla = new THREE.Mesh(geoIsla, new THREE.MeshBasicMaterial({ color: 0x050505 }));
    isla.position.set(0, SH / 2 - 0.065, MD / 2 + 0.023); this.g.add(isla);
    // botones laterales
    const boton = (y, h) => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.02, h, 0.04), matOro); b.position.set(MW / 2 + 0.005, y, 0); this.g.add(b); };
    boton(0.55, 0.22); boton(0.25, 0.14); boton(0.05, 0.14);
    // trasera con sello
    this.trasera = new THREE.Mesh(geoTrasera, new THREE.MeshPhysicalMaterial({ map: TEX.trasera, metalness: 0.2, roughness: 0.25, clearcoat: 1 }));
    this.trasera.rotation.y = Math.PI; this.trasera.position.z = -MD / 2 - 0.021; this.g.add(this.trasera);
    // halo y sombra
    this.halo = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 4.6), new THREE.MeshBasicMaterial({ map: TEX.halo, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55, toneMapped: false }));
    this.halo.position.z = -0.3; this.g.add(this.halo);
    this.g.visible = false;
    escena.add(this.g);
  }
  // estado por fotograma
  poner({ quieto = false, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, s = 1, img, img2, mezcla = 0, scroll = 0, scroll2 = 0, zoom = null, hi = null, hiK = 0, tap = null, flash = 0, brillo = 1, halo = 0.55, encendido = 1, apaisado = false } = {}) {
    const g = this.g; g.visible = true;
    if (!quieto) { const v = VIDA.t, k = VIDA.k; ry += 0.09 * k * Math.sin(v * 1.05); rx += 0.045 * k * Math.sin(v * 1.6 + 1); rz += 0.02 * k * Math.sin(v * 0.8 + 2); y += 0.03 * k * Math.sin(v * 1.9); }
    g.position.set(x, y, z); g.rotation.set(rx, ry, rz); g.scale.setScalar(s);
    const u = this.mat.uniforms;
    u.uRot.value = apaisado ? 1 : 0;
    if (img) { u.uTex.value = img; u.uRect.value.copy(apaisado ? rectApaisado(img) : rectDe(img, scroll, zoom)); }
    if (img2) { u.uTex2.value = img2; u.uRect2.value.copy(apaisado ? rectApaisado(img2) : rectDe(img2, scroll2, zoom)); }
    u.uMix.value = img2 ? mezcla : 0;
    u.uGlare.value = 0.9 + ry * 0.9 + rx * 0.5 + x * 0.1;
    if (hi) u.uHi.value.set(hi.x, hi.y, hi.w, hi.h);
    u.uHiK.value = hiK;
    if (tap) u.uTap.value.set(tap.x, tap.y, tap.k); else u.uTap.value.set(0, 0, 0);
    u.uFlash.value = flash; u.uBrillo.value = brillo; u.uOn.value = encendido;
    this.halo.material.opacity = halo;
    this.halo.visible = halo > 0.01;
  }
}
// imagen apaisada en el móvil girado: recorte tipo «cover»
function rectApaisado(t) {
  const asp = t.image.width / t.image.height, pant = SH / SW;
  if (asp < pant) { const h = asp / pant; return new THREE.Vector4(0, (1 - h) / 2, 1, h); }
  const w = pant / asp; return new THREE.Vector4((1 - w) / 2, 0, w, 1);
}
// punto de la pantalla (u, v de arriba a abajo) → píxel del lienzo 1080×1920
Movil.prototype.punto = function (u, v) {
  this.g.updateMatrixWorld(true);
  const p = new THREE.Vector3((u - 0.5) * SW, (0.5 - v) * SH, MD / 2 + 0.03).applyMatrix4(this.g.matrixWorld).project(camara);
  return { x: (p.x + 1) * 540, y: (1 - p.y) * 960 };
};
// rectángulo de UV (coordenadas de arriba a abajo) para una imagen alta + zoom
function rectDe(t, scroll, zoom) {
  const iw = t.image.width, ih = t.image.height;
  const vh = Math.min(1, (iw * 2532 / 1170) / ih); // fracción visible en altura
  const top = clamp(scroll, 0, 1) * (1 - vh);
  let r = new THREE.Vector4(0, top, 1, vh);
  if (zoom) { // zoom = {cx, cy, s} en coordenadas de la pantalla visible
    const w = 1 / zoom.s, h = vh / zoom.s;
    const cx = clamp(zoom.cx, w / 2, 1 - w / 2), cy = clamp(zoom.cy * vh + top, top + h / 2, top + vh - h / 2);
    r.set(cx - w / 2, cy - h / 2, w, h);
  }
  return r;
}

// ---------------- fragmentos de cristal (gancho) ----------------
export const cristales = new THREE.Group();
{
  const r = aleatorio(99), cols = 7, filas = 12, w = 3.6, h = 6.4;
  const pts = [];
  for (let j = 0; j <= filas; j++) for (let i = 0; i <= cols; i++) {
    const borde = i === 0 || j === 0 || i === cols || j === filas;
    pts.push([(i / cols - 0.5) * w + (borde ? 0 : (r() - 0.5) * w / cols * 0.8), (j / filas - 0.5) * h + (borde ? 0 : (r() - 0.5) * h / filas * 0.8)]);
  }
  const matC = new THREE.MeshPhysicalMaterial({ color: 0xf2c14e, metalness: 1, roughness: 0.12, clearcoat: 1, side: THREE.DoubleSide, emissive: 0x9a6a14, emissiveIntensity: 0.7, transparent: true });
  cristales.userData.mat = matC;
  for (let j = 0; j < filas; j++) for (let i = 0; i < cols; i++) {
    const a = pts[j * (cols + 1) + i], b = pts[j * (cols + 1) + i + 1], c = pts[(j + 1) * (cols + 1) + i], d = pts[(j + 1) * (cols + 1) + i + 1];
    for (const tri of (r() > 0.5 ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]])) {
      const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3, cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(tri.flatMap(([x, y]) => [x - cx, y - cy, 0]), 3));
      g.computeVertexNormals();
      const m = new THREE.Mesh(g, matC);
      m.userData = { cx, cy, vx: cx * (0.8 + r()), vy: cy * (0.5 + r()) + 1, vz: 2 + r() * 6, rx: (r() - 0.5) * 12, ry: (r() - 0.5) * 12 };
      cristales.add(m);
    }
  }
  cristales.visible = false;
  escena.add(cristales);
}
export function ponerCristales(k, z = 2.2) { // k: 0 = intacto, >0 = estallando (segundos)
  cristales.visible = k >= 0;
  if (cristales.userData.mat) cristales.userData.mat.opacity = 1 - Math.min(1, Math.max(0, (k - 0.2) / 0.35));
  cristales.children.forEach((m) => {
    const u = m.userData, tt = Math.max(0, k);
    m.position.set(u.cx + u.vx * tt * 1.2, u.cy + u.vy * tt - 4.5 * tt * tt, z + u.vz * tt);
    m.rotation.set(u.rx * tt, u.ry * tt, 0);
  });
}

// ---------------- render ----------------
export function render(t) {
  fondo.uniforms.uT.value = t;
  particulas.material.uniforms.uT.value = t;
  renderer.clear();
  renderer.render(escenaFondo, camFondo);
  renderer.clearDepth();
  renderer.render(escena, camara);
}

// textura de la trasera del móvil y el halo (canvas)
export function texturasCanvas() {
  const c = document.createElement("canvas"); c.width = 540; c.height = 1120;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 540, 1120); g.addColorStop(0, "#c8102e"); g.addColorStop(1, "#5e0814");
  x.fillStyle = g; x.fillRect(0, 0, 540, 1120);
  x.strokeStyle = "#f2c14e"; x.lineWidth = 10; x.strokeRect(30, 30, 480, 1060); x.lineWidth = 3; x.strokeRect(48, 48, 444, 1024);
  x.fillStyle = "#f2c14e"; x.textAlign = "center"; x.textBaseline = "middle";
  x.font = "300px 'Ma Shan Zheng'"; x.fillText("悟", 270, 500);
  x.font = "700 46px 'Cinzel'"; x.fillText("WUKONG ESPAÑOL", 270, 780);
  x.font = "64px 'Ma Shan Zheng'"; x.fillText("悟空西语", 270, 870);
  const tr = new THREE.CanvasTexture(c); tr.colorSpace = THREE.SRGBColorSpace; tr.anisotropy = 8;
  TEX.trasera = tr;
  const h = document.createElement("canvas"); h.width = h.height = 256;
  const y = h.getContext("2d"); const rg = y.createRadialGradient(128, 128, 0, 128, 128, 128);
  rg.addColorStop(0, "rgba(255,200,90,0.9)"); rg.addColorStop(0.35, "rgba(242,160,60,0.35)"); rg.addColorStop(1, "rgba(200,16,46,0)");
  y.fillStyle = rg; y.fillRect(0, 0, 256, 256);
  const th = new THREE.CanvasTexture(h); th.colorSpace = THREE.SRGBColorSpace; TEX.halo = th;
}
export { THREE, ESCALA, PUB };

// ---------------- decorado 3D de fondo (mandala, farolillos, fichas) ----------------
export const decor = { k: 0, grupo: new THREE.Group() };
escena.add(decor.grupo);
function texMandala() {
  const c = document.createElement("canvas"); c.width = c.height = 1024; const x = c.getContext("2d");
  x.translate(512, 512); x.strokeStyle = "#ffd57a"; x.fillStyle = "#ffd57a"; x.lineCap = "round";
  for (const [r, w] of [[500, 6], [470, 2], [400, 4], [300, 3], [292, 1.5], [180, 4]]) { x.lineWidth = w; x.beginPath(); x.arc(0, 0, r, 0, 7); x.stroke(); }
  for (let i = 0; i < 48; i++) { const a = i / 48 * Math.PI * 2; x.save(); x.rotate(a); x.lineWidth = 3; x.beginPath(); x.moveTo(0, -470); x.lineTo(0, -410); x.stroke(); if (i % 2 === 0) { x.strokeRect(-14, -395, 28, 28); x.strokeRect(-7, -388, 14, 14); } x.restore(); }
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.save(); x.rotate(a); x.lineWidth = 3; x.beginPath(); x.moveTo(0, -292); x.bezierCurveTo(40, -250, 40, -210, 0, -180); x.bezierCurveTo(-40, -210, -40, -250, 0, -292); x.stroke(); x.restore(); }
  x.font = "150px 'Ma Shan Zheng'"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("悟", 0, 10);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function texFicha(es, zh) {
  const c = document.createElement("canvas"); c.width = 512; c.height = 256; const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, "#d8203c"); g.addColorStop(1, "#7a0a1a");
  x.fillStyle = g; x.beginPath(); x.roundRect(12, 12, 488, 232, 40); x.fill(); x.lineWidth = 10; x.strokeStyle = "#f2c14e"; x.stroke();
  x.fillStyle = "#fff4d0"; x.textAlign = "center"; x.font = "900 86px 'Cinzel'"; x.fillText(es, 256, 125); x.fillStyle = "#ffd54a"; x.font = "64px 'Ma Shan Zheng'"; x.fillText(zh, 256, 205);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export function crearDecor() {
  const tm = texMandala();
  decor.anillos = [0, 1].map((i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(i ? 4.6 : 6.4, i ? 4.6 : 6.4), new THREE.MeshBasicMaterial({ map: tm, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.35, toneMapped: false }));
    decor.grupo.add(m); return m;
  });
  const rr = aleatorio(4242);
  const capa = new THREE.MeshStandardMaterial({ color: 0xe8b860, metalness: 1, roughness: 0.3 });
  const papelRojo = new THREE.MeshStandardMaterial({ color: 0xc8102e, emissive: 0xff2a1a, emissiveIntensity: 0.55, roughness: 0.6 });
  const tHalo = TEX.halo;
  decor.faroles = Array.from({ length: 14 }, (_, i) => {
    const g = new THREE.Group();
    const cuerpo = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), papelRojo); cuerpo.scale.set(1, 0.82, 1); g.add(cuerpo);
    for (const y of [0.19, -0.19]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16), capa); c.position.y = y; g.add(c); }
    const borla = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.03, 0.22, 6), capa); borla.position.y = -0.33; g.add(borla);
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), new THREE.MeshBasicMaterial({ map: tHalo, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.5, toneMapped: false })); halo.position.z = -0.05; g.add(halo);
    g.userData = { x: (rr() * 2 - 1) * 3.2, z: -2.5 - rr() * 6, v: 0.18 + rr() * 0.25, f: rr() * 10, s: 0.7 + rr() * 0.8 };
    decor.grupo.add(g); return g;
  });
  const PALS = [["¡Hola!", "你好"], ["Gracias", "谢谢"], ["España", "西班牙"], ["Vamos", "我们走"], ["Amigo", "朋友"]];
  decor.fichas = PALS.map(([es, zh], i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.5), new THREE.MeshBasicMaterial({ map: texFicha(es, zh), transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }));
    m.userData = { x: (rr() < 0.5 ? -1 : 1) * (1.6 + rr() * 1.6), y0: rr() * 12, z: -5 - rr() * 4, v: 0.22 + rr() * 0.15, f: rr() * 6 };
    decor.grupo.add(m); return m;
  });
}
function texSuelo() {
  const c = document.createElement("canvas"); c.width = c.height = 1024; const x = c.getContext("2d");
  x.strokeStyle = "rgba(255,205,110,1)"; x.lineWidth = 3;
  for (let i = 0; i <= 16; i++) { const p = i * 64; x.beginPath(); x.moveTo(p, 0); x.lineTo(p, 1024); x.stroke(); x.beginPath(); x.moveTo(0, p); x.lineTo(1024, p); x.stroke(); }
  x.fillStyle = "rgba(255,230,160,1)"; for (let i = 0; i <= 16; i++) for (let j = 0; j <= 16; j++) { x.beginPath(); x.arc(i * 64, j * 64, 5, 0, 7); x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(5, 5); t.anisotropy = 8; return t;
}
function texHaz() {
  const c = document.createElement("canvas"); c.width = 128; c.height = 512; const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, "rgba(255,230,170,0.9)"); g.addColorStop(1, "rgba(255,180,80,0)");
  x.fillStyle = g; x.beginPath(); x.moveTo(54, 0); x.lineTo(74, 0); x.lineTo(128, 512); x.lineTo(0, 512); x.closePath(); x.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export function crearEscenario(spriteDragon) {
  // suelo de plató con rejilla dorada que se desvanece a lo lejos
  const suelo = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    uniforms: { uMap: { value: texSuelo() }, uOff: { value: 0 }, uK: { value: 1 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
    fragmentShader: `varying vec2 vUv; uniform sampler2D uMap; uniform float uOff, uK;
      void main(){ vec4 c = texture2D(uMap, vUv * 5. + vec2(0., uOff)); float d = length(vUv - vec2(.5, .62));
        float a = c.a * smoothstep(.55, .05, d) * .55 * uK; gl_FragColor = vec4(c.rgb * vec3(1., .78, .42) * a, a);
        #include <colorspace_fragment>
      }`,
  }));
  suelo.rotation.x = -Math.PI / 2; suelo.position.set(0, -2.75, -6);
  decor.grupo.add(suelo); decor.suelo = suelo;
  // brillo del mandala (copia más grande y suave)
  decor.brillo = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 7.4), new THREE.MeshBasicMaterial({ map: decor.anillos[0].material.map, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.12, toneMapped: false }));
  decor.grupo.add(decor.brillo);
  // focos que barren
  const th = texHaz();
  decor.focos = [-1, 1].map((l) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 9.5), new THREE.MeshBasicMaterial({ map: th, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.22, toneMapped: false, side: THREE.DoubleSide })); m.userData.l = l; decor.grupo.add(m); return m; });
  decor.dragon = spriteDragon;
}
export function animarDecor(t, cy = -0.6) {
  const k = decor.k; decor.grupo.visible = k > 0.01; if (decor.dragon) decor.dragon.visible = false; if (!decor.grupo.visible) return;
  if (decor.suelo) {
    decor.suelo.material.uniforms.uOff.value = t * 0.22; decor.suelo.material.uniforms.uK.value = k;
    decor.brillo.position.set(0, cy, -2.25); decor.brillo.rotation.copy(decor.anillos[0].rotation); decor.brillo.material.opacity = 0.14 * k * (0.8 + 0.2 * Math.sin(t * 2));
    decor.focos.forEach((m) => { const l = m.userData.l; m.position.set(l * 1.6, 2.6, -4.5); m.rotation.set(0, 0, Math.PI + l * (0.35 + 0.28 * Math.sin(t * 0.7 + l))); m.material.opacity = 0.2 * k; });
    if (decor.dragon) { const ciclo = (t % 14) / 14; const d = decor.dragon; d.visible = true; d.position.set(lerp(-5, 5, ciclo), 1.2 + Math.sin(ciclo * 6.28) * 0.5, -7); d.rotation.set(0, Math.PI, -0.15); d.scale.setScalar(1.6); const u = d.material.uniforms; u.uA.value = 0.55 * k * Math.sin(Math.PI * ciclo); u.uT.value = t; }
  }
  decor.anillos.forEach((m, i) => { m.position.set(0, cy, -2.2 - i * 0.6); m.rotation.set(-0.35 + 0.1 * Math.sin(t * 0.4 + i), 0.25 * Math.sin(t * 0.3 + i * 2), (i ? -1 : 1) * t * 0.22); m.material.opacity = (i ? 0.28 : 0.4) * k; });
  decor.faroles.forEach((g) => { const u = g.userData; const fase = ((u.f + t * u.v) % 5.5) / 5.5; const y = fase * 5.5 - 4.5; const fade = Math.min(1, fase * 6, (1 - fase) * 6); g.position.set(u.x + Math.sin(t * 0.6 + u.f) * 0.2, y, u.z); g.rotation.set(0, t * 0.8 + u.f, Math.sin(t + u.f) * 0.12); g.scale.setScalar(u.s * k * 0.8 * Math.max(0.001, fade)); });
  decor.fichas.forEach((m) => { const u = m.userData; const y = ((u.y0 + t * u.v) % 7) - 5; m.position.set(u.x, y, u.z); m.rotation.set(Math.sin(t * 0.7 + u.f) * 0.4, t * 0.5 + u.f, Math.sin(t * 0.5 + u.f) * 0.2); m.material.opacity = 0.85 * k; });
}
