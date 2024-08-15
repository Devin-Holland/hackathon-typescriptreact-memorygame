// src/components/Card.tsx
import React from 'react';
import '../styles/Card.css';
import dogBackImage from '../assets/dog.png';

// Import images from the assets/dogs folder
import dog1 from '../assets/dogs/1.jpg';
import dog2 from '../assets/dogs/2.jpg';
import dog3 from '../assets/dogs/3.jpg';
import dog4 from '../assets/dogs/4.jpg';
import dog5 from '../assets/dogs/5.jpeg';
import dog6 from '../assets/dogs/6.jpg';
import dog7 from '../assets/dogs/7.jpg';
import dog8 from '../assets/dogs/8.jpg';

// Import images from the assets/cats folder
import cat1 from '../assets/cats/cat-1.jpg';
import cat2 from '../assets/cats/cat-2.jpg';
import cat3 from '../assets/cats/cat-3.jpg';
import cat4 from '../assets/cats/cat-4.jpg';
import cat5 from '../assets/cats/cat-5.jpg';
import cat6 from '../assets/cats/cat-6.jpg';
import cat7 from '../assets/cats/cat-7.jpeg';
import cat8 from '../assets/cats/cat-8.jpg';

interface Props {
  cardNumber: number;
  isFlipped: boolean;
  onClick: () => void;
  theme: 'dog' | 'cat';
}

const Card: React.FC<Props> = ({ cardNumber, isFlipped, onClick, theme }) => {
  // Map card numbers to images
  const images = theme === 'dog' ? [dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8] : [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8];
  return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        {isFlipped ? (
            <img src={images[cardNumber-1]} alt={`Dog ${cardNumber-1}`} className="card-image" />
        ) : (
            <div className="card-back">
              <img src={dogBackImage} alt="Card back" />
            </div>
        )}
      </div>
  );
};

export default Card;