import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>🎮 Welcome to GameHub</h1>
      <p>Choose a game below and have fun!</p>

      <div className="game-cards">

        <div className="game-card">
          <h2>Tic Tac Toe</h2>
          <p>Play classic Tic Tac Toe online with friends! Real-time multiplayer powered by Socket.io.</p>
          <Link to="/tic-tac-toe" className="play-button">Play Tic Tac Toe</Link>
          
        </div>

        <div className="game-card">
          <h2>Chess</h2>
          <p>Challenge opponents in timeless Chess. Practice strategy and sharpen your skills!</p>
          <Link to="/chess" className="play-button">Play Chess</Link>
        </div>

        <div className="game-card">
          <h2>AI Chat Bot</h2>
          <p>Talk to an AI chat bot for fun. Powered by modern AI technologies (Coming soon!)</p>
          <Link to="/ai-chat-bot" className="play-button">Chat with AI</Link>
        </div>

      </div>
    </div>
  );
}

export default Home;
