'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

const displaySecretNumber = number => {
  document.querySelector('.number').textContent = number;
};

const changeBackgroundColor = color => {
  document.querySelector('body').style.backgroundColor = color;
};

const changeSecretNumberWidth = width => {
  document.querySelector('.number').style.width = width;
};

const checkHandler = () => {
  const guessedNumber = Number(document.querySelector('.guess').value);

  if (!guessedNumber) {
    document.querySelector('.message').textContent = '⛔ Invalid number!';
  }

  if (guessedNumber !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guessedNumber < secretNumber ? '📉 Too low!' : '📈 Too high!',
      );

      score--;
    } else {
      displayMessage('💥 You just lost the game');
      score = 0;
      changeBackgroundColor('#9a1703');
    }

    document.querySelector('.score').textContent = score;
  } else {
    displayMessage('🎉 Correct number!');
    displaySecretNumber(secretNumber);
    changeBackgroundColor('#60b347');
    changeSecretNumberWidth('30rem');

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
};

const againHandler = () => {
  changeBackgroundColor('#222');
  changeSecretNumberWidth('15rem');

  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  displaySecretNumber('?');
  document.querySelector('.guess').value = '';
};

document.querySelector('.check').addEventListener('click', checkHandler);
document.querySelector('.again').addEventListener('click', againHandler);
