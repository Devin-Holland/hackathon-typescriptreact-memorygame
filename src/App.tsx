// src/App.tsx
import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import WinScreen from './components/WinScreen';
import './styles/App.css'; // Import the CSS file

function App() {
  const [gameState, setGameState] = useState('splash');
  const [gameKey, setGameKey] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [movesTaken, setMovesTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [previousScores, setPreviousScores] = useState<number[]>([]);
  const [gridSize, setGridSize] = useState({ x: 2, y: 2 });
  const [theme, setTheme] = useState<'dog' | 'cat'>('dog');

  const startGame = (mode: 'easy' | 'normal', selectedTheme: 'dog' | 'cat') => {
    setTheme(selectedTheme)
    setGridSize(mode === 'easy' ? { x: 2, y: 2 } : { x: 4, y: 4 });
    setGameKey(prevKey => prevKey + 1); // Increment key to force re-render
    setGameState('play');
  };

  const endGame = () => {
    setGameState('end');
  };

  const winGame = (time: number, moves: number) => {
    const newScore = 1000 - (time + moves);
    setTimeTaken(time);
    setMovesTaken(moves);
    setScore(newScore);
    setPreviousScores([...previousScores, newScore]);
    setGameState('win');
  };

  const restartGame = () => {
    setGameKey(prevKey => prevKey + 1); // Increment key to force re-render
    setGameState('splash');
  };

  return (
      <div className="App">
        {gameState === 'splash' && <SplashScreen onStartGame={startGame} />}
        {gameState === 'play' && <GameScreen key={gameKey} x={gridSize.x} y={gridSize.y} onEndGame={endGame} onWinGame={winGame} theme={theme} />}
        {gameState === 'end' && <EndScreen onRestartGame={restartGame} />}
        {gameState === 'win' && <WinScreen onRestartGame={restartGame} timeTaken={timeTaken} movesTaken={movesTaken} score={score} previousScores={previousScores.slice(0, -1)} />}
      </div>
  );
}

export default App;