import { Gamepad2, Play, RadioTower, RotateCcw, Trophy } from 'lucide-react';
import InstructionCard from '../components/InstructionCard.jsx';

export default function StartPage({ bestScore, onStart }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-7 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-neon">
          <Gamepad2 size={25} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200/70">Arcade táctico</p>
          <h1 className="font-display text-3xl font-bold leading-none">Circuit Rush</h1>
        </div>
      </header>

      <section className="grid flex-1 items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-neon">
            <RadioTower size={17} /> 5 niveles de reflejos, memoria y precisión
          </div>
          <h2 className="font-display text-6xl font-bold leading-[0.9] text-white sm:text-7xl lg:text-8xl">
            Domina el pulso del núcleo
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            Sincroniza nodos de energía antes de que desaparezcan, esquiva sobrecargas, encadena combos y alcanza el núcleo final con el mayor récord posible.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="game-button game-button-primary" onClick={onStart}>
              <Play size={20} fill="currentColor" /> Comenzar
            </button>
            <div className="game-button border border-white/10 bg-white/10 text-white">
              <Trophy size={20} /> Récord {bestScore.toLocaleString('es-ES')}
            </div>
          </div>
        </div>

        <aside className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Antes de jugar</p>
              <h2 className="font-display text-3xl font-bold">Instrucciones</h2>
            </div>
            <RotateCcw className="text-yellow-200" size={28} />
          </div>
          <InstructionCard />
        </aside>
      </section>
    </div>
  );
}
