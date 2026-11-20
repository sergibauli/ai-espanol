/**
 * GLSL sources for the FX workstream: GPU particle shaders and the full-screen
 * composite post-process pass. Everything is procedural (no textures except the
 * runtime-generated sprite atlas).
 */

// ---------------------------------------------------------------------------
// Particles
// ---------------------------------------------------------------------------

export const PARTICLE_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uGravity;
uniform float uHeightPx;
uniform float uAspect;

attribute vec3 aVelocity;
attribute vec2 aTime;   // birth, life
attribute vec2 aSize;   // start, end (world metres)
attribute vec3 aColor0;
attribute vec3 aColor1;
attribute vec2 aAlpha;  // start, end
attribute vec2 aRot;    // rotation, angular velocity
attribute vec4 aMisc;   // gravityScale, atlasIndex, alignToVelocity, drag

varying vec4 vColor;
varying float vRot;
varying float vAtlas;

void main() {
  float age = uTime - aTime.x;
  float life = max(aTime.y, 0.0001);
  float t = age / life;
  if (age < 0.0 || t >= 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vColor = vec4(0.0);
    vRot = 0.0;
    vAtlas = 0.0;
    return;
  }

  float k = aMisc.w;
  // Ballistic motion with optional exponential drag: integral of v*exp(-k t).
  float tt = k > 0.001 ? (1.0 - exp(-k * age)) / k : age;
  float g = uGravity * aMisc.x;
  vec3 pos = position + aVelocity * tt;
  pos.y -= 0.5 * g * age * age;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float size = mix(aSize.x, aSize.y, t);
  float px = size * projectionMatrix[1][1] * uHeightPx * 0.5 / max(0.05, -mv.z);
  gl_PointSize = clamp(px, 0.0, 512.0);

  float fadeIn = smoothstep(0.0, 0.06, t);
  float fadeOut = 1.0 - smoothstep(0.7, 1.0, t);
  float alpha = mix(aAlpha.x, aAlpha.y, t) * fadeIn * fadeOut;
  vColor = vec4(mix(aColor0, aColor1, t), alpha);

  float rot = aRot.x + aRot.y * age;
  if (aMisc.z > 0.5) {
    // Align the sprite's x axis to the screen-space velocity direction.
    vec3 vel = aVelocity * exp(-k * age);
    vel.y -= g * age;
    vec4 c1 = projectionMatrix * (modelViewMatrix * vec4(pos + vel * 0.02, 1.0));
    vec2 d = c1.xy / c1.w - gl_Position.xy / gl_Position.w;
    d.x *= uAspect;
    if (dot(d, d) > 1e-12) rot = atan(d.y, d.x);
  }
  vRot = rot;
  vAtlas = aMisc.y;
}
`;

export const PARTICLE_FRAGMENT = /* glsl */ `
uniform sampler2D uAtlas;

varying vec4 vColor;
varying float vRot;
varying float vAtlas;

void main() {
  if (vColor.a <= 0.001) discard;
  vec2 p = gl_PointCoord - 0.5;
  p.y = -p.y;
  float c = cos(vRot);
  float s = sin(vRot);
  vec2 uv = vec2(c * p.x + s * p.y, -s * p.x + c * p.y) + 0.5;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
  uv = clamp(uv, 0.008, 0.992);
  float col = mod(vAtlas, 4.0);
  float row = floor(vAtlas / 4.0);
  vec2 auv = vec2((col + uv.x) * 0.25, 1.0 - (row + 1.0 - uv.y) * 0.25);
  vec4 tex = texture2D(uAtlas, auv);
  float a = tex.a * vColor.a;
  if (a <= 0.003) discard;
  gl_FragColor = vec4(vColor.rgb * tex.rgb, a);
}
`;

// ---------------------------------------------------------------------------
// Composite post-process (speed lines, radial blur, chromatic aberration,
// vignette + hit tint, flash, grain). Runs on the linear HDR buffer before
// OutputPass applies tone mapping and the sRGB transfer.
// ---------------------------------------------------------------------------

export const COMPOSITE_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const COMPOSITE_FRAGMENT = /* glsl */ `
uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uBoost;
uniform float uHit;
uniform float uFlash;
uniform vec3 uFlashColor;
uniform float uGrain;
uniform vec3 uBoostColorA;
uniform vec3 uBoostColorB;
uniform float uKick;      // 1 al activar el turbo → 0 en ~0.7 s
uniform float uKickAge;   // segundos desde la activación
uniform float uVignette;  // intensidad de la viñeta de color del estilo
uniform float uMotion;    // 1 normal, ~0.35 con movimiento reducido

varying vec2 vUv;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Líneas de velocidad finas y afiladas: segmentos que corren hacia fuera en
// sectores aleatorios, solo en el anillo exterior (el centro queda limpio).
// Devuelve intensidad (x) y qué color usar (y: 0 = A, 1 = B).
vec2 speedLines(vec2 adir, float r, float t) {
  float a = atan(adir.y, adir.x);
  const float SECTORS = 150.0;
  float sa = (a + 3.14159265) / 6.2831853 * SECTORS;
  float id = floor(sa);
  float fr = fract(sa);
  float rnd = hash11(id * 0.731 + 0.13);
  float rnd2 = hash11(id * 1.317 + 7.7);
  float speed = 3.0 + 3.0 * rnd2;
  float seg = fract(r * (1.2 + 1.6 * rnd) - t * speed + rnd * 13.0);
  // cabeza brillante y cola larga que se afila
  float body = smoothstep(0.0, 0.55, seg) * (1.0 - smoothstep(0.55, 0.62, seg));
  float w = (0.012 + 0.03 * rnd2) * (0.35 + 0.65 * body);
  float line = 1.0 - smoothstep(0.0, w, abs(fr - 0.5));
  float mask = smoothstep(0.5, 0.95, r);
  float on = step(0.6, rnd);
  return vec2(line * body * mask * on, step(0.5, hash11(id * 3.71)));
}

void main() {
  vec2 uv = vUv;
  vec2 dir = uv - 0.5;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 adir = vec2(dir.x * aspect, dir.y);
  float r = length(adir);
  float rn = length(dir) * 1.4142136;

  vec3 col;
  float boost = uBoost;
  // Desenfoque radial + aberración: solo con turbo fuerte y siempre más
  // suave en el centro; el golpe de activación añade un tirón breve.
  float smear = (smoothstep(0.25, 1.0, boost) + uKick * 0.35) * uMotion;
  if (smear > 0.003) {
    vec2 dn = dir / max(length(dir), 1e-4);
    float edge = smoothstep(0.18, 1.0, rn);
    float ca = smear * 0.0032 * edge * rn;
    float blur = smear * 0.013 * edge * rn;
    col = vec3(0.0);
    for (int i = 0; i < 5; i++) {
      float f = (float(i) / 4.0 - 0.5) * blur;
      vec2 o = uv - dir * f;
      col.r += texture2D(tDiffuse, o - dn * ca).r;
      col.g += texture2D(tDiffuse, o).g;
      col.b += texture2D(tDiffuse, o + dn * ca).b;
    }
    col *= 0.2;
  } else {
    col = texture2D(tDiffuse, uv).rgb;
  }

  // Líneas de velocidad teñidas con los colores del turbo.
  float slAmt = (smoothstep(0.6, 1.0, uSpeed) * 0.07 + boost * 0.2 + uKick * 0.12) * mix(0.5, 1.0, uMotion);
  if (slAmt > 0.002) {
    vec2 sl = speedLines(adir, r, uTime);
    vec3 tint = mix(vec3(0.95, 0.97, 1.05), mix(uBoostColorA, uBoostColorB, sl.y) * 1.4 + 0.25, clamp(boost * 1.4, 0.0, 1.0));
    col += tint * sl.x * slAmt;
  }

  // Viñeta: oscurece un poco las esquinas…
  float vig = smoothstep(1.25, 0.55, rn * (1.0 + 0.08 * uSpeed));
  col *= mix(1.0, vig, 0.22 + 0.16 * uSpeed);

  // …y con el turbo se tiñe del color del estilo (sin quemar: mezcla, no suma).
  float vb = clamp(boost * 0.35 + uKick * uVignette, 0.0, 1.0);
  if (vb > 0.002) {
    float edgeMask = smoothstep(0.62, 1.32, rn);
    vec3 tint = mix(uBoostColorA, uBoostColorB, 0.5 + 0.5 * sin(atan(dir.y, dir.x) * 2.0 + uTime * 1.5));
    col = mix(col, col * 0.78 + tint * 0.16, edgeMask * vb * 0.8);
    // Onda de choque en pantalla: un aro fino que sale hacia los bordes.
    float ringR = 0.35 + uKickAge * 1.9;
    float ring = exp(-pow((rn - ringR) * 9.0, 2.0)) * uKick * smoothstep(0.3, 0.6, rn);
    col += tint * ring * 0.18;
  }

  if (uHit > 0.001) {
    float pulse = 0.8 + 0.2 * sin(uTime * 28.0);
    float edge = smoothstep(0.35, 1.0, rn);
    float hitMask = clamp(uHit * pulse * (0.2 + edge) * 1.0, 0.0, 0.8);
    col = mix(col, vec3(0.55, 0.02, 0.01), hitMask);
    float lum0 = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(lum0), uHit * 0.35);
  }

  col = mix(col, uFlashColor * 1.8, clamp(uFlash, 0.0, 1.0));

  // Fine grain (uGrain is a linear-light amplitude; ~1% at rest).
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float gr = hash21(uv * uResolution + fract(uTime * 7.31) * 100.0) - 0.5;
  col += gr * uGrain * (0.4 + 0.6 * (1.0 - clamp(lum, 0.0, 1.0)));

  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;
