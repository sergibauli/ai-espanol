/**
 * Vehículos-criatura de Wukong Turbo Rush. Cada piloto monta una criatura de la mitología
 * tradicional china (dominio público) convertida en bólido: fénix, carpa-dragón, qilin, dragón,
 * tigre blanco, tortuga-serpiente (玄武), león guardián y pixiu. Todo es procedural (sin assets),
 * mira hacia -Z y las ruedas apoyan en y = 0. El tamaño de colisión no depende de esto: aquí solo
 * hay estética.
 *
 * Rendimiento: las piezas estáticas se fusionan por material (~30 llamadas de dibujo por vehículo),
 * los materiales neutros (oro, marfil, nubes...) se comparten entre vehículos y solo el cuerpo
 * principal proyecta sombra. Colas, bigotes y serpientes ondulan deformando unos cientos de vértices
 * en CPU; alas y aletas son grupos que giran; la estela de nubes al derrapar es un InstancedMesh.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { CharacterDef } from '../core/types';
import { CHARACTERS } from './roster';

export interface KartModelParts {
  root: THREE.Group;
  body: THREE.Mesh;
  /** The four spinning wheel groups (rotate about local X). Order: FL, FR, RL, RR. */
  wheels: THREE.Object3D[];
  /** Steering pivots for the two front wheels (rotate about local Y). */
  frontWheels: THREE.Object3D[];
  /** Rotate about local Z to turn the steering wheel (aquí, el manillar de las riendas). */
  steeringWheel: THREE.Object3D;
  driver: THREE.Group;
  driverHead: THREE.Object3D;
  /** Exhaust groups at the rear (local +Z is the pipe direction). */
  exhausts: THREE.Object3D[];
  bodyMaterial: THREE.MeshPhysicalMaterial;
  accentMaterial: THREE.MeshStandardMaterial;
}

/** Extra handles the Kart uses for animation; a structural subtype of KartModelParts. */
export interface KartModelPartsEx extends KartModelParts {
  /** Emissive material on the exhaust tips (flickers while boosting). */
  exhaustGlowMaterial: THREE.MeshStandardMaterial;
  /** Wheel radii matching `wheels` order (for spin speed). */
  wheelRadii: number[];
  /** Disposes every geometry, material and texture owned by this model. */
  dispose(): void;
  /** Llamas de los escapes (se avivan con el turbo). */
  flames: THREE.Object3D[];
  flameMaterial: THREE.MeshBasicMaterial;
  /** Ojos y perla de la criatura (laten). */
  orbMaterial: THREE.MeshStandardMaterial;
  /**
   * Animación de la criatura: respiración, cola/bigotes, alas, aliento con el turbo y estela de
   * nubes al derrapar. `steer` -1..1 (positivo = derecha), `speed01` 0..1, `boost` 0..1,
   * `drift` -1/0/1.
   */
  animate(dt: number, time: number, steer: number, speed01: number, boost: number, drift: number): void;
}

// --- dimensiones (iguales que el kart original: no tocan la física) -------------
const WHEEL_R_F = 0.2;
const WHEEL_R_R = 0.22;
const WHEEL_W_F = 0.18;
const WHEEL_W_R = 0.22;
const WHEEL_X = 0.52;
const WHEEL_Z_F = -0.52;
const WHEEL_Z_R = 0.5;

type V3 = [number, number, number];

const _m = new THREE.Matrix4();
const _m2 = new THREE.Matrix4();
const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _x = new THREE.Vector3();
const _y = new THREE.Vector3();
const _z = new THREE.Vector3();

/** Collects transformed geometry copies and merges them into one indexed geometry. */
class Batch {
  private parts: THREE.BufferGeometry[] = [];

  get empty(): boolean {
    return this.parts.length === 0;
  }

  addM(geo: THREE.BufferGeometry, m: THREE.Matrix4): this {
    let g = geo.clone();
    if (!g.index) {
      const indexed = mergeVertices(g);
      g.dispose();
      g = indexed;
    }
    g.applyMatrix4(m);
    this.parts.push(g);
    return this;
  }

  add(geo: THREE.BufferGeometry, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1): this {
    _m.compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));
    return this.addM(geo, _m);
  }

  build(): THREE.BufferGeometry {
    const merged = mergeGeometries(this.parts, false);
    for (const p of this.parts) p.dispose();
    this.parts.length = 0;
    return merged;
  }
}

function makeMesh(geo: THREE.BufferGeometry, mat: THREE.Material, name: string, shadow = false): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = shadow;
  m.receiveShadow = false;
  m.name = name;
  return m;
}

/** Cylinder oriented from a to b (used for arms, legs). */
function limbGeometry(ax: number, ay: number, az: number, bx: number, by: number, bz: number, radius: number, radial = 8) {
  const dir = new THREE.Vector3(bx - ax, by - ay, bz - az);
  const len = dir.length();
  const g = new THREE.CapsuleGeometry(radius, Math.max(0.001, len), 2, radial);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  g.applyQuaternion(q);
  g.translate((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
  return g;
}

function addVertexColor(geo: THREE.BufferGeometry, hex: number): THREE.BufferGeometry {
  const c = new THREE.Color(hex);
  const count = geo.attributes.position.count;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

/**
 * Tubo orgánico a lo largo de una curva (cuerpos, cuellos, colas, bigotes). `radio(t)` devuelve
 * [ancho, alto] de la sección elíptica en t∈[0,1]. Extremos cerrados.
 */
function sweep(pts: V3[], radio: (t: number) => [number, number], seg = 16, radial = 10): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const P = new THREE.Vector3();
  const T = new THREE.Vector3();
  const S = new THREE.Vector3();
  const U = new THREE.Vector3();
  const ref = new THREE.Vector3();
  const n = new THREE.Vector3();
  const ring = radial + 1;
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    curve.getPointAt(t, P);
    curve.getTangentAt(t, T);
    if (Math.abs(T.y) > 0.92) ref.set(0, 0, 1);
    else ref.set(0, 1, 0);
    S.crossVectors(T, ref).normalize();
    U.crossVectors(S, T).normalize();
    const [rx, ry] = radio(t);
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const c = Math.cos(a);
      const s = Math.sin(a);
      pos.push(P.x + S.x * c * rx + U.x * s * ry, P.y + S.y * c * rx + U.y * s * ry, P.z + S.z * c * rx + U.z * s * ry);
      n.set(0, 0, 0)
        .addScaledVector(S, c / Math.max(rx, 1e-3))
        .addScaledVector(U, s / Math.max(ry, 1e-3))
        .normalize();
      nor.push(n.x, n.y, n.z);
      uv.push(t, j / radial);
    }
  }
  for (let i = 0; i < seg; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * ring + j;
      const b = (i + 1) * ring + j;
      idx.push(a, b, b + 1, a, b + 1, a + 1);
    }
  }
  // tapas
  for (const fin of [0, 1]) {
    const t = fin;
    curve.getPointAt(t, P);
    curve.getTangentAt(t, T);
    const c0 = pos.length / 3;
    pos.push(P.x, P.y, P.z);
    const sg = fin ? 1 : -1;
    nor.push(T.x * sg, T.y * sg, T.z * sg);
    uv.push(t, 0.5);
    const base = fin ? seg * ring : 0;
    for (let j = 0; j < radial; j++) {
      if (fin) idx.push(c0, base + j + 1, base + j);
      else idx.push(c0, base + j, base + j + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

// --- geometrías unitarias compartidas (no se liberan) ----------------------------
let _unid: { cono: THREE.BufferGeometry; esf: THREE.BufferGeometry; cil: THREE.BufferGeometry; bola: THREE.BufferGeometry } | null = null;
function unidades() {
  if (!_unid) {
    const cono = new THREE.ConeGeometry(1, 1, 7);
    cono.translate(0, 0.5, 0);
    const esf = new THREE.SphereGeometry(1, 10, 7);
    esf.scale(1, 0.5, 1);
    esf.translate(0, 0.5, 0);
    const cil = new THREE.CylinderGeometry(1, 1, 1, 7);
    cil.translate(0, 0.5, 0);
    const bola = new THREE.SphereGeometry(1, 14, 10);
    _unid = { cono, esf, cil, bola };
  }
  return _unid;
}

/** Matriz que lleva una pieza unitaria (y∈[0,1]) de `a` a `b`, con anchura sx y grosor sz. */
function matrizPieza(a: V3, b: V3, sx: number, sz: number, hint: V3): THREE.Matrix4 {
  _y.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  const len = Math.max(1e-4, _y.length());
  _y.multiplyScalar(1 / len);
  _z.set(hint[0], hint[1], hint[2]);
  _z.addScaledVector(_y, -_z.dot(_y));
  if (_z.lengthSq() < 1e-6) {
    _z.set(Math.abs(_y.z) > 0.9 ? 1 : 0, 0, Math.abs(_y.z) > 0.9 ? 0 : 1);
    _z.addScaledVector(_y, -_z.dot(_y));
  }
  _z.normalize();
  _x.crossVectors(_y, _z);
  _m2.makeBasis(_x.multiplyScalar(sx), _y.multiplyScalar(len), _z.multiplyScalar(sz));
  _m2.setPosition(a[0], a[1], a[2]);
  return _m2;
}

// --- materiales y texturas compartidos -------------------------------------------
const compartidos = new Map<string, THREE.Material>();
function compartido<T extends THREE.Material>(key: string, crear: () => T): T {
  const hecho = compartidos.get(key) as T | undefined;
  if (hecho) return hecho;
  const m = crear();
  compartidos.set(key, m);
  return m;
}

type Textura = 'escamas' | 'rayas' | 'plumas' | 'hex' | 'piedra';
const texturas = new Map<Textura, THREE.Texture>();
function textura(nombre: Textura): THREE.Texture {
  let t = texturas.get(nombre);
  if (t) return t;
  const cv = document.createElement('canvas');
  cv.width = 128;
  cv.height = 128;
  const c = cv.getContext('2d');
  if (c) {
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, 128, 128);
    if (nombre === 'escamas') {
      for (let fila = 0; fila < 10; fila++) {
        for (let col = -1; col < 10; col++) {
          const x = col * 16 + (fila % 2) * 8;
          const y = fila * 13 + 6;
          const g = c.createRadialGradient(x, y - 3, 1, x, y, 9);
          g.addColorStop(0, '#ffffff');
          g.addColorStop(1, '#a89e94');
          c.fillStyle = g;
          c.beginPath();
          c.arc(x, y, 8, 0, Math.PI);
          c.fill();
          c.strokeStyle = '#f2c14e';
          c.lineWidth = 1.6;
          c.beginPath();
          c.arc(x, y, 8, 0.1, Math.PI - 0.1);
          c.stroke();
        }
      }
    } else if (nombre === 'rayas') {
      // Rayas de tigre: cuñas oscuras que bajan desde el lomo (v≈0.25) y no llegan a la tripa.
      c.fillStyle = '#1a1420';
      for (let k = 0; k < 9; k++) {
        const x = k * 14.2 + 4;
        for (const centro of [32, 96]) {
          const larga = 22 + ((k * 7) % 3) * 6;
          c.beginPath();
          c.moveTo(x - 4, centro - larga);
          c.quadraticCurveTo(x + 6, centro, x - 2, centro + larga);
          c.quadraticCurveTo(x + 1, centro, x + 4, centro - larga);
          c.closePath();
          c.fill();
        }
      }
    } else if (nombre === 'plumas') {
      for (let fila = 0; fila < 8; fila++) {
        for (let col = -1; col < 9; col++) {
          const x = col * 16 + (fila % 2) * 8;
          const y = fila * 17 + 4;
          const g = c.createLinearGradient(x, y, x, y + 16);
          g.addColorStop(0, '#ffffff');
          g.addColorStop(1, '#b49a8a');
          c.fillStyle = g;
          c.beginPath();
          c.ellipse(x, y + 8, 7, 11, 0, 0, Math.PI * 2);
          c.fill();
          c.strokeStyle = '#ffe08a';
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(x, y);
          c.lineTo(x, y + 18);
          c.stroke();
        }
      }
    } else if (nombre === 'hex') {
      c.fillStyle = '#d8dcd6';
      c.fillRect(0, 0, 128, 128);
      c.lineWidth = 3;
      for (let fila = 0; fila < 5; fila++) {
        for (let col = 0; col < 5; col++) {
          const cx = col * 32 + (fila % 2) * 16;
          const cy = fila * 28;
          const g = c.createRadialGradient(cx, cy, 2, cx, cy, 16);
          g.addColorStop(0, '#ffffff');
          g.addColorStop(1, '#b8c0b8');
          c.fillStyle = g;
          c.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
            const px = cx + Math.cos(a) * 15;
            const py = cy + Math.sin(a) * 15;
            if (k === 0) c.moveTo(px, py);
            else c.lineTo(px, py);
          }
          c.closePath();
          c.fill();
          c.strokeStyle = '#e8b53c';
          c.stroke();
        }
      }
    } else {
      // piedra / jade: vetas y moteado
      let semilla = 7;
      const rnd = () => {
        semilla = (semilla * 16807) % 2147483647;
        return semilla / 2147483647;
      };
      for (let i = 0; i < 260; i++) {
        const v = 200 + Math.floor(rnd() * 55);
        c.fillStyle = `rgb(${v},${v},${v})`;
        c.beginPath();
        c.arc(rnd() * 128, rnd() * 128, 1 + rnd() * 5, 0, Math.PI * 2);
        c.fill();
      }
      c.strokeStyle = 'rgba(255,255,255,0.9)';
      c.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) {
        c.beginPath();
        let x = rnd() * 128;
        let y = rnd() * 128;
        c.moveTo(x, y);
        for (let k = 0; k < 5; k++) {
          x += (rnd() - 0.5) * 40;
          y += (rnd() - 0.5) * 40;
          c.lineTo(x, y);
        }
        c.stroke();
      }
    }
  }
  t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  texturas.set(nombre, t);
  return t;
}

// --- rueda de fuego y nubes (風火輪), geometría compartida ------------------------
const ruedas = new Map<string, THREE.BufferGeometry>();
function ruedaFuego(radius: number, width: number): THREE.BufferGeometry {
  const key = `${radius}-${width}`;
  let g = ruedas.get(key);
  if (g) return g;
  const b = new Batch();
  const tube = width * 0.5;
  const torus = addVertexColor(new THREE.TorusGeometry(radius - tube, tube, 8, 18), 0x22130f);
  b.add(torus, 0, 0, 0, 0, Math.PI / 2, 0);
  torus.dispose();
  const tread = addVertexColor(new THREE.CylinderGeometry(radius * 1.005, radius * 1.005, width * 0.4, 20, 1, true), 0x3a1a12);
  b.add(tread, 0, 0, 0, 0, 0, Math.PI / 2);
  tread.dispose();
  // aro de oro
  const aro = addVertexColor(new THREE.TorusGeometry(radius * 0.66, 0.022, 6, 20), 0xffc94a);
  b.add(aro, width * 0.38, 0, 0, 0, Math.PI / 2, 0);
  b.add(aro, -width * 0.38, 0, 0, 0, Math.PI / 2, 0);
  aro.dispose();
  // disco lacado rojo
  const disco = addVertexColor(new THREE.CylinderGeometry(radius * 0.64, radius * 0.64, width * 0.7, 16), 0xb3121e);
  b.add(disco, 0, 0, 0, 0, 0, Math.PI / 2);
  disco.dispose();
  // aspas de llama doradas (giran con la rueda)
  const aspa = addVertexColor(new THREE.ConeGeometry(0.05, radius * 0.6, 4), 0xffb02a);
  aspa.translate(0, radius * 0.3, 0);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    b.add(aspa, width * 0.37, 0, 0, a, 0, 0.12, 1, 1, 0.45);
    b.add(aspa, -width * 0.37, 0, 0, a, 0, -0.12, 1, 1, 0.45);
  }
  aspa.dispose();
  const buje = addVertexColor(new THREE.SphereGeometry(radius * 0.24, 10, 7), 0xffd36a);
  b.add(buje, 0, 0, 0, 0, 0, 0, 1.9, 1, 1);
  buje.dispose();
  g = b.build();
  ruedas.set(key, g);
  return g;
}

let _nubeGeo: THREE.BufferGeometry | null = null;
/** Nube xiangyun en miniatura para la estela del derrape. */
function nubeEstela(): THREE.BufferGeometry {
  if (_nubeGeo) return _nubeGeo;
  const b = new Batch();
  const esf = new THREE.SphereGeometry(1, 8, 6);
  esf.deleteAttribute('uv');
  b.add(esf, 0, 0, 0, 0, 0, 0, 0.22, 0.14, 0.2);
  b.add(esf, 0.18, 0.04, 0.02, 0, 0, 0, 0.16, 0.12, 0.15);
  b.add(esf, -0.17, 0.02, -0.02, 0, 0, 0, 0.15, 0.1, 0.14);
  esf.dispose();
  const rizo = new THREE.TorusGeometry(0.09, 0.03, 5, 12, Math.PI * 1.5);
  rizo.deleteAttribute('uv');
  b.add(rizo, 0.22, 0.1, 0, 0, 0, 0);
  b.add(rizo, -0.2, 0.08, 0, 0, 0, Math.PI);
  rizo.dispose();
  _nubeGeo = b.build();
  return _nubeGeo;
}

// ---------------------------------------------------------------------------------
// Taller: API para esculpir criaturas
// ---------------------------------------------------------------------------------
type MatKey = 'body' | 'second' | 'accent' | 'gold' | 'ivory' | 'dark' | 'eye' | 'cloud' | 'feather' | 'saddle';
const MAT_KEYS: MatKey[] = ['body', 'second', 'accent', 'gold', 'ivory', 'dark', 'eye', 'cloud', 'feather', 'saddle'];

interface OndaCfg {
  /** Eje que mide cuánto se aleja el vértice de la raíz ('z' = hacia atrás, 'y' = hacia arriba). */
  eje: 'z' | 'y';
  o: number;
  len: number;
  amp: number;
  freq: number;
  /** Cuánto se abre hacia fuera al girar. */
  giro: number;
  /** Ondulación vertical relativa. */
  vert: number;
}
interface AlaCfg {
  lado: number;
  base: number;
  amp: number;
  freq: number;
}
interface Destino {
  batches: Map<MatKey, Batch>;
  origin: THREE.Vector3;
  onda?: OndaCfg;
  ala?: AlaCfg;
  bola?: boolean;
}

class Taller {
  readonly destinos = new Map<string, Destino>();
  private cur: Destino;
  private readonly _t = new THREE.Matrix4();

  constructor() {
    this.cur = this.destino('estatico');
  }

  private destino(nombre: string, origin: V3 = [0, 0, 0]): Destino {
    let d = this.destinos.get(nombre);
    if (!d) {
      d = { batches: new Map(), origin: new THREE.Vector3(origin[0], origin[1], origin[2]) };
      this.destinos.set(nombre, d);
    }
    return d;
  }

  estatico(): this {
    this.cur = this.destino('estatico');
    return this;
  }
  onda(nombre: string, cfg: OndaCfg): this {
    this.cur = this.destino(nombre);
    this.cur.onda = cfg;
    return this;
  }
  ala(lado: number, pivote: V3, cfg: Omit<AlaCfg, 'lado'>): this {
    this.cur = this.destino(`ala${lado}`, pivote);
    this.cur.ala = { lado, ...cfg };
    return this;
  }
  bola(centro: V3): this {
    this.cur = this.destino('bola', centro);
    this.cur.bola = true;
    return this;
  }

  private batch(k: MatKey): Batch {
    let b = this.cur.batches.get(k);
    if (!b) {
      b = new Batch();
      this.cur.batches.set(k, b);
    }
    return b;
  }

  /** Añade una geometría (no la libera) con una matriz en espacio del vehículo. */
  addM(k: MatKey, geo: THREE.BufferGeometry, m: THREE.Matrix4): this {
    const o = this.cur.origin;
    this._t.makeTranslation(-o.x, -o.y, -o.z).multiply(m);
    this.batch(k).addM(geo, this._t);
    return this;
  }
  add(k: MatKey, geo: THREE.BufferGeometry, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1): this {
    const m = new THREE.Matrix4().compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));
    return this.addM(k, geo, m);
  }
  /** Elipsoide de radios (rx, ry, rz) en (x, y, z). */
  esf(k: MatKey, x: number, y: number, z: number, rx: number, ry = rx, rz = rx, ax = 0, ay = 0, az = 0): this {
    return this.add(k, unidades().bola, x, y, z, ax, ay, az, rx, ry, rz);
  }
  /** Pieza unitaria orientada de a a b (cono = cuernos, garras, llamas; esf = plumas, aletas; cil = barras). */
  pieza(k: MatKey, forma: 'cono' | 'esf' | 'cil', a: V3, b: V3, sx: number, sz = sx, hint: V3 = [0, 1, 0]): this {
    return this.addM(k, unidades()[forma], matrizPieza(a, b, sx, sz, hint));
  }
  tubo(k: MatKey, pts: V3[], radio: (t: number) => [number, number], seg = 16, radial = 10): this {
    const g = sweep(pts, radio, seg, radial);
    this.add(k, g);
    g.dispose();
    return this;
  }
  toro(k: MatKey, R: number, r: number, x: number, y: number, z: number, ax = 0, ay = 0, az = 0, arc = Math.PI * 2, sx = 1, sy = 1, sz = 1): this {
    const g = new THREE.TorusGeometry(R, r, 6, 16, arc);
    this.add(k, g, x, y, z, ax, ay, az, sx, sy, sz);
    g.dispose();
    return this;
  }
  caja(k: MatKey, w: number, h: number, d: number, x: number, y: number, z: number, ax = 0, ay = 0, az = 0): this {
    const g = new THREE.BoxGeometry(w, h, d);
    this.add(k, g, x, y, z, ax, ay, az);
    g.dispose();
    return this;
  }
  /** Lo mismo a ambos lados (x → ±x). */
  par(fn: (lado: number) => void): this {
    fn(-1);
    fn(1);
    return this;
  }
}

// ---------------------------------------------------------------------------------
// Las ocho criaturas
// ---------------------------------------------------------------------------------
interface Criatura {
  /** Altura de la cadera del piloto y su z. */
  silla: [number, number];
  ojo: number;
  segundo: number;
  traje: number;
  aliento: number;
  boca: V3;
  textura: Textura;
  texturaSegundo?: Textura;
  /** Color de las plumas iridiscentes (alas, colas). */
  pluma?: number;
  escapes?: V3[];
  construir(t: Taller): void;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const llama = (t: Taller, k: MatKey, a: V3, b: V3, r: number) => t.pieza(k, 'cono', a, b, r);

/** Patas de felino/qilin en pose de salto. */
function patas(t: Taller, k: MatKey, pie: MatKey, grosor: number, delante: [number, number], detras: [number, number], garras: boolean) {
  t.par((s) => {
    // delanteras: hombro → codo → pata
    const [zd, yd] = delante;
    const [zt, yt] = detras;
    const g1 = limbGeometry(s * 0.15, yd, zd, s * 0.22, 0.32, zd - 0.2, grosor);
    t.add(k, g1);
    g1.dispose();
    const g2 = limbGeometry(s * 0.22, 0.32, zd - 0.2, s * 0.23, 0.17, zd - 0.38, grosor * 0.8);
    t.add(k, g2);
    g2.dispose();
    t.esf(pie, s * 0.23, 0.14, zd - 0.42, grosor * 1.05, grosor * 0.7, grosor * 1.25);
    // traseras: muslo → corvejón → pata
    t.esf(k, s * 0.17, yt, zt, grosor * 1.6, grosor * 2.4, grosor * 2.4);
    const g3 = limbGeometry(s * 0.2, yt - 0.06, zt + 0.08, s * 0.23, 0.3, zt + 0.25, grosor * 0.9);
    t.add(k, g3);
    g3.dispose();
    const g4 = limbGeometry(s * 0.23, 0.3, zt + 0.25, s * 0.23, 0.16, zt + 0.4, grosor * 0.72);
    t.add(k, g4);
    g4.dispose();
    t.esf(pie, s * 0.23, 0.13, zt + 0.42, grosor * 1.0, grosor * 0.65, grosor * 1.2);
    if (garras) {
      for (const dx of [-0.035, 0, 0.035]) {
        t.pieza('ivory', 'cono', [s * 0.23 + dx, 0.13, zd - 0.48], [s * 0.23 + dx * 1.3, 0.09, zd - 0.56], 0.014);
        t.pieza('ivory', 'cono', [s * 0.23 + dx, 0.12, zt + 0.36], [s * 0.23 + dx * 1.3, 0.08, zt + 0.28], 0.012);
      }
    }
  });
}

/** Ojos brillantes con párpado/ceja. */
function ojos(t: Taller, x: number, y: number, z: number, r: number, ceja: MatKey | null) {
  t.par((s) => {
    t.esf('dark', s * x, y, z + r * 0.15, r * 1.25, r * 1.1, r * 0.9);
    t.esf('eye', s * x, y, z - r * 0.25, r, r * 0.85, r * 0.7);
    if (ceja) t.pieza(ceja, 'esf', [s * (x - r * 1.6), y + r * 1.0, z - r * 0.8], [s * (x + r * 1.9), y + r * 1.7, z + r * 1.0], r * 0.55, r * 0.45);
  });
}

const CRIATURAS: Record<string, Criatura> = {
  // ===================================================================== 凤凰 fénix
  zippy: {
    silla: [0.6, 0.2],
    ojo: 0xffe066,
    segundo: 0xffd27a,
    traje: 0x7a1020,
    aliento: 0xffa52a,
    boca: [0, 1.04, -0.9],
    textura: 'plumas',
    pluma: 0xff3d5a,
    construir(t) {
      // torso de ave, pecho dorado
      t.tubo('body', [[0, 0.42, 0.5], [0, 0.48, 0.2], [0, 0.52, -0.15], [0, 0.58, -0.45]], (u) => {
        const r = 0.06 + 0.24 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.12)), 0.6);
        return [r * 1.08, r];
      });
      t.esf('second', 0, 0.52, -0.42, 0.2, 0.22, 0.17);
      // cuello de cisne y cabeza
      t.tubo('body', [[0, 0.58, -0.38], [0, 0.74, -0.55], [0, 0.92, -0.62], [0, 1.04, -0.6]], (u) => [lerp(0.13, 0.075, u), lerp(0.13, 0.075, u)], 10, 9);
      t.esf('body', 0, 1.08, -0.64, 0.11, 0.105, 0.13);
      t.pieza('gold', 'cono', [0, 1.08, -0.72], [0, 1.03, -0.9], 0.042, 0.03);
      t.pieza('gold', 'cono', [0, 1.05, -0.72], [0, 1.02, -0.83], 0.03, 0.022);
      ojos(t, 0.07, 1.11, -0.7, 0.024, 'gold');
      t.esf('accent', 0, 0.98, -0.72, 0.028, 0.05, 0.028);
      // penacho: tres plumas largas hacia atrás con remate dorado
      for (const [x, y, z] of [[0, 1.42, -0.36], [-0.11, 1.34, -0.4], [0.11, 1.34, -0.4]] as V3[]) {
        t.pieza('accent', 'esf', [0, 1.15, -0.62], [x, y, z], 0.035, 0.012, [1, 0, 0]);
        t.esf('gold', x, y, z, 0.03);
      }
      // escamas de plumas en el lomo, delante de la silla
      for (let i = 0; i < 4; i++) {
        t.pieza('feather', 'esf', [0, 0.72 - i * 0.02, -0.35 + i * 0.07], [0, 0.78 - i * 0.03, -0.12 + i * 0.07], 0.14 - i * 0.015, 0.03);
      }
      // alas que baten
      t.par((s) => {
        t.ala(s, [s * 0.24, 0.62, -0.12], { base: 0.28, amp: 0.35, freq: 4.5 });
        t.tubo('body', [[s * 0.18, 0.62, -0.12], [s * 0.4, 0.68, -0.08], [s * 0.6, 0.7, 0.02]], () => [0.055, 0.05], 6, 7);
        for (let i = 0; i < 7; i++) {
          const ang = -0.45 + i * 0.24;
          const L = 0.78 - Math.abs(i - 2) * 0.06;
          const B: V3 = [s * (0.3 + i * 0.045), 0.66 - i * 0.004, -0.1 + i * 0.04];
          const T: V3 = [B[0] + s * Math.cos(ang) * L, B[1] + 0.1 - i * 0.025, B[2] + Math.sin(ang) * L];
          t.pieza('feather', 'esf', B, T, 0.075, 0.014);
          t.pieza('accent', 'esf', [lerp(B[0], T[0], 0.62), lerp(B[1], T[1], 0.62) + 0.006, lerp(B[2], T[2], 0.62)], T, 0.05, 0.01);
        }
        for (let i = 0; i < 5; i++) {
          const ang = -0.3 + i * 0.28;
          const B: V3 = [s * 0.26, 0.68, -0.1 + i * 0.03];
          t.pieza('second', 'esf', B, [B[0] + s * Math.cos(ang) * 0.42, 0.72, B[2] + Math.sin(ang) * 0.42], 0.07, 0.016);
        }
      });
      // cola de plumas largas con ojos brillantes
      t.onda('cola', { eje: 'z', o: 0.45, len: 0.9, amp: 0.1, freq: 3.6, giro: 0.3, vert: 0.6 });
      for (let i = -2; i <= 2; i++) {
        const tip: V3 = [i * 0.24, 0.66 + (2 - Math.abs(i)) * 0.1, 1.38 - Math.abs(i) * 0.12];
        t.tubo('feather', [[i * 0.03, 0.5, 0.45], [i * 0.11, 0.56, 0.85], tip], (u) => [0.03 + 0.035 * Math.sin(Math.PI * u), 0.012], 10, 6);
        t.esf('accent', tip[0], tip[1], tip[2] + 0.02, 0.065, 0.016, 0.075);
        t.esf('eye', tip[0], tip[1] + 0.012, tip[2] + 0.02, 0.028, 0.012, 0.032);
      }
      for (const s of [-1, 1]) {
        t.tubo('accent', [[s * 0.05, 0.55, 0.45], [s * 0.2, 0.8, 0.85], [s * 0.38, 1.0, 1.1], [s * 0.5, 1.02, 1.3]], (u) => [0.02 * (1 - u) + 0.006, 0.02 * (1 - u) + 0.006], 12, 6);
      }
      t.estatico();
    },
  },

  // ===================================================================== 锦鲤 carpa-dragón
  pixel: {
    silla: [0.62, 0.1],
    ojo: 0x6ff7ff,
    segundo: 0xfff4ea,
    traje: 0x1c6f8a,
    aliento: 0x6fe8ff,
    boca: [0, 0.42, -1.04],
    textura: 'escamas',
    construir(t) {
      // cabeza y morro estáticos
      t.esf('second', 0, 0.36, -0.35, 0.24, 0.14, 0.48);
      t.esf('second', 0.16, 0.6, -0.52, 0.12, 0.07, 0.16, 0, 0, -0.5);
      t.esf('second', -0.14, 0.62, -0.2, 0.1, 0.06, 0.14, 0, 0, 0.6);
      t.toro('second', 0.07, 0.028, 0, 0.42, -1.0);
      t.esf('dark', 0, 0.42, -1.0, 0.06, 0.05, 0.02);
      t.par((s) => {
        t.esf('gold', s * 0.17, 0.55, -0.78, 0.068);
        t.esf('eye', s * 0.2, 0.56, -0.82, 0.046, 0.046, 0.03);
        // cuernos que brotan: la carpa se está convirtiendo en dragón
        t.pieza('gold', 'cono', [s * 0.08, 0.66, -0.7], [s * 0.15, 0.88, -0.5], 0.032);
        t.pieza('gold', 'cono', [s * 0.11, 0.77, -0.6], [s * 0.2, 0.82, -0.66], 0.016);
        // opérculo dorado
        t.toro('gold', 0.2, 0.014, s * 0.2, 0.46, -0.6, 0, s * 1.2, 0, Math.PI * 0.8);
        // aletas pélvicas
        t.pieza('accent', 'esf', [s * 0.12, 0.26, 0.05], [s * 0.3, 0.14, 0.3], 0.07, 0.012);
      });
      // aletas pectorales que reman
      t.par((s) => {
        t.ala(s, [s * 0.24, 0.38, -0.55], { base: -0.1, amp: 0.45, freq: 6.5 });
        t.pieza('accent', 'esf', [s * 0.24, 0.38, -0.55], [s * 0.6, 0.3, -0.3], 0.11, 0.014);
        t.pieza('gold', 'cil', [s * 0.24, 0.39, -0.55], [s * 0.58, 0.31, -0.32], 0.006);
      });
      // bigotes largos
      t.onda('bigotes', { eje: 'z', o: -1.02, len: 0.8, amp: 0.05, freq: 4, giro: 0.15, vert: 0.6 });
      t.par((s) => {
        t.tubo('accent', [[s * 0.07, 0.4, -1.0], [s * 0.25, 0.36, -0.98], [s * 0.42, 0.42, -0.72], [s * 0.52, 0.52, -0.38]], (u) => [lerp(0.018, 0.006, u), lerp(0.018, 0.006, u)], 12, 5);
      });
      // cuerpo que culebrea con la cola
      t.onda('cola', { eje: 'z', o: 0.3, len: 1.0, amp: 0.13, freq: 5.5, giro: 0.35, vert: 0.25 });
      t.tubo('body', [[0, 0.42, -1.0], [0, 0.46, -0.75], [0, 0.5, -0.3], [0, 0.52, 0.2], [0, 0.52, 0.55], [0, 0.5, 0.82]], (u) => {
        const r = u < 0.3 ? 0.1 + 0.2 * Math.sin((u / 0.3) * Math.PI * 0.5) : 0.07 + 0.23 * Math.cos(((u - 0.3) / 0.7) * Math.PI * 0.5);
        return [r * 0.92, r * 1.08];
      }, 22, 12);
      // aleta dorsal detrás del piloto y gran aleta caudal ahorquillada
      t.pieza('accent', 'esf', [0, 0.66, 0.32], [0, 0.92, 0.72], 0.13, 0.014, [1, 0, 0]);
      t.pieza('accent', 'esf', [0, 0.52, 0.78], [0, 0.94, 1.28], 0.17, 0.014, [1, 0, 0]);
      t.pieza('accent', 'esf', [0, 0.48, 0.78], [0, 0.14, 1.22], 0.15, 0.014, [1, 0, 0]);
      for (const [y, z] of [[0.9, 1.22], [0.18, 1.17]]) t.pieza('gold', 'cil', [0, 0.5, 0.8], [0, y, z], 0.007);
      t.pieza('accent', 'esf', [0, 0.32, 0.45], [0, 0.18, 0.7], 0.07, 0.012, [1, 0, 0]);
      t.estatico();
    },
  },

  // ===================================================================== 麒麟 qilin
  fennec: {
    silla: [0.7, 0.1],
    ojo: 0x5dffd8,
    segundo: 0xfff0c8,
    traje: 0x0f6b56,
    aliento: 0x4dffd2,
    boca: [0, 0.97, -1.0],
    textura: 'escamas',
    construir(t) {
      t.tubo('body', [[0, 0.56, 0.52], [0, 0.6, 0.2], [0, 0.58, -0.2], [0, 0.63, -0.45]], (u) => {
        const r = 0.2 + 0.04 * Math.sin(Math.PI * u);
        return [r * 0.95, r];
      });
      t.esf('second', 0, 0.46, -0.02, 0.17, 0.12, 0.4);
      // cuello, cabeza y cornamenta
      t.tubo('body', [[0, 0.64, -0.4], [0, 0.82, -0.58], [0, 0.98, -0.66]], (u) => [lerp(0.13, 0.09, u), lerp(0.14, 0.09, u)], 10, 9);
      t.esf('body', 0, 1.02, -0.72, 0.11, 0.11, 0.15);
      t.esf('body', 0, 0.98, -0.88, 0.08, 0.07, 0.11);
      t.esf('gold', 0, 0.99, -0.98, 0.04, 0.032, 0.03);
      ojos(t, 0.075, 1.06, -0.79, 0.027, 'gold');
      t.par((s) => {
        t.pieza('gold', 'cono', [s * 0.05, 1.1, -0.7], [s * 0.16, 1.34, -0.54], 0.026);
        t.pieza('gold', 'cono', [s * 0.1, 1.21, -0.62], [s * 0.22, 1.28, -0.72], 0.016);
        t.pieza('gold', 'cono', [s * 0.13, 1.27, -0.58], [s * 0.12, 1.42, -0.5], 0.014);
        t.pieza('body', 'esf', [s * 0.09, 1.07, -0.66], [s * 0.22, 1.11, -0.6], 0.04, 0.014);
        // mechones de fuego en codos y ancas
        llama(t, 'accent', [s * 0.21, 0.36, -0.6], [s * 0.26, 0.48, -0.35], 0.045);
        llama(t, 'accent', [s * 0.21, 0.36, 0.7], [s * 0.26, 0.5, 0.95], 0.045);
        llama(t, 'accent', [s * 0.2, 0.58, 0.42], [s * 0.28, 0.72, 0.62], 0.05);
      });
      // crin de llamas a lo largo del cuello
      for (let i = 0; i < 6; i++) {
        const b: V3 = [0, 0.72 + i * 0.06, -0.42 - i * 0.045];
        llama(t, 'accent', b, [0, b[1] + 0.16, b[2] + 0.17], 0.045);
      }
      llama(t, 'accent', [0, 0.93, -0.9], [0, 0.82, -0.82], 0.03);
      patas(t, 'body', 'gold', 0.05, [-0.42, 0.55], [0.38, 0.56], false);
      // cola de llama
      t.onda('cola', { eje: 'z', o: 0.5, len: 0.5, amp: 0.14, freq: 5, giro: 0.4, vert: 0.5 });
      t.tubo('body', [[0, 0.6, 0.48], [0, 0.72, 0.7], [0, 0.86, 0.84]], () => [0.05, 0.05], 8, 7);
      for (const [x, y, z] of [[0, 1.12, 1.02], [0.12, 1.0, 1.08], [-0.12, 1.0, 1.08], [0, 0.88, 1.12]] as V3[]) {
        llama(t, 'accent', [0, 0.86, 0.84], [x, y, z], 0.06);
      }
      t.estatico();
    },
  },

  // ===================================================================== 龙 dragón
  max: {
    silla: [0.62, 0.12],
    ojo: 0xffe14a,
    segundo: 0xffd27a,
    traje: 0x5a1015,
    aliento: 0xff6a1a,
    boca: [0, 0.54, -1.06],
    textura: 'escamas',
    construir(t) {
      // cabeza
      t.esf('body', 0, 0.68, -0.72, 0.19, 0.16, 0.22);
      t.esf('body', 0, 0.6, -0.92, 0.14, 0.1, 0.18);
      t.esf('body', 0, 0.65, -1.04, 0.09, 0.06, 0.06);
      t.esf('second', 0, 0.48, -0.9, 0.11, 0.05, 0.16, 0.15);
      t.esf('dark', 0, 0.53, -0.93, 0.1, 0.04, 0.12);
      t.par((s) => {
        t.esf('gold', s * 0.05, 0.68, -1.07, 0.025);
        t.pieza('ivory', 'cono', [s * 0.07, 0.57, -1.0], [s * 0.07, 0.48, -1.02], 0.016);
        t.pieza('ivory', 'cono', [s * 0.06, 0.48, -0.98], [s * 0.06, 0.54, -0.99], 0.012);
        // cornamenta ramificada
        t.pieza('gold', 'cono', [s * 0.08, 0.8, -0.66], [s * 0.22, 1.12, -0.4], 0.032);
        t.pieza('gold', 'cono', [s * 0.14, 0.94, -0.55], [s * 0.28, 1.0, -0.64], 0.02);
        t.pieza('gold', 'cono', [s * 0.18, 1.03, -0.48], [s * 0.16, 1.17, -0.5], 0.018);
        // patas cortas con garras sobre las nubes
        for (const z of [-0.38, 0.32]) {
          const g = limbGeometry(s * 0.14, 0.44, z, s * 0.3, 0.28, z - 0.08, 0.055);
          t.add('body', g);
          g.dispose();
          t.esf('second', s * 0.31, 0.26, z - 0.09, 0.06, 0.04, 0.07);
          for (const dz of [-0.04, 0, 0.04]) t.pieza('ivory', 'cono', [s * 0.33, 0.25, z - 0.09 + dz], [s * 0.4, 0.2, z - 0.1 + dz * 1.4], 0.013);
        }
      });
      ojos(t, 0.12, 0.74, -0.84, 0.038, 'gold');
      // melena de llamas detrás de la cabeza y barba
      for (let i = 0; i < 9; i++) {
        const a = -1.7 + (i / 8) * 3.4;
        const b: V3 = [Math.sin(a) * 0.15, 0.68 + Math.cos(a) * 0.12, -0.6];
        llama(t, 'accent', b, [b[0] + Math.sin(a) * 0.16, b[1] + Math.cos(a) * 0.1, -0.36], 0.045);
      }
      for (const x of [-0.05, 0, 0.05]) llama(t, 'accent', [x, 0.46, -0.9], [x * 2, 0.32, -0.78], 0.025);
      // perla de fuego delante de las fauces
      t.esf('eye', 0, 0.5, -1.22, 0.075);
      t.toro('gold', 0.1, 0.012, 0, 0.5, -1.22, 0, 0, 0, Math.PI * 1.4);
      // bigotes
      t.onda('bigotes', { eje: 'z', o: -1.06, len: 0.9, amp: 0.07, freq: 3, giro: 0.2, vert: 0.8 });
      t.par((s) => {
        t.tubo('gold', [[s * 0.07, 0.62, -1.05], [s * 0.25, 0.6, -1.06], [s * 0.45, 0.68, -0.85], [s * 0.55, 0.8, -0.5], [s * 0.5, 0.86, -0.22]], (u) => [lerp(0.016, 0.005, u), lerp(0.016, 0.005, u)], 14, 5);
      });
      // cuerpo serpentino: pasa bajo la silla y ondula detrás
      t.onda('cola', { eje: 'z', o: 0.35, len: 1.0, amp: 0.14, freq: 3.8, giro: 0.35, vert: 0.5 });
      const pts: V3[] = [[0, 0.62, -0.6], [0, 0.5, -0.4], [0, 0.4, -0.1], [0, 0.42, 0.25], [0, 0.55, 0.55], [0.18, 0.64, 0.85], [0.05, 0.56, 1.15], [-0.16, 0.6, 1.36]];
      const radio = (u: number) => (u < 0.4 ? 0.18 + 0.04 * Math.sin((u / 0.4) * Math.PI * 0.5) : 0.22 * Math.pow(1 - (u - 0.4) / 0.6, 0.8) + 0.02);
      t.tubo('body', pts, (u) => [radio(u), radio(u) * 0.95], 26, 12);
      const curva = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
      const P = new THREE.Vector3();
      for (let u = 0.05; u < 0.97; u += 0.06) {
        curva.getPointAt(u, P);
        if (P.z > -0.25 && P.z < 0.42) continue; // hueco para la silla
        const r = radio(u);
        const h = 0.1 + 0.08 * (1 - u);
        llama(t, 'accent', [P.x, P.y + r * 0.7, P.z], [P.x, P.y + r + h, P.z + 0.07], 0.04);
        // vientre dorado
        t.esf('second', P.x, P.y - r * 0.55, P.z, r * 0.6, r * 0.45, 0.06);
      }
      curva.getPointAt(1, P);
      for (const [dx, dy] of [[0, 0.12], [0.1, 0.05], [-0.1, 0.05], [0, -0.06]]) llama(t, 'accent', [P.x, P.y, P.z - 0.04], [P.x + dx, P.y + dy, P.z + 0.22], 0.05);
      t.estatico();
    },
  },

  // ===================================================================== 白虎 tigre blanco
  juno: {
    silla: [0.68, 0.14],
    ojo: 0x9fd8ff,
    segundo: 0xffffff,
    traje: 0x3b2a7a,
    aliento: 0xb48cff,
    boca: [0, 0.62, -0.97],
    textura: 'rayas',
    construir(t) {
      t.tubo('body', [[0, 0.55, 0.58], [0, 0.58, 0.25], [0, 0.56, -0.15], [0, 0.6, -0.45]], (u) => {
        const r = 0.2 + 0.05 * Math.sin(Math.PI * u);
        return [r, r * 0.96];
      }, 16, 12);
      t.esf('second', 0, 0.5, -0.45, 0.2, 0.2, 0.16);
      t.esf('second', 0, 0.42, 0.05, 0.16, 0.1, 0.36);
      // cabeza
      t.esf('body', 0, 0.75, -0.72, 0.2, 0.18, 0.19);
      t.esf('second', 0, 0.68, -0.88, 0.11, 0.08, 0.09);
      t.esf('second', 0, 0.6, -0.84, 0.09, 0.05, 0.08);
      t.esf('dark', 0, 0.73, -0.96, 0.04, 0.03, 0.025);
      ojos(t, 0.09, 0.8, -0.86, 0.034, 'dark');
      t.par((s) => {
        t.esf('second', s * 0.12, 0.68, -0.81, 0.1, 0.08, 0.08);
        t.pieza('ivory', 'cono', [s * 0.045, 0.64, -0.93], [s * 0.045, 0.55, -0.95], 0.016);
        t.pieza('body', 'cono', [s * 0.12, 0.88, -0.68], [s * 0.18, 1.02, -0.66], 0.06, 0.03);
        t.pieza('second', 'cono', [s * 0.125, 0.89, -0.69], [s * 0.17, 0.99, -0.68], 0.035, 0.012);
        // relámpagos en hombros y ancas
        for (const [z0, y0] of [[-0.5, 0.74], [0.32, 0.72]]) {
          const zz: V3[] = [[s * 0.25, y0, z0], [s * 0.3, y0 - 0.1, z0 + 0.1], [s * 0.26, y0 - 0.12, z0 + 0.17], [s * 0.31, y0 - 0.24, z0 + 0.28]];
          for (let i = 0; i < 3; i++) t.pieza('accent', 'cil', zz[i], zz[i + 1], 0.018);
        }
      });
      // 王 en la frente
      t.caja('dark', 0.1, 0.014, 0.012, 0, 0.91, -0.82, -0.7);
      t.caja('dark', 0.08, 0.014, 0.012, 0, 0.885, -0.845, -0.7);
      t.caja('dark', 0.1, 0.014, 0.012, 0, 0.86, -0.87, -0.7);
      t.caja('dark', 0.014, 0.075, 0.012, 0, 0.885, -0.845, -0.7);
      patas(t, 'body', 'second', 0.07, [-0.42, 0.56], [0.4, 0.52], true);
      // cola rayada que se riza
      t.onda('cola', { eje: 'z', o: 0.55, len: 0.6, amp: 0.15, freq: 4.2, giro: 0.4, vert: 0.4 });
      t.tubo('body', [[0, 0.6, 0.55], [0, 0.62, 0.8], [0.05, 0.78, 1.0], [0, 0.98, 1.08], [-0.08, 1.08, 0.98]], (u) => [lerp(0.055, 0.035, u), lerp(0.055, 0.035, u)], 14, 8);
      t.esf('dark', -0.08, 1.08, 0.98, 0.045);
      t.estatico();
    },
  },

  // ===================================================================== 玄武 tortuga y serpiente
  kai: {
    silla: [0.8, 0.12],
    ojo: 0x5ff0ff,
    segundo: 0x2f6b55,
    traje: 0x0e2c4a,
    aliento: 0x40e8ff,
    boca: [0, 0.45, -1.16],
    textura: 'hex',
    texturaSegundo: 'escamas',
    escapes: [[-0.22, 0.3, 0.74], [0.22, 0.3, 0.74]],
    construir(t) {
      const cupula = new THREE.SphereGeometry(1, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2);
      t.add('body', cupula, 0, 0.32, 0.06, 0, 0, 0, 0.5, 0.44, 0.66);
      cupula.dispose();
      t.esf('second', 0, 0.3, 0.06, 0.53, 0.06, 0.69);
      t.toro('gold', 1, 0.05, 0, 0.34, 0.06, Math.PI / 2, 0, 0, Math.PI * 2, 0.51, 0.67, 0.7);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        t.esf('gold', Math.cos(a) * 0.36, 0.6, 0.06 + Math.sin(a) * 0.48, 0.035, 0.02, 0.035);
      }
      t.esf('second', 0, 0.24, 0.06, 0.42, 0.08, 0.58);
      // cuello y cabeza de tortuga
      t.tubo('second', [[0, 0.36, -0.45], [0, 0.4, -0.75], [0, 0.45, -0.94]], () => [0.1, 0.1], 8, 9);
      t.esf('second', 0, 0.48, -0.99, 0.12, 0.1, 0.14);
      t.pieza('gold', 'cono', [0, 0.46, -1.08], [0, 0.42, -1.17], 0.04, 0.03);
      ojos(t, 0.08, 0.53, -1.04, 0.027, 'gold');
      // aletas traseras fijas
      t.par((s) => t.pieza('second', 'esf', [s * 0.36, 0.26, 0.5], [s * 0.58, 0.2, 0.72], 0.08, 0.025));
      // aletas delanteras que reman
      t.par((s) => {
        t.ala(s, [s * 0.38, 0.28, -0.4], { base: -0.05, amp: 0.3, freq: 3 });
        t.pieza('second', 'esf', [s * 0.38, 0.28, -0.4], [s * 0.72, 0.22, -0.58], 0.11, 0.03);
        t.pieza('gold', 'cil', [s * 0.4, 0.3, -0.41], [s * 0.66, 0.25, -0.56], 0.008);
      });
      // la serpiente: rodea el caparazón y se alza detrás del piloto
      t.onda('serpiente', { eje: 'y', o: 0.55, len: 0.6, amp: 0.07, freq: 2.4, giro: 0.15, vert: 0.6 });
      const sp: V3[] = [[-0.36, 0.3, -0.42], [-0.52, 0.34, 0.0], [-0.44, 0.36, 0.5], [-0.1, 0.4, 0.78], [0.3, 0.44, 0.66], [0.4, 0.66, 0.46], [0.34, 0.92, 0.4], [0.32, 1.1, 0.26]];
      t.tubo('second', sp, (u) => {
        const r = 0.025 + 0.055 * Math.min(1, u * 2.2);
        return [r, r];
      }, 30, 9);
      t.esf('second', 0.32, 1.15, 0.17, 0.075, 0.06, 0.11);
      t.esf('second', 0.32, 1.13, 0.08, 0.05, 0.04, 0.05);
      t.esf('eye', 0.27, 1.19, 0.12, 0.02);
      t.esf('eye', 0.37, 1.19, 0.12, 0.02);
      t.pieza('accent', 'cono', [0.32, 1.13, 0.05], [0.29, 1.12, -0.06], 0.008);
      t.pieza('accent', 'cono', [0.32, 1.13, 0.05], [0.35, 1.12, -0.06], 0.008);
      llama(t, 'accent', [0.32, 1.2, 0.2], [0.32, 1.3, 0.32], 0.03);
      t.estatico();
    },
  },

  // ===================================================================== 石狮 león de jade
  bram: {
    silla: [0.7, 0.16],
    ojo: 0xffd84a,
    segundo: 0x17573c,
    traje: 0x6a1a14,
    aliento: 0xffd040,
    boca: [0, 0.66, -1.0],
    textura: 'piedra',
    texturaSegundo: 'piedra',
    construir(t) {
      t.tubo('body', [[0, 0.55, 0.55], [0, 0.58, 0.2], [0, 0.6, -0.2], [0, 0.66, -0.45]], (u) => {
        const r = 0.22 + 0.06 * Math.sin(Math.PI * u);
        return [r, r * 0.98];
      }, 16, 12);
      // cabeza cuadrada de guardián
      t.esf('body', 0, 0.8, -0.74, 0.22, 0.21, 0.2);
      t.esf('body', 0, 0.72, -0.9, 0.13, 0.09, 0.09);
      t.esf('second', 0, 0.77, -0.98, 0.06, 0.04, 0.035);
      t.esf('body', 0, 0.6, -0.85, 0.11, 0.05, 0.09);
      t.esf('dark', 0, 0.65, -0.88, 0.1, 0.05, 0.07);
      t.esf('eye', 0, 0.66, -0.93, 0.05);
      t.par((s) => {
        t.esf('ivory', s * 0.09, 0.86, -0.88, 0.05);
        t.esf('eye', s * 0.09, 0.86, -0.92, 0.03, 0.03, 0.02);
        t.pieza('second', 'esf', [s * 0.03, 0.92, -0.92], [s * 0.17, 0.93, -0.84], 0.035, 0.03);
        t.pieza('ivory', 'cono', [s * 0.06, 0.68, -0.95], [s * 0.06, 0.62, -0.96], 0.014);
      });
      // melena de rizos
      for (let anillo = 0; anillo < 2; anillo++) {
        const R = 0.21 + anillo * 0.08;
        const n = 12 + anillo * 4;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + anillo * 0.2;
          const x = Math.cos(a) * R;
          const y = 0.8 + Math.sin(a) * R * 0.95;
          if (y < 0.58) continue;
          const z = -0.62 + anillo * 0.08;
          t.toro('second', 0.04, 0.02, x, y, z);
          t.esf('second', x, y, z + 0.02, 0.042);
        }
      }
      // collar rojo con cascabel
      t.toro('saddle', 0.22, 0.035, 0, 0.62, -0.55, -0.9);
      t.esf('gold', 0, 0.46, -0.68, 0.06);
      t.caja('dark', 0.07, 0.01, 0.01, 0, 0.44, -0.735);
      llama(t, 'accent', [0, 0.52, -0.66], [-0.08, 0.38, -0.62], 0.025);
      llama(t, 'accent', [0, 0.52, -0.66], [0.08, 0.38, -0.62], 0.025);
      patas(t, 'body', 'body', 0.08, [-0.42, 0.58], [0.4, 0.54], false);
      t.par((s) => {
        t.toro('second', 0.04, 0.02, s * 0.25, 0.34, -0.62, 0, s * Math.PI / 2, 0);
        t.toro('second', 0.04, 0.02, s * 0.25, 0.32, 0.68, 0, s * Math.PI / 2, 0);
      });
      // bola bordada que rueda delante
      t.bola([0, 0.16, -0.98]);
      t.esf('accent', 0, 0.16, -0.98, 0.15);
      t.toro('gold', 0.152, 0.012, 0, 0.16, -0.98, 0, Math.PI / 2, 0);
      t.toro('gold', 0.152, 0.012, 0, 0.16, -0.98, 0, 0, 0);
      t.toro('gold', 0.152, 0.012, 0, 0.16, -0.98, Math.PI / 2, 0, 0);
      // cola rizada
      t.onda('cola', { eje: 'z', o: 0.55, len: 0.35, amp: 0.1, freq: 4, giro: 0.3, vert: 0.3 });
      t.tubo('body', [[0, 0.62, 0.55], [0, 0.8, 0.68], [0, 0.95, 0.72]], () => [0.045, 0.045], 8, 7);
      t.esf('second', 0, 1.0, 0.74, 0.09);
      t.toro('second', 0.06, 0.025, 0.07, 1.04, 0.76, 0, Math.PI / 2, 0);
      t.toro('second', 0.06, 0.025, -0.07, 1.04, 0.76, 0, Math.PI / 2, 0);
      t.estatico();
    },
  },

  // ===================================================================== 貔貅 pixiu
  rosa: {
    silla: [0.72, 0.16],
    ojo: 0xff5a3a,
    segundo: 0xffe2a0,
    traje: 0x7a0f18,
    aliento: 0xffc020,
    boca: [0, 0.7, -1.02],
    textura: 'escamas',
    pluma: 0xffb020,
    construir(t) {
      t.tubo('body', [[0, 0.55, 0.58], [0, 0.6, 0.2], [0, 0.6, -0.2], [0, 0.66, -0.48]], (u) => {
        const r = 0.23 + 0.06 * Math.sin(Math.PI * u);
        return [r * 1.02, r];
      }, 16, 12);
      t.esf('second', 0, 0.44, -0.08, 0.22, 0.16, 0.42);
      // cabeza feroz con un solo cuerno
      t.esf('body', 0, 0.84, -0.76, 0.2, 0.18, 0.2);
      t.esf('body', 0, 0.76, -0.94, 0.12, 0.09, 0.1);
      t.esf('body', 0, 0.63, -0.88, 0.11, 0.05, 0.1, 0.2);
      t.esf('dark', 0, 0.68, -0.92, 0.1, 0.05, 0.08);
      t.esf('gold', 0, 0.8, -1.03, 0.045, 0.035, 0.03);
      ojos(t, 0.1, 0.9, -0.88, 0.036, 'gold');
      t.pieza('gold', 'cono', [0, 0.98, -0.78], [0, 1.26, -0.52], 0.045);
      t.toro('saddle', 0.05, 0.012, 0, 1.03, -0.73, -0.9);
      t.par((s) => {
        t.pieza('ivory', 'cono', [s * 0.06, 0.72, -0.98], [s * 0.06, 0.63, -1.0], 0.017);
        t.pieza('body', 'cono', [s * 0.14, 0.95, -0.7], [s * 0.24, 1.04, -0.6], 0.05, 0.025);
      });
      for (let i = 0; i < 9; i++) {
        const a = -1.8 + (i / 8) * 3.6;
        const b: V3 = [Math.sin(a) * 0.16, 0.84 + Math.cos(a) * 0.14, -0.62];
        llama(t, 'accent', b, [b[0] + Math.sin(a) * 0.2, b[1] + Math.cos(a) * 0.12, -0.34], 0.055);
      }
      for (const x of [-0.06, 0, 0.06]) llama(t, 'accent', [x, 0.62, -0.88], [x * 1.8, 0.48, -0.8], 0.03);
      // monedas de oro en el pecho
      for (const [x, y] of [[-0.1, 0.58], [0, 0.52], [0.1, 0.58]]) {
        const coin = new THREE.CylinderGeometry(0.06, 0.06, 0.016, 14);
        t.add('gold', coin, x, y, -0.64, Math.PI / 2 - 0.3, 0, 0);
        coin.dispose();
        t.caja('dark', 0.026, 0.026, 0.02, x, y, -0.645, -0.3, 0, 0);
      }
      patas(t, 'body', 'gold', 0.08, [-0.44, 0.6], [0.4, 0.55], true);
      // alas pequeñas
      t.par((s) => {
        t.ala(s, [s * 0.22, 0.82, -0.28], { base: 0.45, amp: 0.3, freq: 5.5 });
        for (let i = 0; i < 4; i++) {
          const ang = -0.2 + i * 0.35;
          const L = 0.5 - i * 0.06;
          t.pieza('feather', 'esf', [s * 0.22, 0.82, -0.28 + i * 0.03], [s * (0.22 + Math.cos(ang) * L), 0.9 - i * 0.03, -0.28 + Math.sin(ang) * L], 0.07, 0.014);
        }
        t.tubo('second', [[s * 0.18, 0.8, -0.3], [s * 0.4, 0.88, -0.26]], () => [0.04, 0.04], 4, 6);
      });
      t.onda('cola', { eje: 'z', o: 0.55, len: 0.45, amp: 0.13, freq: 4.5, giro: 0.35, vert: 0.4 });
      t.tubo('body', [[0, 0.65, 0.56], [0, 0.82, 0.75], [0.05, 0.96, 0.72], [0.08, 0.97, 0.6]], () => [0.05, 0.05], 10, 7);
      for (const [x, y, z] of [[0.08, 1.15, 0.66], [0.2, 1.04, 0.6], [-0.04, 1.08, 0.5]] as V3[]) llama(t, 'accent', [0.08, 0.97, 0.6], [x, y, z], 0.05);
      t.estatico();
    },
  },
};

const CRIATURA_POR_INDICE = ['zippy', 'pixel', 'fennec', 'max', 'juno', 'kai', 'bram', 'rosa'];

function criaturaDe(character: CharacterDef): Criatura {
  const c = CRIATURAS[character.id];
  if (c) return c;
  const i = Math.max(0, CHARACTERS.indexOf(character));
  return CRIATURAS[CRIATURA_POR_INDICE[i % CRIATURA_POR_INDICE.length]];
}

/** Lo que comparten todas: nubes xiangyun, guardabarros, silla lacada y manillar. */
function basesComunes(t: Taller, spec: Criatura) {
  // nubes bajo el vientre
  t.esf('cloud', 0, 0.17, 0.0, 0.3, 0.075, 0.62);
  t.par((s) => {
    for (const [z, r] of [[-0.24, 0.15], [0.0, 0.17], [0.24, 0.15]]) t.esf('cloud', s * 0.34, 0.2, z, r, r * 0.62, r * 1.15);
    t.toro('gold', 0.06, 0.016, s * 0.47, 0.25, -0.12, 0, s * Math.PI / 2, 0, Math.PI * 1.5);
    t.toro('gold', 0.05, 0.014, s * 0.47, 0.22, 0.12, 0, s * Math.PI / 2, Math.PI, Math.PI * 1.5);
  });
  // arcos dorados sobre las ruedas
  const rs: [number, number, number, number][] = [
    [WHEEL_X, WHEEL_Z_F, WHEEL_R_F, WHEEL_W_F],
    [-WHEEL_X, WHEEL_Z_F, WHEEL_R_F, WHEEL_W_F],
    [WHEEL_X, WHEEL_Z_R, WHEEL_R_R, WHEEL_W_R],
    [-WHEEL_X, WHEEL_Z_R, WHEEL_R_R, WHEEL_W_R],
  ];
  for (const [x, z, r, w] of rs) {
    // nube que abraza la rueda por dentro
    t.esf('cloud', x - Math.sign(x) * (w / 2 + 0.02), r + 0.04, z, 0.05, r * 0.7, r * 1.05);
    t.toro('gold', r + 0.065, 0.016, x + Math.sign(x) * (w / 2 + 0.04), r, z, 0, Math.PI / 2, 0, Math.PI);
  }
  // silla lacada con faldones
  const [sy, sz] = spec.silla;
  const base = new RoundedBoxGeometry(0.4, 0.07, 0.36, 1, 0.025);
  t.add('saddle', base, 0, sy - 0.03, sz);
  base.dispose();
  const resp = new THREE.CylinderGeometry(0.2, 0.18, 0.26, 12, 1, true, -Math.PI / 2, Math.PI);
  t.add('saddle', resp, 0, sy + 0.1, sz + 0.12, 0.12, 0, 0);
  resp.dispose();
  t.par((s) => {
    t.caja('saddle', 0.03, 0.2, 0.3, s * 0.24, sy - 0.12, sz, 0, 0, s * 0.3);
    t.caja('gold', 0.032, 0.025, 0.31, s * 0.27, sy - 0.215, sz, 0, 0, s * 0.3);
  });
  t.toro('gold', 0.19, 0.012, 0, sy + 0.23, sz + 0.12, Math.PI / 2 + 0.12, 0, 0, Math.PI);
  // escapes: trompetas doradas
  for (const [x, y, z] of spec.escapes ?? [[-0.17, 0.42, 0.76], [0.17, 0.42, 0.76]]) {
    const trompa = new THREE.CylinderGeometry(0.062, 0.035, 0.24, 12, 1, true);
    trompa.translate(0, 0.12, 0);
    t.add('gold', trompa, x, y, z, Math.PI / 2 - 0.16, 0, 0);
    trompa.dispose();
  }
}

// ---------------------------------------------------------------------------------
export function buildKartModel(character: CharacterDef): KartModelPartsEx {
  const spec = criaturaDe(character);
  const root = new THREE.Group();
  root.name = `kart-${character.id}`;
  const cuerpo = new THREE.Group();
  cuerpo.name = 'criatura';
  root.add(cuerpo);

  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const track = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.add(g);
    return g;
  };
  const mat = <T extends THREE.Material>(m: T): T => {
    materials.add(m);
    return m;
  };

  // --- materiales propios (Kart.ts los anima) -------------------------------------
  const bodyMaterial = mat(
    new THREE.MeshPhysicalMaterial({
      color: character.color,
      map: textura(spec.textura),
      metalness: 0.25,
      roughness: 0.38,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    }),
  );
  const accentMaterial = mat(
    new THREE.MeshStandardMaterial({
      color: character.accent,
      metalness: 0.3,
      roughness: 0.35,
      emissive: character.accent,
      emissiveIntensity: 0.32,
    }),
  );
  const orbMaterial = mat(
    new THREE.MeshStandardMaterial({ color: spec.ojo, emissive: spec.ojo, emissiveIntensity: 1.6, roughness: 0.15, metalness: 0.1 }),
  );
  const exhaustGlowMaterial = mat(
    new THREE.MeshStandardMaterial({ color: 0x120805, emissive: 0xff7a1a, emissiveIntensity: 0, roughness: 0.6 }),
  );
  const flameMaterial = mat(
    new THREE.MeshBasicMaterial({ color: 0xff6ab0, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
  );

  // --- materiales compartidos -----------------------------------------------------
  const oro = compartido('oro', () => new THREE.MeshStandardMaterial({ color: 0xffc94a, metalness: 0.9, roughness: 0.22, emissive: 0x6a4208, emissiveIntensity: 0.8 }));
  const marfil = compartido('marfil', () => new THREE.MeshStandardMaterial({ color: 0xfff6dc, roughness: 0.4, metalness: 0.05, emissive: 0x3a3020, emissiveIntensity: 0.4 }));
  const oscuro = compartido('oscuro', () => new THREE.MeshStandardMaterial({ color: 0x1a1218, roughness: 0.5, metalness: 0.1 }));
  const nube = compartido('nube', () => new THREE.MeshStandardMaterial({ color: 0xf4ead8, roughness: 0.85, metalness: 0, emissive: 0xffd8b0, emissiveIntensity: 0.12 }));
  const laca = compartido('laca', () => new THREE.MeshPhysicalMaterial({ color: 0xb3121e, roughness: 0.3, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.1, side: THREE.DoubleSide }));
  const segundo = compartido(`segundo-${spec.segundo}-${spec.texturaSegundo ?? ''}`, () =>
    new THREE.MeshStandardMaterial({ color: spec.segundo, roughness: 0.45, metalness: 0.15, map: spec.texturaSegundo ? textura(spec.texturaSegundo) : null }),
  );
  const plumaColor = spec.pluma ?? character.color;
  const pluma = compartido(`pluma-${plumaColor}`, () =>
    new THREE.MeshPhysicalMaterial({
      color: plumaColor,
      roughness: 0.35,
      metalness: 0.2,
      iridescence: 1,
      iridescenceIOR: 1.6,
      iridescenceThicknessRange: [200, 700],
      sheen: 0.6,
      sheenColor: new THREE.Color(0xffe0a0),
      emissive: plumaColor,
      emissiveIntensity: 0.18,
      side: THREE.DoubleSide,
    }),
  );
  const ruedaMat = compartido('rueda', () => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.5 }));
  const MATS: Record<MatKey, THREE.Material> = {
    body: bodyMaterial,
    second: segundo,
    accent: accentMaterial,
    gold: oro,
    ivory: marfil,
    dark: oscuro,
    eye: orbMaterial,
    cloud: nube,
    feather: pluma,
    saddle: laca,
  };
  const SOMBRA: Partial<Record<MatKey, boolean>> = { body: true, second: true, saddle: true };

  // --- esculpir -------------------------------------------------------------------
  const taller = new Taller();
  basesComunes(taller, spec);
  spec.construir(taller);

  let body: THREE.Mesh | null = null;
  interface Onda {
    cfg: OndaCfg;
    geos: THREE.BufferGeometry[];
    base: Float32Array[];
  }
  const ondas: Onda[] = [];
  const alas: { g: THREE.Group; cfg: AlaCfg }[] = [];
  let bola: THREE.Group | null = null;
  for (const [nombre, d] of taller.destinos) {
    let padre: THREE.Object3D = cuerpo;
    if (d.ala || d.bola) {
      const g = new THREE.Group();
      g.name = nombre;
      g.position.copy(d.origin);
      cuerpo.add(g);
      padre = g;
      if (d.ala) alas.push({ g, cfg: d.ala });
      if (d.bola) bola = g;
    }
    const onda: Onda | null = d.onda ? { cfg: d.onda, geos: [], base: [] } : null;
    for (const k of MAT_KEYS) {
      const b = d.batches.get(k);
      if (!b || b.empty) continue;
      const geo = track(b.build());
      const mesh = makeMesh(geo, MATS[k], `${nombre}-${k}`, !!SOMBRA[k]);
      if (k === 'body' && nombre === 'estatico') {
        body = mesh;
        mesh.receiveShadow = true;
      }
      if (onda) {
        geo.computeBoundingSphere();
        if (geo.boundingSphere) geo.boundingSphere.radius *= 1.4;
        onda.geos.push(geo);
        onda.base.push(Float32Array.from((geo.attributes.position as THREE.BufferAttribute).array as Float32Array));
        (geo.attributes.position as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage);
      }
      padre.add(mesh);
    }
    if (onda && onda.geos.length) ondas.push(onda);
  }
  if (!body) {
    body = makeMesh(track(new THREE.BufferGeometry()), bodyMaterial, 'body');
    cuerpo.add(body);
  }

  // --- ruedas de fuego ------------------------------------------------------------
  const wheels: THREE.Object3D[] = [];
  const frontWheels: THREE.Object3D[] = [];
  const wheelRadii: number[] = [];
  const makeWheel = (x: number, y: number, z: number, isFront: boolean) => {
    const r = isFront ? WHEEL_R_F : WHEEL_R_R;
    const pivot = new THREE.Group();
    pivot.position.set(x, y, z);
    const spin = new THREE.Group();
    spin.name = 'wheel';
    spin.add(makeMesh(ruedaFuego(r, isFront ? WHEEL_W_F : WHEEL_W_R), ruedaMat, 'ruedaFuego'));
    pivot.add(spin);
    root.add(pivot);
    wheels.push(spin);
    wheelRadii.push(r);
    if (isFront) frontWheels.push(pivot);
  };
  makeWheel(-WHEEL_X, WHEEL_R_F, WHEEL_Z_F, true);
  makeWheel(WHEEL_X, WHEEL_R_F, WHEEL_Z_F, true);
  makeWheel(-WHEEL_X, WHEEL_R_R, WHEEL_Z_R, false);
  makeWheel(WHEEL_X, WHEEL_R_R, WHEEL_Z_R, false);

  // --- manillar de riendas (gira como el volante) -----------------------------------
  const [sillaY, sillaZ] = spec.silla;
  const steerPivot = new THREE.Group();
  steerPivot.position.set(0, sillaY + 0.2, sillaZ - 0.26);
  steerPivot.rotation.x = -0.53;
  const steeringWheel = new THREE.Group();
  steeringWheel.name = 'steeringWheel';
  const barB = new Batch();
  const barra = new THREE.CylinderGeometry(0.016, 0.016, 0.36, 8);
  barB.add(barra, 0, 0, 0, 0, 0, Math.PI / 2);
  barra.dispose();
  const remate = new THREE.SphereGeometry(0.028, 8, 6);
  barB.add(remate, 0.19, 0, 0);
  barB.add(remate, -0.19, 0, 0);
  remate.dispose();
  const flor = new THREE.TorusGeometry(0.04, 0.012, 6, 14);
  barB.add(flor, 0, 0, 0);
  flor.dispose();
  steeringWheel.add(makeMesh(track(barB.build()), oro, 'riendas'));
  steerPivot.add(steeringWheel);
  root.add(steerPivot);

  // --- piloto ---------------------------------------------------------------------
  const suitMat = mat(new THREE.MeshStandardMaterial({ color: spec.traje, roughness: 0.62, metalness: 0.08 }));
  const helmetMat = mat(new THREE.MeshPhysicalMaterial({ color: character.driverColor, metalness: 0.15, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 }));
  const visorMat = compartido('visor', () => new THREE.MeshPhysicalMaterial({ color: 0x0a1424, metalness: 0.55, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.04 }));
  const driver = new THREE.Group();
  driver.name = 'driver';
  driver.position.set(0, sillaY, sillaZ);
  const suitBatch = new Batch();
  const torso = new THREE.CapsuleGeometry(0.15, 0.1, 3, 12);
  suitBatch.add(torso, 0, 0.2, 0.02, 0, 0, 0, 1.1, 1, 0.75);
  torso.dispose();
  const shoulder = new THREE.SphereGeometry(0.075, 8, 6);
  suitBatch.add(shoulder, 0.2, 0.33, 0.02);
  suitBatch.add(shoulder, -0.2, 0.33, 0.02);
  shoulder.dispose();
  const glove = new THREE.SphereGeometry(0.05, 8, 6);
  for (const sx of [-1, 1]) {
    const upper = limbGeometry(sx * 0.2, 0.33, 0.02, sx * 0.21, 0.2, -0.13, 0.05);
    suitBatch.add(upper);
    upper.dispose();
    const fore = limbGeometry(sx * 0.21, 0.2, -0.13, sx * 0.13, 0.195, -0.26, 0.045);
    suitBatch.add(fore);
    fore.dispose();
    const thigh = limbGeometry(sx * 0.1, 0.02, -0.02, sx * 0.2, -0.06, -0.3, 0.06);
    suitBatch.add(thigh);
    thigh.dispose();
    const shin = limbGeometry(sx * 0.2, -0.06, -0.3, sx * 0.24, -0.26, -0.24, 0.05);
    suitBatch.add(shin);
    shin.dispose();
    suitBatch.add(glove, sx * 0.13, 0.195, -0.27);
  }
  glove.dispose();
  const neck = new THREE.CylinderGeometry(0.05, 0.06, 0.1, 8);
  suitBatch.add(neck, 0, 0.36, 0.02);
  neck.dispose();
  driver.add(makeMesh(track(suitBatch.build()), suitMat, 'suit', true));

  const driverHead = new THREE.Group();
  driverHead.name = 'driverHead';
  driverHead.position.set(0, 0.4, 0.02);
  const helmetGeo = track(new THREE.SphereGeometry(0.155, 16, 12));
  helmetGeo.translate(0, 0.14, 0);
  driverHead.add(makeMesh(helmetGeo, helmetMat, 'helmet', true));
  const visorGeo = track(new THREE.SphereGeometry(0.16, 12, 6, Math.PI * 1.18, Math.PI * 0.64, Math.PI * 0.36, Math.PI * 0.26));
  visorGeo.translate(0, 0.14, 0);
  driverHead.add(makeMesh(visorGeo, visorMat, 'visor'));
  // diadema dorada (金箍) y cuernecillos
  const coronaB = new Batch();
  const diadema = new THREE.TorusGeometry(0.152, 0.014, 5, 22);
  coronaB.add(diadema, 0, 0.2, 0, Math.PI / 2 - 0.15, 0, 0);
  diadema.dispose();
  for (const sx of [-1, 1]) {
    const c = new THREE.ConeGeometry(0.03, 0.2, 6);
    coronaB.add(c, sx * 0.1, 0.27, 0.04, 0.6, 0, sx * -0.5);
    c.dispose();
  }
  driverHead.add(makeMesh(track(coronaB.build()), oro, 'corona'));
  driver.add(driverHead);
  root.add(driver);

  // --- escapes y llamas -------------------------------------------------------------
  const exhausts: THREE.Object3D[] = [];
  const glowGeo = track(new THREE.CircleGeometry(0.056, 12));
  glowGeo.translate(0, 0, 0.235);
  const llamaGeo = track(new THREE.ConeGeometry(0.07, 0.6, 10, 1, true));
  llamaGeo.rotateX(-Math.PI / 2);
  llamaGeo.translate(0, 0, 0.56);
  const nucleoGeo = track(new THREE.ConeGeometry(0.028, 0.24, 8, 1, true));
  nucleoGeo.rotateX(-Math.PI / 2);
  nucleoGeo.translate(0, 0, 0.38);
  const nucleoMat = compartido('nucleo', () => new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  const flames: THREE.Object3D[] = [];
  for (const [x, y, z] of spec.escapes ?? [[-0.17, 0.42, 0.76], [0.17, 0.42, 0.76]]) {
    const g = new THREE.Group();
    g.name = 'exhaust';
    g.position.set(x, y, z);
    g.rotation.x = -0.16;
    g.add(makeMesh(glowGeo, exhaustGlowMaterial, 'exhaustGlow'));
    const f = new THREE.Group();
    f.name = 'llama';
    f.add(makeMesh(llamaGeo, flameMaterial, 'llama'), makeMesh(nucleoGeo, nucleoMat, 'llamaNucleo'));
    g.add(f);
    root.add(g);
    exhausts.push(g);
    flames.push(f);
  }

  // --- aliento (fuego, agua o chispas según la criatura) solo con el turbo ------------
  const alientoMat = mat(new THREE.MeshBasicMaterial({ color: spec.aliento, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  const aliento = new THREE.Group();
  aliento.name = 'aliento';
  aliento.position.set(spec.boca[0], spec.boca[1], spec.boca[2]);
  aliento.rotation.set(0.12, Math.PI, 0);
  const alientoGeo = track(new THREE.ConeGeometry(0.1, 0.55, 10, 1, true));
  alientoGeo.rotateX(-Math.PI / 2);
  alientoGeo.translate(0, 0, 0.27);
  const alientoNucleo = track(new THREE.ConeGeometry(0.04, 0.3, 8, 1, true));
  alientoNucleo.rotateX(-Math.PI / 2);
  alientoNucleo.translate(0, 0, 0.15);
  aliento.add(makeMesh(alientoGeo, alientoMat, 'alientoLlama'), makeMesh(alientoNucleo, nucleoMat, 'alientoNucleo'));
  aliento.visible = false;
  aliento.scale.setScalar(0.01);
  cuerpo.add(aliento);

  // --- estela de nubes xiangyun al derrapar ------------------------------------------
  const ESTELA = 12;
  const VIDA = 0.75;
  const estelaMat = compartido(`estela-${character.accent}`, () => {
    const c = new THREE.Color(0xffffff).lerp(new THREE.Color(character.accent), 0.25);
    return new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.55, roughness: 1, transparent: true, opacity: 0.85, depthWrite: false });
  });
  const estela = new THREE.InstancedMesh(nubeEstela(), estelaMat, ESTELA);
  estela.name = 'estelaNubes';
  estela.frustumCulled = false;
  estela.castShadow = false;
  estela.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const puffs = Array.from({ length: ESTELA }, () => ({ vida: 0, pos: new THREE.Vector3(), rot: 0 }));
  let puffSig = 0;
  let puffAcum = 0;
  let estelaVisible = false;
  const _w = new THREE.Vector3();
  const _o = new THREE.Object3D();
  const ocultarEstela = () => {
    estela.count = 0;
    estela.visible = false;
    estelaVisible = false;
  };
  ocultarEstela();

  // --- animación -------------------------------------------------------------------
  let giro = 0;
  let girosBola = 0;
  const animate = (dt: number, time: number, steer: number, speed01: number, boost: number, drift: number) => {
    dt = Math.min(Math.max(dt, 0), 0.1);
    // respiración: el pecho sube y baja; más rápido cuanto más corre
    const resp = Math.sin(time * (2.2 + speed01 * 4));
    cuerpo.scale.set(1 + resp * 0.006, 1 + resp * 0.014, 1);
    // dirección suavizada (el derrape abre más la cola)
    const objetivo = steer + drift * 0.6;
    giro += (objetivo - giro) * Math.min(1, dt * 6);

    for (const o of ondas) {
      const c = o.cfg;
      const amp = c.amp * (0.45 + 0.75 * speed01);
      const f = c.freq * (0.7 + 0.6 * speed01);
      const lateral = -giro * c.giro;
      for (let gi = 0; gi < o.geos.length; gi++) {
        const attr = o.geos[gi].attributes.position as THREE.BufferAttribute;
        const arr = attr.array as Float32Array;
        const base = o.base[gi];
        for (let i = 0; i < arr.length; i += 3) {
          const bx = base[i];
          const by = base[i + 1];
          const bz = base[i + 2];
          const coord = c.eje === 'z' ? bz : by;
          let w = (coord - c.o) / c.len;
          if (w <= 0) {
            arr[i] = bx;
            arr[i + 1] = by;
            arr[i + 2] = bz;
            continue;
          }
          if (w > 1.5) w = 1.5;
          const w2 = w * w;
          const ox = (Math.sin(time * f - w * 3.2) * amp + lateral) * w2;
          const ov = Math.cos(time * f * 0.8 - w * 2.6) * amp * c.vert * w2;
          arr[i] = bx + ox;
          if (c.eje === 'z') {
            arr[i + 1] = by + ov;
            arr[i + 2] = bz;
          } else {
            arr[i + 1] = by;
            arr[i + 2] = bz + ov;
          }
        }
        attr.needsUpdate = true;
      }
    }

    for (const { g, cfg } of alas) {
      const f = cfg.freq * (0.6 + 0.8 * speed01) + boost * 3;
      const bate = Math.sin(time * f) * cfg.amp * (0.5 + 0.6 * speed01);
      // al girar, el ala interior baja y la exterior sube (alabeo)
      const alabeo = giro * 0.25 * cfg.lado;
      g.rotation.z = cfg.lado * (cfg.base + bate + boost * 0.2) + alabeo;
      g.rotation.y = cfg.lado * (speed01 * 0.18 + boost * 0.12);
    }

    if (bola) {
      girosBola -= dt * speed01 * 40;
      bola.rotation.x = girosBola;
    }

    // aliento con el turbo
    if (boost > 0.03) {
      const parpadeo = 0.8 + 0.2 * Math.sin(time * 41) * Math.sin(time * 27 + 1);
      aliento.visible = true;
      const a = boost * parpadeo;
      aliento.scale.set(0.6 + a * 0.7, 0.6 + a * 0.7, 0.2 + a * 1.4);
      alientoMat.opacity = 0.35 + 0.5 * a;
    } else if (aliento.visible) {
      aliento.visible = false;
    }

    // estela de nubes
    let escena: THREE.Object3D = root;
    while (escena.parent) escena = escena.parent;
    if (escena === root) return;
    if (drift !== 0 && speed01 > 0.2) {
      if (estela.parent !== escena) escena.add(estela);
      puffAcum += dt;
      while (puffAcum > 0.05) {
        puffAcum -= 0.05;
        const p = puffs[puffSig];
        puffSig = (puffSig + 1) % ESTELA;
        const rueda = wheels[2 + (puffSig % 2)].parent;
        if (!rueda) continue;
        rueda.getWorldPosition(_w);
        p.pos.copy(_w);
        p.pos.y += 0.05;
        p.vida = VIDA;
        p.rot = Math.random() * Math.PI * 2;
      }
    } else {
      puffAcum = 0;
    }
    let vivos = 0;
    for (const p of puffs) {
      if (p.vida <= 0) continue;
      p.vida -= dt;
      if (p.vida <= 0) continue;
      const k = 1 - p.vida / VIDA;
      p.pos.y += dt * 0.35;
      _o.position.copy(p.pos);
      _o.rotation.set(0, p.rot + k * 1.5, 0);
      _o.scale.setScalar(Math.sin(Math.PI * Math.min(1, k * 1.2)) * (0.9 + k * 0.8));
      _o.updateMatrix();
      estela.setMatrixAt(vivos++, _o.matrix);
    }
    if (vivos > 0) {
      estela.count = vivos;
      estela.instanceMatrix.needsUpdate = true;
      estela.visible = true;
      estelaVisible = true;
    } else if (estelaVisible) {
      ocultarEstela();
    }
  };

  const dispose = () => {
    for (const g of geometries) g.dispose();
    for (const m of materials) m.dispose();
    geometries.clear();
    materials.clear();
    estela.removeFromParent();
    estela.dispose();
    root.removeFromParent();
  };

  return {
    root,
    body,
    wheels,
    frontWheels,
    steeringWheel,
    driver,
    driverHead,
    exhausts,
    bodyMaterial,
    accentMaterial,
    exhaustGlowMaterial,
    wheelRadii,
    dispose,
    flames,
    flameMaterial,
    orbMaterial,
    animate,
  };
}
