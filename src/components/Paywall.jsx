import { X, Crown, Check } from 'lucide-react';
import { useSession } from '../lib/auth.jsx';
import { useStore } from '../lib/store.js';
import { offerFor, PREMIUM_FEATURES } from '../lib/plans.js';
import PlanCards from './PlanCards.jsx';

export default function Paywall() {
  const { paywall, closePaywall } = useSession();
  const profile = useStore(s => s.profile);
  if (!paywall) return null;
  const offer = offerFor(paywall.trigger, profile);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6" onClick={closePaywall}>
      <div role="dialog" aria-modal="true" className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-bg p-5 sm:rounded-3xl sm:p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand"><Crown size={22} /></span>
          <button onClick={closePaywall} className="p-1 text-ink-3" aria-label="Cerrar"><X size={20} /></button>
        </div>
        <h2 className="mt-3 text-xl font-bold">{offer.title}</h2>
        <p className="muted mt-1 text-sm">{offer.text}</p>
        {offer.daysToExam !== null && offer.daysToExam > 0 && (
          <p className="mt-2 text-sm font-medium text-brand">Tu examen es dentro de {offer.daysToExam} días.</p>
        )}
        <ul className="mt-4 space-y-1.5 text-sm">
          {PREMIUM_FEATURES.slice(0, 3).map(f => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-ok" /> {f}</li>)}
        </ul>
        <div className="mt-6">
          <PlanCards compact order={offer.order} recommended={offer.recommended} />
        </div>
      </div>
    </div>
  );
}
