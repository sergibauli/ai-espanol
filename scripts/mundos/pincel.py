"""Pincel de los mundos de la Ruta (v28): utilidades para pintar ilustraciones por capas con numpy + PIL.

Todo es procedural y propio (sin recursos ajenos) y determinista (semillas fijas). Se pinta en coma flotante:
cada objeto (montaña, pabellón, pino, barca…) se compone en una capa RGBA con operador «over», con luz clave por
nivel: cara iluminada / cara en sombra, luz de borde (rim light), oclusión ambiental, perspectiva aérea y grano.

Marco de pintura: W × H = 1100 × 1540. En pantalla se ve el rectángulo x 50…1050, y 0…1400 (el lienzo 1000 × 1400 de
MundoRuta); lo que sobra a los lados y abajo es margen para el parallax (el plano se desplaza sin enseñar bordes).
"""
import importlib.util
import json
import os

import numpy as np
from PIL import Image, ImageDraw

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, "..", ".."))
_spec = importlib.util.spec_from_file_location("fr", os.path.join(AQUI, "..", "fondos-ruta.py"))
fr = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(fr)
ruido2, ruido1, desenfoca, suave, hexa, mezcla = fr.ruido2, fr.ruido1, fr.desenfoca, fr.suave, fr.hexa, fr.mezcla

W, H = 1100, 1540
MX = 50  # margen lateral (el lienzo visible empieza en x = 50)
F32 = np.float32


def col(c):
    if isinstance(c, str):
        return hexa(c)
    return np.asarray(c, F32)


# ------------------------------------------------------------------ lienzos y capas
class Lienzo:
    def __init__(self, w, h):
        self.w, self.h = int(w), int(h)
        self.Y, self.X = np.mgrid[0 : self.h, 0 : self.w].astype(F32)

    def ruido(self, beta=2.0, seed=0, aniso=(1.0, 1.0)):
        return ruido2(self.h, self.w, beta, seed, aniso)

    def mascara(self, dibujar, aa=3, ox=0, oy=0):
        img = Image.new("L", (self.w * aa, self.h * aa), 0)
        dibujar(Pluma(ImageDraw.Draw(img), aa, ox, oy))
        return np.asarray(img.resize((self.w, self.h), Image.BOX), F32) / 255

    def capa(self, fondo=None):
        return Capa(self, fondo)


class Pluma:
    """Dibuja en la máscara supermuestreada con coordenadas del lienzo (y desplazamiento ox, oy)."""

    def __init__(self, d, aa, ox=0, oy=0):
        self.d, self.aa, self.ox, self.oy = d, aa, ox, oy

    def _p(self, pts):
        a = self.aa
        return [((x - self.ox) * a, (y - self.oy) * a) for x, y in pts]

    def poly(self, pts, v=255):
        if len(pts) > 2:
            self.d.polygon(self._p(pts), fill=v)

    def rect(self, x0, y0, x1, y1, v=255):
        self.d.rectangle(self._p([(min(x0, x1), min(y0, y1)), (max(x0, x1), max(y0, y1))]), fill=v)

    def elip(self, cx, cy, rx, ry, v=255):
        self.d.ellipse(self._p([(cx - rx, cy - ry), (cx + rx, cy + ry)]), fill=v)

    def linea(self, pts, ancho, v=255):
        self.d.line(self._p(pts), fill=v, width=max(1, int(round(ancho * self.aa))), joint="curve")
        # remates redondos
        r = ancho / 2
        for x, y in (pts[0], pts[-1]):
            self.elip(x, y, r * 0.98, r * 0.98, v)

    def trazo(self, pts, a0, a1, v=255):
        """Trazo de pincel de ancho variable (a0 → a1) a lo largo de una polilínea."""
        pts = np.asarray(pts, F32)
        n = len(pts)
        if n < 2:
            return
        d = np.gradient(pts, axis=0)
        nrm = np.stack([-d[:, 1], d[:, 0]], 1)
        nrm /= np.linalg.norm(nrm, axis=1, keepdims=True) + 1e-6
        t = np.linspace(0, 1, n)[:, None]
        r = (a0 + (a1 - a0) * t) / 2
        izq = pts + nrm * r
        der = pts - nrm * r
        self.poly([tuple(p) for p in np.concatenate([izq, der[::-1]])], v)


def bz(p0, p1, p2, p3, n=24):
    t = np.linspace(0, 1, n)[:, None]
    p0, p1, p2, p3 = (np.asarray(p, F32) for p in (p0, p1, p2, p3))
    return [tuple(q) for q in ((1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t * t * p2 + t ** 3 * p3)]


def spline(pts, n=12, cerrada=False):
    """Catmull-Rom por los puntos dados → polilínea suave."""
    p = [np.asarray(q, F32) for q in pts]
    if cerrada:
        p = [p[-1]] + p + [p[0], p[1]]
    else:
        p = [p[0]] + p + [p[-1]]
    out = []
    for i in range(1, len(p) - 2):
        a, b, c, d = p[i - 1], p[i], p[i + 1], p[i + 2]
        for t in np.linspace(0, 1, n, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3)))
    out.append(tuple(p[-2]))
    return out


class Capa:
    """Capa RGBA en coma flotante con operador «over». Admite parches (pon en una región x0, y0)."""

    def __init__(self, L, fondo=None):
        self.L = L
        self.rgb = np.zeros((L.h, L.w, 3), F32)
        self.a = np.zeros((L.h, L.w), F32)
        if fondo is not None:
            self.rgb[:] = col(fondo) if not isinstance(fondo, np.ndarray) or fondo.ndim == 1 else fondo
            self.a[:] = 1

    def pon(self, c, a, x0=0, y0=0):
        a = np.clip(np.asarray(a, F32), 0, 1)
        h, w = a.shape
        x0, y0 = int(x0), int(y0)
        # recorte a los límites
        sx0, sy0 = max(0, -x0), max(0, -y0)
        dx0, dy0 = max(0, x0), max(0, y0)
        ww = min(w - sx0, self.L.w - dx0)
        hh = min(h - sy0, self.L.h - dy0)
        if ww <= 0 or hh <= 0:
            return
        a = a[sy0 : sy0 + hh, sx0 : sx0 + ww]
        c = col(c) if isinstance(c, str) or np.ndim(c) == 1 else np.asarray(c, F32)[sy0 : sy0 + hh, sx0 : sx0 + ww]
        R = self.rgb[dy0 : dy0 + hh, dx0 : dx0 + ww]
        A = self.a[dy0 : dy0 + hh, dx0 : dx0 + ww]
        na = a + A * (1 - a)
        num = c * a[..., None] + R * (A * (1 - a))[..., None]
        self.rgb[dy0 : dy0 + hh, dx0 : dx0 + ww] = np.where(na[..., None] > 1e-5, num / np.maximum(na, 1e-5)[..., None], R)
        self.a[dy0 : dy0 + hh, dx0 : dx0 + ww] = na

    def pega(self, otra, x0=0, y0=0, op=1.0):
        self.pon(otra.rgb, otra.a * op, x0, y0)

    def tiñe(self, c, f, m=None):
        """Mezcla el color de lo pintado hacia c (perspectiva aérea, tono) sin tocar el alfa."""
        f = np.asarray(f, F32)
        if m is not None:
            f = f * m
        self.rgb = mezcla(self.rgb, col(c), f)

    def guarda(self, ruta, q=82, recorte=True, grano=0.02, alpha_q=80):
        rgb = self.rgb
        if grano:
            g = ruido2(self.L.h, self.L.w, 0.3, 991) - 0.5
            rgb = rgb + g[..., None] * grano
        arr = np.dstack([np.clip(rgb, 0, 1), np.clip(self.a, 0, 1)]) * 255
        arr = np.clip(arr + 0.5, 0, 255).astype(np.uint8)
        caja = (0, 0, self.L.w, self.L.h)
        if recorte and self.a.min() < 0.999:
            ys = np.where(self.a.max(1) > 0.004)[0]
            xs = np.where(self.a.max(0) > 0.004)[0]
            if len(ys):
                y0, y1 = max(0, ys[0] - 2), min(self.L.h, ys[-1] + 3)
                x0, x1 = max(0, xs[0] - 2), min(self.L.w, xs[-1] + 3)
                caja = (int(x0), int(y0), int(x1), int(y1))
                arr = arr[y0:y1, x0:x1]
        img = Image.fromarray(arr, "RGBA")
        if self.a.min() > 0.999:
            img = img.convert("RGB")
        os.makedirs(os.path.dirname(ruta), exist_ok=True)
        img.save(ruta, quality=q, method=6, alpha_quality=alpha_q)
        print(f"   {os.path.relpath(ruta, RAIZ)}  {os.path.getsize(ruta) // 1024} KB  caja={caja}")
        return caja


# ------------------------------------------------------------------ campos auxiliares
def desplaza(a, dx, dy):
    """Desplaza un campo (dx, dy) píxeles rellenando con ceros (sin dar la vuelta como np.roll)."""
    dx, dy = int(round(dx)), int(round(dy))
    out = np.zeros_like(a)
    h, w = a.shape[:2]
    ys = slice(max(0, dy), min(h, h + dy))
    yd = slice(max(0, -dy), min(h, h - dy))
    xs = slice(max(0, dx), min(w, w + dx))
    xd = slice(max(0, -dx), min(w, w - dx))
    out[ys, xs] = a[yd, xd]
    return out


def borde(m, dx, dy, r=0.0):
    """Borde de la máscara que mira hacia (dx, dy): luz de borde si (dx, dy) apunta a la luz."""
    b = np.clip(m - desplaza(m, -dx, -dy), 0, 1)
    return desenfoca(b, r) * m if r else b


def volumen(m, r, lx, ly, k=1.0, base=0.5):
    """Relieve a partir de la máscara desenfocada: 0…1 con la luz en (lx, ly) (pantalla, y hacia abajo)."""
    h = desenfoca(m, r)
    gy, gx = np.gradient(h)
    s = r * 1.2
    return np.clip(base - (gx * lx + gy * ly) * s * k * 2.2, 0, 1)


def oclusion(m, r, f=1.0):
    """Oscurece el interior de la máscara cerca de sus bordes (oclusión ambiental aproximada)."""
    return np.clip((1 - desenfoca(m, r)) * m * f * 2, 0, 1)


def ridged(L, seed, aniso=(1.0, 1.0), beta=2.2):
    n = L.ruido(beta, seed, aniso) * 2 - 1
    return 1 - np.abs(n)


def gradv(L, stops):
    """Degradado vertical [(t, color)] en todo el lienzo (t = y / alto)."""
    t = L.Y / L.h
    c = np.zeros((L.h, L.w, 3), F32)
    for k in range(3):
        c[..., k] = np.interp(t, [s[0] for s in stops], [col(s[1])[k] for s in stops])
    return c


def brillo_radial(L, cx, cy, r, c, f, p=1.4, ry=None):
    ry = ry or r
    d = np.sqrt(((L.X - cx) / r) ** 2 + ((L.Y - cy) / ry) ** 2)
    return np.exp(-(d ** p)) * f


# ------------------------------------------------------------------ cielo y nubes
def cielo(L, stops, sol=None, halo=None, disco="#fffdf2"):
    c = gradv(L, stops)
    if sol:
        sx, sy, r, cs, fuerza = sol
        d = np.sqrt((L.X - sx) ** 2 + (L.Y - sy) ** 2)
        c = mezcla(c, col(cs), np.clip(fuerza * np.exp(-((d / (r * 6)) ** 1.1)), 0, 1))
        c = mezcla(c, col(cs), np.clip(fuerza * 0.5 * np.exp(-((d / (r * 18)) ** 1.3)), 0, 1))
        c = mezcla(c, col(disco), suave(r * 1.1, r * 0.92, d))
    if halo:
        hx, hy, rx, ry, ch, f = halo
        d = np.sqrt(((L.X - hx) / rx) ** 2 + ((L.Y - hy) / ry) ** 2)
        c = mezcla(c, col(ch), f * np.exp(-d * d))
    return c


def nube(C, cx, cy, w, h, seed, sol, luz_c, sombra_c, borde_c, base_c=None, op=1.0, plana=True, bultos=11, rim=1.0, dens=1.0):
    """Cúmulo volumétrico: densidad = suma de bultos suaves (en dos tamaños) + borde fractal; luz por
    autosombreado (se mira cuánta nube hay hacia el sol), base en sombra, borde de plata hacia el sol."""
    rng = np.random.default_rng(seed)
    pad = int(max(w, h) * 0.25)
    x0, y0 = int(cx - w / 2 - pad), int(cy - h * 1.25 - pad)
    Lz = Lienzo(int(w + pad * 2), int(h * 1.5 + pad * 2))
    X, Y = Lz.X + x0, Lz.Y + y0
    D = np.zeros((Lz.h, Lz.w), F32)
    for i in range(bultos):
        t = (i + 0.5) / bultos
        alto = h * (0.3 + 0.7 * np.sin(np.pi * t) ** 0.7) * rng.uniform(0.7, 1.1)
        r = max(5, alto * rng.uniform(0.5, 0.75))
        bx = cx - w / 2 + t * w + rng.uniform(-w * 0.05, w * 0.05)
        by = cy - alto + r * 0.9
        D = np.maximum(D, np.clip(1 - ((X - bx) ** 2 + ((Y - by) * 1.1) ** 2) / r ** 2, 0, 1) ** 0.6)
        for _ in range(2):  # bultitos encima
            a = rng.uniform(-2.6, -0.5)
            rr = r * rng.uniform(0.35, 0.55)
            sx_, sy_ = bx + np.cos(a) * r * 0.75, by + np.sin(a) * r * 0.75
            D = np.maximum(D, np.clip(1 - ((X - sx_) ** 2 + (Y - sy_) ** 2) / rr ** 2, 0, 1) ** 0.6)
    if plana:
        D = D * suave(cy + h * 0.08, cy - h * 0.1, Y)
    n = Lz.ruido(1.5, seed + 3)
    n2 = Lz.ruido(1.0, seed + 4)
    D = np.clip(D * 1.25 + (n - 0.5) * 0.55 + (n2 - 0.5) * 0.25 - 0.18, 0, 1)
    D = desenfoca(D, 1.2)
    a = suave(0.02, 0.35, D) * op
    ux, uy = sol[0] - cx, sol[1] - (cy - h * 0.5)
    nn = np.hypot(ux, uy) + 1e-6
    ux, uy = ux / nn, uy / nn
    occ = 0.0
    for paso, k in ((0.05, 0.45), (0.12, 0.35), (0.25, 0.3)):
        dd = paso * max(w, h)
        occ = occ + desplaza(D, -ux * dd, -uy * dd) * k
    lit = np.clip(1.05 - occ * 1.15, 0, 1)
    lit = np.clip(lit + suave(0.5, 0.0, D) * 0.25, 0, 1)
    c = mezcla(np.broadcast_to(col(sombra_c), D.shape + (3,)), col(luz_c), lit[..., None])
    if base_c:
        c = mezcla(c, col(base_c), (suave(cy - h * 0.55, cy + h * 0.05, Y) * (1 - lit) * 0.6)[..., None])
    ed = np.clip(a - desplaza(a, -ux * 3, -uy * 3), 0, 1) * 0.8 + suave(0.25, 0.05, D) * a * np.clip(lit * 1.4 - 0.6, 0, 1) * 0.6
    c = mezcla(c, col(borde_c), np.clip(ed * 1.0 * rim, 0, 1)[..., None])
    C.pon(c, a, x0, y0)


def cirros(C, y0, y1, c, f, seed, aniso=(9.0, 1.0)):
    L = C.L
    n = desenfoca(L.ruido(2.6, seed, aniso), 2)
    n = (n - n.min()) / (np.ptp(n) + 1e-6)
    C.pon(c, np.clip(suave(0.6, 0.9, n) * suave(y0 - 60, y0 + 40, L.Y) * suave(y1 + 60, y1 - 40, L.Y) * f, 0, 1))


def niebla(C, y, alto, c, f, seed, aniso=(5.0, 1.0), x0=None, x1=None):
    L = C.L
    n = L.ruido(2.4, seed, aniso)
    perfil = np.exp(-(((L.Y - y) / alto) ** 2))
    m = perfil * (0.4 + 0.8 * n) * f
    if x0 is not None:
        m = m * suave(x0 - 80, x0 + 40, L.X) * suave(x1 + 80, x1 - 40, L.X)
    C.pon(c, np.clip(m, 0, 1))


# ------------------------------------------------------------------ montañas
def perfil_picos(L, picos, forma="pico", rug=10, seed=1, base=None):
    """Silueta (y de la cresta por columna) de una serie de picos [(cx, cima, semiancho)]."""
    x = np.arange(L.w, dtype=F32)
    total = np.full(L.w, 1e9, F32)
    for j, (cx, top, hw) in enumerate(picos):
        asim = 0.75 + 0.5 * ((j * 0.618 + seed * 0.13) % 1)
        d = np.where(x < cx, np.abs(x - cx) / (hw * asim), np.abs(x - cx) / (hw / asim))
        if forma == "karst":
            dd = np.clip(d, 0, 1.0)
            ex = 1.6 + 1.6 * ((j * 0.731 + seed * 0.37) % 1)  # cúpula, pan de azúcar o torre de paredes rectas
            pr = top + (base - top) * (1 - np.sqrt(np.clip(1 - dd ** ex, 0, 1))) ** (0.55 + 0.35 * ((j * 0.291) % 1))
            # muesca o repisa en una ladera
            pr = pr + np.exp(-((x - cx - hw * 0.45 * (1 if j % 2 else -1)) / (hw * 0.12)) ** 2) * (base - top) * 0.06
            pr = np.where(d >= 1, 1e9, pr)
            pr = pr + ruido1(L.w, 1.7, seed + j * 3) * rug * (0.3 + dd)
        elif forma == "duna":
            pr = top + d ** 1.5 * (base - top) * 0.6
            pr = pr + ruido1(L.w, 2.6, seed + j) * rug
        elif forma == "loma":
            pr = top + (base - top) * (d ** 2) / (0.3 + d ** 2) * 1.3 + ruido1(L.w, 2.4, seed + j) * rug
        else:
            pr = top + (base - top) * d ** (0.75 + 0.5 * ((j * 0.37 + seed * 0.11) % 1))
            # hombro: un pico secundario en una ladera
            lado_h = 1 if (j + seed) % 2 else -1
            pr = np.minimum(pr, top + (base - top) * 0.28 + (base - top) * (np.abs(x - cx - lado_h * hw * 0.55) / (hw * 0.4)) ** 0.9 * 0.7)
            det = ruido1(L.w, 1.9, seed + j * 13) * rug + ruido1(L.w, 1.3, seed + j * 7) * rug * 0.25
            pr = pr + det * np.clip(1 - d * 0.4, 0.3, 1)
        total = np.minimum(total, pr)
    return total


def sierra(C, perfil, base, *, luz=1, lit="#ffffff", sombra="#556688", nieve=None, aire=None, aire_f=0.0, pie=None, niebla_pie=None,
           filo=0.0, filo_c="#fff6e0", seed=1, estrias=1.0, textura=0.1, karst=False, roca=None):
    """Rellena bajo la silueta con relieve: caras según la pendiente de la cresta + crestas y torrenteras (ruido
    «ridged» vertical) iluminadas por la luz clave, nieve en lo plano y alto, luz de borde en el filo y aire."""
    L = C.L
    X, Y = L.X, L.Y
    pf = np.asarray(perfil, F32)
    alfa = np.clip(Y - pf[None, :] + 0.5, 0, 1) * (Y < base + 40)
    if pie is None:
        alfa = alfa * suave(base + 40, base - 10, Y)
    prof = np.clip((Y - pf[None, :]) / 260.0, 0, 3)
    # orientación de la cara: pendiente de la cresta a varias escalas (cara que baja hacia la luz → iluminada)
    pend = np.zeros(L.w, F32)
    for r, k in ((6, 0.4), (18, 0.35), (45, 0.25)):
        ps = desenfoca(np.tile(pf[None, :], (3, 1)), r)[1]
        pend += np.tanh(np.gradient(ps) * 2.2) * k
    orient = np.broadcast_to(pend[None, :], (L.h, L.w))
    # relieve fino: crestas y barrancos que bajan (anisotropía vertical), más marcados lejos del filo
    rg = ridged(L, seed + 3, aniso=(1.0, 3.5 if not karst else 2.0))
    rg2 = ridged(L, seed + 9, aniso=(1.0, 1.6), beta=1.8)
    # las torrenteras bajan en diagonal por cada ladera (siguiendo la caída de la cresta), no a plomo
    cizalla = 0.0 if karst else 0.85
    xi = np.mod((X - orient * cizalla * np.clip(Y - pf[None, :], 0, None)).astype(np.int64), L.w)
    yi = Y.astype(np.int64)
    relieve = desenfoca(rg[yi, xi] * 0.7 + rg2[yi, xi] * 0.3, 1.5)
    gy, gx = np.gradient(relieve)
    det = np.clip(-gx * luz * 26 - gy * 8, -1, 1)
    w_or = np.exp(-prof * 1.4)  # cerca del filo manda la orientación de la cresta, abajo el relieve
    ilum = np.clip(0.5 + 0.55 * (orient * luz * w_or * 1.3) + 0.45 * det * estrias * (0.5 + 0.5 * (1 - w_or)), 0, 1)
    ilum = suave(0.18, 0.82, ilum)
    c = mezcla(np.broadcast_to(col(sombra), (L.h, L.w, 3)), col(lit), ilum)
    tex = L.ruido(1.3, seed + 5) - 0.5
    c = c * (1 + tex[..., None] * textura)
    if roca is not None:  # vetas de roca (karst): bandas horizontales irregulares
        vet = L.ruido(1.8, seed + 21, aniso=(0.25, 3.0))
        c = mezcla(c, col(roca), suave(0.62, 0.8, vet) * 0.35)
    if nieve:
        n_lit, n_sombra, lim = nieve
        ln = L.ruido(2.0, seed + 11, aniso=(1.0, 4.0))
        # nieve en las crestas del relieve (vetas que bajan); cerca de la cima casi todo, abajo solo en lo alto
        umbral = 0.95 - lim * 0.55 * np.exp(-prof / max(lim, 0.05) * 1.2) - 0.18 * ln
        hay = suave(umbral - 0.06, umbral + 0.06, relieve * 0.8 + 0.2 * ln)
        hay = np.maximum(hay, suave(0.06, 0.0, prof) * 0.9)
        c = mezcla(c, mezcla(np.broadcast_to(col(n_sombra), (L.h, L.w, 3)), col(n_lit), ilum), np.clip(hay, 0, 1))
    if filo:
        b = suave(4.0, 0.0, Y - pf[None, :]) * suave(0.3, 0.85, ilum)
        c = mezcla(c, col(filo_c), b * filo)
    if pie:
        c = mezcla(c, col(pie), suave(base - 200, base, Y) * 0.6)
    if aire is not None:
        c = mezcla(c, col(aire), aire_f)
    if niebla_pie:
        nc, alto, f = niebla_pie
        nn = L.ruido(2.4, seed + 7, aniso=(4.0, 1.0))
        c = mezcla(c, col(nc), np.clip(suave(base - alto, base, Y) * (0.6 + 0.5 * nn) * f, 0, 1))
    C.pon(c, alfa)
    return pf


# ------------------------------------------------------------------ objetos comunes
def sombra_elipse(C, cx, cy, rx, ry, c="#1a2238", f=0.35):
    L = C.L
    d = ((L.X - cx) / rx) ** 2 + ((L.Y - cy) / ry) ** 2
    C.pon(c, np.clip(np.exp(-d * 2.2) * f, 0, 1))


def destello(C, cx, cy, r, c, f=1.0):
    L = C.L
    d2 = ((L.X - cx) ** 2 + (L.Y - cy) ** 2) / (r * r)
    C.pon(c, np.clip(np.exp(-d2) * f, 0, 1))


def guarda_png_rgba(rgb, a, ruta, q=86):
    arr = np.clip(np.dstack([np.clip(rgb, 0, 1), np.clip(a, 0, 1)]) * 255 + 0.5, 0, 255).astype(np.uint8)
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    Image.fromarray(arr, "RGBA").save(ruta, quality=q, method=6, alpha_quality=85)
    print(f"   {os.path.relpath(ruta, RAIZ)}  {os.path.getsize(ruta) // 1024} KB")


# ------------------------------------------------------------------ manifiesto (lo lee MundoRuta.jsx)
MANIFIESTO = os.path.join(RAIZ, "src", "components", "ruta", "mundos.json")


def manifiesto_guarda(nivel, datos):
    try:
        with open(MANIFIESTO) as f:
            todo = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        todo = {}
    todo[nivel] = datos
    with open(MANIFIESTO, "w") as f:
        json.dump(todo, f, ensure_ascii=False, indent=1, sort_keys=True)
        f.write("\n")


def pct(v, total):
    return round(v / total * 100, 3)


class Mundo:
    """Reúne las capas y las piezas animadas de un nivel y escribe su entrada en mundos.json."""

    def __init__(self, nivel):
        self.nivel = nivel
        self.dir = os.path.join(RAIZ, "public", "theme", "ruta", "mundo", nivel)
        self.capas = []
        self.actores = []
        self.nieblas = []

    def ruta(self, nombre):
        return os.path.join(self.dir, nombre)

    def capa(self, id_, C, z, q=86, alpha_q=80, grano=0.02):
        caja = C.guarda(self.ruta(f"{id_}.webp"), q=q, alpha_q=alpha_q, grano=grano)
        x0, y0, x1, y1 = caja
        self.capas.append({"id": id_, "src": f"{self.nivel}/{id_}.webp", "z": z, "x": pct(x0, W), "y": pct(y0, H), "w": pct(x1 - x0, W), "h": pct(y1 - y0, H)})

    def actor(self, capa, src, x, y, w, h, anim, movil=True, **p):
        """x, y: esquina superior izquierda en px del marco de pintura; w, h: tamaño en ese marco."""
        a = {"capa": capa, "src": f"{self.nivel}/{src}", "x": pct(x, W), "y": pct(y, H), "w": pct(w, W), "h": pct(h, H), "anim": anim}
        if not movil:
            a["movil"] = False
        a.update({k: (round(v, 3) if isinstance(v, float) else v) for k, v in p.items()})
        self.actores.append(a)

    def niebla(self, tras, tipo, top, alto, op, dur, inversa=False, movil=True):
        self.nieblas.append({"tras": tras, "tipo": tipo, "top": top, "alto": alto, "op": op, "dur": dur, "inv": inversa, "movil": movil})

    def guarda(self, luz, **extra):
        sx, sy = luz
        datos = {"luz": {"x": pct(sx - MX, W - 2 * MX), "y": pct(sy, H - 140)}, "capas": self.capas, "actores": self.actores, "nieblas": self.nieblas}
        datos.update(extra)
        manifiesto_guarda(self.nivel, datos)


def sombra_de(C, P, x0, y0, luz, largo=1.2, aplasta=0.3, c="#4a5a86", f=0.45, r=3, base=None):
    """Sombra que proyecta en el suelo una pieza pegada en (x0, y0) con el sol bajo DETRÁS (contraluz): se alarga hacia
    el espectador (abajo) y al lado contrario de la luz, aplastada por la perspectiva."""
    a = P.a
    h, w = a.shape
    yb = h - 1 if base is None else int(base)
    hs = int(yb * aplasta) + 2
    pad = int(hs * largo) + 4
    out = np.zeros((hs, w + pad * 2), F32)
    for rr in range(hs):
        src = yb - int(rr / aplasta)
        if src < 0:
            break
        dx = int(-luz * rr * largo)
        out[rr, pad + dx : pad + dx + w] = np.maximum(out[rr, pad + dx : pad + dx + w], a[src])
    out = desenfoca(out, r) * suave(0, hs, hs - np.arange(hs, dtype=F32))[:, None]
    C.pon(c, out * f, x0 - pad, y0 + yb)


def reflejo_capa(C, y_agua, y_fin, agua, f=0.65, olas=3.0, seed=0, mascara=None, estira=1.0, oscurece=0.75, brillo=None):
    """Agua que refleja lo pintado en la capa por encima de y_agua (invertido, con ondas y estirado en vertical).
    agua: color o campo (h, w, 3) de base del agua (lo que refleja el cielo)."""
    L = C.L
    X, Y = L.X, L.Y
    ond = L.ruido(1.2, seed, aniso=(4.0, 0.35)) - 0.5
    d = np.clip(Y - y_agua, 0, None)
    sy = np.clip(y_agua - d / estira + ond * olas * (1 + d / 120), 0, y_agua - 1).astype(np.int64)
    sx = np.clip(X + ond * olas * 2.5, 0, L.w - 1).astype(np.int64)
    rr = C.rgb[sy, sx] * oscurece
    ra = C.a[sy, sx]
    base = np.broadcast_to(col(agua), (L.h, L.w, 3)) if isinstance(agua, str) else agua
    c = mezcla(base, rr, (ra * f)[..., None])
    if brillo:
        vet = L.ruido(1.6, seed + 1, aniso=(7.0, 0.3))
        c = mezcla(c, col(brillo), (suave(0.74, 0.92, vet) * 0.3)[..., None])
    m = ((Y >= y_agua) & (Y < y_fin)).astype(F32)
    if mascara is not None:
        m = m * mascara
    C.pon(c, m)
    return m


def vdesenfoca(a, r):
    """Desenfoque solo vertical (reflejos de luces que se alargan en el agua)."""
    for _ in range(3):
        a = fr.caja(a, max(1, int(r / 1.7)), 0)
    return a
