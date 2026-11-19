/**
 * Wukong Turbo Rush · decorado de los circuitos imperiales (maquetas 10, 11, 16, 09 y 05):
 *  - sunny_circuit   → Valle de Bambú · 竹林峡谷: bosque de bambú, picos kársticos, lago con pagoda,
 *                      cascadas, aros dorados sobre la pista y farolillos de los deseos.
 *  - dune_drift      → Montaña de Fuego · 火焰山: volcán con cráter de lava, pozas de lava, vía de
 *                      vagonetas, brasas, lago con farolillos flotantes.
 *  - frostbite_falls → Templo de Jade · 玉虚宫: salas de jade, puertas de piedra, guardianes de jade,
 *                      bruma y farolillos.
 * Solo decorado: la física sigue usando la pista original.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { ITrack, TrackSample } from '../core/types';
import { wrap01 } from '../core/math';

type Tema = 'bambu' | 'volcan' | 'jade';

const TEMAS: Record<string, Tema> = {
  sunny_circuit: 'bambu',
  dune_drift: 'volcan',
  frostbite_falls: 'jade',
};

/** Piezas del decorado original que no encajan con la estética imperial. */
const OCULTAR = new Set(['waterTower', 'waterTowerTank', 'barn', 'giantCactus', 'cacti', 'snowmen', 'palms', 'iceCastle', 'animated']);

function aleatorio(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function lienzo(w: number, h: number, dibujar: (c: CanvasRenderingContext2D) => void, repetir = false): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const c = cv.getContext('2d');
  if (c) dibujar(c);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repetir) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

const VERT_UV = /* glsl */ `
varying vec2 vUv;
varying vec3 vPos;
void main() {
  vUv = uv;
  vPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
}`;

const RUIDO = /* glsl */ `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.07; a *= 0.5; } return v; }
`;

// Agua de lago: ondas, reflejo de cielo y destellos.
const FRAG_AGUA = /* glsl */ `
uniform float uTime;
uniform vec3 uHondo;
uniform vec3 uClaro;
varying vec2 vUv;
varying vec3 vPos;
${RUIDO}
void main() {
  vec2 p = vPos.xz * 0.06;
  float n = fbm(p + vec2(uTime * 0.05, uTime * 0.03));
  float n2 = fbm(p * 2.3 - vec2(uTime * 0.07, 0.0));
  vec3 col = mix(uHondo, uClaro, smoothstep(0.35, 0.75, n));
  float brillo = smoothstep(0.72, 0.8, n2);
  col += vec3(1.0, 0.95, 0.8) * brillo * 0.6;
  float r = length(vUv - 0.5) * 2.0;
  col = mix(col, uClaro * 1.2, smoothstep(0.85, 1.0, r) * 0.6);
  gl_FragColor = vec4(col, 0.92);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

// Lava: corteza oscura agrietada con magma brillante que fluye.
const FRAG_LAVA = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPos;
${RUIDO}
void main() {
  vec2 p = vPos.xz * 0.12;
  float n = fbm(p + vec2(uTime * 0.08, -uTime * 0.05));
  float grieta = smoothstep(0.42, 0.55, n);
  float calor = fbm(p * 2.0 - uTime * 0.12);
  vec3 magma = mix(vec3(1.6, 0.35, 0.04), vec3(2.2, 1.3, 0.25), calor);
  vec3 corteza = vec3(0.09, 0.03, 0.02) + vec3(0.25, 0.05, 0.0) * calor;
  vec3 col = mix(magma, corteza, grieta);
  float r = length(vUv - 0.5) * 2.0;
  col = mix(col, corteza * 0.6, smoothstep(0.8, 1.0, r));
  gl_FragColor = vec4(col, 1.0);
}`;

// Cascada: franjas blancas que caen.
const FRAG_CASCADA = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vPos;
${RUIDO}
void main() {
  float n = fbm(vec2(vUv.x * 14.0, vUv.y * 3.0 + uTime * 1.6));
  float franja = smoothstep(0.45, 0.75, n);
  vec3 col = mix(uColor * 0.75, vec3(1.0), franja);
  float borde = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
  gl_FragColor = vec4(col, (0.6 + 0.4 * franja) * borde);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

// Mar de nubes: algodón iluminado por el atardecer, con huecos y movimiento lento.
const FRAG_NUBES = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uLuz;
varying vec2 vUv;
varying vec3 vPos;
${RUIDO}
void main() {
  vec2 p = vPos.xz * 0.012;
  float n = fbm(p + vec2(uTime * 0.01, uTime * 0.006));
  float n2 = fbm(p * 3.0 - vec2(uTime * 0.02, 0.0));
  float dens = smoothstep(0.3, 0.7, n * 0.7 + n2 * 0.4);
  vec3 col = mix(uColor * 0.55, uColor, dens);
  col += uLuz * pow(n2, 3.0) * 0.6;
  float d = length(vPos.xz - cameraPosition.xz);
  float a = mix(0.75, 1.0, dens) * (1.0 - smoothstep(900.0, 1900.0, d));
  gl_FragColor = vec4(col, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

interface Farolillo {
  x: number;
  y: number;
  z: number;
  v: number;
  fase: number;
}

export class CircuitosImperiales {
  readonly object = new THREE.Group();
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly mats: THREE.Material[] = [];
  private readonly texs: THREE.Texture[] = [];
  private readonly ocultos: THREE.Object3D[] = [];
  private readonly shaders: THREE.ShaderMaterial[] = [];
  private readonly tema: Tema | null;
  private readonly rnd: () => number;
  private tiempo = 0;

  /** Puntos de la línea central para medir distancias a la pista rápido. */
  private readonly linea: { x: number; z: number }[] = [];
  private readonly min = new THREE.Vector2(Infinity, Infinity);
  private readonly max = new THREE.Vector2(-Infinity, -Infinity);
  private anchoMuro = 12;

  // animaciones
  private farolillos: { mesh: THREE.InstancedMesh; datos: Farolillo[]; techo: number } | null = null;
  private vagonetas: { mesh: THREE.InstancedMesh; curva: THREE.Curve<THREE.Vector3>; fases: number[] } | null = null;
  private brasas: THREE.Points | null = null;
  private brasasBase: Float32Array | null = null;
  private aros: THREE.InstancedMesh | null = null;
  private readonly arosBase: THREE.Matrix4[] = [];
  private readonly m4 = new THREE.Matrix4();
  private readonly q = new THREE.Quaternion();
  private readonly v3 = new THREE.Vector3();

  constructor(private readonly track: ITrack) {
    this.object.name = 'circuitosImperiales';
    this.tema = TEMAS[track.def.id] ?? null;
    this.rnd = aleatorio(track.def.id.length * 7919 + 13);
    if (!this.tema) return;

    track.object.traverse((o) => {
      if (OCULTAR.has(o.name)) {
        o.visible = false;
        this.ocultos.push(o);
      }
    });

    const s = this.muestra(0);
    for (let i = 0; i < 480; i++) {
      this.muestra(i / 480, s);
      this.linea.push({ x: s.position.x, z: s.position.z });
      this.min.x = Math.min(this.min.x, s.position.x);
      this.min.y = Math.min(this.min.y, s.position.z);
      this.max.x = Math.max(this.max.x, s.position.x);
      this.max.y = Math.max(this.max.y, s.position.z);
      this.anchoMuro = Math.max(this.anchoMuro, s.wallHalfWidth);
    }

    if (this.tema === 'bambu') this.valleBambu();
    else if (this.tema === 'volcan') this.montanaFuego();
    else this.temploJade();
  }

  // ------------------------------------------------------------------ utilidades
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

  private t<T extends THREE.Texture>(x: T): T {
    this.texs.push(x);
    return x;
  }

  /** Distancia horizontal aproximada al eje de la pista. */
  private distPista(x: number, z: number): number {
    let d = Infinity;
    for (const p of this.linea) {
      const dx = p.x - x;
      const dz = p.z - z;
      const dd = dx * dx + dz * dz;
      if (dd < d) d = dd;
    }
    return Math.sqrt(d);
  }

  /** Punto junto a la pista (a `dMin`–`dMax` m del muro), o null si cae sobre otro tramo. */
  private junto(dMin: number, dMax: number, margen = 4): THREE.Vector3 | null {
    const s = this.muestra(this.rnd());
    const lado = this.rnd() < 0.5 ? -1 : 1;
    const d = s.wallHalfWidth + dMin + this.rnd() * (dMax - dMin);
    const x = s.position.x + s.binormal.x * d * lado;
    const z = s.position.z + s.binormal.z * d * lado;
    if (this.distPista(x, z) < this.anchoMuro + margen) return null;
    return new THREE.Vector3(x, this.track.heightAt(x, z), z);
  }

  /** Mayor hueco libre (lejos de la pista) dentro o cerca del circuito. */
  private hueco(): { centro: THREE.Vector3; radio: number } {
    let mejor = { x: (this.min.x + this.max.x) / 2, z: (this.min.y + this.max.y) / 2, d: 0 };
    for (let i = 0; i < 260; i++) {
      const x = this.min.x - 40 + this.rnd() * (this.max.x - this.min.x + 80);
      const z = this.min.y - 40 + this.rnd() * (this.max.y - this.min.y + 80);
      const d = this.distPista(x, z);
      if (d > mejor.d) mejor = { x, z, d };
    }
    const radio = Math.max(12, Math.min(55, mejor.d - this.anchoMuro - 8));
    return { centro: new THREE.Vector3(mejor.x, this.track.heightAt(mejor.x, mejor.z), mejor.z), radio };
  }

  private instancias(geo: THREE.BufferGeometry, mat: THREE.Material, mats: THREE.Matrix4[], sombra = false): THREE.InstancedMesh | null {
    if (!mats.length) return null;
    const im = new THREE.InstancedMesh(geo, mat, mats.length);
    mats.forEach((mt, i) => im.setMatrixAt(i, mt));
    im.instanceMatrix.needsUpdate = true;
    im.castShadow = sombra;
    im.frustumCulled = false;
    this.object.add(im);
    return im;
  }

  private compon(p: THREE.Vector3, rotY: number, esc: number | THREE.Vector3): THREE.Matrix4 {
    const e = typeof esc === 'number' ? new THREE.Vector3(esc, esc, esc) : esc;
    return new THREE.Matrix4().compose(p, new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotY, 0)), e);
  }

  private shader(frag: string, uniforms: Record<string, THREE.IUniform>, extra: Partial<THREE.ShaderMaterialParameters> = {}): THREE.ShaderMaterial {
    const mat = this.m(new THREE.ShaderMaterial({ vertexShader: VERT_UV, fragmentShader: frag, uniforms: { uTime: { value: 0 }, ...uniforms }, ...extra }));
    this.shaders.push(mat);
    return mat;
  }

  // ------------------------------------------------------------------ piezas comunes
  /** Geometrías de una pagoda (cuerpo + tejados) de `pisos` plantas, base en y = 0. */
  private geoPagoda(pisos: number): { cuerpo: THREE.BufferGeometry; tejado: THREE.BufferGeometry } {
    const cuerpos: THREE.BufferGeometry[] = [];
    const tejados: THREE.BufferGeometry[] = [];
    const base = new THREE.BoxGeometry(8, 1.2, 8);
    base.translate(0, 0.6, 0);
    cuerpos.push(base);
    for (let k = 0; k < pisos; k++) {
      const w = 6 - k * (4 / pisos);
      const c = new THREE.CylinderGeometry(w * 0.55, w * 0.6, 3.2, 8);
      c.translate(0, 1.2 + k * 4.2 + 1.6, 0);
      cuerpos.push(c);
      const t = new THREE.ConeGeometry(w * 0.95, 1.7, 8, 1, true);
      t.translate(0, 1.2 + k * 4.2 + 3.9, 0);
      tejados.push(t);
    }
    const pin = new THREE.ConeGeometry(0.35, 3, 6);
    pin.translate(0, 1.2 + pisos * 4.2 + 1.6, 0);
    tejados.push(pin);
    const cuerpo = this.g(mergeGeometries(cuerpos) as THREE.BufferGeometry);
    const tejado = this.g(mergeGeometries(tejados) as THREE.BufferGeometry);
    for (const x of [...cuerpos, ...tejados]) x.dispose();
    return { cuerpo, tejado };
  }

  private matVentanas(color: string, brillo: number): THREE.MeshStandardMaterial {
    const tx = this.t(
      lienzo(64, 64, (c) => {
        c.fillStyle = color;
        c.fillRect(0, 0, 64, 64);
        c.fillStyle = '#ffcf6a';
        for (let i = 0; i < 4; i++) c.fillRect(5 + i * 15, 20, 7, 24);
      }),
    );
    return this.m(new THREE.MeshStandardMaterial({ map: tx, emissiveMap: tx, emissive: 0xffb040, emissiveIntensity: brillo, roughness: 0.6 }));
  }

  /** Pagodas repartidas junto a la pista. */
  private pagodas(n: number, colorTejado: number, dMin = 10, dMax = 40): void {
    const { cuerpo, tejado } = this.geoPagoda(4);
    const mc = this.matVentanas('#8a1020', 0.5);
    const mt = this.m(new THREE.MeshStandardMaterial({ color: colorTejado, roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide }));
    const mats: THREE.Matrix4[] = [];
    for (let i = 0; i < n * 4 && mats.length < n; i++) {
      const p = this.junto(dMin, dMax, 8);
      if (p) mats.push(this.compon(p, this.rnd() * Math.PI, 0.8 + this.rnd() * 0.7));
    }
    this.instancias(cuerpo, mc, mats, true);
    this.instancias(tejado, mt, mats, true);
  }

  /** Puerta paifang que cruza la pista en t. */
  private paifang(t: number, mat: THREE.Material, matTejado: THREE.Material, texto?: string): void {
    const s = this.muestra(t);
    const grupo = new THREE.Group();
    grupo.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(s.binormal, new THREE.Vector3(0, 1, 0), s.tangent.clone().negate()));
    grupo.position.copy(s.position);
    const ancho = s.wallHalfWidth + 1.4;
    const H = 11;
    const col = this.g(new THREE.BoxGeometry(1.3, H, 1.3));
    for (const l of [-1, 1]) {
      const c = new THREE.Mesh(col, mat);
      c.position.set(l * ancho, H / 2, 0);
      c.castShadow = true;
      grupo.add(c);
      const pie = new THREE.Mesh(this.g(new THREE.BoxGeometry(2.4, 1.6, 2.4)), mat);
      pie.position.set(l * ancho, 0.8, 0);
      grupo.add(pie);
    }
    const viga = new THREE.Mesh(this.g(new THREE.BoxGeometry(ancho * 2 + 3, 1, 1.4)), mat);
    viga.position.y = H - 2.6;
    grupo.add(viga);
    const shape = new THREE.Shape();
    const w = ancho * 2 + 4;
    shape.moveTo(-w / 2 - 1.4, 0);
    shape.quadraticCurveTo(-w / 2, 0.15, -w / 2 + 1, 1.5);
    shape.lineTo(w / 2 - 1, 1.5);
    shape.quadraticCurveTo(w / 2, 0.15, w / 2 + 1.4, 0);
    shape.lineTo(-w / 2 - 1.4, 0);
    const tg = this.g(new THREE.ExtrudeGeometry(shape, { depth: 3, bevelEnabled: false }));
    tg.translate(0, 0, -1.5);
    const tej = new THREE.Mesh(tg, matTejado);
    tej.position.y = H - 1.4;
    grupo.add(tej);
    if (texto) {
      const tx = this.t(
        lienzo(256, 96, (c) => {
          c.fillStyle = '#123d36';
          c.fillRect(0, 0, 256, 96);
          c.strokeStyle = '#f2c14e';
          c.lineWidth = 6;
          c.strokeRect(4, 4, 248, 88);
          c.fillStyle = '#ffe9a8';
          c.font = '900 58px "PingFang SC","Noto Sans CJK SC","Microsoft YaHei",serif';
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.fillText(texto, 128, 52);
        }),
      );
      const placa = new THREE.Mesh(this.g(new THREE.PlaneGeometry(5, 1.9)), this.m(new THREE.MeshBasicMaterial({ map: tx, side: THREE.DoubleSide })));
      placa.position.set(0, H - 4.2, 0.75);
      grupo.add(placa);
    }
    this.object.add(grupo);
  }

  /** Lago con agua animada (y farolillos flotantes opcionales). */
  private lago(centro: THREE.Vector3, radio: number, hondo: number, claro: number, farolillos: number): void {
    const mat = this.shader(FRAG_AGUA, { uHondo: { value: new THREE.Color(hondo) }, uClaro: { value: new THREE.Color(claro) } }, { transparent: true, depthWrite: false });
    const agua = new THREE.Mesh(this.g(new THREE.CircleGeometry(radio, 48).rotateX(-Math.PI / 2)), mat);
    agua.position.set(centro.x, centro.y + 0.6, centro.z);
    agua.renderOrder = 1;
    this.object.add(agua);
    const orilla = new THREE.Mesh(this.g(new THREE.RingGeometry(radio, radio + 2.2, 48).rotateX(-Math.PI / 2)), this.m(new THREE.MeshStandardMaterial({ color: 0x6b6458, roughness: 0.9 })));
    orilla.position.set(centro.x, centro.y + 0.55, centro.z);
    this.object.add(orilla);
    if (farolillos > 0) {
      const mats: THREE.Matrix4[] = [];
      for (let i = 0; i < farolillos; i++) {
        const a = this.rnd() * Math.PI * 2;
        const r = Math.sqrt(this.rnd()) * radio * 0.85;
        mats.push(this.compon(new THREE.Vector3(centro.x + Math.cos(a) * r, centro.y + 0.9, centro.z + Math.sin(a) * r), 0, 0.6 + this.rnd() * 0.4));
      }
      this.instancias(
        this.g(new THREE.CylinderGeometry(0.45, 0.6, 0.7, 6)),
        this.m(new THREE.MeshStandardMaterial({ color: 0xff8a2a, emissive: 0xff6a10, emissiveIntensity: 1.6, roughness: 0.5 })),
        mats,
      );
    }
  }

  /** Farolillos de los deseos (kongming) que suben despacio por el cielo. */
  private farolillosCielo(n: number, techo = 90): void {
    const datos: Farolillo[] = [];
    const cx = (this.min.x + this.max.x) / 2;
    const cz = (this.min.y + this.max.y) / 2;
    const ext = Math.max(this.max.x - this.min.x, this.max.y - this.min.y) * 0.7 + 60;
    for (let i = 0; i < n; i++) {
      datos.push({ x: cx + (this.rnd() - 0.5) * ext * 2, y: 10 + this.rnd() * techo, z: cz + (this.rnd() - 0.5) * ext * 2, v: 1.2 + this.rnd() * 1.6, fase: this.rnd() * 6 });
    }
    const geo = this.g(new THREE.CylinderGeometry(0.7, 0.5, 1.4, 6));
    const mat = this.m(new THREE.MeshStandardMaterial({ color: 0xffb347, emissive: 0xff7a1a, emissiveIntensity: 1.8, roughness: 0.6 }));
    const mesh = new THREE.InstancedMesh(geo, mat, n);
    mesh.frustumCulled = false;
    this.object.add(mesh);
    this.farolillos = { mesh, datos, techo: techo + 20 };
  }

  /** Picos kársticos de «montaña de tinta» alrededor del circuito. */
  private picos(n: number, color: number, alturaMin: number, alturaMax: number): void {
    const geo = this.g(new THREE.CylinderGeometry(0.35, 1, 1, 10, 6));
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const k = 1 + Math.sin(y * 9 + pos.getX(i) * 3) * 0.12;
      pos.setXYZ(i, pos.getX(i) * k, y + 0.5, pos.getZ(i) * k);
    }
    geo.computeVertexNormals();
    const mat = this.m(new THREE.MeshStandardMaterial({ color, roughness: 0.95, flatShading: true }));
    const cx = (this.min.x + this.max.x) / 2;
    const cz = (this.min.y + this.max.y) / 2;
    const rad = Math.max(this.max.x - this.min.x, this.max.y - this.min.y) * 0.55 + 90;
    const mats: THREE.Matrix4[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + this.rnd() * 0.2;
      const r = rad + this.rnd() * 160;
      const h = alturaMin + this.rnd() * (alturaMax - alturaMin);
      const w = h * (0.22 + this.rnd() * 0.12);
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      mats.push(this.compon(new THREE.Vector3(x, this.nivelMar - 12, z), this.rnd() * 6, new THREE.Vector3(w, h, w)));
    }
    this.instancias(geo, mat, mats);
  }

  /** Aros dorados verticales sobre la pista (maqueta 11). */
  private arosDorados(ts: number[]): void {
    const geo = this.g(new THREE.TorusGeometry(1, 0.03, 8, 64));
    const mat = this.m(new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0xffa020, emissiveIntensity: 1.2, metalness: 0.9, roughness: 0.25 }));
    const s = this.muestra(0);
    for (const t of ts) {
      this.muestra(t, s);
      const r = s.halfWidth + 1.5;
      const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(s.binormal, new THREE.Vector3(0, 1, 0), s.tangent));
      this.arosBase.push(new THREE.Matrix4().compose(s.position.clone().add(new THREE.Vector3(0, r * 0.55, 0)), q, new THREE.Vector3(r, r, r)));
    }
    this.aros = this.instancias(geo, mat, this.arosBase);
  }

  /** Cascada con acantilado detrás, cayendo hacia `base`. */
  private cascada(base: THREE.Vector3, haciaX: number, haciaZ: number, alto: number, color: number): void {
    const ang = Math.atan2(haciaX, haciaZ);
    const roca = new THREE.Mesh(this.g(new THREE.CylinderGeometry(10, 16, alto + 6, 7)), this.m(new THREE.MeshStandardMaterial({ color: 0x5b6a5e, roughness: 0.95, flatShading: true })));
    roca.position.set(base.x - Math.sin(ang) * 9, base.y + (alto + 6) / 2 - 2, base.z - Math.cos(ang) * 9);
    this.object.add(roca);
    const mat = this.shader(FRAG_CASCADA, { uColor: { value: new THREE.Color(color) } }, { transparent: true, depthWrite: false, side: THREE.DoubleSide });
    const agua = new THREE.Mesh(this.g(new THREE.PlaneGeometry(7, alto)), mat);
    agua.position.set(base.x - Math.sin(ang) * 1.5, base.y + alto / 2, base.z - Math.cos(ang) * 1.5);
    agua.rotation.y = ang;
    this.object.add(agua);
    const bruma = new THREE.Sprite(
      this.m(
        new THREE.SpriteMaterial({
          map: this.t(
            lienzo(64, 64, (c) => {
              const gr = c.createRadialGradient(32, 32, 2, 32, 32, 30);
              gr.addColorStop(0, 'rgba(255,255,255,0.8)');
              gr.addColorStop(1, 'rgba(255,255,255,0)');
              c.fillStyle = gr;
              c.fillRect(0, 0, 64, 64);
            }),
          ),
          transparent: true,
          depthWrite: false,
          opacity: 0.7,
        }),
      ),
    );
    bruma.position.set(base.x, base.y + 2.5, base.z);
    bruma.scale.set(16, 8, 1);
    this.object.add(bruma);
  }

  // ------------------------------------------------------------------ carretera en el cielo (común)
  private nivelMar = -20;
  private pistaMinY = 0;

  /**
   * Convierte el circuito en una carretera suspendida: esconde el terreno y lo que había encima,
   * pone un viaducto con pilares y un mar (de nubes o de lava) muy por debajo.
   */
  private carreteraCielo(mar: 'nubes' | 'lava', colorNube: number, colorLuz: number): void {
    this.track.object.traverse((o) => {
      if (['terrain', 'mountains', 'decor', 'landmarks', 'grandstands'].includes(o.name)) {
        o.visible = false;
        this.ocultos.push(o);
      }
    });
    let minY = Infinity;
    const s = this.muestra(0);
    for (let i = 0; i < 400; i++) minY = Math.min(minY, this.muestra(i / 400, s).position.y);
    this.pistaMinY = minY;
    this.nivelMar = minY - 26;

    // Tablero del viaducto bajo la pista + pilares hasta el mar
    const L = this.track.length;
    const n = Math.round(L / 3);
    const pos: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i <= n; i++) {
      this.muestra(i / n, s);
      const w = s.wallHalfWidth + 2.2;
      const y = s.position.y;
      for (const [lado, dy] of [
        [-1, -0.05],
        [1, -0.05],
        [-1, -2.4],
        [1, -2.4],
      ] as const) {
        pos.push(s.position.x + s.binormal.x * w * lado * (dy < -1 ? 0.8 : 1), y + dy, s.position.z + s.binormal.z * w * lado * (dy < -1 ? 0.8 : 1));
      }
      if (i < n) {
        const a = i * 4;
        const b = a + 4;
        // cara inferior y laterales
        idx.push(a + 2, b + 2, a + 3, a + 3, b + 2, b + 3);
        idx.push(a, b, a + 2, a + 2, b, b + 2);
        idx.push(a + 1, a + 3, b + 1, b + 1, a + 3, b + 3);
      }
    }
    const tablero = this.g(new THREE.BufferGeometry());
    tablero.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    tablero.setIndex(idx);
    tablero.computeVertexNormals();
    const matPiedra = this.m(new THREE.MeshStandardMaterial({ color: mar === 'lava' ? 0x3a2620 : 0xd8d2c4, roughness: 0.8, side: THREE.DoubleSide }));
    const deck = new THREE.Mesh(tablero, matPiedra);
    deck.frustumCulled = false;
    this.object.add(deck);
    // Franja de luz bajo el borde del tablero (como los bordes luminosos de la maqueta)
    const franja = this.m(new THREE.MeshBasicMaterial({ color: colorLuz, toneMapped: false }));
    const luces: THREE.Matrix4[] = [];
    const pilares: THREE.Matrix4[] = [];
    for (let i = 0; i < n; i++) {
      this.muestra(i / n, s);
      const ry = Math.atan2(s.tangent.x, s.tangent.z);
      for (const lado of [-1, 1]) {
        const w = s.wallHalfWidth + 2.25;
        luces.push(this.compon(new THREE.Vector3(s.position.x + s.binormal.x * w * lado, s.position.y - 0.6, s.position.z + s.binormal.z * w * lado), ry, new THREE.Vector3(0.12, 0.16, 3.2)));
      }
      if (i % 9 === 0) {
        const alto = s.position.y - 2.4 - (this.nivelMar - 4);
        pilares.push(this.compon(new THREE.Vector3(s.position.x, s.position.y - 2.4 - alto / 2, s.position.z), ry, new THREE.Vector3(s.wallHalfWidth * 0.9, alto, 2.6)));
      }
    }
    const caja = this.g(new THREE.BoxGeometry(1, 1, 1));
    this.instancias(caja, franja, luces);
    this.instancias(caja, matPiedra, pilares, true);
    // Capiteles rojos con oro en lo alto de cada pilar
    this.instancias(
      caja,
      this.m(new THREE.MeshStandardMaterial({ color: 0xb30f22, roughness: 0.4, emissive: 0x3a0008 })),
      pilares.map((m) => {
        const p = new THREE.Vector3();
        const q = new THREE.Quaternion();
        const e = new THREE.Vector3();
        m.decompose(p, q, e);
        return new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y + e.y / 2 - 0.8, p.z), q, new THREE.Vector3(e.x * 1.15, 1.6, 3.4));
      }),
    );

    // Mar de nubes o de lava
    const cx = (this.min.x + this.max.x) / 2;
    const cz = (this.min.y + this.max.y) / 2;
    const mat =
      mar === 'lava'
        ? this.shader(FRAG_LAVA, {})
        : this.shader(FRAG_NUBES, { uColor: { value: new THREE.Color(colorNube) }, uLuz: { value: new THREE.Color(colorLuz) } }, { transparent: true, depthWrite: false });
    const marMesh = new THREE.Mesh(this.g(new THREE.PlaneGeometry(4000, 4000, 1, 1).rotateX(-Math.PI / 2)), mat);
    marMesh.position.set(cx, this.nivelMar, cz);
    marMesh.renderOrder = -1;
    this.object.add(marMesh);
    // Bancos de nubes sueltos que asoman entre los pilares
    const nube = this.t(
      lienzo(128, 128, (c) => {
        for (let i = 0; i < 9; i++) {
          const x = 24 + Math.random() * 80;
          const y = 50 + Math.random() * 34;
          const gr = c.createRadialGradient(x, y, 2, x, y, 36);
          gr.addColorStop(0, 'rgba(255,255,255,0.6)');
          gr.addColorStop(1, 'rgba(255,255,255,0)');
          c.fillStyle = gr;
          c.fillRect(0, 0, 128, 128);
        }
      }),
    );
    const matNube = this.m(new THREE.SpriteMaterial({ map: nube, color: mar === 'lava' ? 0x8a5040 : colorNube, transparent: true, depthWrite: false, opacity: 0.85 }));
    for (let i = 0; i < 46; i++) {
      const p = this.junto(4, 80, 6);
      if (!p) continue;
      const sp = new THREE.Sprite(matNube);
      sp.position.set(p.x, this.pistaMinY - 8 - this.rnd() * 14, p.z);
      const e = 30 + this.rnd() * 40;
      sp.scale.set(e, e * 0.4, 1);
      this.object.add(sp);
    }
  }

  /** Islas flotantes de roca (cono invertido) con la cima plana. Devuelve las cimas. */
  private islas(n: number, colorCima: number, colorRoca: number, dMin: number, dMax: number): { p: THREE.Vector3; r: number }[] {
    const roca = this.g(new THREE.ConeGeometry(1, 1.6, 9, 4));
    roca.rotateX(Math.PI);
    roca.translate(0, -0.8, 0);
    const rp = roca.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < rp.count; i++) {
      const k = 1 + (Math.sin(rp.getX(i) * 7 + rp.getY(i) * 5) + Math.cos(rp.getZ(i) * 6)) * 0.08;
      rp.setXYZ(i, rp.getX(i) * k, rp.getY(i), rp.getZ(i) * k);
    }
    roca.computeVertexNormals();
    const cima = this.g(new THREE.CylinderGeometry(1, 1, 0.25, 12).translate(0, 0.12, 0));
    const out: { p: THREE.Vector3; r: number }[] = [];
    const mats: THREE.Matrix4[] = [];
    for (let i = 0; i < n * 6 && out.length < n; i++) {
      const p = this.junto(dMin, dMax, 14);
      if (!p) continue;
      const r = 7 + this.rnd() * 9;
      if (out.some((o) => o.p.distanceTo(p) < o.r + r + 4)) continue;
      p.y = this.pistaMinY + (this.rnd() - 0.4) * 16;
      out.push({ p, r });
      mats.push(this.compon(p, this.rnd() * 6, new THREE.Vector3(r, r * 1.6, r)));
    }
    this.instancias(roca, this.m(new THREE.MeshStandardMaterial({ color: colorRoca, roughness: 0.95, flatShading: true })), mats, true);
    this.instancias(cima, this.m(new THREE.MeshStandardMaterial({ color: colorCima, roughness: 0.9 })), mats);
    return out;
  }

  /** Pagodas sobre algunas islas. */
  private pagodasEnIslas(islas: { p: THREE.Vector3; r: number }[], colorTejado: number, colorMuro: string, pisos = 5): void {
    const { cuerpo, tejado } = this.geoPagoda(pisos);
    const mats = islas.map((o) => this.compon(o.p.clone().add(new THREE.Vector3(0, 0.25, 0)), this.rnd() * 6, o.r / 8));
    this.instancias(cuerpo, this.matVentanas(colorMuro, 0.8), mats, true);
    this.instancias(tejado, this.m(new THREE.MeshStandardMaterial({ color: colorTejado, roughness: 0.35, metalness: 0.35, side: THREE.DoubleSide })), mats, true);
  }

  /** Cascadas que caen desde el borde de las islas hasta el mar de nubes. */
  private cascadasEnIslas(islas: { p: THREE.Vector3; r: number }[], color: number): void {
    const mat = this.shader(FRAG_CASCADA, { uColor: { value: new THREE.Color(color) } }, { transparent: true, depthWrite: false, side: THREE.DoubleSide });
    for (const o of islas) {
      const a = this.rnd() * Math.PI * 2;
      const alto = o.p.y - this.nivelMar;
      const agua = new THREE.Mesh(this.g(new THREE.PlaneGeometry(o.r * 0.5, alto)), mat);
      agua.position.set(o.p.x + Math.cos(a) * o.r * 0.98, o.p.y - alto / 2, o.p.z + Math.sin(a) * o.r * 0.98);
      agua.rotation.y = -a + Math.PI / 2;
      this.object.add(agua);
    }
  }

  // ------------------------------------------------------------------ Valle de Bambú
  private valleBambu(): void {
    this.carreteraCielo('nubes', 0xfff0dc, 0xffc66a);
    // Bambú gigante que sube desde la niebla a ambos lados del viaducto.
    const tallos: THREE.BufferGeometry[] = [];
    for (let k = 0; k < 5; k++) {
      const seg = new THREE.CylinderGeometry(0.16, 0.18, 2.6, 6);
      seg.translate(0, 1.3 + k * 2.7, 0);
      tallos.push(seg);
      const nudo = new THREE.CylinderGeometry(0.21, 0.21, 0.12, 6);
      nudo.translate(0, k * 2.7 + 2.65, 0);
      tallos.push(nudo);
    }
    const tallo = this.g(mergeGeometries(tallos) as THREE.BufferGeometry);
    for (const x of tallos) x.dispose();
    const hojas: THREE.BufferGeometry[] = [];
    for (let k = 0; k < 9; k++) {
      const h = new THREE.PlaneGeometry(0.9, 3.4);
      h.translate(0, 1.5, 0);
      h.rotateZ(0.8 + (k % 3) * 0.3);
      h.rotateY((k / 9) * Math.PI * 2);
      h.translate(0, 9.5 + (k % 3) * 1.6, 0);
      hojas.push(h);
    }
    const copa = this.g(mergeGeometries(hojas) as THREE.BufferGeometry);
    for (const x of hojas) x.dispose();
    const matTallo = this.m(new THREE.MeshStandardMaterial({ color: 0x8fcf55, roughness: 0.45, emissive: 0x1a3a08, emissiveIntensity: 0.25 }));
    const matHoja = this.m(new THREE.MeshStandardMaterial({ color: 0x6fbf4a, roughness: 0.6, side: THREE.DoubleSide }));
    // Arboledas sueltas: el tallo se estira desde la niebla y la copa va arriba a escala normal,
    // dejando huecos para ver el vacío y el mar de nubes.
    const matsTallo: THREE.Matrix4[] = [];
    const matsCopa: THREE.Matrix4[] = [];
    let arboledas = 0;
    for (let i = 0; i < 500 && arboledas < 46; i++) {
      const p = this.junto(5, 38, 4);
      if (!p) continue;
      arboledas++;
      const nCan = 4 + Math.floor(this.rnd() * 5);
      for (let k = 0; k < nCan; k++) {
        const base = new THREE.Vector3(p.x + (this.rnd() - 0.5) * 5, this.nivelMar - 2, p.z + (this.rnd() - 0.5) * 5);
        const alto = this.pistaMinY - this.nivelMar + 8 + this.rnd() * 18;
        const ey = alto / 13.5;
        const inc = new THREE.Euler((this.rnd() - 0.5) * 0.08, this.rnd() * 6, (this.rnd() - 0.5) * 0.08);
        matsTallo.push(new THREE.Matrix4().compose(base, new THREE.Quaternion().setFromEuler(inc), new THREE.Vector3(1.3, ey, 1.3)));
        const cima = base.clone().add(new THREE.Vector3(0, alto - 10.5, 0));
        matsCopa.push(new THREE.Matrix4().compose(cima, new THREE.Quaternion().setFromEuler(inc), new THREE.Vector3(1.5, 1.2, 1.5)));
      }
    }
    this.instancias(tallo, matTallo, matsTallo);
    this.instancias(copa, matHoja, matsCopa);

    this.picos(40, 0x5f7f6a, 90, 230);
    const islas = this.islas(14, 0x5a9a3f, 0x6a6052, 22, 95);
    this.pagodasEnIslas(islas.filter((_, i) => i % 2 === 0), 0x1f6b5a, '#8a1020');
    this.cascadasEnIslas(islas.filter((_, i) => i % 2 === 1), 0xbfefff);
    this.arosDorados([0.14, 0.3, 0.46, 0.63, 0.82]);
    const roja = this.m(new THREE.MeshStandardMaterial({ color: 0xb30f22, roughness: 0.45, emissive: 0x2a0006 }));
    const tejadoJade = this.m(new THREE.MeshStandardMaterial({ color: 0x1f6b5a, roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide }));
    this.paifang(0.38, roja, tejadoJade, '竹林峡谷');
    this.paifang(0.72, roja, tejadoJade, '一路顺风');
    this.farolillosCielo(80, 70);
  }

  // ------------------------------------------------------------------ Montaña de Fuego
  private montanaFuego(): void {
    this.carreteraCielo('lava', 0x5a2014, 0xff7a1a);
    const cx = (this.min.x + this.max.x) / 2;
    const cz = (this.min.y + this.max.y) / 2;
    const rad = Math.max(this.max.x - this.min.x, this.max.y - this.min.y) * 0.55 + 120;
    const texVetas = this.t(
      lienzo(
        256,
        256,
        (c) => {
          c.fillStyle = '#1a0d0a';
          c.fillRect(0, 0, 256, 256);
          for (let i = 0; i < 30; i++) {
            let x = Math.random() * 256;
            c.strokeStyle = `rgba(255,${80 + Math.random() * 110},20,${0.5 + Math.random() * 0.5})`;
            c.lineWidth = 1 + Math.random() * 3;
            c.beginPath();
            c.moveTo(x, 0);
            for (let y = 0; y < 256; y += 16) {
              x += (Math.random() - 0.5) * 14;
              c.lineTo(x, y);
            }
            c.stroke();
          }
        },
        true,
      ),
    );
    const volGeo = this.g(new THREE.CylinderGeometry(16, 100, 200, 26, 12, true));
    const vp = volGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < vp.count; i++) {
      const k = 1 + Math.sin(vp.getY(i) * 0.07 + Math.atan2(vp.getZ(i), vp.getX(i)) * 5) * 0.09;
      vp.setXYZ(i, vp.getX(i) * k, vp.getY(i) + 100, vp.getZ(i) * k);
    }
    volGeo.computeVertexNormals();
    const volMat = this.m(new THREE.MeshStandardMaterial({ color: 0x2a1812, map: texVetas, emissiveMap: texVetas, emissive: 0xff5a10, emissiveIntensity: 1.6, roughness: 0.9 }));
    const halo = this.t(
      lienzo(64, 64, (c) => {
        const gr = c.createRadialGradient(32, 32, 1, 32, 32, 31);
        gr.addColorStop(0, 'rgba(255,120,30,0.55)');
        gr.addColorStop(0.5, 'rgba(255,70,10,0.25)');
        gr.addColorStop(1, 'rgba(255,40,0,0)');
        c.fillStyle = gr;
        c.fillRect(0, 0, 64, 64);
      }),
    );
    const matHalo = this.m(new THREE.SpriteMaterial({ map: halo, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    for (const [a, esc] of [
      [0.4, 1.1],
      [2.4, 0.8],
      [4.3, 0.65],
    ] as const) {
      const x = cx + Math.cos(a) * rad;
      const z = cz + Math.sin(a) * rad;
      const v = new THREE.Mesh(volGeo, volMat);
      v.position.set(x, this.nivelMar - 5, z);
      v.scale.setScalar(esc);
      this.object.add(v);
      const crater = new THREE.Mesh(this.g(new THREE.CircleGeometry(16, 24).rotateX(-Math.PI / 2)), this.shader(FRAG_LAVA, {}));
      crater.position.set(x, v.position.y + 199 * esc, z);
      crater.scale.setScalar(esc);
      this.object.add(crater);
      const h = new THREE.Sprite(matHalo);
      h.position.set(x, crater.position.y + 14 * esc, z);
      h.scale.set(110 * esc, 80 * esc, 1);
      this.object.add(h);
    }
    this.picos(24, 0x2a1a14, 60, 140);
    const islas = this.islas(12, 0x3a2218, 0x2a1a14, 22, 90);
    this.pagodasEnIslas(islas.filter((_, i) => i % 2 === 0), 0x2a1a14, '#5a1010', 4);
    // Lava que cae de algunas islas al mar de lava
    const lavaCae = this.shader(FRAG_CASCADA, { uColor: { value: new THREE.Color(0xff6a10) } }, { transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false } as Partial<THREE.ShaderMaterialParameters>);
    for (const o of islas.filter((_, i) => i % 2 === 1)) {
      const a = this.rnd() * Math.PI * 2;
      const alto = o.p.y - this.nivelMar;
      const m = new THREE.Mesh(this.g(new THREE.PlaneGeometry(o.r * 0.45, alto)), lavaCae);
      m.position.set(o.p.x + Math.cos(a) * o.r, o.p.y - alto / 2, o.p.z + Math.sin(a) * o.r);
      m.rotation.y = -a + Math.PI / 2;
      this.object.add(m);
    }

    // Vía de vagonetas sobre caballetes, paralela a un tramo
    const pts: THREE.Vector3[] = [];
    const s = this.muestra(0);
    for (let i = 0; i <= 40; i++) {
      const t = 0.52 + (0.22 * i) / 40;
      this.muestra(t, s);
      const d = s.wallHalfWidth + 8;
      pts.push(new THREE.Vector3(s.position.x - s.binormal.x * d, s.position.y + 2.5 + Math.sin(i * 0.35) * 2, s.position.z - s.binormal.z * d));
    }
    const curva = new THREE.CatmullRomCurve3(pts);
    const metal = this.m(new THREE.MeshStandardMaterial({ color: 0x8a6a4a, metalness: 0.8, roughness: 0.4 }));
    const madera = this.m(new THREE.MeshStandardMaterial({ color: 0x5a3418, roughness: 0.8 }));
    const rieles: THREE.BufferGeometry[] = [];
    for (const l of [-0.6, 0.6]) {
      const desplazados = pts.map((p, i) => {
        const tg = curva.getTangentAt(i / (pts.length - 1));
        return p.clone().add(new THREE.Vector3(-tg.z, 0, tg.x).normalize().multiplyScalar(l));
      });
      rieles.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(desplazados), 200, 0.08, 4));
    }
    const rielGeo = this.g(mergeGeometries(rieles) as THREE.BufferGeometry);
    for (const x of rieles) x.dispose();
    const riel = new THREE.Mesh(rielGeo, metal);
    riel.frustumCulled = false;
    this.object.add(riel);
    const traviesas: THREE.Matrix4[] = [];
    const caballetes: THREE.Matrix4[] = [];
    const L = curva.getLength();
    for (let d = 0; d < L; d += 1.6) {
      const u = d / L;
      const p = curva.getPointAt(u);
      const tg = curva.getTangentAt(u);
      const ry = Math.atan2(tg.x, tg.z);
      traviesas.push(this.compon(p.clone().add(new THREE.Vector3(0, -0.1, 0)), ry, new THREE.Vector3(1.8, 0.14, 0.35)));
      if (Math.round(d / 1.6) % 8 === 0) {
        const h = p.y - this.nivelMar;
        caballetes.push(this.compon(new THREE.Vector3(p.x, p.y - h / 2, p.z), ry, new THREE.Vector3(0.6, h, 0.6)));
      }
    }
    const caja = this.g(new THREE.BoxGeometry(1, 1, 1));
    this.instancias(caja, madera, traviesas);
    this.instancias(caja, madera, caballetes);
    const partes = [new THREE.BoxGeometry(1.6, 0.9, 2.2).translate(0, 0.55, 0), new THREE.BoxGeometry(1.2, 0.5, 1.7).translate(0, 1.15, 0)];
    const carroGeo = this.g(mergeGeometries(partes) as THREE.BufferGeometry);
    for (const x of partes) x.dispose();
    const carros = new THREE.InstancedMesh(
      carroGeo,
      this.m(new THREE.MeshStandardMaterial({ color: 0x7a3a12, emissive: 0xff7a10, emissiveIntensity: 0.8, metalness: 0.5, roughness: 0.5 })),
      3,
    );
    carros.frustumCulled = false;
    this.object.add(carros);
    this.vagonetas = { mesh: carros, curva, fases: [0, 0.33, 0.66] };

    // Brasas que suben del mar de lava
    const N = 600;
    const geo = this.g(new THREE.BufferGeometry());
    const arr = new Float32Array(N * 3);
    this.brasasBase = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const p = this.junto(0, 90, 0) ?? new THREE.Vector3(cx, 0, cz);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = this.nivelMar + this.rnd() * 50;
      arr[i * 3 + 2] = p.z;
      this.brasasBase[i] = this.nivelMar;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    this.brasas = new THREE.Points(
      geo,
      this.m(new THREE.PointsMaterial({ color: 0xff9a3a, size: 0.7, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })),
    );
    this.brasas.frustumCulled = false;
    this.object.add(this.brasas);

    const roca = this.m(new THREE.MeshStandardMaterial({ color: 0x3a2218, roughness: 0.8 }));
    const tejadoRojo = this.m(new THREE.MeshStandardMaterial({ color: 0xb30f22, roughness: 0.4, emissive: 0x3a0008, side: THREE.DoubleSide }));
    this.paifang(0.3, roca, tejadoRojo, '火焰山');
    this.arosDorados([0.12, 0.45, 0.8]);
    this.farolillosCielo(70, 70);
  }

  // ------------------------------------------------------------------ Templo de Jade
  private temploJade(): void {
    this.carreteraCielo('nubes', 0xe6fff8, 0x5fffd8);
    const jade = this.m(new THREE.MeshStandardMaterial({ color: 0x2f9a80, roughness: 0.25, metalness: 0.25, emissive: 0x0a3a30, emissiveIntensity: 0.6 }));
    const oro = this.m(new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.85, roughness: 0.25, emissive: 0x3a2400, emissiveIntensity: 0.4 }));
    const piedra = this.m(new THREE.MeshStandardMaterial({ color: 0xe6ece8, roughness: 0.8 }));
    const laca = this.m(new THREE.MeshStandardMaterial({ color: 0xb30f22, roughness: 0.45 }));
    const islas = this.islas(16, 0xf2f6f4, 0x8a9a94, 22, 100);
    // Salas de jade sobre la mitad de las islas
    const salaPartes = [new THREE.BoxGeometry(22, 2, 14).translate(0, 1, 0), new THREE.BoxGeometry(18, 7, 10).translate(0, 5.5, 0)];
    const salaGeo = this.g(mergeGeometries(salaPartes) as THREE.BufferGeometry);
    for (const x of salaPartes) x.dispose();
    const shape = new THREE.Shape();
    shape.moveTo(-14, 0);
    shape.quadraticCurveTo(-11, 0.3, -8, 5);
    shape.lineTo(8, 5);
    shape.quadraticCurveTo(11, 0.3, 14, 0);
    shape.lineTo(-14, 0);
    const tejGeo = this.g(new THREE.ExtrudeGeometry(shape, { depth: 16, bevelEnabled: false }).translate(0, 9, -8));
    const cumbrera = this.g(new THREE.BoxGeometry(17, 0.5, 0.6).translate(0, 14.2, 0));
    const colGeo = this.g(new THREE.CylinderGeometry(0.45, 0.45, 7, 8));
    const salas: THREE.Matrix4[] = [];
    const columnas: THREE.Matrix4[] = [];
    for (const [i, o] of islas.entries()) {
      if (i % 2 !== 0) continue;
      const ry = this.rnd() * Math.PI;
      const esc = o.r / 13;
      const p = o.p.clone().add(new THREE.Vector3(0, 0.25, 0));
      salas.push(this.compon(p, ry, esc));
      for (let k = -3; k <= 3; k += 2) {
        for (const zz of [-5.6, 5.6]) {
          const local = new THREE.Vector3(k * 2.6, 5.5, zz).multiplyScalar(esc).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
          columnas.push(this.compon(p.clone().add(local), 0, esc));
        }
      }
    }
    this.instancias(salaGeo, piedra, salas, true);
    this.instancias(tejGeo, jade, salas, true);
    this.instancias(cumbrera, oro, salas);
    this.instancias(colGeo, laca, columnas);
    this.pagodasEnIslas(islas.filter((_, i) => i % 4 === 1), 0x2f9a80, '#1f6b5a', 6);
    this.cascadasEnIslas(islas.filter((_, i) => i % 4 === 3), 0xd8fff6);
    // Guardianes de jade a lo largo del viaducto
    const cuerpoG = [
      new THREE.CylinderGeometry(0.9, 1.3, 3.4, 8).translate(0, 2.9, 0),
      new THREE.SphereGeometry(0.75, 10, 8).translate(0, 5.1, 0),
      new THREE.BoxGeometry(2.6, 1.2, 2.6).translate(0, 0.6, 0),
      new THREE.ConeGeometry(0.9, 1.1, 8).translate(0, 6.1, 0),
    ];
    const guardGeo = this.g(mergeGeometries(cuerpoG) as THREE.BufferGeometry);
    for (const x of cuerpoG) x.dispose();
    const guardas: THREE.Matrix4[] = [];
    const s = this.muestra(0);
    for (let i = 0; i < 30; i++) {
      const t = (i + 0.5) / 30;
      if (this.track.def.voidRanges?.some(([a, b]) => t >= a && t <= b)) continue;
      this.muestra(t, s);
      const lado = i % 2 === 0 ? -1 : 1;
      const d = s.wallHalfWidth + 0.2;
      guardas.push(this.compon(new THREE.Vector3(s.position.x + s.binormal.x * d * lado, s.position.y, s.position.z + s.binormal.z * d * lado), Math.atan2(-s.binormal.x * lado, -s.binormal.z * lado), 0.75));
    }
    this.instancias(guardGeo, jade, guardas, true);
    this.picos(34, 0xaac4bc, 80, 220);
    this.paifang(0.2, piedra, jade, '玉虚宫');
    this.paifang(0.62, piedra, jade, '天门');
    this.arosDorados([0.4, 0.85]);
    this.farolillosCielo(50, 60);
  }

  // ------------------------------------------------------------------ bucle
  update(dt: number): void {
    if (!this.tema) return;
    this.tiempo += dt;
    for (const s of this.shaders) s.uniforms.uTime.value = this.tiempo;
    const f = this.farolillos;
    if (f) {
      for (let i = 0; i < f.datos.length; i++) {
        const d = f.datos[i];
        d.y += d.v * dt;
        if (d.y > f.techo) d.y = 8;
        this.v3.set(d.x + Math.sin(this.tiempo * 0.4 + d.fase) * 2, d.y, d.z + Math.cos(this.tiempo * 0.3 + d.fase) * 2);
        this.m4.compose(this.v3, this.q.identity(), new THREE.Vector3(1, 1, 1));
        f.mesh.setMatrixAt(i, this.m4);
      }
      f.mesh.instanceMatrix.needsUpdate = true;
    }
    const v = this.vagonetas;
    if (v) {
      for (let i = 0; i < v.fases.length; i++) {
        const u = (Math.sin(this.tiempo * 0.12 + v.fases[i] * Math.PI * 2) + 1) / 2;
        const p = v.curva.getPointAt(u);
        const tg = v.curva.getTangentAt(u);
        this.q.setFromEuler(new THREE.Euler(0, Math.atan2(tg.x, tg.z), 0));
        this.m4.compose(p, this.q, new THREE.Vector3(1, 1, 1));
        v.mesh.setMatrixAt(i, this.m4);
      }
      v.mesh.instanceMatrix.needsUpdate = true;
    }
    if (this.brasas) {
      const pos = this.brasas.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const base = this.brasasBase ? this.brasasBase[i] : 0;
        let y = pos.getY(i) + dt * (1.5 + (i % 5) * 0.4);
        if (y > base + 35) y = base - 2;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
    if (this.aros) {
      const pulso = 1 + Math.sin(this.tiempo * 3) * 0.04;
      for (let i = 0; i < this.arosBase.length; i++) {
        this.m4.copy(this.arosBase[i]).multiply(new THREE.Matrix4().makeScale(pulso, pulso, pulso));
        this.aros.setMatrixAt(i, this.m4);
      }
      this.aros.instanceMatrix.needsUpdate = true;
    }
  }

  dispose(): void {
    this.object.removeFromParent();
    for (const o of this.ocultos) o.visible = true;
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    for (const t of this.texs) t.dispose();
  }
}
