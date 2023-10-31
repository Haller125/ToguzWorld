import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<GameBoard />} exact />  {/* <-- Using GameBoard for the home route */}
                    <Route path="/about" element={<div>About</div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;