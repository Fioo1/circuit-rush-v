export const NODE_TYPES = {
  cyan: {
    label: 'Cian',
    icon: '✦',
    gradient: 'from-cyan-300 to-blue-500',
    ring: 'ring-cyan-200/70',
    points: 120,
  },
  amber: {
    label: 'Solar',
    icon: '◆',
    gradient: 'from-yellow-300 to-orange-500',
    ring: 'ring-yellow-200/70',
    points: 140,
  },
  violet: {
    label: 'Violeta',
    icon: '✺',
    gradient: 'from-fuchsia-300 to-violet-600',
    ring: 'ring-fuchsia-200/70',
    points: 160,
  },
};

export const SPECIAL_TYPES = {
  hazard: {
    label: 'Sobrecarga',
    icon: '!',
    gradient: 'from-rose-400 to-red-700',
  },
  life: {
    label: 'Reactor',
    icon: '+',
    gradient: 'from-emerald-300 to-teal-600',
  },
  boost: {
    label: 'Turbo',
    icon: '×2',
    gradient: 'from-lime-200 to-yellow-400',
  },
};

export const LEVELS = [
  {
    name: 'Pulso Inicial',
    target: 'cyan',
    grid: 9,
    required: 8,
    time: 38,
    spawnMs: 1150,
    visibleMs: 1700,
    hazards: 1,
    decoys: 2,
  },
  {
    name: 'Cruce Neón',
    target: 'amber',
    grid: 12,
    required: 11,
    time: 42,
    spawnMs: 980,
    visibleMs: 1450,
    hazards: 2,
    decoys: 3,
  },
  {
    name: 'Órbita Rápida',
    target: 'violet',
    grid: 16,
    required: 14,
    time: 46,
    spawnMs: 830,
    visibleMs: 1250,
    hazards: 3,
    decoys: 4,
  },
  {
    name: 'Modo Prisma',
    target: 'rotate',
    grid: 16,
    required: 18,
    time: 50,
    spawnMs: 720,
    visibleMs: 1080,
    hazards: 4,
    decoys: 5,
  },
  {
    name: 'Núcleo Final',
    target: 'rotate',
    grid: 20,
    required: 24,
    time: 58,
    spawnMs: 610,
    visibleMs: 940,
    hazards: 5,
    decoys: 6,
  },
];

export const MAX_LIVES = 3;
export const TARGET_SEQUENCE = Object.keys(NODE_TYPES);

export function getLevelTarget(levelIndex, targetStep) {
  const level = LEVELS[levelIndex];
  if (level.target !== 'rotate') return level.target;
  return TARGET_SEQUENCE[targetStep % TARGET_SEQUENCE.length];
}

export function getGridColumns(size) {
  if (size <= 9) return 'grid-cols-3';
  if (size <= 12) return 'grid-cols-4';
  if (size <= 16) return 'grid-cols-4';
  return 'grid-cols-5';
}
