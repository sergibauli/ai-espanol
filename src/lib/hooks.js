import { useEffect, useState } from 'react';
import { getState } from './store.js';

/** Resuelve una promesa dependiente de deps. */
export function useAsync(fn, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let alive = true;
    setState(s => ({ ...s, loading: true }));
    fn().then(
      data => alive && setState({ data, loading: false, error: null }),
      error => alive && setState({ data: null, loading: false, error }),
    );
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

/** Aplica el tema claro/oscuro según ajustes. */
export function useThemeMode(mode) {
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = mode === 'dark' || (mode === 'system' && mq.matches);
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [mode]);
}

/** Cuenta minutos activos en la página y los suma al día. */
export function useActiveMinutes(onMinute) {
  useEffect(() => {
    const id = setInterval(() => { if (document.visibilityState === 'visible') onMinute(); }, 60000);
    return () => clearInterval(id);
  }, [onMinute]);
}

export const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const currentLevel = () => getState().profile.level;
