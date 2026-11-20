# Locución en chino con TTS local (zhtts: FastSpeech2 + MB-MelGAN, sin internet).
# Uso: <python con zhtts> audio/voz.py  → audio/voz/<version>_<n>.wav
import json, os, sys
import zhtts
d = os.path.dirname(os.path.abspath(__file__))
L = json.load(open(os.path.join(d, "locucion.json"), encoding="utf-8"))
tts = zhtts.TTS()
for version, lineas in L.items():
    for i, (t, texto) in enumerate(lineas):
        tts.text2wav(texto, os.path.join(d, "voz", f"{version}_{i:02d}.wav"))
print("ok")
