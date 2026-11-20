#!/bin/sh
# Mini vídeo de una escena para aprobarla: sh herramientas/escena.sh <id_seccion> [n]
# → salida/escenas/<n>_<id>.mp4 (con su trozo de voz + música)
cd "$(dirname "$0")/.."
ID=$1; N=${2:-0}
read A B <<EOF2
$(node -e "import('./tiempo.mjs').then(m=>{const s=m.SECCIONES.find(x=>x.id==='$ID');const a=Math.round(s.ini*m.BAR*30),b=Math.round(s.fin*m.BAR*30)+(s.id==='cierre'?Math.round(2.6*30):0);console.log(a,b)})")
EOF2
D=fotos-escena/$ID; rm -rf $D; mkdir -p $D salida/escenas
P=$(( (B - A + 3) / 4 ))
for k in 0 1 2 3; do I=$((A + k * P)); F=$((I + P)); [ $F -gt $B ] && F=$B; node herramientas/render.cjs $I $F $D > /dev/null 2>&1 & done; wait
INI=$(echo "$A / 30" | bc -l); DUR=$(echo "($B - $A) / 30" | bc -l)
ffmpeg -y -loglevel error -framerate 30 -start_number $A -i $D/f_%05d.jpg -ss $INI -t $DUR -i audio/mezcla.wav -map 0:v -map 1:a -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest salida/escenas/${N}_$ID.mp4
echo salida/escenas/${N}_$ID.mp4
