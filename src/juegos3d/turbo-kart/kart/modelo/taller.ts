/**
 * Taller: API para esculpir los vehículos-criatura con primitivas.
 *
 * Todo lo que se añade queda en espacio del vehículo (mira hacia -Z, ruedas en y = 0) y va a parar
 * a una de cuatro «capas» (= una llamada de dibujo cada una): uber (oro, laca, jade, chasis,
 * piloto, ruedas...), body (pellejo texturizado de la criatura), accent (crines y aletas que
 * cambian de color con el derrape) y orb (ojos y perlas que laten). Cada pieza se ata a un hueso:
 * el vehículo entero es una malla con esqueleto, así que colas, alas, cabeza, ruedas, piloto y
 * manillar se mueven en la GPU sin crear más llamadas de dibujo.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export type V3 = [number, number, number];
export type Capa = 'uber' | 'body' | 'accent' | 'orb' | 'velo';
export const CAPAS: Capa[] = ['uber', 'body', 'accent', 'orb', 'velo'];

/** Acabado de una pieza: capa, color y PBR por vértice. */
export interface Acabado {
  capa: Capa;
  color: number;
  /** metalizado 0..1 */
  m?: number;
  /** rugosidad 0..1 */
  r?: number;
  /** emisión (multiplica el color) */
  e?: number;
  /** iridiscencia 0..1 */
  i?: number;
  /** Degradado a lo largo de la pieza (y local): color y emisión en la punta. */
  grad?: number;
  eTip?: number;
}

export interface AlaCfg {
  lado: number;
  base: number;
  amp: number;
  freq: number;
  /** Eje del aleteo: 'z' (alas, por defecto) o 'y' (aletas que reman hacia atrás). */
  eje?: 'z' | 'y';
}

export interface CadenaCfg {
  /** Eje a lo largo del cual crece la cadena: 'z' (hacia atrás), '-z' (hacia delante) o 'y' (hacia arriba). */
  eje: 'z' | '-z' | 'y';
  /** Coordenada donde empieza (raíz) y longitud. */
  o: number;
  len: number;
  /** Amplitud angular por hueso (rad) y frecuencia (rad/s). */
  amp: number;
  freq: number;
  /** Cuánto se abre hacia fuera al girar (rad por unidad de giro). */
  giro: number;
  /** Ondulación en el otro plano, relativa a amp. */
  vert: number;
  /** Número de huesos (por defecto 4). */
  n?: number;
  /** Hueso padre (por defecto 'cuerpo'). */
  padre?: string;
  /** Desfase por hueso (rad). */
  fase?: number;
}

export interface HuesoDef {
  nombre: string;
  padre: string | null;
  pivote: THREE.Vector3;
  /** Objeto externo (grupo del piloto, rueda...) del que cuelga el hueso. */
  externo?: THREE.Object3D;
  ala?: AlaCfg;
  cadena?: { cfg: CadenaCfg; k: number; n: number };
}

interface Parte {
  geo: THREE.BufferGeometry;
  capa: Capa;
  hueso: string;
  cadena: string | null;
}

const _m = new THREE.Matrix4();
const _m2 = new THREE.Matrix4();
const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _x = new THREE.Vector3();
const _y = new THREE.Vector3();
const _z = new THREE.Vector3();
const _c = new THREE.Color();

// --- geometrías unitarias compartidas (no se liberan) ----------------------------
let _unid: { cono: THREE.BufferGeometry; esf: THREE.BufferGeometry; cil: THREE.BufferGeometry; bola: THREE.BufferGeometry; bolaM: THREE.BufferGeometry; bolaB: THREE.BufferGeometry } | null = null;
export function unidades() {
  if (!_unid) {
    const cono = new THREE.ConeGeometry(1, 1, 7);
    cono.translate(0, 0.5, 0);
    const esf = new THREE.SphereGeometry(1, 8, 6);
    esf.scale(1, 0.5, 1);
    esf.translate(0, 0.5, 0);
    const cil = new THREE.CylinderGeometry(1, 1, 1, 7);
    cil.translate(0, 0.5, 0);
    const bola = new THREE.SphereGeometry(1, 18, 12);
    const bolaM = new THREE.SphereGeometry(1, 12, 8);
    const bolaB = new THREE.SphereGeometry(1, 8, 6);
    _unid = { cono, esf, cil, bola, bolaM, bolaB };
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

/**
 * Tubo orgánico a lo largo de una curva. `radio(t)` devuelve [ancho, alto] de la sección elíptica
 * en t∈[0,1]; `torsion` gira la sección. UV: u a lo largo (una vuelta = 1), v alrededor.
 */
export function sweep(pts: V3[], radio: (t: number) => [number, number], seg = 16, radial = 10, cerrado = true): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  const L = curve.getLength();
  let rMed = 0;
  for (let i = 0; i <= 4; i++) {
    const [a, b] = radio(i / 4);
    rMed += (a + b) * 0.5;
  }
  rMed = Math.max(0.01, rMed / 5);
  const uK = L / (Math.PI * 2 * rMed);
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
  // marco que se propaga (evita giros bruscos)
  curve.getTangentAt(0, T);
  ref.set(0, 1, 0);
  if (Math.abs(T.y) > 0.92) ref.set(0, 0, 1);
  S.crossVectors(T, ref).normalize();
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    curve.getPointAt(t, P);
    curve.getTangentAt(t, T);
    U.crossVectors(S, T).normalize();
    S.crossVectors(T, U).normalize();
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
      uv.push(t * uK, j / radial);
    }
  }
  for (let i = 0; i < seg; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * ring + j;
      const b = (i + 1) * ring + j;
      idx.push(a, b, b + 1, a, b + 1, a + 1);
    }
  }
  if (cerrado) {
    for (const fin of [0, 1]) {
      curve.getPointAt(fin, P);
      curve.getTangentAt(fin, T);
      const c0 = pos.length / 3;
      pos.push(P.x, P.y, P.z);
      const sg = fin ? 1 : -1;
      nor.push(T.x * sg, T.y * sg, T.z * sg);
      uv.push(fin * uK, 0.5);
      const base = fin ? seg * ring : 0;
      for (let j = 0; j < radial; j++) {
        if (fin) idx.push(c0, base + j + 1, base + j);
        else idx.push(c0, base + j, base + j + 1);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/** Cápsula orientada de a a b (brazos, patas). */
export function limbGeometry(ax: number, ay: number, az: number, bx: number, by: number, bz: number, radius: number, radial = 7) {
  const dir = new THREE.Vector3(bx - ax, by - ay, bz - az);
  const len = dir.length();
  const g = new THREE.CapsuleGeometry(radius, Math.max(0.001, len), 2, radial);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  g.applyQuaternion(q);
  g.translate((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
  return g;
}

const lerpN = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export class Taller {
  private partes: Parte[] = [];
  private readonly huesos = new Map<string, HuesoDef>();
  private readonly cadenas = new Map<string, CadenaCfg>();
  private hueso = 'cuerpo';
  private cadena: string | null = null;
  private marcoM: THREE.Matrix4 | null = null;
  private readonly _t = new THREE.Matrix4();
  /** Versión lejana (LOD): menos segmentos y sin detalles pequeños. */
  bajo = false;
  /** Detalles finos (rizos, bigotes, tacos...): no existen en la versión lejana. */
  det(fn: () => void): this {
    if (!this.bajo) fn();
    return this;
  }
  /** Funciones de color por pieza (manchas de koi, degradados). */
  pintor: ((x: number, y: number, z: number, base: THREE.Color) => void) | null = null;

  constructor(public paleta: Record<string, Acabado>) {
    this.huesos.set('raiz', { nombre: 'raiz', padre: null, pivote: new THREE.Vector3(0, 0, 0) });
    this.huesos.set('cuerpo', { nombre: 'cuerpo', padre: 'raiz', pivote: new THREE.Vector3(0, 0.3, 0) });
  }

  // --- huesos ----------------------------------------------------------------------
  /** Declara (si no existe) y selecciona un hueso. */
  declarar(nombre: string, padre: string | null, pivote: V3 | THREE.Vector3, extra?: Partial<HuesoDef>): this {
    if (!this.huesos.has(nombre)) {
      const p = Array.isArray(pivote) ? new THREE.Vector3(pivote[0], pivote[1], pivote[2]) : pivote.clone();
      this.huesos.set(nombre, { nombre, padre, pivote: p, ...extra });
    }
    return this.usar(nombre);
  }
  usar(nombre: string): this {
    this.hueso = nombre;
    this.cadena = null;
    return this;
  }
  estatico(): this {
    return this.usar('cuerpo');
  }
  chasis(): this {
    return this.usar('raiz');
  }
  cabeza(pivote: V3): this {
    return this.declarar('cabeza', 'cuerpo', pivote);
  }
  ala(lado: number, pivote: V3, cfg: Omit<AlaCfg, 'lado'>, padre = 'cuerpo'): this {
    return this.declarar(`ala${lado}`, padre, pivote, { ala: { lado, ...cfg } });
  }
  bola(centro: V3): this {
    return this.declarar('bola', 'raiz', centro);
  }
  /** Cadena de huesos (cola, bigotes, serpiente): las piezas siguientes se doblan a lo largo. */
  onda(nombre: string, cfg: CadenaCfg): this {
    this.cadenas.set(nombre, cfg);
    this.cadena = nombre;
    return this;
  }
  /** Pre-transformación para las piezas siguientes (p. ej. coordenadas locales del piloto). */
  marco(m: THREE.Matrix4 | null): this {
    this.marcoM = m ? m.clone() : null;
    return this;
  }

  // --- piezas ----------------------------------------------------------------------
  private acabado(k: string | Acabado): Acabado {
    if (typeof k !== 'string') return k;
    const a = this.paleta[k];
    if (!a) throw new Error(`acabado desconocido: ${k}`);
    return a;
  }

  /** Añade una geometría (no la libera) con una matriz en espacio del vehículo. */
  addM(k: string | Acabado, geo: THREE.BufferGeometry, m: THREE.Matrix4): this {
    const ac = this.acabado(k);
    const g = geo.index ? geo.clone() : geo.clone();
    if (!g.index) {
      const n = g.attributes.position.count;
      const ix: number[] = [];
      for (let i = 0; i < n; i++) ix.push(i);
      g.setIndex(ix);
    }
    for (const name of Object.keys(g.attributes)) if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    let yMin = Infinity;
    let yMax = -Infinity;
    if (ac.grad !== undefined) {
      const lp = g.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < lp.count; i++) {
        yMin = Math.min(yMin, lp.getY(i));
        yMax = Math.max(yMax, lp.getY(i));
      }
    }
    const yLoc = ac.grad !== undefined ? Float32Array.from({ length: g.attributes.position.count }, (_, i) => (g.attributes.position.getY(i) - yMin) / Math.max(1e-5, yMax - yMin)) : null;
    g.applyMatrix4(this.marcoM ? this._t.multiplyMatrices(this.marcoM, m) : m);
    if (this.bajo) {
      g.computeBoundingSphere();
      if ((g.boundingSphere?.radius ?? 1) < 0.03) {
        g.dispose();
        return this;
      }
    }
    const n = g.attributes.position.count;
    const tip = ac.grad !== undefined ? new THREE.Color(ac.grad) : null;
    const col = new Float32Array(n * 3);
    const pbr = new Float32Array(n * 4);
    const base = new THREE.Color(ac.color);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < n; i++) {
      _c.copy(base);
      if (tip && yLoc) _c.lerp(tip, yLoc[i]);
      if (this.pintor && ac.capa === 'body') this.pintor(pos.getX(i), pos.getY(i), pos.getZ(i), _c);
      col[i * 3] = _c.r;
      col[i * 3 + 1] = _c.g;
      col[i * 3 + 2] = _c.b;
      pbr[i * 4] = ac.m ?? 0.1;
      pbr[i * 4 + 1] = ac.r ?? 0.45;
      pbr[i * 4 + 2] = yLoc && ac.eTip !== undefined ? lerpN(ac.e ?? 0, ac.eTip, yLoc[i]) : ac.e ?? 0;
      pbr[i * 4 + 3] = ac.i ?? 0;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('pbr', new THREE.BufferAttribute(pbr, 4));
    this.partes.push({ geo: g, capa: ac.capa, hueso: this.hueso, cadena: this.cadena });
    return this;
  }
  add(k: string | Acabado, geo: THREE.BufferGeometry, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1): this {
    _m.compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));
    return this.addM(k, geo, _m);
  }
  /** Elipsoide de radios (rx, ry, rz) en (x, y, z). */
  esf(k: string | Acabado, x: number, y: number, z: number, rx: number, ry = rx, rz = rx, ax = 0, ay = 0, az = 0): this {
    const u = unidades();
    const r = Math.max(rx, ry, rz);
    const geo = this.bajo ? (r < 0.13 ? u.bolaB : u.bolaM) : r < 0.05 ? u.bolaB : r < 0.13 ? u.bolaM : u.bola;
    return this.add(k, geo, x, y, z, ax, ay, az, rx, ry, rz);
  }
  /** Pieza unitaria orientada de a a b (cono = cuernos, garras, llamas; esf = plumas, aletas; cil = barras). */
  pieza(k: string | Acabado, forma: 'cono' | 'esf' | 'cil', a: V3, b: V3, sx: number, sz = sx, hint: V3 = [0, 1, 0]): this {
    return this.addM(k, unidades()[forma], matrizPieza(a, b, sx, sz, hint));
  }
  tubo(k: string | Acabado, pts: V3[], radio: (t: number) => [number, number], seg = 16, radial = 10): this {
    if (this.bajo) {
      seg = Math.max(4, Math.ceil(seg / 2));
      radial = Math.max(4, Math.ceil(radial * 0.6));
    }
    const g = sweep(pts, radio, seg, radial);
    this.add(k, g);
    g.dispose();
    return this;
  }
  toro(k: string | Acabado, R: number, r: number, x: number, y: number, z: number, ax = 0, ay = 0, az = 0, arc = Math.PI * 2, sx = 1, sy = 1, sz = 1, seg = 16): this {
    const g = this.bajo ? new THREE.TorusGeometry(R, r, 3, Math.max(6, Math.ceil(seg / 2)), arc) : new THREE.TorusGeometry(R, r, r < 0.022 ? 4 : 6, seg, arc);
    this.add(k, g, x, y, z, ax, ay, az, sx, sy, sz);
    g.dispose();
    return this;
  }
  caja(k: string | Acabado, w: number, h: number, d: number, x: number, y: number, z: number, ax = 0, ay = 0, az = 0): this {
    const g = new THREE.BoxGeometry(w, h, d);
    this.add(k, g, x, y, z, ax, ay, az);
    g.dispose();
    return this;
  }
  /** Sólido de revolución alrededor de Y: perfil [radio, altura][]. */
  torno(k: string | Acabado, perfil: [number, number][], x: number, y: number, z: number, ax = 0, ay = 0, az = 0, seg = 16, sx = 1, sy = 1, sz = 1): this {
    const g = new THREE.LatheGeometry(perfil.map(([r, h]) => new THREE.Vector2(r, h)), this.bajo ? Math.max(6, Math.ceil(seg / 2)) : seg);
    this.add(k, g, x, y, z, ax, ay, az, sx, sy, sz);
    g.dispose();
    return this;
  }
  /** Lo mismo a ambos lados (x → ±x). */
  par(fn: (lado: number) => void): this {
    fn(-1);
    fn(1);
    return this;
  }

  // --- montaje ---------------------------------------------------------------------
  /**
   * Calcula las articulaciones de las cadenas, los pesos de piel y fusiona cada capa. Devuelve los
   * huesos en el orden de sus índices.
   */
  montar(): { geos: Map<Capa, THREE.BufferGeometry>; huesos: HuesoDef[] } {
    // articulaciones de cada cadena a partir de sus vértices
    const coord = (cfg: CadenaCfg, x: number, y: number, z: number) => (cfg.eje === 'y' ? y : cfg.eje === 'z' ? z : -z);
    for (const [nombre, cfg] of this.cadenas) {
      const n = cfg.n ?? 4;
      const sum = Array.from({ length: n }, () => new THREE.Vector3());
      const cnt = new Array(n).fill(0);
      for (const p of this.partes) {
        if (p.cadena !== nombre) continue;
        const pos = p.geo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          const w = (coord(cfg, x, y, z) - cfg.o) / cfg.len;
          for (let k = 0; k < n; k++) {
            const lo = k === 0 ? -0.15 : k / n - 0.5 / n;
            if (w >= lo && w < k / n + 0.5 / n) {
              sum[k].x += x;
              sum[k].y += y;
              sum[k].z += z;
              cnt[k]++;
            }
          }
        }
      }
      const piv: (THREE.Vector3 | null)[] = sum.map((s, k) => (cnt[k] ? s.multiplyScalar(1 / cnt[k]) : null));
      // huecos: interpola o extrapola sobre el eje
      for (let k = 0; k < n; k++) {
        if (piv[k]) continue;
        const prev = piv.slice(0, k).reverse().find((v) => v);
        const v = prev ? prev.clone() : new THREE.Vector3();
        const d = cfg.len / n;
        if (cfg.eje === 'y') v.y += d;
        else v.z += cfg.eje === 'z' ? d : -d;
        piv[k] = v;
      }
      for (let k = 0; k < n; k++) {
        const nm = `${nombre}${k}`;
        this.huesos.set(nm, { nombre: nm, padre: k === 0 ? cfg.padre ?? 'cuerpo' : `${nombre}${k - 1}`, pivote: piv[k] as THREE.Vector3, cadena: { cfg, k, n } });
      }
    }
    const lista = [...this.huesos.values()];
    const indice = new Map<string, number>();
    lista.forEach((h, i) => indice.set(h.nombre, i));

    const porCapa = new Map<Capa, THREE.BufferGeometry[]>();
    const informe: Record<string, number> = {};
    for (const p of this.partes) {
      const kk = `${p.capa}:${p.cadena ?? p.hueso}`;
      informe[kk] = (informe[kk] ?? 0) + (p.geo.index ? p.geo.index.count / 3 : 0);
      const n = p.geo.attributes.position.count;
      const si = new Uint16Array(n * 4);
      const sw = new Float32Array(n * 4);
      if (p.cadena) {
        const cfg = this.cadenas.get(p.cadena) as CadenaCfg;
        const nb = cfg.n ?? 4;
        const padre = indice.get(cfg.padre ?? 'cuerpo') ?? 0;
        const pos = p.geo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < n; i++) {
          const w = (coord(cfg, pos.getX(i), pos.getY(i), pos.getZ(i)) - cfg.o) / cfg.len;
          const s = Math.max(0, Math.min(nb - 1e-3, w * nb));
          const k = Math.floor(s);
          const f = s - k;
          const idxK = indice.get(`${p.cadena}${k}`) ?? 0;
          const idxPrev = k === 0 ? padre : indice.get(`${p.cadena}${k - 1}`) ?? 0;
          const idxNext = k + 1 < nb ? indice.get(`${p.cadena}${k + 1}`) ?? idxK : idxK;
          let wPrev = (1 - smooth(0, 0.5, f)) * 0.5;
          if (k === 0 && w < 0) wPrev = 1;
          const wNext = k + 1 < nb ? smooth(0.5, 1, f) * 0.5 : 0;
          const wK = Math.max(0, 1 - wPrev - wNext);
          si[i * 4] = idxK;
          sw[i * 4] = wK;
          si[i * 4 + 1] = idxPrev;
          sw[i * 4 + 1] = wPrev;
          si[i * 4 + 2] = idxNext;
          sw[i * 4 + 2] = wNext;
        }
      } else {
        const idx = indice.get(p.hueso) ?? 0;
        for (let i = 0; i < n; i++) {
          si[i * 4] = idx;
          sw[i * 4] = 1;
        }
      }
      p.geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
      p.geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
      let arr = porCapa.get(p.capa);
      if (!arr) porCapa.set(p.capa, (arr = []));
      arr.push(p.geo);
    }
    const geos = new Map<Capa, THREE.BufferGeometry>();
    for (const [capa, arr] of porCapa) {
      const merged = mergeGeometries(arr, false);
      for (const g of arr) g.dispose();
      if (merged) geos.set(capa, merged);
    }
    this.partes = [];
    (globalThis as unknown as { __tallerInforme?: unknown }).__tallerInforme = informe;
    return { geos, huesos: lista };
  }
}
