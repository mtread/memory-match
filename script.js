// 🍕 Step 1: Set up the emoji pairs
const emojis = ['🍕', '🐸', '🎈', '🌟', '🐱', '🍓', '🚀', '🎵'];
const cards = [...emojis, ...emojis]; // Duplicate to make pairs

// 🔀 Step 2: Shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let flipCount = 0;
let bestScore = localStorage.getItem('bestScore') || null;

// Display initial best score or --
const flipCounterEl = document.getElementById('flipCounter');
const bestScoreEl = document.getElementById('bestScore');
const board = document.getElementById('gameBoard');

bestScoreEl.textContent = bestScore ? `Best Score: ${bestScore}` : 'Best Score: --';

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Function to render the cards on the board
function renderBoard() {
  board.innerHTML = ''; // Clear existing cards
  flipCount = 0;
  flipCounterEl.textContent = `Flips: 0`;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  shuffle(cards);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.textContent = emoji;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => flipCard(card, emoji));

    board.appendChild(card);
  });
}

// Flip card logic
function flipCard(card, emoji) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flipCount++;
  flipCounterEl.textContent = `Flips: ${flipCount}`;

  if (!firstCard) {
    firstCard = { card, emoji };
    return;
  }

  secondCard = { card, emoji };
  lockBoard = true;

  if (firstCard.emoji === secondCard.emoji) {
    // Check if all cards are flipped (game over)
    if (document.querySelectorAll('.card.flipped').length === cards.length) {
      if (!bestScore || flipCount < bestScore) {
        bestScore = flipCount;
        localStorage.setItem('bestScore', bestScore);
        bestScoreEl.textContent = `Best Score: ${bestScore}`;
        alert(`🎉 New Best Score: ${bestScore} flips!`);
      } else {
        alert(`Game complete! Your flips: ${flipCount}. Best score: ${bestScore}`);
      }
    }

    // 🎉 Match found!
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  } else {
    // ❌ Not a match: flip back after delay
    setTimeout(() => {
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// Setup reset button event listener
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  renderBoard();
});

// Initial board render on page load
renderBoard();
