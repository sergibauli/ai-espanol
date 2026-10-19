// Planes, límites del plan gratuito y ofertas contextuales según la acción del alumno.

export const PLANS = {
  monthly: {
    id: 'monthly',
    name: 'Premium mensual',
    price: '9,99 €',
    period: '/mes',
    mode: 'subscription',
    methods: ['card', 'apple_pay', 'google_pay', 'link'],
    blurb: 'Cancela cuando quieras.',
  },
  annual: {
    id: 'annual',
    name: 'Premium anual',
    price: '59,99 €',
    period: '/año',
    mode: 'subscription',
    methods: ['card', 'apple_pay', 'google_pay', 'link'],
    blurb: 'Equivale a 5 € al mes: ahorras un 50 %.',
    badge: 'Mejor precio',
  },
  pass30: {
    id: 'pass30',
    name: 'Pase DELE 30 días',
    price: '12,99 €',
    period: 'pago único',
    mode: 'payment',
    methods: ['alipay', 'wechat_pay', 'card'],
    blurb: 'Sin renovación. Ideal para el último mes antes del examen.',
  },
};

export const METHOD_LABEL = {
  card: 'Tarjeta',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  link: 'Link',
  alipay: 'Alipay 支付宝',
  wechat_pay: 'WeChat Pay 微信支付',
};

export const FREE_LIMITS = {
  aiPerDay: 3, // correcciones con IA + mensajes al tutor
  oficialFreeModels: 2, // modelos oficiales gratis por nivel
};

export const PREMIUM_FEATURES = [
  'Los 80 modelos oficiales DELE (A1–B2) con cronómetro y nota APTO/NO APTO',
  'Corrección con IA de redacciones según la rúbrica oficial, sin límite',
  'Tutor de conversación con IA sin límite',
  'Plan de estudio adaptativo hasta la fecha de tu examen',
  'Informe de puntos débiles y simulacros recomendados',
];

/** Qué está bloqueado para un usuario gratuito. */
export function canUse(feature, { premium, usage, modelo }) {
  if (premium) return true;
  if (feature === 'ai') return usage.ai < FREE_LIMITS.aiPerDay;
  if (feature === 'oficial') return modelo <= FREE_LIMITS.oficialFreeModels;
  return true;
}

/**
 * Oferta según la acción que dispara el muro de pago y el perfil del alumno:
 * - fecha de examen cercana → pase de 30 días o mensual; lejana → anual.
 * - idioma chino en el navegador → se destacan Alipay y WeChat Pay (pase de pago único).
 */
export function offerFor(trigger, profile, locale = navigator.language || 'es') {
  const daysToExam = profile.examDate ? Math.ceil((new Date(profile.examDate) - Date.now()) / 864e5) : null;
  const zh = locale.toLowerCase().startsWith('zh');

  const copy = {
    oficial: { title: 'Desbloquea los 80 modelos oficiales', text: 'Practica con exámenes completos, cronómetro real y la nota APTO/NO APTO de cada grupo.' },
    ai: { title: 'Has usado tus correcciones gratuitas de hoy', text: 'Con Premium la IA corrige todas tus redacciones según la rúbrica oficial y practica contigo sin límite.' },
    tutor: { title: 'Sigue hablando con tu tutor', text: 'Conversaciones ilimitadas adaptadas a tu nivel, con correcciones en el momento.' },
    streak: { title: '¡Llevas una gran racha!', text: 'Convierte la constancia en un APTO: Premium adapta el plan a tu fecha de examen.' },
    weak: { title: 'Refuerza tu punto débil', text: 'Premium genera simulacros centrados en lo que más te cuesta.' },
    generic: { title: 'Pásate a Premium', text: 'Todo el contenido DELE y la IA sin límites.' },
  }[trigger] || { title: 'Pásate a Premium', text: '' };

  let recommended = 'annual';
  if (daysToExam !== null && daysToExam <= 45) recommended = zh ? 'pass30' : 'monthly';
  else if (zh) recommended = 'pass30';
  if (trigger === 'tutor' && !zh && (daysToExam === null || daysToExam > 45)) recommended = 'monthly';

  const order = [recommended, ...Object.keys(PLANS).filter(p => p !== recommended)];
  return { ...copy, recommended, order, daysToExam, zh };
}
