import React from 'react';
import '../styles/MainPage.css';
import { Link } from 'react-router-dom';

const MainPage = ({ toggleMelody, melodyPlaying }) => {
    return (
        <div className="main-container vertical-center">
            <header id="Heading">
                <h1>Welcome to Toguz World: Battle of Minds</h1>
            </header>
            <main>
                <div className="start-button">
                    <Link to="/game">
                        <button>Start the Game</button>
                    </Link>
                </div>
                <div className="info-buttons">
                    <button>How to Play</button>
                </div>
                <div className="info-buttons">
                    <button>About Toguz Korgool</button>
                </div>
                <div className="melody-button">
                    <button onClick={toggleMelody}>
                        {melodyPlaying ? 'Stop Melody' : 'Play Melody'}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default MainPage;
