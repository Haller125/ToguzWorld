import React, { useState, useRef} from 'react';
import './styles/MainPage.css';
import melody from '../music/melody.mp3';
import { Link } from 'react-router-dom';

const MainPage = () => {
    const [melodyPlaying, setMelodyPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleMelody = () => {
        setMelodyPlaying(!melodyPlaying);
        if (audioRef.current) {
            if (melodyPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    };

    return (
        <div className="main-container vertical-center">
            <header id="Heading">
                <h1>Welcome to Toguz World: Battle of Minds</h1>
            </header>
            <main>
                 <div className="start-button">
                    {/* Use Link to navigate to the GameBoard page */}
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
            <audio ref={audioRef} src={melody} />
        </div>
    );
}

export default MainPage;