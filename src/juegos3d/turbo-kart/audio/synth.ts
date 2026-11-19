/**
 * Web Audio synthesis building blocks. Everything audible in the game is
 * generated from these primitives - there are no audio files.
 */

export type NoiseColor = 'white' | 'pink' | 'brown';

export interface Envelope {
  /** Seconds to reach peak. */
  attack?: number;
  /** Seconds from peak to sustain level. */
  decay?: number;
  /** Sustain level as a fraction of peak (0..1). */
  sustain?: number;
  /** Seconds to fade out after the note duration ends. */
  release?: number;
}

export interface FilterOptions {
  type: BiquadFilterType;
  freq: number;
  /** Optional cutoff sweep target (exponential) over `sweepTime` or the tone duration. */
  endFreq?: number;
  sweepTime?: number;
  q?: number;
}

export interface ToneOptions {
  freq: number;
  /** Exponential frequency sweep target. */
  endFreq?: number;
  /** Duration of the frequency sweep (defaults to `duration`). */
  sweepTime?: number;
  type?: OscillatorType;
  /** Sustained portion length (seconds) before release. */
  duration: number;
  /** Peak gain. */
  gain?: number;
  env?: Envelope;
  /** Cents. */
  detune?: number;
  filter?: FilterOptions;
  vibrato?: { rate: number; depth: number };
  /** Absolute AudioContext time to start (defaults to now). */
  when?: number;
  /** -1..1 stereo pan (ignored when a spatial destination is used). */
  pan?: number;
}

export interface NoiseOptions {
  duration: number;
  gain?: number;
  env?: Envelope;
  color?: NoiseColor;
  filter?: FilterOptions;
  /** Playback rate multiplier (pitches the noise texture). */
  rate?: number;
  when?: number;
  pan?: number;
}

const MIN_GAIN = 0.0001;

export function dbToGain(db: number): number {
  return Math.pow(10, db / 20);
}

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// ---------------------------------------------------------------------------
// Noise buffers (cached per context)
// ---------------------------------------------------------------------------

const noiseCache = new WeakMap<BaseAudioContext, Map<NoiseColor, AudioBuffer>>();

export function noiseBuffer(ctx: BaseAudioContext, color: NoiseColor = 'white', seconds = 2): AudioBuffer {
  let map = noiseCache.get(ctx);
  if (!map) {
    map = new Map();
    noiseCache.set(ctx, map);
  }
  const cached = map.get(color);
  if (cached) return cached;

  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  if (color === 'white') {
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  } else if (color === 'pink') {
    // Paul Kellet's economy pink noise filter.
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  } else {
    let last = 0;
    for (let i = 0; i < length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      data[i] = last * 3.5;
    }
  }
  map.set(color, buffer);
  return buffer;
}

// ---------------------------------------------------------------------------
// Envelopes & parameter helpers
// ---------------------------------------------------------------------------

/**
 * Schedule an ADSR on a gain-like AudioParam starting at `when`. `duration` is
 * the total note length before the release begins. Returns the time at which
 * the envelope has fully released.
 */
export function adsr(param: AudioParam, when: number, peak: number, duration: number, env: Envelope = {}): number {
  const a = Math.max(0.001, env.attack ?? 0.005);
  const d = Math.max(0.001, env.decay ?? 0.05);
  const s = Math.min(1, Math.max(0, env.sustain ?? 0.6));
  const r = Math.max(0.005, env.release ?? 0.05);
  const p = Math.max(MIN_GAIN, peak);
  const sustainLevel = Math.max(MIN_GAIN, p * s);
  param.cancelScheduledValues(when);
  param.setValueAtTime(MIN_GAIN, when);
  param.linearRampToValueAtTime(p, when + a);
  param.exponentialRampToValueAtTime(sustainLevel, when + a + d);
  const relStart = Math.max(when + a + d, when + duration);
  param.setValueAtTime(sustainLevel, relStart);
  param.exponentialRampToValueAtTime(MIN_GAIN, relStart + r);
  return relStart + r;
}

/** Exponential (default) or linear sweep of a parameter between two values. */
export function sweep(param: AudioParam, from: number, to: number, when: number, duration: number, exponential = true): void {
  if (exponential) {
    param.setValueAtTime(Math.max(MIN_GAIN, from), when);
    param.exponentialRampToValueAtTime(Math.max(MIN_GAIN, to), when + Math.max(0.001, duration));
  } else {
    param.setValueAtTime(from, when);
    param.linearRampToValueAtTime(to, when + Math.max(0.001, duration));
  }
}

/** Smoothly move a continuous parameter (engine pitch, bus gains) toward a value. */
export function glide(param: AudioParam, value: number, now: number, timeConstant: number): void {
  param.setTargetAtTime(value, now, timeConstant);
}

/** tanh soft-clip transfer curve for a WaveShaperNode. */
export function softClipCurve(amount = 2, samples = 1024): Float32Array<ArrayBuffer> {
  const curve = new Float32Array(new ArrayBuffer(samples * 4));
  const norm = Math.tanh(amount);
  for (let i = 0; i < samples; i++) {
    const x = (i / (samples - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * amount) / norm;
  }
  return curve;
}

function applyFilter(ctx: BaseAudioContext, head: AudioNode, f: FilterOptions, when: number, duration: number): AudioNode {
  const filter = ctx.createBiquadFilter();
  filter.type = f.type;
  filter.Q.value = f.q ?? 1;
  if (f.endFreq !== undefined) {
    sweep(filter.frequency, f.freq, f.endFreq, when, f.sweepTime ?? duration);
  } else {
    filter.frequency.value = f.freq;
  }
  head.connect(filter);
  return filter;
}

function connectOut(ctx: BaseAudioContext, head: AudioNode, dest: AudioNode, pan: number | undefined): AudioNode {
  if (pan !== undefined && pan !== 0 && typeof ctx.createStereoPanner === 'function') {
    const p = ctx.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    head.connect(p);
    p.connect(dest);
    return p;
  }
  head.connect(dest);
  return head;
}

// ---------------------------------------------------------------------------
// One-shots
// ---------------------------------------------------------------------------

/** Play a single enveloped oscillator. Returns the time at which it ends. */
export function playTone(ctx: BaseAudioContext, dest: AudioNode, o: ToneOptions): number {
  const when = o.when ?? ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = o.type ?? 'sine';
  if (o.detune) osc.detune.value = o.detune;
  osc.frequency.setValueAtTime(Math.max(MIN_GAIN, o.freq), when);
  if (o.endFreq !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(MIN_GAIN, o.endFreq), when + Math.max(0.001, o.sweepTime ?? o.duration));
  }

  const gain = ctx.createGain();
  const end = adsr(gain.gain, when, o.gain ?? 0.2, o.duration, o.env);

  let head: AudioNode = osc;
  if (o.filter) head = applyFilter(ctx, head, o.filter, when, o.duration);
  head.connect(gain);
  connectOut(ctx, gain, dest, o.pan);

  let lfo: OscillatorNode | null = null;
  if (o.vibrato && o.vibrato.depth > 0) {
    lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = o.vibrato.rate;
    const lg = ctx.createGain();
    lg.gain.value = o.vibrato.depth;
    lfo.connect(lg);
    lg.connect(osc.detune);
    lfo.start(when);
    lfo.stop(end + 0.02);
  }

  osc.start(when);
  osc.stop(end + 0.02);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
    if (lfo) lfo.disconnect();
  };
  return end;
}

/** Play a filtered, enveloped burst of noise. Returns the end time. */
export function playNoiseBurst(ctx: BaseAudioContext, dest: AudioNode, o: NoiseOptions): number {
  const when = o.when ?? ctx.currentTime;
  const src = ctx.createBufferSource();
  const buffer = noiseBuffer(ctx, o.color ?? 'white');
  src.buffer = buffer;
  src.loop = true;
  src.loopStart = 0;
  src.loopEnd = buffer.duration;
  if (o.rate !== undefined) src.playbackRate.value = o.rate;

  const gain = ctx.createGain();
  const end = adsr(gain.gain, when, o.gain ?? 0.2, o.duration, o.env ?? { attack: 0.002, decay: o.duration * 0.6, sustain: 0.3, release: 0.05 });

  let head: AudioNode = src;
  if (o.filter) head = applyFilter(ctx, head, o.filter, when, o.duration);
  head.connect(gain);
  connectOut(ctx, gain, dest, o.pan);

  src.start(when, Math.random() * Math.max(0, buffer.duration - 0.5));
  src.stop(end + 0.02);
  src.onended = () => {
    src.disconnect();
    gain.disconnect();
  };
  return end;
}

/**
 * Sequence of tones (arpeggio / melody). Each entry: [semitone offset or midi,
 * duration]. `baseMidi` is added to each note. Returns the end time.
 */
export function playSequence(
  ctx: BaseAudioContext,
  dest: AudioNode,
  notes: readonly (readonly [number, number])[],
  opts: { baseMidi?: number; type?: OscillatorType; gain?: number; when?: number; env?: Envelope; gap?: number; filter?: FilterOptions; vibrato?: { rate: number; depth: number } } = {},
): number {
  let t = opts.when ?? ctx.currentTime;
  const gap = opts.gap ?? 0;
  const base = opts.baseMidi ?? 0;
  let end = t;
  for (const [n, d] of notes) {
    end = playTone(ctx, dest, {
      freq: midiToFreq(base + n),
      type: opts.type ?? 'square',
      duration: d,
      gain: opts.gain ?? 0.15,
      env: opts.env ?? { attack: 0.005, decay: 0.05, sustain: 0.7, release: 0.06 },
      when: t,
      filter: opts.filter,
      vibrato: opts.vibrato,
    });
    t += d + gap;
  }
  return end;
}

/** Play several tones at once (a chord). */
export function playChord(
  ctx: BaseAudioContext,
  dest: AudioNode,
  midis: readonly number[],
  opts: { type?: OscillatorType; gain?: number; duration: number; when?: number; env?: Envelope; detune?: number; filter?: FilterOptions },
): number {
  const when = opts.when ?? ctx.currentTime;
  let end = when;
  for (const m of midis) {
    end = Math.max(end, playTone(ctx, dest, {
      freq: midiToFreq(m),
      type: opts.type ?? 'sawtooth',
      duration: opts.duration,
      gain: opts.gain ?? 0.08,
      env: opts.env,
      when,
      detune: opts.detune ? (Math.random() * 2 - 1) * opts.detune : 0,
      filter: opts.filter,
    }));
  }
  return end;
}

// ---------------------------------------------------------------------------
// Generated samples: plucked strings (Karplus-Strong) and a reverb impulse
// ---------------------------------------------------------------------------

export type PluckKind = 'zheng' | 'pipa';

export interface PluckSample {
  buffer: AudioBuffer;
  /** Exact fundamental of the rendered string (Hz), for playbackRate tuning. */
  freq: number;
}

interface PluckSpec {
  seconds: number;
  /** T60 decay time (seconds) at the sample's fundamental. */
  t60: number;
  /** Loop-filter weight of the older sample (0.5 = classic dull KS, lower = brighter). */
  damp: number;
  /** One-pole lowpass coefficient applied to the excitation (0 = raw white noise). */
  soften: number;
  /** Pluck position along the string (0..0.5): a comb notch on the excitation. */
  pick: number;
  /** Extra nail/plectrum click mixed into the first milliseconds. */
  click: number;
}

const PLUCK_SPECS: Record<PluckKind, PluckSpec> = {
  // Guzheng: long, shimmering sustain, plucked with finger picks.
  zheng: { seconds: 2.2, t60: 2.6, damp: 0.36, soften: 0.25, pick: 0.13, click: 0.25 },
  // Pipa: short, bright and percussive (struck near the bridge with a nail).
  pipa: { seconds: 1.1, t60: 0.75, damp: 0.42, soften: 0.1, pick: 0.08, click: 0.5 },
};

/** Base pitches of the generated samples; every note is pitched from the nearest one. */
const PLUCK_BASES = [43, 48, 53, 58, 63, 68, 73, 78, 83, 88, 93];

const pluckCache = new WeakMap<BaseAudioContext, Map<string, PluckSample>>();

function renderPluck(sr: number, freq: number, spec: PluckSpec, seconds: number): { data: Float32Array; freq: number } {
  // Loop delay N plus the fractional delay of the two-point loop filter.
  const n = Math.max(8, Math.floor(sr / freq - spec.damp));
  const actual = sr / (n + spec.damp);
  const length = Math.max(n + 2, Math.floor(sr * seconds));
  const out = new Float32Array(length);
  // Excitation: softened noise with a pick-position comb notch, DC removed.
  const exc = new Float32Array(n);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    lp = lp * spec.soften + (Math.random() * 2 - 1) * (1 - spec.soften);
    exc[i] = lp;
  }
  const pickOffset = Math.max(1, Math.round(n * spec.pick));
  const shaped = new Float32Array(n);
  let mean = 0;
  for (let i = 0; i < n; i++) {
    shaped[i] = exc[i] - (i >= pickOffset ? exc[i - pickOffset] : 0) * 0.9;
    mean += shaped[i];
  }
  mean /= n;
  const rho = Math.pow(10, -3 / (spec.t60 * actual));
  const a = 1 - spec.damp;
  const b = spec.damp;
  for (let i = 0; i < length; i++) {
    const x = i < n ? shaped[i] - mean : 0;
    const y1 = i >= n ? out[i - n] : 0;
    const y2 = i >= n + 1 ? out[i - n - 1] : 0;
    out[i] = x + rho * (a * y1 + b * y2);
  }
  const clickLen = Math.floor(sr * 0.004);
  for (let i = 0; i < clickLen && i < length; i++) {
    out[i] += (Math.random() * 2 - 1) * spec.click * (1 - i / clickLen);
  }
  let peak = 0;
  for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(out[i]));
  const norm = peak > 0 ? 0.9 / peak : 1;
  const fade = Math.floor(sr * 0.05);
  for (let i = 0; i < length; i++) {
    const tail = length - i;
    out[i] *= norm * (tail < fade ? tail / fade : 1);
  }
  return { data: out, freq: actual };
}

/**
 * Plucked-string sample for `kind`, closest to `midi`. Samples are rendered
 * once per context (Karplus-Strong) and pitched with `playbackRate`, so a whole
 * instrument costs a handful of short buffers.
 */
export function pluckSample(ctx: BaseAudioContext, kind: PluckKind, midi: number): PluckSample {
  let base = PLUCK_BASES[0];
  for (const b of PLUCK_BASES) if (Math.abs(b - midi) < Math.abs(base - midi)) base = b;
  let map = pluckCache.get(ctx);
  if (!map) {
    map = new Map();
    pluckCache.set(ctx, map);
  }
  const key = `${kind}:${base}`;
  const cached = map.get(key);
  if (cached) return cached;
  const spec = PLUCK_SPECS[kind];
  // High strings ring for less time: keep those buffers short.
  const seconds = spec.seconds * (base >= 75 ? 0.65 : 1);
  const { data, freq } = renderPluck(ctx.sampleRate, midiToFreq(base), spec, seconds);
  const buffer = ctx.createBuffer(1, data.length, ctx.sampleRate);
  buffer.getChannelData(0).set(data);
  const sample = { buffer, freq };
  map.set(key, sample);
  return sample;
}

export interface ReverbNet {
  input: GainNode;
  output: AudioNode;
  /** Every node of the network, for teardown. */
  nodes: AudioNode[];
}

/**
 * Cheap stereo reverb (Freeverb-style): per channel, six damped feedback
 * combs in parallel and two allpasses in series, built from DelayNodes. Much
 * lighter on mobile CPUs than a ConvolverNode with a long impulse.
 */
export function createReverb(ctx: BaseAudioContext, roomSize = 0.76, dampHz = 2400): ReverbNet {
  const nodes: AudioNode[] = [];
  const own = <T extends AudioNode>(n: T): T => {
    nodes.push(n);
    return n;
  };
  const input = own(ctx.createGain());
  input.gain.value = 0.25;
  // Mono into the network: half the work of a stereo comb bank.
  input.channelCount = 1;
  input.channelCountMode = 'explicit';
  // Keep lows out of the tail (no mud under the sub).
  const hp = own(ctx.createBiquadFilter());
  hp.type = 'highpass';
  hp.frequency.value = 280;
  input.connect(hp);
  const merger = own(ctx.createChannelMerger(2));
  const combs = [1116, 1188, 1277, 1356, 1422, 1557];
  const allpasses = [556, 341];
  for (let ch = 0; ch < 2; ch++) {
    const spread = ch === 0 ? 0 : 23;
    const sum = own(ctx.createGain());
    sum.gain.value = 4 / combs.length;
    for (const c of combs) {
      const d = own(ctx.createDelay(0.1));
      d.delayTime.value = (c + spread) / 44100;
      const damp = own(ctx.createBiquadFilter());
      damp.type = 'lowpass';
      damp.frequency.value = dampHz;
      damp.Q.value = 0.5;
      const fb = own(ctx.createGain());
      fb.gain.value = roomSize;
      hp.connect(d);
      d.connect(damp);
      damp.connect(fb);
      fb.connect(d);
      damp.connect(sum);
    }
    // Schroeder allpass: s = x + g*D(s); y = D(s) - g*s.
    let head: AudioNode = sum;
    for (const a of allpasses) {
      const g = 0.5;
      const s = own(ctx.createGain());
      const d = own(ctx.createDelay(0.05));
      d.delayTime.value = (a + spread) / 44100;
      const fb = own(ctx.createGain());
      fb.gain.value = g;
      const ff = own(ctx.createGain());
      ff.gain.value = -g;
      const out = own(ctx.createGain());
      head.connect(s);
      s.connect(d);
      d.connect(fb);
      fb.connect(s);
      d.connect(out);
      s.connect(ff);
      ff.connect(out);
      head = out;
    }
    head.connect(merger, 0, ch);
  }
  return { input, output: merger, nodes };
}

/** Next note of `scale` (pitch classes) above (`dir` = 1) or below (-1) `midi`. */
export function scaleStep(midi: number, scale: readonly number[], dir: 1 | -1): number {
  let m = midi + dir;
  for (let i = 0; i < 12; i++, m += dir) {
    if (scale.includes(((m % 12) + 12) % 12)) return m;
  }
  return midi + dir * 2;
}
