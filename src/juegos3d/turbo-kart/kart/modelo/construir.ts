/**
 * Montaje del vehículo-criatura: esculpe con el Taller (chasis + criatura + piloto + ruedas), crea
 * el esqueleto y las 4 mallas con piel (uber, pellejo, acentos y orbes) más la de las llamas, y
 * devuelve las piezas que Kart.ts anima. ~6 llamadas de dibujo por kart en carrera.
 */
import * as THREE from 'three';
import type { CharacterDef } from '../../core/types';
import { CHARACTERS } from '../roster';
import { Taller, CAPAS, type Acabado, type Capa, type HuesoDef } from './taller';
import { compartido, entorno, inyectarUber, materialUber, materialVelo, textura } from './materiales';
import { chasis, rueda, ESCAPES_DEF, WHEEL_R_F, WHEEL_R_R, WHEEL_W_F, WHEEL_W_R, WHEEL_X, WHEEL_Z_F, WHEEL_Z_R } from './chasis';
import { piloto } from './piloto';
import type { Criatura } from '../criaturas/comun';
import { CRIATURAS, CRIATURA_POR_INDICE } from '../criaturas';

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
  /** Color de las llamas [normal, turbo]. */
  flameColors: [number, number];
  /** Ojos y perla de la criatura (laten). */
  orbMaterial: THREE.MeshStandardMaterial;
  /**
   * Animación de la criatura: respiración, suspensión, cabeza, cola/bigotes, alas, aliento con el
   * turbo y estela de nubes al derrapar. `steer` -1..1 (positivo = derecha), `speed01` 0..1,
   * `boost` 0..1, `drift` -1/0/1.
   */
  animate(dt: number, time: number, steer: number, speed01: number, boost: number, drift: number): void;
}

/** Distancia (m) a partir de la que se dibuja la versión ligera. */
const LOD_DIST = 20;

function criaturaDe(character: CharacterDef): Criatura {
  const c = CRIATURAS[character.id];
  if (c) return c;
  const i = Math.max(0, CHARACTERS.indexOf(character));
  return CRIATURAS[CRIATURA_POR_INDICE[i % CRIATURA_POR_INDICE.length]];
}

let _nubeGeo: THREE.BufferGeometry | null = null;
/** Nube xiangyun en miniatura para la estela del derrape (compartida). */
function nubeEstela(): THREE.BufferGeometry {
  if (_nubeGeo) return _nubeGeo;
  const parts: THREE.BufferGeometry[] = [];
  const esf = (x: number, y: number, z: number, sx: number, sy: number, sz: number) => {
    const g = new THREE.SphereGeometry(1, 8, 6);
    g.deleteAttribute('uv');
    g.scale(sx, sy, sz);
    g.translate(x, y, z);
    parts.push(g);
  };
  esf(0, 0, 0, 0.22, 0.14, 0.2);
  esf(0.18, 0.04, 0.02, 0.16, 0.12, 0.15);
  esf(-0.17, 0.02, -0.02, 0.15, 0.1, 0.14);
  for (const [x, y, rz] of [[0.22, 0.1, 0], [-0.2, 0.08, Math.PI]]) {
    const r = new THREE.TorusGeometry(0.09, 0.03, 5, 12, Math.PI * 1.5);
    r.deleteAttribute('uv');
    r.rotateZ(rz);
    r.translate(x, y, 0);
    parts.push(r);
  }
  _nubeGeo = mergeSimple(parts);
  return _nubeGeo;
}

function mergeSimple(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const pos: number[] = [];
  const nor: number[] = [];
  const idx: number[] = [];
  for (const g of parts) {
    const base = pos.length / 3;
    const p = g.attributes.position;
    const n = g.attributes.normal;
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      nor.push(n.getX(i), n.getY(i), n.getZ(i));
    }
    const ix = g.index;
    if (ix) for (let i = 0; i < ix.count; i++) idx.push(base + ix.getX(i));
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  out.setIndex(idx);
  return out;
}

// ---------------------------------------------------------------------------------
export function buildKartModel(character: CharacterDef): KartModelPartsEx {
  const spec = criaturaDe(character);
  const root = new THREE.Group();
  root.name = `kart-${character.id}`;

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
  const env = entorno();
  const piel = textura(spec.textura);
  const bodyMaterial = mat(
    inyectarUber(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        vertexColors: true,
        map: piel,
        bumpMap: piel,
        bumpScale: 2.2,
        metalness: 0,
        roughness: 1,
        clearcoat: spec.metal ? 0.3 : 0.75,
        clearcoatRoughness: 0.22,
        envMap: env,
        envMapIntensity: 1.1,
      }),
      'b',
    ),
  );
  const accentMaterial = mat(
    inyectarUber(
      new THREE.MeshStandardMaterial({
        color: character.accent,
        vertexColors: true,
        metalness: 0,
        roughness: 1,
        emissive: character.accent,
        emissiveIntensity: 0.32,
        envMap: env,
      }),
      'a',
    ),
  );
  const orbMaterial = mat(
    new THREE.MeshStandardMaterial({ color: spec.ojo, emissive: spec.ojo, emissiveIntensity: 1.6, roughness: 0.12, metalness: 0.1, envMap: env }),
  );
  const exhaustGlowMaterial = mat(
    new THREE.MeshStandardMaterial({ color: 0x120805, emissive: 0xff7a1a, emissiveIntensity: 0, roughness: 0.6 }),
  );
  const flameMaterial = mat(
    new THREE.MeshBasicMaterial({ color: 0xff6ab0, vertexColors: true, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
  );
  const uber = materialUber();

  // --- paleta ---------------------------------------------------------------------
  const plumaColor = spec.pluma ?? character.color;
  const tex: Acabado = { capa: 'body', color: character.color, m: spec.metal ?? 0.12, r: spec.rugosidad ?? 0.34, e: spec.emision ?? 0 };
  const pal: Record<string, Acabado> = {
    body: tex,
    secondTex: { capa: 'body', color: spec.segundo, m: spec.metal ?? 0.12, r: 0.36, e: spec.emision ?? 0 },
    second: { capa: 'uber', color: spec.segundo, m: 0.15, r: 0.38, e: spec.emision ?? 0 },
    accent: { capa: 'accent', color: 0xffffff, m: 0.05, r: 0.4, e: 0.15 },
    accentTip: { capa: 'accent', color: 0xfff8e8, m: 0, r: 0.4, e: 1.1 },
    accentRoot: { capa: 'accent', color: 0xb8b0b0, m: 0.1, r: 0.35, e: 0.05 },
    tancho: { capa: 'uber', color: 0xe8201a, m: 0.1, r: 0.25 },
    gold: { capa: 'uber', color: 0xffc24a, m: 1, r: 0.22, e: 0.05 },
    goldDark: { capa: 'uber', color: 0xc07a28, m: 1, r: 0.32 },
    ivory: { capa: 'uber', color: 0xfff4e0, m: 0, r: 0.3, e: 0.08 },
    dark: { capa: 'uber', color: 0x16111a, m: 0.2, r: 0.3 },
    pupil: { capa: 'uber', color: 0x0a0608, m: 0.3, r: 0.08 },
    glint: { capa: 'uber', color: 0xffffff, m: 0, r: 0.2, e: 2.5 },
    glintC: { capa: 'uber', color: new THREE.Color(spec.ojo).lerp(new THREE.Color(0xffffff), 0.45).getHex(), m: 0, r: 0.2, e: 2.5 },
    eye: { capa: 'orb', color: 0xffffff },
    cloud: { capa: 'uber', color: 0xf4ead8, m: 0, r: 0.8, e: 0.12 },
    feather: { capa: 'uber', color: plumaColor, m: 0.35, r: 0.32, e: 0.12, i: 0.75 },
    saddle: { capa: 'uber', color: 0xb3121e, m: 0.15, r: 0.2 },
    metal: { capa: 'uber', color: 0x1a1820, m: 0.55, r: 0.26 },
    chrome: { capa: 'uber', color: 0xd8a060, m: 1, r: 0.18 },
    glow: { capa: 'uber', color: spec.llama, m: 0, r: 0.5, e: 2.6 },
    glowCore: { capa: 'uber', color: 0xffffff, m: 0, r: 0.5, e: 3 },
    seat: { capa: 'uber', color: 0x1a161c, m: 0.1, r: 0.55 },
    tire: { capa: 'uber', color: 0x141317, m: 0, r: 0.72 },
    rimDark: { capa: 'uber', color: 0x8a1018, m: 0.4, r: 0.25 },
    rimLlama: { capa: 'uber', color: spec.llama, m: 0.3, r: 0.25, e: 0.9 },
    guardaLlama: { capa: 'uber', color: spec.llama, m: 0.3, r: 0.22, e: 0.35 },
    lacaOscura: { capa: 'uber', color: 0x3a0d10, m: 0.2, r: 0.2 },
    jade: { capa: 'uber', color: 0x2fd08f, m: 0.1, r: 0.1, e: 0.35 },
    tongue: { capa: 'uber', color: 0xd8405a, m: 0, r: 0.35 },
    mane: { capa: 'accent', color: 0xffffff, m: 0.05, r: 0.35, e: 0.55 },
    accentFin: { capa: 'velo', color: 0xff8a3d, grad: 0x9ff4ff, m: 0.05, r: 0.3, e: 0.05, eTip: 0.4, i: 0.4 },
    noseTiger: { capa: 'uber', color: 0x2a1e26, m: 0.2, r: 0.25 },
    serpent: { capa: 'uber', color: 0x2f7050, m: 0.35, r: 0.2, i: 0.5 },
    serpBelly: { capa: 'uber', color: 0xc8d890, m: 0.1, r: 0.35 },
    // piloto
    suit: { capa: 'uber', color: spec.traje, m: 0.15, r: 0.36 },
    helmet: { capa: 'uber', color: character.driverColor, m: 0.35, r: 0.16 },
    skin: { capa: 'uber', color: spec.piloto.piel, m: 0, r: 0.55, e: 0.08 },
    hair: { capa: 'uber', color: spec.piloto.pelo, m: 0.15, r: 0.32 },
    visor: { capa: 'uber', color: 0x0c1628, m: 0.9, r: 0.05 },
    blush: { capa: 'uber', color: 0xff8f8f, m: 0, r: 0.7 },
    mouth: { capa: 'uber', color: 0x7a2028, m: 0, r: 0.5 },
    glove: { capa: 'uber', color: 0xf2ece2, m: 0, r: 0.45 },
    boot: { capa: 'uber', color: 0x1a1418, m: 0.3, r: 0.3 },
    ribete: { capa: 'uber', color: spec.piloto.ribete ?? 0xffc24a, m: 1, r: 0.22, e: 0.05 },
    sash: { capa: 'uber', color: 0xc8202a, m: 0.1, r: 0.3 },
    tassel: { capa: 'uber', color: 0xe0202a, m: 0, r: 0.6, e: 0.15 },
    irisDrv: { capa: 'uber', color: 0x5a3a2a, m: 0.2, r: 0.1, e: 0.2 },
    accentDrv: { capa: 'uber', color: character.accent, m: 0.3, r: 0.25, e: 0.4 },
    plumeDrv: { capa: 'uber', color: plumaColor, m: 0.4, r: 0.3, e: 0.15, i: 0.8 },
    jadeDrv: { capa: 'uber', color: 0x40e0a0, m: 0.1, r: 0.12, e: 0.4 },
  };

  // --- objetos que mueve Kart.ts ----------------------------------------------------
  const wheels: THREE.Object3D[] = [];
  const frontWheels: THREE.Object3D[] = [];
  const wheelRadii: number[] = [];
  const ruedasDef: [number, number, number, boolean][] = [
    [-WHEEL_X, WHEEL_R_F, WHEEL_Z_F, true],
    [WHEEL_X, WHEEL_R_F, WHEEL_Z_F, true],
    [-WHEEL_X, WHEEL_R_R, WHEEL_Z_R, false],
    [WHEEL_X, WHEEL_R_R, WHEEL_Z_R, false],
  ];
  for (const [x, y, z, isFront] of ruedasDef) {
    const pivot = new THREE.Group();
    pivot.position.set(x, y, z);
    const spin = new THREE.Group();
    spin.name = 'wheel';
    pivot.add(spin);
    root.add(pivot);
    wheels.push(spin);
    wheelRadii.push(isFront ? WHEEL_R_F : WHEEL_R_R);
    if (isFront) frontWheels.push(pivot);
  }
  const [sillaY, sillaZ] = spec.silla;
  const steerPivot = new THREE.Group();
  steerPivot.position.set(0, sillaY + 0.2, sillaZ - 0.26);
  steerPivot.rotation.x = -0.53;
  const steeringWheel = new THREE.Group();
  steeringWheel.name = 'steeringWheel';
  steerPivot.add(steeringWheel);
  root.add(steerPivot);
  const driver = new THREE.Group();
  driver.name = 'driver';
  driver.position.set(0, sillaY, sillaZ);
  const driverHead = new THREE.Group();
  driverHead.name = 'driverHead';
  driverHead.position.set(0, 0.4, 0.02);
  driver.add(driverHead);
  root.add(driver);
  const exhausts: THREE.Object3D[] = [];
  const flames: THREE.Object3D[] = [];
  const escapes = spec.escapes ?? ESCAPES_DEF;
  for (const [x, y, z] of escapes) {
    const g = new THREE.Group();
    g.name = 'exhaust';
    g.position.set(x, y, z);
    g.rotation.x = -0.16;
    const f = new THREE.Group();
    f.name = 'llama';
    g.add(f);
    root.add(g);
    exhausts.push(g);
    flames.push(f);
  }
  root.updateMatrixWorld(true);

  // --- esculpir -------------------------------------------------------------------
  const headPos = driverHead.getWorldPosition(new THREE.Vector3());
  const esculpir = (bajo: boolean) => {
    const t = new Taller(pal);
    t.bajo = bajo;
    if (spec.pintor) t.pintor = spec.pintor;
    chasis(t, spec);
    ruedasDef.forEach(([x, y, z, isFront], i) => {
      t.declarar(`rueda${i}`, null, [x, y, z], { externo: wheels[i] });
      t.marco(wheels[i].matrixWorld);
      rueda(t, isFront ? WHEEL_R_F : WHEEL_R_R, isFront ? WHEEL_W_F : WHEEL_W_R, isFront ? 'rimDark' : 'rimLlama');
      t.marco(null);
    });
    // manillar de riendas
    t.declarar('manillar', null, steeringWheel.getWorldPosition(new THREE.Vector3()), { externo: steeringWheel });
    t.marco(steeringWheel.matrixWorld);
    t.pieza('gold', 'cil', [-0.18, 0, 0], [0.18, 0, 0], 0.016);
    t.par((s) => {
      t.pieza('saddle', 'cil', [s * 0.12, 0, 0], [s * 0.2, 0, 0], 0.026);
      t.esf('gold', s * 0.205, 0, 0, 0.03);
    });
    t.toro('gold', 0.045, 0.012, 0, 0, 0, 0, 0, 0, Math.PI * 2, 1, 1, 1, 14);
    t.esf('jade', 0, 0, -0.01, 0.025);
    t.pieza('metal', 'cil', [0, 0, 0], [0, -0.24, 0.02], 0.02);
    t.marco(null);
    // piloto
    t.declarar('piloto', null, driver.position, { externo: driver });
    t.declarar('casco', null, headPos, { externo: driverHead });
    piloto(t, spec.piloto, driver.matrixWorld, driverHead.matrixWorld, headPos);
    // criatura
    t.estatico();
    spec.construir(t);
    return t.montar();
  };
  const { geos, huesos } = esculpir(false);
  // versión lejana (rivales a más de LOD_DIST m): misma silueta, sin detalles finos
  const lejos = esculpir(true);

  // --- esqueleto --------------------------------------------------------------------
  const huesoPor = new Map<string, THREE.Bone>();
  const defPor = new Map<string, HuesoDef>();
  const bones: THREE.Bone[] = huesos.map((h) => {
    const b = new THREE.Bone();
    b.name = h.nombre;
    huesoPor.set(h.nombre, b);
    defPor.set(h.nombre, h);
    return b;
  });
  for (const h of huesos) {
    const b = huesoPor.get(h.nombre) as THREE.Bone;
    if (h.externo) {
      h.externo.add(b);
    } else if (h.padre) {
      const padre = huesoPor.get(h.padre) as THREE.Bone;
      const pp = defPor.get(h.padre) as HuesoDef;
      padre.add(b);
      b.position.copy(h.pivote).sub(pp.pivote);
    } else {
      root.add(b);
      b.position.copy(h.pivote);
    }
  }
  flames.forEach((f, i) => {
    const b = new THREE.Bone();
    b.name = `llama${i}`;
    f.add(b);
    bones.push(b);
  });
  root.updateMatrixWorld(true);
  const skeleton = new THREE.Skeleton(bones);
  const esfera = new THREE.Sphere(new THREE.Vector3(0, 0.6, 0.15), 1.75);
  const MATS: Record<Capa, THREE.Material> = { uber, body: bodyMaterial, accent: accentMaterial, orb: orbMaterial, velo: materialVelo() };
  const meshes = new Map<Capa, THREE.SkinnedMesh>();
  const indiceAlto = new Map<string, number>();
  huesos.forEach((h, i) => indiceAlto.set(h.nombre, i));
  const cerca = new THREE.Group();
  cerca.name = 'cerca';
  const lejosG = new THREE.Group();
  lejosG.name = 'lejos';
  const lod = new THREE.LOD();
  lod.name = 'lod';
  lod.addLevel(cerca, 0);
  lod.addLevel(lejosG, LOD_DIST);
  root.add(lod);
  const crearMallas = (g: Map<Capa, THREE.BufferGeometry>, destino: THREE.Group, alto: boolean, remap?: HuesoDef[]) => {
    for (const capa of CAPAS) {
      const geo = g.get(capa);
      if (!geo) continue;
      track(geo);
      if (remap) {
        const si = geo.attributes.skinIndex as THREE.BufferAttribute;
        for (let i = 0; i < si.count; i++) {
          for (let c = 0; c < 4; c++) {
            const v = si.getComponent(i, c);
            si.setComponent(i, c, indiceAlto.get(remap[v]?.nombre ?? 'cuerpo') ?? 1);
          }
        }
      }
      if (capa === 'body') {
        const k = spec.repetir ?? 1;
        if (k !== 1) {
          const uv = geo.attributes.uv as THREE.BufferAttribute;
          for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * k, uv.getY(i) * k);
        }
      }
      const m = new THREE.SkinnedMesh(geo, MATS[capa]);
      m.name = `kart-${capa}${alto ? '' : '-lejos'}`;
      m.bind(skeleton, new THREE.Matrix4());
      m.boundingSphere = esfera.clone();
      m.castShadow = capa === 'uber' || capa === 'body';
      m.receiveShadow = capa === 'body';
      destino.add(m);
      if (alto) meshes.set(capa, m);
    }
  };
  crearMallas(geos, cerca, true);
  crearMallas(lejos.geos, lejosG, false, lejos.huesos);
  const body = meshes.get('body') ?? (meshes.get('uber') as THREE.SkinnedMesh);

  // --- llamas de los escapes: una malla con piel (dos conos por escape) ---------------
  {
    const pos: number[] = [];
    const col: number[] = [];
    const si: number[] = [];
    const sw: number[] = [];
    const idx: number[] = [];
    const cono = (r: number, len: number, z0: number, gris: number, boneIdx: number, m: THREE.Matrix4) => {
      const g = new THREE.ConeGeometry(r, len, 12, 1, true);
      g.rotateX(-Math.PI / 2);
      g.translate(0, 0, z0);
      g.applyMatrix4(m);
      const base = pos.length / 3;
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) {
        pos.push(p.getX(i), p.getY(i), p.getZ(i));
        col.push(gris, gris, gris);
        si.push(boneIdx, 0, 0, 0);
        sw.push(1, 0, 0, 0);
      }
      const ix = g.index as THREE.BufferAttribute;
      for (let i = 0; i < ix.count; i++) idx.push(base + ix.getX(i));
      g.dispose();
    };
    const nb = huesos.length;
    flames.forEach((f, i) => {
      cono(0.072, 0.62, 0.57, 0.8, nb + i, f.matrixWorld);
      cono(0.03, 0.26, 0.38, 1, nb + i, f.matrixWorld);
    });
    const g = track(new THREE.BufferGeometry());
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
    g.setIndex(idx);
    const fm = new THREE.SkinnedMesh(g, flameMaterial);
    fm.name = 'llamas';
    fm.bind(skeleton, new THREE.Matrix4());
    fm.boundingSphere = esfera.clone();
    fm.renderOrder = 2;
    root.add(fm);
  }

  // --- huesos animados ---------------------------------------------------------------
  const bCuerpo = huesoPor.get('cuerpo') as THREE.Bone;
  const cuerpoY = bCuerpo.position.y;
  const bCabeza = huesoPor.get('cabeza') ?? null;
  const bBola = huesoPor.get('bola') ?? null;
  const alas: { b: THREE.Bone; d: HuesoDef }[] = [];
  const cadenas: { b: THREE.Bone; d: HuesoDef }[] = [];
  for (const h of huesos) {
    const b = huesoPor.get(h.nombre) as THREE.Bone;
    if (h.ala) alas.push({ b, d: h });
    if (h.cadena) cadenas.push({ b, d: h });
  }

  // --- aliento (fuego, agua o chispas según la criatura) solo con el turbo ------------
  const nucleoMat = compartido('nucleo', () => new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  const alientoMat = mat(new THREE.MeshBasicMaterial({ color: spec.aliento, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  const aliento = new THREE.Group();
  aliento.name = 'aliento';
  const padreAliento = bCabeza ?? bCuerpo;
  const pivAliento = (defPor.get(padreAliento.name) as HuesoDef).pivote;
  aliento.position.set(spec.boca[0] - pivAliento.x, spec.boca[1] - pivAliento.y, spec.boca[2] - pivAliento.z);
  aliento.rotation.set(0.12, Math.PI, 0);
  const alientoGeo = track(new THREE.ConeGeometry(0.1, 0.55, 10, 1, true));
  alientoGeo.rotateX(-Math.PI / 2);
  alientoGeo.translate(0, 0, 0.27);
  const alientoNucleo = track(new THREE.ConeGeometry(0.04, 0.3, 8, 1, true));
  alientoNucleo.rotateX(-Math.PI / 2);
  alientoNucleo.translate(0, 0, 0.15);
  aliento.add(new THREE.Mesh(alientoGeo, alientoMat), new THREE.Mesh(alientoNucleo, nucleoMat));
  aliento.visible = false;
  aliento.scale.setScalar(0.01);
  padreAliento.add(aliento);

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
  let derrape = 0;
  let turbo = 0;
  let acentoBase = accentMaterial.emissiveIntensity;
  let acentoEscrito = -1;
  const animate = (dt: number, time: number, steer: number, speed01: number, boost: number, drift: number) => {
    dt = Math.min(Math.max(dt, 0), 0.1);
    const objetivo = steer + drift * 0.6;
    giro += (objetivo - giro) * Math.min(1, dt * 6);
    derrape += (Math.abs(drift) - derrape) * Math.min(1, dt * 5);
    turbo += (boost - turbo) * Math.min(1, dt * 8);

    // cuerpo: respiración, rebote de suspensión e inclinación hacia la curva
    const resp = Math.sin(time * (2.2 + speed01 * 4));
    const rebote = (Math.sin(time * 17.3) * 0.6 + Math.sin(time * 9.1 + 1.3) * 0.4) * 0.008 * speed01;
    bCuerpo.scale.set(1 + resp * 0.008, 1 + resp * 0.02 + turbo * 0.02, 1 - turbo * 0.02);
    bCuerpo.position.y = cuerpoY + rebote + derrape * 0.015;
    bCuerpo.rotation.z = -objetivo * 0.06;
    bCuerpo.rotation.x = turbo * 0.05 - speed01 * 0.02;
    bCuerpo.rotation.y = -drift * 0.1;
    if (bCabeza) {
      bCabeza.rotation.y = -giro * 0.32;
      bCabeza.rotation.x = Math.sin(time * (3 + speed01 * 5)) * 0.035 - turbo * 0.12;
      bCabeza.rotation.z = -giro * 0.08;
    }
    // colas, bigotes, serpientes y pelo
    for (const { b, d } of cadenas) {
      const c = d.cadena!.cfg;
      const k = d.cadena!.k;
      const n = d.cadena!.n;
      const amp = c.amp * (0.55 + 0.7 * speed01) * (1 - turbo * 0.35) * (1 + derrape * 0.4);
      const f = c.freq * (0.75 + 0.5 * speed01) + turbo * 3;
      const ph = time * f - k * (c.fase ?? 0.9);
      const lat = (-giro * c.giro * (1 + derrape * 0.6)) / n;
      const ond = Math.sin(ph) * amp + lat;
      const v = Math.cos(ph * 0.8) * amp * c.vert;
      if (c.eje === 'y') {
        b.rotation.z = ond;
        b.rotation.x = v;
      } else {
        const sg = c.eje === 'z' ? 1 : -1;
        b.rotation.y = ond * sg;
        b.rotation.x = v - turbo * 0.06 * sg;
      }
    }
    // alas y aletas
    for (const { b, d } of alas) {
      const cfg = d.ala!;
      const f = cfg.freq * (0.6 + 0.8 * speed01) + turbo * 4;
      const bate = Math.sin(time * f) * cfg.amp * (0.5 + 0.6 * speed01);
      const alabeo = giro * 0.25 * cfg.lado;
      if (cfg.eje === 'y') {
        b.rotation.y = cfg.lado * (cfg.base + bate) + alabeo * 0.5;
        b.rotation.z = cfg.lado * turbo * 0.15;
      } else {
        b.rotation.z = cfg.lado * (cfg.base + bate + turbo * 0.25) + alabeo;
        b.rotation.y = cfg.lado * (speed01 * 0.16 + turbo * 0.18);
      }
    }
    if (bBola) {
      girosBola -= dt * speed01 * 40;
      bBola.rotation.x = girosBola;
    }
    // ojos y acentos que se encienden con turbo y derrape (Kart.ts fija la base)
    orbMaterial.emissiveIntensity *= 1 + turbo * 1.4 + derrape * 0.4;
    if (accentMaterial.emissiveIntensity !== acentoEscrito) acentoBase = accentMaterial.emissiveIntensity;
    acentoEscrito = acentoBase * (1 + turbo * (1.6 + 0.4 * Math.sin(time * 31)) + derrape * 0.3);
    accentMaterial.emissiveIntensity = acentoEscrito;

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
        const r = wheels[2 + (puffSig % 2)].parent;
        if (!r) continue;
        r.getWorldPosition(_w);
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
    skeleton.dispose();
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
    flameColors: [new THREE.Color(spec.llama).lerp(new THREE.Color(0xff8a3a), 0.35).getHex(), spec.llama],
    animate,
  };
}
