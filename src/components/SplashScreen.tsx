// src/components/SplashScreen.tsx
import React, {useState} from 'react';
import '../styles/Common.css';
import '../styles/SplashScreen.css';

interface Props {
    onStartGame: (mode: 'easy' | 'normal', theme: 'dog' | 'cat') => void;
}

const SplashScreen: React.FC<Props> = ({ onStartGame }) => {
    const [theme, setTheme] = useState<'dog' | 'cat'>('dog');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dog' ? 'cat' : 'dog'));
    };

    return (
        <div className="screen">
            <h1>Welcome to HarperDB Match!!</h1>

            <button onClick={() => onStartGame('easy', theme)}>Start Easy Game</button>
            <button onClick={() => onStartGame('normal', theme)}>Start Normal Game</button>
            <br/>
            <button onClick={toggleTheme}>
                {theme === 'dog' ? 'Use Cat Theme' : 'Use Dog Theme'}
            </button>
        </div>
    );
};

export default SplashScreen;