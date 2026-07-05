import { Crosshair, HeartPulse, MousePointerClick, ShieldAlert, Sparkles } from 'lucide-react';

const items = [
  { icon: Crosshair, title: 'Sigue el objetivo', text: 'Pulsa solo los nodos del color indicado en el HUD.' },
  { icon: MousePointerClick, title: 'Juega rápido', text: 'Mientras más veloz seas, más puntos y combos acumulas.' },
  { icon: ShieldAlert, title: 'Evita señuelos', text: 'Las sobrecargas y colores incorrectos rompen tu ritmo.' },
  { icon: HeartPulse, title: 'Cuida vidas', text: 'Los reactores verdes recuperan una vida si tienes espacio.' },
  { icon: Sparkles, title: 'Busca turbo', text: 'Los nodos x2 duplican tu puntuación durante unos segundos.' },
];

export default function InstructionCard() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, text }) => (
        <article key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg transition hover:-translate-y-1 hover:bg-white/15">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-slate-950 shadow-neon">
            <Icon size={20} />
          </div>
          <h3 className="font-display text-xl font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-white/65">{text}</p>
        </article>
      ))}
    </div>
  );
}
