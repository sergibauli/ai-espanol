/**
 * Original guofeng-EDM (国风电音) compositions for Wukong Turbo Rush.
 *
 * Every melody (dizi, erhu, pipa, guzheng) uses only the five notes of a
 * Chinese pentatonic mode (宫商角徵羽); the harmony underneath is the pop
 * progression typical of Douyin hits (IV–V–iii–vi / vi–IV–I–V). Modern layer:
 * four-on-the-floor kick, claps, offbeat 808 sub with a fake sidechain, saw
 * stabs, risers and a "drop"; Chinese percussion (大锣, 小锣, 钹, 堂鼓) marks
 * the cuts.
 *
 * - menu:     D 宫 pentatonic, 120 bpm, half-time: guzheng + pad, then dizi.
 * - race:     A 羽 pentatonic (A minor pent.), 140 bpm, intro → verse (pipa)
 *             → build → drop (erhu hook) → guzheng break → drop 2.
 * - finalLap: same hook a tone higher (B 羽), 150 bpm, straight into the drops.
 * - results:  G 宫 pentatonic, 128 bpm, gong + glissando fanfare, festive loop.
 */
import { BarBuilder, pentatonic, type Bar, type Phrase, type Song } from './partitura';

interface Harmony {
  /** Sub/808 root (MIDI). */
  sub: number;
  pad: readonly number[];
  saw: readonly number[];
  /** Six pentatonic guzheng strings that voice the chord. */
  zh: readonly number[];
}

const ROLL16 = [0, 1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 4, 3, 2, 1];
const ROLL8 = [0, 2, 4, 5, 3, 4, 2, 1];

/** Flowing guzheng arpeggio (16ths or 8ths) over the chord's strings. */
function zhengRoll(b: BarBuilder, h: Harmony, vel: number, sixteenths: boolean): void {
  if (sixteenths) {
    for (let s = 0; s < 16; s++) b.add('zheng', s, h.zh[ROLL16[s]], 1, vel * (s % 4 === 0 ? 1 : 0.72));
  } else {
    for (let k = 0; k < 8; k++) b.add('zheng', k * 2, h.zh[ROLL8[k]], 2, vel * (k % 2 === 0 ? 1 : 0.78));
  }
}

/** Pipa line: notes flagged with arg 1 are played as tremolo (轮指). */
function pipaLine(b: BarBuilder, phrase: Phrase, vel: number): void {
  for (const [s, n, d, a] of phrase) b.add(a === 1 ? 'trem' : 'pipa', s, n, d, a === 1 ? vel * 0.8 : vel);
}

type BeatLevel = 'verse' | 'drop' | 'max';

function edmBeat(b: BarBuilder, level: BeatLevel, kickVel = 1): void {
  b.kick(0, kickVel).kick(4, kickVel * 0.95).kick(8, kickVel).kick(12, kickVel * 0.95);
  b.clap(4, 0.85).clap(12, 0.9);
  if (level === 'verse') {
    for (let s = 2; s < 16; s += 4) b.hatC(s, 0.55);
    b.hatC(15, 0.3);
    return;
  }
  for (let s = 0; s < 16; s++) b.hatC(s, s % 4 === 2 ? 0.2 : s % 2 === 0 ? 0.32 : 0.22);
  for (let s = 2; s < 16; s += 4) b.hatO(s, 0.4);
  if (level === 'max') {
    b.bo(6, 0.3).bo(14, 0.35);
    b.tanggu(10, 0.45).tanggu(11, 0.35);
  }
}

/** Offbeat "DJ" sub: boom on every "and", ducked by the kick. */
function offbeatSub(b: BarBuilder, h: Harmony, vel: number): void {
  for (let s = 2; s < 16; s += 4) b.sub(s, h.sub, 2, vel);
}

/** 3-3-2 saw-chord stabs. */
function sawStabs(b: BarBuilder, h: Harmony, vel: number): void {
  const pattern: readonly (readonly [number, number])[] = [[0, 2], [3, 2], [6, 2], [8, 2], [11, 2], [14, 2]];
  for (const [s, d] of pattern) b.chord('saw', s, h.saw, d, vel * (s % 8 === 0 ? 1 : 0.8));
}

/** "咚咚锵": two barrel-drum hits and a cymbal crash, the Peking-opera cue. */
function luoguFill(b: BarBuilder, from: number, vel = 1): void {
  b.tanggu(from, 0.85 * vel).tanggu(from + 2, 0.95 * vel).bo(from + 4, vel, true);
}

// ---------------------------------------------------------------------------
// Race / final lap: A 羽 (A minor pentatonic: A C D E G)
// ---------------------------------------------------------------------------

const RACE_SCALE = pentatonic(0); // C D E G A

const RF: Harmony = { sub: 29, pad: [53, 57, 60, 64], saw: [60, 64, 65, 69], zh: [57, 60, 64, 67, 69, 72] };
const RG: Harmony = { sub: 31, pad: [55, 59, 62, 67], saw: [59, 62, 67, 71], zh: [55, 62, 67, 69, 74, 76] };
const REm: Harmony = { sub: 28, pad: [52, 55, 59, 64], saw: [59, 64, 67, 71], zh: [52, 55, 62, 64, 67, 74] };
const RAm: Harmony = { sub: 33, pad: [57, 60, 64, 69], saw: [60, 64, 69, 72], zh: [57, 64, 69, 72, 76, 79] };
const RC: Harmony = { sub: 36, pad: [55, 60, 64, 67], saw: [60, 64, 67, 72], zh: [55, 60, 64, 67, 72, 76] };

const DROP_CH = [RF, RG, REm, RAm, RF, RG, REm, RAm];
const VERSE_CH = [RAm, RF, RC, RG, RAm, RF, RC, RG];

/** The hook (erhu): call (bars 1–2), lift (3), fall to 羽 (4); answer in 5–8. */
const HOOK: Phrase[] = [
  [[0, 76, 2], [2, 79, 2], [4, 81, 3], [7, 79, 1], [8, 76, 2], [10, 74, 2], [12, 76, 4]],
  [[0, 72, 2], [2, 74, 2], [4, 76, 2], [6, 79, 2], [8, 74, 6], [14, 72, 1], [15, 74, 1]],
  [[0, 76, 2], [2, 79, 2], [4, 81, 3], [7, 84, 1], [8, 86, 3], [11, 84, 1], [12, 81, 4]],
  [[0, 79, 2], [2, 81, 1], [3, 79, 1], [4, 76, 4], [8, 74, 2], [10, 72, 2], [12, 69, 4]],
  [[0, 76, 2], [2, 79, 2], [4, 81, 3], [7, 79, 1], [8, 76, 2], [10, 74, 2], [12, 76, 4]],
  [[0, 72, 2], [2, 74, 2], [4, 76, 2], [6, 79, 2], [8, 81, 4], [12, 79, 2], [14, 76, 2]],
  [[0, 74, 2], [2, 76, 2], [4, 79, 3], [7, 76, 1], [8, 74, 3], [11, 72, 1], [12, 74, 4]],
  [[0, 76, 6], [6, 74, 1], [7, 72, 1], [8, 69, 8, 2]],
];

/** Drop 2: same hook, climbing higher in the last two bars. */
const HOOK_2: Phrase[] = [
  ...HOOK.slice(0, 6),
  [[0, 81, 2], [2, 84, 2], [4, 86, 3], [7, 84, 1], [8, 81, 3], [11, 79, 1], [12, 81, 4]],
  [[0, 84, 6], [6, 81, 1], [7, 79, 1], [8, 81, 8, 2]],
];

/** Verse (pipa, arg 1 = tremolo). */
const VERSE_PIPA: Phrase[] = [
  [[0, 69, 3], [3, 72, 1], [4, 74, 2], [6, 76, 2], [8, 74, 4, 1], [12, 72, 2], [14, 69, 2]],
  [[0, 72, 3], [3, 74, 1], [4, 72, 2], [6, 69, 2], [8, 67, 8, 1]],
  [[0, 76, 2], [2, 79, 2], [4, 76, 2], [6, 74, 2], [8, 72, 3], [11, 74, 1], [12, 76, 4, 1]],
  [[0, 74, 4, 1], [4, 67, 4], [8, 69, 8, 1]],
  [[0, 69, 3], [3, 72, 1], [4, 74, 2], [6, 76, 2], [8, 74, 4, 1], [12, 72, 2], [14, 69, 2]],
  [[0, 72, 3], [3, 74, 1], [4, 76, 2], [6, 79, 2], [8, 81, 6, 1], [14, 79, 2]],
  [[0, 76, 2], [2, 74, 2], [4, 72, 2], [6, 74, 2], [8, 76, 3], [11, 79, 1], [12, 76, 2], [14, 74, 2]],
  [[0, 74, 8, 1], [8, 74, 2], [10, 72, 2], [12, 74, 4]],
];

/** Guzheng solo of the break (arg = 按音 bend from below). */
const BREAK_ZHENG: Phrase[] = [
  [[0, 76, 2], [2, 74, 1], [3, 72, 1], [4, 69, 4], [8, 72, 2], [10, 74, 2], [12, 76, 4, 2]],
  [[0, 79, 4], [4, 76, 2], [6, 74, 2], [8, 74, 8, 2]],
  [[0, 76, 2], [2, 79, 2], [4, 81, 4], [8, 79, 2], [10, 76, 2], [12, 74, 4, 2]],
  [[0, 74, 4], [4, 72, 4]],
];
const BREAK_DIZI: Phrase[] = [
  [[0, 81, 8], [8, 79, 8]],
  [[0, 84, 14, 1]],
  [[0, 79, 8], [8, 81, 8]],
  [[0, 79, 8, 2]],
];

/** Short pipa answers in the gaps of the hook. */
const PIPA_ANSWER: (Phrase | null)[] = [
  null,
  [[10, 79, 1], [11, 76, 1], [12, 74, 1], [13, 72, 1]],
  null,
  null,
  null,
  null,
  null,
  [[10, 72, 1], [11, 74, 1], [12, 76, 1], [13, 79, 1]],
];

function dropBar(i: number, second: boolean, intense: boolean): Bar {
  const h = DROP_CH[i];
  const b = new BarBuilder();
  edmBeat(b, intense || second ? 'max' : 'drop');
  offbeatSub(b, h, 0.95);
  sawStabs(b, h, intense ? 0.95 : 0.85);
  zhengRoll(b, h, 0.2, true);
  const hook = second ? HOOK_2[i] : HOOK[i];
  b.line('erhu', hook, 0.95);
  if (second || intense) b.line('dizi', hook, 0.5);
  const answer = PIPA_ANSWER[i];
  if (answer) pipaLine(b, answer, 0.75);
  if (intense && i % 2 === 1) b.add('trem', 0, h.zh[2] + 12, 8, 0.25);
  if (i === 0) {
    b.impact(0, 1).crash(0, 1).gong(0, 0.9).lpf(0, 20000);
  } else if (i === 4) {
    b.crash(0, 0.6);
  }
  if (i === 3) b.gliss(12, 69, 6, 4, 0.7);
  if (i === 7) {
    luoguFill(b, 8);
    b.gong(14, 0.6, true);
  }
  return b.build();
}

function buildRaceIntro(): Bar[] {
  const bars: Bar[] = [];
  const ch = [RAm, RF, RC, RG];
  for (let i = 0; i < 4; i++) {
    const h = ch[i];
    const b = new BarBuilder();
    b.chord('pad', 0, h.pad, 16, 0.85);
    zhengRoll(b, h, 0.5, false);
    b.sub(0, h.sub, 14, 0.45);
    if (i === 0) b.lpf(0, 900).gong(0, 0.8).gliss(0, 57, 12, 8, 0.75);
    if (i === 1) b.lpf(0, 2600, 16).line('dizi', HOOK[0], 0.6);
    if (i === 2) b.kick(0, 0.7).kick(8, 0.7).line('dizi', HOOK[1], 0.65);
    if (i === 3) {
      b.kick(0, 0.8).kick(4, 0.8).kick(8, 0.85).kick(12, 0.9);
      b.riser(0, 16, 0.9);
      for (let s = 8; s < 16; s++) b.snare(s, 0.35 + (s - 8) * 0.07, s >= 12);
      b.tanggu(12, 0.7).tanggu(14, 0.8);
    }
    bars.push(b.build());
  }
  return bars;
}

function buildRaceVerse(): Bar[] {
  const bars: Bar[] = [];
  for (let i = 0; i < 8; i++) {
    const h = VERSE_CH[i];
    const b = new BarBuilder();
    edmBeat(b, 'verse', 0.85);
    offbeatSub(b, h, 0.7);
    b.chord('pad', 0, h.pad, 16, 0.6);
    zhengRoll(b, h, 0.28, true);
    pipaLine(b, VERSE_PIPA[i], 0.95);
    if (i === 0) b.lpf(0, 20000).crash(0, 0.8);
    if (i === 4) b.crash(0, 0.45);
    if (i === 3) b.gliss(12, 81, -6, 4, 0.55);
    if (i === 7) luoguFill(b, 10, 0.8);
    bars.push(b.build());
  }
  return bars;
}

function buildRaceBuild(): Bar[] {
  const bars: Bar[] = [];
  const ch = [RF, RG, REm, RAm];
  for (let i = 0; i < 4; i++) {
    const h = ch[i];
    const b = new BarBuilder();
    b.chord('pad', 0, h.pad, 16, 0.7);
    if (i < 3) {
      b.kick(0, 0.9).kick(4, 0.9).kick(8, 0.9).kick(12, 0.9);
      b.sub(0, h.sub, 16, 0.6);
      b.line('zheng', HOOK[i], 0.75);
    }
    if (i === 0) for (let s = 0; s < 16; s += 4) b.snare(s, 0.45);
    if (i === 1) for (let s = 0; s < 16; s += 2) b.snare(s, 0.45 + s * 0.012);
    if (i === 2) {
      for (let s = 0; s < 16; s++) b.snare(s, 0.5 + s * 0.02);
      b.riser(0, 28, 1).lpf(0, 2400, 16);
    }
    if (i === 3) {
      for (let s = 0; s < 12; s++) b.snare(s, 0.75 + s * 0.02, s >= 6);
      b.line('zheng', HOOK[3].filter(([s]) => s < 8), 0.75);
      b.gliss(8, 69, 8, 4, 0.85);
      // steps 12–15: the breath before the drop.
    }
    bars.push(b.build());
  }
  return bars;
}

function buildRaceBreak(): Bar[] {
  const bars: Bar[] = [];
  const ch = [RAm, RF, RC, RG];
  for (let i = 0; i < 4; i++) {
    const h = ch[i];
    const b = new BarBuilder();
    b.chord('pad', 0, h.pad, 16, 0.85);
    b.kick(0, 0.8).clap(8, 0.6);
    for (let s = 2; s < 16; s += 4) b.hatC(s, 0.3);
    b.sub(0, h.sub, 8, 0.6).sub(8, h.sub, 8, 0.5);
    b.line('zheng', BREAK_ZHENG[i], 1);
    b.line('dizi', BREAK_DIZI[i], 0.5);
    if (i === 0) b.gong(0, 0.7);
    if (i === 3) {
      b.riser(0, 16, 0.9).lpf(0, 3000, 12);
      for (let s = 8; s < 16; s++) b.snare(s, 0.45 + (s - 8) * 0.07, s >= 12);
      b.gliss(8, 69, 8, 4, 0.8);
    }
    bars.push(b.build());
  }
  return bars;
}

/**
 * Race theme (A 羽, 140 bpm): intro 4 · verse 8 · build 4 · drop 8 · break 4 ·
 * drop 2 8, looping back to the verse. Final lap (B 羽, 150 bpm): one build
 * bar, then drop + drop 2 with extra percussion and dizi doubling, looping.
 */
export function buildRaceSong(finalLap: boolean): Song {
  const bars: Bar[] = [];
  if (!finalLap) {
    bars.push(...buildRaceIntro());
    bars.push(...buildRaceVerse());
    bars.push(...buildRaceBuild());
    for (let i = 0; i < 8; i++) bars.push(dropBar(i, false, false));
    bars.push(...buildRaceBreak());
    for (let i = 0; i < 8; i++) bars.push(dropBar(i, true, false));
    return {
      bpm: 140, transpose: 0, bars, loopStart: 4, leadDelay: 0.8, gain: 1,
      scale: RACE_SCALE, pump: 0.6, reverb: 0.8,
      mix: { drums: 1, sub: 1, saw: 0.9, pad: 0.9, zheng: 1, pipa: 1, lead: 1, fx: 0.9 },
    };
  }
  const build = new BarBuilder();
  build.chord('pad', 0, RAm.pad, 16, 0.6).sub(0, RAm.sub, 16, 0.6);
  for (let s = 0; s < 16; s += 2) build.tanggu(s, 0.4 + s * 0.035);
  for (let s = 0; s < 16; s++) build.snare(s, 0.45 + s * 0.035, s >= 8);
  build.riser(0, 16, 1).gliss(8, 57, 12, 8, 0.85).kick(0, 0.9).kick(4, 0.9).kick(8, 0.9).kick(12, 0.9);
  bars.push(build.build());
  for (let i = 0; i < 8; i++) bars.push(dropBar(i, false, true));
  for (let i = 0; i < 8; i++) bars.push(dropBar(i, true, true));
  return {
    bpm: 150, transpose: 2, bars, loopStart: 0, leadDelay: 0.7, gain: 0.8,
    scale: RACE_SCALE, pump: 0.65, reverb: 0.7,
    mix: { drums: 1, sub: 1, saw: 0.9, pad: 0.8, zheng: 0.9, pipa: 1, lead: 1, fx: 0.9 },
  };
}

// ---------------------------------------------------------------------------
// Menu: D 宫 (D E F# A B), chill
// ---------------------------------------------------------------------------

const MG: Harmony = { sub: 31, pad: [59, 62, 66, 69], saw: [], zh: [59, 62, 66, 69, 71, 74] };
const MA: Harmony = { sub: 33, pad: [57, 62, 64, 69], saw: [], zh: [57, 62, 64, 69, 71, 76] };
const MFsm: Harmony = { sub: 30, pad: [54, 57, 61, 64], saw: [], zh: [54, 57, 64, 66, 69, 76] };
const MBm: Harmony = { sub: 35, pad: [54, 59, 62, 66], saw: [], zh: [59, 64, 66, 71, 74, 78] };
const MENU_CH = [MG, MA, MFsm, MBm];

const MENU_ZHENG: Phrase[] = [
  [[0, 74, 4], [4, 71, 4], [8, 69, 8]],
  [[0, 71, 4], [4, 69, 4], [8, 64, 8]],
  [[0, 69, 4], [4, 66, 4], [8, 64, 4], [12, 66, 4]],
  [[0, 66, 8, 2], [8, 64, 4], [12, 62, 4]],
];

const MENU_DIZI: Phrase[] = [
  [[0, 71, 6], [6, 69, 2], [8, 66, 4], [12, 64, 4]],
  [[0, 64, 3], [3, 66, 1], [4, 69, 4], [8, 71, 2], [10, 69, 2], [12, 64, 4]],
  [[0, 66, 6], [6, 64, 2], [8, 62, 4], [12, 64, 2], [14, 66, 2]],
  [[0, 69, 4], [4, 66, 4], [8, 71, 8, 1]],
  [[0, 74, 6, 1], [6, 71, 2], [8, 69, 4], [12, 71, 4]],
  [[0, 69, 3], [3, 71, 1], [4, 74, 4], [8, 76, 4], [12, 74, 2], [14, 71, 2]],
  [[0, 69, 4], [4, 66, 2], [6, 64, 2], [8, 66, 8]],
  [[0, 64, 4], [4, 62, 4], [8, 59, 8, 2]],
];

/** Menu (D 宫, 120 bpm, half-time): guzheng + pad intro, then beat, then dizi. */
export function buildMenuSong(): Song {
  const bars: Bar[] = [];
  for (let i = 0; i < 16; i++) {
    const h = MENU_CH[i % 4];
    const b = new BarBuilder();
    b.chord('pad', 0, h.pad, 16, i < 4 ? 0.9 : 0.6);
    zhengRoll(b, h, i < 4 ? 0.5 : 0.36, false);
    if (i === 0) b.lpf(0, 1200).gliss(0, 62, 10, 6, 0.7);
    if (i === 2) b.lpf(0, 20000, 32);
    if (i >= 4) {
      b.kick(0, 0.75).kick(10, 0.6).clap(8, 0.4);
      for (let s = 0; s < 16; s++) b.hatC(s, s % 2 === 0 ? 0.18 : 0.1);
      b.sub(0, h.sub, 10, 0.55).sub(10, h.sub, 6, 0.45);
    }
    if (i >= 4 && i < 8) b.line('zheng', MENU_ZHENG[i - 4], 0.8);
    if (i >= 8) b.line('dizi', MENU_DIZI[i - 8], 0.7, 12);
    if (i === 4) b.gong(0, 0.35);
    if (i === 11 || i === 15) b.gliss(12, 78, -6, 4, 0.5);
    bars.push(b.build());
  }
  return {
    bpm: 120, transpose: 0, bars, loopStart: 4, leadDelay: 0.9, gain: 1.5,
    scale: pentatonic(2), pump: 0.25, reverb: 1,
    mix: { drums: 0.7, sub: 0.7, pad: 1, zheng: 1.1, lead: 1, fx: 0.8 },
  };
}

// ---------------------------------------------------------------------------
// Results: G 宫 (G A B D E), festive
// ---------------------------------------------------------------------------

const XG: Harmony = { sub: 31, pad: [55, 59, 62, 67], saw: [59, 62, 67, 71], zh: [55, 59, 62, 67, 71, 74] };
const XD: Harmony = { sub: 38, pad: [54, 57, 62, 66], saw: [57, 62, 66, 69], zh: [50, 57, 62, 64, 69, 74] };
const XEm: Harmony = { sub: 28, pad: [55, 59, 64, 67], saw: [59, 64, 67, 71], zh: [52, 59, 64, 67, 71, 76] };
const XC: Harmony = { sub: 36, pad: [55, 60, 64, 67], saw: [60, 64, 67, 72], zh: [52, 55, 64, 67, 69, 76] };
const RESULTS_CH = [XG, XD, XEm, XC];

const RESULTS_A: Phrase[] = [
  [[0, 74, 2], [2, 79, 2], [4, 81, 2], [6, 83, 2], [8, 81, 2], [10, 79, 2], [12, 76, 2], [14, 79, 2]],
  [[0, 81, 3], [3, 83, 1], [4, 81, 2], [6, 79, 2], [8, 76, 4], [12, 74, 4]],
  [[0, 76, 2], [2, 79, 2], [4, 83, 2], [6, 86, 2], [8, 88, 3, 1], [11, 86, 1], [12, 83, 4]],
  [[0, 81, 2], [2, 83, 2], [4, 81, 2], [6, 79, 2], [8, 76, 2], [10, 79, 2], [12, 81, 4]],
  [[0, 74, 2], [2, 79, 2], [4, 81, 2], [6, 83, 2], [8, 81, 2], [10, 79, 2], [12, 76, 2], [14, 79, 2]],
  [[0, 81, 3], [3, 83, 1], [4, 86, 2], [6, 83, 2], [8, 81, 4], [12, 79, 2], [14, 81, 2]],
  [[0, 83, 2], [2, 81, 2], [4, 79, 2], [6, 76, 2], [8, 74, 2], [10, 76, 2], [12, 79, 4]],
  [[0, 81, 4, 1], [4, 83, 2], [6, 86, 2], [8, 79, 8]],
];

const RESULTS_B_PIPA: Phrase[] = [
  [[0, 71, 4, 1], [4, 74, 2], [6, 76, 2], [8, 79, 8, 1]],
  [[0, 74, 4, 1], [4, 76, 2], [6, 74, 2], [8, 69, 8, 1]],
  [[0, 71, 2], [2, 74, 2], [4, 76, 4, 1], [8, 79, 2], [10, 76, 2], [12, 74, 4, 1]],
  [[0, 76, 6, 1], [6, 74, 2], [8, 69, 4], [12, 67, 4, 1]],
];

/** Results (G 宫, 128 bpm): gong + glissando fanfare, then a festive loop. */
export function buildResultsSong(): Song {
  const bars: Bar[] = [];
  // Fanfare.
  const f0 = new BarBuilder();
  f0.gong(0, 1).bo(0, 0.9, true).gliss(0, 55, 14, 8, 0.9).chord('pad', 0, XG.pad, 16, 0.8).sub(0, XG.sub, 16, 0.55);
  f0.line('dizi', [[8, 74, 2], [10, 79, 2], [12, 81, 2], [14, 83, 2]], 0.85);
  for (let s = 8; s < 16; s += 2) f0.tanggu(s, 0.5 + (s - 8) * 0.06);
  bars.push(f0.build());
  const f1 = new BarBuilder();
  f1.chord('pad', 0, XD.pad, 16, 0.8).sub(0, XD.sub, 16, 0.5);
  f1.line('dizi', [[0, 86, 6, 1], [6, 83, 1], [7, 81, 1], [8, 79, 4], [12, 81, 4]], 0.85);
  luoguFill(f1, 0, 0.9);
  luoguFill(f1, 8, 1);
  f1.gong(14, 0.7, true).riser(8, 8, 0.6);
  bars.push(f1.build());

  // Loop: A (dizi melody) 8 bars, B (pipa, then pipa + dizi) 8 bars.
  for (let i = 0; i < 16; i++) {
    const h = RESULTS_CH[i % 4];
    const b = new BarBuilder();
    edmBeat(b, 'drop', 0.9);
    offbeatSub(b, h, 0.85);
    sawStabs(b, h, 0.55);
    zhengRoll(b, h, 0.26, true);
    if (i < 8) {
      b.line('dizi', RESULTS_A[i], 0.85);
    } else if (i < 12) {
      pipaLine(b, RESULTS_B_PIPA[i - 8], 0.95);
      b.chord('pad', 0, h.pad, 16, 0.5);
    } else {
      b.line('dizi', RESULTS_A[i - 8], 0.75);
      pipaLine(b, RESULTS_A[i - 8].map(([s, n, d]) => [s, n - 12, d, d >= 4 ? 1 : 0]), 0.6);
    }
    if (i % 4 === 3) b.gong(14, 0.55, true);
    if (i === 0 || i === 8) b.crash(0, 0.8).gong(0, 0.5);
    if (i === 7 || i === 15) {
      luoguFill(b, 8, 0.85);
      b.gliss(12, 67, 8, 4, 0.7);
    }
    bars.push(b.build());
  }
  return {
    bpm: 128, transpose: 0, bars, loopStart: 2, leadDelay: 0.6, gain: 1.08,
    scale: pentatonic(7), pump: 0.45, reverb: 0.7,
    mix: { drums: 0.95, sub: 0.9, saw: 0.8, pad: 0.8, zheng: 1, pipa: 1.35, lead: 1, fx: 0.9 },
  };
}

// ---------------------------------------------------------------------------
// Shield jingle: shimmering guzheng arpeggio over a pulsing sub, 160 bpm
// ---------------------------------------------------------------------------

export function buildShieldJingle(): Song {
  const roots = [74, 70, 72, 69];
  const bars: Bar[] = [];
  for (let i = 0; i < 4; i++) {
    const r = roots[i];
    const seq = [r, r + 7, r + 12, r + 15, r + 19, r + 15, r + 12, r + 7, r + 3, r + 7, r + 10, r + 15, r + 10, r + 7, r + 3, r + 7];
    const b = new BarBuilder();
    for (let s = 0; s < 16; s++) b.add('zheng', s, seq[s] - 12, 1, s % 2 === 0 ? 0.9 : 0.6);
    for (let s = 0; s < 16; s += 2) b.sub(s, 38, 1, s % 4 === 0 ? 0.7 : 0.45);
    b.kick(0, 0.7).kick(8, 0.6);
    for (let s = 1; s < 16; s += 2) b.hatC(s, 0.4);
    bars.push(b.build());
  }
  return { bpm: 160, transpose: 0, bars, loopStart: 0, leadDelay: 0, gain: 1, reverb: 0, pump: 0 };
}
