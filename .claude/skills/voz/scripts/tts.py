# Genera MP3 con la voz clonada (Fish Audio). Clave por variable de entorno FISH_KEY, nunca en el repo.
import json, os, sys, time, urllib.request, concurrent.futures as cf
P = sys.argv[1]; texts = json.load(open(sys.argv[2])); VOICE = os.environ.get("VOICE", "6df4855ba3644947afcb09aaac669e04"); PREFIX = os.environ.get("PREFIX", ""); INDEX = os.environ.get("INDEX", "audio-index.json"); out = f"{P}/public/audio"; os.makedirs(out, exist_ok=True)
def fnv(s):
    h = 0x811c9dc5
    for b in s.encode("utf-8"):
        h ^= b; h = (h * 0x01000193) & 0xffffffff
    return f"{h:08x}"
def job(t):
    k = fnv(PREFIX + t); f = f"{out}/{k}.mp3"
    if os.path.exists(f) and os.path.getsize(f) > 500: return k
    body = json.dumps({"text": t, "reference_id": VOICE, "format": "mp3", "mp3_bitrate": 64, "latency": "normal"}).encode()
    for a in range(5):
        try:
            req = urllib.request.Request("https://api.fish.audio/v1/tts", data=body, headers={"Authorization": "Bearer " + os.environ["FISH_KEY"], "Content-Type": "application/json", "model": "s2.1-pro-free"})
            with urllib.request.urlopen(req, timeout=120) as r: data = r.read()
            if len(data) > 500:
                open(f, "wb").write(data); return k
        except Exception as e:
            time.sleep(3 * (a + 1))
    return None
done = []
with cf.ThreadPoolExecutor(6) as ex:
    for i, h in enumerate(ex.map(job, texts)):
        if h: done.append(h)
        if i % 100 == 0:
            json.dump(sorted(done), open(f"{P}/src/data/{INDEX}", "w")); print(i, len(done), flush=True)
json.dump(sorted(done), open(f"{P}/src/data/{INDEX}", "w")); print("fin", len(done), "de", len(texts))
