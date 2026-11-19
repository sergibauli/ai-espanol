"""A2 · Ruta de la Seda al atardecer. Sol grande y bajo a la izquierda (contraluz cálido, sombras violetas).
Planos: cielo de fuego con nubes iluminadas por debajo · montes Qilian en la calima · Xi'an (muralla, Torre de la
Campana, Torre del Tambor, Gran Pagoda del Ganso Salvaje) · dunas con ondas de viento · oasis de la Media Luna
con palmeras y pabellón · duna y palmera en primer plano.
Piezas animadas: caravana que avanza, arena que vuela de las crestas, reflejo del sol en el oasis, calima, banderas,
palmeras que se mecen (los farolillos kongming que suben van en el canvas de partículas)."""
import numpy as np

import arquitectura as ar
import sprites as sp
from pincel import (H, W, Capa, Lienzo, borde, cielo, cirros, col, desenfoca, desplaza, mezcla, niebla, nube, perfil_picos, sierra,
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
        nube(C, cx, cy, w, h, 60 + i, (sx, sy + 60), "#ffc890", "#5e2656", "#ffe2a8", base_c="#e8706a", op=op, rim=0.35, plana=i % 2 == 0, bultos=9 + i % 4)
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
    lago = L.mascara(lambda P: P.poly(spline([(640, 1092), (720, 1062), (860, 1052), (990, 1070), (1040, 1100), (960, 1088), (850, 1082), (730, 1092), (660, 1104)], 10, cerrada=True)))
    agua = mezcla(np.broadcast_to(col("#5a3a6a"), (H, W, 3)), col("#ffc27a"), suave(1100, 1055, Y)[..., None])
    agua = mezcla(agua, col("#ffe8b0"), np.exp(-(((X - 860) / 120) ** 2))[..., None] * 0.5)
    C.pon(agua, lago)
    C.pon("#7a8a4a", borde(lago, 0, 3, 1.0) * 0.8)
    # juncos y hierba en la orilla
    rng = np.random.default_rng(9)
    junc = L.mascara(lambda P: [P.linea([(x, y), (x + rng.uniform(-3, 3), y - rng.uniform(8, 20))], 1.2) for x, y in
                                [(rng.uniform(640, 1040), 1094 + rng.uniform(-12, 18)) for _ in range(90)]])
    C.pon(mezcla(np.broadcast_to(col("#2a3a20"), (H, W, 3)), col("#8a9a4a"), suave(1070, 1110, Y)[..., None]), junc)
    # pabellón del oasis (月牙泉阁) en la orilla
    pab, (abx, aby) = ar.salon(130, aleros=2, luz=LUZ, teja=("#2a3a34", "#5f7a5a", "#d8c890"), terrazas=1, marmol=("#6a3a40", "#d89a78"), rojo=("#3a0e18", "#b04a3a"), ncol=6, seed=10)
    sombra_de(C, pab, 900 - abx, 1060 - aby, LUZ, largo=1.4, aplasta=0.2, c="#6a2a4a", f=0.4)
    C.pega(pab, 900 - abx, 1060 - aby)
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
    M.actor("oasis", "brillo.webp", 720, 1064, 250, 30, "brillo", dur=2.6, op=0.9)
    M.actor("oasis", "brillo.webp", 760, 1078, 200, 22, "brillo", dur=3.4, retraso=-1.2, op=0.7, movil=False)
    sp.franja(M.ruta("calima.webp"), 600, 40, "#ffd9a0", 0.55, seed=5)
    M.actor("ciudad", "calima.webp", 0, 770, 1100, 70, "calima", dur=5, op=0.55)
    M.actor("dunas", "calima.webp", 0, 990, 1100, 60, "calima", dur=6.5, retraso=-2, op=0.45, movil=False)
    sp.bandera(M.ruta("bandera.webp"), 56, 34, tela=("#6e0817", "#e0283f"), luz=LUZ)
    for x in (520, 700, 900):
        C_ = None
        M.actor("ciudad", "bandera.webp", x, muro_y - 26, 18, 11, "bandera", dur=2.2, retraso=-x / 300, movil=False)
    for i, (x, base, s, amp) in enumerate(((660, 1092, 0.55, 1.6), (700, 1086, 0.7, 1.4), (1010, 1096, 0.62, 1.8), (1050, 1090, 0.48, 2.0), (1000, 1560, 1.9, 1.2), (-40, 1590, 1.7, 1.0))):
        w_, h_ = sp_w * s, sp_h * s
        M.actor("oasis" if i < 4 else "frente", "palmera.webp", x - w_ / 2, base - h_, w_, h_, "mece", dur=5 + i * 0.6, retraso=-i, amp=amp, movil=i in (0, 2, 4))
    M.niebla("lejos", "arena", 47, 9, 0.6, 140)
    M.niebla("ciudad", "arena", 54, 8, 0.5, 100, inversa=True)
    M.guarda(SOL, niebla="arena")
