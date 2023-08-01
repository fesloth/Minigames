const gridSize = 4;
const grid = Array(gridSize)
  .fill()
  .map(() => Array(gridSize).fill(0));

function addTile() {
  const emptyCells = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    const newValue = Math.random() < 0.9 ? 2 : 4;
    grid[row][col] = newValue;
  }
}

function compareGrids(grid1, grid2) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid1[i][j] !== grid2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function renderGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cellValue = grid[i][j];
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.textContent = cellValue === 0 ? "" : cellValue;
      gridElement.appendChild(cellElement);
    }
  }
}

function isGameOver() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
      if (i > 0 && grid[i][j] === grid[i - 1][j]) {
        return false;
      }
      if (j > 0 && grid[i][j] === grid[i][j - 1]) {
        return false;
      }
    }
  }
  return true;
}

function rotateGrid() {
  const rotatedGrid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(0));

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      rotatedGrid[j][gridSize - 1 - i] = grid[i][j];
    }
  }

  return rotatedGrid;
}

function moveAndMergeCells() {
  const newGrid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(0));

  for (let i = 0; i < gridSize; i++) {
    let merged = false;
    let mergedRow = -1;
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) {
        continue;
      }

      if (j > 0 && grid[i][j] === newGrid[i][mergedRow]) {
        newGrid[i][mergedRow] *= 2;
        merged = true;
      } else {
        mergedRow++;
        newGrid[i][mergedRow] = grid[i][j];
      }
    }
  }

  grid = newGrid;
}

function handleKeyPress(event) {
  const key = event.key;
  let moved = false;

  const copyGrid = JSON.parse(JSON.stringify(grid)); // Buat salinan grid agar tidak terpengaruh perubahan saat bergerak

  switch (key) {
    case "ArrowUp":
      grid = rotateGrid();
      moveAndMergeCells();
      grid = rotateGrid();
      grid = rotateGrid();
      grid = rotateGrid();
      moved = !compareGrids(grid, copyGrid);
      break;
    case "ArrowDown":
      grid = rotateGrid();
      grid = rotateGrid();
      grid = rotateGrid();
      moveAndMergeCells();
      grid = rotateGrid();
      moved = !compareGrids(grid, copyGrid);
      break;
    case "ArrowLeft":
      moveAndMergeCells();
      moved = !compareGrids(grid, copyGrid);
      break;
    case "ArrowRight":
      grid = rotateGrid();
      grid = rotateGrid();
      moveAndMergeCells();
      grid = rotateGrid();
      grid = rotateGrid();
      moved = !compareGrids(grid, copyGrid);
      break;
  }

  if (moved) {
    addTile();
    renderGrid();

    if (isGameOver()) {
      alert("Game Over!");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addTile();
  addTile();
  renderGrid();

  document.getElementById("upArrow").addEventListener("click", () => handleKeyPress({ key: "ArrowUp" }));
  document.getElementById("leftArrow").addEventListener("click", () => handleKeyPress({ key: "ArrowLeft" }));
  document.getElementById("downArrow").addEventListener("click", () => handleKeyPress({ key: "ArrowDown" }));
  document.getElementById("rightArrow").addEventListener("click", () => handleKeyPress({ key: "ArrowRight" }));
});
