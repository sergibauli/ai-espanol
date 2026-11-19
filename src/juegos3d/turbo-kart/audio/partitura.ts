/**
 * Score data model for the procedural music: instruments, note events, bars,
 * songs and a small bar builder used by the compositions.
 */

export type Instrument =
  // modern rhythm section
  | 'kick' | 'snare' | 'clap' | 'hatC' | 'hatO' | 'crash' | 'sub'
  // synth layers
  | 'saw' | 'pad'
  // Chinese instruments
  | 'zheng' | 'gliss' | 'pipa' | 'trem' | 'dizi' | 'erhu'
  | 'gong' | 'bo' | 'tanggu'
  // transitions & automation
  | 'riser' | 'impact' | 'lpf';

export interface NoteEvent {
  step: number;
  inst: Instrument;
  /** MIDI note (ignored by drums; cutoff in Hz for 'lpf'). */
  note: number;
  /** Duration in 16th steps. */
  dur: number;
  /** 0..1 velocity. */
  vel: number;
  /**
   * Instrument-specific articulation:
   * - zheng: bend up into the note from `arg` semitones below (按音);
   * - gliss: number of strings swept (+ up / - down);
   * - dizi: 1 = upper grace note (叠音), 2 = slide up;
   * - erhu: 2 = wide slide up into the note;
   * - sub: 1 = glide from the previous note;
   * - snare: 1 = double hit (32nd roll);
   * - gong: 1 = small opera gong (小锣) instead of the big one;
   * - bo: 1 = open, ringing cymbal.
   */
  arg?: number;
}

export interface Bar {
  notes: NoteEvent[];
}

export interface Song {
  bpm: number;
  /** Semitones added to every pitched note. */
  transpose: number;
  bars: Bar[];
  /** Bar index to jump back to after the last bar. */
  loopStart: number;
  /** Lead (dizi / erhu) dotted-eighth delay wet amount 0..1. */
  leadDelay: number;
  /** Overall song gain. */
  gain: number;
  /** Pitch classes of the (untransposed) pentatonic scale, used by glissandi. */
  scale?: readonly number[];
  /** Fake-sidechain depth 0..1 applied to pads, synth chords and sub on each kick. */
  pump?: number;
  /** Reverb send amount 0..1 (0 = no reverb is created at all). */
  reverb?: number;
  /** Per-layer level multipliers. */
  mix?: Partial<Record<MixLayer, number>>;
}

export type MixLayer = 'drums' | 'sub' | 'saw' | 'pad' | 'zheng' | 'pipa' | 'lead' | 'fx';

/** [step, midi, dur in 16ths, arg?] */
export type Phrase = readonly (readonly number[])[];

/** Pitch classes: 宫 商 角 徵 羽 of a gong-mode pentatonic on `tonic`. */
export function pentatonic(tonic: number): number[] {
  return [0, 2, 4, 7, 9].map((i) => (tonic + i) % 12);
}

export class BarBuilder {
  readonly notes: NoteEvent[] = [];

  add(inst: Instrument, step: number, note: number, dur: number, vel: number, arg?: number): this {
    this.notes.push(arg === undefined ? { inst, step, note, dur, vel } : { inst, step, note, dur, vel, arg });
    return this;
  }

  kick(step: number, vel = 1): this { return this.add('kick', step, 0, 1, vel); }
  snare(step: number, vel = 1, roll = false): this { return this.add('snare', step, 0, 1, vel, roll ? 1 : undefined); }
  clap(step: number, vel = 1): this { return this.add('clap', step, 0, 1, vel); }
  hatC(step: number, vel = 1): this { return this.add('hatC', step, 0, 1, vel); }
  hatO(step: number, vel = 1): this { return this.add('hatO', step, 0, 1, vel); }
  crash(step: number, vel = 1): this { return this.add('crash', step, 0, 1, vel); }
  gong(step: number, vel = 1, small = false): this { return this.add('gong', step, small ? 81 : 43, 1, vel, small ? 1 : undefined); }
  bo(step: number, vel = 1, open = false): this { return this.add('bo', step, 0, 1, vel, open ? 1 : undefined); }
  tanggu(step: number, vel = 1): this { return this.add('tanggu', step, 0, 1, vel); }
  riser(step: number, dur: number, vel = 1): this { return this.add('riser', step, 0, dur, vel); }
  impact(step: number, vel = 1): this { return this.add('impact', step, 0, 1, vel); }
  /** Master lowpass: ramp to `hz` over `dur` steps (0 = jump). */
  lpf(step: number, hz: number, dur = 0): this { return this.add('lpf', step, hz, dur, 1); }
  sub(step: number, note: number, dur: number, vel = 1, glide = false): this { return this.add('sub', step, note, dur, vel, glide ? 1 : undefined); }
  gliss(step: number, from: number, strings: number, dur: number, vel = 1): this { return this.add('gliss', step, from, dur, vel, strings); }
  chord(inst: 'saw' | 'pad', step: number, notes: readonly number[], dur: number, vel = 1): this {
    for (const n of notes) this.add(inst, step, n, dur, vel);
    return this;
  }
  /** Phrase as [step, midi, dur, arg?] tuples, shifted by `octave` semitones. */
  line(inst: Instrument, phrase: Phrase, vel = 1, octave = 0): this {
    for (const [s, n, d, a] of phrase) this.add(inst, s, n + octave, d, vel, a);
    return this;
  }
  build(): Bar {
    return { notes: this.notes };
  }
}
