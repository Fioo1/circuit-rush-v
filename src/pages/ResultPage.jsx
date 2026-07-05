import { Home, Medal, RotateCcw, Share2, Sparkles, Target, Trophy } from 'lucide-react';
import { useState } from 'react';
import Confetti from '../components/Confetti.jsx';
import StatCard from '../components/StatCard.jsx';

export default function ResultPage({ bestScore, onHome, onRestart, result }) {
  const [shared, setShared] = useState(false);
  const won = result.status === 'won';

  function handleShare() {
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  }

  return (
    <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl place-items-center px-4 py-8 sm:px-6 lg:px-8">
      <Confetti active={won} />
      <section className="glass-panel w-full rounded-3xl p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <div className={`mb-5 grid h-16 w-16 place-items-center rounded-3xl ${won ? 'bg-yellow-300 text-slate-950 shadow-neon' : 'bg-rose-400 text-white shadow-danger'}`}>
              {won ? <Trophy size={34} /> : <Target size={34} />}
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-100/60">
              {won ? 'Victoria del circuito' : 'Game Over'}
            </p>
            <h1 className="mt-2 font-display text-6xl font-bold leading-none sm:text-7xl">
              {won ? 'Núcleo completo' : 'Pulso perdido'}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/68">
              {won
                ? 'Cerraste la secuencia final. Tu precisión, velocidad y combos quedaron registrados para la siguiente carrera.'
                : 'El sistema se desestabilizó, pero cada intento mejora tu lectura del tablero. Vuelve a sincronizar.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="game-button game-button-primary" onClick={onRestart}>
                <RotateCcw size={20} /> Reiniciar
              </button>
              <button className="game-button game-button-secondary" onClick={onHome}>
                <Home size={20} /> Inicio
              </button>
              <button className="game-button game-button-secondary" onClick={handleShare}>
                <Share2 size={20} /> {shared ? 'Compartido' : 'Compartir'}
              </button>
            </div>
          </div>

          <div>
            <div className="mb-4 rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Puntuación final</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <p className="font-display text-6xl font-bold text-white">{result.score.toLocaleString('es-ES')}</p>
                <span className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-black uppercase tracking-wide text-slate-950">
                  Récord {bestScore.toLocaleString('es-ES')}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard icon={Medal} label="Nivel" value={`${result.level}/5`} tone="amber" />
              <StatCard icon={Sparkles} label="Combo máx." value={`x${result.maxCombo}`} tone="green" />
              <StatCard icon={Target} label="Precisión" value={`${result.accuracy}%`} />
              <StatCard icon={Trophy} label="Aciertos" value={result.stats.hits} tone="rose" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
