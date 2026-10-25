// Historial por bloques: entre 6 y 11 mensajes, y el inicio solo se mueve de 6 en 6. Con una ventana deslizante
// (los últimos N) el prefijo cambiaría en cada turno y DeepSeek no podría reutilizar su caché.
export function historyWindow(messages) {
  const desde = Math.max(0, Math.floor((messages.length - 6) / 6) * 6);
  return messages.slice(desde);
}
