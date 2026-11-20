/**
 * Wukong Turbo Rush · rótulos de neón en chino (y español) para la Ciudad del Dragón:
 * 西游极速, 龙道, 霓虹城市, 龙城… en fachadas, banderolas verticales y un pórtico-rótulo
 * «霓虹城市 · Ciudad Neón» sobre la pista. Un atlas de canvas y UNA InstancedMesh con un shader que
 * hace brillar el tubo de neón (por encima del umbral de bloom) y parpadear cada rótulo a su ritmo.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const FUENTE = '"Noto Sans CJK SC","Noto Sans SC","PingFang SC","Microsoft YaHei","Source Han Sans SC",sans-serif';

interface DefRotulo {
  txt: string;
  sub?: string;
  color: string;
  vertical?: boolean;
  portal?: boolean;
}

/** Rótulos del atlas (las claves se usan en `poner`). */
const ROTULOS: Record<string, DefRotulo> = {
  xiyou: { txt: '西游极速', sub: 'WUKONG TURBO', color: '#ff3fb4' },
  longdao: { txt: '龙道', sub: 'VÍA DEL DRAGÓN', color: '#b25cff' },
  nihong: { txt: '霓虹城市', sub: 'CIUDAD NEÓN', color: '#ff2a4a' },
  longcheng: { txt: '龙城', sub: 'CIUDAD DEL DRAGÓN', color: '#ff58d8' },
  xiyouMorado: { txt: '西游极速', color: '#c06bff' },
  longdaoRojo: { txt: '龙道', color: '#ff304e' },
  nihongRosa: { txt: '霓虹城市', color: '#ff5fc8' },
  jisu: { txt: '极速', sub: 'TURBO', color: '#3ff0ff' },
  huoguo: { txt: '火锅', sub: 'OLLA CALIENTE', color: '#ffb02e' },
  chaguan: { txt: '茶馆', sub: 'CASA DE TÉ', color: '#4dffb0' },
  wukong: { txt: '悟空', sub: 'WUKONG', color: '#ffd23f' },
  portal: { txt: '霓虹城市', sub: 'CIUDAD NEÓN', color: '#ff3a8c', portal: true },
  vXiyou: { txt: '西游极速', color: '#ff3fb4', vertical: true },
  vNihong: { txt: '霓虹城市', color: '#b25cff', vertical: true },
  vLongdao: { txt: '龙道', color: '#ff304e', vertical: true },
  vLongcheng: { txt: '龙城', color: '#3ff0ff', vertical: true },
};

const AT = 1024;
const HW = 384;
const HH = 144;
const VW = 128;
const VH = 504;

interface Celda {
  u: number;
  v: number;
  du: number;
  dv: number;
  aspecto: number;
}

function caja(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function neon(c: CanvasRenderingContext2D, color: string, dibujar: () => void, grueso: number): void {
  c.save();
  c.shadowColor = color;
  c.strokeStyle = color;
  c.fillStyle = color;
  c.shadowBlur = grueso * 2.2;
  dibujar();
  c.shadowBlur = grueso;
  dibujar();
  c.shadowBlur = 0;
  c.globalAlpha = 0.55;
  c.fillStyle = '#fff3fb';
  c.strokeStyle = '#fff3fb';
  c.lineWidth = Math.max(1, c.lineWidth * 0.35);
  dibujar();
  c.restore();
}

function pintarCelda(c: CanvasRenderingContext2D, d: DefRotulo, x: number, y: number, w: number, h: number): void {
  c.save();
  c.beginPath();
  c.rect(x, y, w, h);
  c.clip();
  // tablero oscuro
  caja(c, x + 4, y + 4, w - 8, h - 8, 12);
  c.fillStyle = d.portal ? '#3a0610' : '#12061c';
  c.fill();
  if (d.portal) {
    c.strokeStyle = '#ffd36a';
    c.lineWidth = 6;
    caja(c, x + 10, y + 10, w - 20, h - 20, 10);
    c.stroke();
  }
  // marco de neón doble: rosa por fuera y cian por dentro (el pórtico, dorado y rosa)
  c.lineWidth = 4;
  neon(c, d.portal ? d.color : '#ff4fb0', () => {
    caja(c, x + 14, y + 14, w - 28, h - 28, 10);
    c.stroke();
  }, 10);
  if (!d.portal) {
    c.lineWidth = 2.5;
    neon(c, '#3ff0ff', () => {
      caja(c, x + 23, y + 23, w - 46, h - 46, 7);
      c.stroke();
    }, 6);
  }
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  if (d.vertical) {
    const chars = [...d.txt];
    const paso = (h - 70) / chars.length;
    const tam = Math.min(w - 50, paso * 0.86);
    c.font = `900 ${tam}px ${FUENTE}`;
    chars.forEach((ch, i) => neon(c, d.color, () => c.fillText(ch, x + w / 2, y + 30 + paso * (i + 0.5)), 12));
  } else {
    const tamCh = d.sub ? h * 0.5 : h * 0.62;
    c.font = `900 ${tamCh}px ${FUENTE}`;
    const yCh = y + (d.sub ? h * 0.43 : h * 0.52);
    neon(c, d.color, () => c.fillText(d.txt, x + w / 2, yCh, w - 50), 12);
    if (d.sub) {
      c.font = `800 ${h * 0.16}px "Arial Black", Impact, sans-serif`;
      neon(c, d.portal ? '#ffd36a' : '#ffffff', () => c.fillText(d.sub as string, x + w / 2, y + h * 0.8, w - 60), 5);
    }
  }
  c.restore();
}

const VERT = /* glsl */ `
#include <common>
#include <fog_pars_vertex>
attribute vec4 aRect;
attribute float aFase;
varying vec2 vUv;
varying float vF;
void main() {
  vUv = aRect.xy + uv * aRect.zw;
  vF = aFase;
  vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * w;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;

const FRAG = /* glsl */ `
#include <common>
#include <fog_pars_fragment>
uniform sampler2D map;
uniform float uTime;
uniform float uAnim;
varying vec2 vUv;
varying float vF;
void main() {
  vec4 t = texture2D(map, vUv);
  if (t.a < 0.1) discard;
  float lum = max(t.r, max(t.g, t.b));
  // pulso lento, con fase y velocidad propias de cada rótulo
  float parp = 0.92 + 0.08 * sin(uTime * (0.7 + fract(vF * 7.0) * 1.3) + vF * 20.0);
  // de vez en cuando un rótulo titila (tubo de neón viejo)
  float corte = step(0.98, fract(sin(floor(uTime * 3.0 + vF * 31.0)) * 43758.5453));
  parp *= 1.0 - corte * 0.45;
  parp = mix(1.0, parp, uAnim);
  // solo el tubo de neón pasa del umbral de bloom; el resto queda oscuro
  vec3 col = t.rgb * (0.55 + 1.15 * lum * lum) * parp;
  gl_FragColor = vec4(col, 1.0);
  #include <fog_fragment>
}`;

export class RotulosNeon {
  readonly object = new THREE.Group();
  private readonly celdas = new Map<string, Celda>();
  private readonly tex: THREE.CanvasTexture;
  private readonly mat: THREE.ShaderMaterial;
  private readonly lista: { m: THREE.Matrix4; c: Celda; f: number }[] = [];
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly mats: THREE.Material[] = [];
  private readonly marcos: THREE.BufferGeometry[] = [];
  private readonly tubos: THREE.BufferGeometry[] = [];

  constructor() {
    const cv = document.createElement('canvas');
    cv.width = AT;
    cv.height = AT;
    const c = cv.getContext('2d');
    let hx = 0;
    let hy = 0;
    let vx = 2 * HW;
    let vy = 0;
    for (const [id, d] of Object.entries(ROTULOS)) {
      let x: number;
      let y: number;
      let w: number;
      let h: number;
      if (d.vertical) {
        x = vx;
        y = vy;
        w = VW;
        h = VH;
        vx += VW;
        if (vx + VW > AT) {
          vx = 2 * HW;
          vy += VH;
        }
      } else {
        x = hx * HW;
        y = hy * HH;
        w = HW;
        h = HH;
        hx++;
        if (hx >= 2) {
          hx = 0;
          hy++;
        }
      }
      if (c) pintarCelda(c, d, x, y, w, h);
      this.celdas.set(id, { u: x / AT, v: 1 - (y + h) / AT, du: w / AT, dv: h / AT, aspecto: w / h });
    }
    this.tex = new THREE.CanvasTexture(cv);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.anisotropy = 4;
    this.tex.generateMipmaps = true;
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      fog: true,
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { map: { value: null }, uTime: { value: 0 }, uAnim: { value: 1 } }]),
    });
    this.mat.uniforms.map.value = this.tex;
  }

  /** Coloca un rótulo con su centro en `pos`, mirando hacia `normal`, de `alto` metros. */
  poner(id: string, pos: THREE.Vector3, normal: THREE.Vector3, alto: number): void {
    const c = this.celdas.get(id);
    if (!c) return;
    const z = normal.clone().normalize();
    const x = new THREE.Vector3(0, 1, 0).cross(z);
    if (x.lengthSq() < 1e-4) x.set(1, 0, 0);
    x.normalize();
    const y = new THREE.Vector3().crossVectors(z, x);
    const m = new THREE.Matrix4().makeBasis(x.multiplyScalar(alto * c.aspecto), y.multiplyScalar(alto), z).setPosition(pos);
    this.lista.push({ m, c, f: Math.random() });
  }

  ids(vertical: boolean): string[] {
    return Object.entries(ROTULOS)
      .filter(([, d]) => !!d.vertical === vertical && !d.portal)
      .map(([k]) => k);
  }

  /**
   * Pórtico-rótulo sobre la pista: dos postes lacados con remates dorados, viga y el panel
   * «霓虹城市 · CIUDAD NEÓN» por las dos caras.
   */
  portico(centro: THREE.Vector3, tangente: THREE.Vector3, binormal: THREE.Vector3, semiancho: number): void {
    const H = 8.5;
    const fondo = tangente.clone().setY(0).normalize();
    const lat = binormal.clone().setY(0).normalize();
    const m = new THREE.Matrix4().makeBasis(lat, new THREE.Vector3(0, 1, 0), fondo).setPosition(centro);
    const col = (g: THREE.BufferGeometry, hex: number, k = 1): THREE.BufferGeometry => {
      g.deleteAttribute('uv');
      const n = g.getAttribute('position').count;
      const cc = new THREE.Color(hex).multiplyScalar(k);
      const a = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) a.set([cc.r, cc.g, cc.b], i * 3);
      g.setAttribute('color', new THREE.BufferAttribute(a, 3));
      return g.applyMatrix4(m);
    };
    for (const l of [-1, 1]) {
      const x = l * (semiancho + 0.8);
      this.marcos.push(col(new THREE.BoxGeometry(0.9, H, 0.9).translate(x, H / 2, 0), 0x1a0c14));
      this.marcos.push(col(new THREE.BoxGeometry(1.4, 0.6, 1.4).translate(x, 0.3, 0), 0xf2c14e, 0.9));
      this.marcos.push(col(new THREE.ConeGeometry(0.5, 1.1, 4).rotateY(Math.PI / 4).translate(x, H + 1.3, 0), 0xf2c14e, 1.1));
      this.tubos.push(col(new THREE.BoxGeometry(0.12, H, 0.12).translate(x - l * 0.52, H / 2, -0.5), 0xff3a8c, 1.3));
      this.tubos.push(col(new THREE.BoxGeometry(0.12, H, 0.12).translate(x - l * 0.52, H / 2, 0.5), 0xff3a8c, 1.3));
    }
    const ancho = semiancho * 2 + 1.6;
    this.marcos.push(col(new THREE.BoxGeometry(ancho + 0.9, 0.7, 1.0).translate(0, H + 0.4, 0), 0x1a0c14));
    this.marcos.push(col(new THREE.BoxGeometry(ancho + 1.4, 0.18, 1.2).translate(0, H + 0.8, 0), 0xf2c14e, 0.9));
    this.tubos.push(col(new THREE.BoxGeometry(ancho, 0.1, 0.1).translate(0, H + 0.05, 0.55), 0x7ffff0, 1.2));
    this.tubos.push(col(new THREE.BoxGeometry(ancho, 0.1, 0.1).translate(0, H + 0.05, -0.55), 0x7ffff0, 1.2));
    // panel central por ambas caras
    const panel = centro.clone().add(new THREE.Vector3(0, H - 1.4, 0));
    this.poner('portal', panel.clone().addScaledVector(fondo, -0.56), fondo.clone().negate(), 3.4);
    this.poner('portal', panel.clone().addScaledVector(fondo, 0.56), fondo, 3.4);
    // rótulos pequeños a los lados del panel
    this.poner('longdao', centro.clone().addScaledVector(lat, -semiancho * 0.62).add(new THREE.Vector3(0, H - 1.0, 0)).addScaledVector(fondo, -0.56), fondo.clone().negate(), 1.4);
    this.poner('xiyou', centro.clone().addScaledVector(lat, semiancho * 0.62).add(new THREE.Vector3(0, H - 1.0, 0)).addScaledVector(fondo, -0.56), fondo.clone().negate(), 1.4);
  }

  /** Rótulo grande colgado sobre la pista de un cable entre dos mástiles (por las dos caras). */
  colgante(id: string, centro: THREE.Vector3, tangente: THREE.Vector3, binormal: THREE.Vector3, semiancho: number): void {
    const H = 12.5;
    const fondo = tangente.clone().setY(0).normalize();
    const lat = binormal.clone().setY(0).normalize();
    const m = new THREE.Matrix4().makeBasis(lat, new THREE.Vector3(0, 1, 0), fondo).setPosition(centro);
    const col = (g: THREE.BufferGeometry, hex: number, k = 1): THREE.BufferGeometry => {
      g.deleteAttribute('uv');
      const n = g.getAttribute('position').count;
      const cc = new THREE.Color(hex).multiplyScalar(k);
      const a = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) a.set([cc.r, cc.g, cc.b], i * 3);
      g.setAttribute('color', new THREE.BufferAttribute(a, 3));
      return g.applyMatrix4(m);
    };
    for (const l of [-1, 1]) {
      const x = l * (semiancho + 1.2);
      this.marcos.push(col(new THREE.BoxGeometry(0.3, H, 0.3).translate(x, H / 2, 0), 0x1a0c14));
      this.marcos.push(col(new THREE.SphereGeometry(0.32, 8, 6).translate(x, H + 0.2, 0), 0xf2c14e, 1.1));
      // tirantes del rótulo
      this.marcos.push(col(new THREE.BoxGeometry(0.05, 1.6, 0.05).translate(l * 3.2, H - 1.4, 0), 0x2a2026));
    }
    this.marcos.push(col(new THREE.BoxGeometry((semiancho + 1.2) * 2, 0.08, 0.08).translate(0, H - 0.6, 0), 0x2a2026));
    const panel = centro.clone().add(new THREE.Vector3(0, H - 3.4, 0));
    this.poner(id, panel.clone().addScaledVector(fondo, -0.04), fondo.clone().negate(), 2.6);
    this.poner(id, panel.clone().addScaledVector(fondo, 0.04), fondo, 2.6);
  }

  construir(): void {
    if (this.lista.length) {
      const geo = new THREE.PlaneGeometry(1, 1);
      this.geos.push(geo);
      const n = this.lista.length;
      const rect = new Float32Array(n * 4);
      const fase = new Float32Array(n);
      const mesh = new THREE.InstancedMesh(geo, this.mat, n);
      this.lista.forEach((r, i) => {
        mesh.setMatrixAt(i, r.m);
        rect.set([r.c.u, r.c.v, r.c.du, r.c.dv], i * 4);
        fase[i] = r.f;
      });
      geo.setAttribute('aRect', new THREE.InstancedBufferAttribute(rect, 4));
      geo.setAttribute('aFase', new THREE.InstancedBufferAttribute(fase, 1));
      mesh.frustumCulled = false;
      mesh.name = 'rotulosNeon';
      this.object.add(mesh);
    }
    if (this.marcos.length) {
      const g = mergeGeometries(this.marcos);
      for (const x of this.marcos) x.dispose();
      if (g) {
        this.geos.push(g);
        const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.5, emissive: 0x1a0610, emissiveIntensity: 1 });
        this.mats.push(mat);
        const mm = new THREE.Mesh(g, mat);
        mm.frustumCulled = false;
        this.object.add(mm);
      }
    }
    if (this.tubos.length) {
      const g = mergeGeometries(this.tubos);
      for (const x of this.tubos) x.dispose();
      if (g) {
        this.geos.push(g);
        const mat = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
        this.mats.push(mat);
        const mm = new THREE.Mesh(g, mat);
        mm.frustumCulled = false;
        this.object.add(mm);
      }
    }
  }

  update(tiempo: number): void {
    this.mat.uniforms.uTime.value = tiempo;
  }

  /** Calidad baja: rótulos fijos, sin pulso ni titileo. */
  setCalidad(alta: boolean): void {
    this.mat.uniforms.uAnim.value = alta ? 1 : 0;
  }

  dispose(): void {
    this.object.removeFromParent();
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    this.mat.dispose();
    this.tex.dispose();
  }
}
