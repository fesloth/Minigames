const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const startingLength = 4;

const upArrowIcon = document.getElementById("upArrow");
const leftArrowIcon = document.getElementById("leftArrow");
const downArrowIcon = document.getElementById("downArrow");
const rightArrowIcon = document.getElementById("rightArrow");

upArrowIcon.addEventListener("click", () => {
  if (direction !== "down") {
    direction = "up";
  }
});

leftArrowIcon.addEventListener("click", () => {
  if (direction !== "right") {
    direction = "left";
  }
});

downArrowIcon.addEventListener("click", () => {
  if (direction !== "up") {
    direction = "down";
  }
});

rightArrowIcon.addEventListener("click", () => {
  if (direction !== "left") {
    direction = "right";
  }
});

let snake = [];
let food = {};

let direction = "right";

let score = 0;

function drawBox(x, y) {
  const radius = boxSize / 2; // Radius lingkaran sama dengan setengah ukuran kotak

  // Menggambar lingkaran sebagai makanan
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
  ctx.fillStyle = "lightgreen"; // Ganti dengan warna atau gaya lingkaran yang sesuai
  ctx.fill();
  ctx.strokeStyle = "lime"; // Ganti dengan warna atau gaya garis lingkaran yang sesuai
  ctx.lineWidth = 2;
  ctx.stroke();
}

function displayScoreIncrement() {
  const scoreIncrementText = document.getElementById("scoreIncrementText");
  scoreIncrementText.textContent = `+10`;

  // Display the score increment container
  const scoreIncrementContainer = document.getElementById("scoreIncrementContainer");
  scoreIncrementContainer.style.display = "block";

  // Hide the score increment container after a short delay
  setTimeout(() => {
    scoreIncrementContainer.style.display = "none";
  }, 500); // Adjust the delay time (in milliseconds) as you prefer
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    const { x, y } = snake[i];
    drawBox(x, y);
  }

  drawBox(food.x, food.y);

  const scoreContainer = document.getElementById("scoreContainer");
  scoreContainer.textContent = `Score: ${score}`;
}

function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
  food.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;

  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === food.x && snake[i].y === food.y) {
      generateFood();
      return;
    }
  }
}

function startGame() {
  snake = [];
  direction = "right";
  score = 0;
  generateFood();

  for (let i = 0; i < startingLength; i++) {
    snake.push({ x: 20 + i * boxSize, y: 20 });
  }

  document.addEventListener("keydown", handleInput);
  gameInterval = setInterval(gameLoop, 150);
}

// Add event listener to the "Start" button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

function restart() {
  clearInterval(gameInterval);
  startGame();
}

// Fungsi untuk mengatur input dari pemain (misalnya, tombol keyboard)
function handleInput(event) {
  // Kode untuk mengatur perubahan arah ular berdasarkan input
  const keyPressed = event.key;

  if (keyPressed === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (keyPressed === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (keyPressed === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (keyPressed === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true; // Hit the wall
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true; // Collided with its own body
    }
  }

  return false;
}

function gameLoop() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === "up") {
    head.y -= boxSize;
  } else if (direction === "down") {
    head.y += boxSize;
  } else if (direction === "left") {
    head.x -= boxSize;
  } else if (direction === "right") {
    head.x += boxSize;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    generateFood();
    // Call the function to display the score increment
    displayScoreIncrement();
  } else {
    snake.pop();
  }

  if (checkCollision()) {
    // Display game over message and score
    const gameOverContainer = document.getElementById("gameOverContainer");
    const scoreText = document.getElementById("scoreIncrementText");
    scoreText.textContent = "Your Score: " + score;
    gameOverContainer.style.display = "block";

    const scoreContainer = document.getElementById("scoreContainer");
    scoreContainer.style.display = "none";

    // Reset the game after a delay
    setTimeout(() => {
      snake = [];
      direction = "right";
      score = 0;
      generateFood();
      for (let i = 0; i < startingLength; i++) {
        snake.push({ x: 20 + i * boxSize, y: 20 });
      }

      // Hide the game over message again
      gameOverContainer.style.display = "none";

      // Show arrow icons and score again
      arrowIcons.style.display = "flex";
      scoreContainer.style.display = "block";
    }, 2000); // Adjust the delay time (in milliseconds) as you prefer
  }

  draw();
}

window.onload = startGame;
