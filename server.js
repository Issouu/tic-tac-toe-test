const express = require('express');
const app = express();
const port = 3000;
const TicTacToe = require('./src/tic-tac-toe.js');
const bodyParser = require('body-parser');

let game = new TicTacToe();

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.json());

app.get('/api/game', (req, res) => {
  const gameField = game.gameField;
  const winner = game.getWinner(); // Add this line to get the winner
  res.json({ gameField, winner }); // Include the winner in the response
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
