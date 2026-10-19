import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { PLANS, METHOD_LABEL } from '../lib/plans.js';
import { startCheckout, apiEnabled } from '../lib/api.js';
import { useSession } from '../lib/auth.jsx';

export default function PlanCards({ order = ['annual', 'monthly', 'pass30'], recommended = 'annual', compact }) {
  const { authEnabled, signedIn, session } = useSession();
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  async function buy(id) {
    setError('');
    if (!apiEnabled) { setError('Los pagos se activarán cuando el servidor esté desplegado.'); return; }
    if (authEnabled && !signedIn) { session.openSignIn(); return; }
    setBusy(id);
    try {
      const { url } = await startCheckout(id);
      location.href = url;
    } catch (e) {
      setError(e.message);
      setBusy(null);
    }
  }

  return (
    <div>
      <div className={`grid gap-3 ${compact ? '' : 'md:grid-cols-3'}`}>
        {order.map(id => {
          const p = PLANS[id];
          const rec = id === recommended;
          return (
            <div key={id} className={`card relative flex flex-col p-5 ${rec ? 'border-brand ring-2 ring-brand/30' : ''}`}>
              {(rec || p.badge) && (
                <span className="chip absolute -top-3 left-5 bg-brand text-brand-ink">{rec ? 'Recomendado para ti' : p.badge}</span>
              )}
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">{p.price}</span>
                <span className="muted text-sm">{p.period}</span>
              </div>
              <p className="muted mt-1 text-sm">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.methods.map(m => <span key={m} className="chip bg-surface-2 text-ink-2">{METHOD_LABEL[m]}</span>)}
              </div>
              <button onClick={() => buy(id)} disabled={busy !== null} className={`${rec ? 'btn-primary' : 'btn-ghost'} mt-4 w-full`}>
                {busy === id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {p.mode === 'payment' ? 'Comprar pase' : 'Suscribirme'}
              </button>
            </div>
          );
        })}
      </div>
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
      <p className="muted mt-3 text-xs">Pago seguro con Stripe. Los precios incluyen IVA. Las suscripciones se gestionan y cancelan desde Ajustes.</p>
    </div>
  );
}
