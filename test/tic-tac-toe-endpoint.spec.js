const {server, game} = require('../server.js');
const chai = require('chai');
const TicTacToe = require('../src/tic-tac-toe.js');

describe('Tic Tac Toe API', () => {
  describe('GET /api/game', () => {
    beforeEach(() => {
      game.value = new TicTacToe();
    });
    it('should return an error if game object is not found', (done) => {
      game.value = null;
      chai.request(server)
          .get('/api/game')
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('error',
                'Game object not found.');
            done();
          });
    });

    it('should return value if game object is available', (done) => {
      chai.request(server)
          .get('/api/game')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal({
              gameField: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
              ],
              winner: null,
              isFinished: false,
              isDraw: false,
            });
            done();
          });
    });

    it('should return an error if an exception occurs while retrieving game',
        (done) => {
          const gamemock = {
            gameField: [
              [null, null, null],
              [null, null, null],
              [null, null, null],
            ],
            getWinner: () => {
              throw new Error('mockError');
            },
            isFinished: () => false,
            isDraw: () => false,
          };

          game.value = gamemock;

          chai.request(server)
              .get('/api/game')
              .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('error',
                    'An error occurred while retrieving game data.');
                done();
              });
        });
  });
  describe('POST /api/move', () => {
    beforeEach(() => {
      game.value = new TicTacToe();
    });

    it('should return an error if rowIndex or colIndex is not a number',
        (done) => {
          chai.request(server)
              .post('/api/move')
              .send({rowIndex: 'invalid', colIndex: 2})
              .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal(
                    {error: 'Invalid rowIndex or colIndex.'});
                done();
              });
        });

    it('should return an error if game object is not found', (done) => {
      game.value = null;
      chai.request(server)
          .post('/api/move')
          .send({rowIndex: 1, colIndex: 2})
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.deep.equal({error: 'Game object not found.'});
            done();
          });
    });

    it('should return the winner if the move is successful', (done) => {
      game.value = {nextTurn: () => {}, getWinner: () => 'x'};

      chai.request(server)
          .post('/api/move')
          .send({rowIndex: 1, colIndex: 2})
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal({winner: 'x'});
            done();
          });
    });

    it('should return an error if an error occurs during the game', (done) => {
      game.value = {nextTurn: () => {
        throw new Error('Mock error');
      }, getWinner: () => {}};

      chai.request(server)
          .post('/api/move')
          .send({rowIndex: 1, colIndex: 2})
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.deep.equal(
                {error: 'An error occurred during the game.'});
            done();
          });
    });
  });
  describe('GET /api/reset', () => {
    it('should reset the game and return a 200 status code', (done) => {
      chai.request(server)
          .get('/api/reset')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(game.value).to.be.an('object');
            done();
          });
    });
  });
});
