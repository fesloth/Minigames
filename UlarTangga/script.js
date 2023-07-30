document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const rollDiceButton = document.getElementById("rollDiceButton");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");

  const gridSize = 10;
  const totalCells = gridSize * gridSize;
  const ladders = { 2: 22, 7: 15, 19: 29, 37: 60, 78: 85 };
  const snakes = { 27: 4, 43: 26, 50: 34, 66: 47, 76: 56 };

  const cells = Array.from({ length: totalCells }, (_, i) => i + 1);

  function renderBoard() {
    board.innerHTML = "";
    for (let i = 1; i <= totalCells; i++) {
      const cell = document.createElement("div");
      cell.textContent = i;
      board.appendChild(cell);
    }
  }

  function movePlayer(player, newPosition) {
    if (newPosition >= totalCells) {
      message.textContent = `Player ${player} Menang!`;
      return;
    }

    const ladderEnd = ladders[newPosition];
    const snakeEnd = snakes[newPosition];
    if (ladderEnd) {
      message.textContent = `Player ${player} mendapatkan tangga! Naik ke ${ladderEnd}!`;
      newPosition = ladderEnd;
    } else if (snakeEnd) {
      message.textContent = `Player ${player} ketemu ular! Turun ke ${snakeEnd}!`;
      newPosition = snakeEnd;
    }

    const nextCell = board.children[newPosition - 1];
    nextCell.textContent = player;
  }

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function playTurn(player) {
    const diceRoll = rollDice();
    message.textContent = `Player ${player} mengocok dadu dan mendapatkan angka ${diceRoll}!`;

    const currentPlayerCell = board.querySelector(`div:contains('${player}')`);
    currentPlayerCell.textContent = currentPlayerCell.dataset.cellNumber;

    const currentPlayerPosition = cells.indexOf(parseInt(currentPlayerCell.dataset.cellNumber));

    let newPosition = currentPlayerPosition + diceRoll;
    movePlayer(player, cells[newPosition]);
  }

  renderBoard();
  let currentPlayer = 1;

  document.addEventListener("keyup", (event) => {
    if (event.keyCode === 32) {
      playTurn(currentPlayer);
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  });
  function startGame() {
    renderBoard();
    currentPlayer = 1;
    message.textContent = "Game dimulai! Player 1 mulai!";
  }

  function restartGame() {
    startGame();
  }

  function onRollDiceButtonClick() {
    playTurn(currentPlayer);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  function onStartButtonClick() {
    startGame();
  }

  function onRestartButtonClick() {
    restartGame();
  }

  function onKeyUp(event) {
    if (event.keyCode === 32) {
      playTurn(currentPlayer);
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }

  rollDiceButton.addEventListener("click", onRollDiceButtonClick);
  startButton.addEventListener("click", onStartButtonClick);
  restartButton.addEventListener("click", onRestartButtonClick);

  document.addEventListener("keyup", onKeyUp);

  // Initialize the game when the page loads
  startGame();
});
