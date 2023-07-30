const cards = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
let openedCards = [];
let matchedCards = [];
let moves = 0;
let numMatches = 8;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.textContent = card;
  cardElement.addEventListener("click", () => cardClick(cardElement));

  return cardElement;
}

function initGame() {
  const shuffledCards = shuffle(cards);
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  for (const card of shuffledCards) {
    const cardElement = createCard(card);
    gameContainer.appendChild(cardElement);
  }

  moves = 0;
  openedCards = [];
  matchedCards = [];
}

function cardClick(cardElement) {
  if (openedCards.length < 2 && !openedCards.includes(cardElement) && !matchedCards.includes(cardElement)) {
    flipCard(cardElement);
    openedCards.push(cardElement);

    if (openedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function startGame() {
  initGame();
  const startButton = document.getElementById("start-button");
  startButton.style.display = "none"; // Sembunyikan tombol setelah memulai permainan
}

function cardClick(cardElement) {
  if (openedCards.length < 2 && !openedCards.includes(cardElement) && !matchedCards.includes(cardElement)) {
    flipCard(cardElement);
    openedCards.push(cardElement);

    if (openedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}
document.getElementById("start-button").addEventListener("click", startGame);

const cardElements = document.getElementsByClassName("card");
for (const cardElement of cardElements) {
  cardElement.addEventListener("click", () => cardClick(cardElement));
}
function checkMatch() {
  const [card1, card2] = openedCards;
  const isMatch = card1.textContent === card2.textContent;

  if (isMatch) {
    matchedCards.push(card1, card2);
    openedCards = [];

    if (matchedCards.length === numMatches * 2) {
      setTimeout(() => alert("Congratulations! You've won!"), 500);
    }
  } else {
    flipCard(card1);
    flipCard(card2);
    openedCards = [];
  }

  moves++;
}

initGame();
