import "./Row.css";

const Row = ({ row }) => {
    return (
        <div className="row">
            {
                row.map((cell, i) => {
                    return <div className={`cell ${cell === 1 ? 'alive' : 'dead'}`} key={i}></div>
                })
            }
        </div>
    );
}

export default Row;

// "cell alive"
// "cell dead"
// [1, 0, 1, 1, 0]