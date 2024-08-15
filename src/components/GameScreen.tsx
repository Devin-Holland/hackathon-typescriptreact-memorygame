// src/components/GameScreen.tsx
import React, { useState, useEffect } from 'react';
import '../styles/GameScreen.css';
import Card from './Card';

interface Props {
  x: number;
  y: number;
  onEndGame: () => void;
  onWinGame: (time: number, moves: number) => void;
  theme: 'dog' | 'cat';
}

const GameScreen: React.FC<Props> = ({ x, y, onEndGame, onWinGame, theme }) => {
  const [cards, setCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [hintUsed, setHintUsed] = useState<boolean>(false);

  useEffect(() => {
    setTimeLeft(120);
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.length !== 16) {
      return;
    }
    if (timer > 120) {
      onEndGame();
      return;
    }
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    else {
      onEndGame();
      return
    }

  }, [timeLeft]);

  useEffect(() => {
    const totalCards = x * y;
    let cardNumbers = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    cardNumbers = [...cardNumbers, ...cardNumbers];
    setCards(shuffleArray(cardNumbers));
    setMatchedCards([]); // Reset matched cards on game start
    setTimer(0); // Reset timer on game start
  }, [x, y]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (cardIndex: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(cardIndex)) {
      setFlippedCards([...flippedCards, cardIndex]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setAttempts(attempts + 1);
      const [first, second] = flippedCards;
      if (cards[first] === cards[second]) {
        setMatchedCards([...matchedCards, first, second]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      onWinGame(timer, attempts);
    }
  }, [matchedCards, cards, onWinGame, timer, attempts]);

  const resetGame = () => {
    const totalCards = x * y;
    let cardNumbers = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    cardNumbers = [...cardNumbers, ...cardNumbers];
    setCards(shuffleArray(cardNumbers));
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setTimer(0); // Reset timer on game reset
  };

  const handleHintClick = () => {
    setHintUsed(true);
    setTimer(timer + 10);
    const nonMatchedCards = cards.map((_, index) => index).filter(index => !matchedCards.includes(index));
    setFlippedCards(nonMatchedCards);
    setTimeout(() => {
      setFlippedCards([]);
      setHintUsed(false);
    }, 1000);
  };

  return (
      <div className="gamescreen" style={{ gridTemplateColumns: `repeat(${x}, 1fr)` }}>
        {cards.map((card, index) => (
            <Card
                key={index}
                cardNumber={card}
                theme={theme}
                isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                onClick={() => handleCardClick(index)}
            />
        ))}
        <div className="attempts">Attempts: {attempts}</div>
        <div className="timer">Time: {timer} seconds</div>
        {cards.length === 16 && <div className="attempts">Time Limit: 120s</div>}
        <br />
        <button onClick={onEndGame}>End Game</button>
        <br />
        <br />
        <button onClick={resetGame}>Reset Game</button>
        <br />
        <br />
        <button onClick={handleHintClick} disabled={hintUsed}>Hint</button>
      </div>
  );
};

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default GameScreen;