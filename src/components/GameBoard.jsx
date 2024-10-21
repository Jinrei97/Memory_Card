import { useState, useEffect } from 'react';
import Game from './Game';

export default function GameBoard() {
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        if (currentScore > highScore) {
            setHighScore(currentScore);
        }
    }, [currentScore])

    return (
        <>
            <div className="header">
                <p className="rules">Select each card once</p>
                <div className="scores">
                    <p>Current score: {currentScore}</p>
                    <p>High score: {highScore}</p>
                </div>
            </div>
            <Game setScore={setCurrentScore}/>
        </>
    )
}