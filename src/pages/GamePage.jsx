import { Home, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import GameBoard from '../components/GameBoard.jsx';
import GameHud from '../components/GameHud.jsx';
import { useGameEngine } from '../hooks/useGameEngine.js';
import { useSound } from '../hooks/useSound.js';

export default function GamePage({ bestScore, onExit, onFinish }) {
  const [soundOn, setSoundOn] = useState(true);
  const playSound = useSound(soundOn);
  const game = useGameEngine({ onFinish, playSound });

  return (
    <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200/70">Circuit Rush</p>
          <h1 className="font-display text-4xl font-bold">Sincronización activa</h1>
        </div>
        <div className="flex gap-2">
          <button className="game-button game-button-secondary px-4" onClick={() => setSoundOn((value) => !value)} aria-label="Activar o desactivar sonido">
            {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <button className="game-button game-button-secondary px-4" onClick={onExit}>
            <Home size={19} /> Inicio
          </button>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[390px_1fr]">
        <GameHud
          bestScore={bestScore}
          combo={game.combo}
          isBoosted={game.isBoosted}
          level={game.level}
          levelIndex={game.levelIndex}
          lives={game.lives}
          progress={game.progress}
          score={game.score}
          target={game.target}
          timeLeft={game.timeLeft}
          totalLevels={game.totalLevels}
        />
        <GameBoard
          floatingScores={game.floatingScores}
          level={game.level}
          levelFlash={game.levelFlash}
          nodes={game.nodes}
          onNodePress={game.handleNodePress}
        />
      </div>
    </div>
  );
}
