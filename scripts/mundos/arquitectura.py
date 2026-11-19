"""Arquitectura y vegetación pintadas para los mundos de la Ruta (v28).

Cada pieza se pinta en un lienzo pequeño propio (parche RGBA) y se pega en la capa: tejados chinos de aleros curvos
con tejas vidriadas, cumbrera con 鸱吻, ménsulas pintadas (彩画), columnas bermellón, celosías, terrazas de mármol
con balaustrada, el Templo del Cielo (tejados redondos azules), la Gran Muralla con torres de vigía, pinos nevados,
farolillos rojos… Luz clave por parámetro: luz = +1 (sol a la derecha) o −1 (a la izquierda).
"""
import numpy as np

from pincel import (Capa, Lienzo, borde, bz, col, desenfoca, desplaza, mezcla, oclusion, spline, suave, volumen)


def _lado(L, cx, ancho, luz):
    """0 (lado en sombra) … 1 (lado al sol) a lo ancho de una pieza centrada en cx."""
    return suave(-ancho, ancho, (L.X - cx) * luz)


# ====================================================================== tejado chino
def tejado_geo(cx, ye, w, h, lift, rw):
    """Polígonos de un tejado a cuatro aguas visto de frente: superficie, alero (canto) y cumbrera."""
    izq = (cx - w / 2, ye - lift)
    der = (cx + w / 2, ye - lift)
    yr = ye - h
    alero = (bz(izq, (cx - w * 0.46, ye - lift * 0.15), (cx - w * 0.36, ye), (cx - w * 0.26, ye), 16)
             + [(cx, ye)]
             + bz((cx + w * 0.26, ye), (cx + w * 0.36, ye), (cx + w * 0.46, ye - lift * 0.15), der, 16))
    # limas cóncavas: bajan casi a plomo desde la cumbrera y se abren al llegar al alero (perfil de tejado chino)
    lima_i = bz((cx - rw / 2, yr), (cx - rw / 2 - (w - rw) * 0.06, yr + h * 0.6), (cx - w * 0.38, ye - lift * 0.55), izq, 20)
    lima_d = bz((cx + rw / 2, yr), (cx + rw / 2 + (w - rw) * 0.06, yr + h * 0.6), (cx + w * 0.38, ye - lift * 0.55), der, 20)
    sup = lima_i + alero[1:] + lima_d[::-1][1:]
    return {"sup": sup, "alero": alero, "lima_i": lima_i, "lima_d": lima_d, "yr": yr}


def pinta_tejado(Lz, C, cx, ye, w, h, *, luz=1, teja=("#7a4a10", "#f2c14e", "#fff1b0"), lift=None, rw=None, nieve=0.0,
                 canto="#3a1c08", cumbrera_c=None, paso=None, seed=0, sombra_bajo=True, redondo=False):
    """Pinta un tejado: tejas vidriadas en canales, brillo especular, alero con remates de tejas, cumbrera y nieve."""
    lift = h * 0.42 if lift is None else lift
    rw = w * 0.5 if rw is None else rw
    g = tejado_geo(cx, ye, w, h, lift, rw)
    X, Y = Lz.X, Lz.Y
    m = Lz.mascara(lambda P: P.poly(g["sup"]))
    paso = paso or max(3.0, w / 46)
    # coordenada de canal: en tejado redondo los canales convergen hacia el centro (como meridianos)
    if redondo:
        semi = np.maximum(w / 2 * (0.35 + 0.65 * np.clip((Y - g["yr"]) / max(h, 1), 0, 1)), 1)
        u = np.clip((X - cx) / semi, -0.999, 0.999)
        th = np.arcsin(u) * w / 2
        canal = (np.sin(th / paso * np.pi) + 1) / 2
        lado = np.clip(0.5 + 0.5 * u * luz * 1.1, 0, 1)
    else:
        canal = (np.sin((X - cx) / paso * np.pi) + 1) / 2
        lado = _lado(Lz, cx, w * 0.45, luz)
    # la parte baja (más plana) recoge la luz del cielo; la alta mira al espectador
    alto = np.clip((ye - Y) / max(h, 1), 0, 1)
    sh, mid, hi = (col(c) for c in teja)
    base = mezcla(np.broadcast_to(sh, m.shape + (3,)), mid, np.clip(0.35 + 0.55 * lado + 0.15 * (1 - alto), 0, 1)[..., None])
    base = mezcla(base, sh, (1 - canal) ** 3 * 0.55)  # surcos entre canales
    spec = suave(0.82, 0.98, canal) * np.clip(0.25 + 0.75 * lado, 0, 1) * (0.5 + 0.5 * (1 - alto))
    base = mezcla(base, hi, spec * 0.6)
    # limas (aristas) claras
    lim = Lz.mascara(lambda P: (P.linea(g["lima_i"], max(1.6, h * 0.05)), P.linea(g["lima_d"], max(1.6, h * 0.05))))
    base = mezcla(base, mezcla(sh, hi, 0.55), lim * 0.8)
    C.pon(base, m)
    if nieve > 0:
        n = desenfoca(Lz.ruido(2.6, seed + 31), 1.5)
        n = (n - n.min()) / (np.ptp(n) + 1e-6)
        franja = suave(g["yr"] + h * 0.75, g["yr"] + h * 0.15, Y)  # más nieve arriba, tejas a la vista abajo
        nm = m * np.clip(suave(0.75 - nieve * 0.45, 0.88 - nieve * 0.45, n * 0.55 + franja * 0.6) * (0.35 + 0.65 * canal), 0, 1)
        nc = mezcla(np.broadcast_to(col("#9fb2d4"), m.shape + (3,)), col("#ffffff"), np.clip(0.35 + 0.65 * lado, 0, 1)[..., None])
        C.pon(nc, nm * min(1.0, nieve * 1.2))
    # canto del alero: banda oscura con remates de tejas (瓦当) brillantes
    t = max(2.0, h * 0.11)
    al = g["alero"]
    banda = Lz.mascara(lambda P: P.poly(al + [(x, y + t) for x, y in al[::-1]]))
    C.pon(canto, banda)
    disco = banda * suave(0.75, 0.95, (np.sin((X - cx) / paso * np.pi) + 1) / 2) * suave(t * 0.15, t * 0.55, Y - np.interp(X, [p[0] for p in al], [p[1] for p in al]))
    C.pon(mezcla(np.broadcast_to(sh, m.shape + (3,)), mid, np.clip(0.3 + 0.7 * lado, 0, 1)[..., None]), disco * 0.9)
    if nieve > 0:
        lab = Lz.mascara(lambda P: P.poly([(x, y - t * 0.9) for x, y in al] + [(x, y + t * 0.15) for x, y in al[::-1]]))
        rng = np.random.default_rng(seed)
        car = Lz.mascara(lambda P: [P.poly([(x - 1.2, y + t * 0.6), (x + 1.2, y + t * 0.6), (x, y + t * 0.6 + rng.uniform(2, 3 + t))])
                                    for x, y in al[2:-2:2] if rng.random() < 0.6])
        C.pon(mezcla(np.broadcast_to(col("#b8c8e4"), m.shape + (3,)), col("#ffffff"), np.clip(0.4 + 0.6 * lado, 0, 1)[..., None]), np.clip(lab + car * 0.85, 0, 1) * min(1.0, nieve * 1.3))
    # cumbrera con 鸱吻 en los extremos
    yr = g["yr"]
    rh = max(2.5, h * 0.13)
    cc = cumbrera_c or teja[1]
    if not redondo and cumbrera_c != "no":
        cm = Lz.mascara(lambda P: (P.rect(cx - rw / 2, yr - rh, cx + rw / 2, yr + rh * 0.4),
                                   P.poly([(cx - rw / 2 - rh * 0.4, yr + rh * 0.4), (cx - rw / 2 - rh * 0.2, yr - rh * 2.6), (cx - rw / 2 + rh * 1.2, yr - rh * 2.9), (cx - rw / 2 + rh * 0.6, yr - rh * 1.6), (cx - rw / 2 + rh * 0.9, yr - rh * 0.6)]),
                                   P.poly([(cx + rw / 2 + rh * 0.4, yr + rh * 0.4), (cx + rw / 2 + rh * 0.2, yr - rh * 2.6), (cx + rw / 2 - rh * 1.2, yr - rh * 2.9), (cx + rw / 2 - rh * 0.6, yr - rh * 1.6), (cx + rw / 2 - rh * 0.9, yr - rh * 0.6)])))
        cuerpo = mezcla(np.broadcast_to(sh, m.shape + (3,)), col(cc), np.clip(0.3 + 0.6 * lado + 0.2 * suave(yr, yr - rh, Y), 0, 1)[..., None])
        C.pon(cuerpo, cm)
        C.pon(hi, borde(cm, 0, -1.5) * 0.7)
        if nieve > 0:
            C.pon("#ffffff", borde(cm, 0, -2.5) * min(1.0, nieve * 1.5))
    # sombra que el alero proyecta debajo
    if sombra_bajo:
        sb = Lz.mascara(lambda P: P.poly([(x, y + t) for x, y in al] + [(x * 0.97 + cx * 0.03, y + t + h * 0.55) for x, y in al[::-1]]))
        C.pon("#1a0c10", desenfoca(sb, 2.5) * 0.45 * (1 - m))
    return g


def cuerpo_salon(Lz, C, cx, y0, y1, w, *, luz=1, rojo=("#5a1218", "#b8282e"), ncol=8, celosia=True, friso=True, oro="#e3b350"):
    """Fachada de un salón: columnas bermellón con volumen, puertas de celosía, friso de ménsulas pintado."""
    X, Y = Lz.X, Lz.Y
    m = ((np.abs(X - cx) < w / 2) & (Y > y0) & (Y < y1)).astype(np.float32)
    lado = _lado(Lz, cx, w * 0.5, luz)
    sh, li = col(rojo[0]), col(rojo[1])
    fondo = mezcla(np.broadcast_to(sh, m.shape + (3,)), li, np.clip(0.25 + 0.5 * lado, 0, 1)[..., None])
    C.pon(fondo, m)
    if celosia:
        # paneles de puertas con celosía dorada oscura
        cel = (((np.abs((X - cx) % 6) < 0.9) | (np.abs((Y - y0) % 6) < 0.9)) & (Y > y0 + (y1 - y0) * 0.22) & (Y < y1 - (y1 - y0) * 0.12)).astype(np.float32)
        C.pon(mezcla(np.broadcast_to(col("#3a0a0c"), m.shape + (3,)), col("#a8742a"), np.clip(0.3 + 0.5 * lado, 0, 1)[..., None]), cel * m * 0.8)
    # columnas
    sep = w / ncol
    for i in range(ncol + 1):
        x = cx - w / 2 + i * sep
        cw = max(2.2, w * 0.022)
        cmask = ((np.abs(X - x) < cw) & (Y > y0) & (Y < y1)).astype(np.float32)
        u = np.clip((X - x) / cw, -1, 1)
        cc = mezcla(np.broadcast_to(col("#3a0a0e"), m.shape + (3,)), col("#e24a3a"), np.clip(0.45 + 0.55 * u * luz, 0, 1)[..., None])
        C.pon(cc, cmask)
    if friso:
        fh = max(3, (y1 - y0) * 0.16)
        fm = ((np.abs(X - cx) < w / 2 + 2) & (Y > y0) & (Y < y0 + fh)).astype(np.float32)
        pat = ((np.sin((X - cx) * 0.9) > 0.2) * 1.0)
        fc = mezcla(np.broadcast_to(col("#1f4f6a"), m.shape + (3,)), col("#3f8f7a"), pat)
        fc = mezcla(fc, col(oro), suave(0.85, 1.0, np.sin((X - cx) * 0.45)) * 0.8)
        fc = mezcla(fc, col("#0c1a24"), 0.25 * (1 - lado))
        C.pon(fc, fm)
    # zócalo
    C.pon("#2a0a0c", ((np.abs(X - cx) < w / 2) & (Y > y1 - 3) & (Y < y1)).astype(np.float32) * 0.8)
    return m


def terraza(Lz, C, cx, ybase, anchos, alto, *, luz=1, marmol=("#9aa8c0", "#f4f2ee"), nieve=0.0, escalera=True, redonda=False, elipse=0.0):
    """Terraza de mármol de varios niveles (须弥座) con balaustrada; devuelve la y de su cara superior."""
    X, Y = Lz.X, Lz.Y
    y = ybase
    sh, li = col(marmol[0]), col(marmol[1])
    for k, w in enumerate(anchos):
        y_top = y - alto
        if redonda:
            e = elipse * w / 2
            cara = ((np.abs(X - cx) < w / 2) & (Y > y_top + e * np.sqrt(np.clip(1 - ((X - cx) / (w / 2)) ** 2, 0, 1)) - 0.5) & (Y < y + e * np.sqrt(np.clip(1 - ((X - cx) / (w / 2)) ** 2, 0, 1)))).astype(np.float32)
            tapa = (((X - cx) / (w / 2)) ** 2 + ((Y - y_top) / max(e, 1)) ** 2 < 1).astype(np.float32)
            u = np.clip((X - cx) / (w / 2), -1, 1)
            cc = mezcla(np.broadcast_to(sh, X.shape + (3,)), li, np.clip(0.45 + 0.5 * u * luz, 0, 1)[..., None])
        else:
            cara = ((np.abs(X - cx) < w / 2) & (Y > y_top) & (Y < y)).astype(np.float32)
            tapa = None
            cc = mezcla(np.broadcast_to(sh, X.shape + (3,)), li, np.clip(0.35 + 0.45 * _lado(Lz, cx, w / 2, luz), 0, 1)[..., None])
        cc = mezcla(cc, sh, suave(y_top + alto * 0.55, y, Y) * 0.35)
        # moldura superior y pilares de la balaustrada
        post = (((X - cx) % max(5, w / 26)) < 1.6).astype(np.float32)
        cc = mezcla(cc, sh, post * suave(y_top + alto * 0.15, y_top + alto * 0.5, Y) * 0.4)
        C.pon(cc, cara)
        if tapa is not None:
            C.pon(mezcla(np.broadcast_to(li, X.shape + (3,)), col("#ffffff"), 0.5 if nieve else 0.2), tapa)
        # balaustrada encima
        bh = alto * 0.55
        bal = ((np.abs(X - cx) < w / 2 - 1) & (Y > y_top - bh) & (Y < y_top) & ((((X - cx) % max(5, w / 26)) < 1.8) | (np.abs(Y - (y_top - bh * 0.85)) < 0.9))).astype(np.float32)
        if redonda:
            bal = bal * 0  # en las redondas la balaustrada se ve como un filete claro
            C.pon(li, ((np.abs(X - cx) < w / 2) & (np.abs(Y - y_top + 0.5) < 1.2)).astype(np.float32) * 0.8)
        C.pon(mezcla(np.broadcast_to(sh, X.shape + (3,)), li, 0.7), bal)
        if nieve:
            C.pon("#ffffff", ((np.abs(X - cx) < w / 2) & (np.abs(Y - (y_top - bh)) < 1.4)).astype(np.float32) * nieve)
            C.pon("#ffffff", ((np.abs(X - cx) < w / 2 + 1) & (np.abs(Y - y_top) < 1.6)).astype(np.float32) * nieve)
        y = y_top
    if escalera:
        we = anchos[0] * 0.16
        esc = Lz.mascara(lambda P: P.poly([(cx - we * 0.7, y), (cx + we * 0.7, y), (cx + we, ybase), (cx - we, ybase)]))
        pel = ((Y % 3) < 1.1).astype(np.float32)
        ec = mezcla(np.broadcast_to(li, X.shape + (3,)), sh, pel * 0.45)
        C.pon(ec, esc)
        if nieve:
            C.pon("#ffffff", esc * (1 - pel) * nieve * 0.6)
    return y


def salon(ancho, *, alto_muro=None, alto_tejado=None, aleros=1, luz=1, teja=("#7a4a10", "#f2c14e", "#fff1b0"), nieve=0.0,
          terrazas=2, marmol=("#9aa8c0", "#f4f2ee"), rojo=("#5a1218", "#b8282e"), seed=0, ncol=8, escorzo=1.0):
    """Salón imperial completo en un parche. Devuelve (capa, (x_base_centro, y_base))."""
    am = alto_muro or ancho * 0.22
    at = alto_tejado or ancho * 0.2
    alto_terr = ancho * 0.045
    h = int(alto_terr * terrazas + am * (1.0 + 0.75 * (aleros - 1)) + at * (1 + 0.85 * (aleros - 1)) + ancho * 0.12) + 10
    w = int(ancho * 1.32) + 10
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    cx = w / 2
    yb = h - 2
    anchos = [ancho * (1.08 - 0.07 * k) for k in range(terrazas)]
    y = terraza(Lz, C, cx, yb, anchos, alto_terr, luz=luz, marmol=marmol, nieve=nieve)
    sombra_c = np.zeros((h, w), np.float32)
    # cuerpo inferior
    wb = ancho * 0.86
    yb_cuerpo = y
    y_te = y - am
    d3 = ancho * 0.07 * escorzo
    lado = -luz
    if escorzo:
        xe = cx + lado * wb / 2
        lat = Lz.mascara(lambda P: P.poly([(xe, y_te), (xe + lado * d3, y_te - d3 * 0.45), (xe + lado * d3, y - d3 * 0.45), (xe, y)]))
        lc = mezcla(np.broadcast_to(col(rojo[0]), lat.shape + (3,)), col(rojo[1]), 0.18)
        lc = mezcla(lc, col("#1a0408"), ((np.abs(Lz.X - xe - lado * d3 * 0.5) < 1.2) * 0.6)[..., None])
        C.pon(lc, lat)
    cuerpo_salon(Lz, C, cx, y_te, y, wb, luz=luz, rojo=rojo, ncol=ncol)
    # tejado(s)
    ye = y_te + am * 0.08
    wt = ancho * 1.18
    C.info = {"aleros": [], "cuerpo": (cx - wb / 2, y_te, cx + wb / 2, yb_cuerpo)}
    def faldon(ye_, wt_, at_, lift_, rw_):
        if not escorzo:
            return
        g = tejado_geo(cx, ye_, wt_, at_, lift_, rw_)
        tip = (cx + lado * wt_ / 2, ye_ - lift_)
        cum = (cx + lado * rw_ / 2, g["yr"])
        pts = [cum, (cum[0] + lado * d3 * 0.9, cum[1] - d3 * 0.45), (tip[0] + lado * d3 * 0.8, tip[1] - d3 * 0.5), tip]
        fm = Lz.mascara(lambda P: P.poly(pts + [(cx + lado * wt_ * 0.3, ye_)]))
        canal = (np.sin(Lz.Y * 1.6 + Lz.X * 0.5) + 1) / 2
        fc = mezcla(np.broadcast_to(col(teja[0]), fm.shape + (3,)), col(teja[1]), (0.12 + 0.15 * canal)[..., None])
        if nieve:
            fc = mezcla(fc, col("#7a8ab0"), nieve * 0.35)
        C.pon(fc, fm)
    for k in range(aleros):
        C.info["aleros"].append((ye, wt))
        faldon(ye, wt * (1 if k == aleros - 1 else 1), at if k == aleros - 1 else at * 0.62, (at * 0.42) if k == aleros - 1 else at * 0.3, wt * (0.5 if k == aleros - 1 else 0.78))
        if k < aleros - 1:
            # alero inferior (faldón) y cuerpo superior más estrecho
            pinta_tejado(Lz, C, cx, ye, wt, at * 0.62, luz=luz, teja=teja, rw=wt * 0.78, lift=at * 0.3, nieve=nieve, seed=seed + k, cumbrera_c="no")
            wb2 = wb * 0.72
            y1 = ye - at * 0.62 + at * 0.18
            y0 = y1 - am * 0.55
            cuerpo_salon(Lz, C, cx, y0, y1, wb2, luz=luz, rojo=rojo, ncol=max(4, ncol - 2), celosia=False)
            ye = y0 + am * 0.06
            wt = wt * 0.86
        else:
            pinta_tejado(Lz, C, cx, ye, wt, at, luz=luz, teja=teja, nieve=nieve, seed=seed + k + 7)
    return C, (cx, yb)


# ====================================================================== Templo del Cielo (祈年殿)
def templo_cielo(ancho, *, luz=1, nieve=0.0, azul=("#16306e", "#3f6fc4", "#b8d4ff"), seed=0):
    w = int(ancho * 1.5)
    h = int(ancho * 1.62)
    Lz = Lienzo(w, h)
    C = Capa(Lz)
    cx = w / 2
    X, Y = Lz.X, Lz.Y
    # tres terrazas redondas de mármol (vistas un poco desde arriba)
    y = h - 4 - ancho * 0.06
    y = terraza(Lz, C, cx, y, [ancho * 1.42, ancho * 1.24, ancho * 1.06], ancho * 0.06, luz=luz, nieve=nieve, redonda=True, elipse=0.12, escalera=False)
    # escalera central
    esc = Lz.mascara(lambda P: P.poly([(cx - ancho * 0.08, y + 2), (cx + ancho * 0.08, y + 2), (cx + ancho * 0.12, h - 2), (cx - ancho * 0.12, h - 2)]))
    C.pon(mezcla(np.broadcast_to(col("#eef0f4"), X.shape + (3,)), col("#9aa8c0"), ((Y % 3) < 1.1) * 0.5), esc)
    wd = ancho * 0.66
    tiers = [(wd, ancho * 0.2, ancho * 0.96), (wd * 0.86, ancho * 0.15, ancho * 0.8), (wd * 0.72, ancho * 0.13, ancho * 0.62)]
    for k, (wdr, hd, wr) in enumerate(tiers):
        # tambor rojo con columnas
        y0 = y - hd
        u = np.clip((X - cx) / (wdr / 2), -1, 1)
        e = wdr * 0.06
        curva = e * np.sqrt(np.clip(1 - u ** 2, 0, 1))
        tm = ((np.abs(X - cx) < wdr / 2) & (Y > y0 + curva - e) & (Y < y + curva)).astype(np.float32)
        th = np.arcsin(np.clip(u, -0.999, 0.999))
        colum = (np.cos(th * 9) > 0.55).astype(np.float32)
        tc = mezcla(np.broadcast_to(col("#4a0c10"), X.shape + (3,)), col("#d23a2e"), np.clip(0.4 + 0.55 * u * luz, 0, 1)[..., None])
        tc = mezcla(tc, col("#2a0608"), (1 - colum) * 0.35)
        tc = mezcla(tc, col("#a8742a"), (((Y - y0) % 5) < 1) * (1 - colum) * 0.4)
        fr_ = suave(y0 + hd * 0.22, y0 + hd * 0.18, Y - curva + e)
        tc = mezcla(tc, mezcla(np.broadcast_to(col("#1f4f6a"), X.shape + (3,)), col("#3f9f8a"), (np.cos(th * 30) > 0) * 1.0), fr_ * 0.9)
        tc = mezcla(tc, col("#120408"), np.clip(1 - np.abs(u), 0, 1) ** 8 * 0 + np.abs(u) ** 6 * 0.5)
        C.pon(tc, tm)
        # tejado redondo
        hr = hd * (1.25 if k == 0 else 1.15)
        ye = y0 + e * 0.6
        pinta_tejado(Lz, C, cx, ye, wr, hr, luz=luz, teja=azul, lift=hr * 0.18, rw=wr * 0.34 if k < 2 else wr * 0.12, nieve=nieve, seed=seed + k, redondo=True, canto="#0c1430")
        y = ye - hr * 0.78
    # remate dorado
    rm = Lz.mascara(lambda P: (P.elip(cx, y - ancho * 0.035, ancho * 0.04, ancho * 0.035), P.poly([(cx - ancho * 0.012, y - ancho * 0.06), (cx + ancho * 0.012, y - ancho * 0.06), (cx, y - ancho * 0.15)]),
                               P.poly([(cx - ancho * 0.07, y + 2), (cx + ancho * 0.07, y + 2), (cx + ancho * 0.03, y - ancho * 0.03), (cx - ancho * 0.03, y - ancho * 0.03)])))
    C.pon(mezcla(np.broadcast_to(col("#8a5a10"), X.shape + (3,)), col("#ffe08a"), volumen(rm, 3, -luz, 1)[..., None]), rm)
    return C, (cx, h - 4)


# ====================================================================== Gran Muralla
def muralla(C, pts, *, luz=1, alto=14, grosor=6, nieve=0.6, torres=(), piedra=("#5c5468", "#c9b49a"), aire=None, aire_f=0.0, seed=0, escala=1.0):
    """La Gran Muralla siguiendo una cresta: adarve (visto desde arriba), cara de ladrillo, almenas y torres."""
    L = C.L
    X, Y = L.X, L.Y
    pts = [(float(x), float(y)) for x, y in pts]
    xs = np.array([p[0] for p in pts], np.float32)
    ys = np.array([p[1] for p in pts], np.float32)
    # cara frontal: de la línea del adarve hacia abajo
    cara = L.mascara(lambda P: P.poly(pts + [(x, y + alto) for x, y in pts[::-1]]))
    adarve = L.mascara(lambda P: P.poly([(x, y - grosor) for x, y in pts] + pts[::-1]))
    almenas = L.mascara(lambda P: [P.rect(x - 1.3 * escala, y - grosor - 3.4 * escala, x + 1.3 * escala, y - grosor + 0.4)
                                   for i, (x, y) in enumerate(spline(pts, 6)) if i % 3 == 0] +
                        [P.rect(x - 1.3 * escala, y - 3.0 * escala, x + 1.3 * escala, y + 0.5) for i, (x, y) in enumerate(spline(pts, 6)) if i % 3 == 1])
    # pendiente local → la cara mira más o menos al sol
    pend = np.gradient(ys) / (np.gradient(xs) + 1e-3)
    pend_x = np.interp(X, xs, desenfoca(np.tile(pend[None, :], (3, 1)), 2)[1])
    lit = np.clip(0.55 + 0.35 * np.tanh(-pend_x * luz * 1.5), 0.1, 1)
    fila = np.floor(Y / (2.2 * escala))
    ladr = ((((X + (fila % 2) * 2.5 * escala) % (5 * escala)) < 0.7) | ((Y % (2.2 * escala)) < 0.55)).astype(np.float32)
    cc = mezcla(np.broadcast_to(col(piedra[0]), X.shape + (3,)), col(piedra[1]), lit[..., None])
    cc = mezcla(cc, col(piedra[0]), ladr * 0.35)
    cc = mezcla(cc, col("#2a2236"), suave(0, alto, Y - np.interp(X, xs, ys)) * 0.3)
    if aire:
        cc = mezcla(cc, col(aire), aire_f)
    C.pon(cc, cara)
    ac = mezcla(np.broadcast_to(col("#b9aa92"), X.shape + (3,)), col("#fff4e0"), lit[..., None])
    if nieve:
        nn = L.ruido(1.2, seed + 4)
        ac = mezcla(ac, mezcla(np.broadcast_to(col("#b4c4e0"), X.shape + (3,)), col("#ffffff"), lit[..., None]), np.clip(nieve * (0.6 + 0.6 * nn), 0, 1))
    if aire:
        ac = mezcla(ac, col(aire), aire_f)
    C.pon(ac, adarve)
    alc = mezcla(np.broadcast_to(col(piedra[0]), X.shape + (3,)), col(piedra[1]), lit[..., None] * 0.9)
    if aire:
        alc = mezcla(alc, col(aire), aire_f)
    C.pon(alc, almenas)
    if nieve:
        C.pon("#ffffff", borde(almenas, 0, -1.2) * nieve)
    # torres de vigía
    for tx in torres:
        i = int(np.argmin(np.abs(xs - tx)))
        x0, y0 = xs[i], ys[i]
        tw, th = 11 * escala, 16 * escala
        f = L.mascara(lambda P: P.rect(x0 - tw, y0 - th, x0 + tw, y0 + alto * 0.9))
        lat = L.mascara(lambda P: P.poly([(x0 - luz * tw, y0 - th), (x0 - luz * (tw + 4 * escala), y0 - th + 2 * escala), (x0 - luz * (tw + 4 * escala), y0 + alto * 0.9 + 1), (x0 - luz * tw, y0 + alto * 0.9)]))
        fc = mezcla(np.broadcast_to(col(piedra[0]), X.shape + (3,)), col(piedra[1]), 0.8)
        fc = mezcla(fc, col(piedra[0]), ladr * 0.3)
        fc = mezcla(fc, col("#2a2236"), suave(y0 - th, y0 + alto, Y) * 0.25)
        if aire:
            fc = mezcla(fc, col(aire), aire_f)
        C.pon(fc, f)
        lc = mezcla(np.broadcast_to(col("#3a3450"), X.shape + (3,)), col(piedra[0]), 0.4)
        if aire:
            lc = mezcla(lc, col(aire), aire_f)
        C.pon(lc, lat)
        # ventanas en arco
        ven = L.mascara(lambda P: [(P.rect(x0 + dx - 1.6 * escala, y0 - th * 0.55, x0 + dx + 1.6 * escala, y0 - th * 0.2), P.elip(x0 + dx, y0 - th * 0.55, 1.6 * escala, 1.6 * escala)) for dx in (-6 * escala, 0, 6 * escala)])
        C.pon("#1c1622", ven)
        alm = L.mascara(lambda P: [P.rect(x0 + dx - 1.5 * escala, y0 - th - 3 * escala, x0 + dx + 1.5 * escala, y0 - th + 0.5) for dx in np.arange(-tw + 1.5 * escala, tw, 4.4 * escala)])
        C.pon(fc if not aire else mezcla(fc, col(aire), 0), alm)
        if nieve:
            C.pon("#ffffff", np.clip(borde(np.clip(f + alm, 0, 1), 0, -1.5) * 1.0, 0, 1) * nieve)
            C.pon("#ffffff", L.mascara(lambda P: P.rect(x0 - tw, y0 - th - 0.5, x0 + tw, y0 - th + 1.2)) * nieve)


# ====================================================================== árboles
def pinos(C, lista, *, luz=1, verde=("#0f2a26", "#3f6a52"), nieve=("#9fb2d4", "#ffffff"), carga=0.8, aire=None, aire_y=None, seed=0, tronco="#3a2a22"):
    """Pinos nevados: pisos de ramas caídas con puntas, nieve sobre cada piso y volumen con la luz clave.
    lista: [(x, y_base, alto)]. aire = (color, y_lejos, y_cerca, f_max): perspectiva aérea según la altura."""
    L = C.L
    rng = np.random.default_rng(seed)
    formas = []
    for x, y, h in lista:
        pisos = int(np.clip(h / 9, 4, 8))
        tiers = []
        for k in range(pisos):
            t = k / (pisos - 1)
            wk = h * (0.36 - 0.27 * t) * rng.uniform(0.85, 1.15)
            yk = y - h * 0.12 - t * h * 0.78
            hk = h * 0.3 * (1 - 0.35 * t)
            dro = hk * rng.uniform(0.12, 0.3)
            tiers.append((wk, yk, hk, dro, rng.uniform(-0.15, 0.15)))
        formas.append((x, y, h, tiers))

    def dib_follaje(P):
        for x, y, h, tiers in formas:
            P.rect(x - h * 0.025, y - h * 0.3, x + h * 0.025, y)
            for wk, yk, hk, dro, sk in tiers:
                izq = (x - wk, yk + dro)
                der = (x + wk, yk + dro * 0.8)
                top = (x + sk * wk * 0.2, yk - hk)
                up_i = bz(izq, (x - wk * 0.55, yk - hk * 0.15), (x - wk * 0.2, yk - hk * 0.65), top, 10)
                up_d = bz(top, (x + wk * 0.2, yk - hk * 0.65), (x + wk * 0.55, yk - hk * 0.15), der, 10)
                n = max(4, int(wk / 3))
                abajo = []
                for i in range(n + 1):
                    tt = 1 - i / n
                    xx = x - wk + 2 * wk * tt
                    yy = yk + dro * (0.8 + 0.2 * tt) - (hk * 0.12 if i % 2 else 0) - abs(tt - 0.5) * 0
                    abajo.append((xx, yy))
                P.poly(up_i + up_d[1:] + abajo)

    def dib_nieve(P):
        for x, y, h, tiers in formas:
            for wk, yk, hk, dro, sk in tiers:
                top = (x + sk * wk * 0.2, yk - hk)
                a = 0.86
                izq = (x - wk * a, yk + dro * 0.6 - hk * 0.1)
                der = (x + wk * a, yk + dro * 0.5 - hk * 0.1)
                up_i = bz(izq, (x - wk * 0.5, yk - hk * 0.22), (x - wk * 0.18, yk - hk * 0.7), top, 8)
                up_d = bz(top, (x + wk * 0.18, yk - hk * 0.7), (x + wk * 0.5, yk - hk * 0.22), der, 8)
                ond = [(x + wk * a - 2 * wk * a * t, yk - hk * (0.18 + 0.12 * np.sin(t * 9 + wk)) + dro * 0.3) for t in np.linspace(0, 1, 9)]
                P.poly(up_i + up_d[1:] + ond)

    m = L.mascara(dib_follaje)
    n = L.mascara(dib_nieve) * m
    v = volumen(m, 2.5, -luz * 0.8, 0.6, 1.0)
    fc = mezcla(np.broadcast_to(col(verde[0]), m.shape + (3,)), col(verde[1]), np.clip(v * 1.1, 0, 1)[..., None])
    fc = mezcla(fc, col(verde[0]), oclusion(m, 3, 0.3)[..., None] * 0.5)
    nv = np.clip(n * carga * (0.75 + 0.5 * L.ruido(1.0, seed + 9)), 0, 1)
    nc = mezcla(np.broadcast_to(col(nieve[0]), m.shape + (3,)), col(nieve[1]), np.clip(v * 1.3, 0, 1)[..., None])
    fc = mezcla(fc, nc, nv)
    fc = mezcla(fc, col("#fff3dc"), borde(m, luz * 1.5, -1.0) * 0.5)
    if aire:
        ac, y_l, y_c, fmax = aire
        fc = mezcla(fc, col(ac), np.clip(suave(y_c, y_l, L.Y) * fmax, 0, 1))
    C.pon(fc, m)
    return m
