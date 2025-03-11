const container = document.getElementById('container');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// State variables
let rows = 15;
let cols = 28;
let grid = [];
let intervalId = null;
let direction = 'up';
let ant = { 
    x: Math.floor(Math.random() * rows), 
    y: Math.floor(Math.random() * cols) 
};


function initializeGrid() {
    grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(1);
        }
        grid.push(row);
    }
}

function renderGrid() {
    container.innerHTML = '';

    grid.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        row.forEach((col, j) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');

            if (ant.x === i && ant.y === j) {
                cellDiv.classList.add('ant');
            }

            if (col === 0) {
                cellDiv.classList.add('black');
            }

            rowDiv.appendChild(cellDiv);
        });

        container.appendChild(rowDiv);
    });
}

window.addEventListener('load', () => {
    initializeGrid();
    renderGrid();
});

function isValid(x, y){
    return x >= 0 && x < rows && y >= 0 && y < cols;
}

function moveAnt(){
    if(!isValid(ant.x, ant.y)){
        clearInterval(intervalId);
        intervalId = null;
        return;
    }

    const {x, y} = ant;

    if(direction == 'up'){
        if(grid[x][y] == 1){
            direction = 'right';
            grid[x][y] = 0;
            ant.y = (ant.y + 1) % cols;
        }else{
            direction = 'left';
            grid[x][y] = 1;
            ant.y = (ant.y - 1 + cols) % cols;
        }
    }else if(direction == 'down'){
        if(grid[x][y] == 1){
            direction = 'left';
            grid[x][y] = 0;
            ant.y = (ant.y - 1 + cols) % cols;
        }else{
            direction = 'right';
            grid[x][y] = 1;
            ant.y = (ant.y + 1) % cols
        }
    }else if(direction == 'left'){
        if(grid[x][y] == 1){
            direction = 'up';
            grid[x][y] = 0;
            ant.x = (ant.x - 1 + rows) % rows;
        }
        else{
            direction = 'down';
            grid[x][y] = 1;
            ant.x = (ant.x + 1) % rows
        }
    }else if(direction == 'right'){
        if(grid[x][y] == 1){
            direction = 'down';
            grid[x][y] = 0;
            ant.x = (ant.x + 1) % rows;
        }else{
            direction = 'up';
            grid[x][y] = 1;
            ant.x = (ant.x - 1 + rows) % rows;
        }
    }

    renderGrid();
}

startButton.addEventListener('click', () => {
    if(intervalId !== null) return;

    intervalId = setInterval(moveAnt, 10);
});

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;

    ant = { 
        x: Math.floor(Math.random() * rows), 
        y: Math.floor(Math.random() * cols) 
    };

    initializeGrid();
    renderGrid();
});
