import { useEffect, useState } from "react";
import Controls from "./Controls";
import Grid from "./Grid";
import "./App.css"

const App = () => {
  // state variables
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [grid, setGrid] = useState([]);

  const initializeGrid = () => {
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

  // If anything from rows, or cols changes, update the grid with new rows and cols
  useEffect(initializeGrid, [rows, cols]);

  return (
    <div className="app">
      <Controls setRows={setRows} setCols={setCols} rows={rows} cols={cols} grid={grid} setGrid={setGrid} />
      <Grid grid={grid} />
    </div>
  )
}

export default App