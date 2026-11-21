#!/bin/sh
# Empaqueta (o desempaqueta) las secuencias de fotogramas de capturas/ en MP4 sin pérdida visible.
#   sh herramientas/empaquetar-capturas.sh pack     → capturas-mp4/<ruta>.mp4 (versionado en git)
#   sh herramientas/empaquetar-capturas.sh unpack   → vuelve a crear capturas/<ruta>/f_###.jpg
cd "$(dirname "$0")/.."
MODO=${1:-unpack}
if [ "$MODO" = pack ]; then
  for d in capturas/v2/* capturas/aprender/seq-* capturas/juegos/turbo capturas/practica/tv; do
    [ -d "$d" ] || continue
    f=$(ls "$d" | grep -E '^f_?[0-9]+\.jpg$' | head -1); [ -n "$f" ] || continue
    pre=$(echo "$f" | sed -E 's/[0-9]+\.jpg$//'); num=$(echo "$f" | sed -E 's/^f_?([0-9]+)\.jpg$/\1/'); dig=${#num}
    o="capturas-mp4/${d#capturas/}.mp4"; mkdir -p "$(dirname "$o")"
    ffmpeg -y -loglevel error -framerate 30 -start_number $(echo $num | sed "s/^0*//;s/^$/0/") -i "$d/${pre}%0${dig}d.jpg" -c:v libx264 -preset slow -crf 14 -pix_fmt yuv420p \
      -metadata comment="patron=${pre}%0${dig}d.jpg inicio=$(echo $num | sed "s/^0*//;s/^$/0/")" "$o" && echo "$o"
  done
  mkdir -p capturas-mp4/fijas && for p in $(grep -o '"[a-z0-9_/-]*\.png"' film/material.js | tr -d '"' | sort -u); do [ -f "capturas/$p" ] && mkdir -p "capturas-mp4/fijas/$(dirname "$p")" && cp "capturas/$p" "capturas-mp4/fijas/$p"; done
else
  for o in $(find capturas-mp4 -name '*.mp4'); do
    d="capturas/${o#capturas-mp4/}"; d=${d%.mp4}; mkdir -p "$d"
    c=$(ffprobe -v error -show_entries format_tags=comment -of csv=p=0 "$o"); pat=$(echo "$c" | sed -E 's/.*patron=([^ ]+).*/\1/'); ini=$(echo "$c" | sed -E 's/.*inicio=([0-9]+).*/\1/')
    ffmpeg -y -loglevel error -i "$o" -q:v 2 -start_number "$ini" "$d/$pat" && echo "$d"
  done
  [ -d capturas-mp4/fijas ] && cp -r capturas-mp4/fijas/. capturas/
fi
