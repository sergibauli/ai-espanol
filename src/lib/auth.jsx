// Sesión (Clerk, opcional) + estado Premium + muro de pago contextual.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ClerkProvider, useAuth, useUser, useClerk } from '@clerk/clerk-react';
import { apiEnabled, getMe, setTokenGetter } from './api.js';
import { canUse } from './plans.js';
import { getState } from './store.js';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
export const authEnabled = Boolean(CLERK_KEY);

const Ctx = createContext(null);

export function AppProviders({ children }) {
  if (!authEnabled) return <Session clerk={null}>{children}</Session>;
  return (
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="./">
      <ClerkSession>{children}</ClerkSession>
    </ClerkProvider>
  );
}

function ClerkSession({ children }) {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const { user } = useUser();
  const clerk = useClerk();
  const value = useMemo(
    () => ({ isLoaded, isSignedIn, getToken, user, openSignIn: () => clerk.openSignIn(), signOut: () => clerk.signOut() }),
    [isLoaded, isSignedIn, getToken, user, clerk],
  );
  return <Session clerk={value}>{children}</Session>;
}

function Session({ clerk, children }) {
  const [entitlement, setEntitlement] = useState({ premium: false, plan: null, until: null, loading: false });
  const [paywall, setPaywall] = useState(null); // { trigger }

  useEffect(() => { setTokenGetter(async () => (clerk?.isSignedIn ? clerk.getToken() : null)); }, [clerk]);

  const refresh = useCallback(async () => {
    if (!apiEnabled || !clerk?.isSignedIn) { setEntitlement(e => ({ ...e, premium: false, loading: false })); return; }
    setEntitlement(e => ({ ...e, loading: true }));
    try {
      const me = await getMe();
      setEntitlement({ premium: Boolean(me.premium), plan: me.plan, until: me.until, loading: false });
    } catch {
      setEntitlement(e => ({ ...e, loading: false }));
    }
  }, [clerk?.isSignedIn]);

  useEffect(() => { refresh(); }, [refresh]);

  // Tras volver de Stripe (?pago=ok) se vuelve a consultar el estado
  useEffect(() => {
    if (location.search.includes('pago=ok')) {
      const id = setInterval(refresh, 3000);
      setTimeout(() => clearInterval(id), 30000);
      return () => clearInterval(id);
    }
  }, [refresh]);

  /** Comprueba el acceso; si no lo hay, abre el muro de pago con la oferta adecuada. */
  const gate = useCallback((feature, extra = {}) => {
    const ok = canUse(feature, { premium: entitlement.premium, usage: getState().usage, ...extra });
    if (!ok) setPaywall({ trigger: extra.trigger || feature });
    return ok;
  }, [entitlement.premium]);

  const value = {
    authEnabled,
    session: clerk,
    signedIn: Boolean(clerk?.isSignedIn),
    user: clerk?.user ?? null,
    ...entitlement,
    refresh,
    gate,
    paywall,
    openPaywall: trigger => setPaywall({ trigger }),
    closePaywall: () => setPaywall(null),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSession = () => useContext(Ctx);
