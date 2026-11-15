# Genera los MP3 de los audios de los exámenes (DELE oficiales y de práctica) con voces de España.
#
# Voces: diputados españoles del corpus abierto VoxPopuli (github.com/facebookresearch/voxpopuli,
# datos en huggingface.co/datasets/facebook/voxpopuli, «es»), clonadas en Fish Audio como voces privadas.
# Cada voz del grupo está en scripts/voces-dele-pool.json (sexo comprobado por la altura media de la voz).
#
# Uso:
#   node scripts/reparto-dele.mjs > /tmp/lista.json
#   FISH_KEY=... python3 scripts/voces-dele.py /tmp/lista.json <carpeta con <voxpopuli>.wav y .txt> [hilos]
#
# 1. Clona cada voz al vuelo: cada petición lleva la muestra de la voz (no gasta voces guardadas).
# 2. Genera public/audio/dele/<clave>.mp3 (mono, 32 kbps) para cada locución que falte.
# 3. Comprueba con la altura de la voz que cada voz suena del sexo que toca; si no, la marca «descartada».
# 4. Escribe src/data/audio-index-dele.json con las claves disponibles.
import json, os, sys, time, subprocess, tempfile, urllib.request, concurrent.futures as cf
import msgpack  # pip install msgpack

lista = json.load(open(sys.argv[1]))
referencias = sys.argv[2]
hilos = int(sys.argv[3]) if len(sys.argv) > 3 else 6
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
salida = os.path.join(raiz, "public", "audio", "dele")
indice = os.path.join(raiz, "src", "data", "audio-index-dele.json")
ruta_pool = os.path.join(raiz, "scripts", "voces-dele-pool.json")
os.makedirs(salida, exist_ok=True)
clave_api = os.environ.get("FISH_KEY", "proxy-injected")
# Cabecera «api-key» (la Authorization la puede sobrescribir el proxy del entorno)
cabeceras = {"api-key": clave_api}
pool = json.load(open(ruta_pool))
por_id = {voz["id"]: voz for voz in pool}


def guardar_pool():
    json.dump(pool, open(ruta_pool, "w"), ensure_ascii=False, indent=1)


# Muestra de cada voz (mp3 ligero) + su transcripción: se envía con cada petición (clonación al vuelo,
# no hace falta crear voces guardadas en Fish Audio)
muestras_voz = {}


def muestra(voz):
    if voz["id"] not in muestras_voz:
        base = os.path.join(referencias, voz["voxpopuli"])
        audio = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", base + ".wav", "-ac", "1", "-ar", "16000", "-b:a", "32k", "-f", "mp3", "pipe:1"],
                               capture_output=True, check=True).stdout
        muestras_voz[voz["id"]] = {"audio": audio, "text": open(base + ".txt", encoding="utf-8").read().strip()}
    return muestras_voz[voz["id"]]


def generar(item):
    destino = os.path.join(salida, item["clave"] + ".mp3")
    if os.path.exists(destino) and os.path.getsize(destino) > 400:
        return item["clave"]
    voz = por_id.get(item["voz"])
    if not voz or voz.get("descartada"):
        return None
    cuerpo = msgpack.packb({"text": item["texto"], "references": [muestra(voz)], "format": "mp3", "mp3_bitrate": 64,
                            "latency": "normal", "normalize": True, "prosody": {"speed": 0.95}})
    for intento in range(6):
        try:
            peticion = urllib.request.Request("https://api.fish.audio/v1/tts", data=cuerpo,
                                              headers={**cabeceras, "Content-Type": "application/msgpack", "model": "s2.1-pro-free"})
            with urllib.request.urlopen(peticion, timeout=180) as respuesta:
                datos = respuesta.read()
            if len(datos) < 500:
                raise ValueError("respuesta vacía")
            with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
                tmp.write(datos)
            try:
                subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-af", "apad=pad_dur=0.2",
                                "-ac", "1", "-ar", "24000", "-b:a", "32k", destino], check=True)
            finally:
                os.unlink(tmp.name)
            return item["clave"]
        except Exception as error:
            print("reintento", item["clave"], error, flush=True)
            time.sleep(5 * (intento + 1))
    return None


def altura(ruta):
    import numpy as np, parselmouth
    tono = parselmouth.Sound(ruta).to_pitch_ac(pitch_floor=65, pitch_ceiling=450, very_accurate=True).selected_array["frequency"]
    tono = tono[tono > 0]
    return float(np.median(tono)) if len(tono) else 0.0


# Primero una muestra larga por voz para comprobar el sexo antes de gastar en todo lo demás
muestras = {}
for item in sorted(lista, key=lambda i: -len(i["texto"])):
    muestras.setdefault(item["voz"], item)
with cf.ThreadPoolExecutor(hilos) as ejecutor:
    list(ejecutor.map(generar, muestras.values()))
for id_voz, item in muestras.items():
    ruta = os.path.join(salida, item["clave"] + ".mp3")
    if id_voz not in por_id or not os.path.exists(ruta):
        continue
    f0 = altura(ruta)
    voz = por_id[id_voz]
    voz["f0_generada"] = round(f0)
    if (voz["sexo"] == "hombre" and f0 > 165) or (voz["sexo"] == "mujer" and f0 < 175):
        voz["descartada"] = True
        os.unlink(ruta)
        print("DESCARTADA (no suena", voz["sexo"], ")", id_voz, round(f0), flush=True)
guardar_pool()
if any(voz.get("descartada") for voz in pool):
    print("Hay voces descartadas: vuelve a ejecutar scripts/reparto-dele.mjs y este script.")

hechas = []
with cf.ThreadPoolExecutor(hilos) as ejecutor:
    for numero, clave in enumerate(ejecutor.map(generar, lista)):
        if clave:
            hechas.append(clave)
        if numero % 200 == 0:
            print(numero, len(hechas), flush=True)
            json.dump(sorted(set(hechas)), open(indice, "w"))
json.dump(sorted(set(hechas)), open(indice, "w"))
print("fin", len(hechas), "de", len(lista))
