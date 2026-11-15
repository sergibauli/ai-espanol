// Tema visual de cada unidad (color, escena y glifo) según su título: así cada tarjeta de Unidades tiene su propio mundo.
// t1/t2 = degradado del cielo de la ventana; motivo = silueta de la escena; glifo = carácter de caligrafía de fondo.
const TEMAS = [
  { clave: "gramatica", t1: "#28406e", t2: "#7f9bd6", motivo: "montes", glifo: "文", re: /verbo|presente|pret[eé]rito|imperfecto|subjuntivo|condicional|futuro|imperativo|pronombre|preposici|comparativ|conector|ser y estar|por y para|pasiva|estilo indirecto|falsos amigos|idiom|te cuento|pluscuam/i },
  { clave: "saludo", t1: "#c8102e", t2: "#ff9a7a", motivo: "nubes", glifo: "礼", re: /hola|favor|gracias|me llamo|tel[eé]fono/i },
  { clave: "numeros", t1: "#b7791f", t2: "#ffd36e", motivo: "abaco", glifo: "数", re: /uno, dos|veintiuno|primero/i },
  { clave: "tiempo", t1: "#1e6fa8", t2: "#8fd3ff", motivo: "nubes", glifo: "时", re: /lunes|enero|hora|tiempo hace|rutina|expresiones de tiempo/i },
  { clave: "comida", t1: "#d4581b", t2: "#ffc075", motivo: "flores", glifo: "食", re: /hambre|restaurante|mercado|gastronom/i },
  { clave: "casa", t1: "#a8432a", t2: "#f7b58a", motivo: "tejado", glifo: "家", re: /familia|casa|vives|barrio|piso/i },
  { clave: "compras", t1: "#c2185b", t2: "#ff9ec4", motivo: "farolillos", glifo: "市", re: /ropa|tiendas|compras|banco/i },
  { clave: "salud", t1: "#0f8a5f", t2: "#7fe3b5", motivo: "bambu", glifo: "健", re: /cuerpo|salud|duele|deporte/i },
  { clave: "viaje", t1: "#0e7c86", t2: "#7ee0e0", motivo: "olas", glifo: "行", re: /transporte|vacaciones|viaje|aeropuerto|hotel|direcciones|ciudad|d[oó]nde eres/i },
  { clave: "naturaleza", t1: "#3f7d20", t2: "#b6e57c", motivo: "bambu", glifo: "林", re: /animales|medio ambiente/i },
  { clave: "cultura", t1: "#7b3fb5", t2: "#d6b0ff", motivo: "flores", glifo: "艺", re: /m[uú]sica|cine|arte|fiestas|tiempo libre|rojo, azul/i },
  { clave: "tecnologia", t1: "#3730a3", t2: "#93a8ff", motivo: "olas", glifo: "技", re: /tecnolog|ciencia|redes|medios de comunicaci/i },
  { clave: "emociones", t1: "#be3a6b", t2: "#ffb3c8", motivo: "flores", glifo: "心", re: /emociones|personalidad|descripci[oó]n f|me gusta/i },
  { clave: "estudio", t1: "#8f0c21", t2: "#f2c14e", motivo: "tejado", glifo: "学", re: /dedicas|educaci|laboral|negocios|estudiar|dele|correos|opinar/i },
];
const POR_DEFECTO = { clave: "otro", t1: "#8f0c21", t2: "#f2c14e", motivo: "montes", glifo: "学" };

export function temaDeUnidad(m) {
  const titulo = String(m?.titulo || "");
  return TEMAS.find((t) => t.re.test(titulo)) || POR_DEFECTO;
}
