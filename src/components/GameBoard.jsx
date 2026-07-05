import { getGridColumns } from '../utils/gameConfig.js';

export default function GameBoard({ floatingScores, level, levelFlash, nodes, onNodePress }) {
  const cells = Array.from({ length: level.grid }, (_, index) => nodes[index] ?? null);

  return (
    <section className="glass-panel scan-line relative overflow-hidden rounded-3xl p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 arena-grid opacity-50" />
      <div className="relative mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100/60">Arena neural</p>
          <h2 className="font-display text-3xl font-bold text-white">{levelFlash}</h2>
        </div>
        <div className="hidden rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-sm font-bold text-cyan-100 sm:block">
          {level.required} cargas
        </div>
      </div>

      <div className={`relative grid ${getGridColumns(level.grid)} gap-3 sm:gap-4`}>
        {cells.map((node, index) => (
          <button
            key={node?.id ?? `empty-${index}`}
            type="button"
            disabled={!node}
            onClick={() => node && onNodePress(node)}
            className={`aspect-square rounded-3xl border transition duration-200 ${
              node
                ? `node-hit border-white/25 bg-gradient-to-br ${node.meta.gradient} text-slate-950 shadow-neon hover:scale-105 active:scale-95`
                : 'border-white/10 bg-white/[0.045]'
            }`}
          >
            {node && (
              <span className="flex h-full w-full items-center justify-center font-display text-3xl font-black sm:text-4xl">
                {node.meta.icon}
              </span>
            )}
          </button>
        ))}
      </div>

      {floatingScores.map((item) => (
        <span
          key={item.id}
          className="pointer-events-none absolute z-20 animate-pop rounded-full bg-white px-3 py-1 font-display text-xl font-black text-slate-950 shadow-xl"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          {item.text}
        </span>
      ))}
    </section>
  );
}
