// Diccionario completo del «Palacio de las palabras» (public/palabras/es.txt.gz, ver su README).
// Se descarga solo al abrir el juego, se guarda en la Cache API y se valida con un Set.
// Formato: gzip de líneas «carácter (48 + letras compartidas con la anterior) + resto».

const VERSION = "v1";
const CACHE = `palacio-diccionario-${VERSION}`;
export const urlDiccionario = () => new URL(`palabras/es.txt.gz?${VERSION}`, document.baseURI).href;

/** Descarga (o lee de la caché) el fichero comprimido. Devuelve un ArrayBuffer. */
export async function descargarDiccionario(url = urlDiccionario()) {
  let cache = null;
  try {
    cache = await caches.open(CACHE);
    const guardada = await cache.match(url);
    if (guardada) return await guardada.arrayBuffer();
  } catch {
    cache = null;
  }
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Diccionario: ${r.status}`);
  const datos = await r.arrayBuffer();
  try {
    await cache?.put(url, new Response(datos.slice(0), { headers: { "Content-Type": "application/gzip" } }));
  } catch {}
  return datos;
}

/** ArrayBuffer (gzip o ya descomprimido por el servidor) → lista de palabras ordenada. */
export async function descomprimirDiccionario(datos) {
  const bytes = new Uint8Array(datos);
  let texto;
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    const flujo = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    texto = await new Response(flujo).text();
  } else texto = new TextDecoder().decode(bytes);
  const palabras = [];
  let previa = "";
  for (const linea of texto.split("\n")) {
    if (!linea) continue;
    const w = previa.slice(0, linea.charCodeAt(0) - 48) + linea.slice(1);
    palabras.push(w);
    previa = w;
  }
  return palabras;
}

let promesa = null;
/** Carga única por sesión: { datos (ArrayBuffer gzip para el Worker), palabras, validas: Set } */
export function cargarDiccionario() {
  if (!promesa)
    promesa = descargarDiccionario()
      .then(async (datos) => {
        const palabras = await descomprimirDiccionario(datos);
        return { datos, palabras, validas: new Set(palabras) };
      })
      .catch((e) => {
        promesa = null;
        throw e;
      });
  return promesa;
}
