import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LEVELS, MAX_LIVES, NODE_TYPES, SPECIAL_TYPES, TARGET_SEQUENCE, getLevelTarget } from '../utils/gameConfig.js';
import { calculateNodeScore } from '../utils/scoring.js';

const randomId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];

function makeNode(level, targetType, index) {
  const available = TARGET_SEQUENCE.filter((type) => type !== targetType);
  const roll = Math.random();
  let kind = 'decoy';
  let type = randomFrom(available);

  if (index === 0 || roll < 0.46) {
    kind = 'target';
    type = targetType;
  } else if (roll < 0.46 + level.hazards * 0.055) {
    kind = 'hazard';
    type = 'hazard';
  } else if (roll > 0.93) {
    kind = Math.random() > 0.55 ? 'boost' : 'life';
    type = kind;
  }

  return {
    id: randomId(),
    kind,
    type,
    expiresAt: Date.now() + level.visibleMs,
    hit: false,
  };
}

export function useGameEngine({ onFinish, playSound }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [targetStep, setTargetStep] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [collected, setCollected] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].time);
  const [nodes, setNodes] = useState([]);
  const [floatingScores, setFloatingScores] = useState([]);
  const [levelFlash, setLevelFlash] = useState('Sincroniza el circuito');
  const [boostUntil, setBoostUntil] = useState(0);
  const [stats, setStats] = useState({ hits: 0, mistakes: 0, boosts: 0 });
  const finishedRef = useRef(false);

  const level = LEVELS[levelIndex];
  const targetType = getLevelTarget(levelIndex, targetStep);
  const target = NODE_TYPES[targetType];
  const progress = Math.min(100, Math.round((collected / level.required) * 100));
  const isBoosted = boostUntil > Date.now();

  const enrichedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        meta: NODE_TYPES[node.type] ?? SPECIAL_TYPES[node.type],
      })),
    [nodes],
  );

  const finishGame = useCallback(
    (status) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onFinish({
        status,
        score,
        level: levelIndex + 1,
        maxCombo,
        collected,
        accuracy: stats.hits + stats.mistakes === 0 ? 0 : Math.round((stats.hits / (stats.hits + stats.mistakes)) * 100),
        stats,
      });
    },
    [collected, levelIndex, maxCombo, onFinish, score, stats],
  );

  useEffect(() => {
    const tick = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          finishGame('lost');
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, [finishGame]);

  useEffect(() => {
    const spawn = window.setInterval(() => {
      setNodes((current) => {
        const cleaned = current.filter((node) => node.expiresAt > Date.now() && !node.hit);
        const openSlots = Math.max(0, level.grid - cleaned.length);
        if (!openSlots) return cleaned;

        const amount = Math.min(openSlots, 1 + Math.floor(Math.random() * 2));
        const created = Array.from({ length: amount }, (_, index) => makeNode(level, targetType, index));
        return [...cleaned, ...created].slice(-level.grid);
      });
    }, level.spawnMs);

    return () => window.clearInterval(spawn);
  }, [level, targetType]);

  useEffect(() => {
    const cleanup = window.setInterval(() => {
      setNodes((current) => current.filter((node) => node.expiresAt > Date.now() && !node.hit));
      setFloatingScores((current) => current.filter((item) => Date.now() - item.createdAt < 850));
    }, 260);

    return () => window.clearInterval(cleanup);
  }, []);

  useEffect(() => {
    if (lives <= 0) finishGame('lost');
  }, [finishGame, lives]);

  useEffect(() => {
    if (collected < level.required) return;

    playSound('level');
    if (levelIndex === LEVELS.length - 1) {
      setScore((value) => value + timeLeft * 35 + lives * 500);
      window.setTimeout(() => finishGame('won'), 500);
      return;
    }

    setLevelFlash(`Nivel ${levelIndex + 2}: ${LEVELS[levelIndex + 1].name}`);
    setNodes([]);
    setCollected(0);
    setCombo((value) => value + 2);
    setLevelIndex((value) => value + 1);
    setTimeLeft(LEVELS[levelIndex + 1].time);
  }, [collected, finishGame, level.required, levelIndex, lives, playSound, timeLeft]);

  const handleNodePress = useCallback(
    (node) => {
      if (node.hit) return;

      setNodes((current) => current.map((item) => (item.id === node.id ? { ...item, hit: true } : item)));

      if (node.kind === 'target') {
        const nextCombo = combo + 1;
        const base = NODE_TYPES[node.type].points;
        const gained = calculateNodeScore(base, nextCombo, timeLeft) * (isBoosted ? 2 : 1);

        setScore((value) => value + gained);
        setCombo(nextCombo);
        setMaxCombo((value) => Math.max(value, nextCombo));
        setCollected((value) => value + 1);
        setTargetStep((value) => value + 1);
        setStats((value) => ({ ...value, hits: value.hits + 1 }));
        setFloatingScores((value) => [
          ...value,
          { id: randomId(), text: `+${gained}`, createdAt: Date.now(), x: 35 + Math.random() * 30, y: 20 + Math.random() * 45 },
        ]);
        playSound('hit');
        return;
      }

      if (node.kind === 'life') {
        setLives((value) => Math.min(MAX_LIVES, value + 1));
        setScore((value) => value + 250);
        setFloatingScores((value) => [
          ...value,
          { id: randomId(), text: '+vida', createdAt: Date.now(), x: 35 + Math.random() * 30, y: 20 + Math.random() * 45 },
        ]);
        playSound('hit');
        return;
      }

      if (node.kind === 'boost') {
        setBoostUntil(Date.now() + 6500);
        setStats((value) => ({ ...value, boosts: value.boosts + 1 }));
        setFloatingScores((value) => [
          ...value,
          { id: randomId(), text: 'x2', createdAt: Date.now(), x: 35 + Math.random() * 30, y: 20 + Math.random() * 45 },
        ]);
        playSound('hit');
        return;
      }

      setLives((value) => Math.max(0, value - 1));
      setCombo(0);
      setStats((value) => ({ ...value, mistakes: value.mistakes + 1 }));
      setFloatingScores((value) => [
        ...value,
        { id: randomId(), text: node.kind === 'hazard' ? '-vida' : 'fallo', createdAt: Date.now(), x: 35 + Math.random() * 30, y: 20 + Math.random() * 45 },
      ]);
      playSound('miss');
    },
    [combo, isBoosted, playSound, timeLeft],
  );

  return {
    level,
    levelIndex,
    totalLevels: LEVELS.length,
    target,
    targetType,
    score,
    lives,
    combo,
    maxCombo,
    collected,
    timeLeft,
    nodes: enrichedNodes,
    progress,
    floatingScores,
    levelFlash,
    isBoosted,
    stats,
    handleNodePress,
  };
}
