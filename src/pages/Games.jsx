import { Link } from 'react-router-dom';
import { ListChecks, Grid2x2, Skull, Shuffle, Ear } from 'lucide-react';
import { PageHeader } from '../components/ui.jsx';

export const GAMES = [
  { id: 'quiz', name: 'Quiz relámpago', desc: '10 preguntas: elige el significado correcto.', icon: ListChecks },
  { id: 'parejas', name: 'Parejas', desc: 'Une cada palabra con su traducción.', icon: Grid2x2 },
  { id: 'ahorcado', name: 'Ahorcado', desc: 'Adivina la palabra letra a letra con una pista.', icon: Skull },
  { id: 'ordenar', name: 'Letras revueltas', desc: 'Ordena las letras para formar la palabra.', icon: Shuffle },
  { id: 'dictado', name: 'Dictado', desc: 'Escucha la palabra y escríbela bien.', icon: Ear },
];

export default function Games() {
  return (
    <>
      <PageHeader title="Juegos" sub="Practica el vocabulario de tu nivel. Cada partida suma XP y alimenta tu repaso." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map(g => (
          <Link key={g.id} to={`/juegos/${g.id}`} className="card group p-5 transition hover:border-brand">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand"><g.icon size={22} /></span>
            <h3 className="mt-3 font-semibold group-hover:text-brand">{g.name}</h3>
            <p className="muted mt-1 text-sm">{g.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
