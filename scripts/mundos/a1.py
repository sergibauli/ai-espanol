"""A1 · Pekín nevado. Sol bajo de invierno a la derecha (luz cálida dorada, sombras azules).
Planos: cielo · cumbres lejanas · cordillera con la Gran Muralla · ciudad (Templo del Cielo, hutongs, Ciudad
Prohibida) sobre la llanura nevada · torre de esquina con farolillos y pinos · ramas nevadas en primer plano.
Piezas animadas: humo de chimeneas, banderas, farolillos, destellos del sol en la nieve y grullas."""
import numpy as np

import arquitectura as ar
import sprites as sp
from pincel import (H, W, sombra_de, nube_suelta, marco_hojas, Capa, Lienzo, Mundo, borde, bz, cirros, col, cielo, desenfoca, desplaza, mezcla, niebla, nube, oclusion,
                    perfil_picos, ruido1, sierra, sombra_elipse, spline, suave, volumen)

LUZ = 1
SOL = (820, 380)


def llanura_nieve(C, y0, seed, sol_x=SOL[0], tope=None):
    """Llanura nevada: blanco cálido al sol, ventisqueros con volumen, surcos azulados y sombras que se alargan."""
    L = C.L
    X, Y = L.X, L.Y
    prof = np.clip((Y - y0) / (H - y0), 0, 1)
    base = mezcla(np.broadcast_to(col("#f6efe6"), (L.h, L.w, 3)), col("#dfe6f0"), prof[..., None] * 0.8)
    # ventisqueros grandes (relieve suave iluminado desde la derecha)
    rel = desenfoca(L.ruido(2.8, seed, aniso=(3.5, 1.0)), 4)
    gy, gx = np.gradient(rel)
    il = np.clip(0.5 + (gx * LUZ * 90 - gy * 40) * (0.4 + prof), 0, 1)
    base = mezcla(base, col("#a9bbd8"), (1 - il)[..., None] * 0.55)
    base = mezcla(base, col("#fff6e6"), suave(0.6, 1.0, il)[..., None] * 0.6)
    # surcos de viento (sastrugi) finos
    sas = L.ruido(2.0, seed + 4, aniso=(8.0, 1.0))
    base = mezcla(base, col("#b7c6de"), (suave(0.62, 0.8, sas) * (0.25 + 0.4 * prof))[..., None])
    # calor del sol bajo que barre desde la derecha
    base = mezcla(base, col("#ffe2bd"), (suave(300, 1050, X) * suave(1300, y0, Y) * 0.32)[..., None])
    a = suave(y0 - 8, y0 + 18, Y) if tope is None else tope
    C.pon(base, a)


def rama_pino(C, pts, grosor, seed, luz=LUZ):
    """Rama de pino cargada de nieve (primer plano): madera, agujas en abanico y nieve encima."""
    L = C.L
    rng = np.random.default_rng(seed)
    curva = spline(pts, 14)
    agujas = []
    for i in range(2, len(curva) - 1, 2):
        x, y = curva[i]
        t = i / len(curva)
        largo = grosor * (3.2 - 1.6 * t) * rng.uniform(0.8, 1.2)
        for k in range(9):
            a = -np.pi / 2 + (k - 4) * 0.33 + rng.uniform(-0.1, 0.1)
            agujas.append(((x, y), (x + np.cos(a) * largo * 0.9, y + np.sin(a) * largo * 0.35 + largo * 0.55)))
    hojas = L.mascara(lambda P: [P.linea([a, b], 1.6) for a, b in agujas])
    madera = L.mascara(lambda P: P.trazo(curva, grosor, grosor * 0.35))
    nieve = L.mascara(lambda P: [P.elip(x + rng.uniform(-3, 3), y - grosor * 0.6, grosor * rng.uniform(1.6, 2.6), grosor * rng.uniform(0.8, 1.2)) for x, y in curva[1:-2:2]])
    nieve = np.clip(nieve * np.clip(hojas + madera, 0, 1) * 1.6 + nieve * 0.7, 0, 1)
    C.pon(mezcla(np.broadcast_to(col("#0b1f1c"), hojas.shape + (3,)), col("#3c6650"), volumen(hojas, 4, -luz, 0.8)[..., None]), hojas)
    C.pon(mezcla(np.broadcast_to(col("#2a1a14"), hojas.shape + (3,)), col("#7a5a44"), volumen(madera, 3, -luz, 1)[..., None]), madera)
    C.pon(mezcla(np.broadcast_to(col("#a6b6d4"), hojas.shape + (3,)), col("#ffffff"), np.clip(volumen(nieve, 4, -luz * 0.6, 1, 1.2) * 1.2, 0, 1)[..., None]), nieve)


def casas_hutong(C, casas, seed=0):
    """Casas de patio (四合院) de tejado gris cubiertas de nieve; devuelve las chimeneas (x, y)."""
    chimeneas = []
    for i, (cx, base, w) in enumerate(casas):
        Lz = Lienzo(int(w * 1.4), int(w * 0.75))
        P = Capa(Lz)
        x0 = Lz.w / 2
        yb = Lz.h - 2
        hm = w * 0.2
        ar.cuerpo_salon(Lz, P, x0, yb - hm, yb, w * 0.9, luz=LUZ, rojo=("#4a4a56", "#9a96a0"), ncol=4, celosia=False, friso=False)
        # puerta roja y ventana cálida
        P.pon("#8f1a1c", ((np.abs(Lz.X - x0) < w * 0.06) & (Lz.Y > yb - hm * 0.8)).astype(np.float32))
        P.pon("#ffcf7a", ((np.abs(Lz.X - x0 - w * 0.25) < w * 0.05) & (np.abs(Lz.Y - (yb - hm * 0.55)) < hm * 0.16)).astype(np.float32) * 0.85)
        ar.pinta_tejado(Lz, P, x0, yb - hm + 1, w * 1.1, w * 0.2, luz=LUZ, teja=("#2a2e38", "#646a7a", "#a8b2c4"), rw=w * 0.85, lift=w * 0.05, nieve=0.85, seed=seed + i, cumbrera_c="#565c6c")
        chx = x0 + w * (0.3 if i % 2 else -0.28)
        cm = ((np.abs(Lz.X - chx) < 2.6) & (Lz.Y > yb - hm - w * 0.24) & (Lz.Y < yb - hm - w * 0.08)).astype(np.float32)
        P.pon("#5a4a44", cm)
        P.pon("#ffffff", ((np.abs(Lz.X - chx) < 3.2) & (np.abs(Lz.Y - (yb - hm - w * 0.24)) < 1.2)).astype(np.float32))
        ox, oy = cx - x0, base - yb
        C.pega(P, ox, oy)
        chimeneas.append((chx + ox, yb - hm - w * 0.24 + oy))
    return chimeneas


def pinta(M):
    print("A1 · Pekín nevado")
    L = Lienzo(W, H)
    X, Y = L.X, L.Y
    sx, sy = SOL

    # ------------------------------------------------------------ 0 · cielo
    C = Capa(L, cielo(L, [(0, "#24457a"), (0.1, "#3f679d"), (0.2, "#86a6cc"), (0.28, "#c4d3e3"), (0.33, "#efdcc6"), (0.4, "#fbe9d4"), (0.55, "#f1eee9"), (1, "#e8edf3")],
                      sol=(sx, sy, 30, "#ffd9a0", 0.95), halo=(sx, sy + 40, 620, 240, "#ffcf98", 0.42)))
    cirros(C, 60, 260, "#eef2fa", 0.45, 5)
    cirros(C, 300, 380, "#ffe6c8", 0.35, 6, aniso=(12.0, 1.0))
    for i, (cx, cy, w, h, op) in enumerate([(150, 330, 360, 150, 1), (560, 250, 280, 100, 0.95), (1000, 300, 340, 140, 1), (360, 455, 420, 80, 0.9),
                                            (760, 490, 300, 60, 0.85), (1080, 500, 240, 70, 0.9), (60, 520, 200, 50, 0.8)]):
        nube(C, cx, cy, w, h, 40 + i, (sx, sy), "#fff0dc", "#8a9ac0", "#ffe2b0", base_c="#b4a8c0", op=op, rim=0.7)
    niebla(C, 540, 80, "#f8ece0", 0.55, 11)
    M.capa("cielo", C, 0.06, q=80)

    # ------------------------------------------------------------ 1 · cumbres lejanas
    C = Capa(L)
    pf = perfil_picos(L, [(-10, 540, 190), (120, 500, 120), (250, 455, 230), (400, 520, 110), (560, 500, 200), (700, 545, 120), (830, 430, 250), (960, 505, 130), (1110, 480, 200)],
                      forma="cordal", rug=34, seed=3, base=770)
    sierra(C, pf, 770, luz=LUZ, lit="#f6dcbc", sombra="#4b5d90", nieve=("#fff6e8", "#8296c2", 0.55), aire="#c9d4e6", aire_f=0.2, filo=1.0, filo_c="#fff0d0",
           niebla_pie=("#eef1f5", 170, 0.95), seed=3, estrias=1.6)
    pf2 = perfil_picos(L, [(90, 600, 160), (300, 585, 190), (500, 625, 150), (720, 575, 200), (930, 615, 170), (1100, 590, 160)], forma="cordal", rug=22, seed=5, base=820)
    sierra(C, pf2, 820, luz=LUZ, lit="#ecd0ae", sombra="#46588a", nieve=("#fff8ee", "#7c90bc", 0.5), aire="#d5dde9", aire_f=0.16, filo=0.9,
           niebla_pie=("#f0f2f5", 130, 0.95), seed=5, estrias=1.6)
    C.tiñe("#ffe2bc", np.exp(-(((X - sx) / 420) ** 2 + ((Y - sy - 120) / 300) ** 2)) * 0.45)
    M.capa("lejos", C, 0.16)

    # ------------------------------------------------------------ 2 · cordillera con la Gran Muralla
    C = Capa(L)
    pf = perfil_picos(L, [(-40, 700, 260), (230, 660, 280), (520, 715, 240), (760, 650, 280), (1080, 690, 260)], forma="loma", rug=8, seed=7, base=940)
    sierra(C, pf, 940, luz=LUZ, lit="#d9bfa2", sombra="#465884", nieve=("#fffaf2", "#a6b9d8", 0.3), aire="#dde4ee", aire_f=0.06, filo=1.0,
           niebla_pie=("#f1f3f6", 130, 0.9), seed=7, estrias=1.8)
    # muralla por la cresta (perfil suavizado, un poco por debajo del filo)
    ps = desenfoca(np.tile(pf[None, :], (3, 1)), 14)[1]
    pts = [(x, float(ps[min(W - 1, x)]) + 7) for x in range(0, W, 6)]
    ar.muralla(C, pts, luz=LUZ, alto=11, grosor=5, nieve=0.75, torres=(95, 270, 455, 640, 830, 1010), aire="#dfe5ee", aire_f=0.12, seed=7, escala=0.95)
    # bosques de pinos en las laderas
    rng = np.random.default_rng(17)
    lista = []
    for _ in range(900):
        x = rng.uniform(0, W)
        y0 = ps[int(x)] + 18 + rng.uniform(0, 1) ** 0.7 * 230
        if y0 > 930:
            continue
        lista.append((x, y0, rng.uniform(12, 22) * (0.75 + (y0 - 620) / 500)))
    lista.sort(key=lambda a: a[1])
    ar.pinos(C, lista, luz=LUZ, verde=("#1d3434", "#55705f"), carga=0.85, aire=("#dce3ee", 650, 930, 0.45), seed=17)
    niebla(C, 905, 40, "#f3f5f8", 0.85, 19)
    # grullas en el aire, delante de la cordillera
    C.tiñe("#ffe6c4", np.exp(-(((X - sx) / 380) ** 2 + ((Y - sy - 300) / 320) ** 2)) * 0.3)
    M.capa("cordillera", C, 0.3)

    # ------------------------------------------------------------ 3 · ciudad sobre la llanura nevada
    C = Capa(L)
    llanura_nieve(C, 905, 23)
    niebla(C, 905, 26, "#f6f4f1", 0.8, 25)
    # Templo del Cielo sobre su terraza, rodeado de cipreses
    tc, (bx, by) = ar.templo_cielo(128, luz=LUZ, nieve=0.55, seed=3)
    tx, ty = 300, 955
    sombra_elipse(C, tx - 40 * LUZ, ty - 6, 170, 16, "#5a6a90", 0.35)
    ar.pinos(C, [(tx + dx, ty - 8 + abs(dx) * 0.02, rng.uniform(28, 44)) for dx in (-150, -120, -96, 92, 118, 146, 175)], luz=LUZ, verde=("#14292a", "#4a6a58"), carga=0.7, seed=31)
    sombra_de(C, tc, tx - bx, ty - by, LUZ, largo=1.1, aplasta=0.25)
    C.pega(tc, tx - bx, ty - by)
    # hutongs con chimeneas en el centro
    casas = [(470, 958, 70), (560, 952, 84), (650, 960, 66), (520, 990, 78), (610, 996, 72), (420, 996, 64)]
    chimeneas = casas_hutong(C, casas, seed=50)
    # Ciudad Prohibida: muralla bermellón con albardilla amarilla, salón principal y puerta
    sal, (sbx, sby) = ar.salon(220, aleros=2, luz=LUZ, nieve=0.6, seed=9, ncol=9)
    sombra_de(C, sal, 865 - sbx, 932 - sby, LUZ, largo=1.1, aplasta=0.22)
    C.pega(sal, 865 - sbx, 932 - sby)
    pu, (pbx, pby) = ar.salon(118, aleros=2, luz=LUZ, nieve=0.6, seed=12, terrazas=1, ncol=5)
    muro = ((X > 690) & (Y > 942) & (Y < 978)).astype(np.float32)
    mc = mezcla(np.broadcast_to(col("#5a1418"), (H, W, 3)), col("#b8322e"), (0.3 + 0.5 * suave(690, 1100, X))[..., None])
    mc = mezcla(mc, col("#3a0a0e"), suave(950, 978, Y)[..., None] * 0.3)
    C.pon(mc, muro)
    alb = ((X > 686) & (Y > 936) & (Y < 945)).astype(np.float32)
    C.pon(mezcla(np.broadcast_to(col("#a0661a"), (H, W, 3)), col("#f2c14e"), (((X % 4) < 2) * 0.5 + 0.3)[..., None]), alb)
    C.pon("#ffffff", ((X > 686) & (Y > 934) & (Y < 939)).astype(np.float32) * 0.95)
    sombra_de(C, pu, 760 - pbx, 982 - pby, LUZ, largo=1.1, aplasta=0.25)
    C.pega(pu, 760 - pbx, 982 - pby)
    sombra_elipse(C, 760 - 30, 984, 120, 8, "#5a6a90", 0.4)
    # árboles desnudos con escarcha junto a los muros
    ar.pinos(C, [(x, 985 + (x % 3) * 4, rng.uniform(30, 46)) for x in (660, 700, 850, 930, 990, 1050)], luz=LUZ, verde=("#14292a", "#4a6a58"), carga=0.8, seed=41)
    rio = L.mascara(lambda P: P.poly(spline([(-10, 1046), (300, 1040), (600, 1052), (900, 1044), (1110, 1050)], 10) + spline([(1110, 1070), (900, 1064), (600, 1074), (300, 1062), (-10, 1068)], 10)))
    hielo = mezcla(np.broadcast_to(col("#9db3d6"), (H, W, 3)), col("#e8f0fa"), suave(0.35, 0.8, L.ruido(1.2, 29, aniso=(8.0, 1.0)))[..., None])
    hielo = mezcla(hielo, col("#ffe6c4"), (suave(400, 1000, X) * 0.3)[..., None])
    C.pon(hielo, rio)
    C.pon("#6f80a8", borde(rio, 0, -3, 1.0) * 0.6)
    for bx_ in (180, 470, 930):
        pt = L.mascara(lambda P: (P.poly(spline([(bx_ - 46, 1066), (bx_ - 30, 1046), (bx_, 1038), (bx_ + 30, 1046), (bx_ + 46, 1066)], 6) + [(bx_ + 46, 1072), (bx_ - 46, 1072)])))
        arco = L.mascara(lambda P: P.elip(bx_, 1072, 16, 14))
        pc_ = mezcla(np.broadcast_to(col("#a9b6cc"), (H, W, 3)), col("#ffffff"), suave(bx_ - 50, bx_ + 50, X)[..., None])
        C.pon(pc_, np.clip(pt - arco, 0, 1))
        C.pon("#c7d2e4", L.mascara(lambda P: [P.rect(bx_ + dx - 1, 1032 + abs(dx) * 0.18, bx_ + dx + 1, 1042 + abs(dx) * 0.18) for dx in range(-40, 41, 8)]))
    niebla(C, 1000, 30, "#f6f4f1", 0.45, 27)
    M.capa("ciudad", C, 0.5)
    ciudad_pu = (760 - pbx, 982 - pby, pu)
    ciudad_sal = (865 - sbx, 932 - sby, sal)

    # ------------------------------------------------------------ 4 · torre de esquina y pinos cercanos
    C = Capa(L)
    llanura_nieve(C, 1170, 61, tope=suave(1150, 1190, Y) * (suave(470, 360, X) + suave(780, 900, X)).clip(0, 1))
    # foso helado
    foso = ((X < 440) & (Y > 1214) & (Y < 1262)).astype(np.float32) * suave(440, 400, X)
    hielo = mezcla(np.broadcast_to(col("#9fb4d4"), (H, W, 3)), col("#eaf2fb"), suave(0.4, 0.8, L.ruido(1.4, 70, aniso=(6.0, 1.0)))[..., None])
    hielo = mezcla(hielo, col("#ffe8c8"), (suave(1214, 1262, Y) * 0.2)[..., None])
    C.pon(hielo, foso)
    # muralla bermellón con albardilla y nieve
    mur = ((X < 400) & (Y > 1112) & (Y < 1216)).astype(np.float32) * suave(402, 396, X)
    mc = mezcla(np.broadcast_to(col("#4a0e14"), (H, W, 3)), col("#c03a30"), (0.35 + 0.4 * suave(0, 400, X))[..., None])
    mc = mezcla(mc, col("#2a080c"), suave(1150, 1216, Y)[..., None] * 0.4)
    mc = mezcla(mc, col("#2a080c"), ((((X + (np.floor(Y / 8) % 2) * 9) % 18) < 0.8) | ((Y % 8) < 0.7)) * 0.12)
    C.pon(mc, mur)
    C.pon(mezcla(np.broadcast_to(col("#a0661a"), (H, W, 3)), col("#f2c14e"), 0.6), ((X < 406) & (Y > 1100) & (Y < 1114)).astype(np.float32))
    C.pon("#ffffff", ((X < 408) & (Y > 1096) & (Y < 1103)).astype(np.float32))
    C.pon("#fbfcff", borde(((X < 408) & (Y > 1096)).astype(np.float32), 1, 0) * 0)
    to, (tbx, tby) = ar.salon(210, aleros=3, luz=LUZ, nieve=0.7, seed=21, terrazas=1, ncol=7)
    tx0, ty0 = 190 - tbx, 1102 - tby
    C.pega(to, tx0, ty0)
    almenas = ((X < 400) & (Y > 1088) & (Y < 1100) & ((X % 16) < 9)).astype(np.float32)
    C.pon("#a83028", almenas)
    C.pon("#ffffff", borde(almenas, 0, -2) * 0.95)
    # astas de las banderas
    for ax in (40, 360):
        C.pon("#3a2418", ((np.abs(X - ax) < 1.6) & (Y > 1000) & (Y < 1102)).astype(np.float32))
        C.pon("#f2c14e", ((X - ax) ** 2 + (Y - 998) ** 2 < 9).astype(np.float32))
    # pinos grandes a la derecha
    ar.pinos(C, [(880, 1215, 150), (960, 1250, 230), (1040, 1205, 190), (1090, 1260, 250), (820, 1250, 110)], luz=LUZ, verde=("#0c2420", "#3f6a52"), carga=0.85, seed=61)
    sombra_elipse(C, 940, 1250, 170, 14, "#4a5a80", 0.35)
    niebla(C, 1290, 50, "#f5f6f8", 0.4, 63)
    M.capa("cerca", C, 0.75)

    # ------------------------------------------------------------ 5 · primer plano: ventisqueros y ramas nevadas
    C = Capa(L)
    mont = L.mascara(lambda P: (P.poly(spline([(-20, 1380), (80, 1335), (190, 1360), (270, 1420), (300, 1540), (-20, 1540)], 10)),
                                P.poly(spline([(1120, 1350), (1010, 1330), (900, 1380), (850, 1460), (840, 1540), (1120, 1540)], 10))))
    v = volumen(mont, 18, -LUZ, 0.9, 1.0)
    C.pon(mezcla(np.broadcast_to(col("#a9b9d6"), (H, W, 3)), col("#fffaf2"), np.clip(v * 1.2, 0, 1)[..., None]), mont)
    ar.pinos(C, [(30, 1560, 420), (150, 1590, 300)], luz=LUZ, verde=("#081a18", "#2f5444"), carga=0.9, seed=81)
    ar.pinos(C, [(1090, 1570, 460), (980, 1600, 280)], luz=LUZ, verde=("#081a18", "#2f5444"), carga=0.9, seed=83)
    M.capa("frente", C, 1.05)

    # ------------------------------------------------------------ 6 · marco: agujas de pino nevadas, desenfocadas, en los bordes
    C = Capa(L)
    marco_hojas(C, [(20, 1330, 50, 60, 80, -0.2), (60, 1500, 90, 100, 100, -0.4), (1090, 1350, 50, 60, 80, -2.9), (1050, 1500, 90, 100, 100, -2.7)], "#081a18", "#3f6a52", luz=LUZ, punta="#f4f8ff", desenfoque=7, seed=91)
    M.capa("marco", C, 1.3)

    # ------------------------------------------------------------ piezas animadas
    sp.humo(M.ruta("humo.webp"), 96, ("#c4cbd8", "#ffffff"), seed=1)
    for i, (hx, hy) in enumerate(chimeneas[:4]):
        for k in range(3):
            M.actor("ciudad", "humo.webp", hx - 14, hy - 30, 28, 28, "humo", dur=7.5, retraso=-(k * 2.5 + i * 0.9), movil=k < 2)
    sp.bandera(M.ruta("bandera.webp"), 56, 34, luz=LUZ)
    for ax, i in ((40, 0), (360, 1)):
        M.actor("cerca", "bandera.webp", ax + 1, 1002, 46, 28, "bandera", dur=2.4, retraso=-i * 0.9)
    # banderines pequeños en la puerta de la Ciudad Prohibida
    px0, py0, pu = ciudad_pu
    for dx in (-60, 60):
        ax = px0 + pu.L.w / 2 + dx
        M.actor("ciudad", "bandera.webp", ax, py0 + 6, 16, 10, "bandera", dur=2.0, retraso=-abs(dx) / 50, movil=False)
    fw, fh, fcx, _ = sp.farol(M.ruta("farol.webp"), 30, 46)
    ye, wt = to.info["aleros"][0]
    for k, dx in enumerate((-0.36, -0.12, 0.12, 0.36)):
        x = tx0 + to.L.w / 2 + dx * wt
        y = ty0 + ye + 4
        s = 0.62
        M.actor("cerca", "farol.webp", x - fcx * s, y, fw * s, fh * s, "farol", dur=3.2 + k * 0.3, retraso=-k * 0.7)
    sx0, sy0, sal = ciudad_sal
    ye2, wt2 = sal.info["aleros"][0]
    for k, dx in enumerate((-0.3, 0.3)):
        s = 0.34
        M.actor("ciudad", "farol.webp", sx0 + sal.L.w / 2 + dx * wt2 - fcx * s, sy0 + ye2 + 2, fw * s, fh * s, "farol", dur=3.6, retraso=-k, movil=False)
    sp.destello(M.ruta("destello.webp"), 40)
    rng = np.random.default_rng(5)
    brillos = [(520, 1060), (700, 1110), (610, 1180), (980, 1040), (160, 1290), (420, 1250), (900, 1330), (1000, 1395), (240, 1060),
               (815, 905), (660, 945), (870, 1205)]
    for i, (x, y) in enumerate(brillos):
        s = rng.uniform(14, 26)
        M.actor("ciudad" if y < 1150 else "cerca", "destello.webp", x - s / 2, y - s / 2, s, s, "destello", dur=round(rng.uniform(2.6, 4.8), 2), retraso=-round(rng.uniform(0, 5), 2), movil=i % 2 == 0)
    sp.grulla(M.ruta("grulla-a.webp"), 0, luz=LUZ)
    sp.grulla(M.ruta("grulla-b.webp"), 1, luz=LUZ)
    bandada = [(0, 0, 1.0), (70, 34, 0.9), (140, 62, 0.85), (60, -40, 0.8), (210, 20, 0.7)]
    for i, (dx, dy, s) in enumerate(bandada):
        M.actor("cordillera", "grulla-a.webp", 1120 + dx, 360 + dy, 60 * s, 35 * s, "vuelo", dur=46, retraso=-8 - i * 0.15, dx=-150, aleteo=0.9 + i * 0.07,
                src2=f"{M.nivel}/grulla-b.webp", movil=i < 3)

    # gente: monjes, viajero y mercader cruzando la llanura nevada
    sp.gente(M, "ciudad", "monje", 380, 1012, 15, 14, 70, retraso=-10, luz=LUZ)
    sp.gente(M, "ciudad", "monje", 360, 1016, 15, 14, 70, retraso=-14, luz=LUZ, movil=False)
    sp.gente(M, "ciudad", "mercader", 760, 1020, 16, -16, 80, retraso=-30, luz=LUZ)
    sp.gente(M, "cerca", "viajero", 520, 1250, 24, 18, 60, retraso=-5, luz=LUZ, movil=False)
    # sombras de nubes que pasan por la llanura
    sp.sombra_nube(M.ruta("sombra-nube.webp"), 480, 160, "#2a3a6a", 0.3, seed=3)
    M.actor("ciudad", "sombra-nube.webp", -200, 1060, 520, 170, "deriva", dur=60, dx=40)
    M.actor("ciudad", "sombra-nube.webp", 500, 1180, 420, 140, "deriva", dur=80, retraso=-30, dx=-35, movil=False)
    # nubes sueltas que derivan delante del cielo pintado, a distintas velocidades
    for i, (x, y, w, h, dur, dx) in enumerate(((60, 120, 300, 90, 140, 30), (640, 40, 360, 110, 190, -24), (300, 520, 260, 60, 110, 22))):
        nw, nh = nube_suelta(M, f"nube{i}.webp", w, h, 300 + i, 500 - x, 380 - y, "#fff0dc", "#8a9ac0", "#ffe2b0", base_c="#b4a8c0", op=0.92)
        M.actor("cielo", f"nube{i}.webp", x, y, nw, nh, "deriva", dur=dur, retraso=-dur * 0.3 * i, dx=dx, movil=i < 2)
    # nieblas que derivan entre planos
    M.niebla("lejos", "blanca", 44, 12, 0.7, 150)
    M.niebla("cordillera", "blanca", 54, 9, 0.55, 110, inversa=True)
    M.niebla("ciudad", "blanca", 70, 14, 0.4, 90, movil=False)
    M.guarda(SOL, agua=None, niebla="blanca")
