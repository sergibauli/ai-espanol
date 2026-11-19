"""A2 · Ruta de la Seda al atardecer. Sol grande y bajo a la izquierda (contraluz cálido, sombras violetas).
Planos: cielo de fuego con nubes iluminadas por debajo · montes Qilian en la calima · Xi'an (muralla, Torre de la
Campana, Torre del Tambor, Gran Pagoda del Ganso Salvaje) · dunas con ondas de viento · oasis de la Media Luna
con palmeras y pabellón · duna y palmera en primer plano.
Piezas animadas: caravana que avanza, arena que vuela de las crestas, reflejo del sol en el oasis, calima, banderas,
palmeras que se mecen (los farolillos kongming que suben van en el canvas de partículas)."""
import numpy as np

import arquitectura as ar
import sprites as sp
from pincel import (H, W, marco_hojas, Capa, Lienzo, borde, desplaza, reflejo_capa, nube_suelta, cielo, cirros, col, desenfoca, desplaza, mezcla, niebla, nube, perfil_picos, sierra,
                    sombra_de, sombra_elipse, spline, suave, volumen)

LUZ = -1
SOL = (300, 640)


def duna(C, cx, top, hw, base, *, lit="#ffcf8a", sombra="#9a4a62", cresta="#fff0c0", seed=0, asim=1.0, ondas=1.0, aire=None, aire_f=0.0):
    """Duna de cresta afilada: barlovento iluminado (hacia el sol) con ondas de viento y cara de deslizamiento en sombra
    violeta separada por una cresta que baja en curva; luz de borde en el filo."""
    L = C.L
    X, Y = L.X, L.Y
    x = np.arange(L.w, dtype=np.float32)
    s = (x - cx) / hw
    lado_sol = s * LUZ > 0
    perf = np.where(lado_sol, top + (base - top) * np.clip(np.abs(s) * 0.85 * asim, 0, 3) ** 1.6, top + (base - top) * np.clip(np.abs(s) * 1.05, 0, 3) ** 1.25)
    from pincel import ruido1
    perf = perf + ruido1(L.w, 2.6, seed) * 4
    alfa = np.clip(Y - perf[None, :] + 0.5, 0, 1) * suave(base + 30, base - 20, Y)
    # línea de cresta: desde la cima baja en curva hacia el lado contrario al sol
    baja = np.clip((Y - top) / max(base - top, 1), 0, 1.5)
    xc = cx - LUZ * hw * 0.32 * baja ** 1.3
    lado = np.tanh((X - xc) / 3.0) * LUZ  # +1 en la cara al sol
    cara_sol = np.clip(0.5 + 0.5 * lado, 0, 1)
    rel = desenfoca(L.ruido(2.4, seed + 3), 6)
    gy, gx = np.gradient(rel)
    mod = np.clip(0.5 + (-gx * LUZ * 60 - gy * 30), 0, 1)
    lejos_cresta = suave(0, hw * 0.9, np.abs(X - xc))
    c = mezcla(np.broadcast_to(col(sombra), (L.h, L.w, 3)), col(lit), (cara_sol * (0.95 - 0.3 * lejos_cresta) * (0.8 + 0.2 * mod))[..., None])
    # degradado: la cara al sol más dorada arriba; la sombra más fría abajo
    c = mezcla(c, col("#ffe2a8"), (cara_sol * suave(top + 80, top, Y) * 0.45)[..., None])
    c = mezcla(c, col("#5e2e5a"), ((1 - cara_sol) * suave(top, base, Y) * 0.35)[..., None])
    if ondas:
        ond = desenfoca(L.ruido(2.8, seed + 5, aniso=(0.5, 1.5)), 3)
        prof_d = np.clip(Y - perf[None, :], 0, None)
        fase = prof_d * (0.2 + 0.08 * suave(0, 300, prof_d)) + ond * 7 + np.abs(X - xc) * 0.07
        lin = suave(0.82, 0.97, np.sin(fase)) * cara_sol * suave(top - 2, top + 30, Y)
        c = mezcla(c, col(sombra), lin[..., None] * 0.28 * ondas)
        c = mezcla(c, col(cresta), (suave(0.82, 0.97, np.sin(fase + 0.7)) * cara_sol * 0.22 * ondas)[..., None])
    filo = suave(3.0, 0.0, np.abs(X - xc)) * suave(top - 4, top + 90, Y) * suave(base, top, Y)
    c = mezcla(c, col(cresta), filo[..., None] * 0.85)
    c = mezcla(c, col(cresta), (suave(2.5, 0, Y - perf[None, :]) * 0.8)[..., None])
    if aire is not None:
        c = mezcla(c, col(aire), aire_f)
    C.pon(c, alfa)
    return perf


def pagoda_ganso(C, cx, base, alto, luz=LUZ):
    """Gran Pagoda del Ganso Salvaje (大雁塔): 7 pisos de ladrillo escalonados con aleros finos y arcos."""
    L = C.L
    X, Y = L.X, L.Y
    w = alto * 0.42
    y = base
    pisos = []
    zocalo = ((np.abs(X - cx) < w * 0.75) & (Y > base - alto * 0.07) & (Y < base)).astype(np.float32)
    C.pon(mezcla(np.broadcast_to(col("#4a2232"), (L.h, L.w, 3)), col("#c0705a"), suave(cx + w, cx - w, X)[..., None] * 0.6), zocalo)
    y = base - alto * 0.07
    hp = alto * 0.12
    for k in range(7):
        m = ((np.abs(X - cx) < w / 2) & (Y > y - hp) & (Y < y)).astype(np.float32)
        lado = suave(cx + w * 0.4, cx - w * 0.4, X) if luz < 0 else suave(cx - w * 0.4, cx + w * 0.4, X)
        cc = mezcla(np.broadcast_to(col("#4a2230"), (L.h, L.w, 3)), col("#d8906a"), (lado * 0.55)[..., None])
        cc = mezcla(cc, col("#2a1020"), suave(y - hp * 0.4, y, Y)[..., None] * 0.25)
        C.pon(cc, m)
        ar_ = L.mascara(lambda P: (P.rect(cx - hp * 0.12, y - hp * 0.55, cx + hp * 0.12, y - hp * 0.12), P.elip(cx, y - hp * 0.55, hp * 0.12, hp * 0.12)))
        C.pon("#1e0a16", ar_)
        al = ((np.abs(X - cx) < w / 2 + hp * 0.22) & (Y > y - hp - hp * 0.12) & (Y < y - hp + hp * 0.04)).astype(np.float32)
        C.pon(mezcla(np.broadcast_to(col("#3a1828"), (L.h, L.w, 3)), col("#ffc890"), (lado * 0.6)[..., None]), al)
        y -= hp
        w *= 0.88
        hp *= 0.93
    C.pon("#3a1828", L.mascara(lambda P: P.poly([(cx - w * 0.3, y), (cx + w * 0.3, y), (cx, y - alto * 0.1)])))
    C.pon("#ffd9a0", borde(((np.abs(X - cx) < alto * 0.4) & (Y < base) & (Y > y - alto * 0.1)).astype(np.float32) * C.a, -luz * 1.5, -1) * 0.8)


def torre_campana(cx, base_y, ancho, luz=LUZ, teja=("#2a3a34", "#5f7a5a", "#d8c890")):
    """Torre de la Campana de Xi'an: basamento de ladrillo con túnel y pabellón de triple alero de tejas verdes."""
    P, (bx, by) = ar.salon(ancho, aleros=3, luz=luz, teja=teja, terrazas=1, marmol=("#5a3040", "#c88a70"), rojo=("#3a0e18", "#a83a34"), ncol=6, seed=4)
    hb = ancho * 0.42
    wb = ancho * 1.12
    Lz = Lienzo(P.L.w, int(P.L.h + hb))
    T = Capa(Lz)
    X, Y = Lz.X, Lz.Y
    cx0 = Lz.w / 2
    base = ((np.abs(X - cx0) < wb / 2) & (Y > Lz.h - hb) & (Y < Lz.h)).astype(np.float32)
    lado = suave(cx0 + wb * 0.4, cx0 - wb * 0.4, X) if luz < 0 else suave(cx0 - wb * 0.4, cx0 + wb * 0.4, X)
    fila = np.floor(Y / 4)
    lad = ((((X + (fila % 2) * 4) % 8) < 0.8) | ((Y % 4) < 0.6)).astype(np.float32)
    bc = mezcla(np.broadcast_to(col("#4a2232"), Y.shape + (3,)), col("#c47e60"), (lado * 0.65)[..., None])
    bc = mezcla(bc, col("#3a1424"), lad[..., None] * 0.25)
    T.pon(bc, base)
    tun = Lz.mascara(lambda P_: (P_.rect(cx0 - ancho * 0.1, Lz.h - hb * 0.62, cx0 + ancho * 0.1, Lz.h), P_.elip(cx0, Lz.h - hb * 0.62, ancho * 0.1, ancho * 0.1)))
    T.pon("#1a0812", tun)
    T.pon("#ffcf8a", tun * suave(cx0 - ancho * 0.1, cx0 + ancho * 0.12, X) * suave(Lz.h - hb * 0.5, Lz.h, Y) * 0.35)
    T.pega(P, 0, 0)
    return T, (cx0, Lz.h - 1)


def pinta(M):
    print("A2 · Ruta de la Seda al atardecer")
    L = Lienzo(W, H)
    X, Y = L.X, L.Y
    sx, sy = SOL

    # ------------------------------------------------------------ 0 · cielo de fuego
    C = Capa(L, cielo(L, [(0, "#22123c"), (0.1, "#4a1e52"), (0.2, "#8e2a50"), (0.28, "#d24c3c"), (0.34, "#f08a44"), (0.39, "#fbc670"), (0.43, "#fde4a8"),
                          (0.5, "#f8c886"), (1, "#eda964")], sol=(sx, sy, 46, "#ffd27a", 1.0), halo=(sx, sy + 20, 760, 240, "#ffb060", 0.6), disco="#fffbe6"))
    cirros(C, 80, 300, "#ff9a7a", 0.4, 15, aniso=(10.0, 1.0))
    cirros(C, 260, 420, "#ffd0a0", 0.35, 16, aniso=(14.0, 1.0))
    for i, (cx, cy, w, h, op) in enumerate([(160, 300, 380, 110, 0.95), (620, 240, 420, 90, 0.9), (1000, 330, 300, 120, 0.95), (420, 470, 460, 70, 0.9),
                                            (860, 520, 380, 60, 0.85), (90, 540, 220, 50, 0.85), (640, 600, 300, 36, 0.7)]):
        nube(C, cx, cy, w, h, 60 + i, (sx, sy + 60), "#ffc890", "#5e2656", "#ffe2a8", base_c="#e8706a", op=op, rim=0.2, plana=i % 2 == 0, bultos=9 + i % 4)
    M.capa("cielo", C, 0.06, q=80)

    # ------------------------------------------------------------ 1 · montes Qilian en la calima
    C = Capa(L)
    pf = perfil_picos(L, [(-30, 650, 300), (150, 618, 180), (330, 640, 240), (560, 600, 320), (760, 632, 200), (930, 596, 280), (1120, 626, 240)], rug=16, seed=12, base=750)
    sierra(C, pf, 750, luz=LUZ, lit="#ffb98a", sombra="#7a4874", nieve=("#ffe0c8", "#a8709a", 0.35), aire="#f0a07a", aire_f=0.42, filo=0.9, filo_c="#ffe6b0",
           niebla_pie=("#f9c48a", 110, 0.95), seed=12, estrias=1.4)
    C.tiñe("#ffd29a", np.exp(-(((X - sx) / 380) ** 2 + ((Y - sy) / 200) ** 2)) * 0.55)
    M.capa("lejos", C, 0.15)

    # ------------------------------------------------------------ 2 · Xi'an: muralla, torres y pagoda
    C = Capa(L)
    # suelo de la llanura en la calima
    C.pon(mezcla(np.broadcast_to(col("#f4b67a"), (H, W, 3)), col("#d88a6a"), suave(760, 860, Y)[..., None]), suave(752, 770, Y) * suave(880, 850, Y))
    pagoda_ganso(C, 330, 792, 190)
    tc, (tbx, tby) = torre_campana(0, 0, 118)
    sombra_de(C, tc, 820 - tbx, 776 - tby, LUZ, largo=1.0, aplasta=0.2, c="#6a2a4a", f=0.35)
    # Torre del Tambor (más baja) y la muralla con su puerta (箭楼)
    tt, (ttx, tty) = ar.salon(120, aleros=2, luz=LUZ, teja=("#2a3a34", "#5f7a5a", "#d8c890"), terrazas=1, marmol=("#5a3040", "#c88a70"), rojo=("#3a0e18", "#a83a34"), ncol=7, seed=6)
    C.pega(tt, 610 - ttx, 790 - tty)
    C.pega(tc, 820 - tbx, 776 - tby)
    muro_y = 800
    # tejados de la ciudad detrás de la muralla
    rng0 = np.random.default_rng(3)
    tej = L.mascara(lambda P: [P.poly([(x - w_ * 0.6, muro_y + 1), (x - w_ * 0.42, muro_y - h_), (x + w_ * 0.42, muro_y - h_), (x + w_ * 0.6, muro_y + 1)])
                               for x, w_, h_ in [(rng0.uniform(440, 1100), rng0.uniform(14, 30), rng0.uniform(6, 14)) for _ in range(70)]])
    C.pon(mezcla(np.broadcast_to(col("#4a2a3a"), (H, W, 3)), col("#c88a6a"), suave(1100, 450, X)[..., None] * 0.5), tej)
    C.pon("#ffcf90", borde(tej, -LUZ * 1.2, -1) * 0.6)
    mur = ((X > 430) & (Y > muro_y) & (Y < muro_y + 34)).astype(np.float32)
    lad = ((((X + (np.floor(Y / 5) % 2) * 5) % 10) < 0.8) | ((Y % 5) < 0.6)).astype(np.float32)
    mc = mezcla(np.broadcast_to(col("#5a2a3a"), (H, W, 3)), col("#c47e60"), suave(1100, 430, X)[..., None] * 0.55)
    mc = mezcla(mc, col("#3a1424"), lad[..., None] * 0.22)
    mc = mezcla(mc, col("#3a1424"), suave(muro_y, muro_y + 34, Y)[..., None] * 0.35)
    C.pon(mc, mur)
    alm = ((X > 430) & (Y > muro_y - 6) & (Y <= muro_y) & ((X % 11) < 6)).astype(np.float32)
    C.pon("#8a4a4a", alm)
    for mx_ in range(470, 1100, 110):  # 马面: bastiones
        C.pon(mezcla(np.broadcast_to(col("#6a3040"), (H, W, 3)), col("#d08a68"), 0.35), ((np.abs(X - mx_) < 13) & (Y > muro_y - 4) & (Y < muro_y + 38)).astype(np.float32))
    puerta, (pbx, pby) = ar.salon(130, aleros=2, luz=LUZ, teja=("#2a3a34", "#5f7a5a", "#d8c890"), terrazas=1, marmol=("#5a3040", "#c88a70"), rojo=("#3a0e18", "#a83a34"), ncol=7, seed=8)
    C.pega(puerta, 1010 - pbx, muro_y + 2 - pby)
    C.pon("#ffd9a0", borde(C.a, -LUZ * 1.5, -1.0) * suave(450, 1100, X) * 0.5 * (Y < 900))
    C.tiñe("#e8907a", 0.12)
    C.tiñe("#ffd9a0", np.exp(-(((X - sx) / 260) ** 2 + ((Y - sy) / 200) ** 2)) * 0.45)
    niebla(C, 830, 30, "#fbc68c", 0.75, 21)
    M.capa("ciudad", C, 0.28)

    # ------------------------------------------------------------ 3 · dunas medias con la caravana
    C = Capa(L)
    perfiles = []
    for i, (cx, top, hw, base) in enumerate([(120, 845, 300, 1010), (520, 830, 340, 1010), (900, 815, 300, 1000), (330, 900, 260, 1060), (760, 905, 320, 1070)]):
        perfiles.append(duna(C, cx, top, hw, base, seed=30 + i, aire="#f4a87c", aire_f=0.18 if i < 3 else 0.08))
    niebla(C, 1015, 40, "#fbc68c", 0.55, 31)
    M.capa("dunas", C, 0.42)

    # ------------------------------------------------------------ 4 · oasis de la Media Luna
    C = Capa(L)
    suelo = mezcla(np.broadcast_to(col("#f8c486"), (H, W, 3)), col("#e09a6c"), suave(1000, 1500, Y)[..., None])
    rip = L.ruido(2.2, 41, aniso=(0.6, 2.0))
    suelo = mezcla(suelo, col("#c0705e"), (suave(0.8, 0.95, np.sin(Y * 0.32 + rip * 20 + X * 0.03)) * 0.25)[..., None])
    suelo = mezcla(suelo, col("#ffe0a8"), (suave(700, 100, X) * 0.3)[..., None])
    C.pon(suelo, suave(1000, 1040, Y))
    for i, (cx, top, hw, base) in enumerate([(60, 1000, 260, 1150), (1060, 990, 230, 1140)]):
        duna(C, cx, top, hw, base, seed=50 + i, ondas=0.8)
    # lago en media luna
    # oasis de la Media Luna (protagonista): pabellón en la orilla, agua que refleja el cielo de fuego, juncos y orilla verde
    pab, (abx, aby) = ar.salon(170, aleros=2, luz=LUZ, teja=("#2a3a34", "#5f7a5a", "#d8c890"), terrazas=2, marmol=("#6a3a40", "#d89a78"), rojo=("#3a0e18", "#b04a3a"), ncol=7, seed=10)
    vega = L.mascara(lambda P: P.poly(spline([(400, 1092), (560, 1034), (800, 1012), (1040, 1026), (1120, 1070), (1120, 1210), (900, 1222), (600, 1210), (420, 1160)], 10, cerrada=True)))
    vc = mezcla(np.broadcast_to(col("#2a3218"), (H, W, 3)), col("#7a7a36"), volumen(vega, 10, LUZ, -0.8)[..., None])
    vc = mezcla(vc, col("#c8784a"), suave(1020, 1220, Y)[..., None] * 0.35)
    vc = mezcla(vc, col("#ffcf80"), (suave(0.55, 0.8, L.ruido(1.4, 44)) * 0.3)[..., None])
    hierba = L.ruido(1.1, 46, aniso=(1.0, 3.0))
    matas = suave(0.55, 0.75, desenfoca(L.ruido(2.2, 47), 2))
    vc = mezcla(vc, col("#141c0c"), (matas * 0.45)[..., None])
    vc = mezcla(vc, col("#d8b860"), (suave(0.7, 0.9, hierba) * 0.35)[..., None])
    vc = vc * (0.9 + 0.2 * hierba)[..., None]
    C.pon(vc, vega * suave(0.2, 0.6, desenfoca(vega, 6)))
    sombra_de(C, pab, 930 - abx, 1046 - aby, LUZ, largo=1.4, aplasta=0.2, c="#3a1a3a", f=0.4)
    C.pega(pab, 930 - abx, 1046 - aby)
    lago = L.mascara(lambda P: P.poly(spline([(450, 1120), (560, 1066), (760, 1050), (960, 1062), (1080, 1100), (1060, 1130), (930, 1112), (760, 1112), (600, 1136), (500, 1160)], 10, cerrada=True)))
    y_l = 1050
    cielo_ref = cielo(L, [(0, "#fde4a8"), (0.68, "#ffd890"), (0.695, "#f08a44"), (0.71, "#b8404a"), (0.73, "#6a2a5a"), (1, "#2a1448")])
    cielo_ref = mezcla(cielo_ref, col("#fff2c0"), (np.exp(-(((X - sx - 420) / 140) ** 2)) * suave(1170, y_l, Y) * 0.55)[..., None])
    reflejo_capa(C, y_l, 1180, cielo_ref, f=0.3, olas=2.0, seed=45, mascara=lago, brillo="#ffe8b0", oscurece=0.7)
    C.pon("#2a3a1a", borde(lago, 0, 3, 1.2) * 0.7)
    C.pon("#fff0c0", borde(lago, 0, -2, 0.8) * 0.5)
    # juncos y hierba en la orilla
    rng = np.random.default_rng(9)
    orilla = [(x, 1086 + 40 * np.sin((x - 450) / 640 * np.pi) * 0.5 + rng.uniform(-14, 30)) for x in rng.uniform(440, 1100, 220)]
    junc = L.mascara(lambda P: [P.trazo([(x, y), (x + rng.uniform(-5, 5), y - rng.uniform(10, 30))], 1.6, 0.4) for x, y in orilla])
    C.pon(mezcla(np.broadcast_to(col("#1a2a14"), (H, W, 3)), col("#8a9a4a"), suave(1060, 1150, Y)[..., None]), junc)
    C.pon("#ffcf80", borde(junc, -LUZ, 0) * 0.6)
    # huellas de la caravana en la arena, rocas y matorrales
    huella = spline([(-20, 1260), (180, 1236), (330, 1190), (430, 1150)], 30)
    hm = L.mascara(lambda P: [P.elip(x + (3 if i % 2 else -3), y + (2 if i % 2 else -2), 3.2, 1.6) for i, (x, y) in enumerate(huella[::2])])
    C.pon("#a8605a", hm * 0.55)
    C.pon("#ffe0a8", desplaza(hm, 0, 1.5) * (1 - hm) * 0.5)
    for i, (x, y, r) in enumerate(((260, 1300, 26), (300, 1316, 14), (720, 1330, 34), (760, 1348, 16), (520, 1250, 12), (880, 1290, 20))):
        rk = L.mascara(lambda P: P.poly(spline([(x - r, y), (x - r * 0.7, y - r * 0.7), (x, y - r * 0.9), (x + r * 0.8, y - r * 0.5), (x + r, y)], 5, cerrada=True)))
        sombra_de_c = desplaza(rk, int(r * 0.9), 3)
        C.pon("#7a3a4a", desenfoca(sombra_de_c, 2) * (1 - rk) * 0.4)
        C.pon(mezcla(np.broadcast_to(col("#5a2a3a"), (H, W, 3)), col("#e8a070"), volumen(rk, 4, LUZ, -0.8, 1.3)[..., None]), rk)
    mat = L.mascara(lambda P: [P.linea([(x, y), (x + np.cos(a_) * l, y - np.sin(a_) * l)], 1.1) for x, y in ((380, 1240), (640, 1290), (980, 1250), (180, 1200)) for a_, l in
                               [(rng.uniform(0.3, 2.8), rng.uniform(8, 22)) for _ in range(22)]])
    C.pon("#3a1e1e", mat)
    C.pon("#ffcf8a", borde(mat, -LUZ, -1) * 0.6)
    sp_w, sp_h = sp.palmera(M.ruta("palmera.webp"), 200, luz=LUZ, seed=2)
    palmas = sp.palmera  # (los sprites de palmera se reutilizan como piezas que se mecen)
    C.tiñe("#ffd9a0", np.exp(-(((X - sx) / 400) ** 2 + ((Y - sy - 300) / 300) ** 2)) * 0.25)
    M.capa("oasis", C, 0.62)

    # ------------------------------------------------------------ 5 · primer plano: hombro de duna y matorral
    C = Capa(L)
    duna(C, -60, 1300, 380, 1560, seed=70, ondas=1.2, lit="#ffc884", sombra="#8a3a5a")
    duna(C, 1180, 1340, 300, 1560, seed=71, ondas=1.2, lit="#ffc884", sombra="#8a3a5a")
    mat = L.mascara(lambda P: [P.linea([(x, y), (x + np.cos(a) * l, y - np.sin(a) * l)], 1.4) for x, y in ((120, 1360), (980, 1400)) for a, l in
                               [(rng.uniform(0.4, 2.7), rng.uniform(20, 46)) for _ in range(26)]])
    C.pon("#3a1e1e", mat)
    C.pon("#ffcf8a", borde(mat, -LUZ, -1) * 0.7)
    M.capa("frente", C, 1.0)

    # ------------------------------------------------------------ 6 · marco: hojas de palmera desenfocadas en las esquinas
    C = Capa(L)
    marco_hojas(C, [(30, 1360, 60, 50, 120, -0.3), (40, 1500, 90, 70, 130, -0.6), (1080, 1380, 60, 50, 120, -2.8), (1060, 1510, 90, 70, 130, -2.5)],
                "#1a1408", "#6a5a2a", luz=LUZ, punta="#ffb060", desenfoque=7, seed=92)
    M.capa("marco", C, 1.3)

    # ------------------------------------------------------------ piezas animadas
    cw, ch = sp.caravana(M.ruta("caravana.webp"), n=5, alto=40, luz=LUZ)
    # sobre la cresta de la duna central (y de la cresta en x≈450)
    yc = float(perfiles[1][450])
    M.actor("dunas", "caravana.webp", 300, yc - ch * 0.62 + 4, cw * 0.62, ch * 0.62, "avanza", dur=60, retraso=-20, dx=26, dy=-1.2)
    sp.nube_humo_horizontal(M.ruta("rafaga.webp"), 180, 60, c=("#f2b47a", "#ffe6b8"), seed=3)
    for i, (k, x) in enumerate(((0, 120), (1, 520), (2, 900), (3, 330), (4, 760))):
        yy = float(perfiles[k][int(x)])
        M.actor("dunas", "rafaga.webp", x - 10, yy - 34, 120, 40, "rafaga", dur=3.6 + i * 0.4, retraso=-i * 1.1, op=0.75, movil=i < 3)
    sp.brillo_agua(M.ruta("brillo.webp"), 300, 40, "#fff2c0", seed=4)
    M.actor("oasis", "brillo.webp", 600, 1062, 420, 40, "brillo", dur=2.6, op=0.95)
    M.actor("oasis", "brillo.webp", 640, 1090, 300, 28, "brillo", dur=3.4, retraso=-1.2, op=0.75, movil=False)
    sp.franja(M.ruta("calima.webp"), 600, 40, "#ffd9a0", 0.55, seed=5)
    M.actor("ciudad", "calima.webp", 0, 770, 1100, 70, "calima", dur=5, op=0.55)
    M.actor("dunas", "calima.webp", 0, 990, 1100, 60, "calima", dur=6.5, retraso=-2, op=0.45, movil=False)
    sp.bandera(M.ruta("bandera.webp"), 56, 34, tela=("#6e0817", "#e0283f"), luz=LUZ)
    for x in (520, 700, 900):
        C_ = None
        M.actor("ciudad", "bandera.webp", x, muro_y - 26, 18, 11, "bandera", dur=2.2, retraso=-x / 300, movil=False)
    for i, (x, base, s, amp) in enumerate(((470, 1120, 0.7, 1.6), (540, 1084, 0.86, 1.4), (1060, 1090, 0.8, 1.8), (1110, 1108, 0.6, 2.0), (1000, 1560, 1.9, 1.2), (-40, 1590, 1.7, 1.0))):
        w_, h_ = sp_w * s, sp_h * s
        M.actor("oasis" if i < 4 else "frente", "palmera.webp", x - w_ / 2, base - h_, w_, h_, "mece", dur=5 + i * 0.6, retraso=-i, amp=amp, movil=i in (0, 2, 4))
    sp.gente(M, "oasis", "mercader", 360, 1150, 18, 18, 70, retraso=-12, luz=LUZ)
    sp.gente(M, "oasis", "viajero", 560, 1200, 20, -14, 64, retraso=-40, luz=LUZ, movil=False)
    sp.gente(M, "oasis", "monje", 980, 1060, 14, -8, 50, retraso=-5, luz=LUZ, movil=False)
    sp.sombra_nube(M.ruta("sombra-nube.webp"), 480, 160, "#4a1a3a", 0.3, seed=4)
    M.actor("dunas", "sombra-nube.webp", -200, 900, 520, 160, "deriva", dur=70, dx=45)
    M.actor("oasis", "sombra-nube.webp", 600, 1220, 460, 150, "deriva", dur=90, retraso=-40, dx=-40, movil=False)
    for i, (x, y, w, h, dur, dx) in enumerate(((80, 150, 360, 100, 170, 26), (700, 90, 380, 110, 210, -22), (420, 430, 300, 60, 120, 20))):
        nw, nh = nube_suelta(M, f"nube{i}.webp", w, h, 400 + i, sx - x - 180, sy - y, "#ffc890", "#5e2656", "#ffe2a8", base_c="#e8706a", op=0.9)
        M.actor("cielo", f"nube{i}.webp", x, y, nw, nh, "deriva", dur=dur, retraso=-dur * 0.3 * i, dx=dx, movil=i < 2)
    M.niebla("lejos", "arena", 47, 9, 0.6, 140)
    M.niebla("ciudad", "arena", 54, 8, 0.5, 100, inversa=True)
    M.guarda(SOL, niebla="arena")
