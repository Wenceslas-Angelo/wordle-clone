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
  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute('data');
    setTimeout(() => {
      tile.classList.add('flip');
      if (dataLetter === wordle[index]) {
        tile.classList.add('green-overlay');
        addColorToKey(dataLetter, 'green-overlay');
      } else if (wordle.includes(dataLetter)) {
        tile.classList.add('yellow-overlay');
        addColorToKey(dataLetter, 'yellow-overlay');
      } else {
        tile.classList.add('grey-overlay');
        addColorToKey(dataLetter, 'grey-overlay');
      }
    }, 500 * index);
  });
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};
