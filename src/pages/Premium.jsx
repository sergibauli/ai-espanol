import { Check, Crown } from 'lucide-react';
import { useStore } from '../lib/store.js';
import { useSession } from '../lib/auth.jsx';
import { offerFor, PREMIUM_FEATURES, FREE_LIMITS } from '../lib/plans.js';
import { PageHeader } from '../components/ui.jsx';
import PlanCards from '../components/PlanCards.jsx';

const FAQ = [
  ['¿Puedo pagar con Alipay o WeChat Pay?', 'Sí, con el Pase DELE de 30 días (pago único). Las suscripciones mensual y anual se pagan con tarjeta, Apple Pay, Google Pay o Link.'],
  ['¿Cómo cancelo la suscripción?', 'Desde Ajustes → Gestionar suscripción. Mantienes el acceso hasta el final del periodo pagado.'],
  ['¿Qué incluye el plan gratuito?', `Todos los módulos, el diccionario, el repaso y los juegos, ${FREE_LIMITS.oficialFreeModels} modelos oficiales por nivel y ${FREE_LIMITS.aiPerDay} usos de IA al día.`],
];

export default function Premium() {
  const profile = useStore(s => s.profile);
  const { premium, plan, until } = useSession();
  const offer = offerFor('generic', profile);

  if (premium) {
    return (
      <>
        <PageHeader title="Ya eres Premium" sub={until ? `Acceso hasta el ${new Date(until).toLocaleDateString('es-ES')}` : `Plan: ${plan}`} />
        <ul className="card space-y-2 p-5 text-sm">{PREMIUM_FEATURES.map(f => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 text-ok" /> {f}</li>)}</ul>
      </>
    );
  }

  return (
    <>
      <PageHeader title="AI Español Premium" sub="Todo lo que necesitas para llegar al APTO." right={<Crown className="text-brand" />} />
      <ul className="mb-8 grid gap-2 text-sm sm:grid-cols-2">
        {PREMIUM_FEATURES.map(f => <li key={f} className="card flex gap-2 p-3"><Check size={16} className="mt-0.5 shrink-0 text-ok" /> {f}</li>)}
      </ul>
      <PlanCards order={['monthly', 'annual', 'pass30']} recommended={offer.recommended} />
      <h2 className="mt-10 font-semibold">Preguntas frecuentes</h2>
      <div className="mt-3 space-y-2">
        {FAQ.map(([q, a]) => <details key={q} className="card p-4 text-sm"><summary className="cursor-pointer font-medium">{q}</summary><p className="muted mt-2">{a}</p></details>)}
      </div>
    </>
  );
}
