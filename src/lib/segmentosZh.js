// Trozos de texto en chino dentro de una cadena. Lo usan el traductor de la web (traductorDom.js) y el script que
// genera los diccionarios (scripts/traducir.mjs): los dos tienen que cortar exactamente igual para que las claves casen.
const IDEOGRAMA = /[㐀-鿿豈-﫿]/;
const CJK = /[㐀-鿿豈-﫿　-〿＀-￯]/;
// Empieza en un ideograma y sigue por chino, puntuación china y lo que suele ir intercalado (palabras en español entre
// comillas, cifras, horas). Se recorta por detrás hasta el último carácter chino.
const TROZO = /[㐀-鿿豈-﫿][㐀-鿿豈-﫿　-〿＀-￯A-Za-z0-9áéíóúñüÁÉÍÓÚÑÜ¿¡ .,:;!?'"“”‘’()\-/%+·…]*/g;

export function tieneChino(s) {
  return IDEOGRAMA.test(s);
}

export function segmentosZh(s) {
  const out = [];
  if (!s || !IDEOGRAMA.test(s)) return out;
  TROZO.lastIndex = 0;
  let m;
  while ((m = TROZO.exec(s))) {
    let t = m[0];
    let fin = t.length;
    while (fin > 0 && !CJK.test(t[fin - 1])) fin--;
    t = t.slice(0, fin);
    if (t) out.push({ inicio: m.index, fin: m.index + fin, texto: t });
  }
  return out;
}
