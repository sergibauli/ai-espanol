#!/usr/bin/env python3
"""Banda sonora original del tráiler (sintetizada: sin muestras ni música de terceros).
Fusión: guzheng pentatónico + cadencia andaluza (Dm–C–Bb–A), taikos, palmas, subidas e impactos en los cortes.
Uso: python3 tools/music.py salida.wav"""
import sys, numpy as np
from scipy.signal import lfilter, butter, fftconvolve
SR = 44100; BPM = 120; BEAT = 60 / BPM; TOTAL = 42.0
N = int(SR * (TOTAL + 0.5))
rs = np.random.RandomState(7)
CUTS = [4, 10, 16, 22, 28, 34]                      # cortes de escena
HITS = [0.5, 2.0, 5.5, 7.5, 39.0]                   # golpes de titulares (se afinan con las escenas)

def note(n):  # nombre → Hz
    names = {'C':0,'C#':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'G':7,'G#':8,'A':9,'Bb':10,'B':11}
    return 440 * 2 ** ((names[n[:-1]] + 12 * (int(n[-1]) + 1) - 69) / 12)
def env_exp(n, tau): return np.exp(-np.arange(n) / (tau * SR))
def lp(x, fc, o=2): b, a = butter(o, fc / (SR / 2)); return lfilter(b, a, x)
def hp(x, fc, o=2): b, a = butter(o, fc / (SR / 2), 'high'); return lfilter(b, a, x)
def bp(x, lo, hi): b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], 'band'); return lfilter(b, a, x)

L = np.zeros(N); R = np.zeros(N)
def add(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N or i + len(sig) <= 0: return
    if i < 0: sig = sig[-i:]; i = 0
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * np.sqrt(0.5 * (1 - pan)); R[i:i + len(sig)] += sig * gain * np.sqrt(0.5 * (1 + pan))

def pluck(f, dur=1.6, bright=0.5, damp=0.996):      # Karplus-Strong (cuerda pulsada tipo guzheng/guitarra)
    n = int(dur * SR); P = int(SR / f); x = np.zeros(n); burst = rs.uniform(-1, 1, P); burst = lp(burst, 1500 + 9000 * bright, 1); x[:P] = burst
    a = np.zeros(P + 2); a[0] = 1; a[P] = -0.5 * damp; a[P + 1] = -0.5 * damp
    y = lfilter([1], a, x); y *= np.minimum(1, np.arange(n) / 40)
    return y / (np.max(np.abs(y)) + 1e-9)
def bend_pluck(f, dur=1.2):                           # pulsación con glissando ascendente (gesto de guzheng)
    y = pluck(f * 0.94, dur); n = len(y); idx = np.cumsum(1 + 0.064 * (1 - np.exp(-np.arange(n) / (0.07 * SR)))) ; idx = idx[idx < n - 1]
    return np.interp(idx, np.arange(n), y)
def taiko(f=70, dur=0.7, hard=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; fr = f * (1 + 1.6 * np.exp(-t / 0.035)); ph = 2 * np.pi * np.cumsum(fr) / SR
    body = np.sin(ph) * np.exp(-t / 0.22); click = lp(rs.randn(n), 2500) * np.exp(-t / 0.012) * 0.7 * hard
    return np.tanh(1.8 * (body + click))
def boom(dur=3.0):
    n = int(dur * SR); t = np.arange(n) / SR; fr = 38 + 60 * np.exp(-t / 0.08); ph = 2 * np.pi * np.cumsum(fr) / SR
    sub = np.sin(ph) * np.exp(-t / 0.9); crack = hp(rs.randn(n), 1800) * np.exp(-t / 0.5) * 0.35 + lp(rs.randn(n), 400) * np.exp(-t / 0.25) * 0.8
    return np.tanh(2.2 * sub) + crack
def riser(dur=1.5):
    n = int(dur * SR); t = np.arange(n) / SR; x = t / dur; noise = rs.randn(n); out = np.zeros(n); seg = 2048
    for i in range(0, n, seg):                        # barrido de filtro por tramos
        fc = 300 + 9000 * (i / n) ** 2; out[i:i + seg] = bp(noise[i:i + seg + 0], fc * 0.6, min(fc * 1.6, 18000))[:len(out[i:i + seg])]
    sweep = np.sin(2 * np.pi * np.cumsum(180 * 2 ** (x * 2.5)) / SR) * 0.25
    return (out * 0.6 + sweep) * x ** 2.2
def whoosh(dur=0.6, fc=1800):
    n = int(dur * SR); t = np.arange(n) / n; return bp(rs.randn(n), fc * 0.5, fc * 2) * np.exp(-((t - 0.55) / 0.2) ** 2)
def bell(f, dur=2.2):
    n = int(dur * SR); t = np.arange(n) / SR; y = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t / d) for m, a, d in [(1, 1, .9), (2.01, .5, .6), (3.02, .28, .4), (4.2, .16, .25), (5.43, .1, .18)])
    return y * np.minimum(1, np.arange(n) / 60)
def clap():
    n = int(0.12 * SR); t = np.arange(n) / SR; e = sum(np.exp(-np.maximum(t - d, 0) / 0.012) * (t >= d) for d in (0, 0.009, 0.019)); return bp(rs.randn(n), 900, 3800) * e * 0.5
def hat(open_=False):
    n = int((0.25 if open_ else 0.05) * SR); return hp(rs.randn(n), 7000) * env_exp(n, 0.08 if open_ else 0.015) * 0.3
def pad(freqs, dur, bright=1400):
    n = int(dur * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for f in freqs:
        for det in (-0.006, 0, 0.007):
            ph = (f * (1 + det) * t) % 1; y += 2 * ph - 1
    y = lp(y, bright, 2); a = np.minimum(1, t / 0.35) * np.minimum(1, (dur - t) / 0.35); return y * a / (len(freqs) * 3)

CH = [('D', ['D3', 'F3', 'A3', 'D4']), ('C', ['C3', 'E3', 'G3', 'C4']), ('Bb', ['Bb2', 'D3', 'F3', 'Bb3']), ('A', ['A2', 'C#3', 'E3', 'A3'])]
ROOT = ['D2', 'C2', 'Bb1', 'A1']
MEL = [  # tema (corcheas de 0,25 s; None = silencio)
    ['D5', None, 'F5', 'G5', 'A5', None, 'G5', 'F5'],
    ['E5', None, 'G5', 'A5', 'C6', None, 'A5', 'G5'],
    ['D5', None, 'F5', 'A5', 'Bb5', None, 'A5', 'F5'],
    ['E5', None, 'C#5', 'E5', 'A5', 'G5', 'F5', 'E5'],
]
MEL2 = [  # variación más alta para el clímax
    ['A5', 'D6', None, 'F6', 'E6', 'D6', 'C6', 'A5'],
    ['G5', 'C6', None, 'E6', 'D6', 'C6', 'A5', 'G5'],
    ['F5', 'Bb5', None, 'D6', 'C6', 'Bb5', 'A5', 'F5'],
    ['E5', 'A5', 'C#6', 'E6', 'D6', 'C#6', 'Bb5', 'A5'],
]
def bar_t(b): return b * 2.0
for b in range(21):                                   # 21 compases de 2 s = 42 s
    t0 = bar_t(b); ci = (b - 2) % 4 if b >= 2 else 0; name, chord = CH[ci]
    sec = 1 if b < 2 else 2 if b < 5 else 3 if b < 8 else 4 if b < 11 else 5 if b < 14 else 6 if b < 17 else 7
    # colchón de cuerdas
    if sec == 1: add(pad([note('D2'), note('A2'), note('D3')], 2.1, 500 + 250 * b), t0, 0.5)
    else: add(pad([note(x) for x in chord] + ([note(chord[1][:-1] + '5')] if sec >= 6 else []), 2.1, 900 + 260 * sec), t0, 0.42 + 0.03 * sec)
    # bajo
    if sec >= 2:
        pat = [0, 1.0] if sec == 2 else [0, 0.75, 1.0, 1.5] if sec < 7 else [0, 0.5, 1.0, 1.5]
        for k, o in enumerate(pat): add(lp(pluck(note(ROOT[ci]) * (2 if k % 2 and sec > 2 else 1), 0.9, 0.15, 0.992), 600), t0 + o, 0.85)
    # percusión
    if sec == 1:
        for o in ([0.5, 1.5] if b == 0 else [0.0, 1.0, 1.5, 1.75]): add(taiko(62, 0.8), t0 + o, 0.55 + 0.1 * b)
    elif sec == 2:
        for o in (0, 1.0): add(taiko(58, 0.9), t0 + o, 0.8)
        add(taiko(95, 0.4, 0.6), t0 + 1.75, 0.4)
    else:
        for o in (0, 0.5, 1.0, 1.5): add(taiko(60, 0.5), t0 + o, 0.85 if sec < 7 else 0.95)
        for o in (0.75, 1.75): add(taiko(110, 0.3, 0.7), t0 + o, 0.35, 0.3)
        for k in range(8): add(hat(k % 4 == 3), t0 + k * 0.25, 0.5 if k % 2 else 0.3, 0.4 if k % 2 else -0.4)
        if sec >= 4:                                   # palmas flamencas (acentos 3-3-2)
            for o, g in ((0.5, .8), (0.75, .5), (1.25, .8), (1.5, .5), (1.75, .7)): add(clap(), t0 + o, g, -0.25 if o * 4 % 2 else 0.25)
    # melodía de guzheng
    if sec >= 2 and not (sec == 7 and b >= 19):
        mel = MEL2 if sec in (6, 7) else MEL
        for k, nn in enumerate(mel[ci]):
            if nn is None or (sec == 2 and k % 2): continue
            f = note(nn); s = bend_pluck(f, 1.3) if k in (0, 4) else pluck(f, 1.3, 0.75)
            add(s, t0 + k * 0.25, 0.55 if sec < 6 else 0.62, 0.25 * np.sin(k * 1.7))
            if sec >= 5: add(pluck(f * 2, 0.8, 0.9), t0 + k * 0.25 + 0.125, 0.16, -0.3)   # eco a la octava (trémolo)
    # rasgueo de guitarra en el primer tiempo
    if sec >= 3 and b < 19:
        for k, x in enumerate(chord + [chord[1][:-1] + '4']): add(pluck(note(x) * 2, 1.4, 0.6), t0 + k * 0.018, 0.22, -0.35)
        if sec >= 5:
            for k, x in enumerate(reversed(chord)): add(pluck(note(x) * 2, 0.9, 0.6), t0 + 1.0 + k * 0.014, 0.16, 0.35)
# gancho: latido + tensión
add(bell(note('D6'), 2.5), 0.0, 0.25); add(boom(2.5), 0.5, 0.9); add(boom(2.5), 2.0, 1.0); add(whoosh(0.5, 2500), 0.2, 0.6); add(whoosh(0.5, 1500), 1.7, 0.6)
for c in CUTS:                                         # subida + impacto en cada corte
    add(riser(1.6 if c in (4, 34) else 1.0), c - (1.6 if c in (4, 34) else 1.0), 0.5 if c in (4, 34) else 0.3)
    add(boom(3.0), c, 1.0 if c in (4, 34) else 0.6); add(whoosh(0.7, 2200), c - 0.4, 0.5); add(bell(note('D5') * (2 if c == 34 else 1), 2.5), c, 0.2)
for h in HITS[2:]:
    add(boom(2.0), h, 0.55); add(bell(note('A5'), 2.0), h, 0.22)
# final: acorde que queda sonando
for k, x in enumerate(['D2', 'A2', 'D3', 'F#3', 'A3', 'D4', 'F#4', 'A4', 'D5']): add(pluck(note(x), 4.0, 0.7, 0.9985), 38.0 + k * 0.03, 0.5, 0.5 * np.sin(k))
add(pad([note('D3'), note('F#3'), note('A3'), note('D4'), note('A4')], 4.4, 2200), 38.0, 0.7); add(bell(note('D6'), 3.5), 38.0, 0.3); add(bell(note('A6'), 3.0), 38.5, 0.15)

# reverberación de sala grande + máster
ir_n = int(2.2 * SR); ir = rs.randn(ir_n) * np.exp(-np.arange(ir_n) / (0.55 * SR)); ir = lp(ir, 5000); ir /= np.sqrt(np.sum(ir ** 2))
ir2 = rs.randn(ir_n) * np.exp(-np.arange(ir_n) / (0.55 * SR)); ir2 = lp(ir2, 5000); ir2 /= np.sqrt(np.sum(ir2 ** 2))
wl = fftconvolve(hp(L, 180), ir)[:N]; wr = fftconvolve(hp(R, 180), ir2)[:N]
L2 = L + 0.2 * wl; R2 = R + 0.2 * wr
t = np.arange(N) / SR; fade = np.minimum(1, t / 0.02) * np.clip((TOTAL - t) / 1.2, 0, 1) ** 1.5
pk = max(np.percentile(np.abs(L2), 99.7), np.percentile(np.abs(R2), 99.7))
out = np.stack([np.tanh(L2 / pk * 0.9) * fade, np.tanh(R2 / pk * 0.9) * fade], 1)[: int(TOTAL * SR)]
out = out / np.max(np.abs(out)) * 0.93
import wave
with wave.open(sys.argv[1] if len(sys.argv) > 1 else 'music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes())
print('ok', out.shape, 'rms', float(np.sqrt(np.mean(out ** 2))))
