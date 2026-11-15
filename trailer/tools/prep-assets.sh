#!/bin/sh
# Regenera los fotogramas de los clips (public/assets/seq) a partir de los vídeos de la app. Ejecutar desde trailer/.
# El clip del vuelo se corta en 13,2 s: después aparece un segundo dragón que NO debe salir.
set -e
A=public/assets/seq; V=../public/video
mkdir -p $A/vuelo $A/puerta $A/puertav $A/puertav2 $A/mascota
ffmpeg -v error -y -i $V/portada-vuelo.mp4 -t 13.2 -vf fps=30 -q:v 2 $A/vuelo/%04d.jpg
ffmpeg -v error -y -i $V/portada-puerta.mp4 -vf fps=30 -q:v 2 $A/puerta/%04d.jpg
ffmpeg -v error -y -i $V/portada-puerta-vertical.mp4 -vf fps=30 -q:v 2 $A/puertav/%04d.jpg
ffmpeg -v error -y -i $V/portada-puerta-vertical-llegada.mp4 -vf fps=30 -q:v 2 $A/puertav2/%04d.jpg
ffmpeg -v error -y -i ../public/mascota-reymono.mp4 -vf fps=30 -q:v 2 $A/mascota/%04d.jpg
