# Genera los MP3 de los audios DELE con voces nativas de Piper (modelos de Hugging Face: rhasspy/piper-voices).
# Uso:
#   pip install piper-tts   (y ffmpeg en el sistema)
#   node scripts/voces-dele-lista.mjs > /tmp/lista.json
#   python3 scripts/voces-dele.py /tmp/lista.json <carpeta con los .onnx> [hilos]
# Escribe public/audio/dele/<clave>.mp3 (mono, 24 kbps) y src/data/audio-index-dele.json (claves disponibles).
import json, os, sys, wave, subprocess, tempfile, concurrent.futures as cf

lista = json.load(open(sys.argv[1]))
modelos = sys.argv[2]
hilos = int(sys.argv[3]) if len(sys.argv) > 3 else 1  # 1 = más rápido: onnxruntime ya usa todos los núcleos
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
salida = os.path.join(raiz, "public", "audio", "dele")
indice = os.path.join(raiz, "src", "data", "audio-index-dele.json")
os.makedirs(salida, exist_ok=True)

# voz de la app → (modelo, hablante, ritmo); ritmo > 1 = más pausado, adecuado para estudiantes
VOCES = {
    "es-davefx": ("es_ES-davefx-medium", None, 1.05),
    "es-sharvard-m": ("es_ES-sharvard-medium", 0, 1.05),
    "es-sharvard-f": ("es_ES-sharvard-medium", 1, 1.05),
    "mx-ald": ("es_MX-ald-medium", None, 1.05),
    "mx-claude": ("es_MX-claude-high", None, 1.0),
    "ar-daniela": ("es_AR-daniela-high", None, 1.0),
}

def trabajar(argumentos):
    nucleo, lote = argumentos
    # Un núcleo por proceso: si no, onnxruntime abre un hilo por núcleo en cada proceso y se pisan
    if hilos > 1:
        try:
            os.sched_setaffinity(0, {nucleo % os.cpu_count()})
        except Exception:
            pass
    from piper import PiperVoice, SynthesisConfig
    cargadas, hechas = {}, []
    for item in lote:
        destino = os.path.join(salida, item["clave"] + ".mp3")
        if os.path.exists(destino) and os.path.getsize(destino) > 400:
            hechas.append(item["clave"]); continue
        modelo, hablante, ritmo = VOCES[item["voz"]]
        if modelo not in cargadas:
            cargadas[modelo] = PiperVoice.load(os.path.join(modelos, modelo + ".onnx"))
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            ruta_wav = tmp.name
        try:
            with wave.open(ruta_wav, "wb") as wav:
                cargadas[modelo].synthesize_wav(item["texto"], wav, syn_config=SynthesisConfig(speaker_id=hablante, length_scale=ritmo))
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", ruta_wav, "-af", "apad=pad_dur=0.25",
                            "-ac", "1", "-ar", "22050", "-b:a", "24k", destino], check=True)
            hechas.append(item["clave"])
        except Exception as error:
            print("fallo", item["clave"], error, flush=True)
        finally:
            os.unlink(ruta_wav)
    return hechas

# Lotes por voz para cargar cada modelo una sola vez por proceso
lista.sort(key=lambda item: item["voz"])
lotes = [lista[i::hilos] for i in range(hilos)]
hechas = []
with cf.ProcessPoolExecutor(hilos) as ejecutor:
    for parte in ejecutor.map(trabajar, list(enumerate(lotes))):
        hechas.extend(parte)
previas = set(json.load(open(indice))) if os.path.exists(indice) else set()
json.dump(sorted(previas | set(hechas)), open(indice, "w"))
print("fin", len(hechas), "de", len(lista))
