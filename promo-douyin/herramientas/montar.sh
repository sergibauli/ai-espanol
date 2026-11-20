#!/bin/sh
# Monta el MP4 final: fotogramas JPEG + música → H.264/AAC 1080×1920 30 fps.
# Uso: sh herramientas/montar.sh [fotogramas] [musica.wav] [salida.mp4]
cd "$(dirname "$0")/.."
F=${1:-fotogramas}; A=${2:-audio/mezcla.wav}; O=${3:-salida/wukong-espanol-douyin.mp4}
N=$(ls $F | wc -l); D=$(echo "$N / 30" | bc -l)
mkdir -p "$(dirname "$O")"
ffmpeg -y -loglevel error -framerate 30 -i "$F/f_%05d.jpg" -i "$A" \
  -map 0:v -map 1:a -t "$D" \
  -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -profile:v high -level 4.1 -r 30 \
  -af "afade=t=out:st=$(echo "$D - 0.6" | bc -l):d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 \
  -c:a aac -b:a 192k -movflags +faststart "$O"
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate -of compact "$O"
