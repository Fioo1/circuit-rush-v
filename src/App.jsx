import { useMemo, useState } from 'react';
import StartPage from './pages/StartPage.jsx';
import GamePage from './pages/GamePage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { Moon, Sun } from 'lucide-react';

const SCREENS = {
  START: 'start',
  GAME: 'game',
  RESULT: 'result',
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.START);
  const [lastRun, setLastRun] = useState(null);
  const [bestScore, setBestScore] = useLocalStorage('circuit-rush-best-score', 0);
  const [darkMode, setDarkMode] = useLocalStorage('circuit-rush-dark-mode', true);

  const appClass = useMemo(() => (darkMode ? 'dark' : ''), [darkMode]);

  function handleFinish(result) {
    setLastRun(result);
    setBestScore(Math.max(bestScore, result.score));
    setScreen(SCREENS.RESULT);
  }

  return (
    <main className={appClass}>
      <div className="min-h-screen overflow-hidden bg-slate-100 text-slate-950 transition-colors duration-500 dark:bg-[#090a16] dark:text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(20,184,166,.24),transparent_28%),radial-gradient(circle_at_80%_5%,rgba(244,63,94,.18),transparent_26%),radial-gradient(circle_at_50%_90%,rgba(250,204,21,.14),transparent_30%)]" />
          <div className="particle-field" />
          <div className="absolute inset-x-0 top-0 h-px bg-cyan-300/50" />
        </div>

        <button
          aria-label="Cambiar modo oscuro"
          onClick={() => setDarkMode((value) => !value)}
          className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/75 text-slate-900 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {screen === SCREENS.START && (
          <StartPage bestScore={bestScore} onStart={() => setScreen(SCREENS.GAME)} />
        )}
        {screen === SCREENS.GAME && (
          <GamePage bestScore={bestScore} onExit={() => setScreen(SCREENS.START)} onFinish={handleFinish} />
        )}
        {screen === SCREENS.RESULT && lastRun && (
          <ResultPage
            bestScore={Math.max(bestScore, lastRun.score)}
            result={lastRun}
            onHome={() => setScreen(SCREENS.START)}
            onRestart={() => setScreen(SCREENS.GAME)}
          />
        )}
      </div>
    </main>
  );
}
