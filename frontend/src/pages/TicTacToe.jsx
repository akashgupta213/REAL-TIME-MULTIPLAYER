import React from 'react';
import TicTacToeBoard from '../components/TicTacToeBoard';

function TicTacToe() {
  return (
    <div style={{ padding: '2rem', color: '#fff', textAlign: 'center' }}>
      <h1>Tic Tac Toe</h1>
      <TicTacToeBoard />
    </div>
  );
}

export default TicTacToe;
