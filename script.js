const options = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'];
var colors;
var rows;
function clearPlayArea() {
  const gameboard = document.getElementById('gameboard');
  gameboard.querySelectorAll('*').forEach(n => n.remove());
  const panel = document.getElementById('panel');
  panel.querySelectorAll('*').forEach(n => n.remove());
}
function initializeBoard() {
  clearPlayArea();
  rows = 0;
  colors = [];
  while (colors.length < 4) {
    const color = options[Math.floor(Math.random() * 6)];
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
  console.log('Colors chosen: ', colors);
  createNewRow();
}
function onSubmit() {
  for (let i = 0; i < 4; i++) {
    const pin = document.getElementById(`${rows}-${i}`);
    if (pin.classList.contains('grey')) {
      window.alert('All slots have not been colored. Please pick 4 different colors.');
      return;
    }
  }
  let totalMatching = 0;
  for (let i = 0; i < 4; i++) {
    const pin = document.getElementById(`${rows}-${i}`);
    const pinColor = getColorFromSlotElement(pin);
    pin.classList.remove('clickable');
    pin.removeAttribute('onclick');
    if (colors.includes(pinColor)) {
      totalMatching++;
    }
  }
  let i = 0;
  while (i < 4) {
    const pinColor = (i < totalMatching) ? 'white' : 'black';
    const pin = document.getElementById(`panel-${rows}-${i}`);
    ['grey', 'black', 'white'].forEach(color => {
      if (pin.classList.contains(color)) {
        pin.classList.remove(color);
      }
    });
    pin.classList.add(pinColor);
    i++;
  }
  setTimeout(function() {
    if (totalMatching === 4) {
      window.alert('Woohoo! You just won the game!');
      initializeBoard();
    } else if (rows === 9) {
      window.alert('Boohoo! You just lost the game (9 attempts failed).');
      initializeBoard();
    } else {
      createNewRow();
    }
  }, 10);
}
function createNewRow() {
  rows++;
  const row = document.createElement('div');
  row.setAttribute('id', `${rows}`);
  row.classList.add('row');
  for (let i = 0; i < 4; i++) {
    const pin = document.createElement('div');
    pin.setAttribute('id', `${rows}-${i}`);
    pin.classList.add('grey');
    pin.classList.add('pin');
    row.appendChild(pin);
  }
  document.getElementById('gameboard').appendChild(row);
  const panelRow = document.createElement('div');
  panelRow.setAttribute('id', `panel-${rows}`);
  panelRow.classList.add('row');
  for (let i = 0; i < 4; i++) {
    const pin = document.createElement('div');
    pin.setAttribute('id', `panel-${rows}-${i}`);
    pin.classList.add('grey');
    pin.classList.add('pin');
    panelRow.appendChild(pin);
  }
  document.getElementById('panel').appendChild(panelRow);
}
function findAndFillEmptySlot(color) {
  for (let i = 0; i < 4; i++) {
    const pin = document.getElementById(`${rows}-${i}`);
    if (pin.classList.contains(color)) {
      window.alert('Already added! You can add each color only once per row.');
      return;
    }
  }
  for (let i = 0; i < 4; i++) {
    const id = `${rows}-${i}`;
    const pin = document.getElementById(id);
    if (pin.classList.contains('grey')) {
      pin.classList.remove('grey');
      pin.classList.add(color);
      pin.classList.add('clickable');
      pin.setAttribute('onclick', `removeColorFromSlot('${id}', '${color}')`);
      return;
    }
  }
  window.alert('All slots filled! Please remove a color first.');
}
function removeColorFromSlot(id, color) {
  const pin = document.getElementById(id);
  if (pin.classList.contains(color)) {
    pin.classList.remove(color);
  }
  pin.classList.add('grey');
}
function getColorFromSlotElement(pin) {
  for (let i = 0; i < options.length; i++) {
    if (pin.classList.contains(options[i])) {
      return options[i];
    }
  }
}
