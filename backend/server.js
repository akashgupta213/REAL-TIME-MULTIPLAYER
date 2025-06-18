// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- Socket.io --- 
io.on('connection', (socket) => {
  console.log('⚡ User connected:', socket.id);

  // TicTacToe moves
  socket.on('tictactoe_move', (data) => {
    socket.broadcast.emit('tictactoe_update', data);
  });

  // Chess moves
  socket.on('chess_move', (data) => {
    socket.broadcast.emit('chess_update', data);
  });

  socket.on('disconnect', () => {
    console.log('🚫 User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Multiplayer Server running on http://localhost:${PORT}`);
});
