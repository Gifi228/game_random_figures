let input = document.querySelector('.input'),
    btn = document.querySelector('.btn'),
    timeOut = document.querySelector('.time'),
    block = document.querySelector('.block'),
    score = 0,
    time = 0,
    interval = 0,
    result;

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value != '') {
        time = input.value;
        input.value = '';
        clearInterval(interval);
        score = 0;
        document.querySelector('h3').classList.remove('danger');
        startGame();
        result = document.querySelector('.result');
        block.removeChild(result);
    }
});

block.addEventListener('click', (event) => {
    if (event.target.classList.contains('shape')) {
        score++;
        event.target.remove();
        createRandomShape(); // Generate a new random shape
    }
});

function startGame() {
    interval = setInterval(() => decreaseTime(), 1000);
    createRandomShape();  // Start by creating a random shape
}

function decreaseTime() {
    if (time === 0) {
        endGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = '0' + currentTime;
            document.querySelector('h3').classList.add('danger');
        }
        timeOut.innerHTML = '00:' + currentTime;
    }
}

function endGame() {
    block.innerHTML = `<h1 class="result">Ваш результат: <span class="span">${score}</span></h1>`;
}

// Function to create a random shape: circle, square, or triangle
function createRandomShape() {
    let shapeType = getRandomNumber(1, 3);  // 1 - circle, 2 - square, 3 - triangle
    if (shapeType === 1) {
        createCircle();
    } else if (shapeType === 2) {
        createSquare();
    } else {
        createTriangle();
    }
}

function createCircle() {
    let circle = document.createElement('div');
    let size = getRandomNumber(20, 60);
    let blockSize = block.getBoundingClientRect();
    let x = getRandomNumber(0, blockSize.width - size);
    let y = getRandomNumber(0, blockSize.height - size);

    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.classList.add('shape');
    circle.style.borderRadius = '50%';
    circle.style.top = y + 'px';
    circle.style.left = x + 'px';
    circle.style.backgroundColor = getRandomColor();

    block.append(circle);
}

function createSquare() {
    let square = document.createElement('div');
    let size = getRandomNumber(20, 60);
    let blockSize = block.getBoundingClientRect();
    let x = getRandomNumber(0, blockSize.width - size);
    let y = getRandomNumber(0, blockSize.height - size);

    square.style.width = size + 'px';
    square.style.height = size + 'px';
    square.classList.add('shape');
    square.style.top = y + 'px';
    square.style.left = x + 'px';
    square.style.backgroundColor = getRandomColor();

    block.append(square);
}

function createTriangle() {
    let triangle = document.createElement('div');
    let size = getRandomNumber(40, 80);
    let blockSize = block.getBoundingClientRect();
    let x = getRandomNumber(0, blockSize.width - size);
    let y = getRandomNumber(0, blockSize.height - size);

    triangle.style.width = '0';
    triangle.style.height = '0';
    triangle.style.borderLeft = size / 2 + 'px solid transparent';
    triangle.style.borderRight = size / 2 + 'px solid transparent';
    triangle.style.borderBottom = size + 'px solid ' + getRandomColor();
    triangle.classList.add('shape');
    triangle.style.top = y + 'px';
    triangle.style.left = x + 'px';
    triangle.style.position = 'absolute';

    block.append(triangle);
}

// Function to generate random numbers
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

// Function to generate random colors
function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
