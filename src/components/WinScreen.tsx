// src/components/WinScreen.tsx
import React from 'react';

interface Props {
    onRestartGame: () => void;
    timeTaken: number;
    movesTaken: number;
    score: number;
    previousScores: number[];
}

const WinScreen: React.FC<Props> = ({ onRestartGame, timeTaken, movesTaken, score, previousScores }) => {
    return (
        <div className="screen">
            <h1>Congratulations! You won!</h1>
            <p>Time taken: {timeTaken} seconds</p>
            <p>Moves taken: {movesTaken}</p>
            <p>Score: {score.toFixed(0)}</p>
            <h2>Previous Scores:</h2>
            <ul>
                {previousScores.map((prevScore, index) => (
                    <li key={index}>{prevScore.toFixed(0)}</li>
                ))}
            </ul>
            <button onClick={onRestartGame}>Restart Game</button>
        </div>
    );
};

export default WinScreen;