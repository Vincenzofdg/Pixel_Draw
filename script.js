const span = document.getElementById('select-color-text');
const board = document.getElementById('pixel-board');
const color = document.getElementById('color-pallet');
const eraser = document.getElementById('eraser-icon');
const rainbow = document.getElementById('rainbow-icon');
let selectedColor = color.value;
const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '00ff00', '#0000ff', '2e2b5f', '#8b00ff']
const size = 2479;

const isSelectedCheck = (elem) => {
    const isSelected = elem.classList.length === 1 ? true : false
    if (!isSelected) return false
    elem.classList.remove('selected');
    selectedColor = color.value;
    return true
};

const resetSettings = () => {
    eraser.style.backgroundColor = 'black';
    while (board.firstChild) board.removeChild(board.firstChild)
}

// Pixel Mode
const pixelMode = () => {
    resetSettings();
    for(let i = 0; i < size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('click', ({target}) => target.style.backgroundColor = selectedColor);
        board.appendChild(pixel);
    };
}

// Drawing with Pixels 
color.addEventListener('change', ({ target }) => {
    if (isSelectedCheck(eraser)) eraser.style.backgroundColor = 'black';
    selectedColor = target.value;
});

eraser.addEventListener('click', ({ target }) => {
    if(isSelectedCheck(eraser)) {
        target.style.backgroundColor = 'black';
        return
    };
    target.classList.add('selected');
    target.style.backgroundColor = '#2e4057';
    selectedColor = '#1d1d1d';
});

// Rainbow Mode
const rainbowMode = () => {
    resetSettings();
    for(let i = 0; i < size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', ({target: { style }}) => {
            const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
            style.backgroundColor = color
        });
        pixel.addEventListener('mouseout', ({ target: { style } }) => {
            style.background = '#1d1d1d';
            style.boxShadow = '0 0 2px #000';
        })
        board.appendChild(pixel);
    }
}

rainbow.addEventListener('click', ({ target }) => { 
    eraser.hidden = !eraser.hidden;
    color.hidden = !color.hidden;
    span.hidden = !span.hidden; 
    if(isSelectedCheck(rainbow)) return pixelMode();
    target.classList.add('selected');
    rainbowMode();
})

pixelMode()