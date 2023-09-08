const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(cell) {
    const clickedCell = cell.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameActive && !clickedCell.textContent) {
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        
        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (isBoardFull()) {
            endGame(true);
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            setStatus(`Player ${currentPlayer}'s Turn`);
        }
    }
}

function checkWin(player) {
    return winningCombos.some(combination => {
        return combination.every(index => cells[index].classList.contains(player));
    });
}

function isBoardFull() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function endGame(isDraw) {
    gameActive = false;
    if (isDraw) {
        setStatus('It\'s a Draw!');
    } else {
        setStatus(`Player ${currentPlayer} Wins!`);
        highlightWinningCells(currentPlayer);
    }
}

function setStatus(message) {
    status.textContent = message;
}

function highlightWinningCells(player) {
    winningCombos.forEach(combination => {
        if (combination.every(index => cells[index].classList.contains(player))) {
            combination.forEach(index => cells[index].classList.add('winner'));
        }
    });
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    setStatus(`Player ${currentPlayer}'s Turn`);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetBoard);

resetBoard();
