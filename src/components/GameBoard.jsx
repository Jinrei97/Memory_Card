import { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import Game from './Game';

export default function GameBoard() {
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    return (
        <>
            <div className="header">
                <p className="rules">Select each card once</p>
                <Scoreboard high={highScore} current={currentScore} />
            </div>
            <Game />
        </>
    )

}