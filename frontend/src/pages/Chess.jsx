import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import io from 'socket.io-client';
import './Chess.css';

const socket = io('https://real-time-multiplayer-backend.onrender.com');

function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket.on('chess_update', (fen) => {
      const gameCopy = new Chess();
      gameCopy.load(fen);
      setGame(gameCopy);
      updateStatus(gameCopy);
    });

    return () => {
      socket.off('chess_update');
    };
  }, []);

  const makeAMove = (move) => {
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);

      if (result) {
        setGame(gameCopy);
        updateStatus(gameCopy);
        socket.emit('chess_move', gameCopy.fen());
      } else {
        setStatus('⚠️ Invalid move!');
      }
      return result;
    } catch (error) {
      console.error('Invalid move:', move);
      setStatus('⚠️ Invalid move!');
      return null;
    }
  };

  const updateStatus = (gameInstance) => {
    if (gameInstance.isCheckmate()) {
      setStatus('♛ Checkmate! Game over.');
    } else if (gameInstance.isDraw()) {
      setStatus('Draw!');
    } else if (gameInstance.isCheck()) {
      setStatus('Check!');
    } else {
      setStatus('');
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    };

    makeAMove(move);
  };

  const handleReset = () => {
    const newGame = new Chess();
    setGame(newGame);
    setStatus('');
    socket.emit('chess_move', newGame.fen());
  };

  return (
    <div className="chess-container">
      <h2 className="chess-title">♟️ Chess Game</h2>

      <div className="chess-board-wrapper">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardWidth={400}
        />
      </div>

      <div className="chess-status">{status}</div>

      <div className="chess-buttons">
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
}

export default ChessGame;
