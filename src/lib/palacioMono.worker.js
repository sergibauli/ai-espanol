// Web Worker del Rey Mono: busca jugadas en el diccionario completo (~590 000 palabras)
// sin bloquear la interfaz. Mensajes:
//   { tipo: "iniciar", datos: ArrayBuffer (es.txt.gz) }
//   { tipo: "buscar", id, tablero, atril, opciones } → { id, jugadas } | { id, error }
import { prepararLexico, buscarJugadas } from "./palacioPalabras.js";
import { descomprimirDiccionario } from "./diccionarioPalacio.js";

let listo = null;

self.onmessage = async (e) => {
  const m = e.data || {};
  if (m.tipo === "iniciar") {
    listo = (async () => {
      const [palabras, json] = await Promise.all([descomprimirDiccionario(m.datos), import("../data/palacio-lexico.json")]);
      return prepararLexico(json.default || json, palabras);
    })();
    return;
  }
  if (m.tipo === "buscar") {
    try {
      const lexico = await listo;
      const jugadas = buscarJugadas(m.tablero, m.atril, lexico, m.opciones);
      self.postMessage({ id: m.id, jugadas });
    } catch (err) {
      self.postMessage({ id: m.id, error: String(err?.message || err) });
    }
  }
};
