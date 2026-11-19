/**
 * Wukong Turbo Rush · dragones de jade blanco translúcido (maqueta «carrera-ciudad-dragon-4vistas»).
 *
 * Todos los dragones de una escena se fusionan en UNA sola malla con un shader propio:
 * jade blanco con escamas, falso subsurface (los bordes dejan pasar una luz cian), fresnel blanco,
 * brillo especular de luna, venas de luz que recorren el cuerpo y ondulación suave en el vertex
 * shader (cada vértice lleva su fase y su vector de onda, así púas, patas y cuerpo se mueven juntos;
 * la cabeza queda quieta). Barato en móvil: una draw call, sin texturas.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/** Tipos de pieza (atributo aTipo). */
const LISO = 0;
const ESCAMAS = 1;
const LUZ = 2;
const ALETA = 3;

const VERT = /* glsl */ `
#include <common>
#include <fog_pars_vertex>
uniform float uTime;
attribute float aTipo;
attribute float aFase;
attribute vec3 aOnda;
attribute vec2 aEsc;
attribute float aVientre;
varying vec3 vW;
varying vec3 vN;
varying float vTipo;
varying vec2 vEsc;
varying float vVientre;
varying float vFase;
void main() {
  vec3 p = position;
  // ondulación serpenteante (lateral) y un leve vaivén vertical
  float ola = sin(aFase - uTime * 1.05);
  p += aOnda * ola;
  p.y += length(aOnda) * 0.45 * cos(aFase * 0.7 - uTime * 0.8);
  // respiración: el cuerpo se hincha un poco, como si respirase
  float cuerpo = step(0.5, aTipo) * step(aTipo, 1.5);
  p += normal * cuerpo * 0.06 * sin(uTime * 1.5 - aFase * 0.3);
  vec4 w = modelMatrix * vec4(p, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  vTipo = aTipo;
  vEsc = aEsc;
  vVientre = aVientre;
  vFase = aFase;
  vec4 mvPosition = viewMatrix * w;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;

const FRAG = /* glsl */ `
#include <common>
#include <fog_pars_fragment>
uniform float uTime;
uniform vec3 uJade;
uniform vec3 uHondo;
uniform vec3 uBrillo;
uniform vec3 uOro;
uniform vec3 uLuna;
varying vec3 vW;
varying vec3 vN;
varying float vTipo;
varying vec2 vEsc;
varying float vVientre;
varying float vFase;
void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  if (dot(N, V) < 0.0) N = -N;
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float dif = clamp((dot(N, uLuna) + 0.55) / 1.55, 0.0, 1.0);
  float fres = pow(1.0 - ndv, 3.0);
  float spec = pow(max(dot(reflect(-uLuna, N), V), 0.0), 28.0);
  vec3 col;
  if (vTipo > 1.5 && vTipo < 2.5) {
    // ojos, bigotes y perla: luz cian-blanca
    col = uBrillo * (1.7 + 0.4 * sin(uTime * 3.0 + vW.x));
  } else {
    col = mix(uHondo, uJade, dif) * 0.78;
    float pulso = pow(0.5 + 0.5 * sin(vFase * 0.45 - uTime * 2.1), 8.0);
    if (vTipo > 0.5 && vTipo < 1.5) {
      // escamas: semicírculos solapados, filas alternas desplazadas
      vec2 e = vEsc;
      e.y += mod(floor(e.x), 2.0) * 0.5;
      vec2 f = fract(e);
      float d = length(vec2(f.x, f.y - 0.5));
      float sombra = smoothstep(0.1, 0.62, d);
      float filo = smoothstep(0.5, 0.56, d) * (1.0 - smoothstep(0.58, 0.66, d));
      col *= mix(1.08, 0.62, sombra);
      col += uBrillo * filo * (0.28 + 0.6 * pulso);
      // vientre: placas doradas pálidas
      float placa = smoothstep(0.08, 0.14, fract(vEsc.x * 0.35));
      vec3 vientre = uOro * (0.45 + 0.55 * dif) * mix(0.55, 1.0, placa);
      col = mix(col, vientre, vVientre);
    } else if (vTipo > 2.5) {
      // aletas, cuernos, melena y garras: jade con veta dorada
      col = mix(col, uOro * (0.5 + 0.6 * dif), 0.38);
      col += uBrillo * pulso * 0.15;
    }
    // falso subsurface: la luz atraviesa los bordes finos del jade
    col += uBrillo * pow(1.0 - ndv, 1.7) * 0.32;
    col += uBrillo * fres * 0.55;
    col += vec3(1.0, 0.98, 0.95) * spec * 0.45;
  }
  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;

export interface OpcionesDragon {
  /** Puntos del lomo, de la cabeza a la cola. */
  puntos: THREE.Vector3[];
  radio: number;
  /** Amplitud de la ondulación (m) según u (0 = cabeza, 1 = cola). */
  onda: (u: number) => number;
  escalaCabeza?: number;
  /** Dirección a la que mira la cabeza (por defecto, prolonga el cuello). */
  mirar?: THREE.Vector3;
  /** u de las patas. */
  patas?: number[];
  perla?: boolean;
  segs?: number;
  radial?: number;
  grosor?: (u: number) => number;
}

/** Tubo con radio variable (de r0 a r1). */
function tuboConico(puntos: THREE.Vector3[], segs: number, radial: number, r0: number, r1: number): THREE.BufferGeometry {
  const curva = new THREE.CatmullRomCurve3(puntos);
  const geo = new THREE.TubeGeometry(curva, segs, 1, radial);
  const p = geo.attributes.position as THREE.BufferAttribute;
  const c = new THREE.Vector3();
  const v = new THREE.Vector3();
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    curva.getPointAt(u, c);
    const r = r0 + (r1 - r0) * u;
    for (let j = 0; j <= radial; j++) {
      const k = i * (radial + 1) + j;
      v.fromBufferAttribute(p, k).sub(c).multiplyScalar(r).add(c);
      p.setXYZ(k, v.x, v.y, v.z);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

interface Etiqueta {
  tipo: number;
  fase: number;
  onda: THREE.Vector3;
}

/** Deja solo posición y normal, y añade los atributos del shader con valores constantes. */
function etiquetar(geo: THREE.BufferGeometry, e: Etiqueta): THREE.BufferGeometry {
  const g = geo;
  g.deleteAttribute('uv');
  const n = g.getAttribute('position').count;
  const tipo = new Float32Array(n).fill(e.tipo);
  const fase = new Float32Array(n).fill(e.fase);
  const onda = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) onda.set([e.onda.x, e.onda.y, e.onda.z], i * 3);
  g.setAttribute('aTipo', new THREE.BufferAttribute(tipo, 1));
  g.setAttribute('aFase', new THREE.BufferAttribute(fase, 1));
  g.setAttribute('aOnda', new THREE.BufferAttribute(onda, 3));
  g.setAttribute('aEsc', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  g.setAttribute('aVientre', new THREE.BufferAttribute(new Float32Array(n), 1));
  return g;
}

const LAMBDA = 20; // longitud de onda de la ondulación (m)

export class DragonesJade {
  private readonly piezas: THREE.BufferGeometry[] = [];
  readonly material: THREE.ShaderMaterial;
  mesh: THREE.Mesh | null = null;

  constructor() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      fog: true,
      side: THREE.DoubleSide,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          uTime: { value: 0 },
          uJade: { value: new THREE.Color(0.7, 0.95, 0.9) },
          uHondo: { value: new THREE.Color(0.06, 0.28, 0.32) },
          uBrillo: { value: new THREE.Color(0.55, 1.0, 0.95) },
          uOro: { value: new THREE.Color(0.98, 0.84, 0.52) },
          uLuna: { value: new THREE.Vector3(-0.35, 0.8, -0.49).normalize() },
        },
      ]),
    });
  }

  agregar(op: OpcionesDragon): void {
    const segs = op.segs ?? 260;
    const radial = op.radial ?? 12;
    const R = op.radio;
    const grosor = op.grosor ?? ((u: number) => (u < 0.04 ? 1.12 : u > 0.62 ? Math.max(0.16, 1 - ((u - 0.62) / 0.38) * 0.86) : 1));
    const curva = new THREE.CatmullRomCurve3(op.puntos, false, 'centripetal');
    const Lc = curva.getLength();
    const Y = new THREE.Vector3(0, 1, 0);

    // Tabla de marcos (tangente, arriba, lateral) con transporte para tramos verticales.
    const K = 400;
    const tans: THREE.Vector3[] = [];
    const arribas: THREE.Vector3[] = [];
    const lats: THREE.Vector3[] = [];
    const centros: THREE.Vector3[] = [];
    let ultimo = Y.clone();
    for (let i = 0; i <= K; i++) {
      const u = i / K;
      const t = curva.getTangentAt(u).normalize();
      const ref = Math.abs(t.y) < 0.8 ? Y : ultimo;
      const a = ref.clone().addScaledVector(t, -ref.dot(t)).normalize();
      ultimo = a;
      tans.push(t);
      arribas.push(a);
      lats.push(new THREE.Vector3().crossVectors(t, a).normalize());
      centros.push(curva.getPointAt(u));
    }
    const marco = (u: number): number => Math.min(K, Math.max(0, Math.round(u * K)));
    const fase = (u: number): number => ((u * Lc) / LAMBDA) * Math.PI * 2;
    const vOnda = (u: number): THREE.Vector3 => {
      const k = marco(u);
      return lats[k].clone().multiplyScalar(op.onda(u));
    };

    // ---- cuerpo
    const cuerpo = new THREE.TubeGeometry(curva, segs, R, radial);
    const p = cuerpo.attributes.position as THREE.BufferAttribute;
    const n = p.count;
    const aTipo = new Float32Array(n).fill(ESCAMAS);
    const aFase = new Float32Array(n);
    const aOnda = new Float32Array(n * 3);
    const aEsc = new Float32Array(n * 2);
    const aVientre = new Float32Array(n);
    const c = new THREE.Vector3();
    const v = new THREE.Vector3();
    for (let i = 0; i <= segs; i++) {
      const u = i / segs;
      curva.getPointAt(u, c);
      const f = grosor(u);
      const k = marco(u);
      const ond = vOnda(u);
      for (let j = 0; j <= radial; j++) {
        const idx = i * (radial + 1) + j;
        v.fromBufferAttribute(p, idx).sub(c);
        const dir = v.clone().normalize();
        v.multiplyScalar(f).add(c);
        p.setXYZ(idx, v.x, v.y, v.z);
        aFase[idx] = fase(u);
        aOnda.set([ond.x, ond.y, ond.z], idx * 3);
        aEsc[idx * 2] = (u * Lc) / (R * 0.62);
        aEsc[idx * 2 + 1] = (j / radial) * 14;
        const abajo = -dir.dot(arribas[k]);
        aVientre[idx] = THREE.MathUtils.smoothstep(abajo, 0.45, 0.75);
      }
    }
    cuerpo.computeVertexNormals();
    cuerpo.deleteAttribute('uv');
    cuerpo.setAttribute('aTipo', new THREE.BufferAttribute(aTipo, 1));
    cuerpo.setAttribute('aFase', new THREE.BufferAttribute(aFase, 1));
    cuerpo.setAttribute('aOnda', new THREE.BufferAttribute(aOnda, 3));
    cuerpo.setAttribute('aEsc', new THREE.BufferAttribute(aEsc, 2));
    cuerpo.setAttribute('aVientre', new THREE.BufferAttribute(aVientre, 1));
    this.piezas.push(cuerpo);

    const m = new THREE.Matrix4();
    const pieza = (geo: THREE.BufferGeometry, u: number, tipo: number, mat: THREE.Matrix4): void => {
      geo.applyMatrix4(mat);
      this.piezas.push(etiquetar(geo, { tipo, fase: fase(u), onda: vOnda(u) }));
    };

    // ---- cresta: aletas dorsales planas inclinadas hacia la cola
    const nAletas = Math.round(Lc / (R * 0.85));
    for (let i = 0; i < nAletas; i++) {
      const u = 0.035 + (0.95 * i) / nAletas;
      const k = marco(u);
      const g = grosor(u);
      const alt = i % 2 === 0 ? 1.0 : 0.7;
      const yA = arribas[k].clone().addScaledVector(tans[k], 0.6).normalize();
      const zA = lats[k];
      const xA = new THREE.Vector3().crossVectors(yA, zA).normalize();
      const base = centros[k].clone().addScaledVector(arribas[k], R * g * 0.85);
      const s = R * g * alt;
      m.makeBasis(xA.multiplyScalar(s), yA.multiplyScalar(s), zA.multiplyScalar(s * 0.28)).setPosition(base);
      const geo = new THREE.ConeGeometry(0.55, 1.7, 4);
      geo.translate(0, 0.85, 0);
      pieza(geo, u, ALETA, m);
    }
    // aletas laterales pequeñas
    for (let i = 0; i < nAletas / 3; i++) {
      const u = 0.06 + (0.85 * i) / (nAletas / 3);
      const k = marco(u);
      const g = grosor(u);
      for (const sg of [-1, 1]) {
        const yA = lats[k].clone().multiplyScalar(sg).addScaledVector(tans[k], 1.1).normalize();
        const zA = arribas[k].clone();
        const xA = new THREE.Vector3().crossVectors(yA, zA).normalize();
        const s = R * g * 0.55;
        m.makeBasis(xA.multiplyScalar(s), yA.multiplyScalar(s), zA.multiplyScalar(s * 0.3)).setPosition(centros[k].clone().addScaledVector(lats[k], sg * R * g * 0.9));
        const geo = new THREE.ConeGeometry(0.5, 1.6, 4);
        geo.translate(0, 0.8, 0);
        pieza(geo, u, ALETA, m);
      }
    }
    // borla de la cola
    for (let k2 = 0; k2 < 7; k2++) {
      const u = 1;
      const k = marco(u);
      const ang = (k2 / 7) * Math.PI * 2;
      const yA = tans[k].clone().addScaledVector(lats[k], Math.cos(ang) * 0.6).addScaledVector(arribas[k], Math.sin(ang) * 0.6).normalize();
      const zA = new THREE.Vector3().crossVectors(yA, lats[k]).normalize();
      const xA = new THREE.Vector3().crossVectors(yA, zA).normalize();
      const s = R * 0.9;
      m.makeBasis(xA.multiplyScalar(s), yA.multiplyScalar(s), zA.multiplyScalar(s * 0.3)).setPosition(centros[k]);
      const geo = new THREE.ConeGeometry(0.45, 2.4, 4);
      geo.translate(0, 1.2, 0);
      pieza(geo, u, ALETA, m);
    }

    // ---- patas con garras
    for (const u of op.patas ?? []) {
      const k = marco(u);
      const g = grosor(u);
      for (const sg of [-1, 1]) {
        const hombro = centros[k].clone().addScaledVector(lats[k], sg * R * g * 0.7).addScaledVector(arribas[k], -R * 0.2);
        const codo = hombro.clone().addScaledVector(lats[k], sg * R * 0.9).addScaledVector(arribas[k], -R * 0.9).addScaledVector(tans[k], -R * 0.5);
        const pie = codo.clone().addScaledVector(arribas[k], -R * 0.9).addScaledVector(tans[k], -R * 0.7);
        pieza(tuboConico([hombro, codo, pie], 8, 6, R * 0.38, R * 0.2), u, ALETA, m.identity());
        for (let d = -1; d <= 1; d++) {
          const dirG = tans[k].clone().negate().addScaledVector(lats[k], d * 0.5 * sg).addScaledVector(arribas[k], -0.4).normalize();
          const q = new THREE.Quaternion().setFromUnitVectors(Y, dirG);
          m.compose(pie, q, new THREE.Vector3(R, R, R));
          const geo = new THREE.ConeGeometry(0.1, 0.75, 4);
          geo.translate(0, 0.37, 0);
          pieza(geo, u, LUZ, m);
        }
      }
    }

    // ---- cabeza
    const k0 = marco(0);
    const dir = (op.mirar ? op.mirar.clone() : tans[k0].clone().negate()).normalize();
    const zA = dir;
    const xA = new THREE.Vector3().crossVectors(Y, zA);
    if (xA.lengthSq() < 1e-4) xA.set(1, 0, 0);
    xA.normalize();
    const yA = new THREE.Vector3().crossVectors(zA, xA).normalize();
    const S = R * (op.escalaCabeza ?? 1.5);
    const mc = new THREE.Matrix4().makeBasis(xA, yA, zA).scale(new THREE.Vector3(S, S, S)).setPosition(centros[k0].clone().addScaledVector(dir, R * 0.2));
    this.cabeza(mc, !!op.perla);
  }

  /** Cabeza en espacio local (z adelante, y arriba, radio del cuerpo = 1). */
  private cabeza(mc: THREE.Matrix4, perla: boolean): void {
    const cero = new THREE.Vector3();
    const local: { geo: THREE.BufferGeometry; tipo: number }[] = [];
    const add = (geo: THREE.BufferGeometry, tipo: number): void => {
      local.push({ geo, tipo });
    };
    add(new THREE.SphereGeometry(1.2, 14, 10).scale(1.05, 0.9, 1.15), LISO);
    add(new THREE.CylinderGeometry(0.6, 0.88, 2.4, 12).rotateX(Math.PI / 2).scale(1, 0.72, 1).translate(0, 0.08, 1.7), LISO);
    add(new THREE.SphereGeometry(0.5, 10, 8).scale(1.55, 0.78, 1).translate(0, 0.28, 2.85), LISO);
    // mandíbula abierta
    add(new THREE.CylinderGeometry(0.4, 0.68, 2.2, 10).rotateX(Math.PI / 2).scale(1, 0.48, 1).rotateX(0.42).translate(0, -0.78, 1.45), LISO);
    // colmillos
    for (const l of [-1, 1]) {
      for (const z of [2.1, 2.6]) add(new THREE.ConeGeometry(0.09, 0.45, 4).rotateX(Math.PI).translate(l * 0.42, -0.42, z), ALETA);
      add(new THREE.ConeGeometry(0.08, 0.4, 4).translate(l * 0.35, -1.1, 2.0), ALETA);
      // ojos y cejas
      add(new THREE.SphereGeometry(0.24, 10, 8).translate(l * 0.66, 0.52, 0.95), LUZ);
      add(new THREE.ConeGeometry(0.28, 1.3, 4).scale(1, 1, 0.35).rotateX(-1.25).rotateZ(-l * 0.35).translate(l * 0.62, 0.86, 0.6), ALETA);
      // cuernos ramificados
      add(tuboConico([new THREE.Vector3(l * 0.42, 0.8, -0.25), new THREE.Vector3(l * 0.72, 1.7, -1.35), new THREE.Vector3(l * 0.92, 2.35, -2.75), new THREE.Vector3(l * 0.78, 2.7, -4.0)], 14, 6, 0.24, 0.04), ALETA);
      add(tuboConico([new THREE.Vector3(l * 0.7, 1.6, -1.15), new THREE.Vector3(l * 1.25, 2.25, -1.5), new THREE.Vector3(l * 1.55, 2.6, -2.2)], 8, 5, 0.12, 0.03), ALETA);
      // bigotes largos y luminosos
      add(
        tuboConico(
          [new THREE.Vector3(l * 0.55, 0.1, 2.9), new THREE.Vector3(l * 1.4, -0.15, 3.3), new THREE.Vector3(l * 2.2, -0.9, 2.7), new THREE.Vector3(l * 2.6, -2.0, 1.4), new THREE.Vector3(l * 3.1, -2.8, -0.2), new THREE.Vector3(l * 3.8, -3.1, -1.9)],
          28,
          4,
          0.09,
          0.02,
        ),
        LUZ,
      );
      // melena
      for (let k = 0; k < 8; k++) {
        const a = -0.2 + k * 0.32;
        add(
          new THREE.ConeGeometry(0.3, 1.9 - k * 0.08, 4)
            .scale(1, 1, 0.35)
            .translate(0, 0.95, 0)
            .rotateX(-1.35 + k * 0.05)
            .rotateZ(-l * (0.6 + k * 0.17))
            .translate(l * Math.cos(a) * 0.9, Math.sin(a) * 0.75 + 0.1, -0.75 - k * 0.07),
          ALETA,
        );
      }
    }
    // barba
    for (let k = -1; k <= 1; k++) add(new THREE.ConeGeometry(0.16, 1.3, 4).rotateX(Math.PI - 0.5).translate(k * 0.3, -1.25, 1.0), ALETA);
    if (perla) add(new THREE.SphereGeometry(0.38, 14, 10).translate(0, -0.3, 4.3), LUZ);
    for (const { geo, tipo } of local) {
      geo.applyMatrix4(mc);
      this.piezas.push(etiquetar(geo, { tipo, fase: 0, onda: cero }));
    }
  }

  /** Fusiona todo en una malla (llamar una vez, tras los `agregar`). */
  construir(): THREE.Mesh {
    const indexadas = this.piezas.every((g) => g.index);
    const finales = indexadas ? this.piezas : this.piezas.map((g) => (g.index ? g.toNonIndexed() : g));
    const geo = mergeGeometries(finales);
    for (const g of new Set([...this.piezas, ...finales])) g.dispose();
    this.piezas.length = 0;
    if (!geo) throw new Error('DragonesJade: no se pudieron fusionar las piezas');
    const mesh = new THREE.Mesh(geo, this.material);
    mesh.frustumCulled = false;
    mesh.name = 'dragonesJade';
    this.mesh = mesh;
    return mesh;
  }

  update(tiempo: number): void {
    this.material.uniforms.uTime.value = tiempo;
  }

  dispose(): void {
    this.mesh?.geometry.dispose();
    this.material.dispose();
    for (const g of this.piezas) g.dispose();
    this.piezas.length = 0;
  }
}
