export default function StatCard({ icon: Icon, label, value, tone = 'cyan' }) {
  const tones = {
    cyan: 'from-cyan-300/20 to-blue-500/10 text-cyan-100',
    amber: 'from-yellow-300/20 to-orange-500/10 text-yellow-100',
    rose: 'from-rose-300/20 to-red-500/10 text-rose-100',
    green: 'from-emerald-300/20 to-teal-500/10 text-emerald-100',
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${tones[tone]} p-4 shadow-lg`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
            <Icon size={21} />
          </span>
        )}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">{label}</p>
          <p className="font-display text-3xl font-bold leading-none">{value}</p>
        </div>
      </div>
    </div>
  );
}
