/**
 * Estelas de turbo: dos hebras de luz por escape que se enroscan como la cola
 * de un dragón (o se abren como plumas de fénix), con núcleo blanco y
 * degradado de color. Todas las estelas de todos los karts van en UN solo
 * buffer y una sola llamada de dibujo (aditiva, sin escribir profundidad).
 *
 * Cada vértice guarda el punto central de la cinta y su tangente; el vertex
 * shader la orienta hacia `cameraPosition`, así que funciona igual en cada
 * cuadrante de la pantalla partida (cada cámara la ve de cara).
 */
import * as THREE from 'three';
import type { IKart, KartState } from '../core/types';
import { BOOST_STYLES, type BoostTier } from './boostStyles';

const POINTS = 26; // puntos por hebra (el 0 es el escape, pegado al kart)
const STRANDS_PER_KART = 4; // 2 escapes × 2 hebras
const SAMPLE_DT = 1 / 55;

const TRAIL_VERTEX = /* glsl */ `
attribute vec3 aTangent;
attribute vec4 aData;   // lado (−1/1), edad normalizada, anchura, alfa
attribute vec3 aColor;
varying vec3 vColor;
varying float vAcross;
varying float vAge;
varying float vAlpha;
void main() {
  vec3 toCam = cameraPosition - position;
  // Se desvanece cerca de la cámara: la cinta no tapa la pantalla al pasar por debajo.
  float camFade = smoothstep(1.6, 4.2, length(toCam));
  vec3 side = cross(aTangent, toCam);
  float l = length(side);
  side = l > 1e-5 ? side / l : vec3(1.0, 0.0, 0.0);
  vec3 p = position + side * aData.x * aData.z;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
  vColor = aColor;
  vAcross = aData.x;
  vAge = aData.y;
  vAlpha = aData.w * camFade;
}
`;

const TRAIL_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAcross;
varying float vAge;
varying float vAlpha;
void main() {
  if (vAlpha <= 0.002) discard;
  float d = abs(vAcross);
  float glow = 1.0 - smoothstep(0.0, 1.0, d);
  glow *= glow;
  // Núcleo blanco que se apaga a lo largo de la estela.
  float core = exp(-d * d * 26.0) * (1.0 - smoothstep(0.0, 0.75, vAge));
  vec3 col = vColor * glow + vec3(1.0, 0.95, 0.86) * core * 0.7;
  gl_FragColor = vec4(col, vAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function hexToLinear(hex: number, out: Float32Array, o: number): void {
  out[o] = srgbToLinear(((hex >> 16) & 255) / 255);
  out[o + 1] = srgbToLinear(((hex >> 8) & 255) / 255);
  out[o + 2] = srgbToLinear((hex & 255) / 255);
}

/** Historial de un kart: posiciones de los dos escapes, instante e intensidad. */
interface KartTrail {
  hist: Float32Array; // POINTS × 2 escapes × 3
  right: Float32Array; // POINTS × 3 (vector lateral del kart al muestrear)
  times: Float32Array; // POINTS
  inten: Float32Array; // POINTS
  head: number;
  count: number;
  lastSample: number;
  tier: BoostTier;
  live: boolean; // queda algo visible
  zeroed: boolean; // los vértices ya están a alfa 0
  level: number; // intensidad suavizada del turbo
}

export class BoostTrails {
  readonly mesh: THREE.Mesh;
  private readonly geometry: THREE.BufferGeometry;
  private readonly material: THREE.ShaderMaterial;
  private readonly maxKarts: number;
  private readonly trails: KartTrail[] = [];
  private readonly pos: Float32Array;
  private readonly tan: Float32Array;
  private readonly data: Float32Array;
  private readonly col: Float32Array;
  private readonly attrs: THREE.BufferAttribute[];
  private readonly exhaustCache = new WeakMap<THREE.Object3D, THREE.Object3D[]>();
  private readonly colA = new Float32Array(BOOST_STYLES.length * 3);
  private readonly colB = new Float32Array(BOOST_STYLES.length * 3);
  private readonly v = new THREE.Vector3();
  /** Bocas de los dos escapes del último kart calculado (las usa ParticleSystem). */
  readonly exhaustWorld = [new THREE.Vector3(), new THREE.Vector3()];
  private readonly ex = this.exhaustWorld;
  /** Multiplicador global de la opacidad de las estelas. */
  intensity = 1;

  constructor(maxKarts: number) {
    this.maxKarts = maxKarts;
    const strands = maxKarts * STRANDS_PER_KART;
    const verts = strands * POINTS * 2;
    this.pos = new Float32Array(verts * 3);
    this.tan = new Float32Array(verts * 3);
    this.data = new Float32Array(verts * 4);
    this.col = new Float32Array(verts * 3);
    for (let i = 0; i < maxKarts; i++) {
      this.trails.push({
        hist: new Float32Array(POINTS * 6),
        right: new Float32Array(POINTS * 3),
        times: new Float32Array(POINTS),
        inten: new Float32Array(POINTS),
        head: 0, count: 0, lastSample: -1, tier: 0, live: false, zeroed: true, level: 0,
      });
    }
    BOOST_STYLES.forEach((s, i) => {
      hexToLinear(s.a, this.colA, i * 3);
      hexToLinear(s.b, this.colB, i * 3);
    });

    const idx: number[] = [];
    for (let s = 0; s < strands; s++) {
      const base = s * POINTS * 2;
      for (let i = 0; i < POINTS - 1; i++) {
        const a = base + i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const geometry = new THREE.BufferGeometry();
    const mk = (arr: Float32Array, n: number): THREE.BufferAttribute => {
      const at = new THREE.BufferAttribute(arr, n);
      at.setUsage(THREE.DynamicDrawUsage);
      return at;
    };
    const aPos = mk(this.pos, 3);
    const aTan = mk(this.tan, 3);
    const aData = mk(this.data, 4);
    const aCol = mk(this.col, 3);
    geometry.setAttribute('position', aPos);
    geometry.setAttribute('aTangent', aTan);
    geometry.setAttribute('aData', aData);
    geometry.setAttribute('aColor', aCol);
    geometry.setIndex(idx);
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.attrs = [aPos, aTan, aData, aCol];
    this.geometry = geometry;

    this.material = new THREE.ShaderMaterial({
      vertexShader: TRAIL_VERTEX,
      fragmentShader: TRAIL_FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: false,
    });
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.name = 'BoostTrails';
    mesh.frustumCulled = false;
    mesh.matrixAutoUpdate = false;
    mesh.renderOrder = 18;
    mesh.visible = false;
    this.mesh = mesh;
  }

  setTier(slot: number, tier: BoostTier): void {
    if (slot >= 0 && slot < this.maxKarts) this.trails[slot].tier = tier;
  }

  /** Calcula `exhaustWorld` para un kart. */
  computeExhausts(kart: IKart): void {
    this.exhausts(kart, kart.state);
  }

  /** Posiciones de los dos escapes en el mundo (del modelo si existe; si no, estimadas). */
  private exhausts(kart: IKart, st: KartState): void {
    let list = this.exhaustCache.get(kart.object);
    if (!list) {
      list = [];
      kart.object.traverse((o) => { if (o.name === 'exhaust') list!.push(o); });
      this.exhaustCache.set(kart.object, list);
    }
    if (list.length >= 2) {
      for (let i = 0; i < 2; i++) {
        const e = list[i];
        e.updateWorldMatrix(true, false);
        // la boca del tubo: un poco hacia +Z local
        this.ex[i].set(0, 0, 0.12).applyMatrix4(e.matrixWorld);
      }
      return;
    }
    const h = st.heading;
    const fx = -Math.sin(h), fz = -Math.cos(h);
    const rx = Math.cos(h), rz = -Math.sin(h);
    const s = st.isShrunk ? 0.6 : 1;
    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? -1 : 1;
      this.ex[i].set(st.position.x - fx * 0.95 * s + rx * 0.22 * side * s, st.position.y + 0.4 * s, st.position.z - fz * 0.95 * s + rz * 0.22 * side * s);
    }
  }

  update(now: number, karts: readonly IKart[], slotOf: (id: number) => number): void {
    let anyLive = false;
    for (let k = 0; k < karts.length; k++) {
      const kart = karts[k];
      const st = kart.state;
      const slot = slotOf(st.id);
      if (slot >= this.maxKarts) continue;
      const tr = this.trails[slot];
      const style = BOOST_STYLES[tr.tier];
      // Intensidad: entra de golpe, se apaga en los últimos 0.25 s del turbo.
      const target = st.isBoosting ? Math.min(1, 0.35 + st.boostTimer / 0.25) : 0;
      tr.level = target > tr.level ? target : Math.max(target, tr.level - 0.05);
      if (!st.isBoosting && !tr.live) continue;

      this.exhausts(kart, st);
      if (now - tr.lastSample >= SAMPLE_DT || tr.count === 0) {
        const i = tr.head;
        const h = tr.hist;
        h[i * 6] = this.ex[0].x; h[i * 6 + 1] = this.ex[0].y; h[i * 6 + 2] = this.ex[0].z;
        h[i * 6 + 3] = this.ex[1].x; h[i * 6 + 4] = this.ex[1].y; h[i * 6 + 5] = this.ex[1].z;
        tr.right[i * 3] = Math.cos(st.heading); tr.right[i * 3 + 1] = 0; tr.right[i * 3 + 2] = -Math.sin(st.heading);
        tr.times[i] = now;
        tr.inten[i] = tr.level;
        tr.head = (i + 1) % POINTS;
        if (tr.count < POINTS) tr.count++;
        tr.lastSample = now;
      }
      tr.live = this.writeKart(slot, tr, style.trailLife, now);
      tr.zeroed = false;
      if (tr.live) anyLive = true;
    }
    // Apaga los karts que ya no tienen estela (una sola vez).
    for (let s = 0; s < this.maxKarts; s++) {
      const tr = this.trails[s];
      if (!tr.live && !tr.zeroed) {
        const base = s * STRANDS_PER_KART * POINTS * 2;
        for (let v = 0; v < STRANDS_PER_KART * POINTS * 2; v++) this.data[(base + v) * 4 + 3] = 0;
        tr.zeroed = true;
        tr.count = 0;
        anyLive = true; // hay que subir los ceros
      }
    }
    if (anyLive) for (const a of this.attrs) a.needsUpdate = true;
    this.mesh.visible = this.trails.some((t) => t.live);
  }

  /** Escribe las 4 hebras de un kart. Devuelve si queda algo visible. */
  private writeKart(slot: number, tr: KartTrail, life: number, now: number): boolean {
    const style = BOOST_STYLES[tr.tier];
    const ca = this.colA, cb = this.colB, t3 = tr.tier * 3;
    let visible = false;
    for (let strand = 0; strand < STRANDS_PER_KART; strand++) {
      const exh = strand >> 1; // escape 0/1
      const helix = strand & 1; // hebra 0/1
      const phase = helix * Math.PI + exh * 1.3;
      const vBase = (slot * STRANDS_PER_KART + strand) * POINTS * 2;
      // Colores de la hebra: A→B o B→A a lo largo de la estela.
      const r0 = helix ? cb[t3] : ca[t3], g0 = helix ? cb[t3 + 1] : ca[t3 + 1], b0 = helix ? cb[t3 + 2] : ca[t3 + 2];
      const r1 = helix ? ca[t3] : cb[t3], g1 = helix ? ca[t3 + 1] : cb[t3 + 1], b1 = helix ? ca[t3 + 2] : cb[t3 + 2];
      let px = 0, py = 0, pz = 0; // punto anterior (para la tangente)
      for (let i = 0; i < POINTS; i++) {
        const vi = vBase + i * 2;
        let x: number, y: number, z: number, age: number, inten: number;
        let rx = 1, rz = 0;
        if (i < tr.count) {
          // 0 = muestra más reciente
          const hi = (tr.head - 1 - i + POINTS * 2) % POINTS;
          x = tr.hist[hi * 6 + exh * 3];
          y = tr.hist[hi * 6 + exh * 3 + 1];
          z = tr.hist[hi * 6 + exh * 3 + 2];
          if (i === 0) { x = this.ex[exh].x; y = this.ex[exh].y; z = this.ex[exh].z; }
          age = (now - tr.times[hi]) / life;
          inten = tr.inten[hi];
          rx = tr.right[hi * 3]; rz = tr.right[hi * 3 + 2];
        } else {
          x = px; y = py; z = pz; age = 1; inten = 0;
        }
        const a = Math.min(1, Math.max(0, age));
        // Cola de dragón: las dos hebras se enroscan y la onda viaja hacia atrás.
        const amp = style.wiggle * (0.05 + 0.45 * a) * (helix ? 1 : 0.85);
        const th = a * 21 + phase - now * 13;
        const lat = Math.cos(th) * amp;
        const up = Math.sin(th) * amp * 0.45;
        x += rx * lat; z += rz * lat; y += up + a * 0.12;
        // Anchura: fina en la boca, plena enseguida, afilada en la punta; el
        // fénix (flare) se abre en el centro como una pluma.
        const w = style.width * (helix ? 0.85 : 1) * (0.45 + 0.55 * Math.min(1, a * 7)) * Math.pow(1 - a, 0.7) * (1 + style.flare * Math.sin(Math.PI * a));
        const alpha = inten * Math.pow(1 - a, 1.25) * this.intensity * (helix ? 0.7 : 1);
        if (alpha > 0.003) visible = true;
        // tangente: hacia el punto anterior (más cercano al kart)
        let tx = i === 0 ? 0 : px - x, ty = i === 0 ? 0 : py - y, tz = i === 0 ? 0 : pz - z;
        if (i === 0 || tx * tx + ty * ty + tz * tz < 1e-6) { tx = -rz; ty = 0; tz = rx; } // hacia delante del kart
        const cr = r0 + (r1 - r0) * a, cg = g0 + (g1 - g0) * a, cbb = b0 + (b1 - b0) * a;
        for (let sgn = 0; sgn < 2; sgn++) {
          const v = vi + sgn;
          this.pos[v * 3] = x; this.pos[v * 3 + 1] = y; this.pos[v * 3 + 2] = z;
          this.tan[v * 3] = tx; this.tan[v * 3 + 1] = ty; this.tan[v * 3 + 2] = tz;
          this.data[v * 4] = sgn ? 1 : -1;
          this.data[v * 4 + 1] = a;
          this.data[v * 4 + 2] = w;
          this.data[v * 4 + 3] = alpha;
          this.col[v * 3] = cr; this.col[v * 3 + 1] = cg; this.col[v * 3 + 2] = cbb;
        }
        px = x; py = y; pz = z;
      }
    }
    return visible;
  }

  clear(): void {
    for (const tr of this.trails) {
      tr.count = 0; tr.head = 0; tr.live = false; tr.level = 0; tr.lastSample = -1;
      tr.zeroed = false;
    }
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    this.mesh.removeFromParent();
  }
}
