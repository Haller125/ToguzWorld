import React, { useState } from 'react';
import Board from '../game/board';
import background from '../images/bg.png';
import board from '../images/board.png';
import cell1 from '../images/cell1.png';
import cell2 from '../images/cell2.png';
import winBoard from '../images/winBoard.png';

// Separate function to render a single pit
const renderPit = (count, idx, cellImg) => {
    return (
        <div key={idx} className="pit-container">
            <img src={board} alt={`Container ${idx + 1}`} className="container-img" />
            {Array.from({ length: count }).map((_, ballIdx) => (
                <img key={ballIdx} src={cellImg} alt={`Ball ${ballIdx + 1}`} className={`pit pit-${ballIdx}`} />
            ))}
            <div className="pit-counter">{count}</div>
        </div>
    );
};

const GameBoard = () => {
    // eslint-disable-next-line no-unused-vars
    const [gameBoard, setGameBoard] = useState(new Board()); // Initialize board state

    return (
        <div className="game-board" style={{ backgroundImage: `url(${background})` }}>
            <div className="player-side top-side">
                {gameBoard.sockets.slice(0, 9).map((count, idx) => renderPit(count, idx, cell1))}
            </div>

            <div className="win-board-container">
                <div className="win-counter">{gameBoard.kaznas[0]}</div>
                <img src={winBoard} alt="Player 1's Win Board" className="win-board player1-win-board" />
            </div>

            <div className="win-board-container">
                <div className="win-counter">{gameBoard.kaznas[1]}</div>
                <img src={winBoard} alt="Player 2's Win Board" className="win-board player2-win-board" />
            </div>

            <div className="player-side bottom-side">
                {gameBoard.sockets.slice(9, 18).map((count, idx) => renderPit(count, idx, cell2))}
            </div>
        </div>
    );
};

export default GameBoard;
