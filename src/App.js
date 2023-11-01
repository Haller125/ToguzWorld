import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Link
import Header from './components/Header';
import Footer from './components/Footer';
import GameBoard from './components/GameBoard';
import MainPage from './components/MainPage';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} exact />
                    <Route path="/game" element={<GameBoard />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
