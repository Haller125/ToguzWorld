import React, { useState } from "react";
import Board from "../game/board";
import background from "../images/bg.png";
import board from "../images/board.png";
import cell1 from "../images/cell1.png";
import cell2 from "../images/cell2.png";
import winBoard from "../images/winBoard.png";
import { K as pitsCount } from "../game/constant";

const Pit = ({ count, idx, cellImg, handlePitClick }) => (
  <div className="pit-container" onClick={() => handlePitClick(idx)}>
    <img src={board} alt={`Container ${idx + 1}`} className="container-img" />
    {Array.from({ length: count }).map((_, ballIdx) => (
      <img
        key={ballIdx}
        src={cellImg}
        alt={`Ball ${ballIdx + 1}`}
        className={`pit pit-${ballIdx}`}
      />
    ))}
    <div className="pit-counter">{count}</div>
  </div>
);

const WinBoardContainer = ({ count }) => (
  <div className="win-board-container">
    <div className="win-counter">{count}</div>
    <img src={winBoard} alt="Win Board" className="win-board" />
  </div>
);

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(new Board());

  const handlePitClick = (pitId) => {
    console.log(`Pit ${pitId} clicked`);
  };

  return (
    <div
      className="game-board"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="player-side top-side">
        {gameBoard.sockets
          .slice(pitsCount, 2 * pitsCount)
          .map((count, idx) => (
            <Pit
              key={idx}
              count={count}
              idx={2 * pitsCount - 1 - idx}
            // reverse index
                // idx={idx}
              cellImg={cell2}
              handlePitClick={handlePitClick}
            />
          ))}
      </div>
      <WinBoardContainer count={gameBoard.kaznas[1]} />
      <WinBoardContainer count={gameBoard.kaznas[0]} />
      <div className="player-side bottom-side">
        {gameBoard.sockets.slice(0, pitsCount).map((count, idx) => (
          <Pit
            key={idx}
            count={count}
            idx={idx}
            cellImg={cell1}
            handlePitClick={handlePitClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
