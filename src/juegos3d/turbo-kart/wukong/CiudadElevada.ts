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

/** Altura del suelo de la ciudad (la pista va de y ≈ 0 a 6,5). */
export const Y_SUELO = -46;

const JADE = 0x1f9a7c;
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
attribute vec2 esquina;
attribute vec2 tam;
attribute float alfa;
varying vec2 vUv;
varying float vA;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  mv.xy += esquina * tam;
  vUv = esquina * 0.5 + 0.5;
  float d = -mv.z;
  vA = alfa * smoothstep(12.0, 55.0, d) * (1.0 - smoothstep(520.0, 900.0, d));
  gl_Position = projectionMatrix * mv;
}`;

const FRAG_NUBE = /* glsl */ `
uniform sampler2D map;
uniform vec3 uColor;
uniform vec3 uLuz;
varying vec2 vUv;
varying float vA;
void main() {
  vec4 t = texture2D(map, vUv);
  vec3 c = mix(uColor, uLuz, t.r * (1.0 - vUv.y) * 0.6);
  gl_FragColor = vec4(c, t.a * vA);
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
    this.crearEdificios();
    this.crearPilares();
    this.crearNubes();
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
      this.m(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.3, emissive: 0x0d3a2c, emissiveIntensity: 1, side: THREE.DoubleSide })),
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
    const matAdorno = this.m(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.35, emissive: 0x123a2e, emissiveIntensity: 1, side: THREE.DoubleSide }));
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
    const tex = texturaCanvas(
      128,
      128,
      (c) => {
        for (let i = 0; i < 14; i++) {
          const x = 24 + Math.random() * 80;
          const y = 46 + Math.random() * 40;
          const rad = 18 + Math.random() * 26;
          const g = c.createRadialGradient(x, y - rad * 0.3, 2, x, y, rad);
          g.addColorStop(0, 'rgba(255,255,255,0.5)');
          g.addColorStop(0.6, 'rgba(200,200,220,0.25)');
          g.addColorStop(1, 'rgba(160,160,200,0)');
          c.fillStyle = g;
          c.fillRect(0, 0, 128, 128);
        }
      },
      false,
    );
    this.texs.push(tex);
    const r = rnd(5151);
    const N = 120;
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
      if (i < 75) {
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
      const w = 30 + r() * 45;
      const a = 0.55 + r() * 0.35;
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
        uniforms: { map: { value: tex }, uColor: { value: new THREE.Color(0x8e88b8) }, uLuz: { value: new THREE.Color(0xf4eeff) } },
      }),
    );
    const nubes = new THREE.Mesh(geo, mat);
    nubes.frustumCulled = false;
    nubes.renderOrder = 1;
    this.object.add(nubes);
  }

  dispose(): void {
    this.object.removeFromParent();
    for (const o of this.ocultos) o.visible = true;
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    for (const t of this.texs) t.dispose();
  }
}
