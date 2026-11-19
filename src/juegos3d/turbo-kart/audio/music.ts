/**
 * Procedural music: a lookahead step sequencer with synthesised instruments and
 * four guofeng-EDM compositions (menu / race / finalLap / results, see
 * `composiciones.ts`) plus the shield jingle.
 *
 * Instruments: guzheng and pipa are Karplus-Strong samples generated in code
 * (`pluckSample`), dizi / erhu / sub are persistent monophonic voices (one set
 * of oscillators per song, re-pitched with portamento instead of re-created),
 * the rest are short one-shot node graphs that disconnect themselves.
 */
import type { MusicTrack } from '../core/types';
import { buildMenuSong, buildRaceSong, buildResultsSong, buildShieldJingle } from './composiciones';
import type { MixLayer, NoteEvent, Song } from './partitura';
import { createReverb, midiToFreq, noiseBuffer, playNoiseBurst, pluckSample, scaleStep, softClipCurve } from './synth';

export type { Bar, Instrument, NoteEvent, Song } from './partitura';
export { buildMenuSong, buildRaceSong, buildResultsSong, buildShieldJingle };

const STEPS_PER_BAR = 16;
const LOOKAHEAD_SECONDS = 0.1;
const TICK_MS = 25;
const DEFAULT_SCALE = [0, 2, 4, 7, 9];

/** A persistent monophonic voice (portamento lead or sub bass). */
interface MonoVoice {
  oscs: OscillatorNode[];
  sources: AudioScheduledSourceNode[];
  nodes: AudioNode[];
  amp: GainNode;
  vib: GainNode | null;
  breath: GainNode | null;
  lastEnd: number;
}

// ---------------------------------------------------------------------------
// Sequencer
// ---------------------------------------------------------------------------

export class Sequencer {
  readonly output: GainNode;
  private readonly ctx: BaseAudioContext;
  private readonly song: Song;
  private readonly stepDur: number;
  private readonly scale: readonly number[];

  private readonly mixBus: GainNode;
  private readonly masterFilter: BiquadFilterNode;
  private readonly glue: DynamicsCompressorNode;
  private readonly clip: WaveShaperNode;
  private readonly drumBus: GainNode;
  private readonly pumpBus: GainNode;
  private readonly subBus: GainNode;
  private readonly sawL: StereoPannerNode | GainNode;
  private readonly sawR: StereoPannerNode | GainNode;
  private readonly sawFilter: BiquadFilterNode;
  private readonly padBus: GainNode;
  private readonly padFilter: BiquadFilterNode;
  private readonly padLfo: OscillatorNode;
  private readonly zhengBus: GainNode;
  private readonly pipaBus: GainNode;
  private readonly leadBus: GainNode;
  private readonly fxBus: GainNode;
  private readonly leadDelay: DelayNode;
  private readonly leadFeedback: GainNode;
  private readonly owned: AudioNode[] = [];

  private dizi: MonoVoice | null = null;
  private erhu: MonoVoice | null = null;
  private subVoice: MonoVoice | null = null;

  private timer: ReturnType<typeof setInterval> | null = null;
  private bar = 0;
  private step = 0;
  private nextTime = 0;
  private stopped = false;

  constructor(ctx: BaseAudioContext, dest: AudioNode, song: Song) {
    this.ctx = ctx;
    this.song = song;
    this.stepDur = 60 / song.bpm / 4;
    this.scale = song.scale ?? DEFAULT_SCALE;
    const mix = (layer: MixLayer): number => (song.mix?.[layer] ?? 1) * song.gain;

    // mix → master lowpass (intro/build sweeps) → glue compressor → soft clip → fade
    this.output = ctx.createGain();
    this.output.gain.value = 0;
    this.output.connect(dest);
    this.clip = ctx.createWaveShaper();
    this.clip.curve = softClipCurve(1.1, 2048);
    this.clip.connect(this.output);
    this.glue = ctx.createDynamicsCompressor();
    this.glue.threshold.value = -14;
    this.glue.knee.value = 8;
    this.glue.ratio.value = 3.5;
    this.glue.attack.value = 0.004;
    this.glue.release.value = 0.12;
    this.glue.connect(this.clip);
    this.masterFilter = ctx.createBiquadFilter();
    this.masterFilter.type = 'lowpass';
    this.masterFilter.frequency.value = 20000;
    this.masterFilter.Q.value = 0.9;
    // Sub-sonic cleanup: nothing useful below ~30 Hz, it only eats headroom.
    const rumble = ctx.createBiquadFilter();
    rumble.type = 'highpass';
    rumble.frequency.value = 32;
    rumble.Q.value = 0.7;
    this.masterFilter.connect(rumble);
    rumble.connect(this.glue);
    this.owned.push(rumble);
    this.mixBus = ctx.createGain();
    // Headroom trim: the mix lands around -14 LUFS with the glue barely working.
    this.mixBus.gain.value = 0.6;
    this.mixBus.connect(this.masterFilter);

    const own = <T extends AudioNode>(n: T): T => {
      this.owned.push(n);
      return n;
    };
    const bus = (gain: number, to: AudioNode): GainNode => {
      const g = own(ctx.createGain());
      g.gain.value = gain;
      g.connect(to);
      return g;
    };
    const panner = (pan: number, to: AudioNode): StereoPannerNode | GainNode => {
      if (typeof ctx.createStereoPanner !== 'function') return bus(1, to);
      const p = own(ctx.createStereoPanner());
      p.pan.value = pan;
      p.connect(to);
      return p;
    };

    // Reverb (one cheap delay network per song); jingles skip it.
    let reverbIn: AudioNode | null = null;
    if ((song.reverb ?? 0) > 0) {
      const net = createReverb(ctx);
      for (const n of net.nodes) own(n);
      const ret = bus(0.8 * (song.reverb ?? 0), this.mixBus);
      net.output.connect(ret);
      reverbIn = net.input;
    }
    const send = (from: AudioNode, amount: number): void => {
      if (!reverbIn || amount <= 0) return;
      const s = bus(amount, reverbIn);
      from.connect(s);
    };

    this.drumBus = bus(0.36 * mix('drums'), this.mixBus);
    // Fake sidechain: everything sustained ducks on the kick.
    this.pumpBus = bus(1, this.mixBus);
    this.subBus = bus(0.2 * mix('sub'), this.pumpBus);

    this.sawFilter = own(ctx.createBiquadFilter());
    this.sawFilter.type = 'lowpass';
    this.sawFilter.frequency.value = 3400;
    this.sawFilter.Q.value = 0.7;
    const sawOut = bus(1.1 * mix('saw'), this.pumpBus);
    this.sawFilter.connect(sawOut);
    this.sawL = panner(-0.6, this.sawFilter);
    this.sawR = panner(0.6, this.sawFilter);

    this.padBus = bus(1, this.pumpBus);
    this.padFilter = own(ctx.createBiquadFilter());
    this.padFilter.type = 'lowpass';
    this.padFilter.frequency.value = 1500;
    this.padFilter.Q.value = 0.6;
    const padOut = bus(1.1 * mix('pad'), this.pumpBus);
    this.padBus.disconnect();
    this.padBus.connect(this.padFilter);
    this.padFilter.connect(padOut);
    send(padOut, 0.35);
    this.padLfo = own(ctx.createOscillator());
    this.padLfo.frequency.value = 0.11;
    const lfoDepth = own(ctx.createGain());
    lfoDepth.gain.value = 500;
    lfoDepth.connect(this.padFilter.frequency);
    this.padLfo.connect(lfoDepth);
    this.padLfo.start();

    const zhengPan = panner(-0.25, this.mixBus);
    this.zhengBus = bus(1.05 * mix('zheng'), zhengPan);
    send(this.zhengBus, 0.4);
    const pipaPan = panner(0.3, this.mixBus);
    this.pipaBus = bus(1.25 * mix('pipa'), pipaPan);
    send(this.pipaBus, 0.25);
    this.fxBus = bus(0.32 * mix('fx'), this.mixBus);
    send(this.fxBus, 0.45);

    // Leads with a filtered dotted-eighth ping-pong-ish delay.
    this.leadBus = bus(0.38 * mix('lead'), this.mixBus);
    send(this.leadBus, 0.3);
    this.leadDelay = own(ctx.createDelay(1.5));
    this.leadDelay.delayTime.value = Math.min(1.4, this.stepDur * 3);
    this.leadFeedback = bus(0.3, this.leadDelay);
    const delayTone = own(ctx.createBiquadFilter());
    delayTone.type = 'lowpass';
    delayTone.frequency.value = 2800;
    const delayPan = panner(0.45, this.mixBus);
    const leadWet = bus(0.32 * song.leadDelay, delayPan);
    this.leadBus.connect(this.leadDelay);
    this.leadDelay.connect(delayTone);
    delayTone.connect(this.leadFeedback);
    delayTone.connect(leadWet);
  }

  start(at: number, fadeIn: number): void {
    if (this.timer || this.stopped) return;
    const now = this.ctx.currentTime;
    const t0 = Math.max(now + 0.02, at);
    this.output.gain.cancelScheduledValues(now);
    this.output.gain.setValueAtTime(0.0001, now);
    this.output.gain.exponentialRampToValueAtTime(1, t0 + Math.max(0.02, fadeIn));
    this.nextTime = t0;
    this.bar = 0;
    this.step = 0;
    this.timer = setInterval(() => this.tick(), TICK_MS);
    this.tick();
  }

  /** Fade out over `fadeOut` seconds and tear down. */
  stop(fadeOut: number): void {
    if (this.stopped) return;
    this.stopped = true;
    const now = this.ctx.currentTime;
    const g = this.output.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(Math.max(0.0001, g.value), now);
    g.exponentialRampToValueAtTime(0.0001, now + Math.max(0.02, fadeOut));
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    setTimeout(() => this.teardown(), fadeOut * 1000 + 1500);
  }

  dispose(): void {
    if (!this.stopped) this.stop(0.02);
  }

  /** Schedule every step that starts before `horizon` (also used for offline renders). */
  scheduleUntil(horizon: number): void {
    const bars = this.song.bars;
    if (bars.length === 0) return;
    while (this.nextTime < horizon) {
      const bar = bars[this.bar];
      const t = this.nextTime;
      for (const n of bar.notes) {
        if (n.step === this.step) this.play(n, t);
      }
      this.step++;
      this.nextTime += this.stepDur;
      if (this.step >= STEPS_PER_BAR) {
        this.step = 0;
        this.bar++;
        if (this.bar >= bars.length) this.bar = Math.min(this.song.loopStart, bars.length - 1);
      }
    }
  }

  private tick(): void {
    if (this.stopped) return;
    // Never schedule more than ~half a second at once (tab was asleep, etc.).
    const now = this.ctx.currentTime;
    if (this.nextTime < now - 0.5) this.nextTime = now;
    this.scheduleUntil(now + LOOKAHEAD_SECONDS);
  }

  private teardown(): void {
    for (const v of [this.dizi, this.erhu, this.subVoice]) {
      if (!v) continue;
      for (const s of v.sources) {
        try {
          s.stop();
        } catch {
          // already stopped
        }
      }
      for (const n of v.nodes) n.disconnect();
    }
    this.dizi = this.erhu = this.subVoice = null;
    try {
      this.padLfo.stop();
    } catch {
      // already stopped
    }
    for (const n of this.owned) n.disconnect();
    this.mixBus.disconnect();
    this.masterFilter.disconnect();
    this.glue.disconnect();
    this.clip.disconnect();
    this.output.disconnect();
  }

  private play(n: NoteEvent, t: number): void {
    const dur = n.dur * this.stepDur;
    const midi = n.note + this.song.transpose;
    switch (n.inst) {
      case 'kick': this.kick(t, n.vel); break;
      case 'snare':
        this.snare(t, n.vel);
        if (n.arg === 1) this.snare(t + this.stepDur / 2, n.vel * 0.85);
        break;
      case 'clap': this.clap(t, n.vel); break;
      case 'hatC': this.hat(t, n.vel, false); break;
      case 'hatO': this.hat(t, n.vel, true); break;
      case 'crash': this.crash(t, n.vel); break;
      case 'sub': this.sub(t, midi, dur, n.vel, n.arg === 1); break;
      case 'saw': this.saw(t, midi, dur, n.vel); break;
      case 'pad': this.pad(t, midi, dur, n.vel); break;
      case 'zheng': this.pluck('zheng', t, midi, dur + 0.9, n.vel, n.arg ?? 0); break;
      case 'pipa': this.pluck('pipa', t, midi, dur + 0.2, n.vel, 0); break;
      case 'trem': this.tremolo(t, midi, dur, n.vel); break;
      case 'gliss': this.gliss(t, n.note, n.arg ?? 8, dur, n.vel); break;
      case 'dizi': this.diziNote(t, midi, dur, n.vel, n.arg ?? 0); break;
      case 'erhu': this.erhuNote(t, midi, dur, n.vel, n.arg ?? 0); break;
      case 'gong': this.gong(t, n.vel, n.arg === 1); break;
      case 'bo': this.bo(t, n.vel, n.arg === 1); break;
      case 'tanggu': this.tanggu(t, n.vel); break;
      case 'riser': this.riser(t, dur, n.vel); break;
      case 'impact': this.impact(t, n.vel); break;
      case 'lpf': {
        const f = this.masterFilter.frequency;
        f.cancelScheduledValues(t);
        if (n.dur <= 0) f.setValueAtTime(n.note, t);
        else f.setTargetAtTime(n.note, t, dur / 3);
        break;
      }
      default: break;
    }
  }

  // --- helpers -------------------------------------------------------------

  private osc(type: OscillatorType, freq: number): OscillatorNode {
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    return o;
  }

  private gain(value: number): GainNode {
    const g = this.ctx.createGain();
    g.gain.value = value;
    return g;
  }

  private noise(color: 'white' | 'pink' = 'white'): AudioBufferSourceNode {
    const src = this.ctx.createBufferSource();
    const buf = noiseBuffer(this.ctx, color);
    src.buffer = buf;
    src.loop = true;
    return src;
  }

  // --- drums ---------------------------------------------------------------

  private kick(t: number, vel: number): void {
    const ctx = this.ctx;
    const o = this.osc('sine', 160);
    o.frequency.setValueAtTime(165, t);
    o.frequency.exponentialRampToValueAtTime(52, t + 0.07);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.3);
    const g = this.gain(0);
    g.gain.setValueAtTime(1.0 * vel, t);
    g.gain.setTargetAtTime(0.0001, t + 0.07, 0.055);
    o.connect(g);
    g.connect(this.drumBus);
    o.start(t);
    o.stop(t + 0.45);
    o.onended = () => { o.disconnect(); g.disconnect(); };
    playNoiseBurst(ctx, this.drumBus, {
      duration: 0.01, gain: 0.25 * vel, when: t,
      filter: { type: 'bandpass', freq: 3500, q: 0.8 },
      env: { attack: 0.0005, decay: 0.008, sustain: 0.1, release: 0.01 },
    });
    // Fake sidechain.
    const depth = this.song.pump ?? 0;
    if (depth > 0) {
      const p = this.pumpBus.gain;
      p.setTargetAtTime(1 - depth * vel, t, 0.003);
      p.setTargetAtTime(1, t + 0.035, this.stepDur * 0.7);
    }
  }

  private snare(t: number, vel: number): void {
    playNoiseBurst(this.ctx, this.drumBus, {
      duration: 0.1, gain: 0.42 * vel, when: t,
      filter: { type: 'bandpass', freq: 2200, q: 0.7 },
      env: { attack: 0.001, decay: 0.09, sustain: 0.05, release: 0.04 },
    });
    const o = this.osc('triangle', 210);
    o.frequency.exponentialRampToValueAtTime(160, t + 0.06);
    const g = this.gain(0);
    g.gain.setValueAtTime(0.28 * vel, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    o.connect(g);
    g.connect(this.drumBus);
    o.start(t);
    o.stop(t + 0.1);
    o.onended = () => { o.disconnect(); g.disconnect(); };
  }

  private clap(t: number, vel: number): void {
    // Three quick slaps and a short room tail.
    for (let i = 0; i < 3; i++) {
      playNoiseBurst(this.ctx, this.drumBus, {
        duration: 0.008, gain: 0.38 * vel, when: t + i * 0.011,
        filter: { type: 'bandpass', freq: 1250, q: 1.1 },
        env: { attack: 0.0005, decay: 0.008, sustain: 0.2, release: 0.006 },
      });
    }
    playNoiseBurst(this.ctx, this.drumBus, {
      duration: 0.12, gain: 0.3 * vel, when: t + 0.033,
      filter: { type: 'bandpass', freq: 1400, q: 0.8 },
      env: { attack: 0.001, decay: 0.12, sustain: 0.05, release: 0.05 },
    });
  }

  private hat(t: number, vel: number, open: boolean): void {
    playNoiseBurst(this.ctx, this.drumBus, {
      duration: open ? 0.16 : 0.025, gain: (open ? 0.17 : 0.2) * vel, when: t,
      filter: { type: 'highpass', freq: open ? 7000 : 8500, q: 0.7 },
      env: open
        ? { attack: 0.002, decay: 0.15, sustain: 0.2, release: 0.06 }
        : { attack: 0.001, decay: 0.025, sustain: 0.05, release: 0.01 },
    });
  }

  private crash(t: number, vel: number): void {
    playNoiseBurst(this.ctx, this.fxBus, {
      duration: 1.1, gain: 0.26 * vel, when: t,
      filter: { type: 'highpass', freq: 4200, q: 0.6 },
      env: { attack: 0.002, decay: 0.9, sustain: 0.12, release: 0.5 },
    });
  }

  // --- Chinese percussion ----------------------------------------------------

  /** 大锣 (big gong, pitch sags) or 小锣 (small opera gong, pitch rises). */
  private gong(t: number, vel: number, small: boolean): void {
    const ctx = this.ctx;
    const base = small ? 560 : 96;
    const ratios = small ? [1, 2.32, 3.1] : [1, 1.48, 2.06, 2.71, 3.6];
    const amps = small ? [1, 0.4, 0.2] : [1, 0.7, 0.5, 0.35, 0.22];
    const decay = small ? 0.5 : 2.4;
    const g = this.gain(0);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime((small ? 0.16 : 0.32) * vel, t + (small ? 0.004 : 0.02));
    g.gain.setTargetAtTime(0.0001, t + 0.03, decay / 4);
    g.connect(this.fxBus);
    const end = t + decay * 1.6;
    ratios.forEach((r, i) => {
      const o = this.osc('sine', base * r);
      const f0 = base * r;
      if (small) {
        o.frequency.setValueAtTime(f0, t);
        o.frequency.exponentialRampToValueAtTime(f0 * 1.14, t + 0.12);
      } else {
        o.frequency.setValueAtTime(f0 * 1.04, t);
        o.frequency.exponentialRampToValueAtTime(f0 * 0.95, t + 1.6);
      }
      const pg = this.gain(amps[i]);
      o.connect(pg);
      pg.connect(g);
      o.start(t);
      o.stop(end);
      o.onended = () => { o.disconnect(); pg.disconnect(); if (i === 0) g.disconnect(); };
    });
    playNoiseBurst(ctx, this.fxBus, {
      duration: small ? 0.15 : 0.9, gain: (small ? 0.06 : 0.12) * vel, when: t,
      filter: { type: 'bandpass', freq: small ? 3000 : 1500, q: 0.8 },
      env: { attack: 0.003, decay: small ? 0.15 : 0.8, sustain: 0.1, release: 0.3 },
    });
  }

  /** 钹 / 镲: bright, trashy Chinese cymbals ("锵" / "嚓"). */
  private bo(t: number, vel: number, open: boolean): void {
    playNoiseBurst(this.ctx, this.fxBus, {
      duration: open ? 0.9 : 0.12, gain: 0.3 * vel, when: t,
      filter: { type: 'bandpass', freq: 5200, q: 0.9 },
      env: open
        ? { attack: 0.002, decay: 0.7, sustain: 0.15, release: 0.4 }
        : { attack: 0.001, decay: 0.12, sustain: 0.1, release: 0.06 },
    });
    playNoiseBurst(this.ctx, this.fxBus, {
      duration: open ? 0.5 : 0.08, gain: 0.16 * vel, when: t, color: 'pink',
      filter: { type: 'bandpass', freq: 2400, q: 2.5 },
      env: { attack: 0.001, decay: open ? 0.45 : 0.08, sustain: 0.1, release: 0.1 },
    });
  }

  /** 堂鼓: deep barrel drum for the "咚咚锵" fills. */
  private tanggu(t: number, vel: number): void {
    const o = this.osc('sine', 130);
    o.frequency.setValueAtTime(135, t);
    o.frequency.exponentialRampToValueAtTime(82, t + 0.18);
    const g = this.gain(0);
    g.gain.setValueAtTime(0.7 * vel, t);
    g.gain.setTargetAtTime(0.0001, t + 0.03, 0.12);
    o.connect(g);
    g.connect(this.drumBus);
    o.start(t);
    o.stop(t + 0.7);
    o.onended = () => { o.disconnect(); g.disconnect(); };
    playNoiseBurst(this.ctx, this.drumBus, {
      duration: 0.04, gain: 0.25 * vel, when: t,
      filter: { type: 'lowpass', freq: 1400, q: 0.7 },
      env: { attack: 0.001, decay: 0.04, sustain: 0.1, release: 0.03 },
    });
  }

  // --- transitions -----------------------------------------------------------

  private riser(t: number, dur: number, vel: number): void {
    const src = this.noise('white');
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.Q.value = 1.6;
    f.frequency.setValueAtTime(350, t);
    f.frequency.exponentialRampToValueAtTime(7500, t + dur);
    const g = this.gain(0);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.32 * vel, t + dur);
    g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.03);
    src.connect(f);
    f.connect(g);
    g.connect(this.fxBus);
    src.start(t, Math.random());
    src.stop(t + dur + 0.05);
    src.onended = () => { src.disconnect(); f.disconnect(); g.disconnect(); };
  }

  private impact(t: number, vel: number): void {
    const o = this.osc('sine', 110);
    o.frequency.setValueAtTime(120, t);
    o.frequency.exponentialRampToValueAtTime(32, t + 0.9);
    const g = this.gain(0);
    g.gain.setValueAtTime(0.75 * vel, t);
    g.gain.setTargetAtTime(0.0001, t + 0.1, 0.35);
    o.connect(g);
    g.connect(this.drumBus);
    o.start(t);
    o.stop(t + 1.6);
    o.onended = () => { o.disconnect(); g.disconnect(); };
    playNoiseBurst(this.ctx, this.fxBus, {
      duration: 1.0, gain: 0.22 * vel, when: t,
      filter: { type: 'lowpass', freq: 5000, endFreq: 180, sweepTime: 1.0, q: 0.7 },
      env: { attack: 0.002, decay: 0.9, sustain: 0.1, release: 0.2 },
    });
  }

  // --- synth layers ----------------------------------------------------------

  /** Supersaw-ish chord stab: two detuned saws per note, spread left / right. */
  private saw(t: number, midi: number, dur: number, vel: number): void {
    const freq = midiToFreq(midi);
    const end = t + dur + 0.12;
    const voices: [OscillatorNode, GainNode][] = [];
    for (const side of [-1, 1]) {
      const o = this.osc('sawtooth', freq);
      o.detune.value = side * 11;
      const g = this.gain(0);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.055 * vel, t + 0.006);
      g.gain.setTargetAtTime(0.03 * vel, t + 0.01, 0.12);
      g.gain.setTargetAtTime(0.0001, t + dur, 0.04);
      o.connect(g);
      g.connect(side < 0 ? this.sawL : this.sawR);
      o.start(t);
      o.stop(end);
      voices.push([o, g]);
    }
    voices[0][0].onended = () => { for (const [o, g] of voices) { o.disconnect(); g.disconnect(); } };
  }

  private pad(t: number, midi: number, dur: number, vel: number): void {
    const freq = midiToFreq(midi);
    const a = this.osc('triangle', freq);
    const b = this.osc('sawtooth', freq);
    b.detune.value = -8;
    const bg = this.gain(0.3);
    const g = this.gain(0);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.06 * vel, t + Math.min(0.35, dur * 0.4));
    g.gain.setTargetAtTime(0.0001, t + dur, 0.25);
    a.connect(g);
    b.connect(bg);
    bg.connect(g);
    g.connect(this.padBus);
    const end = t + dur + 1.2;
    a.start(t); b.start(t);
    a.stop(end); b.stop(end);
    a.onended = () => { a.disconnect(); b.disconnect(); bg.disconnect(); g.disconnect(); };
  }

  // --- plucked strings ---------------------------------------------------------

  /** One pluck of guzheng / pipa from the generated Karplus-Strong samples. */
  private pluck(kind: 'zheng' | 'pipa', t: number, midi: number, ring: number, vel: number, bend: number): void {
    const sample = pluckSample(this.ctx, kind, midi);
    const rate = midiToFreq(midi) / sample.freq;
    const src = this.ctx.createBufferSource();
    src.buffer = sample.buffer;
    const length = Math.min(ring, sample.buffer.duration / rate);
    if (bend > 0) {
      // 按音: pluck the lower string and press it up into the written note.
      const startRate = rate * Math.pow(2, -bend / 12);
      src.playbackRate.setValueAtTime(startRate, t);
      src.playbackRate.setValueAtTime(startRate, t + Math.min(0.18, length * 0.3));
      src.playbackRate.linearRampToValueAtTime(rate, t + Math.min(0.32, length * 0.5));
    } else {
      src.playbackRate.value = rate;
    }
    const g = this.gain(0);
    const peak = (kind === 'zheng' ? 0.34 : 0.3) * vel;
    g.gain.setValueAtTime(peak, t);
    g.gain.setTargetAtTime(0.0001, t + Math.max(0.01, length - 0.12), 0.035);
    src.connect(g);
    g.connect(kind === 'zheng' ? this.zhengBus : this.pipaBus);
    src.start(t);
    src.stop(t + length + 0.05);
    src.onended = () => { src.disconnect(); g.disconnect(); };
  }

  /** 轮指: pipa tremolo, a fast roll of plucks across the note's duration. */
  private tremolo(t: number, midi: number, dur: number, vel: number): void {
    const step = this.stepDur / 2;
    const count = Math.max(1, Math.round(dur / step));
    for (let i = 0; i < count; i++) {
      const swell = 0.75 + 0.25 * Math.sin((i / count) * Math.PI);
      const v = vel * swell * (i % 2 === 0 ? 1 : 0.78) * (0.92 + Math.random() * 0.08);
      this.pluck('pipa', t + i * step, midi, step + 0.06, v, 0);
    }
  }

  /** Guzheng glissando across `strings` pentatonic strings (sign = direction). */
  private gliss(t: number, from: number, strings: number, dur: number, vel: number): void {
    const count = Math.max(2, Math.abs(strings));
    const dir: 1 | -1 = strings < 0 ? -1 : 1;
    const step = dur / count;
    let note = from;
    for (let i = 0; i < count; i++) {
      const v = vel * (0.55 + 0.45 * (i / (count - 1)));
      this.pluck('zheng', t + i * step, note + this.song.transpose, 0.9, v, 0);
      note = scaleStep(note, this.scale, dir);
    }
  }

  // --- persistent monophonic voices ------------------------------------------------

  private makeLeadVoice(kind: 'dizi' | 'erhu'): MonoVoice {
    const ctx = this.ctx;
    const amp = this.gain(0);
    amp.connect(this.leadBus);
    const lfo = this.osc('sine', kind === 'dizi' ? 5.4 : 6.1);
    const vib = this.gain(0);
    lfo.connect(vib);
    const nodes: AudioNode[] = [amp, lfo, vib];
    const oscs: OscillatorNode[] = [];
    const sources: AudioScheduledSourceNode[] = [lfo];
    let breath: GainNode | null = null;
    if (kind === 'dizi') {
      // Flute body (sine), membrane buzz (笛膜, high-passed saw) and breath noise.
      const body = this.osc('sine', 440);
      const buzz = this.osc('sawtooth', 440);
      const buzzHp = ctx.createBiquadFilter();
      buzzHp.type = 'highpass';
      buzzHp.frequency.value = 1900;
      const buzzG = this.gain(0.09);
      const bodyG = this.gain(0.75);
      body.connect(bodyG);
      bodyG.connect(amp);
      buzz.connect(buzzHp);
      buzzHp.connect(buzzG);
      buzzG.connect(amp);
      const air = this.noise('white');
      const airF = ctx.createBiquadFilter();
      airF.type = 'bandpass';
      airF.frequency.value = 2600;
      airF.Q.value = 0.9;
      breath = this.gain(0);
      air.connect(airF);
      airF.connect(breath);
      breath.connect(this.leadBus);
      oscs.push(body, buzz);
      sources.push(body, buzz, air);
      nodes.push(body, buzz, buzzHp, buzzG, bodyG, air, airF, breath);
    } else {
      // Erhu: two bowed saws through a body resonance and a soft top end.
      const a = this.osc('sawtooth', 440);
      const b = this.osc('sawtooth', 440);
      b.detune.value = 6;
      const bG = this.gain(0.55);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 300;
      const body = ctx.createBiquadFilter();
      body.type = 'peaking';
      body.frequency.value = 950;
      body.Q.value = 1.3;
      body.gain.value = 6;
      const nasal = ctx.createBiquadFilter();
      nasal.type = 'peaking';
      nasal.frequency.value = 2700;
      nasal.Q.value = 1.6;
      nasal.gain.value = 4;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 4600;
      const pre = this.gain(0.42);
      a.connect(pre);
      b.connect(bG);
      bG.connect(pre);
      pre.connect(hp);
      hp.connect(body);
      body.connect(nasal);
      nasal.connect(lp);
      lp.connect(amp);
      oscs.push(a, b);
      sources.push(a, b);
      nodes.push(a, b, bG, hp, body, nasal, lp, pre);
    }
    for (const o of oscs) vib.connect(o.detune);
    const t0 = ctx.currentTime;
    for (const s of sources) {
      if (s instanceof AudioBufferSourceNode) s.start(t0, Math.random());
      else s.start(t0);
    }
    return { oscs, sources, nodes, amp, vib, breath, lastEnd: -1 };
  }

  private setPitch(v: MonoVoice, freq: number, t: number, glide: number): void {
    for (const o of v.oscs) {
      o.frequency.cancelScheduledValues(t);
      if (glide > 0) o.frequency.setTargetAtTime(freq, t, glide);
      else o.frequency.setValueAtTime(freq, t);
    }
  }

  private diziNote(t: number, midi: number, dur: number, vel: number, arg: number): void {
    if (!this.dizi) this.dizi = this.makeLeadVoice('dizi');
    const v = this.dizi;
    const freq = midiToFreq(midi);
    const legato = t <= v.lastEnd + 0.06;
    if (arg === 1) {
      // 叠音: a flick of the upper pentatonic neighbour before the note.
      const upper = midiToFreq(scaleStep(midi - this.song.transpose, this.scale, 1) + this.song.transpose);
      this.setPitch(v, upper, t, 0);
      for (const o of v.oscs) o.frequency.setValueAtTime(freq, t + 0.045);
    } else if (arg === 2) {
      this.setPitch(v, freq * 0.89, t, 0);
      for (const o of v.oscs) o.frequency.setTargetAtTime(freq, t + 0.01, 0.05);
    } else {
      this.setPitch(v, freq, t, legato ? 0.015 : 0);
    }
    const peak = 0.3 * vel;
    const a = v.amp.gain;
    a.cancelScheduledValues(t);
    if (legato) a.setTargetAtTime(peak * 0.45, t, 0.006); // tongued re-articulation
    a.setTargetAtTime(peak, t + (legato ? 0.02 : 0), 0.018);
    a.setTargetAtTime(0, t + dur * 0.96, 0.05);
    if (v.breath) {
      const b = v.breath.gain;
      b.cancelScheduledValues(t);
      b.setTargetAtTime(0.16 * vel, t, 0.008);
      b.setTargetAtTime(0.045 * vel, t + 0.05, 0.05);
      b.setTargetAtTime(0, t + dur * 0.96, 0.05);
    }
    if (v.vib) {
      const d = v.vib.gain;
      d.cancelScheduledValues(t);
      d.setTargetAtTime(0, t, 0.02);
      if (dur > 0.3) d.setTargetAtTime(16, t + 0.22, 0.12);
    }
    v.lastEnd = t + dur * 0.96;
  }

  private erhuNote(t: number, midi: number, dur: number, vel: number, arg: number): void {
    if (!this.erhu) this.erhu = this.makeLeadVoice('erhu');
    const v = this.erhu;
    const freq = midiToFreq(midi);
    const legato = t <= v.lastEnd + 0.06;
    if (arg === 2) {
      this.setPitch(v, freq * 0.84, t, 0);
      for (const o of v.oscs) o.frequency.setTargetAtTime(freq, t + 0.02, 0.06);
    } else if (legato) {
      // Portamento: the finger slides along the string.
      this.setPitch(v, freq, t, 0.032);
    } else {
      this.setPitch(v, freq * 0.97, t, 0);
      for (const o of v.oscs) o.frequency.setTargetAtTime(freq, t, 0.025);
    }
    const peak = 0.3 * vel;
    const a = v.amp.gain;
    a.cancelScheduledValues(t);
    if (legato) a.setTargetAtTime(peak * 0.7, t, 0.01); // bow change
    a.setTargetAtTime(peak, t + (legato ? 0.025 : 0), 0.035);
    a.setTargetAtTime(0, t + dur * 0.97, 0.06);
    if (v.vib) {
      const d = v.vib.gain;
      d.cancelScheduledValues(t);
      d.setTargetAtTime(0, t, 0.02);
      if (dur > 0.25) d.setTargetAtTime(24, t + 0.17, 0.12);
    }
    v.lastEnd = t + dur * 0.97;
  }

  /** 808-style sub: sine + octave triangle, saturated so phones can hear it. */
  private sub(t: number, midi: number, dur: number, vel: number, glide: boolean): void {
    if (!this.subVoice) {
      const ctx = this.ctx;
      const s = this.osc('sine', 55);
      const o2 = this.osc('triangle', 110);
      const o2g = this.gain(0.3);
      const pre = this.gain(0.9);
      const shaper = ctx.createWaveShaper();
      shaper.curve = softClipCurve(2.2, 1024);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 700;
      const amp = this.gain(0);
      s.connect(pre);
      o2.connect(o2g);
      o2g.connect(pre);
      pre.connect(shaper);
      shaper.connect(lp);
      lp.connect(amp);
      amp.connect(this.subBus);
      const t0 = ctx.currentTime;
      s.start(t0);
      o2.start(t0);
      this.subVoice = {
        oscs: [s, o2], sources: [s, o2], nodes: [s, o2, o2g, pre, shaper, lp, amp],
        amp, vib: null, breath: null, lastEnd: -1,
      };
    }
    const v = this.subVoice;
    const f = midiToFreq(midi);
    const [s, o2] = v.oscs;
    s.frequency.cancelScheduledValues(t);
    o2.frequency.cancelScheduledValues(t);
    if (glide) {
      s.frequency.setTargetAtTime(f, t, 0.045);
      o2.frequency.setTargetAtTime(f * 2, t, 0.045);
    } else {
      s.frequency.setValueAtTime(f, t);
      o2.frequency.setValueAtTime(f * 2, t);
    }
    const a = v.amp.gain;
    a.cancelScheduledValues(t);
    a.setTargetAtTime(0.55 * vel, t, 0.004);
    a.setTargetAtTime(0.4 * vel, t + 0.06, 0.2);
    a.setTargetAtTime(0, t + dur * 0.92, 0.025);
    v.lastEnd = t + dur;
  }
}

// ---------------------------------------------------------------------------
// Music player (crossfading between sequencer instances)
// ---------------------------------------------------------------------------

const CROSSFADE_SECONDS = 0.8;

export class MusicPlayer {
  private current: Sequencer | null = null;
  private currentTrack: MusicTrack = 'none';
  private readonly ctx: AudioContext;
  private readonly dest: AudioNode;

  constructor(ctx: AudioContext, dest: AudioNode) {
    this.ctx = ctx;
    this.dest = dest;
  }

  get track(): MusicTrack {
    return this.currentTrack;
  }

  play(track: MusicTrack): void {
    if (track === this.currentTrack) return;
    if (track === 'none') {
      this.stop();
      return;
    }
    const song = buildSong(track);
    const next = new Sequencer(this.ctx, this.dest, song);
    if (this.current) this.current.stop(CROSSFADE_SECONDS);
    next.start(this.ctx.currentTime + 0.05, CROSSFADE_SECONDS);
    this.current = next;
    this.currentTrack = track;
  }

  stop(): void {
    if (this.current) this.current.stop(CROSSFADE_SECONDS);
    this.current = null;
    this.currentTrack = 'none';
  }

  dispose(): void {
    if (this.current) this.current.dispose();
    this.current = null;
    this.currentTrack = 'none';
  }
}

function buildSong(track: MusicTrack): Song {
  switch (track) {
    case 'menu': return buildMenuSong();
    case 'race': return buildRaceSong(false);
    case 'finalLap': return buildRaceSong(true);
    case 'results': return buildResultsSong();
    default: return buildMenuSong();
  }
}

/** Pre-generate noise and the most used string samples before the first note. */
export function warmMusic(ctx: BaseAudioContext): void {
  noiseBuffer(ctx, 'white');
  noiseBuffer(ctx, 'pink');
  for (const m of [53, 58, 63, 68, 73, 78, 83]) pluckSample(ctx, 'zheng', m);
  for (const m of [63, 68, 73, 78]) pluckSample(ctx, 'pipa', m);
}

