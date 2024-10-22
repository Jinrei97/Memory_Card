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
                <div className="rules">
                    <h2>Rules:</h2>
                    <p>Select each card once</p>
                </div>
                <div className="scores">
                    <p>Current score: {currentScore}</p>
                    <p>High score: {highScore}</p>
                </div>
            </div>
            <Game setScore={setCurrentScore}/>
        </>
    )
}