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

shuffle(cards);

// 🎯 Step 3: Render the cards
const board = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

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

// 🔁 Step 4: Flip logic
function flipCard(card, emoji) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = { card, emoji };
    return;
  }

  secondCard = { card, emoji };
  lockBoard = true;

  if (firstCard.emoji === secondCard.emoji) {
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
