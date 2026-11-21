// Servidor estático mínimo con raíz en el repo (sirve /public y /promo-douyin).
const http = require('http'), fs = require('fs'), path = require('path');
const RAIZ = path.resolve(__dirname, '../..');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4' };
const puerto = +(process.argv[2] || 8765);
http.createServer((req, res) => {
  const ruta = decodeURIComponent(req.url.split('?')[0]);
  const f = path.join(RAIZ, path.normalize(ruta));
  if (!f.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'max-age=3600' });
    fs.createReadStream(f).pipe(res);
  });
}).listen(puerto, '127.0.0.1', () => console.log('servidor en http://127.0.0.1:' + puerto));
