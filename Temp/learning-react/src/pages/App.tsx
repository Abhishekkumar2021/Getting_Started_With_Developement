import { useState } from "react"
import Card from "../components/Card"
import "../styles/App.css"

function App() {
  const [counts, setCounts] = useState<number[]>([])

  function handleAdd(){
    const updatedCounts = [...counts]
    updatedCounts.push(0)
    setCounts(updatedCounts)
  }

  function increase(idx: number){
    const updatedCounts = [...counts]
    updatedCounts[idx]++
    setCounts(updatedCounts)
  }

  function decrease(idx: number){
    const updatedCounts = [...counts]
    updatedCounts[idx]--
    setCounts(updatedCounts)
  }

  function deleteCard(idx: number){
    const updatedCounts = counts.filter((_, index) => idx !== index)
    setCounts(updatedCounts)
  }

  return (
    <div className="app">
      <button onClick={handleAdd}>Add a Card</button>
      <div className="cards">
        {counts.map((count, idx) => <Card key={idx} count={count} idx={idx} increase={increase} decrease={decrease} deleteCard={deleteCard}/>)}
      </div>
    </div>
  )
}

export default App
