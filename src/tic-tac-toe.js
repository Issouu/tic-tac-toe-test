/* eslint-disable require-jsdoc */
class TicTacToe {
  turn = 0;
  gameField = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  getCurrentPlayerSymbol() {
    if (this.turn % 2 == 0) {
      return 'x';
    } else {
      return 'o';
    }
  }

  nextTurn(rowIndex, columnIndex) {
    if (this.gameField[rowIndex][columnIndex] == null) {
      this.gameField[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
      this.turn++;
    } else {
      return;
    }
  }

  isFinished() {
    return this.noMoreTurns() || this.getWinner() != null;
  }

  getWinner() {
    for (let row = 0; row < 3; row++) {
      if (this.gameField[row][0] !== null &&
                this.gameField[row][0] === this.gameField[row][1] &&
                this.gameField[row][1] === this.gameField[row][2]) {
        return this.gameField[row][0];
      }
    }

    for (let col = 0; col < 3; col++) {
      if (this.gameField[0][col] !== null &&
                this.gameField[0][col] === this.gameField[1][col] &&
                this.gameField[1][col] === this.gameField[2][col]) {
        return this.gameField[0][col];
      }
    }

    if (this.gameField[0][0] !== null &&
            this.gameField[0][0] === this.gameField[1][1] &&
            this.gameField[1][1] === this.gameField[2][2]) {
      return this.gameField[0][0];
    }
    if (this.gameField[0][2] !== null &&
            this.gameField[0][2] === this.gameField[1][1] &&
            this.gameField[1][1] === this.gameField[2][0]) {
      return this.gameField[0][2];
    }

    return null;
  }

  noMoreTurns() {
    return this.turn == 9;
  }

  isDraw() {
    return this.noMoreTurns() && this.getWinner() == null;
  }

  getFieldValue(rowIndex, colIndex) {
    return this.gameField[rowIndex][colIndex];
  }
}

module.exports = TicTacToe;
