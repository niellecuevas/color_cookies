const cookieColors = [
    { color: 'red', img: '{% static "images/cookies/cookiered.png" %}' },
    { color: 'blue', img: '{% static "images/cookies/cookieblue.png" %}' },
    { color: 'green', img: '{% static "images/cookies/cookiegreen.png" %}' },
    { color: 'yellow', img: '{% static "images/cookies/cookieyellow.png" %}' },
    { color: 'pink', img: '{% static "images/cookies/cookiepink.png" %}' },
    { color: 'orange', img: '{% static "images/cookies/cookieorange.png" %}' },
    { color: 'brown', img: '{% static "images/cookies/cookiebrown.png" %}' },
    { color: 'black', img: '{% static "images/cookies/cookieblack.png" %}' }
];

let lives = 5;
let correctColor;

const questionText = document.getElementById('questionText');
const cookieContainer = document.getElementById('cookieContainer');
const lifeCircles = document.querySelectorAll('.life');
const retryButton = document.getElementById('retryButton');
const gameOverMessage = document.getElementById('gameOverMessage');

// Start new game
function startGame() {
  lives = 5;
  gameOverMessage.style.display = 'none';
  generateNewQuestion();
  updateLives();
}

// Update lives display
function updateLives() {
  lifeCircles.forEach((circle, index) => {
    circle.style.backgroundColor = index < lives ? 'green' : 'gray';
  });
}

// Generate new random question
function generateNewQuestion() {
  const randomColorIndex = Math.floor(Math.random() * cookieColors.length);
  const randomCookieColor = cookieColors[randomColorIndex];
  
  correctColor = randomCookieColor.color;

  // Randomize text and its color
  const randomTextColorIndex = Math.floor(Math.random() * cookieColors.length);
  const randomTextColor = cookieColors[randomTextColorIndex].color;

  questionText.innerHTML = `Color ${correctColor}`;
  questionText.style.color = randomTextColor;

  // Randomize cookie options
  const shuffledColors = shuffleArray(cookieColors);
  const cookies = cookieContainer.getElementsByClassName('cookie');
  
  for (let i = 0; i < cookies.length; i++) {
    cookies[i].setAttribute('data-color', shuffledColors[i].color);
    cookies[i].src = shuffledColors[i].img;
  }
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Handle cookie click event
cookieContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('cookie')) {
    const clickedColor = event.target.getAttribute('data-color');
    if (clickedColor === correctColor) {
      alert('Correct!');
      generateNewQuestion();
    } else {
      lives--;
      updateLives();
      if (lives === 0) {
        gameOver();
      }
    }
  }
});

// Handle game over
function gameOver() {
  gameOverMessage.style.display = 'block';
}

// Retry button to restart the game
retryButton.addEventListener('click', function() {
  startGame();
});

// Start the game when the page loads
startGame();
