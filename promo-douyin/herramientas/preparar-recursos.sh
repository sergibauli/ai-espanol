#!/bin/sh
# Extrae los fotogramas de los vídeos de la app que usa la película (no se versionan).
cd "$(dirname "$0")/.." && R=film/recursos && P=../public
mkdir -p $R/puerta $R/vuelo
ffmpeg -y -loglevel error -i $P/video/portada-puerta-vertical.mp4 -vf fps=30 -q:v 2 $R/puerta/f_%03d.jpg
ffmpeg -y -loglevel error -ss 9.5 -t 5.5 -i $P/video/portada-vuelo.mp4 -vf fps=30 -q:v 2 $R/vuelo/f_%03d.jpg
