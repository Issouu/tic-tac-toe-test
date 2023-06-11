const express = require('express');
const app = express();
const port = 3000;
const TicTacToe = require('./src/tic-tac-toe.js');

let game = new TicTacToe();

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.get('/api/game', (req, res) => {
  const gameField = game.gameField;
  res.json({gameField});
});

app.post('/api/move', (req, res) => {
  const {rowIndex, colIndex} = req.body;

  game.nextTurn(rowIndex, colIndex);

  const winner = game.getWinner();

  res.json({winner});
});

app.get('/api/reset', (req, res) => {
  game = new TicTacToe();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
