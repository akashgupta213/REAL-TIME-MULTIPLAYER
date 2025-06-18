import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import Chess from './pages/Chess';
import AIChatBot from './pages/AIChatBot';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/chess" element={<Chess />} />
        <Route path="/ai-chat-bot" element={<AIChatBot />} />
        
      </Routes>
    </Router>
  );
}

export default App;
