#!/bin/zsh
# Uso: deploy.sh "mensaje" → build, commit, push a main, espera al workflow de GitHub Pages y pasa la prueba de humo
set -e
ROOT=$(git -C "$(dirname "$0")" rev-parse --show-toplevel); cd "$ROOT"
node node_modules/vite/bin/vite.js build | grep -E "rror|built"
git add -A
git commit -q -m "$1" -m "Co-Authored-By: Claude <noreply@anthropic.com>"
SHA=$(git rev-parse --short=7 HEAD)
export GH_TOKEN=$(gh auth token -u sergibauli)
git push -q "https://x-access-token:${GH_TOKEN}@github.com/sergibauli/ai-espanol.git" main:main 2>&1 | sed "s/${GH_TOKEN}/***/g"
for i in $(seq 1 60); do
  r=$(gh api "repos/sergibauli/ai-espanol/actions/runs?branch=main&per_page=5" --jq ".workflow_runs[] | select(.head_sha|startswith(\"$SHA\")) | \"\(.status) \(.conclusion)\"" | head -1)
  [[ "$r" == completed* ]] && break; sleep 10
done
echo "deploy $SHA: $r"; sleep 15
cd "$(dirname "$0")" && node smoke.mjs | awk '{ if ($3 < 300 || $4 != "") bad++; print } END { print (bad ? bad" rutas con problemas" : "humo OK") }'
