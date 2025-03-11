import Row from "./Row";
import "./Grid.css";

const Grid = ({ grid }) => {
  return <div className="grid">
    {
        grid.map((rows, i) => <Row row={rows} key={i} />)
    }
    </div>;
};

export default Grid;
