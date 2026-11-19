"""Mundos pintados de la Ruta (v28): python3 scripts/mundos/pintar.py [A1 A2 B1 B2]
Escribe public/theme/ruta/mundo/<NIVEL>/*.webp (5–7 planos + piezas animadas) y src/components/ruta/mundos.json."""
import importlib
import shutil
import sys
import time

from pincel import Mundo

if __name__ == "__main__":
    niveles = [a for a in sys.argv[1:] if a in ("A1", "A2", "B1", "B2")] or ["A1", "A2", "B1", "B2"]
    for nv in niveles:
        t = time.time()
        M = Mundo(nv)
        shutil.rmtree(M.dir, ignore_errors=True)
        importlib.import_module(nv.lower()).pinta(M)
        print(f"   {nv} en {time.time() - t:.0f} s")
