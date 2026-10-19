import { useState } from 'react';
import { LogIn, LogOut, CreditCard } from 'lucide-react';
import { LEVELS } from '../lib/data.js';
import { useStore, setProfile, setSettings, resetAll } from '../lib/store.js';
import { useSession } from '../lib/auth.jsx';
import { openPortal } from '../lib/api.js';
import { PageHeader } from '../components/ui.jsx';

export default function Settings() {
  const { profile, settings } = useStore(s => s);
  const { authEnabled, signedIn, user, session, premium } = useSession();
  const [msg, setMsg] = useState('');

  async function portal() {
    try { location.href = (await openPortal()).url; } catch (e) { setMsg(e.message); }
  }

  return (
    <>
      <PageHeader title="Ajustes" />
      <div className="space-y-4">
        <section className="card space-y-4 p-5">
          <h2 className="font-semibold">Cuenta</h2>
          {!authEnabled ? (
            <p className="muted text-sm">Tu progreso se guarda en este dispositivo. El inicio de sesión se activará al configurar Clerk.</p>
          ) : signedIn ? (
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex-1">{user?.primaryEmailAddress?.emailAddress}</span>
              {premium && <button className="btn-ghost" onClick={portal}><CreditCard size={16} /> Gestionar suscripción</button>}
              <button className="btn-ghost" onClick={() => session.signOut()}><LogOut size={16} /> Salir</button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => session.openSignIn()}><LogIn size={16} /> Iniciar sesión</button>
          )}
          {msg && <p className="text-sm text-bad">{msg}</p>}
        </section>

        <section className="card grid gap-4 p-5 sm:grid-cols-2">
          <h2 className="font-semibold sm:col-span-2">Estudio</h2>
          <label className="text-sm">Nivel
            <select className="input mt-1" value={profile.level} onChange={e => setProfile({ level: e.target.value })}>{LEVELS.map(L => <option key={L}>{L}</option>)}</select>
          </label>
          <label className="text-sm">Minutos al día
            <select className="input mt-1" value={profile.minutesPerDay} onChange={e => setProfile({ minutesPerDay: Number(e.target.value) })}>{[10, 20, 30, 45, 60].map(m => <option key={m}>{m}</option>)}</select>
          </label>
          <label className="text-sm">Fecha del examen
            <input type="date" className="input mt-1" value={profile.examDate} onChange={e => setProfile({ examDate: e.target.value })} />
          </label>
          <label className="text-sm">Nombre
            <input className="input mt-1" value={profile.name} onChange={e => setProfile({ name: e.target.value })} />
          </label>
        </section>

        <section className="card grid gap-4 p-5 sm:grid-cols-2">
          <h2 className="font-semibold sm:col-span-2">Apariencia</h2>
          <label className="text-sm">Tema
            <select className="input mt-1" value={settings.theme} onChange={e => setSettings({ theme: e.target.value })}>
              <option value="system">Automático</option><option value="light">Claro</option><option value="dark">Oscuro</option>
            </select>
          </label>
          <label className="flex items-center gap-3 self-end text-sm">
            <input type="checkbox" checked={settings.showZh} onChange={e => setSettings({ showZh: e.target.checked })} className="size-4 accent-[var(--brand)]" />
            Mostrar traducción al chino (中文)
          </label>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">Datos</h2>
          <p className="muted mt-1 text-sm">Borra el progreso guardado en este dispositivo y vuelve a la bienvenida.</p>
          <button className="btn-ghost mt-3 text-bad" onClick={() => { if (confirm('¿Borrar todo tu progreso?')) resetAll(); }}>Borrar progreso</button>
        </section>
      </div>
    </>
  );
}
