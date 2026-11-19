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
import { esVacio, rnd, texturaCanvas } from './util';
import { CiudadElevada } from './CiudadElevada';

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
  neon_nexus: { carretera: 0x14907f, alfa: 0.93, venas: 0x7ffff0, bordeA: 0xff3fa0, bordeB: 0x3ff0ff, noche: true, ciudad: true, fuegos: true, dragon: 0x1f8a7a, nubes: 0x8a90b0 },
  sunny_circuit: { carretera: 0x1f6b5a, alfa: 0.5, venas: 0x9ffff0, bordeA: 0xffc531, bordeB: 0x5fffd0, noche: false, ciudad: false, fuegos: false, dragon: 0xc8102e, nubes: 0xffffff },
  dune_drift: { carretera: 0x6a1a08, alfa: 0.45, venas: 0xffb347, bordeA: 0xff5a1f, bordeB: 0xffd23f, noche: false, ciudad: false, fuegos: true, dragon: 0xc8102e, nubes: 0xffe2c0 },
  frostbite_falls: { carretera: 0x2a8a82, alfa: 0.5, venas: 0xe0fffb, bordeA: 0x5fd3ff, bordeB: 0xffffff, noche: false, ciudad: false, fuegos: false, dragon: 0x1f7a66, nubes: 0xffffff },
};

const VERT_CARRETERA = /* glsl */ `
attribute float aBorde;
varying vec2 vUv;
varying float vBorde;
void main() {
  vUv = uv;
  vBorde = aBorde;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Jade translúcido + relámpagos animados + bordes neón rosa y blanco + línea central discontinua.
// vUv.x va de muro a muro; vBorde = semiancho de la calzada / semiancho hasta el muro.
const FRAG_CARRETERA = /* glsl */ `
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uVenas;
uniform vec3 uBordeA;
uniform vec3 uBordeB;
uniform float uAlfa;
varying vec2 vUv;
varying float vBorde;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
void main() {
  float x = vUv.x;
  float y = vUv.y;           // metros / 6 a lo largo
  float xc = abs(x - 0.5) * 2.0;
  float e = vBorde;
  vec2 p = vec2(x * 3.2, y * 0.9);
  // relámpagos: líneas finas de ruido con un segundo nivel de ramas
  float n = fbm(p + vec2(0.0, -uTime * 0.22));
  float vena = 1.0 - smoothstep(0.0, 0.018, abs(n - 0.5));
  float n2 = fbm(p * 2.3 + vec2(3.1, uTime * 0.15));
  vena += 0.55 * (1.0 - smoothstep(0.0, 0.012, abs(n2 - 0.52)));
  float halo = 1.0 - smoothstep(0.0, 0.09, abs(n - 0.5));
  float pulso = 0.65 + 0.35 * sin(uTime * 4.0 + y * 1.7 + n * 6.0);
  float fondo = fbm(p * 0.5 + 7.0);
  vec3 col = uBase * (0.12 + 0.3 * fondo);
  col += uBase * 0.3 * halo;
  col += uVenas * vena * pulso * 1.25;
  // destellos sueltos
  float chispa = step(0.996, hash(floor(vec2(x * 90.0, y * 14.0)))) * (0.5 + 0.5 * sin(uTime * 8.0 + y));
  col += uVenas * chispa * 0.8;
  // arcén: jade más oscuro
  float fuera = smoothstep(e - 0.004, e + 0.004, xc);
  col = mix(col, uBase * 0.12 + uVenas * vena * 0.25, fuera);
  // borde neón rosa (banda) y línea blanca por dentro
  float rosa = smoothstep(e - 0.075, e - 0.05, xc) * (1.0 - smoothstep(e - 0.004, e + 0.004, xc));
  float blanca = 1.0 - smoothstep(0.004, 0.012, abs(xc - (e - 0.1)));
  float brilloRosa = exp(-abs(xc - (e - 0.03)) * 30.0) * 0.6;
  col = mix(col, uBordeA * 1.6, rosa);
  col += uBordeA * brilloRosa;
  col = mix(col, vec3(1.6, 1.5, 1.6), blanca * 0.9);
  // segunda línea cian junto al muro
  float cian = 1.0 - smoothstep(0.004, 0.012, abs(xc - 0.985));
  col = mix(col, uBordeB * 1.4, cian * step(e, 0.999));
  // línea central discontinua
  float dash = step(0.5, fract(y * 0.5)) * (1.0 - smoothstep(0.004, 0.01, xc));
  col = mix(col, vec3(1.3), dash * 0.85);
  float a = clamp(uAlfa + vena * 0.1 + rosa + blanca + dash * 0.5, 0.0, 1.0);
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
const MAX_PARTICULAS = 5000;
const ORO_FUEGO = [0xffd23f, 0xffb030, 0xfff1b8, 0xffc85a];

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

  // viaducto y ciudad (solo en la Ciudad del Dragón)
  private elevada: CiudadElevada | null = null;
  /** Tramo en el que el cuerpo del dragón sustituye a la barandilla izquierda. */
  private readonly tramoDragon: [number, number] = [0.03, 0.1];

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

    if (e.ciudad) {
      this.elevada = new CiudadElevada(track);
      this.object.add(this.elevada.object);
    }
    this.crearCarretera();
    this.crearBarandillas();
    this.crearArco();
    if (e.ciudad) this.crearArco(0.088, 1.35);
    this.crearFarolillosYCintas();
    if (e.ciudad) this.crearCintasCielo();
    this.crearDragon();
    if (!e.ciudad) {
      this.crearPagodas();
      if (e.nubes) this.crearNubes();
    }
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
    const hastaMuro = this.estilo.ciudad;
    if (hastaMuro) {
      // La carretera de jade sustituye al asfalto, los pianos y el arcén originales.
      this.track.object.traverse((o) => {
        if (o.name === 'roadSurface' || o.name === 'curbs' || o.name === 'shoulder') {
          o.visible = false;
          this.ocultos.push(o);
        }
      });
    }
    const pos: number[] = [];
    const uv: number[] = [];
    const borde: number[] = [];
    const idx: number[] = [];
    const s = this.muestra(0);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      this.muestra(t, s);
      const hw = hastaMuro ? s.wallHalfWidth : s.halfWidth;
      const e = hastaMuro ? s.halfWidth / s.wallHalfWidth : 1;
      for (const lado of [-1, 1]) {
        pos.push(s.position.x + s.binormal.x * hw * lado, s.position.y + 0.06, s.position.z + s.binormal.z * hw * lado);
        uv.push(lado < 0 ? 0 : 1, (t * L) / 6);
        borde.push(e);
      }
      if (i < n) {
        const a = i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const geo = this.g(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setAttribute('aBorde', new THREE.Float32BufferAttribute(borde, 1));
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
      grad.addColorStop(0, '#ff6a3a');
      grad.addColorStop(0.5, '#d8142e');
      grad.addColorStop(1, '#7a0a14');
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
      c.fillRect(0, 34, 256, 12);
      c.fillRect(0, 120, 256, 8);
    });
    tex.repeat.set(1, 1);
    this.texs.push(tex);
    const mat = this.m(
      new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.5, roughness: 0.35, metalness: 0.3, side: THREE.DoubleSide }),
    );
    const L = this.track.length;
    const paso = 2;
    const n = Math.round(L / paso);
    const alto = 1.15;
    // Perfil redondeado (lomo de escamas): [hacia fuera, altura, v de textura].
    const perfil: [number, number, number][] = [
      [-0.1, -0.3, 0],
      [-0.32, 0.3, 0.25],
      [-0.22, 0.85, 0.5],
      [0.12, 1.15, 0.7],
      [0.48, 0.9, 0.85],
      [0.6, 0.1, 1],
    ];
    const K = perfil.length;
    const pos: number[] = [];
    const uv: number[] = [];
    const idx: number[] = [];
    const puntas: THREE.Matrix4[] = [];
    const neonPos: number[] = [];
    const neonIdx: number[] = [];
    const s = this.muestra(0);
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const [d0, d1] = this.tramoDragon;
    for (const lado of [-1, 1]) {
      let abierto = false;
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        if (esVacio(def, t) || (lado === -1 && t > d0 && t < d1)) {
          abierto = false;
          continue;
        }
        this.muestra(t, s);
        const d = s.wallHalfWidth - 0.15;
        const y = s.position.y;
        const base = pos.length / 3;
        for (const [o, h, v] of perfil) {
          const dd = d + o;
          pos.push(s.position.x + s.binormal.x * dd * lado, y + h, s.position.z + s.binormal.z * dd * lado);
          uv.push((t * L) / 4, v);
        }
        // Línea neón blanca y rosa al pie de la barandilla, del lado de la pista.
        const nb = neonPos.length / 3;
        const dn = d - 0.12;
        neonPos.push(
          s.position.x + s.binormal.x * dn * lado, y + 0.02, s.position.z + s.binormal.z * dn * lado,
          s.position.x + s.binormal.x * dn * lado, y + 0.3, s.position.z + s.binormal.z * dn * lado,
        );
        if (abierto) {
          for (let k = 0; k < K - 1; k++) {
            const a = base - K + k;
            const b = base + k;
            idx.push(a, b, a + 1, a + 1, b, b + 1);
          }
          neonIdx.push(nb - 2, nb, nb - 1, nb - 1, nb, nb + 1);
        }
        abierto = true;
        if (i % 2 === 0) {
          q.setFromUnitVectors(up, new THREE.Vector3(s.binormal.x * lado * 0.35, 1, s.binormal.z * lado * 0.35).normalize());
          const dt = d + 0.12;
          puntas.push(new THREE.Matrix4().compose(new THREE.Vector3(s.position.x + s.binormal.x * dt * lado, y + alto + 0.4, s.position.z + s.binormal.z * dt * lado), q, new THREE.Vector3(1, 1, 1)));
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
    const gn = this.g(new THREE.BufferGeometry());
    gn.setAttribute('position', new THREE.Float32BufferAttribute(neonPos, 3));
    gn.setIndex(neonIdx);
    const linea = new THREE.Mesh(gn, this.m(new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffc0e8).multiplyScalar(2), toneMapped: false, side: THREE.DoubleSide })));
    linea.frustumCulled = false;
    this.object.add(linea);

    // Remate dorado brillante encima del muro (línea neón)
    const remate = new THREE.InstancedMesh(
      this.g(new THREE.ConeGeometry(0.26, 0.95, 5)),
      this.m(new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0xc98a1a, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.25 })),
      puntas.length,
    );
    puntas.forEach((mt, i) => remate.setMatrixAt(i, mt));
    remate.instanceMatrix.needsUpdate = true;
    remate.frustumCulled = false;
    this.object.add(remate);
  }

  // ------------------------------------------------------------------ arco paifang de la meta
  private crearArco(t = 8 / this.track.length, escala = 1): void {
    const s = this.muestra(t);
    const grupo = new THREE.Group();
    grupo.scale.setScalar(escala);
    const m = new THREE.Matrix4().makeBasis(s.binormal, new THREE.Vector3(0, 1, 0), s.tangent.clone().negate());
    grupo.quaternion.setFromRotationMatrix(m);
    grupo.position.copy(s.position);
    const ancho = (s.wallHalfWidth + 1.5) / escala + (escala > 1 ? 1.2 : 0);
    const oro = this.m(new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.85, roughness: 0.25, emissive: 0x5a3a08, emissiveIntensity: 0.6 }));
    const laca = this.m(new THREE.MeshStandardMaterial({ color: 0xb30f22, roughness: 0.4, metalness: 0.2, emissive: 0x3a0008, emissiveIntensity: 0.6 }));
    const jade = this.m(new THREE.MeshStandardMaterial({ color: 0x1f8a7a, roughness: 0.3, metalness: 0.3, emissive: 0x0b4a40, emissiveIntensity: 0.8 }));
    const neon = this.m(new THREE.MeshBasicMaterial({ color: new THREE.Color(0x5ffff0).multiplyScalar(2.2), toneMapped: false }));
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
    // Perfiles neón cian en aleros y vigas (el brillo del arco de la maqueta)
    for (const [w, y] of [[ancho * 2 + 6.4, H - 1.55], [ancho * 1.1 + 3.4, H + 0.45], [ancho * 2 + 3, H - 2.8]] as const) {
      const perfil = new THREE.Mesh(this.g(new THREE.BoxGeometry(w, 0.16, 0.16)), neon);
      perfil.position.set(0, y, 1.75);
      grupo.add(perfil);
    }
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

  // ------------------------------------------------------------------ grandes cintas rojas en el cielo
  /** Cintas de tela roja con nubes doradas y caracteres que cruzan el cielo sobre la pista, con farolillos. */
  private crearCintasCielo(): void {
    const tex = texturaCanvas(1024, 128, (c) => {
      const g = c.createLinearGradient(0, 0, 0, 128);
      g.addColorStop(0, '#7a0614');
      g.addColorStop(0.5, '#d4142c');
      g.addColorStop(1, '#7a0614');
      c.fillStyle = g;
      c.fillRect(0, 0, 1024, 128);
      c.fillStyle = '#ffd36a';
      c.fillRect(0, 6, 1024, 6);
      c.fillRect(0, 116, 1024, 6);
      // nubes auspiciosas doradas
      c.strokeStyle = '#ffcf5a';
      c.lineWidth = 4;
      for (let x = 40; x < 1024; x += 200) {
        for (const [dx, r] of [[0, 18], [26, 13], [-24, 12]] as const) {
          c.beginPath();
          c.arc(x + dx, 64, r, Math.PI, 2.2 * Math.PI);
          c.stroke();
        }
      }
      c.fillStyle = '#ffe08a';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.font = '900 70px "PingFang SC","Noto Sans CJK SC","Microsoft YaHei",serif';
      const chars = ['福', '龙', '速', '春', '吉', '星'];
      chars.forEach((ch, i) => c.fillText(ch, 140 + i * 160, 66));
    });
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.texs.push(tex);
    const mat = this.m(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.55, roughness: 0.7, side: THREE.DoubleSide }));
    const s = this.muestra(0);
    const geos: THREE.BufferGeometry[] = [];
    const faroles: THREE.Matrix4[] = [];
    const ts = [0.105, 0.2, 0.33, 0.47, 0.62, 0.78, 0.9];
    const r = rnd(77);
    for (const t of ts) {
      this.muestra(t, s);
      const W = s.wallHalfWidth + 22 + r() * 14;
      const alto = 17 + r() * 6;
      const iz = new THREE.Vector3(s.position.x - s.binormal.x * W, s.position.y + alto + 4 * r(), s.position.z - s.binormal.z * W);
      const de = new THREE.Vector3(s.position.x + s.binormal.x * W, s.position.y + alto + 4 * r(), s.position.z + s.binormal.z * W);
      // un poco en diagonal para que se vea de frente y de lado
      iz.addScaledVector(s.tangent, -8);
      de.addScaledVector(s.tangent, 8);
      const medio = iz.clone().add(de).multiplyScalar(0.5);
      medio.y -= 7;
      const curva = new THREE.QuadraticBezierCurve3(iz, medio, de);
      const N = 48;
      const anchoC = 3.2;
      const pos: number[] = [];
      const uv: number[] = [];
      const idx: number[] = [];
      const p = new THREE.Vector3();
      const tg = new THREE.Vector3();
      const nrm = new THREE.Vector3();
      for (let i = 0; i <= N; i++) {
        const u = i / N;
        curva.getPoint(u, p);
        curva.getTangent(u, tg);
        // la tela cuelga: ancho casi vertical con un ligero ondeo
        nrm.set(0, 1, 0).addScaledVector(s.tangent, 0.35 * Math.sin(u * Math.PI * 5)).normalize();
        const off = nrm.multiplyScalar(anchoC / 2);
        pos.push(p.x + off.x, p.y + off.y, p.z + off.z, p.x - off.x, p.y - off.y, p.z - off.z);
        uv.push(u * 1.6, 1, u * 1.6, 0);
        if (i < N) {
          const k = i * 2;
          idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
        }
        if (i % 8 === 4) faroles.push(new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y - 3.2, p.z), new THREE.Quaternion(), new THREE.Vector3(1.6, 2, 1.6)));
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
      g.setIndex(idx);
      g.computeVertexNormals();
      geos.push(g);
    }
    const geo = this.g(mergeGeometries(geos) as THREE.BufferGeometry);
    for (const g of geos) g.dispose();
    const cintas = new THREE.Mesh(geo, mat);
    cintas.frustumCulled = false;
    this.object.add(cintas);
    const farol = new THREE.InstancedMesh(
      this.g(new THREE.SphereGeometry(0.55, 12, 10)),
      this.m(new THREE.MeshStandardMaterial({ color: 0xc80f1a, emissive: 0xd8140a, emissiveIntensity: 0.9, roughness: 0.5 })),
      faroles.length,
    );
    faroles.forEach((mt, i) => farol.setMatrixAt(i, mt));
    farol.frustumCulled = false;
    this.object.add(farol);
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

  // ------------------------------------------------------------------ dragón gigante junto a la pista
  /**
   * Cabeza alzada junto a la salida mirando a los karts; el cuerpo corre pegado al borde izquierdo
   * (hace de barandilla en `tramoDragon`), se levanta en arco por encima de la pista y la cola se
   * hunde entre las nubes por debajo del viaducto.
   */
  private crearDragon(): void {
    const color = this.estilo.dragon;
    const tex = texturaCanvas(256, 256, (c) => {
      const base = new THREE.Color(color);
      const claro = base.clone().lerp(new THREE.Color(0x9fffe0), 0.35);
      c.fillStyle = `#${base.clone().multiplyScalar(0.55).getHexString()}`;
      c.fillRect(0, 0, 256, 256);
      // escamas (v = alrededor del cuerpo; la franja inferior es el vientre dorado)
      for (let row = 0; row < 14; row++) {
        for (let col = -1; col < 10; col++) {
          const x = col * 28 + (row % 2) * 14;
          const y = row * 14 + 6;
          const g = c.createRadialGradient(x, y - 5, 1, x, y, 15);
          g.addColorStop(0, `#${claro.getHexString()}`);
          g.addColorStop(1, `#${base.clone().multiplyScalar(0.4).getHexString()}`);
          c.fillStyle = g;
          c.beginPath();
          c.arc(x, y, 14, 0, Math.PI);
          c.fill();
          c.strokeStyle = '#ffd36a';
          c.lineWidth = 2.2;
          c.beginPath();
          c.arc(x, y, 14, 0.08 * Math.PI, 0.92 * Math.PI);
          c.stroke();
        }
      }
      // vientre: placas doradas
      const yv = 200;
      c.fillStyle = '#d9a23a';
      c.fillRect(0, yv, 256, 56);
      c.strokeStyle = '#7a4a10';
      c.lineWidth = 3;
      for (let x = 0; x < 256; x += 32) {
        c.beginPath();
        c.moveTo(x, yv);
        c.lineTo(x + 8, 256);
        c.stroke();
      }
      c.fillStyle = '#ffe08a';
      c.fillRect(0, yv, 256, 5);
    });
    tex.repeat.set(70, 1);
    this.texs.push(tex);
    const mat = this.m(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.38, metalness: 0.45, roughness: 0.32 }));
    const oro = this.m(new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0xd99a1a, emissiveIntensity: 1.0, metalness: 0.7, roughness: 0.22 }));
    const brillo = this.m(new THREE.MeshBasicMaterial({ color: new THREE.Color(0x7cffe0).multiplyScalar(1.3), toneMapped: false }));

    // Recorrido: [t, lateral (en múltiplos del muro, negativo = izquierda) + extra, altura]
    const s = this.muestra(0);
    const [d0, d1] = this.tramoDragon;
    const ruta: [number, number, number, number][] = [
      [0.006, -1, 4.2, 7.5],
      [0.014, -1, 2.6, 4.2],
      [0.022, -1, 1.0, 2.0],
    ];
    for (let t = d0; t <= d1 + 1e-6; t += 0.006) ruta.push([t, -1, 0.85, 1.25 + 0.25 * Math.sin(t * 400)]);
    ruta.push(
      [d1 + 0.007, -1, 1.6, 4.0],
      [d1 + 0.014, -0.45, 0, 10.5],
      [d1 + 0.02, 0.4, 0, 12.0],
      [d1 + 0.027, 1, 3.5, 8.5],
      [d1 + 0.035, 1, 13, 0],
      [d1 + 0.045, 1, 24, -12],
      [d1 + 0.056, 1, 34, -24],
    );
    const pts = ruta.map(([t, f, extra, h]) => {
      this.muestra(t, s);
      const lat = f * s.wallHalfWidth + Math.sign(f) * extra;
      return new THREE.Vector3(s.position.x + s.binormal.x * lat, s.position.y + h, s.position.z + s.binormal.z * lat);
    });
    const curva = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const segs = 520;
    const radial = 14;
    const R = 1.15;
    const cuerpo = this.g(new THREE.TubeGeometry(curva, segs, R, radial));
    // Grosor: cuello ancho, cuerpo, cola fina.
    const grosor = (u: number): number => (u < 0.03 ? 1.2 : u > 0.7 ? Math.max(0.18, 1 - ((u - 0.7) / 0.3) * 0.85) : 1);
    const p = cuerpo.attributes.position as THREE.BufferAttribute;
    const centro = new THREE.Vector3();
    const v = new THREE.Vector3();
    for (let i = 0; i <= segs; i++) {
      const u = i / segs;
      curva.getPointAt(u, centro);
      const f = grosor(u);
      for (let j = 0; j <= radial; j++) {
        const k = i * (radial + 1) + j;
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

    // Púas doradas del lomo (cresta) y aletas laterales.
    const tan = new THREE.Vector3();
    const arriba = new THREE.Vector3();
    const lat = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const marco = (u: number): void => {
      curva.getPointAt(u, centro);
      curva.getTangentAt(u, tan);
      lat.crossVectors(tan, Y);
      if (lat.lengthSq() < 1e-4) lat.set(1, 0, 0);
      lat.normalize();
      arriba.crossVectors(lat, tan).normalize();
    };
    const nP = 220;
    const pua = new THREE.InstancedMesh(this.g(new THREE.ConeGeometry(0.34, 1.5, 5)), oro, nP);
    const q = new THREE.Quaternion();
    const qInc = new THREE.Quaternion();
    for (let i = 0; i < nP; i++) {
      const u = 0.025 + (0.95 * i) / nP;
      marco(u);
      const f = grosor(u) * (i % 2 === 0 ? 1.15 : 0.75);
      q.setFromUnitVectors(Y, arriba.clone().addScaledVector(tan, -0.45).normalize());
      pua.setMatrixAt(i, new THREE.Matrix4().compose(centro.clone().addScaledVector(arriba, R * grosor(u) + 0.5 * f), q, new THREE.Vector3(f, f, f)));
    }
    pua.frustumCulled = false;
    this.object.add(pua);
    const nA = 60;
    const aleta = new THREE.InstancedMesh(this.g(new THREE.ConeGeometry(0.22, 1.3, 4)), oro, nA * 2);
    for (let i = 0; i < nA; i++) {
      const u = 0.04 + (0.85 * i) / nA;
      marco(u);
      const f = grosor(u);
      for (const sg of [-1, 1]) {
        const dir = lat.clone().multiplyScalar(sg).addScaledVector(tan, -0.9).normalize();
        qInc.setFromUnitVectors(Y, dir);
        aleta.setMatrixAt(i * 2 + (sg > 0 ? 1 : 0), new THREE.Matrix4().compose(centro.clone().addScaledVector(lat, sg * R * f * 0.95).addScaledVector(arriba, -0.2), qInc, new THREE.Vector3(f, f, f)));
      }
    }
    aleta.frustumCulled = false;
    this.object.add(aleta);

    // Patas con garras doradas en el tramo de barandilla.
    const patas: THREE.BufferGeometry[] = [];
    for (const u of [0.12, 0.2, 0.34, 0.42]) {
      marco(u);
      const pie = centro.clone().addScaledVector(lat, 0).setY(centro.y - R - 0.2);
      const a = centro.clone().addScaledVector(arriba, -0.3);
      const pierna = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([a, a.clone().lerp(pie, 0.5).addScaledVector(tan, 0.6), pie.clone().addScaledVector(tan, 0.9)]), 8, 0.35, 6);
      patas.push(pierna);
      for (let k = -1; k <= 1; k++) {
        const g = new THREE.ConeGeometry(0.12, 0.7, 4);
        g.rotateX(Math.PI / 2);
        const m = new THREE.Matrix4().lookAt(new THREE.Vector3(), tan.clone().addScaledVector(lat, k * 0.5), Y);
        g.applyMatrix4(m);
        g.translate(pie.x + tan.x * 1.2 + lat.x * k * 0.25, pie.y + 0.1, pie.z + tan.z * 1.2 + lat.z * k * 0.25);
        patas.push(g);
      }
    }
    const geoPatas = mergeGeometries(patas);
    for (const g of patas) g.dispose();
    if (geoPatas) {
      this.g(geoPatas);
      const mp = new THREE.Mesh(geoPatas, oro);
      mp.frustumCulled = false;
      this.object.add(mp);
    }

    // Cabeza: cráneo, hocico largo, mandíbula abierta con colmillos, cuernos, melena, bigotes y ojos.
    const cabeza = new THREE.Group();
    const ini = curva.getPointAt(0);
    const dir = ini.clone().sub(curva.getPointAt(0.012)).normalize();
    // que mire un poco hacia abajo, hacia los karts que llegan
    cabeza.position.copy(ini);
    cabeza.lookAt(ini.clone().add(dir.clone().setY(dir.y * 0.3 - 0.25)));
    cabeza.scale.setScalar(1.35);
    const craneo = new THREE.Mesh(this.g(new THREE.SphereGeometry(1.5, 16, 12)), mat);
    craneo.scale.set(1.1, 0.9, 1.2);
    cabeza.add(craneo);
    const hocico = new THREE.Mesh(this.g(new THREE.BoxGeometry(1.7, 0.9, 2.6)), mat);
    hocico.position.set(0, 0.05, 2.1);
    cabeza.add(hocico);
    const nariz = new THREE.Mesh(this.g(new THREE.SphereGeometry(0.6, 10, 8)), oro);
    nariz.scale.set(1.4, 0.7, 0.9);
    nariz.position.set(0, 0.35, 3.3);
    cabeza.add(nariz);
    const mandibula = new THREE.Mesh(this.g(new THREE.BoxGeometry(1.5, 0.35, 2.4)), oro);
    mandibula.position.set(0, -0.85, 1.8);
    mandibula.rotation.x = 0.38;
    cabeza.add(mandibula);
    const geoColmillo = this.g(new THREE.ConeGeometry(0.1, 0.5, 4));
    for (const l of [-1, 1]) {
      for (const zc of [2.6, 3.1]) {
        const col = new THREE.Mesh(geoColmillo, brillo);
        col.rotation.x = Math.PI;
        col.position.set(l * 0.6, -0.55, zc);
        cabeza.add(col);
      }
      const cuerno = new THREE.Mesh(this.g(new THREE.ConeGeometry(0.3, 3.2, 6)), oro);
      cuerno.position.set(l * 0.75, 1.6, -1.0);
      cuerno.rotation.set(-1.1, 0, l * 0.3);
      cabeza.add(cuerno);
      const ojo = new THREE.Mesh(this.g(new THREE.SphereGeometry(0.3, 10, 8)), brillo);
      ojo.position.set(l * 0.85, 0.55, 1.15);
      cabeza.add(ojo);
      const ceja = new THREE.Mesh(this.g(new THREE.BoxGeometry(0.7, 0.18, 0.9)), oro);
      ceja.position.set(l * 0.8, 0.95, 1.0);
      ceja.rotation.z = -l * 0.35;
      cabeza.add(ceja);
      for (let k = 0; k < 5; k++) {
        const melena = new THREE.Mesh(this.g(new THREE.ConeGeometry(0.22, 1.6, 4)), oro);
        melena.position.set(l * (1.1 + k * 0.05), 0.4 - k * 0.35, -0.9 - k * 0.2);
        melena.rotation.set(-1.2, 0, l * (1.0 + k * 0.15));
        cabeza.add(melena);
      }
      const bigote = new THREE.Mesh(
        this.g(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(l * 0.6, 0.2, 3.3), new THREE.Vector3(l * 2.0, -0.3, 3.4), new THREE.Vector3(l * 3.2, -1.2, 2.6), new THREE.Vector3(l * 3.8, -2.4, 1.6)]), 16, 0.09, 4)),
        oro,
      );
      cabeza.add(bigote);
    }
    // Perla llameante delante de la boca.
    const perla = new THREE.Mesh(this.g(new THREE.SphereGeometry(0.55, 16, 12)), brillo);
    perla.position.set(0, -0.2, 5.4);
    cabeza.add(perla);
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
      new THREE.PointsMaterial({ size: this.estilo.ciudad ? 4.2 : 6, map: tex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, sizeAttenuation: true, fog: false }),
    );
    this.puntos = new THREE.Points(geo, mat);
    this.puntos.frustumCulled = false;
    this.object.add(this.puntos);
  }

  private lanzarFuego(cerca: THREE.Vector3, dir: THREE.Vector3 | null): void {
    // Delante de la cámara, para que se vean durante la carrera.
    const d = dir ?? new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
    const grande = this.estilo.ciudad;
    const dist = grande ? 100 + Math.random() * 120 : 70 + Math.random() * 80;
    const lat = (Math.random() - 0.5) * (grande ? 260 : 120);
    const x = cerca.x + d.x * dist - d.z * lat;
    const z = cerca.z + d.z * dist + d.x * lat;
    const y = cerca.y + (grande ? 45 + Math.random() * 55 : 28 + Math.random() * 30);
    const dorado = grande && Math.random() < 0.65;
    const elegir = (lista: number[]): THREE.Color => new THREE.Color(lista[Math.floor(Math.random() * lista.length)]);
    const col = dorado ? elegir(ORO_FUEGO) : elegir(COLORES_FUEGO);
    const col2 = dorado ? elegir(ORO_FUEGO) : elegir(COLORES_FUEGO);
    const n = grande ? 420 : 150;
    const vel = grande ? 34 + Math.random() * 18 : 16 + Math.random() * 12;
    const brillo = grande ? 2.2 : 1.4;
    for (let i = 0; i < n; i++) {
      if (this.particulas.length >= MAX_PARTICULAS) this.particulas.shift();
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const rr = Math.sqrt(1 - u * u);
      // dos capas: anillo exterior rápido y corazón lento
      const v = vel * (i % 4 === 0 ? 0.45 : 0.9 + Math.random() * 0.2);
      const c = i % 3 === 0 ? col2 : col;
      this.particulas.push({ x, y, z, vx: rr * Math.cos(th) * v, vy: u * v, vz: rr * Math.sin(th) * v, vida: 0, max: (grande ? 2.2 : 1.6) + Math.random() * 0.9, r: c.r * brillo, g: c.g * brillo, b: c.b * brillo });
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
        const cruz = new Float32Array(LARGO_ESTELA * 2);
        for (let i = 0; i < LARGO_ESTELA; i++) {
          cruz[i * 2] = -1;
          cruz[i * 2 + 1] = 1;
        }
        geo.setAttribute('cruz', new THREE.BufferAttribute(cruz, 1));
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
            vertexShader: 'attribute float alfa; attribute float cruz; varying float vA; varying float vC; void main(){ vA = alfa; vC = cruz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
            fragmentShader: 'uniform vec3 uColor; uniform float uFuerza; varying float vA; varying float vC; void main(){ float k = 1.0 - abs(vC); float nucleo = pow(k, 6.0); vec3 c = uColor * (1.2 + 2.5 * nucleo) + vec3(nucleo); gl_FragColor = vec4(c, k * k * vA * vA * vA * uFuerza * 0.9); }',
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
  private readonly tmpQ = new THREE.Vector3();

  private actualizarEstelas(camara?: THREE.Camera): void {
    for (const e of this.estelas) {
      const st = e.kart.state;
      e.kart.forwardDir(this.tmpF);
      this.tmpR.set(-this.tmpF.z, 0, this.tmpF.x).normalize();
      const rapidez = Math.min(1, Math.abs(st.speed) / 20);
      // Intensas solo con turbo; se apagan en los karts lejanos para no llenar la pantalla.
      const lejos = camara ? camara.position.distanceTo(st.position) : 0;
      const cerca = 1 - Math.min(1, Math.max(0, (lejos - 22) / 25));
      const fuerza = (st.isBoosting ? 1 : rapidez * 0.45) * cerca;
      for (let k = 0; k < 2; k++) {
        const lado = k === 0 ? -1 : 1;
        const p = new THREE.Vector3()
          .copy(st.position)
          .addScaledVector(this.tmpF, -0.95)
          .addScaledVector(this.tmpR, lado * 0.55);
        p.y += 0.22;
        const lista = e.puntos[k];
        if (!lista.length || lista[0].distanceToSquared(p) > 0.12) {
          lista.unshift(p);
          if (lista.length > 64) lista.pop();
        } else lista[0].copy(p);
        if (Math.abs(st.speed) < 1) lista.length = Math.min(lista.length, 2);
        const malla = e.mallas[k];
        const attr = malla.geometry.attributes.position as THREE.BufferAttribute;
        const ancho = st.isBoosting ? 0.2 : 0.12;
        // Remuestrear el historial a una longitud fija en metros (no en fotogramas).
        const largo = st.isBoosting ? 12 : 7;
        let seg = 0;
        let acum = 0;
        for (let i = 0; i < LARGO_ESTELA; i++) {
          const objetivo = (largo * i) / (LARGO_ESTELA - 1);
          while (seg < lista.length - 1 && acum + lista[seg].distanceTo(lista[seg + 1]) < objetivo) {
            acum += lista[seg].distanceTo(lista[seg + 1]);
            seg++;
          }
          const a = lista[seg] ?? p;
          const b = lista[seg + 1] ?? a;
          const dAB = a.distanceTo(b);
          const f = dAB > 1e-5 ? Math.min(1, (objetivo - acum) / dAB) : 0;
          this.tmpQ.copy(a).lerp(b, f);
          const w = ancho * (1 - i / LARGO_ESTELA);
          attr.setXYZ(i * 2, this.tmpQ.x + this.tmpR.x * w, this.tmpQ.y, this.tmpQ.z + this.tmpR.z * w);
          attr.setXYZ(i * 2 + 1, this.tmpQ.x - this.tmpR.x * w, this.tmpQ.y, this.tmpQ.z - this.tmpR.z * w);
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
    this.actualizarEstelas(camara);
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
        this.siguienteFuego = this.estilo.ciudad ? 0.25 + Math.random() * 0.45 : 0.35 + Math.random() * 0.7;
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
    this.elevada?.dispose();
    this.elevada = null;
    this.object.removeFromParent();
    for (const o of this.ocultos) o.visible = true;
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    for (const t of this.texs) t.dispose();
    this.particulas.length = 0;
    this.estelas.length = 0;
  }
}
