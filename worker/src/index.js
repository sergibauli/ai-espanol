// AI Español API — Cloudflare Worker
// - Proxy de IA (DeepSeek): la clave nunca llega al navegador.
// - Stripe Checkout, portal de cliente y webhook que activa Premium.
// - Estado Premium y cuota diaria gratuita en KV (binding ENT).
// Secretos (wrangler secret put): DEEPSEEK_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
// Variables (wrangler.toml): ALLOWED_ORIGINS, CLERK_JWKS_URL, CLERK_ISSUER, STRIPE_PRICE_*, FREE_AI_PER_DAY

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', ...headers } });

const fail = (status, code, error) => json({ code, error }, status);

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    try {
      let res;
      if (url.pathname === '/webhook' && req.method === 'POST') res = await webhook(req, env);
      else {
        const user = await authenticate(req, env);
        if (!user) res = fail(401, 'auth', 'Inicia sesión para continuar.');
        else if (url.pathname === '/me') res = json(await entitlement(env, user.sub));
        else if (url.pathname === '/checkout' && req.method === 'POST') res = await checkout(req, env, user);
        else if (url.pathname === '/portal' && req.method === 'POST') res = await portal(req, env, user);
        else if (url.pathname === '/ai/correct' && req.method === 'POST') res = await aiCorrect(req, env, user);
        else if (url.pathname === '/ai/tutor' && req.method === 'POST') res = await aiTutor(req, env, user);
        else res = fail(404, 'not_found', 'Ruta no encontrada');
      }
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    } catch (e) {
      console.error(e);
      const res = fail(500, 'server', 'Error interno. Inténtalo de nuevo.');
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    }
  },
};

function corsHeaders(req, env) {
  const origin = req.headers.get('origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim());
  return {
    'access-control-allow-origin': allowed.includes(origin) ? origin : allowed[0] || '',
    'access-control-allow-headers': 'authorization, content-type',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    vary: 'origin',
  };
}

// ---------- Autenticación: JWT de sesión de Clerk (RS256) ----------
let jwksCache = { at: 0, keys: [] };

async function authenticate(req, env) {
  const token = (req.headers.get('authorization') || '').replace(/^Bearer /, '');
  if (!token) return null;
  const [h, p, s] = token.split('.');
  if (!s) return null;
  const header = JSON.parse(b64urlText(h));
  const payload = JSON.parse(b64urlText(p));
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now - 5 || (payload.nbf && payload.nbf > now + 5)) return null;
  if (env.CLERK_ISSUER && payload.iss !== env.CLERK_ISSUER) return null;

  if (Date.now() - jwksCache.at > 3600e3) {
    const r = await fetch(env.CLERK_JWKS_URL);
    jwksCache = { at: Date.now(), keys: (await r.json()).keys };
  }
  const jwk = jwksCache.keys.find(k => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlBytes(s), new TextEncoder().encode(`${h}.${p}`));
  return ok ? payload : null;
}

function b64urlBytes(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}
const b64urlText = s => new TextDecoder().decode(b64urlBytes(s));

// ---------- Estado Premium ----------
async function entitlement(env, userId) {
  const e = (await env.ENT.get(`ent:${userId}`, 'json')) || {};
  const active = e.status === 'active' || e.status === 'trialing';
  const passValid = e.until && e.until > Date.now();
  return { premium: Boolean(active || passValid), plan: e.plan || null, until: e.until || null };
}

async function saveEnt(env, userId, patch) {
  const prev = (await env.ENT.get(`ent:${userId}`, 'json')) || {};
  const next = { ...prev, ...patch, updated: Date.now() };
  await env.ENT.put(`ent:${userId}`, JSON.stringify(next));
  if (next.customer) await env.ENT.put(`cus:${next.customer}`, userId);
}

// ---------- Stripe ----------
async function stripe(env, path, params) {
  const r = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(`Stripe: ${data.error?.message}`);
  return data;
}

const PLAN_PRICE = env => ({ monthly: env.STRIPE_PRICE_MONTHLY, annual: env.STRIPE_PRICE_ANNUAL, pass30: env.STRIPE_PRICE_PASS30 });

function safeReturn(env, returnUrl) {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim());
  try {
    const u = new URL(returnUrl);
    if (allowed.includes(u.origin)) return `${u.origin}${u.pathname}`;
  } catch { /* url inválida */ }
  return allowed[0];
}

async function checkout(req, env, user) {
  const { plan, returnUrl } = await req.json();
  const price = PLAN_PRICE(env)[plan];
  if (!price) return fail(400, 'plan', 'Plan no válido');
  const base = safeReturn(env, returnUrl);
  const ent = (await env.ENT.get(`ent:${user.sub}`, 'json')) || {};

  const params = {
    'line_items[0][price]': price,
    'line_items[0][quantity]': '1',
    client_reference_id: user.sub,
    'metadata[userId]': user.sub,
    'metadata[plan]': plan,
    allow_promotion_codes: 'true',
    locale: 'auto',
    success_url: `${base}?pago=ok#/premium`,
    cancel_url: `${base}#/premium`,
  };
  if (ent.customer) params.customer = ent.customer;
  else if (user.email) params.customer_email = user.email;

  if (plan === 'pass30') {
    // Pago único: aquí sí se ofrecen Alipay y WeChat Pay
    Object.assign(params, {
      mode: 'payment',
      'payment_method_types[0]': 'card',
      'payment_method_types[1]': 'alipay',
      'payment_method_types[2]': 'wechat_pay',
      'payment_method_options[wechat_pay][client]': 'web',
    });
    if (!ent.customer) params.customer_creation = 'always';
  } else {
    // Suscripción: métodos dinámicos según el panel de Stripe (tarjeta, Apple Pay, Google Pay, Link…)
    Object.assign(params, { mode: 'subscription', 'subscription_data[metadata][userId]': user.sub, 'subscription_data[metadata][plan]': plan });
  }

  const s = await stripe(env, 'checkout/sessions', params);
  return json({ url: s.url });
}

async function portal(req, env, user) {
  const { returnUrl } = await req.json();
  const ent = (await env.ENT.get(`ent:${user.sub}`, 'json')) || {};
  if (!ent.customer) return fail(400, 'no_customer', 'No tienes ninguna suscripción.');
  const s = await stripe(env, 'billing_portal/sessions', { customer: ent.customer, return_url: `${safeReturn(env, returnUrl)}#/ajustes` });
  return json({ url: s.url });
}

async function verifyStripe(req, env) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';
  const parts = Object.fromEntries(sig.split(',').map(kv => kv.split('=')));
  const t = Number(parts.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return null;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.STRIPE_WEBHOOK_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${body}`));
  const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, '0')).join('');
  const expected = sig.split(',').filter(p => p.startsWith('v1=')).map(p => p.slice(3));
  return expected.some(e => timingSafeEqual(e, hex)) ? JSON.parse(body) : null;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function webhook(req, env) {
  const event = await verifyStripe(req, env);
  if (!event) return fail(400, 'signature', 'Firma no válida');
  const o = event.data.object;

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const userId = o.client_reference_id || o.metadata?.userId;
    if (!userId) return json({ ok: true });
    if (o.mode === 'payment') {
      if (o.payment_status !== 'paid') return json({ ok: true }); // Alipay/WeChat pueden confirmar después
      const prev = (await env.ENT.get(`ent:${userId}`, 'json')) || {};
      const from = Math.max(Date.now(), prev.until || 0);
      await saveEnt(env, userId, { plan: 'pass30', until: from + 30 * 864e5, customer: o.customer || prev.customer });
    } else {
      await saveEnt(env, userId, { plan: o.metadata?.plan, status: 'active', customer: o.customer, subscription: o.subscription });
    }
  }

  if (event.type.startsWith('customer.subscription.')) {
    const userId = o.metadata?.userId || (await env.ENT.get(`cus:${o.customer}`));
    if (userId) await saveEnt(env, userId, { status: event.type.endsWith('deleted') ? 'canceled' : o.status, ...(o.metadata?.plan ? { plan: o.metadata.plan } : {}), customer: o.customer, subscription: o.id });
  }
  return json({ ok: true });
}

// ---------- IA ----------
async function useQuota(env, userId) {
  const ent = await entitlement(env, userId);
  if (ent.premium) return true;
  const day = new Date().toISOString().slice(0, 10);
  const k = `ai:${userId}:${day}`;
  const n = Number((await env.ENT.get(k)) || 0);
  if (n >= Number(env.FREE_AI_PER_DAY || 3)) return false;
  await env.ENT.put(k, String(n + 1), { expirationTtl: 172800 });
  return true;
}

async function deepseek(env, messages, { jsonMode = false, maxTokens = 900 } = {}) {
  const r = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.DEEPSEEK_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'deepseek-chat', messages, temperature: 0.4, max_tokens: maxTokens, ...(jsonMode ? { response_format: { type: 'json_object' } } : {}) }),
  });
  if (!r.ok) throw new Error(`DeepSeek ${r.status}`);
  return (await r.json()).choices[0].message.content;
}

const LEVELS = ['A1', 'A2', 'B1', 'B2'];
const clip = (s, n) => String(s || '').slice(0, n);

async function aiCorrect(req, env, user) {
  const { level, task, text } = await req.json();
  if (!LEVELS.includes(level) || !text?.trim()) return fail(400, 'input', 'Datos incompletos');
  if (!(await useQuota(env, user.sub))) return fail(402, 'quota', 'Has agotado tus correcciones gratuitas de hoy.');

  const system = `Eres examinador oficial del DELE ${level} del Instituto Cervantes. Corrige la redacción del candidato según la tarea y su rúbrica (adecuación, coherencia, corrección, alcance) y el nivel ${level}.
Responde SOLO con JSON: {"score": número 0-25, "max": 25, "verdict": "APTO"|"NO APTO", "summary": "valoración breve en español", "criteria": [{"name": "...", "score": n, "max": n}], "errors": [{"original": "...", "correction": "...", "explanation": "..."}], "improved": "versión mejorada del texto respetando el nivel"}. Máximo 8 errores, los más importantes.`;
  const out = await deepseek(env, [
    { role: 'system', content: system },
    { role: 'user', content: `TAREA:\n${clip(task, 4000)}\n\nTEXTO DEL CANDIDATO:\n${clip(text, 6000)}` },
  ], { jsonMode: true, maxTokens: 1500 });
  try { return json(JSON.parse(out)); } catch { return fail(502, 'ai', 'La IA devolvió una respuesta no válida. Inténtalo de nuevo.'); }
}

async function aiTutor(req, env, user) {
  const { level, messages, scenario } = await req.json();
  if (!LEVELS.includes(level) || !Array.isArray(messages)) return fail(400, 'input', 'Datos incompletos');
  if (!(await useQuota(env, user.sub))) return fail(402, 'quota', 'Has agotado tus mensajes gratuitos de hoy.');

  const system = `Eres un tutor de español amable para un estudiante de nivel ${level} (muchos alumnos son hablantes de chino). ${scenario ? `Situación de rol: ${clip(scenario, 300)}.` : ''}
Habla solo en español adaptado a ${level}, con frases cortas, y haz una pregunta para seguir la conversación.
Responde SOLO con JSON: {"reply": "tu respuesta", "correction": "si el último mensaje del alumno tiene errores, la frase corregida y una explicación muy breve; si no, cadena vacía"}.`;
  const history = messages.slice(-12).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: clip(m.content, 1500) }));
  const out = await deepseek(env, [{ role: 'system', content: system }, ...history], { jsonMode: true, maxTokens: 500 });
  try { return json(JSON.parse(out)); } catch { return json({ reply: out, correction: '' }); }
}
