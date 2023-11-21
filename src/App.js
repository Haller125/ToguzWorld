import { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GameBoard from './components/GameBoard';
import MainPage from './components/MainPage';
import melody from './music/melody.mp3';
import './styles/App.css';
import InfoPage from "./components/Info page/InfoPage";

function App() {
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
        <Router>
            <div>
                <Header />
                <audio ref={audioRef} src={melody} />
                <Routes>
                    <Route path="/" element={<MainPage toggleMelody={toggleMelody} melodyPlaying={melodyPlaying} audioRef={audioRef} />} exact />
                    <Route path="/game" element={<GameBoard toggleMelody={toggleMelody} melodyPlaying={melodyPlaying} audioRef={audioRef} />} />
                    <Route path="/info" element={<InfoPage />}/>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
