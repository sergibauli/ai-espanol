"""Piezas animadas de los mundos (v28): cada una se pinta aparte (RGBA) para que MundoRuta la mueva con CSS
(solo transform y opacity): humo, banderas, farolillos, destellos, grullas, camellos, barcas, balsa con pescador,
cormoranes, cascada, ráfagas de arena, reflejos… Mismo pincel y misma luz que el paisaje."""
import numpy as np

from pincel import Capa, Lienzo, borde, bz, col, desenfoca, mezcla, oclusion, spline, suave, volumen, guarda_png_rgba


def humo(ruta, tam=96, c=("#c9cfda", "#ffffff"), seed=0):
    Lz = Lienzo(tam, tam)
    rng = np.random.default_rng(seed)
    m = Lz.mascara(lambda P: [P.elip(tam / 2 + rng.uniform(-tam * 0.16, tam * 0.16), tam / 2 + rng.uniform(-tam * 0.12, tam * 0.12), r, r * 0.85)
                              for r in rng.uniform(tam * 0.12, tam * 0.24, 7)])
    m = desenfoca(m, tam * 0.08)
    n = Lz.ruido(1.8, seed + 3)
    m = np.clip(m * (0.6 + 0.6 * n) * 1.2, 0, 1) * 0.85
    v = volumen(m, tam * 0.1, -0.6, 0.7, 1.0)
    rgb = mezcla(np.broadcast_to(col(c[0]), m.shape + (3,)), col(c[1]), v[..., None])
    guarda_png_rgba(rgb, m, ruta)


def bandera(ruta, w=56, h=34, tela=("#8f0c21", "#e0283f"), ribete="#f2c14e", luz=1, emblema=True):
    """Estandarte de cola de golondrina (el asta se pinta en el paisaje; aquí solo la tela, sujeta por la izquierda)."""
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    X, Y = Lz.X, Lz.Y
    ond = np.sin(X / w * np.pi * 2.2) * h * 0.06
    contorno = [(0, 1), (w * 0.98, h * 0.12), (w * 0.8, h * 0.5), (w * 0.98, h * 0.88), (0, h - 1)]
    m = Lz.mascara(lambda P: P.poly(contorno))
    m = np.clip(m, 0, 1)
    pl = np.clip(0.5 + np.cos(X / w * np.pi * 2.2) * 0.45 * luz, 0, 1)  # pliegues iluminados
    c = mezcla(np.broadcast_to(col(tela[0]), m.shape + (3,)), col(tela[1]), pl[..., None])
    rib = np.clip(m - desenfoca(m, 1.2) * 0 - np.clip(np.roll(m, 3, 0) * np.roll(m, -3, 0) * np.roll(m, 3, 1) * np.roll(m, -3, 1), 0, 1), 0, 1)
    c = mezcla(c, col(ribete), rib * 0.9)
    if emblema:
        e = Lz.mascara(lambda P: P.elip(w * 0.36, h * 0.5 + ond.mean() * 0, h * 0.2, h * 0.2))
        c = mezcla(c, mezcla(np.broadcast_to(col("#b07a1e"), m.shape + (3,)), col("#ffe08a"), pl[..., None]), e * 0.95)
    C.pon(c, m)
    guarda_png_rgba(C.rgb, C.a, ruta)


def farol(ruta, w=34, h=52, rojo=("#6e0817", "#e0283f", "#ffd27a"), cuerda=True):
    """Farolillo rojo encendido: costillas, tapas doradas, borla y halo (el halo va en el mismo sprite)."""
    pad = int(w * 0.9)
    Lz = Lienzo(w + pad * 2, h + pad * 2)
    C = Capa(Lz)
    X, Y = Lz.X, Lz.Y
    cx, cy = Lz.w / 2, pad + h * 0.48
    halo = np.exp(-(((X - cx) / (w * 0.95)) ** 2 + ((Y - cy) / (w * 0.95)) ** 2))
    C.pon("#ff8a3a", halo * 0.5)
    rx, ry = w * 0.46, h * 0.32
    cuerpo = Lz.mascara(lambda P: P.elip(cx, cy, rx, ry))
    u = np.clip((X - cx) / rx, -1, 1)
    v = np.clip((Y - cy) / ry, -1, 1)
    brillo = np.clip(1 - (u ** 2 + v ** 2) * 0.8, 0, 1)
    c = mezcla(np.broadcast_to(col(rojo[0]), cuerpo.shape + (3,)), col(rojo[1]), np.clip(brillo * 1.2, 0, 1)[..., None])
    c = mezcla(c, col(rojo[2]), (brillo ** 3)[..., None] * 0.75)
    cost = (np.cos(np.arcsin(np.clip(u, -0.999, 0.999)) * 0 + np.arcsin(np.clip(u, -0.999, 0.999)) * 7) > 0.85) * 1.0
    c = mezcla(c, col(rojo[0]), cost * 0.45)
    C.pon(c, cuerpo)
    tapas = Lz.mascara(lambda P: (P.rect(cx - rx * 0.45, cy - ry - h * 0.07, cx + rx * 0.45, cy - ry + h * 0.03), P.rect(cx - rx * 0.45, cy + ry - h * 0.03, cx + rx * 0.45, cy + ry + h * 0.07)))
    C.pon(mezcla(np.broadcast_to(col("#7a4a10"), cuerpo.shape + (3,)), col("#ffd66a"), suave(-rx * 0.4, rx * 0.4, X - cx)[..., None]), tapas)
    bor = Lz.mascara(lambda P: [P.linea([(cx + dx, cy + ry + h * 0.07), (cx + dx * 1.3, cy + ry + h * 0.32)], 1.1) for dx in (-2.5, 0, 2.5)])
    C.pon("#c8102e", bor)
    if cuerda:
        C.pon("#2a1a10", Lz.mascara(lambda P: P.linea([(cx, 0), (cx, cy - ry - h * 0.07)], 1.2)))
    guarda_png_rgba(C.rgb, C.a, ruta)
    return Lz.w, Lz.h, cx, 0


def destello(ruta, tam=40, c="#fffbe8"):
    Lz = Lienzo(tam, tam)
    X, Y = Lz.X - tam / 2, Lz.Y - tam / 2
    r = np.hypot(X, Y) / (tam / 2)
    cruz = np.exp(-(np.abs(X) / 1.1) ** 2) * np.clip(1 - np.abs(Y) / (tam / 2), 0, 1) ** 2 + np.exp(-(np.abs(Y) / 1.1) ** 2) * np.clip(1 - np.abs(X) / (tam / 2), 0, 1) ** 2
    diag = (np.exp(-(np.abs(X - Y) / 1.2) ** 2) + np.exp(-(np.abs(X + Y) / 1.2) ** 2)) * np.clip(1 - r * 1.6, 0, 1) ** 2 * 0.5
    a = np.clip(cruz + diag + np.exp(-(r * 6) ** 2), 0, 1)
    rgb = np.broadcast_to(col(c), a.shape + (3,))
    guarda_png_rgba(rgb, a, ruta)


def grulla(ruta, fase, w=120, h=70, luz=1):
    """Grulla de corona roja en vuelo (de perfil, hacia la izquierda). fase 0 = alas arriba, 1 = alas abajo."""
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    cy = h * 0.5
    cuerpo = [(w * 0.42, cy - 3), (w * 0.62, cy - 4), (w * 0.72, cy - 1), (w * 0.62, cy + 4), (w * 0.44, cy + 4)]
    cuello = [(w * 0.44, cy - 1), (w * 0.12, cy - 3)]
    patas = [(w * 0.7, cy + 1), (w * 0.98, cy + 3)]
    if fase == 0:
        ala = [(w * 0.46, cy - 2), (w * 0.38, cy - h * 0.38), (w * 0.52, cy - h * 0.48), (w * 0.68, cy - h * 0.28), (w * 0.6, cy - 2)]
        punta = [(w * 0.38, cy - h * 0.38), (w * 0.52, cy - h * 0.48), (w * 0.5, cy - h * 0.34)]
    else:
        ala = [(w * 0.46, cy + 1), (w * 0.36, cy + h * 0.36), (w * 0.5, cy + h * 0.46), (w * 0.66, cy + h * 0.24), (w * 0.6, cy + 2)]
        punta = [(w * 0.36, cy + h * 0.36), (w * 0.5, cy + h * 0.46), (w * 0.48, cy + h * 0.3)]
    blanco = Lz.mascara(lambda P: (P.poly(spline(cuerpo, 6, cerrada=True)), P.poly(spline(ala, 6, cerrada=True))))
    negro = Lz.mascara(lambda P: (P.trazo(spline(cuello, 6), 3.4, 2.4), P.poly(punta), P.poly([(w * 0.64, cy - 3), (w * 0.76, cy - 1), (w * 0.64, cy + 3)])))
    C.pon(mezcla(np.broadcast_to(col("#9fb0c8"), blanco.shape + (3,)), col("#ffffff"), volumen(blanco, 3, -luz, -1, 1.2)[..., None]), blanco)
    C.pon("#1c1c24", negro)
    C.pon("#e0283f", Lz.mascara(lambda P: P.elip(w * 0.115, cy - 4.2, 2.0, 1.6)))
    C.pon("#f2e6c8", Lz.mascara(lambda P: P.poly([(w * 0.1, cy - 3.6), (w * 0.02, cy - 2.2), (w * 0.1, cy - 2.2)])))
    C.pon("#3a3a44", Lz.mascara(lambda P: P.linea(patas, 1.1)))
    guarda_png_rgba(C.rgb, C.a, ruta)


def nube_humo_horizontal(ruta, w=180, h=60, c=("#f0c38a", "#fff0d0"), seed=0):
    """Ráfaga de arena que se desprende de una cresta (se estira hacia la derecha)."""
    Lz = Lienzo(w, h)
    n = Lz.ruido(1.8, seed, aniso=(0.3, 2.0))
    X, Y = Lz.X, Lz.Y
    forma = np.exp(-((Y - h * 0.6) / (h * 0.22 + X / w * h * 0.18)) ** 2) * suave(0, w * 0.1, X) * suave(w, w * 0.4, X)
    a = np.clip(forma * (0.3 + 0.9 * n), 0, 1) * 0.75
    rgb = mezcla(np.broadcast_to(col(c[0]), a.shape + (3,)), col(c[1]), n[..., None])
    guarda_png_rgba(rgb, a, ruta)


def caravana(ruta, n=5, alto=46, luz=-1, cuerpo=("#3a1a22", "#7a3e34"), rim="#ffd08a"):
    """Caravana de camellos bactrianos con jinete y fardos, a contraluz (luz de borde del lado del sol)."""
    paso = alto * 1.25
    w = int(paso * n + alto * 0.8)
    h = int(alto * 1.5)
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    yb = h - 2

    def camello(P, x, k):
        cu = alto * 0.5
        P.elip(x, yb - alto * 0.62, cu * 0.62, alto * 0.17)  # tronco
        P.elip(x - cu * 0.28, yb - alto * 0.78, cu * 0.2, alto * 0.14)  # jorobas
        P.elip(x + cu * 0.2, yb - alto * 0.78, cu * 0.2, alto * 0.14)
        cuello = spline([(x + cu * 0.55, yb - alto * 0.62), (x + cu * 0.85, yb - alto * 0.72), (x + cu * 0.95, yb - alto * 0.95), (x + cu * 1.08, yb - alto * 1.0)], 6)
        P.trazo(cuello, alto * 0.13, alto * 0.08)
        P.elip(x + cu * 1.12, yb - alto * 0.99, alto * 0.09, alto * 0.055)
        fase = k * 1.7
        for i, lx in enumerate((-0.42, -0.25, 0.3, 0.46)):
            sw = np.sin(fase + i * 1.6) * alto * 0.06
            P.linea([(x + cu * lx, yb - alto * 0.55), (x + cu * lx + sw, yb - alto * 0.25), (x + cu * lx + sw * 1.4, yb)], alto * 0.055)
        P.linea([(x - cu * 0.6, yb - alto * 0.62), (x - cu * 0.72, yb - alto * 0.42)], alto * 0.04)  # cola
        if k == n - 1:  # jinete con sombrero
            P.elip(x - cu * 0.02, yb - alto * 1.0, alto * 0.08, alto * 0.16)
            P.elip(x - cu * 0.02, yb - alto * 1.2, alto * 0.06, alto * 0.06)
            P.poly([(x - cu * 0.02 - alto * 0.14, yb - alto * 1.22), (x - cu * 0.02 + alto * 0.14, yb - alto * 1.22), (x - cu * 0.02, yb - alto * 1.34)])
        else:  # fardos
            P.rect(x - cu * 0.35, yb - alto * 0.98, x + cu * 0.1, yb - alto * 0.8)

    m = Lz.mascara(lambda P: [camello(P, alto * 0.45 + paso * k, k) for k in range(n)])
    cuerda = Lz.mascara(lambda P: [P.linea([(alto * 0.45 + paso * k + alto * 0.62, yb - alto * 1.0), (alto * 0.45 + paso * (k + 1) - alto * 0.3, yb - alto * 0.7)], 0.9) for k in range(n - 1)])
    c = mezcla(np.broadcast_to(col(cuerpo[0]), m.shape + (3,)), col(cuerpo[1]), volumen(m, 3, luz, -0.6, 1.0)[..., None] * 0.7)
    C.pon(c, m)
    C.pon(cuerpo[0], cuerda * 0.8)
    C.pon(rim, borde(m, luz * 1.6, -0.8) * 0.95)
    # fardos de colores (seda)
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, h


def palmera(ruta, alto=300, luz=-1, seed=0, oscura=("#2a1a1a", "#7a5a3a"), hoja=("#14200f", "#4a5a26"), rim="#ffc070"):
    """Palmera datilera: tronco curvo anillado y penacho de hojas pinnadas (base abajo al centro del sprite)."""
    rng = np.random.default_rng(seed)
    w = int(alto * 0.95)
    h = int(alto * 1.05)
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    cx = w / 2
    top = (cx + alto * 0.12, h - alto * 0.85)
    tronco = spline([(cx, h - 2), (cx + alto * 0.02, h - alto * 0.4), (top[0] - alto * 0.02, top[1] + alto * 0.15), top], 10)
    tm = Lz.mascara(lambda P: P.trazo(tronco, alto * 0.07, alto * 0.045))
    anillos = (np.sin(Lz.Y * 0.9) > 0.3) * 1.0
    tc = mezcla(np.broadcast_to(col(oscura[0]), tm.shape + (3,)), col(oscura[1]), volumen(tm, 3, luz, 0, 1.2)[..., None])
    tc = mezcla(tc, col(oscura[0]), anillos[..., None] * 0.35)
    C.pon(tc, tm)
    hojas = []
    for k in range(13):
        a = -np.pi / 2 + (k - 6) * 0.42 + rng.uniform(-0.1, 0.1)
        largo = alto * rng.uniform(0.36, 0.48)
        caida = alto * (0.05 + 0.22 * abs(np.cos(a)))
        p0 = top
        p1 = (top[0] + np.cos(a) * largo * 0.35, top[1] + np.sin(a) * largo * 0.6 - alto * 0.06)
        p2 = (top[0] + np.cos(a) * largo * 0.75, top[1] + np.sin(a) * largo * 0.45 - alto * 0.02)
        p3 = (top[0] + np.cos(a) * largo, top[1] + np.sin(a) * largo * 0.2 + caida)
        hojas.append(bz(p0, p1, p2, p3, 18))

    def dib(P):
        for curva in hojas:
            P.trazo(curva, alto * 0.018, alto * 0.006)
            for i in range(2, len(curva) - 1):
                x, y = curva[i]
                dx, dy = curva[i + 1][0] - curva[i - 1][0], curva[i + 1][1] - curva[i - 1][1]
                n = np.hypot(dx, dy) + 1e-6
                nx, ny = -dy / n, dx / n
                l = alto * 0.08 * np.sin(np.pi * (0.15 + 0.85 * i / len(curva)))
                for s in (-1, 1):
                    P.trazo([(x, y), (x + nx * l * s * 0.6 + dx / n * l * 0.7, y + ny * l * s * 0.6 + dy / n * l * 0.7 + l * 0.45)], alto * 0.014, alto * 0.004)

    hm = Lz.mascara(dib)
    hc = mezcla(np.broadcast_to(col(hoja[0]), hm.shape + (3,)), col(hoja[1]), volumen(hm, 4, luz, 0.3, 1.0)[..., None])
    C.pon(hc, hm)
    C.pon(rim, borde(np.clip(hm + tm, 0, 1), luz * 1.5, -1) * 0.45)
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, h


def brillo_agua(ruta, w=300, h=40, c="#fff2c0", seed=0, vetas=26):
    """Destellos alargados del sol (o la luna) sobre el agua."""
    rng = np.random.default_rng(seed)
    Lz = Lienzo(w, h)
    m = Lz.mascara(lambda P: [P.elip(rng.uniform(w * 0.1, w * 0.9), y, rng.uniform(w * 0.02, w * 0.09) * (1 - abs(y / h - 0.5)), max(0.6, h * 0.025))
                              for y in rng.uniform(h * 0.1, h * 0.9, vetas)])
    m = np.clip(desenfoca(m, 1.0) * 1.4, 0, 1) * np.exp(-(((Lz.X - w / 2) / (w * 0.4)) ** 2))
    guarda_png_rgba(np.broadcast_to(col(c), m.shape + (3,)), m, ruta)


def franja(ruta, w=600, h=40, c="#ffd9a0", f=0.6, seed=0, aniso=(6.0, 1.0)):
    """Franja de calima / bruma tileable en horizontal (para «fluye» y «calima»)."""
    Lz = Lienzo(w, h)
    n = Lz.ruido(2.0, seed, aniso)
    perfil = np.exp(-(((Lz.Y - h * 0.5) / (h * 0.3)) ** 2))
    a = np.clip((n * 0.9 + 0.2) * perfil * f, 0, 1)
    guarda_png_rgba(np.broadcast_to(col(c), a.shape + (3,)), a, ruta)


def barca(ruta, w=150, luz=1, farol_c="#ffb04a", pasajera=False):
    """Barca de toldo (乌篷船) con barquero y farol encendido, con su reflejo cálido (el sprite incluye el agua)."""
    h = int(w * 0.62)
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    X, Y = Lz.X, Lz.Y
    yl = h * 0.55  # línea del agua
    casco = Lz.mascara(lambda P: P.poly(spline([(w * 0.04, yl - h * 0.16), (w * 0.3, yl - h * 0.02), (w * 0.7, yl - h * 0.02), (w * 0.97, yl - h * 0.2), (w * 0.9, yl + h * 0.02), (w * 0.12, yl + h * 0.02)], 8, cerrada=True)))
    toldo = Lz.mascara(lambda P: P.poly(spline([(w * 0.32, yl - h * 0.05), (w * 0.36, yl - h * 0.22), (w * 0.5, yl - h * 0.28), (w * 0.64, yl - h * 0.22), (w * 0.68, yl - h * 0.05)], 8)))
    C.pon(mezcla(np.broadcast_to(col("#0c0e18"), casco.shape + (3,)), col("#4a3a3a"), volumen(casco, 3, -luz, -1)[..., None] * 0.8), casco)
    C.pon(mezcla(np.broadcast_to(col("#10121c"), casco.shape + (3,)), col("#3a3a52"), ((np.sin(X * 0.9) > 0) * 0.3 + volumen(toldo, 3, -luz, -1) * 0.6)[..., None]), toldo)
    # barquero con remo
    bq = Lz.mascara(lambda P: (P.elip(w * 0.8, yl - h * 0.3, w * 0.025, h * 0.1), P.elip(w * 0.8, yl - h * 0.43, w * 0.022, w * 0.022),
                               P.poly([(w * 0.76, yl - h * 0.45), (w * 0.84, yl - h * 0.45), (w * 0.8, yl - h * 0.52)]), P.linea([(w * 0.84, yl - h * 0.36), (w * 0.98, yl + h * 0.15)], 1.4)))
    C.pon("#0a0a12", bq)
    C.pon("#c8b0a0", borde(bq, luz * 1.2, -1) * 0.5)
    if pasajera:  # pasajera sentada bajo un paraguas de papel encerado rojo
        pj = Lz.mascara(lambda P: (P.elip(w * 0.55, yl - h * 0.22, w * 0.04, h * 0.1), P.elip(w * 0.55, yl - h * 0.36, w * 0.022, w * 0.022)))
        C.pon("#2a1a2a", pj)
        par = Lz.mascara(lambda P: (P.poly(spline([(w * 0.42, yl - h * 0.46), (w * 0.5, yl - h * 0.6), (w * 0.62, yl - h * 0.62), (w * 0.7, yl - h * 0.5)], 6) + [(w * 0.56, yl - h * 0.5)]),
                                    P.linea([(w * 0.56, yl - h * 0.58), (w * 0.57, yl - h * 0.3)], 1.0)))
        C.pon(mezcla(np.broadcast_to(col("#5a0c18"), par.shape + (3,)), col("#e04a3a"), volumen(par, 3, -luz, 1)[..., None]), par)
        C.pon("#ffb080", borde(par, luz, -1) * 0.5)
    # farol en la proa con halo y su reflejo
    fx, fy = w * 0.2, yl - h * 0.3
    C.pon("#3a2a20", Lz.mascara(lambda P: P.linea([(w * 0.26, yl - h * 0.1), (w * 0.2, yl - h * 0.4)], 1.2)))
    halo = np.exp(-(((X - fx) ** 2 + (Y - fy) ** 2) / (w * 0.09) ** 2))
    C.pon(farol_c, halo * 0.55)
    C.pon("#ffe6a0", Lz.mascara(lambda P: P.elip(fx, fy, w * 0.022, h * 0.05)))
    C.pon("#e0402a", Lz.mascara(lambda P: P.elip(fx, fy + h * 0.005, w * 0.02, h * 0.035)) * 0.5)
    ref = np.exp(-(((X - fx) / (w * 0.035)) ** 2)) * suave(yl, yl + h * 0.05, Y) * suave(h, yl + h * 0.1, Y) * (0.5 + 0.5 * np.sin(Y * 1.3))
    C.pon(farol_c, np.clip(ref * 0.8, 0, 1))
    refc = np.clip(np.flipud(casco) * 0, 0, 1)
    # reflejo oscuro del casco
    rc = np.zeros_like(casco)
    k = int(yl)
    alto = min(k, h - k)
    rc[k : k + alto] = casco[k - alto : k][::-1] * 0.5
    rc = rc * (0.6 + 0.4 * (np.sin(Y * 1.6 + X * 0.1) > 0))
    C.pon("#04060e", rc * suave(h, k, Y))
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, h


def reflejo_luz(ruta, w=24, h=120, c="#ffc070", seed=0):
    """Reflejo vertical de una luz en el agua: trazos horizontales cortos que se deshacen hacia abajo."""
    rng = np.random.default_rng(seed)
    Lz = Lienzo(w, h)
    m = Lz.mascara(lambda P: [P.rect(w / 2 - l / 2 + rng.uniform(-w * 0.15, w * 0.15), y, w / 2 + l / 2, y + rng.uniform(1, 2.2))
                              for y, l in [(rng.uniform(0, h), rng.uniform(w * 0.2, w * 0.9)) for _ in range(int(h / 3))]])
    m = m * suave(h, 0, Lz.Y) ** 0.8
    guarda_png_rgba(np.broadcast_to(col(c), m.shape + (3,)), np.clip(desenfoca(m, 0.6) * 1.2, 0, 1), ruta)


def halo(ruta, tam=200, c="#c8d8ff", f=0.8, p=1.6):
    Lz = Lienzo(tam, tam)
    d = np.hypot(Lz.X - tam / 2, Lz.Y - tam / 2) / (tam / 2)
    a = np.clip(np.exp(-(d * 2.2) ** p) * f, 0, 1) * suave(1, 0.85, d)
    guarda_png_rgba(np.broadcast_to(col(c), a.shape + (3,)), a, ruta)


def sauce(ruta, w=320, h=420, luz=1, seed=0, hoja=("#0a1a1c", "#3a6a5a"), rim="#9ab8d8"):
    """Sauce llorón: copa oscura arriba y cientos de hebras colgantes en dos profundidades (las de detrás más
    oscuras y finas), con hojitas lanceoladas y luz de luna en el borde (se mece desde el borde superior)."""
    rng = np.random.default_rng(seed)
    Lz = Lienzo(w, h)
    C = Capa(Lz)

    def hebras(n, grosor, hojita, largo_min):
        out = []
        for _ in range(n):
            x0 = w * (0.04 + 0.92 * rng.beta(1.6, 1.6))
            env = np.sin(np.pi * x0 / w) ** 0.8  # copa redondeada: hebras largas en el centro, cortas en los lados
            y0 = h * 0.1 * (1 - env) + rng.uniform(0, h * 0.06)
            largo = rng.uniform(h * largo_min, h * 0.98) * (0.3 + 0.7 * env)
            curv = rng.uniform(-w * 0.04, w * 0.04)
            out.append([(x0 + curv * np.sin(t * 2.4) + t * t * rng.uniform(-4, 12), y0 + t * largo) for t in np.linspace(0, 1, 22)])

        def dib(P):
            for r in out:
                P.linea(r, grosor)
                for k in range(3, len(r)):
                    x, y = r[k]
                    for s_ in (-1, 1):
                        P.trazo([(x, y), (x + s_ * hojita * 0.55, y + hojita)], hojita * 0.32, 0.4)
        return Lz.mascara(dib)

    copa = desenfoca(Lz.mascara(lambda P: [P.elip(w * rng.uniform(0.15, 0.85), rng.uniform(-h * 0.04, h * 0.06), rng.uniform(w * 0.08, w * 0.16), rng.uniform(h * 0.03, h * 0.06)) for _ in range(10)]), 3) * 0.8
    atras = hebras(140, 0.8, 4.5, 0.3)
    delante = hebras(110, 1.1, 6.0, 0.45)
    C.pon(mezcla(np.broadcast_to(col("#040a10"), atras.shape + (3,)), col("#1e3a3a"), volumen(atras, 5, -luz, 0.5)[..., None]), atras * 0.75)
    C.pon(mezcla(np.broadcast_to(col("#030608"), atras.shape + (3,)), col("#14282a"), volumen(copa, 8, -luz, 0.8)[..., None]), copa)
    v = volumen(delante, 4, -luz, 0.5)
    C.pon(mezcla(np.broadcast_to(col(hoja[0]), delante.shape + (3,)), col(hoja[1]), v[..., None]), delante)
    C.pon(rim, borde(delante, luz * 1.2, -1) * 0.4)
    C.a = C.a * suave(-h * 0.02, h * 0.1, Lz.Y) * suave(0, w * 0.06, Lz.X) * suave(w, w * 0.94, Lz.X)
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, h


def ropa(ruta, w=160, h=50, seed=0):
    """Cuerda de ropa tendida entre dos casas (prendas de colores que cuelgan)."""
    rng = np.random.default_rng(seed)
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    cuerda = [(x, 4 + 10 * np.sin(np.pi * x / w)) for x in np.linspace(0, w, 20)]
    C.pon("#1a1a24", Lz.mascara(lambda P: P.linea(cuerda, 1.0)))
    colores = ["#c8303a", "#3a5aa8", "#e8e0d0", "#d8a040", "#4a8a6a", "#a83a7a"]
    x = 10
    while x < w - 18:
        pw = rng.uniform(10, 20)
        ph = rng.uniform(14, 30)
        y0 = 4 + 10 * np.sin(np.pi * (x + pw / 2) / w)
        m = Lz.mascara(lambda P: P.poly([(x, y0), (x + pw, y0 + 1), (x + pw * 0.92, y0 + ph), (x + pw * 0.08, y0 + ph * 0.96)]))
        c0 = col(colores[int(rng.integers(len(colores)))])
        C.pon(mezcla(np.broadcast_to(c0 * 0.35, m.shape + (3,)), c0 * 0.85, volumen(m, 2, -1, 0, 1)[..., None]), m)
        x += pw + rng.uniform(3, 9)
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, h


def cascada(ruta, w=40, h=200, seed=0):
    """Tira de agua que cae, repetible en vertical (el sprite lleva dos periodos para la animación «cascada»)."""
    Lz = Lienzo(w, h)
    n = Lz.ruido(1.6, seed, aniso=(0.25, 4.0))
    n2 = Lz.ruido(1.2, seed + 1, aniso=(0.3, 3.0))
    X = Lz.X
    perfil = suave(0, w * 0.25, X) * suave(w, w * 0.75, X)
    a = np.clip((0.55 + 0.6 * (n - 0.5) + 0.3 * (n2 - 0.5)) * perfil * 1.2, 0, 1)
    rgb = mezcla(np.broadcast_to(col("#9fc6c8"), a.shape + (3,)), col("#ffffff"), np.clip(n * 1.3 - 0.2, 0, 1)[..., None])
    rgb = np.concatenate([rgb, rgb], 0)
    a = np.concatenate([a, a], 0)
    guarda_png_rgba(rgb, a, ruta)


def bambu(ruta, w=260, h=760, luz=-1, seed=0, tallos=5, verde=("#1e3a22", "#9cc47a"), hoja=("#1a3a1e", "#8fbf6a")):
    """Mata de bambú en primer plano: cañas con nudos y volumen, ramilletes de hojas lanceoladas (base abajo)."""
    rng = np.random.default_rng(seed)
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    cañas, hojas = [], []
    for k in range(tallos):
        x0 = w * (0.2 + 0.6 * rng.random())
        curv = rng.uniform(-w * 0.18, w * 0.18)
        top = rng.uniform(0, h * 0.25)
        g = rng.uniform(w * 0.03, w * 0.05)
        pts = [(x0 + curv * ((h - y) / h) ** 2, y) for y in np.linspace(h, top, 24)]
        cañas.append((pts, g))
        for i in range(8, 24, 2):
            xx, yy = pts[i]
            for _ in range(rng.integers(2, 5)):
                a = rng.uniform(-2.9, -0.3) + (np.pi if rng.random() < 0.15 else 0)
                l = rng.uniform(w * 0.14, w * 0.26)
                hojas.append(((xx, yy), a, l))
    tm = Lz.mascara(lambda P: [P.trazo(p, g * 1.1, g * 0.7) for p, g in cañas])
    nudos = Lz.mascara(lambda P: [P.linea([(p[i][0] - g * 0.7, p[i][1]), (p[i][0] + g * 0.7, p[i][1])], 1.6) for p, g in cañas for i in range(2, 22, 3)])
    hm = Lz.mascara(lambda P: [P.poly([(x, y), (x + np.cos(a) * l * 0.5 - np.sin(a) * l * 0.09, y + np.sin(a) * l * 0.5 + np.cos(a) * l * 0.09 + l * 0.12),
                                       (x + np.cos(a) * l, y + np.sin(a) * l + l * 0.3), (x + np.cos(a) * l * 0.5 + np.sin(a) * l * 0.09, y + np.sin(a) * l * 0.5 - np.cos(a) * l * 0.09 + l * 0.12)])
                               for (x, y), a, l in hojas])
    v = volumen(tm, 3, luz, 0, 1.3)
    C.pon(mezcla(np.broadcast_to(col(verde[0]), tm.shape + (3,)), col(verde[1]), v[..., None]), tm)
    C.pon("#14281a", nudos * tm)
    C.pon("#e8f0c0", nudos * borde(tm, luz * 1.0, 0) * 0.6)
    vh = volumen(hm, 3, luz, -0.6, 1.0)
    C.pon(mezcla(np.broadcast_to(col(hoja[0]), hm.shape + (3,)), col(hoja[1]), vh[..., None]), hm)
    C.pon("#f6f4d0", borde(hm, luz * 1.2, -1) * 0.35)
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, h


def balsa(ruta, w=200, luz=-1):
    """Balsa de bambú con pescador de sombrero cónico, pértiga, farolillo y dos cormoranes posados; con reflejo."""
    h = int(w * 0.6)
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    X, Y = Lz.X, Lz.Y
    yl = h * 0.72
    bal = Lz.mascara(lambda P: P.poly([(w * 0.06, yl - 4), (w * 0.94, yl - 6), (w * 0.98, yl - 9), (w * 0.95, yl), (w * 0.05, yl + 1), (w * 0.02, yl - 6)]))
    caña = ((Y % 3.2) < 1.1).astype(np.float32)
    C.pon(mezcla(np.broadcast_to(col("#4a4a2a"), bal.shape + (3,)), col("#c8b878"), (0.6 - caña * 0.3 + 0.2 * suave(w, 0, X) * (luz < 0))[..., None]), bal)
    pes = Lz.mascara(lambda P: (P.poly([(w * 0.42, yl - 5), (w * 0.48, yl - 5), (w * 0.47, yl - h * 0.33), (w * 0.43, yl - h * 0.33)]),
                                P.elip(w * 0.45, yl - h * 0.38, w * 0.022, w * 0.024),
                                P.poly([(w * 0.39, yl - h * 0.38), (w * 0.51, yl - h * 0.38), (w * 0.45, yl - h * 0.5)]),
                                P.linea([(w * 0.47, yl - h * 0.3), (w * 0.72, yl - h * 0.82)], 1.4)))
    C.pon(mezcla(np.broadcast_to(col("#1e2a2a"), bal.shape + (3,)), col("#5a6a5a"), volumen(pes, 2, luz, -1)[..., None]), pes)
    C.pon("#e8d8a8", Lz.mascara(lambda P: P.poly([(w * 0.39, yl - h * 0.38), (w * 0.51, yl - h * 0.38), (w * 0.45, yl - h * 0.5)])) * 0.6)
    for cx in (w * 0.2, w * 0.78):
        cor = Lz.mascara(lambda P: (P.elip(cx, yl - h * 0.12, w * 0.035, h * 0.07), P.trazo(spline([(cx + w * 0.01, yl - h * 0.17), (cx + w * 0.02, yl - h * 0.26), (cx + w * 0.045, yl - h * 0.27)], 5), 2.4, 1.6)))
        C.pon("#0c1414", cor)
        C.pon("#9ab0a0", borde(cor, luz, -1) * 0.5)
    fx, fy = w * 0.9, yl - h * 0.2
    C.pon("#3a2a20", Lz.mascara(lambda P: P.linea([(w * 0.9, yl - 6), (w * 0.9, fy)], 1.0)))
    C.pon("#e0402a", Lz.mascara(lambda P: P.elip(fx, fy, w * 0.016, h * 0.035)))
    rc = np.zeros_like(bal)
    k = int(yl)
    alto = min(k, h - k)
    tot = np.clip(bal + pes, 0, 1)
    rc[k : k + alto] = tot[k - alto : k][::-1] * 0.4
    C.pon("#2a4a44", rc * suave(h, k, Y) * (0.6 + 0.4 * (np.sin(Y * 1.4) > 0)))
    C.pon("#ffffff", (np.abs(Y - yl - 1.5) < 0.8) * suave(w * 0.02, w * 0.1, X) * suave(w * 0.98, w * 0.9, X) * 0.5)
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, h


def haz(ruta, w=400, h=600, c="#fff4d0", luz=-1, seed=0):
    """Rayos de sol oblicuos entre la niebla (vienen del lado de la luz)."""
    rng = np.random.default_rng(seed)
    Lz = Lienzo(w, h)
    X, Y = Lz.X, Lz.Y
    u = X + (Y * 0.55 if luz < 0 else -Y * 0.55)
    a = np.zeros((h, w), np.float32)
    for _ in range(7):
        cx = rng.uniform(0, w * 1.4) - (0 if luz < 0 else w * 0.4)
        a += np.exp(-((u - cx) / rng.uniform(6, 22)) ** 2) * rng.uniform(0.3, 0.8)
    a = np.clip(a * suave(0, h * 0.2, Y) * suave(h, h * 0.4, Y), 0, 1) * 0.6
    guarda_png_rgba(np.broadcast_to(col(c), a.shape + (3,)), a, ruta)


def figura(ruta, tipo, fase, alto=40, luz=1, rim="#fff0d0"):
    """Figurita a pequeña escala (de perfil, caminando hacia la derecha): monje, mercader con pértiga y cestos,
    viajero con fardo y bastón, pescador con sombrero cónico, campesina. fase 0/1 = paso."""
    w = int(alto * 1.1)
    Lz = Lienzo(w, alto + 2)
    C = Capa(Lz)
    cx, yb = w * 0.45, alto
    ropa = {"monje": ("#8a3a10", "#e8902a"), "mercader": ("#1e2a4a", "#4a6aa8"), "viajero": ("#3a2a1e", "#8a6a4a"),
            "pescador": ("#1e2a2a", "#4a5a5a"), "campesina": ("#2a3a5a", "#5a7ab8")}[tipo]
    pa = alto * 0.12 * (1 if fase == 0 else -1)

    def cuerpo(P):
        P.linea([(cx, yb - alto * 0.38), (cx + pa, yb)], alto * 0.07)
        P.linea([(cx, yb - alto * 0.38), (cx - pa, yb)], alto * 0.07)
        P.poly([(cx - alto * 0.12, yb - alto * 0.32), (cx + alto * 0.12, yb - alto * 0.32), (cx + alto * 0.08, yb - alto * 0.72), (cx - alto * 0.08, yb - alto * 0.72)])
        P.elip(cx + alto * 0.02, yb - alto * 0.8, alto * 0.075, alto * 0.08)
        if tipo in ("pescador", "campesina", "mercader"):
            P.poly([(cx - alto * 0.2, yb - alto * 0.84), (cx + alto * 0.22, yb - alto * 0.84), (cx + alto * 0.01, yb - alto * 0.98)])

    m = Lz.mascara(cuerpo)
    c = mezcla(np.broadcast_to(col(ropa[0]), m.shape + (3,)), col(ropa[1]), volumen(m, 2, -luz, -0.5, 1.2)[..., None])
    C.pon(c, m)
    C.pon("#e8c8a0", Lz.mascara(lambda P: P.elip(cx + alto * 0.04, yb - alto * 0.8, alto * 0.05, alto * 0.06)) * (0 if tipo in ("pescador", "campesina", "mercader") else 1))
    if tipo in ("pescador", "campesina", "mercader"):
        C.pon("#d8c088", Lz.mascara(lambda P: P.poly([(cx - alto * 0.2, yb - alto * 0.84), (cx + alto * 0.22, yb - alto * 0.84), (cx + alto * 0.01, yb - alto * 0.98)])))
    extra = Lz.mascara(lambda P: (
        (P.linea([(cx - alto * 0.42, yb - alto * 0.66), (cx + alto * 0.46, yb - alto * 0.7)], alto * 0.03), P.elip(cx - alto * 0.38, yb - alto * 0.5, alto * 0.08, alto * 0.1), P.elip(cx + alto * 0.42, yb - alto * 0.54, alto * 0.08, alto * 0.1)) if tipo == "mercader" else
        (P.linea([(cx + alto * 0.16, yb - alto * 0.74), (cx + alto * 0.24, yb)], alto * 0.025), P.elip(cx - alto * 0.12, yb - alto * 0.6, alto * 0.09, alto * 0.13)) if tipo == "viajero" else
        (P.linea([(cx + alto * 0.1, yb - alto * 0.6), (cx + alto * 0.5, yb - alto * 1.0)], alto * 0.02),) if tipo == "pescador" else
        (P.linea([(cx + alto * 0.14, yb - alto * 0.85), (cx + alto * 0.18, yb)], alto * 0.025),) if tipo == "monje" else
        (P.elip(cx - alto * 0.14, yb - alto * 0.62, alto * 0.08, alto * 0.11),)))
    C.pon("#3a2a1a", extra)
    C.pon(rim, borde(np.clip(m + extra, 0, 1), luz, -1) * 0.6)
    guarda_png_rgba(C.rgb, C.a, ruta)
    return w, alto + 2


def sombra_nube(ruta, w=480, h=160, c="#1a2440", f=0.28, seed=0):
    """Sombra de una nube que pasa por el terreno (mancha blanda y oscura, aplastada por la perspectiva)."""
    Lz = Lienzo(w, h)
    n = Lz.ruido(2.2, seed)
    d = np.sqrt(((Lz.X - w / 2) / (w * 0.45)) ** 2 + ((Lz.Y - h / 2) / (h * 0.42)) ** 2)
    a = np.clip((1 - d) * 1.6 * (0.6 + 0.6 * n), 0, 1)
    a = desenfoca(a, 10) * f
    guarda_png_rgba(np.broadcast_to(col(c), a.shape + (3,)), a, ruta)


def gente(M, capa, tipo, x, y, alto, dx, dur, retraso=0.0, luz=1, movil=True, dy=0.0):
    """Coloca una figurita que camina (dos poses que se alternan) desde (x, y_pies) recorriendo dx (centésimas del lienzo)."""
    import os
    base = f"fig-{tipo}"
    if not os.path.exists(M.ruta(f"{base}-a.webp")):
        figura(M.ruta(f"{base}-a.webp"), tipo, 0, 48, luz)
        figura(M.ruta(f"{base}-b.webp"), tipo, 1, 48, luz)
    w = alto * 1.1
    kw = dict(dur=dur, retraso=retraso, dx=dx, dy=dy, aleteo=0.62, src2=f"{M.nivel}/{base}-b.webp", movil=movil)
    if dx < 0:
        kw["clase"] = "ma-izq"
    M.actor(capa, f"{base}-a.webp", x - w * 0.45, y - alto, w, alto + 2, "camina", **kw)
