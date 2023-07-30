const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Konstanta-konstanta game
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_SPEED = 5;
const BALL_RADIUS = 10;
const BALL_SPEED_X = 4;
const BALL_SPEED_Y = 4;
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 5;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;

// Variabel-vaiabel game
let paddleX = canvas.width / 2 - PADDLE_WIDTH / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = BALL_SPEED_X * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = BALL_SPEED_Y * (Math.random() > 0.5 ? 1 : -1);
let bricks = [];

let bonusActive = false;
let bonusDuration = 5000; // Durasi bonus dalam milidetik (misalnya 5000 milidetik = 5 detik)
let bonusTimer = 0; // Timer untuk menghitung durasi bonus yang tersisa (dalam milidetik)
let bonusBallX;
let bonusBallY;

// Fungsi untuk menggambar balok
function drawBricks() {
  ctx.fillStyle = "#8a6031";
  bricks.forEach((brick) => {
    ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
  });
}

// Fungsi untuk menggambar platform dan bola
function drawObjects() {
  ctx.fillStyle = "#b35b1e";
  ctx.fillRect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);

  ctx.fillStyle = "#301b1b";
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

// Fungsi untuk mengupdate posisi bola
function updateBallPosition() {
  // Jika fitur bonus aktif, update posisi bola tambahan
  if (bonusActive) {
    ballX = bonusBallX;
    ballY = bonusBallY;
  } else {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Deteksi tabrakan dengan dinding
    if (ballX - BALL_RADIUS < 0 || ballX + BALL_RADIUS > canvas.width) {
      ballSpeedX *= -1;
    }
    if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > canvas.height) {
      ballSpeedY *= -1;
    }

    // Deteksi tabrakan dengan platform
    if (ballY + BALL_RADIUS > canvas.height - PADDLE_HEIGHT && ballX + BALL_RADIUS >= paddleX && ballX - BALL_RADIUS <= paddleX + PADDLE_WIDTH) {
      ballSpeedY *= -1;
    }

    // Deteksi tabrakan dengan balok
    bricks.forEach((brick, index) => {
      if (ballX + BALL_RADIUS >= brick.x && ballX - BALL_RADIUS <= brick.x + BRICK_WIDTH && ballY + BALL_RADIUS >= brick.y && ballY - BALL_RADIUS <= brick.y + BRICK_HEIGHT) {
        ballSpeedY *= -1;
        bricks.splice(index, 1);
      }
    });
  }
}

// Fungsi utama permainan
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Pergerakan platform
  if (rightKeyPressed && paddleX + PADDLE_WIDTH < canvas.width) {
    paddleX += PADDLE_SPEED;
  }
  if (leftKeyPressed && paddleX > 0) {
    paddleX -= PADDLE_SPEED;
  }

  drawBricks();
  drawObjects();
  updateBallPosition();

  // Update durasi bonus jika fitur bonus aktif
  if (bonusActive) {
    bonusTimer -= 16; // Diupdate setiap frame (60 FPS), 1 detik = 1000 milidetik, 1 detik / 60 frame = 16,67 milidetik
    if (bonusTimer <= 0) {
      bonusActive = false; // Fitur bonus berakhir setelah durasi selesai
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = BALL_SPEED_X * (Math.random() > 0.5 ? 1 : -1);
      ballSpeedY = BALL_SPEED_Y * (Math.random() > 0.5 ? 1 : -1);
    }
  }

  requestAnimationFrame(updateGame);
}

// Deteksi input dari pemain
let rightKeyPressed = false;
let leftKeyPressed = false;
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    rightKeyPressed = true;
  } else if (event.key === "ArrowLeft") {
    leftKeyPressed = true;
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") {
    rightKeyPressed = false;
  } else if (event.key === "ArrowLeft") {
    leftKeyPressed = false;
  }
});

// Fungsi untuk memulai permainan
function startGame() {
  // Reset posisi platform dan bola
  paddleX = canvas.width / 2 - PADDLE_WIDTH / 2;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = BALL_SPEED_X * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = BALL_SPEED_Y * (Math.random() > 0.5 ? 1 : -1);

  // Reset blok-blok
  bricks = [];
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLS; col++) {
      bricks.push({
        x: col * (BRICK_WIDTH + BRICK_GAP),
        y: row * (BRICK_HEIGHT + BRICK_GAP),
      });
    }
  }

  // Mulai permainan
  updateGame();
}
function activateBonus() {
  bonusActive = true;
  bonusTimer = bonusDuration;
  bonusBallX = ballX;
  bonusBallY = ballY;
}
