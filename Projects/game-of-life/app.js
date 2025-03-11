const container = document.getElementById('container');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const clearButton = document.getElementById('clear');
const randomButton = document.getElementById('random');
const nextButton = document.getElementById('next');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');

// State variables
let rows = 0;
let cols = 0;
let grid = [];
let intervalId = null;

// on window reload

function createGrid(rows, cols) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
        }
        grid.push(row);
    }
    return grid;
}

function renderGrid(){
    container.innerHTML = '';
    /*
       1. we have to use 2 for loops 
       2. In first for loop we'll make a row and then in second loop cell
       3. Append in container
    */

    for(let row of grid){
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for(let col of row){
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');

            if(col === 1){
                cellDiv.classList.add('alive');
            }else{
                cellDiv.classList.add('dead');
            }

            // Append cellDiv in rowDiv
            rowDiv.appendChild(cellDiv);
        }

        // Append rowDiv in container
        container.appendChild(rowDiv);
    }
}

window.addEventListener('load', () => {
    rows = rowsInput.value;
    cols = colsInput.value;
    
    // Create a grid with 0 values
    grid = createGrid(rows, cols);

    // Render the grid
    renderGrid();

    console.log('Window loaded');
});


// We have to add some event
rowsInput.addEventListener('change', () => {
    // We'll take value from rowInput and update the value of row
    rows = rowsInput.value;

    grid = createGrid(rows, cols);
    renderGrid();
})

colsInput.addEventListener('change', () =>{
    cols = colsInput.value;

    grid = createGrid(rows, cols);
    renderGrid();
})


// Random button logic
randomButton.addEventListener('click', () => {
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            grid[i][j] = Math.floor(Math.random()*2);
        }
    }

    renderGrid();
})

// Clear buton logic
clearButton.addEventListener('click', () => {
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            grid[i][j] = 0;
        }
    }

    renderGrid();
})

function liveNeighbours(i, j){
    const dx = [-1, -1, -1, 1, 1, 1, 0, 0];
    const dy = [0, 1, -1, 0, 1, -1, -1, 1];
    
    let ans = 0;

    for(let k=0; k<8; k++){
        const newI = i + dx[k];
        const newJ = j + dy[k];

        console.log(newI, newJ);

        if(newI < 0 || newI >= rows || newJ < 0 || newJ >= cols) continue;
        if(grid[newI][newJ] == 1) ans++;
    }
    return ans;
}

// Next Generation Logic
function nextGeneration(){
    const newGrid = createGrid(rows, cols);

    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            // find number of live neighbours
            const neighbours = liveNeighbours(i, j);
            if(grid[i][j] == 1){
                if(neighbours < 2 || neighbours > 3) newGrid[i][j] = 0;
                else newGrid[i][j] = 1;
            }
            else{
                if(neighbours == 3) newGrid[i][j] = 1;
            }
        }
    }
    grid = newGrid;
}

startButton.addEventListener('click', () => {
    if(intervalId != null) return;
    intervalId = setInterval(() => {
        nextGeneration();
        renderGrid();
    }, 1000)
})

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
})

nextButton.addEventListener('click', () => {
    nextGeneration();
    renderGrid();
})