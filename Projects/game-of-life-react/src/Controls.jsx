import { useState } from 'react';
import './Controls.css';

const Controls = ({rows, cols, grid, setRows, setCols, setGrid}) => {
    const [intervalId, setIntervalId] = useState(null);

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
        const newGrid = [...grid];
    
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
        return newGrid;
    }

    const handleStart = () => {
        if(intervalId != null) return;
        const id = setInterval(() => {
            const grid = nextGeneration();
            setGrid(grid);
        }, 100);
        setIntervalId(id);
    }

    const handleStop = () => {
        if(intervalId == null) return;
        clearInterval(intervalId);
        setIntervalId(null);
    }

    const handleRandom = () => {
        handleStop();

        const newGrid = [];
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) {
            row.push(Math.random() > 0.5 ? 1 : 0);
          }
          newGrid.push(row);
        }
        setGrid(newGrid);
    }

    const handleClear = () => {
        handleStop();
        
        const newGrid = [];
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) {
            row.push(0);
          }
          newGrid.push(row);
        }
        setGrid(newGrid);
    }

  return (
    <div className="controls">
      <div className="inputs">
        <input type="number" placeholder="Rows" defaultValue={rows} onChange={(e) => {
            setRows(e.target.value)
            handleStop();
        }} />
        <input type="number" placeholder="Cols" defaultValue={cols} onChange={(e) => {
            setCols(e.target.value)
            handleStop();
        }} />
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleRandom}>Random</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Controls;
