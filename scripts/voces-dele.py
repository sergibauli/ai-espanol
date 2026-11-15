# Genera los MP3 de los audios de los exámenes (DELE oficiales y de práctica) con voces de España.
#
# Voces: diputados españoles del corpus abierto VoxPopuli (github.com/facebookresearch/voxpopuli,
# datos en huggingface.co/datasets/facebook/voxpopuli, «es»), clonadas en Fish Audio como voces privadas.
# Cada voz del grupo está en scripts/voces-dele-pool.json (sexo comprobado por la altura media de la voz).
#
# Uso:
#   node scripts/reparto-dele.mjs > /tmp/lista.json
#   FISH_KEY=... python3 scripts/voces-dele.py /tmp/lista.json <carpeta con <voxpopuli>.wav y .txt> [hilos]
# (FISH_KEY puede ser «proxy-injected» si la clave la pone el proxy del entorno.)
#
# 1. Crea en Fish Audio las voces que aún no tienen id (y lo guarda en el pool).
# 2. Genera public/audio/dele/<clave>.mp3 (mono, 32 kbps) para cada locución que falte.
# 3. Comprueba con la altura de la voz que cada voz suena del sexo que toca; si no, la marca «descartada».
# 4. Escribe src/data/audio-index-dele.json con las claves disponibles.
import json, os, sys, time, subprocess, tempfile, urllib.request, uuid, concurrent.futures as cf

lista = json.load(open(sys.argv[1]))
referencias = sys.argv[2]
hilos = int(sys.argv[3]) if len(sys.argv) > 3 else 6
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
salida = os.path.join(raiz, "public", "audio", "dele")
indice = os.path.join(raiz, "src", "data", "audio-index-dele.json")
ruta_pool = os.path.join(raiz, "scripts", "voces-dele-pool.json")
os.makedirs(salida, exist_ok=True)
clave_api = os.environ.get("FISH_KEY", "proxy-injected")
cabeceras = {"Authorization": "Bearer " + clave_api}
pool = json.load(open(ruta_pool))
por_id = {voz["id"]: voz for voz in pool}


def guardar_pool():
    json.dump(pool, open(ruta_pool, "w"), ensure_ascii=False, indent=1)


def multipart(campos, ficheros):
    limite = uuid.uuid4().hex
    cuerpo = b""
    for nombre, valor in campos:
        cuerpo += f'--{limite}\r\nContent-Disposition: form-data; name="{nombre}"\r\n\r\n{valor}\r\n'.encode()
    for nombre, (fichero, datos, tipo) in ficheros:
        cuerpo += f'--{limite}\r\nContent-Disposition: form-data; name="{nombre}"; filename="{fichero}"\r\nContent-Type: {tipo}\r\n\r\n'.encode() + datos + b"\r\n"
    return cuerpo + f"--{limite}--\r\n".encode(), f"multipart/form-data; boundary={limite}"


def crear_voz(voz):
    wav = open(os.path.join(referencias, voz["voxpopuli"] + ".wav"), "rb").read()
    texto = open(os.path.join(referencias, voz["voxpopuli"] + ".txt"), encoding="utf-8").read().strip()
    cuerpo, tipo = multipart(
        [("type", "tts"), ("train_mode", "fast"), ("visibility", "private"), ("title", f"AI Español DELE {voz['id']}"),
         ("texts", texto), ("enhance_audio_quality", "true")],
        [("voices", (voz["voxpopuli"] + ".wav", wav, "audio/wav"))],
    )
    peticion = urllib.request.Request("https://api.fish.audio/model", data=cuerpo, headers={**cabeceras, "Content-Type": tipo})
    with urllib.request.urlopen(peticion, timeout=180) as respuesta:
        return json.load(respuesta)["_id"]


for voz in pool:
    if not voz.get("fish") and not voz.get("descartada"):
        voz["fish"] = crear_voz(voz)
        print("voz creada", voz["id"], voz["fish"], flush=True)
        guardar_pool()


def generar(item):
    destino = os.path.join(salida, item["clave"] + ".mp3")
    if os.path.exists(destino) and os.path.getsize(destino) > 400:
        return item["clave"]
    voz = por_id.get(item["voz"])
    if not voz or not voz.get("fish") or voz.get("descartada"):
        return None
    cuerpo = json.dumps({"text": item["texto"], "reference_id": voz["fish"], "format": "mp3", "mp3_bitrate": 64,
                         "latency": "normal", "normalize": True, "prosody": {"speed": 0.95}}).encode()
    for intento in range(5):
        try:
            peticion = urllib.request.Request("https://api.fish.audio/v1/tts", data=cuerpo,
                                              headers={**cabeceras, "Content-Type": "application/json", "model": "s2.1-pro-free"})
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
            time.sleep(3 * (intento + 1))
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
