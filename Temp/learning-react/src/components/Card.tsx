import "../styles/Card.css"

interface CardProps{
    count: number,
    idx: number,
    increase: (idx: number) => void,
    decrease: (idx: number) => void
    deleteCard: (idx: number) => void
}

export default function Card({count, decrease, idx, increase, deleteCard}: CardProps) {
    function handleIncrease(){
        increase(idx)
    }

    function handleDecrease(){
        decrease(idx)
    }

    function handleDelete(){
        deleteCard(idx)
    }

    return (
        <div className="card">
            <h1>Count is <span>{count}</span></h1>
            <div className="buttons">
                <button onClick={handleIncrease}>Increase</button>
                <button onClick={handleDecrease}>Decrease</button>
            </div>
            <button className="delete" onClick={handleDelete} >Delete</button>
        </div>
    )
}