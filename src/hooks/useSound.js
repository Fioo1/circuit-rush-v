import { useCallback, useRef } from 'react';

export function useSound(enabled = true) {
  const contextRef = useRef(null);

  const play = useCallback(
    (type) => {
      if (!enabled) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!contextRef.current) {
        contextRef.current = new AudioContext();
      }

      const context = contextRef.current;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      const settings = {
        hit: { frequency: 640, end: 880, duration: 0.12, volume: 0.06 },
        miss: { frequency: 190, end: 90, duration: 0.18, volume: 0.08 },
        level: { frequency: 420, end: 980, duration: 0.32, volume: 0.07 },
        win: { frequency: 520, end: 1240, duration: 0.45, volume: 0.08 },
      }[type];

      oscillator.type = type === 'miss' ? 'sawtooth' : 'triangle';
      oscillator.frequency.setValueAtTime(settings.frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(settings.end, now + settings.duration);
      gain.gain.setValueAtTime(settings.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + settings.duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + settings.duration);
    },
    [enabled],
  );

  return play;
}
