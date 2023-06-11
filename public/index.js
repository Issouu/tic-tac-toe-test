/* eslint-disable require-jsdoc */
const gameCanvas = document.getElementById('gameCanvas');
const resetBtn = document.getElementById('resetBtn');

function render() {
  axios.get('/api/game')
      .then((response) => {
        const gameField = response.data.gameField;
        let html = '';

        for (let i = 0; i < 3; i++) {
          html += '<div class="row">';

          for (let j = 0; j < 3; j++) {
            html += `<div class="column">${gameField[i][j] || ''}</div>`;
          }

          html += '</div>';
        }

        gameCanvas.innerHTML = html;
      })
      .catch((error) => {
        console.error(error);
      });
}

// Event listener for the Reset button
resetBtn.addEventListener('click', () => {
  axios.get('/api/reset')
      .then(() => {
        render();
      })
      .catch((error) => {
        console.error(error);
      });
});

// Event listener for clicking on the board
gameCanvas.addEventListener('click', (e) => {
  if (!e.target.classList.contains('column')) {
    return;
  }

  const rowIndex = Array.from(gameCanvas.children)
      .indexOf(e.target.parentNode);
  const colIndex = Array.from(e.target.parentNode.children)
      .indexOf(e.target);

  axios.post('/api/move', {rowIndex, colIndex})
      .then(() => {
        render();
      })
      .catch((error) => {
        console.error(error);
      });
});

// Initial render
render();
