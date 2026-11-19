"""B1 · Agua y tinta: Shanghái y Suzhou de noche. Luna arriba a la derecha (luz fría), farolillos y ventanas cálidos.
Planos: cielo nocturno con luna y nubes de plata · montes de tinta en la niebla · el Bund y Pudong (Perla de Oriente,
Torre de Shanghái, Jin Mao) sobre el Huangpu con sus reflejos · pueblo de agua (muros blancos, tejados negros,
马头墙, puente de arco con su reflejo) · casas cercanas con farolillos sobre el canal · sauce y lotos.
Piezas animadas: barcas que se deslizan, farolillos que se mecen, ventanas que parpadean, reflejos que tiemblan,
halo de la luna (lluvia fina, luciérnagas y pétalos van en el canvas de partículas)."""
import numpy as np

import arquitectura as ar
import sprites as sp
from pincel import (H, W, Capa, Lienzo, borde, cielo, cirros, col, desenfoca, mezcla, niebla, nube, perfil_picos, reflejo_capa, sierra,
                    spline, suave, vdesenfoca, volumen)

LUZ = 1
LUNA = (820, 230)


def agua_noche(L, y0, y1, arriba="#1a2a5a", abajo="#060c1c", glow=None):
    c = np.broadcast_to(col(arriba), (L.h, L.w, 3)).copy()
    c = mezcla(c, col(abajo), suave(y0, y1, L.Y)[..., None])
    if glow:
        gx, gy, r, gc, f = glow
        c = mezcla(c, col(gc), (np.exp(-(((L.X - gx) / r) ** 2 + ((L.Y - gy) / (r * 0.35)) ** 2)) * f)[..., None])
    return c


def casa_agua(w, h, luz=LUZ, seed=0, ventanas_luz=0.5, pisos=2, reflejo=False):
    """Casa de pueblo de agua: muro blanco encalado (con manchas de humedad), tejado negro, 马头墙 escalonado,
    ventanas de celosía (algunas encendidas). Devuelve (capa, base_y, ventanas encendidas [(x, y, w, h)])."""
    rng = np.random.default_rng(seed)
    gab = h * 0.5
    Lz = Lienzo(int(w * 1.16), int(h + gab + 6))
    C = Capa(Lz)
    X, Y = Lz.X, Lz.Y
    cx = Lz.w / 2
    yb = Lz.h - 1
    ytop = yb - h
    muro = ((np.abs(X - cx) < w / 2) & (Y > ytop) & (Y <= yb)).astype(np.float32)
    lado = suave(cx - w * 0.5, cx + w * 0.5, X) if luz > 0 else suave(cx + w * 0.5, cx - w * 0.5, X)
    mc = mezcla(np.broadcast_to(col("#3a4468"), X.shape + (3,)), col("#c8cfe4"), (0.35 + 0.5 * lado)[..., None])
    hum = desenfoca(Lz.ruido(1.8, seed + 2), 2)
    mc = mezcla(mc, col("#2a3050"), (suave(0.55, 0.85, hum) * suave(ytop + h * 0.4, yb, Y) * 0.45)[..., None])
    mc = mezcla(mc, col("#1a2038"), suave(yb - h * 0.1, yb, Y)[..., None] * 0.6)
    C.pon(mc, muro)
    # 马头墙: frontones escalonados en los extremos, con remate negro
    for s in (-1, 1):
        x0 = cx + s * w / 2
        pts = [(x0, yb), (x0, ytop - gab * 0.35), (x0 - s * w * 0.08, ytop - gab * 0.35), (x0 - s * w * 0.08, ytop - gab * 0.7), (x0 - s * w * 0.17, ytop - gab * 0.7),
               (x0 - s * w * 0.17, ytop - gab), (x0 - s * w * 0.26, ytop - gab), (x0 - s * w * 0.26, ytop)]
        g = Lz.mascara(lambda P: P.poly(pts))
        C.pon(mezcla(np.broadcast_to(col("#2e3658"), X.shape + (3,)), col("#b8c0dc"), (0.3 + 0.5 * lado)[..., None]), g)
        caps = Lz.mascara(lambda P: [P.poly([(xa - s * 3, ya - 3), (xb + s * 3, ya - 3), (xb + s * 1, ya + 2), (xa - s * 1, ya + 2)]) for (xa, ya), (xb, _) in
                                     [((x0 + s * 1, ytop - gab * 0.35), (x0 - s * w * 0.08, 0)), ((x0 - s * w * 0.08, ytop - gab * 0.7), (x0 - s * w * 0.17, 0)),
                                      ((x0 - s * w * 0.17, ytop - gab), (x0 - s * w * 0.26, 0))]])
        C.pon("#0a0c16", caps)
        C.pon("#7080b0", borde(caps, 0, -1.2) * 0.6)
    ar.pinta_tejado(Lz, C, cx, ytop + h * 0.08, w * 1.0, h * 0.32, luz=luz, teja=("#07080e", "#262a3a", "#7f8cb8"), rw=w * 0.8, lift=h * 0.05, seed=seed, canto="#04050a", cumbrera_c="#1a1c28")
    if pisos > 1:  # alero intermedio
        ar.pinta_tejado(Lz, C, cx, ytop + h * 0.52, w * 1.04, h * 0.12, luz=luz, teja=("#07080e", "#262a3a", "#7f8cb8"), rw=w * 0.98, lift=h * 0.02, seed=seed + 3, canto="#04050a", cumbrera_c="no")
    ventanas = []
    filas = [ytop + h * 0.25, ytop + h * 0.68] if pisos > 1 else [ytop + h * 0.45]
    for fy in filas:
        for k in range(3):
            vx = cx - w * 0.3 + k * w * 0.3
            vw, vh = w * 0.12, h * 0.14
            enc = rng.random() < ventanas_luz
            vm = ((np.abs(X - vx) < vw / 2) & (np.abs(Y - fy) < vh / 2)).astype(np.float32)
            celo = ((((X - vx) % 3) < 0.8) | (((Y - fy) % 3) < 0.8)).astype(np.float32)
            if enc:
                C.pon(mezcla(np.broadcast_to(col("#ffd27a"), X.shape + (3,)), col("#a8401a"), celo[..., None] * 0.6), vm)
                C.pon("#ffb050", np.exp(-(((X - vx) / (vw * 1.2)) ** 2 + ((Y - fy) / (vh * 1.4)) ** 2)) * 0.35 * muro)
                ventanas.append((vx, fy, vw, vh))
            else:
                C.pon(mezcla(np.broadcast_to(col("#0c0e1a"), X.shape + (3,)), col("#3a3040"), celo[..., None] * 0.5), vm)
    # puerta / embarcadero
    C.pon("#120c10", ((np.abs(X - cx + w * 0.3) < w * 0.07) & (Y > yb - h * 0.3)).astype(np.float32))
    return C, yb, ventanas


def skyline(C, y_base, luz=LUZ):
    """El Bund (izquierda, piedra con luz dorada) y Pudong (torres con ventanas, la Perla de Oriente, Jin Mao, el
    «abrebotellas» y la Torre de Shanghái), recortados contra el cielo con brillo de luna en el canto derecho."""
    L = C.L
    X, Y = L.X, L.Y
    rng = np.random.default_rng(8)
    # --- Pudong: torres genéricas
    torres = []
    x = 470
    while x < 1100:
        w_ = rng.uniform(16, 34)
        h_ = rng.uniform(50, 150)
        torres.append((x, w_, h_))
        x += w_ + rng.uniform(2, 9)
    m = L.mascara(lambda P: [P.rect(x_, y_base - h_, x_ + w_, y_base) for x_, w_, h_ in torres])
    # Jin Mao (escalonado), abrebotellas, Torre de Shanghái (curva y torsión)
    jm = L.mascara(lambda P: [P.rect(705 - 15 * (1 - k / 9), y_base - 120 - k * 16, 705 + 15 * (1 - k / 9), y_base - 100 - k * 16) for k in range(9)] + [P.rect(690, y_base - 120, 720, y_base), P.poly([(703, y_base - 262), (707, y_base - 262), (705, y_base - 300)])])
    sw = L.mascara(lambda P: P.poly([(742, y_base), (772, y_base), (768, y_base - 250), (750, y_base - 262), (744, y_base - 250)]))
    hueco = L.mascara(lambda P: P.poly([(750, y_base - 230), (766, y_base - 230), (764, y_base - 246), (752, y_base - 246)]))
    st = L.mascara(lambda P: P.poly(spline([(790, y_base), (788, y_base - 120), (796, y_base - 260), (806, y_base - 318), (814, y_base - 312), (822, y_base - 250), (828, y_base - 120), (830, y_base)], 8)))
    pearl = L.mascara(lambda P: (P.rect(630, y_base - 120, 636, y_base), P.rect(644, y_base - 120, 650, y_base), P.rect(637, y_base - 250, 643, y_base - 120),
                                 P.elip(640, y_base - 118, 17, 17), P.elip(640, y_base - 216, 11, 11), P.elip(640, y_base - 262, 5, 5), P.rect(639, y_base - 330, 641, y_base - 250),
                                 P.poly([(622, y_base), (636, y_base - 60), (638, y_base - 60), (630, y_base)]), P.poly([(658, y_base), (644, y_base - 60), (642, y_base - 60), (650, y_base)])))
    todo = np.clip(m + jm + sw * (1 - hueco) + st, 0, 1)
    lado = suave(-0.6, 0.6, np.sin(X * 0.3))  # para la luz de luna en las fachadas
    cuerpo = mezcla(np.broadcast_to(col("#0e1430"), (L.h, L.w, 3)), col("#3a4478"), (suave(y_base - 40, y_base - 300, Y) * 0.6)[..., None])
    cuerpo = mezcla(cuerpo, col("#5a5a90"), (borde(todo, luz * 2, 0) * 0.8)[..., None])
    C.pon(cuerpo, todo)
    C.pon("#b8c8ff", borde(todo, luz * 1.5, -1.0) * 0.55)
    # ventanas
    vent = ((((X % 4) < 1.6) & ((Y % 5) < 2.0)) * (L.ruido(0.3, 81) > 0.58) * todo * (Y < y_base - 4)).astype(np.float32)
    vc = mezcla(np.broadcast_to(col("#ffd98a"), (L.h, L.w, 3)), col("#9ad8ff"), (L.ruido(0.8, 82) > 0.6)[..., None] * 1.0)
    C.pon(vc, vent * 0.85)
    # coronas iluminadas
    C.pon("#8af0ff", st * suave(y_base - 300, y_base - 318, Y) * 0.8)
    C.pon("#ffffff", st * (np.abs(X - 809) < 1.5) * (Y < y_base - 100) * 0.35)
    C.pon("#ffb0f0", jm * suave(y_base - 250, y_base - 280, Y) * 0.9)
    C.pon("#c0f0ff", sw * suave(y_base - 228, y_base - 250, Y) * 0.6)
    C.pon(mezcla(np.broadcast_to(col("#6a5aa8"), (L.h, L.w, 3)), col("#ffb0e0"), suave(y_base, y_base - 330, Y)[..., None] * 0.6), pearl * 0.85)
    esf = L.mascara(lambda P: (P.elip(640, y_base - 118, 17, 17), P.elip(640, y_base - 216, 11, 11), P.elip(640, y_base - 262, 5, 5)))
    v = volumen(esf, 4, -luz, 0.8, 1.1)
    C.pon(mezcla(np.broadcast_to(col("#6a0a4a"), (L.h, L.w, 3)), col("#ff6ab8"), v[..., None]), esf)
    C.pon("#ffd0f0", (np.abs(Y - (y_base - 118)) < 1.2) * esf)
    for gx, gy, r in ((640, y_base - 118, 40), (640, y_base - 216, 26)):
        C.pon("#ff4aa0", np.exp(-(((X - gx) ** 2 + (Y - gy) ** 2) / r ** 2)) * 0.35)
    # --- el Bund: fachadas neoclásicas iluminadas en oro, cúpula y torre del reloj
    bund = []
    x = 40
    while x < 440:
        w_ = rng.uniform(34, 62)
        h_ = rng.uniform(34, 58)
        bund.append((x, w_, h_))
        x += w_ + 1
    bm = L.mascara(lambda P: [P.rect(x_, y_base - h_, x_ + w_, y_base) for x_, w_, h_ in bund] + [P.rect(236, y_base - 92, 256, y_base - 50), P.poly([(236, y_base - 92), (256, y_base - 92), (246, y_base - 106)]),
                                                                                              P.elip(140, y_base - 64, 16, 14)])
    bc = mezcla(np.broadcast_to(col("#3a2a2a"), (L.h, L.w, 3)), col("#e8b060"), (suave(y_base, y_base - 70, Y) * 0.8)[..., None])
    bc = mezcla(bc, col("#5a3a2a"), ((X % 7) < 1.2)[..., None] * 0.4)
    C.pon(bc, bm)
    C.pon("#ffe0a0", ((X % 7 > 3) & ((Y % 9) < 3)).astype(np.float32) * bm * (Y < y_base - 6) * 0.5)
    C.pon("#ffcf8a", np.exp(-(((Y - y_base + 20) / 40) ** 2)) * suave(460, 380, X) * suave(20, 60, X) * 0.25)
    return todo + bm


def pinta(M):
    print("B1 · Agua y tinta de noche")
    L = Lienzo(W, H)
    X, Y = L.X, L.Y
    lx, ly = LUNA

    # ------------------------------------------------------------ 0 · cielo nocturno
    C = Capa(L, cielo(L, [(0, "#050a20"), (0.12, "#0c1840"), (0.26, "#1a2a5e"), (0.36, "#33356c"), (0.43, "#5a4878"), (0.47, "#7a5a80"), (0.5, "#2a2e5c"), (1, "#0a1630")],
                      sol=(lx, ly, 34, "#a8c0ff", 0.55), halo=(lx, ly, 360, 300, "#6a80c8", 0.35), disco="#f4f6ff"))
    rng = np.random.default_rng(5)
    est = np.zeros((H, W), np.float32)
    for _ in range(420):
        sx_, sy_ = rng.uniform(0, W), rng.uniform(0, 620) ** 1.0
        b = rng.uniform(0.2, 1) * (1 - sy_ / 680) * (1 - np.exp(-((sx_ - lx) ** 2 + (sy_ - ly) ** 2) / 120 ** 2))
        x0, y0 = int(sx_), int(sy_)
        est[y0, x0] = max(est[y0, x0], b)
    est = np.clip(desenfoca(est, 0.8) * 9, 0, 1)
    C.pon("#ffffff", est)
    # textura de la luna (mares)
    mar = L.ruido(1.6, 7)
    dl = np.hypot(X - lx, Y - ly)
    C.pon("#b8c0d8", (dl < 33) * suave(0.55, 0.75, mar) * 0.5)
    for i, (cx, cy, w, h, op) in enumerate([(200, 330, 420, 70, 0.85), (700, 290, 360, 60, 0.8), (1000, 380, 320, 70, 0.85), (450, 470, 500, 50, 0.7), (900, 520, 300, 40, 0.6)]):
        nube(C, cx, cy, w, h, 90 + i, (lx, ly - 80), "#7a84c0", "#141a3c", "#e0e8ff", base_c="#2a2a5a", op=op, rim=1.0, plana=True, bultos=12)
    cirros(C, 120, 260, "#6a78b8", 0.3, 17)
    M.capa("cielo", C, 0.06, q=80)

    # ------------------------------------------------------------ 1 · montes de tinta en la niebla (山水)
    C = Capa(L)
    for k, (picos, base, tinta, f) in enumerate([
        ([(60, 560, 150), (240, 520, 130), (420, 585, 160), (900, 540, 150), (1080, 575, 140)], 720, "#3a3f72", 0.45),
        ([(150, 620, 170), (360, 600, 140), (820, 615, 160), (1000, 600, 170)], 740, "#262c5c", 0.3)]):
        pf = perfil_picos(L, picos, rug=14, seed=18 + k, base=base)
        sierra(C, pf, base, luz=LUZ, lit="#6a6fa6", sombra=tinta, aire="#4a4a80", aire_f=f, filo=0.6, filo_c="#b8c4ff", niebla_pie=("#4a4472", 110, 0.95), seed=18 + k, estrias=0.8)
    M.capa("lejos", C, 0.14)

    # ------------------------------------------------------------ 2 · el Bund y Pudong sobre el Huangpu
    C = Capa(L)
    yb = 742
    todo = skyline(C, yb)
    # orilla y río con los reflejos de las luces estirados en vertical
    C.pon("#0a0e20", ((Y > yb - 2) & (Y < yb + 5)).astype(np.float32))
    C.pon("#ffcf8a", ((Y > yb + 3) & (Y < yb + 4.5) & (X < 460)).astype(np.float32) * 0.6)
    ref_rgb = C.rgb.copy()
    ref_a = C.a.copy()
    rio_y0, rio_y1 = yb + 5, 830
    d = np.clip(Y - rio_y0, 0, None)
    ond = L.ruido(1.2, 31, aniso=(4.0, 0.35)) - 0.5
    sy = np.clip(rio_y0 - d * 1.6 - 4 + ond * 4, 0, rio_y0 - 1).astype(np.int64)
    sx = np.clip(X + ond * 8, 0, W - 1).astype(np.int64)
    luces = np.clip(ref_rgb[sy, sx].max(-1) - 0.45, 0, 1)[..., None] * ref_rgb[sy, sx] * 1.6
    luces = vdesenfoca(luces, 6)
    base_rio = agua_noche(L, rio_y0, rio_y1, "#1e2858", "#0a1430", glow=(500, rio_y0, 600, "#4a3a6a", 0.4))
    rio_c = mezcla(base_rio, ref_rgb[sy, sx] * 0.35, (ref_a[sy, sx] * 0.6)[..., None])
    rio_c = np.clip(rio_c + luces * 0.8, 0, 1)
    C.pon(rio_c, ((Y >= rio_y0) & (Y < rio_y1 + 30)).astype(np.float32) * suave(rio_y1 + 30, rio_y1, Y))
    niebla(C, yb - 10, 26, "#5a4a7a", 0.45, 33)
    M.capa("bund", C, 0.24)

    # ------------------------------------------------------------ 3 · pueblo de agua con puente de arco
    C = Capa(L)
    y_agua = 905
    # orillas de piedra que convergen hacia el puente
    orilla = L.mascara(lambda P: (P.poly([(-10, 820), (430, 860), (470, y_agua), (-10, y_agua + 80)]), P.poly([(1110, 815), (680, 860), (640, y_agua), (1110, y_agua + 80)])))
    oc = mezcla(np.broadcast_to(col("#1a2040"), (H, W, 3)), col("#4a5280"), (suave(820, y_agua + 40, Y) * 0.5)[..., None])
    oc = mezcla(oc, col("#0c1024"), ((Y % 7) < 1.1)[..., None] * 0.5)
    C.pon(oc, orilla)
    rng = np.random.default_rng(11)
    ventanas = []
    casas = [(40, 866, 150, 80), (170, 872, 120, 66), (290, 880, 100, 54), (385, 888, 70, 40),
             (1060, 862, 150, 84), (930, 868, 124, 70), (815, 878, 100, 56), (720, 886, 72, 42)]
    for i, (cx, base, w, h) in enumerate(casas):
        P, ybp, ven = casa_agua(w, h, seed=40 + i, ventanas_luz=0.55)
        ox, oy = cx - P.L.w / 2, base - ybp
        C.pega(P, ox, oy)
        ventanas += [(vx + ox, vy + oy, vw, vh) for vx, vy, vw, vh in ven]
    # puente de arco de piedra (拱桥) con escalones y barandilla
    pu = L.mascara(lambda P: P.poly(spline([(400, y_agua), (470, 852), (555, 832), (640, 852), (710, y_agua)], 10) + [(710, y_agua + 2), (400, y_agua + 2)]))
    arco = L.mascara(lambda P: P.elip(555, y_agua + 4, 50, 44))
    pm = np.clip(pu - arco, 0, 1)
    pc_ = mezcla(np.broadcast_to(col("#3a4270"), (H, W, 3)), col("#a8b0d8"), suave(470, 700, X)[..., None] * 0.8)
    pc_ = mezcla(pc_, col("#141a38"), (suave(830, 905, Y) * 0.4)[..., None])
    pc_ = mezcla(pc_, col("#0c1024"), (((X + (np.floor(Y / 6) % 2) * 6) % 12 < 1) | ((Y % 6) < 0.8))[..., None] * 0.35)
    C.pon(pc_, pm)
    C.pon("#c8d0ff", borde(pm, 0, -1.5) * 0.6)
    bar = L.mascara(lambda P: P.linea(spline([(410, y_agua - 30), (470, 842), (555, 822), (640, 842), (700, y_agua - 30)], 10), 2.2))
    C.pon("#5a6290", bar)
    # agua del canal: refleja casas, puente y luces (el arco y su reflejo forman un círculo)
    agua = agua_noche(L, y_agua, 1250, "#16224a", "#070d20", glow=(555, y_agua + 30, 300, "#3a3a6a", 0.4))
    reflejo_capa(C, y_agua, H, agua, f=0.75, olas=2.5, seed=13, brillo="#8a9ad8", oscurece=0.8)
    niebla(C, y_agua - 6, 22, "#3a3a6a", 0.4, 35)
    M.capa("pueblo", C, 0.45)
    ventanas_pueblo = ventanas

    # ------------------------------------------------------------ 4 · casas cercanas sobre el canal
    C = Capa(L)
    y_agua2 = 1170
    ventanas = []
    for i, (cx, base, w, h) in enumerate([(60, 1150, 230, 150), (240, 1166, 150, 100), (1050, 1145, 240, 160), (870, 1162, 150, 104)]):
        P, ybp, ven = casa_agua(w, h, seed=60 + i, ventanas_luz=0.6)
        ox, oy = cx - P.L.w / 2, base - ybp
        C.pega(P, ox, oy)
        ventanas += [(vx + ox, vy + oy, vw, vh) for vx, vy, vw, vh in ven]
    emb = L.mascara(lambda P: (P.poly([(-10, 1150), (340, 1166), (330, y_agua2 + 6), (-10, y_agua2 + 10)]), P.poly([(1110, 1145), (770, 1162), (780, y_agua2 + 6), (1110, y_agua2 + 10)])))
    C.pon(mezcla(np.broadcast_to(col("#141a36"), (H, W, 3)), col("#4a5280"), 0.3), emb)
    agua = agua_noche(L, y_agua2, H, "#122048", "#050a1a")
    reflejo_capa(C, y_agua2, H, agua, f=0.8, olas=3.5, seed=15, brillo="#7080c0", oscurece=0.8)
    # hojas de loto en el agua cercana
    lot = L.mascara(lambda P: [P.elip(x, y, r, r * 0.32) for x, y, r in ((120, 1330, 40), (190, 1390, 52), (60, 1440, 46), (960, 1340, 44), (1030, 1420, 58), (900, 1460, 40))])
    C.pon(mezcla(np.broadcast_to(col("#0c241e"), (H, W, 3)), col("#3a6a50"), volumen(lot, 4, -LUZ, -1)[..., None]), lot)
    C.pon("#8ab0c0", borde(lot, LUZ, -1) * 0.5)
    for x, y in ((180, 1372), (1020, 1400)):
        flor = L.mascara(lambda P: [P.poly([(x, y), (x + np.cos(a) * 12, y - 14 + np.sin(a) * 3), (x + np.cos(a + 0.4) * 6, y - 18)]) for a in np.linspace(-2.4, -0.7, 5)])
        C.pon(mezcla(np.broadcast_to(col("#c86a9a"), (H, W, 3)), col("#ffd8ec"), suave(y, y - 18, Y)[..., None]), flor)
    M.capa("canal", C, 0.7)

    # ------------------------------------------------------------ 5 · primer plano: orilla de piedra y lotos
    C = Capa(L)
    piedra = L.mascara(lambda P: (P.poly(spline([(-20, 1420), (90, 1440), (170, 1480), (210, 1540), (-20, 1540)], 8)), P.poly(spline([(1120, 1400), (1000, 1430), (920, 1490), (900, 1540), (1120, 1540)], 8))))
    C.pon(mezcla(np.broadcast_to(col("#06081a"), (H, W, 3)), col("#2a3260"), volumen(piedra, 10, -LUZ, 0.6)[..., None]), piedra)
    C.pon("#8a9ad8", borde(piedra, LUZ, -1.5) * 0.4)
    M.capa("frente", C, 1.0)

    # ------------------------------------------------------------ piezas animadas
    sp.halo(M.ruta("halo-luna.webp"), 220, "#c8d8ff", 0.75)
    M.actor("cielo", "halo-luna.webp", lx - 150, ly - 150, 300, 300, "respira", dur=7, op=0.9)
    bw, bh = sp.barca(M.ruta("barca.webp"), 150)
    M.actor("canal", "barca.webp", 330, 1205, bw * 0.9, bh * 0.9, "desliza", dur=34, retraso=-6, dx=22, dy=0.6)
    M.actor("canal", "barca.webp", 690, 1290, bw * 1.15, bh * 1.15, "desliza", dur=42, retraso=-25, dx=-24, dy=-0.4, movil=False)
    M.actor("pueblo", "barca.webp", 470, 930, bw * 0.45, bh * 0.45, "desliza", dur=28, retraso=-4, dx=8)
    fw, fh, fcx, _ = sp.farol(M.ruta("farol.webp"), 30, 46)
    for i, (x, y, s) in enumerate([(150, 1012, 0.6), (330, 1078, 0.55), (810, 1006, 0.6), (980, 990, 0.62), (470, 820, 0.36), (640, 820, 0.36), (560, 803, 0.32)]):
        M.actor("canal" if i < 4 else "pueblo", "farol.webp", x - fcx * s, y, fw * s, fh * s, "farol", dur=3.2 + (i % 3) * 0.5, retraso=-i * 0.6, movil=i not in (1, 6))
    sp.reflejo_luz(M.ruta("reflejo.webp"), 24, 120, "#ffb860", seed=3)
    for i, (x, y, s) in enumerate([(150, 1180, 1.0), (330, 1180, 0.9), (810, 1180, 1.0), (980, 1180, 1.0), (470, 915, 0.5), (640, 915, 0.5)]):
        M.actor("canal" if i < 4 else "pueblo", "reflejo.webp", x - 12 * s, y, 24 * s, 120 * s, "tiembla", dur=2.2 + (i % 3) * 0.4, retraso=-i * 0.5, op=0.8, movil=i < 4)
    sp.halo(M.ruta("ventana.webp"), 40, "#ffc060", 0.85, p=2.4)
    for i, (vx, vy, vw, vh) in enumerate(ventanas_pueblo[::2] + ventanas[::2]):
        s = vw * 2.6
        M.actor("pueblo" if i < len(ventanas_pueblo[::2]) else "canal", "ventana.webp", vx - s / 2, vy - s / 2, s, s, "parpadea", dur=round(5 + (i * 1.7) % 6, 2), retraso=-i * 0.9, movil=i % 2 == 0)
    sw_, sh_ = sp.sauce(M.ruta("sauce.webp"), 320, 460, seed=4)
    M.actor("frente", "sauce.webp", -40, 200, sw_, sh_, "cuelga", dur=7, amp=1.6)
    M.actor("frente", "sauce.webp", 860, 230, sw_ * 0.9, sh_ * 0.9, "cuelga", dur=8.2, retraso=-3, amp=1.4, movil=False)
    sp.brillo_agua(M.ruta("brillo.webp"), 300, 40, "#d8e2ff", seed=9)
    M.actor("pueblo", "brillo.webp", 700, 930, 260, 30, "brillo", dur=3.2, op=0.6)
    M.actor("bund", "brillo.webp", 720, 760, 300, 34, "brillo", dur=2.8, retraso=-1, op=0.7)
    M.niebla("lejos", "noche", 44, 9, 0.6, 140)
    M.niebla("pueblo", "noche", 58, 9, 0.45, 100, inversa=True)
    M.niebla("canal", "noche", 82, 12, 0.3, 80, movil=False)
    M.guarda(LUNA, niebla="noche")
