import { NavLink, Outlet, Link } from 'react-router-dom';
import { Home, BookOpen, GraduationCap, Repeat, Gamepad2, MessageCircle, Crown, BookA, Settings, Flame } from 'lucide-react';
import { useStore } from '../lib/store.js';
import { useSession } from '../lib/auth.jsx';
import Paywall from './Paywall.jsx';

const NAV = [
  { to: '/', label: 'Hoy', icon: Home, end: true },
  { to: '/modulos', label: 'Módulos', icon: BookOpen },
  { to: '/oficial', label: 'Exámenes', icon: GraduationCap },
  { to: '/repaso', label: 'Repaso', icon: Repeat },
  { to: '/juegos', label: 'Juegos', icon: Gamepad2 },
  { to: '/tutor', label: 'Tutor IA', icon: MessageCircle },
  { to: '/diccionario', label: 'Diccionario', icon: BookA },
];
const MOBILE = ['/', '/modulos', '/oficial', '/repaso', '/tutor'];

export default function Layout() {
  const streak = useStore(s => s.streak.count);
  const level = useStore(s => s.profile.level);
  const { premium } = useSession();

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-surface px-3 py-5 lg:flex">
        <Link to="/" className="mb-6 flex items-center gap-2.5 px-2">
          <img src="./app-icon.svg" alt="" className="size-8 rounded-lg" />
          <span className="text-lg font-bold tracking-tight">AI Español</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5">
          {NAV.map(n => <SideLink key={n.to} {...n} />)}
        </nav>
        {!premium && (
          <Link to="/premium" className="mb-2 rounded-2xl bg-brand-soft p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold text-brand"><Crown size={16} /> Premium</div>
            <p className="muted mt-1 text-xs">80 exámenes oficiales e IA sin límite.</p>
          </Link>
        )}
        <SideLink to="/ajustes" label="Ajustes" icon={Settings} />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/85 px-4 py-3 backdrop-blur lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src="./app-icon.svg" alt="" className="size-7 rounded-lg" />
            <span className="font-bold">AI Español</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="chip bg-surface-2">{level}</span>
            <span className="chip bg-gold-soft text-gold"><Flame size={13} /> {streak}</span>
            <Link to="/ajustes" className="p-1 text-ink-2" aria-label="Ajustes"><Settings size={20} /></Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pt-10">
          <Outlet />
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
          {NAV.filter(n => MOBILE.includes(n.to)).map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${isActive ? 'text-brand' : 'text-ink-3'}`}>
              <n.icon size={21} />
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <Paywall />
    </div>
  );
}

function SideLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-brand-soft text-brand' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'}`}
    >
      <Icon size={18} /> {label}
    </NavLink>
  );
}
