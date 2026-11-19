"""Tramos pintados de la Ruta (v26): node scripts/geometria-tramos.mjs && python3 scripts/tramos-ruta.py [A1 A2 B1 B2]
Pinta el camino de cada unidad Y su terreno con el MISMO pintor que el fondo (scripts/fondos-ruta.py): misma paleta,
misma luz clave, mismo grano, sombras proyectadas al lado contrario de la luz, perspectiva aérea y niebla.
  A1 muralla  · la Gran Muralla sobre una cresta nevada, torres de vigía en las paradas
  A2 sendero  · senda de arena compactada entre dunas, explanadas de arenisca en las paradas
  B1 puente   · puente de piedra en zigzag (九曲桥) sobre el agua de noche, islas con farolillos, reflejos y espuma
  B2 peldanos · escalones tallados en la roca kárstica, rellanos con musgo, bambú y bruma
Salida: public/theme/ruta/tramos/<NIVEL>-v<variante>-p<paradas>-f<fila>.webp (760 px de ancho; el carril de 300 px
queda centrado: x_imagen = x_carril + 230, y_imagen = y_carril + ARRIBA_IMG)."""
import importlib.util
import json
import os
import sys

import numpy as np
from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("fr", os.path.join(AQUI, "fondos-ruta.py"))
fr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fr)
ruido2, desenfoca, suave, hexa, mezcla, Plano, mascara = fr.ruido2, fr.desenfoca, fr.suave, fr.hexa, fr.mezcla, fr.Plano, fr.mascara

ANCHO = 760
OX = 230  # desplazamiento del carril dentro de la imagen
ARRIBA_IMG = 70  # cuánto sube la imagen por encima de la entrada (bajo el estandarte)
ABAJO_IMG = 150  # niebla de transición hacia la siguiente unidad
OUT = os.path.join(AQUI, "..", "public", "theme", "ruta", "tramos")
LUZ = {"A1": 1, "A2": -1, "B1": 1, "B2": -1}  # +1: la luz viene de la derecha


def lienzo(w, h):
    fr.W, fr.H = w, h
    fr.Y, fr.X = np.mgrid[0:h, 0:w].astype(np.float32)
    return fr.X, fr.Y


def campos(m, X, Y):
    """Para cada píxel, la muestra más cercana del recorrido: distancia con signo (normal), longitud s, normal."""
    mx = m[:, 0] + OX
    my = m[:, 1] + ARRIBA_IMG
    px = X.ravel()
    py = Y.ravel()
    idx = np.empty(px.size, np.int32)
    dist = np.empty(px.size, np.float32)
    for a in range(0, px.size, 24000):
        dx = px[a : a + 24000, None] - mx[None, :]
        dy = py[a : a + 24000, None] - my[None, :]
        d2 = dx * dx + dy * dy
        k = np.argmin(d2, axis=1)
        idx[a : a + 24000] = k
        dist[a : a + 24000] = np.sqrt(d2[np.arange(k.size), k])
    k = idx.reshape(X.shape)
    nx = m[k, 2]
    ny = m[k, 3]
    D = (X - (m[k, 0] + OX)) * nx + (Y - (m[k, 1] + ARRIBA_IMG)) * ny
    E = dist.reshape(X.shape)
    # Distancia con signo pero acotada en los extremos (el camino no se prolonga más allá de la entrada y el examen)
    Dc = np.sign(D) * E
    return {"D": Dc.astype(np.float32), "E": E, "S": m[k, 4].astype(np.float32), "NX": nx.astype(np.float32), "NY": ny.astype(np.float32), "SEG": m[k, 5]}


def textura(S, D, n, ks, kd, seed):
    """Ruido muestreado en coordenadas del recorrido (s a lo largo, d a lo ancho) para vetas que siguen el camino."""
    t = ruido2(n, n, 1.8, seed)
    i = (np.abs(S * ks).astype(np.int64)) % n
    j = (np.abs(D * kd + n / 2).astype(np.int64)) % n
    return t[i, j]


def luz_superficie(H_, L, k=40.0):
    gx = np.gradient(H_, axis=1)
    gy = np.gradient(H_, axis=0)
    # luz desde arriba y del lado L: normal ≈ (-gx, -gy, 1); dirección de la luz (L·0.75, -0.45, 0.5)
    lam = (-gx * L * 0.75 + gy * 0.45) * k + 0.5
    return np.clip(lam, 0, 1)


def niebla_vertical(p, Y, alto_img, y_fin, col):
    """Entrada fundida con niebla bajo el estandarte y salida en bruma hacia la siguiente unidad."""
    p.pon(hexa(col), suave(ARRIBA_IMG + 40, 6, Y) * 0.9)
    p.pon(hexa(col), suave(y_fin, alto_img - 20, Y) * 0.92)


def recorta(p, E, R, Y, alto_img, y_fin, rng_borde):
    """Borde irregular y fundido: el terreno se disuelve en el paisaje a los lados, arriba y abajo."""
    borde = suave(R + 60 + rng_borde * 40, R - 50 + rng_borde * 30, E)
    arriba = suave(4, ARRIBA_IMG + 30, Y)
    abajo = suave(alto_img - 6, y_fin + 10, Y)
    p.a = p.a * np.clip(borde, 0, 1) * arriba * abajo


def plataforma_mask(cx, cy, rx, ry, X, Y):
    return np.clip(1 - ((X - cx) / rx) ** 2 - ((Y - cy) / ry) ** 2, 0, 1) ** 0.08 * ((((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2) < 1)


def cara_frontal(mask, alto):
    """Cara que mira al espectador bajo una superficie (proyección ¾): la máscara desplazada hacia abajo."""
    acum = np.zeros_like(mask)
    for k in range(1, alto + 1):
        acum = np.maximum(acum, np.roll(mask, k, axis=0))
    acum[:alto] = 0
    return np.clip(acum - mask, 0, 1)


def sombra_proyectada(p, mask, L, dx, dy, f, col="#1a2240", r=6):
    sm = np.roll(np.roll(mask, int(dy), axis=0), int(-L * dx), axis=1)
    sm = desenfoca(sm, r) * (1 - mask)
    p.pon(hexa(col), np.clip(sm * f, 0, 1) * (p.a > 0.05))


# ====================================================================== A1 · Gran Muralla sobre la cresta
def pinta_A1(t, X, Y, c, var, rng):
    L = LUZ["A1"]
    D, E, S, NX = c["D"], c["E"], c["S"], c["NX"]
    W_, H_ = X.shape[1], X.shape[0]
    p = Plano()
    R = 118 + 22 * np.sin(S / 70 + var) + 10 * np.sin(S / 23)
    # cresta: la muralla va por el filo; la ladera de delante (hacia el espectador) es larga, la de detrás corta
    delante = (D * c["NY"]) > 0
    Rl = np.where(delante, R * 1.35, R * 0.75)
    h = np.clip(1 - (np.abs(D) / Rl) ** 1.4, 0, 1)
    gul = ruido2(H_, W_, 2.2, 11 + var, aniso=(1.0, 5.0))  # torrenteras que bajan por la ladera
    Hs = h * 60 + (gul - 0.5) * 8 * h
    ilum = luz_superficie(desenfoca(Hs, 3), L, 30)
    roca = mezcla(np.broadcast_to(hexa("#55658a"), Hs.shape + (3,)), hexa("#c4ab92"), ilum)
    nieve_lim = 0.2 + 0.45 * gul
    nieve = suave(nieve_lim - 0.12, nieve_lim + 0.06, h) * np.clip(0.65 + 0.6 * ilum, 0, 1)
    nieve = np.maximum(nieve, suave(0.55, 0.7, ruido2(H_, W_, 2.4, 40 + var)) * 0.9)
    col = mezcla(roca, mezcla(hexa("#a3b6d6"), hexa("#fffaf2"), ilum), np.clip(nieve, 0, 1))
    tex = ruido2(H_, W_, 1.3, 5 + var) - 0.5
    col = col * (1 + tex[..., None] * 0.1)
    # perspectiva aérea: las laderas lejos del camino se funden con el aire del fondo
    col = mezcla(col, hexa("#dfe5ee"), np.clip((np.abs(D) / Rl) ** 2 * 0.6, 0, 0.65))
    p.pon(col, np.ones_like(D))
    # --- la muralla: adarve enlosado, parapetos con almenas y cara de ladrillo hacia el espectador
    adarve = suave(23.5, 22, np.abs(D)) * (S > 4)
    cara = cara_frontal(adarve, 16)
    muro_total = np.clip(adarve + cara, 0, 1)
    sombra_proyectada(p, muro_total, L, 14, 16, 0.45, "#34436a", 7)
    fila = (Y // 5).astype(np.int32)
    ladrillo = ((((X + (fila % 2) * 6) % 12) < 1.1) | ((Y % 5) < 1)).astype(np.float32)
    c_cara = mezcla(np.broadcast_to(hexa("#9a8c78"), D.shape + (3,)), hexa("#5e5446"), ladrillo * 0.7)
    p.pon(c_cara * (0.85 + 0.15 * suave(-1, 1, X / W_ * 2 - 1)[..., None] * L), cara)
    losa = ((((S + (np.floor(D / 7) % 2) * 4) % 8) < 1.0) | ((np.abs(D) % 7) < 0.9)).astype(np.float32)
    peldano = ((S % 9) < 1.6).astype(np.float32)
    c_adarve = mezcla(np.broadcast_to(hexa("#b7ab95"), D.shape + (3,)), hexa("#7d7262"), losa * 0.55)
    c_adarve = mezcla(c_adarve, hexa("#5a5060"), peldano * 0.45)
    c_adarve = mezcla(c_adarve, hexa("#fbfcff"), suave(12, 18, np.abs(D)) * (ruido2(H_, W_, 1.4, 61) > 0.4) * 0.85)
    c_adarve = c_adarve * (1 + (ruido2(H_, W_, 1.0, 8) - 0.5)[..., None] * 0.12)
    c_adarve = mezcla(c_adarve, hexa("#fff2d8"), suave(-12, 22, D * NX * L) * 0.25)  # luz cálida del sol bajo
    p.pon(c_adarve, adarve)
    for lado in (1, -1):
        par = suave(4.5, 2.5, np.abs(D - lado * 20)) * (S > 4)
        merlon = par * ((S % 12) < 6.5)
        p.pon(hexa("#7d7466"), cara_frontal(merlon, 6))
        p.pon(mezcla(hexa("#cfc6b2"), hexa("#f4eedf"), 0.5 + 0.5 * L * lado * np.sign(NX + 1e-6)), par)
        p.pon(hexa("#fbf8f0"), merlon)
    # --- torres de vigía en las paradas
    for i, (sx, sy) in enumerate(t["pts"][:-1]):
        x0, y0 = sx + OX, sy + ARRIBA_IMG
        top = (np.abs(X - x0) < 62) & (Y > y0 + 6) & (Y < y0 + 58)
        top = top.astype(np.float32)
        frente = ((np.abs(X - x0) < 62) & (Y >= y0 + 58) & (Y < y0 + 92)).astype(np.float32)
        sombra_proyectada(p, np.clip(top + frente, 0, 1), L, 18, 18, 0.5, "#34436a", 8)
        fila = (Y // 6).astype(np.int32)
        ladr = ((((X + (fila % 2) * 7) % 14) < 1.2) | ((Y % 6) < 1)).astype(np.float32)
        cf = mezcla(np.broadcast_to(hexa("#a99a82"), D.shape + (3,)), hexa("#5e5446"), ladr * 0.65)
        cf = mezcla(cf, hexa("#4a4458"), suave(-62, 62, (X - x0) * -L) * 0.35)  # el lado lejos del sol, más oscuro
        cf = mezcla(cf, hexa("#3a3440"), suave(y0 + 60, y0 + 92, Y) * 0.25)
        p.pon(cf, frente)
        puerta = ((np.abs(X - x0) < 11) & (Y > y0 + 76)) | (((X - x0) ** 2 + (Y - (y0 + 76)) ** 2) < 121)
        p.pon(hexa("#241c1c"), puerta.astype(np.float32) * frente)
        lt = ((((X - x0 + 62) % 17) < 1.2) | (((Y - y0) % 11) < 1.2)).astype(np.float32)
        ct = mezcla(np.broadcast_to(hexa("#ddd3bd"), D.shape + (3,)), hexa("#968a74"), lt * 0.7)
        ct = mezcla(ct, hexa("#fff4dc"), suave(-62, 62, (X - x0) * L) * 0.3)
        p.pon(ct, top)
        # almenas del borde trasero y de los lados (la nieve se queda encima)
        alm = ((np.abs(X - x0) < 62) & (Y > y0 - 4) & (Y < y0 + 8) & (((X - x0 + 62) % 14) < 8)).astype(np.float32)
        p.pon(hexa("#857a68"), alm)
        p.pon(hexa("#fbfcff"), alm * (Y < y0 + 0))
        p.pon(hexa("#f6f2e8"), ((np.abs(X - x0) < 63) & (np.abs(Y - (y0 + 58)) < 2)).astype(np.float32))
        # cara lateral del lado contrario a la sol (volumen) y nieve sobre el parapeto delantero
        lat = ((X - x0) * -L > 62) & ((X - x0) * -L < 72) & (Y > y0 + 4 + ((X - x0) * -L - 62) * 0.6) & (Y < y0 + 90)
        p.pon(hexa("#5a5266"), lat.astype(np.float32))
        p.pon(hexa("#fbfcff"), ((np.abs(X - x0) < 63) & (Y > y0 + 54) & (Y < y0 + 58) & (ruido2(H_, W_, 1.0, 60 + i) > 0.35)).astype(np.float32))
    plaza(p, t, X, Y, D, "A1")
    # --- pinos nevados en las laderas (los de delante tapan el borde de la muralla: oclusión)
    lista = []
    for k in range(70):
        s0 = rng.uniform(0, t["m"][-1][4])
        j = int(np.argmin(np.abs(np.array([q[4] for q in t["m"]]) - s0)))
        q = t["m"][j]
        lado = rng.choice([-1, 1])
        off = rng.uniform(44, 130)
        x = q[0] + q[2] * lado * off + OX
        y = q[1] + q[3] * lado * off + ARRIBA_IMG + 12
        if any(np.hypot(x - (px + OX), y - (py + ARRIBA_IMG + 40)) < 95 for px, py in t["pts"]):
            continue
        lista.append((x, y, rng.uniform(26, 58)))
    lista.sort(key=lambda a: a[1])
    fr.pinos_nevados(p, lista, verde="#1f3a33", nieve="#f4f8ff", aire="#dfe5ee", aire_f=0.15, luz=L, seed=var)
    return p, "#eef1f5"


# ====================================================================== A2 · Senda entre dunas
def pinta_A2(t, X, Y, c, var, rng):
    L = LUZ["A2"]
    D, S, NX = c["D"], c["S"], c["NX"]
    H_, W_ = X.shape
    p = Plano()
    ad = np.abs(D)
    # dunas pintadas con la MISMA función que el fondo (fondos-ruta.cordillera, forma «duna»), en filas a los lados
    base = mezcla(np.broadcast_to(hexa("#f2c08a"), D.shape + (3,)), hexa("#e8a878"), suave(0, H_, Y) * 0.5)
    p.pon(base * (1 + (ruido2(H_, W_, 1.2, 9 + var) - 0.5)[..., None] * 0.05), np.ones_like(D))
    mm = np.array(t["m"])
    for fila_k, yb in enumerate(range(ARRIBA_IMG + 70, H_ - 40, 92)):
        j = int(np.argmin(np.abs(mm[:, 1] + ARRIBA_IMG - yb)))
        px = mm[j, 0] + OX
        picos = []
        for lado in (-1, 1):
            x = px + lado * rng.uniform(70, 100)
            while -120 < x < W_ + 120:
                picos.append((x, yb - rng.uniform(34, 62), rng.uniform(60, 95)))
                x += lado * rng.uniform(95, 140)
        rng.shuffle(picos)
        fr.cordillera(p, picos, yb, luz=L, lit="#ffd9a0", sombra="#c98270", forma="duna", rugosidad=3, seed=200 + fila_k * 7 + var,
                      filo=0.9, textura=0.05, aire="#f6c48e", aire_f=0.08, niebla=("#f4c690", 30, 0.35))
    # la senda abre un pasillo llano entre las dunas
    p.pon(hexa("#efbd88"), suave(40, 24, ad) * (S > 2))
    # --- la senda: arena compactada, bordes hundidos, huellas de camello
    senda = suave(22, 18, ad) * (S > 2)
    # cuneta en sombra a ambos lados (la senda va un poco hundida) y piedras que la bordean
    p.pon(hexa("#9a5a4a"), suave(27, 22, ad) * (1 - senda) * (S > 2) * 0.7)
    c_senda = mezcla(np.broadcast_to(hexa("#c98a5a"), D.shape + (3,)), hexa("#e9b27a"), suave(-18, 18, D * NX * -L) * 0.7)
    c_senda = c_senda * (1 + (ruido2(H_, W_, 1.0, 12) - 0.5)[..., None] * 0.1)
    p.pon(c_senda, senda)
    p.pon(hexa("#a86a50"), suave(5, 0, np.abs(ad - 20)) * 0.35 * (S > 2))
    huella = (((S % 15) < 4) & (np.abs(D - np.where((S // 15) % 2 == 0, 5, -5)) < 2.6)).astype(np.float32)
    p.pon(hexa("#8a4a3a"), huella * 0.6 * senda)
    piedra = (((S % 23) < 5) & (np.abs(ad - 25) < 3.2)).astype(np.float32)
    p.pon(hexa("#7a4a3a"), cara_frontal(piedra, 2) * 0.8)
    p.pon(hexa("#e8c090"), piedra)
    # --- explanadas de arenisca en las paradas (con poste y farol)
    for i, (sx, sy) in enumerate(t["pts"][:-1]):
        x0, y0 = sx + OX, sy + ARRIBA_IMG + 36
        top = (((X - x0) / 70) ** 2 + ((Y - y0) / 28) ** 2 < 1).astype(np.float32)
        sombra_proyectada(p, top, L, 16, 14, 0.4, "#6a2a3a", 7)
        p.pon(hexa("#8a4a3a"), cara_frontal(top, 10))
        lt = (ruido2(H_, W_, 1.6, 90 + i) > 0.62).astype(np.float32)
        ct = mezcla(np.broadcast_to(hexa("#e2b07a"), D.shape + (3,)), hexa("#b07a50"), lt * 0.45)
        ct = mezcla(ct, hexa("#ffe2b0"), suave(-70, 70, (X - x0) * -L) * 0.4)
        p.pon(ct, top)
        p.pon(hexa("#fff0cc"), suave(2.2, 0, np.abs(np.sqrt(((X - x0) / 70) ** 2 + ((Y - y0) / 28) ** 2) - 1) * 70) * 0.5)
    plaza(p, t, X, Y, D, "A2")
    # --- matas de tamarisco y rocas en las laderas
    for k in range(26):
        q = t["m"][int(rng.uniform(0, len(t["m"])))]
        lado = rng.choice([-1, 1])
        off = rng.uniform(34, 120)
        x = q[0] + q[2] * lado * off + OX
        y = q[1] + q[3] * lado * off + ARRIBA_IMG
        if any(np.hypot(x - (px + OX), y - (py + ARRIBA_IMG + 36)) < 90 for px, py in t["pts"]):
            continue
        r = rng.uniform(5, 11)
        mata = np.clip(1 - ((X - x) / r) ** 2 - ((Y - y) / (r * 0.7)) ** 2, 0, 1) > 0
        mata = mata.astype(np.float32)
        sombra_proyectada(p, mata, L, 8, 5, 0.35, "#6a2a3a", 3)
        p.pon(mezcla(np.broadcast_to(hexa("#5a5a2a"), D.shape + (3,)), hexa("#a8a050"), suave(-r, r, (X - x) * -L) * 0.7), mata)
    return p, "#f6d4a0"


# ====================================================================== B1 · Puente en zigzag sobre el agua (noche)
def pinta_B1(t, X, Y, c, var, rng):
    L = LUZ["B1"]
    D, S, NX = c["D"], c["S"], c["NX"]
    H_, W_ = X.shape
    p = Plano()
    # agua: azul noche con ondas, más clara cerca del puente (luz de farolillos)
    ond = ruido2(H_, W_, 1.5, 20 + var, aniso=(5.0, 0.6))
    agua = mezcla(np.broadcast_to(hexa("#0b2238"), D.shape + (3,)), hexa("#1d3d62"), ond * 0.8)
    agua = mezcla(agua, hexa("#c9d6ff"), suave(0.8, 0.95, ond) * 0.25)  # destellos de luna
    p.pon(agua, np.ones_like(D))
    # hojas de loto
    for k in range(18):
        q = t["m"][int(rng.uniform(0, len(t["m"])))]
        lado = rng.choice([-1, 1])
        off = rng.uniform(40, 140)
        x = q[0] + q[2] * lado * off + OX
        y = q[1] + q[3] * lado * off + ARRIBA_IMG
        if any(np.hypot(x - (px + OX), y - (py + ARRIBA_IMG + 36)) < 90 for px, py in t["pts"]):
            continue
        r = rng.uniform(9, 17)
        hoja = (((X - x) / r) ** 2 + ((Y - y) / (r * 0.38)) ** 2 < 1).astype(np.float32)
        p.pon(mezcla(np.broadcast_to(hexa("#183a30"), D.shape + (3,)), hexa("#3f6f50"), suave(-r, r, (X - x) * L) * 0.6), hoja)
        if rng.random() < 0.3:
            p.pon(hexa("#f0a0bc"), np.clip(1 - ((X - x) / 3.5) ** 2 - ((Y - y + 4) / 4.5) ** 2, 0, 1))
    # --- el puente: tablero de granito, barandillas bajas con postes, cara lateral con arcos, reflejo y espuma
    tablero = suave(17.5, 16, np.abs(D)) * (S > 2)
    cara = cara_frontal(tablero, 12)
    total = np.clip(tablero + cara, 0, 1)
    # reflejo del puente en el agua (invertido, ondulado, 30 %)
    refl = np.roll(total, 30, axis=0)
    desp = ((ruido2(H_, W_, 1.0, 33, aniso=(4, 0.5)) - 0.5) * 6).astype(np.int32)
    refl = refl[np.clip(np.arange(H_)[:, None] + 0 * desp, 0, H_ - 1), np.clip(np.arange(W_)[None, :] + desp, 0, W_ - 1)]
    p.pon(hexa("#4a5678"), refl * (1 - total) * 0.3)
    p.pon(hexa("#000814"), cara_frontal(total, 4) * 0.35)
    fila = (Y // 6).astype(np.int32)
    piedra = ((((X + (fila % 2) * 8) % 16) < 1.1) | ((Y % 6) < 1)).astype(np.float32)
    c_cara = mezcla(np.broadcast_to(hexa("#4a5470"), D.shape + (3,)), hexa("#2a3048"), piedra * 0.6)
    p.pon(c_cara, cara)
    espuma = cara_frontal(total, 2) * (ruido2(H_, W_, 0.8, 34) > 0.45)
    p.pon(hexa("#dfe8ff"), espuma * 0.55)
    losa = (((S % 11) < 1.1) | (np.abs(D) < 0.6)).astype(np.float32)
    c_tab = mezcla(np.broadcast_to(hexa("#7c86a0"), D.shape + (3,)), hexa("#4a5270"), losa * 0.6)
    c_tab = mezcla(c_tab, hexa("#b8c6e8"), suave(-16, 16, D * NX * L) * 0.35)  # luna desde la derecha
    c_tab = c_tab * (1 + (ruido2(H_, W_, 1.0, 35) - 0.5)[..., None] * 0.12)
    p.pon(c_tab, tablero)
    for lado in (1, -1):
        bar = suave(2.6, 1.2, np.abs(D - lado * 15.5)) * (S > 2)
        p.pon(hexa("#9aa6c6"), bar)
        poste = bar * ((S % 18) < 3)
        p.pon(hexa("#c8d2ee"), poste)
    # --- islas de piedra octogonales con farolillos en las paradas
    farolas = []
    for i, (sx, sy) in enumerate(t["pts"][:-1]):
        x0, y0 = sx + OX, sy + ARRIBA_IMG + 36
        ox_ = np.abs(X - x0) / 74
        oy_ = np.abs(Y - y0) / 30
        top = ((ox_ < 1) & (oy_ < 1) & (ox_ + oy_ < 1.45)).astype(np.float32)
        p.pon(hexa("#4a5678"), np.roll(top, 40, axis=0) * 0.25 * (1 - top))
        p.pon(mezcla(np.broadcast_to(hexa("#3a4260"), D.shape + (3,)), hexa("#232a40"), piedra * 0.5), cara_frontal(top, 13))
        p.pon(hexa("#dfe8ff"), cara_frontal(cara_frontal(top, 13) + top, 2) * 0.5)
        lt = ((((X - x0) % 14) < 1.1) | (((Y - y0) % 10) < 1.1)).astype(np.float32)
        ct = mezcla(np.broadcast_to(hexa("#8a94b0"), D.shape + (3,)), hexa("#555d7a"), lt * 0.6)
        ct = mezcla(ct, hexa("#ffcf8a"), np.exp(-(((X - x0) ** 2 + (Y - y0) ** 2) / 2600)) * 0.35)  # luz de farolillo
        p.pon(ct, top)
        farolas += [(x0 - 60, y0 - 16), (x0 + 60, y0 - 16)]
    for k in range(0, int(t["m"][-1][4]), 90):
        j = int(np.argmin(np.abs(np.array([q[4] for q in t["m"]]) - (k + 45))))
        q = t["m"][j]
        lado = 1 if (k // 90) % 2 else -1
        farolas.append((q[0] + q[2] * lado * 16 + OX, q[1] + q[3] * lado * 16 + ARRIBA_IMG - 12))
    plaza(p, t, X, Y, D, "B1")
    for fx, fy in farolas:
        if fy < ARRIBA_IMG + 20:
            continue
        p.pon(hexa("#ff9a4a"), np.exp(-(((X - fx) ** 2 + (Y - fy) ** 2) / 500)) * 0.45)
        p.pon(hexa("#ffb060"), np.exp(-(((X - fx) / 3) ** 2 + ((Y - fy - 46) / 26) ** 2)) * 0.45)  # reflejo vertical
        p.pon(hexa("#3a2a20"), ((np.abs(X - fx) < 0.9) & (Y > fy) & (Y < fy + 14)).astype(np.float32))
        p.pon(mezcla(np.broadcast_to(hexa("#ffd88a"), D.shape + (3,)), hexa("#d8402a"), suave(fy - 6, fy + 6, Y)), np.clip(1.2 - ((X - fx) / 5.5) ** 2 - ((Y - fy) / 7) ** 2, 0, 1))
    return p, "#1c2a48"


# ====================================================================== B2 · Escalones tallados en el karst
def pinta_B2(t, X, Y, c, var, rng):
    L = LUZ["B2"]
    D, S, NX = c["D"], c["S"], c["NX"]
    H_, W_ = X.shape
    p = Plano()
    ad = np.abs(D)
    # fondo de bruma y torres kársticas pintadas con la MISMA función que el fondo (cordillera, forma «karst»)
    p.pon(mezcla(np.broadcast_to(hexa("#e6efe6"), D.shape + (3,)), hexa("#cfe0d6"), suave(0, H_, Y)), np.ones_like(D))
    mm = np.array(t["m"])
    for fila_k, yb in enumerate(range(ARRIBA_IMG + 110, H_ - 30, 120)):
        j = int(np.argmin(np.abs(mm[:, 1] + ARRIBA_IMG - yb)))
        px = mm[j, 0] + OX
        picos = []
        for lado in (-1, 1):
            x = px + lado * rng.uniform(95, 125)
            while -100 < x < W_ + 100:
                picos.append((x, yb - rng.uniform(120, 190), rng.uniform(42, 62)))
                x += lado * rng.uniform(80, 120)
        rng.shuffle(picos)
        fr.cordillera(p, picos, yb, luz=L, lit="#9cc4a6", sombra="#3f6a5e", pie="#cfe0d6", forma="karst", rugosidad=8, seed=300 + fila_k * 5 + var,
                      aire="#cfe0d6", aire_f=0.12 + 0.05 * (fila_k % 2), niebla=("#eef3ec", 90, 0.85), torrentes=0.7, filo=0.5, textura=0.2)
        n = ruido2(H_, W_, 2.4, 330 + fila_k, aniso=(5.0, 1.0))
        p.pon(hexa("#f2f6ef"), np.exp(-(((Y - yb + 10) / 26) ** 2)) * (0.45 + 0.5 * n) * 0.8)
    # arista de caliza que lleva los escalones (estrías verticales, musgo en las caras al sol)
    R = 70 + 12 * np.sin(S / 64 + var) + 6 * np.sin(S / 19)
    h = np.clip(1 - (ad / R) ** 1.3, 0, 1)
    estr = ruido2(H_, W_, 2.0, 21 + var, aniso=(1.0, 6.0))
    Hs = h * 70 + (estr - 0.5) * 14
    ilum = luz_superficie(desenfoca(Hs, 2), L, 26)
    roca = mezcla(np.broadcast_to(hexa("#3f5a52"), D.shape + (3,)), hexa("#c9cbb6"), ilum)
    roca = mezcla(roca, hexa("#2f4a40"), suave(0.55, 0.2, estr) * 0.25)
    musgo = suave(0.5, 0.68, ruido2(H_, W_, 2.2, 22 + var)) * np.clip(ilum + 0.3, 0, 1)
    roca = mezcla(roca, mezcla(hexa("#3f7a4a"), hexa("#9cc47a"), ilum), musgo * 0.85)
    roca = roca * (1 + (ruido2(H_, W_, 1.2, 23) - 0.5)[..., None] * 0.1)
    p.pon(mezcla(roca, hexa("#dfe9e2"), suave(R - 30, R + 10, ad) * 0.5), suave(R + 22, R - 14, ad) * (Y > ARRIBA_IMG - 20))
    # --- escalones tallados: huella clara, contrahuella en sombra, cajeado con borde
    corte = suave(22, 20, ad) * (S > 2)
    sombra_proyectada(p, corte, L, 8, 6, 0.35, "#1d3a30", 4)
    p.pon(hexa("#3a4a42"), suave(26, 21, ad) * (S > 2) * (1 - corte))
    huella = ((S % 9) > 3.2).astype(np.float32)
    c_esc = mezcla(np.broadcast_to(hexa("#6a7a70"), D.shape + (3,)), hexa("#e6e2d0"), huella)
    c_esc = mezcla(c_esc, hexa("#fffbea"), suave(-20, 20, D * NX * -L) * 0.25 * huella)
    c_esc = c_esc * (1 + (ruido2(H_, W_, 1.0, 24) - 0.5)[..., None] * 0.14)
    p.pon(c_esc, corte)
    # --- rellanos de roca con musgo y linterna de piedra en las paradas
    for i, (sx, sy) in enumerate(t["pts"][:-1]):
        x0, y0 = sx + OX, sy + ARRIBA_IMG + 36
        rr = np.sqrt(((X - x0) / 72) ** 2 + ((Y - y0) / 28) ** 2) + (ruido2(H_, W_, 1.6, 40 + i) - 0.5) * 0.12
        top = (rr < 1).astype(np.float32)
        sombra_proyectada(p, top, L, 16, 16, 0.45, "#1d3a30", 7)
        p.pon(mezcla(np.broadcast_to(hexa("#5a6a60"), D.shape + (3,)), hexa("#2f3a34"), estr), cara_frontal(top, 14))
        ct = mezcla(np.broadcast_to(hexa("#b9bca8"), D.shape + (3,)), hexa("#eef0e0"), suave(-72, 72, (X - x0) * -L) * 0.7)
        ct = mezcla(ct, hexa("#6aa060"), suave(0.85, 1.0, rr) * 0.7)
        p.pon(ct, top)
    plaza(p, t, X, Y, D, "B2")
    # --- bambú y bruma que cruza el camino (integra el tramo en la niebla del fondo)
    for k in range(5):
        q = t["m"][int(rng.uniform(len(t["m"]) * 0.15, len(t["m"]) * 0.9))]
        lado = rng.choice([-1, 1])
        x = q[0] + q[2] * lado * rng.uniform(90, 130) + OX
        y = q[1] + ARRIBA_IMG + 40
        for s_ in range(5):
            bx = x + rng.uniform(-14, 14)
            alto = rng.uniform(70, 140)
            tallo = ((np.abs(X - bx - (y - Y) * 0.06) < 2.2) & (Y < y) & (Y > y - alto)).astype(np.float32)
            p.pon(mezcla(np.broadcast_to(hexa("#3f6a3a"), D.shape + (3,)), hexa("#9cc47a"), suave(-2, 2, (X - bx) * -L)), tallo)
            for hj in range(5):
                hy = y - alto * rng.uniform(0.4, 1)
                hx = bx + (y - hy) * 0.06
                a = rng.uniform(-0.5, 0.5) + (np.pi if rng.random() < 0.5 else 0)
                ang = rng.uniform(0.35, 0.9) * (1 if np.cos(a) > 0 else -1)
                cxh, cyh = hx + np.cos(a) * 10, hy + 6
                u_ = (X - cxh) * np.cos(ang) + (Y - cyh) * np.sin(ang)
                v_ = -(X - cxh) * np.sin(ang) + (Y - cyh) * np.cos(ang)
                hoja = ((u_ / 12) ** 2 + (v_ / (2.8 * (1 - np.clip(np.abs(u_) / 12, 0, 1)) + 0.3)) ** 2 < 1).astype(np.float32)
                p.pon(mezcla(np.broadcast_to(hexa("#2f6a3a"), D.shape + (3,)), hexa("#8fbf6a"), 0.3 + 0.5 * (np.cos(a) * -L > 0)), hoja)
    return p, "#eef3ec"


# ====================================================================== Explanada del examen (jefe de la unidad)
def plaza(p, t, X, Y, D, nivel):
    sx, sy = t["pts"][-1]
    x0, y0 = sx + OX, sy + ARRIBA_IMG + 58
    L = LUZ[nivel]
    mat = {
        "A1": ("#d9cfb8", "#8f8470", "#6a6070", "#fff4dc", "#34436a"),
        "A2": ("#e2b07a", "#9a5f40", "#7a3a3a", "#ffe2b0", "#6a2a3a"),
        "B1": ("#7c86a0", "#4a5270", "#2a3048", "#ffcf8a", "#000814"),
        "B2": ("#c9cab8", "#7a8a7c", "#3f4a44", "#fffbea", "#1d3a30"),
    }[nivel]
    for rx, ry, dy, alto in ((132, 38, 14, 14), (106, 30, -2, 11)):
        top = ((((X - x0) / rx) ** 2 + ((Y - (y0 + dy)) / ry) ** 2) < 1).astype(np.float32)
        if alto == 14:
            sombra_proyectada(p, top, L, 22, 20, 0.5, mat[4], 9)
        p.pon(mezcla(np.broadcast_to(hexa(mat[2]), Y.shape + (3,)), hexa(mat[1]), suave(-rx, rx, (X - x0) * L) * 0.6), cara_frontal(top, alto))
        rr = np.sqrt(((X - x0) / rx) ** 2 + ((Y - (y0 + dy)) / ry) ** 2)
        ang = np.arctan2((Y - (y0 + dy)) / ry, (X - x0) / rx)
        lt = (((rr * 5) % 1 < 0.07) | (((ang / np.pi * 12 + np.floor(rr * 5) * 0.5) % 1) < 0.05 * (rr > 0.2))).astype(np.float32)
        ct = mezcla(np.broadcast_to(hexa(mat[0]), Y.shape + (3,)), hexa(mat[1]), lt * 0.4)
        ct = ct * (1 + (ruido2(Y.shape[0], Y.shape[1], 1.0, 70 + dy) - 0.5)[..., None] * 0.1)
        ct = mezcla(ct, hexa(mat[3]), suave(-rx, rx, (X - x0) * L) * 0.35)
        p.pon(ct, top)
        p.pon(hexa(mat[3]), suave(2, 0, np.abs(np.sqrt(((X - x0) / rx) ** 2 + ((Y - (y0 + dy)) / ry) ** 2) - 1) * rx) * 0.55)
    # escalinata frontal
    for k in range(3):
        esc = ((np.abs(X - x0) < 30 - k * 3) & (Y > y0 + 34 + k * 6) & (Y < y0 + 39 + k * 6)).astype(np.float32)
        p.pon(hexa(mat[0]), esc)
        p.pon(hexa(mat[2]), ((np.abs(X - x0) < 30 - k * 3) & (Y >= y0 + 39 + k * 6) & (Y < y0 + 41 + k * 6)).astype(np.float32))


PINTORES = {"A1": pinta_A1, "A2": pinta_A2, "B1": pinta_B1, "B2": pinta_B2}


def tramo(t):
    alto_img = t["alto"] + ARRIBA_IMG + ABAJO_IMG
    X, Y = lienzo(ANCHO, alto_img)
    m = np.array(t["m"], np.float32)
    c = campos(m, X, Y)
    rng = np.random.default_rng(1000 + t["variante"] * 10 + t["paradas"] + (0 if t["fila"] == 150 else 5))
    p, niebla = PINTORES[t["nivel"]](t, X, Y, c, t["variante"], rng)
    y_fin = t["pts"][-1][1] + ARRIBA_IMG + 120
    R = {"A1": 150, "A2": 175, "B1": 165, "B2": 155}[t["nivel"]]
    borde = ruido2(alto_img, ANCHO, 2.2, 77 + t["variante"])
    recorta(p, c["E"], R, Y, alto_img, y_fin, borde)
    # bruma de entrada (bajo el estandarte) y de salida (hacia la siguiente unidad), a todo el ancho y deshilachada
    col_n = niebla if t["nivel"] != "B1" else "#22305a"
    n = ruido2(alto_img, ANCHO, 2.4, 88 + t["variante"], aniso=(5.0, 1.0))
    lados = suave(0, 120, X) * suave(ANCHO, ANCHO - 120, X)
    # v30: la bruma de entrada y salida es solo un velo deshilachado; entre unidades se abre la vista del paisaje
    p.pon(hexa(col_n), suave(ARRIBA_IMG + 46, 4, Y) * (0.55 + 0.45 * n) * lados * 0.22)
    p.pon(hexa(col_n), suave(y_fin - 10, alto_img - 30, Y) * (0.6 + 0.4 * n) * lados * 0.22)
    p.a = p.a * np.clip(suave(4, ARRIBA_IMG + 40, Y) * suave(alto_img - 10, y_fin - 30, Y) + 0.0, 0, 1)
    p.a = p.a * suave(alto_img - 2, alto_img - 26, Y) * suave(0, 10, Y)
    nombre = f"{t['nivel']}-v{t['variante']}-p{t['paradas']}-f{t['fila']}.webp"
    os.makedirs(OUT, exist_ok=True)
    g = ruido2(alto_img, ANCHO, 0.2, 99) - 0.5  # mismo grano que el fondo
    rgb = np.clip(p.rgb + g[..., None] * 0.025, 0, 1)
    Image.fromarray(np.clip(np.dstack([rgb, p.a]) * 255, 0, 255).astype(np.uint8), "RGBA").save(os.path.join(OUT, nombre), quality=80, method=6, alpha_quality=70)
    print("  ", nombre)


if __name__ == "__main__":
    datos = json.load(open(os.path.join(AQUI, ".tramos-geometria.json")))
    pedidos = sys.argv[1:] or ["A1", "A2", "B1", "B2"]
    solo_uno = "--uno" in pedidos
    pedidos = [a for a in pedidos if not a.startswith("--")]
    for t in datos:
        if t["nivel"] in pedidos and (not solo_uno or (t["variante"] == 0 and t["paradas"] == 2 and t["fila"] == 150)):
            tramo(t)
