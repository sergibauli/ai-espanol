// Cliente del Cloudflare Worker. Las claves de IA y de Stripe viven solo en el Worker.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const apiEnabled = Boolean(API_URL);

let tokenGetter = async () => null;
export function setTokenGetter(fn) { tokenGetter = fn; }

async function call(path, body) {
  if (!apiEnabled) throw new ApiError('offline', 'El servidor de IA y pagos aún no está configurado.');
  const token = await tokenGetter();
  const res = await fetch(`${API_URL}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.code || 'http', data.error || `Error ${res.status}`);
  return data;
}

export class ApiError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export const getMe = () => call('/me');
export const startCheckout = plan => call('/checkout', { plan, returnUrl: location.href.split('#')[0] });
export const openPortal = () => call('/portal', { returnUrl: location.href.split('#')[0] });

/** Corrección de una redacción según la rúbrica del examen. */
export const correctWriting = ({ level, task, text }) => call('/ai/correct', { level, task, text });

/** Turno de conversación con el tutor. messages: [{role, content}] */
export const tutorReply = ({ level, messages, scenario }) => call('/ai/tutor', { level, messages, scenario });
