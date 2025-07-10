const cookieColors = [
  { color: 'red', img: window.staticPaths.cookieRed },
  { color: 'blue', img: window.staticPaths.cookieBlue },
  { color: 'green', img: window.staticPaths.cookieGreen },
  { color: 'yellow', img: window.staticPaths.cookieYellow },
  { color: 'pink', img: window.staticPaths.cookiePink },
  { color: 'orange', img: window.staticPaths.cookieOrange },
  { color: 'brown', img: window.staticPaths.cookieBrown },
  { color: 'black', img: window.staticPaths.cookieBlack }
];

const backgroundMusic = new Audio(window.staticPaths.frozenWinter);
backgroundMusic.loop = true;
window.onload = function() {
  backgroundMusic.play();
};

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
      backgroundMusic.pause();
  } else {
      backgroundMusic.play();
  }
});

const correctSound = new Audio(window.staticPaths.correctSound);
correctSound.volume = 0.1;
const wrongSound = new Audio(window.staticPaths.wrongSound);
wrongSound.volume = 0.5;
const gameoverSound = new Audio(window.staticPaths.gameOverSound);
gameoverSound.volume = 0.1;

let lives = 5;
let score = 0;
let correctColor;
let timer;
let remainingTime = 10; // Fixed to 10 seconds for level 1
let numCookies = 3;
let level = 1; // Start from level 1
let timerInterval = 1000; // Starting interval of 1 second
let gameInProgress = false;

const questionText = document.getElementById('questionText');
const cookieContainer = document.getElementById('cookieContainer');
const lifeCircles = document.querySelectorAll('.life');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const countdownModal = document.getElementById('countdownModal');
const countdownText = document.getElementById('countdownText');

function startGame() {
  lives = 5;
  score = 0;
  level = 1;
  numCookies = 3;
  timerInterval = 1000; // Starting timer speed
  gameInProgress = true;
  updateScore();
  updateLives();
  countdown();
}

function updateLives() {
  lifeCircles.forEach((circle, index) => {
      circle.style.backgroundColor = index < lives ? 'green' : 'gray';
  });
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function countdown() {
  let countdownValue = 3;
  
  // Show countdown modal and add warning message
  countdownModal.style.display = 'flex';
  countdownModal.innerHTML = `
    <div class="modal-content">
      <div class="countdown-warning">Match the COLOR of the word!</div>
      <div class="countdown-text">${countdownValue}</div>
    </div>
  `;
  
  const countdownTimer = setInterval(() => {
      const countdownText = countdownModal.querySelector('.countdown-text');
      countdownText.textContent = countdownValue > 0 ? countdownValue : 'GO!';
      countdownValue--;
      
      if (countdownValue < 0) {
          clearInterval(countdownTimer);
          countdownModal.style.display = 'none';
          gameStart();
      }
  }, 500);
}

function gameStart() {
  generateNewQuestion();
  startTimer();
  document.getElementById('gameContainer').style.zIndex = 1; // Keep game content visible
}

function startTimer() {
  remainingTime = 10; // Always reset to 10 seconds at the start of each question
  timerDisplay.textContent = remainingTime;
  if (timer) {
      clearInterval(timer);
  }
  timer = setInterval(function() {
      remainingTime--;
      timerDisplay.textContent = remainingTime;
      if (remainingTime <= 0) {
          clearInterval(timer);
          loseLife(); // If time runs out, the player loses a life
      }
  }, timerInterval);
}

function loseLife() {
  lives--;
  updateLives();
  if (lives === 0) {
      gameoverSound.play();
      gameOver();
  } else {
      generateNewQuestion();
      startTimer();
  }
}

function generateNewQuestion() {
  const randomTextIndex = Math.floor(Math.random() * cookieColors.length);
  const randomTextColorIndex = Math.floor(Math.random() * cookieColors.length);

  const randomText = cookieColors[randomTextIndex].color;
  const randomTextColor = cookieColors[randomTextColorIndex].color;

  correctColor = randomTextColor;

  const capitalizedText = randomText.charAt(0).toUpperCase() + randomText.slice(1);
  questionText.innerHTML = `${capitalizedText}`;
  questionText.style.color = randomTextColor;

  const options = [cookieColors[randomTextColorIndex]];

  while (options.length < numCookies) {
      const randomColor = cookieColors[Math.floor(Math.random() * cookieColors.length)];
      if (!options.includes(randomColor)) {
          options.push(randomColor);
      }
  }

  const shuffledOptions = shuffleArray(options);
  cookieContainer.innerHTML = '';
  shuffledOptions.forEach(cookie => {
      const img = document.createElement('img');
      img.src = cookie.img;
      img.setAttribute('data-color', cookie.color);
      img.classList.add('cookie');
      cookieContainer.appendChild(img);
  });
}

function shuffleArray(array) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function shakeGameContainer() {
  gameContainer.classList.add('shake');
  setTimeout(() => {
      gameContainer.classList.remove('shake');
  }, 1000); // Shake duration
}

cookieContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('cookie')) {
      const clickedCookie = event.target;
      clickedCookie.classList.add('zoom-out');
      setTimeout(function() {
          clickedCookie.classList.remove('zoom-out');
      }, 200);

      const clickedColor = event.target.getAttribute('data-color');
      if (clickedColor === correctColor) {
          correctSound.play();
          score++;
          updateScore();
          clearInterval(timer);
          generateNewQuestion();
          startTimer();

          // Increase difficulty every few rounds (optional)
          if (score % 5 === 0 && numCookies < 8) {
              numCookies++;
              level++; // Increase level
              timerInterval = Math.max(500, timerInterval - 100); // Speed up the timer as the level increases
          }
      } else {
          wrongSound.play();
          loseLife();
          shakeGameContainer();
      }
  }
});

function gameOver() {
  Swal.fire({
      title: 'Game Over!',
      html: `Score: ${score}.<br>You lost all your lives.`,
      imageUrl: window.staticPaths.gameOverImage,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Game Over Icon',
      confirmButtonText: 'Try Again',
      customClass: {
          confirmButton: 'custom-confirm-button',
      },
      allowOutsideClick: () => {
          startGame();
          return true;
      },
      didOpen: () => {
          const image = Swal.getImage();
          image.classList.add('rotate-image');
      }
  }).then((result) => {
      if (result.isConfirmed) {
          startGame(); // Restart the game and reset everything
      }
  });
}

startGame();