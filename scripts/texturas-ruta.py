"""Texturas tileables (propias, procedurales) para los recorridos de la Ruta: python3 scripts/texturas-ruta.py
Genera public/theme/ruta/{grano,marmol,agua,papel-tinta}.webp. Ruido filtrado en el dominio de Fourier → se repiten sin costuras."""
import numpy as np
from PIL import Image
rng = np.random.default_rng(7)
OUT = "public/theme/ruta/"

def ruido(n, beta=2.0, aniso=(1, 1), seed=0):
    r = np.random.default_rng(seed)
    w = r.standard_normal((n, n))
    fy = np.fft.fftfreq(n)[:, None] * aniso[1]
    fx = np.fft.fftfreq(n)[None, :] * aniso[0]
    f = np.sqrt(fx ** 2 + fy ** 2); f[0, 0] = 1
    out = np.real(np.fft.ifft2(np.fft.fft2(w) / f ** (beta / 2)))
    out -= out.min(); out /= out.max()
    return out

def guarda(arr, nombre, q=86):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(OUT + nombre, quality=q, method=6)

# 1 · Grano: manchas y poros oscuros/claros sobre transparente (para piedra, madera, mármol)
n = 256
g = ruido(n, 1.6, seed=1) * 0.6 + ruido(n, 0.6, seed=2) * 0.4
a = np.abs(g - 0.5) * 2
alfa = np.clip((a - 0.12) * 1.5, 0, 1) ** 1.1 * 210
tono = np.where(g > 0.5, 255, 40)
rgba = np.dstack([tono, tono * 0.94, tono * 0.86, alfa])
guarda(rgba, "grano.webp", 90)

# 2 · Mármol blanco con vetas grises y doradas
n = 512
y, x = np.mgrid[0:n, 0:n] / n
t = ruido(n, 3.6, seed=3)
v = np.sin((x * 3 + y * 2 + t * 2.2) * 2 * np.pi)
veta = np.exp(-np.abs(v) * 7) * (0.35 + t)
t2 = ruido(n, 3.8, seed=4)
v2 = np.sin((x * 2 - y * 5 + t2 * 3) * 2 * np.pi)
veta2 = np.exp(-np.abs(v2) * 10) * 0.8
base = 248 - ruido(n, 2.4, seed=5) * 14
r = base - veta * 52 - veta2 * 30
gch = base - veta * 50 - veta2 * 34
b = base - veta * 44 - veta2 * 46
guarda(np.dstack([r, gch, b]), "marmol.webp", 84)

# 3 · Agua: ondas alargadas con reflejos
n = 256
o = ruido(n, 2.6, aniso=(3.2, 1), seed=6)
o2 = ruido(n, 2.2, aniso=(4, 1), seed=8)
brillo = np.clip((o2 - 0.68) * 5, 0, 1) ** 1.5
cr = 40 + o * 50 + brillo * 170
cg = 120 + o * 70 + brillo * 120
cb = 160 + o * 60 + brillo * 80
guarda(np.dstack([cr, cg, cb]), "agua.webp", 84)

# 4 · Papel para la tinta: fibras claras (se usa como máscara de pincel seco)
n = 256
f = ruido(n, 1.2, aniso=(6, 1), seed=9)
alfa = np.clip((f - 0.55) * 3.2, 0, 1) * 255
guarda(np.dstack([np.full((n, n), 245), np.full((n, n), 238), np.full((n, n), 224), alfa]), "fibras.webp", 88)
print("ok")
