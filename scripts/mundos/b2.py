"""B2 · Karst y niebla: Guilin y el río Li por la mañana. Sol a la izquierda, perspectiva aérea muy marcada.
Planos: cielo de mañana · picos kársticos lejanos en tres filas de bruma · picos medios con pagoda y cascada ·
terrazas de arroz con aldea · río Li con sus reflejos · bambú en primer plano.
Piezas animadas: cascada, bruma que asciende entre los picos, corriente del río, balsa de bambú con pescador y
cormoranes, bambú que se mece, rayos de sol entre la niebla y garcetas en vuelo (las bandadas pequeñas y las
hojas van en el canvas de partículas)."""
import numpy as np

import arquitectura as ar
import sprites as sp
from pincel import (H, W, nube_suelta, Capa, Lienzo, borde, cielo, cirros, col, desenfoca, mezcla, niebla, nube, perfil_picos, reflejo_capa, ruido1, sierra,
                    spline, suave, volumen)

LUZ = -1
SOL = (310, 300)


def karst(C, picos, base, *, lit, sombra, aire, aire_f, seed, verde=None, niebla_pie=None, filo=0.6, rug=8):
    pf = perfil_picos(C.L, picos, forma="karst", rug=rug, seed=seed, base=base)
    sierra(C, pf, base, luz=LUZ, lit=lit, sombra=sombra, aire=aire, aire_f=aire_f, filo=filo, filo_c="#fff8e0", niebla_pie=niebla_pie, seed=seed,
           estrias=1.5, karst=True, roca="#c8c0a8", textura=0.14, verde=verde)
    if verde:
        # vegetación en repisas y cumbres: manchas verdes donde el relieve es «plano»
        L = C.L
        n = desenfoca(L.ruido(1.6, seed + 40), 1.5)
        prof = np.clip((L.Y - pf[None, :]) / 200, 0, 2)
        v = suave(0.5, 0.7, n) * (L.Y > pf[None, :] + 2) * suave(base, base - 120, L.Y) * C.a
        v = np.maximum(v, suave(14, 2, L.Y - pf[None, :]) * (L.Y > pf[None, :]) * 0.8 * C.a)
        vc = mezcla(np.broadcast_to(col(verde[0]), (L.h, L.w, 3)), col(verde[1]), volumen(np.clip(v, 0, 1), 3, LUZ, -0.5)[..., None])
        if aire:
            vc = mezcla(vc, col(aire), aire_f)
        C.pon(vc, v * 0.85)
    return pf


def terrazas(C, cx, top, hw, base, seed=0):
    """Ladera con bancales de arroz inundados que reflejan el cielo de la mañana (bandas que siguen las curvas de nivel)."""
    L = C.L
    X, Y = L.X, L.Y
    x = np.arange(L.w, dtype=np.float32)
    d = np.abs(x - cx) / hw
    perf = top + (base - top) * np.clip(d, 0, 2) ** 1.6 * 0.9 + ruido1(L.w, 2.4, seed) * 6
    alfa = np.clip(Y - perf[None, :] + 0.5, 0, 1) * suave(base + 40, base - 10, Y)
    t = Y - perf[None, :] + desenfoca(L.ruido(2.6, seed + 1), 3) * 30
    paso = 9 + 0.03 * np.clip(Y - top, 0, None)
    fase = (t / paso) % 1.0
    borde_b = suave(0.0, 0.08, fase) * suave(0.32, 0.2, fase)
    agua = suave(0.3, 0.38, fase)
    cielo_c = mezcla(np.broadcast_to(col("#e8f0e8"), (L.h, L.w, 3)), col("#b8d0d0"), suave(top, base, Y)[..., None])
    verde = mezcla(np.broadcast_to(col("#3a6a3a"), (L.h, L.w, 3)), col("#9cc46a"), suave(cx + hw, cx - hw, X)[..., None] * 0.7)
    c = mezcla(verde, cielo_c, (agua * 0.85)[..., None])
    c = mezcla(c, col("#f8f8e8"), (borde_b * 0.6)[..., None])
    c = mezcla(c, col("#2a4a30"), (suave(0.36, 0.3, fase) * suave(0.25, 0.3, fase) * 0.6)[..., None])
    c = mezcla(c, col("#dfe9e0"), np.clip(suave(base - 160, base, Y) * 0.25, 0, 1)[..., None])
    C.pon(c, alfa)
    return perf


def aldea(C, lista, seed=0):
    for i, (x, base, w) in enumerate(lista):
        P, (bx, by) = ar.salon(w, aleros=1, luz=LUZ, teja=("#141a18", "#3a423c", "#8a948a"), terrazas=1, marmol=("#5a5244", "#a89a80"), rojo=("#3a2a1c", "#7a5a3a"), ncol=4, seed=seed + i)
        C.pega(P, x - bx, base - by)


def pinta(M):
    print("B2 · Karst y niebla")
    L = Lienzo(W, H)
    X, Y = L.X, L.Y
    sx, sy = SOL

    # ------------------------------------------------------------ 0 · cielo de mañana
    C = Capa(L, cielo(L, [(0, "#6f98ba"), (0.14, "#a2bfcf"), (0.26, "#d4e0dc"), (0.35, "#f2f0dc"), (0.42, "#f6f0d8"), (1, "#dfe9e0")],
                      sol=(sx, sy, 30, "#fff2c8", 0.85), halo=(sx, sy + 60, 600, 320, "#fff0c4", 0.45)))
    cirros(C, 90, 260, "#ffffff", 0.35, 25)
    for i, (cx, cy, w, h, op) in enumerate([(160, 220, 320, 90, 0.85), (700, 180, 380, 100, 0.8), (1020, 260, 260, 80, 0.8), (480, 380, 420, 60, 0.7)]):
        nube(C, cx, cy, w, h, 120 + i, (sx, sy), "#ffffff", "#a8bcc8", "#fff6d8", base_c="#c8d4d4", op=op, rim=0.6)
    M.capa("cielo", C, 0.06, q=80)

    # ------------------------------------------------------------ 1 · picos lejanos en tres filas de bruma
    C = Capa(L)
    filas = [
        ([(40, 470, 46), (130, 440, 40), (230, 480, 50), (330, 455, 38), (450, 430, 52), (560, 470, 44), (680, 445, 40), (790, 420, 50), (900, 465, 44), (1010, 440, 48), (1090, 470, 40)], 620, "#c8d6d8", 0.62),
        ([(0, 540, 56), (110, 505, 48), (250, 525, 56), (380, 495, 50), (520, 540, 46), (640, 510, 58), (770, 535, 48), (890, 500, 56), (1040, 520, 60)], 680, "#d2dede", 0.48),
        ([(70, 590, 62), (200, 565, 54), (330, 600, 60), (600, 575, 62), (730, 600, 54), (860, 570, 64), (1000, 590, 58), (1110, 560, 54)], 740, "#dce6e2", 0.36),
    ]
    for k, (picos, base, aire, f) in enumerate(filas):
        karst(C, picos, base, lit="#b8d0c4", sombra="#6f8f94", aire=aire, aire_f=f, seed=200 + k * 7, niebla_pie=("#eef3ec", 70, 0.95), filo=0.5, rug=11)
        niebla(C, base - 10, 28, "#f2f6ee", 0.8, 210 + k)
    C.tiñe("#fff2d0", np.exp(-(((X - sx) / 400) ** 2 + ((Y - sy - 200) / 240) ** 2)) * 0.4)
    M.capa("lejos", C, 0.14)

    # ------------------------------------------------------------ 2 · picos medios con pagoda y cascada
    C = Capa(L)
    picos = [(-10, 600, 90), (120, 650, 70), (250, 590, 85), (400, 680, 60), (700, 640, 80), (840, 590, 96), (990, 650, 80), (1100, 610, 90)]
    pf = karst(C, picos, 880, lit="#a8cca8", sombra="#3f6a5e", aire="#d6e4dc", aire_f=0.16, seed=230, verde=("#2f5a3a", "#8cbc6a"), niebla_pie=("#eef3ec", 150, 0.9), filo=0.8, rug=18)
    # pagoda de piedra en lo alto del pico de x≈250
    pg, (gbx, gby) = ar.salon(34, aleros=3, luz=LUZ, teja=("#2a2a24", "#5a5a4a", "#c8c0a0"), terrazas=1, marmol=("#6a6050", "#c8b898"), rojo=("#4a3a30", "#a88a60"), ncol=3, seed=31)
    C.pega(pg, 250 - gbx, float(pf[250]) + 6 - gby)
    niebla(C, 800, 50, "#f2f6ee", 0.75, 233)
    M.capa("picos", C, 0.3)
    x_casc = 868
    y_casc = float(pf[x_casc]) + 40

    # ------------------------------------------------------------ 3 · terrazas de arroz y aldea
    C = Capa(L)
    tp = terrazas(C, 170, 800, 420, 1060, seed=240)
    terrazas(C, 1000, 830, 330, 1070, seed=241)
    aldea(C, [(330, 900, 46), (380, 912, 40), (430, 930, 52), (900, 905, 44), (850, 924, 38)], seed=60)
    rng = np.random.default_rng(7)
    ar.pinos(C, [(x, 940 + rng.uniform(-30, 30), rng.uniform(22, 36)) for x in (300, 460, 500, 820, 960, 1000)], luz=LUZ, verde=("#1e3a28", "#6a9a5a"), nieve=("#6a9a5a", "#8aba6a"), carga=0.0, seed=61)
    niebla(C, 1000, 40, "#eef3ec", 0.7, 243)
    M.capa("terrazas", C, 0.48)

    # ------------------------------------------------------------ 4 · río Li con reflejos y orillas
    C = Capa(L)
    y_rio = 1010
    orillas = L.mascara(lambda P: (P.poly(spline([(-10, 1000), (250, 1004), (380, 1020), (420, 1060), (300, 1140), (60, 1240), (-10, 1300)], 8)),
                                   P.poly(spline([(1110, 1000), (860, 1006), (720, 1022), (690, 1070), (800, 1150), (1010, 1250), (1110, 1300)], 8))))
    oc = mezcla(np.broadcast_to(col("#4a7a4a"), (H, W, 3)), col("#a8c880"), volumen(orillas, 14, LUZ, -0.6)[..., None])
    oc = mezcla(oc, col("#e8e0c0"), borde(orillas, 0, 6, 2.0)[..., None] * 0.5)
    # reflejo de lo que hay detrás (picos y terrazas): se compone con las capas anteriores
    fondo = Capa(L)
    for capa_id in ("lejos", "picos", "terrazas"):
        pass
    agua = mezcla(np.broadcast_to(col("#cfe2dc"), (H, W, 3)), col("#7aa8a0"), suave(y_rio, H, Y)[..., None])
    agua = mezcla(agua, col("#fff6d8"), (np.exp(-(((X - sx) / 260) ** 2)) * suave(H, y_rio, Y) * 0.4)[..., None])
    vet = L.ruido(1.5, 251, aniso=(8.0, 0.3))
    agua = mezcla(agua, col("#ffffff"), (suave(0.7, 0.9, vet) * 0.35)[..., None])
    C.pon(agua, suave(y_rio - 6, y_rio + 6, Y))
    # reflejos de los picos: bandas oscuras verticales difusas bajo cada pico medio
    refl = np.zeros((H, W), np.float32)
    for cx, top, hw in picos:
        refl += np.exp(-((X - cx) / (hw * 0.7)) ** 2) * suave(y_rio + (880 - top) * 0.9, y_rio, Y) * (Y > y_rio)
    C.pon("#3f6a5e", np.clip(refl * 0.35, 0, 0.5))
    C.pon(oc, orillas)
    # bambú en las orillas
    for x, base, s in ((60, 1210, 0.5), (200, 1110, 0.36), (980, 1220, 0.5), (860, 1110, 0.34)):
        bw_, bh_ = 260 * s, 760 * s
    niebla(C, 1030, 26, "#f4f8f2", 0.6, 253)
    M.capa("rio", C, 0.66)

    # ------------------------------------------------------------ 5 · primer plano (las cañas de bambú son piezas que se mecen)
    C = Capa(L)
    rocas = L.mascara(lambda P: (P.poly(spline([(-20, 1430), (120, 1400), (220, 1450), (250, 1540), (-20, 1540)], 8)), P.poly(spline([(1120, 1410), (980, 1420), (880, 1480), (870, 1540), (1120, 1540)], 8))))
    rc = mezcla(np.broadcast_to(col("#2a3a30"), (H, W, 3)), col("#b8c8a8"), volumen(rocas, 12, LUZ, -0.6)[..., None])
    rc = mezcla(rc, col("#4a7a3a"), suave(0.55, 0.7, L.ruido(1.6, 261))[..., None] * 0.5)
    C.pon(rc, rocas)
    M.capa("frente", C, 1.0)

    # ------------------------------------------------------------ piezas animadas
    sp.cascada(M.ruta("cascada.webp"), 40, 220, seed=3)
    M.actor("picos", "cascada.webp", x_casc - 9, y_casc, 18, 180, "cascada", dur=1.6)
    sp.humo(M.ruta("bruma.webp"), 128, ("#e8eee8", "#ffffff"), seed=5)
    M.actor("picos", "bruma.webp", x_casc - 40, y_casc + 150, 80, 80, "respira", dur=3, op=0.85)
    for i, (x, y, s) in enumerate(((180, 820, 160), (520, 830, 200), (760, 800, 170), (980, 840, 180), (360, 760, 140), (640, 720, 150))):
        M.actor("picos" if i < 4 else "lejos", "bruma.webp", x - s / 2, y - s / 2, s, s * 0.7, "sube", dur=16 + i * 2, retraso=-i * 3.1, dx=1.5, dy=-9, op=0.75, movil=i < 3)
    sp.franja(M.ruta("corriente.webp"), 512, 40, "#ffffff", 0.6, seed=7, aniso=(10.0, 1.0))
    M.actor("rio", "corriente.webp", 380, 1040, 360, 40, "fluye", dur=22, op=0.7)
    M.actor("rio", "corriente.webp", 300, 1150, 520, 50, "fluye", dur=16, retraso=-5, op=0.6, movil=False)
    bw, bh = sp.balsa(M.ruta("balsa.webp"), 200, luz=LUZ)
    M.actor("rio", "balsa.webp", 430, 1060, bw * 0.75, bh * 0.75, "desliza", dur=40, retraso=-10, dx=12, dy=1.2)
    bw2, bh2 = sp.bambu(M.ruta("bambu.webp"), 260, 760, luz=LUZ, seed=3)
    for i, (x, base, s, amp) in enumerate(((40, 1560, 1.0, 1.4), (190, 1600, 0.8, 1.8), (1060, 1560, 1.05, 1.2), (930, 1610, 0.78, 1.7), (60, 1210, 0.42, 2.2), (990, 1230, 0.45, 2.0))):
        M.actor("frente" if i < 4 else "rio", "bambu.webp", x - bw2 * s / 2, base - bh2 * s, bw2 * s, bh2 * s, "mece", dur=6 + i * 0.7, retraso=-i * 1.3, amp=amp, movil=i in (0, 2, 4, 5))
    sp.haz(M.ruta("haz.webp"), 400, 600, "#fff4d0", luz=LUZ, seed=4)
    M.actor("picos", "haz.webp", 180, 360, 600, 760, "respira", dur=9, op=0.55)
    sp.grulla(M.ruta("garza-a.webp"), 0, luz=LUZ)
    sp.grulla(M.ruta("garza-b.webp"), 1, luz=LUZ)
    for i, (dx, dy, s) in enumerate(((0, 0, 0.6), (50, 22, 0.5), (96, 10, 0.45))):
        M.actor("picos", "garza-a.webp", 1120 + dx, 560 + dy, 60 * s, 35 * s, "vuelo", dur=52, retraso=-30 - i * 0.2, dx=-150, dy=-3, aleteo=1.0 + i * 0.1, src2=f"{M.nivel}/garza-b.webp", movil=i < 2)
    # segunda cascada lejana y nubes sueltas que derivan
    M.actor("picos", "cascada.webp", 118, float(pf[120]) + 60, 10, 110, "cascada", dur=2.0, movil=False)
    for i, (x, y, w, h, dur, dx) in enumerate(((40, 120, 320, 90, 180, 26), (640, 60, 380, 100, 220, -20), (360, 420, 300, 60, 130, 18))):
        nw, nh = nube_suelta(M, f"nube{i}.webp", w, h, 500 + i, sx - x - 200, sy - y, "#ffffff", "#a8bcc8", "#fff6d8", base_c="#c8d4d4", op=0.85)
        M.actor("cielo", f"nube{i}.webp", x, y, nw, nh, "deriva", dur=dur, retraso=-dur * 0.3 * i, dx=dx, movil=i < 2)
    M.niebla("lejos", "blanca", 38, 10, 0.8, 160)
    M.niebla("picos", "blanca", 53, 9, 0.75, 110, inversa=True)
    M.niebla("terrazas", "blanca", 66, 9, 0.5, 90, movil=False)
    M.guarda(SOL, niebla="blanca")
