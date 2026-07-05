import { Activity, Clock3, Flame, Heart, Trophy, Zap } from 'lucide-react';
import StatCard from './StatCard.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatTime } from '../utils/scoring.js';

export default function GameHud({ bestScore, combo, isBoosted, level, levelIndex, lives, progress, score, target, timeLeft, totalLevels }) {
  return (
    <section className="glass-panel rounded-3xl p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Trophy} label="Puntos" value={score.toLocaleString('es-ES')} />
        <StatCard icon={Clock3} label="Tiempo" value={formatTime(timeLeft)} tone={timeLeft < 10 ? 'rose' : 'amber'} />
        <StatCard icon={Heart} label="Vidas" value={'♥'.repeat(lives).padEnd(3, '·')} tone="rose" />
        <StatCard icon={Flame} label="Combo" value={`x${combo}`} tone="green" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_280px]">
        <ProgressBar value={progress} label={`Nivel ${levelIndex + 1}/${totalLevels} · ${level.name}`} />
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${target.gradient} text-xl font-black text-slate-950 shadow-neon`}>
              {target.icon}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Objetivo</p>
              <p className="font-display text-2xl font-bold leading-none">{target.label}</p>
            </div>
          </div>
          {isBoosted && (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-950 animate-pulseGlow">
              <Zap size={14} /> x2
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
        <span className="inline-flex items-center gap-2"><Activity size={14} /> Récord: {bestScore.toLocaleString('es-ES')}</span>
        <span>Completa nodos del color objetivo y evita sobrecargas.</span>
      </div>
    </section>
  );
}
