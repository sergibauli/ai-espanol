# Prepara las muestras de voz (≈14 s + transcripción) de los diputados españoles de VoxPopuli
# que usa scripts/voces-dele.py para clonar las voces en Fish Audio.
# Uso:
#   pip install pyarrow numpy praat-parselmouth   (y ffmpeg)
#   for f in validation-00000-of-00001 test-00000-of-00001 train-00000-of-00010 train-00001-of-00010; do
#     curl -L -o $f.parquet https://huggingface.co/datasets/facebook/voxpopuli/resolve/main/es/$f.parquet; done
#   python3 scripts/voces-dele-referencias.py <carpeta con los .parquet> <carpeta de salida>
# Escribe <voxpopuli>.wav y <voxpopuli>.txt para cada hablante del pool (scripts/voces-dele-pool.json).
import glob, json, os, subprocess, sys, wave
import numpy as np, pyarrow.parquet as pq

entrada, salida = sys.argv[1], sys.argv[2]
os.makedirs(salida, exist_ok=True)
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pool = json.load(open(os.path.join(raiz, "scripts", "voces-dele-pool.json")))
buscados = {voz["voxpopuli"] for voz in pool}
acumulado = {}


def decodificar(datos):
    r = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", "pipe:0", "-f", "s16le", "-ac", "1", "-ar", "16000", "pipe:1"],
                       input=datos, capture_output=True)
    return np.frombuffer(r.stdout, dtype=np.int16).astype(np.float32) / 32768


for ruta in sorted(glob.glob(os.path.join(entrada, "*.parquet"))):
    fichero = pq.ParquetFile(ruta)
    for grupo in range(fichero.num_row_groups):
        for fila in fichero.read_row_group(grupo).to_pylist():
            hablante = fila["speaker_id"]
            if hablante not in buscados or not fila["is_gold_transcript"] or len(fila["raw_text"]) < 60:
                continue
            datos = acumulado.setdefault(hablante, {"audio": [], "texto": [], "duracion": 0})
            if datos["duracion"] >= 14:
                continue
            audio = decodificar(fila["audio"]["bytes"])
            if len(audio) < 16000 * 3:
                continue
            datos["audio"].append(audio)
            datos["texto"].append(fila["raw_text"].strip())
            datos["duracion"] += len(audio) / 16000

for hablante, datos in acumulado.items():
    audio = np.concatenate([np.concatenate([a, np.zeros(4800, np.float32)]) for a in datos["audio"]])
    audio = audio / max(1e-6, np.abs(audio).max()) * 0.9
    with wave.open(os.path.join(salida, hablante + ".wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(16000)
        w.writeframes((audio * 32767).astype(np.int16).tobytes())
    open(os.path.join(salida, hablante + ".txt"), "w", encoding="utf-8").write(" ".join(datos["texto"]))
print(len(acumulado), "de", len(buscados), "hablantes")
