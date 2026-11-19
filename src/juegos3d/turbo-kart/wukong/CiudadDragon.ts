/**
 * Wukong Turbo Rush · capa visual «Ciudad del Dragón» para los circuitos (maqueta 01 y la del dueño):
 * carretera de jade con venas eléctricas y bordes neón, barandillas de escamas rojas y doradas con púas,
 * arco paifang en la meta, serpiente-dragón junto a la pista, pagodas, farolillos, cintas rojas,
 * nubes bajas y fuegos artificiales. Solo es decoración: la física sigue usando la pista original.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { IKart, ITrack, TrackDefinition, TrackSample } from '../core/types';
import { wrap01 } from '../core/math';

interface Estilo {
  /** Color base de la carretera y su opacidad sobre el asfalto. */
  carretera: number;
  alfa: number;
  venas: number;
  bordeA: number;
  bordeB: number;
  noche: boolean;
  ciudad: boolean;
  fuegos: boolean;
  dragon: number;
  nubes: number;
}

const ESTILOS: Record<string, Estilo> = {
  neon_nexus: { carretera: 0x1aa59a, alfa: 0.92, venas: 0x7ffff0, bordeA: 0xff3fa0, bordeB: 0x3ff0ff, noche: true, ciudad: true, fuegos: true, dragon: 0x1f8a7a, nubes: 0x8a90b0 },
  sunny_circuit: { carretera: 0x1f6b5a, alfa: 0.5, venas: 0x9ffff0, bordeA: 0xffc531, bordeB: 0x5fffd0, noche: false, ciudad: false, fuegos: false, dragon: 0xc8102e, nubes: 0xffffff },
  dune_drift: { carretera: 0x6a1a08, alfa: 0.45, venas: 0xffb347, bordeA: 0xff5a1f, bordeB: 0xffd23f, noche: false, ciudad: false, fuegos: true, dragon: 0xc8102e, nubes: 0xffe2c0 },
  frostbite_falls: { carretera: 0x2a8a82, alfa: 0.5, venas: 0xe0fffb, bordeA: 0x5fd3ff, bordeB: 0xffffff, noche: false, ciudad: false, fuegos: false, dragon: 0x1f7a66, nubes: 0xffffff },
};

function esVacio(def: TrackDefinition, t: number): boolean {
  const tw = wrap01(t);
  for (const [a, b] of def.voidRanges ?? []) {
    if (a <= b ? tw >= a && tw <= b : tw >= a || tw <= b) return true;
  }
  return false;
}

function rnd(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function texturaCanvas(w: number, h: number, dibujar: (c: CanvasRenderingContext2D) => void, repetir = true): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const c = cv.getContext('2d');
  if (c) dibujar(c);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repetir) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

const VERT_CARRETERA = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Jade translúcido + venas eléctricas animadas + bordes neón + línea central discontinua.
const FRAG_CARRETERA = /* glsl */ `
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uVenas;
uniform vec3 uBordeA;
uniform vec3 uBordeB;
uniform float uAlfa;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
void main() {
  float x = vUv.x;           // 0..1 de lado a lado
  float y = vUv.y;           // metros / 6 a lo largo
  vec2 p = vec2(x * 3.0, y * 0.9);
  float n = fbm(p + vec2(0.0, -uTime * 0.25));
  float vena = 1.0 - smoothstep(0.0, 0.045, abs(n - 0.5));
  float n2 = fbm(p * 1.7 + vec2(3.1, uTime * 0.18));
  vena += 0.6 * (1.0 - smoothstep(0.0, 0.03, abs(n2 - 0.52)));
  float pulso = 0.6 + 0.4 * sin(uTime * 3.0 + y * 1.3);
  vec3 col = uBase * (0.32 + 0.3 * fbm(p * 0.6));
  col += uVenas * 0.03 * fbm(p * 2.5 + uTime * 0.05);
  col += uVenas * vena * pulso * 0.55;
  float borde = smoothstep(0.035, 0.0, x) + smoothstep(0.965, 1.0, x);
  float borde2 = smoothstep(0.075, 0.055, abs(x - 0.06)) + smoothstep(0.075, 0.055, abs(x - 0.94));
  col = mix(col, uBordeA * 1.1, clamp(borde, 0.0, 1.0));
  col += uBordeB * 0.7 * clamp(borde2 - borde, 0.0, 1.0);
  float dash = step(0.5, fract(y * 0.5)) * (1.0 - smoothstep(0.006, 0.012, abs(x - 0.5)));
  col = mix(col, vec3(0.9), dash * 0.7);
  float a = clamp(uAlfa + vena * 0.15 + borde + dash * 0.5, 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}`;

/** Punto de fuego artificial. */
interface Particula {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  vida: number; max: number;
  r: number; g: number; b: number;
}

const COLORES_FUEGO = [0xffd23f, 0xff3a4f, 0x3ff0ff, 0xff7ad9, 0xfff1b8, 0x7cff9a];
const MAX_PARTICULAS = 2400;

/** Estela de luz detrás de cada kart (dos cintas: rosa y cian). */
interface Estela {
  kart: IKart;
  puntos: THREE.Vector3[][];
  mallas: THREE.Mesh[];
}
const LARGO_ESTELA = 26;

export class CiudadDragon {
  readonly object = new THREE.Group();
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly mats: THREE.Material[] = [];
  private readonly texs: THREE.Texture[] = [];
  private readonly matCarretera: THREE.ShaderMaterial;
  private readonly estilo: Estilo;
  private tiempo = 0;
  private readonly ocultos: THREE.Object3D[] = [];

  // fuegos artificiales
  private readonly particulas: Particula[] = [];
  private puntos: THREE.Points | null = null;
  private siguienteFuego = 0.5;
  private readonly centro = new THREE.Vector3();
  private radioCiudad = 200;

  // estelas
  private readonly estelas: Estela[] = [];

  constructor(
    private readonly track: ITrack,
    karts: readonly IKart[],
  ) {
    this.object.name = 'ciudadDragon';
    const def = track.def;
    this.estilo = ESTILOS[def.id] ?? ESTILOS.sunny_circuit;
    const e = this.estilo;

    // Ocultar barandillas, pórtico y puentes publicitarios originales (los sustituimos).
    track.object.traverse((o) => {
      if (o.name === 'barriers' || o.name === 'gantry' || o.name === 'sponsorBridges') {
        o.visible = false;
        this.ocultos.push(o);
      }
    });

    // Centro y radio aproximados del circuito.
    const s = this.muestra(0);
    const box = new THREE.Box3();
    for (let i = 0; i < 64; i++) box.expandByPoint(this.muestra(i / 64).position);
    box.getCenter(this.centro);
    this.radioCiudad = Math.max(box.max.x - box.min.x, box.max.z - box.min.z) * 0.6 + 60;
    void s;

    this.matCarretera = new THREE.ShaderMaterial({
      vertexShader: VERT_CARRETERA,
      fragmentShader: FRAG_CARRETERA,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uBase: { value: new THREE.Color(e.carretera) },
        uVenas: { value: new THREE.Color(e.venas) },
        uBordeA: { value: new THREE.Color(e.bordeA) },
        uBordeB: { value: new THREE.Color(e.bordeB) },
        uAlfa: { value: e.alfa },
      },
    });
    this.mats.push(this.matCarretera);

    this.crearCarretera();
    this.crearBarandillas();
    this.crearArco();
    this.crearFarolillosYCintas();
    this.crearDragon();
    this.crearPagodas();
    if (e.nubes) this.crearNubes();
    if (e.fuegos || e.noche) this.crearFuegos();
    this.crearEstelas(karts);
  }

  private muestra(t: number, out?: TrackSample): TrackSample {
    return this.track.sample(wrap01(t), out);
  }

  private g<T extends THREE.BufferGeometry>(x: T): T {
    this.geos.push(x);
    return x;
  }

  private m<T extends THREE.Material>(x: T): T {
    this.mats.push(x);
    return x;
  }

  // ------------------------------------------------------------------ carretera
  private crearCarretera(): void {
    const L = this.track.length;
    const n = Math.max(200, Math.round(L / 2));
    const pos: number[] = [];
    const uv: number[] = [];
    const idx: number[] = [];
    const s = this.muestra(0);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      this.muestra(t, s);
      const hw = s.halfWidth;
      for (const lado of [-1, 1]) {
        pos.push(s.position.x + s.binormal.x * hw * lado, s.position.y + 0.06, s.position.z + s.binormal.z * hw * lado);
        uv.push(lado < 0 ? 0 : 1, (t * L) / 6);
      }
      if (i < n) {
        const a = i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const geo = this.g(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, this.matCarretera);
    mesh.renderOrder = 2;
    mesh.frustumCulled = false;
    this.object.add(mesh);
  }

  // ------------------------------------------------------------------ barandillas de escamas
  private crearBarandillas(): void {
    const def = this.track.def;
    const tex = texturaCanvas(256, 128, (c) => {
      const grad = c.createLinearGradient(0, 0, 0, 128);
      grad.addColorStop(0, '#ff5a3a');
      grad.addColorStop(0.5, '#c8102e');
      grad.addColorStop(1, '#5a0610');
      c.fillStyle = grad;
      c.fillRect(0, 0, 256, 128);
      c.strokeStyle = '#ffd36a';
      c.lineWidth = 3;
      for (let row = 0; row < 6; row++) {
        for (let col = -1; col < 10; col++) {
          const x = col * 28 + (row % 2) * 14;
          const y = row * 22 + 10;
          c.beginPath();
          c.arc(x, y, 14, 0.15 * Math.PI, 0.85 * Math.PI);
          c.stroke();
        }
      }
      c.fillStyle = '#ffd36a';
      c.fillRect(0, 0, 256, 8);
      c.fillRect(0, 120, 256, 8);
    });
    tex.repeat.set(1, 1);
    this.texs.push(tex);
    const mat = this.m(
      new THREE.MeshStandardMaterial({ map: tex, emissive: 0x8a0c18, emissiveMap: tex, emissiveIntensity: 0.55, roughness: 0.35, metalness: 0.4, side: THREE.DoubleSide }),
    );
    const L = this.track.length;
    const paso = 2;
    const n = Math.round(L / paso);
    const alto = 1.15;
    const pos: number[] = [];
    const uv: number[] = [];
    const idx: number[] = [];
    const puntas: THREE.Matrix4[] = [];
    const s = this.muestra(0);
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    for (const lado of [-1, 1]) {
      let abierto = false;
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        if (esVacio(def, t)) {
          abierto = false;
          continue;
        }
        this.muestra(t, s);
        const d = s.wallHalfWidth - 0.15;
        const x = s.position.x + s.binormal.x * d * lado;
        const z = s.position.z + s.binormal.z * d * lado;
        const y = s.position.y;
        const base = pos.length / 3;
        pos.push(x, y - 0.3, z, x, y + alto, z);
        uv.push((t * L) / 5, 0, (t * L) / 5, 1);
        if (abierto) idx.push(base - 2, base, base - 1, base - 1, base, base + 1);
        abierto = true;
        if (i % 2 === 0) {
          q.setFromUnitVectors(up, new THREE.Vector3(s.binormal.x * -lado * 0.25, 1, s.binormal.z * -lado * 0.25).normalize());
          puntas.push(new THREE.Matrix4().compose(new THREE.Vector3(x, y + alto + 0.28, z), q, new THREE.Vector3(1, 1, 1)));
        }
      }
    }
    const geo = this.g(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const muro = new THREE.Mesh(geo, mat);
    muro.receiveShadow = true;
    muro.frustumCulled = false;
    this.object.add(muro);

    // Remate dorado brillante encima del muro (línea neón)
    const remate = new THREE.InstancedMesh(
      this.g(new THREE.ConeGeometry(0.22, 0.62, 5)),
      this.m(new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0xc98a1a, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.25 })),
      puntas.length,
    );
    puntas.forEach((mt, i) => remate.setMatrixAt(i, mt));
    remate.instanceMatrix.needsUpdate = true;
    remate.frustumCulled = false;
    this.object.add(remate);
  }

  // ------------------------------------------------------------------ arco paifang de la meta
  private crearArco(): void {
    const s = this.muestra(8 / this.track.length);
    const grupo = new THREE.Group();
    const m = new THREE.Matrix4().makeBasis(s.binormal, new THREE.Vector3(0, 1, 0), s.tangent.clone().negate());
    grupo.quaternion.setFromRotationMatrix(m);
    grupo.position.copy(s.position);
    const ancho = s.wallHalfWidth + 1.5;
    const oro = this.m(new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.85, roughness: 0.25, emissive: 0x5a3a08, emissiveIntensity: 0.6 }));
    const laca = this.m(new THREE.MeshStandardMaterial({ color: 0xb30f22, roughness: 0.4, metalness: 0.2, emissive: 0x3a0008, emissiveIntensity: 0.6 }));
    const jade = this.m(new THREE.MeshStandardMaterial({ color: 0x1f8a7a, roughness: 0.3, metalness: 0.3, emissive: 0x0b4a40, emissiveIntensity: 0.8 }));
    const neon = this.m(new THREE.MeshBasicMaterial({ color: 0x5ffff0, toneMapped: false }));
    const H = 13;
    const columna = this.g(new THREE.CylinderGeometry(0.75, 0.9, H, 12));
    for (const lado of [-1, 1]) {
      const c = new THREE.Mesh(columna, laca);
      c.position.set(lado * ancho, H / 2, 0);
      c.castShadow = true;
      grupo.add(c);
      const anillo = new THREE.Mesh(this.g(new THREE.TorusGeometry(0.95, 0.12, 6, 18)), oro);
      for (const h of [1.2, H * 0.5, H - 1.4]) {
        const a = anillo.clone();
        a.rotation.x = Math.PI / 2;
        a.position.set(lado * ancho, h, 0);
        grupo.add(a);
      }
      const lineaNeon = new THREE.Mesh(this.g(new THREE.BoxGeometry(0.12, H, 0.12)), neon);
      lineaNeon.position.set(lado * ancho - lado * 0.8, H / 2, 0.8);
      grupo.add(lineaNeon);
      const base = new THREE.Mesh(this.g(new THREE.BoxGeometry(2.6, 1.4, 2.6)), jade);
      base.position.set(lado * ancho, 0.7, 0);
      grupo.add(base);
    }
    // Vigas y tejados de dos niveles
    const viga = new THREE.Mesh(this.g(new THREE.BoxGeometry(ancho * 2 + 3, 1.1, 1.4)), laca);
    viga.position.y = H - 2.2;
    grupo.add(viga);
    const viga2 = new THREE.Mesh(this.g(new THREE.BoxGeometry(ancho * 2 + 1, 0.6, 1.2)), oro);
    viga2.position.y = H - 4;
    grupo.add(viga2);
    const tejado = (w: number, y: number, h: number): void => {
      const shape = new THREE.Shape();
      shape.moveTo(-w / 2 - 1.6, 0);
      shape.quadraticCurveTo(-w / 2, 0.2, -w / 2 + 1.2, h);
      shape.lineTo(w / 2 - 1.2, h);
      shape.quadraticCurveTo(w / 2, 0.2, w / 2 + 1.6, 0);
      shape.lineTo(-w / 2 - 1.6, 0);
      const geo = this.g(new THREE.ExtrudeGeometry(shape, { depth: 3.2, bevelEnabled: false }));
      geo.translate(0, 0, -1.6);
      const t = new THREE.Mesh(geo, jade);
      t.position.y = y;
      grupo.add(t);
      const borde = new THREE.Mesh(this.g(new THREE.BoxGeometry(w + 3.4, 0.18, 3.4)), oro);
      borde.position.y = y;
      grupo.add(borde);
    };
    tejado(ancho * 2 + 3, H - 1.6, 1.6);
    tejado(ancho * 1.1, H + 0.4, 1.4);
    // Placa central «西游极速 · WUKONG TURBO RUSH»
    const tx = texturaCanvas(
      512,
      200,
      (c) => {
        c.fillStyle = '#7a0a16';
        c.fillRect(0, 0, 512, 200);
        c.strokeStyle = '#ffd36a';
        c.lineWidth = 10;
        c.strokeRect(8, 8, 496, 184);
        c.fillStyle = '#ffe9a8';
        c.textAlign = 'center';
        c.font = '900 92px "PingFang SC","Noto Sans CJK SC","Microsoft YaHei",serif';
        c.fillText('西游极速', 256, 108);
        c.font = '800 30px Impact, "Arial Black", sans-serif';
        c.fillText('WUKONG TURBO RUSH', 256, 162);
      },
      false,
    );
    this.texs.push(tx);
    const placa = new THREE.Mesh(this.g(new THREE.PlaneGeometry(7.2, 2.8)), this.m(new THREE.MeshBasicMaterial({ map: tx, toneMapped: false, side: THREE.DoubleSide })));
    placa.position.set(0, H - 4.6, 0.75);
    grupo.add(placa);
    // Brillo neón del arco
    const halo = new THREE.Mesh(
      this.g(new THREE.TorusGeometry(ancho + 0.2, 0.09, 6, 64, Math.PI)),
      neon,
    );
    halo.position.set(0, H - 6.5, 0.9);
    halo.scale.y = 0.6;
    grupo.add(halo);
    // Dos dragones dorados (cuerpo de tubo) enroscados en las columnas
    for (const lado of [-1, 1]) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 40; i++) {
        const a = i * 0.45 * lado;
        pts.push(new THREE.Vector3(lado * ancho + Math.cos(a) * 1.15, 0.8 + i * 0.27, Math.sin(a) * 1.15));
      }
      const tubo = new THREE.Mesh(this.g(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.32, 8)), oro);
      grupo.add(tubo);
    }
    this.object.add(grupo);
  }

  // ------------------------------------------------------------------ farolillos, postes y cintas
  private crearFarolillosYCintas(): void {
    const def = this.track.def;
    const L = this.track.length;
    const paso = 18;
    const n = Math.floor(L / paso);
    const s = this.muestra(0);
    const postes: THREE.Matrix4[] = [];
    const faroles: THREE.Matrix4[] = [];
    const cintas: THREE.BufferGeometry[] = [];
    const pos = new THREE.Vector3();
    const izq = new THREE.Vector3();
    const der = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      if (esVacio(def, t)) continue;
      this.muestra(t, s);
      const d = s.wallHalfWidth + 1.2;
      for (const lado of [-1, 1]) {
        if ((i + (lado > 0 ? 1 : 0)) % 2 !== 0 && i % 3 !== 0) continue;
        pos.set(s.position.x + s.binormal.x * d * lado, s.position.y, s.position.z + s.binormal.z * d * lado);
        postes.push(new THREE.Matrix4().makeTranslation(pos.x, pos.y + 3, pos.z));
        faroles.push(new THREE.Matrix4().compose(new THREE.Vector3(pos.x, pos.y + 6.3, pos.z), new THREE.Quaternion(), new THREE.Vector3(1, 1.25, 1)));
      }
      // Cinta roja que cruza la pista cada 4 tramos, con farolillos colgando
      if (i % 4 === 2) {
        izq.set(s.position.x - s.binormal.x * d, s.position.y + 7.5, s.position.z - s.binormal.z * d);
        der.set(s.position.x + s.binormal.x * d, s.position.y + 7.5, s.position.z + s.binormal.z * d);
        const medio = izq.clone().add(der).multiplyScalar(0.5);
        medio.y -= 1.6;
        const curva = new THREE.QuadraticBezierCurve3(izq.clone(), medio, der.clone());
        cintas.push(new THREE.TubeGeometry(curva, 24, 0.16, 5));
        for (let k = 1; k < 4; k++) {
          const p = curva.getPoint(k / 4);
          faroles.push(new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y - 0.9, p.z), new THREE.Quaternion(), new THREE.Vector3(0.8, 1, 0.8)));
        }
      }
    }
    const poste = new THREE.InstancedMesh(
      this.g(new THREE.CylinderGeometry(0.12, 0.16, 6, 6)),
      this.m(new THREE.MeshStandardMaterial({ color: 0x3a1a10, roughness: 0.6, metalness: 0.4 })),
      postes.length,
    );
    postes.forEach((mt, i) => poste.setMatrixAt(i, mt));
    poste.frustumCulled = false;
    this.object.add(poste);
    const farol = new THREE.InstancedMesh(
      this.g(new THREE.SphereGeometry(0.55, 10, 8)),
      this.m(new THREE.MeshStandardMaterial({ color: 0xd8141e, emissive: 0xff1a08, emissiveIntensity: 1.1, roughness: 0.5 })),
      faroles.length,
    );
    faroles.forEach((mt, i) => farol.setMatrixAt(i, mt));
    farol.frustumCulled = false;
    this.object.add(farol);
    const tapas = new THREE.InstancedMesh(
      this.g(new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8)),
      this.m(new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.8, roughness: 0.3 })),
      faroles.length,
    );
    faroles.forEach((mt, i) => tapas.setMatrixAt(i, mt.clone().scale(new THREE.Vector3(1, 0.62, 1))));
    tapas.frustumCulled = false;
    this.object.add(tapas);
    if (cintas.length) {
      const geo = this.g(mergeGeometries(cintas) as THREE.BufferGeometry);
      for (const c of cintas) c.dispose();
      const cinta = new THREE.Mesh(geo, this.m(new THREE.MeshStandardMaterial({ color: 0xd4142c, emissive: 0x6a0812, emissiveIntensity: 0.7, roughness: 0.6 })));
      cinta.frustumCulled = false;
      this.object.add(cinta);
    }
  }

  // ------------------------------------------------------------------ serpiente-dragón junto a la pista
  private crearDragon(): void {
    const def = this.track.def;
    const color = this.estilo.dragon;
    const tex = texturaCanvas(256, 128, (c) => {
      const base = new THREE.Color(color);
      c.fillStyle = `#${base.getHexString()}`;
      c.fillRect(0, 0, 256, 128);
      for (let row = 0; row < 8; row++) {
        for (let col = -1; col < 12; col++) {
          const x = col * 24 + (row % 2) * 12;
          const y = row * 16 + 8;
          const g = c.createRadialGradient(x, y - 4, 1, x, y, 13);
          g.addColorStop(0, 'rgba(255,255,255,0.35)');
          g.addColorStop(1, 'rgba(0,0,0,0.25)');
          c.fillStyle = g;
          c.beginPath();
          c.arc(x, y, 12, 0, Math.PI);
          c.fill();
          c.strokeStyle = '#ffd36a';
          c.lineWidth = 1.6;
          c.beginPath();
          c.arc(x, y, 12, 0.1 * Math.PI, 0.9 * Math.PI);
          c.stroke();
        }
      }
    });
    tex.repeat.set(30, 1);
    this.texs.push(tex);
    const mat = this.m(new THREE.MeshStandardMaterial({ map: tex, metalness: 0.55, roughness: 0.3, emissive: color, emissiveIntensity: 0.25 }));
    const oro = this.m(new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0xc98a1a, emissiveIntensity: 0.9, metalness: 0.9, roughness: 0.2 }));
    // Un tramo largo (≈30 % de la vuelta) por fuera de la pista, ondulando por encima de los muros.
    const inicio = 0.12;
    const tramo = 0.3;
    const pts: THREE.Vector3[] = [];
    const s = this.muestra(0);
    const N = 60;
    for (let i = 0; i <= N; i++) {
      const t = inicio + (tramo * i) / N;
      this.muestra(t, s);
      const lado = esVacio(def, t) ? 1 : 1;
      const d = s.wallHalfWidth + 4 + Math.sin(i * 0.45) * 2.2;
      pts.push(
        new THREE.Vector3(
          s.position.x + s.binormal.x * d * lado,
          s.position.y + 3.2 + Math.sin(i * 0.38) * 2.6,
          s.position.z + s.binormal.z * d * lado,
        ),
      );
    }
    const curva = new THREE.CatmullRomCurve3(pts);
    const segs = 360;
    const cuerpo = this.g(new THREE.TubeGeometry(curva, segs, 1.25, 12));
    // Afinar la cola
    const p = cuerpo.attributes.position as THREE.BufferAttribute;
    const centro = new THREE.Vector3();
    const v = new THREE.Vector3();
    for (let i = 0; i <= segs; i++) {
      const u = i / segs;
      curva.getPointAt(u, centro);
      const f = u < 0.12 ? 0.25 + (u / 0.12) * 0.75 : u > 0.94 ? 1.15 : 1;
      for (let j = 0; j <= 12; j++) {
        const k = i * 13 + j;
        v.fromBufferAttribute(p, k).sub(centro).multiplyScalar(f).add(centro);
        p.setXYZ(k, v.x, v.y, v.z);
      }
    }
    p.needsUpdate = true;
    cuerpo.computeVertexNormals();
    const malla = new THREE.Mesh(cuerpo, mat);
    malla.castShadow = true;
    malla.frustumCulled = false;
    this.object.add(malla);
    // Púas doradas sobre el lomo
    const nP = 90;
    const pua = new THREE.InstancedMesh(this.g(new THREE.ConeGeometry(0.35, 1.3, 5)), oro, nP);
    const q = new THREE.Quaternion();
    const tan = new THREE.Vector3();
    for (let i = 0; i < nP; i++) {
      const u = 0.06 + (0.9 * i) / nP;
      curva.getPointAt(u, centro);
      curva.getTangentAt(u, tan);
      const f = u < 0.12 ? 0.25 + (u / 0.12) * 0.75 : 1;
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0));
      pua.setMatrixAt(i, new THREE.Matrix4().compose(centro.clone().add(new THREE.Vector3(0, 1.25 * f + 0.4, 0)), q, new THREE.Vector3(f, f, f)));
    }
    pua.frustumCulled = false;
    this.object.add(pua);
    // Cabeza: hocico, mandíbula, cuernos y ojos brillantes
    const cabeza = new THREE.Group();
    const fin = curva.getPointAt(1);
    const dir = curva.getTangentAt(1);
    cabeza.position.copy(fin);
    cabeza.lookAt(fin.clone().add(dir));
    const craneo = new THREE.Mesh(this.g(new THREE.SphereGeometry(1.7, 14, 10)), mat);
    craneo.scale.set(1, 0.85, 1.25);
    cabeza.add(craneo);
    const hocico = new THREE.Mesh(this.g(new THREE.BoxGeometry(1.9, 1.0, 2.4)), mat);
    hocico.position.set(0, -0.2, 2.1);
    cabeza.add(hocico);
    const mandibula = new THREE.Mesh(this.g(new THREE.BoxGeometry(1.6, 0.4, 2.2)), oro);
    mandibula.position.set(0, -0.95, 1.9);
    mandibula.rotation.x = 0.25;
    cabeza.add(mandibula);
    for (const l of [-1, 1]) {
      const cuerno = new THREE.Mesh(this.g(new THREE.ConeGeometry(0.28, 2.6, 6)), oro);
      cuerno.position.set(l * 0.8, 1.6, -0.6);
      cuerno.rotation.set(-0.9, 0, l * 0.35);
      cabeza.add(cuerno);
      const ojo = new THREE.Mesh(this.g(new THREE.SphereGeometry(0.28, 8, 6)), this.m(new THREE.MeshBasicMaterial({ color: 0x7cffd0, toneMapped: false })));
      ojo.position.set(l * 0.75, 0.45, 1.3);
      cabeza.add(ojo);
      const bigote = new THREE.Mesh(
        this.g(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(l * 0.9, -0.3, 3.1), new THREE.Vector3(l * 2.2, -0.8, 3.6), new THREE.Vector3(l * 3.2, -0.2, 3.0)]), 12, 0.08, 4)),
        oro,
      );
      cabeza.add(bigote);
    }
    this.object.add(cabeza);
  }

  // ------------------------------------------------------------------ pagodas (y torres neón en la ciudad)
  private crearPagodas(): void {
    const r = rnd(this.track.def.id.length * 977);
    const piezas: THREE.BufferGeometry[] = [];
    const pisos = 4;
    for (let k = 0; k < pisos; k++) {
      const w = 6 - k * 1.1;
      const cuerpo = new THREE.BoxGeometry(w, 3.2, w);
      cuerpo.translate(0, k * 4.2 + 1.6, 0);
      piezas.push(cuerpo);
    }
    const geoCuerpo = this.g(mergeGeometries(piezas) as THREE.BufferGeometry);
    for (const p of piezas) p.dispose();
    const tejados: THREE.BufferGeometry[] = [];
    for (let k = 0; k < pisos; k++) {
      const w = 6 - k * 1.1;
      const t = new THREE.ConeGeometry(w * 0.95, 1.6, 4, 1, true);
      t.rotateY(Math.PI / 4);
      t.translate(0, k * 4.2 + 3.9, 0);
      tejados.push(t);
    }
    const remate = new THREE.ConeGeometry(0.4, 2.4, 6);
    remate.translate(0, pisos * 4.2 + 1.4, 0);
    tejados.push(remate);
    const geoTejado = this.g(mergeGeometries(tejados) as THREE.BufferGeometry);
    for (const p of tejados) p.dispose();
    const texVentanas = texturaCanvas(64, 64, (c) => {
      c.fillStyle = '#8a1020';
      c.fillRect(0, 0, 64, 64);
      c.fillStyle = '#ffcf6a';
      for (let i = 0; i < 4; i++) c.fillRect(6 + i * 15, 18, 8, 26);
    });
    this.texs.push(texVentanas);
    const matCuerpo = this.m(new THREE.MeshStandardMaterial({ map: texVentanas, emissiveMap: texVentanas, emissive: 0xffb040, emissiveIntensity: this.estilo.noche ? 1.2 : 0.4, roughness: 0.6 }));
    const matTejado = this.m(new THREE.MeshStandardMaterial({ color: 0x1f6b5a, emissive: 0x0b3a30, emissiveIntensity: 0.6, roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide }));
    const N = 44;
    const cuerpos = new THREE.InstancedMesh(geoCuerpo, matCuerpo, N);
    const techos = new THREE.InstancedMesh(geoTejado, matTejado, N);
    const s = this.muestra(0);
    let k = 0;
    for (let i = 0; i < N * 3 && k < N; i++) {
      const t = r();
      this.muestra(t, s);
      const lado = r() < 0.5 ? -1 : 1;
      const d = s.wallHalfWidth + 11 + r() * 30;
      const x = s.position.x + s.binormal.x * d * lado;
      const z = s.position.z + s.binormal.z * d * lado;
      // que no caiga encima de otro tramo de la pista
      const q = this.track.query(new THREE.Vector3(x, 0, z));
      if (Math.abs(q.lateral) < q.wallHalfWidth + 7) continue;
      const esc = 0.8 + r() * 0.9;
      const y = this.track.heightAt(x, z);
      const mt = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, r() * Math.PI, 0)), new THREE.Vector3(esc, esc, esc));
      cuerpos.setMatrixAt(k, mt);
      techos.setMatrixAt(k, mt);
      k++;
    }
    cuerpos.count = techos.count = k;
    cuerpos.frustumCulled = techos.frustumCulled = false;
    this.object.add(cuerpos, techos);

    if (this.estilo.ciudad) {
      // Torres neón altas en el horizonte, con franjas cian y rosa.
      const texTorre = texturaCanvas(64, 256, (c) => {
        c.fillStyle = '#0a0f22';
        c.fillRect(0, 0, 64, 256);
        for (let y = 4; y < 256; y += 10) {
          for (let x = 4; x < 64; x += 10) {
            if (Math.random() < 0.55) {
              c.fillStyle = Math.random() < 0.7 ? '#5fe8ff' : '#ff6ac0';
              c.globalAlpha = 0.5 + Math.random() * 0.5;
              c.fillRect(x, y, 5, 5);
            }
          }
        }
        c.globalAlpha = 1;
        c.fillStyle = '#3ff0ff';
        c.fillRect(0, 0, 3, 256);
        c.fillRect(61, 0, 3, 256);
      });
      this.texs.push(texTorre);
      const M = 70;
      const torres = new THREE.InstancedMesh(
        this.g(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0)),
        this.m(new THREE.MeshStandardMaterial({ map: texTorre, emissiveMap: texTorre, emissive: 0xffffff, emissiveIntensity: 1.3, roughness: 0.5 })),
        M,
      );
      for (let i = 0; i < M; i++) {
        const a = (i / M) * Math.PI * 2 + r() * 0.08;
        const rad = this.radioCiudad + 30 + r() * 120;
        const h = 40 + r() * 110;
        const w = 12 + r() * 16;
        torres.setMatrixAt(
          i,
          new THREE.Matrix4().compose(
            new THREE.Vector3(this.centro.x + Math.cos(a) * rad, -2, this.centro.z + Math.sin(a) * rad),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(0, r() * Math.PI, 0)),
            new THREE.Vector3(w, h, w * (0.7 + r() * 0.6)),
          ),
        );
      }
      torres.frustumCulled = false;
      this.object.add(torres);
    }
  }

  // ------------------------------------------------------------------ nubes bajas
  private crearNubes(): void {
    const tex = texturaCanvas(
      128,
      128,
      (c) => {
        for (let i = 0; i < 7; i++) {
          const x = 30 + Math.random() * 68;
          const y = 50 + Math.random() * 30;
          const g = c.createRadialGradient(x, y, 2, x, y, 40);
          g.addColorStop(0, 'rgba(255,255,255,0.55)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          c.fillStyle = g;
          c.fillRect(0, 0, 128, 128);
        }
      },
      false,
    );
    this.texs.push(tex);
    const mat = this.m(
      new THREE.SpriteMaterial({ map: tex, color: this.estilo.nubes, transparent: true, depthWrite: false, opacity: this.estilo.noche ? 0.5 : 0.75, fog: true }),
    );
    const r = rnd(4242);
    const s = this.muestra(0);
    for (let i = 0; i < 26; i++) {
      this.muestra(r(), s);
      const lado = r() < 0.5 ? -1 : 1;
      const d = s.wallHalfWidth + 10 + r() * 30;
      const sp = new THREE.Sprite(mat);
      sp.position.set(s.position.x + s.binormal.x * d * lado, s.position.y - 1 + r() * 5, s.position.z + s.binormal.z * d * lado);
      const e = 18 + r() * 22;
      sp.scale.set(e, e * 0.45, 1);
      this.object.add(sp);
    }
  }

  // ------------------------------------------------------------------ fuegos artificiales
  private crearFuegos(): void {
    const geo = this.g(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_PARTICULAS * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_PARTICULAS * 3), 3));
    geo.setDrawRange(0, 0);
    const tex = texturaCanvas(
      32,
      32,
      (c) => {
        const g = c.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.3, 'rgba(255,255,255,0.8)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        c.fillStyle = g;
        c.fillRect(0, 0, 32, 32);
      },
      false,
    );
    this.texs.push(tex);
    const mat = this.m(
      new THREE.PointsMaterial({ size: 6, map: tex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, sizeAttenuation: true, fog: false }),
    );
    this.puntos = new THREE.Points(geo, mat);
    this.puntos.frustumCulled = false;
    this.object.add(this.puntos);
  }

  private lanzarFuego(cerca: THREE.Vector3, dir: THREE.Vector3 | null): void {
    // Delante de la cámara, para que se vean durante la carrera.
    const d = dir ?? new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
    const dist = 70 + Math.random() * 80;
    const lat = (Math.random() - 0.5) * 120;
    const x = cerca.x + d.x * dist - d.z * lat;
    const z = cerca.z + d.z * dist + d.x * lat;
    const y = cerca.y + 28 + Math.random() * 30;
    const col = new THREE.Color(COLORES_FUEGO[Math.floor(Math.random() * COLORES_FUEGO.length)]);
    const col2 = new THREE.Color(COLORES_FUEGO[Math.floor(Math.random() * COLORES_FUEGO.length)]);
    const n = 150;
    const vel = 16 + Math.random() * 12;
    for (let i = 0; i < n; i++) {
      if (this.particulas.length >= MAX_PARTICULAS) this.particulas.shift();
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const rr = Math.sqrt(1 - u * u);
      const v = vel * (0.85 + Math.random() * 0.3);
      const c = i % 3 === 0 ? col2 : col;
      this.particulas.push({ x, y, z, vx: rr * Math.cos(th) * v, vy: u * v, vz: rr * Math.sin(th) * v, vida: 0, max: 1.6 + Math.random() * 0.8, r: c.r * 1.4, g: c.g * 1.4, b: c.b * 1.4 });
    }
  }

  // ------------------------------------------------------------------ estelas neón de los karts
  private crearEstelas(karts: readonly IKart[]): void {
    for (const kart of karts) {
      const e: Estela = { kart, puntos: [[], []], mallas: [] };
      const colores = [new THREE.Color(0xff4fb0), new THREE.Color(0x3ff0ff)];
      for (let k = 0; k < 2; k++) {
        const geo = this.g(new THREE.BufferGeometry());
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(LARGO_ESTELA * 2 * 3), 3));
        const alfa = new Float32Array(LARGO_ESTELA * 2);
        for (let i = 0; i < LARGO_ESTELA; i++) alfa[i * 2] = alfa[i * 2 + 1] = 1 - i / (LARGO_ESTELA - 1);
        geo.setAttribute('alfa', new THREE.BufferAttribute(alfa, 1));
        const idx: number[] = [];
        for (let i = 0; i < LARGO_ESTELA - 1; i++) {
          const a = i * 2;
          idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }
        geo.setIndex(idx);
        const mat = this.m(
          new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            toneMapped: false,
            uniforms: { uColor: { value: colores[k] }, uFuerza: { value: 0 } },
            vertexShader: 'attribute float alfa; varying float vA; void main(){ vA = alfa; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
            fragmentShader: 'uniform vec3 uColor; uniform float uFuerza; varying float vA; void main(){ gl_FragColor = vec4(uColor * 0.8, vA * vA * uFuerza * 0.55); }',
          }),
        );
        const malla = new THREE.Mesh(geo, mat);
        malla.frustumCulled = false;
        malla.renderOrder = 3;
        this.object.add(malla);
        e.mallas.push(malla);
      }
      this.estelas.push(e);
    }
  }

  private readonly tmpF = new THREE.Vector3();
  private readonly tmpR = new THREE.Vector3();

  private actualizarEstelas(): void {
    for (const e of this.estelas) {
      const st = e.kart.state;
      e.kart.forwardDir(this.tmpF);
      this.tmpR.set(-this.tmpF.z, 0, this.tmpF.x).normalize();
      const rapidez = Math.min(1, Math.abs(st.speed) / 20);
      const fuerza = st.isBoosting ? 1 : rapidez * 0.6;
      for (let k = 0; k < 2; k++) {
        const lado = k === 0 ? -1 : 1;
        const p = new THREE.Vector3()
          .copy(st.position)
          .addScaledVector(this.tmpF, -0.95)
          .addScaledVector(this.tmpR, lado * 0.55);
        p.y += 0.1;
        const lista = e.puntos[k];
        if (!lista.length || lista[0].distanceToSquared(p) > 0.12) {
          lista.unshift(p);
          if (lista.length > LARGO_ESTELA) lista.pop();
        } else lista[0].copy(p);
        if (Math.abs(st.speed) < 1) lista.length = Math.min(lista.length, 2);
        const malla = e.mallas[k];
        const attr = malla.geometry.attributes.position as THREE.BufferAttribute;
        const ancho = st.isBoosting ? 0.22 : 0.12;
        for (let i = 0; i < LARGO_ESTELA; i++) {
          const q = lista[Math.min(i, lista.length - 1)] ?? p;
          const w = ancho * (1 - i / LARGO_ESTELA);
          attr.setXYZ(i * 2, q.x + this.tmpR.x * w, q.y, q.z + this.tmpR.z * w);
          attr.setXYZ(i * 2 + 1, q.x - this.tmpR.x * w, q.y, q.z - this.tmpR.z * w);
        }
        attr.needsUpdate = true;
        (malla.material as THREE.ShaderMaterial).uniforms.uFuerza.value = fuerza;
      }
    }
  }

  // ------------------------------------------------------------------ bucle
  private readonly dirCam = new THREE.Vector3();

  update(dt: number, foco: THREE.Vector3 | null, camara?: THREE.Camera): void {
    this.tiempo += dt;
    this.matCarretera.uniforms.uTime.value = this.tiempo;
    this.actualizarEstelas();
    if (this.puntos) {
      this.siguienteFuego -= dt;
      if (this.siguienteFuego <= 0) {
        let dir: THREE.Vector3 | null = null;
        if (camara) {
          camara.getWorldDirection(this.dirCam);
          this.dirCam.y = 0;
          if (this.dirCam.lengthSq() > 1e-4) dir = this.dirCam.normalize();
        }
        this.lanzarFuego(camara ? camara.position : (foco ?? this.centro), dir);
        this.siguienteFuego = 0.35 + Math.random() * 0.7;
      }
      const geo = this.puntos.geometry;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const col = geo.attributes.color as THREE.BufferAttribute;
      let n = 0;
      for (let i = this.particulas.length - 1; i >= 0; i--) {
        const p = this.particulas[i];
        p.vida += dt;
        if (p.vida >= p.max) {
          this.particulas.splice(i, 1);
          continue;
        }
        const arrastre = Math.exp(-1.6 * dt);
        p.vx *= arrastre;
        p.vy = p.vy * arrastre - 6 * dt;
        p.vz *= arrastre;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        const f = 1 - p.vida / p.max;
        const brillo = f * f * (0.7 + 0.3 * Math.sin(p.vida * 30 + i));
        pos.setXYZ(n, p.x, p.y, p.z);
        col.setXYZ(n, p.r * brillo, p.g * brillo, p.b * brillo);
        n++;
      }
      geo.setDrawRange(0, n);
      pos.needsUpdate = true;
      col.needsUpdate = true;
    }
  }

  dispose(): void {
    this.object.removeFromParent();
    for (const o of this.ocultos) o.visible = true;
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    for (const t of this.texs) t.dispose();
    this.particulas.length = 0;
    this.estelas.length = 0;
  }
}
