import React from 'react';
import './styles/GameBoard.css';
import background from '../images/bg.png';  
import board from '../images/board.png';
import cell1 from '../images/cell1.png';
import cell2 from '../images/cell2.png';
import winBoard from '../images/winBoard.png';
//import tuzdih from '../images/tuzdih.png';

const GameBoard = () => {
    const totalPits = 9;
    const ballsPerPit = 9;

    // For demonstration, I'm using static numbers. In real game, these values will be dynamic.
    const player1WinCount = 5;
    const player2WinCount = 3;

    return (
        <div className="game-board" style={{ backgroundImage: `url(${background})`, height: '2000px' }}>
            <div className="player-side top-side">
                {Array.from({ length: totalPits }).map((_, idx) => (
                    <div key={idx} className="pit-container">
                        <img src={board} alt={`Container ${idx + 1}`} className="container-img" />
                        {Array.from({ length: ballsPerPit }).map((_, ballIdx) => (
                            <img key={ballIdx} src={cell1} alt={`Ball ${ballIdx + 1}`} className={`pit pit-${ballIdx}`} />
                        ))}
                        <div className="pit-counter">{ballsPerPit}</div> {/* counter here */}
                        {/*Example: Adding tuzdih to first pit
                        Uncomment below when needed:
                        {idx === 0 && <img src={tuzdih} alt="Tuzdih" className="tuzdih" />}
                         */}
                    </div>
                ))}
            </div>

            <div className="win-board-container">
                <div className="win-counter">{player1WinCount}</div>
                <img src={winBoard} alt="Player 1's Win Board" className="win-board player1-win-board" />
            </div>

            <div className="win-board-container">
                <div className="win-counter">{player2WinCount}</div>
                <img src={winBoard} alt="Player 2's Win Board" className="win-board player2-win-board" />
            </div>

            <div className="player-side bottom-side">
                {Array.from({ length: totalPits }).map((_, idx) => (
                    <div key={idx} className="pit-container">
                        <img src={board} alt={`Container ${idx + 10}`} className="container-img" />
                        {Array.from({ length: ballsPerPit }).map((_, ballIdx) => (
                            <img key={ballIdx} src={cell2} alt={`Ball ${ballIdx + 1}`} className={`pit pit-${ballIdx}`} />
                        ))}
                        <div className="pit-counter">{ballsPerPit}</div> {/* counter here */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;