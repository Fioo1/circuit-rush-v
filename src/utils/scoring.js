export function comboMultiplier(combo) {
  if (combo >= 20) return 4;
  if (combo >= 12) return 3;
  if (combo >= 6) return 2;
  return 1;
}

export function calculateNodeScore(basePoints, combo, secondsLeft) {
  const speedBonus = Math.max(0, Math.round(secondsLeft * 2));
  return (basePoints + speedBonus) * comboMultiplier(combo);
}

export function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const rest = String(safeSeconds % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
}
