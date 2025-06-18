import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Square from './Square';
import './TicTacToeBoard.css';

// Sound file (you should place preview.mp3 inside "public/sounds/preview.mp3")
const winningSound = new Audio('/sounds/preview.mp3');

const socket = io('http://localhost:5000');

function TicTacToeBoard() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const hasPlayedSound = useRef(false); // avoid replaying sound repeatedly

  const winner = calculateWinner(squares);

  useEffect(() => {
    socket.on('tictactoe_update', (data) => {
      setSquares(data.squares);
      setXIsNext(data.xIsNext);
    });

    return () => {
      socket.off('tictactoe_update');
    };
  }, []);

  // Play winning sound when winner is detected
  useEffect(() => {
    if (winner && !hasPlayedSound.current) {
      winningSound.play();
      hasPlayedSound.current = true;
    }
  }, [winner]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    socket.emit('tictactoe_move', { squares: nextSquares, xIsNext: !xIsNext });
  };

  const handleReset = () => {
    const empty = Array(9).fill(null);
    setSquares(empty);
    setXIsNext(true);
    hasPlayedSound.current = false; // reset sound flag
    socket.emit('tictactoe_move', { squares: empty, xIsNext: true });
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToeBoard;
