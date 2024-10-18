
export default function Scoreboard({ current, high }) {
    return (
        <div className="scores">
            <p>Current score: {current}</p>
            <p>High score: {high}</p>
        </div>
    )
}