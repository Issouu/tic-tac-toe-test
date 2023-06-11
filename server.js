const express = require('express');
const app = express();
const TicTacToe = require('./src/tic-tac-toe.js');
const bodyParser = require('body-parser');

const game = {value: new TicTacToe()};

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.json());

app.get('/api/game', (req, res) => {
  try {
    if (!game.value) {
      return res.status(500)
          .json({error: 'Game object not found.'});
    }

    const gameField = game.value.gameField;
    const winner = game.value.getWinner();
    const isFinished = game.value.isFinished();
    const isDraw = game.value.isDraw();

    res.json({gameField, winner, isFinished, isDraw});
  } catch (error) {
    res.status(500)
        .json({error: 'An error occurred while retrieving game data.'});
  }
});


app.post('/api/move', (req, res) => {
  const {rowIndex, colIndex} = req.body;

  if (typeof rowIndex !== 'number' || typeof colIndex !== 'number') {
    return res.status(400)
        .json({error: 'Invalid rowIndex or colIndex.'});
  }

  if (!game.value) {
    return res.status(500)
        .json({error: 'Game object not found.'});
  }

  try {
    game.value.nextTurn(rowIndex, colIndex);

    const winner = game.value.getWinner();

    res.json({winner});
  } catch (error) {
    res.status(500)
        .json({error: 'An error occurred during the game.'});
  }
});

app.get('/api/reset', (req, res) => {
  try {
    game.value = new TicTacToe();
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to create the game:', error);
    res.status(500)
        .json({error: 'Failed to create the game.'});
  }
});

const server = app.listen(0, () => {
  const address = server.address();
  console.log(`Server is running on port ${address.port}`);
});

module.exports = {server, game};
