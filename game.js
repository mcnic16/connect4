const rows = 6;
const columns = 7;
let currentPlayer = 1;
let gameActive = true;
let grid = Array.from({ length: rows }, () => Array(columns).fill(null));
let player1Score = 0;
let player2Score = 0;

const gridElement = document.getElementById('grid');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const restartButton = document.getElementById('restart-button');

// Initialize the game grid
function createGrid() {
    gridElement.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gridElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const col = event.target.dataset.col;

    // Find the lowest empty cell in this column
    for (let row = rows - 1; row >= 0; row--) {
        if (!grid[row][col]) {
            grid[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add(currentPlayer === 1 ? 'player1' : 'player2');
            if (checkForWin(row, col)) {
                gameActive = false;
                if (currentPlayer === 1) {
                    player1Score++;
                    player1ScoreElement.textContent = player1Score;
                } else {
                    player2Score++;
                    player2ScoreElement.textContent = player2Score;
                }
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            break;
        }
    }
}

function checkForWin(row, col) {
    // Check for a win here, return true if there's a winner
    // (Implement win-checking logic here)
    return false;
}

restartButton.addEventListener('click', () => {
    grid = Array.from({ length: rows }, () => Array(columns).fill(null));
    gameActive = true;
    currentPlayer = 1;
    createGrid();
});

// Initialize grid on load
createGrid();