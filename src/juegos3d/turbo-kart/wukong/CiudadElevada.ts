/**
 * Wukong Turbo Rush · «Ciudad del Dragón» elevada (maqueta docs/maquetas/turbo-kart/circuito-ciudad-dragon.jpg):
 * la pista pasa a ser un viaducto sobre pilares por encima de una ciudad china nocturna —rascacielos
 * con ventanas y aristas neón cian y rosa, coronas de pagoda de jade, pagodas rojas de varios pisos sobre
 * podios, estatuas de dragones dorados, un mar de nubes bajas y calles iluminadas al fondo—.
 * Todo es decoración (InstancedMesh y geometrías fusionadas, pocas draw calls): la física no cambia.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { ITrack, TrackSample } from '../core/types';
import { wrap01 } from '../core/math';
import { esVacio, rnd, tejadoChino, texturaCanvas } from './util';
import { RotulosNeon } from './RotulosNeon';
import { texturaNubeBlanca } from './TexturasCiudad';

/** Altura del suelo de la ciudad (la pista va de y ≈ 0 a 6,5). */
export const Y_SUELO = -46;

/** Tejas gris azuladas (no turquesa: que no se confundan con la pista). */
const JADE = 0x2a3444;
const ORO = 0xf2c14e;
const LACA = 0xb3121f;

function pintar(geo: THREE.BufferGeometry, hex: number, mult = 1): THREE.BufferGeometry {
  const c = new THREE.Color(hex).multiplyScalar(mult);
  const n = geo.getAttribute('position').count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  if (!geo.getAttribute('uv')) geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Array(n * 2).fill(0), 2));
  return geo;
}

function unir(lista: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const r = mergeGeometries(lista);
  for (const g of lista) g.dispose();
  if (!r) throw new Error('CiudadElevada: no se pudieron fusionar las geometrías');
  return r;
}

const VERT_EDIFICIO = /* glsl */ `
#include <common>
#include <fog_pars_vertex>
varying vec3 vW;
varying vec3 vN;
varying vec3 vCol;
void main() {
  vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix * instanceMatrix) * normal);
  #ifdef USE_INSTANCING_COLOR
    vCol = instanceColor;
  #else
    vCol = vec3(1.0);
  #endif
  vec4 mvPosition = viewMatrix * w;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;

// Fachadas de cristal oscuro con ventanas encendidas al azar (cálidas o del color del edificio).
const FRAG_EDIFICIO = /* glsl */ `
#include <common>
#include <fog_pars_fragment>
uniform float uSuelo;
varying vec3 vW;
varying vec3 vN;
varying vec3 vCol;
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec3 n = abs(vN);
  vec3 col;
  float alto = clamp((vW.y - uSuelo) / 140.0, 0.0, 1.0);
  if (n.y > 0.6) {
    col = vec3(0.02, 0.025, 0.05);
  } else {
    float u = n.x > n.z ? vW.z : vW.x;
    vec2 celda = vec2(u / 1.7, (vW.y - uSuelo) / 2.9);
    vec2 f = fract(celda);
    vec2 id = floor(celda);
    float semilla = dot(vCol, vec3(17.3, 31.7, 7.1));
    float ventana = step(0.22, f.x) * step(f.x, 0.78) * step(0.3, f.y) * step(f.y, 0.75);
    float r = h21(id + semilla);
    float bloque = h21(floor(id / vec2(6.0, 5.0)) + semilla * 1.3);
    float encendida = step(0.55 + 0.4 * bloque, r);
    vec3 calida = vec3(1.0, 0.62, 0.26);
    vec3 tono = mix(calida, vCol * 0.9, step(0.7, h21(id * 1.7 + semilla)));
    // franjas verticales de neón en algunas fachadas y líneas de forjado tenues
    float franja = step(0.95, fract(u / 11.0 + semilla)) * step(0.55, fract(semilla * 3.1));
    float forjado = step(0.94, f.y) * 0.25;
    vec3 cristal = mix(vec3(0.02, 0.025, 0.06), vec3(0.045, 0.05, 0.11), alto);
    col = cristal + ventana * encendida * tono * (0.55 + 0.6 * r) + franja * vCol * 1.4 + forjado * vCol * 0.25;
    // reflejo de la ciudad en la base
    col += vec3(0.25, 0.12, 0.3) * exp(-(vW.y - uSuelo) * 0.08) * 0.6;
  }
  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;

const VERT_NUBE = /* glsl */ `
uniform float uTime;
attribute vec2 esquina;
attribute vec2 tam;
attribute float alfa;
varying vec2 vUv;
varying float vA;
void main() {
  vec3 p = position;
  // deriva lenta de las nubes
  p.x += sin(uTime * 0.12 + position.z * 0.031) * 2.5;
  p.z += cos(uTime * 0.1 + position.x * 0.027) * 2.5;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  mv.xy += esquina * tam;
  vUv = esquina * 0.5 + 0.5;
  float d = -mv.z;
  vA = alfa * smoothstep(14.0, 48.0, d) * (1.0 - smoothstep(520.0, 900.0, d));
  gl_Position = projectionMatrix * mv;
}`;

const FRAG_NUBE = /* glsl */ `
uniform sampler2D map;
uniform vec3 uColor;
uniform vec3 uLuz;
uniform vec3 uRosa;
varying vec2 vUv;
varying float vA;
void main() {
  vec4 t = texture2D(map, vUv);
  // arriba la luna las blanquea; abajo las tiñe la luz rosada de la ciudad
  float luz = smoothstep(0.3, 0.85, vUv.y);
  vec3 c = mix(uColor, uLuz, 0.25 + 0.75 * luz) * (0.7 + 0.3 * t.r);
  c += uRosa * (1.0 - luz) * 0.22;
  gl_FragColor = vec4(c * 0.84, t.a * vA);
}`;

export class CiudadElevada {
  readonly object = new THREE.Group();
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly mats: THREE.Material[] = [];
  private readonly texs: THREE.Texture[] = [];
  private readonly ocultos: THREE.Object3D[] = [];
  private readonly centro = new THREE.Vector3();
  private radio = 250;
  private readonly tmp = new THREE.Vector3();

  /** Farolillos de las calles (los dibuja CiudadDragon junto con los suyos). */
  readonly farolillos: THREE.Matrix4[] = [];
  private readonly rotulos = new RotulosNeon();
  private readonly estatuasPos: THREE.Vector3[] = [];
  private readonly pagodasPos: THREE.Vector3[] = [];
  private matNubes: THREE.ShaderMaterial | null = null;
  private focos: THREE.InstancedMesh | null = null;
  private readonly datosFocos: { p: THREE.Vector3; fase: number; vel: number; incl: number; largo: number; ancho: number }[] = [];
  /** Matrices de pilares (viaducto, estatuas). */
  private readonly pilares: THREE.Matrix4[] = [];
  /** Edificios: posición base, tamaño, giro y tono. */
  private readonly edificios: { x: number; z: number; w: number; d: number; base: number; top: number; giro: number; tono: THREE.Color; neon: boolean; corona: boolean }[] = [];

  constructor(private readonly track: ITrack) {
    this.object.name = 'ciudadElevada';
    track.object.traverse((o) => {
      if (['terrain', 'mountains', 'decor', 'landmarks', 'grandstands'].includes(o.name)) {
        o.visible = false;
        this.ocultos.push(o);
      }
    });
    const box = new THREE.Box3();
    const s = this.muestra(0);
    for (let i = 0; i < 96; i++) box.expandByPoint(this.muestra(i / 96, s).position);
    box.getCenter(this.centro);
    this.radio = Math.max(box.max.x - box.min.x, box.max.z - box.min.z) * 0.5;

    this.crearTablero();
    this.crearSuelo();
    this.repartirEdificios();
    this.crearPagodas();
    this.crearEstatuas();
    this.crearCalle();
    this.crearPortico();
    this.crearRotulosTorres();
    this.crearEdificios();
    this.crearPilares();
    this.crearNubes();
    this.crearFocos();
    this.rotulos.construir();
    this.object.add(this.rotulos.object);
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

  /** Distancia al borde exterior (muro) de la pista y altura de la pista más cercana. */
  private cercania(x: number, z: number): { d: number; y: number } {
    const q = this.track.query(this.tmp.set(x, 0, z));
    return { d: Math.abs(q.lateral) - q.wallHalfWidth, y: q.center.y };
  }

  // ------------------------------------------------------------------ viaducto
  private crearTablero(): void {
    const def = this.track.def;
    const L = this.track.length;
    const n = Math.max(240, Math.round(L / 3));
    const s = this.muestra(0);
    // Perfil del tablero (lateral relativo a W, altura), cerrado por arriba.
    const perfil: [number, number][] = [
      [-1, -0.15],
      [-1, -1.5],
      [-0.72, -3.6],
      [0.72, -3.6],
      [1, -1.5],
      [1, -0.15],
    ];
    const pos: number[] = [];
    const uv: number[] = [];
    const idx: number[] = [];
    const neonPos: number[] = [];
    const neonCol: number[] = [];
    const neonIdx: number[] = [];
    const rosa = new THREE.Color(0xff3f9e).multiplyScalar(2.2);
    const cian = new THREE.Color(0x3ff0ff).multiplyScalar(1.8);
    const filas: { x: number; y: number; z: number }[][] = [];
    const bordes: { o: THREE.Vector3; b: THREE.Vector3; W: number }[] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      this.muestra(t, s);
      const W = s.wallHalfWidth + 2.4;
      filas.push(perfil.map(([l, y]) => ({ x: s.position.x + s.binormal.x * l * W, y: s.position.y + y, z: s.position.z + s.binormal.z * l * W })));
      bordes.push({ o: s.position.clone(), b: s.binormal.clone(), W });
    }
    const P = perfil.length;
    for (let e = 0; e < P; e++) {
      const a = e;
      const b = (e + 1) % P;
      const base = pos.length / 3;
      for (let i = 0; i <= n; i++) {
        const A = filas[i][a];
        const B = filas[i][b];
        pos.push(A.x, A.y, A.z, B.x, B.y, B.z);
        uv.push(0, i * 0.5, 1, i * 0.5);
      }
      for (let i = 0; i < n; i++) {
        if (esVacio(def, i / n)) continue;
        const k = base + i * 2;
        idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3);
      }
    }
    const geo = this.g(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const tex = texturaCanvas(64, 64, (c) => {
      c.fillStyle = '#2b2740';
      c.fillRect(0, 0, 64, 64);
      c.fillStyle = '#1b1828';
      c.fillRect(0, 30, 64, 4);
      c.fillStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i < 40; i++) c.fillRect(Math.random() * 64, Math.random() * 64, 2, 2);
    });
    this.texs.push(tex);
    const mat = this.m(new THREE.MeshStandardMaterial({ map: tex, color: 0x9a92c0, roughness: 0.75, metalness: 0.25, emissive: 0x140c24, emissiveIntensity: 1, side: THREE.DoubleSide }));
    const tablero = new THREE.Mesh(geo, mat);
    tablero.receiveShadow = true;
    tablero.frustumCulled = false;
    this.object.add(tablero);

    // Franjas neón en los costados del tablero: rosa arriba, cian abajo.
    const franja = (y0: number, y1: number, col: THREE.Color, sal: number): void => {
      for (const lado of [-1, 1]) {
        const base = neonPos.length / 3;
        for (let i = 0; i <= n; i++) {
          const { o, b, W } = bordes[i];
          const x = o.x + b.x * (W + sal) * lado;
          const z = o.z + b.z * (W + sal) * lado;
          neonPos.push(x, o.y + y0, z, x, o.y + y1, z);
          neonCol.push(col.r, col.g, col.b, col.r, col.g, col.b);
        }
        for (let i = 0; i < n; i++) {
          if (esVacio(def, i / n)) continue;
          const k = base + i * 2;
          neonIdx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3);
        }
      }
    };
    franja(-0.55, -0.85, rosa, 0.04);
    franja(-1.35, -1.5, cian, 0.04);
    const gn = this.g(new THREE.BufferGeometry());
    gn.setAttribute('position', new THREE.Float32BufferAttribute(neonPos, 3));
    gn.setAttribute('color', new THREE.Float32BufferAttribute(neonCol, 3));
    gn.setIndex(neonIdx);
    const neon = new THREE.Mesh(gn, this.m(new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, side: THREE.DoubleSide, fog: false })));
    neon.frustumCulled = false;
    this.object.add(neon);

    // Pilares del viaducto cada ~26 m, con capitel.
    const paso = 26;
    const np = Math.floor(L / paso);
    for (let i = 0; i < np; i++) {
      const t = (i + 0.5) / np;
      if (esVacio(def, t)) continue;
      this.muestra(t, s);
      const top = s.position.y - 3.4;
      const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(s.binormal, new THREE.Vector3(0, 1, 0), s.tangent));
      this.pilares.push(new THREE.Matrix4().compose(new THREE.Vector3(s.position.x, top, s.position.z), q, new THREE.Vector3(1.6, top - Y_SUELO, 1.6)));
    }
  }

  private crearPilares(): void {
    if (!this.pilares.length) return;
    const geo = this.g(new THREE.CylinderGeometry(1, 1.15, 1, 10).translate(0, -0.5, 0));
    const mat = this.m(new THREE.MeshStandardMaterial({ color: 0x5a5470, roughness: 0.7, metalness: 0.2, emissive: 0x120a20 }));
    const pil = new THREE.InstancedMesh(geo, mat, this.pilares.length);
    this.pilares.forEach((mt, i) => pil.setMatrixAt(i, mt));
    pil.frustumCulled = false;
    this.object.add(pil);
    // Anillos de luz cian a media altura y capitel dorado.
    const geoAnillo = this.g(new THREE.CylinderGeometry(1.08, 1.08, 0.5, 12, 1, true));
    const anillos = new THREE.InstancedMesh(geoAnillo, this.m(new THREE.MeshBasicMaterial({ color: new THREE.Color(0x3ff0ff).multiplyScalar(1.6), toneMapped: false })), this.pilares.length * 2);
    const capiteles = new THREE.InstancedMesh(this.g(new THREE.BoxGeometry(1, 1, 1)), this.m(new THREE.MeshStandardMaterial({ color: ORO, metalness: 0.6, roughness: 0.35, emissive: 0x5a3a08, emissiveIntensity: 0.8 })), this.pilares.length);
    const p = new THREE.Vector3();
    const q = new THREE.Quaternion();
    const e = new THREE.Vector3();
    this.pilares.forEach((mt, i) => {
      mt.decompose(p, q, e);
      const r = e.x;
      anillos.setMatrixAt(i * 2, new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y - e.y * 0.35, p.z), q, new THREE.Vector3(r, 1, r)));
      anillos.setMatrixAt(i * 2 + 1, new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y - e.y * 0.7, p.z), q, new THREE.Vector3(r * 1.05, 1, r * 1.05)));
      capiteles.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y - 0.4, p.z), q, new THREE.Vector3(r * 2.6, 0.8, r * 2.6)));
    });
    anillos.frustumCulled = capiteles.frustumCulled = false;
    this.object.add(anillos, capiteles);
  }

  // ------------------------------------------------------------------ suelo con calles iluminadas
  private crearSuelo(): void {
    const tam = (this.radio + 520) * 2;
    const tex = texturaCanvas(256, 256, (c) => {
      c.fillStyle = '#07060f';
      c.fillRect(0, 0, 256, 256);
      // manzanas
      c.fillStyle = '#100d1e';
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) c.fillRect(x * 64 + 8, y * 64 + 8, 48, 48);
      // calles con farolas ámbar y anuncios cian/rosa
      for (let k = 0; k < 4; k++) {
        const g = c.createLinearGradient(0, 0, 256, 0);
        g.addColorStop(0, 'rgba(255,170,70,0.9)');
        g.addColorStop(0.5, 'rgba(255,120,60,0.6)');
        g.addColorStop(1, 'rgba(255,170,70,0.9)');
        c.fillStyle = g;
        c.fillRect(0, k * 64 + 2, 256, 2);
        c.fillRect(k * 64 + 2, 0, 2, 256);
      }
      for (let i = 0; i < 140; i++) {
        c.fillStyle = ['#3ff0ff', '#ff4fb0', '#ffd36a', '#ff9a3a'][i % 4];
        c.globalAlpha = 0.5 + Math.random() * 0.5;
        const a = Math.random() < 0.5;
        const k = Math.floor(Math.random() * 4) * 64 + 3;
        const r = Math.random() * 256;
        c.fillRect(a ? r : k, a ? k : r, 2, 2);
      }
      c.globalAlpha = 1;
    });
    tex.repeat.set(tam / 90, tam / 90);
    this.texs.push(tex);
    const geo = this.g(new THREE.PlaneGeometry(tam, tam).rotateX(-Math.PI / 2));
    const suelo = new THREE.Mesh(geo, this.m(new THREE.MeshBasicMaterial({ map: tex, color: 0xffffff, fog: true })));
    suelo.position.set(this.centro.x, Y_SUELO, this.centro.z);
    suelo.frustumCulled = false;
    this.object.add(suelo);
  }

  // ------------------------------------------------------------------ rascacielos chinos
  private repartirEdificios(): void {
    const r = rnd(20240207);
    const ext = this.radio + 330;
    const paso = 24;
    const tonos = [0x3ff0ff, 0xff4fb0, 0x3ff0ff, 0xffb347, 0x9f7bff];
    for (let gx = -ext; gx <= ext; gx += paso) {
      for (let gz = -ext; gz <= ext; gz += paso) {
        const x = this.centro.x + gx + (r() - 0.5) * paso * 0.6;
        const z = this.centro.z + gz + (r() - 0.5) * paso * 0.6;
        const rc = Math.hypot(gx, gz);
        if (rc > ext) continue;
        const { d, y } = this.cercania(x, z);
        if (d < 9) continue;
        const w = 9 + r() * 11;
        const dd = 9 + r() * 11;
        let top: number;
        if (d < 32) {
          // Bajo el viaducto: edificios que no tapan la pista (se ven desde arriba).
          if (r() < 0.3) continue;
          top = y - 9 - r() * 24;
        } else if (d < 75) {
          top = r() < 0.65 ? y - 7 - r() * 20 : y + 10 + r() * 38;
        } else {
          const lejos = Math.min(1, (d - 75) / 200);
          top = y + 12 + r() * (45 + 80 * lejos);
        }
        if (top < Y_SUELO + 8) top = Y_SUELO + 8 + r() * 6;
        const alto = top - Y_SUELO;
        this.edificios.push({
          x,
          z,
          w,
          d: dd,
          base: Y_SUELO,
          top,
          giro: r() < 0.7 ? 0 : r() * Math.PI,
          tono: new THREE.Color(tonos[Math.floor(r() * tonos.length)]),
          neon: alto > 30 && r() < 0.75,
          corona: alto > 45 && r() < 0.4,
        });
      }
    }
  }

  private crearEdificios(): void {
    const E = this.edificios;
    if (!E.length) return;
    const mat = this.m(
      new THREE.ShaderMaterial({
        vertexShader: VERT_EDIFICIO,
        fragmentShader: FRAG_EDIFICIO,
        fog: true,
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uSuelo: { value: Y_SUELO } }]),
      }),
    );
    const cuerpos = new THREE.InstancedMesh(this.g(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0)), mat, E.length);
    const nNeon = E.filter((e) => e.neon).length * 3;
    const neon = new THREE.InstancedMesh(this.g(new THREE.BoxGeometry(1, 1, 1)), this.m(new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })), Math.max(1, nNeon));
    // Corona de pagoda: dos tejados de jade, cuerpo rojo y aguja dorada (unidad = ancho del edificio).
    const corona = unir([
      pintar(tejadoChino(1.3, 0.32, 0.12), JADE),
      pintar(new THREE.BoxGeometry(0.72, 0.42, 0.72).translate(0, 0.42, 0), LACA, 1.2),
      pintar(new THREE.BoxGeometry(0.8, 0.05, 0.8).translate(0, 0.25, 0), ORO, 1.3),
      pintar(tejadoChino(1.0, 0.3, 0.1).translate(0, 0.62, 0), JADE),
      pintar(new THREE.BoxGeometry(0.46, 0.3, 0.46).translate(0, 0.98, 0), LACA, 1.2),
      pintar(tejadoChino(0.74, 0.32, 0.08).translate(0, 1.12, 0), JADE),
      pintar(new THREE.CylinderGeometry(0.02, 0.05, 0.6, 6).translate(0, 1.7, 0), ORO, 1.5),
    ]);
    const nCor = E.filter((e) => e.corona).length;
    const coronas = new THREE.InstancedMesh(
      this.g(corona),
      this.m(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.3, emissive: 0x141016, emissiveIntensity: 1, side: THREE.DoubleSide })),
      Math.max(1, nCor),
    );
    const q = new THREE.Quaternion();
    const Y = new THREE.Vector3(0, 1, 0);
    const mt = new THREE.Matrix4();
    let kn = 0;
    let kc = 0;
    const col = new THREE.Color();
    E.forEach((e, i) => {
      q.setFromAxisAngle(Y, e.giro);
      const alto = e.top - e.base;
      cuerpos.setMatrixAt(i, mt.compose(new THREE.Vector3(e.x, e.base, e.z), q, new THREE.Vector3(e.w, alto, e.d)));
      cuerpos.setColorAt(i, e.tono);
      if (e.neon) {
        col.copy(e.tono).multiplyScalar(2.4);
        const c = Math.cos(e.giro);
        const sn = Math.sin(e.giro);
        for (const sg of [-1, 1]) {
          const lx = (sg * e.w) / 2;
          const lz = (sg * e.d) / 2;
          neon.setMatrixAt(kn, mt.compose(new THREE.Vector3(e.x + lx * c + lz * sn, e.base + alto / 2, e.z - lx * sn + lz * c), q, new THREE.Vector3(0.45, alto, 0.45)));
          neon.setColorAt(kn++, col);
        }
        neon.setMatrixAt(kn, mt.compose(new THREE.Vector3(e.x, e.top - 0.4, e.z), q, new THREE.Vector3(e.w + 0.3, 0.6, e.d + 0.3)));
        neon.setColorAt(kn++, col);
      }
      if (e.corona) {
        const k = Math.min(e.w, e.d);
        coronas.setMatrixAt(kc++, mt.compose(new THREE.Vector3(e.x, e.top, e.z), q, new THREE.Vector3(k, k, k)));
      }
    });
    neon.count = kn;
    coronas.count = kc;
    cuerpos.frustumCulled = neon.frustumCulled = coronas.frustumCulled = false;
    this.object.add(cuerpos, neon, coronas);
  }

  // ------------------------------------------------------------------ pagodas rojas de varios pisos
  private crearPagodas(): void {
    const r = rnd(888);
    const pisos = 5;
    const cuerpos: THREE.BufferGeometry[] = [];
    const adornos: THREE.BufferGeometry[] = [];
    let y = 0;
    for (let k = 0; k < pisos; k++) {
      const w = 10 - k * 1.25;
      cuerpos.push(new THREE.BoxGeometry(w * 0.78, 3.2, w * 0.78).translate(0, y + 1.6, 0));
      adornos.push(pintar(new THREE.BoxGeometry(w * 0.9, 0.35, w * 0.9).translate(0, y + 0.15, 0), ORO, 1.1));
      adornos.push(pintar(tejadoChino(w * 1.38, 1.9, 1.0).translate(0, y + 3.15, 0), JADE));
      adornos.push(pintar(new THREE.BoxGeometry(w * 1.0, 0.12, w * 1.0).translate(0, y + 3.2, 0), ORO, 1.2));
      y += 4.5;
    }
    adornos.push(pintar(new THREE.CylinderGeometry(0.12, 0.3, 5, 6).translate(0, y + 2.2, 0), ORO, 1.4));
    for (let k = 0; k < 4; k++) adornos.push(pintar(new THREE.SphereGeometry(0.5 - k * 0.08, 8, 6).translate(0, y + 1 + k * 1.1, 0), ORO, 1.4));
    const geoCuerpo = this.g(unir(cuerpos.map((g) => pintar(g, 0xffffff))));
    const geoAdorno = this.g(unir(adornos));
    const tex = texturaCanvas(128, 64, (c) => {
      c.fillStyle = '#8e0f1c';
      c.fillRect(0, 0, 128, 64);
      for (let i = 0; i < 4; i++) {
        c.fillStyle = '#ffc35a';
        c.fillRect(10 + i * 29, 16, 20, 34);
        c.strokeStyle = '#7a3a08';
        c.lineWidth = 2;
        c.strokeRect(10 + i * 29, 16, 20, 34);
        c.beginPath();
        c.moveTo(20 + i * 29, 16);
        c.lineTo(20 + i * 29, 50);
        c.moveTo(10 + i * 29, 33);
        c.lineTo(30 + i * 29, 33);
        c.stroke();
      }
      c.fillStyle = '#f2c14e';
      c.fillRect(0, 0, 128, 5);
    }, false);
    const emis = texturaCanvas(128, 64, (c) => {
      c.fillStyle = '#250004';
      c.fillRect(0, 0, 128, 64);
      for (let i = 0; i < 4; i++) {
        c.fillStyle = '#ffb040';
        c.fillRect(10 + i * 29, 16, 20, 34);
      }
    }, false);
    this.texs.push(tex, emis);
    const matCuerpo = this.m(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: emis, emissive: 0xffffff, emissiveIntensity: 1.5, roughness: 0.55 }));
    const matAdorno = this.m(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.3, emissive: 0x141016, emissiveIntensity: 1, side: THREE.DoubleSide }));
    const N = 26;
    const ms: THREE.Matrix4[] = [];
    const s = this.muestra(0);
    for (let i = 0; i < N * 5 && ms.length < N; i++) {
      const t = r();
      this.muestra(t, s);
      const lado = r() < 0.5 ? -1 : 1;
      const dist = s.wallHalfWidth + 16 + r() * 26;
      const x = s.position.x + s.binormal.x * dist * lado;
      const z = s.position.z + s.binormal.z * dist * lado;
      const { d } = this.cercania(x, z);
      if (d < 12) continue;
      if (this.edificios.some((e) => Math.abs(e.x - x) < (e.w + 14) / 2 && Math.abs(e.z - z) < (e.d + 14) / 2 && e.top > s.position.y - 12)) continue;
      const esc = 0.9 + r() * 0.6;
      const base = s.position.y - 9 + r() * 8;
      // Podio de la pagoda (edificio cálido) desde el suelo.
      this.edificios.push({ x, z, w: 12 * esc, d: 12 * esc, base: Y_SUELO, top: base, giro: 0, tono: new THREE.Color(0xffb347), neon: false, corona: false });
      ms.push(new THREE.Matrix4().compose(new THREE.Vector3(x, base, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), r() * Math.PI), new THREE.Vector3(esc, esc, esc)));
      this.pagodasPos.push(new THREE.Vector3(x, base, z));
    }
    const cuerpo = new THREE.InstancedMesh(geoCuerpo, matCuerpo, Math.max(1, ms.length));
    const adorno = new THREE.InstancedMesh(geoAdorno, matAdorno, Math.max(1, ms.length));
    ms.forEach((mt, i) => {
      cuerpo.setMatrixAt(i, mt);
      adorno.setMatrixAt(i, mt);
    });
    cuerpo.count = adorno.count = ms.length;
    cuerpo.castShadow = false;
    cuerpo.frustumCulled = adorno.frustumCulled = false;
    this.object.add(cuerpo, adorno);
  }

  // ------------------------------------------------------------------ estatuas de dragones dorados
  private crearEstatuas(): void {
    const piezas: THREE.BufferGeometry[] = [];
    // Pedestal rojo y dorado
    piezas.push(pintar(new THREE.CylinderGeometry(2.4, 2.7, 1.6, 12).translate(0, 0.8, 0), LACA, 1.1));
    piezas.push(pintar(new THREE.CylinderGeometry(2.6, 2.6, 0.25, 12).translate(0, 1.65, 0), ORO, 1.3));
    // Cuerpo enroscado que sube
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 26; i++) {
      const a = i * 0.42;
      const rr = 1.6 - i * 0.03;
      pts.push(new THREE.Vector3(Math.cos(a) * rr, 2.0 + i * 0.2, Math.sin(a) * rr));
    }
    pts.push(new THREE.Vector3(0.6, 7.6, 0.9), new THREE.Vector3(0.2, 8.6, 1.6));
    const curva = new THREE.CatmullRomCurve3(pts);
    piezas.push(pintar(new THREE.TubeGeometry(curva, 90, 0.55, 8), ORO));
    // Púas del lomo
    const c = new THREE.Vector3();
    for (let i = 2; i < 26; i += 2) {
      curva.getPointAt(i / 28, c);
      piezas.push(pintar(new THREE.ConeGeometry(0.22, 0.8, 5).translate(c.x, c.y + 0.6, c.z), ORO, 1.25));
    }
    // Cabeza: cráneo, hocico, mandíbula abierta, cuernos y melena
    const cab = new THREE.Vector3(0.2, 8.9, 2.0);
    piezas.push(pintar(new THREE.SphereGeometry(0.85, 10, 8).scale(1, 0.85, 1.2).translate(cab.x, cab.y, cab.z), ORO));
    piezas.push(pintar(new THREE.BoxGeometry(0.9, 0.5, 1.3).translate(cab.x, cab.y - 0.1, cab.z + 1.1), ORO));
    piezas.push(pintar(new THREE.BoxGeometry(0.8, 0.22, 1.2).rotateX(0.45).translate(cab.x, cab.y - 0.65, cab.z + 0.95), ORO, 0.9));
    for (const l of [-1, 1]) {
      piezas.push(pintar(new THREE.ConeGeometry(0.16, 1.8, 5).rotateX(-1.1).rotateZ(l * 0.3).translate(cab.x + l * 0.45, cab.y + 0.9, cab.z - 0.6), ORO, 1.3));
      piezas.push(pintar(new THREE.SphereGeometry(0.16, 6, 5).translate(cab.x + l * 0.42, cab.y + 0.2, cab.z + 0.7), 0x5fffd0, 3));
      for (let k = 0; k < 3; k++) piezas.push(pintar(new THREE.ConeGeometry(0.14, 1.0, 4).rotateZ(l * (0.9 + k * 0.3)).translate(cab.x + l * 0.7, cab.y + 0.1 - k * 0.3, cab.z - 0.5), ORO, 1.2));
    }
    // Garras delanteras
    for (const l of [-1, 1]) piezas.push(pintar(new THREE.CylinderGeometry(0.18, 0.25, 1.6, 6).rotateZ(l * 0.6).translate(l * 1.1, 6.2, 1.4), ORO));
    const geo = this.g(unir(piezas));
    const mat = this.m(new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.55, roughness: 0.3, emissive: 0x6a4208, emissiveIntensity: 1.1 }));
    const r = rnd(1688);
    const s = this.muestra(0);
    const ms: THREE.Matrix4[] = [];
    const N = 12;
    for (let i = 0; i < N; i++) {
      const t = 0.17 + (0.8 * (i + r() * 0.5)) / N;
      this.muestra(t, s);
      const lado = i % 2 === 0 ? -1 : 1;
      const dist = s.wallHalfWidth + 7.5;
      const x = s.position.x + s.binormal.x * dist * lado;
      const z = s.position.z + s.binormal.z * dist * lado;
      if (this.cercania(x, z).d < 4) continue;
      const top = s.position.y - 0.6;
      // Mira hacia los karts que llegan y un poco hacia la pista.
      const haciaKart = s.tangent.clone().negate().addScaledVector(s.binormal, -lado * 0.8).setY(0).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), haciaKart);
      ms.push(new THREE.Matrix4().compose(new THREE.Vector3(x, top, z), q, new THREE.Vector3(1.25, 1.25, 1.25)));
      this.estatuasPos.push(new THREE.Vector3(x, top, z));
      this.pilares.push(new THREE.Matrix4().compose(new THREE.Vector3(x, top, z), q, new THREE.Vector3(2.8, top - Y_SUELO, 2.8)));
    }
    const est = new THREE.InstancedMesh(geo, mat, Math.max(1, ms.length));
    ms.forEach((mt, i) => est.setMatrixAt(i, mt));
    est.count = ms.length;
    est.castShadow = true;
    est.frustumCulled = false;
    this.object.add(est);
  }

  // ------------------------------------------------------------------ mar de nubes
  private crearNubes(): void {
    const tex = texturaNubeBlanca();
    this.texs.push(tex);
    const r = rnd(5151);
    const N = 190;
    const pos = new Float32Array(N * 4 * 3);
    const esq = new Float32Array(N * 4 * 2);
    const tam = new Float32Array(N * 4 * 2);
    const alf = new Float32Array(N * 4);
    const idx: number[] = [];
    const s = this.muestra(0);
    const ext = this.radio + 280;
    for (let i = 0; i < N; i++) {
      let x: number;
      let z: number;
      let y: number;
      let w = 30 + r() * 45;
      let a = 0.38 + r() * 0.2;
      if (i >= 75 && i < 140) {
        // Niebla baja que asoma junto a las barandillas, a la altura de la pista.
        this.muestra(r(), s);
        const lado = r() < 0.5 ? -1 : 1;
        const d = s.wallHalfWidth + 7 + r() * 14;
        x = s.position.x + s.binormal.x * d * lado;
        z = s.position.z + s.binormal.z * d * lado;
        y = s.position.y - 4.2 + r() * 1.5;
        if (this.cercania(x, z).d < 5) y -= 9;
        w = 14 + r() * 14;
        a = 0.4 + r() * 0.1;
      } else if (i < 75) {
        // Junto a la pista, por debajo del tablero: «la pista sobre las nubes».
        this.muestra(r(), s);
        const lado = r() < 0.5 ? -1 : 1;
        const d = s.wallHalfWidth + 8 + r() * 45;
        x = s.position.x + s.binormal.x * d * lado;
        z = s.position.z + s.binormal.z * d * lado;
        y = s.position.y - 6 - r() * 22;
      } else {
        const a = r() * Math.PI * 2;
        const rad = this.radio * 0.6 + r() * ext;
        x = this.centro.x + Math.cos(a) * rad;
        z = this.centro.z + Math.sin(a) * rad;
        y = Y_SUELO + 14 + r() * 60;
      }
      const esquinas = [-1, -1, 1, -1, 1, 1, -1, 1];
      for (let k = 0; k < 4; k++) {
        const v = i * 4 + k;
        pos.set([x, y, z], v * 3);
        esq.set([esquinas[k * 2], esquinas[k * 2 + 1]], v * 2);
        tam.set([w, w * 0.42], v * 2);
        alf[v] = a;
      }
      const b = i * 4;
      idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
    }
    const geo = this.g(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('esquina', new THREE.BufferAttribute(esq, 2));
    geo.setAttribute('tam', new THREE.BufferAttribute(tam, 2));
    geo.setAttribute('alfa', new THREE.BufferAttribute(alf, 1));
    geo.setIndex(idx);
    const mat = this.m(
      new THREE.ShaderMaterial({
        vertexShader: VERT_NUBE,
        fragmentShader: FRAG_NUBE,
        transparent: true,
        depthWrite: false,
        uniforms: {
          map: { value: tex },
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0x7d7096) },
          uLuz: { value: new THREE.Color(0xb9a8c8) },
          uRosa: { value: new THREE.Color(0xff6aa8) },
        },
      }),
    );
    this.matNubes = mat;
    const nubes = new THREE.Mesh(geo, mat);
    nubes.frustumCulled = false;
    nubes.renderOrder = 1;
    this.object.add(nubes);
  }

  // ------------------------------------------------------------------ calle china junto a la pista
  /**
   * Edificios chinos rojos de dos plantas (y torres-puerta de tres) en fila a los lados del viaducto,
   * con tejados de jade, columnas lacadas, farolillos bajo el alero y rótulos de neón.
   */
  private crearCalle(): void {
    const def = this.track.def;
    const L = this.track.length;
    const r = rnd(4096);
    const s = this.muestra(0);
    const tipos = [
      { W: 12, D: 9 },
      { W: 8, D: 7.5 },
    ];
    const inst: THREE.Matrix4[][] = [[], []];
    const idsH = this.rotulos.ids(false);
    const idsV = this.rotulos.ids(true);
    const Y = new THREE.Vector3(0, 1, 0);
    for (const lado of [-1, 1]) {
      let pos = 6 + r() * 8;
      while (pos < L - 8) {
        const tipo = r() < 0.68 ? 0 : 1;
        const esc = 0.9 + r() * 0.3;
        const W = tipos[tipo].W * esc;
        const D = tipos[tipo].D * esc;
        pos += W / 2;
        const t = pos / L;
        const avance = W / 2 + 2 + r() * 9;
        this.muestra(t, s);
        const off = s.wallHalfWidth + 8.5 + r() * 3;
        const cx = s.position.x + s.binormal.x * lado * (off + D / 2);
        const cz = s.position.z + s.binormal.z * lado * (off + D / 2);
        const tan = new THREE.Vector3(s.tangent.x, 0, s.tangent.z).normalize();
        const haciaPista = new THREE.Vector3(-s.binormal.x * lado, 0, -s.binormal.z * lado).normalize();
        let ok = !esVacio(def, t) && r() > 0.12;
        // Que no pise otra parte de la pista, ni estatuas ni pagodas.
        if (ok) {
          for (const [a, b] of [[0, 0], [-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]] as const) {
            const px = cx + tan.x * a * W - haciaPista.x * b * D;
            const pz = cz + tan.z * a * W - haciaPista.z * b * D;
            const c = this.cercania(px, pz);
            if (c.d < 4 || Math.abs(c.y - s.position.y) > 4) ok = false;
          }
        }
        if (ok && this.estatuasPos.some((p) => Math.hypot(p.x - cx, p.z - cz) < W / 2 + 6)) ok = false;
        if (ok && this.pagodasPos.some((p) => Math.hypot(p.x - cx, p.z - cz) < W / 2 + 12)) ok = false;
        if (!ok) {
          pos += avance;
          continue;
        }
        const base = s.position.y - 0.4;
        const m = new THREE.Matrix4().makeBasis(tan, Y, haciaPista).scale(new THREE.Vector3(esc, esc, esc)).setPosition(cx, base, cz);
        inst[tipo].push(m);
        // Podio desde el suelo de la ciudad y fuera los rascacielos que pisaría.
        const giro = Math.atan2(-tan.z, tan.x);
        for (let k = this.edificios.length - 1; k >= 0; k--) {
          const e = this.edificios[k];
          if (Math.hypot(e.x - cx, e.z - cz) < Math.max(e.w, e.d) / 2 + W / 2 + 1 && e.top > base - 30) this.edificios.splice(k, 1);
        }
        this.edificios.push({ x: cx, z: cz, w: W, d: D, base: Y_SUELO, top: base, giro, tono: new THREE.Color(0xffb347), neon: false, corona: false });
        // Farolillos bajo el alero, del lado de la pista.
        const xs = tipo === 0 ? [-3.6, 0, 3.6] : [-2.2, 2.2];
        const zf = (tipos[tipo].D / 2 + 1.3);
        for (const lx of xs) {
          const p = new THREE.Vector3(lx, tipo === 0 ? 3.7 : 3.3, zf).applyMatrix4(m);
          this.farolillos.push(new THREE.Matrix4().compose(p, new THREE.Quaternion(), new THREE.Vector3(1.05, 1.3, 1.05)));
        }
        // Rótulos de neón: uno en la fachada de la planta alta (girado hacia los karts que llegan)
        // y a veces una banderola vertical en la esquina.
        if (r() < 0.75) {
          const p = new THREE.Vector3(0, tipo === 0 ? 7.2 : 6.0, tipos[tipo].D * (tipo === 0 ? 0.34 : 0.36) + 0.35).applyMatrix4(m);
          const n = haciaPista.clone().addScaledVector(tan, -0.55).normalize();
          this.rotulos.poner(idsH[Math.floor(r() * idsH.length)], p, n, (tipo === 0 ? 3.8 : 3.0) * esc);
        }
        if (r() < 0.55) {
          const p = new THREE.Vector3(-tipos[tipo].W / 2 + 0.2, 7.0, tipos[tipo].D / 2 + 0.6).applyMatrix4(m);
          this.rotulos.poner(idsV[Math.floor(r() * idsV.length)], p, tan.clone().negate(), 8.4 * esc);
        }
        // Valla de neón grande sobre el tejado, mirando a los karts que llegan.
        if (tipo === 0 && r() < 0.35) {
          const p = new THREE.Vector3(0, 13.1, 0).applyMatrix4(m);
          const n = tan.clone().negate().addScaledVector(haciaPista, 0.5).normalize();
          this.rotulos.poner(idsH[Math.floor(r() * idsH.length)], p, n, 4.8 * esc);
        }
        pos += avance;
      }
    }
    // Geometrías: [cuerpo con ventanas, adornos con color de vértice] por tipo.
    const cuerpo0 = unir([new THREE.BoxGeometry(11, 4.4, 8).translate(0, 2.2, 0), new THREE.BoxGeometry(8.4, 3.4, 6).translate(0, 6.1, 0)].map((g) => pintar(g, 0xffffff)));
    const adorno0 = unir([
      pintar(new THREE.BoxGeometry(12, 0.5, 9).translate(0, 0.25, 0), 0x2a1a1e),
      pintar(new THREE.BoxGeometry(11.4, 0.3, 8.4).translate(0, 4.45, 0), ORO, 1.1),
      pintar(new THREE.BoxGeometry(13.2, 0.24, 10.2).translate(0, 4.36, 0), LACA, 1.1),
      pintar(tejadoChino(14, 1.4, 0.8).scale(1, 1, 0.78).translate(0, 4.5, 0), JADE, 0.8),
      pintar(new THREE.BoxGeometry(13.6, 0.12, 10.6).translate(0, 4.52, 0), ORO, 1.2),
      pintar(new THREE.BoxGeometry(10.6, 0.22, 8.4).translate(0, 7.7, 0), LACA, 1.1),
      pintar(tejadoChino(11.5, 3.0, 1.3).scale(1, 1, 0.8).translate(0, 7.8, 0), JADE, 0.8),
      pintar(new THREE.BoxGeometry(4.2, 0.35, 0.45).translate(0, 10.75, 0), ORO, 1.3),
      pintar(new THREE.ConeGeometry(0.3, 1.1, 5).rotateZ(0.5).translate(-2.2, 11.1, 0), ORO, 1.3),
      pintar(new THREE.ConeGeometry(0.3, 1.1, 5).rotateZ(-0.5).translate(2.2, 11.1, 0), ORO, 1.3),
      ...[-4.6, -1.6, 1.6, 4.6].map((x) => pintar(new THREE.CylinderGeometry(0.24, 0.28, 4.4, 8).translate(x, 2.2, 4.6), LACA, 1.2)),
    ]);
    const cuerpo1 = unir([new THREE.BoxGeometry(7, 4, 6.5).translate(0, 2, 0), new THREE.BoxGeometry(5.6, 3.0, 5.2).translate(0, 5.6, 0), new THREE.BoxGeometry(4.4, 2.6, 4).translate(0, 8.8, 0)].map((g) => pintar(g, 0xffffff)));
    const adorno1 = unir([
      pintar(new THREE.BoxGeometry(8, 0.5, 7.5).translate(0, 0.25, 0), 0x2a1a1e),
      pintar(new THREE.BoxGeometry(9.2, 0.22, 8.2).translate(0, 3.88, 0), LACA, 1.1),
      pintar(tejadoChino(10, 1.3, 0.7).scale(1, 1, 0.9).translate(0, 4.0, 0), JADE, 0.8),
      pintar(new THREE.BoxGeometry(9.6, 0.12, 8.6).translate(0, 4.02, 0), ORO, 1.2),
      pintar(tejadoChino(8, 1.2, 0.6).scale(1, 1, 0.9).translate(0, 7.1, 0), JADE, 0.8),
      pintar(tejadoChino(6.6, 2.6, 1.1).scale(1, 1, 0.9).translate(0, 10.1, 0), JADE, 0.8),
      pintar(new THREE.CylinderGeometry(0.08, 0.2, 2.4, 6).translate(0, 13.4, 0), ORO, 1.4),
      pintar(new THREE.SphereGeometry(0.35, 8, 6).translate(0, 12.9, 0), ORO, 1.4),
      ...[-2.8, 2.8].map((x) => pintar(new THREE.CylinderGeometry(0.22, 0.26, 4, 8).translate(x, 2, 3.7), LACA, 1.2)),
    ]);
    const tex = texturaCanvas(128, 64, (c) => {
      c.fillStyle = '#9a1020';
      c.fillRect(0, 0, 128, 64);
      for (let i = 0; i < 4; i++) {
        c.fillStyle = i === 2 ? '#3a1a10' : '#ffb04a';
        c.fillRect(8 + i * 30, 14, 22, 38);
        c.strokeStyle = '#6a2a06';
        c.lineWidth = 2;
        c.strokeRect(8 + i * 30, 14, 22, 38);
        c.beginPath();
        for (let k = 1; k < 3; k++) {
          c.moveTo(8 + i * 30 + (22 * k) / 3, 14);
          c.lineTo(8 + i * 30 + (22 * k) / 3, 52);
          c.moveTo(8 + i * 30, 14 + (38 * k) / 3);
          c.lineTo(30 + i * 30, 14 + (38 * k) / 3);
        }
        c.stroke();
      }
      c.fillStyle = '#f2c14e';
      c.fillRect(0, 0, 128, 4);
      c.fillRect(0, 60, 128, 4);
    }, false);
    const emis = texturaCanvas(128, 64, (c) => {
      c.fillStyle = '#300006';
      c.fillRect(0, 0, 128, 64);
      // ventanas ámbar #ffb04a; ~30 % apagadas
      for (let i = 0; i < 4; i++) {
        if (i === 2) continue;
        c.fillStyle = i === 1 ? '#c9822f' : '#ffb04a';
        c.fillRect(8 + i * 30, 14, 22, 38);
      }
    }, false);
    this.texs.push(tex, emis);
    const matCuerpo = this.m(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: emis, emissive: 0xffffff, emissiveIntensity: 1.0, roughness: 0.5 }));
    const matAdorno = this.m(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.3, emissive: 0x141016, emissiveIntensity: 1, side: THREE.DoubleSide }));
    [
      [cuerpo0, adorno0],
      [cuerpo1, adorno1],
    ].forEach(([gc, ga], k) => {
      this.g(gc);
      this.g(ga);
      const lista = inst[k];
      if (!lista.length) return;
      const mc = new THREE.InstancedMesh(gc, matCuerpo, lista.length);
      const ma = new THREE.InstancedMesh(ga, matAdorno, lista.length);
      lista.forEach((mt, i) => {
        mc.setMatrixAt(i, mt);
        ma.setMatrixAt(i, mt);
      });
      mc.frustumCulled = ma.frustumCulled = false;
      this.object.add(mc, ma);
    });
  }

  // ------------------------------------------------------------------ pórtico-rótulo sobre la pista
  private crearPortico(): void {
    const s = this.muestra(0);
    const porticos = [0.255, 0.6];
    for (const t of porticos) {
      this.muestra(t, s);
      if (esVacio(this.track.def, t)) continue;
      this.rotulos.portico(s.position.clone(), s.tangent.clone(), s.binormal.clone(), s.wallHalfWidth + 0.4);
    }
    // Un rótulo grande colgando sobre la pista cada ~150 m.
    const L = this.track.length;
    const ids = ['nihong', 'xiyou', 'longdao', 'longcheng', 'jisu', 'wukong'];
    let k = 0;
    for (let m = 150; m < L - 60; m += 150) {
      const t = m / L;
      if (esVacio(this.track.def, t) || porticos.some((p) => Math.abs(p - t) < 0.05)) continue;
      this.muestra(t, s);
      this.rotulos.colgante(ids[k++ % ids.length], s.position.clone(), s.tangent.clone(), s.binormal.clone(), s.wallHalfWidth + 0.6);
    }
  }

  // ------------------------------------------------------------------ rótulos verticales en los rascacielos
  private crearRotulosTorres(): void {
    const r = rnd(777);
    const ids = this.rotulos.ids(true);
    const idsH = this.rotulos.ids(false);
    let n = 0;
    const v = new THREE.Vector3();
    for (const e of this.edificios) {
      if (n >= 46 || !e.neon || r() < 0.35) continue;
      const q = this.track.query(v.set(e.x, 0, e.z));
      const d = Math.abs(q.lateral) - q.wallHalfWidth;
      if (d < 20 || d > 130) continue;
      // cara del edificio que mira a la pista
      const dx = q.center.x - e.x;
      const dz = q.center.z - e.z;
      const c = Math.cos(e.giro);
      const sn = Math.sin(e.giro);
      const lx = dx * c - dz * sn;
      const lz = dx * sn + dz * c;
      let nx: number;
      let nz: number;
      let semi: number;
      if (Math.abs(lx) / e.w > Math.abs(lz) / e.d) {
        nx = Math.sign(lx);
        nz = 0;
        semi = e.w / 2;
      } else {
        nx = 0;
        nz = Math.sign(lz);
        semi = e.d / 2;
      }
      // de local a mundo (giro alrededor de Y)
      const wx = nx * c + nz * sn;
      const wz = -nx * sn + nz * c;
      const normal = new THREE.Vector3(wx, 0, wz);
      const vertical = r() < 0.6;
      const alto = vertical ? 12 + r() * 8 : 4 + r() * 3;
      const yc = Math.min(e.top - alto / 2 - 3, q.center.y + 8 + r() * 16);
      if (yc - alto / 2 < Y_SUELO + 4) continue;
      const p = new THREE.Vector3(e.x + wx * (semi + 0.4), yc, e.z + wz * (semi + 0.4));
      this.rotulos.poner(vertical ? ids[Math.floor(r() * ids.length)] : idsH[Math.floor(r() * idsH.length)], p, normal, alto);
      n++;
    }
  }

  // ------------------------------------------------------------------ focos de luz que barren el cielo
  private crearFocos(): void {
    const r = rnd(2468);
    const N = 9;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + r() * 0.4;
      const rad = this.radio + 40 + r() * 160;
      this.datosFocos.push({
        p: new THREE.Vector3(this.centro.x + Math.cos(a) * rad, Y_SUELO + 30 + r() * 60, this.centro.z + Math.sin(a) * rad),
        fase: r() * Math.PI * 2,
        vel: (0.12 + r() * 0.18) * (r() < 0.5 ? -1 : 1),
        incl: 0.22 + r() * 0.35,
        largo: 240 + r() * 120,
        ancho: 10 + r() * 8,
      });
    }
    const geo = this.g(new THREE.CylinderGeometry(1, 0.06, 1, 18, 1, true).translate(0, 0.5, 0));
    const col = new Float32Array(N * 3);
    const tonos = [0xcfe3ff, 0xffd0f0, 0xbff8ff];
    for (let i = 0; i < N; i++) {
      const c = new THREE.Color(tonos[i % tonos.length]);
      col.set([c.r, c.g, c.b], i * 3);
    }
    geo.setAttribute('aColor', new THREE.InstancedBufferAttribute(col, 3));
    const mat = this.m(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        vertexShader: `
          attribute vec3 aColor;
          varying float vY;
          varying vec3 vN;
          varying vec3 vW;
          varying vec3 vC;
          void main() {
            vY = position.y;
            vC = aColor;
            vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
            vW = w.xyz;
            vN = normalize(mat3(modelMatrix * instanceMatrix) * vec3(normal.x, 0.0, normal.z));
            gl_Position = projectionMatrix * viewMatrix * w;
          }`,
        fragmentShader: `
          varying float vY;
          varying vec3 vN;
          varying vec3 vW;
          varying vec3 vC;
          void main() {
            vec3 V = normalize(cameraPosition - vW);
            float centro = pow(abs(dot(normalize(vN), V)), 2.6);
            float a = centro * pow(1.0 - vY, 1.8) * 0.08;
            gl_FragColor = vec4(vC * a, 1.0);
          }`,
      }),
    );
    this.focos = new THREE.InstancedMesh(geo, mat, N);
    this.focos.frustumCulled = false;
    this.focos.renderOrder = 4;
    this.object.add(this.focos);
    this.update(0);
  }

  private readonly mFoco = new THREE.Matrix4();
  private readonly qFoco = new THREE.Quaternion();
  private readonly eFoco = new THREE.Euler();
  private readonly sFoco = new THREE.Vector3();

  update(tiempo: number): void {
    if (this.matNubes) this.matNubes.uniforms.uTime.value = tiempo;
    this.rotulos.update(tiempo);
    if (this.focos) {
      this.datosFocos.forEach((f, i) => {
        const giro = f.fase + tiempo * f.vel;
        const incl = f.incl + 0.12 * Math.sin(tiempo * 0.4 + f.fase);
        this.eFoco.set(incl, giro, 0, 'YXZ');
        this.qFoco.setFromEuler(this.eFoco);
        this.sFoco.set(f.ancho, f.largo, f.ancho);
        this.mFoco.compose(f.p, this.qFoco, this.sFoco);
        this.focos?.setMatrixAt(i, this.mFoco);
      });
      this.focos.instanceMatrix.needsUpdate = true;
    }
  }

  dispose(): void {
    this.rotulos.dispose();
    this.object.removeFromParent();
    for (const o of this.ocultos) o.visible = true;
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    for (const t of this.texs) t.dispose();
  }
}
