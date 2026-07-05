const colors = ['#67e8f9', '#facc15', '#fb7185', '#c084fc', '#34d399'];

export default function Confetti({ active }) {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 90 }, (_, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[index % colors.length],
            '--fall-x': `${Math.random() * 260 - 130}px`,
            '--fall-duration': `${2.3 + Math.random() * 1.8}s`,
            animationDelay: `${Math.random() * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}
