const messageContainer = document.querySelector('.message-container');
const tileDisplay = document.querySelector('.tile-container');
const keyBoard = document.querySelector('.key-container');

const wordle = 'SUPER';

//prettier-ignore
const keys = [
  'Q','W','E','R','T','Y','U','I','O','P',
  'A','S','D','F','G','H','J','K','L','ENTER',
  'Z','X','C','V','B','N','M','<<'
];

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, index) => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('id', `guessRow-${index}`);

  guessRow.forEach((guess, index2) => {
    const tileElement = document.createElement('div');
    tileElement.setAttribute('id', `guessRow-${index}-tile-${index2}`);
    tileElement.classList.add('tile');
    rowElement.append(tileElement);
  });
  tileDisplay.append(rowElement);
});

keys.forEach((key) => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key;
  buttonElement.setAttribute('id', key);
  buttonElement.addEventListener('click', () => handleKeyClick(key));
  keyBoard.append(buttonElement);
});

const handleKeyClick = (letter) => {
  if (letter === '<<') {
    deleteLetter();
  } else if (letter === 'ENTER') {
    checkRow();
  } else {
    addLetter(letter);
  }
};

const addLetter = (letter) => {
  if (currentRow < 6 && currentTile < 5 && !isGameOver) {
    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    );
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute('data', letter);
    currentTile += 1;
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile -= 1;
    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    );
    tile.textContent = '';
    guessRows[currentRow][currentTile] = '';
    tile.setAttribute('data', '');
  }
};

const checkRow = () => {
  if (currentTile === 5) {
    const guess = guessRows[currentRow].join('');
    flipTile();
    if (guess === wordle) {
      showMessage('Magnificent!');
      isGameOver = false;
    } else {
      currentRow += 1;
      currentTile = 0;
      if (currentRow > 5) {
        showMessage('Game over!');
        isGameOver = true;
      }
    }
  }
};

const showMessage = (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageContainer.append(messageElement);
  setTimeout(() => messageContainer.removeChild(messageElement), 5000);
};

const flipTile = () => {
  const rowTiles = document.getElementById(`guessRow-${currentRow}`).childNodes;
  const guess = [];
  let checkWordle = wordle;

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' });
  });

  guess.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = 'green-overlay';
      checkWordle = checkWordle.replace(guess.letter, '');
    }
  });

  guess.forEach((guess) => {
    if (guess.letter === wordle.includes(guess.letter)) {
      guess.color = 'yellow-overlay';
      checkWordle = checkWordle.replace(guess.letter, '');
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip');
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};
