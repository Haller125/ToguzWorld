import React from 'react';
import '../styles/MainPage.css';
import { Link } from 'react-router-dom';
import MusicControl from './MusicControler';

const MainPage = ({ toggleMelody, melodyPlaying, audioRef }) => {
    return (
        <div className="main-container vertical-center">
            <header id="Heading">
                <h1>Toğyzqūmalaq älemıne qoş keldıñız: Aqyldar saiysyna!</h1>
            </header>
            <main>
                <div className="start-button">
                    <Link to="/game">
                        <button>Oiyndy bastau</button>
                    </Link>
                </div>
                <div className="info-buttons">
                    <button>Qalai oinau kerek?</button>
                </div>
                <div className="info-buttons">
                    <button>Toğyzqūmalaq turaly</button>
                </div>
                <MusicControl toggleMelody={toggleMelody} melodyPlaying={melodyPlaying} audioRef={audioRef} />
            </main>
        </div>
    );
}

export default MainPage;
