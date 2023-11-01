import React, { useState } from "react";
import { Link } from "react-router-dom";
import Board from "../game/board";
import background from "../images/bg.png";
import board from "../images/board.png";
import cell1 from "../images/cell1.png";
import cell2 from "../images/cell2.png";
import winBoard from "../images/winBoard.png";
import { K as pitsCount, N as ballsCount } from "../game/constant";
import { withAB } from "../game/minimax";
import MusicControl from "./MusicControler";

const Pit = ({ count, idx, cellImg, onClick }) => (
  <div className="pit-container" onClick={() => onClick(idx)}>
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

const makeComputerMove = (gameBoard, depth = 5) => {
  const board = gameBoard.clone();
  const computer = 1;
  const abResult = withAB(board, depth, computer);
  board.pli(pitsCount + abResult[0], abResult[1], computer);
  return board;
};

const isGameOver = (gameBoard) => {
  return (
    gameBoard.kaznas[0] >= ballsCount * pitsCount ||
    gameBoard.kaznas[1] >= ballsCount * pitsCount
  );
};

const GameBoard = ({ toggleMelody, melodyPlaying, audioRef }) => {
  const [gameBoard, setGameBoard] = useState(new Board());

  const handlePitClick = (pitId) => {
    if (isGameOver(gameBoard)) {
      const message =
        gameBoard.kaznas[0] > gameBoard.kaznas[1]
          ? "Qūtyqtaimyn, sız jeñdıñız!"
          : "Sız jeñılıp qaldyñyz! Qaitadan küşıñızdı synañyz!";
      alert(message);
      return;
    }

    if (pitId < 0 || pitId >= pitsCount) {
      alert("Sız qarsylasyñyzdyñ qūmalağyn jüre almaisyz!");
      return;
    }

    const player1 = 0;
    const updatedBoard = gameBoard.clone();
    updatedBoard.pli(pitId, false, player1);

    setGameBoard(makeComputerMove(updatedBoard));
  };

  return (
    <div className="game-board">
      <div
        className="game-board-wrapper"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/">
            <button>Bas bet</button>
          </Link>
          <MusicControl
            toggleMelody={toggleMelody}
            melodyPlaying={melodyPlaying}
            audioRef={audioRef}
          />
        </div>

        <div className="player-side top-side">
          {gameBoard.sockets
            .slice(pitsCount, 2 * pitsCount)
            .map((count, idx) => (
              <Pit
                key={idx}
                count={count}
                idx={idx + pitsCount}
                cellImg={cell2}
                onClick={handlePitClick}
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
              onClick={handlePitClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
