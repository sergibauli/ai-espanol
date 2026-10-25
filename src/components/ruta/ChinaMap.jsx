import * as React from "react";

// Mapa de China vivo: ruta del nivel entre ciudades, tramo recorrido en oro y ciudad actual con el Rey Mono
const COORDS = {
  Baotou: [109.84, 40.66], Chengde: [117.94, 40.95], Chengdu: [104.07, 30.67], Chongqing: [106.55, 29.56], Dali: [100.23, 25.61],
  Datong: [113.3, 40.08], Dunhuang: [94.66, 40.14], Emeishan: [103.48, 29.6], Guangzhou: [113.26, 23.13], Guilin: [110.29, 25.27],
  Hangzhou: [120.16, 30.27], Hohhot: [111.75, 40.84], "Hong Kong": [114.17, 22.32], Huanglong: [103.83, 32.75], Jiayuguan: [98.29, 39.77],
  Jiuzhaigou: [103.92, 33.26], Karakul: [75.03, 38.44], Kashgar: [75.99, 39.47], Kunming: [102.71, 25.04], Lanzhou: [103.83, 36.06],
  Leshan: [103.76, 29.55], Lhasa: [91.11, 29.65], Lijiang: [100.23, 26.87], Longsheng: [110.01, 25.8], "Nankín": [118.8, 32.06],
  Ningbo: [121.55, 29.87], "Pekín": [116.4, 39.9], Pingyao: [112.18, 37.2], Putuoshan: [122.38, 30.0], "Shanghái": [121.47, 31.23],
  "Shangri-La": [99.7, 27.83], Shaoxing: [120.58, 30.0], Suzhou: [120.62, 31.3], Taiyuan: [112.55, 37.87], Tashkurgan: [75.23, 37.77],
  "Tianjín": [117.2, 39.13], Tianshui: [105.72, 34.58], Turpan: [89.19, 42.95], Urumqi: [87.62, 43.83], Wutaishan: [113.58, 39.03],
  Wuxi: [120.3, 31.57], "Xi'an": [108.94, 34.34], Xiahe: [102.52, 35.2], Yangshuo: [110.49, 24.78], Yangzhou: [119.42, 32.39],
  Zhangye: [100.45, 38.93], Zhenjiang: [119.45, 32.2], Zhouzhuang: [120.85, 31.12],
};
// Contorno simplificado (lon, lat)
const BORDER = [[73.5,39.5],[75,41],[80,42.5],[80.5,45],[83,47.2],[85.5,48.5],[87.8,49.2],[90,47.8],[91,45.5],[95.5,44.3],[97,42.8],[100.8,42.6],[105,41.6],[107.5,42.4],[111.5,43.6],[111.9,45.1],[115.5,45.4],[119.7,47],[117.8,49.5],[119.9,52.6],[122.5,53.4],[125.5,52.9],[127.5,50],[130.6,48.9],[133.6,48.2],[135,48.4],[133.1,45.1],[131.2,42.9],[129.6,42.4],[128,41.5],[126,40.3],[124.3,39.9],[122.2,40.5],[121,40.8],[119.5,39.8],[118,39.2],[117.6,38.6],[118.9,37.4],[120.7,37.8],[122.5,36.9],[120.3,36],[119.2,34.8],[120.5,33.2],[121.9,31.7],[121.9,30.8],[121.4,30.3],[122,29.9],[121.6,28.5],[120.6,27.3],[119.6,25.8],[118.6,24.6],[117.2,23.6],[116,22.9],[114.2,22.3],[113.5,22.2],[112,21.8],[110.4,21.2],[110.2,20.3],[109.7,21.5],[108.5,21.6],[107,21.8],[106.7,22.8],[105.5,23.3],[104.3,22.8],[103,22.6],[102,22.4],[101.7,21.2],[100.6,21.5],[99.2,22.1],[99.5,23],[98.7,24.1],[97.6,23.9],[98.7,27.5],[97.5,28.4],[96.2,28.4],[94.3,29.3],[92.2,27.8],[91.6,27.9],[89.5,28.1],[88.1,27.9],[86,28],[84,28.8],[82.3,30.1],[81.1,30.2],[79,31.3],[78.7,32.6],[79.4,34.2],[78,35.5],[76,35.7],[75,36.8],[74.5,37.4]];
const HAINAN = [[108.6,19.2],[109.6,18.2],[110.5,18.5],[111,19.7],[110.6,20.1],[109.3,20]];
const TAIWAN = [[120.1,23],[120.9,21.9],[121.6,23.5],[121.9,24.6],[121.5,25.3],[120.9,24.9],[120.2,23.8]];
const P = ([lon, lat]) => [+((lon - 72) * 10).toFixed(1), +((54.5 - lat) * 12).toFixed(1)];
const poly = (pts) => pts.map((p) => P(p).join(",")).join(" ");

export function ChinaMap({ mods, stopOf, isDone, currentNumero, onPick }) {
  // Ciudades del nivel en orden, sin repetir seguidas
  const cities = [];
  mods.forEach((m) => {
    const c = stopOf(m.numero)?.ciudad;
    if (!c || !COORDS[c]) return;
    const last = cities[cities.length - 1];
    if (last?.ciudad === c) last.mods.push(m.numero);
    else cities.push({ ciudad: c, zh: stopOf(m.numero)?.ciudadZh, mods: [m.numero] });
  });
  const curIdx = Math.max(0, cities.findIndex((c) => c.mods.includes(currentNumero)));
  const pts = cities.map((c) => P(COORDS[c.ciudad]));
  const route = pts.map((p) => p.join(",")).join(" ");
  const walked = pts.slice(0, curIdx + 1).map((p) => p.join(",")).join(" ");
  const cur = pts[curIdx];
  // Encuadre: zoom a la zona del nivel (con margen) manteniendo la proporción del mapa
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  let w = Math.max(240, Math.max(...xs) - Math.min(...xs) + 140);
  let h = Math.max(170, Math.max(...ys) - Math.min(...ys) + 120);
  if (w / h > 640 / 450) h = (w * 450) / 640;
  else w = (h * 640) / 450;
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  const box = pts.length ? [cx - w / 2, cy - h / 2, w, h] : [0, 0, 640, 450];
  const k = box[2] / 640; // escala para que textos y puntos mantengan su tamaño
  const labels = cities.length <= 14;
  return (
    <div className="cmap">
      <svg viewBox={box.map((v) => v.toFixed(1)).join(" ")} className="cmap-svg" style={{ "--k": k }} role="img" aria-label="Mapa de la ruta por China">
        <defs>
          <filter id="cmap-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="cmap-land" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#fbf0d4" />
            <stop offset="100%" stopColor="#e3c891" />
          </radialGradient>
        </defs>
        {[BORDER, HAINAN, TAIWAN].map((b, i) => (
          <polygon key={i} points={poly(b)} className="cmap-land" fill="url(#cmap-land)" />
        ))}
        <polyline points={route} className="cmap-route" />
        {curIdx > 0 && <polyline points={walked} className="cmap-walked" filter="url(#cmap-glow)" />}
        {cities.map((c, i) => {
          const [x, y] = pts[i];
          const state = i < curIdx ? "done" : i === curIdx ? "cur" : "next";
          return (
            <g key={c.ciudad + i} className={`cmap-city ${state} ${c.mods.every(isDone) ? "full" : ""}`} transform={`translate(${x} ${y})`} onClick={() => onPick(c.mods[0])} role="button" tabIndex={0}>
              <title>{`${c.ciudad} · ${c.zh}`}</title>
              <circle r={(state === "cur" ? 9 : 6) * k} />
              {(labels || state === "cur" || i === 0 || i === cities.length - 1) && (
                <text y={(state === "cur" ? -36 : i % 2 ? 20 : -11) * k} textAnchor="middle" style={{ fontSize: (state === "cur" ? 14 : 11) * k }}>
                  {c.ciudad} {c.zh}
                </text>
              )}
            </g>
          );
        })}
        {cur && <image href="./mono-face.png" x={cur[0] - 14 * k} y={cur[1] - 33 * k} width={28 * k} height={28 * k} className="cmap-mono" />}
      </svg>
    </div>
  );
}
