'use strict';

const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

const diceImage = document.querySelector('.dice');

const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

// Select score elements for both players by theirs ids
const player0Score = document.querySelector('#score--0');
const player1Score = document.querySelector('#score--1');

const player0CurrentScore = document.querySelector('#current--0');
const player1CurrentScore = document.querySelector('#current--1');

let currentScore, activePlayer, scores, playing;

const init = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  // A player needs 100 points to win the game, so we set playing to true until one of the players reaches 100 points
  playing = true;

  player0Score.textContent = '0';
  player0CurrentScore.textContent = '0';

  player1Score.textContent = '0';
  player1CurrentScore.textContent = '0';

  document
    .querySelector(`.player--0`)
    .classList.remove('player--winner', 'player--loser');
  document
    .querySelector(`.player--1`)
    .classList.remove('player--winner', 'player--loser');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const setActivePlayerCurrentScore = number => {
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
};

const addPointsToCurrentScore = number => {
  currentScore += number;
  setActivePlayerCurrentScore(number);
};

const resetPoints = () => {
  currentScore = 0;
  setActivePlayerCurrentScore(currentScore);
};

const switchActivePlayer = () => {
  resetPoints();
  activePlayer = activePlayer === 1 ? 0 : 1;
};

const rollDiceHandler = () => {
  if (playing) {
    const number = Math.trunc(Math.random() * 6 + 1);
    diceImage.src = `dice-${number}.png`;

    // We need to switch players if someone rolls 1
    if (number === 1) {
      resetPoints();
      switchActivePlayer();
    } else {
      addPointsToCurrentScore(Number(number));
    }
  }
};

const holdButtonHandler = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer === 1 ? 0 : 1}`)
        .classList.add('player--loser');
    } else {
      switchActivePlayer();
    }
  }
};

init();

newGameButton.addEventListener('click', init);
rollDiceButton.addEventListener('click', rollDiceHandler);
holdButton.addEventListener('click', holdButtonHandler);
