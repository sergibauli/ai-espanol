"""Fondos pintados de la Ruta (v25): python3 scripts/fondos-ruta.py [A1|A2|B1|B2] [tiras]
Genera public/theme/ruta/fondo-<NIVEL>-{lejos,medio,cerca}.webp: tres planos para parallax, pintados de forma
procedural (sin recursos ajenos): cielo con luz clave, cordilleras con cara iluminada / cara en sombra y torrenteras,
nieve, dunas, karst, perspectiva aérea (lo lejano se funde con el color del aire), niebla en bandas, reflejos en el agua
y siluetas de monumentos (Gran Muralla, Templo del Cielo, pagodas, Potala, el Bund…) teñidas por la distancia.
Todo es determinista (semillas fijas)."""
import sys
import numpy as np
from PIL import Image, ImageDraw

W, H = 1000, 1400
OUT = "public/theme/ruta/"
Y, X = np.mgrid[0:H, 0:W].astype(np.float32)


# ------------------------------------------------------------------ utilidades
def ruido2(h, w, beta=2.0, seed=0, aniso=(1.0, 1.0)):
    r = np.random.default_rng(seed)
    n = r.standard_normal((h, w))
    fy = np.fft.fftfreq(h)[:, None] * aniso[1]
    fx = np.fft.fftfreq(w)[None, :] * aniso[0]
    f = np.sqrt(fx ** 2 + fy ** 2)
    f[0, 0] = 1
    o = np.real(np.fft.ifft2(np.fft.fft2(n) / f ** (beta / 2)))
    o -= o.min()
    o /= o.max()
    return o.astype(np.float32)


def ruido1(n, beta=2.0, seed=0):
    r = np.random.default_rng(seed)
    w = r.standard_normal(n * 2)
    f = np.abs(np.fft.fftfreq(n * 2))
    f[0] = 1
    o = np.real(np.fft.ifft(np.fft.fft(w) / f ** (beta / 2)))[:n]
    o -= o.mean()
    o /= np.abs(o).max() + 1e-6
    return o.astype(np.float32)


def caja(a, r, eje):
    if r < 1:
        return a
    r = int(r)
    p = np.concatenate([np.repeat(a.take([0], axis=eje), r + 1, axis=eje), a, np.repeat(a.take([-1], axis=eje), r, axis=eje)], axis=eje)
    c = np.cumsum(p, axis=eje, dtype=np.float64)
    n = a.shape[eje]
    hi = c.take(np.arange(2 * r + 1, 2 * r + 1 + n), axis=eje)
    lo = c.take(np.arange(0, n), axis=eje)
    return ((hi - lo) / (2 * r + 1)).astype(np.float32)


def desenfoca(a, r):
    """Aproximación gaussiana: tres pasadas de caja en cada eje (a puede ser HxW o HxWxC)."""
    r = max(1, int(r / 1.7))
    for _ in range(3):
        a = caja(a, r, 0)
        a = caja(a, r, 1)
    return a


def suave(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def hexa(c):
    c = c.lstrip("#")
    return np.array([int(c[i : i + 2], 16) / 255 for i in (0, 2, 4)], dtype=np.float32)


def mezcla(a, b, t):
    t = np.asarray(t, dtype=np.float32)
    if t.ndim == 2:
        t = t[..., None]
    return a * (1 - t) + b * t


class Plano:
    """Capa RGBA en coma flotante con operador «over»."""

    def __init__(self, opaco=None):
        self.rgb = np.zeros((H, W, 3), np.float32)
        self.a = np.zeros((H, W), np.float32)
        if opaco is not None:
            self.rgb[:] = opaco
            self.a[:] = 1

    def pon(self, rgb, a):
        a = np.clip(a, 0, 1).astype(np.float32)
        if rgb.ndim == 1:
            rgb = np.broadcast_to(rgb, (H, W, 3))
        na = a + self.a * (1 - a)
        num = rgb * a[..., None] + self.rgb * (self.a * (1 - a))[..., None]
        self.rgb = np.where(na[..., None] > 1e-5, num / np.maximum(na, 1e-5)[..., None], self.rgb)
        self.a = na

    def guarda(self, nombre, q=80):
        g = ruido2(H, W, 0.2, 99) - 0.5  # grano de papel muy fino
        rgb = np.clip(self.rgb + g[..., None] * 0.025, 0, 1)
        arr = np.dstack([rgb, self.a]) * 255
        img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")
        if self.a.min() > 0.999:
            img = img.convert("RGB")
        img.save(OUT + nombre, quality=q, method=6, alpha_quality=70)
        print("  ", nombre)


def mascara(dibujar, aa=2):
    """Máscara antialias dibujada con PIL (dibujar(draw, escala))."""
    img = Image.new("L", (W * aa, H * aa), 0)
    dibujar(ImageDraw.Draw(img), aa)
    img = img.resize((W, H), Image.LANCZOS)
    return np.asarray(img, np.float32) / 255


# ------------------------------------------------------------------ cielo y luz
def cielo(stops, sol=None, halo=None):
    t = Y / H
    c = np.zeros((H, W, 3), np.float32)
    ys = [s[0] for s in stops]
    for k in range(3):
        c[..., k] = np.interp(t, ys, [hexa(s[1])[k] for s in stops])
    if sol:
        sx, sy, r, col, fuerza = sol
        d = np.sqrt((X - sx) ** 2 + (Y - sy) ** 2)
        c = mezcla(c, hexa(col), np.clip(fuerza * np.exp(-((d / (r * 6)) ** 1.2)), 0, 1))
        c = mezcla(c, hexa("#fffdf2"), suave(r * 1.15, r * 0.85, d))
    if halo:
        hx, hy, rx, ry, col, f = halo
        d = np.sqrt(((X - hx) / rx) ** 2 + ((Y - hy) / ry) ** 2)
        c = mezcla(c, hexa(col), f * np.exp(-d * d))
    return c


def nubes(p, y0, y1, densidad, col_luz, col_sombra, sol_x, seed, escala=(3.2, 1), op=1.0):
    n = ruido2(H, W, 2.6, seed, aniso=escala)
    banda = suave(y0 - 60, y0 + 40, Y) * suave(y1 + 60, y1 - 40, Y)
    m = suave(1 - densidad, 1 - densidad + 0.18, n) * banda
    # iluminación: el lado hacia el sol (y la parte alta) más claro
    n2 = desenfoca(n, 6)
    gy = np.gradient(n2, axis=0)
    gx = np.gradient(n2, axis=1)
    lado = np.sign(sol_x - X)
    luz = np.clip(0.55 - gy * 90 + gx * lado * 60, 0, 1)
    col = mezcla(hexa(col_sombra), hexa(col_luz), luz)
    p.pon(col, m * op)


# ------------------------------------------------------------------ cordilleras
def cordillera(p, picos, base, *, luz=-1, lit="#ffffff", sombra="#8899aa", pie=None, rugosidad=10, seed=1, forma="pico",
               nieve=None, aire=None, aire_f=0.0, niebla=None, filo=0.0, torrentes=0.35, textura=0.12, perfil_extra=None, escalon=0.0):
    """picos: [(cx, cima, semiancho)], de atrás adelante (cada uno tapa a los anteriores).
    luz=-1: el sol viene de la izquierda (caras derechas en sombra). escalon: cuánto se aclara cada pico de más atrás."""
    x = np.arange(W, dtype=np.float32)
    tor = ruido2(H, W, 2.2, seed + 3, aniso=(1.0, 6.0)) * 2 - 1
    tex = ruido2(H, W, 1.4, seed + 5) - 0.5
    lim_n = ruido2(H, W, 2.0, seed + 11, aniso=(1.0, 5.0))
    total = np.full(W, 1e9, np.float32)
    npk = len(picos)
    for j, (cx, top, hw) in enumerate(picos):
        d = np.abs(x - cx) / hw
        if forma == "pico":
            asim = 0.75 + 0.5 * ((j * 0.618) % 1)
            d = np.where(x < cx, np.abs(x - cx) / (hw * asim), np.abs(x - cx) / (hw / asim))
            pr = top + (base - top) * d ** (0.95 + 0.3 * ((j * 0.37) % 1))
            det = ruido1(W, 1.5, seed + j * 13) * rugosidad + ruido1(W, 0.7, seed + j * 7) * rugosidad * 0.35
            pr = pr + det * np.clip(1 - d * 0.5, 0.3, 1)
        elif forma == "karst":
            asim = 0.8 + 0.4 * ((j * 0.618) % 1)
            d = np.where(x < cx, np.abs(x - cx) / (hw * asim), np.abs(x - cx) / (hw / asim))
            dd = np.clip(d, 0, 1)
            pr = top + (base - top) * (1 - np.sqrt(np.clip(1 - dd ** 2.4, 0, 1))) ** 0.75
            pr = np.where(d >= 1, H + 10, pr) + ruido1(W, 1.6, seed + j) * rugosidad * (0.4 + dd)
        elif forma == "duna":
            s = (x - cx) / hw
            barlo = top + (base - top) * np.clip(np.abs(s) * 0.7, 0, 3) ** 1.5
            sota = top + (base - top) * np.clip(np.abs(s) * 1.25, 0, 3) ** 1.2
            pr = np.where(s * luz < 0, barlo, sota) + ruido1(W, 2.6, seed + j) * rugosidad
        else:  # loma
            pr = top + (base - top) * (d ** 2) / (0.25 + d ** 2) * 1.25 + ruido1(W, 2.6, seed + j) * rugosidad
        if perfil_extra is not None:
            pr = np.minimum(pr, perfil_extra)
        total = np.minimum(total, pr)
        alpha = np.clip(Y - pr[None, :] + 0.5, 0, 1) * suave(base + 70, base + 10, Y)
        prof = np.clip((Y - pr[None, :]) / max(base - top, 30), 0, 1.6)
        if forma == "duna":
            bajada = np.clip((Y - top) / max(base - top, 30), 0, 2)
            xb = cx - luz * hw * 0.85 * bajada ** 1.4
            s = (X - xb) / hw
            orient = np.tanh((s + 0.015 * luz) * 16) * 0.95 + tor * 0.08
        else:
            lado = np.clip((X - cx) / (hw * (0.55 if forma == "karst" else 0.16)), -1, 1)
            orient = np.clip(lado + tor * torrentes * (0.5 + prof), -1, 1)
        ilum = suave(0.0, 1.0, np.clip(0.5 - 0.5 * orient * (-luz), 0, 1))
        col = mezcla(hexa(sombra), hexa(lit), ilum)
        col = col * (1 + tex[..., None] * textura)
        if pie:
            col = mezcla(col, hexa(pie), suave(0.3, 1.2, prof) * 0.75)
        if nieve:
            n_lit, n_sombra, prof_n = nieve
            lim = prof_n * (0.45 + 0.9 * lim_n)
            ny = suave(lim + 0.05, lim - 0.03, prof) * np.clip(0.5 + 0.7 * ilum + 0.35 * (tor > 0.15), 0, 1)
            col = mezcla(col, mezcla(hexa(n_sombra), hexa(n_lit), ilum), np.clip(ny, 0, 1))
        if filo:
            borde = suave(3.5, 0.0, Y - pr[None, :]) * suave(0.5, 0.9, ilum)
            col = mezcla(col, hexa("#fffaf0"), borde * filo)
        lejania = (npk - 1 - j) / max(1, npk - 1) * escalon
        if aire is not None:
            col = mezcla(col, hexa(aire), np.clip(aire_f + lejania, 0, 1))
        if niebla:
            ncol, alto, fuerza = niebla
            col = mezcla(col, hexa(ncol), suave(base - alto, base + 10, Y) * fuerza)
        p.pon(col, alpha)
    return total


def banda_niebla(p, y, alto, col, fuerza, seed, deriva=0.0):
    n = ruido2(H, W, 2.4, seed, aniso=(5.0, 1.0))
    perfil = np.exp(-(((Y - y) / alto) ** 2))
    m = perfil * (0.45 + 0.75 * n) * fuerza
    p.pon(hexa(col), np.clip(m, 0, 1))


def sombra_contacto(p, cx, y, rx, ry, f=0.35, col="#1a1420"):
    d = ((X - cx) / rx) ** 2 + ((Y - y) / ry) ** 2
    p.pon(hexa(col), np.clip(np.exp(-d * 2.2) * f, 0, 1))


def tinte(m, col_cuerpo, col_luz=None, luz=-1, cx=None, ancho=1.0, aire=None, aire_f=0.0, op=1.0):
    """Colorea una silueta con cara iluminada (lado del sol) y cara en sombra."""
    cuerpo = np.broadcast_to(hexa(col_cuerpo), (H, W, 3)).copy()
    if col_luz is not None and cx is not None:
        t = suave(-ancho, ancho, (X - cx) * (-luz))
        cuerpo = mezcla(cuerpo, hexa(col_luz), t * 0.9)
    if aire is not None:
        cuerpo = mezcla(cuerpo, hexa(aire), aire_f)
    return cuerpo, m * op


def reflejo(p, y_agua, col_agua, f_tinte=0.55, olas=2.5, seed=3, brillo="#ffffff", y_fin=H):
    """El agua refleja (invertido y con ondas) lo pintado por encima de y_agua."""
    filas = np.arange(H)
    ond = ruido2(H, W, 1.2, seed, aniso=(3.0, 0.4)) - 0.5
    src_y = np.clip(2 * y_agua - Y + ond * olas * (1 + (Y - y_agua) / 120), 0, y_agua - 1).astype(np.int32)
    src_x = np.clip(X + ond * olas * 3, 0, W - 1).astype(np.int32)
    ref = p.rgb[src_y, src_x]
    prof = np.clip((Y - y_agua) / 260, 0, 1)
    col = mezcla(ref, hexa(col_agua), f_tinte + prof[..., None] * 0.25)
    # vetas horizontales de luz
    vet = ruido2(H, W, 1.6, seed + 1, aniso=(6.0, 0.3))
    col = mezcla(col, hexa(brillo), suave(0.72, 0.9, vet) * 0.35)
    m = (Y >= y_agua) & (Y < y_fin)
    p.pon(col, m.astype(np.float32))
    # orilla: línea fina clara
    p.pon(hexa(brillo), suave(2.5, 0, np.abs(Y - y_agua)) * 0.35)


# ------------------------------------------------------------------ monumentos (siluetas)
def tejado_pts(cx, y, w, h, s):
    """Tejado chino de aleros curvos como polígono (lista de puntos)."""
    pts = []
    for t in np.linspace(-1, 1, 24):
        xx = cx + t * w / 2
        alza = (abs(t) ** 3.2) * h * 0.55
        pts.append((xx * s, (y - alza) * s))
    for t in np.linspace(1, -1, 24):
        xx = cx + t * w * 0.3
        yy = y - h * (1 - abs(t) * 0.25)
        pts.append((xx * s, yy * s))
    return pts


def pagoda(d, s, cx, base, pisos, w0, h0, estrecha=0.86):
    y = base
    w = w0
    for i in range(pisos):
        d.rectangle([(cx - w * 0.32) * s, (y - h0 * 0.62) * s, (cx + w * 0.32) * s, y * s], fill=255)
        d.polygon(tejado_pts(cx, y - h0 * 0.6, w, h0 * 0.5, s), fill=255)
        y -= h0
        w *= estrecha
    d.line([(cx * s, (y + h0 * 0.2) * s), (cx * s, (y - h0 * 0.7) * s)], fill=255, width=max(1, int(2 * s)))


def templo_cielo(d, s, cx, base, w):
    # terrazas de mármol + tres tejados redondos cónicos
    for k in range(3):
        ww = w * (1.25 - k * 0.12)
        d.rectangle([(cx - ww / 2) * s, (base - 6 * (k + 1)) * s, (cx + ww / 2) * s, (base - 6 * k) * s], fill=255)
    y = base - 18
    ww = w * 0.8
    for k in range(3):
        d.rectangle([(cx - ww * 0.36) * s, (y - w * 0.16) * s, (cx + ww * 0.36) * s, y * s], fill=255)
        y -= w * 0.16
        d.polygon([((cx - ww / 2) * s, y * s), ((cx + ww / 2) * s, y * s), ((cx + ww * 0.16) * s, (y - w * 0.16) * s), ((cx - ww * 0.16) * s, (y - w * 0.16) * s)], fill=255)
        y -= w * 0.12
        ww *= 0.76
    d.polygon([((cx - 4) * s, y * s), ((cx + 4) * s, y * s), (cx * s, (y - w * 0.14) * s)], fill=255)


def muralla(d, s, xs, ys, grosor=7, torres=()):
    pts = list(zip(xs, ys))
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        d.polygon([(x0 * s, (y0 - grosor) * s), (x1 * s, (y1 - grosor) * s), (x1 * s, (y1 + 2) * s), (x0 * s, (y0 + 2) * s)], fill=255)
        if i % 3 == 0:  # almenas
            d.rectangle([(x0 - 1.4) * s, (y0 - grosor - 3) * s, (x0 + 1.4) * s, (y0 - grosor) * s], fill=255)
    for tx in torres:
        j = int(np.argmin([abs(a - tx) for a in xs]))
        x0, y0 = xs[j], ys[j]
        tw = grosor * 2.2
        d.rectangle([(x0 - tw / 2) * s, (y0 - grosor * 3.2) * s, (x0 + tw / 2) * s, (y0 + 2) * s], fill=255)
        d.polygon(tejado_pts(x0, y0 - grosor * 3.1, tw * 1.5, grosor * 1.2, s), fill=255)


def pino(d, s, x, y, h):
    for k in range(4):
        w = h * (0.42 - k * 0.08)
        yy = y - h * (0.18 + k * 0.2)
        d.polygon([((x - w) * s, yy * s), ((x + w) * s, yy * s), (x * s, (yy - h * 0.34) * s)], fill=255)
    d.rectangle([(x - h * 0.03) * s, (y - h * 0.2) * s, (x + h * 0.03) * s, y * s], fill=255)


# ------------------------------------------------------------------ niveles
def pinos_nevados(p, lista, verde="#1f3a33", nieve="#f4f8ff", aire=None, aire_f=0.0, luz=1, seed=0):
    """Pinos con nieve en el borde alto de cada piso y lado en sombra."""
    m = mascara(lambda d, s: [pino(d, s, x, y, h) for x, y, h in lista])
    arriba = np.roll(m, 5, axis=0)
    borde = np.clip(m - arriba, 0, 1)
    borde = desenfoca(borde, 1.2) * m
    n = ruido2(H, W, 1.2, seed + 77)
    col = np.broadcast_to(hexa(verde), (H, W, 3)).copy()
    # luz lateral: el lado al sol algo más claro
    cxs = np.zeros((H, W), np.float32)
    for x, y, h in lista:
        dentro = (np.abs(X - x) < h * 0.45) & (Y < y) & (Y > y - h * 1.05)
        cxs = np.where(dentro, X - x, cxs)
    col = mezcla(col, hexa("#4f6f60"), suave(-4, 10, cxs * luz) * 0.5)
    col = mezcla(col, hexa(nieve), np.clip(borde * 2.2 * (0.6 + 0.6 * n), 0, 1))
    if aire is not None:
        col = mezcla(col, hexa(aire), aire_f)
    p.pon(col, m)


def edificio(p, techo, muro, *, oro="#d9a23a", oro_sombra="#8a5a1a", rojo="#a8242c", rojo_sombra="#5a1218", luz=1, cx=0, nieve=True,
             aire=None, aire_f=0.0, seed=0):
    """Pabellón: muro bermellón con lado en sombra y tejado de oro con tejas y nieve en la cara alta."""
    lado = suave(-30, 30, (X - cx) * luz)
    cm = mezcla(np.broadcast_to(hexa(rojo_sombra), (H, W, 3)), hexa(rojo), lado * 0.8 + 0.2)
    cm = mezcla(cm, hexa("#2a0a0c"), suave(0, 1, (Y % 9) / 9) * 0 )
    ct = mezcla(np.broadcast_to(hexa(oro_sombra), (H, W, 3)), hexa(oro), lado * 0.7 + 0.3)
    tejas = (np.sin(X * 1.3) > 0.55).astype(np.float32)
    ct = mezcla(ct, hexa(oro_sombra), tejas * 0.3)
    ct = mezcla(ct, hexa("#3a1a08"), np.clip(np.roll(techo, -4, axis=0) - techo, 0, 1) * 0)
    if nieve:
        arriba = np.roll(techo, 6, axis=0)
        cap = np.clip(techo - arriba, 0, 1)
        cap = np.maximum(cap, techo * suave(0.55, 0.7, ruido2(H, W, 2.6, seed + 5)) * 0.85)
        ct = mezcla(ct, mezcla(hexa("#c9d6ea"), hexa("#ffffff"), lado), np.clip(cap * 1.4, 0, 1))
    if aire is not None:
        cm = mezcla(cm, hexa(aire), aire_f)
        ct = mezcla(ct, hexa(aire), aire_f)
    p.pon(cm, muro)
    p.pon(ct, techo)


def A1():
    """Invierno en Pekín: sol bajo de invierno a la derecha (luz cálida, sombras azules), niebla helada en bandas."""
    luz = 1  # el sol viene de la derecha
    sol = (770, 360, 36)
    L = Plano(cielo([(0, "#3f6595"), (0.2, "#7c9cc2"), (0.36, "#bccbdc"), (0.47, "#f3dfc6"), (0.55, "#f7ead8"), (1, "#f4efe8")], sol=(*sol, "#ffdcaa", 0.9),
                    halo=(770, 430, 560, 240, "#ffcf98", 0.45)))
    nubes(L, 110, 330, 0.55, "#fff2e2", "#8fa4c2", sol[0], 21, escala=(3.0, 1), op=0.95)
    cordillera(L, [(80, 480, 240), (930, 470, 250), (300, 430, 210), (700, 400, 220), (520, 470, 220)], 700, luz=luz,
               lit="#b89d86", sombra="#3e4f75", rugosidad=26, seed=4, nieve=("#fff6ea", "#9fb3d6", 0.32), aire="#c3cfe2", aire_f=0.3,
               niebla=("#eef1f4", 170, 0.9), filo=0.7, escalon=0.15)
    banda_niebla(L, 650, 70, "#f6f2ec", 0.85, 31)
    L.guarda("fondo-A1-lejos.webp", 78)

    M = Plano()
    r = cordillera(M, [(980, 600, 240), (120, 590, 270), (690, 575, 250), (420, 630, 240)], 860, luz=luz, lit="#b39478", sombra="#38496c",
                   rugosidad=18, seed=7, nieve=("#fffaf2", "#a6b9d8", 0.4), aire="#dbe3ee", aire_f=0.12, niebla=("#f2f2f2", 150, 0.8), filo=0.9,
                   torrentes=0.55, escalon=0.12)
    # Gran Muralla siguiendo la cresta, con torres de vigía: cara al sol cálida, cara en sombra azul
    xs = list(range(0, W, 5))
    ys = [float(r[min(W - 1, x)]) + 5 for x in xs]
    mm = mascara(lambda d, s: muralla(d, s, xs, ys, grosor=7, torres=(60, 240, 430, 610, 790, 960)))
    cuerpo = np.broadcast_to(hexa("#7d7480"), (H, W, 3)).copy()
    cuerpo = mezcla(cuerpo, hexa("#f6dcb2"), np.clip(mm - np.roll(mm, 3, axis=0), 0, 1))
    cuerpo = mezcla(cuerpo, hexa("#ffffff"), np.clip(mm - np.roll(mm, 2, axis=0), 0, 1) * 0.6)
    M.pon(mezcla(cuerpo, hexa("#d3dceb"), 0.2), mm)
    tm = mascara(lambda d, s: templo_cielo(d, s, 200, 770, 120))
    techo_t = tm * (ruido2(H, W, 0.1, 3) * 0 + 1) * ((Y < 770 - 24) & (((Y.astype(int) // 1) % 1) == 0))
    M.pon(*tinte(tm, "#405a8a", "#e8eef8", luz=luz, cx=200, ancho=16, aire="#d4dce8", aire_f=0.28))
    pm = mascara(lambda d, s: pagoda(d, s, 830, 790, 5, 66, 27))
    M.pon(*tinte(pm, "#5d6b88", "#f1e6d6", luz=luz, cx=830, ancho=8, aire="#d4dce8", aire_f=0.35))
    banda_niebla(M, 800, 60, "#f5f5f4", 0.9, 33)
    _r = np.random.default_rng(12)
    pinos_nevados(M, [(x + _r.uniform(-8, 8), 845 + 22 * np.sin(x * 0.013) + _r.uniform(0, 26), _r.uniform(26, 70)) for x in range(6, W, 14) if _r.random() > 0.25], verde="#4f6474",
                  nieve="#f2f5fa", aire="#dfe5ec", aire_f=0.35, luz=luz, seed=2)
    # llanura nevada: blanco cálido al sol, surcos azulados (sastrugi) y sombra que avanza hacia el espectador
    sas = ruido2(H, W, 2.2, 36, aniso=(6.0, 1.0))
    suelo = mezcla(np.broadcast_to(hexa("#fbf6ee"), (H, W, 3)), hexa("#b9c8de"), np.clip(suave(0.5, 0.8, sas) * 0.5 + suave(900, 1400, Y) * 0.35, 0, 1))
    suelo = mezcla(suelo, hexa("#ffe9cc"), suave(400, 1000, X) * suave(1100, 880, Y) * 0.35)
    M.pon(suelo, suave(858, 885, Y))
    banda_niebla(M, 875, 45, "#f6f6f5", 0.9, 35)
    M.guarda("fondo-A1-medio.webp", 80)

    C = Plano()
    cordillera(C, [(1000, 990, 300), (0, 990, 320)], 1300, luz=luz, lit="#ffffff", sombra="#a9bbd6", forma="loma", rugosidad=10,
               seed=9, filo=0.4, niebla=("#f7f6f4", 140, 0.35), escalon=0.0)
    # Puerta de la Ciudad Prohibida (doble alero) sobre su muralla bermellón, a la izquierda
    def muro(d, s):
        d.polygon([(-10 * s, 1120 * s), (-10 * s, 1010 * s), (300 * s, 1010 * s), (318 * s, 1120 * s)], fill=255)
        d.rectangle([20 * s, 950 * s, 250 * s, 1012 * s], fill=255)
        d.rectangle([45 * s, 905 * s, 225 * s, 935 * s], fill=255)
    def techos(d, s):
        d.polygon(tejado_pts(135, 950, 290, 40, s), fill=255)
        d.polygon(tejado_pts(135, 905, 230, 40, s), fill=255)
        d.polygon([(-10 * s, 1012 * s), (300 * s, 1012 * s), (306 * s, 1000 * s), (-10 * s, 1000 * s)], fill=255)
    mu = mascara(muro)
    te = mascara(techos)
    mu = mu * (1 - te)
    # puertas en arco (oscuras)
    arcos = np.zeros((H, W), np.float32)
    for ax in (60, 135, 210):
        arcos = np.maximum(arcos, ((np.abs(X - ax) < 15) & (Y > 1060) & (Y < 1120)) | (((X - ax) ** 2 + (Y - 1060) ** 2) < 225))
    edificio(C, te, mu, luz=luz, cx=135, aire="#e3e8f0", aire_f=0.12, seed=4)
    C.pon(hexa("#2a1012"), arcos * mu)
    sombra_contacto(C, 150, 1122, 230, 14, 0.35, "#3a4a6a")
    pinos_nevados(C, [(880, 1150, 170), (945, 1170, 210), (990, 1120, 140), (820, 1180, 100), (330, 1200, 110)], verde="#183229",
                  nieve="#f7fbff", luz=luz, seed=6)
    sombra_contacto(C, 920, 1172, 130, 12, 0.3, "#3a4a6a")
    banda_niebla(C, 1240, 90, "#f8f8f6", 0.85, 37)
    C.guarda("fondo-A1-cerca.webp", 80)


def A2():
    """Atardecer en la Ruta de la Seda: sol bajo a la izquierda, dunas con filo de luz y sotavento violeta, calima."""
    luz = -1
    sol = (230, 600, 40)
    L = Plano(cielo([(0, "#2c1b47"), (0.18, "#6b2d5c"), (0.33, "#c4553f"), (0.45, "#f19a4c"), (0.52, "#fbd38a"), (1, "#f5c47e")], sol=(*sol, "#ffcf7a", 1.0),
                    halo=(230, 620, 600, 200, "#ffb768", 0.55)))
    nubes(L, 140, 420, 0.38, "#ffc58a", "#7a3a62", sol[0], 22, escala=(5, 1), op=0.8)
    # Montañas de Qilian lejanas en la calima
    cordillera(L, [(150, 610, 230), (420, 580, 250), (700, 600, 230), (950, 570, 260)], 760, luz=luz, lit="#f5b98a", sombra="#9a5f7a",
               rugosidad=10, seed=12, aire="#f2b27c", aire_f=0.5, niebla=("#f8c98e", 140, 0.8), filo=0.5)
    banda_niebla(L, 735, 50, "#ffd9a0", 0.7, 41)
    L.guarda("fondo-A2-lejos.webp", 78)

    M = Plano()
    r = cordillera(M, [(60, 735, 230), (330, 715, 260), (640, 740, 240), (930, 705, 260)], 900, luz=luz, lit="#ffcf8c", sombra="#b0617a", forma="duna",
                   rugosidad=6, seed=14, aire="#f6bd84", aire_f=0.28, niebla=("#f7c68e", 120, 0.55), filo=0.9, textura=0.06)
    # Muralla de Xi'an con torre de puerta y la Gran Pagoda del Ganso Salvaje recortadas contra el sol
    def ciudad(d, s):
        d.rectangle([520 * s, 760 * s, 960 * s, 790 * s], fill=255)
        for x in range(520, 960, 10):
            d.rectangle([x * s, 754 * s, (x + 5) * s, 760 * s], fill=255)
        d.rectangle([690 * s, 724 * s, 790 * s, 762 * s], fill=255)
        d.polygon(tejado_pts(740, 728, 130, 26, s), fill=255)
        d.rectangle([710 * s, 700 * s, 770 * s, 712 * s], fill=255)
        d.polygon(tejado_pts(740, 704, 96, 22, s), fill=255)
        # pagoda escalonada
        y = 790
        w = 46
        for i in range(7):
            d.rectangle([(380 - w / 2) * s, (y - 20) * s, (380 + w / 2) * s, y * s], fill=255)
            d.rectangle([(380 - w / 2 - 3) * s, (y - 22) * s, (380 + w / 2 + 3) * s, (y - 19) * s], fill=255)
            y -= 21
            w *= 0.88
        d.polygon([(372 * s, y * s), (388 * s, y * s), (380 * s, (y - 18) * s)], fill=255)
    cm = mascara(ciudad)
    M.pon(*tinte(cm, "#7a3f4a", "#ffc98a", luz=luz, cx=560, ancho=300, aire="#e7a07a", aire_f=0.35))
    banda_niebla(M, 800, 40, "#ffd39a", 0.75, 43)
    # Caravana de camellos sobre una cresta, a contraluz
    def caravana(d, s):
        for i, x in enumerate(range(140, 300, 34)):
            y = float(r[x]) + 2
            d.ellipse([(x - 12) * s, (y - 16) * s, (x + 10) * s, (y - 6) * s], fill=255)
            d.ellipse([(x - 8) * s, (y - 21) * s, (x - 1) * s, (y - 13) * s], fill=255)
            d.ellipse([(x + 0) * s, (y - 20) * s, (x + 7) * s, (y - 12) * s], fill=255)
            d.line([((x + 9) * s, (y - 12) * s), ((x + 15) * s, (y - 22) * s)], fill=255, width=int(3 * s))
            d.ellipse([(x + 13) * s, (y - 25) * s, (x + 19) * s, (y - 20) * s], fill=255)
            for lx in (-9, -5, 3, 7):
                d.line([((x + lx) * s, (y - 8) * s), ((x + lx) * s, y * s)], fill=255, width=max(1, int(1.6 * s)))
    M.pon(hexa("#4d2236"), mascara(caravana) * 0.85)
    M.guarda("fondo-A2-medio.webp", 80)

    C = Plano()
    cordillera(C, [(150, 980, 360), (620, 1020, 380), (980, 960, 300)], 1300, luz=luz, lit="#ffd9a0", sombra="#c27560", forma="duna",
               rugosidad=5, seed=16, filo=1.0, textura=0.05, niebla=("#f8cf96", 90, 0.35))
    # ondulaciones de arena (ripples) en el primer plano
    rip = ruido2(H, W, 2.0, 71, aniso=(3.0, 0.5))
    rr = (np.sin((Y + rip * 60) * 0.55) > 0.82) * (Y > 1000) * 0.18
    C.pon(hexa("#8a4a4a"), rr * C.a)
    # oasis con reflejo del cielo a la derecha
    oasis = mascara(lambda d, s: d.ellipse([700 * s, 1090 * s, 990 * s, 1145 * s], fill=255))
    C.pon(mezcla(np.broadcast_to(hexa("#f6b46a"), (H, W, 3)), hexa("#3f6f7a"), suave(1090, 1145, Y)), oasis)
    palm = mascara(lambda d, s: [
        (d.line([(x * s, y * s), ((x + 8) * s, (y - h) * s)], fill=255, width=int(4 * s)),
         [d.polygon([((x + 8) * s, (y - h) * s), ((x + 8 + np.cos(a) * 38) * s, (y - h + 10 + np.sin(a) * 16) * s), ((x + 8 + np.cos(a) * 20) * s, (y - h + 2 + np.sin(a) * 6) * s)], fill=255) for a in np.linspace(-2.8, -0.3, 6)])
        for x, y, h in ((720, 1100, 110), (770, 1095, 140), (960, 1098, 120))])
    C.pon(hexa("#3c2a2a"), palm)
    banda_niebla(C, 1230, 80, "#f7cd94", 0.6, 47)
    C.guarda("fondo-A2-cerca.webp", 80)


def B1():
    """Noche de agua en el este: luna fría arriba a la derecha, luces de linterna cálidas, ciudad y skyline reflejados."""
    luz = 1
    luna = (760, 230, 30)
    L = Plano(cielo([(0, "#081430"), (0.25, "#16295a"), (0.43, "#3a3d70"), (0.5, "#8a5a6e"), (0.53, "#d08a62"), (1, "#0b2238")], sol=(*luna, "#bcd0ff", 0.45),
                    halo=(500, 720, 700, 90, "#ff9e6a", 0.35)))
    est = np.random.default_rng(5)
    for _ in range(260):
        sx, sy = est.uniform(0, W), est.uniform(0, 560)
        b = est.uniform(0.2, 1) * (1 - sy / 600)
        L.pon(hexa("#ffffff"), np.clip(1.2 - np.hypot(X - sx, Y - sy), 0, 1) * b)
    nubes(L, 260, 520, 0.36, "#8a8fc2", "#20284f", luna[0], 23, escala=(5, 1), op=0.7)
    # colinas de tinta lejanas (Huangshan) + skyline de Shanghái en la bruma
    cordillera(L, [(120, 590, 200), (330, 610, 220), (880, 600, 240)], 720, luz=luz, lit="#4b5486", sombra="#262c55", rugosidad=12, seed=18,
               aire="#3b3f72", aire_f=0.35, niebla=("#6a5878", 100, 0.7))
    def skyline(d, s):
        rng = np.random.default_rng(8)
        x = 430
        while x < 760:
            w = rng.uniform(14, 30)
            h = rng.uniform(40, 120)
            d.rectangle([x * s, (735 - h) * s, (x + w) * s, 735 * s], fill=255)
            x += w + rng.uniform(1, 5)
        # Perla de Oriente
        d.rectangle([548 * s, 520 * s, 552 * s, 735 * s], fill=255)
        d.ellipse([536 * s, 640 * s, 564 * s, 668 * s], fill=255)
        d.ellipse([541 * s, 575 * s, 559 * s, 593 * s], fill=255)
        d.polygon([(542 * s, 735 * s), (558 * s, 735 * s), (551 * s, 650 * s), (549 * s, 650 * s)], fill=255)
        # torre de Shanghái (girada y afinada)
        d.polygon([(640 * s, 735 * s), (676 * s, 735 * s), (668 * s, 470 * s), (652 * s, 478 * s)], fill=255)
        d.polygon([(690 * s, 735 * s), (716 * s, 735 * s), (712 * s, 540 * s), (696 * s, 540 * s)], fill=255)
    sk = mascara(skyline)
    L.pon(*tinte(sk, "#2a2f5c", "#6b6fa0", luz=luz, cx=600, ancho=300, aire="#4a4776", aire_f=0.35))
    # ventanas encendidas
    vent = (ruido2(H, W, 0.05, 81) > 0.83) * sk * (Y < 732)
    L.pon(hexa("#ffd98a"), vent * 0.8)
    L.pon(hexa("#ff8fb0"), np.exp(-(((X - 550) ** 2 + (Y - 654) ** 2) / 60)) * 0.9)
    banda_niebla(L, 735, 26, "#8a6a86", 0.6, 52)
    reflejo(L, 740, "#0e2a44", f_tinte=0.42, olas=3, seed=6, brillo="#ffcf9a")
    L.guarda("fondo-B1-lejos.webp", 80)

    M = Plano()
    # pueblo de agua: casas de muro blanco y tejado negro, con linternas, sobre el canal
    def casas(d, s):
        for cx, w, h, base in ((70, 150, 70, 905), (215, 120, 60, 900), (790, 140, 74, 905), (930, 150, 64, 900)):
            d.rectangle([(cx - w / 2) * s, (base - h) * s, (cx + w / 2) * s, base * s], fill=255)
            d.polygon(tejado_pts(cx, base - h + 4, w * 1.12, 24, s), fill=255)
            # muro cortafuegos escalonado (马头墙)
            d.rectangle([(cx - w / 2 - 4) * s, (base - h - 26) * s, (cx - w / 2 + 14) * s, (base - h + 2) * s], fill=255)
    cm = mascara(casas)
    blanco = np.broadcast_to(hexa("#d9d9e4"), (H, W, 3)).copy()
    tejas = np.zeros((H, W), np.float32)
    for cx, w, h, base in ((70, 150, 70, 905), (215, 120, 60, 900), (790, 140, 74, 905), (930, 150, 64, 900)):
        tejas = np.maximum(tejas, (Y < base - h + 6) * (np.abs(X - cx) < w * 0.6))
    col = mezcla(blanco, hexa("#1b1f2e"), tejas)
    col = mezcla(col, hexa("#3d4570"), suave(0, 1, (X - 500) / 400 * luz) * 0.3)  # luz de luna desde la derecha
    col = mezcla(col, hexa("#2b3260"), 0.35)
    M.pon(col, cm)
    # ventanas cálidas y farolillos rojos que brillan
    for cx, base in ((40, 880), (95, 878), (200, 875), (770, 882), (820, 880), (910, 876), (960, 878)):
        M.pon(hexa("#ffcf7a"), np.clip(1 - (np.abs(X - cx) / 7) ** 4 - (np.abs(Y - base) / 10) ** 4, 0, 1))
    for cx, cy in ((150, 845), (280, 850), (735, 846), (865, 842)):
        g = np.exp(-(((X - cx) ** 2 + (Y - cy) ** 2) / 900))
        M.pon(hexa("#ff7a3a"), g * 0.35)
        M.pon(hexa("#e8402a"), np.clip(1 - ((X - cx) / 7) ** 2 - ((Y - cy) / 9) ** 2, 0, 1))
    # puente de arco de piedra al fondo del canal
    def puente(d, s):
        d.rectangle([380 * s, 852 * s, 620 * s, 870 * s], fill=255)
        d.polygon([(330 * s, 905 * s), (380 * s, 852 * s), (620 * s, 852 * s), (670 * s, 905 * s), (590 * s, 905 * s), (500 * s, 870 * s), (410 * s, 905 * s)], fill=255)
    pm = mascara(puente)
    arco = np.clip(1 - ((X - 500) / 92) ** 2 - ((Y - 905) / 48) ** 2, 0, 1) > 0
    pm = pm * (1 - arco)
    M.pon(*tinte(pm, "#2f3558", "#7b7fa6", luz=luz, cx=500, ancho=120))
    # canal: refleja las casas, el puente y las luces
    base_ref = Plano()
    base_ref.rgb = L.rgb.copy()
    base_ref.a = L.a.copy()
    base_ref.pon(M.rgb, M.a)
    M.rgb = base_ref.rgb
    M.a = np.maximum(M.a, 0)
    tmp = Plano()
    tmp.rgb = base_ref.rgb.copy()
    tmp.a = np.ones((H, W), np.float32)
    reflejo(tmp, 905, "#0c2236", f_tinte=0.4, olas=3.5, seed=7, brillo="#ffc98a")
    agua = (Y >= 905).astype(np.float32)
    M.pon(tmp.rgb, agua)
    # recortar el plano medio para que el cielo lo pinte la capa lejana
    M.a = np.where(Y >= 905, 1.0, M.a - np.where(Y < 905, base_ref.a * 0, 0))
    M.rgb = np.where((Y < 905)[..., None] & (cm + pm < 0.01)[..., None], M.rgb, M.rgb)
    keep = np.clip(cm + pm + agua + tejas * 0, 0, 1)
    # luces: halo alrededor de farolillos y ventanas se mantienen
    halos = np.zeros((H, W), np.float32)
    for cx, cy in ((150, 845), (280, 850), (735, 846), (865, 842)):
        halos = np.maximum(halos, np.exp(-(((X - cx) ** 2 + (Y - cy) ** 2) / 900)) * 0.6)
    M.a = np.clip(np.maximum(keep, halos), 0, 1)
    banda_niebla(M, 905, 22, "#6a6a96", 0.45, 56)
    M.guarda("fondo-B1-medio.webp", 80)

    C = Plano()
    # sauces llorones en primer plano (izquierda) y loto en el agua
    def sauce(d, s):
        rng = np.random.default_rng(3)
        d.line([(-30 * s, 1060 * s), (60 * s, 930 * s), (250 * s, 870 * s)], fill=255, width=int(16 * s), joint="curve")
        for _ in range(120):
            t = rng.uniform(0, 1)
            x0 = -20 + t * 270
            y0 = 1040 - t * 170 + rng.uniform(-10, 10)
            L_ = rng.uniform(90, 300) * (1.1 - t * 0.4)
            pts = [((x0 + np.sin(k * 0.6 + t * 9) * 3 + k * 0.8) * s, (y0 + k * L_ / 12) * s) for k in range(13)]
            d.line(pts, fill=255, width=max(1, int(2 * s)))
            for k in range(2, 12, 2):  # hojitas
                xx, yy = pts[k][0] / s, pts[k][1] / s
                d.ellipse([(xx - 2.5) * s, (yy - 5) * s, (xx + 2.5) * s, (yy + 5) * s], fill=255)
    sm = mascara(sauce)
    sc = mezcla(np.broadcast_to(hexa("#0f2a2a"), (H, W, 3)), hexa("#5f8a6a"), suave(0, 1, (X - 60) / 200) * 0.6)
    C.pon(sc, sm)
    def loto(d, s):
        for cx, cy, r in ((760, 1250, 42), (860, 1290, 56), (680, 1320, 34), (940, 1200, 30)):
            d.ellipse([(cx - r) * s, (cy - r * 0.3) * s, (cx + r) * s, (cy + r * 0.3) * s], fill=255)
    lm = mascara(loto)
    C.pon(mezcla(np.broadcast_to(hexa("#1f4a3a"), (H, W, 3)), hexa("#6f9a6a"), suave(1180, 1330, Y) * 0) , lm)
    for cx, cy in ((800, 1236), (900, 1270)):
        C.pon(hexa("#f4a6c0"), np.clip(1 - ((X - cx) / 9) ** 2 - ((Y - cy) / 12) ** 2, 0, 1))
    banda_niebla(C, 1180, 60, "#3a4a7a", 0.4, 59)
    C.guarda("fondo-B1-cerca.webp", 80)


def B2():
    """Mañana en el karst de Guilin y el Tíbet: sol a la izquierda, perspectiva aérea fuerte, bruma entre picos, río Li."""
    luz = -1
    sol = (260, 300, 32)
    L = Plano(cielo([(0, "#88aec0"), (0.3, "#c3d8d6"), (0.5, "#eef0e2"), (1, "#e6eee2")], sol=(*sol, "#fff3cf", 0.8), halo=(260, 360, 520, 300, "#fff0c8", 0.35)))
    nubes(L, 150, 360, 0.4, "#ffffff", "#a8bfc4", sol[0], 24, escala=(4, 1), op=0.75)
    cordillera(L, [(120, 430, 200), (380, 380, 230), (640, 410, 220), (900, 370, 240)], 640, luz=luz, lit="#c9b9a6", sombra="#6f84a0", rugosidad=22,
               seed=26, nieve=("#ffffff", "#b8c8dc", 0.38), aire="#d4e0e2", aire_f=0.4, niebla=("#eef2ea", 160, 0.85), filo=0.6)
    # Potala en su colina
    pot = mascara(lambda d, s: (d.polygon([(540 * s, 640 * s), (580 * s, 575 * s), (790 * s, 575 * s), (830 * s, 640 * s)], fill=255), d.rectangle([590 * s, 545 * s, 780 * s, 578 * s], fill=255), d.rectangle([640 * s, 518 * s, 730 * s, 548 * s], fill=255), d.rectangle([668 * s, 506 * s, 702 * s, 520 * s], fill=255)))
    pc = np.broadcast_to(hexa("#ecebe4"), (H, W, 3)).copy()
    pc = mezcla(pc, hexa("#9a3a3a"), ((Y < 548) & (Y > 517) & (np.abs(X - 685) < 46)) * 1.0)
    pc = mezcla(pc, hexa("#d9a640"), ((Y < 521) & (Y > 505)) * 1.0)
    pc = mezcla(pc, hexa("#5a4a3a"), ((np.sin(X * 0.9) > 0.6) & (((Y - 552) % 13) < 4) & (Y > 548) & (Y < 600)) * 0.6)
    pc = mezcla(pc, hexa("#9fa894"), (Y > 600) * 1.0)
    pc = mezcla(pc, hexa("#b9c3c4"), suave(-20, 40, X - 700) * 0.4)
    pc = mezcla(pc, hexa("#d7e1de"), 0.4)
    L.pon(pc, pot)
    banda_niebla(L, 610, 60, "#f2f4ee", 0.85, 61)
    picos = [(60, 560, 70), (190, 590, 60), (330, 540, 75), (470, 600, 55), (590, 560, 70), (760, 545, 72), (900, 580, 62)]
    cordillera(L, picos, 720, luz=luz, lit="#cfe0d8", sombra="#8faaa6", forma="karst", rugosidad=9, seed=27, aire="#dfe8e2", aire_f=0.5,
               niebla=("#f2f5ee", 110, 0.95), torrentes=0.25)
    banda_niebla(L, 700, 50, "#f4f6f0", 0.9, 62)
    L.guarda("fondo-B2-lejos.webp", 78)

    M = Plano()
    picos = [(20, 640, 95), (170, 690, 80), (300, 620, 90), (520, 700, 70), (700, 630, 95), (860, 670, 85), (990, 610, 95)]
    cordillera(M, picos, 860, luz=luz, lit="#9cc4a6", sombra="#3f6a5e", pie="#cfe0d6", forma="karst", rugosidad=12, seed=28, aire="#cfe0d6", aire_f=0.15,
               niebla=("#eef3ec", 150, 0.9), torrentes=0.7, filo=0.5, textura=0.2)
    banda_niebla(M, 830, 60, "#f3f6f0", 0.9, 63)
    # pagoda en lo alto de un pico
    pm = mascara(lambda d, s: pagoda(d, s, 300, 626, 3, 30, 14))
    M.pon(*tinte(pm, "#5a4a42", "#e8dcc4", luz=luz, cx=300, ancho=6, aire="#cfe0d6", aire_f=0.2))
    # río Li que refleja los picos
    base = Plano()
    base.rgb = L.rgb.copy()
    base.a = L.a.copy()
    base.pon(M.rgb, M.a)
    tmp = Plano()
    tmp.rgb = base.rgb
    tmp.a = np.ones((H, W), np.float32)
    reflejo(tmp, 880, "#8fbfb4", f_tinte=0.35, olas=2.5, seed=9, brillo="#ffffff")
    M.pon(tmp.rgb, (Y >= 880).astype(np.float32))
    banda_niebla(M, 882, 24, "#f5f8f2", 0.7, 64)
    # balsa de bambú con pescador
    bal = mascara(lambda d, s: (d.rectangle([600 * s, 930 * s, 690 * s, 936 * s], fill=255), d.polygon([(632 * s, 930 * s), (642 * s, 906 * s), (652 * s, 930 * s)], fill=255), d.polygon([(628 * s, 908 * s), (656 * s, 908 * s), (642 * s, 898 * s)], fill=255), d.line([(645 * s, 915 * s), (700 * s, 880 * s)], fill=255, width=int(2 * s))))
    M.pon(hexa("#2a3a34"), bal)
    M.pon(hexa("#ffffff"), suave(3, 0, np.abs(Y - 938)) * (np.abs(X - 645) < 70) * 0.5)
    M.guarda("fondo-B2-medio.webp", 80)

    C = Plano()
    # bosquecillos de bambú en primer plano a ambos lados (enmarcan sin tapar el camino)
    def bambu(lado, seed):
        rng = np.random.default_rng(seed)
        tallos = Image.new("L", (W * 2, H * 2), 0)
        hojas = Image.new("L", (W * 2, H * 2), 0)
        dt, dh = ImageDraw.Draw(tallos), ImageDraw.Draw(hojas)
        for _ in range(9):
            x0 = rng.uniform(0, 170) if lado < 0 else rng.uniform(830, 1000)
            curv = rng.uniform(-40, 40)
            top = rng.uniform(760, 980)
            g = rng.uniform(5, 9)
            pts = [((x0 + curv * ((1400 - y) / 700) ** 2) * 2, y * 2) for y in np.linspace(1400, top, 20)]
            dt.line(pts, fill=255, width=int(g * 2))
            for k in range(2, 19, 3):  # nudos
                xx, yy = pts[k]
                dt.line([(xx - g * 1.3, yy), (xx + g * 1.3, yy)], fill=0, width=2)
            for k in range(6, 20, 2):  # ramilletes de hojas
                xx, yy = pts[k]
                for _h in range(4):
                    a = rng.uniform(-2.6, -0.5) if rng.random() > 0.5 else rng.uniform(-2.6, -0.5) + np.pi * 0.9
                    Lh = rng.uniform(24, 46) * 2
                    ex, ey = xx + np.cos(a) * Lh, yy + np.sin(a) * Lh * 0.5 + Lh * 0.25
                    nx_, ny_ = -(ey - yy) * 0.12, (ex - xx) * 0.12
                    dh.polygon([(xx, yy), ((xx + ex) / 2 + nx_, (yy + ey) / 2 + ny_), (ex, ey), ((xx + ex) / 2 - nx_, (yy + ey) / 2 - ny_)], fill=255)
        t = np.asarray(tallos.resize((W, H), Image.LANCZOS), np.float32) / 255
        h = np.asarray(hojas.resize((W, H), Image.LANCZOS), np.float32) / 255
        return t, h
    for lado, sd in ((-1, 5), (1, 8)):
        t, h = bambu(lado, sd)
        luzh = suave(0.3, 0.8, ruido2(H, W, 1.5, sd + 40))
        C.pon(mezcla(np.broadcast_to(hexa("#2f5a3a"), (H, W, 3)), hexa("#9cc47a"), suave(-1, 1, (X - (90 if lado < 0 else 910)) * 0.05 * (-luz)) * 0.7), t)
        C.pon(mezcla(np.broadcast_to(hexa("#244a30"), (H, W, 3)), hexa("#8fbf6a"), luzh * 0.75), h)
    banda_niebla(C, 1330, 90, "#eef3ec", 0.6, 66)
    C.guarda("fondo-B2-cerca.webp", 80)


if __name__ == "__main__":
    pedidos = [a for a in sys.argv[1:] if a != "tiras"] or (["A1", "A2", "B1", "B2"] if "tiras" not in sys.argv else [])
    for nv in pedidos:
        print(nv)
        globals()[nv]()


def tiras_niebla():
    """Tiras de niebla que se repiten en horizontal (1024 x 256) para la deriva animada: blanca, arena y noche."""
    w, h = 1024, 256
    yy = np.mgrid[0:h, 0:w][0].astype(np.float32)
    for nombre, col, f, sd in (("blanca", "#f7f8f6", 0.95, 1), ("arena", "#ffd9a6", 0.85, 2), ("noche", "#8a86b8", 0.7, 3)):
        n = ruido2(h, w, 2.6, 300 + sd, aniso=(3.0, 1.0))
        n2 = ruido2(h, w, 1.6, 400 + sd, aniso=(2.0, 1.0))
        perfil = np.exp(-(((yy - h * 0.55) / (h * 0.26)) ** 2))
        a = np.clip((n * 0.8 + n2 * 0.35 - 0.38) * 1.7, 0, 1) * perfil * f
        rgb = np.broadcast_to(hexa(col), (h, w, 3)) * (0.92 + 0.08 * n[..., None])
        img = Image.fromarray(np.clip(np.dstack([rgb, a]) * 255, 0, 255).astype(np.uint8), "RGBA")
        img.save(OUT + f"niebla-{nombre}.webp", quality=78, method=6, alpha_quality=60)
        print("  ", f"niebla-{nombre}.webp")


if __name__ == "__main__" and "tiras" in sys.argv:
    tiras_niebla()
